const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
// const webpack = require('webpack');

module.exports = {
    optimization: { // 耗性能 生产环境下使用即可
        minimizer: [
            new TerserWebpackPlugin({
                terserOptions: {
                    compress: {
                        warnings: false,
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ['console.log']
                    }
                }
            })
        ],
        splitChunks: {
            cacheGroups: {
                vendor: { // 分离出polyfill
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
    entry: {
        index: ['@babel/polyfill', './src/js/index.js'],
        other: ['@babel/polyfill', './src/js/other.js']
    },
    output: {
        filename: '[name]-[chunkhash:8].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:8888/'
    },
    resolve: {
        modules: [path.resolve('node_modules')],
        alias: {
            bootstrap: 'bootstrap/dist/css/bootstrap.css'
        },
        extensions: ['.js', '.css', '.json', '.vue']
    },
    devServer: {
        contentBase: './dist',
        port: 8080,
        open: true,
        progress: true,
        // hot: true
    },
    watch: true,
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 500,
        ignored: /node_modules/
    },
    module: {
        noParse: /jquery/,
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader', // IE6语法转化为IE5语法
                    options: {
                        presets: [
                            '@babel/preset-env' // IE6语法转化为IE5语法
                        ]
                    }
                }],
                include: path.resolve(__dirname, 'src') // 这个要谨慎使用 比如当@babel-polyfill单独提取出来后 它是属于node_modules的
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')()
                            ]
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: "img/"
                    }
                }]
            },
            {
                test: /\.(mp4)(\?.*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'vidio/'
                    }
                }]
            },
            {
                test: /\.(html)$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'img:data-src', 'audio:src', 'video:poster', 'video:src', 'link:href'],
                        minimize: true
                    }
                }]
            }
        ]
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style/[name].css',
        }),
        new OptimizeCSSAssetsPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            excludeChunks: ['other']
        }),
        new HtmlWebpackPlugin({
            template: './other.html',
            filename: 'other.html',
            excludeChunks: ['index']
        })
    ]
}
