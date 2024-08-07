const fs = require("fs");
const chalk = require("chalk");
const cwd = process.cwd();
const { Parser } = require("htmlparser2");
const transformHtml = require("./transformHtml.js");
const transformJs = require("./transformJs.js");
const transformTs = require("./transformTs.js");
const regex = require("../utils/regex.js");
module.exports = (localData, needTranslate, filePath, sourceCode, options) => {
  // 转换vue代码，取出template和script进行转换
  let html = "";
  let lastIndex = null;
  let lastAttrs = null;
  const shouldTranformTags = ["template", "script"];
  // 生成开始tag
  const openTagFunc = (name, attrs) => {
    let html = "";
    html += `<${name}`;
    for (const attr in attrs) {
      if (attrs[attr]) {
        html += ` ${attr}="${attrs[attr]}"`;
      } else {
        html += ` ${attr}`;
      }
    }
    html += ">";
    return html;
  };
  // 生成结束tag
  const closeTagFun = (name) => {
    return `</${name}>`;
  };
  const parser = new Parser(
    {
      onopentag(name, attrs) {
        if (lastIndex !== null) return;
        if (shouldTranformTags.includes(name)) {
          lastIndex = parser.endIndex + 1;
          lastAttrs = attrs;
        } else {
          html += openTagFunc(name, attrs);
        }
      },
      onclosetag(name) {
        if (!shouldTranformTags.includes(name)) {
          if (lastIndex != null) return;
          html += closeTagFun(name);
        } else {
          const fullText = sourceCode.slice(lastIndex, parser.startIndex);
          if (name === "template") {
            // 如果template是0或偶数个，且`<template`个数和`</template`个数一样，则说明匹配结束
            const matchs = fullText.match(regex.vueTemplateTag) ?? [];
            const matchLen = matchs?.length;
            const templateStarts = (
              fullText.match(regex.htmlTemplateStartTag) ?? []
            ).length;
            const templateEnds = (
              fullText.match(regex.htmlTemplateEndTag) ?? []
            ).length;
            if (
              matchLen === 0 ||
              (matchLen % 2 === 0 && templateStarts === templateEnds)
            ) {
              const { code, hasTransform } = transformHtml(
                localData,
                needTranslate,
                "",
                fullText,
                {
                  ...options,
                  isWritingFile: false,
                  isVueTemplate: true,
                },
                false,
                true
              );
              let tempCode = code;
              if (hasTransform) {
                tempCode = `\n  ${tempCode}`;
              } else {
                tempCode = fullText;
              }
              html += openTagFunc(name, lastAttrs);
              html += tempCode;
              html += closeTagFun(name);
            } else {
              if (lastIndex != null) return;
              html += closeTagFun(name);
            }
          } else if (name === "script") {
            let result;
            if (lastAttrs.lang === "ts") {
              result = transformTs(localData, needTranslate, "", fullText, {
                ...options,
                isWritingFile: false,
                isVueTemplate: false,
                isTsx: false,
              });
            } else if (lastAttrs.lang === "tsx") {
              result = transformTs(localData, needTranslate, "", fullText, {
                ...options,
                isWritingFile: false,
                isVueTemplate: false,
                isVueScript: true,
                isTsx: true,
              });
            } else {
              result = transformJs(localData, needTranslate, "", fullText, {
                ...options,
                isWritingFile: false,
                isVueTemplate: false,
                isVueScript: true,
              });
            }
            const { code, hasTransform } = result ?? {};
            let tempCode = code;
            if (hasTransform) {
              tempCode = `\n${code}\n`;
            } else {
              tempCode = fullText;
            }
            html += openTagFunc(name, lastAttrs);
            html += tempCode;
            html += closeTagFun(name);
          }
          lastIndex = null;
          lastAttrs = null;
        }
      },
      ontext(fullText) {
        if (lastIndex != null) return;
        html += fullText;
      },
    },
    {
      xmlMode: false,
      lowerCaseTags: false,
      lowerCaseAttributeNames: false,
      recognizeSelfClosing: true,
    }
  );
  parser.parseComplete(sourceCode);

  if (options.isWritingFile) {
    fs.writeFileSync(filePath, html, { encoding: "utf-8" }, (err) => {
      if (err) {
        console.log(chalk.red(err));
        process.exit(2);
      }
    });
  } else {
    return {
      code: html,
      hasTransform: options.hasTransform,
    };
  }
};
