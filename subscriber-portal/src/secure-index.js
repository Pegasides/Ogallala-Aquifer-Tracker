const DEFAULT_PRICE_ID = "price_1UDtXDAhqvqGsdlQGboki05S";
const LIVE_PRICE_ID = "price_1U8Px2AMeVp81lSLgQYvoSZR";
const SESSION_COOKIE = "ogallala_member";
const SESSION_SECONDS = 60 * 60 * 24 * 30;
const LOGIN_LINK_SECONDS = 60 * 15;
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
    if (request.method === "GET" && url.pathname === "/login") {
      return htmlResponse(signInPage());
    }
    if (request.method === "POST" && url.pathname === "/login") {
      return requestSignIn(request, env);
    }
    if (request.method === "GET" && url.pathname === "/login/verify") {
      return verifySignIn(request, env);
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
  let subscriptionRecord = typeof subscription === "object" ? subscription : null;
  const customerId = typeof checkout.customer === "string" ? checkout.customer : checkout.customer?.id;

  if (checkout.status !== "complete" || !subscriptionId || !customerId) {
    return htmlResponse(accessProblemPage("This checkout has not been completed."), 403);
  }

  if (!subscriptionRecord) {
    const subscriptionResponse = await stripeRequest(
      env,
      `/v1/subscriptions/${encodeURIComponent(subscriptionId)}`
    );
    if (!subscriptionResponse.ok) {
      return htmlResponse(accessProblemPage("We could not verify the membership."), 502);
    }
    subscriptionRecord = await subscriptionResponse.json();
  }

  if (!subscriptionGrantsAccess(subscriptionRecord, env)) {
    return htmlResponse(accessProblemPage("This membership is not active."), 403);
  }

  const email = checkout.customer_details?.email || checkout.customer_email;
  let welcomeEmailSent = false;
  if (email && env.RESEND_API_KEY) {
    try {
      welcomeEmailSent = await sendWelcomeEmail({
        env,
        email,
        name: checkout.customer_details?.name,
        origin: new URL(request.url).origin,
        sessionId
      });
    } catch (error) {
      console.error("Subscriber welcome email could not be sent.", error);
    }
  }

  const cookie = await createSessionCookie(env, {
    customer: customerId,
    subscription: subscriptionId
  });
  return htmlResponse(welcomePage(welcomeEmailSent), 200, { "Set-Cookie": cookie });
}

