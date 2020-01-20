

$(function () {
    var w = null;
    w = top === self ? self : top;
    //消息提示工具公共配置
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    //使用Pace插件，监控页面请求完成后，提示加载完成
    Pace.on("done",function(){
        w.toastr.info("加载完成！");
    });


    setTimeout(function () {
        //添加复制按钮
        $('<a class=\"code-copy\" title=\"复制到剪切板\" style="display: block; position: absolute; top: 5px;left:10px;"><i class=\"fa fa-copy\"></i></a>').appendTo("pre");
    },1000);


    if(Clipboard){
        /***** 复制按钮 开始*******/
        var clipboardSnippets = new Clipboard('.code-copy', {
            'text': function (trigger) {
                return $(trigger).siblings("ol").text();
            }
        });
        clipboardSnippets.on('success', function (e) {
            e.clearSelection();
            w.toastr.info("复制成功")
        });
        clipboardSnippets.on('error', function (e) {
            w.toastr.info("复制失败");

        });
    }

    $(".el-main a[href^='#'][href!='#']").bind("click touchstart",function (e) {
        e.preventDefault();
        var top = $(this).offset().top;
        if(top > 0){
            scrollTo(0,top);
        }
    });
    
    var hash = location.hash;
    if(hash){
        hash = decodeURIComponent(hash);
        $("a[href='"+hash+"']").click();
    }
});