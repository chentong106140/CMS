
$(function () {
    console.log("----------------------push()-------------------------");
    var a = [0,1,2,3,4,5];
    
    console.log(a.push(6));   //7
    console.log(a);         //Array [ 0, 1, 2, 3, 4, 5, 6 ]
    
    //总结：
    //push()方法用于将新的元素添加到数组中，并且返回值是数组最新的length
    //push()方法会改变原数组

});
