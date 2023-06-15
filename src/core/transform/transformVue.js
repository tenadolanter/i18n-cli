const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const cwd = process.cwd();
const { Parser } = require("htmlparser2");
const transformHtml = require("./transformHtml.js");
const transformJs = require("./transformJs.js");
const transformTs = require("./transformTs.js");
module.exports = (localData, needTranslate, file, options) => {
  const filePath = file.filePath;
  const sourceCode = fs.readFileSync(path.join(cwd, filePath), {
    encoding: "utf8",
  });
  // 转换vue代码，取出template和script进行转换
  let html = "";
  let lastIndex = null;
  let lastAttrs = null;
  const shouldTranformTags = ["template", "script"];
  // 生成开始tag
  const openTagFunc = (name, attrs) => {
    let html = "";
    html += `<${name}`
    for (const attr in attrs) {
      if(attrs[attr]) {
        html += ` ${attr}="${attrs[attr]}"`;
      } else {
        html += ` ${attr}`;
      }
    }
    html += '>';
    return html;
  }
  // 生成结束tag
  const closeTagFun = (name) => {
    return `</${name}>`
  }
  const parser = new Parser({
    onopentag(name, attrs){
      if(lastIndex !== null) return;
      if(shouldTranformTags.includes(name)) {
        lastIndex = parser.endIndex + 1
        lastAttrs = attrs;
      } else {
        html += openTagFunc(name, attrs);
      }
    },
    onclosetag(name){
      if(!shouldTranformTags.includes(name)) {
        if(lastIndex != null) return;
        html += closeTagFun(name);
      } else {
        const fullText = sourceCode.slice(lastIndex, parser.startIndex);
        if(name === "template") {
          const code = transformHtml(localData, needTranslate, '', fullText, options, false, true);
          html += openTagFunc(name, lastAttrs);
          html += `\n  ${code}`;
          html += closeTagFun(name);
        }
        else if(name === "script") {
          let code = "";
          if(lastAttrs.lang === "ts") {
            code = transformTs(localData, needTranslate, '', fullText, options, false);
          } else {
            code = transformJs(localData, needTranslate, '', fullText, options, false);
          }
          html += openTagFunc(name, lastAttrs);
          html += `\n${code}`;
          html += closeTagFun(name);
        }
        lastIndex = null
        lastAttrs = null
      }
    },
    ontext(fullText){
      if (lastIndex != null) return;
      html += fullText;
    },
  },{
    xmlMode: true,
    lowerCaseTags: false,
    lowerCaseAttributeNames: false,
    recognizeSelfClosing: true,
  })
  parser.parseComplete(sourceCode);

  // 代码填回
  fs.writeFileSync(filePath, html, { encoding: "utf-8" }, err => {
    if(err) {
      console.log(chalk.red(err));
      process.exit(2);
    }
  });
};
