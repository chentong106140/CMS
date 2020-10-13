const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/index.js',
    },

    //添加typescript支持1
    resolve: {
        extensions: [ '.tsx', '.ts','.js' ],
    },

    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
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
            $: 'jquery'
        }),
    ],

    module: {
        rules: [
            //添加typescript支持2
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
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
            {
                //使用如下解析js语法，会导致this指向的是undefined，并且这个loader插件必须放在rules数组最后面
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }]
            },
        ]
    }
};
