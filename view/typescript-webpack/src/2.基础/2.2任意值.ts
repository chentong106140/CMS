/**
 * any 类型，则允许被赋值为任意类型
 */
let myFavoriteNumbers: any = 'seven';
myFavoriteNumbers = 7;

/**
 * 任意值上访问任何属性都是允许的
 * 可以认为，声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。
 */
let anyThing: any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);
//也允许调用任何方法：
anyThing.setName('Jerry');
anyThing.setName('Jerry').sayHello();
anyThing.myName.setFirstName('Cat');


/**
 * 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：
 */
let something;
something = 'seven';
something = 7;
something.setName('Tom');



































