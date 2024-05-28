const fetch = require("node-fetch");
const createHttpError = require("http-errors");
const langMap = require("./langMap.js");
const defaultOptions = {
  from: "auto",
  to: "en",
};
module.exports = async (text, lang, options) => {
  const hostUrl =
    "https://translate.google.com/translate_a/single?client=at&dt=t&dt=rm&dj=1";
  let _options = {
    q: text,
    ...defaultOptions,
  };
  const { local } = options ?? {};
  if (local) {
    _options.from = langMap("google", local);
  }
  if (lang) {
    _options.to = langMap("google", lang);
  }
  const buildBody = () => {
    const { from, to, q } = _options;
    const params = {
      sl: from,
      tl: to,
      q: q,
    };
    return new URLSearchParams(params).toString();
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
  const buildText = ({ sentences }) => {
    return sentences
      .filter((s) => "trans" in s)
      .map((s) => s.trans)
      .join("");
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
