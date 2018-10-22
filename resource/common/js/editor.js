/**
 * Created by cherish on 2018/9/17.
 */
(function ($,ace) {
    if(!$ || !ace)return;
    /**
     * 
     * @param useWrapMode 是否折叠，true,false
     * @param readOnly  是否只读，true,false
     * @param language  语言
     * @param theme 主题
     * @param value 默认值
     * @param ajax  ajax url地址
     * @param success 请求成功回调
     * @param error 请求失败回调
     * @returns {InitEditor}
     * @constructor
     */
    function InitEditor({useWrapMode=true,readOnly=false,language='ace/mode/javascript',theme='ace/theme/monokai',value='',ajax=null,success,error}) {
        if(!this.attr("id") || this.data('editor'))return this;
        var editor = ace.edit(this.attr("id")),
            this_ = this;
        //设置语言
        editor.getSession().setMode(language);
        //设置代码折叠
        editor.getSession().setUseWrapMode(useWrapMode);
        //设置高亮:
        editor.setHighlightActiveLine(true);
        //设置编辑器只读
        editor.setReadOnly(readOnly);
        //设置代码提示
        ace.require("ace/ext/language_tools");
        //获取选择内容:
        //editor.session.getTextRange(editor.getSelectionRange());
        //获取总行数:
        //editor.session.getLength();
        //监听改变事件:
        //editor.getSession().on('change', function(e) {});
        //监听选择事件:
        //editor.getSession().selection.on('changeSelection', function(e) {});
        //监听光标移动:
        //editor.getSession().selection.on('changeCursor', function(e) {})
        
        //配置
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true
        });
        //设置皮肤
        editor.setTheme(theme);
        if(ajax){
            ajax+=ajax.indexOf("?")>-1 ? "&r="+Math.random() : "?r="+Math.random();
            $.ajax({
                url:ajax,
                dataType:'text',
                success:function (data) {
                    editor.setValue(data);
                    //根据代码行数，重置编辑器高度
                    var len = editor.session.getLength();
                    var height = 16;
                    //获取每一行代码的高度
                    if (editor.session.getUseWrapMode()) {
                        height = $(".ace_line_group").height();
                    } else {
                        height = $(".ace_line").height();
                    }
                    //重置父容器的高度
                    this_.height(len*(height+1));
                    //重置编辑器宽高
                    editor.resize();
                    success && success.call(this_,data);
                },
                error:function () {
                    error && error.apply(this_,arguments);
                }
            });
        }else{
            //设置初始值
            editor.setValue(value);
        }
        this.data('editor',editor);
        return this;
    }

    function hasEditorError() {
        var editor = this.editor();
        if(!editor)return false;
        var annotations = editor.getSession().getAnnotations();
        for (var aid = 0, alen = annotations.length; aid < alen; ++aid) {
            if (annotations[aid].type == 'error' || annotations[aid].type == 'info') {
                return true;
            }
        }
        return false;
    }

    function editor() {
        return this.data('editor');
    }

    $.fn.initEditor = InitEditor;
    $.fn.hasEditorError = hasEditorError;
    $.fn.editor = editor;
})(jQuery,ace);