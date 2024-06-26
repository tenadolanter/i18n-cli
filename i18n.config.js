module.exports = {
  entry: ["example/ts-force-conversion"],
  exclude: [],
  local: "zh-CN",
  localPath: "./example/ts-force-conversion/locales",
  langs: ["en-US"],
  keyPrefix: "testKeyPrefix.",
  i18nImport: "import { t } from 'i18n';",
  i18nObject: "",
  i18nMethod: "t",
  translate: {
    type: "baidu",
    appId: "20230809001774995",
    secretKey: "J1ArqOof1s8Q7zrqO8fL",
    interval: 1000,
  },
  ignoreText: "i18n-disable",
  ignoreMethods: ["console.log"],
  ignoreAttributes: ["style", "class", "script", "id"],
};
