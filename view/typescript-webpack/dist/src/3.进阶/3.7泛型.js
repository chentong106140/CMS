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
var mySearch2;
mySearch2 = function (source, subString) {
    return source.search(subString) !== -1;
};
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
var GenericNumber = /** @class */ (function () {
    //定义构造函数，在构造函数内可以定义类型的属性进行赋值
    function GenericNumber(x) {
        //使用了= function定义的函数,会被编译到构造函数内
        this.add2 = function (x, y) {
            return (x * y); //强制将返回参数类型转换
        };
        //使用了=function定义的函数,会被编译到构造函数内
        this.add3 = function (x, y) {
            return (x * y); //强制将返回参数类型转换
        };
        this.zeroValue = x;
    }
    //没有使用=号定义的函数，可以不使用;分号结尾
    //通过n(x:X):X{},定义的函数，会被编译到类型的prototype中
    GenericNumber.prototype.add4 = function (x, y) {
        var result = [x, y];
        return result;
    };
    //没有使用=号定义的函数，可以不使用;分号结尾
    //通过n(x:X):X{},定义的函数，会被编译到类型的prototype中
    GenericNumber.prototype.add5 = function (x, y) {
        var result = [x, y];
        return result;
    };
    return GenericNumber;
}());
var myGenericNumber = new GenericNumber(10);
myGenericNumber.zeroValue = 0;
//add1在类中并没有实现方法体，实例只需要符合输入输出规范即可
myGenericNumber.add1 = function (x, y) {
    return x + y;
};
myGenericNumber.add1(10, 10);
myGenericNumber.add2(10, 10);
myGenericNumber.add3(10, 10);
myGenericNumber.add4(10, 10);
myGenericNumber.add5(10, 10);
/**
 * 泛型参数的默认类型
 *
 * 在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。
 * 当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。
 */
function createArray(length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
/**
 * 定义一个泛型类，如果不在类myfn上加上<T>的话，内部的属性t和构造函数内的x:T就会报错！
 */
var myfn = /** @class */ (function () {
    function myfn(x) {
        this.t = x;
    }
    myfn.prototype.createArray = function (length, value) {
        var result = [];
        for (var i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    };
    return myfn;
}());
/**
 * 调用泛型类
 */
var mf = new myfn('xxx'); //创建实例
var ar = mf.createArray(10, 'x'); //调用类内部的方法
//# sourceMappingURL=3.7泛型.js.map