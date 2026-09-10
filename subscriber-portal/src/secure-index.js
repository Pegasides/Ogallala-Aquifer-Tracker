const DEFAULT_PRICE_ID = "price_1UDtXDAhqvqGsdlQGboki05S";
const LIVE_PRICE_ID = "price_1U8Px2AMeVp81lSLgQYvoSZR";
const SESSION_COOKIE = "ogallala_member";
const SESSION_SECONDS = 60 * 60 * 24 * 30;
const ALLOWED_STATUSES = new Set(["active", "trialing"]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/") {
      return htmlResponse(homePage());
    }
    if ((request.method === "GET" || request.method === "POST") && url.pathname === "/checkout") {
      return createCheckout(request, env);
    }
    if (request.method === "GET" && url.pathname === "/welcome") {
      return completeCheckout(request, env);
    }
    if (request.method === "GET" && url.pathname === "/members") {
      return showMembers(request, env);
    }
    if (request.method === "POST" && url.pathname === "/logout") {
      return redirectWithCookie(new URL("/", url), expiredSessionCookie());
    }

    return new Response("Page not found", { status: 404 });
  }
};

async function createCheckout(request, env) {
  if (!stripeKey(env)) return htmlResponse(setupPage(), 503);

  const origin = new URL(request.url).origin;
  const form = new URLSearchParams();
  form.set("mode", "subscription");
  form.set("managed_payments[enabled]", "false");
  form.set("line_items[0][price]", env.STRIPE_PRICE_ID || DEFAULT_PRICE_ID);
  form.set("line_items[0][quantity]", "1");
  form.set("subscription_data[trial_period_days]", "7");
  form.set("payment_method_collection", "always");
  form.set("automatic_tax[enabled]", "false");
  form.set("success_url", `${origin}/welcome?session_id={CHECKOUT_SESSION_ID}`);
  form.set("cancel_url", origin);

  const response = await stripeRequest(env, "/v1/checkout/sessions", {
    method: "POST",
    body: form
  });

  if (!response.ok) {
    console.error("Stripe Checkout could not be created.", await response.text());
    return htmlResponse(errorPage(), 502);
  }

  const session = await response.json();
  return Response.redirect(session.url, 303);
}

async function completeCheckout(request, env) {
  if (!stripeKey(env)) return htmlResponse(setupPage(), 503);

  const sessionId = new URL(request.url).searchParams.get("session_id");
  if (!sessionId || !sessionId.startsWith("cs_")) {
    return htmlResponse(accessProblemPage("The Stripe confirmation is missing."), 400);
  }

  const response = await stripeRequest(
    env,
    `/v1/checkout/sessions/${encodeURIComponent(sessionId)}?expand[]=subscription`
  );
  if (!response.ok) {
    console.error("Stripe Checkout confirmation could not be verified.", await response.text());
    return htmlResponse(accessProblemPage("We could not verify this checkout."), 502);
  }

  const checkout = await response.json();
  const subscription = checkout.subscription;
  const subscriptionId = typeof subscription === "string" ? subscription : subscription?.id;
  let status = typeof subscription === "object" ? subscription?.status : null;
  const customerId = typeof checkout.customer === "string" ? checkout.customer : checkout.customer?.id;

  if (checkout.status !== "complete" || !subscriptionId || !customerId) {
    return htmlResponse(accessProblemPage("This checkout has not been completed."), 403);
  }

  if (!status) {
    const subscriptionResponse = await stripeRequest(
      env,
      `/v1/subscriptions/${encodeURIComponent(subscriptionId)}`
    );
    if (!subscriptionResponse.ok) {
      return htmlResponse(accessProblemPage("We could not verify the membership."), 502);
    }
    status = (await subscriptionResponse.json()).status;
  }

  if (!ALLOWED_STATUSES.has(status)) {
    return htmlResponse(accessProblemPage("This membership is not active."), 403);
  }

  const cookie = await createSessionCookie(env, {
    customer: customerId,
    subscription: subscriptionId
  });
  return htmlResponse(welcomePage(), 200, { "Set-Cookie": cookie });
}

async function showMembers(request, env) {
  if (!stripeKey(env)) return htmlResponse(setupPage(), 503);

  const session = await readSession(request, env);
  if (!session) {
    return htmlResponse(signInPage(), 401, { "Set-Cookie": expiredSessionCookie() });
  }

  const response = await stripeRequest(
    env,
    `/v1/subscriptions/${encodeURIComponent(session.subscription)}`
  );
  if (!response.ok) {
    console.error("Subscriber status could not be checked.", await response.text());
    return htmlResponse(accessProblemPage("We could not check your membership right now."), 502);
  }

  const subscription = await response.json();
  if (
    subscription.customer !== session.customer ||
    !ALLOWED_STATUSES.has(subscription.status)
  ) {
    return htmlResponse(inactivePage(), 403, { "Set-Cookie": expiredSessionCookie() });
  }

  return htmlResponse(memberDashboard(subscription));
}

