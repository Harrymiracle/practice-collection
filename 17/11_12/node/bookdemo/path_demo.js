let path = require('path');

let normlize_path = path.normalize('foo//bar//./baz/asdf/quux..');
console.log(normlize_path); //  foo\bar\baz\asdf\quux..

let join_res = path.join('./bar/zz', 'foo/baz/..');
console.log(join_res); //   bar\zz\foo
let join_res2 = path.join('bar/foo', 'baz');
console.log(join_res2); //bar\foo\baz
let join_res3 = path.join(__dirname, 'bar/foo', 'baz/test'); //__dirname变量值代表程序运行的根目录。
console.log(join_res3); //E:\练习收集\11月-17\node\bookdemo\bar\foo\baz\test

console.log(path.resolve('/bar/baz', './zz')); //   E:\bar\baz\zz   //后一个参数是个相对路径
console.log(path.resolve('/foo/bar', '/temp/file/')); //    E:\temp\file    //后一个参数是一个绝对路径
console.log(path.resolve('wwroot', 'static_file/png', '../gif/image.gif')); //E:\练习收集\11月-17\node\bookdemo\wwroot\static_file\gif\image.gif

console.log(path.relative('/data/orgin/bar/baz', '/data/orgin/foo/ff/f')); //..\..\foo\ff\f   //从第一个参数到第二个参数的相对路径


console.log(path.dirname('./foo/bar/baz/balabala.txt')); //./foo/bar/baz
console.log(path.basename('./foo/bar/baz/balabala.txt')); //balabala.txt
console.log(path.extname('./foo/bar/baz/balabala.txt')); //.txt
console.log(path.basename('./foo/bar/baz/balabala.txt', '.txt')); //balabala2