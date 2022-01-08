let ws = require("nodejs-websocket");
let PORT = '8989';
let serverCount = 0;

// Scream server example: "hi" -> "HI!!!"
let server = ws.createServer(function(conn) {
    console.log("New connection");
    serverCount++;
    conn.nickname = 'user' + serverCount;
    let msg = {};
    msg.type = 'enter';
    msg.data = conn.nickname + '进入';
    broadcast(JSON.stringify(msg));
    conn.on("text", function(str) {
        console.log("Received " + str);
        let msg = {};
        msg.type = 'message';
        msg.data = conn.nickname + '说：' + str;
        broadcast(JSON.stringify(msg));
    })
    conn.on("close", function(code, reason) {
        console.log("Connection closed");
        let msg = {};
        msg.type = 'leave';
        msg.data = conn.nickname + '离开';
        broadcast(JSON.stringify(msg));
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