// 文件操作
const glob = require('glob')
const path = require("path");

// 获取目录下的文件列表
module.exports = function(options = {}) {
  let results = [];
  const getSourceFiles = (entry, exclude) => {
    return glob.sync(`${entry}/**/*.{js,ts,tsx,jsx,vue}`, {
      exclude: exclude || [],
    })
  }
  const { entry, exclude } = options;
  const entrys = [].concat(entry);
  results = entrys.reduce((total) => {
    const files = getSourceFiles(entry, exclude).map(file => {
      return {
        filePath: file,
        ext: path.extname(file),
      }
    });
    return total.concat(files);
  }, []);
  return results;
}
