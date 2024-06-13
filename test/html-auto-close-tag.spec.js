const chai = require("chai");
const assert = chai.assert;
const transformHtml = require("../src/core/transform/transformHtml.js");
const defaultOption = require("../src/core/config.js");
describe("html自闭和标签", () => {
  it("html自闭和标签，大写标签", () => {
    let sourceCode = '<Test />';
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
    }
    const { code } = transformHtml({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = '<Test></Test>';
    assert.equal(sourceCode, resultCode);
  })
  it("html自闭和标签，小写标签", () => {
    let sourceCode = '<test />';
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
    }
    const { code } = transformHtml({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = '<test></test>';
    assert.equal(sourceCode, resultCode);
  })
  it("html自闭和标签，大写标签, 带属性", () => {
    let sourceCode = '<Test Name="test" sex="nan" />';
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
    }
    const { code } = transformHtml({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = '<Test Name="test" sex="nan"></Test>';
    assert.equal(sourceCode, resultCode);
  })
  it("html自闭和标签，小写标签, 带属性", () => {
    let sourceCode = '<test Name="test" sex="nan" />';
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
    }
    const { code } = transformHtml({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = '<test Name="test" sex="nan"></test>';
    assert.equal(sourceCode, resultCode);
  })
  it("html自闭和标签，单个标签", () => {
    let sourceCode = '<i Name="test" sex="nan" />';
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
    }
    const { code } = transformHtml({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = '<i Name="test" sex="nan"></i>';
    assert.equal(sourceCode, resultCode);
  })
  it("html自闭和标签，标签里面有大于号", () => {
    let sourceCode = '<i v-if="test > 10" />';
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
    }
    const { code } = transformHtml({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = '<i v-if="test > 10"></i>';
    assert.equal(sourceCode, resultCode);
  })
  it("html自闭和标签，标签里面有小于号", () => {
    let sourceCode = '<i v-if="test < 10" />';
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
    }
    const { code } = transformHtml({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = '<i v-if="test < 10"></i>';
    assert.equal(sourceCode, resultCode);
  })
})