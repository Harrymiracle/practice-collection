let fs = require('fs');
let readstream = fs.createReadStream('./stream_copy.js');
let n;

readstream.on('data', function(chunk) {
        n++;
        console.log('data emit');
        console.log(Buffer.isBuffer(chunk));
        // console.log(chunk.toString('utf8'));
        readstream.pause();
        console.log('dats stream paused');
        setTimeout(function() {
            console.log('data paused end');
            readstream.resume();
        }, 3000)

    })
    .on('readable', function() {
        console.log('data readable');
    })
    .on('end', function() {
        console.log(n);
        console.log('data read end');
    })
    .on('close', function() {
        console.log('data read stream closed');
    })
    .on('error', function(err) {
        console.log('data read error' + err);
    });