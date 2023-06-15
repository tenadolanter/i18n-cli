// 判断是否为中文
module.exports = (text) => {
  return /[\u4e00-\u9fa5]/.test(text);
}