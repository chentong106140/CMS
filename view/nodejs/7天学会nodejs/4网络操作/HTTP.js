

var HTTP = require('http');

/**
 * 服务端，开启端口为8124的服务端
 */
HTTP.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text-plain' });
    response.end('响应成功！\n');
}).listen(8124);

/**
 * 客户端，请求服务端案例
 */
HTTP.get('http://localhost:8124/', function (response) {
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
});
