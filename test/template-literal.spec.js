const chai = require("chai");
const assert = chai.assert;
const transformTs = require("../src/core/transform/transformTs.js");
const defaultOption = require("../src/core/config.js");
describe("模板字面量里面的参数", () => {
  it("模板字面量里面的参数1", () => {
    let sourceCode = 'const text = `${a1}测试${a2}${a3}${a4}哈哈`;';
    const option = {
      ...defaultOption,
      needImport: false,
      isWritingFile: false,
      isVueTemplate: false,
      isTsx: false,
    }
    const { code } = transformTs({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = "const text = t('0-ce-shi-123-ha-ha', [a1, a2, a3, a4]);";
    assert.equal(sourceCode, resultCode);
  })
  it("模板字面量里面的参数2", () => {
    let sourceCode = 'const text = `${a1}测试${a2}${a3}${a4}${a5}${a6}哈哈`;';
    const option = {
      ...defaultOption,
      needImport: false,
      isWritingFile: false,
      isVueTemplate: false,
      isTsx: false,
    }
    const { code } = transformTs({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = "const text = t('0-ce-shi-12345-ha-ha', [a1, a2, a3, a4, a5, a6]);";
    assert.equal(sourceCode, resultCode);
  })
  it("模板字面量转换结果验证", () => {
    let sourceCode = 'const text = `${a1}测试${a2}${a3}${a4}${a5}${a6}哈哈`;';
    let needTranslate = {}
    const option = {
      ...defaultOption,
      needImport: false,
      isWritingFile: false,
      isVueTemplate: false,
      isTsx: false,
    }
    transformTs({}, needTranslate, '', sourceCode, option);
    const resultValue = needTranslate['0-ce-shi-12345-ha-ha'];
    const expectValue = "{0}测试{1}{2}{3}{4}{5}哈哈";
    assert.equal(resultValue, expectValue);
  })
})