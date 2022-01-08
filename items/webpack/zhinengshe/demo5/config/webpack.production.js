const path = require('path')

module.exports = {
    mode: 'production',
    output: {
        path: path.resovle(__dirname,'dest'),
        filename: 'bundle.min.js'
    }
}