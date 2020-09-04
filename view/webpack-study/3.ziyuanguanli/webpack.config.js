const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module:{
            rules:[
                {
                    //以 .css 结尾的全部文件，都将被提供给 style-loader 和 css-loader
                    //这使你可以在依赖于此样式的文件中 import './style.css'。
                    // 现在，当该模块运行时，含有 CSS 字符串的 <style> 标签，将被插入到 html 文件的 <head> 中
                    test:/\.css$/,
                    use:["style-loader","css-loader"]
                },
                {
                    //现在，当你 import MyImage from './my-image.png'，该图像将被处理并添加到 output 目录，
                    // _并且_ MyImage 变量将包含该图像在处理后的最终 url。
                    // 当使用 css-loader 时，如上所示，你的 CSS 中的 url('./my-image.png') 会使用类似的过程去处理。
                    // loader 会识别这是一个本地文件，并将 './my-image.png' 路径，替换为输出目录中图像的最终路径。
                    // html-loader 以相同的方式处理 <img src="./my-image.png" />。
                    test:/\.(png|svg|jpg|gif)$/,
                    use:['file-loader']
                },
                {
                    //像字体这样的其他资源如何处理呢？file-loader 和 url-loader 可以接收并加载任何文件，
                    // 然后将其输出到构建目录。这就是说，我们可以将它们用于任何类型的文件，包括字体。
                    //通过配置好 loader 并将字体文件放在合适的地方，你可以通过一个 @font-face 声明引入。
                    // 本地的 url(...) 指令会被 webpack 获取处理，就像它处理图片资源一样：
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use:['file-loader']
                },
                //可以 import 这四种类型的数据(JSON, CSV, TSV, XML)中的任何一种，
                // 所导入的 Data 变量将包含可直接使用的已解析 JSON
                {
                    test:/\.(csv|tsv)$/,
                    use:['csv-loader']
                },
                {
                    test:/\.xml$/,
                    use:['xml-loader']
                }
            ]
    }
};
