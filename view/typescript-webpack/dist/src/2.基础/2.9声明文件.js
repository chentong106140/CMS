/**
 * declare var 声明全局变量
 * declare function 声明全局方法
 * declare class 声明全局类
 * declare enum 声明全局枚举类型
 * declare namespace 声明（含有子属性的）全局对象
 * interface 和 type 声明全局类型
 *
 * export 导出变量
 * export namespace 导出（含有子属性的）对象
 * export default ES6 默认导出
 * export = commonjs 导出模块
 * export as namespace UMD 库声明全局变量
 * declare global 扩展全局变量
 * declare module 扩展模块
 * /// <reference /> 三斜线指令

 */
/**
 *  什么是声明语句
 *
 *  假如我们想使用第三方库 jQuery，一种常见的方式是在 html 中通过 <script> 标签引入 jQuery，
 *  然后就可以使用全局变量 $ 或 jQuery 了。
 *  我们通常这样获取一个 id 是 foo 的元素：
 *
 *  $('#foo');
 *  或者
 *  jQuery('#foo');
 *
 * 但是在 ts 中，编译器并不知道 $ 或 jQuery 是什么东西1：
 */
/*

jQuery('#foo');//报错：error TS2304: Cannot find name 'jQuery'.

*/
/**
 * 这时，我们需要使用 declare var 来定义它的类型2:
 *
 * 下例中，declare var 并没有真的定义一个变量，只是定义了全局变量 jQuery 的类型，
 * 仅仅会用于编译时的检查，在编译结果中会被删除
 */
/*

declare var jQuery: (selector: string) => any;//在编译后，会被删除这一段

jQuery('#foo');//在编译后，只保留这一行

*/
/**
 * 通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件3：
 *
 * 声明文件必需以 .d.ts 为后缀。
 * 一般来说，ts 会解析项目中所有的 *.ts 文件，当然也包含以 .d.ts 结尾的文件。
 * 所以当我们将 jQuery.d.ts 放到项目中时，其他所有 *.ts 文件就都可以获得 jQuery 的类型定义了。
 */
/*

// src/jQuery.d.ts
declare var jQuery: (selector: string) => any;

// src/index.ts
jQuery('#foo');

*/
/**
 * declare var
 * 在所有的声明语句中，declare var 是最简单的，如之前所学，它能够用来定义一个全局变量的类型。
 * 与其类似的，还有 declare let 和 declare const，使用 let 与使用 var 没有什么区别：
 */
/*

// src/jQuery.d.ts
declare let jQuery: (selector: string) => any;

// src/index.ts

jQuery('#foo');
// 使用 declare let 定义的 jQuery 类型，允许修改这个全局变量
jQuery = function(selector) {
    return document.querySelector(selector);
};

*/
/**
 * 而当我们使用 const 定义时，表示此时的全局变量是一个常量，不允许再去修改它的值了
 *
 * 一般来说，全局变量都是禁止修改的常量，所以大部分情况都应该使用 const 而不是 var 或 let。
 */
/*

// src/jQuery.d.ts

declare const jQuery: (selector: string) => any;

jQuery('#foo');
// 使用 declare const 定义的 jQuery 类型，禁止修改这个全局变量
jQuery = function(selector) {
    return document.querySelector(selector);
};
// 报错：ERROR: Cannot assign to 'jQuery' because it is a constant or a read-only property.

*/
/**
 * 需要注意的是，声明语句中只能定义类型，切勿在声明语句中定义具体的实现
 *
 */
/*
//这里声明全局变量的时候，也进行了具体的实现，所以会报错，应该写成：
//declare const jQuery: (selector: string) => any;
declare const jQuery = function(selector) {
    return document.querySelector(selector);
};
// 报错：ERROR: An implementation cannot be declared in ambient contexts.

*/
/**
 * declare function
 * declare function 用来定义全局函数的类型。jQuery 其实就是一个函数，所以也可以用 function 来定义：
 */
/*

// src/jQuery.d.ts
//jQuery全局变量：declare var jQuery: (selector: string) => any;
//function变量1：var jQuery = function(selector:string):any{return xx};
//function变量2：function jQuery(selector:string):any{return xx;};
//function全局函数：
declare function jQuery(selector: string): any;


// src/index.ts

jQuery('#foo');

*/
/**
 * 在函数类型的声明语句中，函数重载也是支持的
 */
