const baiduTranslate = require("./baidu.js");
const googleTranslate = require("./google.js");
const youdaoTranslate = require("./youdao.js");
/**
 * 根据不同配置，生成不同翻译
 * @param { String } type - 翻译类型，可以为百度、谷歌等
 * @param { String } text - 需要被翻译的文本
 * @param { String } lang - 需要翻译成的语言
 * @param { Object } options - 翻译的配置，私钥等
 *
 */
module.exports = async (type, text, lang, options) => {
  if (type === "baidu") {
    return baiduTranslate(text, lang, options);
  } else if (type === "google") {
    return googleTranslate(text, lang, options);
  } else if (type === "youdao") {
    return youdaoTranslate(text, lang, options);
  }
};
