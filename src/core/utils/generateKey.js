/**
 * 根据中文生成key
 * @param { String } text - 需要翻译的文本
 * @param { Object } options - 配置
 */
const { nanoid } = require("nanoid");
const limax = require("limax");
module.exports = function generateKey(text, options) {
  let result = "";
  const { keyPrefix, keygenStrategy } = options;
  // 生成随机字符串id
  if (keygenStrategy === "random") {
    result = nanoid();
  } else if (keygenStrategy === "original") {
    result = text;
  }
  // 转换
  // i ♥ latin > i-love-latin
  // 我爱官话 > wo-ai-guan-hua
  else {
    text = text.replace(/\$/g, "");
    result = limax(text, { tone: false });
  }

  // 如果配置有前缀则要添加前缀
  if (keyPrefix) {
    result = keyPrefix + result;
  }
  return result;
};
