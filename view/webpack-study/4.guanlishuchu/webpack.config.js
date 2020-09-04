const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//老版本使用如下这种导入方式
//const CleanWebpackPlugin = require('clean-webpack-plugin');
//新版本使用如下这种导入方式
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    entry: {
        app:'./src/index.js',
        print:'./src/print.js'
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({title: '输出管理'}),
        new ManifestPlugin()
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
