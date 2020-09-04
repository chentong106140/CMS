 

//如下是一个没有加入异步语法糖的测试案例，验证下p1和p2得到的值是Promise对象
function fn1() {
    var p1 =  Promise.reject("报错了1").catch(function (e) {
        return Promise.reject("报错了2");
    }).catch(function (e) {
        return e;
    });

    var p2 =  Promise.resolve("回调成功1").then(function (e) {
        return Promise.resolve("回调成功2");
    }).then(function (e) {
        return e;
    });
    console.log(p1);//Promise { <state>: "pending" }
    console.log(p2);//Promise { <state>: "pending" }
}

//如下是一个加了async异步语法糖的测试案例，验证p1与p2得到的值是最终回调函数return 的值
 async function fn2() {
    var p1 = await  Promise.reject("报错了1").catch(function (e) {
        return Promise.reject("报错了2");
    }).catch(function (e) {
        return e;
    });

    var p2 = await Promise.resolve("回调成功1").then(function (e) {
        return Promise.resolve("回调成功2");
    }).then(function (e) {
        return e;
    });
    console.log(p1);//报错了2
    console.log(p2);//回调成功2
}

fn1();
fn2();


/**
 * 通过如上案例
 *
 * await标记的是非Promise对象,最终整体返回值得到的是Promise对象，里面的异步逻辑都没有被执行
 * await标记的是Promise对象的than/catch方法，最终整体返回值得到的是than/catch方法内返回的值
 * 
 */






//定义一个主动return setTimeout 普通异步函数
var fn3  = async function(){
     return await  setTimeout(()=>{return "成功"},0);
};

//定义一个主动 return await 普通异步函数
var fn4 = async function(){
    return await "成功";
};

//定义一个没有主动写return的异步函数
var fn5 = async function(){
    await "成功";
};

var f3 = fn3();
var f4 = fn4();
var f5 = fn5();
console.log(f3);//Promise { <state>: "pending" }，得到的是一个Promise对象，并不是我们想要的'成功'
console.log(f4);//Promise { <state>: "pending" }得到的也是一个Promise对象，并不是我们想要的'成功'
console.log(f5);//Promise { <state>: "pending" }得到的也是一个Promise对象，并不是我们想要的'成功'

//既然await返回的是Promise对象，我们都执行下看看
f3.then(function (val) {
    console.log('then f3',val);//then f3 2, 这是主动写return的，回调函数的参数是return后面函数的返回值
}).catch(function (val) {
    console.log('catch f3',val);
});

f4.then(function (val) {
    console.log('then f4',val);//then f4 成功,这是主动写return 的，回调函数参数是return后面函数的返回值
}).catch(function (val) {
    console.log('catch f4',val);
});

f5.then(function (val) {
    console.log('then f5',val);//then f5 undefined 这是没有主动写return 的，回调函数参数会是undefined
}).catch(function (val) {
    console.log('catch f5',val);
});

/**
 *  总结：
 *  return await xxx            ：函数得到的返回值是Promise对象   返回值同下  
 *  await xxx                   ：函数得到的返回值是Promise对象   
 *                                区别是主动写return的函数， 执行得到的Promise对象的than/catch的回调函数参数值是return 后面的返回值，
 *                                没有主动写return的函数，执行函数得到的Promise对象的than/catch是回调函数参数值是undefined
 *  return await Promise对象     ：得到的是Promise对象内than/catch的返回值
 *
 */



//验证是否使用async/await，是否会导致Promise对象的reject状态会不会导致代码报错
setTimeout(function () {

    //特性：没有使用async/await，并且 没有执行reject状态的catch方法
    //输出a6,b6,并报错Uncaught (in promise) 出错了fn6,说明报错不会中断下面的代码执行
    function fn6() {
        console.log("a6");
        Promise.reject("出错了fn6");
        console.log("b6");
    }

    //特性：没有使用async/await，并且 执行了reject状态的catch方法
    //输出a7 b7 ,没有报错，说明只要执行Promise对象的catch方法就不会被报错
    function fn7() {
        console.log("a7");
        Promise.reject("出错了fn7").catch(function () {});
        console.log("b7");
    }

    //特性：使用了async/await 并且 没有执行reject状态的catch方法
    //输出a8,并没有输出b8，说明使用了await标记后，同时没有执行reject状态的catch方法，会导致代码报错，中断下面的代码执行
    async function fn8() {
        console.log("a8");
        await Promise.reject("出错了fn8");
        console.log("b8");
    }

    //特性：使用了async/await 并且 执行了reject状态的catch方法
    //输出a9 b9，说明：就算使用了await标记后，只要执行了reject状态的catch方法，不会导致代码报错，不会中断下面的代码执行
    async function fn9() {
        console.log("a9");
        await Promise.reject("出错了3").catch(function (a) {});
        console.log("b9");
    }

    fn6();
    fn7();
    fn8();
    fn9();

    /**
     * 总结：
     * 不使用async/await：
     *      Promise.reject("出错了fn6")：会报错，但不会中断代码执行
     *      Promise.reject("出错了fn7").catch(function () {})：不会报错，也不会中断代码执行
     *       
     *  使用async/await：
     *      await Promise.reject("出错了fn8")：会报错，会中断代码执行
     *      await Promise.reject("出错了3").catch(function (a) {})：不会报错，也不会中断代码执行
     * 
     * 
     * 所以，导致代码中断执行的只有：await Promise.reject("出错了fn8")
     */
},3000);

