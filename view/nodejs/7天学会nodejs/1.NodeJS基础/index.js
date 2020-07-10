/**
 * 执行当前demo文件命令如下
 * node index.js
 */


/**
 * 验证exports导出模块公有方法和属性
 */
var a1 = require("./exports.js");
var a2 = require("./exports");

a1.hello();
a2.hello();

console.log(a1 === a2);//true  说明exports.js模块的导出模块被重复利用，对象是同一个


/**
 * 验证module.exports可以将模块导出对象改为普通函数
 */

var b1 = require("./module");


b1();//因为导出对象是一个函数，所以可以直接执行

/**
 *
 * ——require
 * require函数用于在当前模块中加载和使用别的模块，传入一个模块名，返回一个模块导出对象
 * 模块名可使用相对路径（以./开头），或者是绝对路径（以/或C:之类的盘符开头）。
 * 另外，模块名中的.js扩展名可以省略
 *
 *
 * ——exports
 * exports对象是当前模块的导出对象，用于导出模块公有方法和属性。
 * 别的模块通过require函数使用当前模块时得到的就是当前模块的exports对象
 *
 * ——module
 * 通过module对象可以访问到当前模块的一些相关信息，但最多的用途是替换当前模块的导出对象
 * 例如模块导出对象默认是一个普通对象，可以改成一个函数的话
 */



var c1 = require("./counter");
var c2 = require("./counter");

console.log(c1.count());//1
console.log(c2.count());//2 这里用新对象去调用count()，输出的变量并没有从1开始，足够说明，这里的counter模块的导出对象再被重复利用
console.log(c2.count());//3

/**
 * ——模块初始化
 * 
 * 可以看到counter.js模块被
 * 一个模块中的JS代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象。
 * 之后，缓存起来的导出对象被重复利用。
 * 
 * 所以counter.js模块中的count()方法被执行了3次，变量i，依然是自增，
 * 足够说明模块并没有被重复加载，只是在重复利用导出对象
 * 
 * ——主模块
 * 
 * 通过命令行参数传递给NodeJS以启动程序的模块被称为主模块。
 * 主模块负责调度组成整个程序的其它模块完成工作
 * 当前的index.js就是主模块
 * 
 */





