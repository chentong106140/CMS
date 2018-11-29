(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors"],{

/***/ "8Iq/":
/*!**********************************************************************!*\
  !*** ./node_modules/_morgan-iptv-key@1.0.0@morgan-iptv-key/index.js ***!
  \**********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var morgan_iptv_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! morgan-iptv-core */ "MMby");
/* harmony import */ var morgan_iptv_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(morgan_iptv_core__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Created by cherish on 2017/12/14.
 */



(function (window, iptv) {

    /**
     * 用于保存所有区域的键值
     */
    var keyList = iptv.keyList = [],
        /**
         * 焦点方向池
         * @type {Array}
         */
        focusDires = iptv.focusDires = [],
        /**
         * 焦点池
         * @type {Array}
         */
        focusCollection = iptv.focusCollection = [],
        /**
         * 遥控器所有按键
         */
        keys = iptv.keys = function () {
            var this_ = this;
            this_.UP = "UP";
            this_.DOWN = "DOWN";
            this_.LEFT = "LEFT";
            this_.RIGHT = "RIGHT";
            this_.OK = "OK";
            this_.BACK = "BACK";
            this_.ZERO = "ZERO";
            this_.ONE = "ONE";
            this_.TWO = "TWO";
            this_.THREE = "THREE";
            this_.FOUR = "FOUR";
            this_.FIVE = "FIVE";
            this_.SIX = "SIX";
            this_.SEVEN = "SEVEN";
            this_.EIGHT = "EIGHT";
            this_.NINE = "NINE";
            this_.OUT_PAGE = "OUT_PAGE";
            this_.HOME_PAGE = "HOME_PAGE";
            this_.STOP = "STOP";
            this_.MENU = "MENU";
            this_.DEL = "DEL";
            this_.PAGEDOWN = "PAGEDOWN";
            this_.PAGEUP = "PAGEUP";
        },

        key = iptv.key = {
            /**
             * 是否禁用方向按键，默认不禁用
             */
            displayDire: false,
            /**
             * 上一个焦点按键方向
             */
            lastDire: '',
            /**
             * 添加区域键值对象
             * @param areaName  区域名称
             * @param keyObj    键值对象
             */
            addKey: function (areaName, keyObj) {
                var ii = 0;
                for (var i in keyObj) {
                    ++ii;
                }
                keyObj.length = ii + 10000;
                iptv.keyList[areaName + ""] = keyObj;
            },
            /**
             * 根据key值，获取key值对于的名称
             * @param keyCode   key值
             * @returns {*}
             */
            getKeyCodeName: function (keyCode) {
                //循环区域
                for (var i in iptv.keyList) {
                    var sii = 0;
                    //循环区域对应的键值对象
                    for (var kn in iptv.keyList[i]) {
                        ++sii;
                        if (iptv.keyList[i][kn] == keyCode) {
                            return kn;
                        }
                        //下面的做法是兼容创维的盒子，因为他们不支持双重循环，需要手动break;
                        if (sii >= (iptv.keyList[i].length - 10000)) {
                            var version = iptv.STBType();
                            //为了兼容创维盒子，创维盒子有的需要手动break才能跳出内部循环，有的创维盒子反而手动break了，就不能跳出循环了，妈的坑货
                            if (version != "E1100" && version != "ITV218.1") {
                                break;
                            }
                        }
                    }
                }
                return '';
            },

            /**
             * 根据字符匹配对应数据
             * @param num_
             */
            numChange: function (num_) {
                var num = "";
                switch (num_) {
                    case "ONE" :
                        num = 1;
                        break;
                    case "TWO" :
                        num = 2;
                        break;
                    case "THREE" :
                        num = 3;
                        break;
                    case "FOUR" :
                        num = 4;
                        break;
                    case "FIVE" :
                        num = 5;
                        break;
                    case "SIX" :
                        num = 6;
                        break;
                    case "SEVEN" :
                        num = 7;
                        break;
                    case "EIGHT" :
                        num = 8;
                        break;
                    case "NINE" :
                        num = 9;
                        break;
                    case "ZERO" :
                        num = 0;
                        break;
                    case "DEL" :
                        num = "DEL";
                        break;
                    default :
                        num = "";
                        break;
                }
                if (iptv.isFunction(iptv.key.numEvent)) {
                    iptv.key.numEvent(num);
                }
            },
            /**
             * 方向具体处理细节
             * @param dire
             */
            direHandle: function (dire) {
                key.lastDire = dire;
                var fDires = focusDires[key.curFocus.id];
                if (fDires) {
                    // 由于当前方法是用来往右移动的，只需判断是否有右方的focusID
                    // 当前焦点，往某方向按键时具有优先执行，如果指定了方向事件，就不会切换当前焦点，而去执行事件
                    if (fDires[dire + "Event"]) {
                        key.exeCode(fDires[dire + "Event"]);
                        return;
                    } else if (fDires[dire]) {
                        // 如果往下移动被赋值了disable说明啥都不操作
                        if (fDires[dire] == "disable") {
                            key.lastDire = "";
                            return;
                        }
                        // 通过focusID找到焦点对象
                        var nextNode = iptv("#" + fDires[dire]).getFocus();
                        if (nextNode && nextNode.enFocus == true) {
                            key.changeFocus(fDires[dire]);
                            return;
                            //如果原本设置的按钮被禁用了，倘若设置了downOther值，就让此按钮获得焦点
                        } else if (nextNode && nextNode.enFocus == false && fDires[dire + "OtherEvent"]) {

                            key.exeCode(fDires[dire + "OtherEvent"]);
                            return;
                        } else if (nextNode && nextNode.enFocus == false && fDires[dire + "Other"]) {
                            // 通过focusID找到焦点对象
                            var otherNode = iptv("#" + fDires[dire + "Other"]).getFocus();
                            if (otherNode && otherNode.enFocus == true) {
                                key.changeFocus(fDires[dire + "Other"]);
                                return;
                            }
                        } else if (!nextNode && fDires[dire + "NoEvent"]) {
                            //如果右边制定了left焦点，但是这个left焦点不在焦点池中，可以自定义事件
                            key.exeCode(fDires[dire + "NoEvent"]);
                            return;
                        } else if (!nextNode && fDires[dire + "No"]) {
                            // 通过focusID找到焦点对象
                            var otherNode = iptv("#" + fDires[dire + "No"]).getFocus();
                            if (otherNode && otherNode.enFocus == true) {
                                key.changeFocus(fDires[dire + "No"]);
                                return;
                            }
                        }
                    } else if (fDires.otherEvent) {
                        key.exeCode(fDires.otherEvent);
                        return;
                    } else if (fDires.other) {
                        if (fDires.other == "disable") {
                            key.lastDire = "";
                            return;
                        }
                        // 通过focusID找到焦点对象
                        var nextNode = iptv("#" + fDires.other).getFocus();
                        if (nextNode && nextNode.enFocus == true) {
                            key.changeFocus(fDires.other);
                            return;
                        }
                    }
                }
                key.lastDire = "";
            },
            /**
             * 上下左右控制具体方向处理函数
             * @param direType
             */
            focusHand: function (direType) {
                if (key.displayDire == false) {
                    switch (direType) {
                        case "UP" :
                        case "DOWN" :
                        case "LEFT" :
                        case "RIGHT" :
                            key.direHandle(direType.toLowerCase());
                        default :
                            break;
                    }
                }
            },

            /**
             * 切换焦点方法
             * @param focusId_
             * @returns {*}
             */
            changeFocus: function (focusId_) {
                // 通过focusID找到焦点对象
                var nextNode = iptv("#" + focusId_).getFocus();
                if (nextNode) {
                    var oldFocus = key.curFocus;
                    //在让老焦点失去焦点之前，告诉老焦点下一个当前焦点的id
                    oldFocus.nextFocusId = focusId_;
                    // 切换新焦点之前，需要执行失去焦点事件
                    oldFocus.onBlur();
                    var fid = oldFocus.id;
                    // 给当前焦点重新赋值
                    key.curFocus = nextNode;
                    //在让新焦点获取焦点之前，告诉新焦点上一个焦点的id
                    key.curFocus.lastFocusId = fid;
                    key.curFocus.onFocus();
                    return nextNode;
                }

            },

            /**
             * 跳转链接
             * @param url
             */
            redirect: function (url) {
                if (url && iptv.trim(url)) {
                    // 如果禁用了按键，就不执行
                    if (key.curFocus.enable == true) {
                        // 如果执行了页面跳转，就禁止再次点击跳转
                        key.curFocus.enable = false;
                        window.location.href = url;
                    }
                }
            },
            /**
             * 执行JavaScript代码
             * @param _code
             */
            exeCode: function (_code) {
                if (_code) {
                    var code = _code;
                    try {
                        if (iptv.type(_code) === "string" && iptv.trim(_code)) {
                            if (code.indexOf("javascript:") == 0) {
                                code = code.replace("javascript:", "");
                                eval(code);
                            } else if (code.indexOf("http://") == 0) {
                                key.redirect(code);
                            }
                        } else if (iptv.type(_code) === "function") {
                            _code.call(key.curFocus);
                        }

                    } catch (e) {
                        iptv.error(e);
                    }
                }
            }

        }
    ;

    //添加常用键值对象
    key.addKey("HH", {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        OK: 13,
        BACK: 8,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        DEL: 46,
        PAGEDOWN: 34,
        PAGEUP: 33
    });
    //添加华为机顶盒
    key.addKey("HW", {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        OK: 13,
        BACK: 8,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        DEL: 1131,
        PAGEDOWN: 34,
        PAGEUP: 33
    });
    //添加南京广电机顶盒
    key.addKey("NJGD", {BACK: 640, HOME_PAGE: 113, OUT_PAGE: 114, DEL: 127});
    //添加北京歌华机顶盒
    key.addKey("BJGH", {
        UP: 1,
        DOWN: 2,
        LEFT: 3,
        RIGHT: 4,
        OK: 13,
        BACK: 340,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        OUT_PAGE: 339,
        HOME_PAGE: 512,
        STOP: 1025,
        MENU: 513
    });


    /**
     * 焦点构造函数
     * @constructor
     */
    iptv.FocusModel = function () {
        var this_ = this;
        // 焦点描述名称
        this_.name = '';
        // 是否开启按ok键
        this_.enable = true;
        // 是否允许此焦点对象获得焦点
        this_.enFocus = true;
        //该按钮是否被当前页面生成，默认未生成，作用防止开发者直接new FocusModel()
        this_.isCreated = false;
        // 焦点编号，判断是否同一个焦点,非空
        this_.id = "";
        // 将自己的对象赋给此属性
        this_.own = this_;
        //坐标
        this_.X_Posi = 0;
        this_.Y_Posi = 0;
        this_.focusType = 7;
        //指向的图片的id
        this_.imgID = "";
        // 图片切换使用，新图片地址
        this_.newSwap = "";
        // 原始图片
        this_.oldSwap = "";
        // 当前焦点上下左右，四个方向应该走的focusID数组
        this_.dieArr = null;
        // 对应的DOM对象
        this_.nodeObj = null;
        // 临时数据储存
        this_.tempData = null;
        // 在默认获得焦点事件上添加其他执行事件
        this_.onFocusEvent = "";
        // 在默认失去焦点事件上添加额外的执行事件
        this_.onBlurEvent = "";
        // 按确定的跳转地址
        this_.clickEvent = "";
        this_.interval = null;
        //焦点获取焦点时，图标变大的大小，默认20
        this_.changeSize = 10;
        //移动选中框，此选中框是用户自己在html中写出，并指定id,对应效果知识移动选中框位置，不存在动画，对应focusType为10
        this_.selectBorderId = '';
        //移动选中框id,此选中框是代码自动生成的元素，对应效果选中框放大与平移动画，对应focusType为15或16
        this_.selectionID = "selectionID";
        //移动选中框id，此选中框是用户自己要在html中指定元素的id，对应效果是平移选中框，不存在放大动画，与selectBorderId的区别就是它是控制位置没有动画，selectionObjId是控制位置有动画，对应focusTypeId为17
        this_.selectionObjID = "selectionObjID";
        //对应展示图片的层次大小
        this_.focusImgZIndex = 998;
        //对应展示图片的父级元素的层次大小
        this_.focusImgParentZIndex = 998;
        //对应焦点内部图片的层次大小
        this_.imgZIndex = 999;
        //对应焦点内部图片的父级元素的层次大小
        this_.imgParentZIndex = 999;
        //焦点的父节点的ID值
        this_.upParentId = '';
        //用于控制可观看区域的节点ID值
        this_.upAreaId = '';
        this_.rightAreaId = '';
        this_.rightParentId = '';
        //是否开启父容器滚动，默认为false，不滚动
        this_.enUpParentRoll = false;
        this_.enRightParentRoll = false;

        //开启整页滚动
        this_.enRightPageRoll = false;
        //当前焦点索引
        this_.focusIndex = 0;
        //当前焦点对应的当前页
        this_.focusCurPageNum = 0;
        //当前焦点对应的总页数
        this_.focusAllPageNum = 0;
        //当前焦点需要整页滚动的left值
        this_.focusLeftRoll = 0;
        //当前焦点列表中第一个焦点的left值
        this_.focusFirstLeft = 0;
        //当前焦点对应页码的所有焦点id,该值为数组对象
        this_.focusPageAllModel = null;
        //当前焦点对应页码的所有焦点图片是否已经加载过
        this_.focusPageAllLoad = false;
        this_.lastFocusId = '';


        this_.init = function () {
            key.curFocus = this_.own;
            //处理父容器滚动
            if (this_.enUpParentRoll || this_.enRightParentRoll) {
                //获取父容器ID
                var upParentId = this_.upParentId;
                //控制可观看区域容器的ID
                var upAreaId = this_.upAreaId;

                var rightParentId = this_.rightParentId;
                var rightAreaId = this_.rightAreaId;

                var upParentObj = iptv.$(upParentId);
                var upAreaObj = iptv.$(upAreaId);
                var rightParentObj = iptv.$(rightParentId);
                var rightAreaObj = iptv.$(rightAreaId);
                //如果是按上或按下，只会用到rightParentId和rightAreaId
                if (key.lastDire == 'down' && this_.enUpParentRoll == true) {
                    //页面被滚去的高度
                    // var parRollHeight = areaObj.scrollTop || parseInt(parentObj.style.top) || 0;
                    var parRollHeight = Math.abs(parseInt(upParentObj.style.top)) || 0;
                    //可观看区域容器实际可存放内容的高度
                    var parHeight = upAreaObj.clientHeight || parseInt(upAreaObj.style.height) || 0;
                    //焦点的top值
                    var focusTop = parseInt(this_.Y_Posi);
                    //如果没有手动赋值，那么就获取top值
                    if (iptv.isNull(focusTop) || focusTop == 0) {
                        focusTop = this_.nodeObj ? Math.abs(parseInt(this_.nodeObj.style.top)) : 0;
                    }
                    //焦点实际占位高度
                    //var focusHeight = this_.nodeObj ? this_.nodeObj.offsetHeight : parseInt(this_.nodeObj.style.height);
                    var focusHeight = this_.nodeObj ? parseInt(this_.nodeObj.style.height) : 0;
                    //被滚去的高度+父容器实际可存放内容的高度
                    var parA = parRollHeight + parHeight;
                    //焦点的TOP值+焦点实际占位的高度
                    var focB = focusTop + focusHeight;
                    //如果后者大于前者，那么说明当前焦点在可观察区域的下面，所以这时需要考虑父容器需要往下滚多少距离，才能让当前焦点被显示出来
                    if (parA < focB) {
                        //获取当前焦点被遮挡的高度+当前父容器已经滚去的高度，就能得到现在父容器需要总的滚动高度
                        var rollHeight = focB - parA + parRollHeight;
                        upParentObj.style.top = "-" + rollHeight + "px";
                        //*****************************左右上下滚动需要统一监控，用于动态加载图片，目前时间问题，没有继续开发，此处留做后期升级****************************/
                    }
                }

                if (key.lastDire == 'up' && this_.enUpParentRoll == true || key.lastDire == 'right' && this_.enUpParentRoll == true || key.lastDire == 'down' && this_.enUpParentRoll == true) {
                    //页面被滚去的高度
                    // var parRollHeight = areaObj.scrollTop || parseInt(parentObj.style.top) || 0;
                    var parRollHeight = Math.abs(parseInt(upParentObj.style.top)) || 0;
                    //焦点的top值
                    var focusTop = parseInt(this_.Y_Posi);
                    //如果没有手动赋值，那么就获取top值
                    if (iptv.isNull(focusTop) || focusTop == 0) {
                        focusTop = this_.nodeObj ? Math.abs(parseInt(this_.nodeObj.style.top)) : 0;
                    }
                    //页面被滚去的高度
                    var parA = parRollHeight;
                    //焦点的TOP值
                    var focB = focusTop;
                    //如果焦点的TOP值小于当前被滚去的高度，那么说明此时需要往下滚
                    if (parA > focB) {
                        //如果需要父容器往下滚，那么滚去的高度就是焦点的TOP值
                        var rollHeight = focB;
                        upParentObj.style.top = "-" + rollHeight + "px";
                        //*****************************左右上下滚动需要统一监控，用于动态加载图片，目前时间问题，没有继续开发，此处留做后期升级****************************/
                    }
                }

                if (iptv.lastDire == 'right' && this_.enRightParentRoll == true) {
                    //页面被滚去的宽度
                    var parRollWidth = Math.abs(parseInt(rightParentObj.style.left)) || 0;
                    //可观看区域容器实际可存放内容的高度
                    var parWidth = rightAreaObj.clientWidth || parseInt(rightAreaObj.style.width) || 0;
                    //焦点的left值
                    var focusLeft = parseInt(this_.X_Posi);
                    //如果没有手动赋值，那么就获取left值
                    if (iptv.isNull(focusLeft) || focusLeft == 0) {
                        focusLeft = this_.nodeObj ? Math.abs(parseInt(this_.nodeObj.style.left)) : 0;
                    }
                    //焦点实际占位宽度
                    // var focusWidth = this_.nodeObj ? this_.nodeObj.offsetWidth : parseInt(this_.nodeObj.style.width);
                    var focusWidth = this_.nodeObj ? parseInt(this_.nodeObj.style.width) : 0;
                    //被滚去的宽度+父容器实际可存放内容的宽度
                    var parA = parRollWidth + parWidth;
                    ///页面被滚去的宽度
                    var parB = parRollWidth;
                    //焦点的LEFT值+焦点实际占位的宽度
                    var focB = focusLeft + focusWidth;
                    //如果后者大于前者，那么说明当前焦点在可观察区域的右边，所以这时需要考虑父容器需要往左滚多少距离，才能让当前焦点被显示出来
                    if (parA < focB) {
                        //获取当前焦点被遮挡的宽度+当前父容器已经滚去的宽度，就能得到现在父容器需要总的滚动宽度
                        var rollWidth = focB - parA + parRollWidth;
                        rightParentObj.style.left = "-" + rollWidth + "px";
                        //*****************************左右上下滚动需要统一监控，用于动态加载图片，目前时间问题，没有继续开发，此处留做后期升级****************************/
                    } else if (parB > focB) {
                        //被滚去的宽度大于焦点left值+占位宽度,说明焦点完全被遮盖,那么父容器所需要向左滚动的宽度就等于当前焦点的left值
                        var rollWidth = focusLeft;
                        rightParentObj.style.left = "-" + rollWidth + "px";
                        //*****************************左右上下滚动需要统一监控，用于动态加载图片，目前时间问题，没有继续开发，此处留做后期升级****************************/
                    }
                }

                if (iptv.lastDire == 'left' && this_.enRightParentRoll == true || iptv.lastDire == 'down' && this_.enRightParentRoll == true) {
                    //页面被滚去的宽度
                    var parRollWidth = Math.abs(parseInt(rightParentObj.style.left)) || 0;
                    //焦点的left值
                    var focusLeft = parseInt(this_.X_Posi);
                    //如果没有手动赋值，那么就获取left值
                    if (iptv.isNull(focusLeft) || focusLeft == 0) {
                        focusLeft = this_.nodeObj ? Math.abs(parseInt(this_.nodeObj.style.left)) : 0;
                    }
                    //页面被滚去的宽度
                    var parA = parRollWidth;
                    //焦点的LEFT值
                    var focB = focusLeft;
                    //如果焦点的TOP值小于当前被滚去的高度，那么说明此时需要往下滚
                    if (parA > focB) {
                        //如果需要父容器往下滚，那么滚去的高度就是焦点的TOP值
                        var rollWidth = focB;
                        rightParentObj.style.left = "-" + rollWidth + "px";
                        //*****************************左右上下滚动需要统一监控，用于动态加载图片，目前时间问题，没有继续开发，此处留做后期升级****************************/
                    }
                }
            } else if (this_.enRightPageRoll == true) {
                //开启整页滚动
                var rightParentId = this_.rightParentId;
                var rightAreaId = this_.rightAreaId;
                var rightParentObj = iptv.$(rightParentId);
                var rightAreaObj = iptv.$(rightAreaId);
                //获取当前页需要滚动的距离
                var rollLeft = this_.focusLeftRoll || 0;
                rightParentObj.style.left = '-' + rollLeft + "px";
            }
            //动态加载图片
            if (this_.focusPageAllModel && this_.focusPageAllModel.length > 0 && this_.focusPageAllLoad == false) {
                var allModel = this_.focusPageAllModel;
                for (var i in allModel) {

                    var focusModel = iptv("#" + allModel[i]).getFocus();
                    if (focusModel && focusModel.newSwap) {
                        iptv("#" + focusModel.imgID + "_img").src(focusModel.newSwap);
                    }
                }
                this_.focusPageAllLoad = true;
            }

        };
        //如果默认的onFocus方法不满足需求，就可以指定onFocus_属性
        this_.onFocus_ = "";
        // 默认获得焦点事件
        this_.onFocus = function () {
            if (this_.enFocus && this_.isCreated == true) {
                this_.init();
                if (iptv.isNotNull(this_.onFocus_)) {
                    key.exeCode(this_.onFocus_);
                } else {
                    if (this_.focusType == 2) {
                        iptv("#" + this_.imgID).src(this_.newSwap);
                    } else if (this_.focusType == 7) {
                        if (key.curFocus.imgID) {
                            iptv("#" + key.curFocus.imgID).show();
                        }
                    } else if (this_.focusType == 10) {
                        //焦点框是用户手动写到html中，负责移动此焦点框
                        if (iptv.isNotNull(this_.selectBorderId)) {
                            var lastFocusObj = iptv("#" + this.lastFocusId).getFocus();
                            //如果上一个焦点不是15或16，那么焦点框肯定是隐藏的，所以这边负责显示焦点框
                            if (lastFocusObj && lastFocusObj.focusType != 10 || !lastFocusObj) {
                                //显示光标
                                iptv("#" + this.selectBorderId).show();
                            } else {
                                iptv("#" + this.selectBorderId).addClass("transition")
                            }
                            //移动光标
                            iptv("#" + this_.selectBorderId).attr("top", this_.Y_Posi + "px").attr("left", this_.X_Posi + "px");
                        } else {
                            iptv.error("当前焦点未指定selectBorderId属性！")
                        }
                    } else if (this_.focusType == 12) {
                        //负责将对应的展示图片添加放大动画，焦点框是通过焦点对应图片添加放大动画
                        //前提，需要有焦点对应的展示图片，同时需要有边框效果的焦点图片，其实就是将焦点对应的展示图片放大的同时，焦点图片也放大，焦点图片是有边框的图片
                        var img = iptv("#" + this_.imgID + "_img").addClass("transition")[0];
                        img.parentNode.style.zIndex = this_.focusImgParentZIndex;
                        iptv("#" + this_.imgID + "_img").attr("top", (parseInt(img.style.top) - this_.changeSize) + "px").attr("left", (parseInt(img.style.left) - this_.changeSize) + "px").attr("width", (parseInt(img.style.width) + 2 * this_.changeSize) + "px").attr("height", (parseInt(img.style.height) + 2 * this_.changeSize) + "px");
                        //添加过渡  显示焦点
                        var selects = iptv("#" + this_.imgID).addClass("transition").show()[0];
                        selects.parentNode.style.zIndex = this_.imgParentZIndex;
                        iptv("#" + this_.imgID).attr("top", (parseInt(selects.style.top) - this_.changeSize) + "px").attr("left", (parseInt(selects.style.left) - this_.changeSize) + "px").attr("width", (parseInt(selects.style.width) + 2 * this_.changeSize) + "px").attr("height", (parseInt(selects.style.height) + 2 * this_.changeSize) + "px");
                    } else if (this_.focusType == 13) {
                        //负责将对应的展示图片赋予边框与动画，效果为选中后，对于的展示图片添加了边框与放大效果，焦点对应的焦点图片不存在任何效果可以直接放空白图片，切记是对应的展示图片添加动画
                        //条件：焦点需要具有对应的展示图片，只负责控制焦点图片起到动画效果
                        var img = iptv("#" + this_.imgID + "_img").toggleClass("border").addClass("transition")[0];
                        img.parentNode.style.zIndex = this_.focusImgParentZIndex;
                        img.style.top = (parseInt(img.style.top) - this_.changeSize) + "px";
                        img.style.left = (parseInt(img.style.left) - this_.changeSize) + "px";
                        img.style.width = (parseInt(img.style.width) + 2 * this_.changeSize) + "px";
                        img.style.height = (parseInt(img.style.height) + 2 * this_.changeSize) + "px";
                    } else if (this_.focusType == 14) {
                        //负责将焦点div添加边框
                        //条件，焦点切换的形式就是讲焦点添加边框效果，同时显示与隐藏，都是针对于焦点div的操作
                        iptv("#" + this_.id).toggleClass("border").attr("zIndex", this_.imgParentZIndex).show();
                    } else if (this_.focusType == 15) {
                        //15与16都是代码自动生成div为选中框，该选中框只负责显示边框，对应的展示图片不具有放大效果，切换效果为显示与隐藏此自动生成的div边框，如果两个焦点都是15，同时两个焦点框大小也不一样，那么就会出现焦点边框自动放大与缩小效果
                        //焦点框：是自动生成的焦点div,位置大小是根据焦点的style里面控制的
                        //条件：需要用户对焦点的style赋予width,height,top,left属性，这些属性决定焦点框的大小与位置
                        //切换效果：选中：焦点框div显示，位置大小是焦点的style控制的，移开：焦点框div隐藏
                        var div = iptv.$(this_.selectionID);
                        if (!div) {
                            div = document.createElement('div');
                            div.setAttribute("id", this_.selectionID);
                            div.id = this_.selectionID;
                            div.style.width = "0px";
                            div.style.height = "0px";
                            div.style.top = "0px";
                            div.style.left = "0px";
                            div.style.zIndex = this_.imgParentZIndex;
                            div.className = "border position";
                            this_.nodeObj.parentNode.appendChild(div);
                        }
                        var lastFocusObj = iptv("#" + this_.lastFocusId).getFocus();
                        //如果上一个焦点不是15或16，那么焦点框肯定是隐藏的，所以这边负责显示焦点框
                        if (lastFocusObj && lastFocusObj.focusType != 15 && lastFocusObj.focusType != 16) {
                            iptv("#" + this_.selectionID).show();
                        } else {
                            iptv("#" + this_.selectionID).addClass("transition");
                        }
                        div.style.width = this_.nodeObj.style.width;
                        div.style.height = this_.nodeObj.style.height;
                        div.style.top = this_.nodeObj.style.top;
                        div.style.left = this_.nodeObj.style.left;
                    } else if (this_.focusType == 16) {
                        //焦点框：是自动生成的焦点div,位置大小是焦点对应的展示图片的父级目录div的大小位置控制的
                        //放大大小：根据焦点changeSize属性控制放大的大小
                        //条件：是具有对应的展示图片，需要自动生成焦点框div
                        //切换效果：选中：展示图片放大，自动生成的焦点边框放大，移开：展示图片缩小，自动生成的焦点边框隐藏
                        var div = iptv.$(this_.selectionID);
                        if (!div) {
                            div = document.createElement('div');
                            div.setAttribute("id", this_.selectionID);
                            div.id = this_.selectionID;
                            div.style.width = "0px";
                            div.style.height = "0px";
                            div.style.top = "0px";
                            div.style.left = "0px";
                            div.style.zIndex = this_.imgParentZIndex;
                            div.className = "border position";
                            this_.nodeObj.parentNode.appendChild(div);
                        }
                        var lastFocusObj = iptv("#" + this_.lastFocusId).getFocus();
                        var img = iptv.$(this_.imgID + "_img");
                        //如果上一个焦点不是15或16，那么就不需要焦点具有动画效果，这边控制取消动画，直接让战士图片放大与焦点div直接显示
                        if (lastFocusObj && lastFocusObj.focusType != 15 && lastFocusObj.focusType != 16) {
                            iptv("#" + this_.selectionID).removeClass("transition");
                        } else {
                            iptv("#" + this_.selectionID).addClass("transition");
                        }
                        iptv("#" + this_.selectionID).show();
                        //让对应的展示图片放大，并且拥有放大动画
                        iptv("#" + this_.imgID + "_img").addClass("transition");
                        //焦点框放大,由于焦点框的位置是基于展示图片的父级元素的左上角为起点进行放大的，有了边框的原因导致位置与放大后的展示图片的位置不对应，所以需要进一步减去或加上边框的大小
                        div.style.top = (parseInt(img.parentNode.style.top) - this_.changeSize - 2) + "px";
                        div.style.left = (parseInt(img.parentNode.style.left) - this_.changeSize - 2) + "px";
                        div.style.width = (parseInt(img.parentNode.style.width) + 2 * this_.changeSize + 1) + "px";
                        div.style.height = (parseInt(img.parentNode.style.height) + 2 * this_.changeSize + 1) + "px";
                        //对应的展示图片放大
                        img.parentNode.style.zIndex = this_.focusImgParentZIndex;
                        img.style.top = (parseInt(img.style.top) - this_.changeSize) + "px";
                        img.style.left = (parseInt(img.style.left) - this_.changeSize) + "px";
                        img.style.width = (parseInt(img.style.width) + 2 * this_.changeSize) + "px";
                        img.style.height = (parseInt(img.style.height) + 2 * this_.changeSize) + "px";

                    } else if (this_.focusType == 17) {
                        //焦点框是用户自己写到html中，可以自己定制化焦点框的样式，比如边框，背景图，里面包含图片等等，对应动画效果为平移，没有放大效果
                        //条件：需要用户自己定义一个焦点选中框div，并且指定该div有id值赋予给焦点selectionObjID属性
                        var div = iptv.$(this_.selectionObjID);
                        //如果上一个焦点不是17，或者是初始化第一个焦点，那么先显示移动框，不赋予动画
                        //如果上一个焦点是17，但是焦点框不是同一个，需要隐藏上一个焦点框，显示下一个焦点框
                        var lastFocusObj = iptv("#" + this_.lastFocusId).getFocus();
                        if (lastFocusObj && lastFocusObj.focusType != 17 || !lastFocusObj || lastFocusObj && lastFocusObj.focusType == 17 && lastFocusObj.selectionObjID != this_.selectionObjID) {
                            if (div) {
                                iptv("#" + this_.selectionObjID).removeClass("transition").show();
                            }
                        } else {
                            //如果上一个焦点是17,并且上一个焦点存在，那么就赋予动画
                            if (lastFocusObj && lastFocusObj.focusType == 17 && div) {
                                iptv("#" + this_.selectionObjID).addClass("transition");
                            }
                        }
                        if (div) {
                            var img = iptv.$(this_.imgID);
                            div.style.top = parseInt(img.parentNode.style.top) + "px";
                            div.style.left = parseInt(img.parentNode.style.left) + "px";
                        }
                    } else if (this_.focusType == 18) {
                        //选中后，焦点框图片显示，同时该图片要同时与对应的焦点图片放大
                        if (key.curFocus.imgID) {
                            iptv("#" + key.curFocus.imgID).removeClass("transitionsHide0_5");
                            iptv("#" + key.curFocus.imgID + "_img").removeClass("transitionsHide0_5");
                            iptv("#" + key.curFocus.imgID).addClass("transitionsShow0_5");
                            iptv("#" + key.curFocus.imgID + "_img").addClass("transitionsShow0_5");
                            iptv("#" + key.curFocus.imgID).show();

                        }
                    }
                }
                if (this_.onFocusEvent) {
                    key.exeCode(this_.onFocusEvent);
                }
            }
        };
        this_.onBlur_ = "";
        this_.onBlur = function () {
            if (this_.enFocus && this_.isCreated == true) {
                if (iptv.isNotNull(this_.onBlur_)) {
                    key.exeCode(this_.onBlur_);
                } else {
                    if (this_.focusType == 2) {
                        iptv("#" + this_.imgID).src(this_.oldSwap);
                    }
                    // 隐藏发光圈圈
                    if (this_.focusType == 7) {
                        iptv("#" + key.curFocus.imgID).hide();
                    }

                    if (this_.focusType == 10) {
                        //隐藏光标
                        iptv("#" + this_.selectBorderId).hide();
                    }
                    if (this_.focusType == 12) {
                        iptv("#" + this_.imgID + "_img").toggleClass("transition");
                        var img = iptv.$(this_.imgID + "_img");
                        img.parentNode.style.zIndex = 2;
                        img.style.top = (parseInt(img.style.top) + this_.changeSize) + "px";
                        img.style.left = (parseInt(img.style.left) + this_.changeSize) + "px";
                        img.style.width = (parseInt(img.style.width) - 2 * this_.changeSize) + "px";
                        img.style.height = (parseInt(img.style.height) - 2 * this_.changeSize) + "px";
                        iptv("#" + this_.imgID).hide();
                        var selects = iptv.$(this_.imgID);
                        selects.parentNode.style.zIndex = 2;
                        selects.style.top = (parseInt(selects.style.top) + this_.changeSize) + "px";
                        selects.style.left = (parseInt(selects.style.left) + this_.changeSize) + "px";
                        selects.style.width = (parseInt(selects.style.width) - 2 * this_.changeSize) + "px";
                        selects.style.height = (parseInt(selects.style.height) - 2 * this_.changeSize) + "px";
                    }
                    if (this_.focusType == 13) {
                        iptv("#" + this_.imgID + "_img").toggleClass("border");
                        var img = iptv.$(this_.imgID + "_img");
                        img.parentNode.style.zIndex = 2;
                        img.style.top = (parseInt(img.style.top) + this_.changeSize) + "px";
                        img.style.left = (parseInt(img.style.left) + this_.changeSize) + "px";
                        img.style.width = (parseInt(img.style.width) - 2 * this_.changeSize) + "px";
                        img.style.height = (parseInt(img.style.height) - 2 * this_.changeSize) + "px";
                    }
                    if (this_.focusType == 14) {
                        iptv("#" + this_.id).hide().toggleClass("border").attr("zIndex", 2);
                    }
                    if (this_.focusType == 15) {
                        var nextFocusObj = iptv("#" + this_.nextFocusId).getFocus();
                        if (nextFocusObj && nextFocusObj.focusType != 15) {
                            iptv("#" + this_.selectionID).hide();
                        }
                    }
                    if (this_.focusType == 16) {
                        //如果下一个即将获取焦点的焦点不是15或16，就隐藏选中框
                        var nextFocusObj = iptv("#" + this_.nextFocusId).getFocus();
                        if (nextFocusObj && nextFocusObj.focusType != 15 && nextFocusObj && nextFocusObj.focusType != 16) {
                            iptv("#" + this_.selectionID).hide();
                        }
                        //还原图片大小
                        var img = iptv.$(this_.imgID + "_img");
                        img.parentNode.style.zIndex = 2;
                        img.style.top = (parseInt(img.style.top) + this_.changeSize) + "px";
                        img.style.left = (parseInt(img.style.left) + this_.changeSize) + "px";
                        img.style.width = (parseInt(img.style.width) - 2 * this_.changeSize) + "px";
                        img.style.height = (parseInt(img.style.height) - 2 * this_.changeSize) + "px";
                    }
                    if (this_.focusType == 17) {
                        var div = iptv.$(this_.selectionObjID);
                        //如果上一个焦点不是17，那么久先显示移动框，赋予动画
                        var nextFocusObj = iptv("#" + this_.nextFocusId).getFocus();
                        if (nextFocusObj && nextFocusObj.focusType != 17 || nextFocusObj && nextFocusObj.selectionObjID != this_.selectionObjID) {
                            if (div) {
                                iptv("#" + this_.selectionObjID).hide();
                            }
                        }
                    }

                    if (this_.focusType == 18) {
                        iptv("#" + key.curFocus.imgID).removeClass("transitionsShow0_5").addClass("transitionsHide0_5").hide();
                        iptv("#" + key.curFocus.imgID + "_img").removeClass("transitionsShow0_5").addClass("transitionsHide0_5")
                    }
                }

                if (this_.onBlurEvent) {
                    key.exeCode(this_.onBlurEvent);
                }
            }
        };
        this_.onClick = function () {
            if (this_.enable == true && this_.enFocus == true && this_.isCreated == true) {
                if (this_.buttonData && iptv.api && iptv.api.log) {
                    iptv.api.log.buttonLog(this_.buttonData.buttonId);
                }
                key.exeCode(this_.clickEvent);
            }
        };
    };

    /**
     * 所有方向属性与焦点行为事件
     * @constructor
     */
    iptv.Dire = function () {
    };

    iptv.extend(iptv.Dire.prototype, {
        up: '',
        upOther: '',
        right: '',
        rightOther: '',
        down: '',
        downOther: '',
        left: '',
        leftOther: '',
        otherEvent: '',
        other: '',
        // 某方向执行事件，字符串
        upEvent: '',
        rightEvent: '',
        downEvent: '',
        leftEvent: '',
        //某方向原本指定的焦点被禁用了，就执行响应事件
        upOtherEvent: '',
        rightOtherEvent: '',
        downOtherEvent: '',
        leftOtherEvent: '',
        //如果对于方向设置的焦点不在焦点池中，那么执行对于方向的事件或焦点
        rightNoEvent: '',
        rightNo: '',
        leftNoEvent: '',
        leftNo: '',
        downNoEvent: '',
        downNo: '',
        upNoEvent: '',
        upNo: ''
    });

    /**
     * ID命名参数集合
     * @param _x
     * @param _y
     * @param _imgID
     * @param _upParentId
     */
    var IdList = function (_x, _y, _imgID, _upParentId) {
        var this_ = this;
        this_.x = _x;
        this_.y = _y;
        this_.imgID = _imgID;
        this_.upParentId = _upParentId;
    };

    /**
     * 根据id获取参数
     * @param _id
     * @returns {*}
     */
    var getIdList = function (_id) {
        if (!_id) return null;
        var d1 = _id;
        var x1 = d1.indexOf("_", 0);
        var x2 = d1.indexOf("_", x1 + 1);
        var x3 = d1.indexOf("_", x2 + 1);
        var x4 = d1.indexOf("_", x3 + 1);
        var x5 = d1.indexOf("_", x4 + 1);

        var x = d1.substring(x1 + 2, x2);
        var y = d1.substring(x2 + 2, x3);
        var imgsrc = "";
        if (x4 != -1) {
            imgsrc = d1.substring(x3 + 1, x4);
        }
        var par = "";
        if (x5 != -1) {
            par = d1.substring(x4 + 1, x5);
        }
        return new IdList(x, y, imgsrc, par);
    };

    key.curFocus = new iptv.FocusModel();

    //扩展iptv对象方法
    iptv.fn.extend({
        /**
         *获取焦点对象
         * @returns {iptv.FocusModel}
         */
        getFocus: function () {
            var this_ = this;
            if (this_[0] && this_[0].focusObj) {
                return this_[0].focusObj;
            }
            return null;
        },
        /**
         * 开启焦点权限，支持单个开启，多个同时开启
         * @returns {enableFocus}
         */
        enableFocus: function () {
            var this_ = this,
                context = this_.context;
            if (this_[0] && this_[0].focusObj) {
                this_[0].focusObj.enFocus = true;
            } else if (context && iptv.isArray(context)) {
                for (var i in context) {
                    var obj = iptv.focusCollection[context[i]];
                    if (obj && obj.focusObj) {
                        obj.focusObj.enFocus = true;
                    }
                }
            }
            return this_;
        },
        /**
         * 禁用焦点权限，支持单个禁用，多个同时禁用
         * @returns {enableFocus}
         */
        disableFocus: function () {
            var this_ = this,
                context = this_.context;
            if (this_[0] && this_[0].focusObj) {
                this_[0].focusObj.enFocus = false;
            } else if (context && iptv.isArray(context)) {
                for (var i in context) {
                    var obj = iptv.focusCollection[context[i]];
                    if (obj && obj.focusObj) {
                        obj.focusObj.enFocus = false;
                    }
                }
            }
            return this_;
        },
        addFocus: function () {
            var this_ = this,
                context = this_.context,
                doms = [],
                focusId = null;
            //如果是批量添加
            if (context && iptv.isArray(context)) {
                doms = context;
            } else if (context && iptv.type(context) === "object") {
                //如果是单个添加
                doms.push(context);
            }
            for (var i = 0; i < doms.length; i++) {
                var domObj = null,
                    id = "",
                    obj = doms[i];
                if (obj && (id = obj.id) && (iptv.trim(id)) && id.indexOf("hands") == 0 && (domObj = document.getElementById(id))) {
                    var model = new iptv.FocusModel();
                    model.id = focusId = id;
                    var idParams = getIdList(id);
                    model.X_Posi = idParams.x;
                    model.Y_Posi = idParams.y;
                    if (idParams.upParentId && iptv("#" + idParams.upParentId)[0]) {
                        model.ParentNode = iptv("#" + idParams.upParentId)[0];
                    }
                    //获取焦点内部的图片id
                    model.imgID = iptv.trim(idParams.imgID);
                    //保存切换之前的图片地址
                    model.oldSwap = iptv("#" + model.imgID).src();

                    model.enFocus = obj.enFocus || true;
                    //确定键，确定事件
                    model.clickEvent = obj.clickEvent || '';
                    //新图地址
                    model.newSwap = obj.newSwap || '';
                    //焦点捆绑数据
                    model.tempData = obj.tempData || null;
                    //切换类型
                    model.focusType = obj.focusType || 7;
                    //切换到焦点上时，图标变大的大小   设计类型16,13,12
                    model.changeSize = obj.changeSize || 0;
                    //移动选中框id,此选中框是代码自动生成的元素，对应效果选中框放大与平移动画，对应focusType为15或16
                    model.selectionID = obj.selectionID || 'selectionID';
                    //移动选中框id，此选中框是用户自己要在html中指定元素的id，对应效果是平移选中框，不存在放大动画，与selectBorderId的区别就是它是控制位置没有动画，selectionObjId是控制位置有动画，对应focusTypeId为17
                    model.selectionObjID = obj.selectionObjID || "selectionObjID";
                    // 对应展示图片的层次大小
                    model.focusImgZIndex = obj.focusImgZIndex || 998;
                    // 对应焦点内部图片的层次大小
                    model.focusImgParentZIndex = obj.focusImgParentZIndex || 998;
                    // 对应焦点内部图片的层次大小
                    model.imgZIndex = obj.imgZIndex || 999;
                    // 对应焦点内部图片的父元素的层次大小
                    model.imgParentZIndex = obj.imgParentZIndex || 999;
                    //焦点的父节点的ID值  
                    model.upParentId = obj.upParentId;
                    //用户控制可观看区域的容器ID值
                    model.upAreaId = obj.upAreaId;
                    //按右焦点的父节点的ID值
                    model.rightParentId = obj.rightParentId;
                    //按右用于控制可观看区域容器的ID值
                    model.rightAreaId = obj.rightAreaId;
                    //开启父容器滚动,上下滚动
                    model.enUpParentRoll = obj.enUpParentRoll || false;
                    //开启父容器滚动,左右滚动
                    model.enRightParentRoll = obj.enRightParentRoll || false;
                    //开启整页滚动
                    model.enRightPageRoll = obj.enRightPageRoll || false;
                    //当前焦点索引
                    model.focusIndex = obj.focusIndex || 0;
                    //当前焦点对应的当前页
                    model.focusCurPageNum = obj.focusCurPageNum || 0;
                    //当前焦点对应的总页数
                    model.focusAllPageNum = obj.focusAllPageNum || 0;
                    ////当前焦点需要整页滚动的left值
                    model.focusLeftRoll = obj.focusLeftRoll || 0;
                    //当前焦点列表中第一个焦点的left值
                    model.focusFirstLeft = obj.focusFirstLeft || 0;
                    //当前焦点对应页码的所有焦点id,该值为数组对象
                    model.focusPageAllModel = obj.focusPageAllModel || null;
                    // 名称
                    model.name = obj.name || '';
                    // 指定移动到焦点上时，执行的事件
                    model.onFocusEvent = obj.onFocusEvent || '';
                    // 指定失去焦点时，执行的事件
                    model.onBlurEvent = obj.onBlurEvent || '';
                    // 指定移动边框的速度
                    model.tweenSpeed = obj.tweenSpeed || '';
                    // focusType为10的时候需要的选中框id
                    model.selectBorderId = obj.selectBorderId || '';
                    //代替默认获取焦点时的行为
                    model.onFocus_ = obj.onFocus_ || '';
                    //代替默认失去焦点时的行为
                    model.onBlur_ = obj.onBlur_ || '';

                    // ****************************方向初始化**********************/

                    var diredemp = new iptv.Dire();
                    diredemp.other = obj.other || '';
                    diredemp.otherEvent = obj.otherEvent || '';
                    diredemp.left = obj.left || '';
                    diredemp.right = obj.right || '';
                    diredemp.up = obj.up || '';
                    diredemp.down = obj.down || '';
                    diredemp.upEvent = obj.upEvent || '';
                    diredemp.downEvent = obj.downEvent || '';
                    diredemp.leftEvent = obj.leftEvent || '';
                    diredemp.rightEvent = obj.rightEvent || '';
                    diredemp.upOther = obj.upOther || '';
                    diredemp.downOther = obj.downOther || '';
                    diredemp.leftOther = obj.leftOther || '';
                    diredemp.rightOther = obj.rightOther || '';
                    diredemp.upOtherEvent = obj.upOtherEvent || '';
                    diredemp.rightOtherEvent = obj.rightOtherEvent || '';
                    diredemp.downOtherEvent = obj.downOtherEvent || '';
                    diredemp.leftOtherEvent = obj.leftOtherEvent || '';
                    diredemp.rightNoEvent = obj.rightNoEvent || '';
                    diredemp.rightNo = obj.rightNo || '';
                    diredemp.leftNoEvent = obj.leftNoEvent || '';
                    diredemp.leftNo = obj.leftNo || '';
                    diredemp.downNoEvent = obj.downNoEvent || '';
                    diredemp.downNo = obj.downNo || '';
                    diredemp.upNoEvent = obj.upNoEvent || '';
                    diredemp.upNo = obj.upNo || '';
                    focusDires[id] = diredemp;
                    model.dieArr = diredemp;


                    //该按钮已经通过初始化工作
                    model.isCreated = true;
                    model.nodeObj = domObj;
                    domObj.focusObj = model;
                    focusCollection[id] = domObj;
                }
            }
            return focusId ? iptv("#"+focusId) : this_ ;
        },
        /**
         * 调用焦点获取焦点方法
         * @returns {onFocus}
         */
        onFocus: function () {
            var focusObj = this.getFocus();
            if (focusObj) {
                focusObj.onFocus();
            }
            return this;
        }
    });

    //声明按键匿名函数
    var keyDownEventfunction = function (evt) {
        var keyCode = iptv.keyCode(evt);
        var keyName = iptv.key.getKeyCodeName(keyCode);
        if (keyCode == 0x0300) {
            try {
                var msgEvent = Utility.getEvent();
                if (iptv.isNotNull(msgEvent)) {
                    var msg = eval("(" + msgEvent + ")");
                    if (msg != null && msg.type == "EVENT_MEDIA_END") {
                        if (iptv("#ivideos")[0]) {
                            iptv("#ivideos").src(iptv.videoUrl);
                        }
                    }
                }
            } catch (e) {
            }
        }
        switch (keyName) {
            case "OK" :
                iptv.key.curFocus.onClick();
                break;
            case "ONE" :
            case "TWO" :
            case "THREE" :
            case "FOUR" :
            case "FIVE" :
            case "SIX" :
            case "SEVEN" :
            case "EIGHT" :
            case "NINE" :
            case "ZERO" :
            case "DEL" :
                iptv.key.numChange(keyName);
                break;
            case "LEFT" :
            case "RIGHT" :
            case "UP" :
            case "DOWN" :
                iptv.key.focusHand(keyName);
                if (evt) {
                    evt.preventDefault();
                    return false;
                } else {
                    if (event) {
                        event.returnValue = false;
                        return false;
                    }
                }
                break;
            case "HOME_PAGE":
            case "OUT_PAGE":
            case "BACK" :
                try {
                    if (evt) {
                        evt.preventDefault();
                    } else {
                        if (event) {
                            event.returnValue = false;
                        }
                    }
                } catch (e) {
                }
                if (iptv.isFunction(iptv.key.backfunc)) {
                    iptv.key.backfunc();
                }
                return false;
                break;
            default :
                break;
        }
    };

    //添加按键事件
    iptv(document).addEventListener("keydown", keyDownEventfunction);

})(window, morgan_iptv_core__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),

/***/ "MMby":
/*!************************************************************************!*\
  !*** ./node_modules/_morgan-iptv-core@1.0.1@morgan-iptv-core/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Created by cherish on 2018/11/28.
 */
(function (window, undefined) {
    var
        // 将 undefined 转换为字符串 "undefined"
        core_strundefined = typeof undefined,

        location = window.location,
        document = window.document,
        docElem = document.documentElement,

        //设置别名
        _iptv = window.iptv,
        _$ = window.$,

        // 储存了常见类型的 typeof 的哈希表
        //{"[object Function]":"function","[object Boolean]":"boolean",}
        class2type = {},
        // 定义当前版本
        core_version = '1.0.1',
        // 其次，这里定义了一个空的数组对象 ，如果下文行文需要调用数组对象的 concat 、push 、slice 、indexOf 方法
        // 将会调用 core_concat 、core_push 、core_slice 、和 core_indexOf ，这四个变量事先存储好了这四个方法的入口
        // 同时使用 call 或 apply 调用这些方法也可以使类数组也能用到数组的方法
        core_deletedIds = [],
        core_concat = core_deletedIds.concat,
        core_push = core_deletedIds.push,
        core_slice = core_deletedIds.slice,
        core_indexOf = core_deletedIds.indexOf,

        core_toString = class2type.toString,
        //hasOwnProperty:返回boolean值，参数是字符串，用于检查某对象是否存在该字符串的属性，该方法不会检查对象的原型链中是否存在该属性
        //var a = {name:"n"}; a.hasOwnProperty("name");return true
        core_hasOwn = class2type.hasOwnProperty,
        core_trim = core_version.trim,
        //匹配开头#&.号的任意字符，包括下划线与-
        quickExpr = /(^[#&.])([\w-]+)$/,
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        //定义iptv构造函数
        iptv = function (selector, context) {
            return new iptv.fn.init(selector, context);
        };
    // 给 iptv.prototype 设置别名 iptv.fn
    // iptv.prototype 即是 iptv的原型，挂载在 iptv.prototype 上的方法，即可让所有 iptv 对象使用
    iptv.fn = iptv.prototype = {
        // 当前版本
        iptv: core_version,
        constructor: iptv,
        /**
         * 初始化方法
         */
        init: function (selector, context) {
            // 如果传入的参数为空，则直接返回this
            if (!selector) {
                return this;
            }
            var match;
            if (typeof selector == "string") {
                match = quickExpr.exec(selector)
                //处理id DOM
                if (match && match[1] === "#") {
                    var ele = document.getElementById(match[2]);
                    this[0] = ele;
                    this.length = 1;
                    this.selector = match[0];
                }
                this.context = document;
                return this;
            } else if (selector.nodeType == 1) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;
            } else if (iptv.isFunction(selector)) {
                return iptv.ready(selector);
            }

            if (selector.selector && selector.context) {
                return iptv(selector.selector, selector.context);
            }
            if (iptv.type(selector) === "object") {
                this.context = this[0] = selector;
                this.length = 1;
                return this;
            }

            if (iptv.type(selector) === "array") {
                this.context = selector;
                this.length = 0;
                iptv.merge(this, selector);
                return this;
            }
            return this;
        },
        //当前操作的上下文对象
        context: null,
        //当前的选择器
        selector: "",

    };
    //重置原型对象为iptv
    iptv.fn.init.prototype = iptv.fn;

    //不对外方法
    function getsec(sec) {
        var str1 = sec.substring(1, sec.length) * 1;
        var str2 = sec.substring(0, 1);
        if (str2 == "S") {
            return str1 * 1000;
        }
        else if (str2 == "M") {
            return str1 * 60 * 1000;
        }
        else if (str2 == "H") {
            return str1 * 60 * 60 * 1000;
        }
        else if (str2 == "D") {
            return str1 * 24 * 60 * 60 * 1000;
        } else {
            return 1 * 24 * 60 * 60 * 1000;
        }
    }

    /**
     * 定义继承方法
     * 如果只有一个参数，target就是iptv类或iptv对象，
     * 如果有2个或多个参数，target就是第一个参数，那么就第2个参数开始之后的所有参数的属性复制到第一个参数上去
     * 如果第一个参数是true，target就是第二个参数，之后的参数的属性就复制到第二个参数去
     * @type {iptv.extend}
     */
    iptv.extend = iptv.fn.extend = function () {
        var src, copyIsArray, copy, name, options, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // target 是传入的第一个参数
        // 如果第一个参数是布尔类型，则表示是否要深递归，
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            // 如果传了类型为 boolean 的第一个参数，i 则从 2 开始
            i = 2;
        }
        // 如果传入的第一个参数是 字符串或者其他
        if (typeof target !== "object" && !iptv.isFunction(target)) {
            target = {};
        }
        // 如果参数的长度为 1 ，表示是 iptv 静态方法
        if (length === i) {
            target = this;
            --i;
        }
        // 可以传入多个复制源
        // i 是从 1或2 开始的
        for (; i < length; i++) {
            // 将每个源的属性全部复制到 target 上
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    // src 是源（即本身）的值
                    // copy 是即将要复制过去的值
                    src = target[name];
                    copy = options[name];
                    // 防止有环，例如 extend(true, target, {'target':target});
                    if (target === copy) {
                        continue;
                    }
                    // 如果是深复制
                    if (deep && copy && (iptv.isPlainObject(copy) || (copyIsArray = iptv.isArray(copy)))) {
                        // 数组
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && iptv.isArray(src) ? src : [];
                            // 对象
                        } else {
                            clone = src && iptv.isPlainObject(src) ? src : {};
                        }
                        // 递归
                        target[name] = iptv.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // 也就是如果不传需要覆盖的源，调用 $.extend 其实是增加 iptv 的静态方法
        return target;
    };
    //添加iptv静态方法
    iptv.extend({
        /**
         * 释放iptv对象引用，防止公共出去的iptv变量造成污染冲突，也可以实现同一个页面有多个iptv库
         * @param deep 如果传true，$与iptv同时交给了该方法的返回值，如果传false或空，只有$变量将交给该方法的返回值
         * @returns {iptv}
         */
        noConflict: function (deep) {
            if (window.$ === iptv) {
                window.$ = _$;
            }

            if (deep && window.iptv === iptv) {
                window.iptv = _iptv;
            }
            return iptv;
        },
        $: function (id) {
            if (id && iptv.trim(id)) {
                return document.getElementById(iptv.trim(id));
            }
            return null;
        },
        /**
         * 随机数
         */
        expando: "iptv" + (core_version + Math.random()).replace(/\D/g, ""),
        /**
         * 判断传入对象是否为 function
         * @returns {boolean}
         */
        isFunction: function (obj) {
            return iptv.type(obj) === "function";
        },
        /**
         * 判断传入对象是否为数组
         * @returns {boolean}
         */
        isArray: Array.isArray || function (obj) {
            return iptv.type(obj) === "array";
        },
        /**
         *  判断传入对象是否为 window 对象
         * @param obj
         * @returns {boolean}
         */
        isWindow: function (obj) {
            return obj != null && obj == obj.window;
        },
        // 确定它的参数是否是一个数字
        isNumeric: function (obj) {
            //isFinite:参数是一个数字，用于判断这个数字是否是无穷大数字，如果是无穷大，返回false，如果数字正常返回true
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        },

        /**
         * 确定JavaScript 对象的类型
         * @param obj
         * @returns {boolean number string function array date regexp object error}
         */
        type: function (obj) {
            // 如果传入的为 null --> "null"
            if (obj == null) {
                return String(obj);
            }
            // 利用事先存好的 hash 表 class2type 作精准判断
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[core_toString.call(obj)] || "object" :
                typeof obj;
        },
        /**
         * 测试对象是否是纯粹的对象
         * 通过 "{}" 或者 "new Object" 创建的
         * @param obj
         * @returns {Boolean ,Number ,String ,Function ,Array ,Date ,RegExp ,Object ,Error}
         */
        isPlainObject: function (obj) {
            var key;
            if (!obj || iptv.type(obj) !== "object" || obj.nodeType || iptv.isWindow(obj)) {
                return false;
            }

            try {
                if (obj.constructor &&
                    !core_hasOwn.call(obj, "constructor") &&
                    !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
            } catch (e) {
                return false;
            }
            if (iptv.support.ownLast) {
                for (key in obj) {
                    return core_hasOwn.call(obj, key);
                }
            }
            for (key in obj) {
            }

            return key === undefined || core_hasOwn.call(obj, key);
        },
        /**
         * 返回对象是否是数组还是类数组对象
         * @param obj
         * @returns {boolean} true:是数组，false:不是纯数组
         */
        isArraylike: function (obj) {
            var length = obj.length,
                type = iptv.type(obj);

            if (iptv.isWindow(obj)) {
                return false;
            }

            if (obj.nodeType === 1 && length) {
                return true;
            }

            return type === "array" || type !== "function" && (length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj);
        },
        /**
         * 检查对象是否为空（不包含任何属性）
         * @param obj
         * @returns {boolean}
         */
        isEmptyObject: function (obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },
        /**
         * 为 JavaScript 的 "error" 事件绑定一个处理函数
         * @param msg 错误描述
         */
        error: function (msg) {
            throw new Error(msg);
        },
        /**
         * 去除前后空格
         * @param text
         * @returns {string}
         */
        trim: function (text) {
            return text == null ? "" : (text + "").replace(rtrim, "");
        },
        /**
         * eval的变异，使用效果一样，只不过是在全局作用域中执行 参数data
         * @param data
         */
        globalEval: function (data) {
            // 如果 data 不为空
            if (data && iptv.trim(data)) {
                (window.execScript || function (data) {
                    // 在chrome一些旧版本里eval.call( window, data )无效
                    window["eval"].call(window, data);
                })(data);
            }
        },
        /**
         * 判断某个DOM是否是指定的name名称
         * iptv.nodeName(document.getElementById("h"),"h2")--->return true/false
         * @param elem  DOM节点对象
         * @param name  需要判断的节点名称
         * @returns {boolean}
         */
        nodeName: function (elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        /**
         * 循环数组或对象
         * @param obj
         * @param callback
         * @param args
         * @returns {*}
         */
        each: function (obj, callback, args) {
            if (!obj)return null;
            var value,
                i = 0,
                length = obj.length,
                isArray = iptv.isArraylike(obj); // 判断是不是数组

            // 传了第三个参数
            if (args) {
                if (isArray) {
                    for (; i < length; i++) {
                        // 相当于:
                        // args = [arg1, arg2, arg3];
                        // callback(args1, args2, args3)。然后callback里边的this指向了obj[i]
                        value = callback.apply(obj[i], args);

                        if (value === false) {
                            // 注意到，当callback函数返回值会false的时候，注意是全等！循环结束
                            break;
                        }
                    }
                    // 非数组
                } else {
                    for (i in obj) {
                        value = callback.apply(obj[i], args);

                        if (value === false) {
                            break;
                        }
                    }
                }
            } else {
                // 数组
                if (isArray) {
                    for (; i < length; i++) {
                        // 相当于callback(i, obj[i])。然后callback里边的this指向了obj[i]
                        value = callback.call(obj[i], i, obj[i]);

                        if (value === false) {
                            break;
                        }
                    }
                    // 非数组
                } else {
                    for (i in obj) {
                        value = callback.call(obj[i], i, obj[i]);

                        if (value === false) {
                            break;
                        }
                    }
                }
            }

            return obj;
        },

        /**
         *  merge的两个参数必须为数组，作用就是修改第一个数组，使得它末尾加上第二个数组
         * @param first
         * @param second
         * @returns {*}
         */
        merge: function (first, second) {
            var l = second.length,
                i = first.length,
                j = 0;

            if (typeof l === "number") {
                for (; j < l; j++) {
                    first[i++] = second[j];
                }
            } else {
                while (second[j] !== undefined) {
                    first[i++] = second[j++];
                }
            }
            first.length = i;
            return first;
        },
        /**
         * 获取当前时间的时间戳
         * @returns {number}
         */
        now: function () {
            return (new Date()).getTime();
        },
        /**
         * DOM ready 是否已经完成
         */
        isReady: false,
        ready: function (callback_) {

            // 确定 body 存在
            if (!document.body) {
                // 在 setTimeout 中触发的函数, 一定会在 DOM 准备完毕后触发
                return setTimeout(iptv.ready, 0, callback_);
            }
            // 记录 DOM ready 已经完成
            iptv.isReady = true;
            console.log("DOM加载完成！");
            callback_.call(this, iptv.isReady);
        },
        /**
         * 浏览器名称
         * @returns {*|string}
         */
        browser: function () {
            var b3 = "";
            var b4 = navigator.appName;
            if (b4.indexOf("iPanel") != -1) {
                b3 = "iPanel";
            } else if (b4.indexOf("Microsoft") != -1) {
                b3 = "Miscrosoft";
            } else if (b4.indexOf("Google") != -1) {
                b3 = "Google";
            } else if (b4.indexOf("Netscape") != -1) {
                b3 = "Netscape";
            } else if (b4.indexOf("Opera") != -1) {
                b3 = "Opera";
            }
            return b3;
        },
        /**
         * 判断是否为空 兼容数字0判断为不为null
         * @param obj
         * @returns {boolean}
         */
        isNull: function (obj) {
            //0也判断为有效值
            var l_ = '' + obj;
            var ll_ = '' + 0;
            if (l_ == ll_) {
                return false;
            }
            if (typeof(obj) == 'object' && obj == '') {
                return false;
            }
            if (typeof(obj) == 'undefined' || obj == undefined || obj == null || obj == '') {
                return true;
            }
            return false;
        },
        /**
         * 判断是否不为空  兼容数字0判断为不为null
         * @param obj
         * @returns {boolean}
         */
        isNotNull: function (obj) {
            //0也判断为有效值
            var l_ = '' + obj;
            var ll_ = '' + 0;
            if (l_ == ll_) {
                return true;
            }
            if (typeof(obj) == 'object' && obj == '') {
                return true;
            }
            if (typeof(obj) == 'undefined' || obj == undefined || obj == null || obj == '') {
                return false;
            }
            return true;
        },
        /**
         * 设置或获取style样式值
         * @param elem
         * @param name
         * @param value
         * @returns {undefined}
         */
        style: function (elem, name, value) {
            if (!elem && !elem[0])return undefined;
            if (value) {
                if (iptv.isFunction(value)) {
                    elem[0].style[name] = value.call(elem);
                } else {
                    elem[0].style[name] = "" + value;
                }
                return elem;
            } else {
                return elem[0].style[name];
            }
        },
        /**
         * 获取项目名称，http://127.0.0.1:8080/baidu/index.html——>baidu/
         * @returns {string}
         */
        getContextName: function () {
            //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp  
            var curWwwPath = window.location.href;
            //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp  
            var pathName = window.location.pathname;
            var pos = curWwwPath.indexOf(pathName);
            //获取主机地址，如： http://localhost:8083  
            var localhostPaht = curWwwPath.substring(0, pos);
            //获取带"/"的项目名，如：uimcardprj/
            var projectName = pathName.substring(1, pathName.substr(1).indexOf('/') + 2);
            //var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1)---->/uimcardprj  
            return projectName;
        },
        /**
         * 获取ip与端口  http://127.0.0.1:8080
         * @returns {string}
         */
        getHostPath: function () {
            //http://localhost:8083/uimcardprj/share/meun.jsp  
            var href = window.location.href;
            //uimcardprj/share/meun.jsp  
            var pathname = window.location.pathname;
            return href.substr(0, href.lastIndexOf(pathname));
        },
        /**
         * 获取上下文路径  http://127.0.0.1:8080/baidu/index.html——>http://127.0.0.1:8080/baidu/
         * @returns {string}
         */
        getContextPath: function () {
            //http://www.qiguo.com/720p/html/main/main.html
            var pathname = window.location.pathname;
            var t1 = pathname.indexOf("/", 0);
            var sname = "";
            //判断域名后面还有没有路径了，如果有就获取域名+工程名
            if (pathname.indexOf("/", t1 + 1) > -1)//5
            {
                sname = pathname.substring(t1 + 1, pathname.indexOf("/", t1 + 1));
                sname = this.getHostPath() + "/" + sname + "/";
            }
            return sname;
        },
        /**
         * 将对象转换成url参数链接    aa=1&bb=2
         * @param data
         * @returns {*}
         */
        params: function (data) {
            if (!data) {
                return "";
            }
            var arr = [];
            for (var i in data) {
                arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
            }
            return arr.join("&");
        },
        keyCode: function (evt) {
            evt = evt != null && evt != undefined ? evt : window.event;
            var keyCode = evt.which != null && evt.which != undefined && evt.which != 0 ? evt.which : evt.keyCode;
            return keyCode;
        },
        /**
         * 格式化字符串，动态添加值
         * iptv.formatStr("我的名字是{0},我今年{1}岁了","peter",12)——>我的名字是peter,我今年12岁了
         * @param str   "我的名字是{0},我今年{1}岁了"
         * @returns {*} 我的名字是peter,我今年12岁了
         */
        formatStr: function (str) {
            for (var i = 0; i < arguments.length - 1; i++) {
                str = str.replace("{" + i + "}", arguments[i + 1]);
            }
            return str;
        },
        /**
         * 获取机顶盒型号
         * @returns {*}
         * @constructor
         */
        STBType: function () {
            try {
                return Authentication.CTCGetConfig("STBType");
            } catch (e) {
            }
            return core_strundefined;
        },
        /**
         * 将方法上升到顶级window对象调用fn方法
         * @param fn    可以为js代码字符，可以是function
         * @param args  可以为数组参数，也可以为单个参数
         * @returns {*}
         */
        call: function (fn, args) {
            if (typeof(fn) == 'string') {
                return eval("(" + fn + ")");
            } else if (typeof(fn) == 'function') {
                //如果参数不是数组,就创建数组参数
                if (!iptv.isArray(args)) {
                    var arr = [];
                    for (var i = 1; i < arguments.length; i++) {
                        arr.push(arguments[i]);
                    }
                    args = arr;
                }
                return fn.apply(window, args);
            }
        },
        /**
         * 求最小数与最大数之间的随机数，该数永远不会等于最大数
         * @param Min
         * @param Max
         * @returns {*}
         */
        rangeNum: function (Min, Max) {
            return Min + Math.floor(Math.random() * (Max - Min));
        },
        /**
         * 求两个时间的天数差 日期格式为 YYYY-MM-dd
         * @param DateOne   2017-12-1
         * @param DateTwo   2017-1-1
         * @returns {number}
         */
        daysBetween: function (DateOne, DateTwo) {
            var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
            var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
            var OneYear = DateOne.substring(0, DateOne.indexOf('-'));

            var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
            var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
            var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));

            var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000);
            return Math.abs(cha);
        },
        /**
         * 生成当前服务器时间搓
         */
        runTimeInterval: setInterval(function () {
            if (iptv.serverTimestamp != undefined && iptv.serverTimestamp != null && iptv.serverTimestamp != '') {
                iptv.serverTimestamp = parseInt(iptv.serverTimestamp) + 1000;
            } else {
                iptv.serverTimestamp = (new Date()).getTime();
            }
        }, 1000),
        /**
         * 获取当前服务器时间对象
         * @returns {Date}
         */
        getServerDate: function () {
            var date = new Date();
            if (iptv.serverTimestamp != undefined && iptv.serverTimestamp != null && iptv.serverTimestamp != '') {
                date = new Date(parseInt(iptv.serverTimestamp));
            }
            return date;
        },
        /**
         * 设置Cookie
         * @param name
         * @param value
         * @param timestr
         */
        setCookie: function (name, value, timestr) {
            var exp2 = iptv.getServerDate();
            var id = timestr ? timestr : "D1";
            var t = getsec(id);
            exp2.setTime(exp2.getTime() + t);
            document.cookie = name + ("=" + escape(value) + ";expires=" + exp2.toGMTString() + ";path=/;");
        },
        /**
         * 获取Cookie
         * @param name
         * @returns {*}
         */
        getCookie: function (name) {
            var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            var s = "";
            if (arr != null) {
                s = unescape(arr[2]);
                if (s != null && s.length > 0) {
                    if (s.indexOf('"', 0) == 0 && s.substring(s.length - 1, s.length) == "\"") {
                        s = s.substring(1, s.length);
                        s = s.substring(0, s.length - 1);
                    }
                }
                return s;
            }
            return null;
        },
        /**
         * 删除Cookie
         * @param name
         */
        delCookie: function (name) {
            var exp = iptv.getServerDate();
            exp.setTime(exp.getTime() - 1);
            var cval = iptv.getCookie(name);
            if (cval != null) {
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/;";
            }
        },
        /**
         * 获取URL请求值
         * @param d url key值
         * @returns {*}
         */
        requestValue: function (d) {
            var b = window.location.href;
            var f = b.indexOf("?");
            var e = b.substr(f + 1);
            var c = e.split("&");
            for (var a = 0; a < c.length; a++) {
                var g = c[a].split("=");
                if (g[0].toUpperCase() == d.toUpperCase()) {
                    return g[1];
                }
            }
            return ""
        }
    });

    //添加类型
    iptv.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    //扩展日期
    iptv.extend(Date.prototype, {
        /**
         * 判断闰年
         * @returns {boolean}
         */
        isLeapYear: function () {
            return ( 0 == this.getYear() % 4 && ((this.getYear() % 100 != 0 ) || (this.getYear() % 400 == 0 )) );
        },
        /**
         * 日期格式化
         *格式 YYYY/yyyy/YY/yy 表示年份
         * MM/M 月份
         * W/w 星期
         * dd/DD/d/D 日期
         * hh/HH/h/H 时间
         * mm/m 分钟
         * ss/SS/s/S 秒
         * @param formatStr
         * @returns {*}
         * @constructor
         */
        Format: function (formatStr) {
            var str = formatStr;
            var Week = ['日', '一', '二', '三', '四', '五', '六'];

            str = str.replace(/yyyy|YYYY/, this.getFullYear());
            str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
            var month = this.getMonth() + 1;
            str = str.replace(/MM/, month > 9 ? month : '0' + month);
            str = str.replace(/M/g, month);

            str = str.replace(/w|W/g, Week[this.getDay()]);

            str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
            str = str.replace(/d|D/g, this.getDate());

            str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
            str = str.replace(/h|H/g, this.getHours());
            str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
            str = str.replace(/m/g, this.getMinutes());

            str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
            str = str.replace(/s|S/g, this.getSeconds());

            return str;
        },
        /**
         * 日期计算
         * @param strInterval
         * @param Number
         * @returns {Date}
         * @constructor
         */
        DateAdd: function (strInterval, Number) {
            var dtTmp = this;
            switch (strInterval) {
                case 's' :
                    return new Date(Date.parse(dtTmp) + (1000 * Number));
                case 'n' :
                    return new Date(Date.parse(dtTmp) + (60000 * Number));
                case 'h' :
                    return new Date(Date.parse(dtTmp) + (3600000 * Number));
                case 'd' :
                    return new Date(Date.parse(dtTmp) + (86400000 * Number));
                case 'w' :
                    return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
                case 'q' :
                    return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
                case 'm' :
                    return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
                case 'y' :
                    return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
            }
            ;
        },
        /**
         * 把日期分割成数组
         * @returns {*}
         */
        toArray: function () {
            var myDate = this;
            var myArray = Array();
            myArray[0] = myDate.getFullYear();
            myArray[1] = myDate.getMonth();
            myArray[2] = myDate.getDate();
            myArray[3] = myDate.getHours();
            myArray[4] = myDate.getMinutes();
            myArray[5] = myDate.getSeconds();
            return myArray;
        },
        /**
         * 取得日期数据信息
         * 参数 interval 表示数据类型
         * y 年 m月 d日 w星期 ww周 h时 n分 s秒
         * @param interval
         * @returns {string}
         * @constructor
         */
        DatePart: function (interval) {
            var myDate = this;
            var partStr = '';
            var Week = ['日', '一', '二', '三', '四', '五', '六'];
            switch (interval) {
                case 'y' :
                    partStr = myDate.getFullYear();
                    break;
                case 'm' :
                    partStr = myDate.getMonth() + 1;
                    break;
                case 'd' :
                    partStr = myDate.getDate();
                    break;
                case 'w' :
                    partStr = Week[myDate.getDay()];
                    break;
                case 'ww' :
                    partStr = myDate.WeekNumOfYear();
                    break;
                case 'h' :
                    partStr = myDate.getHours();
                    break;
                case 'n' :
                    partStr = myDate.getMinutes();
                    break;
                case 's' :
                    partStr = myDate.getSeconds();
                    break;
            }
            return partStr;
        }
    });

    //定义对象方法
    iptv.fn.extend({
        /**
         * 设置隐藏
         * @returns {hide}
         */
        hide: function () {
            if (this[0]) {
                iptv.style(this, "visibility", "hidden");
            }
            return this;
        },
        show: function () {
            if (this[0]) {
                iptv.style(this, "visibility", "visible");
            }
            return this;
        },
        /**
         * 设置或获取html
         * @param html
         * @returns {html}
         */
        html: function (html) {
            if (this[0]) {
                if (html) {
                    this[0].innerHTML = "" + html;
                    return this;
                } else {
                    return this[0].innerHTML;
                }
            } else {
                return this;
            }
        },
        /**
         * 替换或获取Src路径地址
         * @param src
         * @returns {setSrc}
         */
        src: function (src) {
            if (this[0] && iptv.trim(src)) {
                this[0].src = "" + src;
                return this;
            } else if (this[0]) {
                return this[0].src;
            }

        },
        /**
         * 获取或设置样式
         * @param name
         * @param value
         */
        attr: function (name, value) {
            return iptv.style(this, name, value);
        },
        /**
         * 判断是否存在className样式名 如果存在就返回一个数组对象 不存在就返回为Null
         * @param className
         * @returns {boolean}
         */
        hasClass: function (className) {
            if (!className || !this[0]) {
                return false;
            }
            return this[0].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        },
        /**
         * 添加类样式
         * @param className
         * @returns {addClass}
         */
        addClass: function (className) {
            if (!className || !this[0]) {
                return this;
            }
            if (!this.hasClass(className)) {
                this[0].className += ' ' + className;
            }
            return this;
        },
        /**
         * 移除类样式
         * @param className
         * @returns {removeClass}
         */
        removeClass: function (className) {
            if (!className || !this[0]) {
                return this;
            }
            if (this.hasClass(className)) {
                this[0].className = this[0].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
            }
            return this;
        },
        /**
         * 如果存在就删除className样式，如果不存在就添加className样式
         * @param className
         * @returns {toggleClass}
         */
        toggleClass: function (className) {
            if (!className || !this[0]) {
                return this;
            }
            if (this.hasClass(className)) {
                return this.removeClass(className);
            } else {
                return this.addClass(className);
            }
        },
        /**
         * 添加事件
         * @param type
         * @param func
         * @returns {addEvent}
         */
        addEventListener: function (type, func) {
            if (!this[0]) {
                return this;
            }
            if (this[0].addEventListener) {
                //监听IE9，谷歌和火狐 
                this[0].addEventListener(type, func, false);
            } else if (this[0].attachEvent) {
                this[0].attachEvent("on" + type, func);
            } else {
                this[0]["on" + type] = func;
            }
            return this;
        },
        /**
         * 移除事件
         * @param target
         * @param type
         * @param func
         */
        removeEventListener: function (type, func) {
            if (!this[0]) {
                return this;
            }
            if (this[0].removeEventListener) {
                //监听IE9，谷歌和火狐 
                this[0].removeEventListener(type, func, false);
            } else if (this[0].detachEvent) {
                this[0].detachEvent("on" + type, func);
            } else {
                delete target["on" + type];
            }
            return this;
        },
        /**
         * 设置css3样式
         * @param objAttr
         */
        setCss3: function (objAttr) {
            //循环属性对象
            for (var i in objAttr) {
                var newi = i;
                //判断是否存在transform-origin这样格式的属性
                if (newi.indexOf("-") > 0) {
                    //将-o字符变成大写-O
                    var num = newi.indexOf("-");
                    newi = newi.replace(newi.substr(num, 2), newi.substr(num + 1, 1).toUpperCase());
                }
                //考虑到css3的兼容性问题,所以这些属性都必须加前缀才行
                this[0].style[newi] = objAttr[i];
                //设置首字母大写   
                newi = newi.replace(newi.charAt(0), newi.charAt(0).toUpperCase());
                this[0].style["webkit" + newi] = objAttr[i];
                this[0].style["moz" + newi] = objAttr[i];
                this[0].style["o" + newi] = objAttr[i];
                this[0].style["ms" + newi] = objAttr[i];
                this[0].style["khtml" + newi] = objAttr[i];
            }
        },
        contains: function (key) {
            if (this.context && iptv.isArray(this.context)) {
                var i = this.context.length;
                while (i--) {
                    if (this.context[i] === key) {
                        return true;
                    }
                }
            }
            return false;
        }
    });

    //定义ajax模块
    function createXHR() {
        if (typeof XMLHttpRequest != "undefined") { // 非IE6浏览器
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject != "undefined") {   // IE6浏览器
            var version = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp",];
            for (var i = 0; i < version.length; i++) {
                try {
                    return new ActiveXObject(version[i]);
                } catch (e) {
                }
            }
        }
    }

    iptv.extend({
        ajax: function (obj) {
            obj = obj || {};
            obj.method = obj.method.toUpperCase() || 'POST';
            obj.url = obj.url || '';
            obj.url += obj.url.indexOf("?") == -1 ? "?rand=" + Math.random() : "&rand=" + Math.random();
            obj.data = obj.data || {};
            obj.async = obj.async || true;
            obj.success = obj.success || function () {
                };
            obj.error = obj.error || function () {
                };
            var params = [];
            for (var key in obj.data) {
                params.push(key + "=" + obj.data[key]);
            }
            var postData = params.join("&");
            var xhr = createXHR();
            if (obj.method === "POST") {
                xhr.open(obj.method, obj.url, obj.async);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                xhr.send(postData);
            } else if (obj.method === "GET") {
                xhr.open(obj.method, obj.url + '&' + postData, obj.async);
                xhr.send(null);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    if (xhr.responseText) {
                        var responseObj = eval("(" + xhr.responseText + ")");
                        //登陆失效
                        if (responseObj && responseObj.code == 1001) {
                            window.location.href = iptv.ErrorLoginFailUrl;
                        } else if (responseObj == null || responseObj == "" || responseObj.code == null) {
                            window.location.href = iptv.ErrorServerFailUrl;
                        } else {
                            obj.success(xhr.responseText);
                        }

                    }

                } else if (xhr.readyState == 4 && xhr.status != 200) {
                    obj.error(xhr.status, xhr.statusText);
                }
            };
        }
    });

    if ( true && module && typeof module.exports === "object") {
        module.exports = iptv;
    } else {
        if (true) {
            !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
                return iptv;
            }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        }
    }

    if (typeof window === "object" && typeof window.document === "object") {
        window.iptv = window.$ = iptv;
    }
})(window);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../_webpack@4.26.1@webpack/buildin/module.js */ "sky/")(module)))

