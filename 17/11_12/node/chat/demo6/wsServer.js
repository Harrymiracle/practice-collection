let app = require('http').createServer();
let io = require('socket.io')(app);
let PORT = '8989';
let serverCount = 0;

app.listen(PORT);

io.on('connection', function(socket) {
    serverCount++;
    socket.nickname = 'user' + serverCount;
    io.emit('enter', socket.nickname + '进入');

    socket.on('message', function(str) {
        io.emit('message', socket.nickname + 'says:' + str);
    })

    socket.on('disconnect', function() {
        io.emit('leave', socket.nickname + '离开');
    })
})


console.log('Server is running on port:', PORT);