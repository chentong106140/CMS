/**
 * 声明合并
 *
 * 如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型：
 *
 * 函数的合并
 *
 * 之前学习过，我们可以使用重载定义多个函数类型：
 */
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
/**
 * 相当于：
 */
/*

interface Alarm {
    price: number;
    weight: number;
}

*/
/**
 * 注意，合并的属性的类型必须是唯一的：
 */
