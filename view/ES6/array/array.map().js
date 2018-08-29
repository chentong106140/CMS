
$(function () {
    console.log("----------------------map()-------------------------");
    var numbers = [4, 9, 16, 25];
    //平方根
    console.log(numbers.map(Math.sqrt));//Array [ 2, 3, 4, 5 ]
    
    console.log(Array.from(numbers,Math.sqrt));//Array [ 2, 3, 4, 5 ]
    
    //自定义回调函数
    function demo(currentValue) {
        return Math.sqrt(currentValue);
    }
    
    //调用自定义回调函数，处理数组内所有元素
    console.log(numbers.map(demo));//Array [ 2, 3, 4, 5 ]
    
    //总结：
    //map()方法与Array.from()方法效果一致
    //以上2个方法都不会修改原数组

});
