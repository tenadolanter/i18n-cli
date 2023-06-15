const ParserTypeScript = require("@babel/preset-typescript")
const transformJs = require("./transformJs.js")
module.exports = (localData, needTranslate, filePath, sourceCode, options, isWritingFile = true) => {
  const { babelPresets = [] } = options || {};
  const code = transformJs(localData, needTranslate, filePath, sourceCode, {
    ...options,
    babelPresets: [
      ...babelPresets,
      [ParserTypeScript, { isTSX: true, allExtensions: true }]
    ]
  }, isWritingFile)
  if(!isWritingFile) {
    return code;
  }
}