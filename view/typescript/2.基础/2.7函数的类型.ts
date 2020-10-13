

// 函数声明（Function Declaration）
function sum(x, y) {
    return x + y;
}

// 函数表达式（Function Expression）
let mySum = function (x, y) {
    return x + y;
};

/**
 * 一个函数有输入和输出，要在 TypeScript 中对其进行约束，
 * 需要把输入和输出都考虑到，其中函数声明的类型定义较简单：
 */
function sum2(x: number, y: number): number {
    return x + y;
}

//注意，输入多余的（或者少于要求的）参数，是不被允许的：   
/*
function sum3(x: number, y: number): number {
    return x + y;
}
sum3(1, 2, 3);//报错：这里多传递1个参数，所以会报错
sum3(1);//报错：这里少传递了1个参数
*/


/**
 * 函数表达式
 * 没有对匿名函数做约束
 * 如果要我们现在写一个对函数表达式（Function Expression）的定义，可能会写成这样：
 */
let mySum2 = function (x: number, y: number): number {
    return x + y;
};

/**
 * 对匿名函数做了入参与回参的约束：
 * 这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，
 * 而等号左边的 mySum2，是通过赋值操作进行类型推论而推断出来的。
 * 如果需要我们手动给 mySum3 添加类型，则应该是这样：
 * 
 * 注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>。
 * 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
 * 在 ES6 中，=> 叫做箭头函数，应用十分广泛，可以参考 ES6 中的箭头函数。
 */
let mySum3: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};


/**
 * 用接口定义函数的形状
 * 
 * 采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，
 * 可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。
 */
interface SearchFunc {
    (source: string, subString: string): boolean;//定义一个属性为一个函数，入参2个，回参为Boolean类型
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
};


/**
 * 可选参数
 * 
 * 前面提到，输入多余的（或者少于要求的）参数，是不允许的。那么如何定义可选的参数呢？
 * 与接口中的可选属性类似，我们用 ? 表示可选的参数：
 */
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tomm = buildName('Tom');

//需要注意的是，可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了：
/*
function buildName2(firstName?: string, lastName: string) {//报错：因为可选参数放到必须参数前面了
    if (firstName) {
        return firstName + ' ' + lastName;
    } else {
        return lastName;
    }
}
*/
/**
 * 参数默认值
 * 在 ES6 中，我们允许给函数的参数添加默认值，TypeScript 会将添加了默认值的参数识别为可选参数：
 */
function buildName2(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
let tomcat2 = buildName2('Tom', 'Cat');
let tom22 = buildName2('Tom');


/**
 *  此时就不受「可选参数必须接在必需参数后面」的限制了：
 */
function buildName3(firstName: string = 'Tom', lastName: string) {
    return firstName + ' ' + lastName;
}
let tomcat3 = buildName3('Tom', 'Cat');
let cat3 = buildName3(undefined, 'Cat');


/**
 * 剩余参数
 * 
 * ES6写法
 * ES6 中，可以使用 ...rest 的方式获取函数中的剩余参数（rest 参数）：
 * 
 * 注意，rest 参数只能是最后一个参数，关于 rest 参数，可以参考 ES6 中的 rest 参数。
 * 
 */
function push(array, ...items) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a: any[] = [];
push(a, 1, 2, 3);

/**
 * 剩余参数
 * 
 * typescript写法
 * 事实上，items 是一个数组。所以我们可以用数组的类型来定义它：
 * 
 * 注意，rest 参数只能是最后一个参数，关于 rest 参数，可以参考 ES6 中的 rest 参数。
 */
function push2(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a2 = [];
push2(a2, 1, 2, 3);


/**
 * 重载
 * 
 * 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
 * 
 * 比如，我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，
 * 输入字符串 'hello' 的时候，输出反转的字符串 'olleh'.
 * 
 * 利用联合类型，我们可以这么实现：
 */
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}

/**
 * 
 * 然而这样有一个缺点，就是不能够精确的表达，
 * 输入为数字的时候，输出也应该为数字，
 * 输入为字符串的时候，输出也应该为字符串。
 * 
 * 这时，我们可以使用重载定义多个 reverse 的函数类型：
 * 
 * 下例中，我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。
 * 在编辑器的代码提示中，可以正确的看到前两个提示。
 *
 * 注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，
 * 需要优先把精确的定义写在前面。
 */

function reverse1(x: number): number;//这里目的是定义函数入参为number时，返回值也是number类型
function reverse1(x: string): string;//这里目的是定义函数入参为string时，返回值也是string类型
function reverse1(x: number | string): number | string {//这里是函数的具体实现
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}










