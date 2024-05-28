/**
 * 处理并收集需要翻译的内容
 * 1、获取已经收集到的key列表
 * 2、获取需要处理的文件列表
 * 3、转换文件
 */
const chalk = require("chalk");
const getLangTranslates = require("./core/utils/getTranslate.js");
const getFilesFromFolder = require("./core/utils/file.js");
const transformCore = require("./core/transform/index.js");
const saveTranslate = require("./core/utils/saveTranslate.js");
const mergeOptions = require("./core/utils/mergeOptions.js");
module.exports = (opts) => {
  const options = mergeOptions(opts);
  const { entry } = options;
  if (!Array.isArray(entry) && !typeof entry !== "string") {
    console.log(chalk.red("entry必须是字符串或数组"));
    process.exit(2);
  }
  // 已经翻译的
  let localData = {};
  // 需要翻译的
  let needTranslate = {};

  // 1、获取已经收集到的key列表
  const localLang = options.local;
  localData = getLangTranslates(options, localLang);

  // 2、获取需要处理的文件列表
  // 需要处理的文件列表
  let targetFiles = [];
  targetFiles = getFilesFromFolder(options);

  // 3、转换文件
  targetFiles.forEach((file) => {
    transformCore(localData, needTranslate, file, options);
    console.log(chalk.green(`${file.filePath}转换完成...`));
  });

  // 4、将未翻译的存入local语言对应的json文件中
  saveTranslate(options, localLang, needTranslate);
};
