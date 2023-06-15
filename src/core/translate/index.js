const translate = require("./translate.js");
const sleep = require("../utils/sleep.js")
const saveTranslate = require("../utils/saveTranslate.js")
module.exports = async (needTranslate, options) => {
  const { type, interval = 1000 } = options?.translate ?? {};
  const { langs, local } = options ?? [];
  // 将local语言的内容存到配置里面
  saveTranslate(options, local, needTranslate)
  // 将需要翻译的语言内容存到配置里面
  const langLen = langs.length;
  const keys = Object.keys(needTranslate);
  const keyLen = keys.length;
  for(let i = 0; i < langLen; i++) {
    const lang = langs[i];
    let _translate = {};
    for(let j =0; j < keyLen; j++) {
      const key = keys[j];
      const text = needTranslate[key];
      await sleep(interval);
      const res = await translate(type, text, lang, options);
      if(res) {
        _translate[key] = res;
      }
    }
    // 将数据保存到文件
    saveTranslate(options, lang, _translate);
  }
}