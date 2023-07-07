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
  // 转换vue的template模块的时候，将大写的标签前面加上前缀，后面转换再替换回来
  vueTemplateLabelPrefix: "auto-i18n-prefix-",
  translate: null,
  ignoreText: "i18n-disable",
  ignoreMethods: [],
}