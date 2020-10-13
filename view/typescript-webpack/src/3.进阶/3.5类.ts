/**
 * 类
 *  https://ts.xcatliu.com/advanced/class.html
 *  传统方法中，JavaScript 通过构造函数实现类的概念，通过原型链实现继承。
 *  而在 ES6 中，我们终于迎来了 class。
 *  
 *  TypeScript 除了实现了所有 ES6 中的类的功能以外，还添加了一些新的用法。
 *  这一节主要介绍类的用法，下一节再介绍如何定义类的类型。
 */

/**
 * 类的概念
 * 虽然 JavaScript 中有类的概念，但是可能大多数 JavaScript 程序员并不是非常熟悉类，
 * 这里对类相关的概念做一个简单的介绍。
 *      1:类（Class）：定义了一件事物的抽象特点，包含它的属性和方法
 *      2:对象（Object）：类的实例，通过 new 生成
 *      3:面向对象（OOP）的三大特性：封装、继承、多态
 *      4:封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。
 *          外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，
 *          同时也保证了外界无法任意更改对象内部的数据
 *      5:继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
 *      6:多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。
 *          比如 Cat 和 Dog 都继承自 Animal，但是分别实现了自己的 eat 方法。
 *          此时针对某一个实例，我们无需了解它是 Cat 还是 Dog，就可以直接调用 eat 方法，
 *          程序会自动判断出来应该如何执行 eat
 *      7：存取器（getter & setter）：用以改变属性的读取和赋值行为
 *      8:修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。
 *          比如 public 表示公有属性或方法
 *      9:抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。
 *          抽象类中的抽象方法必须在子类中被实现
 *      10:接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。
 *          接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口
 * 
 */


/**
 * ES6 中类的用法
 * 
 * 下面我们先回顾一下 ES6 中类的用法，更详细的介绍可以参考 ECMAScript 6 入门 - Class。
 * 
 * 属性和方法
 * 
 * 使用 class 定义类，使用 constructor 定义构造函数。
 * 
 * 通过 new 生成新实例的时候，会自动调用构造函数。
 * 
 */
/*


class Animal {
    public name;
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        return `My name is ${this.name}`;
    }
}

let a = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack

*/


/**
 * 类的继承
 * 
 * 使用 extends 关键字实现继承，子类中使用 super 关键字来调用父类的构造函数和方法。
 * 
 */
/*

class Cat extends Animal {
    constructor(name) {
        super(name); // 调用父类的 constructor(name)
        console.log(this.name);
    }
    sayHi() {
        return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
    }
}

let c = new Cat('Tom'); // Tom
console.log(c.sayHi()); // Meow, My name is Tom

*/


/**
 * 存取器
 * https://ts.xcatliu.com/advanced/class.html#%E5%AD%98%E5%8F%96%E5%99%A8
 * 
 * 使用 getter 和 setter 可以改变属性的赋值和读取行为：
 */
/*

class Animal {
    constructor(name) {
        this.name = name;
    }
    get name() {
        return 'Jack';
    }
    set name(value) {
        console.log('setter: ' + value);
    }
}

let a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack

*/


/**
 * 静态方法
 * 使用 static 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用：
 */
/*

class Animal {
    static isAnimal(a) {
        return a instanceof Animal;
    }
}

let a = new Animal('Jack');
Animal.isAnimal(a); // true
a.isAnimal(a); // TypeError: a.isAnimal is not a function

*/


/**
 * ES7 中类的用法
 * https://ts.xcatliu.com/advanced/class.html#es7-%E4%B8%AD%E7%B1%BB%E7%9A%84%E7%94%A8%E6%B3%95
 * 
 * ES7 提案中，可以使用 static 定义一个静态属性：
 */
/*

class Animal {
    static num = 42;

    constructor() {
        // ...
    }
}

console.log(Animal.num); // 42

*/

/**
 * TypeScript 中类的用法
 * https://ts.xcatliu.com/advanced/class.html#typescript-%E4%B8%AD%E7%B1%BB%E7%9A%84%E7%94%A8%E6%B3%95
 * 
 * public private 和 protected
 * 
 * TypeScript 可以使用三种访问修饰符（Access Modifiers），
 * 分别是 public、private 和 protected。
 * 
 *      1:public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
 *      2:private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
 *      3:protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
 * 
 * 下面举一些例子：
 */
/*

class Animal {
    public name;
    public constructor(name) {
        this.name = name;
    }
}


let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';
console.log(a.name); // Tom

*/

/**
 * 上面的例子中，name 被设置为了 public，所以直接访问实例的 name 属性是允许的。
 * 很多时候，我们希望有的属性是无法直接存取的，这时候就可以用 private 了：
 */
/*

class Animal {
    private name;
    public constructor(name) {
        this.name = name;
    }
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';

// index.ts(9,13): error TS2341: Property 'name' is private and only accessible within class 'Animal'.
// index.ts(10,1): error TS2341: Property 'name' is private and only accessible within class 'Animal'.

*/

/**
 * 需要注意的是，TypeScript 编译之后的代码中，并没有限制 private 属性在外部的可访问性。
 * 上面的例子编译后的代码是：
 */
/*

var Animal = (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
})();
var a = new Animal('Jack');
console.log(a.name);
a.name = 'Tom';

*/


/**
 * 使用 private 修饰的属性或方法，在子类中也是不允许访问的：
 * 
 */
