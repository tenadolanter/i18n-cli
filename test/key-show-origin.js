const chai = require("chai");
const assert = chai.assert;
const transformHtml = require("../src/core/transform/transformHtml.js");
const transformTs = require("../src/core/transform/transformTs.js");
const defaultOption = require("../src/core/config.js");
describe("显示翻译原始值", () => {
  it("html里面显示翻译原始值", () => {
    let sourceCode = '<Form><FormItem>你好</FormItem></Form>';
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
      keyShowOrigin: true,
    }
    const { code } = transformHtml({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = "<Form><FormItem>{{$t('ni-hao','你好')}}</FormItem></Form>";
    assert.equal(sourceCode, resultCode);
  })
  it("html里面模板字面量显示翻译原始值", () => {
    let sourceCode = '<Test>{{`你好${a}${b}`}}</Test>';
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
      keyShowOrigin: true,
    }
    const { code } = transformHtml({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = "<Test>{{$t('ni-hao-01', [a, b], '你好{0}{1}')}}</Test>";
    assert.equal(sourceCode, resultCode);
  })
  it("ts里面显示翻译原始值", () => {
    let sourceCode = 'const text = `${a1}测试${a2}${a3}${a4}哈哈`;';
    const option = {
      ...defaultOption,
      needImport: false,
      isWritingFile: false,
      isVueTemplate: false,
      isTsx: false,
      keyShowOrigin: true,
    }
    const { code } = transformTs({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = "const text = t('0-ce-shi-123-ha-ha', [a1, a2, a3, a4], '{0}测试{1}{2}{3}哈哈');";
    assert.equal(sourceCode, resultCode);
  })
})