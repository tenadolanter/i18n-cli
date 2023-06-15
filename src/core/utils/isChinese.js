// 判断是否为中文
const regex = require("./regex.js")
module.exports = (text) => {
  return regex.chineseChar.test(text);
}