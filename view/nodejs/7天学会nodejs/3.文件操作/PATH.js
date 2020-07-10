const path = require('path');




console.log(path.normalize('foo/bar'));  //=> foo/bar
console.log(path.normalize('foo//baz//../bar'));  //=> foo/bar

/**
 *  path.normalize
 *  
 *  将传入的路径转换为标准路径，具体讲的话，除了解析路径中的.与..外，还能去掉多余的斜杠。
 *  如果有程序需要使用路径作为某些数据的索引，但又允许用户随意输入路径时，
 *  就需要使用该方法保证路径的唯一性。
 *
 */


console.log(path.join('foo/', 'baz/', '../bar')); // => "foo/bar"

/**
 * ——path.join
 * 将传入的多个路径拼接为标准路径。该方法可避免手工拼接路径字符串的繁琐，
 * 并且能在不同系统下正确使用相应的路径分隔符。
 * 
 */


console.log(path.extname('foo/bar.js')); // => ".js"

/**
 * ——path.extname
 * 当我们需要根据不同文件扩展名做不同操作时，该方法就显得很好用。
 * 
 */

















