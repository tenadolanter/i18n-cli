const ParserTypeScript = require("@babel/preset-typescript");
const transformJs = require("./transformJs.js");
module.exports = (localData, needTranslate, filePath, sourceCode, options) => {
  const { babelPresets = [], isTsx } = options || {};
  const presetOption = isTsx
    ? { isTSX: true, allExtensions: true }
    : { allExtensions: true };
  const { code, hasTransform } =
    transformJs(localData, needTranslate, filePath, sourceCode, {
      ...options,
      babelPresets: [...babelPresets, [ParserTypeScript, presetOption]],
    }) ?? {};
  if (!options.isWritingFile) {
    return {
      code,
      hasTransform,
    };
  }
};
