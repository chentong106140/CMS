/**
 * Created by cherish on 2018/11/9.
 */


const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const pages = require("../config/pages.js");

module.exports = merge(pages, {
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '../webapp')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: 'single'
    },
    plugins: [
        //如果多个模块中都引用了同一个模块里面的变量，就把他放到provideplugin插件内，好处就是不需要在每一个模块内在import这个变量了
        new webpack.ProvidePlugin({
        }),
        //公共模块vendors块的文件我们一般不会修改，所以避免vendors文件打包后也跟着更新chunkhash文件名
        new webpack.HashedModuleIdsPlugin(),
        new CleanWebpackPlugin(['webapp'],{
            root: path.resolve(__dirname, '../'),       　//根目录
            verbose: true,        　　　　　　　　 //开启在控制台输出信息
            dry: false,        　　　　　　　　　　 //启用删除文件
            exclude: []                         ///排除不删除的目录，主要用于避免删除公用的文件
        }),
        //该插件可以显示出编译之前的文件和编译之后的文件的映射
        new ManifestPlugin({
            fileName: 'manifest.json',
            basePath: "../webapp/",
        })
        
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }

        ]
    }
});
