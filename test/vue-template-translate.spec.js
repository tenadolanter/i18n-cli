const chai = require("chai");
const assert = chai.assert;
const transformHtml = require("../src/core/transform/transformHtml.js");
const defaultOption = require("../src/core/config.js");
describe("vue的template里的翻译", () => {
  it("属性的翻译", () => {
    let sourceCode = `<Test name="测试"></Test>`;
    const option = {
      ...defaultOption,
    }
    sourceCode = transformHtml({}, {}, '', sourceCode, option, false, true);
    const resultCode = `<Test :name="$t('ce-shi')"></Test>`;
    assert.equal(sourceCode, resultCode);
  })
  it("内容的翻译", () => {
    let sourceCode = `<Test>测试</Test>`;
    const option = {
      ...defaultOption,
    }
    sourceCode = transformHtml({}, {}, '', sourceCode, option, false, true);
    const resultCode = `<Test>{{$t('ce-shi')}}</Test>`;
    assert.equal(sourceCode, resultCode);
  })
  it("属性内容的翻译", () => {
    let sourceCode = `<Test name="测试">测试</Test>`;
    const option = {
      ...defaultOption,
    }
    sourceCode = transformHtml({}, {}, '', sourceCode, option, false, true);
    const resultCode = `<Test :name="$t('ce-shi')">{{$t('ce-shi')}}</Test>`;
    assert.equal(sourceCode, resultCode);
  })
})