/**
 * 面的例子中，我们定义了一个接口 Person，接着定义了一个变量 tom，它的类型是 Person。
 * 这样，我们就约束了 tom 的形状必须和接口 Person 一致。
 */
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};

//定义的变量比接口少了一些属性是不允许的：
/*
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom'
};*/

//多一些属性也是不允许的：
/*
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
*/

/**
 * 有时我们希望不要完全匹配一个形状，那么可以用可选属性：
 * 
 * 可选属性的含义是该属性可以不存在。
 */
interface Person2 {
    name: string;
    age?: number;//属性age，实现接口的时候，可以有age也可以没有age属性
}
//可以有age属性，也可以不用age属性
let tom222: Person2 = {
    name: 'Tom'
};
//可以有age属性，也可以不用age属性
let tom3: Person2 = {
    name: 'Tom',
    age: 25
};
//但是依然不允许添加接口中未定义的属性
/*
let tom4: Person2 = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
*/

/**
 * 有时候我们希望一个接口允许有任意的属性，可以使用如下方式：
 */
interface Person3 {
    name: string;
    age?: number;
    [propName: string]: any;//使用 [propName: string] 定义了任意属性取 string 类型的值。
}

let tom5: Person3 = {
    name: 'Tom',
    gender: 'male'//这里实现的时候，属性名称可以随便定义，但是属性值必须是字符串类型
};


/**
 * 需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：
 * 下例中，任意属性的值允许是 string，但是可选属性 age 的值却是 number，
 * number 不是 string 的子属性，所以报错了。
 */
/*
interface Person4 {
    name: string;
    age?: number;
    [propName: string]: string;
}


let tom6: Person4 = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
*/

/**
 * 一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：
 */
interface Person5 {
    name: string;
    age?: number;
    [propName: string]: string | number;//这个任意属性名称的属性，通过联合类型，约定了属性值，只能是字符串和数字
}

let tom7: Person5 = {
    name: 'Tom',
    age: 25,
    gender1: 'male1',//任意属性名对应属性值为字符串类型
    gender2: 12,//任意属性名对于属性值为数字类型
    gender3: 'male3',//任意属性，加上上面的已经定义了3个任意属性了
    
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
























