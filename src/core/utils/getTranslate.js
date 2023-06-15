const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const cwd = process.cwd();
/**
 * 获取指定语言已经翻译的字段对象
 * @param { Object }  options - 配置对象
 * @param { String }  key - 语言的key
 *
*/
module.exports = function(options, key) {
  const localPath = options.localPath;
  const fileName = `${key}.json`
  const configPath = path.join(cwd, localPath, fileName);
  const localConfigPath = path.join(cwd, localPath);
  if(!fs.existsSync(localConfigPath)) {
    fs.mkdirSync(localConfigPath)
  }
  if (fs.existsSync(configPath)) {
    let data = {};
    try {
      const content = fs.readFileSync(configPath);
      data = content.length > 0 ? JSON.parse(content) : {};
      return data;
    } catch(err){
      console.log(chalk.red(`请检查 ${configPath} 资源文件 JSON 格式是否正确`));
      process.exit(2);
    }
  } else {
    fs.writeFileSync(configPath, JSON.stringify({}), err => {
      if(err) {
        console.log(chalk.red(err));
        process.exit(2);
      }
    })
    return {};
  }
}

