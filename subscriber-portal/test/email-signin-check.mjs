import assert from "node:assert/strict";
import worker from "../src/secure-index.js";

const calls = [];
const originalFetch = globalThis.fetch;

globalThis.fetch = async (input, options = {}) => {
  const url = String(input);
  calls.push({ url, options });
  if (url.includes("/v1/customers?")) {
    if (url.includes("unknown%40example.com")) return Response.json({ data: [] });
    if (url.includes("wrong%40example.com")) return Response.json({ data: [{ id: "cus_wrong" }] });
    return Response.json({ data: [{ id: "cus_member" }] });
  }
  if (url.includes("/v1/subscriptions?")) {
    if (url.includes("cus_wrong")) {
      return Response.json({ data: [{
        id: "sub_wrong",
        status: "active",
        items: { data: [{ price: { id: "price_other" } }] }
      }] });
    }
    return Response.json({ data: [{
      id: "sub_member",
      status: "trialing",
      items: { data: [{ price: { id: "price_test" } }] }
    }] });
  }
  if (url.includes("/v1/subscriptions/sub_member")) {
    return Response.json({
      id: "sub_member",
      customer: "cus_member",
      status: "trialing",
      items: { data: [{ price: { id: "price_test" } }] }
    });
  }
  if (url === "https://api.resend.com/emails") {
    return Response.json({ id: "email_sent" });
  }
  throw new Error(`Unexpected request: ${url}`);
};

try {
  const env = {
    STRIPE_PRICE_ID: "price_test",
    STRIPE_SECRET_KEY: "stripe-test-secret",
    RESEND_API_KEY: "resend-test-secret"
  };

  const home = await worker.fetch(new Request("https://members.example/"), env);
  assert.match(await home.text(), /Email Me a Secure Sign-In Link/);

  const request = await worker.fetch(new Request("https://members.example/login", {
    method: "POST",
    body: new URLSearchParams({ email: "Subscriber@Example.com" })
  }), env);
  assert.equal(request.status, 200);
  assert.match(await request.text(), /Check your email/);

  const resend = calls.find((call) => call.url === "https://api.resend.com/emails");
  assert.ok(resend, "The secure sign-in email should be sent.");
  const email = JSON.parse(resend.options.body);
  assert.deepEqual(email.to, ["Subscriber@Example.com"]);
  assert.equal(email.from, "Ogallala Aquifer Tracker <welcome@members.ogallalatracker.com>");
  assert.match(email.text, /expires in 15 minutes/);

  const sentBeforePrivacyChecks = calls.filter((call) => call.url === "https://api.resend.com/emails").length;
  for (const address of ["unknown@example.com", "wrong@example.com"]) {
    const privacyResponse = await worker.fetch(new Request("https://members.example/login", {
      method: "POST",
      body: new URLSearchParams({ email: address })
    }), env);
    assert.equal(privacyResponse.status, 200);
    assert.match(await privacyResponse.text(), /Check your email/);
  }
  assert.equal(
    calls.filter((call) => call.url === "https://api.resend.com/emails").length,
    sentBeforePrivacyChecks,
    "Unknown emails and subscriptions for other products must not receive a sign-in link."
  );

  const match = email.text.match(/login\/verify\?token=([^\s]+)/u);
  assert.ok(match, "The email should contain a signed login token.");
  const verify = await worker.fetch(new Request(
    `https://members.example/login/verify?token=${match[1]}`
  ), env);
  assert.equal(verify.status, 303);
  assert.equal(verify.headers.get("Location"), "https://members.example/members");
  assert.match(verify.headers.get("Set-Cookie") || "", /^ogallala_member=/u);

  const badToken = await worker.fetch(new Request(
    "https://members.example/login/verify?token=invalid"
  ), env);
  assert.equal(badToken.status, 403);

  console.log("Returning-subscriber email sign-in checks passed.");
} finally {
  globalThis.fetch = originalFetch;
}
