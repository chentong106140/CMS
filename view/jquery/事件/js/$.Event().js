
$(function () {
    console.log("----------------------$.Event()-------------------------");
    
    //1:创建event对象，提前给event对象做处理
    var e = $.Event('ct.myclick.btn',{myName:'陈通'});
    
    //2:给选定元素的所有后代元素绑定事件
    //批量将.box-1下所有的button按钮都绑定了事件
    $('.box-1').on('ct.myclick.btn','button',{test:'测试数据'},function (event,msg1,msg2) {
        console.log(event);
        console.log(event.myName);
        // 陈通——>event.myName属性是我们自定义Event对象时，新加的属性
        //undefined——>我们通过事件名称触发的事件，就不会携带我们在event对象下新增的myName属性，如果需要，请使用event对象进行触发事件
        console.log(event.data);//Object { test: "测试数据" }——>event.data对象是在绑定事件时，传递的数据
        console.log(msg1,msg2);//你好 jQuery——>这两个参数,是在使用trigger，传递给事件处理函数的附加参数
    });

    
    //为了测试触发我们自己自定义的事件，所以用了按钮的点击事件为入口，通过点击，触发我们自己自定义的事件
    $('.box-1 .btn1').click(function () {
        //通过传递event对象触发事件，这样的好处是，能够获取到我们在event对象下自定义的属性myName
        $(this).trigger(e,['你好','jQuery']);
    });

    $('.box-1 .btn2').click(function () {
        //通过传递事件名称触发事件，会导致我们在event对象下自定义的属性，获取不到myName
        $(this).trigger("ct.myclick.btn",['你好','世界']);
    });
    
    //总结：
    //$.Event()方法可以自定义event事件对象的属性
    //为事件处理函数，传递数据的方式有3中
    //1：在$.Event()创建时间对象时，传递第二个参数，作为数据传递，再通过event.自定义属性获取数据
    //2：在.trigger(时间名称，[参数数据]),通过trigger传递第二个参数，所有需要传递给处理函数的数据作为参数数组传递
    //3：在绑定事件时，.on(事件名称,传递数据,事件处理函数)，传递数据
});
