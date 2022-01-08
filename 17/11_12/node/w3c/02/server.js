let http = require('http'),
    url = require('url'),
    fs = require('fs');

http.createServer(function(req, res) {
    let pathname = url.parse(req.url).pathname;

    console.log('Request from ' + pathname + ' has receieved!');

    fs.readFile(pathname.substr(1), function(err, data) {
        if (err) {
            console.log(err);
            res.writeHead(404, { 'Content-Type': 'text/html' });
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data.toString());
        }
        res.end();
    })
}).listen(8787);

console.log('Server running at http://127.0.0.1:8787/');