/**
 * boolean 类型boolean
 */
let isDone: boolean = false;


/**
 * 数值number
 */
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;


/**
 * 字符串string
 * 其中 ` 用来定义 ES6 中的模板字符串，${expr} 用来在模板字符串中嵌入表达式。
 */
let myName: string = 'Tom';
let myAge: number = 25;
// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;

/**
 * 空值
 * 可以用 void 表示没有任何返回值的函数
 */
function alertName(): void {
    alert('My name is Tom');
}
//声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null：
let unusable: void = undefined;


/**
 * Null 和 Undefined
 * 在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型：
 */
let u: undefined = undefined;
let n: null = null;
//与 void 的区别是，undefined 和 null 是所有类型的子类型。
// 也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：
// 这样不会报错
let num: number = undefined;
// 这样也不会报错
let u1: undefined;
let num1: number = u1;

//而 void 类型的变量不能赋值给 number 类型的变量：
//let u2: void;
//let num2: number = u2;//这样写会报错，因为使用了void类型的变量进行赋值，所以将代码先注释掉


































