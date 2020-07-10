
var fs = require("fs");

function copy(src, dst) {
    fs.writeFileSync(dst,fs.readFileSync(src));
}


function main(argv) {
    copy(argv[0],argv[1])
}

console.log(process.argv);

main(process.argv.slice(2));

/**
 * process.argv 获取命令行参数列表，前面两个是固定参数，索引从第2个参数才是用户传递的参数
 [
 'D:\\software\\nodejs\\node.exe',
 'D:\\study\\CMS\\view\\nodejs\\7天学会nodejs\\3.文件操作\\index.js',
 './data.dat',
 './2.dat'
 ]
 */

/**
 *——小文件拷贝
 * process是一个全局变量，可通过process.argv获得命令行参数。
 * 由于
 * argv[0]固定等于NodeJS执行程序的绝对路径，
 * argv[1]固定等于主模块的绝对路径，
 * 因此第一个命令行参数从argv[2]这个位置开始
 *
 * 执行命令如下：
 * node 小文件拷贝.js ./data.dat ./1.dat
 */



