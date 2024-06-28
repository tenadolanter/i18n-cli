const chai = require("chai");
const assert = chai.assert;
const transformJs = require("../src/core/transform/transformJs.js");
const defaultOption = require("../src/core/config.js");
describe("vue的js语法", () => {
  it("vue的js代码里面的装饰器", () => {
    let sourceCode = 'export default {\n methods: {\n@debounce()\nhandlerChange(){},\n}};';
    const option = {
      ...defaultOption,
      needImport: false,
      isWritingFile: false,
      isVueTemplate: false,
      isVueScript: true,
      isTsx: true,
    }
    const { code } = transformJs({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = "export default {\n  methods: {\n    @debounce()\n    handlerChange() {}\n  }\n};";
    assert.equal(sourceCode, resultCode);
  })
})