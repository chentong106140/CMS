/**
 * 泛型
 *
 * 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，
 * 而在使用的时候再指定类型的一种特性。
 *
 * 简单的例子
 *
 * 首先，我们来实现一个函数 createArray，它可以创建一个指定长度的数组，同时将每一项都填充一个默认值：
 */
/*

function createArray(length: number, value: any): Array<any> {
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']

*/

/**
 * 上例中，我们使用了之前提到过的数组泛型来定义返回值的类型。
 *
 * 这段代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型：
 *
 * Array<any> 允许数组的每一项都为任意类型。但是我们预期的是，数组中每一项都应该是输入的 value 的类型。
 *
 * 这时候，泛型就派上用场了：
 */

/*

function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']

*/

/**
 * 上例中，我们在函数名后添加了 <T>，其中 T 用来指代任意输入的类型，
 * 在后面的输入 value: T 和输出 Array<T> 中即可使用了。
 *
 * 接着在调用的时候，可以指定它具体的类型为 string。当然，也可以不手动指定，而让类型推论自动推算出来：
 */
/*

function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

//跟上面那个案例的区别就是下面的createArray后面没有加<string>，这是typescript自动推算出来的。
createArray(3, 'x'); // ['x', 'x', 'x'] 

*/


/**
 * 多个类型参数
 * https://ts.xcatliu.com/advanced/generics.html#%E5%A4%9A%E4%B8%AA%E7%B1%BB%E5%9E%8B%E5%8F%82%E6%95%B0
 *
 * 定义泛型的时候，可以一次定义多个类型参数：
 *
 * 下例中，我们定义了一个 swap 函数，用来交换输入的元组。
 */
/*

function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]
//或者
swap<number,string>([7, 'seven']); // ['seven', 7]

*/

/**
 * 泛型约束
 *
 * https://ts.xcatliu.com/advanced/generics.html#%E6%B3%9B%E5%9E%8B%E7%BA%A6%E6%9D%9F
 *
 * 在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：
 */
/*

function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);//报错
    return arg;
}

// index.ts(2,19): error TS2339: Property 'length' does not exist on type 'T'.

*/

/**
 * 上例中，泛型 T 不一定包含属性 length，所以编译的时候报错了。
 * 这时，我们可以对泛型进行约束，只允许这个函数传入那些包含 length 属性的变量。这就是泛型约束：
 */
/*

interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
//模拟调用
let lt :Lengthwise = {length:10};
loggingIdentity(lt);
loggingIdentity("字符串");
//loggingIdentity(12);//报错，因为12没有继承Lengthwise，并没有length属性

*/


/**
 * 上例中，我们使用了 extends 约束了泛型 T 必须符合接口 Lengthwise 的形状，也就是必须包含 length 属性。
 * 此时如果调用 loggingIdentity 的时候，传入的 arg 不包含 length，那么在编译阶段就会报错了：loggingIdentity(12);
 */


/**
 * 多个类型参数之间也可以互相约束：
 */
/*

function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id];//<T>source将父类实例强转为子类
    }
    return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };

copyFields(x, { b: 10, d: 20 });

*/

/**
 * 上例中，我们使用了两个类型参数，其中要求 T 继承 U，这样就保证了 U 上不会出现 T 中不存在的字段。
 */

/**
 * 泛型接口
 * https://ts.xcatliu.com/advanced/generics.html#%E6%B3%9B%E5%9E%8B%E6%8E%A5%E5%8F%A3
 *
 * 之前学习过，可以使用接口的方式来定义一个函数需要符合的形状：
 */

interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch2: SearchFunc;
mySearch2 = function (source: string, subString: string) {
    return source.search(subString) !== -1;
}


/**
 * 当然也可以使用含有泛型的接口来定义函数的形状：
 */

/*

interface CreateArrayFunc {
    <T>(length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
*/

/**
 * 进一步，我们可以把泛型参数提前到接口名上：
 *
 * 注意，此时在使用泛型接口的时候，需要定义泛型的类型。
 */

/*

interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc<any>;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']

*/

/**
 * 泛型类
 * https://ts.xcatliu.com/advanced/generics.html#%E6%B3%9B%E5%9E%8B%E7%B1%BB
 *
 * 与泛型接口类似，泛型也可以用于类的类型定义中：
 * 
 *  如下定义类中的方法，有3中定义方式
 *      1：add1：使用了=>号，定义了输入输出规范，实际是有类的实例对象去实现具体细节
 *      2：add2：使用了=>号，定义了输入输出规范，并使用=等于号，通过function来定义方法体，打包后，add2方法会在构造函数内,通过this.add2进行实现
 *      3：add3：没有使用=>号，定义了输入输出规范，并使用=等于号定义，通过function来定义方法体，打包后，add3方法也是在构造函数内
 *      4：add4：没有使用=>号，定义了输入输出规范，也没有使用=号定义，也没有使用function，直接通过大括号来定义实现体，打包后，add4方法是在prototype中
 *      
 *   总结：
 *      不使用等于定义的函数，会放在
 */

class GenericNumber<T extends number> {
    zeroValue: T;
    //下面这个方法，只需要定义一个输入类型 与 输出类型，并没有定义具体函数实现，真正实现让实例对象实现即可
    add1: (x: T, y: T) => T;
    //使用了= function定义的函数,会被编译到构造函数内
    add2: (x: T, y: T) => T = function(x: T, y: T): T {
        return <T>(x*y);//强制将返回参数类型转换
    };
    //使用了=function定义的函数,会被编译到构造函数内
    add3 = function(x: T, y: T): T {
        return <T>(x*y);//强制将返回参数类型转换
    };
    //没有使用=号定义的函数，可以不使用;分号结尾
    //通过n(x:X):X{},定义的函数，会被编译到类型的prototype中
    add4<T>(x: T, y: T): Array<T> {
        let result: T[] = [x,y];
        return result;
    }
    //没有使用=号定义的函数，可以不使用;分号结尾
    //通过n(x:X):X{},定义的函数，会被编译到类型的prototype中
    add5(x: T, y: T): Array<T> {
        let result: T[] = [x,y];
        return result;
    }
    
    //定义构造函数，在构造函数内可以定义类型的属性进行赋值
    constructor(x:T){
        this.zeroValue = x;
    }
}

let myGenericNumber = new GenericNumber<number>(10);
myGenericNumber.zeroValue = 0;
//add1在类中并没有实现方法体，实例只需要符合输入输出规范即可
myGenericNumber.add1 = function (x, y) {
    return x + y;
};
myGenericNumber.add1(10,10);
myGenericNumber.add2(10,10)
myGenericNumber.add3(10,10)
myGenericNumber.add4(10,10)
myGenericNumber.add5(10,10)


/**
 * 泛型参数的默认类型
 * 
 * 在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。
 * 当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。
 */

function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}











/**
 * 定义一个泛型类，如果不在类myfn上加上<T>的话，内部的属性t和构造函数内的x:T就会报错！
 */
class myfn<T> {
    /*方法后面不要加;分号结尾，属性后面需要加分号结尾*/
    public t: T;

    public createArray<T>(length: number, value: T): Array<T> {
        let result: T[] = [];
        for (let i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }

    constructor(x: T) {
        this.t = x;
    }
}

/**
 * 调用泛型类
 */
let mf: myfn<string> = new myfn<string>('xxx');//创建实例
let ar: string[] = mf.createArray<string>(10, 'x');//调用类内部的方法





















