/*

// src/jQuery.d.ts

declare function jQuery(selector: string): any;
//这里声明了一个jQuery的重载方法，上面的入参是一个字符串，下面这个重载的方法入参是一个回调函数
declare function jQuery(domReadyCallback: () => any): any;

// src/index.ts

jQuery('#foo');
jQuery(function() {
    alert('Dom Ready!');
});

*/
/**
 * declare class
 * 当全局变量是一个类的时候，我们用 declare class 来定义它的类型：
 *
 */
/*

// src/Animal.d.ts

declare class Animal {
    name: string;
    constructor(name: string);
    sayHi(): string;
}

// src/index.ts

let cat = new Animal('Tom');

//编译后代码如下
//var cat = new Animal('Tom');

*/
/**
 * 同样的，declare class 语句也只能用来定义类型，不能用来定义具体的实现，比如定义 sayHi 方法的具体实现则会报错：
 */
/*

// src/Animal.d.ts

declare class Animal {
    name: string;
    constructor(name: string);
    sayHi() {
        return `My name is ${this.name}`;
    };
    //报错： ERROR: An implementation cannot be declared in ambient contexts.
}

*/
/**
 * declare enum
 * 使用 declare enum 定义的枚举类型也称作外部枚举（Ambient Enums），举例如下
 *
 * 与其他全局变量的类型声明一致，declare enum 仅用来定义类型，而不是具体的值。
 * Directions.d.ts 仅仅会用于编译时的检查，声明文件里的内容在编译结果中会被删除。
 *
 * 其中 Directions 是由第三方库定义好的全局变量
 */
/*

// src/Directions.d.ts

declare enum Directions {
    Up,
    Down,
    Left,
    Right
}

// src/index.ts

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

//编译后内容如下：
//var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

*/
/**
 * declare namespace
 * namespace 是 ts 早期时为了解决模块化而创造的关键字，中文称为命名空间。
 *
 * 由于历史遗留原因，在早期还没有 ES6 的时候，ts 提供了一种模块化方案，使用 module 关键字表示内部模块。
 * 但由于后来 ES6 也使用了 module 关键字，ts 为了兼容 ES6，使用 namespace 替代了自己的 module，更名为命名空间。
 *
 * 随着 ES6 的广泛应用，现在已经不建议再使用 ts 中的 namespace，而推荐使用 ES6 的模块化方案了，
 * 故我们不再需要学习 namespace 的使用了。
 *
 * namespace 被淘汰了，但是在声明文件中，declare namespace 还是比较常用的，
 * 它用来表示全局变量是一个对象，包含很多子属性。
 *
 * 比如 jQuery 是一个全局变量，它是一个对象，提供了一个 jQuery.ajax 方法可以调用，
 * 那么我们就应该使用 declare namespace jQuery 来声明这个拥有多个子属性的全局变量。
 *
 */
/*

// src/jQuery.d.ts：全局变量声明文件

declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
}

// src/index.ts：调用全局变量文件

jQuery.ajax('/api/get_something');

//编译后的内容：
//jQuery.ajax('/api/get_something');

*/
/**
 * 注意，在 declare namespace 内部，我们直接使用 function ajax 来声明函数，
 * 而不是使用 declare function ajax。类似的，也可以使用 const, class, enum 等语句：
 */
/*


// src/jQuery.d.ts

declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
    const version: number;
    class Event {
        blur(eventType: EventType): void
    }
    enum EventType {
        CustomClick
    }
}

// src/index.ts

jQuery.ajax('/api/get_something');
console.log(jQuery.version);
const e = new jQuery.Event();
e.blur(jQuery.EventType.CustomClick);

//编译后的文件
/!*

jQuery.ajax('/api/get_something');
console.log(jQuery.version);
var e = new jQuery.Event();
e.blur(jQuery.EventType.CustomClick);

*!/

*/
/**
 * 嵌套的命名空间
 * 如果对象拥有深层的层级，则需要用嵌套的 namespace 来声明深层的属性的类型
 */
/*

// src/jQuery.d.ts

declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
    namespace fn {
        function extend(object: any): void;
    }
}
// src/index.ts

jQuery.ajax('/api/get_something');
jQuery.fn.extend({
    check: function() {
        return this.each(function() {
            this.checked = true;
        });
    }
});

//编译后的内容：
/!*
jQuery.ajax('/api/get_something');
jQuery.fn.extend({
    check: function () {
        return this.each(function () {
            this.checked = true;
        });
    }
});
 *!/

*/
/**
 * 假如 jQuery 下仅有 fn 这一个属性（没有 ajax 等其他属性或方法），则可以不需要嵌套 namespace11
 */
