
const http = require('http');
const fs = require('fs');
const path = require('path');

const downloadPNG = (url, dir, fileName) => {
  const dest = path.join(dir, fileName);
  // const dest = path.join('./', 'filename.png');
  // 你可能需要自行确保该路径存在
  const file = fs.createWriteStream(dest);

  http.get(url, (res) => {
    if (res.statusCode !== 200) {
      console.error('下载错误', url, response.statusCode, dest);
      return;
    }

    res.on('end', () => {
      console.log('下载完成', url, dest);
    });

    // 进度、超时等

    file.on('finish', () => {
      file.close();
    }).on('error', (err) => {
      fs.unlink(dest);
    });

    res.pipe(file);
  });
}

module.exports = downloadPNG
