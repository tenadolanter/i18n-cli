// 翻译中文

const translateCore = require("./core/translate/index.js");
const mergeOptions = require("./core/utils/mergeOptions.js");
module.exports = (opts) => {
  const options = mergeOptions(opts);
  translateCore(options);
}