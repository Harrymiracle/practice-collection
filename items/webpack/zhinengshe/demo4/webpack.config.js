const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'dest'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.less$/i, use: ['style-loader', 'css-loader', 'less-loader']},
            { test: /\.(js|jsx)$/i, exclude: /node_modules/, use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }}
        ]
    },
    devtool: 'source-map'   //调试工具
}