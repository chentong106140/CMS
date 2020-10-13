/**
 * as：断言
 * 语法：对象 as 接口名称
 *
 * 所谓断言，其实就是告诉typescript，这个对象是某一个接口类型的对象，
 * 目的：就是为了欺骗typescript，我这个对象就是符合规则的对象，例如typeof (animal as Fish1).swim === 'function'
 * 否则：如果不欺骗的话，代码可能编译都无法编译。
 * 注意点：as 后面的类型只能是接口，不能是类，
 * 常用于：类型转换
 *
 * 用例：
 * 1：强制转换函数返回值类型：getCacheData('tom') as Cat
 * 2：变量转换：(animal as Fish1).swim
 * 3：类型转换：(window as any).foo = 1
 *
 *
 * instanceof：实例类型判断
 * 语法：对象 instanceof 类名称
 * 用法：用于判断某个实例是否是某个类的实例
 * 注意点：instanceof后面的类型只能是类，不能是接口，否则会编译不通过，
 * 常用于：类型判断
 *
 * 用例：
 * 1：判断实例是否为某类型：error instanceof ApiError2
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function getName(animal) {
    return animal.name; //访问2个接口中共有的属性name
}
function isFish1(animal) {
    if (typeof animal.swim === 'function') { //参数animal强制转换为Fish1接口，去调用swim属性
        return true;
    }
    return false;
}
function swim2(animal) {
    animal.swim(); //编译为：animal.swim();，编译正常，但是会运行时报错
}
var tom2 = {
    name: 'Tom',
    run: function () { console.log('run'); }
};
swim2(tom2); //实例传入Cat2实例，会导致运行时报错
/**
 * 将一个父类断言为更加具体的子类
 * 当类之间有继承关系时，类型断言也是很常见的：
 *
 * 下面的例子中，我们声明了函数 isApiError，它用来判断传入的参数是不是 ApiError 类型，
 * 为了实现这样一个函数，它的参数的类型肯定得是比较抽象的父类 Error，这样的话这个函数就能接受 Error 或它的子类作为参数了。
 * 但是由于父类 Error 中没有 code 属性，故直接获取 error.code 会报错，需要使用类型断言获取 (error as ApiError).code。
 */
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.code = 0;
        return _this;
    }
    return ApiError;
}(Error));
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    function HttpError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.statusCode = 200;
        return _this;
    }
    return HttpError;
}(Error));
function isApiError(error) {
    if (typeof error.code === 'number') {
        return true;
    }
    return false;
}
var httpError = {
    statusCode: 500,
    name: 'http',
    message: 'http error'
};
isApiError(httpError);
/**
 * 大家可能会注意到，在这个例子中有一个更合适的方式来判断是不是 ApiError，那就是使用 instanceof：
 *
 * 上面的例子中，确实使用 instanceof 更加合适，因为 ApiError 是一个 JavaScript 的类，
 * 能够通过 instanceof 来判断 error 是否是它的实例。
 *
 */
var ApiError2 = /** @class */ (function (_super) {
    __extends(ApiError2, _super);
    function ApiError2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.code = 0;
        return _this;
    }
    return ApiError2;
}(Error));
var HttpError2 = /** @class */ (function (_super) {
    __extends(HttpError2, _super);
    function HttpError2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.statusCode = 200;
        return _this;
    }
    return HttpError2;
}(Error));
function isApiError2(error) {
    if (error instanceof ApiError2) { //判断对象error是否是ApiError2的实例
        return true;
    }
    return false;
}
function isApiError4(error) {
    if (typeof error.code === 'number') { //由于ApiError4是一个接口，所以这里为了得到ApiError4接口的对象，使用了断言
        return true;
    }
    return false;
}
/**
 * 将任何一个类型断言为 any
 *
 * 理想情况下，TypeScript 的类型系统运转良好，每个值的类型都具体而精确。
 * 当我们引用一个在此类型上不存在的属性或方法时，就会报错：
 */
