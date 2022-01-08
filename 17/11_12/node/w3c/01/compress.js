let fs = require('fs'),
    zlib = require('zlib');

fs.createReadStream('./bg/input.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('input.txt.gz'));

console.log('写入完成。');