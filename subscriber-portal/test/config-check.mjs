import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../src/index.js", import.meta.url), "utf8");
const secureSource = await readFile(new URL("../src/secure-index.js", import.meta.url), "utf8");

assert.match(source, /managed_payments\[enabled\][\s\S]*false/);
assert.match(source, /trial_period_days[\s\S]*7/);
assert.match(source, /automatic_tax\[enabled\][\s\S]*false/);
assert.doesNotMatch(source, /sk_(test|live)_/);
assert.match(secureSource, /https:\/\/api\.resend\.com\/emails/);
assert.match(secureSource, /welcome@members\.ogallalatracker\.com/);
assert.match(secureSource, /Idempotency-Key/);
assert.match(secureSource, /customer_details\?\.email/);
assert.doesNotMatch(secureSource, /\b(?:re|sk)_(?:test_|live_)?[A-Za-z0-9]{12,}/);

console.log("Subscriber portal configuration checks passed.");
