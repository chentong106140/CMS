
var fs = require("fs");
var path = require("path");


/**
 * 遍历某目录下所有的文件
 * @param dir
 * @param callback
 */
function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}

travel('D:\\study\\CMS\\view\\nodejs',function (pathname) {
    console.log(pathname)
});

/**
 *
 *  node 遍历目录内所有文件.js
 */