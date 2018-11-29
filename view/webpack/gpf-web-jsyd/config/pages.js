/**
 * Created by cherish on 2018/1/10.
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        login: './src/login.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '登陆',
            filename:'login.html',
            template:'src/login.html',
            inject:'body',
            hash:true,
            chunks:['runtime','vendors','login'],
            showErrors:true,
        })
        ]
};