/*
// src/jQuery.d.ts

declare namespace jQuery.fn {
    function extend(object: any): void;
}

// src/index.ts

jQuery.fn.extend({
    check: function() {
        return this.each(function() {
            this.checked = true;
        });
    }
});

//编译后的内容：

/!*
jQuery.fn.extend({
    check: function () {
        return this.each(function () {
            this.checked = true;
        });
    }
});
*!/*/
/**
 * interface 和 type
 *
 * 除了全局变量之外，可能有一些类型我们也希望能暴露出来。在类型声明文件中，
 * 我们可以直接使用 interface 或 type 来声明一个全局的接口或类型
 */
/*

// src/jQuery.d.ts
//声明全局接口
interface AjaxSettings {
    method?: 'GET' | 'POST';//method是可选参数，限制值只能是'GET'或者'POST'
    data?: any;//data是可选参数，并且是一个任意类型
}
declare namespace jQuery {
    function ajax(url: string, settings?: AjaxSettings): void;
}

// src/index.ts
//调用全局接口
let settings: AjaxSettings = {
    method: 'POST',
    data: {
        name: 'foo'
    }
};
jQuery.ajax('/api/post_something', settings);

//编译后的内容：

/!*
var settings = {
    method: 'POST',
    data: {
        name: 'foo'
    }
};
jQuery.ajax('/api/post_something', settings);
*!/

*/
/**
 * 防止命名冲突
 * 暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中，
 * 我们应该尽可能的减少全局变量或全局类型的数量。故最好将他们放到 namespace 下
 *
 */
/*

// src/jQuery.d.ts
//定义命名空间，并在该命名空间内，定义了全局的接口
declare namespace jQuery {
    interface AjaxSettings {
        method?: 'GET' | 'POST'
        data?: any;
    }
    function ajax(url: string, settings?: AjaxSettings): void;
}

// src/index.ts

let settings: jQuery.AjaxSettings = {//注意，在使用这个 interface 的时候，也应该加上 jQuery 前缀：
    method: 'POST',
    data: {
        name: 'foo'
    }
};
jQuery.ajax('/api/post_something', settings);

//编译后的内容如下：
/!*
var settings = {
    method: 'POST',
    data: {
        name: 'foo'
    }
};
jQuery.ajax('/api/post_something', settings);
*!/

*/
/**
 * 声明合并
 * 假如 jQuery 既是一个函数，可以直接被调用 jQuery('#foo')，又是一个对象，
 * 拥有子属性 jQuery.ajax()（事实确实如此），那么我们可以组合多个声明语句，它们会不冲突的合并起来
 */
/*

// src/jQuery.d.ts
//组合声明，jQuery既是全局函数，也是一个命名空间
declare function jQuery(selector: string): any;
declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
}

// src/index.ts

jQuery('#foo');
jQuery.ajax('/api/get_something');

*/
/**
 * npm 包
 * 一般我们通过 import foo from 'foo' 导入一个 npm 包，这是符合 ES6 模块规范的。
 *
 * 在我们尝试给一个 npm 包创建声明文件之前，需要先看看它的声明文件是否已经存在。
 * 一般来说，npm 包的声明文件可能存在于两个地方：
 *
 *      1:与该 npm 包绑定在一起。判断依据是 package.json 中有 types 字段，或者有一个 index.d.ts 声明文件。
 *      这种模式不需要额外安装其他包，是最为推荐的，所以以后我们自己创建 npm 包的时候，
 *      最好也将声明文件与 npm 包绑定在一起。
 *
 *      2:发布到 @types 里。我们只需要尝试安装一下对应的 @types 包就知道是否存在该声明文件，
 *      安装命令是 npm install @types/foo --save-dev。
 *      这种模式一般是由于 npm 包的维护者没有提供声明文件，所以只能由其他人将声明文件发布到 @types 里了。
 *
 *  假如以上两种方式都没有找到对应的声明文件，那么我们就需要自己为它写声明文件了。
 *  由于是通过 import 语句导入的模块，所以声明文件存放的位置也有所约束，一般有两种方案：
 *
 *      1:创建一个 node_modules/@types/foo/index.d.ts 文件，存放 foo 模块的声明文件。
 *      这种方式不需要额外的配置，但是 node_modules 目录不稳定，代码也没有被保存到仓库中，无法回溯版本，
 *      有不小心被删除的风险，故不太建议用这种方案，一般只用作临时测试。
 *
 *      2:创建一个 types 目录，专门用来管理自己写的声明文件，将 foo 的声明文件放到 types/foo/index.d.ts 中。
 *      这种方式需要配置下 tsconfig.json 中的 paths 和 baseUrl 字段。
 *
 *         /path/to/project
 *               ├── src
 *               |  └── index.ts
 *               ├── types
 *               |  └── foo
 *               |     └── index.d.ts
 *               └── tsconfig.json
 *
 *        tsconfig.json 内容：
 *              {
 *                  "compilerOptions": {
 *                      "module": "commonjs",
 *                      "baseUrl": "./",
 *                      "paths": {
 *                          "*": ["types/*"]
 *                      }
 *                  }
 *              }
 *
 *  如此配置之后，通过 import 导入 foo 的时候，也会去 types 目录下寻找对应的模块的声明文件了。
 *  注意 module 配置可以有很多种选项，不同的选项会影响模块的导入导出模式。
 *  这里我们使用了 commonjs 这个最常用的选项，后面的教程也都默认使用的这个选项。
 *
 *  不管采用了以上两种方式中的哪一种，
 *  我都强烈建议大家将书写好的声明文件（通过给第三方库发 pull request，或者直接提交到 @types 里）发布到开源社区中，
 *  享受了这么多社区的优秀的资源，就应该在力所能及的时候给出一些回馈。
 *  只有所有人都参与进来，才能让 ts 社区更加繁荣。
 *
 *  npm 包的声明文件主要有以下几种语法：
 *      1:export 导出变量
 *      2:export namespace 导出（含有子属性的）对象
 *      3:export default ES6 默认导出
 *      4:export = commonjs 导出模块
 *
 */
