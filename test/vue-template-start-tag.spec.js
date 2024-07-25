const chai = require("chai");
const assert = chai.assert;
const transformVue = require("../src/core/transform/transformVue.js");
const defaultOption = require("../src/core/config.js");
describe("vue的template里tag为template开始的标签", () => {
  it("以template开始的标签", () => {
    let sourceCode = `<template>\n  <template-set-select />\n</template><script lang="ts"></script>`;
    const option = {
      ...defaultOption,
      isWritingFile: false,
    }
    const { code } =  transformVue({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = `<template>\n  <template-set-select />\n</template><script lang="ts"></script>`;
    assert.equal(sourceCode, resultCode);
  })
})