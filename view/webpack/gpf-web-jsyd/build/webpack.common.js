/**
 * Created by cherish on 2018/11/9.
 */


const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const pages = require("../config/pages.js");
//cnpm install extract-text-webpack-plugin@next --save-dev必须加上@next标记，否则webpack4无法编译
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(pages, {
    output: {
        filename: 'common/js/[name].[chunkhash].js',
        path: path.resolve(__dirname, '../webapp'),
        //指定所有打包文件的文件路径前缀
        publicPath: '/gpf-web-jsyd/',
        //这些文件名需要在 runtime 根据 chunk 发送的请求去生成
        chunkFilename: 'common/js/[name].[chunkhash].js',
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
        /**
         * 将css打包到文件需要如下几个操作
         * 1：安装cnpm install extract-text-webpack-plugin@next --save-dev必须加上@next标记，否则webpack4无法编译
         * 2：在webpack的plugins中new ExtractTextPlugin({配置css生成文件路径，文件名称等等})
         * 3：在module的rules中加入test: /\.css$/,use: ExtractTextPlugin.extract({fallback: "style-loader",use: "css-loader"})配置
         * 4：在需要加入css页面对应入口js文件中使用import 'xx.css'即可
         */
        new ExtractTextPlugin({
            filename: 'common/css/common.[hash].css',
            ignoreOrder: true,
            publicPath:''
        }),
        //如果多个模块中都引用了同一个模块里面的变量，就把他放到provideplugin插件内，好处就是不需要在每一个模块内在import这个变量了
        new webpack.ProvidePlugin({
        }),
        //公共模块vendors块的文件我们一般不会修改，所以避免vendors文件打包后也跟着更新chunkhash文件名
        new webpack.HashedModuleIdsPlugin(),
        new CleanWebpackPlugin(['webapp'], {
            root: path.resolve(__dirname, '../'),       　//根目录
            verbose: true,        　　　　　　　　 //开启在控制台输出信息
            dry: false,        　　　　　　　　　　 //启用删除文件
            exclude: []                         ///排除不删除的目录，主要用于避免删除公用的文件
        }),
        //该插件可以显示出编译之前的文件和编译之后的文件的映射
        new ManifestPlugin({
            fileName: 'manifest.json',
            basePath: 'src/',
        })

    ],
    module: {
        rules: [
            /**
             * html中使用require导入图片方式如下：
             * <img src="${require('./720p/bg2.png')}"/>
             */
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'common/image/[name].[hash:8].[ext]',//文件名中的hash字符长度限制在8个
                            limit: 8192,//文件大小小于这个数，就打包data数据，文件大小大于这个数据就打包文件
                            useRelativePath:false,//文件在src下什么目录结构，打包后还是什么目录结构,但是1：在css文件中会出现找不到图片的路径问题。2：使用相对位置，必须配合name: '[name].[hash:8].[ext]'这种写法，如果在name中加了[path]或者'image/[name].[hash:8].[ext]'都将失效
                            publicPath: '',//填充在src路径的前缀，如果是域名的话就需要填写,如果在这边填写的话，那么useRelativePath相对位置就无效，所以如果需要填写域名，那就在output下面填写publicPath
                            outputPath: '', // html和css中图片的输出路径 不填写将是打包根目录下
                        }
                    }
                ]
            },
            {
                test: /\.(js)$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
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
