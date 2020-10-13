

let fibonacci: number[] = [1, 1, 2, 3, 5];

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
let fibonacci2: Array<number> = [1, 1, 2, 3, 5];


/**
 * 用接口表示数组
 * NumberArray 表示：只要索引的类型是数字时，那么值的类型必须是数字。
 * 虽然接口也可以用来描述数组，但是我们一般不会这么做，因为这种方式比前两种方式复杂多了。
 * 不过有一种情况例外，那就是它常用来表示类数组。
 */
interface NumberArray {
    [index: number]: number;
}
let fibonacci3: NumberArray = [1, 1, 2, 3, 5];


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
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments;
}


/**
 * any 在数组中的应用
 */
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];



















































