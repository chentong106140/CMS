
$(function () {
    console.log("----------------------reverse()-------------------------");

    var a = ["c","h","e","n"," ","t","o","n","g"];
    
    console.log(a.reverse().join(""));//gnot nehc
    console.log(a.reverse().join(""));//chen tong
    
    //总结：
    //reverse()方法将数组内元素顺序颠倒
    //reverse()方法会修改原数组
});
