const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const defaultOptions = require("../config.js");
const cwd = process.cwd();
module.exports = (opts = {}) => {
  const options = defaultOptions;
  const configFile = opts.config || "i18n.config.js";
  const configPath = path.join(cwd, configFile);
  if (!fs.existsSync(configPath)) {
    console.log(chalk.red(`请检查 ${configPath} 配置文件是否正确\n`));
    process.exit(1);
  }
  let configOptions = require(configPath);
  Object.assign(options, configOptions);
  return options;
};
