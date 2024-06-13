const chai = require("chai");
const assert = chai.assert;
const transformHtml = require("../src/core/transform/transformHtml.js");
const defaultOption = require("../src/core/config.js");
describe("html的Form和FormItem标签转换", () => {
  it("html的Form和FormItem", () => {
    let sourceCode = '<Form><FormItem>你好</FormItem></Form>';
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
    }
    const { code } = transformHtml({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = "<Form><FormItem>{{$t('ni-hao')}}</FormItem></Form>";
    assert.equal(sourceCode, resultCode);
  })
})