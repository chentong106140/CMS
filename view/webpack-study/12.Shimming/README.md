``` bash

npm安装依赖
【npm install xxx】利用 npm 安装xxx依赖到当前命令行所在目录
【npm install xxx -g】利用npm安装全局依赖xxx
【npm install xxx –save】 安装并写入package.json的”dependencies”中
【npm install xxx –save-dev】安装并写入package.json的”devDependencies”中
 

npm删除依赖
【npm uninstall xxx】删除xxx依赖
【npm uninstall xxx -g】删除全局依赖xxx

更新依赖的3种方法
方法一
先在package.json里修改好指定版本号，然后输入:
npm update webpack

方法二
npm update webpack@4.7.0
会把webpack更新至指定版本，但是不会写到package.json文件里，如果需要写到package.json里执行如下命令:
npm update webpack@4.7.0 --save-dev

方法三
安装最新版本
npm update webpack@latest --save-dev



//CommonJS模块语法
module.exports = { Foo };
对应使用require('xx')导入
var {Foo} = require('xx')

//module（ES模块语法）
export { Foo };
export default Foo;
对应使用import xx from xx导入
import {Foo} from 'xx';

cnpm init -y

//安装webpack5.x版本
//cnpm install --save-dev webpack@next

cnpm install --save-dev webpack webpack-cli

cnpm install --save lodash

cnpm install --save-dev html-webpack-plugin

cnpm install --save-dev clean-webpack-plugin

cnpm install --save-dev webpack-manifest-plugin

cnpm install --save-dev webpack-dev-server

cnpm install --save-dev express webpack-dev-middleware

cnpm install --save-dev webpack-merge

cnpm install --save-dev uglifyjs-webpack-plugin


//处理css文件
cnpm install --save-dev style-loader css-loader

//处理图片，字体文件
cnpm install --save-dev file-loader

//处理xml文件
cnpm install --save-dev csv-loader xml-loader

cnpm install --save-dev babel-loader @babel/core @babel/preset-env

cnpm install --save-dev babel-preset-es2015

cnpm install --save-dev  imports-loader
cnpm install --save-dev  exports-loader

//安装老版本
//cnpm install --save-dev  imports-loader@0.8.0
//cnpm install --save-dev  exports-loader@0.7.0



//下载自己封装的库，
cnpm install  morgan-iptv-core@latest --save
cnpm install  morgan-iptv-key@latest --save



用法 

cnpm run dev


```