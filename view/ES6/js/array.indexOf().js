
$(function () {
    console.log("----------------------indexOf()-------------------------");
    var fruits=["Banana","Orange","Apple","Mango","Banana","Orange","Apple"];
    var a = fruits.indexOf("Apple",4);
    console.log(a);//6
    var b = fruits.indexOf("Orange",6);
    console.log(b);//-1
    
    //总结：
    //与findIndex()方法的区别
        //findIndex()是根据回调函数内指定条件去检索数组元素，只要找到第一个符合指定条件的元素就返回当前元素的索引，之后的所有元素不在执行回调函数,同时，数组内没有一个是符合回调函数内指定条件的，就返回-1
        //indexOf()方法是直接匹配元素，只有数组内存在与指定元素一样的值，就返回该元素的索引，找不到就返回-1
    
    //相同点：
        //1：都是查找元素在数组内的索引位置
        //2：找不到都返回-1

});
