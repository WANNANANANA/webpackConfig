const merge = require('webpack-merge');
const base = require('./webpack.base.js');

module.exports = merge(base, {
    devtool: 'inline-source-map',
    output: {
        publicPath: 'http://localhost:8880/'
    },
    devServer: {
        contentBase: './dist',
        port: 8880,
        open: true,
        progress: true
    },
})