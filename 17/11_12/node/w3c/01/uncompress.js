let fs = require('fs'),
    zlib = require('zlib');

fs.createReadStream('input.txt.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('inputx.txt'));

console.log('文件解压完成。');