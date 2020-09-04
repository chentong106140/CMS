const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
    //浏览器webpack开发工具，用于定位源码,会自动生成# sourceMappingURL
    devtool: 'inline-source-map',
    //使用脚本webpack-dev-server --open  --config webpack.dev.js开启本地服务后，下面的代理才有用
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 3000,
        host: '127.0.0.1',
        //模块热替换的启用HMR
        hot: true,
        proxy: {
            /**
             * 请求http://127.0.0.1:9000/orchard-api-jsyd/login.json
             * 会被代理到http://221.130.29.96:28080/orchard-api-jsyd/login.json
             */
            '/orchard-api-jsyd': {
                target: 'http://221.130.29.96:28080'
            },
            /**
             * 请求：http://127.0.0.1:9000/api/login.json
             * 会被代理到http://221.130.29.96:28080/orchard-api-jsyd/login.json
             */
            '/api': {
                target: 'http://221.130.29.96:28080',
                pathRewrite: {'^/api': 'orchard-api-jsyd'}
            },
            /**
             * 请求：http://127.0.0.1:9000/jsyd/login.json
             * 会被代理到http://221.130.29.96:28080/orchard-api-jsyd/login.json
             */
            '/jsyd': {
                target: 'http://221.130.29.96:28080/orchard-api-jsyd',
                pathRewrite: {'^/jsyd': ''}
            },
        }
    },
    //用于输出打包前与打包后的文件对比json文件
    plugins: [
        //模块热替换的启用HMR
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ManifestPlugin(),
        new webpack.DefinePlugin({
            //指定环境为开发环境"\"dev\""
            'process.env.NODE_ENV': JSON.stringify('dev')
        })
    ]
});
