var ws = require("nodejs-websocket");
var PORT = '8989';
var serverCount = 0;

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function(conn) {
    console.log("New connection");
    serverCount++;
    conn.nickname = 'user' + serverCount;
    broadcast(conn.nickname + '进入');
    conn.on("text", function(str) {
        console.log("Received " + str);
        broadcast(str);
    })
    conn.on("close", function(code, reason) {
        console.log("Connection closed");
        broadcast(conn.nickname + '离开');
    })
    conn.on('error', function(err) {
        console.log('Handle error');
        console.log(err);
    })
}).listen(PORT)

console.log('Server is running on port:', PORT);

function broadcast(ss) {
    server.connections.forEach(function(connection) { //server.connections是一个所有已连接的客户端数组
        connection.sendText(ss);
    })
}