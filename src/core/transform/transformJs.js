const fs = require("fs");
const chalk = require("chalk");
const { parseSync, transformFromAstSync } = require("@babel/core");
const PluginSyntaxJSX = require("@babel/plugin-syntax-jsx");
const PluginSyntaxProposalOptionalChaining = require("@babel/plugin-proposal-optional-chaining");
const PluginSyntaxClassProperties = require("@babel/plugin-syntax-class-properties");
const PluginSyntaxDecorators = require("@babel/plugin-syntax-decorators");
const PluginSyntaxObjectRestSpread = require("@babel/plugin-syntax-object-rest-spread");
const PluginSyntaxAsyncGenerators = require("@babel/plugin-syntax-async-generators");
const PluginSyntaxDoExpressions = require("@babel/plugin-syntax-do-expressions");
const PluginSyntaxDynamicImport = require("@babel/plugin-syntax-dynamic-import");
const PluginSyntaxFunctionBind = require("@babel/plugin-syntax-function-bind");
const I18nPlugin = require("./i18nPlugin.js")

module.exports = (localData, needTranslate, filePath, sourceCode, options, isWritingFile = true, isVue = false) => {
  // 转换成ast
  const { babelPresets = [], babelPlugins = [] } = options;
  options.hasTransform = false;
  const ast = parseSync(sourceCode,{
    sourceType: 'module',
    ast: true,
    configFile: false,
    presets: babelPresets,
    plugins: [
      PluginSyntaxJSX,
      PluginSyntaxProposalOptionalChaining,
      PluginSyntaxClassProperties,
      [PluginSyntaxDecorators, { decoratorsBeforeExport: true }],
      PluginSyntaxObjectRestSpread,
      PluginSyntaxAsyncGenerators,
      PluginSyntaxDoExpressions,
      PluginSyntaxDynamicImport,
      PluginSyntaxFunctionBind,
      ...babelPlugins,
    ],
  })

  const { code } = transformFromAstSync(ast, sourceCode, {
    plugins: [
      [
        I18nPlugin,
        {
          localData,
          needTranslate,
          options,
          isVue,
        }
      ]
    ]
  })

  // 代码填回
  if(isWritingFile) {
    if(options.hasTransform) {
      fs.writeFileSync(filePath, code, { encoding: 'utf-8' }, err => {
        if(err) {
          console.log(chalk.red(err));
          process.exit(2);
        }
      })
    }
  } else {
    return {
      code,
      hasTransform: options.hasTransform,
    };
  }
}