/**
 * export
 * npm 包的声明文件与全局变量的声明文件有很大区别。在 npm 包的声明文件中，使用 declare 不再会声明一个全局变量，
 * 而只会在当前文件中声明一个局部变量。只有在声明文件中使用 export 导出，
 * 然后在使用方 import 导入后，才会应用到这些类型声明。
 *
 * export 的语法与普通的 ts 中的语法类似，区别仅在于声明文件中禁止定义具体的实现
 * https://github.com/chentong106140/typescript-tutorial/blob/master/basics/declaration-files.md
 *
 */
// types/foo/index.d.ts
/*

export const name: string;
export function getName(): string;//
export class Animal {
    constructor(name: string);
    sayHi(): string;
}
export enum Directions {
    Up,
    Down,
    Left,
    Right
}
export interface Options {
    data: any;
}

*/
/**
 * 对应的导入和使用模块应该是这样：
 */
/*

// src/index.ts

import { name, getName, Animal, Directions, Options } from 'foo';

console.log(name);
let myName = getName();
let cat = new Animal('Tom');
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
let options: Options = {
    data: {
        name: 'foo'
    }
};

*/
/**
 * 混用 declare 和 export
 * 我们也可以使用 declare 先声明多个变量，最后再用 export 一次性导出。上例的声明文件可以等价的改写为：
 *
 * 注意，与全局变量的声明文件类似，interface 前是不需要 declare 的。
 */
/*

// types/foo/index.d.ts

declare const name: string;
declare function getName(): string;
declare class Animal {
    constructor(name: string);
    sayHi(): string;
}
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
interface Options {
    data: any;
}

export { name, getName, Animal, Directions, Options };
*/
/**
 * export namespace
 * 与 declare namespace 类似，export namespace 用来导出一个拥有子属性的对象
 */
/*

// types/foo/index.d.ts

export namespace foo {
    const name: string;
    namespace bar {
        function baz(): string;
    }
}

// src/index.ts

import { foo } from 'foo';

console.log(foo.name);
foo.bar.baz();

*/
/**
 * export default
 * 在 ES6 模块系统中，使用 export default 可以导出一个默认值，
 * 使用方可以用 import foo from 'foo' 而不是 import { foo } from 'foo' 来导入这个默认值。
 *
 * 在类型声明文件中，export default 用来导出默认值的类型
 */
/*

// types/foo/index.d.ts

export default function foo(): string;

// src/index.ts

import foo from 'foo';

foo();

*/
/**
 * 注意，只有 function、class 和 interface 可以直接默认导出，其他的变量需要先定义出来，再默认导出
 */
/*
// types/foo/index.d.ts

export default enum Directions {
// ERROR: Expression expected.
    Up,
    Down,
    Left,
    Right
}

*/
/**
 * 上例中 export default enum 是错误的语法，需要使用 declare enum 定义出来，然后使用 export default 导出：
 */
