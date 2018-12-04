/**
 * Created by cherish on 2018/1/10.
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取html-webpack-plugin参数的方法 
const getHtmlConfig = function(path, title){
    let pathAlias = path && path.indexOf('/')>-1 ? path.replace(/\//g,'-') : path;
    return new HtmlWebpackPlugin({
        template    : 'html-withimg-loader!' +'./src/'+path + '.html',
        filename    : path + '.html',
        title       : title,
        inject      : 'body',
        hash        : false,
        chunks      : ['runtime','vendors',pathAlias],
        showErrors  : true,
    });
};


module.exports = {
    entry: {
        login: './src/login.js',
        '720p-edu-newmain-main': './src/720p/edu/newmain/main.js',
    },
    plugins: [
        getHtmlConfig('login','登陆'),
        getHtmlConfig('720p/edu/newmain/main','首页')
        ]
};