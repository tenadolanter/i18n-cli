const fetch = require("node-fetch");
const md5 = require('md5');
const createHttpError = require('http-errors');
const langMap = require("./langMap.js");
const defaultOptions = {
  from: "auto",
  to: "en",
  appKey: "",
  salt: "wgb236hj",
  sign: "",
}
module.exports = async (text, lang, options) => {
  const hostUrl =  "https://openapi.youdao.com/api";
  let _options = {
    q: text,
    ...defaultOptions,
  }
  const { local } = options ?? {};
  const { appId, secretKey } = options?.translate ?? {};
  if(local) {
    _options.from = langMap('youdao', local);
  }
  if(lang) {
    _options.to = langMap('youdao', lang);
  }
  _options.appKey = appId;
  const str = `${_options.appKey}${_options.q}${_options.salt}${secretKey}`;
  _options.sign = md5(str);
  const buildBody = () => {
    return new URLSearchParams(_options).toString();
  }
  const buildOption = () => {
    const opt = {};
    opt.method = 'POST';
    opt.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    }
    opt.body = buildBody();
    return opt;
  }
  const buildError = async (res) => {
    const extractTooManyRequestsInfo = (html) => {
      const ip = html.match(/IP address: (.+?)<br>/)?.[1] || '';
      const time = html.match(/Time: (.+?)<br>/)?.[1] || '';
      const url = (html.match(/URL: (.+?)<br>/)?.[1] || '').replace(/&amp;/g, '&');
      return { ip, time, url };
    }
    if (res.status === 429) {
      const text = await res.text();
      const { ip, time, url } = extractTooManyRequestsInfo(text);
      const message = `${res.statusText} IP: ${ip}, Time: ${time}, Url: ${url}`;
      return createHttpError(res.status, message);
    } else {
      return createHttpError(res.status, res.statusText);
    }
  }
  const buildText = ({ errorCode, translation }) => {
    if(errorCode === "0") {
      return translation?.[0];
    } else {
      console.error(`有道翻译报错: ${errorCode}`)
      return '';
    }
  }
  const fetchOption = buildOption();
  const res = await fetch(hostUrl, fetchOption)
  if(!res.ok) {
    throw await buildError(res)
  }
  const raw = await res.json();
  const _text = buildText(raw);
  return _text;
}