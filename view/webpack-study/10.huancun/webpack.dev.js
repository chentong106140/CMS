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
        //模块热替换的启用HMR，改为true的时候，同时需要使用插件里面的两个插件，单独改为true是不行的
        //同时，如果output.filename配置成'[name].[contenthash].js'与hot改为true就会有冲突，因为热替换不能在文件夹根据hash命名同时使用
        hot: false,
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
        /*
        //模块热替换的启用HMR
        //开启热替换，需要同时修改devServer.hot=true,并且把下面的两个插件开启
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),*/
        //该插件可以显示出编译之前的文件和编译之后的文件的映射
        new ManifestPlugin({
            fileName: 'manifest.json',
            basePath: "/dist/",
        }),
        new webpack.DefinePlugin({
            //指定环境为开发环境"\"dev\""
            'process.env.NODE_ENV': JSON.stringify('dev')
        })
    ]
});
