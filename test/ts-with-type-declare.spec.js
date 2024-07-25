const chai = require("chai");
const assert = chai.assert;
const transformTs = require("../src/core/transform/transformTs.js");
const defaultOption = require("../src/core/config.js");
describe("带类型声明的ts语法", () => {
  it("ts的类型声明，英文", () => {
    let sourceCode = "type Status = 'create' | 'save';";
    const option = {
      ...defaultOption,
      needImport: false,
      isWritingFile: false,
      isVueTemplate: false,
      isTsx: false,
    }
    const { code } = transformTs({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = "type Status = 'create' | 'save';";
    assert.equal(sourceCode, resultCode);
  })
  it("ts的类型声明，中文", () => {
    let sourceCode = "type Status = '已审核' | '审核中';";
    const option = {
      ...defaultOption,
      needImport: false,
      isWritingFile: false,
      isVueTemplate: false,
      isTsx: false,
    }
    const { code } = transformTs({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = "type Status = '已审核' | '审核中';";
    assert.equal(sourceCode, resultCode);
  })
})