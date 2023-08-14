const chai = require("chai");
const assert = chai.assert;
const transformHtml = require("../src/core/transform/transformHtml.js");
const defaultOption = require("../src/core/config.js");
describe("html的id属性", () => {
  it("属性为id时候不转换", () => {
    let sourceCode = '<Test id="你好"></Test>';
    const option = {
      ...defaultOption,
      ignoreAttributes: [...defaultOption.ignoreAttributes, "id"]
    }
    const { code } =  transformHtml({}, {}, '', sourceCode, option, false, true);
    sourceCode = code
    const resultCode = '<Test id="你好"></Test>';
    assert.equal(sourceCode, resultCode);
  })
  it("属性为id时候转换", () => {
    let sourceCode = '<Test id="你好"></Test>';
    const option = {
      ...defaultOption,
    }
    const { code } =  transformHtml({}, {}, '', sourceCode, option, false, true);
    sourceCode = code
    const resultCode = `<Test :id="$t('ni-hao')"></Test>`;
    assert.equal(sourceCode, resultCode);
  })
})