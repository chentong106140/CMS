
$(function () {
    console.log("----------------------every()-------------------------");
    //用于演示替换回调函数内的this值
    var obj = [1,2,3,4,5];

    var a = [11,22,33,44,55,66,77];
    var b = a.every(function(num,index,array){
        console.log(num,index,array,this);
        return num > 10;
    },obj);
    //输出：
    //11   0   Array [ 11, 22, 33, 44, 55, 66, 77 ]    Array [ 1, 2, 3, 4, 5 ]
    //22   1   Array [ 11, 22, 33, 44, 55, 66, 77 ]    Array [ 1, 2, 3, 4, 5 ]
    //33   2   Array [ 11, 22, 33, 44, 55, 66, 77 ]    Array [ 1, 2, 3, 4, 5 ]
    //44   3   Array [ 11, 22, 33, 44, 55, 66, 77 ]    Array [ 1, 2, 3, 4, 5 ]
    //55   4   Array [ 11, 22, 33, 44, 55, 66, 77 ]    Array [ 1, 2, 3, 4, 5 ]
    //66   5   Array [ 11, 22, 33, 44, 55, 66, 77 ]    Array [ 1, 2, 3, 4, 5 ]
    //77   6   Array [ 11, 22, 33, 44, 55, 66, 77 ]    Array [ 1, 2, 3, 4, 5 ]
    console.log(b); //true
    //总结：
    // 如果数组内所有的元素都符合指定要求，那么数组的每一个元素都会遍历到，同时every()方法会返回true
    //通过输出结果可以看出，传递了obj对象，就会替换回调函数内的this对象
    //回调函数内的3个参数分别为：当前遍历的元素，当前元素的索引，当前遍历的数组



    var c = a.every(function(num,index,array){
        console.log(num,index,array,this);
        return num > 30;
    },obj);
    //输出：
    //11 0     Array [ 11, 22, 33, 44, 55, 66, 77 ]    Array [ 1, 2, 3, 4, 5 ]
    console.log(c);//false
    //总结：如果数组内只要有一个元素不符合指定要求，那么之后的所有元素都不会继续遍历,同时every()方法会返回false
});
