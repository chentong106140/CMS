#命令行执行顺序

[学习地址](https://github.com/alsotang/node-lessons/tree/master/lesson10)

##主要使用了benchmark库来检测哪块代码运行效率最高

``` shell script
mkdir lesson10 && cd lesson10

//cnpm init 这个命令的作用就是帮我们互动式地生成一份最简单的 package.json 文件，init 是 initialize 的意思，初始化。
cnpm init

//benchmark
//用于测试代码块允许速度哪个最快
cnpm install benchmark --save

 touch app.js

//复制代码进入
vi app.js

//浏览器访问：http://localhost:3000/
//你会得到cnode爬虫抓取后生成的json文件，响应数据可查看response.json文件
node app.js



```