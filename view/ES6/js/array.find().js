
$(function () {
    console.log("----------------------find()-------------------------");
    //用于演示替换回调函数内的this值
    var obj = [1,2,3,4,5];

    var a = [10,20,30,40];
    
    var returnValue = a.find(function (currentValue, index, arr) {
                console.log(currentValue,index,arr,this);
                return currentValue > 20;
    },obj);
    //输出：
    //10 0   Array [ 10, 20, 30, 40 ]  Array [ 1, 2, 3, 4, 5 ]
    //20 1   Array [ 10, 20, 30, 40 ]  Array [ 1, 2, 3, 4, 5 ]
    //30 2   Array [ 10, 20, 30, 40 ]  Array [ 1, 2, 3, 4, 5 ]
    console.log(returnValue);//30
    
    var returnValue = a.find(function (currentValue, index, arr) {
        console.log(currentValue,index,arr,this);
        return currentValue > 50;
    },obj);
    //输出：
    //10 0   Array [ 10, 20, 30, 40 ]  Array [ 1, 2, 3, 4, 5 ]
    //20 1   Array [ 10, 20, 30, 40 ]  Array [ 1, 2, 3, 4, 5 ]
    //30 2   Array [ 10, 20, 30, 40 ]  Array [ 1, 2, 3, 4, 5 ]
    //40 3   Array [ 10, 20, 30, 40 ]  Array [ 1, 2, 3, 4, 5 ]
    console.log(returnValue);//undefined


    //总结：
    //find()传递了第二个参数，确实替换了this对象的值
    //回调函数内需要指定条件，并返回true/false
    //回调函数内，只要有一个符合条件的数组元素，就返回该符合条件的元素，之后就再也不去遍历数组之后的元素了
    //如果没有符合条件的元素，将扫描整个数组
    //如果有符合条件的元素，就返回第一个符合条件的元素，之后就不再遍历元素，也就不再执行回调方法
    
    //与every()方法的区别是：
        //every()方法作用：是确定一个数组内所有元素是否都符合指定条件的
        //find()方法作用：是查找一个数组内是否存在符合指定条件的一个元素，存在就返回那个符合条件的元素，不存在就返回undefined
    
        //every()方法返回true/false;    
        //find()方法返回符合指定条件的元素/没有就返回undefined
        
        //every()方法只要遇到一个不符合指定条件的元素，就返回false,同时，回调方法也不再执行
        //find()方法只要遇到一个符合指定条件的元素，就返回该元素，同时，回调方法也不再执行
        
        //every()方法是扫描整个数组元素是否都符合指定条件，都符合就返回true，只要一个不符合就返回false
        //find()方法也是扫描整个数组元素是否存在符合指定条件的元素，如果存在就返回符合指定条件的第一个元素，否则返回undefined
        
       
    //与filter()方法的区别是：
        //filter()方法作用：是将一个数组内符合条件的所有元素组成一个新数组返回
        //find()方法作用：  是查找一个数组内是否存在符合条件的元素，存在就返回这个符合条件的元素
    
        //filter()方法是返回符合指定条件元素组成的新数组，没有符合条件的返回空数组
        //find()方法是返回符合指定条件的元素的第一个元素，没有符合条件的返回undefined
    
        //filter()方法是无论回调方法返回true/false，都会扫描数组全部元素
        //find()方法是回调方法只要返回true,就不再扫描数组全部元素
});
