/**
 * 联合类型赋值注意点：
 * 
 * 当变量联合类型时候，给变量赋值，只能是联合类型里面的其中一种类型，赋值其他类型的会报错
 * 这里的 let myFavoriteNumber: string | number 的含义:
 * 允许 myFavoriteNumber 的类型是 string 或者 number，但是不能是其他类型
 */
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;


//所以当赋值其他类型的数据后，会报错，如下
/*

let myFavoriteNumber: string | number;
myFavoriteNumber = true;

*/


/**
 * 联合类型调用属性或方法注意点：
 * 
 * 当变量为联合类型的时候，访问变量的属性或方法，只能访问联合类型中，共有的属性和方法，否则会报错
 * 
 * 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，
 * 我们只能访问此联合类型的所有类型里共有的属性或方法：
 * 
 * 下例中，length 不是 string 和 number 的共有属性，所以会报错。
 * @param something
 */
/*

function getLength(something: string | number): number {
    return something.length;
}

*/

//访问 string 和 number 的共有属性是没问题的
function getString(something: string | number): string {
    return something.toString();
}


/**
 * 下例中，第二行的 myFavoriteNumber 被推断成了 string，访问它的 length 属性不会报错。
 * 而第四行的 myFavoriteNumber 被推断成了 number，访问它的 length 属性时就报错了。
 */
/*
let myFavoriteNumber2: string | number;
//myFavoriteNumber 被推断成了 string，访问它的 length 属性不会报错
myFavoriteNumber2 = 'seven';
console.log(myFavoriteNumber2.length); // 5
//第四行的 myFavoriteNumber 被推断成了 number，访问它的 length 属性时就报错了
myFavoriteNumber2 = 7;
console.log(myFavoriteNumber2.length); // 编译时报错
*/