/***/ }),

/***/ "sky/":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX21vcmdhbi1pcHR2LWtleUAxLjAuMEBtb3JnYW4taXB0di1rZXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19tb3JnYW4taXB0di1jb3JlQDEuMC4xQG1vcmdhbi1pcHR2LWNvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ21DOzs7QUFHbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCOztBQUV6QjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7O0FBRUEscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHdCQUF3QixtREFBbUQ7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixpQkFBaUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLENBQUMsVUFBVSx1REFBSSxFOzs7Ozs7Ozs7OztBQ3pzQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWCx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixVQUFVLDBCQUEwQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxZQUFZO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsZ0JBQWdCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsUUFBUTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDs7QUFFaEQ7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFlBQVk7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsMEJBQTBCLFlBQVk7QUFDdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLE9BQU87QUFDN0I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGlDQUFpQyxFQUFFLEtBQUssRUFBRTtBQUMxQywrQkFBK0IsRUFBRSxLQUFLLEVBQUU7QUFDeEMscUJBQXFCLEVBQUU7QUFDdkI7QUFDQTtBQUNBLDJCQUEyQiwwQkFBMEI7QUFDckQsb0NBQW9DLFVBQVU7QUFDOUM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsc0JBQXNCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsbUNBQW1DLE9BQU87QUFDeEcsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsOEVBQThFLEtBQUs7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxrQ0FBa0MsT0FBTztBQUNqRztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGNBQWM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQSxTQUFTLGdEQUFnRDtBQUN6RDtBQUNBLDJCQUEyQixvQkFBb0I7QUFDL0M7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0ZBQXdGO0FBQ3hGO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7O0FBRUE7O0FBRUEsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCxRQUFRLEtBQTBCO0FBQ2xDO0FBQ0EsS0FBSztBQUNMLFlBQVksSUFBMEM7QUFDdEQsWUFBWSxpQ0FBZSxFQUFFLG1DQUFFO0FBQy9CO0FBQ0EsYUFBYTtBQUFBLG9HQUFDO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLFU7Ozs7Ozs7Ozs7OztBQ3ZwQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InZlbmRvcnMuZTQ3YWY5OWU0OTRmNzI2M2YwNDMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBjaGVyaXNoIG9uIDIwMTcvMTIvMTQuXHJcbiAqL1xyXG5pbXBvcnQgaXB0diBmcm9tICdtb3JnYW4taXB0di1jb3JlJ1xyXG5cclxuXHJcbihmdW5jdGlvbiAod2luZG93LCBpcHR2KSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlKjkuo7kv53lrZjmiYDmnInljLrln5/nmoTplK7lgLxcclxuICAgICAqL1xyXG4gICAgdmFyIGtleUxpc3QgPSBpcHR2LmtleUxpc3QgPSBbXSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDnhKbngrnmlrnlkJHmsaBcclxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZm9jdXNEaXJlcyA9IGlwdHYuZm9jdXNEaXJlcyA9IFtdLFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOeEpueCueaxoFxyXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmb2N1c0NvbGxlY3Rpb24gPSBpcHR2LmZvY3VzQ29sbGVjdGlvbiA9IFtdLFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOmBpeaOp+WZqOaJgOacieaMiemUrlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGtleXMgPSBpcHR2LmtleXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGlzXyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXNfLlVQID0gXCJVUFwiO1xyXG4gICAgICAgICAgICB0aGlzXy5ET1dOID0gXCJET1dOXCI7XHJcbiAgICAgICAgICAgIHRoaXNfLkxFRlQgPSBcIkxFRlRcIjtcclxuICAgICAgICAgICAgdGhpc18uUklHSFQgPSBcIlJJR0hUXCI7XHJcbiAgICAgICAgICAgIHRoaXNfLk9LID0gXCJPS1wiO1xyXG4gICAgICAgICAgICB0aGlzXy5CQUNLID0gXCJCQUNLXCI7XHJcbiAgICAgICAgICAgIHRoaXNfLlpFUk8gPSBcIlpFUk9cIjtcclxuICAgICAgICAgICAgdGhpc18uT05FID0gXCJPTkVcIjtcclxuICAgICAgICAgICAgdGhpc18uVFdPID0gXCJUV09cIjtcclxuICAgICAgICAgICAgdGhpc18uVEhSRUUgPSBcIlRIUkVFXCI7XHJcbiAgICAgICAgICAgIHRoaXNfLkZPVVIgPSBcIkZPVVJcIjtcclxuICAgICAgICAgICAgdGhpc18uRklWRSA9IFwiRklWRVwiO1xyXG4gICAgICAgICAgICB0aGlzXy5TSVggPSBcIlNJWFwiO1xyXG4gICAgICAgICAgICB0aGlzXy5TRVZFTiA9IFwiU0VWRU5cIjtcclxuICAgICAgICAgICAgdGhpc18uRUlHSFQgPSBcIkVJR0hUXCI7XHJcbiAgICAgICAgICAgIHRoaXNfLk5JTkUgPSBcIk5JTkVcIjtcclxuICAgICAgICAgICAgdGhpc18uT1VUX1BBR0UgPSBcIk9VVF9QQUdFXCI7XHJcbiAgICAgICAgICAgIHRoaXNfLkhPTUVfUEFHRSA9IFwiSE9NRV9QQUdFXCI7XHJcbiAgICAgICAgICAgIHRoaXNfLlNUT1AgPSBcIlNUT1BcIjtcclxuICAgICAgICAgICAgdGhpc18uTUVOVSA9IFwiTUVOVVwiO1xyXG4gICAgICAgICAgICB0aGlzXy5ERUwgPSBcIkRFTFwiO1xyXG4gICAgICAgICAgICB0aGlzXy5QQUdFRE9XTiA9IFwiUEFHRURPV05cIjtcclxuICAgICAgICAgICAgdGhpc18uUEFHRVVQID0gXCJQQUdFVVBcIjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBrZXkgPSBpcHR2LmtleSA9IHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOaYr+WQpuemgeeUqOaWueWQkeaMiemUru+8jOm7mOiupOS4jeemgeeUqFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZGlzcGxheURpcmU6IGZhbHNlLFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5LiK5LiA5Liq54Sm54K55oyJ6ZSu5pa55ZCRXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBsYXN0RGlyZTogJycsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDmt7vliqDljLrln5/plK7lgLzlr7nosaFcclxuICAgICAgICAgICAgICogQHBhcmFtIGFyZWFOYW1lICDljLrln5/lkI3np7BcclxuICAgICAgICAgICAgICogQHBhcmFtIGtleU9iaiAgICDplK7lgLzlr7nosaFcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGFkZEtleTogZnVuY3Rpb24gKGFyZWFOYW1lLCBrZXlPYmopIHtcclxuICAgICAgICAgICAgICAgIHZhciBpaSA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIGtleU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICsraWk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBrZXlPYmoubGVuZ3RoID0gaWkgKyAxMDAwMDtcclxuICAgICAgICAgICAgICAgIGlwdHYua2V5TGlzdFthcmVhTmFtZSArIFwiXCJdID0ga2V5T2JqO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5qC55o2ua2V55YC877yM6I635Y+Wa2V55YC85a+55LqO55qE5ZCN56ewXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSBrZXlDb2RlICAga2V55YC8XHJcbiAgICAgICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZ2V0S2V5Q29kZU5hbWU6IGZ1bmN0aW9uIChrZXlDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAvL+W+queOr+WMuuWfn1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBpcHR2LmtleUxpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2lpID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAvL+W+queOr+WMuuWfn+WvueW6lOeahOmUruWAvOWvueixoVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGtuIGluIGlwdHYua2V5TGlzdFtpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArK3NpaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlwdHYua2V5TGlzdFtpXVtrbl0gPT0ga2V5Q29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5LiL6Z2i55qE5YGa5rOV5piv5YW85a655Yib57u055qE55uS5a2Q77yM5Zug5Li65LuW5Lus5LiN5pSv5oyB5Y+M6YeN5b6q546v77yM6ZyA6KaB5omL5YqoYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaWkgPj0gKGlwdHYua2V5TGlzdFtpXS5sZW5ndGggLSAxMDAwMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2ZXJzaW9uID0gaXB0di5TVEJUeXBlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+S4uuS6huWFvOWuueWIm+e7tOebkuWtkO+8jOWIm+e7tOebkuWtkOacieeahOmcgOimgeaJi+WKqGJyZWFr5omN6IO96Lez5Ye65YaF6YOo5b6q546v77yM5pyJ55qE5Yib57u055uS5a2Q5Y+N6ICM5omL5YqoYnJlYWvkuobvvIzlsLHkuI3og73ot7Plh7rlvqrnjq/kuobvvIzlpojnmoTlnZHotKdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2ZXJzaW9uICE9IFwiRTExMDBcIiAmJiB2ZXJzaW9uICE9IFwiSVRWMjE4LjFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOagueaNruWtl+espuWMuemFjeWvueW6lOaVsOaNrlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gbnVtX1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgbnVtQ2hhbmdlOiBmdW5jdGlvbiAobnVtXykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG51bSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG51bV8pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiT05FXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVFdPXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW0gPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVEhSRUVcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bSA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJGT1VSXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW0gPSA0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiRklWRVwiIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtID0gNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlNJWFwiIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtID0gNjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlNFVkVOXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW0gPSA3O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiRUlHSFRcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bSA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJOSU5FXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW0gPSA5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiWkVST1wiIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkRFTFwiIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtID0gXCJERUxcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlwdHYuaXNGdW5jdGlvbihpcHR2LmtleS5udW1FdmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpcHR2LmtleS5udW1FdmVudChudW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5pa55ZCR5YW35L2T5aSE55CG57uG6IqCXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSBkaXJlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBkaXJlSGFuZGxlOiBmdW5jdGlvbiAoZGlyZSkge1xyXG4gICAgICAgICAgICAgICAga2V5Lmxhc3REaXJlID0gZGlyZTtcclxuICAgICAgICAgICAgICAgIHZhciBmRGlyZXMgPSBmb2N1c0RpcmVzW2tleS5jdXJGb2N1cy5pZF07XHJcbiAgICAgICAgICAgICAgICBpZiAoZkRpcmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g55Sx5LqO5b2T5YmN5pa55rOV5piv55So5p2l5b6A5Y+z56e75Yqo55qE77yM5Y+q6ZyA5Yik5pat5piv5ZCm5pyJ5Y+z5pa555qEZm9jdXNJRFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOW9k+WJjeeEpueCue+8jOW+gOafkOaWueWQkeaMiemUruaXtuWFt+acieS8mOWFiOaJp+ihjO+8jOWmguaenOaMh+WumuS6huaWueWQkeS6i+S7tu+8jOWwseS4jeS8muWIh+aNouW9k+WJjeeEpueCue+8jOiAjOWOu+aJp+ihjOS6i+S7tlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmRGlyZXNbZGlyZSArIFwiRXZlbnRcIl0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5LmV4ZUNvZGUoZkRpcmVzW2RpcmUgKyBcIkV2ZW50XCJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZkRpcmVzW2RpcmVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOW+gOS4i+enu+WKqOiiq+i1i+WAvOS6hmRpc2FibGXor7TmmI7llaXpg73kuI3mk43kvZxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZEaXJlc1tkaXJlXSA9PSBcImRpc2FibGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5Lmxhc3REaXJlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDpgJrov4dmb2N1c0lE5om+5Yiw54Sm54K55a+56LGhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0Tm9kZSA9IGlwdHYoXCIjXCIgKyBmRGlyZXNbZGlyZV0pLmdldEZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0Tm9kZSAmJiBuZXh0Tm9kZS5lbkZvY3VzID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleS5jaGFuZ2VGb2N1cyhmRGlyZXNbZGlyZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzljp/mnKzorr7nva7nmoTmjInpkq7ooqvnpoHnlKjkuobvvIzlgJjoi6Xorr7nva7kuoZkb3duT3RoZXLlgLzvvIzlsLHorqnmraTmjInpkq7ojrflvpfnhKbngrlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuZXh0Tm9kZSAmJiBuZXh0Tm9kZS5lbkZvY3VzID09IGZhbHNlICYmIGZEaXJlc1tkaXJlICsgXCJPdGhlckV2ZW50XCJdKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5LmV4ZUNvZGUoZkRpcmVzW2RpcmUgKyBcIk90aGVyRXZlbnRcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5leHROb2RlICYmIG5leHROb2RlLmVuRm9jdXMgPT0gZmFsc2UgJiYgZkRpcmVzW2RpcmUgKyBcIk90aGVyXCJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDpgJrov4dmb2N1c0lE5om+5Yiw54Sm54K55a+56LGhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3RoZXJOb2RlID0gaXB0dihcIiNcIiArIGZEaXJlc1tkaXJlICsgXCJPdGhlclwiXSkuZ2V0Rm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvdGhlck5vZGUgJiYgb3RoZXJOb2RlLmVuRm9jdXMgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleS5jaGFuZ2VGb2N1cyhmRGlyZXNbZGlyZSArIFwiT3RoZXJcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghbmV4dE5vZGUgJiYgZkRpcmVzW2RpcmUgKyBcIk5vRXZlbnRcIl0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5Y+z6L655Yi25a6a5LqGbGVmdOeEpueCue+8jOS9huaYr+i/meS4qmxlZnTnhKbngrnkuI3lnKjnhKbngrnmsaDkuK3vvIzlj6/ku6Xoh6rlrprkuYnkuovku7ZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleS5leGVDb2RlKGZEaXJlc1tkaXJlICsgXCJOb0V2ZW50XCJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghbmV4dE5vZGUgJiYgZkRpcmVzW2RpcmUgKyBcIk5vXCJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDpgJrov4dmb2N1c0lE5om+5Yiw54Sm54K55a+56LGhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3RoZXJOb2RlID0gaXB0dihcIiNcIiArIGZEaXJlc1tkaXJlICsgXCJOb1wiXSkuZ2V0Rm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvdGhlck5vZGUgJiYgb3RoZXJOb2RlLmVuRm9jdXMgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleS5jaGFuZ2VGb2N1cyhmRGlyZXNbZGlyZSArIFwiTm9cIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZkRpcmVzLm90aGVyRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5LmV4ZUNvZGUoZkRpcmVzLm90aGVyRXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmRGlyZXMub3RoZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZEaXJlcy5vdGhlciA9PSBcImRpc2FibGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5Lmxhc3REaXJlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDpgJrov4dmb2N1c0lE5om+5Yiw54Sm54K55a+56LGhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0Tm9kZSA9IGlwdHYoXCIjXCIgKyBmRGlyZXMub3RoZXIpLmdldEZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0Tm9kZSAmJiBuZXh0Tm9kZS5lbkZvY3VzID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleS5jaGFuZ2VGb2N1cyhmRGlyZXMub3RoZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAga2V5Lmxhc3REaXJlID0gXCJcIjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOS4iuS4i+W3puWPs+aOp+WItuWFt+S9k+aWueWQkeWkhOeQhuWHveaVsFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gZGlyZVR5cGVcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGZvY3VzSGFuZDogZnVuY3Rpb24gKGRpcmVUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5LmRpc3BsYXlEaXJlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkaXJlVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVVBcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJET1dOXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiTEVGVFwiIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlJJR0hUXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5LmRpcmVIYW5kbGUoZGlyZVR5cGUudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOWIh+aNoueEpueCueaWueazlVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gZm9jdXNJZF9cclxuICAgICAgICAgICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBjaGFuZ2VGb2N1czogZnVuY3Rpb24gKGZvY3VzSWRfKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDpgJrov4dmb2N1c0lE5om+5Yiw54Sm54K55a+56LGhXHJcbiAgICAgICAgICAgICAgICB2YXIgbmV4dE5vZGUgPSBpcHR2KFwiI1wiICsgZm9jdXNJZF8pLmdldEZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV4dE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2xkRm9jdXMgPSBrZXkuY3VyRm9jdXM7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lnKjorqnogIHnhKbngrnlpLHljrvnhKbngrnkuYvliY3vvIzlkYror4nogIHnhKbngrnkuIvkuIDkuKrlvZPliY3nhKbngrnnmoRpZFxyXG4gICAgICAgICAgICAgICAgICAgIG9sZEZvY3VzLm5leHRGb2N1c0lkID0gZm9jdXNJZF87XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5YiH5o2i5paw54Sm54K55LmL5YmN77yM6ZyA6KaB5omn6KGM5aSx5Y6754Sm54K55LqL5Lu2XHJcbiAgICAgICAgICAgICAgICAgICAgb2xkRm9jdXMub25CbHVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpZCA9IG9sZEZvY3VzLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOe7meW9k+WJjeeEpueCuemHjeaWsOi1i+WAvFxyXG4gICAgICAgICAgICAgICAgICAgIGtleS5jdXJGb2N1cyA9IG5leHROb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5Zyo6K6p5paw54Sm54K56I635Y+W54Sm54K55LmL5YmN77yM5ZGK6K+J5paw54Sm54K55LiK5LiA5Liq54Sm54K555qEaWRcclxuICAgICAgICAgICAgICAgICAgICBrZXkuY3VyRm9jdXMubGFzdEZvY3VzSWQgPSBmaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5LmN1ckZvY3VzLm9uRm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dE5vZGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOi3s+i9rOmTvuaOpVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICByZWRpcmVjdDogZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVybCAmJiBpcHR2LnRyaW0odXJsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOemgeeUqOS6huaMiemUru+8jOWwseS4jeaJp+ihjFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkuY3VyRm9jdXMuZW5hYmxlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aaC5p6c5omn6KGM5LqG6aG16Z2i6Lez6L2s77yM5bCx56aB5q2i5YaN5qyh54K55Ye76Lez6L2sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleS5jdXJGb2N1cy5lbmFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5omn6KGMSmF2YVNjcmlwdOS7o+eggVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gX2NvZGVcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGV4ZUNvZGU6IGZ1bmN0aW9uIChfY29kZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvZGUgPSBfY29kZTtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXB0di50eXBlKF9jb2RlKSA9PT0gXCJzdHJpbmdcIiAmJiBpcHR2LnRyaW0oX2NvZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29kZS5pbmRleE9mKFwiamF2YXNjcmlwdDpcIikgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoXCJqYXZhc2NyaXB0OlwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmFsKGNvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb2RlLmluZGV4T2YoXCJodHRwOi8vXCIpID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXkucmVkaXJlY3QoY29kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXB0di50eXBlKF9jb2RlKSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29kZS5jYWxsKGtleS5jdXJGb2N1cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpcHR2LmVycm9yKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICA7XHJcblxyXG4gICAgLy/mt7vliqDluLjnlKjplK7lgLzlr7nosaFcclxuICAgIGtleS5hZGRLZXkoXCJISFwiLCB7XHJcbiAgICAgICAgVVA6IDM4LFxyXG4gICAgICAgIERPV046IDQwLFxyXG4gICAgICAgIExFRlQ6IDM3LFxyXG4gICAgICAgIFJJR0hUOiAzOSxcclxuICAgICAgICBPSzogMTMsXHJcbiAgICAgICAgQkFDSzogOCxcclxuICAgICAgICBaRVJPOiA0OCxcclxuICAgICAgICBPTkU6IDQ5LFxyXG4gICAgICAgIFRXTzogNTAsXHJcbiAgICAgICAgVEhSRUU6IDUxLFxyXG4gICAgICAgIEZPVVI6IDUyLFxyXG4gICAgICAgIEZJVkU6IDUzLFxyXG4gICAgICAgIFNJWDogNTQsXHJcbiAgICAgICAgU0VWRU46IDU1LFxyXG4gICAgICAgIEVJR0hUOiA1NixcclxuICAgICAgICBOSU5FOiA1NyxcclxuICAgICAgICBERUw6IDQ2LFxyXG4gICAgICAgIFBBR0VET1dOOiAzNCxcclxuICAgICAgICBQQUdFVVA6IDMzXHJcbiAgICB9KTtcclxuICAgIC8v5re75Yqg5Y2O5Li65py66aG255uSXHJcbiAgICBrZXkuYWRkS2V5KFwiSFdcIiwge1xyXG4gICAgICAgIFVQOiAzOCxcclxuICAgICAgICBET1dOOiA0MCxcclxuICAgICAgICBMRUZUOiAzNyxcclxuICAgICAgICBSSUdIVDogMzksXHJcbiAgICAgICAgT0s6IDEzLFxyXG4gICAgICAgIEJBQ0s6IDgsXHJcbiAgICAgICAgWkVSTzogNDgsXHJcbiAgICAgICAgT05FOiA0OSxcclxuICAgICAgICBUV086IDUwLFxyXG4gICAgICAgIFRIUkVFOiA1MSxcclxuICAgICAgICBGT1VSOiA1MixcclxuICAgICAgICBGSVZFOiA1MyxcclxuICAgICAgICBTSVg6IDU0LFxyXG4gICAgICAgIFNFVkVOOiA1NSxcclxuICAgICAgICBFSUdIVDogNTYsXHJcbiAgICAgICAgTklORTogNTcsXHJcbiAgICAgICAgREVMOiAxMTMxLFxyXG4gICAgICAgIFBBR0VET1dOOiAzNCxcclxuICAgICAgICBQQUdFVVA6IDMzXHJcbiAgICB9KTtcclxuICAgIC8v5re75Yqg5Y2X5Lqs5bm/55S15py66aG255uSXHJcbiAgICBrZXkuYWRkS2V5KFwiTkpHRFwiLCB7QkFDSzogNjQwLCBIT01FX1BBR0U6IDExMywgT1VUX1BBR0U6IDExNCwgREVMOiAxMjd9KTtcclxuICAgIC8v5re75Yqg5YyX5Lqs5q2M5Y2O5py66aG255uSXHJcbiAgICBrZXkuYWRkS2V5KFwiQkpHSFwiLCB7XHJcbiAgICAgICAgVVA6IDEsXHJcbiAgICAgICAgRE9XTjogMixcclxuICAgICAgICBMRUZUOiAzLFxyXG4gICAgICAgIFJJR0hUOiA0LFxyXG4gICAgICAgIE9LOiAxMyxcclxuICAgICAgICBCQUNLOiAzNDAsXHJcbiAgICAgICAgWkVSTzogNDgsXHJcbiAgICAgICAgT05FOiA0OSxcclxuICAgICAgICBUV086IDUwLFxyXG4gICAgICAgIFRIUkVFOiA1MSxcclxuICAgICAgICBGT1VSOiA1MixcclxuICAgICAgICBGSVZFOiA1MyxcclxuICAgICAgICBTSVg6IDU0LFxyXG4gICAgICAgIFNFVkVOOiA1NSxcclxuICAgICAgICBFSUdIVDogNTYsXHJcbiAgICAgICAgTklORTogNTcsXHJcbiAgICAgICAgT1VUX1BBR0U6IDMzOSxcclxuICAgICAgICBIT01FX1BBR0U6IDUxMixcclxuICAgICAgICBTVE9QOiAxMDI1LFxyXG4gICAgICAgIE1FTlU6IDUxM1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54Sm54K55p6E6YCg5Ye95pWwXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgaXB0di5Gb2N1c01vZGVsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB0aGlzXyA9IHRoaXM7XHJcbiAgICAgICAgLy8g54Sm54K55o+P6L+w5ZCN56ewXHJcbiAgICAgICAgdGhpc18ubmFtZSA9ICcnO1xyXG4gICAgICAgIC8vIOaYr+WQpuW8gOWQr+aMiW9r6ZSuXHJcbiAgICAgICAgdGhpc18uZW5hYmxlID0gdHJ1ZTtcclxuICAgICAgICAvLyDmmK/lkKblhYHorrjmraTnhKbngrnlr7nosaHojrflvpfnhKbngrlcclxuICAgICAgICB0aGlzXy5lbkZvY3VzID0gdHJ1ZTtcclxuICAgICAgICAvL+ivpeaMiemSruaYr+WQpuiiq+W9k+WJjemhtemdoueUn+aIkO+8jOm7mOiupOacqueUn+aIkO+8jOS9nOeUqOmYsuatouW8gOWPkeiAheebtOaOpW5ldyBGb2N1c01vZGVsKClcclxuICAgICAgICB0aGlzXy5pc0NyZWF0ZWQgPSBmYWxzZTtcclxuICAgICAgICAvLyDnhKbngrnnvJblj7fvvIzliKTmlq3mmK/lkKblkIzkuIDkuKrnhKbngrks6Z2e56m6XHJcbiAgICAgICAgdGhpc18uaWQgPSBcIlwiO1xyXG4gICAgICAgIC8vIOWwhuiHquW3seeahOWvueixoei1i+e7meatpOWxnuaAp1xyXG4gICAgICAgIHRoaXNfLm93biA9IHRoaXNfO1xyXG4gICAgICAgIC8v5Z2Q5qCHXHJcbiAgICAgICAgdGhpc18uWF9Qb3NpID0gMDtcclxuICAgICAgICB0aGlzXy5ZX1Bvc2kgPSAwO1xyXG4gICAgICAgIHRoaXNfLmZvY3VzVHlwZSA9IDc7XHJcbiAgICAgICAgLy/mjIflkJHnmoTlm77niYfnmoRpZFxyXG4gICAgICAgIHRoaXNfLmltZ0lEID0gXCJcIjtcclxuICAgICAgICAvLyDlm77niYfliIfmjaLkvb/nlKjvvIzmlrDlm77niYflnLDlnYBcclxuICAgICAgICB0aGlzXy5uZXdTd2FwID0gXCJcIjtcclxuICAgICAgICAvLyDljp/lp4vlm77niYdcclxuICAgICAgICB0aGlzXy5vbGRTd2FwID0gXCJcIjtcclxuICAgICAgICAvLyDlvZPliY3nhKbngrnkuIrkuIvlt6blj7PvvIzlm5vkuKrmlrnlkJHlupTor6XotbDnmoRmb2N1c0lE5pWw57uEXHJcbiAgICAgICAgdGhpc18uZGllQXJyID0gbnVsbDtcclxuICAgICAgICAvLyDlr7nlupTnmoRET03lr7nosaFcclxuICAgICAgICB0aGlzXy5ub2RlT2JqID0gbnVsbDtcclxuICAgICAgICAvLyDkuLTml7bmlbDmja7lgqjlrZhcclxuICAgICAgICB0aGlzXy50ZW1wRGF0YSA9IG51bGw7XHJcbiAgICAgICAgLy8g5Zyo6buY6K6k6I635b6X54Sm54K55LqL5Lu25LiK5re75Yqg5YW25LuW5omn6KGM5LqL5Lu2XHJcbiAgICAgICAgdGhpc18ub25Gb2N1c0V2ZW50ID0gXCJcIjtcclxuICAgICAgICAvLyDlnKjpu5jorqTlpLHljrvnhKbngrnkuovku7bkuIrmt7vliqDpop3lpJbnmoTmiafooYzkuovku7ZcclxuICAgICAgICB0aGlzXy5vbkJsdXJFdmVudCA9IFwiXCI7XHJcbiAgICAgICAgLy8g5oyJ56Gu5a6a55qE6Lez6L2s5Zyw5Z2AXHJcbiAgICAgICAgdGhpc18uY2xpY2tFdmVudCA9IFwiXCI7XHJcbiAgICAgICAgdGhpc18uaW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgICAgIC8v54Sm54K56I635Y+W54Sm54K55pe277yM5Zu+5qCH5Y+Y5aSn55qE5aSn5bCP77yM6buY6K6kMjBcclxuICAgICAgICB0aGlzXy5jaGFuZ2VTaXplID0gMTA7XHJcbiAgICAgICAgLy/np7vliqjpgInkuK3moYbvvIzmraTpgInkuK3moYbmmK/nlKjmiLfoh6rlt7HlnKhodG1s5Lit5YaZ5Ye677yM5bm25oyH5a6aaWQs5a+55bqU5pWI5p6c55+l6K+G56e75Yqo6YCJ5Lit5qGG5L2N572u77yM5LiN5a2Y5Zyo5Yqo55S777yM5a+55bqUZm9jdXNUeXBl5Li6MTBcclxuICAgICAgICB0aGlzXy5zZWxlY3RCb3JkZXJJZCA9ICcnO1xyXG4gICAgICAgIC8v56e75Yqo6YCJ5Lit5qGGaWQs5q2k6YCJ5Lit5qGG5piv5Luj56CB6Ieq5Yqo55Sf5oiQ55qE5YWD57Sg77yM5a+55bqU5pWI5p6c6YCJ5Lit5qGG5pS+5aSn5LiO5bmz56e75Yqo55S777yM5a+55bqUZm9jdXNUeXBl5Li6MTXmiJYxNlxyXG4gICAgICAgIHRoaXNfLnNlbGVjdGlvbklEID0gXCJzZWxlY3Rpb25JRFwiO1xyXG4gICAgICAgIC8v56e75Yqo6YCJ5Lit5qGGaWTvvIzmraTpgInkuK3moYbmmK/nlKjmiLfoh6rlt7HopoHlnKhodG1s5Lit5oyH5a6a5YWD57Sg55qEaWTvvIzlr7nlupTmlYjmnpzmmK/lubPnp7vpgInkuK3moYbvvIzkuI3lrZjlnKjmlL7lpKfliqjnlLvvvIzkuI5zZWxlY3RCb3JkZXJJZOeahOWMuuWIq+WwseaYr+Wug+aYr+aOp+WItuS9jee9ruayoeacieWKqOeUu++8jHNlbGVjdGlvbk9iaklk5piv5o6n5Yi25L2N572u5pyJ5Yqo55S777yM5a+55bqUZm9jdXNUeXBlSWTkuLoxN1xyXG4gICAgICAgIHRoaXNfLnNlbGVjdGlvbk9iaklEID0gXCJzZWxlY3Rpb25PYmpJRFwiO1xyXG4gICAgICAgIC8v5a+55bqU5bGV56S65Zu+54mH55qE5bGC5qyh5aSn5bCPXHJcbiAgICAgICAgdGhpc18uZm9jdXNJbWdaSW5kZXggPSA5OTg7XHJcbiAgICAgICAgLy/lr7nlupTlsZXnpLrlm77niYfnmoTniLbnuqflhYPntKDnmoTlsYLmrKHlpKflsI9cclxuICAgICAgICB0aGlzXy5mb2N1c0ltZ1BhcmVudFpJbmRleCA9IDk5ODtcclxuICAgICAgICAvL+WvueW6lOeEpueCueWGhemDqOWbvueJh+eahOWxguasoeWkp+Wwj1xyXG4gICAgICAgIHRoaXNfLmltZ1pJbmRleCA9IDk5OTtcclxuICAgICAgICAvL+WvueW6lOeEpueCueWGhemDqOWbvueJh+eahOeItue6p+WFg+e0oOeahOWxguasoeWkp+Wwj1xyXG4gICAgICAgIHRoaXNfLmltZ1BhcmVudFpJbmRleCA9IDk5OTtcclxuICAgICAgICAvL+eEpueCueeahOeItuiKgueCueeahElE5YC8XHJcbiAgICAgICAgdGhpc18udXBQYXJlbnRJZCA9ICcnO1xyXG4gICAgICAgIC8v55So5LqO5o6n5Yi25Y+v6KeC55yL5Yy65Z+f55qE6IqC54K5SUTlgLxcclxuICAgICAgICB0aGlzXy51cEFyZWFJZCA9ICcnO1xyXG4gICAgICAgIHRoaXNfLnJpZ2h0QXJlYUlkID0gJyc7XHJcbiAgICAgICAgdGhpc18ucmlnaHRQYXJlbnRJZCA9ICcnO1xyXG4gICAgICAgIC8v5piv5ZCm5byA5ZCv54i25a655Zmo5rua5Yqo77yM6buY6K6k5Li6ZmFsc2XvvIzkuI3mu5rliqhcclxuICAgICAgICB0aGlzXy5lblVwUGFyZW50Um9sbCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXNfLmVuUmlnaHRQYXJlbnRSb2xsID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8v5byA5ZCv5pW06aG15rua5YqoXHJcbiAgICAgICAgdGhpc18uZW5SaWdodFBhZ2VSb2xsID0gZmFsc2U7XHJcbiAgICAgICAgLy/lvZPliY3nhKbngrnntKLlvJVcclxuICAgICAgICB0aGlzXy5mb2N1c0luZGV4ID0gMDtcclxuICAgICAgICAvL+W9k+WJjeeEpueCueWvueW6lOeahOW9k+WJjemhtVxyXG4gICAgICAgIHRoaXNfLmZvY3VzQ3VyUGFnZU51bSA9IDA7XHJcbiAgICAgICAgLy/lvZPliY3nhKbngrnlr7nlupTnmoTmgLvpobXmlbBcclxuICAgICAgICB0aGlzXy5mb2N1c0FsbFBhZ2VOdW0gPSAwO1xyXG4gICAgICAgIC8v5b2T5YmN54Sm54K56ZyA6KaB5pW06aG15rua5Yqo55qEbGVmdOWAvFxyXG4gICAgICAgIHRoaXNfLmZvY3VzTGVmdFJvbGwgPSAwO1xyXG4gICAgICAgIC8v5b2T5YmN54Sm54K55YiX6KGo5Lit56ys5LiA5Liq54Sm54K555qEbGVmdOWAvFxyXG4gICAgICAgIHRoaXNfLmZvY3VzRmlyc3RMZWZ0ID0gMDtcclxuICAgICAgICAvL+W9k+WJjeeEpueCueWvueW6lOmhteeggeeahOaJgOacieeEpueCuWlkLOivpeWAvOS4uuaVsOe7hOWvueixoVxyXG4gICAgICAgIHRoaXNfLmZvY3VzUGFnZUFsbE1vZGVsID0gbnVsbDtcclxuICAgICAgICAvL+W9k+WJjeeEpueCueWvueW6lOmhteeggeeahOaJgOacieeEpueCueWbvueJh+aYr+WQpuW3sue7j+WKoOi9vei/h1xyXG4gICAgICAgIHRoaXNfLmZvY3VzUGFnZUFsbExvYWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzXy5sYXN0Rm9jdXNJZCA9ICcnO1xyXG5cclxuXHJcbiAgICAgICAgdGhpc18uaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAga2V5LmN1ckZvY3VzID0gdGhpc18ub3duO1xyXG4gICAgICAgICAgICAvL+WkhOeQhueItuWuueWZqOa7muWKqFxyXG4gICAgICAgICAgICBpZiAodGhpc18uZW5VcFBhcmVudFJvbGwgfHwgdGhpc18uZW5SaWdodFBhcmVudFJvbGwpIHtcclxuICAgICAgICAgICAgICAgIC8v6I635Y+W54i25a655ZmoSURcclxuICAgICAgICAgICAgICAgIHZhciB1cFBhcmVudElkID0gdGhpc18udXBQYXJlbnRJZDtcclxuICAgICAgICAgICAgICAgIC8v5o6n5Yi25Y+v6KeC55yL5Yy65Z+f5a655Zmo55qESURcclxuICAgICAgICAgICAgICAgIHZhciB1cEFyZWFJZCA9IHRoaXNfLnVwQXJlYUlkO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciByaWdodFBhcmVudElkID0gdGhpc18ucmlnaHRQYXJlbnRJZDtcclxuICAgICAgICAgICAgICAgIHZhciByaWdodEFyZWFJZCA9IHRoaXNfLnJpZ2h0QXJlYUlkO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB1cFBhcmVudE9iaiA9IGlwdHYuJCh1cFBhcmVudElkKTtcclxuICAgICAgICAgICAgICAgIHZhciB1cEFyZWFPYmogPSBpcHR2LiQodXBBcmVhSWQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJpZ2h0UGFyZW50T2JqID0gaXB0di4kKHJpZ2h0UGFyZW50SWQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJpZ2h0QXJlYU9iaiA9IGlwdHYuJChyaWdodEFyZWFJZCk7XHJcbiAgICAgICAgICAgICAgICAvL+WmguaenOaYr+aMieS4iuaIluaMieS4i++8jOWPquS8mueUqOWIsHJpZ2h0UGFyZW50SWTlkoxyaWdodEFyZWFJZFxyXG4gICAgICAgICAgICAgICAgaWYgKGtleS5sYXN0RGlyZSA9PSAnZG93bicgJiYgdGhpc18uZW5VcFBhcmVudFJvbGwgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6aG16Z2i6KKr5rua5Y6755qE6auY5bqmXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdmFyIHBhclJvbGxIZWlnaHQgPSBhcmVhT2JqLnNjcm9sbFRvcCB8fCBwYXJzZUludChwYXJlbnRPYmouc3R5bGUudG9wKSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJSb2xsSGVpZ2h0ID0gTWF0aC5hYnMocGFyc2VJbnQodXBQYXJlbnRPYmouc3R5bGUudG9wKSkgfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICAvL+WPr+ingueci+WMuuWfn+WuueWZqOWunumZheWPr+WtmOaUvuWGheWuueeahOmrmOW6plxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJIZWlnaHQgPSB1cEFyZWFPYmouY2xpZW50SGVpZ2h0IHx8IHBhcnNlSW50KHVwQXJlYU9iai5zdHlsZS5oZWlnaHQpIHx8IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/nhKbngrnnmoR0b3DlgLxcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9jdXNUb3AgPSBwYXJzZUludCh0aGlzXy5ZX1Bvc2kpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5rKh5pyJ5omL5Yqo6LWL5YC877yM6YKj5LmI5bCx6I635Y+WdG9w5YC8XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlwdHYuaXNOdWxsKGZvY3VzVG9wKSB8fCBmb2N1c1RvcCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzVG9wID0gdGhpc18ubm9kZU9iaiA/IE1hdGguYWJzKHBhcnNlSW50KHRoaXNfLm5vZGVPYmouc3R5bGUudG9wKSkgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+eEpueCueWunumZheWNoOS9jemrmOW6plxyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIGZvY3VzSGVpZ2h0ID0gdGhpc18ubm9kZU9iaiA/IHRoaXNfLm5vZGVPYmoub2Zmc2V0SGVpZ2h0IDogcGFyc2VJbnQodGhpc18ubm9kZU9iai5zdHlsZS5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb2N1c0hlaWdodCA9IHRoaXNfLm5vZGVPYmogPyBwYXJzZUludCh0aGlzXy5ub2RlT2JqLnN0eWxlLmhlaWdodCkgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6KKr5rua5Y6755qE6auY5bqmK+eItuWuueWZqOWunumZheWPr+WtmOaUvuWGheWuueeahOmrmOW6plxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJBID0gcGFyUm9sbEhlaWdodCArIHBhckhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAvL+eEpueCueeahFRPUOWAvCvnhKbngrnlrp7pmYXljaDkvY3nmoTpq5jluqZcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9jQiA9IGZvY3VzVG9wICsgZm9jdXNIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzlkI7ogIXlpKfkuo7liY3ogIXvvIzpgqPkuYjor7TmmI7lvZPliY3nhKbngrnlnKjlj6/op4Llr5/ljLrln5/nmoTkuIvpnaLvvIzmiYDku6Xov5nml7bpnIDopoHogIPomZHniLblrrnlmajpnIDopoHlvoDkuIvmu5rlpJrlsJHot53nprvvvIzmiY3og73orqnlvZPliY3nhKbngrnooqvmmL7npLrlh7rmnaVcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyQSA8IGZvY0IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/ojrflj5blvZPliY3nhKbngrnooqvpga7mjKHnmoTpq5jluqYr5b2T5YmN54i25a655Zmo5bey57uP5rua5Y6755qE6auY5bqm77yM5bCx6IO95b6X5Yiw546w5Zyo54i25a655Zmo6ZyA6KaB5oC755qE5rua5Yqo6auY5bqmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb2xsSGVpZ2h0ID0gZm9jQiAtIHBhckEgKyBwYXJSb2xsSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cFBhcmVudE9iai5zdHlsZS50b3AgPSBcIi1cIiArIHJvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKirlt6blj7PkuIrkuIvmu5rliqjpnIDopoHnu5/kuIDnm5HmjqfvvIznlKjkuo7liqjmgIHliqDovb3lm77niYfvvIznm67liY3ml7bpl7Tpl67popjvvIzmsqHmnInnu6fnu63lvIDlj5HvvIzmraTlpITnlZnlgZrlkI7mnJ/ljYfnuqcqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5Lmxhc3REaXJlID09ICd1cCcgJiYgdGhpc18uZW5VcFBhcmVudFJvbGwgPT0gdHJ1ZSB8fCBrZXkubGFzdERpcmUgPT0gJ3JpZ2h0JyAmJiB0aGlzXy5lblVwUGFyZW50Um9sbCA9PSB0cnVlIHx8IGtleS5sYXN0RGlyZSA9PSAnZG93bicgJiYgdGhpc18uZW5VcFBhcmVudFJvbGwgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6aG16Z2i6KKr5rua5Y6755qE6auY5bqmXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdmFyIHBhclJvbGxIZWlnaHQgPSBhcmVhT2JqLnNjcm9sbFRvcCB8fCBwYXJzZUludChwYXJlbnRPYmouc3R5bGUudG9wKSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJSb2xsSGVpZ2h0ID0gTWF0aC5hYnMocGFyc2VJbnQodXBQYXJlbnRPYmouc3R5bGUudG9wKSkgfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICAvL+eEpueCueeahHRvcOWAvFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb2N1c1RvcCA9IHBhcnNlSW50KHRoaXNfLllfUG9zaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzmsqHmnInmiYvliqjotYvlgLzvvIzpgqPkuYjlsLHojrflj5Z0b3DlgLxcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXB0di5pc051bGwoZm9jdXNUb3ApIHx8IGZvY3VzVG9wID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNUb3AgPSB0aGlzXy5ub2RlT2JqID8gTWF0aC5hYnMocGFyc2VJbnQodGhpc18ubm9kZU9iai5zdHlsZS50b3ApKSA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8v6aG16Z2i6KKr5rua5Y6755qE6auY5bqmXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhckEgPSBwYXJSb2xsSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIC8v54Sm54K555qEVE9Q5YC8XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvY0IgPSBmb2N1c1RvcDtcclxuICAgICAgICAgICAgICAgICAgICAvL+WmguaenOeEpueCueeahFRPUOWAvOWwj+S6juW9k+WJjeiiq+a7muWOu+eahOmrmOW6pu+8jOmCo+S5iOivtOaYjuatpOaXtumcgOimgeW+gOS4i+a7mlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJBID4gZm9jQikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WmguaenOmcgOimgeeItuWuueWZqOW+gOS4i+a7mu+8jOmCo+S5iOa7muWOu+eahOmrmOW6puWwseaYr+eEpueCueeahFRPUOWAvFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9sbEhlaWdodCA9IGZvY0I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwUGFyZW50T2JqLnN0eWxlLnRvcCA9IFwiLVwiICsgcm9sbEhlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKuW3puWPs+S4iuS4i+a7muWKqOmcgOimgee7n+S4gOebkeaOp++8jOeUqOS6juWKqOaAgeWKoOi9veWbvueJh++8jOebruWJjeaXtumXtOmXrumimO+8jOayoeaciee7p+e7reW8gOWPke+8jOatpOWkhOeVmeWBmuWQjuacn+WNh+e6pyoqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpcHR2Lmxhc3REaXJlID09ICdyaWdodCcgJiYgdGhpc18uZW5SaWdodFBhcmVudFJvbGwgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6aG16Z2i6KKr5rua5Y6755qE5a695bqmXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhclJvbGxXaWR0aCA9IE1hdGguYWJzKHBhcnNlSW50KHJpZ2h0UGFyZW50T2JqLnN0eWxlLmxlZnQpKSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5Y+v6KeC55yL5Yy65Z+f5a655Zmo5a6e6ZmF5Y+v5a2Y5pS+5YaF5a6555qE6auY5bqmXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcldpZHRoID0gcmlnaHRBcmVhT2JqLmNsaWVudFdpZHRoIHx8IHBhcnNlSW50KHJpZ2h0QXJlYU9iai5zdHlsZS53aWR0aCkgfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICAvL+eEpueCueeahGxlZnTlgLxcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9jdXNMZWZ0ID0gcGFyc2VJbnQodGhpc18uWF9Qb3NpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+WmguaenOayoeacieaJi+WKqOi1i+WAvO+8jOmCo+S5iOWwseiOt+WPlmxlZnTlgLxcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXB0di5pc051bGwoZm9jdXNMZWZ0KSB8fCBmb2N1c0xlZnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c0xlZnQgPSB0aGlzXy5ub2RlT2JqID8gTWF0aC5hYnMocGFyc2VJbnQodGhpc18ubm9kZU9iai5zdHlsZS5sZWZ0KSkgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+eEpueCueWunumZheWNoOS9jeWuveW6plxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHZhciBmb2N1c1dpZHRoID0gdGhpc18ubm9kZU9iaiA/IHRoaXNfLm5vZGVPYmoub2Zmc2V0V2lkdGggOiBwYXJzZUludCh0aGlzXy5ub2RlT2JqLnN0eWxlLndpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9jdXNXaWR0aCA9IHRoaXNfLm5vZGVPYmogPyBwYXJzZUludCh0aGlzXy5ub2RlT2JqLnN0eWxlLndpZHRoKSA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/ooqvmu5rljrvnmoTlrr3luqYr54i25a655Zmo5a6e6ZmF5Y+v5a2Y5pS+5YaF5a6555qE5a695bqmXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhckEgPSBwYXJSb2xsV2lkdGggKyBwYXJXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAvLy/pobXpnaLooqvmu5rljrvnmoTlrr3luqZcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyQiA9IHBhclJvbGxXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAvL+eEpueCueeahExFRlTlgLwr54Sm54K55a6e6ZmF5Y2g5L2N55qE5a695bqmXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvY0IgPSBmb2N1c0xlZnQgKyBmb2N1c1dpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5ZCO6ICF5aSn5LqO5YmN6ICF77yM6YKj5LmI6K+05piO5b2T5YmN54Sm54K55Zyo5Y+v6KeC5a+f5Yy65Z+f55qE5Y+z6L6577yM5omA5Lul6L+Z5pe26ZyA6KaB6ICD6JmR54i25a655Zmo6ZyA6KaB5b6A5bem5rua5aSa5bCR6Led56a777yM5omN6IO96K6p5b2T5YmN54Sm54K56KKr5pi+56S65Ye65p2lXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhckEgPCBmb2NCKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6I635Y+W5b2T5YmN54Sm54K56KKr6YGu5oyh55qE5a695bqmK+W9k+WJjeeItuWuueWZqOW3sue7j+a7muWOu+eahOWuveW6pu+8jOWwseiDveW+l+WIsOeOsOWcqOeItuWuueWZqOmcgOimgeaAu+eahOa7muWKqOWuveW6plxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9sbFdpZHRoID0gZm9jQiAtIHBhckEgKyBwYXJSb2xsV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0UGFyZW50T2JqLnN0eWxlLmxlZnQgPSBcIi1cIiArIHJvbGxXaWR0aCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKuW3puWPs+S4iuS4i+a7muWKqOmcgOimgee7n+S4gOebkeaOp++8jOeUqOS6juWKqOaAgeWKoOi9veWbvueJh++8jOebruWJjeaXtumXtOmXrumimO+8jOayoeaciee7p+e7reW8gOWPke+8jOatpOWkhOeVmeWBmuWQjuacn+WNh+e6pyoqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJCID4gZm9jQikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+iiq+a7muWOu+eahOWuveW6puWkp+S6jueEpueCuWxlZnTlgLwr5Y2g5L2N5a695bqmLOivtOaYjueEpueCueWujOWFqOiiq+mBrueblizpgqPkuYjniLblrrnlmajmiYDpnIDopoHlkJHlt6bmu5rliqjnmoTlrr3luqblsLHnrYnkuo7lvZPliY3nhKbngrnnmoRsZWZ05YC8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb2xsV2lkdGggPSBmb2N1c0xlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0UGFyZW50T2JqLnN0eWxlLmxlZnQgPSBcIi1cIiArIHJvbGxXaWR0aCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKuW3puWPs+S4iuS4i+a7muWKqOmcgOimgee7n+S4gOebkeaOp++8jOeUqOS6juWKqOaAgeWKoOi9veWbvueJh++8jOebruWJjeaXtumXtOmXrumimO+8jOayoeaciee7p+e7reW8gOWPke+8jOatpOWkhOeVmeWBmuWQjuacn+WNh+e6pyoqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpcHR2Lmxhc3REaXJlID09ICdsZWZ0JyAmJiB0aGlzXy5lblJpZ2h0UGFyZW50Um9sbCA9PSB0cnVlIHx8IGlwdHYubGFzdERpcmUgPT0gJ2Rvd24nICYmIHRoaXNfLmVuUmlnaHRQYXJlbnRSb2xsID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+mhtemdouiiq+a7muWOu+eahOWuveW6plxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJSb2xsV2lkdGggPSBNYXRoLmFicyhwYXJzZUludChyaWdodFBhcmVudE9iai5zdHlsZS5sZWZ0KSkgfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICAvL+eEpueCueeahGxlZnTlgLxcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9jdXNMZWZ0ID0gcGFyc2VJbnQodGhpc18uWF9Qb3NpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+WmguaenOayoeacieaJi+WKqOi1i+WAvO+8jOmCo+S5iOWwseiOt+WPlmxlZnTlgLxcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXB0di5pc051bGwoZm9jdXNMZWZ0KSB8fCBmb2N1c0xlZnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c0xlZnQgPSB0aGlzXy5ub2RlT2JqID8gTWF0aC5hYnMocGFyc2VJbnQodGhpc18ubm9kZU9iai5zdHlsZS5sZWZ0KSkgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+mhtemdouiiq+a7muWOu+eahOWuveW6plxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJBID0gcGFyUm9sbFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v54Sm54K555qETEVGVOWAvFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb2NCID0gZm9jdXNMZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c54Sm54K555qEVE9Q5YC85bCP5LqO5b2T5YmN6KKr5rua5Y6755qE6auY5bqm77yM6YKj5LmI6K+05piO5q2k5pe26ZyA6KaB5b6A5LiL5ruaXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhckEgPiBmb2NCKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c6ZyA6KaB54i25a655Zmo5b6A5LiL5rua77yM6YKj5LmI5rua5Y6755qE6auY5bqm5bCx5piv54Sm54K555qEVE9Q5YC8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb2xsV2lkdGggPSBmb2NCO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodFBhcmVudE9iai5zdHlsZS5sZWZ0ID0gXCItXCIgKyByb2xsV2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKirlt6blj7PkuIrkuIvmu5rliqjpnIDopoHnu5/kuIDnm5HmjqfvvIznlKjkuo7liqjmgIHliqDovb3lm77niYfvvIznm67liY3ml7bpl7Tpl67popjvvIzmsqHmnInnu6fnu63lvIDlj5HvvIzmraTlpITnlZnlgZrlkI7mnJ/ljYfnuqcqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzXy5lblJpZ2h0UGFnZVJvbGwgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy/lvIDlkK/mlbTpobXmu5rliqhcclxuICAgICAgICAgICAgICAgIHZhciByaWdodFBhcmVudElkID0gdGhpc18ucmlnaHRQYXJlbnRJZDtcclxuICAgICAgICAgICAgICAgIHZhciByaWdodEFyZWFJZCA9IHRoaXNfLnJpZ2h0QXJlYUlkO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJpZ2h0UGFyZW50T2JqID0gaXB0di4kKHJpZ2h0UGFyZW50SWQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJpZ2h0QXJlYU9iaiA9IGlwdHYuJChyaWdodEFyZWFJZCk7XHJcbiAgICAgICAgICAgICAgICAvL+iOt+WPluW9k+WJjemhtemcgOimgea7muWKqOeahOi3neemu1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvbGxMZWZ0ID0gdGhpc18uZm9jdXNMZWZ0Um9sbCB8fCAwO1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQYXJlbnRPYmouc3R5bGUubGVmdCA9ICctJyArIHJvbGxMZWZ0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5Yqo5oCB5Yqg6L295Zu+54mHXHJcbiAgICAgICAgICAgIGlmICh0aGlzXy5mb2N1c1BhZ2VBbGxNb2RlbCAmJiB0aGlzXy5mb2N1c1BhZ2VBbGxNb2RlbC5sZW5ndGggPiAwICYmIHRoaXNfLmZvY3VzUGFnZUFsbExvYWQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhbGxNb2RlbCA9IHRoaXNfLmZvY3VzUGFnZUFsbE1vZGVsO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBhbGxNb2RlbCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9jdXNNb2RlbCA9IGlwdHYoXCIjXCIgKyBhbGxNb2RlbFtpXSkuZ2V0Rm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm9jdXNNb2RlbCAmJiBmb2N1c01vZGVsLm5ld1N3YXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXB0dihcIiNcIiArIGZvY3VzTW9kZWwuaW1nSUQgKyBcIl9pbWdcIikuc3JjKGZvY3VzTW9kZWwubmV3U3dhcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpc18uZm9jdXNQYWdlQWxsTG9hZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL+WmguaenOm7mOiupOeahG9uRm9jdXPmlrnms5XkuI3mu6HotrPpnIDmsYLvvIzlsLHlj6/ku6XmjIflrppvbkZvY3VzX+WxnuaAp1xyXG4gICAgICAgIHRoaXNfLm9uRm9jdXNfID0gXCJcIjtcclxuICAgICAgICAvLyDpu5jorqTojrflvpfnhKbngrnkuovku7ZcclxuICAgICAgICB0aGlzXy5vbkZvY3VzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpc18uZW5Gb2N1cyAmJiB0aGlzXy5pc0NyZWF0ZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpc18uaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlwdHYuaXNOb3ROdWxsKHRoaXNfLm9uRm9jdXNfKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleS5leGVDb2RlKHRoaXNfLm9uRm9jdXNfKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNfLmZvY3VzVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjXCIgKyB0aGlzXy5pbWdJRCkuc3JjKHRoaXNfLm5ld1N3YXApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpc18uZm9jdXNUeXBlID09IDcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleS5jdXJGb2N1cy5pbWdJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXB0dihcIiNcIiArIGtleS5jdXJGb2N1cy5pbWdJRCkuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzXy5mb2N1c1R5cGUgPT0gMTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/nhKbngrnmoYbmmK/nlKjmiLfmiYvliqjlhpnliLBodG1s5Lit77yM6LSf6LSj56e75Yqo5q2k54Sm54K55qGGXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpcHR2LmlzTm90TnVsbCh0aGlzXy5zZWxlY3RCb3JkZXJJZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsYXN0Rm9jdXNPYmogPSBpcHR2KFwiI1wiICsgdGhpcy5sYXN0Rm9jdXNJZCkuZ2V0Rm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5LiK5LiA5Liq54Sm54K55LiN5pivMTXmiJYxNu+8jOmCo+S5iOeEpueCueahhuiCr+WumuaYr+makOiXj+eahO+8jOaJgOS7pei/mei+uei0n+i0o+aYvuekuueEpueCueahhlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RGb2N1c09iaiAmJiBsYXN0Rm9jdXNPYmouZm9jdXNUeXBlICE9IDEwIHx8ICFsYXN0Rm9jdXNPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aYvuekuuWFieagh1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjXCIgKyB0aGlzLnNlbGVjdEJvcmRlcklkKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjXCIgKyB0aGlzLnNlbGVjdEJvcmRlcklkKS5hZGRDbGFzcyhcInRyYW5zaXRpb25cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v56e75Yqo5YWJ5qCHXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsgdGhpc18uc2VsZWN0Qm9yZGVySWQpLmF0dHIoXCJ0b3BcIiwgdGhpc18uWV9Qb3NpICsgXCJweFwiKS5hdHRyKFwibGVmdFwiLCB0aGlzXy5YX1Bvc2kgKyBcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXB0di5lcnJvcihcIuW9k+WJjeeEpueCueacquaMh+WumnNlbGVjdEJvcmRlcklk5bGe5oCn77yBXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXNfLmZvY3VzVHlwZSA9PSAxMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+i0n+i0o+WwhuWvueW6lOeahOWxleekuuWbvueJh+a3u+WKoOaUvuWkp+WKqOeUu++8jOeEpueCueahhuaYr+mAmui/h+eEpueCueWvueW6lOWbvueJh+a3u+WKoOaUvuWkp+WKqOeUu1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WJjeaPkO+8jOmcgOimgeacieeEpueCueWvueW6lOeahOWxleekuuWbvueJh++8jOWQjOaXtumcgOimgeaciei+ueahhuaViOaenOeahOeEpueCueWbvueJh++8jOWFtuWunuWwseaYr+WwhueEpueCueWvueW6lOeahOWxleekuuWbvueJh+aUvuWkp+eahOWQjOaXtu+8jOeEpueCueWbvueJh+S5n+aUvuWkp++8jOeEpueCueWbvueJh+aYr+aciei+ueahhueahOWbvueJh1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1nID0gaXB0dihcIiNcIiArIHRoaXNfLmltZ0lEICsgXCJfaW1nXCIpLmFkZENsYXNzKFwidHJhbnNpdGlvblwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnBhcmVudE5vZGUuc3R5bGUuekluZGV4ID0gdGhpc18uZm9jdXNJbWdQYXJlbnRaSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjXCIgKyB0aGlzXy5pbWdJRCArIFwiX2ltZ1wiKS5hdHRyKFwidG9wXCIsIChwYXJzZUludChpbWcuc3R5bGUudG9wKSAtIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiKS5hdHRyKFwibGVmdFwiLCAocGFyc2VJbnQoaW1nLnN0eWxlLmxlZnQpIC0gdGhpc18uY2hhbmdlU2l6ZSkgKyBcInB4XCIpLmF0dHIoXCJ3aWR0aFwiLCAocGFyc2VJbnQoaW1nLnN0eWxlLndpZHRoKSArIDIgKiB0aGlzXy5jaGFuZ2VTaXplKSArIFwicHhcIikuYXR0cihcImhlaWdodFwiLCAocGFyc2VJbnQoaW1nLnN0eWxlLmhlaWdodCkgKyAyICogdGhpc18uY2hhbmdlU2l6ZSkgKyBcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+a3u+WKoOi/h+a4oSAg5pi+56S654Sm54K5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3RzID0gaXB0dihcIiNcIiArIHRoaXNfLmltZ0lEKS5hZGRDbGFzcyhcInRyYW5zaXRpb25cIikuc2hvdygpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RzLnBhcmVudE5vZGUuc3R5bGUuekluZGV4ID0gdGhpc18uaW1nUGFyZW50WkluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsgdGhpc18uaW1nSUQpLmF0dHIoXCJ0b3BcIiwgKHBhcnNlSW50KHNlbGVjdHMuc3R5bGUudG9wKSAtIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiKS5hdHRyKFwibGVmdFwiLCAocGFyc2VJbnQoc2VsZWN0cy5zdHlsZS5sZWZ0KSAtIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiKS5hdHRyKFwid2lkdGhcIiwgKHBhcnNlSW50KHNlbGVjdHMuc3R5bGUud2lkdGgpICsgMiAqIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiKS5hdHRyKFwiaGVpZ2h0XCIsIChwYXJzZUludChzZWxlY3RzLnN0eWxlLmhlaWdodCkgKyAyICogdGhpc18uY2hhbmdlU2l6ZSkgKyBcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpc18uZm9jdXNUeXBlID09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6LSf6LSj5bCG5a+55bqU55qE5bGV56S65Zu+54mH6LWL5LqI6L655qGG5LiO5Yqo55S777yM5pWI5p6c5Li66YCJ5Lit5ZCO77yM5a+55LqO55qE5bGV56S65Zu+54mH5re75Yqg5LqG6L655qGG5LiO5pS+5aSn5pWI5p6c77yM54Sm54K55a+55bqU55qE54Sm54K55Zu+54mH5LiN5a2Y5Zyo5Lu75L2V5pWI5p6c5Y+v5Lul55u05o6l5pS+56m655m95Zu+54mH77yM5YiH6K6w5piv5a+55bqU55qE5bGV56S65Zu+54mH5re75Yqg5Yqo55S7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5p2h5Lu277ya54Sm54K56ZyA6KaB5YW35pyJ5a+55bqU55qE5bGV56S65Zu+54mH77yM5Y+q6LSf6LSj5o6n5Yi254Sm54K55Zu+54mH6LW35Yiw5Yqo55S75pWI5p6cXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbWcgPSBpcHR2KFwiI1wiICsgdGhpc18uaW1nSUQgKyBcIl9pbWdcIikudG9nZ2xlQ2xhc3MoXCJib3JkZXJcIikuYWRkQ2xhc3MoXCJ0cmFuc2l0aW9uXCIpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcucGFyZW50Tm9kZS5zdHlsZS56SW5kZXggPSB0aGlzXy5mb2N1c0ltZ1BhcmVudFpJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnN0eWxlLnRvcCA9IChwYXJzZUludChpbWcuc3R5bGUudG9wKSAtIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcuc3R5bGUubGVmdCA9IChwYXJzZUludChpbWcuc3R5bGUubGVmdCkgLSB0aGlzXy5jaGFuZ2VTaXplKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnN0eWxlLndpZHRoID0gKHBhcnNlSW50KGltZy5zdHlsZS53aWR0aCkgKyAyICogdGhpc18uY2hhbmdlU2l6ZSkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zdHlsZS5oZWlnaHQgPSAocGFyc2VJbnQoaW1nLnN0eWxlLmhlaWdodCkgKyAyICogdGhpc18uY2hhbmdlU2l6ZSkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzXy5mb2N1c1R5cGUgPT0gMTQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/otJ/otKPlsIbnhKbngrlkaXbmt7vliqDovrnmoYZcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/mnaHku7bvvIznhKbngrnliIfmjaLnmoTlvaLlvI/lsLHmmK/orrLnhKbngrnmt7vliqDovrnmoYbmlYjmnpzvvIzlkIzml7bmmL7npLrkuI7pmpDol4/vvIzpg73mmK/pkojlr7nkuo7nhKbngrlkaXbnmoTmk43kvZxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXB0dihcIiNcIiArIHRoaXNfLmlkKS50b2dnbGVDbGFzcyhcImJvcmRlclwiKS5hdHRyKFwiekluZGV4XCIsIHRoaXNfLmltZ1BhcmVudFpJbmRleCkuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpc18uZm9jdXNUeXBlID09IDE1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vMTXkuI4xNumDveaYr+S7o+eggeiHquWKqOeUn+aIkGRpduS4uumAieS4reahhu+8jOivpemAieS4reahhuWPqui0n+i0o+aYvuekuui+ueahhu+8jOWvueW6lOeahOWxleekuuWbvueJh+S4jeWFt+acieaUvuWkp+aViOaenO+8jOWIh+aNouaViOaenOS4uuaYvuekuuS4jumakOiXj+atpOiHquWKqOeUn+aIkOeahGRpdui+ueahhu+8jOWmguaenOS4pOS4queEpueCuemDveaYrzE177yM5ZCM5pe25Lik5Liq54Sm54K55qGG5aSn5bCP5Lmf5LiN5LiA5qC377yM6YKj5LmI5bCx5Lya5Ye6546w54Sm54K56L655qGG6Ieq5Yqo5pS+5aSn5LiO57yp5bCP5pWI5p6cXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v54Sm54K55qGG77ya5piv6Ieq5Yqo55Sf5oiQ55qE54Sm54K5ZGl2LOS9jee9ruWkp+Wwj+aYr+agueaNrueEpueCueeahHN0eWxl6YeM6Z2i5o6n5Yi255qEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5p2h5Lu277ya6ZyA6KaB55So5oi35a+554Sm54K555qEc3R5bGXotYvkuoh3aWR0aCxoZWlnaHQsdG9wLGxlZnTlsZ7mgKfvvIzov5nkupvlsZ7mgKflhrPlrprnhKbngrnmoYbnmoTlpKflsI/kuI7kvY3nva5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/liIfmjaLmlYjmnpzvvJrpgInkuK3vvJrnhKbngrnmoYZkaXbmmL7npLrvvIzkvY3nva7lpKflsI/mmK/nhKbngrnnmoRzdHlsZeaOp+WItueahO+8jOenu+W8gO+8mueEpueCueahhmRpdumakOiXj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGl2ID0gaXB0di4kKHRoaXNfLnNlbGVjdGlvbklEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkaXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIHRoaXNfLnNlbGVjdGlvbklEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5pZCA9IHRoaXNfLnNlbGVjdGlvbklEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLndpZHRoID0gXCIwcHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS5oZWlnaHQgPSBcIjBweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLnRvcCA9IFwiMHB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUubGVmdCA9IFwiMHB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUuekluZGV4ID0gdGhpc18uaW1nUGFyZW50WkluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2LmNsYXNzTmFtZSA9IFwiYm9yZGVyIHBvc2l0aW9uXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzXy5ub2RlT2JqLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdEZvY3VzT2JqID0gaXB0dihcIiNcIiArIHRoaXNfLmxhc3RGb2N1c0lkKS5nZXRGb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WmguaenOS4iuS4gOS4queEpueCueS4jeaYrzE15oiWMTbvvIzpgqPkuYjnhKbngrnmoYbogq/lrprmmK/pmpDol4/nmoTvvIzmiYDku6Xov5novrnotJ/otKPmmL7npLrnhKbngrnmoYZcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RGb2N1c09iaiAmJiBsYXN0Rm9jdXNPYmouZm9jdXNUeXBlICE9IDE1ICYmIGxhc3RGb2N1c09iai5mb2N1c1R5cGUgIT0gMTYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjXCIgKyB0aGlzXy5zZWxlY3Rpb25JRCkuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXB0dihcIiNcIiArIHRoaXNfLnNlbGVjdGlvbklEKS5hZGRDbGFzcyhcInRyYW5zaXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLndpZHRoID0gdGhpc18ubm9kZU9iai5zdHlsZS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLmhlaWdodCA9IHRoaXNfLm5vZGVPYmouc3R5bGUuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUudG9wID0gdGhpc18ubm9kZU9iai5zdHlsZS50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS5sZWZ0ID0gdGhpc18ubm9kZU9iai5zdHlsZS5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpc18uZm9jdXNUeXBlID09IDE2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v54Sm54K55qGG77ya5piv6Ieq5Yqo55Sf5oiQ55qE54Sm54K5ZGl2LOS9jee9ruWkp+Wwj+aYr+eEpueCueWvueW6lOeahOWxleekuuWbvueJh+eahOeItue6p+ebruW9lWRpdueahOWkp+Wwj+S9jee9ruaOp+WItueahFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+aUvuWkp+Wkp+Wwj++8muagueaNrueEpueCuWNoYW5nZVNpemXlsZ7mgKfmjqfliLbmlL7lpKfnmoTlpKflsI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/mnaHku7bvvJrmmK/lhbfmnInlr7nlupTnmoTlsZXnpLrlm77niYfvvIzpnIDopoHoh6rliqjnlJ/miJDnhKbngrnmoYZkaXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/liIfmjaLmlYjmnpzvvJrpgInkuK3vvJrlsZXnpLrlm77niYfmlL7lpKfvvIzoh6rliqjnlJ/miJDnmoTnhKbngrnovrnmoYbmlL7lpKfvvIznp7vlvIDvvJrlsZXnpLrlm77niYfnvKnlsI/vvIzoh6rliqjnlJ/miJDnmoTnhKbngrnovrnmoYbpmpDol49cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpdiA9IGlwdHYuJCh0aGlzXy5zZWxlY3Rpb25JRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGl2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCB0aGlzXy5zZWxlY3Rpb25JRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXYuaWQgPSB0aGlzXy5zZWxlY3Rpb25JRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS53aWR0aCA9IFwiMHB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUuaGVpZ2h0ID0gXCIwcHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS50b3AgPSBcIjBweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLmxlZnQgPSBcIjBweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLnpJbmRleCA9IHRoaXNfLmltZ1BhcmVudFpJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5jbGFzc05hbWUgPSBcImJvcmRlciBwb3NpdGlvblwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc18ubm9kZU9iai5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RGb2N1c09iaiA9IGlwdHYoXCIjXCIgKyB0aGlzXy5sYXN0Rm9jdXNJZCkuZ2V0Rm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGltZyA9IGlwdHYuJCh0aGlzXy5pbWdJRCArIFwiX2ltZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzkuIrkuIDkuKrnhKbngrnkuI3mmK8xNeaIljE277yM6YKj5LmI5bCx5LiN6ZyA6KaB54Sm54K55YW35pyJ5Yqo55S75pWI5p6c77yM6L+Z6L655o6n5Yi25Y+W5raI5Yqo55S777yM55u05o6l6K6p5oiY5aOr5Zu+54mH5pS+5aSn5LiO54Sm54K5ZGl255u05o6l5pi+56S6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Rm9jdXNPYmogJiYgbGFzdEZvY3VzT2JqLmZvY3VzVHlwZSAhPSAxNSAmJiBsYXN0Rm9jdXNPYmouZm9jdXNUeXBlICE9IDE2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsgdGhpc18uc2VsZWN0aW9uSUQpLnJlbW92ZUNsYXNzKFwidHJhbnNpdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjXCIgKyB0aGlzXy5zZWxlY3Rpb25JRCkuYWRkQ2xhc3MoXCJ0cmFuc2l0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjXCIgKyB0aGlzXy5zZWxlY3Rpb25JRCkuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+iuqeWvueW6lOeahOWxleekuuWbvueJh+aUvuWkp++8jOW5tuS4lOaLpeacieaUvuWkp+WKqOeUu1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsgdGhpc18uaW1nSUQgKyBcIl9pbWdcIikuYWRkQ2xhc3MoXCJ0cmFuc2l0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+eEpueCueahhuaUvuWkpyznlLHkuo7nhKbngrnmoYbnmoTkvY3nva7mmK/ln7rkuo7lsZXnpLrlm77niYfnmoTniLbnuqflhYPntKDnmoTlt6bkuIrop5LkuLrotbfngrnov5vooYzmlL7lpKfnmoTvvIzmnInkuobovrnmoYbnmoTljp/lm6Dlr7zoh7TkvY3nva7kuI7mlL7lpKflkI7nmoTlsZXnpLrlm77niYfnmoTkvY3nva7kuI3lr7nlupTvvIzmiYDku6XpnIDopoHov5vkuIDmraXlh4/ljrvmiJbliqDkuIrovrnmoYbnmoTlpKflsI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLnRvcCA9IChwYXJzZUludChpbWcucGFyZW50Tm9kZS5zdHlsZS50b3ApIC0gdGhpc18uY2hhbmdlU2l6ZSAtIDIpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUubGVmdCA9IChwYXJzZUludChpbWcucGFyZW50Tm9kZS5zdHlsZS5sZWZ0KSAtIHRoaXNfLmNoYW5nZVNpemUgLSAyKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLndpZHRoID0gKHBhcnNlSW50KGltZy5wYXJlbnROb2RlLnN0eWxlLndpZHRoKSArIDIgKiB0aGlzXy5jaGFuZ2VTaXplICsgMSkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS5oZWlnaHQgPSAocGFyc2VJbnQoaW1nLnBhcmVudE5vZGUuc3R5bGUuaGVpZ2h0KSArIDIgKiB0aGlzXy5jaGFuZ2VTaXplICsgMSkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5a+55bqU55qE5bGV56S65Zu+54mH5pS+5aSnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5wYXJlbnROb2RlLnN0eWxlLnpJbmRleCA9IHRoaXNfLmZvY3VzSW1nUGFyZW50WkluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcuc3R5bGUudG9wID0gKHBhcnNlSW50KGltZy5zdHlsZS50b3ApIC0gdGhpc18uY2hhbmdlU2l6ZSkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zdHlsZS5sZWZ0ID0gKHBhcnNlSW50KGltZy5zdHlsZS5sZWZ0KSAtIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcuc3R5bGUud2lkdGggPSAocGFyc2VJbnQoaW1nLnN0eWxlLndpZHRoKSArIDIgKiB0aGlzXy5jaGFuZ2VTaXplKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnN0eWxlLmhlaWdodCA9IChwYXJzZUludChpbWcuc3R5bGUuaGVpZ2h0KSArIDIgKiB0aGlzXy5jaGFuZ2VTaXplKSArIFwicHhcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzXy5mb2N1c1R5cGUgPT0gMTcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/nhKbngrnmoYbmmK/nlKjmiLfoh6rlt7HlhpnliLBodG1s5Lit77yM5Y+v5Lul6Ieq5bex5a6a5Yi25YyW54Sm54K55qGG55qE5qC35byP77yM5q+U5aaC6L655qGG77yM6IOM5pmv5Zu+77yM6YeM6Z2i5YyF5ZCr5Zu+54mH562J562J77yM5a+55bqU5Yqo55S75pWI5p6c5Li65bmz56e777yM5rKh5pyJ5pS+5aSn5pWI5p6cXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5p2h5Lu277ya6ZyA6KaB55So5oi36Ieq5bex5a6a5LmJ5LiA5Liq54Sm54K56YCJ5Lit5qGGZGl277yM5bm25LiU5oyH5a6a6K+lZGl25pyJaWTlgLzotYvkuojnu5nnhKbngrlzZWxlY3Rpb25PYmpJROWxnuaAp1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGl2ID0gaXB0di4kKHRoaXNfLnNlbGVjdGlvbk9iaklEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzkuIrkuIDkuKrnhKbngrnkuI3mmK8xN++8jOaIluiAheaYr+WIneWni+WMluesrOS4gOS4queEpueCue+8jOmCo+S5iOWFiOaYvuekuuenu+WKqOahhu+8jOS4jei1i+S6iOWKqOeUu1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WmguaenOS4iuS4gOS4queEpueCueaYrzE377yM5L2G5piv54Sm54K55qGG5LiN5piv5ZCM5LiA5Liq77yM6ZyA6KaB6ZqQ6JeP5LiK5LiA5Liq54Sm54K55qGG77yM5pi+56S65LiL5LiA5Liq54Sm54K55qGGXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsYXN0Rm9jdXNPYmogPSBpcHR2KFwiI1wiICsgdGhpc18ubGFzdEZvY3VzSWQpLmdldEZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Rm9jdXNPYmogJiYgbGFzdEZvY3VzT2JqLmZvY3VzVHlwZSAhPSAxNyB8fCAhbGFzdEZvY3VzT2JqIHx8IGxhc3RGb2N1c09iaiAmJiBsYXN0Rm9jdXNPYmouZm9jdXNUeXBlID09IDE3ICYmIGxhc3RGb2N1c09iai5zZWxlY3Rpb25PYmpJRCAhPSB0aGlzXy5zZWxlY3Rpb25PYmpJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpdikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjXCIgKyB0aGlzXy5zZWxlY3Rpb25PYmpJRCkucmVtb3ZlQ2xhc3MoXCJ0cmFuc2l0aW9uXCIpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5LiK5LiA5Liq54Sm54K55pivMTcs5bm25LiU5LiK5LiA5Liq54Sm54K55a2Y5Zyo77yM6YKj5LmI5bCx6LWL5LqI5Yqo55S7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdEZvY3VzT2JqICYmIGxhc3RGb2N1c09iai5mb2N1c1R5cGUgPT0gMTcgJiYgZGl2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXB0dihcIiNcIiArIHRoaXNfLnNlbGVjdGlvbk9iaklEKS5hZGRDbGFzcyhcInRyYW5zaXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpdikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGltZyA9IGlwdHYuJCh0aGlzXy5pbWdJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUudG9wID0gcGFyc2VJbnQoaW1nLnBhcmVudE5vZGUuc3R5bGUudG9wKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS5sZWZ0ID0gcGFyc2VJbnQoaW1nLnBhcmVudE5vZGUuc3R5bGUubGVmdCkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXNfLmZvY3VzVHlwZSA9PSAxOCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mAieS4reWQju+8jOeEpueCueahhuWbvueJh+aYvuekuu+8jOWQjOaXtuivpeWbvueJh+imgeWQjOaXtuS4juWvueW6lOeahOeEpueCueWbvueJh+aUvuWkp1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5LmN1ckZvY3VzLmltZ0lEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsga2V5LmN1ckZvY3VzLmltZ0lEKS5yZW1vdmVDbGFzcyhcInRyYW5zaXRpb25zSGlkZTBfNVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjXCIgKyBrZXkuY3VyRm9jdXMuaW1nSUQgKyBcIl9pbWdcIikucmVtb3ZlQ2xhc3MoXCJ0cmFuc2l0aW9uc0hpZGUwXzVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsga2V5LmN1ckZvY3VzLmltZ0lEKS5hZGRDbGFzcyhcInRyYW5zaXRpb25zU2hvdzBfNVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjXCIgKyBrZXkuY3VyRm9jdXMuaW1nSUQgKyBcIl9pbWdcIikuYWRkQ2xhc3MoXCJ0cmFuc2l0aW9uc1Nob3cwXzVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsga2V5LmN1ckZvY3VzLmltZ0lEKS5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNfLm9uRm9jdXNFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleS5leGVDb2RlKHRoaXNfLm9uRm9jdXNFdmVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXNfLm9uQmx1cl8gPSBcIlwiO1xyXG4gICAgICAgIHRoaXNfLm9uQmx1ciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXNfLmVuRm9jdXMgJiYgdGhpc18uaXNDcmVhdGVkID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpcHR2LmlzTm90TnVsbCh0aGlzXy5vbkJsdXJfKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleS5leGVDb2RlKHRoaXNfLm9uQmx1cl8pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc18uZm9jdXNUeXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXB0dihcIiNcIiArIHRoaXNfLmltZ0lEKS5zcmModGhpc18ub2xkU3dhcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOmakOiXj+WPkeWFieWciOWciFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzXy5mb2N1c1R5cGUgPT0gNykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsga2V5LmN1ckZvY3VzLmltZ0lEKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc18uZm9jdXNUeXBlID09IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6ZqQ6JeP5YWJ5qCHXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjXCIgKyB0aGlzXy5zZWxlY3RCb3JkZXJJZCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc18uZm9jdXNUeXBlID09IDEyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjXCIgKyB0aGlzXy5pbWdJRCArIFwiX2ltZ1wiKS50b2dnbGVDbGFzcyhcInRyYW5zaXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbWcgPSBpcHR2LiQodGhpc18uaW1nSUQgKyBcIl9pbWdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5wYXJlbnROb2RlLnN0eWxlLnpJbmRleCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zdHlsZS50b3AgPSAocGFyc2VJbnQoaW1nLnN0eWxlLnRvcCkgKyB0aGlzXy5jaGFuZ2VTaXplKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnN0eWxlLmxlZnQgPSAocGFyc2VJbnQoaW1nLnN0eWxlLmxlZnQpICsgdGhpc18uY2hhbmdlU2l6ZSkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zdHlsZS53aWR0aCA9IChwYXJzZUludChpbWcuc3R5bGUud2lkdGgpIC0gMiAqIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcuc3R5bGUuaGVpZ2h0ID0gKHBhcnNlSW50KGltZy5zdHlsZS5oZWlnaHQpIC0gMiAqIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsgdGhpc18uaW1nSUQpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdHMgPSBpcHR2LiQodGhpc18uaW1nSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RzLnBhcmVudE5vZGUuc3R5bGUuekluZGV4ID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0cy5zdHlsZS50b3AgPSAocGFyc2VJbnQoc2VsZWN0cy5zdHlsZS50b3ApICsgdGhpc18uY2hhbmdlU2l6ZSkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdHMuc3R5bGUubGVmdCA9IChwYXJzZUludChzZWxlY3RzLnN0eWxlLmxlZnQpICsgdGhpc18uY2hhbmdlU2l6ZSkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdHMuc3R5bGUud2lkdGggPSAocGFyc2VJbnQoc2VsZWN0cy5zdHlsZS53aWR0aCkgLSAyICogdGhpc18uY2hhbmdlU2l6ZSkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdHMuc3R5bGUuaGVpZ2h0ID0gKHBhcnNlSW50KHNlbGVjdHMuc3R5bGUuaGVpZ2h0KSAtIDIgKiB0aGlzXy5jaGFuZ2VTaXplKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNfLmZvY3VzVHlwZSA9PSAxMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsgdGhpc18uaW1nSUQgKyBcIl9pbWdcIikudG9nZ2xlQ2xhc3MoXCJib3JkZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbWcgPSBpcHR2LiQodGhpc18uaW1nSUQgKyBcIl9pbWdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5wYXJlbnROb2RlLnN0eWxlLnpJbmRleCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zdHlsZS50b3AgPSAocGFyc2VJbnQoaW1nLnN0eWxlLnRvcCkgKyB0aGlzXy5jaGFuZ2VTaXplKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnN0eWxlLmxlZnQgPSAocGFyc2VJbnQoaW1nLnN0eWxlLmxlZnQpICsgdGhpc18uY2hhbmdlU2l6ZSkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zdHlsZS53aWR0aCA9IChwYXJzZUludChpbWcuc3R5bGUud2lkdGgpIC0gMiAqIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcuc3R5bGUuaGVpZ2h0ID0gKHBhcnNlSW50KGltZy5zdHlsZS5oZWlnaHQpIC0gMiAqIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc18uZm9jdXNUeXBlID09IDE0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjXCIgKyB0aGlzXy5pZCkuaGlkZSgpLnRvZ2dsZUNsYXNzKFwiYm9yZGVyXCIpLmF0dHIoXCJ6SW5kZXhcIiwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzXy5mb2N1c1R5cGUgPT0gMTUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRGb2N1c09iaiA9IGlwdHYoXCIjXCIgKyB0aGlzXy5uZXh0Rm9jdXNJZCkuZ2V0Rm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRGb2N1c09iaiAmJiBuZXh0Rm9jdXNPYmouZm9jdXNUeXBlICE9IDE1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsgdGhpc18uc2VsZWN0aW9uSUQpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc18uZm9jdXNUeXBlID09IDE2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5LiL5LiA5Liq5Y2z5bCG6I635Y+W54Sm54K555qE54Sm54K55LiN5pivMTXmiJYxNu+8jOWwsemakOiXj+mAieS4reahhlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dEZvY3VzT2JqID0gaXB0dihcIiNcIiArIHRoaXNfLm5leHRGb2N1c0lkKS5nZXRGb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dEZvY3VzT2JqICYmIG5leHRGb2N1c09iai5mb2N1c1R5cGUgIT0gMTUgJiYgbmV4dEZvY3VzT2JqICYmIG5leHRGb2N1c09iai5mb2N1c1R5cGUgIT0gMTYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjXCIgKyB0aGlzXy5zZWxlY3Rpb25JRCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6L+Y5Y6f5Zu+54mH5aSn5bCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbWcgPSBpcHR2LiQodGhpc18uaW1nSUQgKyBcIl9pbWdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5wYXJlbnROb2RlLnN0eWxlLnpJbmRleCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zdHlsZS50b3AgPSAocGFyc2VJbnQoaW1nLnN0eWxlLnRvcCkgKyB0aGlzXy5jaGFuZ2VTaXplKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnN0eWxlLmxlZnQgPSAocGFyc2VJbnQoaW1nLnN0eWxlLmxlZnQpICsgdGhpc18uY2hhbmdlU2l6ZSkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zdHlsZS53aWR0aCA9IChwYXJzZUludChpbWcuc3R5bGUud2lkdGgpIC0gMiAqIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcuc3R5bGUuaGVpZ2h0ID0gKHBhcnNlSW50KGltZy5zdHlsZS5oZWlnaHQpIC0gMiAqIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc18uZm9jdXNUeXBlID09IDE3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaXYgPSBpcHR2LiQodGhpc18uc2VsZWN0aW9uT2JqSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WmguaenOS4iuS4gOS4queEpueCueS4jeaYrzE377yM6YKj5LmI5LmF5YWI5pi+56S656e75Yqo5qGG77yM6LWL5LqI5Yqo55S7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0Rm9jdXNPYmogPSBpcHR2KFwiI1wiICsgdGhpc18ubmV4dEZvY3VzSWQpLmdldEZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0Rm9jdXNPYmogJiYgbmV4dEZvY3VzT2JqLmZvY3VzVHlwZSAhPSAxNyB8fCBuZXh0Rm9jdXNPYmogJiYgbmV4dEZvY3VzT2JqLnNlbGVjdGlvbk9iaklEICE9IHRoaXNfLnNlbGVjdGlvbk9iaklEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGl2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXB0dihcIiNcIiArIHRoaXNfLnNlbGVjdGlvbk9iaklEKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzXy5mb2N1c1R5cGUgPT0gMTgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXB0dihcIiNcIiArIGtleS5jdXJGb2N1cy5pbWdJRCkucmVtb3ZlQ2xhc3MoXCJ0cmFuc2l0aW9uc1Nob3cwXzVcIikuYWRkQ2xhc3MoXCJ0cmFuc2l0aW9uc0hpZGUwXzVcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsga2V5LmN1ckZvY3VzLmltZ0lEICsgXCJfaW1nXCIpLnJlbW92ZUNsYXNzKFwidHJhbnNpdGlvbnNTaG93MF81XCIpLmFkZENsYXNzKFwidHJhbnNpdGlvbnNIaWRlMF81XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzXy5vbkJsdXJFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleS5leGVDb2RlKHRoaXNfLm9uQmx1ckV2ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpc18ub25DbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXNfLmVuYWJsZSA9PSB0cnVlICYmIHRoaXNfLmVuRm9jdXMgPT0gdHJ1ZSAmJiB0aGlzXy5pc0NyZWF0ZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNfLmJ1dHRvbkRhdGEgJiYgaXB0di5hcGkgJiYgaXB0di5hcGkubG9nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXB0di5hcGkubG9nLmJ1dHRvbkxvZyh0aGlzXy5idXR0b25EYXRhLmJ1dHRvbklkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGtleS5leGVDb2RlKHRoaXNfLmNsaWNrRXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiYDmnInmlrnlkJHlsZ7mgKfkuI7nhKbngrnooYzkuLrkuovku7ZcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBpcHR2LkRpcmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9O1xyXG5cclxuICAgIGlwdHYuZXh0ZW5kKGlwdHYuRGlyZS5wcm90b3R5cGUsIHtcclxuICAgICAgICB1cDogJycsXHJcbiAgICAgICAgdXBPdGhlcjogJycsXHJcbiAgICAgICAgcmlnaHQ6ICcnLFxyXG4gICAgICAgIHJpZ2h0T3RoZXI6ICcnLFxyXG4gICAgICAgIGRvd246ICcnLFxyXG4gICAgICAgIGRvd25PdGhlcjogJycsXHJcbiAgICAgICAgbGVmdDogJycsXHJcbiAgICAgICAgbGVmdE90aGVyOiAnJyxcclxuICAgICAgICBvdGhlckV2ZW50OiAnJyxcclxuICAgICAgICBvdGhlcjogJycsXHJcbiAgICAgICAgLy8g5p+Q5pa55ZCR5omn6KGM5LqL5Lu277yM5a2X56ym5LiyXHJcbiAgICAgICAgdXBFdmVudDogJycsXHJcbiAgICAgICAgcmlnaHRFdmVudDogJycsXHJcbiAgICAgICAgZG93bkV2ZW50OiAnJyxcclxuICAgICAgICBsZWZ0RXZlbnQ6ICcnLFxyXG4gICAgICAgIC8v5p+Q5pa55ZCR5Y6f5pys5oyH5a6a55qE54Sm54K56KKr56aB55So5LqG77yM5bCx5omn6KGM5ZON5bqU5LqL5Lu2XHJcbiAgICAgICAgdXBPdGhlckV2ZW50OiAnJyxcclxuICAgICAgICByaWdodE90aGVyRXZlbnQ6ICcnLFxyXG4gICAgICAgIGRvd25PdGhlckV2ZW50OiAnJyxcclxuICAgICAgICBsZWZ0T3RoZXJFdmVudDogJycsXHJcbiAgICAgICAgLy/lpoLmnpzlr7nkuo7mlrnlkJHorr7nva7nmoTnhKbngrnkuI3lnKjnhKbngrnmsaDkuK3vvIzpgqPkuYjmiafooYzlr7nkuo7mlrnlkJHnmoTkuovku7bmiJbnhKbngrlcclxuICAgICAgICByaWdodE5vRXZlbnQ6ICcnLFxyXG4gICAgICAgIHJpZ2h0Tm86ICcnLFxyXG4gICAgICAgIGxlZnROb0V2ZW50OiAnJyxcclxuICAgICAgICBsZWZ0Tm86ICcnLFxyXG4gICAgICAgIGRvd25Ob0V2ZW50OiAnJyxcclxuICAgICAgICBkb3duTm86ICcnLFxyXG4gICAgICAgIHVwTm9FdmVudDogJycsXHJcbiAgICAgICAgdXBObzogJydcclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSUTlkb3lkI3lj4LmlbDpm4blkIhcclxuICAgICAqIEBwYXJhbSBfeFxyXG4gICAgICogQHBhcmFtIF95XHJcbiAgICAgKiBAcGFyYW0gX2ltZ0lEXHJcbiAgICAgKiBAcGFyYW0gX3VwUGFyZW50SWRcclxuICAgICAqL1xyXG4gICAgdmFyIElkTGlzdCA9IGZ1bmN0aW9uIChfeCwgX3ksIF9pbWdJRCwgX3VwUGFyZW50SWQpIHtcclxuICAgICAgICB2YXIgdGhpc18gPSB0aGlzO1xyXG4gICAgICAgIHRoaXNfLnggPSBfeDtcclxuICAgICAgICB0aGlzXy55ID0gX3k7XHJcbiAgICAgICAgdGhpc18uaW1nSUQgPSBfaW1nSUQ7XHJcbiAgICAgICAgdGhpc18udXBQYXJlbnRJZCA9IF91cFBhcmVudElkO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNrmlk6I635Y+W5Y+C5pWwXHJcbiAgICAgKiBAcGFyYW0gX2lkXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqL1xyXG4gICAgdmFyIGdldElkTGlzdCA9IGZ1bmN0aW9uIChfaWQpIHtcclxuICAgICAgICBpZiAoIV9pZCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgdmFyIGQxID0gX2lkO1xyXG4gICAgICAgIHZhciB4MSA9IGQxLmluZGV4T2YoXCJfXCIsIDApO1xyXG4gICAgICAgIHZhciB4MiA9IGQxLmluZGV4T2YoXCJfXCIsIHgxICsgMSk7XHJcbiAgICAgICAgdmFyIHgzID0gZDEuaW5kZXhPZihcIl9cIiwgeDIgKyAxKTtcclxuICAgICAgICB2YXIgeDQgPSBkMS5pbmRleE9mKFwiX1wiLCB4MyArIDEpO1xyXG4gICAgICAgIHZhciB4NSA9IGQxLmluZGV4T2YoXCJfXCIsIHg0ICsgMSk7XHJcblxyXG4gICAgICAgIHZhciB4ID0gZDEuc3Vic3RyaW5nKHgxICsgMiwgeDIpO1xyXG4gICAgICAgIHZhciB5ID0gZDEuc3Vic3RyaW5nKHgyICsgMiwgeDMpO1xyXG4gICAgICAgIHZhciBpbWdzcmMgPSBcIlwiO1xyXG4gICAgICAgIGlmICh4NCAhPSAtMSkge1xyXG4gICAgICAgICAgICBpbWdzcmMgPSBkMS5zdWJzdHJpbmcoeDMgKyAxLCB4NCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwYXIgPSBcIlwiO1xyXG4gICAgICAgIGlmICh4NSAhPSAtMSkge1xyXG4gICAgICAgICAgICBwYXIgPSBkMS5zdWJzdHJpbmcoeDQgKyAxLCB4NSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgSWRMaXN0KHgsIHksIGltZ3NyYywgcGFyKTtcclxuICAgIH07XHJcblxyXG4gICAga2V5LmN1ckZvY3VzID0gbmV3IGlwdHYuRm9jdXNNb2RlbCgpO1xyXG5cclxuICAgIC8v5omp5bGVaXB0duWvueixoeaWueazlVxyXG4gICAgaXB0di5mbi5leHRlbmQoe1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAq6I635Y+W54Sm54K55a+56LGhXHJcbiAgICAgICAgICogQHJldHVybnMge2lwdHYuRm9jdXNNb2RlbH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXRGb2N1czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhpc18gPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodGhpc19bMF0gJiYgdGhpc19bMF0uZm9jdXNPYmopIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzX1swXS5mb2N1c09iajtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOW8gOWQr+eEpueCueadg+mZkO+8jOaUr+aMgeWNleS4quW8gOWQr++8jOWkmuS4quWQjOaXtuW8gOWQr1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtlbmFibGVGb2N1c31cclxuICAgICAgICAgKi9cclxuICAgICAgICBlbmFibGVGb2N1czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhpc18gPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgY29udGV4dCA9IHRoaXNfLmNvbnRleHQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzX1swXSAmJiB0aGlzX1swXS5mb2N1c09iaikge1xyXG4gICAgICAgICAgICAgICAgdGhpc19bMF0uZm9jdXNPYmouZW5Gb2N1cyA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udGV4dCAmJiBpcHR2LmlzQXJyYXkoY29udGV4dCkpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBpcHR2LmZvY3VzQ29sbGVjdGlvbltjb250ZXh0W2ldXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqICYmIG9iai5mb2N1c09iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouZm9jdXNPYmouZW5Gb2N1cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzXztcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOemgeeUqOeEpueCueadg+mZkO+8jOaUr+aMgeWNleS4quemgeeUqO+8jOWkmuS4quWQjOaXtuemgeeUqFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtlbmFibGVGb2N1c31cclxuICAgICAgICAgKi9cclxuICAgICAgICBkaXNhYmxlRm9jdXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRoaXNfID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzXy5jb250ZXh0O1xyXG4gICAgICAgICAgICBpZiAodGhpc19bMF0gJiYgdGhpc19bMF0uZm9jdXNPYmopIHtcclxuICAgICAgICAgICAgICAgIHRoaXNfWzBdLmZvY3VzT2JqLmVuRm9jdXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0ICYmIGlwdHYuaXNBcnJheShjb250ZXh0KSkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IGlwdHYuZm9jdXNDb2xsZWN0aW9uW2NvbnRleHRbaV1dO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmogJiYgb2JqLmZvY3VzT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5mb2N1c09iai5lbkZvY3VzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzXztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZEZvY3VzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGlzXyA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gdGhpc18uY29udGV4dCxcclxuICAgICAgICAgICAgICAgIGRvbXMgPSBbXSxcclxuICAgICAgICAgICAgICAgIGZvY3VzSWQgPSBudWxsO1xyXG4gICAgICAgICAgICAvL+WmguaenOaYr+aJuemHj+a3u+WKoFxyXG4gICAgICAgICAgICBpZiAoY29udGV4dCAmJiBpcHR2LmlzQXJyYXkoY29udGV4dCkpIHtcclxuICAgICAgICAgICAgICAgIGRvbXMgPSBjb250ZXh0O1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQgJiYgaXB0di50eXBlKGNvbnRleHQpID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WmguaenOaYr+WNleS4qua3u+WKoFxyXG4gICAgICAgICAgICAgICAgZG9tcy5wdXNoKGNvbnRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZG9tcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRvbU9iaiA9IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9iaiA9IGRvbXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqICYmIChpZCA9IG9iai5pZCkgJiYgKGlwdHYudHJpbShpZCkpICYmIGlkLmluZGV4T2YoXCJoYW5kc1wiKSA9PSAwICYmIChkb21PYmogPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gbmV3IGlwdHYuRm9jdXNNb2RlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmlkID0gZm9jdXNJZCA9IGlkO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpZFBhcmFtcyA9IGdldElkTGlzdChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuWF9Qb3NpID0gaWRQYXJhbXMueDtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5ZX1Bvc2kgPSBpZFBhcmFtcy55O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpZFBhcmFtcy51cFBhcmVudElkICYmIGlwdHYoXCIjXCIgKyBpZFBhcmFtcy51cFBhcmVudElkKVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5QYXJlbnROb2RlID0gaXB0dihcIiNcIiArIGlkUGFyYW1zLnVwUGFyZW50SWQpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+iOt+WPlueEpueCueWGhemDqOeahOWbvueJh2lkXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuaW1nSUQgPSBpcHR2LnRyaW0oaWRQYXJhbXMuaW1nSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5L+d5a2Y5YiH5o2i5LmL5YmN55qE5Zu+54mH5Zyw5Z2AXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwub2xkU3dhcCA9IGlwdHYoXCIjXCIgKyBtb2RlbC5pbWdJRCkuc3JjKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmVuRm9jdXMgPSBvYmouZW5Gb2N1cyB8fCB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v56Gu5a6a6ZSu77yM56Gu5a6a5LqL5Lu2XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuY2xpY2tFdmVudCA9IG9iai5jbGlja0V2ZW50IHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5paw5Zu+5Zyw5Z2AXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwubmV3U3dhcCA9IG9iai5uZXdTd2FwIHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v54Sm54K55o2G57uR5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwudGVtcERhdGEgPSBvYmoudGVtcERhdGEgfHwgbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAvL+WIh+aNouexu+Wei1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmZvY3VzVHlwZSA9IG9iai5mb2N1c1R5cGUgfHwgNztcclxuICAgICAgICAgICAgICAgICAgICAvL+WIh+aNouWIsOeEpueCueS4iuaXtu+8jOWbvuagh+WPmOWkp+eahOWkp+WwjyAgIOiuvuiuoeexu+WeizE2LDEzLDEyXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuY2hhbmdlU2l6ZSA9IG9iai5jaGFuZ2VTaXplIHx8IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/np7vliqjpgInkuK3moYZpZCzmraTpgInkuK3moYbmmK/ku6PnoIHoh6rliqjnlJ/miJDnmoTlhYPntKDvvIzlr7nlupTmlYjmnpzpgInkuK3moYbmlL7lpKfkuI7lubPnp7vliqjnlLvvvIzlr7nlupRmb2N1c1R5cGXkuLoxNeaIljE2XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuc2VsZWN0aW9uSUQgPSBvYmouc2VsZWN0aW9uSUQgfHwgJ3NlbGVjdGlvbklEJztcclxuICAgICAgICAgICAgICAgICAgICAvL+enu+WKqOmAieS4reahhmlk77yM5q2k6YCJ5Lit5qGG5piv55So5oi36Ieq5bex6KaB5ZyoaHRtbOS4reaMh+WumuWFg+e0oOeahGlk77yM5a+55bqU5pWI5p6c5piv5bmz56e76YCJ5Lit5qGG77yM5LiN5a2Y5Zyo5pS+5aSn5Yqo55S777yM5LiOc2VsZWN0Qm9yZGVySWTnmoTljLrliKvlsLHmmK/lroPmmK/mjqfliLbkvY3nva7msqHmnInliqjnlLvvvIxzZWxlY3Rpb25PYmpJZOaYr+aOp+WItuS9jee9ruacieWKqOeUu++8jOWvueW6lGZvY3VzVHlwZUlk5Li6MTdcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5zZWxlY3Rpb25PYmpJRCA9IG9iai5zZWxlY3Rpb25PYmpJRCB8fCBcInNlbGVjdGlvbk9iaklEXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5a+55bqU5bGV56S65Zu+54mH55qE5bGC5qyh5aSn5bCPXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuZm9jdXNJbWdaSW5kZXggPSBvYmouZm9jdXNJbWdaSW5kZXggfHwgOTk4O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWvueW6lOeEpueCueWGhemDqOWbvueJh+eahOWxguasoeWkp+Wwj1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmZvY3VzSW1nUGFyZW50WkluZGV4ID0gb2JqLmZvY3VzSW1nUGFyZW50WkluZGV4IHx8IDk5ODtcclxuICAgICAgICAgICAgICAgICAgICAvLyDlr7nlupTnhKbngrnlhoXpg6jlm77niYfnmoTlsYLmrKHlpKflsI9cclxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5pbWdaSW5kZXggPSBvYmouaW1nWkluZGV4IHx8IDk5OTtcclxuICAgICAgICAgICAgICAgICAgICAvLyDlr7nlupTnhKbngrnlhoXpg6jlm77niYfnmoTniLblhYPntKDnmoTlsYLmrKHlpKflsI9cclxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5pbWdQYXJlbnRaSW5kZXggPSBvYmouaW1nUGFyZW50WkluZGV4IHx8IDk5OTtcclxuICAgICAgICAgICAgICAgICAgICAvL+eEpueCueeahOeItuiKgueCueeahElE5YC8ICBcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbC51cFBhcmVudElkID0gb2JqLnVwUGFyZW50SWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/nlKjmiLfmjqfliLblj6/op4LnnIvljLrln5/nmoTlrrnlmahJROWAvFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLnVwQXJlYUlkID0gb2JqLnVwQXJlYUlkO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5oyJ5Y+z54Sm54K555qE54i26IqC54K555qESUTlgLxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5yaWdodFBhcmVudElkID0gb2JqLnJpZ2h0UGFyZW50SWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mjInlj7PnlKjkuo7mjqfliLblj6/op4LnnIvljLrln5/lrrnlmajnmoRJROWAvFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLnJpZ2h0QXJlYUlkID0gb2JqLnJpZ2h0QXJlYUlkO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5byA5ZCv54i25a655Zmo5rua5YqoLOS4iuS4i+a7muWKqFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmVuVXBQYXJlbnRSb2xsID0gb2JqLmVuVXBQYXJlbnRSb2xsIHx8IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5byA5ZCv54i25a655Zmo5rua5YqoLOW3puWPs+a7muWKqFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmVuUmlnaHRQYXJlbnRSb2xsID0gb2JqLmVuUmlnaHRQYXJlbnRSb2xsIHx8IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5byA5ZCv5pW06aG15rua5YqoXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuZW5SaWdodFBhZ2VSb2xsID0gb2JqLmVuUmlnaHRQYWdlUm9sbCB8fCBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAvL+W9k+WJjeeEpueCuee0ouW8lVxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmZvY3VzSW5kZXggPSBvYmouZm9jdXNJbmRleCB8fCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5b2T5YmN54Sm54K55a+55bqU55qE5b2T5YmN6aG1XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuZm9jdXNDdXJQYWdlTnVtID0gb2JqLmZvY3VzQ3VyUGFnZU51bSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5b2T5YmN54Sm54K55a+55bqU55qE5oC76aG15pWwXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuZm9jdXNBbGxQYWdlTnVtID0gb2JqLmZvY3VzQWxsUGFnZU51bSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vLy/lvZPliY3nhKbngrnpnIDopoHmlbTpobXmu5rliqjnmoRsZWZ05YC8XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuZm9jdXNMZWZ0Um9sbCA9IG9iai5mb2N1c0xlZnRSb2xsIHx8IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lvZPliY3nhKbngrnliJfooajkuK3nrKzkuIDkuKrnhKbngrnnmoRsZWZ05YC8XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuZm9jdXNGaXJzdExlZnQgPSBvYmouZm9jdXNGaXJzdExlZnQgfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICAvL+W9k+WJjeeEpueCueWvueW6lOmhteeggeeahOaJgOacieeEpueCuWlkLOivpeWAvOS4uuaVsOe7hOWvueixoVxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmZvY3VzUGFnZUFsbE1vZGVsID0gb2JqLmZvY3VzUGFnZUFsbE1vZGVsIHx8IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5ZCN56ewXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwubmFtZSA9IG9iai5uYW1lIHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOaMh+Wumuenu+WKqOWIsOeEpueCueS4iuaXtu+8jOaJp+ihjOeahOS6i+S7tlxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLm9uRm9jdXNFdmVudCA9IG9iai5vbkZvY3VzRXZlbnQgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5oyH5a6a5aSx5Y6754Sm54K55pe277yM5omn6KGM55qE5LqL5Lu2XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwub25CbHVyRXZlbnQgPSBvYmoub25CbHVyRXZlbnQgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5oyH5a6a56e75Yqo6L655qGG55qE6YCf5bqmXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwudHdlZW5TcGVlZCA9IG9iai50d2VlblNwZWVkIHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvY3VzVHlwZeS4ujEw55qE5pe25YCZ6ZyA6KaB55qE6YCJ5Lit5qGGaWRcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5zZWxlY3RCb3JkZXJJZCA9IG9iai5zZWxlY3RCb3JkZXJJZCB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICAvL+S7o+abv+m7mOiupOiOt+WPlueEpueCueaXtueahOihjOS4ulxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLm9uRm9jdXNfID0gb2JqLm9uRm9jdXNfIHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5Luj5pu/6buY6K6k5aSx5Y6754Sm54K55pe255qE6KGM5Li6XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwub25CbHVyXyA9IG9iai5vbkJsdXJfIHx8ICcnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioq5pa55ZCR5Yid5aeL5YyWKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpcmVkZW1wID0gbmV3IGlwdHYuRGlyZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVkZW1wLm90aGVyID0gb2JqLm90aGVyIHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVkZW1wLm90aGVyRXZlbnQgPSBvYmoub3RoZXJFdmVudCB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICBkaXJlZGVtcC5sZWZ0ID0gb2JqLmxlZnQgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWRlbXAucmlnaHQgPSBvYmoucmlnaHQgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWRlbXAudXAgPSBvYmoudXAgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWRlbXAuZG93biA9IG9iai5kb3duIHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVkZW1wLnVwRXZlbnQgPSBvYmoudXBFdmVudCB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICBkaXJlZGVtcC5kb3duRXZlbnQgPSBvYmouZG93bkV2ZW50IHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVkZW1wLmxlZnRFdmVudCA9IG9iai5sZWZ0RXZlbnQgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWRlbXAucmlnaHRFdmVudCA9IG9iai5yaWdodEV2ZW50IHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVkZW1wLnVwT3RoZXIgPSBvYmoudXBPdGhlciB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICBkaXJlZGVtcC5kb3duT3RoZXIgPSBvYmouZG93bk90aGVyIHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVkZW1wLmxlZnRPdGhlciA9IG9iai5sZWZ0T3RoZXIgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWRlbXAucmlnaHRPdGhlciA9IG9iai5yaWdodE90aGVyIHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVkZW1wLnVwT3RoZXJFdmVudCA9IG9iai51cE90aGVyRXZlbnQgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWRlbXAucmlnaHRPdGhlckV2ZW50ID0gb2JqLnJpZ2h0T3RoZXJFdmVudCB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICBkaXJlZGVtcC5kb3duT3RoZXJFdmVudCA9IG9iai5kb3duT3RoZXJFdmVudCB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICBkaXJlZGVtcC5sZWZ0T3RoZXJFdmVudCA9IG9iai5sZWZ0T3RoZXJFdmVudCB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICBkaXJlZGVtcC5yaWdodE5vRXZlbnQgPSBvYmoucmlnaHROb0V2ZW50IHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVkZW1wLnJpZ2h0Tm8gPSBvYmoucmlnaHRObyB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICBkaXJlZGVtcC5sZWZ0Tm9FdmVudCA9IG9iai5sZWZ0Tm9FdmVudCB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICBkaXJlZGVtcC5sZWZ0Tm8gPSBvYmoubGVmdE5vIHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVkZW1wLmRvd25Ob0V2ZW50ID0gb2JqLmRvd25Ob0V2ZW50IHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVkZW1wLmRvd25ObyA9IG9iai5kb3duTm8gfHwgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWRlbXAudXBOb0V2ZW50ID0gb2JqLnVwTm9FdmVudCB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICBkaXJlZGVtcC51cE5vID0gb2JqLnVwTm8gfHwgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9jdXNEaXJlc1tpZF0gPSBkaXJlZGVtcDtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5kaWVBcnIgPSBkaXJlZGVtcDtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8v6K+l5oyJ6ZKu5bey57uP6YCa6L+H5Yid5aeL5YyW5bel5L2cXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuaXNDcmVhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5ub2RlT2JqID0gZG9tT2JqO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbU9iai5mb2N1c09iaiA9IG1vZGVsO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvY3VzQ29sbGVjdGlvbltpZF0gPSBkb21PYmo7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZvY3VzSWQgPyBpcHR2KFwiI1wiK2ZvY3VzSWQpIDogdGhpc18gO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6LCD55So54Sm54K56I635Y+W54Sm54K55pa55rOVXHJcbiAgICAgICAgICogQHJldHVybnMge29uRm9jdXN9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25Gb2N1czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZm9jdXNPYmogPSB0aGlzLmdldEZvY3VzKCk7XHJcbiAgICAgICAgICAgIGlmIChmb2N1c09iaikge1xyXG4gICAgICAgICAgICAgICAgZm9jdXNPYmoub25Gb2N1cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8v5aOw5piO5oyJ6ZSu5Yy/5ZCN5Ye95pWwXHJcbiAgICB2YXIga2V5RG93bkV2ZW50ZnVuY3Rpb24gPSBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgdmFyIGtleUNvZGUgPSBpcHR2LmtleUNvZGUoZXZ0KTtcclxuICAgICAgICB2YXIga2V5TmFtZSA9IGlwdHYua2V5LmdldEtleUNvZGVOYW1lKGtleUNvZGUpO1xyXG4gICAgICAgIGlmIChrZXlDb2RlID09IDB4MDMwMCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1zZ0V2ZW50ID0gVXRpbGl0eS5nZXRFdmVudCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlwdHYuaXNOb3ROdWxsKG1zZ0V2ZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSBldmFsKFwiKFwiICsgbXNnRXZlbnQgKyBcIilcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1zZyAhPSBudWxsICYmIG1zZy50eXBlID09IFwiRVZFTlRfTUVESUFfRU5EXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlwdHYoXCIjaXZpZGVvc1wiKVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXB0dihcIiNpdmlkZW9zXCIpLnNyYyhpcHR2LnZpZGVvVXJsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAoa2V5TmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiT0tcIiA6XHJcbiAgICAgICAgICAgICAgICBpcHR2LmtleS5jdXJGb2N1cy5vbkNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIk9ORVwiIDpcclxuICAgICAgICAgICAgY2FzZSBcIlRXT1wiIDpcclxuICAgICAgICAgICAgY2FzZSBcIlRIUkVFXCIgOlxyXG4gICAgICAgICAgICBjYXNlIFwiRk9VUlwiIDpcclxuICAgICAgICAgICAgY2FzZSBcIkZJVkVcIiA6XHJcbiAgICAgICAgICAgIGNhc2UgXCJTSVhcIiA6XHJcbiAgICAgICAgICAgIGNhc2UgXCJTRVZFTlwiIDpcclxuICAgICAgICAgICAgY2FzZSBcIkVJR0hUXCIgOlxyXG4gICAgICAgICAgICBjYXNlIFwiTklORVwiIDpcclxuICAgICAgICAgICAgY2FzZSBcIlpFUk9cIiA6XHJcbiAgICAgICAgICAgIGNhc2UgXCJERUxcIiA6XHJcbiAgICAgICAgICAgICAgICBpcHR2LmtleS5udW1DaGFuZ2Uoa2V5TmFtZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkxFRlRcIiA6XHJcbiAgICAgICAgICAgIGNhc2UgXCJSSUdIVFwiIDpcclxuICAgICAgICAgICAgY2FzZSBcIlVQXCIgOlxyXG4gICAgICAgICAgICBjYXNlIFwiRE9XTlwiIDpcclxuICAgICAgICAgICAgICAgIGlwdHYua2V5LmZvY3VzSGFuZChrZXlOYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChldnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJIT01FX1BBR0VcIjpcclxuICAgICAgICAgICAgY2FzZSBcIk9VVF9QQUdFXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJCQUNLXCIgOlxyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpcHR2LmlzRnVuY3Rpb24oaXB0di5rZXkuYmFja2Z1bmMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXB0di5rZXkuYmFja2Z1bmMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0IDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy/mt7vliqDmjInplK7kuovku7ZcclxuICAgIGlwdHYoZG9jdW1lbnQpLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGtleURvd25FdmVudGZ1bmN0aW9uKTtcclxuXHJcbn0pKHdpbmRvdywgaXB0dik7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgY2hlcmlzaCBvbiAyMDE4LzExLzI4LlxyXG4gKi9cclxuKGZ1bmN0aW9uICh3aW5kb3csIHVuZGVmaW5lZCkge1xyXG4gICAgdmFyXHJcbiAgICAgICAgLy8g5bCGIHVuZGVmaW5lZCDovazmjaLkuLrlrZfnrKbkuLIgXCJ1bmRlZmluZWRcIlxyXG4gICAgICAgIGNvcmVfc3RydW5kZWZpbmVkID0gdHlwZW9mIHVuZGVmaW5lZCxcclxuXHJcbiAgICAgICAgbG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24sXHJcbiAgICAgICAgZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQsXHJcbiAgICAgICAgZG9jRWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcclxuXHJcbiAgICAgICAgLy/orr7nva7liKvlkI1cclxuICAgICAgICBfaXB0diA9IHdpbmRvdy5pcHR2LFxyXG4gICAgICAgIF8kID0gd2luZG93LiQsXHJcblxyXG4gICAgICAgIC8vIOWCqOWtmOS6huW4uOingeexu+Wei+eahCB0eXBlb2Yg55qE5ZOI5biM6KGoXHJcbiAgICAgICAgLy97XCJbb2JqZWN0IEZ1bmN0aW9uXVwiOlwiZnVuY3Rpb25cIixcIltvYmplY3QgQm9vbGVhbl1cIjpcImJvb2xlYW5cIix9XHJcbiAgICAgICAgY2xhc3MydHlwZSA9IHt9LFxyXG4gICAgICAgIC8vIOWumuS5ieW9k+WJjeeJiOacrFxyXG4gICAgICAgIGNvcmVfdmVyc2lvbiA9ICcxLjAuMScsXHJcbiAgICAgICAgLy8g5YW25qyh77yM6L+Z6YeM5a6a5LmJ5LqG5LiA5Liq56m655qE5pWw57uE5a+56LGhIO+8jOWmguaenOS4i+aWh+ihjOaWh+mcgOimgeiwg+eUqOaVsOe7hOWvueixoeeahCBjb25jYXQg44CBcHVzaCDjgIFzbGljZSDjgIFpbmRleE9mIOaWueazlVxyXG4gICAgICAgIC8vIOWwhuS8muiwg+eUqCBjb3JlX2NvbmNhdCDjgIFjb3JlX3B1c2gg44CBY29yZV9zbGljZSDjgIHlkowgY29yZV9pbmRleE9mIO+8jOi/meWbm+S4quWPmOmHj+S6i+WFiOWtmOWCqOWlveS6hui/meWbm+S4quaWueazleeahOWFpeWPo1xyXG4gICAgICAgIC8vIOWQjOaXtuS9v+eUqCBjYWxsIOaIliBhcHBseSDosIPnlKjov5nkupvmlrnms5XkuZ/lj6/ku6Xkvb/nsbvmlbDnu4TkuZ/og73nlKjliLDmlbDnu4TnmoTmlrnms5VcclxuICAgICAgICBjb3JlX2RlbGV0ZWRJZHMgPSBbXSxcclxuICAgICAgICBjb3JlX2NvbmNhdCA9IGNvcmVfZGVsZXRlZElkcy5jb25jYXQsXHJcbiAgICAgICAgY29yZV9wdXNoID0gY29yZV9kZWxldGVkSWRzLnB1c2gsXHJcbiAgICAgICAgY29yZV9zbGljZSA9IGNvcmVfZGVsZXRlZElkcy5zbGljZSxcclxuICAgICAgICBjb3JlX2luZGV4T2YgPSBjb3JlX2RlbGV0ZWRJZHMuaW5kZXhPZixcclxuXHJcbiAgICAgICAgY29yZV90b1N0cmluZyA9IGNsYXNzMnR5cGUudG9TdHJpbmcsXHJcbiAgICAgICAgLy9oYXNPd25Qcm9wZXJ0eTrov5Tlm55ib29sZWFu5YC877yM5Y+C5pWw5piv5a2X56ym5Liy77yM55So5LqO5qOA5p+l5p+Q5a+56LGh5piv5ZCm5a2Y5Zyo6K+l5a2X56ym5Liy55qE5bGe5oCn77yM6K+l5pa55rOV5LiN5Lya5qOA5p+l5a+56LGh55qE5Y6f5Z6L6ZO+5Lit5piv5ZCm5a2Y5Zyo6K+l5bGe5oCnXHJcbiAgICAgICAgLy92YXIgYSA9IHtuYW1lOlwiblwifTsgYS5oYXNPd25Qcm9wZXJ0eShcIm5hbWVcIik7cmV0dXJuIHRydWVcclxuICAgICAgICBjb3JlX2hhc093biA9IGNsYXNzMnR5cGUuaGFzT3duUHJvcGVydHksXHJcbiAgICAgICAgY29yZV90cmltID0gY29yZV92ZXJzaW9uLnRyaW0sXHJcbiAgICAgICAgLy/ljLnphY3lvIDlpLQjJi7lj7fnmoTku7vmhI/lrZfnrKbvvIzljIXmi6zkuIvliJLnur/kuI4tXHJcbiAgICAgICAgcXVpY2tFeHByID0gLyheWyMmLl0pKFtcXHctXSspJC8sXHJcbiAgICAgICAgcnRyaW0gPSAvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csXHJcbiAgICAgICAgLy/lrprkuYlpcHR25p6E6YCg5Ye95pWwXHJcbiAgICAgICAgaXB0diA9IGZ1bmN0aW9uIChzZWxlY3RvciwgY29udGV4dCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IGlwdHYuZm4uaW5pdChzZWxlY3RvciwgY29udGV4dCk7XHJcbiAgICAgICAgfTtcclxuICAgIC8vIOe7mSBpcHR2LnByb3RvdHlwZSDorr7nva7liKvlkI0gaXB0di5mblxyXG4gICAgLy8gaXB0di5wcm90b3R5cGUg5Y2z5pivIGlwdHbnmoTljp/lnovvvIzmjILovb3lnKggaXB0di5wcm90b3R5cGUg5LiK55qE5pa55rOV77yM5Y2z5Y+v6K6p5omA5pyJIGlwdHYg5a+56LGh5L2/55SoXHJcbiAgICBpcHR2LmZuID0gaXB0di5wcm90b3R5cGUgPSB7XHJcbiAgICAgICAgLy8g5b2T5YmN54mI5pysXHJcbiAgICAgICAgaXB0djogY29yZV92ZXJzaW9uLFxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBpcHR2LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWIneWni+WMluaWueazlVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChzZWxlY3RvciwgY29udGV4dCkge1xyXG4gICAgICAgICAgICAvLyDlpoLmnpzkvKDlhaXnmoTlj4LmlbDkuLrnqbrvvIzliJnnm7TmjqXov5Tlm550aGlzXHJcbiAgICAgICAgICAgIGlmICghc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBtYXRjaDtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBtYXRjaCA9IHF1aWNrRXhwci5leGVjKHNlbGVjdG9yKVxyXG4gICAgICAgICAgICAgICAgLy/lpITnkIZpZCBET01cclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaCAmJiBtYXRjaFsxXSA9PT0gXCIjXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobWF0Y2hbMl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNbMF0gPSBlbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZW5ndGggPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0b3IgPSBtYXRjaFswXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IGRvY3VtZW50O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0b3Iubm9kZVR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0ID0gdGhpc1swXSA9IHNlbGVjdG9yO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZW5ndGggPSAxO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXB0di5pc0Z1bmN0aW9uKHNlbGVjdG9yKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlwdHYucmVhZHkoc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZWN0b3Iuc2VsZWN0b3IgJiYgc2VsZWN0b3IuY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlwdHYoc2VsZWN0b3Iuc2VsZWN0b3IsIHNlbGVjdG9yLmNvbnRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpcHR2LnR5cGUoc2VsZWN0b3IpID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQgPSB0aGlzWzBdID0gc2VsZWN0b3I7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aCA9IDE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGlwdHYudHlwZShzZWxlY3RvcikgPT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0ID0gc2VsZWN0b3I7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICBpcHR2Lm1lcmdlKHRoaXMsIHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy/lvZPliY3mk43kvZznmoTkuIrkuIvmloflr7nosaFcclxuICAgICAgICBjb250ZXh0OiBudWxsLFxyXG4gICAgICAgIC8v5b2T5YmN55qE6YCJ5oup5ZmoXHJcbiAgICAgICAgc2VsZWN0b3I6IFwiXCIsXHJcblxyXG4gICAgfTtcclxuICAgIC8v6YeN572u5Y6f5Z6L5a+56LGh5Li6aXB0dlxyXG4gICAgaXB0di5mbi5pbml0LnByb3RvdHlwZSA9IGlwdHYuZm47XHJcblxyXG4gICAgLy/kuI3lr7nlpJbmlrnms5VcclxuICAgIGZ1bmN0aW9uIGdldHNlYyhzZWMpIHtcclxuICAgICAgICB2YXIgc3RyMSA9IHNlYy5zdWJzdHJpbmcoMSwgc2VjLmxlbmd0aCkgKiAxO1xyXG4gICAgICAgIHZhciBzdHIyID0gc2VjLnN1YnN0cmluZygwLCAxKTtcclxuICAgICAgICBpZiAoc3RyMiA9PSBcIlNcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyMSAqIDEwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHN0cjIgPT0gXCJNXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cjEgKiA2MCAqIDEwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHN0cjIgPT0gXCJIXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cjEgKiA2MCAqIDYwICogMTAwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc3RyMiA9PSBcIkRcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyMSAqIDI0ICogNjAgKiA2MCAqIDEwMDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIDEgKiAyNCAqIDYwICogNjAgKiAxMDAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWumuS5iee7p+aJv+aWueazlVxyXG4gICAgICog5aaC5p6c5Y+q5pyJ5LiA5Liq5Y+C5pWw77yMdGFyZ2V05bCx5pivaXB0duexu+aIlmlwdHblr7nosaHvvIxcclxuICAgICAqIOWmguaenOaciTLkuKrmiJblpJrkuKrlj4LmlbDvvIx0YXJnZXTlsLHmmK/nrKzkuIDkuKrlj4LmlbDvvIzpgqPkuYjlsLHnrKwy5Liq5Y+C5pWw5byA5aeL5LmL5ZCO55qE5omA5pyJ5Y+C5pWw55qE5bGe5oCn5aSN5Yi25Yiw56ys5LiA5Liq5Y+C5pWw5LiK5Y67XHJcbiAgICAgKiDlpoLmnpznrKzkuIDkuKrlj4LmlbDmmK90cnVl77yMdGFyZ2V05bCx5piv56ys5LqM5Liq5Y+C5pWw77yM5LmL5ZCO55qE5Y+C5pWw55qE5bGe5oCn5bCx5aSN5Yi25Yiw56ys5LqM5Liq5Y+C5pWw5Y67XHJcbiAgICAgKiBAdHlwZSB7aXB0di5leHRlbmR9XHJcbiAgICAgKi9cclxuICAgIGlwdHYuZXh0ZW5kID0gaXB0di5mbi5leHRlbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNyYywgY29weUlzQXJyYXksIGNvcHksIG5hbWUsIG9wdGlvbnMsIGNsb25lLFxyXG4gICAgICAgICAgICB0YXJnZXQgPSBhcmd1bWVudHNbMF0gfHwge30sXHJcbiAgICAgICAgICAgIGkgPSAxLFxyXG4gICAgICAgICAgICBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxyXG4gICAgICAgICAgICBkZWVwID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIHRhcmdldCDmmK/kvKDlhaXnmoTnrKzkuIDkuKrlj4LmlbBcclxuICAgICAgICAvLyDlpoLmnpznrKzkuIDkuKrlj4LmlbDmmK/luIPlsJTnsbvlnovvvIzliJnooajnpLrmmK/lkKbopoHmt7HpgJLlvZLvvIxcclxuICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgICAgICAgICAgZGVlcCA9IHRhcmdldDtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gYXJndW1lbnRzWzFdIHx8IHt9O1xyXG4gICAgICAgICAgICAvLyDlpoLmnpzkvKDkuobnsbvlnovkuLogYm9vbGVhbiDnmoTnrKzkuIDkuKrlj4LmlbDvvIxpIOWImeS7jiAyIOW8gOWni1xyXG4gICAgICAgICAgICBpID0gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5aaC5p6c5Lyg5YWl55qE56ys5LiA5Liq5Y+C5pWw5pivIOWtl+espuS4suaIluiAheWFtuS7llxyXG4gICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSBcIm9iamVjdFwiICYmICFpcHR2LmlzRnVuY3Rpb24odGFyZ2V0KSkge1xyXG4gICAgICAgICAgICB0YXJnZXQgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5aaC5p6c5Y+C5pWw55qE6ZW/5bqm5Li6IDEg77yM6KGo56S65pivIGlwdHYg6Z2Z5oCB5pa55rOVXHJcbiAgICAgICAgaWYgKGxlbmd0aCA9PT0gaSkge1xyXG4gICAgICAgICAgICB0YXJnZXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAtLWk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWPr+S7peS8oOWFpeWkmuS4quWkjeWItua6kFxyXG4gICAgICAgIC8vIGkg5piv5LuOIDHmiJYyIOW8gOWni+eahFxyXG4gICAgICAgIGZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8g5bCG5q+P5Liq5rqQ55qE5bGe5oCn5YWo6YOo5aSN5Yi25YiwIHRhcmdldCDkuIpcclxuICAgICAgICAgICAgaWYgKChvcHRpb25zID0gYXJndW1lbnRzW2ldKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XHJcbiAgICAgICAgICAgICAgICBmb3IgKG5hbWUgaW4gb3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNyYyDmmK/mupDvvIjljbPmnKzouqvvvInnmoTlgLxcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb3B5IOaYr+WNs+WwhuimgeWkjeWItui/h+WOu+eahOWAvFxyXG4gICAgICAgICAgICAgICAgICAgIHNyYyA9IHRhcmdldFtuYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICBjb3B5ID0gb3B0aW9uc1tuYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyDpmLLmraLmnInnjq/vvIzkvovlpoIgZXh0ZW5kKHRydWUsIHRhcmdldCwgeyd0YXJnZXQnOnRhcmdldH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IGNvcHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOaYr+a3seWkjeWItlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWVwICYmIGNvcHkgJiYgKGlwdHYuaXNQbGFpbk9iamVjdChjb3B5KSB8fCAoY29weUlzQXJyYXkgPSBpcHR2LmlzQXJyYXkoY29weSkpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmlbDnu4RcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvcHlJc0FycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3B5SXNBcnJheSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmUgPSBzcmMgJiYgaXB0di5pc0FycmF5KHNyYykgPyBzcmMgOiBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWvueixoVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmUgPSBzcmMgJiYgaXB0di5pc1BsYWluT2JqZWN0KHNyYykgPyBzcmMgOiB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDpgJLlvZJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdID0gaXB0di5leHRlbmQoZGVlcCwgY2xvbmUsIGNvcHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29weSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFtuYW1lXSA9IGNvcHk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDkuZ/lsLHmmK/lpoLmnpzkuI3kvKDpnIDopoHopobnm5bnmoTmupDvvIzosIPnlKggJC5leHRlbmQg5YW25a6e5piv5aKe5YqgIGlwdHYg55qE6Z2Z5oCB5pa55rOVXHJcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgIH07XHJcbiAgICAvL+a3u+WKoGlwdHbpnZnmgIHmlrnms5VcclxuICAgIGlwdHYuZXh0ZW5kKHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDph4rmlL5pcHR25a+56LGh5byV55So77yM6Ziy5q2i5YWs5YWx5Ye65Y6755qEaXB0duWPmOmHj+mAoOaIkOaxoeafk+WGsueqge+8jOS5n+WPr+S7peWunueOsOWQjOS4gOS4qumhtemdouacieWkmuS4qmlwdHblupNcclxuICAgICAgICAgKiBAcGFyYW0gZGVlcCDlpoLmnpzkvKB0cnVl77yMJOS4jmlwdHblkIzml7bkuqTnu5nkuobor6Xmlrnms5XnmoTov5Tlm57lgLzvvIzlpoLmnpzkvKBmYWxzZeaIluepuu+8jOWPquaciSTlj5jph4/lsIbkuqTnu5nor6Xmlrnms5XnmoTov5Tlm57lgLxcclxuICAgICAgICAgKiBAcmV0dXJucyB7aXB0dn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBub0NvbmZsaWN0OiBmdW5jdGlvbiAoZGVlcCkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LiQgPT09IGlwdHYpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy4kID0gXyQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkZWVwICYmIHdpbmRvdy5pcHR2ID09PSBpcHR2KSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuaXB0diA9IF9pcHR2O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpcHR2O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJDogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgICAgIGlmIChpZCAmJiBpcHR2LnRyaW0oaWQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXB0di50cmltKGlkKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDpmo/mnLrmlbBcclxuICAgICAgICAgKi9cclxuICAgICAgICBleHBhbmRvOiBcImlwdHZcIiArIChjb3JlX3ZlcnNpb24gKyBNYXRoLnJhbmRvbSgpKS5yZXBsYWNlKC9cXEQvZywgXCJcIiksXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5Yik5pat5Lyg5YWl5a+56LGh5piv5ZCm5Li6IGZ1bmN0aW9uXHJcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaXNGdW5jdGlvbjogZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gaXB0di50eXBlKG9iaikgPT09IFwiZnVuY3Rpb25cIjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWIpOaWreS8oOWFpeWvueixoeaYr+WQpuS4uuaVsOe7hFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzQXJyYXk6IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gaXB0di50eXBlKG9iaikgPT09IFwiYXJyYXlcIjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICDliKTmlq3kvKDlhaXlr7nosaHmmK/lkKbkuLogd2luZG93IOWvueixoVxyXG4gICAgICAgICAqIEBwYXJhbSBvYmpcclxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBpc1dpbmRvdzogZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqICE9IG51bGwgJiYgb2JqID09IG9iai53aW5kb3c7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDnoa7lrprlroPnmoTlj4LmlbDmmK/lkKbmmK/kuIDkuKrmlbDlrZdcclxuICAgICAgICBpc051bWVyaWM6IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAgICAgLy9pc0Zpbml0ZTrlj4LmlbDmmK/kuIDkuKrmlbDlrZfvvIznlKjkuo7liKTmlq3ov5nkuKrmlbDlrZfmmK/lkKbmmK/ml6DnqbflpKfmlbDlrZfvvIzlpoLmnpzmmK/ml6DnqbflpKfvvIzov5Tlm55mYWxzZe+8jOWmguaenOaVsOWtl+ato+W4uOi/lOWbnnRydWVcclxuICAgICAgICAgICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG9iaikpICYmIGlzRmluaXRlKG9iaik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog56Gu5a6aSmF2YVNjcmlwdCDlr7nosaHnmoTnsbvlnotcclxuICAgICAgICAgKiBAcGFyYW0gb2JqXHJcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW4gbnVtYmVyIHN0cmluZyBmdW5jdGlvbiBhcnJheSBkYXRlIHJlZ2V4cCBvYmplY3QgZXJyb3J9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdHlwZTogZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICAvLyDlpoLmnpzkvKDlhaXnmoTkuLogbnVsbCAtLT4gXCJudWxsXCJcclxuICAgICAgICAgICAgaWYgKG9iaiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nKG9iaik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5Yip55So5LqL5YWI5a2Y5aW955qEIGhhc2gg6KGoIGNsYXNzMnR5cGUg5L2c57K+5YeG5Yik5patXHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIiA/XHJcbiAgICAgICAgICAgICAgICBjbGFzczJ0eXBlW2NvcmVfdG9TdHJpbmcuY2FsbChvYmopXSB8fCBcIm9iamVjdFwiIDpcclxuICAgICAgICAgICAgICAgIHR5cGVvZiBvYmo7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmtYvor5Xlr7nosaHmmK/lkKbmmK/nuq/nsrnnmoTlr7nosaFcclxuICAgICAgICAgKiDpgJrov4cgXCJ7fVwiIOaIluiAhSBcIm5ldyBPYmplY3RcIiDliJvlu7rnmoRcclxuICAgICAgICAgKiBAcGFyYW0gb2JqXHJcbiAgICAgICAgICogQHJldHVybnMge0Jvb2xlYW4gLE51bWJlciAsU3RyaW5nICxGdW5jdGlvbiAsQXJyYXkgLERhdGUgLFJlZ0V4cCAsT2JqZWN0ICxFcnJvcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBpc1BsYWluT2JqZWN0OiBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXk7XHJcbiAgICAgICAgICAgIGlmICghb2JqIHx8IGlwdHYudHlwZShvYmopICE9PSBcIm9iamVjdFwiIHx8IG9iai5ub2RlVHlwZSB8fCBpcHR2LmlzV2luZG93KG9iaikpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmouY29uc3RydWN0b3IgJiZcclxuICAgICAgICAgICAgICAgICAgICAhY29yZV9oYXNPd24uY2FsbChvYmosIFwiY29uc3RydWN0b3JcIikgJiZcclxuICAgICAgICAgICAgICAgICAgICAhY29yZV9oYXNPd24uY2FsbChvYmouY29uc3RydWN0b3IucHJvdG90eXBlLCBcImlzUHJvdG90eXBlT2ZcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXB0di5zdXBwb3J0Lm93bkxhc3QpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoa2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3JlX2hhc093bi5jYWxsKG9iaiwga2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGtleSA9PT0gdW5kZWZpbmVkIHx8IGNvcmVfaGFzT3duLmNhbGwob2JqLCBrZXkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6L+U5Zue5a+56LGh5piv5ZCm5piv5pWw57uE6L+Y5piv57G75pWw57uE5a+56LGhXHJcbiAgICAgICAgICogQHBhcmFtIG9ialxyXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlOuaYr+aVsOe7hO+8jGZhbHNlOuS4jeaYr+e6r+aVsOe7hFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzQXJyYXlsaWtlOiBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBsZW5ndGggPSBvYmoubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgdHlwZSA9IGlwdHYudHlwZShvYmopO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlwdHYuaXNXaW5kb3cob2JqKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob2JqLm5vZGVUeXBlID09PSAxICYmIGxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlID09PSBcImFycmF5XCIgfHwgdHlwZSAhPT0gXCJmdW5jdGlvblwiICYmIChsZW5ndGggPT09IDAgfHwgdHlwZW9mIGxlbmd0aCA9PT0gXCJudW1iZXJcIiAmJiBsZW5ndGggPiAwICYmIChsZW5ndGggLSAxKSBpbiBvYmopO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5qOA5p+l5a+56LGh5piv5ZCm5Li656m677yI5LiN5YyF5ZCr5Lu75L2V5bGe5oCn77yJXHJcbiAgICAgICAgICogQHBhcmFtIG9ialxyXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzRW1wdHlPYmplY3Q6IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAgICAgdmFyIG5hbWU7XHJcbiAgICAgICAgICAgIGZvciAobmFtZSBpbiBvYmopIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOS4uiBKYXZhU2NyaXB0IOeahCBcImVycm9yXCIg5LqL5Lu257uR5a6a5LiA5Liq5aSE55CG5Ye95pWwXHJcbiAgICAgICAgICogQHBhcmFtIG1zZyDplJnor6/mj4/ov7BcclxuICAgICAgICAgKi9cclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWOu+mZpOWJjeWQjuepuuagvFxyXG4gICAgICAgICAqIEBwYXJhbSB0ZXh0XHJcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0cmltOiBmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dCA9PSBudWxsID8gXCJcIiA6ICh0ZXh0ICsgXCJcIikucmVwbGFjZShydHJpbSwgXCJcIik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBldmFs55qE5Y+Y5byC77yM5L2/55So5pWI5p6c5LiA5qC377yM5Y+q5LiN6L+H5piv5Zyo5YWo5bGA5L2c55So5Z+f5Lit5omn6KGMIOWPguaVsGRhdGFcclxuICAgICAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdsb2JhbEV2YWw6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vIOWmguaenCBkYXRhIOS4jeS4uuepulxyXG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBpcHR2LnRyaW0oZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgICh3aW5kb3cuZXhlY1NjcmlwdCB8fCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWcqGNocm9tZeS4gOS6m+aXp+eJiOacrOmHjGV2YWwuY2FsbCggd2luZG93LCBkYXRhICnml6DmlYhcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dbXCJldmFsXCJdLmNhbGwod2luZG93LCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pKGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDliKTmlq3mn5DkuKpET03mmK/lkKbmmK/mjIflrprnmoRuYW1l5ZCN56ewXHJcbiAgICAgICAgICogaXB0di5ub2RlTmFtZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhcIiksXCJoMlwiKS0tLT5yZXR1cm4gdHJ1ZS9mYWxzZVxyXG4gICAgICAgICAqIEBwYXJhbSBlbGVtICBET03oioLngrnlr7nosaFcclxuICAgICAgICAgKiBAcGFyYW0gbmFtZSAg6ZyA6KaB5Yik5pat55qE6IqC54K55ZCN56ewXHJcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbm9kZU5hbWU6IGZ1bmN0aW9uIChlbGVtLCBuYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtLm5vZGVOYW1lICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5b6q546v5pWw57uE5oiW5a+56LGhXHJcbiAgICAgICAgICogQHBhcmFtIG9ialxyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFja1xyXG4gICAgICAgICAqIEBwYXJhbSBhcmdzXHJcbiAgICAgICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZWFjaDogZnVuY3Rpb24gKG9iaiwgY2FsbGJhY2ssIGFyZ3MpIHtcclxuICAgICAgICAgICAgaWYgKCFvYmopcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSxcclxuICAgICAgICAgICAgICAgIGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gb2JqLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGlzQXJyYXkgPSBpcHR2LmlzQXJyYXlsaWtlKG9iaik7IC8vIOWIpOaWreaYr+S4jeaYr+aVsOe7hFxyXG5cclxuICAgICAgICAgICAgLy8g5Lyg5LqG56ys5LiJ5Liq5Y+C5pWwXHJcbiAgICAgICAgICAgIGlmIChhcmdzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g55u45b2T5LqOOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhcmdzID0gW2FyZzEsIGFyZzIsIGFyZzNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYWxsYmFjayhhcmdzMSwgYXJnczIsIGFyZ3MzKeOAgueEtuWQjmNhbGxiYWNr6YeM6L6555qEdGhpc+aMh+WQkeS6hm9ialtpXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrLmFwcGx5KG9ialtpXSwgYXJncyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDms6jmhI/liLDvvIzlvZNjYWxsYmFja+WHveaVsOi/lOWbnuWAvOS8mmZhbHNl55qE5pe25YCZ77yM5rOo5oSP5piv5YWo562J77yB5b6q546v57uT5p2fXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyDpnZ7mlbDnu4RcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpIGluIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrLmFwcGx5KG9ialtpXSwgYXJncyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIOaVsOe7hFxyXG4gICAgICAgICAgICAgICAgaWYgKGlzQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOebuOW9k+S6jmNhbGxiYWNrKGksIG9ialtpXSnjgILnhLblkI5jYWxsYmFja+mHjOi+ueeahHRoaXPmjIflkJHkuoZvYmpbaV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjYWxsYmFjay5jYWxsKG9ialtpXSwgaSwgb2JqW2ldKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOmdnuaVsOe7hFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY2FsbGJhY2suY2FsbChvYmpbaV0sIGksIG9ialtpXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgbWVyZ2XnmoTkuKTkuKrlj4LmlbDlv4XpobvkuLrmlbDnu4TvvIzkvZznlKjlsLHmmK/kv67mlLnnrKzkuIDkuKrmlbDnu4TvvIzkvb/lvpflroPmnKvlsL7liqDkuIrnrKzkuozkuKrmlbDnu4RcclxuICAgICAgICAgKiBAcGFyYW0gZmlyc3RcclxuICAgICAgICAgKiBAcGFyYW0gc2Vjb25kXHJcbiAgICAgICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbWVyZ2U6IGZ1bmN0aW9uIChmaXJzdCwgc2Vjb25kKSB7XHJcbiAgICAgICAgICAgIHZhciBsID0gc2Vjb25kLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGkgPSBmaXJzdC5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBqID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbCA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgZm9yICg7IGogPCBsOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdFtpKytdID0gc2Vjb25kW2pdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKHNlY29uZFtqXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RbaSsrXSA9IHNlY29uZFtqKytdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpcnN0Lmxlbmd0aCA9IGk7XHJcbiAgICAgICAgICAgIHJldHVybiBmaXJzdDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiOt+WPluW9k+WJjeaXtumXtOeahOaXtumXtOaIs1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbm93OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRE9NIHJlYWR5IOaYr+WQpuW3sue7j+WujOaIkFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzUmVhZHk6IGZhbHNlLFxyXG4gICAgICAgIHJlYWR5OiBmdW5jdGlvbiAoY2FsbGJhY2tfKSB7XHJcblxyXG4gICAgICAgICAgICAvLyDnoa7lrpogYm9keSDlrZjlnKhcclxuICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5ib2R5KSB7XHJcbiAgICAgICAgICAgICAgICAvLyDlnKggc2V0VGltZW91dCDkuK3op6blj5HnmoTlh73mlbAsIOS4gOWumuS8muWcqCBET00g5YeG5aSH5a6M5q+V5ZCO6Kem5Y+RXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChpcHR2LnJlYWR5LCAwLCBjYWxsYmFja18pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOiusOW9lSBET00gcmVhZHkg5bey57uP5a6M5oiQXHJcbiAgICAgICAgICAgIGlwdHYuaXNSZWFkeSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRE9N5Yqg6L295a6M5oiQ77yBXCIpO1xyXG4gICAgICAgICAgICBjYWxsYmFja18uY2FsbCh0aGlzLCBpcHR2LmlzUmVhZHkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5rWP6KeI5Zmo5ZCN56ewXHJcbiAgICAgICAgICogQHJldHVybnMgeyp8c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGJyb3dzZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGIzID0gXCJcIjtcclxuICAgICAgICAgICAgdmFyIGI0ID0gbmF2aWdhdG9yLmFwcE5hbWU7XHJcbiAgICAgICAgICAgIGlmIChiNC5pbmRleE9mKFwiaVBhbmVsXCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBiMyA9IFwiaVBhbmVsXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYjQuaW5kZXhPZihcIk1pY3Jvc29mdFwiKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgYjMgPSBcIk1pc2Nyb3NvZnRcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChiNC5pbmRleE9mKFwiR29vZ2xlXCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBiMyA9IFwiR29vZ2xlXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYjQuaW5kZXhPZihcIk5ldHNjYXBlXCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBiMyA9IFwiTmV0c2NhcGVcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChiNC5pbmRleE9mKFwiT3BlcmFcIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGIzID0gXCJPcGVyYVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBiMztcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWIpOaWreaYr+WQpuS4uuepuiDlhbzlrrnmlbDlrZcw5Yik5pat5Li65LiN5Li6bnVsbFxyXG4gICAgICAgICAqIEBwYXJhbSBvYmpcclxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBpc051bGw6IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAgICAgLy8w5Lmf5Yik5pat5Li65pyJ5pWI5YC8XHJcbiAgICAgICAgICAgIHZhciBsXyA9ICcnICsgb2JqO1xyXG4gICAgICAgICAgICB2YXIgbGxfID0gJycgKyAwO1xyXG4gICAgICAgICAgICBpZiAobF8gPT0gbGxfKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZihvYmopID09ICdvYmplY3QnICYmIG9iaiA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Yob2JqKSA9PSAndW5kZWZpbmVkJyB8fCBvYmogPT0gdW5kZWZpbmVkIHx8IG9iaiA9PSBudWxsIHx8IG9iaiA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5Yik5pat5piv5ZCm5LiN5Li656m6ICDlhbzlrrnmlbDlrZcw5Yik5pat5Li65LiN5Li6bnVsbFxyXG4gICAgICAgICAqIEBwYXJhbSBvYmpcclxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBpc05vdE51bGw6IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAgICAgLy8w5Lmf5Yik5pat5Li65pyJ5pWI5YC8XHJcbiAgICAgICAgICAgIHZhciBsXyA9ICcnICsgb2JqO1xyXG4gICAgICAgICAgICB2YXIgbGxfID0gJycgKyAwO1xyXG4gICAgICAgICAgICBpZiAobF8gPT0gbGxfKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mKG9iaikgPT0gJ29iamVjdCcgJiYgb2JqID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mKG9iaikgPT0gJ3VuZGVmaW5lZCcgfHwgb2JqID09IHVuZGVmaW5lZCB8fCBvYmogPT0gbnVsbCB8fCBvYmogPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiuvue9ruaIluiOt+WPlnN0eWxl5qC35byP5YC8XHJcbiAgICAgICAgICogQHBhcmFtIGVsZW1cclxuICAgICAgICAgKiBAcGFyYW0gbmFtZVxyXG4gICAgICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc3R5bGU6IGZ1bmN0aW9uIChlbGVtLCBuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAoIWVsZW0gJiYgIWVsZW1bMF0pcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXB0di5pc0Z1bmN0aW9uKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1bMF0uc3R5bGVbbmFtZV0gPSB2YWx1ZS5jYWxsKGVsZW0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtWzBdLnN0eWxlW25hbWVdID0gXCJcIiArIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbVswXS5zdHlsZVtuYW1lXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+W6aG555uu5ZCN56ew77yMaHR0cDovLzEyNy4wLjAuMTo4MDgwL2JhaWR1L2luZGV4Lmh0bWzigJTigJQ+YmFpZHUvXHJcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXRDb250ZXh0TmFtZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL+iOt+WPluW9k+WJjee9keWdgO+8jOWmgu+8miBodHRwOi8vbG9jYWxob3N0OjgwODMvdWltY2FyZHByai9zaGFyZS9tZXVuLmpzcCAgXHJcbiAgICAgICAgICAgIHZhciBjdXJXd3dQYXRoID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgICAgIC8v6I635Y+W5Li75py65Zyw5Z2A5LmL5ZCO55qE55uu5b2V77yM5aaC77yaIHVpbWNhcmRwcmovc2hhcmUvbWV1bi5qc3AgIFxyXG4gICAgICAgICAgICB2YXIgcGF0aE5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XHJcbiAgICAgICAgICAgIHZhciBwb3MgPSBjdXJXd3dQYXRoLmluZGV4T2YocGF0aE5hbWUpO1xyXG4gICAgICAgICAgICAvL+iOt+WPluS4u+acuuWcsOWdgO+8jOWmgu+8miBodHRwOi8vbG9jYWxob3N0OjgwODMgIFxyXG4gICAgICAgICAgICB2YXIgbG9jYWxob3N0UGFodCA9IGN1cld3d1BhdGguc3Vic3RyaW5nKDAsIHBvcyk7XHJcbiAgICAgICAgICAgIC8v6I635Y+W5bimXCIvXCLnmoTpobnnm67lkI3vvIzlpoLvvJp1aW1jYXJkcHJqL1xyXG4gICAgICAgICAgICB2YXIgcHJvamVjdE5hbWUgPSBwYXRoTmFtZS5zdWJzdHJpbmcoMSwgcGF0aE5hbWUuc3Vic3RyKDEpLmluZGV4T2YoJy8nKSArIDIpO1xyXG4gICAgICAgICAgICAvL3ZhciBwcm9qZWN0TmFtZT1wYXRoTmFtZS5zdWJzdHJpbmcoMCxwYXRoTmFtZS5zdWJzdHIoMSkuaW5kZXhPZignLycpKzEpLS0tLT4vdWltY2FyZHByaiAgXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9qZWN0TmFtZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiOt+WPlmlw5LiO56uv5Y+jICBodHRwOi8vMTI3LjAuMC4xOjgwODBcclxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldEhvc3RQYXRoOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vaHR0cDovL2xvY2FsaG9zdDo4MDgzL3VpbWNhcmRwcmovc2hhcmUvbWV1bi5qc3AgIFxyXG4gICAgICAgICAgICB2YXIgaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG4gICAgICAgICAgICAvL3VpbWNhcmRwcmovc2hhcmUvbWV1bi5qc3AgIFxyXG4gICAgICAgICAgICB2YXIgcGF0aG5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XHJcbiAgICAgICAgICAgIHJldHVybiBocmVmLnN1YnN0cigwLCBocmVmLmxhc3RJbmRleE9mKHBhdGhuYW1lKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5bkuIrkuIvmlofot6/lvoQgIGh0dHA6Ly8xMjcuMC4wLjE6ODA4MC9iYWlkdS9pbmRleC5odG1s4oCU4oCUPmh0dHA6Ly8xMjcuMC4wLjE6ODA4MC9iYWlkdS9cclxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldENvbnRleHRQYXRoOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vaHR0cDovL3d3dy5xaWd1by5jb20vNzIwcC9odG1sL21haW4vbWFpbi5odG1sXHJcbiAgICAgICAgICAgIHZhciBwYXRobmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcclxuICAgICAgICAgICAgdmFyIHQxID0gcGF0aG5hbWUuaW5kZXhPZihcIi9cIiwgMCk7XHJcbiAgICAgICAgICAgIHZhciBzbmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIC8v5Yik5pat5Z+f5ZCN5ZCO6Z2i6L+Y5pyJ5rKh5pyJ6Lev5b6E5LqG77yM5aaC5p6c5pyJ5bCx6I635Y+W5Z+f5ZCNK+W3peeoi+WQjVxyXG4gICAgICAgICAgICBpZiAocGF0aG5hbWUuaW5kZXhPZihcIi9cIiwgdDEgKyAxKSA+IC0xKS8vNVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzbmFtZSA9IHBhdGhuYW1lLnN1YnN0cmluZyh0MSArIDEsIHBhdGhuYW1lLmluZGV4T2YoXCIvXCIsIHQxICsgMSkpO1xyXG4gICAgICAgICAgICAgICAgc25hbWUgPSB0aGlzLmdldEhvc3RQYXRoKCkgKyBcIi9cIiArIHNuYW1lICsgXCIvXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNuYW1lO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5bCG5a+56LGh6L2s5o2i5oiQdXJs5Y+C5pWw6ZO+5o6lICAgIGFhPTEmYmI9MlxyXG4gICAgICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcGFyYW1zOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBhcnIgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChlbmNvZGVVUklDb21wb25lbnQoaSkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChkYXRhW2ldKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFyci5qb2luKFwiJlwiKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGtleUNvZGU6IGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICAgICAgZXZ0ID0gZXZ0ICE9IG51bGwgJiYgZXZ0ICE9IHVuZGVmaW5lZCA/IGV2dCA6IHdpbmRvdy5ldmVudDtcclxuICAgICAgICAgICAgdmFyIGtleUNvZGUgPSBldnQud2hpY2ggIT0gbnVsbCAmJiBldnQud2hpY2ggIT0gdW5kZWZpbmVkICYmIGV2dC53aGljaCAhPSAwID8gZXZ0LndoaWNoIDogZXZ0LmtleUNvZGU7XHJcbiAgICAgICAgICAgIHJldHVybiBrZXlDb2RlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5qC85byP5YyW5a2X56ym5Liy77yM5Yqo5oCB5re75Yqg5YC8XHJcbiAgICAgICAgICogaXB0di5mb3JtYXRTdHIoXCLmiJHnmoTlkI3lrZfmmK97MH0s5oiR5LuK5bm0ezF95bKB5LqGXCIsXCJwZXRlclwiLDEyKeKAlOKAlD7miJHnmoTlkI3lrZfmmK9wZXRlcizmiJHku4rlubQxMuWygeS6hlxyXG4gICAgICAgICAqIEBwYXJhbSBzdHIgICBcIuaIkeeahOWQjeWtl+aYr3swfSzmiJHku4rlubR7MX3lsoHkuoZcIlxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfSDmiJHnmoTlkI3lrZfmmK9wZXRlcizmiJHku4rlubQxMuWygeS6hlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZvcm1hdFN0cjogZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKFwie1wiICsgaSArIFwifVwiLCBhcmd1bWVudHNbaSArIDFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+W5py66aG255uS5Z6L5Y+3XHJcbiAgICAgICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgU1RCVHlwZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEF1dGhlbnRpY2F0aW9uLkNUQ0dldENvbmZpZyhcIlNUQlR5cGVcIik7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY29yZV9zdHJ1bmRlZmluZWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlsIbmlrnms5XkuIrljYfliLDpobbnuqd3aW5kb3flr7nosaHosIPnlKhmbuaWueazlVxyXG4gICAgICAgICAqIEBwYXJhbSBmbiAgICDlj6/ku6XkuLpqc+S7o+eggeWtl+espu+8jOWPr+S7peaYr2Z1bmN0aW9uXHJcbiAgICAgICAgICogQHBhcmFtIGFyZ3MgIOWPr+S7peS4uuaVsOe7hOWPguaVsO+8jOS5n+WPr+S7peS4uuWNleS4quWPguaVsFxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNhbGw6IGZ1bmN0aW9uIChmbiwgYXJncykge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mKGZuKSA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2YWwoXCIoXCIgKyBmbiArIFwiKVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YoZm4pID09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIC8v5aaC5p6c5Y+C5pWw5LiN5piv5pWw57uELOWwseWIm+W7uuaVsOe7hOWPguaVsFxyXG4gICAgICAgICAgICAgICAgaWYgKCFpcHR2LmlzQXJyYXkoYXJncykpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXJyID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goYXJndW1lbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXJncyA9IGFycjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh3aW5kb3csIGFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmsYLmnIDlsI/mlbDkuI7mnIDlpKfmlbDkuYvpl7TnmoTpmo/mnLrmlbDvvIzor6XmlbDmsLjov5zkuI3kvJrnrYnkuo7mnIDlpKfmlbBcclxuICAgICAgICAgKiBAcGFyYW0gTWluXHJcbiAgICAgICAgICogQHBhcmFtIE1heFxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJhbmdlTnVtOiBmdW5jdGlvbiAoTWluLCBNYXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1pbiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChNYXggLSBNaW4pKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOaxguS4pOS4quaXtumXtOeahOWkqeaVsOW3riDml6XmnJ/moLzlvI/kuLogWVlZWS1NTS1kZFxyXG4gICAgICAgICAqIEBwYXJhbSBEYXRlT25lICAgMjAxNy0xMi0xXHJcbiAgICAgICAgICogQHBhcmFtIERhdGVUd28gICAyMDE3LTEtMVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZGF5c0JldHdlZW46IGZ1bmN0aW9uIChEYXRlT25lLCBEYXRlVHdvKSB7XHJcbiAgICAgICAgICAgIHZhciBPbmVNb250aCA9IERhdGVPbmUuc3Vic3RyaW5nKDUsIERhdGVPbmUubGFzdEluZGV4T2YoJy0nKSk7XHJcbiAgICAgICAgICAgIHZhciBPbmVEYXkgPSBEYXRlT25lLnN1YnN0cmluZyhEYXRlT25lLmxlbmd0aCwgRGF0ZU9uZS5sYXN0SW5kZXhPZignLScpICsgMSk7XHJcbiAgICAgICAgICAgIHZhciBPbmVZZWFyID0gRGF0ZU9uZS5zdWJzdHJpbmcoMCwgRGF0ZU9uZS5pbmRleE9mKCctJykpO1xyXG5cclxuICAgICAgICAgICAgdmFyIFR3b01vbnRoID0gRGF0ZVR3by5zdWJzdHJpbmcoNSwgRGF0ZVR3by5sYXN0SW5kZXhPZignLScpKTtcclxuICAgICAgICAgICAgdmFyIFR3b0RheSA9IERhdGVUd28uc3Vic3RyaW5nKERhdGVUd28ubGVuZ3RoLCBEYXRlVHdvLmxhc3RJbmRleE9mKCctJykgKyAxKTtcclxuICAgICAgICAgICAgdmFyIFR3b1llYXIgPSBEYXRlVHdvLnN1YnN0cmluZygwLCBEYXRlVHdvLmluZGV4T2YoJy0nKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2hhID0gKChEYXRlLnBhcnNlKE9uZU1vbnRoICsgJy8nICsgT25lRGF5ICsgJy8nICsgT25lWWVhcikgLSBEYXRlLnBhcnNlKFR3b01vbnRoICsgJy8nICsgVHdvRGF5ICsgJy8nICsgVHdvWWVhcikpIC8gODY0MDAwMDApO1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5hYnMoY2hhKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOeUn+aIkOW9k+WJjeacjeWKoeWZqOaXtumXtOaQk1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJ1blRpbWVJbnRlcnZhbDogc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoaXB0di5zZXJ2ZXJUaW1lc3RhbXAgIT0gdW5kZWZpbmVkICYmIGlwdHYuc2VydmVyVGltZXN0YW1wICE9IG51bGwgJiYgaXB0di5zZXJ2ZXJUaW1lc3RhbXAgIT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGlwdHYuc2VydmVyVGltZXN0YW1wID0gcGFyc2VJbnQoaXB0di5zZXJ2ZXJUaW1lc3RhbXApICsgMTAwMDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlwdHYuc2VydmVyVGltZXN0YW1wID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMDApLFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiOt+WPluW9k+WJjeacjeWKoeWZqOaXtumXtOWvueixoVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtEYXRlfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldFNlcnZlckRhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAoaXB0di5zZXJ2ZXJUaW1lc3RhbXAgIT0gdW5kZWZpbmVkICYmIGlwdHYuc2VydmVyVGltZXN0YW1wICE9IG51bGwgJiYgaXB0di5zZXJ2ZXJUaW1lc3RhbXAgIT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShwYXJzZUludChpcHR2LnNlcnZlclRpbWVzdGFtcCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6K6+572uQ29va2llXHJcbiAgICAgICAgICogQHBhcmFtIG5hbWVcclxuICAgICAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAgICAgKiBAcGFyYW0gdGltZXN0clxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNldENvb2tpZTogZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCB0aW1lc3RyKSB7XHJcbiAgICAgICAgICAgIHZhciBleHAyID0gaXB0di5nZXRTZXJ2ZXJEYXRlKCk7XHJcbiAgICAgICAgICAgIHZhciBpZCA9IHRpbWVzdHIgPyB0aW1lc3RyIDogXCJEMVwiO1xyXG4gICAgICAgICAgICB2YXIgdCA9IGdldHNlYyhpZCk7XHJcbiAgICAgICAgICAgIGV4cDIuc2V0VGltZShleHAyLmdldFRpbWUoKSArIHQpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgKFwiPVwiICsgZXNjYXBlKHZhbHVlKSArIFwiO2V4cGlyZXM9XCIgKyBleHAyLnRvR01UU3RyaW5nKCkgKyBcIjtwYXRoPS87XCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+WQ29va2llXHJcbiAgICAgICAgICogQHBhcmFtIG5hbWVcclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXRDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciBhcnIgPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cChcIihefCApXCIgKyBuYW1lICsgXCI9KFteO10qKSg7fCQpXCIpKTtcclxuICAgICAgICAgICAgdmFyIHMgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZiAoYXJyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHMgPSB1bmVzY2FwZShhcnJbMl0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHMgIT0gbnVsbCAmJiBzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocy5pbmRleE9mKCdcIicsIDApID09IDAgJiYgcy5zdWJzdHJpbmcocy5sZW5ndGggLSAxLCBzLmxlbmd0aCkgPT0gXCJcXFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcyA9IHMuc3Vic3RyaW5nKDEsIHMubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcyA9IHMuc3Vic3RyaW5nKDAsIHMubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDliKDpmaRDb29raWVcclxuICAgICAgICAgKiBAcGFyYW0gbmFtZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGRlbENvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIGV4cCA9IGlwdHYuZ2V0U2VydmVyRGF0ZSgpO1xyXG4gICAgICAgICAgICBleHAuc2V0VGltZShleHAuZ2V0VGltZSgpIC0gMSk7XHJcbiAgICAgICAgICAgIHZhciBjdmFsID0gaXB0di5nZXRDb29raWUobmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChjdmFsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyBcIj1cIiArIGN2YWwgKyBcIjtleHBpcmVzPVwiICsgZXhwLnRvR01UU3RyaW5nKCkgKyBcIjtwYXRoPS87XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiOt+WPllVSTOivt+axguWAvFxyXG4gICAgICAgICAqIEBwYXJhbSBkIHVybCBrZXnlgLxcclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKi9cclxuICAgICAgICByZXF1ZXN0VmFsdWU6IGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgIHZhciBiID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgICAgIHZhciBmID0gYi5pbmRleE9mKFwiP1wiKTtcclxuICAgICAgICAgICAgdmFyIGUgPSBiLnN1YnN0cihmICsgMSk7XHJcbiAgICAgICAgICAgIHZhciBjID0gZS5zcGxpdChcIiZcIik7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGEgPSAwOyBhIDwgYy5sZW5ndGg7IGErKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGcgPSBjW2FdLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChnWzBdLnRvVXBwZXJDYXNlKCkgPT0gZC50b1VwcGVyQ2FzZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdbMV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFwiXCJcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL+a3u+WKoOexu+Wei1xyXG4gICAgaXB0di5lYWNoKFwiQm9vbGVhbiBOdW1iZXIgU3RyaW5nIEZ1bmN0aW9uIEFycmF5IERhdGUgUmVnRXhwIE9iamVjdCBFcnJvclwiLnNwbGl0KFwiIFwiKSwgZnVuY3Rpb24gKGksIG5hbWUpIHtcclxuICAgICAgICBjbGFzczJ0eXBlW1wiW29iamVjdCBcIiArIG5hbWUgKyBcIl1cIl0gPSBuYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICB9KTtcclxuICAgIC8v5omp5bGV5pel5pyfXHJcbiAgICBpcHR2LmV4dGVuZChEYXRlLnByb3RvdHlwZSwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWIpOaWremXsOW5tFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzTGVhcFllYXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICggMCA9PSB0aGlzLmdldFllYXIoKSAlIDQgJiYgKCh0aGlzLmdldFllYXIoKSAlIDEwMCAhPSAwICkgfHwgKHRoaXMuZ2V0WWVhcigpICUgNDAwID09IDAgKSkgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOaXpeacn+agvOW8j+WMllxyXG4gICAgICAgICAq5qC85byPIFlZWVkveXl5eS9ZWS95eSDooajnpLrlubTku71cclxuICAgICAgICAgKiBNTS9NIOaciOS7vVxyXG4gICAgICAgICAqIFcvdyDmmJ/mnJ9cclxuICAgICAgICAgKiBkZC9ERC9kL0Qg5pel5pyfXHJcbiAgICAgICAgICogaGgvSEgvaC9IIOaXtumXtFxyXG4gICAgICAgICAqIG1tL20g5YiG6ZKfXHJcbiAgICAgICAgICogc3MvU1Mvcy9TIOenklxyXG4gICAgICAgICAqIEBwYXJhbSBmb3JtYXRTdHJcclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgICAgKi9cclxuICAgICAgICBGb3JtYXQ6IGZ1bmN0aW9uIChmb3JtYXRTdHIpIHtcclxuICAgICAgICAgICAgdmFyIHN0ciA9IGZvcm1hdFN0cjtcclxuICAgICAgICAgICAgdmFyIFdlZWsgPSBbJ+aXpScsICfkuIAnLCAn5LqMJywgJ+S4iScsICflm5snLCAn5LqUJywgJ+WFrSddO1xyXG5cclxuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoL3l5eXl8WVlZWS8sIHRoaXMuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC95eXxZWS8sICh0aGlzLmdldFllYXIoKSAlIDEwMCkgPiA5ID8gKHRoaXMuZ2V0WWVhcigpICUgMTAwKS50b1N0cmluZygpIDogJzAnICsgKHRoaXMuZ2V0WWVhcigpICUgMTAwKSk7XHJcbiAgICAgICAgICAgIHZhciBtb250aCA9IHRoaXMuZ2V0TW9udGgoKSArIDE7XHJcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9NTS8sIG1vbnRoID4gOSA/IG1vbnRoIDogJzAnICsgbW9udGgpO1xyXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvTS9nLCBtb250aCk7XHJcblxyXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvd3xXL2csIFdlZWtbdGhpcy5nZXREYXkoKV0pO1xyXG5cclxuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoL2RkfERELywgdGhpcy5nZXREYXRlKCkgPiA5ID8gdGhpcy5nZXREYXRlKCkudG9TdHJpbmcoKSA6ICcwJyArIHRoaXMuZ2V0RGF0ZSgpKTtcclxuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoL2R8RC9nLCB0aGlzLmdldERhdGUoKSk7XHJcblxyXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvaGh8SEgvLCB0aGlzLmdldEhvdXJzKCkgPiA5ID8gdGhpcy5nZXRIb3VycygpLnRvU3RyaW5nKCkgOiAnMCcgKyB0aGlzLmdldEhvdXJzKCkpO1xyXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvaHxIL2csIHRoaXMuZ2V0SG91cnMoKSk7XHJcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9tbS8sIHRoaXMuZ2V0TWludXRlcygpID4gOSA/IHRoaXMuZ2V0TWludXRlcygpLnRvU3RyaW5nKCkgOiAnMCcgKyB0aGlzLmdldE1pbnV0ZXMoKSk7XHJcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9tL2csIHRoaXMuZ2V0TWludXRlcygpKTtcclxuXHJcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9zc3xTUy8sIHRoaXMuZ2V0U2Vjb25kcygpID4gOSA/IHRoaXMuZ2V0U2Vjb25kcygpLnRvU3RyaW5nKCkgOiAnMCcgKyB0aGlzLmdldFNlY29uZHMoKSk7XHJcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9zfFMvZywgdGhpcy5nZXRTZWNvbmRzKCkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOaXpeacn+iuoeeul1xyXG4gICAgICAgICAqIEBwYXJhbSBzdHJJbnRlcnZhbFxyXG4gICAgICAgICAqIEBwYXJhbSBOdW1iZXJcclxuICAgICAgICAgKiBAcmV0dXJucyB7RGF0ZX1cclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgICAgKi9cclxuICAgICAgICBEYXRlQWRkOiBmdW5jdGlvbiAoc3RySW50ZXJ2YWwsIE51bWJlcikge1xyXG4gICAgICAgICAgICB2YXIgZHRUbXAgPSB0aGlzO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHN0ckludGVydmFsKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzJyA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKERhdGUucGFyc2UoZHRUbXApICsgKDEwMDAgKiBOdW1iZXIpKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ24nIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5wYXJzZShkdFRtcCkgKyAoNjAwMDAgKiBOdW1iZXIpKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2gnIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5wYXJzZShkdFRtcCkgKyAoMzYwMDAwMCAqIE51bWJlcikpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZCcgOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLnBhcnNlKGR0VG1wKSArICg4NjQwMDAwMCAqIE51bWJlcikpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndycgOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLnBhcnNlKGR0VG1wKSArICgoODY0MDAwMDAgKiA3KSAqIE51bWJlcikpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAncScgOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShkdFRtcC5nZXRGdWxsWWVhcigpLCAoZHRUbXAuZ2V0TW9udGgoKSkgKyBOdW1iZXIgKiAzLCBkdFRtcC5nZXREYXRlKCksIGR0VG1wLmdldEhvdXJzKCksIGR0VG1wLmdldE1pbnV0ZXMoKSwgZHRUbXAuZ2V0U2Vjb25kcygpKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ20nIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoZHRUbXAuZ2V0RnVsbFllYXIoKSwgKGR0VG1wLmdldE1vbnRoKCkpICsgTnVtYmVyLCBkdFRtcC5nZXREYXRlKCksIGR0VG1wLmdldEhvdXJzKCksIGR0VG1wLmdldE1pbnV0ZXMoKSwgZHRUbXAuZ2V0U2Vjb25kcygpKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3knIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoKGR0VG1wLmdldEZ1bGxZZWFyKCkgKyBOdW1iZXIpLCBkdFRtcC5nZXRNb250aCgpLCBkdFRtcC5nZXREYXRlKCksIGR0VG1wLmdldEhvdXJzKCksIGR0VG1wLmdldE1pbnV0ZXMoKSwgZHRUbXAuZ2V0U2Vjb25kcygpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmiorml6XmnJ/liIblibLmiJDmlbDnu4RcclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0b0FycmF5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBteURhdGUgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbXlBcnJheSA9IEFycmF5KCk7XHJcbiAgICAgICAgICAgIG15QXJyYXlbMF0gPSBteURhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICAgICAgbXlBcnJheVsxXSA9IG15RGF0ZS5nZXRNb250aCgpO1xyXG4gICAgICAgICAgICBteUFycmF5WzJdID0gbXlEYXRlLmdldERhdGUoKTtcclxuICAgICAgICAgICAgbXlBcnJheVszXSA9IG15RGF0ZS5nZXRIb3VycygpO1xyXG4gICAgICAgICAgICBteUFycmF5WzRdID0gbXlEYXRlLmdldE1pbnV0ZXMoKTtcclxuICAgICAgICAgICAgbXlBcnJheVs1XSA9IG15RGF0ZS5nZXRTZWNvbmRzKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBteUFycmF5O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5Y+W5b6X5pel5pyf5pWw5o2u5L+h5oGvXHJcbiAgICAgICAgICog5Y+C5pWwIGludGVydmFsIOihqOekuuaVsOaNruexu+Wei1xyXG4gICAgICAgICAqIHkg5bm0IG3mnIggZOaXpSB35pif5pyfIHd35ZGoIGjml7YgbuWIhiBz56eSXHJcbiAgICAgICAgICogQHBhcmFtIGludGVydmFsXHJcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgICAgKi9cclxuICAgICAgICBEYXRlUGFydDogZnVuY3Rpb24gKGludGVydmFsKSB7XHJcbiAgICAgICAgICAgIHZhciBteURhdGUgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcGFydFN0ciA9ICcnO1xyXG4gICAgICAgICAgICB2YXIgV2VlayA9IFsn5pelJywgJ+S4gCcsICfkuownLCAn5LiJJywgJ+WbmycsICfkupQnLCAn5YWtJ107XHJcbiAgICAgICAgICAgIHN3aXRjaCAoaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3knIDpcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0U3RyID0gbXlEYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdtJyA6XHJcbiAgICAgICAgICAgICAgICAgICAgcGFydFN0ciA9IG15RGF0ZS5nZXRNb250aCgpICsgMTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2QnIDpcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0U3RyID0gbXlEYXRlLmdldERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3cnIDpcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0U3RyID0gV2Vla1tteURhdGUuZ2V0RGF5KCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnd3cnIDpcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0U3RyID0gbXlEYXRlLldlZWtOdW1PZlllYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2gnIDpcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0U3RyID0gbXlEYXRlLmdldEhvdXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICduJyA6XHJcbiAgICAgICAgICAgICAgICAgICAgcGFydFN0ciA9IG15RGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzJyA6XHJcbiAgICAgICAgICAgICAgICAgICAgcGFydFN0ciA9IG15RGF0ZS5nZXRTZWNvbmRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHBhcnRTdHI7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy/lrprkuYnlr7nosaHmlrnms5VcclxuICAgIGlwdHYuZm4uZXh0ZW5kKHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDorr7nva7pmpDol49cclxuICAgICAgICAgKiBAcmV0dXJucyB7aGlkZX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBoaWRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBpcHR2LnN0eWxlKHRoaXMsIFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNob3c6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXNbMF0pIHtcclxuICAgICAgICAgICAgICAgIGlwdHYuc3R5bGUodGhpcywgXCJ2aXNpYmlsaXR5XCIsIFwidmlzaWJsZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiuvue9ruaIluiOt+WPlmh0bWxcclxuICAgICAgICAgKiBAcGFyYW0gaHRtbFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtodG1sfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGh0bWw6IGZ1bmN0aW9uIChodG1sKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaHRtbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNbMF0uaW5uZXJIVE1MID0gXCJcIiArIGh0bWw7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzWzBdLmlubmVySFRNTDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmm7/mjaLmiJbojrflj5ZTcmPot6/lvoTlnLDlnYBcclxuICAgICAgICAgKiBAcGFyYW0gc3JjXHJcbiAgICAgICAgICogQHJldHVybnMge3NldFNyY31cclxuICAgICAgICAgKi9cclxuICAgICAgICBzcmM6IGZ1bmN0aW9uIChzcmMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXNbMF0gJiYgaXB0di50cmltKHNyYykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNbMF0uc3JjID0gXCJcIiArIHNyYztcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXNbMF0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzWzBdLnNyYztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiOt+WPluaIluiuvue9ruagt+W8j1xyXG4gICAgICAgICAqIEBwYXJhbSBuYW1lXHJcbiAgICAgICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYXR0cjogZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpcHR2LnN0eWxlKHRoaXMsIG5hbWUsIHZhbHVlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWIpOaWreaYr+WQpuWtmOWcqGNsYXNzTmFtZeagt+W8j+WQjSDlpoLmnpzlrZjlnKjlsLHov5Tlm57kuIDkuKrmlbDnu4Tlr7nosaEg5LiN5a2Y5Zyo5bCx6L+U5Zue5Li6TnVsbFxyXG4gICAgICAgICAqIEBwYXJhbSBjbGFzc05hbWVcclxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBoYXNDbGFzczogZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoIWNsYXNzTmFtZSB8fCAhdGhpc1swXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzWzBdLmNsYXNzTmFtZS5tYXRjaChuZXcgUmVnRXhwKCcoXFxcXHN8XiknICsgY2xhc3NOYW1lICsgJyhcXFxcc3wkKScpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOa3u+WKoOexu+agt+W8j1xyXG4gICAgICAgICAqIEBwYXJhbSBjbGFzc05hbWVcclxuICAgICAgICAgKiBAcmV0dXJucyB7YWRkQ2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYWRkQ2xhc3M6IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgaWYgKCFjbGFzc05hbWUgfHwgIXRoaXNbMF0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5oYXNDbGFzcyhjbGFzc05hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzWzBdLmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc05hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDnp7vpmaTnsbvmoLflvI9cclxuICAgICAgICAgKiBAcGFyYW0gY2xhc3NOYW1lXHJcbiAgICAgICAgICogQHJldHVybnMge3JlbW92ZUNsYXNzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIGlmICghY2xhc3NOYW1lIHx8ICF0aGlzWzBdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNDbGFzcyhjbGFzc05hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzWzBdLmNsYXNzTmFtZSA9IHRoaXNbMF0uY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKFxcXFxzfF4pJyArIGNsYXNzTmFtZSArICcoXFxcXHN8JCknKSwgJyAnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWmguaenOWtmOWcqOWwseWIoOmZpGNsYXNzTmFtZeagt+W8j++8jOWmguaenOS4jeWtmOWcqOWwsea3u+WKoGNsYXNzTmFtZeagt+W8j1xyXG4gICAgICAgICAqIEBwYXJhbSBjbGFzc05hbWVcclxuICAgICAgICAgKiBAcmV0dXJucyB7dG9nZ2xlQ2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdG9nZ2xlQ2xhc3M6IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgaWYgKCFjbGFzc05hbWUgfHwgIXRoaXNbMF0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0NsYXNzKGNsYXNzTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUNsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hZGRDbGFzcyhjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmt7vliqDkuovku7ZcclxuICAgICAgICAgKiBAcGFyYW0gdHlwZVxyXG4gICAgICAgICAqIEBwYXJhbSBmdW5jXHJcbiAgICAgICAgICogQHJldHVybnMge2FkZEV2ZW50fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uICh0eXBlLCBmdW5jKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpc1swXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXNbMF0uYWRkRXZlbnRMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgLy/nm5HlkKxJRTnvvIzosLfmrYzlkozngavni5AgXHJcbiAgICAgICAgICAgICAgICB0aGlzWzBdLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZnVuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXNbMF0uYXR0YWNoRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNbMF0uYXR0YWNoRXZlbnQoXCJvblwiICsgdHlwZSwgZnVuYyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzWzBdW1wib25cIiArIHR5cGVdID0gZnVuYztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOenu+mZpOS6i+S7tlxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRcclxuICAgICAgICAgKiBAcGFyYW0gdHlwZVxyXG4gICAgICAgICAqIEBwYXJhbSBmdW5jXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gKHR5cGUsIGZ1bmMpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzWzBdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpc1swXS5yZW1vdmVFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICAvL+ebkeWQrElFOe+8jOiwt+atjOWSjOeBq+eLkCBcclxuICAgICAgICAgICAgICAgIHRoaXNbMF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBmdW5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpc1swXS5kZXRhY2hFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpc1swXS5kZXRhY2hFdmVudChcIm9uXCIgKyB0eXBlLCBmdW5jKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0YXJnZXRbXCJvblwiICsgdHlwZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDorr7nva5jc3Mz5qC35byPXHJcbiAgICAgICAgICogQHBhcmFtIG9iakF0dHJcclxuICAgICAgICAgKi9cclxuICAgICAgICBzZXRDc3MzOiBmdW5jdGlvbiAob2JqQXR0cikge1xyXG4gICAgICAgICAgICAvL+W+queOr+WxnuaAp+WvueixoVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIG9iakF0dHIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdpID0gaTtcclxuICAgICAgICAgICAgICAgIC8v5Yik5pat5piv5ZCm5a2Y5ZyodHJhbnNmb3JtLW9yaWdpbui/meagt+agvOW8j+eahOWxnuaAp1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld2kuaW5kZXhPZihcIi1cIikgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lsIYtb+Wtl+espuWPmOaIkOWkp+WGmS1PXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG51bSA9IG5ld2kuaW5kZXhPZihcIi1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3aSA9IG5ld2kucmVwbGFjZShuZXdpLnN1YnN0cihudW0sIDIpLCBuZXdpLnN1YnN0cihudW0gKyAxLCAxKS50b1VwcGVyQ2FzZSgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v6ICD6JmR5YiwY3NzM+eahOWFvOWuueaAp+mXrumimCzmiYDku6Xov5nkupvlsZ7mgKfpg73lv4XpobvliqDliY3nvIDmiY3ooYxcclxuICAgICAgICAgICAgICAgIHRoaXNbMF0uc3R5bGVbbmV3aV0gPSBvYmpBdHRyW2ldO1xyXG4gICAgICAgICAgICAgICAgLy/orr7nva7pppblrZfmr43lpKflhpkgICBcclxuICAgICAgICAgICAgICAgIG5ld2kgPSBuZXdpLnJlcGxhY2UobmV3aS5jaGFyQXQoMCksIG5ld2kuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpc1swXS5zdHlsZVtcIndlYmtpdFwiICsgbmV3aV0gPSBvYmpBdHRyW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpc1swXS5zdHlsZVtcIm1velwiICsgbmV3aV0gPSBvYmpBdHRyW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpc1swXS5zdHlsZVtcIm9cIiArIG5ld2ldID0gb2JqQXR0cltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXNbMF0uc3R5bGVbXCJtc1wiICsgbmV3aV0gPSBvYmpBdHRyW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpc1swXS5zdHlsZVtcImtodG1sXCIgKyBuZXdpXSA9IG9iakF0dHJbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbnRhaW5zOiBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRleHQgJiYgaXB0di5pc0FycmF5KHRoaXMuY29udGV4dCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpID0gdGhpcy5jb250ZXh0Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0W2ldID09PSBrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL+WumuS5iWFqYXjmqKHlnZdcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVhIUigpIHtcclxuICAgICAgICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9IFwidW5kZWZpbmVkXCIpIHsgLy8g6Z2eSUU25rWP6KeI5ZmoXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBBY3RpdmVYT2JqZWN0ICE9IFwidW5kZWZpbmVkXCIpIHsgICAvLyBJRTbmtY/op4jlmahcclxuICAgICAgICAgICAgdmFyIHZlcnNpb24gPSBbXCJNU1hNTDIuWE1MSHR0cC42LjBcIiwgXCJNU1hNTDIuWE1MSHR0cC4zLjBcIiwgXCJNU1hNTDIuWE1MSHR0cFwiLF07XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmVyc2lvbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QodmVyc2lvbltpXSk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXB0di5leHRlbmQoe1xyXG4gICAgICAgIGFqYXg6IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAgICAgb2JqID0gb2JqIHx8IHt9O1xyXG4gICAgICAgICAgICBvYmoubWV0aG9kID0gb2JqLm1ldGhvZC50b1VwcGVyQ2FzZSgpIHx8ICdQT1NUJztcclxuICAgICAgICAgICAgb2JqLnVybCA9IG9iai51cmwgfHwgJyc7XHJcbiAgICAgICAgICAgIG9iai51cmwgKz0gb2JqLnVybC5pbmRleE9mKFwiP1wiKSA9PSAtMSA/IFwiP3JhbmQ9XCIgKyBNYXRoLnJhbmRvbSgpIDogXCImcmFuZD1cIiArIE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgICAgIG9iai5kYXRhID0gb2JqLmRhdGEgfHwge307XHJcbiAgICAgICAgICAgIG9iai5hc3luYyA9IG9iai5hc3luYyB8fCB0cnVlO1xyXG4gICAgICAgICAgICBvYmouc3VjY2VzcyA9IG9iai5zdWNjZXNzIHx8IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG9iai5lcnJvciA9IG9iai5lcnJvciB8fCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBvYmouZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zLnB1c2goa2V5ICsgXCI9XCIgKyBvYmouZGF0YVtrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcG9zdERhdGEgPSBwYXJhbXMuam9pbihcIiZcIik7XHJcbiAgICAgICAgICAgIHZhciB4aHIgPSBjcmVhdGVYSFIoKTtcclxuICAgICAgICAgICAgaWYgKG9iai5tZXRob2QgPT09IFwiUE9TVFwiKSB7XHJcbiAgICAgICAgICAgICAgICB4aHIub3BlbihvYmoubWV0aG9kLCBvYmoudXJsLCBvYmouYXN5bmMpO1xyXG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xyXG4gICAgICAgICAgICAgICAgeGhyLnNlbmQocG9zdERhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9iai5tZXRob2QgPT09IFwiR0VUXCIpIHtcclxuICAgICAgICAgICAgICAgIHhoci5vcGVuKG9iai5tZXRob2QsIG9iai51cmwgKyAnJicgKyBwb3N0RGF0YSwgb2JqLmFzeW5jKTtcclxuICAgICAgICAgICAgICAgIHhoci5zZW5kKG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4aHIucmVzcG9uc2VUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZU9iaiA9IGV2YWwoXCIoXCIgKyB4aHIucmVzcG9uc2VUZXh0ICsgXCIpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+eZu+mZhuWkseaViFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2VPYmogJiYgcmVzcG9uc2VPYmouY29kZSA9PSAxMDAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGlwdHYuRXJyb3JMb2dpbkZhaWxVcmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2VPYmogPT0gbnVsbCB8fCByZXNwb25zZU9iaiA9PSBcIlwiIHx8IHJlc3BvbnNlT2JqLmNvZGUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBpcHR2LkVycm9yU2VydmVyRmFpbFVybDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5zdWNjZXNzKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHhoci5yZWFkeVN0YXRlID09IDQgJiYgeGhyLnN0YXR1cyAhPSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmouZXJyb3IoeGhyLnN0YXR1cywgeGhyLnN0YXR1c1RleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIG1vZHVsZSAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGlwdHY7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xyXG4gICAgICAgICAgICBkZWZpbmUoXCJpcHR2XCIsIFtdLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXB0djtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB3aW5kb3cuZG9jdW1lbnQgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICB3aW5kb3cuaXB0diA9IHdpbmRvdy4kID0gaXB0djtcclxuICAgIH1cclxufSkod2luZG93KTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcclxuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxyXG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0fVxyXG5cdHJldHVybiBtb2R1bGU7XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=