/*


// types/foo/index.d.ts

declare enum Directions {
    Up,
    Down,
    Left,
    Right
}

export default Directions;

*/
/**
 * 针对这种默认导出，我们一般会将导出语句放在整个声明文件的最前面
 */
/*

// types/foo/index.d.ts

export default Directions;

declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
*/
/**
 * export =
 * https://github.com/chentong106140/typescript-tutorial/blob/master/basics/declaration-files.md#export-
 *
 * 在 commonjs 规范中，我们用以下方式来导出一个模块：
 *
 */
/*

// 整体导出
module.exports = foo;
// 单个导出
exports.bar = bar;

*/
/**
 * 在 ts 中，针对这种模块导出，有多种方式可以导入，第一种方式是 const ... = require：
 */
/*

// 整体导入
const foo = require('foo');
// 单个导入
const bar = require('foo').bar;

*/
/**
 * 第二种方式是 import ... from，注意针对整体导出，需要使用 import * as 来导入：
 */
/*

// 整体导入
import * as foo from 'foo';
// 单个导入
import { bar } from 'foo';

*/
/**
 * 第三种方式是 import ... require，这也是 ts 官方推荐的方式：
 */
/*

// 整体导入
import foo = require('foo');
// 单个导入
import bar = foo.bar;

*/
/**
 * 对于这种使用 commonjs 规范的库，假如要为它写类型声明文件的话，就需要使用到 export = 这种语法了
 */
/*

// types/foo/index.d.ts

export = foo;

declare function foo(): string;
declare namespace foo {
    const bar: number;
}

*/
/**
 * 需要注意的是，上例中使用了 export = 之后，就不能再单个导出 export { bar } 了。
 * 所以我们通过声明合并，使用 declare namespace foo 来将 bar 合并到 foo 里。

 * 准确地讲，export = 不仅可以用在声明文件中，也可以用在普通的 ts 文件中。
 * 实际上，import ... require 和 export = 都是 ts 为了兼容 AMD 规范和 commonjs 规范而创立的新语法，
 * 由于并不常用也不推荐使用，所以这里就不详细介绍了，感兴趣的可以看官方文档。

 * 由于很多第三方库是 commonjs 规范的，所以声明文件也就不得不用到 export = 这种语法了。
 * 但是还是需要再强调下，相比与 export =，我们更推荐使用 ES6 标准的 export default 和 export。
 *
 */
/**
 * UMD 库
 * 既可以通过 <script> 标签引入，又可以通过 import 导入的库，称为 UMD 库。
 * 相比于 npm 包的类型声明文件，我们需要额外声明一个全局变量，为了实现这种方式，
 * ts 提供了一个新语法 export as namespace。
 */
/**
 * export as namespace
 * 一般使用 export as namespace 时，都是先有了 npm 包的声明文件，再基于它添加一条 export as namespace 语句，
 * 即可将声明好的一个变量声明为全局变量，举例如下
 */
/*

// types/foo/index.d.ts

export as namespace foo;
export = foo;

declare function foo(): string;
declare namespace foo {
    const bar: number;
}

*/
/**
 * 当然它也可以与 export default 一起使用：
 */
/*

// types/foo/index.d.ts

export as namespace foo;
export default foo;

declare function foo(): string;
declare namespace foo {
    const bar: number;
}

*/
/**
 * 直接扩展全局变量
 * https://github.com/chentong106140/typescript-tutorial/blob/master/basics/declaration-files.md#%E7%9B%B4%E6%8E%A5%E6%89%A9%E5%B1%95%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F
 * 有的第三方库扩展了一个全局变量，可是此全局变量的类型却没有相应的更新过来，就会导致 ts 编译错误，
 * 此时就需要扩展全局变量的类型。比如扩展 String 类型
 *
 */
/*

interface String {
    prependHello(): string;
}

'foo'.prependHello();

*/
/**
 * 通过声明合并，使用 interface String 即可给 String 添加属性或方法。
 * 也可以使用 declare namespace 给已有的命名空间添加类型声明
 */
