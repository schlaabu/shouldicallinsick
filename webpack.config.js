'use strict';
var loaders = require('./webpack.loaders');
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '8888';

module.exports = {
    entry: [
        './app/scripts/main.js',
        './app/styles/main.scss'
    ],
    devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'tmp'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js']
    },
    resolveLoader: {
        alias: {
            'dotjs-loader': path.join(__dirname, 'webpack.dotjs-loader.js')
        }
    },
    module: {
        loaders: [...loaders, ...[{
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader?importLoaders=1', 'sass-loader'],
            exclude: ['node_modules']
        }]]
    },
    devServer: {
        contentBase: './app',
        // do not print bundle build stats
        noInfo: true,
        // enable HMR
        hot: true,
        // embed the webpack-dev-server runtime into the bundle
        inline: true,
        // serve index.html in place of 404 responses to allow HTML5 history
        historyApiFallback: true,
        open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        port: PORT,
        host: HOST
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new DashboardPlugin(),
        new HtmlWebpackPlugin({
            template: './app/index.html.ejs',
            files: {
                css: ['[name].css'],
                js: ['[name].js']
            }
        }),
    ]
};
