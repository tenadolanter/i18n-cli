const chai = require("chai");
const assert = chai.assert;
const transformTs = require("../src/core/transform/transformTs.js");
const defaultOption = require("../src/core/config.js");
describe("react的jsx语法", () => {
  it("jsx标签上的中文", () => {
    let sourceCode = 'const App = () => <Flex gap="小"></Flex>;';
    const option = {
      ...defaultOption,
      needImport: false,
      isWritingFile: false,
      isVueTemplate: false,
      isTsx: true,
    }
    const { code } = transformTs({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = "const App = () => <Flex gap={t('xiao')}></Flex>;";
    assert.equal(sourceCode, resultCode);
  })
  it("jsx标签上的带条件的中文", () => {
    let sourceCode = 'const App = () => <Flex wrap={ isTrue ? "哈哈1": "哈哈2" }></Flex>;';
    const option = {
      ...defaultOption,
      needImport: false,
      isWritingFile: false,
      isVueTemplate: false,
      isTsx: true,
    }
    const { code } = transformTs({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = "const App = () => <Flex wrap={isTrue ? t('ha-ha-1') : t('ha-ha-2')}></Flex>;";
    assert.equal(sourceCode, resultCode);
  })
  it("jsx里面的文本", () => {
    let sourceCode = 'const App = () => <Flex>测试</Flex>;';
    const option = {
      ...defaultOption,
      needImport: false,
      isWritingFile: false,
      isVueTemplate: false,
      isTsx: true,
    }
    const { code } = transformTs({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = "const App = () => <Flex>{t('ce-shi')}</Flex>;";
    assert.equal(sourceCode, resultCode);
  })
  it("jsx里面带条件的文本", () => {
    let sourceCode = 'const App = () => <Flex>{ isName ? "你好": "他好" }</Flex>;';
    const option = {
      ...defaultOption,
      needImport: false,
      isWritingFile: false,
      isVueTemplate: false,
      isTsx: true,
    }
    const { code } = transformTs({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = "const App = () => <Flex>{isName ? t('ni-hao') : t('ta-hao')}</Flex>;";
    assert.equal(sourceCode, resultCode);
  })
  it("jsx里面条件节点的文本", () => {
    let sourceCode = 'const App = () => <div>{true && <Input placeholder="你好"></Input>}</div>;';
    const option = {
      ...defaultOption,
      needImport: false,
      isWritingFile: false,
      isVueTemplate: false,
      isTsx: true,
    }
    const { code } = transformTs({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = "const App = () => <div>{true && <Input placeholder={t('ni-hao')}></Input>}</div>;";
    assert.equal(sourceCode, resultCode);
  })
})