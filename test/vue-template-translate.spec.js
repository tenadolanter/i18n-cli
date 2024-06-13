const chai = require("chai");
const assert = chai.assert;
const transformHtml = require("../src/core/transform/transformHtml.js");
const defaultOption = require("../src/core/config.js");
describe("vue的template里的翻译", () => {
  it("属性的翻译", () => {
    let sourceCode = `<Test name="测试"></Test>`;
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
    }
    const { code } =  transformHtml({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = `<Test :name="$t('ce-shi')"></Test>`;
    assert.equal(sourceCode, resultCode);
  })
  it("内容的翻译", () => {
    let sourceCode = `<Test>测试</Test>`;
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
    }
    const { code } =  transformHtml({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = `<Test>{{$t('ce-shi')}}</Test>`;
    assert.equal(sourceCode, resultCode);
  })
  it("属性内容的翻译", () => {
    let sourceCode = `<Test name="测试">测试</Test>`;
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
    }
    const { code } =  transformHtml({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = `<Test :name="$t('ce-shi')">{{$t('ce-shi')}}</Test>`;
    assert.equal(sourceCode, resultCode);
  })
  it("嵌套template的情况", () => {
    let sourceCode = `\n  <div class="empty-data">\n    <template>\n      <div class="empty-image-wrap">\n        <img class="empty-image" :src="emptyImage">\n      </div>\n      <div class="empty-title">暂无数据</div>\n    </template>\n  </div>\n`;
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
    }
    const { code } =  transformHtml({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = `<div class="empty-data">\n    <template>\n      <div class="empty-image-wrap">\n        <img class="empty-image" :src="emptyImage">\n      </div>\n      <div class="empty-title">{{$t('zan-wu-shu-ju')}}</div>\n    </template>\n  </div>\n`;
    assert.equal(sourceCode, resultCode);
  })
})