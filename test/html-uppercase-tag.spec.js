const chai = require("chai");
const assert = chai.assert;
const transformHtml = require("../src/core/transform/transformHtml.js");
const defaultOption = require("../src/core/config.js");
describe("html大写标签", () => {
  it("html标签包含大写的时候，转换之后不应该被转换为小写", () => {
    let sourceCode = '<Test></Test>';
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
    }
    const { code } =  transformHtml({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = '<Test></Test>';
    assert.equal(sourceCode, resultCode);
  })
})