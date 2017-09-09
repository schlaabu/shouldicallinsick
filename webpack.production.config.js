'use strict';
var loaders = require('./webpack.loaders');
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: [
        './app/scripts/main.js',
        './app/styles/main.scss'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        loaders: [...loaders, ...[{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use : [
                    'css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]',
                    'sass-loader?outputStyle=expanded'
                ]
            }),
            exclude: ['node_modules']
        }]]
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: './app/index.html.ejs',
            files: {
                css: ['[name].css'],
                js: ['[name].js']
            }
        }),
    ]
};
