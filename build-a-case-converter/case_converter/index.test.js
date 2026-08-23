const  assert = require("node:assert/strict");
const caseConverter = require("./index");

assert.strictEqual(
    caseConverter.getUpperCase("hello free code camp!"), "HELLO FREE CODE CAMP!"
);
assert.strictEqual(
    caseConverter.getLowerCase("hello free code camp!"), "hello free code camp!"
);
assert.strictEqual(
    caseConverter.getProperCase("hello free code camp!"), "Hello Free Code Camp!"
);
assert.strictEqual(
    caseConverter.getSentenceCase("hello free code camp!"), "Hello free code camp!"
);