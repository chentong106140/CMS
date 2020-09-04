/**
 * Created by cherish on 2017/12/14.
 */
import iptv from 'morgan-iptv-core'

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
             * 按键回调
             * iptv.extend(iptv.key.keyCallBack,{
             *    say:function(a,b){
             *          return true;
             *      }
             *  });
             */
            keyCallBack:{},
            /**
             * 是否禁用方向按键，默认不禁用
             */
            displayDire: false,
            /**
             * 是否禁用所有按键，默认不禁用
             */
            displayKey: false,
            event: null,
            /**
             * 单次长按对象
             */
            single: {
                /**
                 * 判定为长按的长按时长
                 */
                loogPressTime: 500,
                /**
                 * 是否已经处理过长按
                 */
                loogPressDispose: false,
                /**
                 * 是否已经处理短按
                 */
                pressDispose: false,
                /**
                 * 长按计时器
                 */
                loogPressTimer: null,
                /**
                 * 长按事件
                 */
                pressEvent: null
            },
            /**
             * 连续长按对象
             */
            continuous: {
                //开始按键时间，毫秒数
                startTime: 0,
                //结束按键时间，毫秒数
                endTime: 0,
                //标记连续长按是否至少一次被执行过回调，如果一次都没有被执行，说明用户持续按下的时长没有达到要求
                loogPressDispose:false,
                //连续长按是否结束
                isEnd: false,
                //计时器
                continuousTimer: null,
                //连续长按时，每次执行长按事件的间隔时间，毫秒数，默认500毫秒，用户可通过焦点注册时指定时长
                continuousTime: 500,
                //连续长按回调事件，长按过程中，会重复执行
                pressEvent: null,
                //连续长按结束时间，长按结束后，只执行一次
                endPressEvent: null
            },
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
                if (!dire)return;
                key.lastDire = dire;
                var fDires = focusDires[curFocus.id];
                if (!fDires) return;
                if (fDires[dire + "Event"]) {
                    // 当前焦点，往某方向按键时具有优先执行，如果指定了方向事件，就不会切换当前焦点，而去执行事件
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
                        //主要处理那些原本设置了down对应的焦点，但是却被禁用了这种情况下会用到Other，记住是被禁用了才会用到
                    } else if (nextNode && nextNode.enFocus == false && fDires[dire + "OtherEvent"]) {

                        key.exeCode(fDires[dire + "OtherEvent"]);
                        return;
                    } else if (nextNode && nextNode.enFocus == false && fDires[dire + "Other"]) {
                        // 如果down对应的焦点被禁用了，查找是否设置了downOther焦点
                        var otherNode = iptv("#" + fDires[dire + "Other"]).getFocus();
                        if (otherNode && otherNode.enFocus == true) {
                            key.changeFocus(fDires[dire + "Other"]);
                            return;
                        }
                    } else if (!nextNode && fDires[dire + "NoEvent"]) {
                        //上面的几个判断都是用于当指定的方向焦点被禁用了（同时指定了leftOther,leftOtherEvent属性）做的处理，
                        //下面这几个判断都是用于虽然指定了方向焦点，但是被指定的焦点没有被注册过，也就是说焦点池内找不到left这个方向指定的焦点，同时又指定了leftNo，leftNoEvent属性做的处理
                        key.exeCode(fDires[dire + "NoEvent"]);
                        return;
                    } else if (!nextNode && fDires[dire + "No"]) {
                        // 同上
                        var otherNode = iptv("#" + fDires[dire + "No"]).getFocus();
                        if (otherNode && otherNode.enFocus == true) {
                            key.changeFocus(fDires[dire + "No"]);
                            return;
                        }
                    }
                } else if (fDires.otherEvent) {
                    //当焦点没有指定方向事件属性例如leftEvent,upEvent...，也没有指定方向焦点属性例如left,up...此时只指定了otherEvent属性
                    //也就是说，当焦点不需要指定任何方向事件，方向id，直接一个otherEvent属性就能满足，用户在按任何方向的时候都执行一个事件
                    key.exeCode(fDires.otherEvent);
                    return;
                } else if (fDires.other) {
                    //同上，当没有指定任何方向属性时，直接一个other属性就能实现用户按任何方向都到一个焦点上
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
                key.lastDire = "";
            },
            /**
             * 针对按键，处理按键相关事件
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
             * 全局长按事件
             */
            longPress: {
                //用于记录当前正在执行的是哪个单次长按事件
                pressEvent: null,
                okLongPressEvent: null,
                upLongPressEvent: null,
                downLongPressEvent: null,
                leftLongPressEvent: null,
                rightLongPressEvent: null,
                oneLongPressEvent: null,
                twoLongPressEvent: null,
                threeLongPressEvent: null,
                fourLongPressEvent: null,
                fiveLongPressEvent: null,
                sixLongPressEvent: null,
                sevenLongPressEvent: null,
                eightLongPressEvent: null,
                nineLongPressEvent: null,
                zeroLongPressEvent: null,
                delLongPressEvent: null,
            },

            /**
             * 切换焦点方法
             * @param focusId_
             * @returns {*}
             */
            changeFocus: function (focus) {
                // 通过focusID找到焦点对象
                var nextNode = iptv.type(focus) === "string" ? iptv("#" + focus).getFocus() : (iptv.type(focus) === "object" ? focus : null);
                if (nextNode && nextNode.enFocus === true) {
                    var oldFocus = curFocus;
                    //在让老焦点失去焦点之前，告诉老焦点下一个当前焦点的id
                    oldFocus.nextFocusId = nextNode.id;
                    // 切换新焦点之前，需要执行失去焦点事件
                    oldFocus.onBlur();
                    var lastBlurEvent = "";
                    //失去焦点的同时，执行当前按键方向，进行单独失去焦点的事件onUpBlurEvent,onDownBlurEvent
                    var fDires = iptv.focusDires[oldFocus.id];
                    if (key.lastDire && fDires && (lastBlurEvent = fDires["on" + iptv.firstCase(key.lastDire) + "BlurEvent"])) {
                        key.exeCode(lastBlurEvent);
                    }
                    var fid = oldFocus.id;
                    // 给当前焦点重新赋值
                    curFocus = nextNode;
                    //在让新焦点获取焦点之前，告诉新焦点上一个焦点的id
                    curFocus.lastFocusId = fid;
                    curFocus.onFocus();
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
                    if (curFocus.enable == true) {
                        // 如果执行了页面跳转，就禁止再次点击跳转
                        curFocus.enable = false;
                        window.location.href = iptv.urlDispose(url, {v: (new Date()).getTime()});
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
                            _code.call(curFocus);
                        }

                    } catch (e) {
                        iptv.error(e);
                    }
                }
            }

        },

        progress = iptv.progress = {
            verticalProgress:null,
            horizontalProgress:null,
            createDom:function(n1,n2){
                var progress = iptv.$(n1);
                var progressPercent = iptv.$(n2);
                if(!progress || !progressPercent ){
                    progress = document.createElement("div");
                    progress.className = n1;
                    progress.setAttribute("id", n1);
                    progress.id = n1;

                    progressPercent = document.createElement("div");
                    progressPercent.className = n2;
                    progressPercent.setAttribute("id", n2);
                    progressPercent.id = n2;

                    progress.appendChild(progressPercent);
                    document.body.appendChild(progress);
                    return progressPercent;
                }
            },
            vInit:function () {
                if(!this.verticalProgress){
                    this.verticalProgress = this.createDom("iptv-vertical-progress","iptv-vertical-progress-percent");
                }
            },
            hInit:function () {
                if(!this.horizontalProgress){
                    this.horizontalProgress = this.createDom("iptv-horizontal-progress","iptv-horizontal-progress-percent");
                }
            },
            /**
             *
             * @param verticalPro   垂直百分比
             * @param horizontalPro 视频百分比
             */
            per:function (verticalPro,horizontalPro) {
                if(this.verticalProgress && verticalPro>=0){
                    var parentHeight = iptv(this.verticalProgress.parentNode).height();
                    var height = parentHeight * verticalPro;
                    iptv(this.verticalProgress).height(height);
                }

                if(this.horizontalProgress && horizontalPro>=0 && horizontalPro<=1){
                    var parentWidth = iptv(this.horizontalProgress.parentNode).width();
                    var width = parentWidth * horizontalPro;
                    iptv(this.horizontalProgress).width(width);
                }

            },
            vShow:function () {
                if(this.verticalProgress){
                    iptv(this.verticalProgress.parentNode).show();
                }
            },
            vHide:function () {
                if(this.verticalProgress){
                    iptv(this.verticalProgress.parentNode).hide();
                }
            },
            hShow:function () {
                if(this.horizontalProgress){
                    iptv(this.horizontalProgress.parentNode).show();
                }
            },

            hHide:function () {
                if(this.horizontalProgress){
                    iptv(this.horizontalProgress.parentNode).hide();
                }
            }
        }
    ;

    //自定义
    key.addKey("CUSTOM", {BACK: 220});
    //四川移动
    key.addKey("SCYD", {BACK: 27});
    //安卓
    key.addKey("ANDROID", {F1: 112});
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
        PAGEUP: 33,
        VOLUP: 259,
        VOLDOWN: 260
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
        //是否开启自动滚动到页面顶部
        this_.enTopRoll = false;

        //开启整页滚动
        this_.enRightPageRoll = false;
        //开启上下整页翻动
        this.enUpPageRoll = false;
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
        //是否禁用父级容器作为焦点位置，默认开启
        this_.disCompare = false;
        //animateOrder值默认等于1：代表动画target数组内数据越往前，层次越往上
        this_.animateOrder = 1;
        //animateIndex值等于true：代表需要控制目标元素以及目标父元素的z-index值
        this_.animateIndex = 0;
        this_.init = function () {
            //容器对象
            var upParentObj = iptv.$(this_.upParentId);
            var upAreaObj = iptv.$(this_.upAreaId);
            var rightParentObj = iptv.$(this_.rightParentId);
            var rightAreaObj = iptv.$(this_.rightAreaId);
            if (this_.enUpParentRoll || this_.enUpParentRoll == true || this_.enRightParentRoll || this_.enRightParentRoll == true) {
                //如果按钮在可视区域的下方，需要控制内容往上滚动，将内容展示在可视区域内，并不是将内容置顶
                if (this.enUpParentRoll == true) {
                    //页面被滚去的高度
                    var parRollHeight = Math.abs(parseInt(upParentObj.style.top)) || 0;
                    //可观看区域容器实际可存放内容的高度
                    var parHeight = parseInt(upAreaObj.style.height) || upAreaObj.clientHeight || 0;
                    //焦点的top值
                    var focusTop = parseInt(this_.Y_Posi);
                    //如果没有手动赋值，那么就获取top值
                    if (iptv.isNull(focusTop) || focusTop == 0) {
                        focusTop = this_.nodeObj ? Math.abs(parseInt(this_.nodeObj.style.top)) : 0;
                    }
                    //焦点实际占位高度
                    var focusHeight = this_.nodeObj ? parseInt(this_.nodeObj.style.height) : 0;
                    //如果当前焦点的父容器不是滚动父容器，也就是说当前焦点的父容器在滚动父容器upParentId下，
                    // 那么焦点实际占位高度应该是焦点父容器的占位高度，焦点的top值也应该是父容器的的top值
                    //并且如果禁用父级容器作为焦点位置，就默认使用焦点的位置，如果开启父级容器作为焦点位置，就使用父容器作为加点位置
                    if (this_.disCompare === false && this_.nodeObj.parentNode !== upParentObj) {
                        focusHeight = (this_.nodeObj && this_.nodeObj.parentNode) ? parseInt(this_.nodeObj.parentNode.style.height) : 0;
                        focusTop = (this_.nodeObj && this_.nodeObj.parentNode) ? parseInt(this_.nodeObj.parentNode.style.top) : 0;
                    }
                    //如果disCompare=multiRow，说明焦点在父容器下存在多行的焦点，那么焦点滚动到顶部后焦点的top值就不能取父容器的top而是需要在父容器的top值的基础上加上焦点在父容器下的top值
                    if (this_.disCompare === "multiRow" && this_.nodeObj.parentNode !== upParentObj) {
                        focusTop = (this_.nodeObj && this_.nodeObj.parentNode) ? parseInt(this_.nodeObj.parentNode.style.top) + Math.abs(parseInt(this_.nodeObj.style.top)) : 0;
                    }
                    //被滚去的高度+父容器实际可存放内容的高度
                    var parA = parRollHeight + parHeight;
                    //焦点的TOP值+焦点实际占位的高度
                    var focB = focusTop + focusHeight;
                    //如果后者大于前者，那么说明当前焦点在可观察区域的下面，所以这时需要考虑父容器需要往下滚多少距离，才能让当前焦点被显示出来
                    if (parA < focB) {
                        //获取当前焦点被遮挡的高度+当前父容器已经滚去的高度，就能得到现在父容器需要总的滚动高度
                        //注意：如下使用减去firstLineTop认为控制的高度，因为该值在当前滚动模式下，是一个负数，负负得正，所以也就是在系统定义的滚动高度的基础上加上firstLineTop值，也就是说，此时的内容在父容器距离底部有一段距离
                        var rollHeight = focB - parA + parRollHeight - (this_.firstLineTop ? this_.firstLineTop : 0);
                        upParentObj.style.top = "-" + rollHeight + "px";
                    }
                }

                //如果按钮在可视区域的上方，需要控制内容往下滚动，将内容展示在可视区域，并不是将内容置顶
                if (this_.enUpParentRoll == true) {
                    //页面被滚去的高度
                    // var parRollHeight = areaObj.scrollTop || parseInt(parentObj.style.top) || 0;
                    var parRollHeight = Math.abs(parseInt(upParentObj.style.top)) || 0;
                    //焦点的top值
                    var focusTop = parseInt(this_.Y_Posi);
                    //如果没有手动赋值，那么就获取top值
                    if (iptv.isNull(focusTop) || focusTop == 0) {
                        focusTop = this_.nodeObj ? Math.abs(parseInt(this_.nodeObj.style.top)) : 0;
                    }
                    //如果当前焦点的父容器不是滚动父容器，也就是说当前焦点的父容器在滚动父容器upParentId下，
                    // 那么焦点实际占位高度应该是焦点父容器的占位高度，焦点的top值也应该是父容器的的top值
                    if (this_.disCompare === false && this_.nodeObj.parentNode !== upParentObj) {
                        focusTop = (this_.nodeObj && this_.nodeObj.parentNode) ? parseInt(this_.nodeObj.parentNode.style.top) : 0;
                    }
                    //如果disCompare=multiRow，说明焦点在父容器下存在多行的焦点，那么焦点滚动到顶部后焦点的top值就不能取父容器的top而是需要在父容器的top值的基础上加上焦点在父容器下的top值
                    if (this_.disCompare === "multiRow" && this_.nodeObj.parentNode !== upParentObj) {
                        focusTop = (this_.nodeObj && this_.nodeObj.parentNode) ? parseInt(this_.nodeObj.parentNode.style.top) + Math.abs(parseInt(this_.nodeObj.style.top)) : 0;
                    }
                    //页面被滚去的高度
                    var parA = parRollHeight;
                    //焦点的TOP值
                    var focB = focusTop;
                    //如果焦点的TOP值小于当前被滚去的高度，那么说明此时需要往下滚
                    if (parA > focB) {
                        //如果需要父容器往下滚，那么滚去的高度就是焦点的TOP值
                        //下面使用加号+，加上了人为滚动的高度，是因为当前是内容在父容器的上方，需要往下滚，而firstLineTop一般会设置为一个负数，所以加上一个负数，也就是减去这个值，也就是在系统自定义滚动高度的基础上减去firstLineTop值，也就是滚动的高度值变小了，由于我们内容在上面，滚动数值越大，内容就越往上，滚动数值越小，内容就越靠下，所以使用+号来处理，
                        var rollHeight = focB + (this_.firstLineTop ? this_.firstLineTop : 0);
                        upParentObj.style.top = "-" + rollHeight + "px";
                        //*****************************左右上下滚动需要统一监控，用于动态加载图片，目前时间问题，没有继续开发，此处留做后期升级****************************/
                    }
                }

                //控制内容往右滚，将内容展示在可视区域，并不是将内容置顶
                if (this_.enRightParentRoll == true) {
                    //页面被滚去的宽度
                    var parRollWidth = Math.abs(parseInt(rightParentObj.style.left)) || 0;
                    //可观看区域容器实际可存放内容的高度
                    var parWidth = parseInt(rightAreaObj.style.width) || rightAreaObj.clientWidth || 0;
                    //焦点的left值
                    var focusLeft = parseInt(this_.X_Posi);
                    //如果没有手动赋值，那么就获取left值
                    if (iptv.isNull(focusLeft) || focusLeft == 0) {
                        focusLeft = this_.nodeObj ? Math.abs(parseInt(this_.nodeObj.style.left)) : 0;
                    }
                    //焦点实际占位宽度
                    // var focusWidth = this_.nodeObj ? this_.nodeObj.offsetWidth : parseInt(this_.nodeObj.style.width);
                    var focusWidth = this_.nodeObj ? parseInt(this_.nodeObj.style.width) : 0;
                    //如果当前焦点的父容器不是滚动父容器，也就是说当前焦点的父容器在滚动父容器upParentId下，
                    // 那么焦点实际占位高度应该是焦点父容器的占位高度，焦点的top值也应该是父容器的的top值
                    if (this_.disCompare === false && this_.nodeObj.parentNode !== rightParentObj) {
                        focusLeft = (this_.nodeObj && this_.nodeObj.parentNode) ? parseInt(this_.nodeObj.parentNode.style.left) : 0;
                        focusWidth = (this_.nodeObj && this_.nodeObj.parentNode) ? parseInt(this_.nodeObj.parentNode.style.width) : 0;
                    }
                    //如果disCompare=multiRow，说明焦点在父容器下存在多行的焦点，那么焦点滚动到顶部后焦点的top值就不能取父容器的top而是需要在父容器的top值的基础上加上焦点在父容器下的top值
                    if (this_.disCompare === "multiRow" && this_.nodeObj.parentNode !== upParentObj) {
                        focusLeft = (this_.nodeObj && this_.nodeObj.parentNode) ? parseInt(this_.nodeObj.parentNode.style.left) + Math.abs(parseInt(this_.nodeObj.style.left)) : 0;
                    }
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

                //控制内容往左滚，将内容展示在可视区域，并不是将内容置顶
                if (this_.enRightParentRoll == true) {
                    //页面被滚去的宽度
                    var parRollWidth = Math.abs(parseInt(rightParentObj.style.left)) || 0;
                    //焦点的left值
                    var focusLeft = parseInt(this_.X_Posi);
                    //如果没有手动赋值，那么就获取left值
                    if (iptv.isNull(focusLeft) || focusLeft == 0) {
                        focusLeft = this_.nodeObj ? Math.abs(parseInt(this_.nodeObj.style.left)) : 0;
                    }
                    //如果当前焦点的父容器不是滚动父容器，也就是说当前焦点的父容器在滚动父容器upParentId下，
                    // 那么焦点实际占位高度应该是焦点父容器的占位高度，焦点的top值也应该是父容器的的top值
                    if (this_.disCompare === false && this_.nodeObj.parentNode !== rightParentObj) {
                        focusLeft = (this_.nodeObj && this_.nodeObj.parentNode) ? parseInt(this_.nodeObj.parentNode.style.left) : 0;
                    }
                    //如果disCompare=multiRow，说明焦点在父容器下存在多行的焦点，那么焦点滚动到顶部后焦点的top值就不能取父容器的top而是需要在父容器的top值的基础上加上焦点在父容器下的top值
                    if (this_.disCompare === "multiRow" && this_.nodeObj.parentNode !== upParentObj) {
                        focusLeft = (this_.nodeObj && this_.nodeObj.parentNode) ? parseInt(this_.nodeObj.parentNode.style.left) + Math.abs(parseInt(this_.nodeObj.style.left)) : 0;
                    }

                    //页面被滚去的宽度
                    var parA = parRollWidth;
                    //焦点的LEFT值
                    var focB = focusLeft - (this_.firstRowLeft ? this_.firstRowLeft : 0);
                    //如果焦点的TOP值小于当前被滚去的高度，那么说明此时需要往下滚
                    if (parA > focB) {
                        //如果需要父容器往下滚，那么滚去的高度就是焦点的TOP值
                        var rollWidth = focB;
                        rightParentObj.style.left = "-" + rollWidth + "px";
                        //*****************************左右上下滚动需要统一监控，用于动态加载图片，目前时间问题，没有继续开发，此处留做后期升级****************************/
                    }
                }

            }
            //是否开启整页左右滚动，滚动值为手动指定
            if (this_.enRightPageRoll === true) {
                //开启整页滚动
                //获取当前页需要滚动的距离
                var rollLeft = this_.focusLeftRoll || 0;
                rightParentObj.style.left = '-' + rollLeft + "px";
            }
            //是否开启整页上下滚动，滚动值为手动指定
            if (this_.enUpPageRoll === true) {
                var rollUp = this_.focusUpRoll || 0;
                upParentObj.style.top = '-' + rollUp + "px";
            }
            //是否开启自动滚动到顶部，滚动值为自动计算
            if (this_.enTopRoll === true) {
                //页面被滚去的高度
                var parRollHeight = Math.abs(parseInt(upParentObj.style.top)) || 0;
                //可观看区域容器实际可存放内容的高度
                var parHeight = parseInt(upAreaObj.style.height) || upAreaObj.clientHeight || 0;
                //父容器总高度
                var parOverHeight = parseInt(upParentObj.style.height) || upParentObj.clientHeight || 0;
                //焦点的top值
                var focusTop = parseInt(this_.Y_Posi);
                //如果没有手动赋值，那么就获取top值
                if (iptv.isNull(focusTop) || focusTop == 0) {
                    focusTop = this_.nodeObj ? Math.abs(parseInt(this_.nodeObj.style.top)) : 0;
                }
                //焦点实际占位高度
                var focusHeight = this_.nodeObj ? parseInt(this_.nodeObj.style.height) : 0;
                //如果当前焦点的父容器不是滚动父容器，也就是说当前焦点的父容器在滚动父容器upParentId下，
                // 那么焦点实际占位top应该是焦点父容器的占位top 加上焦点的top
                //disCompare=true:代表禁用父容器作为焦点位置,也就是焦点坐标，以焦点自身的top,left为准
                //disCompare=false:默认：代表取消禁用也就是开启父容器作为焦点位置，默认就是使用父容器作为焦点位置
                if (this_.disCompare === false && this_.nodeObj.parentNode !== upParentObj) {
                    focusTop = (this_.nodeObj && this_.nodeObj.parentNode) ? parseInt(this_.nodeObj.parentNode.style.top) : 0;
                }

                //如果disCompare=multiRow，说明焦点在父容器下存在多行的焦点，那么焦点滚动到顶部后焦点的top值就不能取父容器的top而是需要在父容器的top值的基础上加上焦点在父容器下的top值
                if (this_.disCompare === "multiRow" && this_.nodeObj.parentNode !== upParentObj) {
                    focusTop = (this_.nodeObj && this_.nodeObj.parentNode) ? parseInt(this_.nodeObj.parentNode.style.top) + Math.abs(parseInt(this_.nodeObj.style.top)) : 0;
                }
                //父容器总高度减去焦点top值，等于页面剩余内容的高度
                var focC = parOverHeight - focusTop;
                //如果父容器总的高度，比可视区域内容高度小，那么滚动高度就是0，也就是说，剩余内容高度已经在可是区域内了，无需滚动
                if (parOverHeight < parHeight) {
                    upParentObj.style.top = "0px";
                } else if (focC < parHeight) {
                    //页面剩余内容高度 小于 可视内容高度 ，代表页面剩余内容不够让当前焦点滚动到页面可视内容区域的顶层
                    //也就是说，此时只要让剩余页面内容滚动到可视区域即可，此时的页面滚动距离就是父容器总高度减去可视内容高度的值
                    //父容器最大高度  减去  页面可视区域高度 的值 就是滚动距离，也就是说将剩余内容完全可展示在可视区域内
                    var rollHeight = parOverHeight - parHeight - (this_.firstLineTop ? this_.firstLineTop : 0);
                    upParentObj.style.top = "-" + rollHeight + "px";
                } else {
                    //如果页面剩余内容高度 大于 可视内容高度，可直接让当前焦点滚动到最顶层
                    //也就是说，页面滚动距离就是焦点的top值
                    var rollHeight = focusTop - (this_.firstLineTop ? this_.firstLineTop : 0);
                    upParentObj.style.top = "-" + rollHeight + "px";
                }
            }
            //操作滚动条,滚动条必须有当前焦点才能控制
            if(curFocus === this_.own &&this_.verticalProgress === true && upParentObj){
                //页面被滚去的高度
                var parRollHeight = Math.abs(parseInt(upParentObj.style.top)) || 0;
                //可观看区域容器实际可存放内容的高度
                var parHeight = iptv(upAreaObj).height() ||  parseInt(upAreaObj.style.height) || upAreaObj.clientHeight || 0;
                //父容器总高度
                var parOverHeight = iptv(upParentObj).height() ||  parseInt(upParentObj.style.height) || upParentObj.clientHeight || 0;
                //如果父容器没有滚动也就是top值为0,此时不需要显示进度条
                var per = parRollHeight === 0 ? 0 : (parRollHeight+parHeight)/parOverHeight;
                //如果父容器top值+页面可视高度/父容器总高度>1的话，说明此时所有焦点已经全部滚动到可视区域了，所以，强制控制值为1，目的让进度条100%显示
                per = per > 1 ? 1 : per;
                //如果父容器没有滚动也就是top值为0,此时不需要显示进度条
                if(parRollHeight === 0){
                    iptv.progress.vHide();
                }else{
                    iptv.progress.vShow();
                }
                iptv.progress.per(per);
            }else if(curFocus === this_.own){
                iptv.progress.vHide();
            }

            if(curFocus === this_.own && this_.horizontalProgress === true && rightParentObj){
                //页面被滚去的宽度
                var parRollWidth = Math.abs(parseInt(rightParentObj.style.left)) || 0;
                //可观看区域容器实际可存放内容的高度
                var parWidth = iptv(rightAreaObj).width() || parseInt(rightAreaObj.style.width) || rightAreaObj.clientWidth || 0;
                //父容器总高度
                var parOverWidth = iptv(rightParentObj).width() ||  parseInt(rightParentObj.style.width) || rightParentObj.clientWidth || 0;
                var per = parRollWidth === 0 ? 0 : (parRollWidth+parWidth)/parOverWidth;
                per = per > 1 ? 1 : per;
                if(parRollWidth === 0){
                    iptv.progress.hHide();
                }else{
                    iptv.progress.hShow();
                }
                iptv.progress.per(null,per);
            }else if(curFocus === this_.own){
                iptv.progress.hHide();
            }

            setTimeout(function () {
                for (var i in iptv.focusCollection) {
                    var focus = iptv.focusCollection[i].focusObj;
                    //判断上下滚动指定了参数，开启懒加载图片
                    if (focus && focus.upParentId && focus.upAreaId && focus.newSwap && !focus.isSwap) {
                        //获取父容器ID
                        var upParentId = focus.upParentId;
                        //控制可观看区域容器的ID
                        var upAreaId = focus.upAreaId;
                        var upParentObj = iptv.$(upParentId);
                        var upAreaObj = iptv.$(upAreaId);
                        //页面被滚去的高度
                        var parRollHeight = Math.abs(parseInt(upParentObj.style.top)) || 0;
                        //可观看区域容器实际可存放内容的高度
                        var parHeight = parseInt(upAreaObj.style.height) || upAreaObj.clientHeight || 0;
                        //焦点的top值
                        var focusTop = parseInt(focus.Y_Posi);
                        //如果没有手动赋值，那么就获取top值
                        if (iptv.isNull(focusTop) || focusTop == 0) {
                            focusTop = focus.nodeObj ? Math.abs(parseInt(focus.nodeObj.style.top)) : 0;
                        }
                        //焦点实际占位高度
                        var focusHeight = focus.nodeObj ? parseInt(focus.nodeObj.style.height) : 0;
                        if (focus.disCompare === false && focus.nodeObj.parentNode !== upParentObj) {
                            focusHeight = (focus.nodeObj && focus.nodeObj.parentNode) ? parseInt(focus.nodeObj.parentNode.style.height) : 0;
                            focusTop = (focus.nodeObj && focus.nodeObj.parentNode) ? parseInt(focus.nodeObj.parentNode.style.top) : 0;
                        }
                        //如果disCompare=multiRow，说明焦点在父容器下存在多行的焦点，那么焦点滚动到顶部后焦点的top值就不能取父容器的top而是需要在父容器的top值的基础上加上焦点在父容器下的top值
                        if (focus.disCompare === "multiRow" && focus.nodeObj.parentNode !== upParentObj) {
                            focusTop = (focus.nodeObj && focus.nodeObj.parentNode) ? parseInt(focus.nodeObj.parentNode.style.top) + Math.abs(parseInt(focus.nodeObj.style.top)) : 0;
                        }
                        //被滚去的高度+父容器实际可存放内容的高度
                        var parA = parRollHeight + parHeight;
                        //如果后者大于前者，那么说明当前焦点在可观察区域的之内
                        if (parA > focusTop) {
                            iptv("#" + focus.imgID + "_img").src(focus.newSwap);
                            focus.isSwap = true;
                        }
                    }

                    //判断左右滚动指定了参数，开启懒加载图片
                    if (focus && focus.rightParentId && focus.rightAreaId && focus.newSwap && !focus.isSwap) {
                        var rightParentId = focus.rightParentId;
                        var rightAreaId = focus.rightAreaId;
                        var rightParentObj = iptv.$(rightParentId);
                        var rightAreaObj = iptv.$(rightAreaId);

                        //页面被滚去的宽度
                        var parRollWidth = Math.abs(parseInt(rightParentObj.style.left)) || 0;
                        //可观看区域容器实际可存放内容的高度
                        var parWidth = parseInt(rightAreaObj.style.width) || rightAreaObj.clientWidth || 0;
                        //焦点的left值
                        var focusLeft = parseInt(focus.X_Posi);
                        //如果没有手动赋值，那么就获取left值
                        if (iptv.isNull(focusLeft) || focusLeft == 0) {
                            focusLeft = focus.nodeObj ? Math.abs(parseInt(focus.nodeObj.style.left)) : 0;
                        }
                        var focusWidth = focus.nodeObj ? parseInt(focus.nodeObj.style.width) : 0;
                        //如果当前焦点的父容器不是滚动父容器，也就是说当前焦点的父容器在滚动父容器upParentId下，
                        // 那么焦点实际占位高度应该是焦点父容器的占位高度，焦点的top值也应该是父容器的的top值
                        if (focus.disCompare === false && focus.nodeObj.parentNode !== rightParentObj) {
                            focusLeft = (focus.nodeObj && focus.nodeObj.parentNode) ? parseInt(focus.nodeObj.parentNode.style.left) : 0;
                            focusWidth = (focus.nodeObj && focus.nodeObj.parentNode) ? parseInt(focus.nodeObj.parentNode.style.width) : 0;
                        }
                        //被滚去的宽度+父容器实际可存放内容的宽度
                        var parA = parRollWidth + parWidth;
                        //如果被滚去的宽度+父容器实际可存放内容的宽度 大于 焦点的left值
                        if (parA > focusLeft) {
                            iptv("#" + focus.imgID + "_img").src(focus.newSwap);
                            focus.isSwap = true;
                        }
                    }
                }
            }, 0);
        };
        //如果默认的onFocus方法不满足需求，就可以指定onFocus_属性
        this_.onFocus_ = "";
        // 默认获得焦点事件
        this_.onFocus = function () {
            if (this_.enFocus && this_.isCreated == true) {
                curFocus = this_.own;
                this_.init();
                if (iptv.isNotNull(this_.onFocus_)) {
                    key.exeCode(this_.onFocus_);
                } else {
                    if (this_.focusType == 2) {
                        iptv("#" + this_.imgID).src(this_.newSwap);
                    } else if (this_.focusType == 7) {
                        if (curFocus.imgID) {
                            iptv("#" + curFocus.imgID).show();
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
                                iptv("#" + this_.selectionObjID).removeClass("transition");
                            }
                        } else {
                            //如果上一个焦点是17,并且上一个焦点存在，那么就赋予动画
                            if (lastFocusObj && lastFocusObj.focusType == 17 && div) {
                                iptv("#" + this_.selectionObjID).addClass("transition");
                            }
                        }
                        if (div) {
                            var img = iptv.$(this_.imgID);
                            iptv(div).show();
                            div.style.top = parseInt(img.parentNode.style.top) + "px";
                            div.style.left = parseInt(img.parentNode.style.left) + "px";
                        }
                    } else if (this_.focusType == 18) {
                        //选中后，焦点框图片显示，同时该图片要同时与对应的焦点图片放大
                        if (curFocus.imgID) {
                            iptv("#" + curFocus.imgID).removeClass("transitionsHide0_5");
                            iptv("#" + curFocus.imgID + "_img").removeClass("transitionsHide0_5");
                            iptv("#" + curFocus.imgID).addClass("transitionsShow0_5");
                            iptv("#" + curFocus.imgID + "_img").addClass("transitionsShow0_5");
                            iptv("#" + curFocus.imgID).show();

                        }
                    }
                }
                if (this_.animateName && typeof(Animate) === "function" && "am-shade-door" === this_.animateName) {
                    this_.animate = new Animate({
                        name: "am-shade-door",
                        target: [iptv.$(this.imgID + "_shade")],
                        dire: PAGE.lastDire
                    });
                    this_.animate.play();
                } else if (this_.animateName && typeof(Animate) === "function" && Animate.prototype[this_.animateName] && this_.animateName !== 'am-shade-door') {
                    //animateOrder值等于1：代表target数组内数据越往前，层次越往上
                    var img = iptv.$(this.imgID + "_img") || iptv.$(this.imgID + "-img");
                    var targets = [
                        this.nodeObj,//选中框图
                        iptv.$(this.imgID + "_icon"),//icon图
                        iptv.$(this.imgID + "_shade"),//遮罩图
                        img,//焦点图
                        iptv.$(this.imgID + "_no"),//最底层load图
                    ];
                    this_.animate = new Animate({
                        name: this_.animateName,
                        target: targets,
                        animateIndex: this_.animateIndex,
                        animateOrder: this_.animateOrder
                    });
                } else if (this_.animateName && typeof(Animate) === "function" && !Animate.prototype[this_.animateName]) {
                    var img = iptv.$(this.imgID + "_img") || iptv.$(this.imgID + "-img");
                    this_.animate = new Animate({
                        name: "am-class",
                        className: this_.animateName,
                        target: [iptv.$(this.imgID), img]
                    });
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
                        iptv("#" + curFocus.imgID).hide();
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
                        iptv("#" + curFocus.imgID).removeClass("transitionsShow0_5").addClass("transitionsHide0_5").hide();
                        iptv("#" + curFocus.imgID + "_img").removeClass("transitionsShow0_5").addClass("transitionsHide0_5")
                    }
                }

                if (this_.onBlurEvent) {
                    key.exeCode(this_.onBlurEvent);
                }
                if (this_.animate && this_.animate.stop) {
                    this_.animate.stop();
                }
            }
        };
        this_.onClick = function () {
            if (this_.enable == true && this_.enFocus == true && this_.isCreated == true) {
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

    window.curFocus = new iptv.FocusModel();

    //扩展iptv对象方法
    iptv.fn.extend({
        /**
         *获取焦点对象
         * @returns {iptv.FocusModel}
         */
        getFocus: function () {
            var this_ = this;
            //如果元素被重新装载过，还可以从iptv.focusCollection焦点池中获取
            if (this_[0] && iptv.focusCollection && iptv.focusCollection[this_.id] && iptv.focusCollection[this_.id].focusObj) {
                //重置DOM焦点属性
                this_[0].focusObj = iptv.focusCollection[this_.id].focusObj;
                return iptv.focusCollection[this_.id].focusObj;
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
        /**
         *
         * @param clear为真时，将清空焦点池
         * @returns {addFocus}
         */
        addFocus: function (clear) {
            var this_ = this,
                context = this_.context,
                doms = [],
                focusId = null;
            //根据条件是否清空焦点池与焦点方向池
            focusCollection = iptv.focusCollection = clear === true ? [] : focusCollection;
            focusDires = iptv.focusDires = clear === true ? [] : focusDires;
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
                    //开启上下整页滚动
                    model.enUpPageRoll = obj.enUpPageRoll || false;
                    //当前焦点需要整页滚动的up值
                    model.focusUpRoll = obj.focusUpRoll || 0;
                    //当前焦点索引
                    model.focusIndex = obj.focusIndex || 0;
                    //当前焦点对应的当前页
                    model.focusCurPageNum = obj.focusCurPageNum || 0;
                    //当前焦点对应的总页数
                    model.focusAllPageNum = obj.focusAllPageNum || 0;
                    //当前焦点需要整页滚动的left值
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
                    //指定动画名称
                    model.animateName = obj.animateName || '';
                    //指定是否禁用父容器作为焦点坐标依据，默认禁用
                    model.disCompare = obj.disCompare || false;
                    //指定焦点首行top值不为0的时候，需要指定首行top值加入滚动数值内
                    model.firstLineTop = obj.firstLineTop || false;
                    //指定焦点首列left值不为0的时候，需要指定首列left值加入滚动数值内
                    model.firstRowLeft = obj.firstRowLeft || false;
                    //页面上下滚动时，是否开启自动滚动到页面顶部
                    model.enTopRoll = obj.enTopRoll || false;
                    //animateOrder值默认等于1：代表动画target数组内数据越往前，层次越往上
                    model.animateOrder = obj.animateOrder === 0 ? 0 : 1;
                    //animateIndex值大于0：代表需要控制目标元素以及目标父元素的z-index值
                    model.animateIndex = obj.animateIndex > 0 ? obj.animateIndex : 0;

                    //指定焦点单次长按回调时间的执行时间，毫秒数，默认为null
                    model.singleTime = obj.singleTime && obj.singleTime > 0 ? obj.singleTime : null;
                    //指定焦点连续长按回调事件的执行间隔时间，毫秒数,默认为null
                    model.continuousTime = obj.continuousTime && obj.continuousTime > 0 ? obj.continuousTime : null;

                    //滚动进度条
                    model.verticalProgress = obj.verticalProgress || false;
                    model.horizontalProgress = obj.horizontalProgress || false;
                    //如果焦点配置了滚动进度条，将在此创建
                    if(model.verticalProgress){
                        iptv.progress.vInit();
                    }
                    if(model.horizontalProgress){
                        iptv.progress.hInit();
                    }

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

                    //按上失去焦点后执行的事件
                    diredemp.onUpBlurEvent = obj.onUpBlurEvent || '';
                    //按下失去焦点后执行的事件
                    diredemp.onDownBlurEvent = obj.onDownBlurEvent || '';
                    //按左失去焦点后执行的事件
                    diredemp.onLeftBlurEvent = obj.onLeftBlurEvent || '';
                    //按右失去焦点后执行的事件
                    diredemp.onRightBlurEvent = obj.onRightBlurEvent || '';

                    //指定焦点单次长按事件
                    diredemp.okLongPressEvent = obj.okLongPressEvent || '';
                    diredemp.upLongPressEvent = obj.upLongPressEvent || '';
                    diredemp.downLongPressEvent = obj.downLongPressEvent || '';
                    diredemp.leftLongPressEvent = obj.leftLongPressEvent || '';
                    diredemp.rightLongPressEvent = obj.rightLongPressEvent || '';

                    //指定焦点连续长按事件
                    diredemp.okContinuousLongPressEvent = obj.okContinuousLongPressEvent || '';
                    //指定焦点连续长按结束事件
                    diredemp.okEndContinuousLongPressEvent = obj.okEndContinuousLongPressEvent || '';
                    diredemp.upContinuousLongPressEvent = obj.upContinuousLongPressEvent || '';
                    diredemp.upEndContinuousLongPressEvent = obj.upEndContinuousLongPressEvent || '';
                    diredemp.downContinuousLongPressEvent = obj.downContinuousLongPressEvent || '';
                    diredemp.downEndContinuousLongPressEvent = obj.downEndContinuousLongPressEvent || '';
                    diredemp.leftContinuousLongPressEvent = obj.leftContinuousLongPressEvent || '';
                    diredemp.leftEndContinuousLongPressEvent = obj.leftEndContinuousLongPressEvent || '';
                    diredemp.rightContinuousLongPressEvent = obj.rightContinuousLongPressEvent || '';
                    diredemp.rightEndContinuousLongPressEvent = obj.rightEndContinuousLongPressEvent || '';
                    focusDires[id] = diredemp;
                    model.dieArr = diredemp;

                    //该按钮已经通过初始化工作
                    model.isCreated = true;
                    model.nodeObj = domObj;
                    domObj.focusObj = model;
                    focusCollection[id] = domObj;
                }
            }
            return focusId ? iptv("#" + focusId) : this_;
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

    //扩展iptv类方法
    iptv.extend({
        getFocus: function (id) {
            return iptv.key && iptv("#" + id).getFocus();
        },
        enableFocus: function (id) {
            if (iptv.isArray(id)) {
                return iptv.key && iptv(id).enableFocus();
            } else {
                return iptv.key && iptv("#" + id).enableFocus();
            }
        },
        disableFocus: function (id) {
            if (iptv.isArray(id)) {
                return iptv.key && iptv(id).disableFocus();
            } else {
                return iptv.key && iptv("#" + id).disableFocus();
            }
        }
    });

    iptv.key.managerKey = function (evt) {
        if (iptv.key.displayKey === true) return true;
        var keyCode = iptv.keyCode(evt);
        var keyName = iptv.key.getKeyCodeName(keyCode);
        var fnn;
        for(var fn in iptv.key.keyCallBack){
            fnn = iptv.key.keyCallBack[fn];
            if(fnn && iptv.type(fnn) === 'function'){
                var bl = fnn.call(iptv.key,keyCode,keyName,evt);
                //如果回调方法返回false将不处理以下逻辑
                if(!bl){
                    return bl;
                }
            }
        }
        //iptv.androidJS.Message("keyCode-->" + keyCode + "\tkeyName---->" + keyName);
        switch (keyName) {
            case "OK" :
                curFocus.onClick();
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
                return false;
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
            case "F1":
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
                if (iptv.isFunction(iptv.common.backfunc)) {
                    iptv.common.backfunc();
                }
                return false;
            case "VOLUP":
                iptv.key.volUp && iptv.key.volUp();
                break;
            case "VOLDOWN":
                iptv.key.volDown && iptv.key.volDown();
                break;
            default :
                break;
        }
        return true;
    };


    //声明按下事件
    var keyDownEventfunction = function (evt) {
        if (iptv.key.displayKey === true) return;
        iptv.key.event = evt;
        //获取键值
        var keyCode = iptv.keyCode(iptv.key.event);
        //获取键名称
        var keyName = iptv.key.getKeyCodeName(keyCode) || "";
        //优先执行当前焦点的所有方向事件
        var fDires = iptv.focusDires[curFocus.id] || [];

        //标记短按未处理
        iptv.key.single.pressDispose = false;

        //获取焦点是否注册了长按一次事件
        iptv.key.single.pressEvent = fDires[keyName.toLowerCase() + "LongPressEvent"];

        //获取焦点是否注册连续长按事件
        iptv.key.continuous.pressEvent = fDires[keyName.toLowerCase() + "ContinuousLongPressEvent"];
        //获取焦点是否注册连续长按结束事件
        iptv.key.continuous.endPressEvent = fDires[keyName.toLowerCase() + "EndContinuousLongPressEvent"];

        //获取全局长按一次事件
        iptv.key.longPress.pressEvent = iptv.key.longPress[keyName.toLowerCase() + "LongPressEvent"];

        //处理焦点如果没有注册长按一次事件，也没有注册连续长按事件，并且也没有注册全局长按一次事件，就执行短按事件
        //触发焦点的短按事件，有两种途径：1:所有长按事件都没有指定，2：指定了单次长按事件，但用户未符合按键时长时(包括焦点的单次长按与全局单次长按不满足长按时长条件)会触发短按事件
        if (!iptv.key.continuous.pressEvent && !iptv.key.single.pressEvent && !iptv.key.longPress.pressEvent) {
            //标记短按处理完成
            iptv.key.single.pressDispose = true;
            return iptv.key.managerKey(iptv.key.event);
        }

        //只有长按事件被注册的情况下(根据焦点是否注册xxxContinuousLongPressEvent属性)，才允许执行定时器去回调长按事件
        if (iptv.key.continuous.continuousTimer == null && iptv.key.continuous.pressEvent) {
            iptv.key.continuous.startTime = (new Date()).getTime();
            //标记连续长按操作没有结束
            iptv.key.continuous.isEnd = false;
            //标记连续长按事件一次都还没有被执行过
            iptv.key.continuous.loogPressDispose = false;
            //获取焦点是否注册连续长按执行事件的间隔时间,至少100毫秒，默认500毫秒
            var continuousTime = curFocus.continuousTime && curFocus.continuousTime >= 100 ? curFocus.continuousTime : iptv.key.continuous.continuousTime;
            //只有连续长按事件被注册的情况下才允许执行定时器
            iptv.key.continuous.continuousTimer = setInterval(function () {
                //判断当前连续长按没有被中断，如果被中断，将终止计时器，并不执行连续长按回调事件
                if (iptv.key.continuous.isEnd === true && iptv.key.continuous.continuousTimer != null) {
                    clearInterval(iptv.key.continuous.continuousTimer);
                    iptv.key.continuous.continuousTimer = null;
                    //将连续长按事件制空，防止后续焦点被执行
                    iptv.key.continuous.pressEvent = null;
                    //重置为一次都没有被执行过
                    iptv.key.continuous.loogPressDispose = false;
                    //重置为已经执行结束
                    iptv.key.continuous.isEnd = true;
                    return;
                }
                iptv.key.continuous.loogPressDispose = true;
                if (iptv.key.continuous.pressEvent) {
                    key.exeCode(iptv.key.continuous.pressEvent);
                }
            }, continuousTime);
            //如果已经注册了连续长按事件，就不执行以下单次长按事件
            return false;
        }


        //只有短按未执行，连续长按事件未注册，才允许执行单次长按事件,也就是说，如果同时指定了连续长按事件，就不会再执行单次长按事件，根据条件!iptv.key.continuous.pressEvent即可知道连续长按事件被注册了
        if (iptv.key.single.loogPressTimer == null && iptv.key.single.pressEvent && !iptv.key.continuous.pressEvent) {
            //获取焦点是否注册连续长按执行事件的间隔时间,至少500毫秒，默认500毫秒
            var singleTime = curFocus.singleTime && curFocus.singleTime >= 500 ? curFocus.singleTime : iptv.key.single.loogPressTime;
            //标记单次长按未处理
            iptv.key.single.loogPressDispose = false;
            iptv.key.single.loogPressTimer = setTimeout(function () {
                //如果存在焦点，就执行焦点的长按事件
                if (curFocus && curFocus.enFocus && curFocus.isCreated && !iptv.key.single.loogPressDispose) {
                    //标记已处理单次长按
                    iptv.key.single.loogPressDispose = true;
                    key.exeCode(iptv.key.single.pressEvent);
                    iptv.key.single.pressEvent=null;
                    return;
                }
            }, singleTime);
            return false;
        }

        //只有短按未执行，连续长按未注册，单次长按未注册，才允许执行全局单次长按事件
        if (iptv.key.single.loogPressTimer == null && iptv.key.longPress.pressEvent && !iptv.key.continuous.pressEvent && !iptv.key.single.pressEvent) {
            //标记单次长按未处理
            iptv.key.single.loogPressDispose = false;
            iptv.key.single.loogPressTimer = setTimeout(function () {
                if (iptv.key.longPress.pressEvent) {
                    //标记已处理单次长按
                    iptv.key.single.loogPressDispose = true;
                    key.exeCode(iptv.key.longPress.pressEvent);
                    iptv.key.longPress.pressEvent=null;
                    return;
                }
                //全局单次长按的时长为默认固定为500毫秒，如果需要修改，可直接修改iptv.key.single.loogPressTime值，来控制全局长按一次事件
            }, iptv.key.single.loogPressTime);
            return false;
        }
        return true;
    };

    //声明按键回弹事件
    var keyUpEventFunction = function (evt) {
        var bl = true;
        //处理长按一次或者点击一次
        if (iptv.key.displayKey === true) return bl;
        //处理连续长按
        if (iptv.key.continuous.continuousTimer != null) {
            clearInterval(iptv.key.continuous.continuousTimer);
            iptv.key.continuous.continuousTimer = null;
            //标记连续长按已经结束
            iptv.key.continuous.isEnd = true;
            //记录连续长按结束时间
            iptv.key.continuous.endTime = (new Date()).getTime();
            //如果连续长按事件被至少执行过1次，说明用户操作达到了操作要求，所以，在用户注册过长按结束回调事件的情况下，才允许执行连续长按结束回调
            if(iptv.key.continuous.endPressEvent && iptv.key.continuous.loogPressDispose){
                key.exeCode(iptv.key.continuous.endPressEvent);
            }
            //重置相关事件
            iptv.key.longPress.pressEvent = null;
            iptv.key.longPress.endPressEvent = null;
            //连续长按事件未处理，说明用户操作未达到间隔时间要求就回弹按键了，所以需要出发短按事件
            if(!iptv.key.continuous.loogPressDispose){
                bl = iptv.key.managerKey(iptv.key.event);
                iptv.key.continuous.loogPressDispose = false;
            }
            return bl;
        }

        //处理单次长按事件，如果单次长按事件未处理，会在回弹事件中触发短按事件
        if (iptv.key.single.loogPressTimer != null) {
            //结束单次长按计时器，可能以及处理完单次长按，也有可能未处理完，取决于用户实际长按时间，所以，如果单次长按未处理，这里就终止了计时器，需要在下方处理短按事件
            clearTimeout(iptv.key.single.loogPressTimer);
            //重置计时器标记
            iptv.key.single.loogPressTimer = null;
            iptv.key.single.pressEvent = null;
            //单次长按事件未处理，说明用户操作未达到间隔时间要求就回弹按键了，所以需要触发短按事件
            if (!iptv.key.single.loogPressDispose) {
                bl = iptv.key.managerKey(iptv.key.event);
                iptv.key.single.loogPressDispose = false;
            }
            return bl;
        }
        return bl;
    };
    //添加按键事件
    iptv(document).addEventListener("keydown", keyDownEventfunction);
    iptv(document).addEventListener("keyup", keyUpEventFunction);
    if(typeof(Authentication) !='undefined' && typeof(Authentication.CTCGetConfig) !='undefined'  && ["E900","E900-S","E900V21E","E910V10C","ITV628HD"].indexOf(Authentication.CTCGetConfig("STBType")) > -1 ){
        window.document.onkeydown = function (ev) {  };
        window.document.onkeyup = function (ev) {  };
    }
    if (typeof module === "object" && module && typeof module.exports === "object") {
        module.exports = iptv;
    } else {
        if (typeof define === "function" && define.amd) {
            define("iptv", [], function () {
                return iptv;
            });
        }
    }
    if (typeof window === "object" && typeof window.document === "object") {
        window.iptv = window.$ = iptv;
    }
})(window, iptv);