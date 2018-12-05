/**
 * Created by cherish on 2018/1/10.
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取html-webpack-plugin参数的方法 
const getHtmlConfig = function(path, title){
    let pathAlias = path && path.indexOf('/')>-1 ? path.replace(/\//g,'-') : path;
    return new HtmlWebpackPlugin({
        //template    : 'html-withimg-loader!./src/'+path + '.html',引入公共文件：#include("./common/html/header.html")
        template    : 'html-loader?interpolate&attrs=img:src img:data-src!./src/'+path + '.html',//切记，不要在webpack中配置rules的html-loader,html-loader?interpolate&attrs=img:src img:data-src用来启用${require(xx.html)}插值,同时解析img标签的data-src属性作为图片进行打包路径，并且解析html中src进行图片打包，流程就是先使用html-loader进行html打包好之后生成html字符串，最后再由webpack-html-plugin进行处理js,css
        //template    : './src/'+path + '.html',
        filename    : path + '.html',
        title       : title,
        inject      : 'head',
        hash        : false,
        chunks      : ['runtime','vendors','iptv-core','iptv-key','iptv-config','iptv-api','iptv-platform',pathAlias],
        showErrors  : true,
    });
};


module.exports = {
    entry: {
        'iptv-core':'./src/common/js/iptv.core.js',
        'iptv-key':'./src/common/js/iptv.key.js',
        'iptv-config':'./src/common/js/iptv.config.js',
        'iptv-api':'./src/common/js/iptv.api.js',
        'iptv-platform': './src/720p/edu/common/iptv.platform.js',
        'login': './src/login.js',
        '720p-edu-newmain-main': './src/720p/edu/newmain/main.js',
        '720p-edu-detail-videodetail': './src/720p/edu/detail/videodetail.js',
    },
    plugins: [
        getHtmlConfig('login','登陆'),
        getHtmlConfig('720p/edu/newmain/main','首页'),
        getHtmlConfig('720p/edu/detail/videodetail','详情页')
        ]
};