const Progress = require("progress");
const translate = require("./translate.js");
const sleep = require("../utils/sleep.js");
const saveTranslate = require("../utils/saveTranslate.js");
const getLangTranslates = require("../utils/getTranslate.js");
module.exports = async (options) => {
  const { type, interval = 1000 } = options?.translate ?? {};
  const { langs, local } = options ?? {};
  // 保存翻译后的内容
  const batchTranslateResolve = (translates, keys, _translate) => {
    const len = translates.length;
    for (let i = 0; i < len; i++) {
      const text = translates[i];
      const key = keys[i];
      _translate[key] = text;
    }
  };

  // 获取当前语言下需要翻译部分
  const getNeedTranslate = (options, lang) => {
    const { local } = options ?? {};
    let result = {};
    const localObj = getLangTranslates(options, local);
    const langObj = getLangTranslates(options, lang);
    for (let key in localObj) {
      if (!langObj[key]) {
        result[key] = localObj[key];
      }
    }
    return result;
  };

  // 将需要翻译的语言内容存到配置里面
  const langLen = langs.length;
  // 设置最大翻译字符串长度
  const maxStringLen = 1000;
  const separator = "\n";
  for (let i = 0; i < langLen; i++) {
    const lang = langs[i];
    // 根据local和当前语言的对比，计算出needTranslate的值
    let needTranslate = getNeedTranslate(options, lang);
    const keys = Object.keys(needTranslate);
    const keyLen = keys.length;
    const bar = new Progress(":bar :percent", { total: keyLen });
    console.log(`开始翻译${lang}`);
    let _translate = {};
    let collectText = [];
    let collectKey = [];
    let collectTextLength = 0;
    for (let j = 0; j < keyLen; j++) {
      const key = keys[j];
      const text = needTranslate[key];
      collectTextLength = collectTextLength + text.length + separator.length;
      collectText.push(text);
      collectKey.push(key);
      if (collectTextLength >= maxStringLen || j === keyLen - 1) {
        const translateText = collectText.join(separator);
        await sleep(interval);
        const res = await translate(type, translateText, lang, options);
        if (res) {
          let resArr = [];
          if (Object.prototype.toString.call(res) === "[object Array]") {
            resArr = res.map((item) => item);
          } else {
            resArr = res.split(separator);
          }
          batchTranslateResolve(resArr, collectKey, _translate);
        }
        collectText = [];
        collectKey = [];
        collectTextLength = 0;
      }
      bar.tick();
    }
    // 将数据保存到文件
    saveTranslate(options, lang, _translate);
  }
};