/*

// types/jquery-plugin/index.d.ts

declare namespace JQuery {
    interface CustomOptions {
        bar: string;
    }
}

interface JQueryStatic {
    foo(options: JQuery.CustomOptions): string;
}

// src/index.ts

jQuery.foo({
    bar: ''
});

*/
/**
 * declare global
 *
 * 在 npm 包或 UMD 库中扩展全局变量
 *
 *
 * 如之前所说，对于一个 npm 包或者 UMD 库的声明文件，只有 export 导出的类型声明才能被导入。
 * 所以对于 npm 包或 UMD 库，如果导入此库之后会扩展全局变量，
 * 则需要使用另一种语法在声明文件中扩展全局变量的类型，那就是 declare global。
 *
 * 注意即使此声明文件不需要导出任何东西，仍然需要导出一个空对象，
 * 用来告诉编译器这是一个模块的声明文件，而不是一个全局变量的声明文件。
 */
/*

// types/foo/index.d.ts

declare global {
    interface String {
        prependHello(): string;
    }
}

export {};

// src/index.ts

'bar'.prependHello();

*/
/**
 * declare module
 * 模块插件
 *
 * 有时通过 import 导入一个模块插件，可以改变另一个原有模块的结构。
 * 此时如果原有模块已经有了类型声明文件，而插件模块没有类型声明文件，就会导致类型不完整，缺少插件部分的类型。
 * ts 提供了一个语法 declare module，它可以用来扩展原有模块的类型。
 *
 * 如果是需要扩展原有模块的话，需要在类型声明文件中先引用原有模块，再使用 declare module 扩展原有模块
 *
 */
/*

// types/moment-plugin/index.d.ts

import * as moment from 'moment';

declare module 'moment' {
    export function foo(): moment.CalendarKey;
}

// src/index.ts

import * as moment from 'moment';
import 'moment-plugin';

moment.foo();

*/
/**
 * declare module 也可用于在一个文件中一次性声明多个模块的类型
 *
 */
/*

// types/foo-bar.d.ts
//一个文件内定义了2个模块
declare module 'foo' {
    export interface Foo {
        foo: string;
    }
}

declare module 'bar' {
    export function bar(): string;
}

// src/index.ts
//这里可以直接导入那两个模块
import { Foo } from 'foo';
import * as bar from 'bar';

let f: Foo;
bar.bar();

*/
/**
 * 声明文件中的依赖
 * 一个声明文件有时会依赖另一个声明文件中的类型，比如在前面的 declare module 的例子中，
 * 我们就在声明文件中导入了 moment，并且使用了 moment.CalendarKey 这个类型：
 */
/*

// types/moment-plugin/index.d.ts

import * as moment from 'moment';

declare module 'moment' {
    export function foo(): moment.CalendarKey;
}

*/
/**
 * 三斜线指令
 *
 * 除了可以在声明文件中通过 import 导入另一个声明文件中的类型之外，
 * 还有一个语法也可以用来导入另一个声明文件，那就是三斜线指令。
 *
 * 与 namespace 类似，三斜线指令也是 ts 在早期版本中为了描述模块之间的依赖关系而创造的语法。
 * 随着 ES6 的广泛应用，现在已经不建议再使用 ts 中的三斜线指令来声明模块之间的依赖关系了。
 *
 * 但是在声明文件中，它还是有一定的用武之地。
 *
 * 类似于声明文件中的 import，它可以用来导入另一个声明文件。
 * 与 import 的区别是，当且仅当在以下几个场景下，我们才需要使用三斜线指令替代 import：
 *
 * 1：当我们在书写一个全局变量的声明文件时
 * 2：当我们需要依赖一个全局变量的声明文件时
 *
 */
/**
 * 书写一个全局变量的声明文件
 *
 * 这些场景听上去很拗口，但实际上很好理解——在全局变量的声明文件中，是不允许出现 import, export 关键字的。
 * 一旦出现了，那么他就会被视为一个 npm 包或 UMD 库，就不再是全局变量的声明文件了。
 * 故当我们在书写一个全局变量的声明文件时，如果需要引用另一个库的类型，那么就必须用三斜线指令了
 *
 * 三斜线指令的语法如上，/// 后面使用 xml 的格式添加了对 jquery 类型的依赖，
 * 这样就可以在声明文件中使用 JQuery.AjaxSettings 类型了。
 */
/*

// types/jquery-plugin/index.d.ts

/// <reference types="jquery" />

declare function foo(options: JQuery.AjaxSettings): string;

// src/index.ts

foo({});

*/
/**
 * 依赖一个全局变量的声明文件
 *
 * 在另一个场景下，当我们需要依赖一个全局变量的声明文件时，由于全局变量不支持通过 import 导入，
 * 当然也就必须使用三斜线指令来引入了
 */
