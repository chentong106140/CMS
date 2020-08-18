#命令行执行顺序

[学习地址](https://github.com/alsotang/node-lessons/tree/master/lesson2)

``` javascript
mkdir lesson2 && cd lesson2

//npm init 这个命令的作用就是帮我们互动式地生成一份最简单的 package.json 文件，init 是 initialize 的意思，初始化。
cnpm init

//这时我们来安装依赖，这次的应用，我们依赖 express 和 utility 两个模块。
//--save 参数，这个参数的作用，就是会在你安装依赖的同时，
//自动把这些依赖写入 package.json。命令执行完成之后，
//查看 package.json，会发现多了一个 dependencies 字段
cnpm install express utility --save

 touch app.js

//复制代码进入
vi app.js

//浏览器访问：http://localhost:3000/?q=chentong
//目的是获取参数q的值，并进行md5加密
node app.js



```