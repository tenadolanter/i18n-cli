const chai = require("chai");
const assert = chai.assert;
const transformHtml = require("../src/core/transform/transformHtml.js");
const transformJs = require("../src/core/transform/transformJs.js");
const defaultOption = require("../src/core/config.js");
describe("i18n-disable", () => {
  it("html里面使用i18n-disable忽略翻译", () => {
    let sourceCode = `<div class="wrap">\n<!-- i18n-disable -->\n<div>测试123</div>\n</div>`;
    const option = {
      ...defaultOption,
      ignoreMethods: ['console.log'],
    }
    const { code } =  transformHtml({}, {}, '', sourceCode, option, false, true);
    sourceCode = code
    const resultCode = `<div class="wrap">\n<!-- i18n-disable -->\n<div>测试123</div>\n</div>`;
    assert.equal(sourceCode, resultCode);
  })
})