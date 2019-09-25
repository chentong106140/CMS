/**
 * Created by cherish on 2019/4/29.
 */
console.dir(Promise);

function render(callback,data){
    var num = 50 + Math.floor(Math.random() * (100 - 50));
    setTimeout(function(data) {
        callback && callback(data);
    }, num,data);
}

render(data=>console.log(data),"数据1");
render(data=>console.log(data),"数据2");
render(data=>console.log(data),"数据3");
console.log("执行完成！");

/**
 * 以上代码逻辑，主要是模拟网络请求，异步响应回调函数
 * 带来的问题就是，由于异步执行，并不知道到底是哪个回调会先执行，哪个回调会后执行
 * 如果异步执行也要按照顺序来执行，那么可能需要如下这种写法
 */
//第一次执行
render(function (data) {
    console.log(data);
   
   //第二次执行
   render(function (data) {
       console.log(data);
       
       //第三次执行
       render(function (data) {
           console.log(data);
       },"第3个请求");
       
   },"第2个请求");
   
},"第1个请求");

/**
 * 通过控制台，可以看出，确实输出的结果都是按照顺序执行的
 * 但是，以上出现了多层回调嵌套，有种晕头转向的感觉，这也就是我们常说的厄运回调金字塔，
 * 虽然完成需求，但看起来非常不好看，
 * 而Promise的最大的优点就是多重链式调用，可以避免层层嵌套回调，我们改造下上面的代码
 */




function renderPromise(data){
    return new Promise(function (resolve, reject) {
        //如下内容会立即执行，不是异步执行
        //模拟网络请求，回调时长不一定
        var num = 500 + Math.floor(Math.random() * (1000 - 500));
        var fn = null;
        //如果成功
        if(true){
            fn = resolve;
        }else{
            //如果失败
            fn = reject;
        }
        //延迟响应回调函数
        setTimeout(function(data) {
            fn && fn(data);
        }, num,data);
        console.log("开始请求——"+data+"——"+num+"毫秒之后进行响应");
    })
}

//为了与上面两个例子区别开来
setTimeout(function () {
    
    renderPromise("我是第1个请求").then(function (data1) {
        console.log("请求成功——"+data1);
        return renderPromise("我是第2个请求");
    }).then(function (data2) {
        console.log("请求成功——"+data2);
        return renderPromise("我是第3个请求");
    }).then(function (data3) {
        console.log("请求成功——"+data3);
    }).catch(function (error) {
        console.log("请求失败——"+error);
    });
    
},3000);



/**
 * 如上，使用Promise方式，处理异步逻辑，「链式回调」，大大提高了代码的可读性
 * 1：new Promise传递的回调参数，会立即执行，不是异步执行
 * 2：new Promise传递的回调参数内，使用了延迟执行resolve方法，但在调用的时候都是直接.then方法的，所以这就是Promise的厉害之处，所有的异步回调，都能进行再链式调用内
 * 3：then方法内return了一个新的Promise对象，所以，可以在最外层的promise对象的then方法后面继续.then调用，利用then进行「链式回调」，将异步操作以同步操作的流程表示出来
 */


















