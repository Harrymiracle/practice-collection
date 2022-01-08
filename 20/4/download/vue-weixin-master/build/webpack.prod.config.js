const path = require('path');

const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.config');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = merge(baseConfig, {
    mode: 'production',
    output: {
        path: path.resolve('dist'),
        filename: 'static/[name].[contenthash].js',
        chunkFilename: 'static/[name].[contenthash].js'
    },

    devtool: "cheap-module-map",
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve('./')
        }),
        new MiniCssExtractPlugin({
            filename: 'static/[name].[contenthash].css'
        }),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    safe: true
                },
            })
        ]
    }
})
