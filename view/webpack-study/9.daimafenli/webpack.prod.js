const {merge} = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    //产生.map文件
    devtool: 'source-map',
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true,//产生.map文件
        }),
        new webpack.DefinePlugin({
            //指定环境为生产环境"\"production\""
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});
