const assert = require("node:assert/strict")
const primeNumberChecker = require("./index.js")

assert.strictEqual(
  primeNumberChecker.isPrime(23),
  true
);
assert.strictEqual(
  primeNumberChecker.isPrime(4),
  false
);
