const DEFAULT_PRICE_ID = "price_1UDtXDAhqvqGsdlQGboki05S";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/") {
      return htmlResponse(homePage());
    }

    if (request.method === "POST" && url.pathname === "/checkout") {
      return createCheckout(request, env);
    }

    if (request.method === "GET" && url.pathname === "/welcome") {
      return htmlResponse(welcomePage());
    }

    return new Response("Page not found", { status: 404 });
  }
};

async function createCheckout(request, env) {
  if (!env.STRIPE_SECRET_KEY) {
    return htmlResponse(setupPage(), 503);
  }

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

  const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: form
  });

  if (!stripeResponse.ok) {
    const stripeError = await stripeResponse.text();
    console.error("Stripe Checkout could not be created.", stripeError);
    return htmlResponse(errorPage(), 502);
  }

  const session = await stripeResponse.json();
  return Response.redirect(session.url, 303);
}

function layout(content) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Ogallala Aquifer Tracker Membership</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 28px; color: #f7f3e8; background: #07110f; font-family: Arial, Helvetica, sans-serif; }
    main { width: min(680px, 100%); padding: 44px; border: 1px solid #8d7445; border-radius: 18px; background: #101d19; box-shadow: 0 20px 60px #0008; }
    .eyebrow { margin: 0 0 12px; color: #d6bb75; font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
    h1 { margin: 0 0 18px; font-family: Georgia, serif; font-size: clamp(34px, 7vw, 54px); line-height: 1.02; }
    p { color: #d7ddd8; font-size: 18px; line-height: 1.6; }
    .price { margin: 28px 0 8px; color: #fff; font-size: 30px; font-weight: 700; }
    .trial { margin: 0 0 28px; color: #d6bb75; font-weight: 700; }
    button, .button { display: inline-block; width: 100%; padding: 16px 22px; border: 0; border-radius: 9px; color: #07110f; background: #d6bb75; font-size: 17px; font-weight: 800; text-align: center; text-decoration: none; cursor: pointer; }
    .fine { margin: 18px 0 0; color: #aeb8b2; font-size: 13px; }
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
    <form method="post" action="/checkout">
      <button type="submit">Start My 7-Day Free Trial</button>
    </form>
    <p class="fine">A payment method is required. You will not be charged until the trial ends. Cancel before then to avoid a charge.</p>
  `);
}

function welcomePage() {
  return layout(`
    <p class="eyebrow">Membership started</p>
    <h1>Welcome to the Tracker</h1>
    <p>Your seven-day free trial has started. We are now preparing your secure subscriber access.</p>
    <a class="button" href="/">Return to Membership</a>
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

function htmlResponse(content, status = 200) {
  return new Response(content, {
    status,
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'"
    }
  });
}
