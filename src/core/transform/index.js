const fs = require("fs");
const path = require("path");
const transformVue = require("./transformVue.js");
const transformJs = require("./transformJs.js");
const transformTs = require("./transformTs.js");
const cwd = process.cwd();
/**
 * 处理文件ast，生成i18n代码
 * @param { Object } localData - 已经翻译的数据
 * @param { Object } needTranslate - 需要被翻译的文本，key和文本
 * @param { Object } file - 需要被处理的文件
 * @param { Object } options - 配置
 *
 */
module.exports = (localData, needTranslate, file, options) => {
  const ext = file.ext;
  if (ext === ".vue") {
    transformVue(localData, needTranslate, file, options);
  } else if ([".ts"].includes(ext)) {
    const filePath = file.filePath;
    const sourceCode = fs.readFileSync(path.join(cwd, filePath), {
      encoding: "utf8",
    });
    transformTs(localData, needTranslate, filePath, sourceCode, {
      ...options,
      isWritingFile: true,
      isVueTemplate: false,
      isTsx: false,
    });
  } else if ([".tsx"].includes(ext)) {
    const filePath = file.filePath;
    const sourceCode = fs.readFileSync(path.join(cwd, filePath), {
      encoding: "utf8",
    });
    transformTs(localData, needTranslate, filePath, sourceCode, {
      ...options,
      isWritingFile: true,
      isVueTemplate: false,
      isTsx: true,
    });
  } else {
    const filePath = file.filePath;
    const sourceCode = fs.readFileSync(path.join(cwd, filePath), {
      encoding: "utf8",
    });
    transformJs(localData, needTranslate, filePath, sourceCode, {
      ...options,
      isWritingFile: true,
    });
  }
};
