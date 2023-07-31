const chai = require("chai");
const assert = chai.assert;
const transformJs = require("../src/core/transform/transformJs.js");
const defaultOption = require("../src/core/config.js");
describe("配置里的ignoreMethods属性", () => {
  it("console.log里的内容不需要翻译", () => {
    let sourceCode = `console.log("测试")`;
    const option = {
      ...defaultOption,
      ignoreMethods: ['console.log'],
    }
    const { code } =  transformJs({}, {}, '', sourceCode, option, false, true);
    sourceCode = code
    const resultCode = `console.log("测试");`;
    assert.equal(sourceCode, resultCode);
  })
})