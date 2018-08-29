
$(function () {
    console.log("----------------------shift()-------------------------");

    var a = [0,1,2,3,4,5];

    console.log(a.shift());   //0
    console.log(a);         //Array [ 1, 2, 3, 4, 5 ]

    //总结：
    //shift()方法删除数组第一个元素，同时改变原数组
});
