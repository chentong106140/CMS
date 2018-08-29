
$(function () {
    console.log("----------------------slice()-------------------------");

    var a = [0,1,2,3,4,5];

    //测试不传递start/end参数，会怎么样
    console.log(a.slice());//Array [ 0, 1, 2, 3, 4, 5 ]——>不传递任何位置，默认截取整个数组
    //测试正常传递start/end参数，会怎么样
    console.log(a.slice(1,3));//Array [ 1, 2 ]——>正常截取开始位置第2个元素到第三个元素
    //测试只传递start参数，会怎么样
    console.log(a.slice(1));//Array [ 1, 2, 3, 4, 5 ]——>从第2个元素开始截取到数组最后一个元素结束
    //测试只传递start参数，并且是负值，会怎么样
    console.log(a.slice(-1));//Array [ 5 ]——>从最后一个元素开始截取，到数组最后一个元素结束
    //测试传递start/end都是负值，会怎么样
    console.log(a.slice(-1,-3));//Array []——>结束位置小于开始位置，所以不截取任何元素
    //测试start参数值大于等于数组长度，会怎么样
    console.log(a.slice(6));//Array []——>由于开始位置大于数组的长度，所以不截取任何元素
});
