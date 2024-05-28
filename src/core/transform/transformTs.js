const ParserTypeScript = require("@babel/preset-typescript");
const transformJs = require("./transformJs.js");
module.exports = (
  localData,
  needTranslate,
  filePath,
  sourceCode,
  options,
  isWritingFile = true,
  isVue = false
) => {
  const { babelPresets = [] } = options || {};
  const presetOption = isVue
    ? { allExtensions: true }
    : { isTSX: true, allExtensions: true };
  const { code, hasTransform } =
    transformJs(
      localData,
      needTranslate,
      filePath,
      sourceCode,
      {
        ...options,
        babelPresets: [...babelPresets, [ParserTypeScript, presetOption]],
      },
      isWritingFile
    ) ?? {};
  if (!isWritingFile) {
    return {
      code,
      hasTransform,
    };
  }
};