async function stripeRequest(env, path, options = {}) {
  return fetch(`https://api.stripe.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${stripeKey(env)}`,
      ...(options.body ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
      ...(options.headers || {})
    }
  });
}

async function createSessionCookie(env, member) {
  const now = Math.floor(Date.now() / 1000);
  const payload = encodeBase64Url(JSON.stringify({
    ...member,
    issued: now,
    expires: now + SESSION_SECONDS
  }));
  const signature = await sign(payload, stripeKey(env));
  return `${SESSION_COOKIE}=${payload}.${signature}; Max-Age=${SESSION_SECONDS}; Path=/; HttpOnly; Secure; SameSite=Lax`;
}

async function readSession(request, env) {
  const cookies = parseCookies(request.headers.get("Cookie") || "");
  const value = cookies[SESSION_COOKIE];
  if (!value) return null;

  const separator = value.lastIndexOf(".");
  if (separator < 1) return null;
  const payload = value.slice(0, separator);
  const provided = value.slice(separator + 1);
  const expected = await sign(payload, stripeKey(env));
  if (!constantTimeEqual(provided, expected)) return null;

  try {
    const session = JSON.parse(decodeBase64Url(payload));
    const now = Math.floor(Date.now() / 1000);
    if (!session.customer || !session.subscription || session.expires <= now) return null;
    return session;
  } catch {
    return null;
  }
}

async function sign(value, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return encodeBase64Url(new Uint8Array(signature));
}

function encodeBase64Url(value) {
  const bytes = typeof value === "string" ? new TextEncoder().encode(value) : value;
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/u, "");
}

function decodeBase64Url(value) {
  const padding = (4 - (value.length % 4)) % 4;
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/") + "=".repeat(padding);
  const binary = atob(normalized);
  return new TextDecoder().decode(Uint8Array.from(binary, (character) => character.charCodeAt(0)));
}

function constantTimeEqual(left, right) {
  if (left.length !== right.length) return false;
  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return mismatch === 0;
}

function parseCookies(header) {
  return Object.fromEntries(header.split(";").map((part) => {
    const separator = part.indexOf("=");
    if (separator < 0) return [part.trim(), ""];
    return [part.slice(0, separator).trim(), part.slice(separator + 1).trim()];
  }));
}

function stripeKey(env) {
  const priceId = env.STRIPE_PRICE_ID || DEFAULT_PRICE_ID;
  return priceId === LIVE_PRICE_ID ? env.STRIPE_LIVE_SECRET_KEY : env.STRIPE_SECRET_KEY;
}

function expiredSessionCookie() {
  return `${SESSION_COOKIE}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`;
}

function redirectWithCookie(url, cookie) {
  return new Response(null, {
    status: 303,
    headers: { Location: url.toString(), "Set-Cookie": cookie }
  });
}

