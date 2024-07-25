const chai = require("chai");
const assert = chai.assert;
const transformTs = require("../src/core/transform/transformTs.js");
const defaultOption = require("../src/core/config.js");
describe("react或vue里面的ts语法", () => {
  it("ts强制类型转换", () => {
    let sourceCode = 'const getPerson = (person: Person) => { return <Person>{ name: "test" } };';
    const option = {
      ...defaultOption,
      needImport: false,
      isWritingFile: false,
      isVueTemplate: false,
      isTsx: false,
    }
    const { code } = transformTs({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = 'const getPerson = (person: Person) => {\n  return <Person> {\n    name: "test"\n  };\n};';
    assert.equal(sourceCode, resultCode);
  })
  it("ts类型注解", () => {
    let sourceCode = 'const getPerson:any = "this is a string";';
    const option = {
      ...defaultOption,
      needImport: false,
      isWritingFile: false,
      isVueTemplate: false,
      isTsx: false,
    }
    const { code } = transformTs({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = 'const getPerson: any = "this is a string";';
    assert.equal(sourceCode, resultCode);
  })
  it("ts高级类型", () => {
    let sourceCode = 'function extend<T, U>(first: T, second: U): T & U {}';
    const option = {
      ...defaultOption,
      needImport: false,
      isWritingFile: false,
      isVueTemplate: false,
      isTsx: false,
    }
    const { code } = transformTs({}, {}, '', sourceCode, option);
    sourceCode = code
    const resultCode = 'function extend<T, U>(first: T, second: U): T & U {}';
    assert.equal(sourceCode, resultCode);
  })
})