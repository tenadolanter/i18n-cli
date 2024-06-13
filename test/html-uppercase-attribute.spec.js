const chai = require("chai");
const assert = chai.assert;
const transformHtml = require("../src/core/transform/transformHtml.js");
const defaultOption = require("../src/core/config.js");
describe("html大写属性", () => {
  it("标签为大写，属性为小写", () => {
    let sourceCode = '<Test name="test"></Test>';
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
    }
    const { code } =  transformHtml({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = '<Test name="test"></Test>';
    assert.equal(sourceCode, resultCode);
  })
  it("标签为大写，属性为大写", () => {
    let sourceCode = '<Test Name="test"></Test>';
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
    }
    const { code } =  transformHtml({}, {}, '', sourceCode, option, false);
    sourceCode = code
    const resultCode = '<Test Name="test"></Test>';
    assert.equal(sourceCode, resultCode);
  })
  it("标签为大写，属性为大写和小写混合", () => {
    let sourceCode = '<Test Name="test" sex="nan"></Test>';
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
    }
    const { code } =  transformHtml({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = '<Test Name="test" sex="nan"></Test>';
    assert.equal(sourceCode, resultCode);
  })
  it("标签为小写，属性为大写", () => {
    let sourceCode = '<test Name="test"></test>';
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
    }
    const { code } =  transformHtml({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = '<test Name="test"></test>';
    assert.equal(sourceCode, resultCode);
  })
  it("标签为小写，属性为小写", () => {
    let sourceCode = '<test sex="nan"></test>';
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
    }
    const { code } =  transformHtml({}, {}, '', sourceCode, option);
    const resultCode = '<test sex="nan"></test>';
    assert.equal(sourceCode, resultCode);
  })
  it("标签为小写，属性为大写和小写混合", () => {
    let sourceCode = '<test Name="test" sex="nan"></test>';
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
    }
    const { code } =  transformHtml({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = '<test Name="test" sex="nan"></test>';
    assert.equal(sourceCode, resultCode);
  })
})