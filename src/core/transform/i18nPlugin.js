const { declare } = require("@babel/helper-plugin-utils");
const generate = require("@babel/generator").default;
const isChinese = require("../utils/isChinese.js");
const generateKey = require("../utils/generateKey.js");
const regex = require("../utils/regex.js");
module.exports = declare((api, options) => {
  api.assertVersion(7);
  const { localData, needTranslate } = options;
  const {
    i18nObject,
    i18nImport,
    i18nMethod,
    keyShowOrigin,
    needImport = true,
    ignoreText,
    ignoreMethods,
    isVueTemplate,
  } = options.options;
  const replaceExp = (api, path, value, label) => {
    const expressionParams = path.isTemplateLiteral()
      ? path.node.expressions.map((item) => generate(item).code)
      : null;
    const methodName = isVueTemplate
      ? `$${i18nMethod}`
      : i18nObject
      ? `${i18nObject}.${i18nMethod}`
      : i18nMethod;
    let replaceExpression = api.template.ast(
      `${methodName}('${value}'${
        expressionParams ? "," + "[" + expressionParams.join(",") + "]" : ""
      }${keyShowOrigin ? ",'" + label + "'" : ""}
      )`
    ).expression;
    if (
      path.findParent((p) => p.isJSXAttribute()) &&
      !path.findParent((p) => p.isJSXExpressionContainer())
    ) {
      replaceExpression = api.types.JSXExpressionContainer(replaceExpression);
    }
    return replaceExpression;
  };
  const replaceJsx = (api, path, value, label) => {
    const expressionParams = path.isTemplateLiteral()
      ? path.node.expressions.map((item) => generate(item).code)
      : null;
    const methodName = isVueTemplate
      ? `$${i18nMethod}`
      : i18nObject
      ? `${i18nObject}.${i18nMethod}`
      : i18nMethod;
    let replaceExpression = api.template.ast(
      `${methodName}('${value}'${
        expressionParams ? "," + "[" + expressionParams.join(",") + "]" : ""
      }${keyShowOrigin ? ",'" + label + "'" : ""}
      )`
    ).expression;
    return api.types.JSXExpressionContainer(replaceExpression);
  };
  const cacheKeyFunc = (key, value) => {
    if (!localData[key]) {
      needTranslate[key] = value;
      options.options.hasTransform = true;
    }
  };

  return {
    visitor: {
      Program: {
        enter(path, state) {
          // 判断是否已经引入了多语言包
          path.traverse({
            ImportDeclaration(p) {
              const source = p.node.source.value;
              if (source === i18nObject) {
                state.imported = true;
              }
            },
          });
          // 如果注释包含ignoreText，则不转换
          path.traverse({
            "StringLiteral|TemplateLiteral"(path) {
              let leadingComments = path.node.leadingComments;
              // 如果是对象属性的值，例如default: "测试"
              if (path?.parent?.type === "ObjectProperty") {
                leadingComments = path?.parent?.leadingComments;
              }
              // 如果是赋值语句，例如this.text = "测试"
              if (path?.parent?.type === "AssignmentExpression") {
                leadingComments = path?.parentPath?.parent?.leadingComments;
              }
              if (leadingComments) {
                path.node.leadingComments = leadingComments.filter(
                  (comment, index) => {
                    if (comment.value.includes(ignoreText)) {
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
              // 如果中文在类型声明里面，则跳过转换
              if (path.parent.type === "TSLiteralType") {
                path.node.skipTransform = true;
              }
            },
          });
        },
        // 如果有引用，则不需要重新引用
        // 如果没有需要翻译的汉字，则不需要引用
        // 如果配置不需要引用，则不需要引用
        exit(path, state) {
          if (!state.imported && state.shouldImport && needImport) {
            const ast = api.template.ast(`${i18nImport}`);
            path.node.body.unshift(ast);
          }
        },
      },
      // 支持vue里面{{ "测试卷" }}、v-tooltip="'你好'"类型的翻译
      DirectiveLiteral(path) {
        if (path.node.skipTransform) return;
        const label = path.node.value;
        if (isChinese(label)) {
          const key = generateKey(label, options.options);
          cacheKeyFunc(key, label);
          const t = api.types;
          const methodName = isVueTemplate
            ? `$${i18nMethod}`
            : `${i18nObject}.${i18nMethod}`;
          const callExpression = t.callExpression(t.identifier(methodName), [
            t.stringLiteral(key),
          ]);
          const newStatement = t.expressionStatement(callExpression);
          path.parentPath.insertBefore(newStatement);
          path.parentPath.remove();
          path.skip();
        }
      },

      StringLiteral(path, state) {
        if (path.node.skipTransform) return;
        const label = path.node.value;
        const isHtmlAutoCloseTag = regex.htmlTagAutoClose?.test(label);
        // 如果中文作为函数的参数，则跳过
        // if(path?.parent?.type === "CallExpression" && path?.parent?.callee?.type !== "MemberExpression"){
        //   path.skip();
        // }
        // path.key值为key，说明对象的key是中文，需要跳过
        if (isChinese(label) && path.key !== "key" && !isHtmlAutoCloseTag) {
          const key = generateKey(label, options.options);
          cacheKeyFunc(key, label);
          const expression = replaceExp(api, path, key, label);
          path.replaceWith(expression);
          path.skip();
          state.shouldImport = true;
        }
      },
      TemplateLiteral(path, state) {
        if (path.node.skipTransform) return;
        let index = 0;
        // 处理quasis转换为变量bug，quasis表示变量两边的内容
        // 如${a1}a${a2}${a3}${a4}b => 在变量两边存在5个quasis位置
        // 如a${a2}b => 在变量两边存在2个quasis位置
        // 如果存在连续的空quasis，则在非空的quasis之前添加一个空quasis
        const quasis = path.get("quasis");
        const newQuasis = [];
        let lastQuasis = null;
        let isContinueEmptyQuasis = false;
        quasis.forEach((item, index) => {
          if (!!item.node.value.raw) {
            if (isContinueEmptyQuasis) {
              newQuasis.push(quasis[index - 1]);
            }
            newQuasis.push(item);
            lastQuasis = item;
            isContinueEmptyQuasis = false;
          } else {
            if (!lastQuasis?.node?.value?.raw && lastQuasis !== null) {
              isContinueEmptyQuasis = true;
            } else {
              isContinueEmptyQuasis = false;
            }
            newQuasis.push(item);
            lastQuasis = item;
          }
        });
        const label = newQuasis
          .map((item) => {
            if (!!item.node.value.raw) {
              return item.node.value.raw;
            } else {
              let result = "{" + index + "}";
              index++;
              return result;
            }
          })
          .join("");
        const isHtmlAutoCloseTag = regex.htmlTagAutoClose?.test(label);
        if (label && isChinese(label) && !isHtmlAutoCloseTag) {
          const key = generateKey(label, options.options);
          cacheKeyFunc(key, label);
          const expression = replaceExp(api, path, key, label);
          path.replaceWith(expression);
          path.skip();
          state.shouldImport = true;
        }
      },
      CallExpression(path, state) {
        if (path.node.skipTransform) return;
        const {
          type,
          name,
          object = {},
          property = {},
        } = path.node.callee ?? {};
        const methodName = isVueTemplate ? `$${i18nMethod}` : i18nMethod;
        // 如果是已经翻译的
        if (type === "Identifier" && name === methodName) {
          path.skip();
        }
        if (
          type === "MemberExpression" &&
          object.name === i18nObject &&
          property.name === methodName
        ) {
          path.skip();
        }
        // 如果包含忽略的方法名
        if (type === "Identifier" && ignoreMethods.includes(name)) {
          path.skip();
        }
        const _MemberExpression = `${object.name}.${property.name}`;
        if (
          type === "MemberExpression" &&
          ignoreMethods.includes(_MemberExpression)
        ) {
          path.skip();
        }
      },
      ObjectExpression(path, state) {
        if (path.node.skipTransform) return;
        const label = path.node.value;
        if (isChinese(label)) {
          const key = generateKey(label, options.options);
          cacheKeyFunc(key, label);
          const expression = replaceExp(api, path, key, label);
          path.replaceWith(expression);
          path.skip();
          state.shouldImport = true;
        }
      },
      JSXText(path, state) {
        if (path.node.skipTransform) return;
        const label = path?.node?.value?.trim();
        if (isChinese(label)) {
          const key = generateKey(label, options.options);
          cacheKeyFunc(key, label);
          const expression = replaceJsx(api, path, key, label);
          path.replaceWith(expression);
          path.skip();
          state.shouldImport = true;
        }
      },
      JSXAttribute(path, state) {
        if (path.node.skipTransform) return;
        const label = path.node.value?.value;
        if (isChinese(label)) {
          const key = generateKey(label, options.options);
          cacheKeyFunc(key, label);
          const expression = replaceJsx(api, path, key, label);
          path.node.value = expression;
          path.skip();
          state.shouldImport = true;
        }
      },
    },
  };
});
