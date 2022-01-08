let fs = require('fs');

fs.readFile('logo.png', function(erro, origin_buffer) {
    console.log(Buffer.isBuffer(origin_buffer));

    fs.writeFile('logo_buffer.png', origin_buffer, function(err) {
        if (err) console.log(err);
    });

    let base64_image = origin_buffer.toString('base64');
    console.log(base64_image);

    let decoded_image = new Buffer(base64_image, 'base64');
    console.log(Buffer.compare(origin_buffer, decoded_image));

    fs.writeFile('logo_decoded.png', function(err) {
        if (err) console.log(err);
    });
});