
$(function () {
    console.log("----------------------forEach()-------------------------");
    //用于演示替换回调函数内的this值
    var obj = [1,2,3,4,5];

    var a = [10,20,30,40];

    var returnValue = a.forEach(function (currentValue, index, arr) {
        console.log(currentValue,index,arr,this);
        return currentValue > 20;
    },obj);
    //输出：
    //10 0   Array [ 10, 20, 30, 40 ]  Array [ 1, 2, 3, 4, 5 ]
    //20 1   Array [ 10, 20, 30, 40 ]  Array [ 1, 2, 3, 4, 5 ]
    //30 2   Array [ 10, 20, 30, 40 ]  Array [ 1, 2, 3, 4, 5 ]
    //40 3   Array [ 10, 20, 30, 40 ]  Array [ 1, 2, 3, 4, 5 ]
    console.log(returnValue);//undefined
        
    //总结
    //forEach()方法会遍历数组内所有元素
    //forEach()方法的回调函数内无需返回true/false
    //forEach()方法返回undefined
});
