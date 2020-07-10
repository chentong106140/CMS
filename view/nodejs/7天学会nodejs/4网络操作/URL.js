

var HTTP = require('http');
var URL = require('url');


/**
 * 服务端，开启端口为8124的服务端
 */
/*HTTP.createServer(function (request, response) {
    //传给.parse方法的不一定要是一个完整的URL，例如在HTTP服务器回调函数中，
    //request.url不包含协议头和域名，但同样可以用.parse方法解析。 
    var temp = request.url;
    console.log(URL.parse(temp));
    /!*
        Url {
          protocol: null,
          slashes: null,
          auth: null,
          host: null,
          port: null,
          hostname: null,
          hash: null,
          search: '?a=1&b=2',
          query: 'a=1&b=2',
          pathname: '/',
          path: '/?a=1&b=2',
          href: '/?a=1&b=2'
        }
     *!/

    response.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
    response.end('响应成功！\n');
}).listen(8124);*/

/**
 * 客户端，请求服务端案例
 */
/*HTTP.get('http://localhost:8124/?a=1&b=2', function (response) {
    var body = [];

    console.log(response.statusCode);
    console.log(response.headers);

    response.on('data', function (chunk) {
        body.push(chunk);
    });

    response.on('end', function () {
        body = Buffer.concat(body);
        console.log(body.toString());
    });
});*/


console.log(URL.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash'));
/*
        Url {
          protocol: 'http:',
          slashes: true,
          auth: 'user:pass',
          host: 'host.com:8080',
          port: '8080',
          hostname: 'host.com',
          hash: '#hash',
          search: '?query=string',
          query: 'query=string',
          pathname: '/p/a/t/h',
          path: '/p/a/t/h?query=string',
          href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'
        }

 */
/**
 *——parse
 * 通过URL.parse可以解析一个URL字符串转换为URL对象
 * 
 */



console.log(
                URL.format({
                    protocol: 'http:',
                    host: 'www.example.com',
                    pathname: '/p/a/t/h',
                    search: 'query=string'
                })
);
//http://www.example.com/p/a/t/h?query=string

/**
 *——format
 * format方法允许将一个URL对象转换为URL字符串
 */

console.log(URL.resolve('http://www.example.com/foo/bar', '../baz'));
//http://www.example.com/baz

/**
 * ——resolve
 * resolve方法可以用于拼接URL
 */

