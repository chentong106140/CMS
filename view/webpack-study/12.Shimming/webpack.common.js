const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/index.js',
        window:'./src/window.js'
    },

    output: {
        //pathinfo: false,
        //[contenthash]浏览器缓存时使用，一旦打包文件内容被更新修改，打包后的文件名就会不一样，如果没有修改hash名称就会一样，这个在浏览器缓存中使用是很的
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        //动态加载模块的打包名称
        // 如果在optimization.splitChunks进行了配置，如下的chunkFilename就不用再进行配置了
        //chunkFilename: '[name].[contenthash].js',
    },

    optimization: {
        //为了保证公共库vendors.js打包的文件名，打包前与打包后的hash保持一致
        moduleIds: 'hashed',
        //将 runtime 代码拆分为一个单独的 chunk。
        // 将其设置为 single 来为所有 chunk 创建一个 runtime bundle
        //运行时的打包文件为：runtime.js
        runtimeChunk: 'single',
        //将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },

    plugins: [
        //定义删除目录
        new CleanWebpackPlugin(['dist']),
        //创建一个Html
        new HtmlWebpackPlugin({
            title: 'Shimming'
        }),
        //定义全局变量，所有模块不需要使用import _ from 'lodash'就能使用lodash
        new webpack.ProvidePlugin({
            _: 'lodash',
            //还可以使用 ProvidePlugin 暴露出某个模块中单个导出，下面暴露了lodash插件的join模块
            join: ['lodash', 'join'],
            jquery: 'jquery'
        }),
    ],

    module: {
        rules: [
            /*//如下这种改变模块this指向的方法在当前版本已经无效了
            {
                test: require.resolve('./src/index.js'),
                use: 'imports-loader?this=>window',
            },*/
            /*//如下这种方式在当前版本已经失效了
            {
                test: require.resolve('./src/globals.js'),
                use: 'exports-loader?file,parse=helpers.parse',
            },*/
            //https://webpack.docschina.org/loaders/exports-loader/#root
            {
                test: require.resolve('./src/globals.js'),
                loader: 'exports-loader',
                options: {
                    //type: commonjs（CommonJS模块语法）或者type：module（ES模块语法）。
                    type: 'module',
                    exports: [
                        'default say',      //对应导出语句：export default say 
                        'helper',           //对应导出语句：export {helper}
                        'infos',            //对应导出语句：export {infos}
                        'named say says',   //对应导出语句：export {say as says}
                    ],
                },
            },
            {
                test: require.resolve('./src/window.js'),
                use: [
                    {
                        loader: 'imports-loader',
                        options: {
                            //使用commonjs语法导入
                            type:'commonjs',
                            imports: [
                                //注意中间的空格不能多，多一个空格就会报错
                                'single morgan-iptv-core iptv',//对应导入语句var iptv = require('morgan-iptv-core');
                            ],
                            additionalCode: 'console.log("自动导入模块成功！");',
                            wrapper: {
                                thisArg: 'window',
                                args: ['iptv', 'jquery'],
                            }
                        }
                    },
                ],
            },
            {
                //给某个模块，自动导入模块，无需手动import xx from 'xx'
                test: require.resolve('./src/index.js'),
                use: [
                    {
                        loader: 'imports-loader',
                        options: {
                            imports: [
                                'named morgan-iptv-core iptv',//对应导入语句import iptv from morgan-iptv-core
                                //  
                                /**
                                 * 注意：下面解析模块的路径是./print，为什么不是./src/print呢？
                                 * 主要是由于imports-loader插件默认是在./src为根目录开始解析的，所以需要忽略到./src
                                 *
                                 * default,named,namespace,side-effects都是属于语法(syntax)
                                 *
                                 * default：使用import xx from 'xx'
                                 * named：使用import {xx as xx} from 'xx'
                                 * namespace：使用import * as xx from 'xx'
                                 * side-effects：使用import 'xx'
                                 */
                                'default ./print print',//对应导入语句：import print from './print'
                                'named ./print print p',//对应导入语句：import {print as p} from './print'
                                'named ./print show s',//对应导入语句：import {show as s} from './print'
                                'named ./print say',//对应导入语句：import {say} from './print'
                                'namespace ./print myPrint',//对应导入语句：import * as myPrint from './print'
                                'side-effects morgan-iptv-key',//对应导入语句：import 'morgan-iptv-key'
                                /*{
                                    syntax: 'default',
                                    moduleName: 'jquery',//对应导入语句：import $ from 'jquery'
                                    name: 'jquery'
                                },*/
                            ],
                            //自动在./src/index.js模块顶部添加如下代码
                            additionalCode: 'var name = "陈通";window.jquery=jquery;',
                            //自动在./src/index.js模块外部使用().call(window,iptv,$)，改变this指向
                            wrapper: {
                                thisArg: 'window',
                                args: ['iptv', 'jquery'],
                            }
                        }
                    },
                ],
            },
            {
                //以 .css 结尾的全部文件，都将被提供给 style-loader 和 css-loader
                //这使你可以在依赖于此样式的文件中 import './style.css'。
                // 现在，当该模块运行时，含有 CSS 字符串的 <style> 标签，将被插入到 html 文件的 <head> 中
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                //现在，当你 import MyImage from './my-image.png'，该图像将被处理并添加到 output 目录，
                // _并且_ MyImage 变量将包含该图像在处理后的最终 url。
                // 当使用 css-loader 时，如上所示，你的 CSS 中的 url('./my-image.png') 会使用类似的过程去处理。
                // loader 会识别这是一个本地文件，并将 './my-image.png' 路径，替换为输出目录中图像的最终路径。
                // html-loader 以相同的方式处理 <img src="./my-image.png" />。
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                //像字体这样的其他资源如何处理呢？file-loader 和 url-loader 可以接收并加载任何文件，
                // 然后将其输出到构建目录。这就是说，我们可以将它们用于任何类型的文件，包括字体。
                //通过配置好 loader 并将字体文件放在合适的地方，你可以通过一个 @font-face 声明引入。
                // 本地的 url(...) 指令会被 webpack 获取处理，就像它处理图片资源一样：
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            //可以 import 这四种类型的数据(JSON, CSV, TSV, XML)中的任何一种，
            // 所导入的 Data 变量将包含可直接使用的已解析 JSON
            {
                test: /\.(csv|tsv)$/,
                use: ['csv-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            /*{
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]
            }*/
        ]
    }
};
