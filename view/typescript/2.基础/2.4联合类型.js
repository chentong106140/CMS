/**
 * 这里的 let myFavoriteNumber: string | number 的含义:
 * 允许 myFavoriteNumber 的类型是 string 或者 number，但是不能是其他类型
 */
var myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
//所以当赋值其他类型的数据后，会报错，如下
/*
let myFavoriteNumber: string | number;
myFavoriteNumber = true;
*/
/**
 * 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，
 * 我们只能访问此联合类型的所有类型里共有的属性或方法：
 *
 * 下例中，length 不是 string 和 number 的共有属性，所以会报错。
 * @param something
 */
/*function getLength(something: string | number): number {
    return something.length;
}*/
//访问 string 和 number 的共有属性是没问题的
function getString(something) {
    return something.toString();
}
