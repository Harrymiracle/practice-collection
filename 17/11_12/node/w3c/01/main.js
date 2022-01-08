//events
let events = require('events'),
    eventEmitter = new events.EventEmitter();

let connect_handler = function connect() {
    console.log('连接成功');
    eventEmitter.emit('data_received');
}

eventEmitter.on('connect', connect_handler);

eventEmitter.on('data_received', function() {
    console.log('数据接收完毕。');
})

eventEmitter.emit('connect');

console.log('程序运行结束！');



//buffer
let buf = new Buffer(256);
let len = buf.write('www.w3cschool.com');
console.log('写入字节数：' + len);

let bf = new Buffer('w3cschool.com');
let jsn = bf.toJSON(bf);
console.log(jsn);

let bf2 = new Buffer('www.'),
    bf3 = new Buffer('w3cschool.'),
    bf4 = new Buffer('com');
let res = Buffer.concat([bf2, bf3, bf4]);
console.log(res.toString());



//stream
//读取
let fs = require('fs'),
    data = '';
let readstream = fs.createReadStream('./bg/input.txt');
readstream.setEncoding('UTF8');

readstream.on('data', function(chunk) {
    data += chunk;
})

readstream.on('end', function() {
    console.log(data);
})

readstream.on('error', function(err) {
    console.log(err.stack);
})

console.log('程序执行完毕0。');


//写入
let writestream = fs.createWriteStream('output1.txt'),
    data1 = 'W3Cschool教程官网地址：www.w3cschool.cn';

writestream.write(data1, 'UTF8');
writestream.end();

writestream.on('finish', function() {
    console.log('写入完成。');
})

writestream.on('error', function(err) {
    console.log(err.stack);
})

console.log('程序执行完毕1。');



// 管道流
let readstream2 = fs.createReadStream('./bg/input.txt'),
    writestream2 = fs.createWriteStream('output2.txt');

readstream2.pipe(writestream2);

console.log('程序执行完毕2。');