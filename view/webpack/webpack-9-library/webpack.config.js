const path = require('path');

module.exports =
    {
        mode: 'production',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'webpack-numbers.js',
            //控制 library 如何以不同方式暴露的选项。 
            /**
             * 遍历：作为一个全局变量，通过 script 标签来访问（libraryTarget:'var'）。
             * this：通过 this 对象访问（libraryTarget:'this'）。
             * window：通过 window 对象访问，在浏览器中（libraryTarget:'window'）。
             * UMD：在 AMD 或 CommonJS 的 require 之后可访问（libraryTarget:'umd'）。
             */
            libraryTarget: 'umd',
            globalObject: 'this',
            // libraryExport: 'default',
            //暴露 library
            library: 'webpackNumbers'
        },
        externals: {
            //这意味着你的 library 需要一个名为 lodash 的依赖，这个依赖在用户的环境中必须存在且可用。
            'lodash': {
                commonjs: 'lodash',
                commonjs2: 'lodash',
                amd: 'lodash',
                root: '_'
            }
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: 'babel-loader'
                }
            ]
        },
    };