/*
const foo: number = 1;
foo.length = 1;//报错，数字类型的变量 foo 上是没有 length 属性
*/
/**
 * 这种错误提示显然是非常有用的。
 * 但有的时候，我们非常确定这段代码不会出错，比如下面这个例子
 *
 * 下面的例子中，我们需要将 window 上添加一个属性 foo，
 * 但 TypeScript 编译时会报错，提示我们 window 上不存在 foo 属性
 */
//window.foo = 1;//报错：error TS2339: Property 'foo' does not exist on type 'Window & typeof globalThis'.
/**
 * 此时我们可以使用 as any 临时将 window 断言为 any 类型：
 * 在 any 类型的变量上，访问任何属性都是允许的。
 * 需要注意的是，将一个变量断言为 any 可以说是解决 TypeScript 中类型问题的最后一个手段。
 * 它极有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用 as any。
 * https://ts.xcatliu.com/basics/type-assertion.html#%E5%B0%86%E4%BB%BB%E4%BD%95%E4%B8%80%E4%B8%AA%E7%B1%BB%E5%9E%8B%E6%96%AD%E8%A8%80%E4%B8%BA-any
 *
 * 总之，一方面不能滥用 as any，另一方面也不要完全否定它的作用，
 * 我们需要在类型的严格性和开发的便利性之间掌握平衡（这也是 TypeScript 的设计理念之一），
 * 才能发挥出 TypeScript 最大的价值。
 */
window.foo = 1; //编译为:window.foo = 1;说白了，as就是欺骗typescript，让typescript以为它就是一个存在的类型
/**
 * 将 any 断言为一个具体的类型
 *
 * 在日常的开发中，我们不可避免的需要处理 any 类型的变量，它们可能是由于第三方库未能定义好自己的类型，
 * 也有可能是历史遗留的或其他人编写的烂代码，
 * 还可能是受到 TypeScript 类型系统的限制而无法精确定义类型的场景。
 * 遇到 any 类型的变量时，我们可以选择无视它，任由它滋生更多的 any。
 * 我们也可以选择改进它，通过类型断言及时的把 any 断言为精确的类型，亡羊补牢，使我们的代码向着高可维护性的目标发展。
 * 举例来说，历史遗留的代码中有个 getCacheData，它的返回值是 any：
 */
/*
function getCacheData(key: string): any {
    return (window as any).cache[key];
}
*/
/**
 * 那么我们在使用它时，最好能够将调用了它之后的返回值断言成一个精确的类型，这样就方便了后续的操作：
 *
 * 下面的例子中，我们调用完 getCacheData 之后，立即将它断言为 Cat 类型。这样的话明确了 tom 的类型，
 * 后续对 tom 的访问时就有了代码补全，提高了代码的可维护性
 */
function getCacheData(key) {
    return window.cache[key];
}
var tommm = getCacheData('tom');
tommm.run();
function testAnimal(animal) {
    return animal; //注意在这里，由于Animal2兼容Cat4,所以他们可以相互类型转换了
}
function testCat(cat) {
    return cat; //注意在这里，由于Animal2兼容Cat4，所以他们可以相互类型转换了
}
function testCat5(cat) {
    return cat; //编译为：return cat;
}
/**
 * 在上面的例子中，若直接使用 cat as Fish 肯定会报错，因为 Cat 和 Fish 互相都不兼容。
 * 但是若使用双重断言，则可以打破「要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可」的限制，
 * 将任何一个类型断言为任何另一个类型。
 *
 * 若你使用了这种双重断言，那么十有八九是非常错误的，它很可能会导致运行时错误。
 * 除非迫不得已，千万别用双重断言。
 */
/**
 * 类型断言 vs 类型转换
 * 类型断言只会影响 TypeScript 编译时的类型，类型断言语句在编译结果中会被删除：
 */
