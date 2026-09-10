import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../src/index.js", import.meta.url), "utf8");

assert.match(source, /managed_payments\[enabled\][\s\S]*false/);
assert.match(source, /trial_period_days[\s\S]*7/);
assert.match(source, /automatic_tax\[enabled\][\s\S]*false/);
assert.doesNotMatch(source, /sk_(test|live)_/);

console.log("Subscriber portal configuration checks passed.");
