const chai = require("chai");
const assert = chai.assert;
const transformHtml = require("../src/core/transform/transformHtml.js");
const defaultOption = require("../src/core/config.js");
describe("html自闭和标签", () => {
  it("html自闭和标签，大写标签", () => {
    let sourceCode = '<Test />';
    const option = {
      ...defaultOption,
    }
    sourceCode = transformHtml({}, {}, '', sourceCode, option, false, true);
    const resultCode = '<Test></Test>';
    assert.equal(sourceCode, resultCode);
  })
  it("html自闭和标签，小写标签", () => {
    let sourceCode = '<test />';
    const option = {
      ...defaultOption,
    }
    sourceCode = transformHtml({}, {}, '', sourceCode, option, false, true);
    const resultCode = '<test></test>';
    assert.equal(sourceCode, resultCode);
  })
  it("html自闭和标签，大写标签, 带属性", () => {
    let sourceCode = '<Test Name="test" sex="nan" />';
    const option = {
      ...defaultOption,
    }
    sourceCode = transformHtml({}, {}, '', sourceCode, option, false, true);
    const resultCode = '<Test Name="test" sex="nan"></Test>';
    assert.equal(sourceCode, resultCode);
  })
  it("html自闭和标签，小写标签, 带属性", () => {
    let sourceCode = '<test Name="test" sex="nan" />';
    const option = {
      ...defaultOption,
    }
    sourceCode = transformHtml({}, {}, '', sourceCode, option, false, true);
    const resultCode = '<test Name="test" sex="nan"></test>';
    assert.equal(sourceCode, resultCode);
  })
})