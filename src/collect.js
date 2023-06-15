const i18nCore = require("./core/index.js");
const mergeOptions = require("./core/utils/mergeOptions.js");
module.exports = function(opts) {
  const options = mergeOptions(opts);
  i18nCore(options);
}