const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const webpack = require('webpack');

module.exports = merge(base, {
    // devtool: 'inline-source-map',
    output: {
        filename: '[name]-[hash:8].js',
        publicPath: 'http://localhost:8888/'
    },
    devServer: {
        contentBase: './dist',
        port: 8888,
        open: true,
        progress: true,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.ProvidePlugin({ // 不必通过import/require使用模块
        //     $: 'jquery'
        // })
    ]
})