/*

class Animal {
    private name;
    public constructor(name) {
        this.name = name;
    }
}

class Cat extends Animal {
    constructor(name) {
        super(name);
        console.log(this.name);
    }
}

// index.ts(11,17): error TS2341: Property 'name' is private and only accessible within class 'Animal'.

*/

/**
 * 而如果是用 protected 修饰，则允许在子类中访问：
 * 
 */
/*

class Animal {
    protected name;
    public constructor(name) {
        this.name = name;
    }
}

class Cat extends Animal {
    constructor(name) {
        super(name);
        console.log(this.name);
    }
}

*/

/**
 * 当构造函数修饰为 private 时，该类不允许被继承或者实例化：
 */
/*

class Animal {
    public name;
    private constructor(name) {
        this.name = name;
    }
}
class Cat extends Animal {
    constructor(name) {
        super(name);
    }
}

let a = new Animal('Jack');

// index.ts(7,19): TS2675: Cannot extend a class 'Animal'. Class constructor is marked as private.
// index.ts(13,9): TS2673: Constructor of class 'Animal' is private and only accessible within the class declaration.

*/


/**
 * 当构造函数修饰为 protected 时，该类只允许被继承：
 */
/*

class Animal {
    public name;
    protected constructor(name) {
            this.name = name;
        }
}
class Cat extends Animal {
    constructor(name) {
        super(name);
    }
}

let a1 = new Animal('Jack');//报错，因为Animal构造函数是protected，只能别继承，不能被实例化
let a2 = new Cat('Jack');//不报错，因为Cat的构造函数不是privite,protected

// index.ts(13,9): TS2674: Constructor of class 'Animal' is protected and only accessible within the class declaration.

*/


/**
 * 参数属性
 * 
 * 修饰符和readonly还可以使用在构造函数参数中，
 * 等同于类中定义该属性同时给该属性赋值，使代码更简洁。
 */
/*

class Animal {
    // public name: string;
    public constructor(public name) {
        // this.name = name;
    }
}

*/

/**
 * readonly
 * 只读属性关键字，只允许出现在属性声明或索引签名或构造函数中。
 */
/*

class Animal {
    readonly name;
    public constructor(name) {
        this.name = name;
    }
}

let a = new Animal('Jack');
console.log(a.name); // Jack，只读所以不报错
a.name = 'Tom';//报错：这里属于写操作了，所以报错

// index.ts(10,3): TS2540: Cannot assign to 'name' because it is a read-only property.

*/

/**
 * 注意如果 readonly 和其他访问修饰符同时存在的话，需要写在其后面。
 */
/*

class Animal {
    // public readonly name;
    public constructor(public readonly name) {
        // this.name = name;
    }
}

*/


/**
 * 抽象类
 * https://ts.xcatliu.com/advanced/class.html#%E6%8A%BD%E8%B1%A1%E7%B1%BB
 * 
 * abstract 用于定义抽象类和其中的抽象方法。
 * 什么是抽象类？
 * 首先，抽象类是不允许被实例化的：
 * 
 */
/*

abstract class Animal {
    public name;
    public constructor(name) {
        this.name = name;
    }
    public abstract sayHi();
}

let a = new Animal('Jack');//报错，不允许被实例化

// index.ts(9,11): error TS2511: Cannot create an instance of the abstract class 'Animal'.

*/

/**
 * 上面的例子中，我们定义了一个抽象类 Animal，并且定义了一个抽象方法 sayHi。
 * 在实例化抽象类的时候报错了。
 * 
 * 其次，抽象类中的抽象方法必须被子类实现：
 * 
 */
/*

abstract class Animal {
    public name;
    public constructor(name) {
        this.name = name;
    }
    public abstract sayHi();
}

class Cat extends Animal {
    //没有实现sayHi方法，所以报错
    public eat() {
        console.log(`${this.name} is eating.`);
    }
}

let cat = new Cat('Tom');

// index.ts(9,7): error TS2515: Non-abstract class 'Cat' does not implement inherited abstract member 'sayHi' from class 'Animal'.

*/

/**
 * 面的例子中，我们定义了一个类 Cat 继承了抽象类 Animal，
 * 但是没有实现抽象方法 sayHi，所以编译报错了。
 * 
 * 下面是一个正确使用抽象类的例子：
 */
/*

abstract class Animal {
    public name;
    public constructor(name) {
        this.name = name;
    }
    public abstract sayHi();
}

class Cat extends Animal {
    public sayHi() {
        console.log(`Meow, My name is ${this.name}`);
    }
}

let cat = new Cat('Tom');

*/


/**
 * 上面的例子中，我们实现了抽象方法 sayHi，编译通过了。
 * 需要注意的是，即使是抽象方法，TypeScript 的编译结果中，仍然会存在这个类，
 * 
 * 上面的代码的编译结果是：
 */
/*

var __extends =
  (this && this.__extends) ||
  function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
  };
var Animal = (function () {
  function Animal(name) {
    this.name = name;
  }
  return Animal;
})();
var Cat = (function (_super) {
  __extends(Cat, _super);
  function Cat() {
    _super.apply(this, arguments);
  }
  Cat.prototype.sayHi = function () {
    console.log('Meow, My name is ' + this.name);
  };
  return Cat;
})(Animal);
var cat = new Cat('Tom');


*/

/**
 * 类的类型
 * 
 * 给类加上 TypeScript 的类型很简单，与接口类似：
 */

/*

class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    sayHi(): string {
        return `My name is ${this.name}`;
    }
}

let a: Animal = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack

*/














































