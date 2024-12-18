const fs = require("fs");
const chalk = require("chalk");
const { parseSync, transformFromAstSync } = require("@babel/core");
const PresetEnv = require("@babel/preset-env");

const PluginSyntaxJSX = require("@babel/plugin-syntax-jsx");
const PluginSyntaxProposalOptionalChaining = require("@babel/plugin-proposal-optional-chaining");
const PluginSyntaxClassProperties = require("@babel/plugin-syntax-class-properties");
const PluginSyntaxDecorators = require("@babel/plugin-syntax-decorators");
const PluginSyntaxObjectRestSpread = require("@babel/plugin-syntax-object-rest-spread");
const PluginSyntaxAsyncGenerators = require("@babel/plugin-syntax-async-generators");
const PluginSyntaxDoExpressions = require("@babel/plugin-syntax-do-expressions");
const PluginSyntaxDynamicImport = require("@babel/plugin-syntax-dynamic-import");
const PluginSyntaxFunctionBind = require("@babel/plugin-syntax-function-bind");
const I18nPlugin = require("./i18nPlugin.js");

module.exports = (localData, needTranslate, filePath, sourceCode, options) => {
  // 转换成ast
  const { babelPresets = [], babelPlugins = [], isVueScript = false } = options;
  options.hasTransform = false;
  const presets = [...babelPresets, PresetEnv];
  const plugins = [
    PluginSyntaxJSX,
    PluginSyntaxProposalOptionalChaining,
    PluginSyntaxClassProperties,
    [
      PluginSyntaxDecorators,
      isVueScript ? { legacy: true } : { decoratorsBeforeExport: true },
    ],
    PluginSyntaxObjectRestSpread,
    PluginSyntaxAsyncGenerators,
    PluginSyntaxDoExpressions,
    PluginSyntaxDynamicImport,
    PluginSyntaxFunctionBind,
    ...babelPlugins,
  ];
  const ast = parseSync(sourceCode, {
    sourceType: "module",
    ast: true,
    configFile: false,
    presets: presets,
    plugins: plugins,
  });

  const { code } = transformFromAstSync(ast, sourceCode, {
    configFile: false,
    plugins: [
      [
        I18nPlugin,
        {
          localData,
          needTranslate,
          options,
        },
      ],
    ],
  });

  // 代码填回
  if (options.isWritingFile) {
    if (options.hasTransform) {
      fs.writeFileSync(filePath, code, { encoding: "utf-8" }, (err) => {
        if (err) {
          console.log(chalk.red(err));
          process.exit(2);
        }
      });
    }
  } else {
    return {
      code,
      hasTransform: options.hasTransform,
    };
  }
};
