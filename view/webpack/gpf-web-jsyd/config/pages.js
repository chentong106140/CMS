/**
 * Created by cherish on 2018/1/10.
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取html-webpack-plugin参数的方法 
const getHtmlConfig = function(path , name, title){
    return new HtmlWebpackPlugin({
        template    : './src/'+path + name + '.html',
        filename    : path + name + '.html',
        favicon     : './favicon.ico',
        title       : title,
        inject      : 'body',
        hash        : false,
        chunks      : ['runtime','vendors',name],
        showErrors  : true,
    });
};


module.exports = {
    entry: {
        login: './src/login.js',
    },
    plugins: [
        getHtmlConfig('','login','登陆')
        ]
};