const assert = require("assert");
const { useCleanEffect } = require("./dist");

assert.equal(typeof useCleanEffect, "function");

console.log("OK!");
