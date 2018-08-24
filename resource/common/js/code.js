/**
 * Created by cherish on 2018/8/24.
 */
$(function () {

    //添加复制按钮
    $(' <a class=\"code-copy\" title=\"复制到剪切板\"><i class=\"fa fa-copy\"></i></a>').insertBefore("code")


    /***** 复制按钮 开始*******/
    var clipboardSnippets = new Clipboard('.code-copy', {
        'text': function (trigger) {
            return $(trigger).parents("pre").children("code").text();
        }

    });
    clipboardSnippets.on('success', function (e) {
        e.clearSelection();
        alert("复制成功")
    });
    clipboardSnippets.on('error', function (e) {
        alert("复制失败");

    });
    hljs.initHighlightingOnLoad();


    var layer = layui.layer;

    /**
     * 页面一加载就打开弹窗，需要在layer.ready()回调函数内执行
     */
    layer.ready(function () {
        layer.msg("页面加载成功！");
    });
});