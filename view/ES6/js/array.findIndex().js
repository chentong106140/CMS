
$(function () {
    console.log("----------------------findIndex()-------------------------");
    //用于演示替换回调函数内的this值
    var obj = [1,2,3,4,5];

    var a = [10,20,30,40];

    var returnValue = a.findIndex(function (currentValue, index, arr) {
        console.log(currentValue,index,arr,this);
        return currentValue > 20;
    },obj);
    //输出：
    //10 0   Array [ 10, 20, 30, 40 ]  Array [ 1, 2, 3, 4, 5 ]
    //20 1   Array [ 10, 20, 30, 40 ]  Array [ 1, 2, 3, 4, 5 ]
    //30 2   Array [ 10, 20, 30, 40 ]  Array [ 1, 2, 3, 4, 5 ]
    console.log(returnValue);//2

    
    var returnValue = a.findIndex(function (currentValue, index, arr) {
        console.log(currentValue,index,arr,this);
        return currentValue > 50;
    },obj);
    //输出：
    //10 0   Array [ 10, 20, 30, 40 ]  Array [ 1, 2, 3, 4, 5 ]
    //20 1   Array [ 10, 20, 30, 40 ]  Array [ 1, 2, 3, 4, 5 ]
    //30 2   Array [ 10, 20, 30, 40 ]  Array [ 1, 2, 3, 4, 5 ]
    //40 3   Array [ 10, 20, 30, 40 ]  Array [ 1, 2, 3, 4, 5 ]
    console.log(returnValue);//-1
    
    //总结
    //与find()方法功能一样，不同的是findIndex不是返回符合条件的元素，而是返回符合条件元素的索引
    //find()方法找不到就返回undefined
    //findIndex()方法找不到就返回-1
});