async function sendWelcomeEmail({ env, email, name, origin, sessionId }) {
  const greeting = name ? `Hello ${escapeHtml(name)},` : "Hello,";
  const portalUrl = `${origin}/members`;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `ogallala-welcome-${sessionId}`
    },
    body: JSON.stringify({
      from: "Ogallala Aquifer Tracker <welcome@members.ogallalatracker.com>",
      to: [email],
      subject: "Welcome to the Ogallala Aquifer Tracker",
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#17201c;max-width:620px;margin:auto">
          <p style="color:#80652f;font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase">Ogallala Aquifer Tracker · Version 3.5</p>
          <h1 style="font-family:Georgia,serif;color:#07110f">Welcome to the Tracker</h1>
          <p>${greeting}</p>
          <p>Your seven-day free trial has started. After the trial, your membership is $35 every three months unless you cancel.</p>
          <p>Your subscription includes the interactive aquifer timeline, Data Center Watch, monitoring-well profiles, daily dispatches and community tools.</p>
          <p><a href="${escapeHtml(portalUrl)}" style="display:inline-block;padding:14px 20px;border-radius:8px;background:#173c27;color:#fff;text-decoration:none;font-weight:700">Open the Subscriber Portal</a></p>
          <p style="font-size:13px;color:#5c6761">You can manage payment information, invoices or cancellation from the Manage Billing button inside the subscriber portal.</p>
          <p>Thank you for supporting clear, sourced information about the Ogallala Aquifer.</p>
        </div>`,
      text: `${name ? `Hello ${name},` : "Hello,"}\n\nYour seven-day free trial has started. After the trial, your membership is $35 every three months unless you cancel.\n\nOpen the Subscriber Portal: ${portalUrl}\n\nYou can manage payment information, invoices or cancellation from the Manage Billing button inside the subscriber portal.\n\nThank you for supporting clear, sourced information about the Ogallala Aquifer.`
    })
  });

  if (!response.ok) {
    console.error("Resend rejected the welcome email.", await response.text());
    return false;
  }
  return true;
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
    !subscriptionGrantsAccess(subscription, env)
  ) {
    return htmlResponse(inactivePage(), 403, { "Set-Cookie": expiredSessionCookie() });
  }

  return htmlResponse(memberDashboard(subscription));
}

async function requestSignIn(request, env) {
  if (!stripeKey(env) || !env.RESEND_API_KEY) return htmlResponse(setupPage(), 503);

  const form = await request.formData();
  const email = normalizeEmail(form.get("email"));
  if (!email) return htmlResponse(checkEmailPage());

  if (await loginRequestRecentlyMade(request, email)) {
    return htmlResponse(checkEmailPage());
  }

  try {
    const membership = await findActiveMembership(env, email);
    if (membership) {
      const origin = new URL(request.url).origin;
      const token = await createLoginToken(env, {
        customer: membership.customer,
        subscription: membership.subscription,
        email
      });
      await sendSignInEmail({ env, email, origin, token });
    }
  } catch (error) {
    console.error("Subscriber sign-in request could not be completed.", error);
  }

  return htmlResponse(checkEmailPage());
}

async function verifySignIn(request, env) {
  if (!stripeKey(env)) return htmlResponse(setupPage(), 503);

  const token = new URL(request.url).searchParams.get("token");
  const login = token ? await readLoginToken(env, token) : null;
  if (!login) {
    return htmlResponse(expiredLinkPage(), 403);
  }

  const response = await stripeRequest(
    env,
    `/v1/subscriptions/${encodeURIComponent(login.subscription)}`
  );
  if (!response.ok) {
    return htmlResponse(accessProblemPage("We could not check your membership right now."), 502);
  }

  const subscription = await response.json();
  if (
    subscription.customer !== login.customer ||
    !subscriptionGrantsAccess(subscription, env)
  ) {
    return htmlResponse(inactivePage(), 403, { "Set-Cookie": expiredSessionCookie() });
  }

  const cookie = await createSessionCookie(env, {
    customer: login.customer,
    subscription: login.subscription
  });
  return redirectWithCookie(new URL("/members", request.url), cookie);
}

async function findActiveMembership(env, email) {
  const customerResponse = await stripeRequest(
    env,
    `/v1/customers?email=${encodeURIComponent(email)}&limit=10`
  );
  if (!customerResponse.ok) throw new Error("Stripe customer lookup failed.");

  const customers = (await customerResponse.json()).data || [];
  for (const customer of customers) {
    const subscriptionResponse = await stripeRequest(
      env,
      `/v1/subscriptions?customer=${encodeURIComponent(customer.id)}&status=all&limit=100`
    );
    if (!subscriptionResponse.ok) continue;
    const subscriptions = (await subscriptionResponse.json()).data || [];
    const active = subscriptions.find((subscription) => subscriptionGrantsAccess(subscription, env));
    if (active) return { customer: customer.id, subscription: active.id };
  }
  return null;
}

async function createLoginToken(env, member) {
  const now = Math.floor(Date.now() / 1000);
  const payload = encodeBase64Url(JSON.stringify({
    ...member,
    purpose: "member-login",
    nonce: crypto.randomUUID(),
    issued: now,
    expires: now + LOGIN_LINK_SECONDS
  }));
  const signature = await sign(payload, stripeKey(env));
  return `${payload}.${signature}`;
}

async function readLoginToken(env, token) {
  const separator = token.lastIndexOf(".");
  if (separator < 1) return null;
  const payload = token.slice(0, separator);
  const provided = token.slice(separator + 1);
  const expected = await sign(payload, stripeKey(env));
  if (!constantTimeEqual(provided, expected)) return null;

  try {
    const login = JSON.parse(decodeBase64Url(payload));
    const now = Math.floor(Date.now() / 1000);
    if (
      login.purpose !== "member-login" ||
      !login.customer ||
      !login.subscription ||
      !login.email ||
      !login.nonce ||
      login.expires <= now ||
      login.issued > now + 60
    ) return null;
    return login;
  } catch {
    return null;
  }
}

async function sendSignInEmail({ env, email, origin, token }) {
  const loginUrl = `${origin}/login/verify?token=${encodeURIComponent(token)}`;
  const nonce = JSON.parse(decodeBase64Url(token.slice(0, token.lastIndexOf(".")))).nonce;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `ogallala-login-${nonce}`
    },
    body: JSON.stringify({
      from: "Ogallala Aquifer Tracker <welcome@members.ogallalatracker.com>",
      to: [email],
      subject: "Your secure Ogallala Tracker sign-in link",
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#17201c;max-width:620px;margin:auto">
          <p style="color:#80652f;font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase">Ogallala Aquifer Tracker · Subscriber Access</p>
          <h1 style="font-family:Georgia,serif;color:#07110f">Your secure sign-in link</h1>
          <p>Use the button below to enter your subscriber portal. This link expires in 15 minutes.</p>
          <p><a href="${escapeHtml(loginUrl)}" style="display:inline-block;padding:14px 20px;border-radius:8px;background:#173c27;color:#fff;text-decoration:none;font-weight:700">Open the Subscriber Portal</a></p>
          <p style="font-size:13px;color:#5c6761">If you did not request this email, you can safely ignore it.</p>
        </div>`,
      text: `Use this secure link to enter the Ogallala Aquifer Tracker subscriber portal. It expires in 15 minutes:\n\n${loginUrl}\n\nIf you did not request this email, you can safely ignore it.`
    })
  });
  if (!response.ok) throw new Error("Resend rejected the sign-in email.");
}

