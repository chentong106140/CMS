
$(function () {
    console.log("----------------------Array.from()-------------------------");
    //用于演示替换回调函数内的this值
    var obj = [1,2,3,4,5];

    var a = [10,20,30,40];

    var newArray = Array.from(a,function (currentValue,index) {
        console.log(currentValue,index,this);
        return currentValue + 10;
    },obj);
    //输出：
    //10 0  Array [ 1, 2, 3, 4, 5 ]
    //20 1  Array [ 1, 2, 3, 4, 5 ]
    //30 2  Array [ 1, 2, 3, 4, 5 ]
    //40 3  Array [ 1, 2, 3, 4, 5 ]

    console.log(newArray)//Array [ 20, 30, 40, 50 ]
    console.log(a)//Array [ 10, 20, 30, 40 ]
    
    //总结：
    //1：Array.from()方法的作用是遍历数组每一个元素，并针对每一个元素做修改，最后返回每一个元素修改后新数组
    //2：Array.from()方法不会改变原数组
    
});
