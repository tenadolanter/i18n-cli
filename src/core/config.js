// 默认的配置详情
module.exports =  {
  entry: ["src"],
  exclude: [],
  local: "zh-CN",
  localPath: "src/locales",
  langs: ["en-US"],
  keyPrefix: "",
  keygenStrategy: "",
  i18nImport: "import { i18n } from 'i18n';",
  i18nObject: "i18n",
  i18nMethod: "t",
  translate: null,
  ignoreText: "i18n-disable",
  ignoreMethods: [],
  ignoreAttributes: ['style', 'class', 'script'],
}