function layout(content, wide = false) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Ogallala Aquifer Tracker Membership</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 28px; color: #f7f3e8; background: #07110f; font-family: Arial, Helvetica, sans-serif; }
    main { width: min(${wide ? "960px" : "680px"}, 100%); padding: 44px; border: 1px solid #8d7445; border-radius: 18px; background: #101d19; box-shadow: 0 20px 60px #0008; }
    .eyebrow { margin: 0 0 12px; color: #d6bb75; font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
    h1 { margin: 0 0 18px; font-family: Georgia, serif; font-size: clamp(34px, 7vw, 54px); line-height: 1.02; }
    h2 { margin: 0 0 8px; font-family: Georgia, serif; font-size: 24px; }
    p { color: #d7ddd8; font-size: 18px; line-height: 1.6; }
    .price { margin: 28px 0 8px; color: #fff; font-size: 30px; font-weight: 700; }
    .trial { margin: 0 0 28px; color: #d6bb75; font-weight: 700; }
    button, .button { display: inline-block; width: 100%; padding: 16px 22px; border: 0; border-radius: 9px; color: #07110f; background: #d6bb75; font-size: 17px; font-weight: 800; text-align: center; text-decoration: none; cursor: pointer; }
    button.secondary { color: #f7f3e8; background: transparent; border: 1px solid #8d7445; }
    .fine { margin: 18px 0 0; color: #aeb8b2; font-size: 13px; }
    .verified { display: inline-block; margin: 0 0 22px; padding: 8px 12px; border-radius: 99px; color: #bff2ca; background: #173c27; font-size: 14px; font-weight: 800; }
    .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; margin: 28px 0; }
    .card { display: block; min-height: 135px; padding: 22px; border: 1px solid #42534b; border-radius: 12px; color: inherit; background: #0b1713; text-decoration: none; }
    .card:hover, .card:focus-visible { border-color: #d6bb75; background: #12231d; outline: none; }
    .card p { margin: 0; color: #afbbb5; font-size: 15px; line-height: 1.45; }
    .actions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    @media (max-width: 650px) { main { padding: 28px 22px; } .grid, .actions { grid-template-columns: 1fr; } }
  </style>
</head>
<body><main>${content}</main></body>
</html>`;
}

function homePage() {
  return layout(`
    <p class="eyebrow">Ogallala Aquifer Tracker · Version 3.5</p>
    <h1>Become a Subscriber</h1>
    <p>Follow the aquifer, monitoring wells, AI data centers and the decisions shaping the High Plains.</p>
    <p class="price">$35 every three months</p>
    <p class="trial">Your first seven days are free.</p>
    <a class="button" href="/checkout">Start My 7-Day Free Trial</a>
    <p class="fine">A payment method is required. You will not be charged until the trial ends. Cancel before then to avoid a charge.</p>
  `);
}

function welcomePage() {
  return layout(`
    <p class="eyebrow">Membership started</p>
    <span class="verified">Stripe membership verified</span>
    <h1>Welcome to the Tracker</h1>
    <p>Your seven-day free trial has started, and your secure subscriber session is ready.</p>
    <a class="button" href="/members">Enter Subscriber Portal</a>
  `);
}

function memberDashboard(subscription) {
  const status = subscription.status === "trialing" ? "Free trial active" : "Membership active";
  return layout(`
    <p class="eyebrow">Subscriber Portal · Version 3.5</p>
    <span class="verified">${status}</span>
    <h1>Your Ogallala Tracker</h1>
    <p>Subscriber access has been confirmed directly with Stripe.</p>
    <section class="grid" aria-label="Subscriber resources">
      <a class="card" href="https://ogallalatracker.com/v3.4-map.html"><h2>Interactive Timeline</h2><p>Aquifer conditions and projections from 1950 through 2050.</p></a>
      <a class="card" href="https://ogallalatracker.com/v3.4-data-center-watch.html"><h2>Data Center Watch</h2><p>The sourced daily reading list and facility developments.</p></a>
      <a class="card" href="https://ogallalatracker.com/v3.4-groundwater-window.html"><h2>Monitoring Wells</h2><p>Community well records, trends and reference profiles.</p></a>
      <a class="card" href="https://ogallalatracker.com/v3.4-community-toolkit.html"><h2>Community Tools</h2><p>Closed-loop, infrastructure and household planning resources.</p></a>
    </section>
    <div class="actions">
      <a class="button" href="https://billing.stripe.com/p/login/00w5kCgzL0aT3Ca2Fa38400">Manage Billing</a>
      <a class="button" href="/members">Refresh Membership</a>
      <form method="post" action="/logout"><button class="secondary" type="submit">Sign Out</button></form>
    </div>
    <p class="fine">Subscriber access is active. Use Manage Billing to update payment information, review invoices or cancel your subscription.</p>
  `, true);
}

function signInPage() {
  return layout(`
    <p class="eyebrow">Subscriber sign-in</p>
    <h1>Secure access required</h1>
    <p>This browser does not have a verified subscriber session yet.</p>
    <a class="button" href="/">Return to Membership</a>
    <p class="fine">Returning-subscriber email access is the next activation step.</p>
  `);
}

function inactivePage() {
  return layout(`
    <p class="eyebrow">Membership status</p>
    <h1>Subscriber access is not active.</h1>
    <p>Stripe did not report an active membership or free trial for this session.</p>
    <a class="button" href="/">Return to Membership</a>
  `);
}

function accessProblemPage(message) {
  return layout(`
    <p class="eyebrow">Secure verification</p>
    <h1>We could not open subscriber access.</h1>
    <p>${message}</p>
    <a class="button" href="/">Return</a>
  `);
}

function setupPage() {
  return layout(`
    <p class="eyebrow">Setup in progress</p>
    <h1>Checkout is almost ready.</h1>
    <p>The secure Stripe connection still needs to be added. No payment has been attempted.</p>
    <a class="button" href="/">Return</a>
  `);
}

function errorPage() {
  return layout(`
    <p class="eyebrow">Temporary problem</p>
    <h1>Checkout could not open.</h1>
    <p>Please return and try again shortly.</p>
    <a class="button" href="/">Return</a>
  `);
}

function htmlResponse(content, status = 200, extraHeaders = {}) {
  return new Response(content, {
    status,
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
      "X-Frame-Options": "DENY",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
      ...extraHeaders
    }
  });
}
