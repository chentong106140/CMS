var tom = {
    name: 'Tom',
    age: 25
};
//可以有age属性，也可以不用age属性
var tom222 = {
    name: 'Tom'
};
//可以有age属性，也可以不用age属性
var tom3 = {
    name: 'Tom',
    age: 25
};
var tom5 = {
    name: 'Tom',
    gender: 'male' //这里实现的时候，属性名称可以随便定义，但是属性值必须是字符串类型
};
var tom7 = {
    name: 'Tom',
    age: 25,
    gender1: 'male1',
    gender2: 12,
    gender3: 'male3',
};
/*
interface Person6 {
    readonly id: number;//只读
    name: string;
    age?: number;//age为可选属性
    [propName: string]: any;//任意属性，任意类型数据
}

let tom8: Person = {
    id: 89757,//报错，只读属性不能赋值
    name: 'Tom',
    gender: 'male'
};

tom8.id = 9527;//报错,只读属性不能赋值
*/
//# sourceMappingURL=2.5对象的类型——接口.js.map