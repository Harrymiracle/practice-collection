const path = require('path')

module.exports=function(env,argv){
    console.log(env);
    env=env||{development: true};

    return {
        entry: './src/js/index.js',
        ...env.production?require('./config/webpack.production.js'):require('./config/webpack.development.js'),
        module: {
            rules: [
                {test: /\.css$/i, use: ['style-loader', 'css-loader']},
                {test: /\.(png|gif|jpg)$/i, use:{
                    loader: 'url-loader',
                    options: {
                        outputPath: 'imgs/',
                        limit: 4*1024
                    }
                }}            
            ]
        },
    }
}

/*
module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {test: /\.css$/i, use: ['style-loader', 'css-loader']},
            {test: /\.(png|gif|jpg)$/i, use:{
                loader: 'url-loader',
                options: {
                    outputPath: 'imgs/',
                    // publicPath: 'dist/imgs',
                    limit: 4*1024
                }
            }}            
        ]
    },
    
}
*/