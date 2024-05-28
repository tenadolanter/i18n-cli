const fetch = require("node-fetch");
const md5 = require("md5");
const createHttpError = require("http-errors");
const langMap = require("./langMap.js");
const defaultOptions = {
  from: "auto",
  to: "en",
  appid: "",
  salt: "wgb236hj",
  sign: "",
};
module.exports = async (text, lang, options) => {
  const hostUrl = "http://api.fanyi.baidu.com/api/trans/vip/translate";
  let _options = {
    q: text,
    ...defaultOptions,
  };
  const { local } = options ?? {};
  const { appId, secretKey } = options?.translate ?? {};
  if (local) {
    _options.from = langMap("baidu", local);
  }
  if (lang) {
    _options.to = langMap("baidu", lang);
  }
  _options.appid = appId;
  const str = `${_options.appid}${_options.q}${_options.salt}${secretKey}`;
  _options.sign = md5(str);
  const buildBody = () => {
    return new URLSearchParams(_options).toString();
  };
  const buildOption = () => {
    const opt = {};
    opt.method = "POST";
    opt.headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    };
    opt.body = buildBody();
    return opt;
  };
  const buildError = async (res) => {
    const extractTooManyRequestsInfo = (html) => {
      const ip = html.match(/IP address: (.+?)<br>/)?.[1] || "";
      const time = html.match(/Time: (.+?)<br>/)?.[1] || "";
      const url = (html.match(/URL: (.+?)<br>/)?.[1] || "").replace(
        /&amp;/g,
        "&"
      );
      return { ip, time, url };
    };
    if (res.status === 429) {
      const text = await res.text();
      const { ip, time, url } = extractTooManyRequestsInfo(text);
      const message = `${res.statusText} IP: ${ip}, Time: ${time}, Url: ${url}`;
      return createHttpError(res.status, message);
    } else {
      return createHttpError(res.status, res.statusText);
    }
  };
  const buildText = ({ error_code, error_msg, trans_result }) => {
    if (!error_code) {
      return trans_result?.map((item) => item.dst);
    } else {
      console.error(`百度翻译报错: ${error_code}, ${error_msg}`);
      return "";
    }
  };
  const fetchOption = buildOption();
  const res = await fetch(hostUrl, fetchOption);
  if (!res.ok) {
    throw await buildError(res);
  }
  const raw = await res.json();
  const _text = buildText(raw);
  return _text;
};
