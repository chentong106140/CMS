#命令行执行顺序

[学习地址](https://github.com/alsotang/node-lessons/tree/master/lesson4)

``` shell script
mkdir lesson4 && cd lesson4

npm init 这个命令的作用就是帮我们互动式地生成一份最简单的 package.json 文件，init 是 initialize 的意思，初始化。
cnpm init

//superagent(http://visionmedia.github.io/superagent/ ) 是个 http 方面的库，可以发起 get 或 post 请求。
//cheerio(https://github.com/cheeriojs/cheerio ) 大家可以理解成一个 Node.js 版的 jquery，用来从网页中以 css selector 取数据，使用方式跟 jquery 一样一样的。

//eventproxy
//用 js 写过异步的同学应该都知道，如果你要并发异步获取两三个地址的数据，并且要在获取到数据之后，对这些数据一起进行利用的话，常规的写法是自己维护一个计数器。
//先定义一个 var count = 0，然后每次抓取成功以后，就 count++。如果你是要抓取三个源的数据，由于你根本不知道这些异步操作到底谁先完成，那么每次当抓取成功的时候，就判断一下 count === 3。当值为真时，使用另一个函数继续完成操作。
//而 eventproxy 就起到了这个计数器的作用，它来帮你管理到底这些异步操作是否完成，完成之后，它会自动调用你提供的处理函数，并将抓取到的数据当参数传过来

//1. 先 var ep = new eventproxy(); 得到一个 eventproxy 实例。
//2. 告诉它你要监听哪些事件，并给他们一个回调函数。ep.all('event1', 'event2', function (eventData1, eventData2) {})。
//3. 在适当的时候触发自定义的事件： ep.emit('event1', eventData1)。

//说简单点eventproxy主要就是来自定义多个事件，这么多个事件都被触发之后，最后只需要一个回调函数进行回调处理即可

cnpm install eventproxy superagent cheerio --save

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