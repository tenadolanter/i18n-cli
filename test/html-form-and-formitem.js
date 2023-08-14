const chai = require("chai");
const assert = chai.assert;
const transformHtml = require("../src/core/transform/transformHtml.js");
const defaultOption = require("../src/core/config.js");
describe("html的Form和FormItem标签转换", () => {
  it("html的Form和FormItem", () => {
    let sourceCode = '<Form><FormItem>你好</FormItem></Form>';
    const option = {
      ...defaultOption,
    }
    const { code } = transformHtml({}, {}, '', sourceCode, option, false, true);
    sourceCode = code
    const resultCode = "<Form><FormItem>{{$t('ni-hao')}}</FormItem></Form>";
    assert.equal(sourceCode, resultCode);
  })
})