/*

// types/node-plugin/index.d.ts

/// <reference types="node" />

export function foo(p: NodeJS.Process): string;

// src/index.ts

import { foo } from 'node-plugin';

foo(global.process);

*/
/**
 * 在上面的例子中，我们通过三斜线指引入了 node 的类型，然后在声明文件中使用了 NodeJS.Process 这个类型。
 * 最后在使用到 foo 的时候，传入了 node 中的全局变量 process。
 * 由于引入的 node 中的类型都是全局变量的类型，它们是没有办法通过 import 来导入的，
 * 所以这种场景下也只能通过三斜线指令来引入了。
 *
 * 以上两种使用场景下，都是由于需要书写或需要依赖全局变量的声明文件，所以必须使用三斜线指令。
 * 在其他的一些不是必要使用三斜线指令的情况下，就都需要使用 import 来导入。
 */
/**
 * 拆分声明文件
 * 当我们的全局变量的声明文件太大时，可以通过拆分为多个文件，然后在一个入口文件中将它们一一引入，
 * 来提高代码的可维护性。比如 jQuery 的声明文件就是这样的
 *
 * 其中用到了 types 和 path 两种不同的指令。
 * 它们的区别是：types 用于声明对另一个库的依赖，而 path 用于声明对另一个文件的依赖。
 *
 * 上例中，sizzle 是与 jquery 平行的另一个库，所以需要使用 types="sizzle" 来声明对它的依赖。
 * 而其他的三斜线指令就是将 jquery 的声明拆分到不同的文件中了，
 * 然后在这个入口文件中使用 path="foo" 将它们一一引入。
 */
/*

// node_modules/@types/jquery/index.d.ts

/// <reference types="sizzle" />
/// <reference path="JQueryStatic.d.ts" />
/// <reference path="JQuery.d.ts" />
/// <reference path="misc.d.ts" />
/// <reference path="legacy.d.ts" />

export = jQuery;

*/
/**
 * 其他三斜线指令
 *
 * 除了这两种三斜线指令之外，还有其他的三斜线指令，
 * 比如
 * /// <reference no-default-lib="true"/>,
 * /// <amd-module /> 等，
 * 但它们都是废弃的语法，故这里就不介绍了，详情可见官网。
 */
/**
 * 自动生成声明文件
 *
 * 如果库的源码本身就是由 ts 写的，那么在使用 tsc 脚本将 ts 编译为 js 的时候，
 * 添加 declaration 选项，就可以同时也生成 .d.ts 声明文件了。
 *
 * 我们可以在命令行中添加 --declaration（简写 -d），
 * 或者在 tsconfig.json 中添加 declaration 选项。这里以 tsconfig.json 为例：
 */
/*
        {
           "compilerOptions":
            {
                  "module": "commonjs",
                  "outDir": "lib",
                  "declaration": true,
            }
        }

*/
/**
 * 上例中我们添加了 outDir 选项，将 ts 文件的编译结果输出到 lib 目录下，
 * 然后添加了 declaration 选项，设置为 true，表示将会由 ts 文件自动生成 .d.ts 声明文件，也会输出到 lib 目录下。
 *
 * 运行 tsc 之后，目录结构如下
 *
 */
/*
        /path/to/project
        ├── lib
        |  ├── bar
        |  |  ├── index.d.ts
        |  |  └── index.js
        |  ├── index.d.ts
        |  └── index.js
        ├── src
        |  ├── bar
        |  |  └── index.ts
        |  └── index.ts
        ├── package.json
        └── tsconfig.json

 */
/**
 * 在这个例子中，src 目录下有两个 ts 文件，分别是 src/index.ts 和 src/bar/index.ts，
 * 它们被编译到 lib 目录下的同时，也会生成对应的两个声明文件 lib/index.d.ts 和 lib/bar/index.d.ts。
 * 它们的内容分别是：
 */
/*

// src/index.ts

export * from './bar';

export default function foo() {
    return 'foo';
}

// src/bar/index.ts

export function bar() {
    return 'bar';
}

// lib/index.d.ts

export * from './bar';
export default function foo(): string;

// lib/bar/index.d.ts

export declare function bar(): string;

 */
