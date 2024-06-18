const chai = require("chai");
const assert = chai.assert;
const transformHtml = require("../src/core/transform/transformHtml.js");
const transformTs = require("../src/core/transform/transformTs.js");
const defaultOption = require("../src/core/config.js");
describe("函数里面的中文的转换", () => {
  it("js里面函数的中文参数", () => {
    let sourceCode = `this.$confirm('确定吗', '提示');`;
    const option = {
      ...defaultOption,
      needImport: false,
      isWritingFile: false,
      isVueTemplate: false,
      isTsx: false,
    }
    const { code } =  transformTs({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = `this.$confirm(t('que-ding-ma'), t('ti-shi'));`;
    assert.equal(sourceCode, resultCode);
  })
  it("html里面函数的中文参数", () => {
    let sourceCode = `<Flex @click="handlerNode('哈哈')"></Flex>`;
    const option = {
      ...defaultOption,
      needImport: false,
      isWritingFile: false,
      isVueTemplate: false,
      isTsx: false,
    }
    const { code } =  transformHtml({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = `<Flex @click="handlerNode('哈哈')"></Flex>`;
    assert.equal(sourceCode, resultCode);
  })
})