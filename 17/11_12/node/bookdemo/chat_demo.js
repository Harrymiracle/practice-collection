let net = require('net');
let server = net.createServer();
let sockets = []; //聚合所有客户端

server.on('connection', function(socket) { //接收连接
    console.log('接收到一个连接.');
    sockets.push(socket); //聚合所有客户端
    socket.on('data', function(data) { //从连接读取数据
        console.log('拿到数据:', data);
        sockets.forEach(function(otherSocket) { //广播数据
            if (otherSocket !== socket) {
                otherSocket.write(data);
            }
        })
    })

    server.on('close', function() { //删除被关闭的连接
        console.log('连接关闭。');
        let index = sockets.indexOf(socket);
        sockets.splice(index, 1);
    })
})

server.on('error', function(e) {
    console.log('连接出错：' + e.message);
})

server.on('close', function() {
    console.log('连接关闭。');
})

server.listen(4000, function() {
    console.log('服务在4000端口运行。')
});