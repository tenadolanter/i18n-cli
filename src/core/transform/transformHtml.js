const fs = require("fs");
const parse5 = require("parse5");
const treeAdapterDefault = require("parse5/lib/tree-adapters/default");
const Serializer = require("parse5/lib/serializer");
const { NAMESPACES: NS } = require('parse5/lib/common/html');
const mustache = require('mustache');
const chalk = require("chalk");
const isChinese = require("../utils/isChinese.js")
const generateKey = require("../utils/generateKey.js")
const regex = require("../utils/regex.js")
const transformJs = require("./transformJs.js");
module.exports = (
  localData,
  needTranslate,
  filePath,
  sourceCode,
  options,
  isWritingFile = true,
  isVue = false,
) => {
  const { vueTemplateLabelPrefix, ignoreText, ignoreAttributes } = options ?? {};
  const treeAdapter = {
    ...treeAdapterDefault,
  }
  // 需要忽略的行
  let ignoreLines = []
  // 保存映射，在处理完之后替换回来
  let keysMap = {};
  // 将大写字符转换为小写
  const toKebab = (sourceCode) => {
    // 如果标签是大写，则替换并缓存
    sourceCode = sourceCode.replaceAll(regex.htmlTagWidthUppercaseChar, (_, $1, $2) => {
      const temp = `${vueTemplateLabelPrefix}${$2.toLowerCase()}`
      keysMap[temp] = $2;
      return `${$1}${temp}`
    })
    sourceCode = sourceCode.replaceAll(regex.htmlAttributeWidthUppercaseChar, ($1) => {
      const temp = `${vueTemplateLabelPrefix}${$1.toLowerCase()}`
      keysMap[temp] = $1;
      return `${temp}`
    })
    // 如果属性是大写，则特换并缓存
    return sourceCode;
  }
  // 将自闭和标签替换为成对的标签
  const toAutoColse = (sourceCode) => {
    sourceCode = sourceCode.replaceAll(regex.htmlAutoCloseTag, ($1, $2) => {
      const replaceStr = $1.replace('/>', '>')
      return `${replaceStr}</${$2}>`
    })
    return sourceCode;
  }
  // 将代码里的template转换
  const toTempalte = (sourceCode) => {
    sourceCode = sourceCode.replaceAll(regex.htmlTemplateTag, (_, $1, $2) => {
      const temp = `${vueTemplateLabelPrefix}${$2.toLowerCase()}`
      keysMap[temp] = $2;
      return `${$1}${temp}`
    })
    return sourceCode;
  }

  // 替换之前转换的标签
  const toPascal = (sourceCode) => {
    Object.keys(keysMap).forEach(i => {
      const reg = new RegExp(`${i}`, 'g');
      sourceCode = sourceCode.replaceAll(reg, ($1) => {
        const temp = keysMap[$1] || $1;
        return `${temp}`
      })
    })
    return sourceCode;
  }

  sourceCode = toKebab(sourceCode);
  sourceCode = toAutoColse(sourceCode);
  sourceCode = toTempalte(sourceCode);

  const ast = parse5.parse(sourceCode, { sourceCodeLocationInfo: true, treeAdapter: treeAdapter });

  // 转换html内容
  const traverseHtml = (ast, localData, needTranslate, options) => {
    const { i18nMethod } = options;
    const cacheKeyFunc = (key, value) => {
      if(!localData[key]) {
        needTranslate[key] = value;
      }
    }
    const transformJsExp = (sourceCode) => {
      let code = transformJs(localData, needTranslate, '', sourceCode, { ...options, needImport: false }, false, isVue)
      // 如果是;结尾，则删除
      if(code.endsWith(";")) {
        code = code.slice(0, -1);
      }
      return code;
    }
    const traverse = (node) => {
      if (node.childNodes) {
        node.childNodes.forEach(childNode => traverse(childNode));
      }
      // 处理属性
      if(node.attrs) {
        const startLine = node.sourceCodeLocation?.startLine;
        if(ignoreLines.includes(startLine)) return;
        node.attrs.forEach(attr => {
          const { name, value } = attr;
          if(!isChinese(value) || !value) return;
          if(ignoreAttributes.includes(name)) {
            const source = value;
            attr.value = source;
          }
          // 如果指令、绑定、事件
          else if (name.startsWith('v-') || name.startsWith(':') || name.startsWith('@')) {
            const source = transformJsExp(value);
            if(value !== source) {
              attr.value = source;
            }
          }
          else {
            const key = generateKey(value, options);
            cacheKeyFunc(key, value);
            const methodName = isVue ? `$${i18nMethod}` : i18nMethod
            attr.value = `${methodName}('${key}')`;
            attr.name = `:${name}`;
          }
        })
      }
      // 处理innerText
      if(node.nodeName === '#text') {
        const nodeValue = node.value;
        if(!isChinese(nodeValue) || !nodeValue) return;
        const startLine = node.sourceCodeLocation.startLine;
        if(ignoreLines.includes(startLine)) return;
        let value = "";
        let tokens = mustache.parse(node.value) || [];
        // tokens格式[['text', '中文', 0, 2]]
        for(const token of tokens) {
          const tokenType = token[0];
          const tokenText = token[1];
          if(!isChinese(tokenText)) {
            if(tokenType === "text") {
              value += tokenText;
            }
            else if(tokenType === "name"){
              value += `{{${tokenText}}}`;
            }
          }
          else {
            if(tokenType === "text") {
              const text = tokenText.trim();
              const key = generateKey(text, options);
              cacheKeyFunc(key, text);
              const methodName = isVue ? `$${i18nMethod}` : i18nMethod
              value += `{{${methodName}('${key}')}}`
            }
            else if(tokenType === "name"){
              value += `{{${transformJsExp(tokenText)}}}`
            }
          }
        }
        if (node.value !== value) {
          node.value = value;
        }
      }
      // 获取所有
      if(node.nodeName === "#comment") {
        if(node.data.includes(ignoreText)) {
          const endLine = node?.sourceCodeLocation?.endLine;
          ignoreLines.push(endLine + 1);
        }
      }
    }
    const html = ast.childNodes.find(nd => nd.nodeName === 'html');
    if(html) {
      const body = html.childNodes.find(nd => nd.nodeName === 'body');
      if(body) {
        traverse(body);
      }
    }
  }
  traverseHtml(ast, localData, needTranslate, options)

  // 根据ast生成code
  class MySerializer extends Serializer {
    _serializeAttributes(node) {
      const attrs = this.treeAdapter.getAttrList(node);
      for (let i = 0, attrsLength = attrs.length; i < attrsLength; i++) {
        const attr = attrs[i];
        const value = Serializer.escapeString(attr.value, true);
        this.html += " ";
        if (!attr.namespace) {
          this.html += attr.name;
        } else if (attr.namespace === NS.XML) {
          this.html += "xml:" + attr.name;
        } else if (attr.namespace === NS.XMLNS) {
          if (attr.name !== "xmlns") {
            this.html += "xmlns:";
          }
          this.html += attr.name;
        } else if (attr.namespace === NS.XLINK) {
          this.html += "xlink:" + attr.name;
        } else {
          this.html += attr.prefix + ":" + attr.name;
        }
        if (value) {
          this.html += '="' + value + '"';
        }
      }
    }
  }
  const htmlFromAst = (ast, options) => {
    const serializer = new MySerializer(ast, options);
    return serializer.serialize();
  };
  let code = htmlFromAst(ast);
  code = code.split("<body>")[1].split("</body>")[0];
  code = toPascal(code)
  // 代码填回
  if (isWritingFile) {
    fs.writeFileSync(filePath, code, { encoding: "utf-8" }, err => {
      if(err) {
        console.log(chalk.red(err));
        process.exit(2);
      }
    });
  } else {
    return code;
  }
};
