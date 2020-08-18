var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var async = require('async');
var moment = require('moment');
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

        //下面是控制并发5个，再继续下一次并发5个
        async.mapLimit(topicUrls, 10, function (topicUrl, callback) {
            console.log(moment().format('ss.SSS')+'>请求', topicUrl);
            //请求连接，将获取的网页数据回调给事件代理
            superagent.get(topicUrl).end(function (err, res) {
                console.log(moment().format('ss.SSS')+'>响应', topicUrl);
    
                callback && callback(null,[topicUrl, res.text]);
            });
        },function (err, topics) {
                //topics是上面请求了40个请求对应40个响应数据组成的list
                // [[topicUrl,res.text],[topicUrl,res.text],[topicUrl,res.text],[topicUrl,res.text]...]
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

    /*
    //下面是连续并发40个请求的案例
    //遍历上面得到的40个URL,开始请求数据,当40个请求都请求完了之后，将处罚ep的topic_html事件回调
    //下面与下面的ep.after是配合使用的，与上面的只有等40个请求完成之后再执行回调是一个道理，两种方式都可以
    //区别是下面这个是连续请求，上面是控制并发量，每次是5个并发量去请求
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
    });*/




});
