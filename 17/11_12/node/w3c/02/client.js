//运行server.js的情况下再运行此模块

let http = require('http');

let options = { // 用于请求的选项
    host: 'localhost',
    port: '8787',
    path: '/index.html',
}

let callback = function(res) { // 处理响应的回调函数
    let bdy = '';

    res.on('data', function(data) {
        bdy += data; // 不断更新数据
    })

    res.on('end', function() {
        console.log(bdy); // 数据接收完成
    })
}

// 向服务端发送请求
let req = http.request(options, callback);

req.end();