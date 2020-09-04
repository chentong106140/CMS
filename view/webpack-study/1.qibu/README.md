``` bash
//初始化npm
cnpm init -y

//安装本地webpack环境
cnpm install webpack webpack-cli --save-dev

//安装lodash模块
cnpm install lodash --save

//默认打包方式，默认在dist目录下生成main.js文件
npx webpack

//指定读取配置文件进行打包
npx webpack --config webpack.config.js

//运行npm的脚本别名与上面的npx命令打包效果是一样的
cnpm run build 

```