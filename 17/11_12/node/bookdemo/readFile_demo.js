//访问http://localhost:8989/files/file.txt

let http = require('http'),
    path = require('path'),
    fs = require('fs');

http.createServer(function(req, res) {
    let file = path.normalize('.' + req.url);
    console.log('Trying to server', file);

    function reportError(e) {
        console.log(e);
        res.writeHead(500);
        res.end('Internet server error.');
    }

    fs.exists(file, function(exists) {
        if (exists) {
            fs.stat(file, function(err, stat) {
                let rs;
                if (err) {
                    return reportError(err);
                }
                if (stat.isDirectory()) {
                    res.writeHead(403);
                    res.end('Forbidden!');
                } else {
                    rs = fs.createReadStream(file);
                    rs.on('error', reportError);
                    res.writeHead(200);
                    rs.pipe(res);
                }
            })
        } else {
            res.writeHead(400);
            res.end('Not Found!');
        }
    })
}).listen(8989, function() {
    console.log('Server is running on port 8989!');
});