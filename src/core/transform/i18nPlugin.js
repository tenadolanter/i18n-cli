
const { declare } = require("@babel/helper-plugin-utils");
const isChinese = require("../utils/isChinese.js")
const generateKey = require("../utils/generateKey.js")
module.exports =  declare((api, options) => {
  api.assertVersion(7);
  const { localData, needTranslate, isVue } = options;
  const { i18nObject, i18nImport, i18nMethod, needImport = true } = options.options;
  const replaceExp = (api, path, value) => {
    const expressionParams = path.isTemplateLiteral()
      ? path.node.expressions.map((item) => generate(item).code)
      : null;
    const methodName = isVue ? `$${i18nMethod}` : `${i18nObject}.${i18nMethod}`;
    let replaceExpression = api.template.ast(
      `${methodName}('${value}'${
        expressionParams ? "," + expressionParams.join(",") : ""
      })`
    ).expression;
    if (
      path.findParent((p) => p.isJSXAttribute()) &&
      !path.findParent((p) => p.isJSXExpressionContainer())
    ) {
      replaceExpression = api.types.JSXExpressionContainer(replaceExpression);
    }
    return replaceExpression;
  }
  const cacheKeyFunc = (key, value) => {
    if(!localData[key]) {
      needTranslate[key] = value;
    }
  }

  return {
    visitor: {
      Program: {
        enter(path, state){
          // 判断是否已经引入了多语言包
          path.traverse({
            ImportDeclaration(p) {
              const source = p.node.source.value;
              if (source === i18nObject) {
                state.imported = true;
              }
            },
          });
          // 如果注释包含i18n-disable，则不转换
          path.traverse({
            "StringLiteral|TemplateLiteral"(path) {
              if (path.node.leadingComments) {
                path.node.leadingComments = path.node.leadingComments.filter(
                  (comment, index) => {
                    if (comment.value.includes("i18n-disable")) {
                      path.node.skipTransform = true;
                      return false;
                    }
                    return true;
                  }
                );
              }
              if (path.findParent((p) => p.isImportDeclaration())) {
                path.node.skipTransform = true;
              }
            },
          });
        },
        // 如果有引用，则不需要重新引用
        // 如果没有需要翻译的汉字，则不需要引用
        // 如果配置不需要引用，则不需要引用
        exit(path, state){
          if (!state.imported && state.shouldImport && needImport) {
            const ast = api.template.ast(`${i18nImport}`);
            path.node.body.unshift(ast);
          }
        },
      },
      // 支持vue里面{{ "测试卷" }}、v-tooltip="'你好'"类型的翻译
      DirectiveLiteral(path){
        if (path.node.skipTransform) return;
        const label = path.node.value
        if(isChinese(label)) {
          const key = generateKey(label, options);
          cacheKeyFunc(key, label);
          const t = api.types;
          const methodName = isVue ? `$${i18nMethod}` : `${i18nObject}.${i18nMethod}`;
          const callExpression = t.callExpression(
            t.identifier(methodName),
            [t.stringLiteral(key)]
          );
          const newStatement = t.expressionStatement(callExpression)
          path.parentPath.insertBefore(newStatement);
          path.parentPath.remove();
          path.skip();
        }
      },

      StringLiteral(path, state) {
        if (path.node.skipTransform) return;
        const label = path.node.value
        if(isChinese(label)) {
          const key = generateKey(label, options);
          cacheKeyFunc(key, label);
          const expression = replaceExp(api, path, key);
          path.replaceWith(expression);
          path.skip();
          state.shouldImport = true;
        }
      },
      TemplateLiteral(path, state) {
        if (path.node.skipTransform) return;
        const label = path
          .get("quasis")
          .map((item) => item.node.value.raw)
          .join("{placeholder}");
        if (label && isChinese(label)) {
          const key = generateKey(label, options);
          cacheKeyFunc(key, label);
          const expression = replaceExp(api, path, key);
          path.replaceWith(expression);
          path.skip();
          state.shouldImport = true;
        }
      },
      CallExpression(path, state) {
        if (path.node.skipTransform) return;
        const { type, name, object = {}, property = {} } = path.node.callee ?? {}
        const methodName = isVue ? `$${i18nMethod}` : i18nMethod
        if(type === 'Identifier' && name === methodName){
          path.skip();
        }
        if(type === 'MemberExpression' && object.name === i18nObject && property.name === methodName) {
          path.skip();
        }
      },
      JSXElement(path, state) {
        if (path.node.skipTransform) return;
      },
      JSXText(path, state) {
        if (path.node.skipTransform) return;
      },
      JSXAttribute(path, state) {
        if (path.node.skipTransform) return;
      },
    }
  }
});

