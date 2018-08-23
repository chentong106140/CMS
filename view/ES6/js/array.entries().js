
$(function () {

    console.log("----------------------entries()-------------------------");
    var a1 = [ "one", "two", "three", "four", "five", "six" ];
    var entries = a1.entries();//返回Interator对象
    while(true)
    {
        var entry = entries.next();
        if(entry.done)break;//done:true代表遍历完成；false:代表还没有遍历完成
        console.log(entry.done,entry.value,entry.value[0],entry.value[1]);
        //value是一个数组，数组内有2个值，第一个值为当前值在原数组内的索引,第二个值为当前值的具体数据
    }
    //false Array [ 0, "one" ] 0 one
    //false Array [ 1, "two" ] 1 two
    //false Array [ 2, "three" ] 2 three
    //false Array [ 3, "four" ] 3 four
    //false Array [ 4, "five" ] 4 five
    //false Array [ 5, "six" ] 5 six



});
