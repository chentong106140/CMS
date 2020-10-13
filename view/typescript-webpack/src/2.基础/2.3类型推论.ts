/**
 * 如下因为在定义的时候进行了赋值，所以根据类型推论，变量应该是字符串类型，所以下面=7，赋值为数字，所以报错了
 */
/*
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
*/
//等价于如下，
/*
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;
*/

/**
 * 如下因为在定义的时候没有赋值，所以根据类型推论，变量是一个任意类型也就是any类型，所以可以随意赋值不报错
 */
let myFavoriteNumbers2;
myFavoriteNumbers2 = 'seven';
myFavoriteNumbers2 = 7;