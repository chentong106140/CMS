const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//老版本使用如下这种导入方式
//const CleanWebpackPlugin = require('clean-webpack-plugin');
//新版本使用如下这种导入方式
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const ManifestPlugin = require('webpack-manifest-plugin');

const webpack = require('webpack');

module.exports = {
    entry: {
        app:'./src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    mode: "production",
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 3000,
        host:'127.0.0.1',
        hot:true,
        proxy:{
            /**
             * 请求http://127.0.0.1:9000/orchard-api-jsyd/login.json
             * 会被代理到http://221.130.29.96:28080/orchard-api-jsyd/login.json
             */
            '/orchard-api-jsyd':{
                target:'http://221.130.29.96:28080'
            },
            /**
             * 请求：http://127.0.0.1:9000/api/login.json
             * 会被代理到http://221.130.29.96:28080/orchard-api-jsyd/login.json
             */
            '/api':{
                target:'http://221.130.29.96:28080',
                pathRewrite:{'^/api':'orchard-api-jsyd'}
            },
            /**
             * 请求：http://127.0.0.1:9000/jsyd/login.json
             * 会被代理到http://221.130.29.96:28080/orchard-api-jsyd/login.json
             */
            '/jsyd':{
                target:'http://221.130.29.96:28080/orchard-api-jsyd',
                pathRewrite:{'^/jsyd':''}
            },
        }
    },
    plugins:[
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({title: '输出管理'}),
        new HtmlWebpackPlugin({title: 'server',filename:'server.html'}),
        new ManifestPlugin()
    ]
};
