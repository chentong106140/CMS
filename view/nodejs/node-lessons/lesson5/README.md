#命令行执行顺序

[学习地址](https://github.com/alsotang/node-lessons/tree/master/lesson5)

``` shell script
mkdir lesson5 && cd lesson5

npm init 这个命令的作用就是帮我们互动式地生成一份最简单的 package.json 文件，init 是 initialize 的意思，初始化。
cnpm init

//superagent(http://visionmedia.github.io/superagent/ ) 是个 http 方面的库，可以发起 get 或 post 请求。
//cheerio(https://github.com/cheeriojs/cheerio ) 大家可以理解成一个 Node.js 版的 jquery，用来从网页中以 css selector 取数据，使用方式跟 jquery 一样一样的。


cnpm install eventproxy superagent cheerio async --save

 touch app.js

//复制代码进入
vi app.js

//浏览器访问：http://localhost:3000/
//你会得到cnode爬虫抓取后生成的json文件，响应数据可查看response.json文件
node app.js



```


```javascript
//eventproxy调用案例
var ep = new eventproxy();
ep.all('data1_event', 'data2_event', 'data3_event', function (data1, data2, data3) {
  var html = fuck(data1, data2, data3);
  render(html);
});

$.get('http://data1_source', function (data) {
  ep.emit('data1_event', data);
  });

$.get('http://data2_source', function (data) {
  ep.emit('data2_event', data);
  });

$.get('http://data3_source', function (data) {
  ep.emit('data3_event', data);
  });
```