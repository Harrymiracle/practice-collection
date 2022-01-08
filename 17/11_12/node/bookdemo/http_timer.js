let http = require('http');

http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    let left = 6;
    let interval = setInterval(function() {
        for (let i = 0; i < 10; i++) {
            res.write(Date.now() + ' ');
        }
        if (--left === 0) {
            clearInterval(interval);
            res.end();
        }
    }, 1000)
}).listen(4001, function() {
    console.log('Server is running on port 4001!');
});