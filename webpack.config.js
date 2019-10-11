const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

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
        runtimeChunk: true
    },
    entry: {
        index: [ './src/js/index.js'], // @babel/polyfill能让ie9支持promise
        other: ['./src/js/other.js']
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
        port: 8888,
        open: true,
        progress: true
    },
    watch: true,
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 500,
        ignored: /node_modules/
    },
    module: {
        noParse: /jquery/,
        rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader', // IE6语法转化为IE5语法
                    options: {
                        presets: [
                            '@babel/preset-env' // IE6语法转化为IE5语法
                        ]
                    }
                }],
                include: path.resolve(__dirname, 'src')
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
