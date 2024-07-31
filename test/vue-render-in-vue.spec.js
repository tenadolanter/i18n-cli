const chai = require("chai");
const assert = chai.assert;
const transformJs = require("../src/core/transform/transformJs.js");
const defaultOption = require("../src/core/config.js");
describe("vue的js里面的render函数", () => {
  it("vue的js里面的render函数基础使用", () => {
    let sourceCode = 'export default {\n render() {\n return <div>123</div>;\n} \n};';
    const option = {
      ...defaultOption,
      needImport: false,
      isWritingFile: false,
      isVueTemplate: false,
      isVueScript: true,
      isTsx: false,
    }
    const { code } = transformJs({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = "export default {\n  render() {\n    return <div>123</div>;\n  }\n};";
    assert.equal(sourceCode, resultCode);
  })
  it("vue的ts里面的render函数基础使用", () => {
    let sourceCode = 'export default {\n render() {\n return <div>123</div>;\n} \n};';
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
    const resultCode = "export default {\n  render() {\n    return <div>123</div>;\n  }\n};";
    assert.equal(sourceCode, resultCode);
  })
  it("vue的js里面的render函数作为组件", () => {
    let sourceCode = 'export default { components: { "helloWord": { functional: true, render(h) { return h("div", "姓名");} } } };';
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
    const resultCode = `export default {\n  components: {\n    \"helloWord\": {\n      functional: true,\n      render(h) {\n        return h("div", t('xing-ming'));\n      }\n    }\n  }\n};`;
    assert.equal(sourceCode, resultCode);
  })
})