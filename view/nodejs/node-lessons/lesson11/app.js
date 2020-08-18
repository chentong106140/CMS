
//在 Node 中，全局变量会被定义在 global 对象下；
// 在浏览器中，全局变量会被定义在 window 对象下。
console.log(global);


for (var i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, 5);
}

//需求是需要依次输出0,1,2,3,4,结果却是5,5,5,5,5，解决方案是利用闭包的思想如下：
for (var i = 0; i < 5; i++) {
    (function (idx) {
        setTimeout(function () {
            console.log(idx);
        }, 5);
    })(i);
}

/**
 *  this    把 this 出现的场景分为四类，简单的说就是：
 *      1.有对象就指向调用对象
 *      2.没调用对象就指向全局对象
 *      3.用new构造就指向新对象
 *      4.通过 apply 或 call 或 bind 来改变 this 的所指。
 *
 */