function toBoolean(something) {
    return something;
}
toBoolean(1);
// 返回值为 1
/**
 * 在上面的例子中，将 something 断言为 boolean 虽然可以通过编译，
 * 但是并没有什么用，代码在编译后会变成：
 *
 */
/*
function toBoolean(something) {
    return something;//如上，使用了类型断言，但最终编译后是没有断言的代码的，断言只不过是为了告诉typescript这是什么类型，而不是进行类型转换
}
toBoolean(1);
*/
/**
 * 所以类型断言不是类型转换，它不会真的影响到变量的类型。
 * 若要进行类型转换，需要直接调用类型转换的方法：
 */
/*
function toBoolean(something: any): boolean {
    return Boolean(something);//如果要类型进行转换，需要调用类型转换的方法
}

toBoolean(1);//返回true
*/
/**
 * 类型断言 vs 类型声明
 *
 * 我们使用 as Cat 将 any 类型断言为了 Cat 类型。
 */
function getCacheData6(key) {
    return window.cache[key];
}
var tom6 = getCacheData('tom');
tom6.run();
/**
 * 但实际上还有其他方式可以解决这个问题：
 *
 * 下面的例子中，我们通过类型声明的方式，将 tom7 声明为 Cat7，
 * 然后再将 any 类型的 getCacheData('tom') 赋值给 Cat 类型的 tom。
 */
function getCacheData7(key) {
    return window.cache[key];
}
var tom77 = getCacheData('tom'); //注意在这里，并没有在方法结尾处使用as Cat7,而是在变量后面声明了变量的类型
tom77.run();
var animal8 = {
    name: 'tom'
};
var tom8 = animal8; //由于Animal8兼容Cat8，所以可以将animal8断言为Cat8
/**
 * 但是若直接声明 tom 为 Cat 类型：
 *
 * 则会报错，不允许将 animal 赋值为 Cat 类型的 tom。
 * 这很容易理解，Animal 可以看作是 Cat 的父类，当然不能将父类的实例赋值给类型为子类的变量。
 *
 * 深入的讲，它们的核心区别就在于：
 *
 * 1：animal 断言为 Cat，只需要满足 Animal 兼容 Cat 或 Cat 兼容 Animal 即可
 * 2：animal 赋值给 tom，需要满足 Cat 兼容 Animal 才行
 *
 * 但是 Cat 并不兼容 Animal。
 * 而在前一个例子中，
 * 由于 getCacheData('tom') 是 any 类型，any 兼容 Cat，Cat 也兼容 any，故：
 *
 * const tom = getCacheData('tom') as Cat;
 *
 * 等价于
 *
 * const tom: Cat = getCacheData('tom');
 *
 * 知道了它们的核心区别，就知道了类型声明是比类型断言更加严格的。
 * 所以为了增加代码的质量，我们最好优先使用类型声明，这也比类型断言的 as 语法更加优雅。
 */
/*

interface Animal9 {
    name: string;
}
interface Cat9 {
    name: string;
    run(): void;
}

const animal9: Animal9 = {
    name: 'tom'
};
//如果animal9存在run方法就不报错了，因为Cat9不兼容Animal9
let tom9: Cat9 = animal9;//报错，error TS2741: Property 'run' is missing in type 'Animal9' but required in type 'Cat9'.

*/
/**
 * 类型断言 vs 泛型§
 * 还是这个例子：
 */
/*

function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData('tom') as Cat;
tom.run();

*/
/**
 * 我们还有第三种方式可以解决这个问题，那就是泛型：
 *
 * 通过给 getCacheData 函数添加了一个泛型 <T>，
 * 我们可以更加规范的实现对 getCacheData 返回值的约束，
 * 这也同时去除掉了代码中的 any，是最优的一个解决方案
 */
function getCacheData10(key) {
    return window.cache[key];
}
var tom10 = getCacheData10('tom');
tom10.run();
//# sourceMappingURL=2.8类型断言.js.map