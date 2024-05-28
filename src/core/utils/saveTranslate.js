const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const cwd = process.cwd();
/**
 * 获取指定语言已经翻译的字段对象
 * @param { Object }  options - 配置对象
 * @param { String }  key - 语言的key
 * @param { Object }  needTranslate - 需要合并的翻译对象
 *
 */
module.exports = (options, lang, needTranslate) => {
  const localPath = options.localPath;
  const fileName = `${lang}.json`;
  const configPath = path.join(cwd, localPath, fileName);
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify({}), (err) => {
      if (err) {
        console.log(chalk.red(err));
        process.exit(2);
      }
    });
  }
  let data = {};
  try {
    const content = fs.readFileSync(configPath);
    data = content.length > 0 ? JSON.parse(content) : {};
  } catch (err) {
    console.log(chalk.red(`请检查 ${configPath} 资源文件 JSON 格式是否正确`));
    process.exit(2);
  }
  data = {
    ...data,
    ...needTranslate,
  };
  fs.writeFileSync(configPath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.log(chalk.red(err));
      process.exit(2);
    }
  });
};