async function loginRequestRecentlyMade(request, email) {
  if (typeof caches === "undefined") return false;
  try {
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const digest = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(`${ip}:${email.toLowerCase()}`)
    );
    const key = encodeBase64Url(new Uint8Array(digest));
    const cache = caches.default;
    const cacheRequest = new Request(`${new URL(request.url).origin}/__login-rate/${key}`);
    if (await cache.match(cacheRequest)) return true;
    await cache.put(cacheRequest, new Response("1", {
      headers: { "Cache-Control": "public, max-age=60" }
    }));
    return false;
  } catch (error) {
    console.error("Sign-in rate limit cache was unavailable.", error);
    return false;
  }
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

function normalizeEmail(value) {
  const email = typeof value === "string" ? value.trim() : "";
  if (email.length < 3 || email.length > 320) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)) return null;
  return email;
}

function subscriptionGrantsAccess(subscription, env) {
  const trackerPrice = env.STRIPE_PRICE_ID || DEFAULT_PRICE_ID;
  return Boolean(
    subscription &&
    ALLOWED_STATUSES.has(subscription.status) &&
    subscription.items?.data?.some((item) => item.price?.id === trackerPrice)
  );
}

function stripeKey(env) {
  const priceId = env.STRIPE_PRICE_ID || DEFAULT_PRICE_ID;
  return priceId === LIVE_PRICE_ID ? env.STRIPE_LIVE_SECRET_KEY : env.STRIPE_SECRET_KEY;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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
    .secondary { color: #f7f3e8; background: transparent; border: 1px solid #8d7445; }
    .divider { margin: 24px 0 14px; color: #aeb8b2; font-size: 14px; text-align: center; }
    label { display: block; margin: 24px 0 8px; color: #f7f3e8; font-weight: 700; }
    input[type="email"] { width: 100%; padding: 15px 16px; border: 1px solid #718178; border-radius: 8px; color: #07110f; background: #fff; font-size: 17px; }
    input[type="email"]:focus { outline: 3px solid #d6bb75; outline-offset: 2px; }
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
    <div class="divider">Already a subscriber?</div>
    <a class="button secondary" href="/login">Email Me a Secure Sign-In Link</a>
  `);
}

function welcomePage(emailSent = false) {
  return layout(`
    <p class="eyebrow">Membership started</p>
    <span class="verified">Stripe membership verified</span>
    <h1>Welcome to the Tracker</h1>
    <p>Your seven-day free trial has started, and your secure subscriber session is ready.</p>
    ${emailSent ? '<p class="trial">Your welcome email is on its way.</p>' : ""}
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
    <h1>Return to the Tracker</h1>
    <p>Enter the email address used for your subscription. We will email you a secure sign-in link.</p>
    <form method="post" action="/login">
      <label for="email">Subscription email</label>
      <input id="email" name="email" type="email" autocomplete="email" inputmode="email" required maxlength="320">
      <button type="submit" style="margin-top:16px">Send My Sign-In Link</button>
    </form>
    <a class="button secondary" style="margin-top:14px" href="/">Return to Membership</a>
    <p class="fine">For your privacy, the page gives the same response whether or not an email address is registered.</p>
  `);
}

function checkEmailPage() {
  return layout(`
    <p class="eyebrow">Secure sign-in</p>
    <h1>Check your email</h1>
    <p>If that address belongs to an active subscriber or free trial, a secure sign-in link is on its way.</p>
    <p class="trial">The link expires in 15 minutes.</p>
    <a class="button" href="/login">Try Another Email</a>
    <a class="button secondary" style="margin-top:14px" href="/">Return to Membership</a>
  `);
}

function expiredLinkPage() {
  return layout(`
    <p class="eyebrow">Secure sign-in</p>
    <h1>This link is invalid or has expired.</h1>
    <p>Request a fresh sign-in email to continue.</p>
    <a class="button" href="/login">Send a New Sign-In Link</a>
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
