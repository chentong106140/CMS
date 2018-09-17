(function ($) {
    var CreateForm = function ({url, dataType = "json", type = "GET", data = {}, success=function () {}}) {
        if(!url)return this;
        var this_ = this,
            html = '',
            timeList = [],
            selectList = [],
            searchBtn = ("s" + Math.random() + "").replace('0.', '');

        function createInput(paramList) {
            html += '<div class="form-group">';
                paramList.forEach(function (paramObj) {
                    var required = paramObj.required ? 'required' : '';
                    var readOnly = paramObj.readOnly ? 'readOnly' : '';
                    var disabled = paramObj.disabled ? 'disabled' : '';
                    var defaultValue = paramObj.defaultValue ? paramObj.defaultValue : '';
                    var cName = paramObj.cName ? paramObj.cName : '';
                    var min = paramObj.min ? paramObj.min : '';
                    var max = paramObj.max ? paramObj.max : '';
                    var eName = paramObj.eName ? paramObj.eName : '';
                    var desc = paramObj.desc ? paramObj.desc : '';
                    var format = paramObj.format ? paramObj.format : 'yyyy-MM-dd';
                    var id = ("r" + Math.random() + "").replace('0.', '');
                    var enumList = paramObj.enumList ? paramObj.enumList : [];

                    var type = 'text';
                    //处理整数类型
                    if (paramObj.dataType == 1) {
                        type = 'number';
                        if (paramObj.hidden) {
                            html += '<input id="' + id + '" type="hidden" name="' + eName + '"  value="' + defaultValue + '"  >';
                        } else {
                            html += '<label class="col-sm-2 control-label">' + desc + '</label>' +
                                '<div class="col-sm-2">' +
                                '<input id="' + id + '" type="' + type + '" ' + required + ' ' + readOnly + ' ' + disabled + ' name="' + eName + '" class="form-control" placeholder="' + cName + '" value="' + defaultValue + '" min="' + min + '" max="' + max + '" >' +
                                '</div>';
                        }

                    } else if (paramObj.dataType == 2) {
                        if (paramObj.hidden) {
                            html += '<input id="' + id + '" type="hidden"  name="' + eName + '"  value="' + defaultValue + '"  >';
                        } else {
                            html += '<label class="col-sm-2 control-label">' + desc + '</label>' +
                                '<div class="col-sm-2">' +
                                '<input id="' + id + '" type="' + type + '" ' + required + ' ' + readOnly + ' ' + disabled + ' name="' + eName + '" class="form-control" placeholder="' + cName + '" value="' + defaultValue + '"  >' +
                                '</div>';
                        }

                    } else if (paramObj.dataType == 3) {
                        readOnly = 'readOnly';
                        html += '<label class="col-sm-2 control-label">' + desc + '</label>' +
                            '<div class="col-sm-2">' +
                            '<input id="' + id + '" type="' + type + '" ' + required + ' ' + readOnly + ' ' + disabled + ' name="' + eName + '" class="form-control" placeholder="' + cName + '" value="' + defaultValue + '" format="' + format + '" min="' + min + '" max="' + max + '"  >' +
                            '</div>';
                        timeList.push('#' + id);
                    } else if (paramObj.dataType == 4) {
                        type = 'select';
                        html += '<label class="col-sm-2 control-label">' + desc + '</label>' +
                            '<div class="col-sm-2">' +
                            '<select id="' + id + '" class="form-control" name="' + eName + '">' +
                            '<option value="">请选择</option>';
                        for (var i = 0; i < enumList.length; i++) {
                            var selected = '';
                            if (defaultValue == enumList[i].value) {
                                selected = 'selected="selected"';
                            }
                            html += '<option ' + selected + ' value="' + enumList[i].key + '">' + enumList[i].value + '</option>';
                        }
                        html += '</select>';
                        html += '</div>';
                        selectList.push('#' + id);
                    } else if (paramObj.dataType == 5) {
                        type = 'password';
                        if (paramObj.hidden) {
                            html += '<input id="' + id + '" type="hidden"  name="' + eName + '" value="' + defaultValue + '" >';
                        } else {
                            html += '<label class="col-sm-2 control-label">' + desc + '</label>' +
                                '<div class="col-sm-2">' +
                                '<input id="' + id + '" type="' + type + '" ' + required + ' ' + readOnly + ' ' + disabled + ' name="' + eName + '" class="form-control" placeholder="' + cName + '" value="' + defaultValue + '" >' +
                                '</div>';
                        }

                    }
                });
            html += '</div>';
        }

        function createBtn(searchBtn) {
            html += '<div class="form-group">' +
                '<div class="col-sm-offset-2 col-sm-2">' +
                '<button type="submit" class="btn btn-primary form-control" id="' + searchBtn + '">' +
                '<i class="glyphicon glyphicon-search"></i>查询' +
                '</button>' +
                '</div>' +
                '<div class="col-sm-offset-2 col-sm-2">' +
                '<button type="reset" class="btn btn-default form-control">&nbsp;重置&nbsp;</button>' +
                '</div>' +
                '</div>';
        }

        function createPlugIn(html, timeList, selectList) {
            $(this_).append(html);
            if (timeList.length <= 0)return;
            $(timeList.join(",")).each(function () {
                var min = $(this).attr("min");
                var max = $(this).attr("max");
                var format = $(this).attr("format");
                laydate.render({
                    elem: this,
                    trigger: 'click',
                    min: min,
                    max: max,
                    format: format,
                });
            });
            if (selectList.length <= 0)return;
            $(selectList.join(",")).each(function () {
                $(this).select2();
            });
        }

        function createEvent(reportInfo) {
            if(!reportInfo || !reportInfo.url)return;
            var action = reportInfo.url,
                autoCommit = reportInfo.autoCommit;
            $(this_).attr("action",action).submit(function () {
                //layer.alert(action+"?"+$(this_).serialize());
                var data = $(this_).serializeJson();
                var param = $(this_).serialize();
                var result = true;
                $(this_).find("input").each(function () {

                    if ($(this).attr("type") == 'number') {

                        if ($(this).val() < $(this).attr("min")) {
                            layer.msg("输入错误，数据小于" + $(this).attr("min"));
                            result = false;
                        }

                        if ($(this).val() > $(this).attr("max")) {
                            layer.msg("输入错误，数据大于" + $(this).attr("max"));
                            result = false;
                        }
                    }
                    if (!result) {
                        $(this).focus();
                        return false;
                    } else {
                        return true;
                    }
                });
                return result;
            });
            if(autoCommit){
                $(this_).submit();
            }
            
        }

        $.ajax({
            type: type,
            url: url,
            dataType: dataType,
            data: data,
            success: function (data) {
                if (!data || !data.paramList || !data.reportInfo)return;
                createInput(data.paramList);
                createBtn(searchBtn);
                createPlugIn(html, timeList, selectList)
                createEvent(data.reportInfo);
                success&&success(data);
            }
        });
    };
    $.fn.extend({createForm: CreateForm});
    $.fn.serializeJson = function () {
        var serializeObj = {};
        $(this.serializeArray()).each(function () {
            serializeObj[this.name] = this.value;
        });
        return serializeObj;
    };
})(jQuery);