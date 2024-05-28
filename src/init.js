const fs = require("fs");
const inquirer = require("inquirer");
const prettier = require("prettier");
const chalk = require("chalk");
const defaultConfig = require("./core/config.js");
// 初始化，生成基础的配置文件
module.exports = async () => {
  // 判断默认配置是否存在
  const configName = "i18n.config.js";
  const defaultPath = `./${configName}`;
  let isConfigExist = true;
  try {
    fs.accessSync(defaultPath);
  } catch (e) {
    isConfigExist = false;
  }
  // 如果默认配置存在，是否需要覆盖默认配置
  if (isConfigExist) {
    const ans = await inquirer.prompt([
      {
        name: "overwrite",
        type: "confirm",
        message: `配置文件${configName}已存在，是否覆盖？`,
      },
    ]);
    if (!ans.overwrite) process.exit(0);
  }
  const options = {
    ...defaultConfig,
  };
  let content = `module.exports = ${JSON.stringify(options)}`;
  content = prettier.format(content, {
    parser: "babel",
    singleQuote: true,
    trailingComma: "es5",
  });
  fs.writeFileSync(defaultPath, content, "utf8", (err) => {
    if (err) {
      console.log(chalk.red(err));
      process.exit(2);
    } else {
      console.log(chalk.green("初始化成功~"));
    }
  });
};
