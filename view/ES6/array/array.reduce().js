
$(function () {
    console.log("----------------------reduce()-------------------------");

    /*************拼接字符案例****************/
    var a = ["c","h","e","n"," ","t","o","n","g"];

    /**
     * total:数组遍历执行回调函数，上一次执行的结果值
     * currentValue：当前遍历到的数组元素
     * currentIndex：当前遍历到的数组元素的索引位置
     * arr：当前遍历的数组对象
     * @type {*}
     */
    var b = a.reduce(function (total, currentValue, currentIndex, arr) {
        //需要手动返回计算后的值
        return total+currentValue;
    },"Dear:");
   
    console.log(b);//Dear:chen tong
    
    /**************计算最大值*******************/
    var c = [20,30,20,30,90,10,50,70];
    
    function reduce(defaultValue) {
        return c.reduce(function (total, currentValue) {
            return total > currentValue ? total : currentValue;
        },defaultValue);
    }
    var d = 100;
    var e = 50;
    
    
    console.log(reduce(d));//100    发现数组内没有比100还大的值，就返回默认值
    console.log(reduce(e));//90     模型数组内存在比50还大的值，并将数组内最大的值返回
    
    
    //总结：
    //reduce()方法不会修改原数组
    //reduce()会记录上一次return的值
    //reduce()如果传递了默认值，那么第一次遍历数组元素的值就不是索引为0的那个元素了
});
