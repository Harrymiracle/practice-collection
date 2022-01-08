const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dest'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {test: /\.css$/i, use:[
                'style-loader', 
                'css-loader', 
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [autoprefixer] 
                    } 
                }]
            }
        ]
    }
}