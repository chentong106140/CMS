var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
// url 模块是 Node.js 标准库里面的
// http://nodejs.org/api/url.html
var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl).end(function (err, res) {
        if (err) {
            return console.error(err);
        }
        var topicUrls = [];
        var $ = cheerio.load(res.text);
        // 获取首页所有的链接
        $('#topic_list .topic_title').each(function (idx, element) {
            var $element = $(element);
            // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
            // 我们用 url.resolve 来自动推断出完整 url，变成
            // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
            // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
            var href = url.resolve(cnodeUrl, $element.attr('href'));
            //url.resolve
            // 将URL前缀：https://cnodejs.org/
            // 与后缀：/topic/5f01d1e513f8b244e57cd374
            // 自动拼接成：https://cnodejs.org/topic/5f01d1e513f8b244e57cd374
            //也就是说自动将topic前面的/号去掉了进行拼接
            topicUrls.push(href);
        });

        console.log(topicUrls[0],topicUrls[1]);


        // 得到 topicUrls 之后
        
        // 得到一个 eventproxy 的实例
        var ep = new eventproxy();
        

        //遍历上面得到的40个URL,开始请求数据
        topicUrls.forEach(function (topicUrl) {
                //请求连接，将获取的网页数据回调给事件代理
                superagent.get(topicUrl).end(function (err, res) {
                        console.log('fetch ' + topicUrl + ' successful');
                        //触发事件代理
                        ep.emit('topic_html', [topicUrl, res.text]);
                    });
        });

        //注册事件代理监听，当收到4个事件触发回调后，才会执行下面的回调
        // 命令 ep 重复监听 topicUrls.length 次（在这里也就是 40 次） `topic_html` 事件再行动
        ep.after('topic_html', topicUrls.length, function (topics) {
        // topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair
        //console.log(topics);
        // 开始行动
        topics = topics.map(function (topicPair) {
            // 接下来都是 jquery 的用法了
            var topicUrl = topicPair[0];
            var topicHtml = topicPair[1];
            var $ = cheerio.load(topicHtml);
            return ({
                title: $('.topic_full_title').text().trim(),
                href: topicUrl,
                comment1: $('.reply_content').eq(0).text().trim(),
            });
        });

        console.log('final:');
        console.log(topics);
    });




});
