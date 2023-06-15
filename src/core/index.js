const chalk = require("chalk");
const getLangTranslates = require("./utils/getTranslate.js")
const getFilesFromFolder = require("./utils/file.js")
const transformCore = require("./transform/index.js")
const translateCore = require("./translate/index.js")
/**
 * 处理并收集需要翻译的内容
 * 1、获取已经收集到的key列表
 * 2、获取需要处理的文件列表
 * 3、转换文件
 * 4、翻译中文，更新其他语言，并将翻译后的内容存起来
*/
module.exports = function(options = {}) {
  const { entry } = options;
  if(!Array.isArray(entry) && !typeof entry !== 'string') {
    console.log(chalk.red('entry必须是字符串或数组'));
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
  targetFiles.forEach(file => {
    transformCore(localData, needTranslate, file, options);
    console.log(chalk.green(`${file.filePath}转换完成...`));
  })

  // 4、翻译中文，更新其他语言，并将翻译后的内容存起来
  translateCore(needTranslate, options);
}
