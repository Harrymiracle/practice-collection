const path = require('path');
// module.exports = {       //单页面
//     mode: 'development',
//     entry: './src/index.js',
//     output: {
//         path: path.resolve(__dirname,'dest'),
//         filename: 'bundle.min.js'
//     }
// }


module.exports = {      //多页面
    mode: 'development',
    entry: {    //是一个JSON,它下面的模块名字可以随意命名
        index: './src/index.js',    
        news: './src/news.js'
    },
    output: {
        path: path.resolve(__dirname,'dest'),
        filename: '[name].bundle.min.js'
    }
}