/**
 * Created by cherish on 2018/11/9.
 */


const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
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
            _: 'lodash',
            myJoin: ['lodash', 'join']//将模块lodash下的join变量赋予给全局变量myJoin
        }),
        //公共模块vendors块的文件我们一般不会修改，所以避免vendors文件打包后也跟着更新chunkhash文件名
        new webpack.HashedModuleIdsPlugin(),
        new CleanWebpackPlugin(['dist']),
        //该插件可以显示出编译之前的文件和编译之后的文件的映射
        new ManifestPlugin({
            fileName: 'manifest.json',
            basePath: "/dist/",
        }),
        new HtmlWebpackPlugin({
            title: 'Production'
        })
    ],
    module: {
        rules: [
            {
                /**
                 * 对模块进行导入变量，无需再手动import
                 * 修改index.js模块下this指向，默认情况下this指向的是CommonJs环境中的module.exports模块，并不是window对象
                 */
                //如果webpack.common.js文件在根目录下的子目录下如：build/webpack.common.js
                //那就需要写成相对路径如：test: require.resolve('../src/index.js'),
                test: require.resolve('./src/index.js'),
                use: 'imports-loader?this=>window'
            },
            /**
             * 将以前老版本封装库所创建的全局变量作为一个普通的模块来导出,无需手动export
             * 如果某一个模块需要使用这个globals导出的变量，只需要通过import 
             */
            {
                test: require.resolve('./src/globals.js'),
                use: 'exports-loader?CT,$=CT.$'
            },
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
};
