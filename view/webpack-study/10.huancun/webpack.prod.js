const {merge} = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    //产生.map文件
    devtool: 'source-map',
    plugins: [
        /*
        //容易报错，就不使用了
        new UglifyJSPlugin({
            sourceMap: true,//产生.map文件
            uglifyOptions: {
                ecma: 8,
                compress: {
                    warnings: false,
                    drop_debugger: true,
                    drop_console: true,
                    pure_funcs: ['console.log','console.debug','console.warnings'],//移除console
                }
            }
        }),*/
        new webpack.DefinePlugin({
            //指定环境为生产环境"\"production\""
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});
