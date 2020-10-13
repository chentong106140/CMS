const {merge} = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');

//通过执行命令行，传递自定义参数
// webpack --config webpack.prod.js --env.a chentong --env.production --env.NODE_ENV local
module.exports =  env =>{
    console.log("进入生产环境配置");
    console.log(env);
    
    return merge(common, {
        //使用model
        //mode 它有3种模式：'none'，'development'，'production'。
        //那么 mode 它具体有什么用呢？它实际上是可以决定 webpack 的优化级别。
        //那么 'none' 就是不优化。原来什么样，现在就什么样，我什么也不干。
        //而 'development' 就是开发依赖，那么在这种情况下，它就会帮助我们来保留并输出一些调试信息，同时也不会对文件进行压缩，包括会保留各种各样的东西，以便于你来调试。并且会设置一个环境变量的值 process.env.NODE_ENV = 'development'。
        //最后的 'production'，就是生产环境。所以它就会做一个最高级别的优化，启用压缩，忽略并屏蔽错误等等。并且也会设置 process.env.NODE_ENV = 'production'。
        mode: 'production',
        //产生.map文件
        //devtool: 'source-map',
        plugins: [
            /*
            //容易报错，就不使用了
            new UglifyJSPlugin({
                sourceMap: true,//产生.map文件
                uglifyOptions: {
                    ecma: 8,
                    compress: {
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true,
                        pure_funcs: ['console.log','console.debug','console.warnings'],//移除console
                    }
                }
            }),*/
            /*new webpack.DefinePlugin({
                //指定环境为生产环境"\"production\""
                'process.env.NODE_ENV': JSON.stringify('production')
            })*/
        ]
    });
};

