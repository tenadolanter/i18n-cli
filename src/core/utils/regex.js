module.exports = {
  // 匹配中文字符
  chineseChar: /[\u4e00-\u9fa5]/,
  htmlChineseChar: /[\u4e00-\u9fa5]+/g,
  // 匹配带大写字母的标签，如<Test>、<abcTest>、</abcTest>、<abcTest />
  // <Test originType="WORKSPACE" :goalItem="goalItem" aibvTsts NameHdd></Test>
  // <abcTest originType="WORKSPACE" :goalItem="goalItem"></abcTest>
  // <abcTest />
  // <Test
  //  originType="WORKSPACE"
  //  :goalItem="goalItem"
  //  aibvTsts
  //  NameHdd
  // ></Test>
  htmlTagWidthUppercaseChar: /(<\/?)(([a-z][a-z0-9-]+)?[A-Z][a-zA-Z0-9-]*)/g,
  // 匹配所有包含大写字母的属性
  htmlAttributeWidthUppercaseChar: /(?<=\s|^)((@?)(:?)([a-z][a-z0-9-]+)?[A-Z][a-zA-Z0-9-]*)(?=[=\s>])/g,
  // 匹配自闭和标签
  htmlAutoCloseTag: /<([a-z][a-z0-9-]+)(?:[^>]*?)?\/>/g,
  // 匹配<template或</template
  htmlTemplateTag: /(<\/?)(template)/g,
  htmlTemplateStartTag: /(<template)/g,
  htmlTemplateEndTag: /(<\/template)/g,
  // 匹配html闭和标签
  htmlTagAutoClose: /<\/?.+?>/g,
}