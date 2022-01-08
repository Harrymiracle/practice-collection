let fs = require('fs');

let source = fs.readFileSync('../buffer/logo.png')

fs.writeFileSync('copy_image.png', source)