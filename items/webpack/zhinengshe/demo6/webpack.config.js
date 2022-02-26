const path = require('path');

// 静态配置
// const config = {
//     mode: 'development',
//     entry: './src/js/index',
//     output: {
//         path: path.resolve(__dirname, './dist'),
//         filename: 'bundle.min.js'
//     },
//     module: {
//         rules: [
//             { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
//             {
//                 test: /\.jpg|png|gif/i, use: {
//                     loader: 'url-loader',
//                     options: {
//                         outputPath: 'imgs/',
//                         limit: 4 * 1024
//                     }
//                 }
//             }
//         ]
//     }
// }

// 动态配置
const config = function (env, argv) {
    env = env || { development: true };
    return {
        entry: './src/js/index',
        module: {
            rules: [
                { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
                {
                    test: /\.jpg|png|gif/i, use: {
                        loader: 'url-loader',
                        options: {
                            outputPath: 'imgs/',
                            limit: 4 * 1024
                        }
                    }
                }
            ]
        },
        ...env.development ? require('./config/webpack.development')
            : require('./config/webpack.prodction')
    }
}

module.exports = config;