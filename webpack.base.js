const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: ['@babel/polyfill', './src/js/index.js'],
        other: ['@babel/polyfill', './src/js/other.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        modules: [path.resolve('node_modules')],
        alias: {
            bootstrap: 'bootstrap/dist/css/bootstrap.css'
        },
        extensions: ['.js', '.css', '.json', '.vue']
    },
    module: {
        rules: [
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
