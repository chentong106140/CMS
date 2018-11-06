$(function () {
    console.log("------ css(name|pro|[,val|fn]) ------");


    console.log("------ css(name) ------");
    /**
     *  获取属性值：
     * css(name)
     * 要访问的属性名称
     */
    var a1 = $("div:first", ".custom-box.box-1").css("width");
    console.log('a1',a1);
    //1370.65px


    console.log("------ css([name,name]) ------");
    /**
     * 获取属性值：
     * css([name,name])
     * 参数为一个属性名组成的数组时，将返回一个由属性名与属性值组成的对象
     */
    var a2 = $("div:first", ".custom-box.box-1").css(['width', 'height']);
    console.log('a2',a2);
    //Object { width: "1370.65px", height: "50px" }


    console.log("------ css(name,value) ------");
    /**
     * 设置属性值：
     * css(name,value)
     * 参数为一个属性名称，对应一个属性值，设置该属性名对于的属性值，返回jQuery对象
     */
    var a3 = $("div:first", ".custom-box.box-1").css('height', '100px');
    console.log('a3',a3);
    //<div class="css_1" style="height: 100px;">


    /**
     * 设置属性值：
     * css({name:value,name:value})
     * 参数为一个对象时，将同时设置这个对象所有的属性名对应的属性值
     */
    var a4 = $("div:first", ".custom-box.box-1").css({height: '200px', userSelect: 'none', borderWidth: '5px'});
    console.log('a4',a4);
    //<div class="css_1" style="height: 200px; -moz-user-select: none; border-width: 5px;">


    console.log("------ css({name:function(index,value){}}) ------");
    /**
     * 设置属性值：
     * css({name:function(index,value){},name:function(index,value){}})
     * 参数为一个对象，属性名称对应一个方法，方法的参数：
     * index:为元素在对象集合中的索引位置
     * value:为元素原先的属性值
     */
    var a5 = $("div:first", ".custom-box.box-1").css(
        {
            height: function (index, value) {
                console.log(index, value);//0 200px
                return (parseInt(value) / 2) + 'px';
            },
            borderWidth: function (index, value) {
                console.log(index, value);//0
                return '10px';
            }
        });
    console.log('a5',a5);
    //<div class="css_1" style="height: 100px; -moz-user-select: none; border-width: 10px;">



    console.log("------ css(name,function(index,value){}) ------");
    /**
     * 设置属性值：
     * css(name,function(index,value){})
     * name:属性名称
     * function:设置属性名称的回调函数
     *  index:元素所有
     *  value:元素原先值
     */
    var a6 = $("div:first", ".custom-box.box-1").css('height',function (index, value) {
        console.log(index,value);// 0 100px
        return '150px'
    });
    console.log('a6',a6);
    //<div class="css_1" style="height: 150px; -moz-user-select: none; border-width: 10px;">


    /**
     * 获取匹配元素在当前视口的相对偏移。
     * 返回的对象包含两个整型属性：top 和 left，以像素计。此方法只对可见元素有效。
     */
    console.log("------ offset([coordinates]) ------");


    console.log("------ offset() ------");
    /**
     * offset()
     * 获取偏移对象,该对象的属性就是该元素对应的坐标
     */
    var a7 = $("div:first", ".custom-box.box-1").offset();
    console.log('a7',a7);
    //Object { top: 132.21665954589844, left: 75.91667175292969 }


    console.log("------ offset({left,top}) ------");
    /**
     * offset({left,top})
     * 设置元素偏移，控制元素相对于浏览器的坐标
     */
    var a8 = $("div:first", ".custom-box.box-1").offset({left:0,top:0});
    console.log('a8',a8);
    //<div class="css_1" style="height: 150px; -moz-user-select: none; border-width: 10px; position: relative; top: -0.000340454px; left: -0.0000282471px;">
   $("div:first", ".custom-box.box-1").offset(a7);//恢复默认位置




    /**
     * 获取匹配元素相对父元素的偏移。
     * 返回的对象包含两个整型属性：top 和 left。为精确计算结果，请在补白、边框和填充属性上使用像素单位。此方法只对可见元素有效。
     */
    console.log("------ position() ------");


    console.log("------ position() ------");
    /**
     * 获取匹配元素相对父元素的偏移。
     * 获取偏移对象,该对象的属性就是该元素对应的坐标
     * 注意：position()只能获取相对于父元素的位置，无法设置相对于父元素的位置
     */
    var a9 = $("div:eq(1)", ".custom-box.box-1").position();
    console.log('a9',a9);
    //Object { top: 216.30000780468748, left: 10.000004752929684 }





    /**
     * 获取匹配元素相对滚动条顶部的偏移。
     * 此方法对可见和隐藏元素均有效。
     */
    console.log("------ scrollTop([val]) ------");


    console.log("------ scrollTop([val]) ------");
    /**
     * 获取匹配元素相对父元素的偏移。
     * 获取偏移对象,该对象的属性就是该元素对应的坐标
     * 注意：position()只能获取相对于父元素的位置，无法设置相对于父元素的位置
     */
    var a10 = $("div[class='scroll_top']", ".custom-box.box-1").scrollTop(200);
    console.log('a10',a10);
    //Object { top: 216.30000780468748, left: 10.000004752929684 }



    /**
     * 获取第一个匹配元素内部区域高度（包括补白、不包括边框）。
     * innerWidth()类似，就不做介绍
     */
    console.log("------ innerHeight() ------");


    console.log("------ innerHeight() ------");
    /**
     * 获取第一个匹配元素内部区域高度（包括补白、不包括边框）。
     * 注意是内部高度(包括上下padding,内容高度)，不包括border
     */
    var a12 = $("div.padding", ".custom-box.box-1");
    console.log('a12',a12.height());//61.66666  通过结果得知，height()获取的是内容实际可以容纳的高度
    console.log('a12',a12.innerHeight());//81.66666000000001，通过结果得知，innerHeight()获取的是包括了padding大小的值




    /**
     * 获取第一个匹配元素外部高度（默认包括补白和边框）。
     * outerWidth()类似，就不做介绍
     */
    console.log("------ outerHeight([options]) ------");


    console.log("------ outerHeight() ------");
    /**
     * 获取第一个匹配元素外部高度（默认包括补白和边框）。
     * 注意是外部高度,(包括内容高度，上下padding高度，上下border高度)
     */
    var a13 = $("div.padding", ".custom-box.box-1");
    console.log('a13',a13.height());//61.66666  通过结果得知，height()获取的是内容实际可以容纳的高度
    console.log('a13',a13.innerHeight());//81.66666000000001，通过结果得知，innerHeight()获取的是包括了padding大小的值
    console.log('a13',a13.outerHeight());//100，通过结果得知，outerHeight()获取的是包括内容高度，上下padding高度，上下border高度



    console.log("------ outerHeight(true/false) ------");
    /**
     * 设置为 true 时，计算边距在内。
     * 注意是外部高度,计算边距在内,(包括内容高度，上下padding高度，上下border高度,上下margin高度)
     */
    var a14 = $("div.padding", ".custom-box.box-1");
    console.log('a14',a14.height());//61.66666  通过结果得知，height()获取的是内容实际可以容纳的高度
    console.log('a14',a14.innerHeight());//81.66666000000001，通过结果得知，innerHeight()获取的是包括了padding大小的值
    console.log('a14',a14.outerHeight());//100，通过结果得知，outerHeight()获取的是包括内容高度，上下padding高度，上下border高度
    console.log('a14',a14.outerHeight(true));//120，通过结果得知，outerHeight()获取的是包括内容高度，上下padding高度，上下border高度,上下margin高度


});