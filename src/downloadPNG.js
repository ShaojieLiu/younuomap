
const http = require('http');
const fs = require('fs');
const path = require('path');

const downloadPNG = async (url, dir, fileName) => {
  return new Promise((resolve, reject) => {

    const dest = path.join(dir, fileName);
    // const dest = path.join('./', 'filename.png');

    const exist = fs.existsSync(dest)
    const len = exist && fs.readFileSync(dest).length
    if (exist && len) {
      console.log("文件已存在, 无需下载", url, dest)
      resolve(true)
      return
    }

    // 你可能需要自行确保该路径存在
    const file = fs.createWriteStream(dest);

    http.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.error('下载错误', url, response.statusCode, dest);
        reject('resource error')
      }

      res.on('end', () => {
        console.log('下载完成', url, dest);
      });

      // 进度、超时等

      file.on('finish', () => {
        file.close();
        resolve(true)
      }).on('error', (err) => {
        fs.unlink(dest);
        reject('disk error')
      });

      res.pipe(file);
    });
  })
}

module.exports = downloadPNG
