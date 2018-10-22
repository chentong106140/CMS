$(function () {
    console.log("----------parent > child----------");

    /**
     * parent > child
     * 在给定的父元素下匹配所有的子元素
     * 也就是指定下级元素，不是子孙元素
     */
    var a1 = $("form > input",".custom-box.box-1");
    console.log(a1);
    //<input name="name" />

    
    
    console.log("----------prev + next----------");
    /**
     * prev + next
     * 匹配所有紧接在 prev 元素后的 next 元素
     * 最终匹配到的元素是next
     * 注意：是紧跟在prev之后，如果prev与next之间存在其他元素就不符合规则
     */
    var a2 = $("label + input",".custom-box.box-1");
    console.log(a2);
    //[ <input name="name" />, <input name="newsletter" /> ]

    
    
    console.log("----------prev ~ siblings----------");
    /**
     * prev ~ siblings
     * 匹配 prev 元素之后的所有 siblings 元素
     * 匹配所有与prev同辈的,并且是在prev之后的siblings元素
     * 注意：是选取prev之后的siblings元素，之前的元素不会选择到
     */
    var a3 = $("form ~ input",".custom-box.box-1");
    console.log(a3);
    //[ <input name="none2">, <input name="none3"> ]

    
    
    console.log("----------:first----------");
    /**
     * :first
     * 获取第一个元素
     */
    var a4 = $("ul li:first",".custom-box.box-1");
    console.log(a4);
    //[ <li>list item 1</li> ]


    console.log("---------- :first-child ----------");
    /**
     * :first-child
     * 匹配所给选择器( :之前的选择器)的第一个子元素
     * 类似的:first匹配第一个元素，但是:first-child选择器可以匹配多个：即为每个父级元素匹配第一个子元素。这相当于:nth-child(1)
     * 通过结果可以看出ul li:first只匹配到了第一个ul下的第一个li标签，而ul li:first-child匹配到了2个li,说明他可以匹配多个父标签下第一个子标签，而:first只能匹配第一个父标签下的第一个子标签
     * 描述：获取所有url下第一个子标签li
     */
    var a26 = $("ul li:first-child",".custom-box.box-1");
    console.log(a26);
    //[ <li>list item 1</li> , <li>list item 11</li>]
    
    console.log("---------- :not(selector) ----------");
    /**
     * :not(selector)
     * 去除所有与给定选择器匹配的元素
     */
    var a5 = $("form input:not(input[name='newsletter'])",".custom-box.box-1");
    console.log(a5);
    //[ <input name="name"> ]

    console.log("----------  :has(selector)  ----------");
    /**
     * :has(selector)
     * 选择器选取所有包含一个或多个元素在其内的元素，匹配指定的选择器。
     * :has与:not的区别是: 
     *      父标签:has()是只能在父标签上，做子孙标签过滤，相当于判断父标签下是否包含某些符合选择器的子标签，如果存在就返回对应父标签
     *      标签:not()是在选定的标签集合中，再进行过滤，将不符合选择器的过滤掉，身下的就是不符合选择器的元素
     */
    var a6 = $("form:has(input[name='newsletter'])",".custom-box.box-1");
    console.log(a6);
    //[ <li>list item 5</li>]


    console.log("---------- :even ----------");
    /**
     * :even
     * 匹配所有索引值为偶数的元素，从 0 开始计数
     * 索引值为0也是偶数，也就是说选取的列表中第一个也会被选中
     */
    var a7 = $("table td:even",".custom-box.box-1");
    console.log(a7);
    //[ <tr><td>Header 1</td></tr>, <tr><td>Value 2</td></tr>  ]

    console.log("----------  :odd  ----------");
    /**
     * :odd
     * 匹配所有索引值为奇数的元素，从 0 开始计数
     * 选取的列表从索引值1的元素开始，1,3,5,7...
     */
    var a8 = $("table td:odd",".custom-box.box-1");
    console.log(a8);
    //[ <td>Value 1</td>,<td>Value 3</td>,<td>Value 5</td>  ]


    console.log("----------  :eq(index)  ----------");
    /**
     * :eq(index)
     * :eq(0)与:first选择器，效果一样
     * 匹配一个给定索引值的元素
     * index 从 0 开始计数
     */
    var a9 = $("ul li:eq(0)",".custom-box.box-1");
    console.log(a9);
    //[ <li>list item 1</li>  ]


    console.log("---------- :nth-child ----------");
    /**
     * :nth-child
     * 匹配其父元素下的第N个子或奇偶元素
     * :eq(index) 匹配选择器指定序列的元素，而这个将为每一个父元素匹配子元素。
     * nth-child从1开始的，而:eq()是从0算起的！可以使用:<br>nth-child(even)<br>:nth-child(odd)<br>:nth-child(3n)<br>:nth-child(2)<br>:nth-child(3n+1)<br>:nth-child(3n+2)
     * 描述：匹配所有ul下的第二个li标签
     */
    var a32 = $("ul li:nth-child(2)",".custom-box.box-1");
    console.log(a32);
    //[<li>list item 2</li>,<li>list item 22</li>]

    console.log("----------  :gt(index)  ----------");
    /**
     * :gt(index)
     * 匹配所有大于给定索引值的元素
     * index 从 0 开始计数
     */
    var a10 = $("ul li:gt(0)",".custom-box.box-1");
    console.log(a10);
    //[ <li>list item 2</li>,<li>list item 3</li>,<li>list item 4</li>,<li>list item 5</li>  ]

    console.log("----------  :lt(index)  ----------");
    /**
     * :lt(index)
     * 匹配所有小于给定索引值的元素
     * index 从 0 开始计数
     */
    var a11 = $("ul li:lt(1)",".custom-box.box-1");
    console.log(a11);
    //[ <li>list item 1</li>]

    
    console.log("----------  :last  ----------");
    /**
     * :last
     * 获取最后个元素
     */
    var a12 = $("ul li:last",".custom-box.box-1");
    console.log(a12);
    //[ <li>list item 5</li>]

    console.log("----------  :last-child   ----------");
    /**
     * :last-child
     * 匹配最后一个子元素
     * :last 只匹配最后一个元素，而此选择符将为每个父元素匹配最后一个子元素
     * 描述：对不在执行动画效果的元素指定一个动画特效
     * 
     * 总结：通过结果可以看出，:last-child确实是匹配到了2个li，这两个li都是作为子元素下的最后一个元素
     */
    var a31 = $("ul li:last-child",".custom-box.box-1");
    console.log(a31);
    //[<li>list item 5</li>,<li>list item 55</li>]
    

    console.log("----------  :animated   ----------");
    /**
     * :animated
     * 匹配所有正在执行动画效果的元素
     * 描述：对不在执行动画效果的元素指定一个动画特效
     */
    //$("div:not(:animated)").animate({ left: "+=20" }, 1000);

    console.log("----------  :contains(text)  ----------");
    /**
     * :contains(text)
     * 匹配包含给定文本的元素,相当于匹配指定包含文本的元素
     * 描述：选取包含文本John的div元素
     */
    var a13 = $("div:contains('John')",".custom-box.box-1");
    console.log(a13);


    console.log("----------  :parent  ----------");
    /**
     * :parent
     * 匹配含有子元素或者文本的元素,  相当于只选择有子节点的元素，没有子节点的元素就不选择
     * 描述：选择所有含有子元素的td标签
     */
    var a14 = $("td:parent",".custom-box.box-1");
    console.log(a14);

    
    console.log("----------  :empty  ----------");
    /**
     * :empty
     * 匹配所有不包含子元素或者文本的空元素，相当于只选择没有子节点的元素
     * 描述：选择所有不含有子元素的td标签
     */
    var a15 = $("td:empty",".custom-box.box-1");
    console.log(a15);


    console.log("----------   :hidden   ----------");
    /**
     *  :hidden
     * 匹配所有不可见元素，或者type为hidden的元素
     * 注意:visibility:hidden;设置隐藏的元素不会被选择到
     * 描述：选择所有不可见元素
     */
    var a16 = $(":hidden",".custom-box.box-1");
    console.log(a16);
    //[ <input name="id" type="hidden">,<label style="display: none;">]


    console.log("----------   :visible   ----------");
    /**
     *  :visible
     * 匹配所有的可见元素
     * 注意:visibility:hidden;的元素也会视为可见元素，也会被选择到
     * 描述：选择所有不可见元素
     */
    var a17 = $(":visible",".custom-box.box-1");
    console.log(a17);

    console.log("----------   [attribute]   ----------");
    /**
     *  [attribute]
     * 匹配包含给定属性的元素。
     * 描述：选择所有input元素中，包含name属性的Input元素
     */
    var a18 = $("input[name]",".custom-box.box-1");
    console.log(a18);


    console.log("----------   [attribute=value]   ----------");
    /**
     *  [attribute=value]
     * 匹配给定的属性是某个特定值的元素
     * 描述：选择所有input元素中，包含name属性为’name'的Input元素
     */
    var a19 = $("input[name='name']",".custom-box.box-1");
    console.log(a19);


    console.log("----------  [attribute!=value]  ----------");
    /**
     *  [attribute!=value]
     * 匹配所有不含有指定的属性，或者属性不等于特定值的元素。
     * 此选择器等价于 :not([attr=value]) 要匹配含有特定属性但不等于特定值的元素，请使用[attr]:not([attr=value])
     * 描述：选择所有input元素中，name属性不能与'chentong'的元素
     */
    var a20 = $("input[name!='chentong']",".custom-box.box-1");
    //选择input元素name属性为c开头的，同时，不能等于'ch'开头的元素
    var a21 = $("input[name^='c']:not([name^='ch'])",".custom-box.box-1");
    console.log(a20);
    console.log(a21);


    console.log("---------- [attribute^=value]----------");
    /**
     * [attribute^=value]   
     * 匹配给定的属性是以某些值开始的元素
     * 描述：选择所有input元素，name属性以'c'开头的元素
     */
    var a22 = $("input[name^='c']",".custom-box.box-1");
    console.log(a22);


    console.log("---------- [attribute$=value] ----------");
    /**
     * [attribute$=value]
     * 匹配给定的属性是以某些值结尾的元素
     * 描述：选择所有input元素，name属性以'g'结尾的元素
     */
    var a23 = $("input[name$='g']",".custom-box.box-1");
    console.log(a23);


    console.log("---------- [attribute*=value] ----------");
    /**
     * [attribute*=value]
     * 匹配给定的属性是以包含某些值的元素
     * 描述：选择所有input元素，name属性包含'g'字符的元素
     */
    var a24 = $("input[name*='g']",".custom-box.box-1");
    console.log(a24);


    console.log("---------- [selector1][selector2][selectorN] ----------");
    /**
     * [selector1][selector2][selectorN]
     * 复合属性选择器，需要同时满足多个条件时使用。
     * 描述：选择所有input元素，具备id属性，同时name属性要包含'g'
     */
    var a25 = $("input[id][name*='g']",".custom-box.box-1");
    console.log(a25);


    
    console.log("---------- 结构伪类选择器 ----------");
    /*
     <div id="n1">
         <div id="n2" class="abc">
             <label id="n3">label1</label>
             <span id="n4">span1</span>
             <span id="n5" class="abc">span2</span>
             <span id="n6">span3</span>
        </div>
         <div id="n7">
             <span id="n8" class="abc">span1</span>
             <span id="n9">span2</span>
         </div>
     </div>
     */
    
    
    
    console.log("---------- E:first-of-type ----------");
    /**
     * E:first-of-type
     * 选择父元素内具有指定类型的第一个E元素，与E:nth-of-type(1)等同
     * E标签作为子元素，选择第一个E标签的元素，也就是说选择第一个子元素并且，这个子元素的标签类型为E
     * 如果同级子元素内，第一个元素类型不是E，而E处在第2个甚至在其他位置，也会选择到，其实只要是在子元素集合中，E是指定类型的第一个元素即可
     * 
     * 案例一：
     * 描述：查找作为父元素的span类型子元素中的"长子"的span标签
     * 
     * 结论：通过结果可以看出div span:first-of-type，span必须是div下的子元素，同时span必须是子元素集合中第一个span元素
     */
    var a27 = $("div span:first-of-type",".custom-box.box-1");
    var a28 = $("div span:nth-of-type(1)",".custom-box.box-1");
    console.log(a27);//[<span id="n4"></span>,<span id="n8" class="abc"></span>]
    console.log(a28);//[<span id="n4"></span>,<span id="n8" class="abc"></span>]

    /**
     * 
     * 案例二：
     * 描述：查找class样式有.abc的元素，同时该元素作为父元素下的第一个子元素
     * 
     * 结论：通过结果，我们查找到了div元素与span元素，他们2个都是在父元素下，作为子元素是第一个以样式.abc存在的
     * 我们可以看出 <span id="n5" class="abc">span2</span>这个元素也是.abc的样式，但是作为拥有.abc样式的span标签来说，他作为子元素，并不是第一个span元素
     * 虽然它满足了.abc，但是div .abc:first-of-type这种写法，并不是要求只要满足.abc样式的第一个元素，而是需要满足.abc样式的同时，还需要标签类型也是第一个
     * 在这个案例中,<span id="n5" class="abc">span2</span>虽然是作为子元素是第一个.abc的子元素，但是对应的元素标签类型span并不是
     */
    var a29 = $("div .abc:first-of-type",".custom-box.box-1");
    var a30 = $("div .abc:nth-of-type(1)",".custom-box.box-1");
    console.log(a29);//[<div id="n2" class="abc">,<span id="n8" class="abc">]
    console.log(a30);//[<div id="n2" class="abc">,<span id="n8" class="abc">]


    console.log("---------- E:last-of-type ----------");

    //大体的意思跟 :first-of-type差不多，只是一个是第一个元素，一个是最后一个元素





    console.log("---------- :nth-last-child(n|even|odd|formula) ----------");
    /**
     * :nth-last-child(n|even|odd|formula)
     * 选择所有他们父元素的第n个子元素。计数从最后一个元素开始到第一个。
     * 也就是倒数开始算起，查找倒数第几个元素
     * 使用特殊公式如(an + b)进行选择. 例如:nth-last-child(3n+2) 从倒数第二个子元素开始，匹配每个3的倍数的元素
     * 描述：在每个匹配的ul中查找倒数第二个li
     */
    var a33 = $("ul li:nth-last-child(2)",".custom-box.box-1");
    console.log(a33);
    //[<li>list item 4</li>,<li>list item 44</li>]



    console.log("---------- :nth-of-type(n|even|odd|formula) ----------");
    /**
     * :nth-of-type(n|even|odd|formula)
     * 选择同属于一个父元素之下，并且标签名相同的子元素中的第n个。
     * 使用特殊公式如(an + b)进行选择. 例如:nth-of-type(3n+2) 从第二个具此标签元素开始，匹配每个3的倍数的元素
     * 描述：查找每个span，这个 span 是 其所有兄弟span元素中的第二个元素。
     */
    var a34 = $("div span:nth-of-type(2)",".custom-box.box-1");
    console.log(a33);
    //[<span id="n5" class="abc">span2</span>,<span id="n9">span2</span>]



    console.log("---------- :input ----------");
    /**
     * :input
     * 匹配所有 input, textarea, select 和 button 元素
     * 描述：查找form下所有的input元素，包括input, textarea, select 和 button 元素
     */
    var a34 = $("form :input",".custom-box.box-1");
    console.log(a34);
    //[
    // <input name="name">, 
    // <input name="newsletter">,
    // <select><option>Option</option></select>,
    // <textarea></textarea>,
    // <button>Button</button>
    // ]


    console.log("---------- :text ----------");
    /**
     * :text
     * 匹配所有的单行文本框
     * 描述：查找form下所有的文本输入框
     * 
     * 总结：通过 结果可以看出，匹配到了type="text"的输入框，input默认就是"text"
     */
    var a35 = $("form :text",".custom-box.box-1");
    console.log(a35);
    //[
    // <input name="name" />,
    // <input name="newsletter" />,
    // <input type="text" />
    // ]


    console.log("---------- :radio ----------");
    /**
     * :radio
     * 匹配所有单选按钮
     * 描述：查找所有单选按钮
     */
    var a36 = $("form :radio",".custom-box.box-1");
    console.log(a36);
    //[
    // <input type="radio" name="type" value="0" checked />,
    // <input type="radio" name="type" value="1" />
    // ]



    console.log("----------  :checkbox  ----------");
    /**
     *  :checkbox
     * 匹配所有复选框
     * 描述：查找所有单选按钮
     */
    var a37 = $("form :checkbox",".custom-box.box-1");
    console.log(a37);
    //[
    // <input type="checkbox" name="children" value="1" checked />,
    // <input type="checkbox" name="children" value="2" />,
    // <input type="checkbox" name="children" value="3" />
    // ]



    console.log("---------- :button ----------");
    /**
     * :button
     * 匹配所有按钮
     * 描述：查找所有按钮.
     */
    var a37 = $("form :button",".custom-box.box-1");
    console.log(a37);
    //[
    // <button>Button</button>
    // ]



    console.log("---------- :disabled ----------");
    /**
     *  :disabled
     * 匹配所有不可用元素,被禁用的元素
     * 描述：查找所有不可用的input元素
     */
    var a38 = $("form input:disabled",".custom-box.box-1");
    console.log(a38);
    //[
    // <input name="email" disabled="disabled">
    // ]



    console.log("---------- :enabled ----------");
    /**
     * :enabled
     * 匹配所有可用元素
     * 描述：查找所有可用的input元素
     */
    var a39 = $("form input:enabled",".custom-box.box-1");
    console.log(a39);


    console.log("---------- :checked ----------");
    /**
     * :checked
     * 匹配所有选中的被选中元素(复选框、单选框等，select中的option)，对于select元素来说，获取选中推荐使用 :selected
     * 描述：查找所有可用的input元素
     */
    var a40 = $("form :checked",".custom-box.box-1");
    a40.each(function (index, domEle) {
       console.log(this,$(this).val(),index,domEle) 
    });
    console.log(a40);
    //[<option value="1">,
    // <input name="type" value="0" checked="" type="radio">
    // <input name="children" value="1" checked="" type="checkbox">
    // ]



    console.log("---------- :selected  ----------");
    /**
     * :selected
     * 匹配所有选中的option元素
     * 描述：查找所有选中的选项元素
     */
    var a41 = $("form select option:selected",".custom-box.box-1");
    console.log(a41);
    //[<option value="1">Option</option>]
    
    
});