/**
 * 可见，自动生成的声明文件基本保持了源码的结构，而将具体实现去掉了，生成了对应的类型声明。
 *
 * 使用 tsc 自动生成声明文件时，每个 ts 文件都会对应一个 .d.ts 声明文件。
 * 这样的好处是，使用方不仅可以在使用 import foo from 'foo' 导入默认的模块时获得类型提示，
 * 还可以在使用 import bar from 'foo/lib/bar' 导入一个子模块时，也获得对应的类型提示。
 *
 * 除了 declaration 选项之外，还有几个选项也与自动生成声明文件有关，这里只简单列举出来，不做详细演示了：
 *
 *      1:declarationDir 设置生成 .d.ts 文件的目录
 *      2:declarationMap 对每个 .d.ts 文件，都生成对应的 .d.ts.map（sourcemap）文件
 *      3:emitDeclarationOnly 仅生成 .d.ts 文件，不生成 .js 文件
 *
 */
/**
 * 发布声明文件
 * 当我们为一个库写好了声明文件之后，下一步就是将它发布出去了。
 * 此时有两种方案：
 *      1:将声明文件和源码放在一起
 *      2:将声明文件发布到 @types 下
 *
 * 这两种方案中优先选择第一种方案。保持声明文件与源码在一起，使用时就不需要额外增加单独的声明文件库的依赖了，
 * 而且也能保证声明文件的版本与源码的版本保持一致。
 *
 * 仅当我们在给别人的仓库添加类型声明文件，但原作者不愿意合并 pull request 时，
 * 才需要使用第二种方案，将声明文件发布到 @types 下。
 */
/**
 * 将声明文件和源码放在一起
 * 如果声明文件是通过 tsc 自动生成的，那么无需做任何其他配置，只需要把编译好的文件也发布到 npm 上，使用方就可以获取到类型提示了。
 *
 * 如果是手动写的声明文件，那么需要满足以下条件之一，才能被正确的识别：
 *
 *      1:给 package.json 中的 types 或 typings 字段指定一个类型声明文件地址
 *      2:在项目根目录下，编写一个 index.d.ts 文件
 *      3:针对入口文件（package.json 中的 main 字段指定的入口文件），编写一个同名不同后缀的 .d.ts 文件
 *
 * 第一种方式是给 package.json 中的 types 或 typings 字段指定一个类型声明文件地址。比如：
 */
/*
        {
            "name": "foo",
            "version": "1.0.0",
            "main": "lib/index.js",
            "types": "foo.d.ts",
        }
 */
/**
 *  指定了 types 为 foo.d.ts 之后，导入此库的时候，就会去找 foo.d.ts 作为此库的类型声明文件了。
 *  typings 与 types 一样，只是另一种写法。
 *
 *  如果没有指定 types 或 typings，那么就会在根目录下寻找 index.d.ts 文件，将它视为此库的类型声明文件。
 *
 *  如果没有找到 index.d.ts 文件，那么就会寻找入口文件（package.json 中的 main 字段指定的入口文件）
 *      是否存在对应同名不同后缀的 .d.ts 文件。
 *
 *  比如 package.json 是这样时：
 */
/*
        {
            "name": "foo",
            "version": "1.0.0",
            "main": "lib/index.js"
        }
 */
/**
 * 就会先识别 package.json 中是否存在 types 或 typings 字段。
 * 发现不存在，那么就会寻找是否存在 index.d.ts 文件。
 * 如果还是不存在，那么就会寻找是否存在 lib/index.d.ts 文件。
 * 假如说连 lib/index.d.ts 都不存在的话，就会被认为是一个没有提供类型声明文件的库了。
 *
 * 有的库为了支持导入子模块，比如 import bar from 'foo/lib/bar'，
 * 就需要额外再编写一个类型声明文件 lib/bar.d.ts 或者 lib/bar/index.d.ts，
 * 这与自动生成声明文件类似，一个库中同时包含了多个类型声明文件。
 */
/**
 * 将声明文件发布到 @types 下
 *
 * 如果我们是在给别人的仓库添加类型声明文件，但原作者不愿意合并 pull request，
 * 那么就需要将声明文件发布到 @types 下。
 *
 * 与普通的 npm 模块不同，@types 是统一由 DefinitelyTyped 管理的。
 * 要将声明文件发布到 @types 下，就需要给 DefinitelyTyped 创建一个 pull-request，
 * 其中包含了类型声明文件，测试代码，以及 tsconfig.json 等。
 *
 * pull-request 需要符合它们的规范，并且通过测试，才能被合并，稍后就会被自动发布到 @types 下。
 * 在 DefinitelyTyped 中创建一个新的类型声明，
 * 需要用到一些工具，DefinitelyTyped 的文档中已经有了详细的介绍，这里就不赘述了，以官方文档为准。
 *
 */
//# sourceMappingURL=2.9声明文件.js.map