const chai = require("chai");
const assert = chai.assert;
const transformHtml = require("../src/core/transform/transformHtml.js");
const defaultOption = require("../src/core/config.js");
describe("再次转换", () => {
  it("html属性内容再次翻译", () => {
    let sourceCode = `<Test :name="$t('ce-shi')">{{$t('ce-shi')}}</Test>`;
    const option = {
      ...defaultOption,
    }
    const { code } =  transformHtml({}, {}, '', sourceCode, option, false, true);
    sourceCode = code
    const resultCode = `<Test :name="$t('ce-shi')">{{$t('ce-shi')}}</Test>`;
    assert.equal(sourceCode, resultCode);
  })
})