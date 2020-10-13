var fibonacci = [1, 1, 2, 3, 5];
/**
 * 数组的项中不允许出现其他的类型：
 */
/*
let fibonacci: number[] = [1, '1', 2, 3, 5];//报错
*/
/**
 * 数组的一些方法的参数也会根据数组在定义时约定的类型进行限制：
 * push 方法只允许传入 number 类型的参数，但是却传了一个 "8" 类型的参数，所以报错了。
 * 这里 "8" 是一个字符串字面量类型
 */
/*
fibonacci.push('8');//报错
*/
/**
 * 我们也可以使用数组泛型（Array Generic） Array<elemType> 来表示数组
 */
var fibonacci2 = [1, 1, 2, 3, 5];
var fibonacci3 = [1, 1, 2, 3, 5];
/**
 * 类数组（Array-like Object）不是数组类型，比如 arguments：
 * 下例中，arguments 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口：
 */
/*
function sum() {
    let args: number[] = arguments;//报错，arguments是类数组，不能直接赋值给普通数组
}
*/
//正确写法如下
//在这个例子中，我们除了约束当索引的类型是数字时，值的类型必须是数字之外，
// 也约束了它还有 length 和 callee 两个属性。
function summ() {
    var args = arguments;
}
/**
 * any 在数组中的应用
 */
var list = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
//# sourceMappingURL=2.6数组的类型.js.map