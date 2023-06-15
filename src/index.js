const option = require("../package.json");
const init = require("./init.js");
const collect = require("./collect.js");
module.exports = function cli(program) {
  program
    .name(option.name)
    .description(option.description)
    .version(option.version, "-v, --version")
    .option("-c, --config <path>", "设置配置文件地址，默认为./i18n.config.js");

  // 初始化配置
  program
    .command("init")
    .alias("i")
    .description("初始化i18n配置")
    .action(() => {
      init();
    });

  // 生成多语言文件
  program
    .command("sync")
    .alias("s")
    .description("生成i18n翻译")
    .action(() => {
      collect();
    });
};
