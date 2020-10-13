/**
 * boolean 类型boolean
 */
var isDone = false;
/**
 * 数值number
 */
var decLiteral = 6;
var hexLiteral = 0xf00d;
// ES6 中的二进制表示法
var binaryLiteral = 10;
// ES6 中的八进制表示法
var octalLiteral = 484;
var notANumber = NaN;
var infinityNumber = Infinity;
/**
 * 字符串string
 * 其中 ` 用来定义 ES6 中的模板字符串，${expr} 用来在模板字符串中嵌入表达式。
 */
var myName = 'Tom';
var myAge = 25;
// 模板字符串
var sentence = "Hello, my name is " + myName + ".\nI'll be " + (myAge + 1) + " years old next month.";
/**
 * 空值
 * 可以用 void 表示没有任何返回值的函数
 */
function alertName() {
    alert('My name is Tom');
}
//声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null：
var unusable = undefined;
/**
 * Null 和 Undefined
 * 在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型：
 */
var u = undefined;
var n = null;
//与 void 的区别是，undefined 和 null 是所有类型的子类型。
// 也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：
// 这样不会报错
var num = undefined;
// 这样也不会报错
var u1;
var num1 = u1;
//而 void 类型的变量不能赋值给 number 类型的变量：
//let u2: void;
//let num2: number = u2;//这样写会报错，因为使用了void类型的变量进行赋值，所以将代码先注释掉
