
$(function () {
    console.log("----------------------join()-------------------------");
    var a = ["c","h","e","n"," ","t","o","n","g"];
    console.log(a.join("-"));//c-h-e-n- -t-o-n-g
    console.log(a.join(""));//chen tong
    console.log(a.join());//c,h,e,n, ,t,o,n,g
    
    //总结：
    //join()不传递分隔符，默认使用逗号分隔

});
