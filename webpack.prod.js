const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(base, {
    // devtool: 'source-map',
    optimization: {
        // minimizer: [
        //     new TerserWebpackPlugin({
        //         terserOptions: {
        //             compress: {
        //                 warnings: false,
        //                 drop_console: true,
        //                 drop_debugger: true,
        //                 pure_funcs: ['console.log']
        //             }
        //         }
        //     })
        // ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    priority: 1,
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 30000,
                    minChunks: 2,
                    name: 'vendor'
                }
            }
        },
        runtimeChunk: true
    },
    output: {
        filename: '[name]-[chunkhash:8].js',
        publicPath: 'http://localhost:8880/'
    },
    watch: true,
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 500,
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                // test: /\.js$/,
                // use: [{
                //     loader: 'babel-loader', // IE6语法转化为IE5语法
                //     options: {
                //         presets: [
                //             '@babel/preset-env' // IE6语法转化为IE5语法
                //         ]
                //     }
                // }]
            }
        ],
    },
    plugins: [
        new OptimizeCSSAssetsPlugin()
    ]
})