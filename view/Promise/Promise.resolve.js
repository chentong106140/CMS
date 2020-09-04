/**
 * 验证Promise.resolve与new Promise是否有区别
 * 
 */
var p1 = Promise.resolve("成功回调");
//同下
var p2 = new Promise(function (resolve, reject) {
    resolve("成功回调")
});

p1.then(function (val) {
    console.log(val);//"成功回调"
});
p2.then(function (val) {
    console.log(val);//"成功回调"
});

/**
 * 总结：
 Promise.resolve('foo')
 // 等价于
 new Promise(resolve => resolve('foo'))
 * 
 */

/**
 * 验证参数是一个Promise对象
 */

var fn = function (resolve,reject) {
    setTimeout(()=>{
        return resolve("TWO");
    },500);
};

//参数是一个普通函数
var p3 = new Promise(fn);//返回一个Promise对象

//参数传递的是一个Promise对象
var p4 = Promise.resolve(p3);//返回一个Promise对象


//验证p3是否等于p4
console.log(p3 === p4);//true

/**
 *
 * 等于true，说明，只要Promise.resolve方法传递的参数是一个Promise对象,
 * Promise.resolve返回的Promise对象依然是这个Promise参数
 */


/**
 *验证代码执行顺序
 */

//为了不与如上代码输出有冲突，我们延迟3000执行验证
setTimeout(function () {
    
    
    setTimeout(function () {
        console.log("Three");
    },0);


    p3.then(function (val) {
        console.log(val);
    });
    
    console.log("One");

    //One
    //Two
    //Three

    /**
     * 总结：
     * 执行顺序如下：
     * console.log("One");是立即执行
     * p3.then();是本次“事件循环”，代码执行完结束时执行
     * setTimeout(fn,0);是下次“事件循环”，代码执行开始之前执行
     */

},3000);





