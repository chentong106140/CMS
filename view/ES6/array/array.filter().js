
$(function () {
    console.log("----------------------filter()-------------------------");
    //用于演示替换回调函数内的this值
    var obj = [1,2,3,4,5];

    var a = [11,22,33,44,55,66,77];
    var b = a.filter(function(num,index,array){
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
    console.log(b); //Array [ 11, 22, 33, 44, 55, 66, 77 ]
    //总结：
    //传递了第二个参数，确实替换了this对象的值
    //回调函数内，指定条件后，需要返回true/false，、
    //如果返回true,就将当前元素塞进新数组进行返回
    //如果返回false，就不将当前元素塞进新数组
    //filter()方法只会将符合指定条件的元素塞进新数组
    //filter()无论回调函数返回true还是false，都会扫描整个数组
    //filter()方法返回的是符合指定条件的元素的新数组，不会替换原数组



    var c = a.filter(function(num,index,array){
        console.log(num,index,array,this);
        return num > 30;
    });
    //输出：
    //11   0   Array [ 11, 22, 33, 44, 55, 66, 77 ]    window
    //22   1   Array [ 11, 22, 33, 44, 55, 66, 77 ]    window
    //33   2   Array [ 11, 22, 33, 44, 55, 66, 77 ]    window
    //44   3   Array [ 11, 22, 33, 44, 55, 66, 77 ]    window
    //55   4   Array [ 11, 22, 33, 44, 55, 66, 77 ]    window
    //66   5   Array [ 11, 22, 33, 44, 55, 66, 77 ]    window
    //77   6   Array [ 11, 22, 33, 44, 55, 66, 77 ]    window
    console.log(c);//Array [ 33, 44, 55, 66, 77 ]
    //总结：
    //在不传递第二个参数的情况下，回调函数内的this指向的是window对象
    //从返回的新数组可以看出，没有符合条件的元素就不在返回的新数组内
});
