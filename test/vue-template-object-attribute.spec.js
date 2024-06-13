const chai = require("chai");
const assert = chai.assert;
const transformHtml = require("../src/core/transform/transformHtml.js");
const defaultOption = require("../src/core/config.js");
describe("vue的template里的属性为对象", () => {
  it("v-tooltip翻译", () => {
    let sourceCode = `<div v-tooltip.top="{ value: '测试', class: 'chart-item-title-tooltip', }">暂无数据</div>`;
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
    }
    const { code } =  transformHtml({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = `<div v-tooltip.top="{\n  value: $t('ce-shi'),\n  class: 'chart-item-title-tooltip'\n}">{{$t('zan-wu-shu-ju')}}</div>`;
    assert.equal(sourceCode, resultCode);
  })
  it("表单rules属性翻译", () => {
    let sourceCode = `<form-item :rules="{ required: true, message: '请输入名称', trigger: 'blur' }"></form-item>`;
    const option = {
      ...defaultOption,
      isWritingFile: false,
      isVueTemplate: true,
      isTsx: false,
    }
    const { code } =  transformHtml({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = `<form-item :rules="{\n  required: true,\n  message: $t('qing-shu-ru-ming-cheng'),\n  trigger: 'blur'\n}"></form-item>`;
    assert.equal(sourceCode, resultCode);
  })
})