const assert = require("assert");
const { useCleanEffect } = require("./dist/main");

assert.equal(typeof useCleanEffect, "function");

console.log("OK!");
