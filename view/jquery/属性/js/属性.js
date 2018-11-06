$(function () {
    console.log("------ attr(name|pro|key,val|fn) ------");
    /**
     * attr(name|pro|key,val|fn)
     * 设置或返回被选元素的属性值。
     */


    

    console.log("------ attr(key) ------");
    /**
     * attr(key)
     * 描述：返回元素指定的key属性值
     */
    var a1 = $("input[id='ct']",".custom-box.box-1").attr("name");
    console.log(a1);
    //chentong



    
    console.log("------ attr(key,value) ------");
    /**
     * attr(key,value)
     * 描述：设置属性key的值为value
     */
    var a2 = $("input[id='ct']",".custom-box.box-1").attr("title","测试设置属性title").attr("title");
    console.log(a2);
    //测试设置属性title

    
    

    console.log("------ attr(key,value) ------");
    /**
     * attr({key:value,key,value})
     * 描述：同时设置多个属性key的值为value
     */
    var a3 = $("input[id='ct']",".custom-box.box-1").attr({data1:"data1的值",data2:"data2的值"});
    console.log(a3);



    console.log("------ attr(key,function(){}) ------");
    /**
     * attr(key,function(){return value})
     * 描述：使用回调函数设置key的属性值
     */
    var a4 = $("input[id='ct']",".custom-box.box-1").attr("data3",function () {
        return $(this).attr("data1");
    });
    console.log(a4);



    console.log("------ removeAttr(name) ------");
    /**
     * removeAttr(name)
     * 描述：从每一个匹配的元素中删除一个属性
     */
    var a5 = $("input[id='ct']",".custom-box.box-1")
        .removeAttr("data1")
        .removeAttr("data2")
        .removeAttr("data3")
        .removeAttr("title");
    console.log(a5);




    console.log("------ addClass(class|fn) ------");
    
    
    /**
     * addClass(class)
     * 一个或多个要添加到元素中的CSS类名，请用空格分开
     */
    var a6 = $("input[id='ct']",".custom-box.box-1")
        .addClass("selected1")
        .addClass("selected2 selected3");
    console.log(a6);
    //<input id="ct" name="chentong" class="selected1 selected2 selected3">




    /**
     * addClass(fn)
     * 一个或多个要添加到元素中的CSS类名，请用空格分开
     */
    var a7 = $("input[id='ct']",".custom-box.box-1")
        .addClass(function () {
            return "item-"+$(this).index();
        });
    console.log(a7);
    //<input id="ct" name="chentong" class="selected1 selected2 selected3">



    console.log("------ removeClass([class|fn]) ------");

    /**
     * removeClass(class)
     * 删除指定的类
     */
    var a8 = $("input[id='ct']",".custom-box.box-1").removeClass("item-0");
    console.log(a8);

    /**
     * removeClass(fn)
     * 删除指定的类
     */
    var a9 = $("input[id='ct']",".custom-box.box-1")
        .removeClass(function () {
            return "selected2 selected3";
        });
    console.log(a9);

    /**
     * removeClass()
     * 不传递参数就删除所有class
     */
    var a10 = $("input[id='ct']",".custom-box.box-1")
        .removeClass();
    console.log(a10);


    /**
     * 如果存在（不存在）就删除（添加）一个类。
     */
    console.log("------ toggleClass(class|fn[,sw]) ------");


    /**
     * toggleClass(class)
     * 如果存在（不存在）就删除（添加）一个类。
     */
    var a11 = $("input[id='ct']",".custom-box.box-1")
        .toggleClass("selected1");
    console.log(a10);

    var a12 = $("input[id='ct']",".custom-box.box-1")
        .toggleClass("selected1");
    console.log(a12);
    
    

    /**
     * toggleClass(class,switch)
     * 如果switch为true就新增class，为false就删除class
     */
    var a13 = $("input[id='ct']",".custom-box.box-1")
        .toggleClass("selected2",true);
    console.log(a13);

    var a14 = $("input[id='ct']",".custom-box.box-1")
        .toggleClass("selected2",false);
    console.log(a14);


    /**
     * toggleClass(fn)
     * 如果存在（不存在）就删除（添加）一个类。
     */
    var a15 = $("input[id='ct']",".custom-box.box-1")
        .toggleClass(function (index,cla) {
            console.log(index,cla);//0,''
            return "selected3";
        });
    console.log(a15);//'selected3'

    var a16 = $("input[id='ct']",".custom-box.box-1")
        .toggleClass(function (index,cla) {
            console.log(index,cla);//0,selected3
            return "selected3"
        });
    console.log(a16);//''
    
    
});