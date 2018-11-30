(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors"],{

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

/***/ "N7Rn":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
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
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "s0K3":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

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


/***/ }),

/***/ "vqhf":
/*!**********************************************************************!*\
  !*** ./node_modules/_morgan-iptv-key@1.0.1@morgan-iptv-key/index.js ***!
  \**********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var morgan_iptv_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! morgan-iptv-core */ "MMby");
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

    if ( true && module && typeof module.exports === "object") {
        module.exports = iptv;
    } else {
        if (typeof define === "function" && __webpack_require__(/*! !webpack amd options */ "s0K3")) {
            define("iptv", [], function () {
                return iptv;
            });
        }
    }

    if (typeof window === "object" && typeof window.document === "object") {
        window.iptv = window.$ = iptv;
    }

})(window, morgan_iptv_core__WEBPACK_IMPORTED_MODULE_0___default.a);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../_webpack@4.26.1@webpack/buildin/harmony-module.js */ "N7Rn")(module)))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvX21vcmdhbi1pcHR2LWNvcmVAMS4wLjFAbW9yZ2FuLWlwdHYtY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vaGFybW9ueS1tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19tb3JnYW4taXB0di1rZXlAMS4wLjFAbW9yZ2FuLWlwdHYta2V5L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXO0FBQ1gsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVSwwQkFBMEI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsWUFBWTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELGdCQUFnQjtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFFBQVE7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixZQUFZO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLDBCQUEwQixZQUFZO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixPQUFPO0FBQzdCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxpQ0FBaUMsRUFBRSxLQUFLLEVBQUU7QUFDMUMsK0JBQStCLEVBQUUsS0FBSyxFQUFFO0FBQ3hDLHFCQUFxQixFQUFFO0FBQ3ZCO0FBQ0E7QUFDQSwyQkFBMkIsMEJBQTBCO0FBQ3JELG9DQUFvQyxVQUFVO0FBQzlDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLHNCQUFzQjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThELG1DQUFtQyxPQUFPO0FBQ3hHLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLDhFQUE4RSxLQUFLO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Qsa0NBQWtDLE9BQU87QUFDakc7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixjQUFjO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0EsU0FBUyxnREFBZ0Q7QUFDekQ7QUFDQSwyQkFBMkIsb0JBQW9CO0FBQy9DO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdGQUF3RjtBQUN4RjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBOztBQUVBOztBQUVBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsUUFBUSxLQUEwQjtBQUNsQztBQUNBLEtBQUs7QUFDTCxZQUFZLElBQTBDO0FBQ3RELFlBQVksaUNBQWUsRUFBRSxtQ0FBRTtBQUMvQjtBQUNBLGFBQWE7QUFBQSxvR0FBQztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxVOzs7Ozs7Ozs7Ozs7QUN2cENEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdkJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyQkE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ21DOzs7QUFHbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCOztBQUV6QjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7O0FBRUEscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHdCQUF3QixtREFBbUQ7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixpQkFBaUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFFBQVEsS0FBMEI7QUFDbEM7QUFDQSxLQUFLO0FBQ0wsNENBQTRDLHVEQUFVO0FBQ3REO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxVQUFVLHVEQUFJLEUiLCJmaWxlIjoiY29tbW9uL2pzL3ZlbmRvcnMuYzE2NjgwMjNjNGQxZWQ2NzNiZmIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBjaGVyaXNoIG9uIDIwMTgvMTEvMjguXHJcbiAqL1xyXG4oZnVuY3Rpb24gKHdpbmRvdywgdW5kZWZpbmVkKSB7XHJcbiAgICB2YXJcclxuICAgICAgICAvLyDlsIYgdW5kZWZpbmVkIOi9rOaNouS4uuWtl+espuS4siBcInVuZGVmaW5lZFwiXHJcbiAgICAgICAgY29yZV9zdHJ1bmRlZmluZWQgPSB0eXBlb2YgdW5kZWZpbmVkLFxyXG5cclxuICAgICAgICBsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbixcclxuICAgICAgICBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudCxcclxuICAgICAgICBkb2NFbGVtID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxyXG5cclxuICAgICAgICAvL+iuvue9ruWIq+WQjVxyXG4gICAgICAgIF9pcHR2ID0gd2luZG93LmlwdHYsXHJcbiAgICAgICAgXyQgPSB3aW5kb3cuJCxcclxuXHJcbiAgICAgICAgLy8g5YKo5a2Y5LqG5bi46KeB57G75Z6L55qEIHR5cGVvZiDnmoTlk4jluIzooahcclxuICAgICAgICAvL3tcIltvYmplY3QgRnVuY3Rpb25dXCI6XCJmdW5jdGlvblwiLFwiW29iamVjdCBCb29sZWFuXVwiOlwiYm9vbGVhblwiLH1cclxuICAgICAgICBjbGFzczJ0eXBlID0ge30sXHJcbiAgICAgICAgLy8g5a6a5LmJ5b2T5YmN54mI5pysXHJcbiAgICAgICAgY29yZV92ZXJzaW9uID0gJzEuMC4xJyxcclxuICAgICAgICAvLyDlhbbmrKHvvIzov5nph4zlrprkuYnkuobkuIDkuKrnqbrnmoTmlbDnu4Tlr7nosaEg77yM5aaC5p6c5LiL5paH6KGM5paH6ZyA6KaB6LCD55So5pWw57uE5a+56LGh55qEIGNvbmNhdCDjgIFwdXNoIOOAgXNsaWNlIOOAgWluZGV4T2Yg5pa55rOVXHJcbiAgICAgICAgLy8g5bCG5Lya6LCD55SoIGNvcmVfY29uY2F0IOOAgWNvcmVfcHVzaCDjgIFjb3JlX3NsaWNlIOOAgeWSjCBjb3JlX2luZGV4T2Yg77yM6L+Z5Zub5Liq5Y+Y6YeP5LqL5YWI5a2Y5YKo5aW95LqG6L+Z5Zub5Liq5pa55rOV55qE5YWl5Y+jXHJcbiAgICAgICAgLy8g5ZCM5pe25L2/55SoIGNhbGwg5oiWIGFwcGx5IOiwg+eUqOi/meS6m+aWueazleS5n+WPr+S7peS9v+exu+aVsOe7hOS5n+iDveeUqOWIsOaVsOe7hOeahOaWueazlVxyXG4gICAgICAgIGNvcmVfZGVsZXRlZElkcyA9IFtdLFxyXG4gICAgICAgIGNvcmVfY29uY2F0ID0gY29yZV9kZWxldGVkSWRzLmNvbmNhdCxcclxuICAgICAgICBjb3JlX3B1c2ggPSBjb3JlX2RlbGV0ZWRJZHMucHVzaCxcclxuICAgICAgICBjb3JlX3NsaWNlID0gY29yZV9kZWxldGVkSWRzLnNsaWNlLFxyXG4gICAgICAgIGNvcmVfaW5kZXhPZiA9IGNvcmVfZGVsZXRlZElkcy5pbmRleE9mLFxyXG5cclxuICAgICAgICBjb3JlX3RvU3RyaW5nID0gY2xhc3MydHlwZS50b1N0cmluZyxcclxuICAgICAgICAvL2hhc093blByb3BlcnR5Oui/lOWbnmJvb2xlYW7lgLzvvIzlj4LmlbDmmK/lrZfnrKbkuLLvvIznlKjkuo7mo4Dmn6Xmn5Dlr7nosaHmmK/lkKblrZjlnKjor6XlrZfnrKbkuLLnmoTlsZ7mgKfvvIzor6Xmlrnms5XkuI3kvJrmo4Dmn6Xlr7nosaHnmoTljp/lnovpk77kuK3mmK/lkKblrZjlnKjor6XlsZ7mgKdcclxuICAgICAgICAvL3ZhciBhID0ge25hbWU6XCJuXCJ9OyBhLmhhc093blByb3BlcnR5KFwibmFtZVwiKTtyZXR1cm4gdHJ1ZVxyXG4gICAgICAgIGNvcmVfaGFzT3duID0gY2xhc3MydHlwZS5oYXNPd25Qcm9wZXJ0eSxcclxuICAgICAgICBjb3JlX3RyaW0gPSBjb3JlX3ZlcnNpb24udHJpbSxcclxuICAgICAgICAvL+WMuemFjeW8gOWktCMmLuWPt+eahOS7u+aEj+Wtl+espu+8jOWMheaLrOS4i+WIkue6v+S4ji1cclxuICAgICAgICBxdWlja0V4cHIgPSAvKF5bIyYuXSkoW1xcdy1dKykkLyxcclxuICAgICAgICBydHJpbSA9IC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZyxcclxuICAgICAgICAvL+WumuS5iWlwdHbmnoTpgKDlh73mlbBcclxuICAgICAgICBpcHR2ID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgaXB0di5mbi5pbml0KHNlbGVjdG9yLCBjb250ZXh0KTtcclxuICAgICAgICB9O1xyXG4gICAgLy8g57uZIGlwdHYucHJvdG90eXBlIOiuvue9ruWIq+WQjSBpcHR2LmZuXHJcbiAgICAvLyBpcHR2LnByb3RvdHlwZSDljbPmmK8gaXB0dueahOWOn+Wei++8jOaMgui9veWcqCBpcHR2LnByb3RvdHlwZSDkuIrnmoTmlrnms5XvvIzljbPlj6/orqnmiYDmnIkgaXB0diDlr7nosaHkvb/nlKhcclxuICAgIGlwdHYuZm4gPSBpcHR2LnByb3RvdHlwZSA9IHtcclxuICAgICAgICAvLyDlvZPliY3niYjmnKxcclxuICAgICAgICBpcHR2OiBjb3JlX3ZlcnNpb24sXHJcbiAgICAgICAgY29uc3RydWN0b3I6IGlwdHYsXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5Yid5aeL5YyW5pa55rOVXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKHNlbGVjdG9yLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIC8vIOWmguaenOS8oOWFpeeahOWPguaVsOS4uuepuu+8jOWImeebtOaOpei/lOWbnnRoaXNcclxuICAgICAgICAgICAgaWYgKCFzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG1hdGNoO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIG1hdGNoID0gcXVpY2tFeHByLmV4ZWMoc2VsZWN0b3IpXHJcbiAgICAgICAgICAgICAgICAvL+WkhOeQhmlkIERPTVxyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoICYmIG1hdGNoWzFdID09PSBcIiNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtYXRjaFsyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1swXSA9IGVsZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RvciA9IG1hdGNoWzBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0ID0gZG9jdW1lbnQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxlY3Rvci5ub2RlVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQgPSB0aGlzWzBdID0gc2VsZWN0b3I7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aCA9IDE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpcHR2LmlzRnVuY3Rpb24oc2VsZWN0b3IpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXB0di5yZWFkeShzZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxlY3Rvci5zZWxlY3RvciAmJiBzZWxlY3Rvci5jb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXB0dihzZWxlY3Rvci5zZWxlY3Rvciwgc2VsZWN0b3IuY29udGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlwdHYudHlwZShzZWxlY3RvcikgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXNbMF0gPSBzZWxlY3RvcjtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gMTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaXB0di50eXBlKHNlbGVjdG9yKSA9PT0gXCJhcnJheVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQgPSBzZWxlY3RvcjtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgICAgIGlwdHYubWVyZ2UodGhpcywgc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL+W9k+WJjeaTjeS9nOeahOS4iuS4i+aWh+WvueixoVxyXG4gICAgICAgIGNvbnRleHQ6IG51bGwsXHJcbiAgICAgICAgLy/lvZPliY3nmoTpgInmi6nlmahcclxuICAgICAgICBzZWxlY3RvcjogXCJcIixcclxuXHJcbiAgICB9O1xyXG4gICAgLy/ph43nva7ljp/lnovlr7nosaHkuLppcHR2XHJcbiAgICBpcHR2LmZuLmluaXQucHJvdG90eXBlID0gaXB0di5mbjtcclxuXHJcbiAgICAvL+S4jeWvueWkluaWueazlVxyXG4gICAgZnVuY3Rpb24gZ2V0c2VjKHNlYykge1xyXG4gICAgICAgIHZhciBzdHIxID0gc2VjLnN1YnN0cmluZygxLCBzZWMubGVuZ3RoKSAqIDE7XHJcbiAgICAgICAgdmFyIHN0cjIgPSBzZWMuc3Vic3RyaW5nKDAsIDEpO1xyXG4gICAgICAgIGlmIChzdHIyID09IFwiU1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHIxICogMTAwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc3RyMiA9PSBcIk1cIikge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyMSAqIDYwICogMTAwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc3RyMiA9PSBcIkhcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyMSAqIDYwICogNjAgKiAxMDAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzdHIyID09IFwiRFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHIxICogMjQgKiA2MCAqIDYwICogMTAwMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMSAqIDI0ICogNjAgKiA2MCAqIDEwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a6a5LmJ57un5om/5pa55rOVXHJcbiAgICAgKiDlpoLmnpzlj6rmnInkuIDkuKrlj4LmlbDvvIx0YXJnZXTlsLHmmK9pcHR257G75oiWaXB0duWvueixoe+8jFxyXG4gICAgICog5aaC5p6c5pyJMuS4quaIluWkmuS4quWPguaVsO+8jHRhcmdldOWwseaYr+esrOS4gOS4quWPguaVsO+8jOmCo+S5iOWwseesrDLkuKrlj4LmlbDlvIDlp4vkuYvlkI7nmoTmiYDmnInlj4LmlbDnmoTlsZ7mgKflpI3liLbliLDnrKzkuIDkuKrlj4LmlbDkuIrljrtcclxuICAgICAqIOWmguaenOesrOS4gOS4quWPguaVsOaYr3RydWXvvIx0YXJnZXTlsLHmmK/nrKzkuozkuKrlj4LmlbDvvIzkuYvlkI7nmoTlj4LmlbDnmoTlsZ7mgKflsLHlpI3liLbliLDnrKzkuozkuKrlj4LmlbDljrtcclxuICAgICAqIEB0eXBlIHtpcHR2LmV4dGVuZH1cclxuICAgICAqL1xyXG4gICAgaXB0di5leHRlbmQgPSBpcHR2LmZuLmV4dGVuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc3JjLCBjb3B5SXNBcnJheSwgY29weSwgbmFtZSwgb3B0aW9ucywgY2xvbmUsXHJcbiAgICAgICAgICAgIHRhcmdldCA9IGFyZ3VtZW50c1swXSB8fCB7fSxcclxuICAgICAgICAgICAgaSA9IDEsXHJcbiAgICAgICAgICAgIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXHJcbiAgICAgICAgICAgIGRlZXAgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gdGFyZ2V0IOaYr+S8oOWFpeeahOesrOS4gOS4quWPguaVsFxyXG4gICAgICAgIC8vIOWmguaenOesrOS4gOS4quWPguaVsOaYr+W4g+WwlOexu+Wei++8jOWImeihqOekuuaYr+WQpuimgea3semAkuW9ku+8jFxyXG4gICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSBcImJvb2xlYW5cIikge1xyXG4gICAgICAgICAgICBkZWVwID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB0YXJnZXQgPSBhcmd1bWVudHNbMV0gfHwge307XHJcbiAgICAgICAgICAgIC8vIOWmguaenOS8oOS6huexu+Wei+S4uiBib29sZWFuIOeahOesrOS4gOS4quWPguaVsO+8jGkg5YiZ5LuOIDIg5byA5aeLXHJcbiAgICAgICAgICAgIGkgPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDlpoLmnpzkvKDlhaXnmoTnrKzkuIDkuKrlj4LmlbDmmK8g5a2X56ym5Liy5oiW6ICF5YW25LuWXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09IFwib2JqZWN0XCIgJiYgIWlwdHYuaXNGdW5jdGlvbih0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDlpoLmnpzlj4LmlbDnmoTplb/luqbkuLogMSDvvIzooajnpLrmmK8gaXB0diDpnZnmgIHmlrnms5VcclxuICAgICAgICBpZiAobGVuZ3RoID09PSBpKSB7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC0taTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5Y+v5Lul5Lyg5YWl5aSa5Liq5aSN5Yi25rqQXHJcbiAgICAgICAgLy8gaSDmmK/ku44gMeaIljIg5byA5aeL55qEXHJcbiAgICAgICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyDlsIbmr4/kuKrmupDnmoTlsZ7mgKflhajpg6jlpI3liLbliLAgdGFyZ2V0IOS4ilxyXG4gICAgICAgICAgICBpZiAoKG9wdGlvbnMgPSBhcmd1bWVudHNbaV0pICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3RcclxuICAgICAgICAgICAgICAgIGZvciAobmFtZSBpbiBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc3JjIOaYr+a6kO+8iOWNs+acrOi6q++8ieeahOWAvFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvcHkg5piv5Y2z5bCG6KaB5aSN5Yi26L+H5Y6755qE5YC8XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjID0gdGFyZ2V0W25hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvcHkgPSBvcHRpb25zW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOmYsuatouacieeOr++8jOS+i+WmgiBleHRlbmQodHJ1ZSwgdGFyZ2V0LCB7J3RhcmdldCc6dGFyZ2V0fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gY29weSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5aaC5p6c5piv5rex5aSN5Yi2XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlZXAgJiYgY29weSAmJiAoaXB0di5pc1BsYWluT2JqZWN0KGNvcHkpIHx8IChjb3B5SXNBcnJheSA9IGlwdHYuaXNBcnJheShjb3B5KSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaVsOe7hFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29weUlzQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcHlJc0FycmF5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZSA9IHNyYyAmJiBpcHR2LmlzQXJyYXkoc3JjKSA/IHNyYyA6IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5a+56LGhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZSA9IHNyYyAmJiBpcHR2LmlzUGxhaW5PYmplY3Qoc3JjKSA/IHNyYyA6IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOmAkuW9klxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0gPSBpcHR2LmV4dGVuZChkZWVwLCBjbG9uZSwgY29weSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3B5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdID0gY29weTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOS5n+WwseaYr+WmguaenOS4jeS8oOmcgOimgeimhueblueahOa6kO+8jOiwg+eUqCAkLmV4dGVuZCDlhbblrp7mmK/lop7liqAgaXB0diDnmoTpnZnmgIHmlrnms5VcclxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgfTtcclxuICAgIC8v5re75YqgaXB0dumdmeaAgeaWueazlVxyXG4gICAgaXB0di5leHRlbmQoe1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOmHiuaUvmlwdHblr7nosaHlvJXnlKjvvIzpmLLmraLlhazlhbHlh7rljrvnmoRpcHR25Y+Y6YeP6YCg5oiQ5rGh5p+T5Yay56qB77yM5Lmf5Y+v5Lul5a6e546w5ZCM5LiA5Liq6aG16Z2i5pyJ5aSa5LiqaXB0duW6k1xyXG4gICAgICAgICAqIEBwYXJhbSBkZWVwIOWmguaenOS8oHRydWXvvIwk5LiOaXB0duWQjOaXtuS6pOe7meS6huivpeaWueazleeahOi/lOWbnuWAvO+8jOWmguaenOS8oGZhbHNl5oiW56m677yM5Y+q5pyJJOWPmOmHj+WwhuS6pOe7meivpeaWueazleeahOi/lOWbnuWAvFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtpcHR2fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG5vQ29uZmxpY3Q6IGZ1bmN0aW9uIChkZWVwKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuJCA9PT0gaXB0dikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LiQgPSBfJDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRlZXAgJiYgd2luZG93LmlwdHYgPT09IGlwdHYpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5pcHR2ID0gX2lwdHY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGlwdHY7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAkOiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICAgICAgaWYgKGlkICYmIGlwdHYudHJpbShpZCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpcHR2LnRyaW0oaWQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOmaj+acuuaVsFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGV4cGFuZG86IFwiaXB0dlwiICsgKGNvcmVfdmVyc2lvbiArIE1hdGgucmFuZG9tKCkpLnJlcGxhY2UoL1xcRC9nLCBcIlwiKSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDliKTmlq3kvKDlhaXlr7nosaHmmK/lkKbkuLogZnVuY3Rpb25cclxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBpc0Z1bmN0aW9uOiBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpcHR2LnR5cGUob2JqKSA9PT0gXCJmdW5jdGlvblwiO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5Yik5pat5Lyg5YWl5a+56LGh5piv5ZCm5Li65pWw57uEXHJcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaXNBcnJheTogQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpcHR2LnR5cGUob2JqKSA9PT0gXCJhcnJheVwiO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIOWIpOaWreS8oOWFpeWvueixoeaYr+WQpuS4uiB3aW5kb3cg5a+56LGhXHJcbiAgICAgICAgICogQHBhcmFtIG9ialxyXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzV2luZG93OiBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmogPT0gb2JqLndpbmRvdztcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIOehruWumuWug+eahOWPguaVsOaYr+WQpuaYr+S4gOS4quaVsOWtl1xyXG4gICAgICAgIGlzTnVtZXJpYzogZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICAvL2lzRmluaXRlOuWPguaVsOaYr+S4gOS4quaVsOWtl++8jOeUqOS6juWIpOaWrei/meS4quaVsOWtl+aYr+WQpuaYr+aXoOept+Wkp+aVsOWtl++8jOWmguaenOaYr+aXoOept+Wkp++8jOi/lOWbnmZhbHNl77yM5aaC5p6c5pWw5a2X5q2j5bi46L+U5ZuedHJ1ZVxyXG4gICAgICAgICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQob2JqKSkgJiYgaXNGaW5pdGUob2JqKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDnoa7lrppKYXZhU2NyaXB0IOWvueixoeeahOexu+Wei1xyXG4gICAgICAgICAqIEBwYXJhbSBvYmpcclxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbiBudW1iZXIgc3RyaW5nIGZ1bmN0aW9uIGFycmF5IGRhdGUgcmVnZXhwIG9iamVjdCBlcnJvcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0eXBlOiBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgICAgIC8vIOWmguaenOS8oOWFpeeahOS4uiBudWxsIC0tPiBcIm51bGxcIlxyXG4gICAgICAgICAgICBpZiAob2JqID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcob2JqKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDliKnnlKjkuovlhYjlrZjlpb3nmoQgaGFzaCDooaggY2xhc3MydHlwZSDkvZznsr7lh4bliKTmlq1cclxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiID9cclxuICAgICAgICAgICAgICAgIGNsYXNzMnR5cGVbY29yZV90b1N0cmluZy5jYWxsKG9iaildIHx8IFwib2JqZWN0XCIgOlxyXG4gICAgICAgICAgICAgICAgdHlwZW9mIG9iajtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOa1i+ivleWvueixoeaYr+WQpuaYr+e6r+eyueeahOWvueixoVxyXG4gICAgICAgICAqIOmAmui/hyBcInt9XCIg5oiW6ICFIFwibmV3IE9iamVjdFwiIOWIm+W7uueahFxyXG4gICAgICAgICAqIEBwYXJhbSBvYmpcclxuICAgICAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbiAsTnVtYmVyICxTdHJpbmcgLEZ1bmN0aW9uICxBcnJheSAsRGF0ZSAsUmVnRXhwICxPYmplY3QgLEVycm9yfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzUGxhaW5PYmplY3Q6IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAgICAgdmFyIGtleTtcclxuICAgICAgICAgICAgaWYgKCFvYmogfHwgaXB0di50eXBlKG9iaikgIT09IFwib2JqZWN0XCIgfHwgb2JqLm5vZGVUeXBlIHx8IGlwdHYuaXNXaW5kb3cob2JqKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5jb25zdHJ1Y3RvciAmJlxyXG4gICAgICAgICAgICAgICAgICAgICFjb3JlX2hhc093bi5jYWxsKG9iaiwgXCJjb25zdHJ1Y3RvclwiKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICFjb3JlX2hhc093bi5jYWxsKG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIFwiaXNQcm90b3R5cGVPZlwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpcHR2LnN1cHBvcnQub3duTGFzdCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvcmVfaGFzT3duLmNhbGwob2JqLCBrZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoa2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ga2V5ID09PSB1bmRlZmluZWQgfHwgY29yZV9oYXNPd24uY2FsbChvYmosIGtleSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDov5Tlm57lr7nosaHmmK/lkKbmmK/mlbDnu4Tov5jmmK/nsbvmlbDnu4Tlr7nosaFcclxuICAgICAgICAgKiBAcGFyYW0gb2JqXHJcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWU65piv5pWw57uE77yMZmFsc2U65LiN5piv57qv5pWw57uEXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaXNBcnJheWxpa2U6IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IG9iai5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICB0eXBlID0gaXB0di50eXBlKG9iaik7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXB0di5pc1dpbmRvdyhvYmopKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvYmoubm9kZVR5cGUgPT09IDEgJiYgbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHR5cGUgPT09IFwiYXJyYXlcIiB8fCB0eXBlICE9PSBcImZ1bmN0aW9uXCIgJiYgKGxlbmd0aCA9PT0gMCB8fCB0eXBlb2YgbGVuZ3RoID09PSBcIm51bWJlclwiICYmIGxlbmd0aCA+IDAgJiYgKGxlbmd0aCAtIDEpIGluIG9iaik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmo4Dmn6Xlr7nosaHmmK/lkKbkuLrnqbrvvIjkuI3ljIXlkKvku7vkvZXlsZ7mgKfvvIlcclxuICAgICAgICAgKiBAcGFyYW0gb2JqXHJcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaXNFbXB0eU9iamVjdDogZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICB2YXIgbmFtZTtcclxuICAgICAgICAgICAgZm9yIChuYW1lIGluIG9iaikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5Li6IEphdmFTY3JpcHQg55qEIFwiZXJyb3JcIiDkuovku7bnu5HlrprkuIDkuKrlpITnkIblh73mlbBcclxuICAgICAgICAgKiBAcGFyYW0gbXNnIOmUmeivr+aPj+i/sFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5Y676Zmk5YmN5ZCO56m65qC8XHJcbiAgICAgICAgICogQHBhcmFtIHRleHRcclxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRyaW06IGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0ID09IG51bGwgPyBcIlwiIDogKHRleHQgKyBcIlwiKS5yZXBsYWNlKHJ0cmltLCBcIlwiKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGV2YWznmoTlj5jlvILvvIzkvb/nlKjmlYjmnpzkuIDmoLfvvIzlj6rkuI3ov4fmmK/lnKjlhajlsYDkvZznlKjln5/kuK3miafooYwg5Y+C5pWwZGF0YVxyXG4gICAgICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2xvYmFsRXZhbDogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8g5aaC5p6cIGRhdGEg5LiN5Li656m6XHJcbiAgICAgICAgICAgIGlmIChkYXRhICYmIGlwdHYudHJpbShkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgKHdpbmRvdy5leGVjU2NyaXB0IHx8IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5ZyoY2hyb21l5LiA5Lqb5pen54mI5pys6YeMZXZhbC5jYWxsKCB3aW5kb3csIGRhdGEgKeaXoOaViFxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd1tcImV2YWxcIl0uY2FsbCh3aW5kb3csIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSkoZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWIpOaWreafkOS4qkRPTeaYr+WQpuaYr+aMh+WumueahG5hbWXlkI3np7BcclxuICAgICAgICAgKiBpcHR2Lm5vZGVOYW1lKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaFwiKSxcImgyXCIpLS0tPnJldHVybiB0cnVlL2ZhbHNlXHJcbiAgICAgICAgICogQHBhcmFtIGVsZW0gIERPTeiKgueCueWvueixoVxyXG4gICAgICAgICAqIEBwYXJhbSBuYW1lICDpnIDopoHliKTmlq3nmoToioLngrnlkI3np7BcclxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBub2RlTmFtZTogZnVuY3Rpb24gKGVsZW0sIG5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW0ubm9kZU5hbWUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlvqrnjq/mlbDnu4TmiJblr7nosaFcclxuICAgICAgICAgKiBAcGFyYW0gb2JqXHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrXHJcbiAgICAgICAgICogQHBhcmFtIGFyZ3NcclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBlYWNoOiBmdW5jdGlvbiAob2JqLCBjYWxsYmFjaywgYXJncykge1xyXG4gICAgICAgICAgICBpZiAoIW9iailyZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgdmFyIHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgaSA9IDAsXHJcbiAgICAgICAgICAgICAgICBsZW5ndGggPSBvYmoubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgaXNBcnJheSA9IGlwdHYuaXNBcnJheWxpa2Uob2JqKTsgLy8g5Yik5pat5piv5LiN5piv5pWw57uEXHJcblxyXG4gICAgICAgICAgICAvLyDkvKDkuobnrKzkuInkuKrlj4LmlbBcclxuICAgICAgICAgICAgaWYgKGFyZ3MpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc0FycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDnm7jlvZPkuo46XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFyZ3MgPSBbYXJnMSwgYXJnMiwgYXJnM107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrKGFyZ3MxLCBhcmdzMiwgYXJnczMp44CC54S25ZCOY2FsbGJhY2vph4zovrnnmoR0aGlz5oyH5ZCR5LqGb2JqW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY2FsbGJhY2suYXBwbHkob2JqW2ldLCBhcmdzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOazqOaEj+WIsO+8jOW9k2NhbGxiYWNr5Ye95pWw6L+U5Zue5YC85LyaZmFsc2XnmoTml7blgJnvvIzms6jmhI/mmK/lhajnrYnvvIHlvqrnjq/nu5PmnZ9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOmdnuaVsOe7hFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY2FsbGJhY2suYXBwbHkob2JqW2ldLCBhcmdzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8g5pWw57uEXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g55u45b2T5LqOY2FsbGJhY2soaSwgb2JqW2ldKeOAgueEtuWQjmNhbGxiYWNr6YeM6L6555qEdGhpc+aMh+WQkeS6hm9ialtpXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrLmNhbGwob2JqW2ldLCBpLCBvYmpbaV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6Z2e5pWw57uEXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSBpbiBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjYWxsYmFjay5jYWxsKG9ialtpXSwgaSwgb2JqW2ldKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBtZXJnZeeahOS4pOS4quWPguaVsOW/hemhu+S4uuaVsOe7hO+8jOS9nOeUqOWwseaYr+S/ruaUueesrOS4gOS4quaVsOe7hO+8jOS9v+W+l+Wug+acq+WwvuWKoOS4iuesrOS6jOS4quaVsOe7hFxyXG4gICAgICAgICAqIEBwYXJhbSBmaXJzdFxyXG4gICAgICAgICAqIEBwYXJhbSBzZWNvbmRcclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBtZXJnZTogZnVuY3Rpb24gKGZpcnN0LCBzZWNvbmQpIHtcclxuICAgICAgICAgICAgdmFyIGwgPSBzZWNvbmQubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgaSA9IGZpcnN0Lmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGogPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBsID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKDsgaiA8IGw7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0W2krK10gPSBzZWNvbmRbal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoc2Vjb25kW2pdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdFtpKytdID0gc2Vjb25kW2orK107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlyc3QubGVuZ3RoID0gaTtcclxuICAgICAgICAgICAgcmV0dXJuIGZpcnN0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+W5b2T5YmN5pe26Ze055qE5pe26Ze05oizXHJcbiAgICAgICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBub3c6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBET00gcmVhZHkg5piv5ZCm5bey57uP5a6M5oiQXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaXNSZWFkeTogZmFsc2UsXHJcbiAgICAgICAgcmVhZHk6IGZ1bmN0aW9uIChjYWxsYmFja18pIHtcclxuXHJcbiAgICAgICAgICAgIC8vIOehruWumiBib2R5IOWtmOWcqFxyXG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmJvZHkpIHtcclxuICAgICAgICAgICAgICAgIC8vIOWcqCBzZXRUaW1lb3V0IOS4reinpuWPkeeahOWHveaVsCwg5LiA5a6a5Lya5ZyoIERPTSDlh4blpIflrozmr5XlkI7op6blj5FcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGlwdHYucmVhZHksIDAsIGNhbGxiYWNrXyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g6K6w5b2VIERPTSByZWFkeSDlt7Lnu4/lrozmiJBcclxuICAgICAgICAgICAgaXB0di5pc1JlYWR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJET03liqDovb3lrozmiJDvvIFcIik7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrXy5jYWxsKHRoaXMsIGlwdHYuaXNSZWFkeSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmtY/op4jlmajlkI3np7BcclxuICAgICAgICAgKiBAcmV0dXJucyB7KnxzdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYnJvd3NlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYjMgPSBcIlwiO1xyXG4gICAgICAgICAgICB2YXIgYjQgPSBuYXZpZ2F0b3IuYXBwTmFtZTtcclxuICAgICAgICAgICAgaWYgKGI0LmluZGV4T2YoXCJpUGFuZWxcIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGIzID0gXCJpUGFuZWxcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChiNC5pbmRleE9mKFwiTWljcm9zb2Z0XCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBiMyA9IFwiTWlzY3Jvc29mdFwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGI0LmluZGV4T2YoXCJHb29nbGVcIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGIzID0gXCJHb29nbGVcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChiNC5pbmRleE9mKFwiTmV0c2NhcGVcIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGIzID0gXCJOZXRzY2FwZVwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGI0LmluZGV4T2YoXCJPcGVyYVwiKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgYjMgPSBcIk9wZXJhXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGIzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5Yik5pat5piv5ZCm5Li656m6IOWFvOWuueaVsOWtlzDliKTmlq3kuLrkuI3kuLpudWxsXHJcbiAgICAgICAgICogQHBhcmFtIG9ialxyXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzTnVsbDogZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICAvLzDkuZ/liKTmlq3kuLrmnInmlYjlgLxcclxuICAgICAgICAgICAgdmFyIGxfID0gJycgKyBvYmo7XHJcbiAgICAgICAgICAgIHZhciBsbF8gPSAnJyArIDA7XHJcbiAgICAgICAgICAgIGlmIChsXyA9PSBsbF8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mKG9iaikgPT0gJ29iamVjdCcgJiYgb2JqID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZihvYmopID09ICd1bmRlZmluZWQnIHx8IG9iaiA9PSB1bmRlZmluZWQgfHwgb2JqID09IG51bGwgfHwgb2JqID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDliKTmlq3mmK/lkKbkuI3kuLrnqbogIOWFvOWuueaVsOWtlzDliKTmlq3kuLrkuI3kuLpudWxsXHJcbiAgICAgICAgICogQHBhcmFtIG9ialxyXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzTm90TnVsbDogZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICAvLzDkuZ/liKTmlq3kuLrmnInmlYjlgLxcclxuICAgICAgICAgICAgdmFyIGxfID0gJycgKyBvYmo7XHJcbiAgICAgICAgICAgIHZhciBsbF8gPSAnJyArIDA7XHJcbiAgICAgICAgICAgIGlmIChsXyA9PSBsbF8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Yob2JqKSA9PSAnb2JqZWN0JyAmJiBvYmogPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Yob2JqKSA9PSAndW5kZWZpbmVkJyB8fCBvYmogPT0gdW5kZWZpbmVkIHx8IG9iaiA9PSBudWxsIHx8IG9iaiA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6K6+572u5oiW6I635Y+Wc3R5bGXmoLflvI/lgLxcclxuICAgICAgICAgKiBAcGFyYW0gZWxlbVxyXG4gICAgICAgICAqIEBwYXJhbSBuYW1lXHJcbiAgICAgICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBzdHlsZTogZnVuY3Rpb24gKGVsZW0sIG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICghZWxlbSAmJiAhZWxlbVswXSlyZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpcHR2LmlzRnVuY3Rpb24odmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbVswXS5zdHlsZVtuYW1lXSA9IHZhbHVlLmNhbGwoZWxlbSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1bMF0uc3R5bGVbbmFtZV0gPSBcIlwiICsgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtWzBdLnN0eWxlW25hbWVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5bpobnnm67lkI3np7DvvIxodHRwOi8vMTI3LjAuMC4xOjgwODAvYmFpZHUvaW5kZXguaHRtbOKAlOKAlD5iYWlkdS9cclxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldENvbnRleHROYW1lOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8v6I635Y+W5b2T5YmN572R5Z2A77yM5aaC77yaIGh0dHA6Ly9sb2NhbGhvc3Q6ODA4My91aW1jYXJkcHJqL3NoYXJlL21ldW4uanNwICBcclxuICAgICAgICAgICAgdmFyIGN1cld3d1BhdGggPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuICAgICAgICAgICAgLy/ojrflj5bkuLvmnLrlnLDlnYDkuYvlkI7nmoTnm67lvZXvvIzlpoLvvJogdWltY2FyZHByai9zaGFyZS9tZXVuLmpzcCAgXHJcbiAgICAgICAgICAgIHZhciBwYXRoTmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcclxuICAgICAgICAgICAgdmFyIHBvcyA9IGN1cld3d1BhdGguaW5kZXhPZihwYXRoTmFtZSk7XHJcbiAgICAgICAgICAgIC8v6I635Y+W5Li75py65Zyw5Z2A77yM5aaC77yaIGh0dHA6Ly9sb2NhbGhvc3Q6ODA4MyAgXHJcbiAgICAgICAgICAgIHZhciBsb2NhbGhvc3RQYWh0ID0gY3VyV3d3UGF0aC5zdWJzdHJpbmcoMCwgcG9zKTtcclxuICAgICAgICAgICAgLy/ojrflj5bluKZcIi9cIueahOmhueebruWQje+8jOWmgu+8mnVpbWNhcmRwcmovXHJcbiAgICAgICAgICAgIHZhciBwcm9qZWN0TmFtZSA9IHBhdGhOYW1lLnN1YnN0cmluZygxLCBwYXRoTmFtZS5zdWJzdHIoMSkuaW5kZXhPZignLycpICsgMik7XHJcbiAgICAgICAgICAgIC8vdmFyIHByb2plY3ROYW1lPXBhdGhOYW1lLnN1YnN0cmluZygwLHBhdGhOYW1lLnN1YnN0cigxKS5pbmRleE9mKCcvJykrMSktLS0tPi91aW1jYXJkcHJqICBcclxuICAgICAgICAgICAgcmV0dXJuIHByb2plY3ROYW1lO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+WaXDkuI7nq6/lj6MgIGh0dHA6Ly8xMjcuMC4wLjE6ODA4MFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0SG9zdFBhdGg6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy9odHRwOi8vbG9jYWxob3N0OjgwODMvdWltY2FyZHByai9zaGFyZS9tZXVuLmpzcCAgXHJcbiAgICAgICAgICAgIHZhciBocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgICAgIC8vdWltY2FyZHByai9zaGFyZS9tZXVuLmpzcCAgXHJcbiAgICAgICAgICAgIHZhciBwYXRobmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcclxuICAgICAgICAgICAgcmV0dXJuIGhyZWYuc3Vic3RyKDAsIGhyZWYubGFzdEluZGV4T2YocGF0aG5hbWUpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiOt+WPluS4iuS4i+aWh+i3r+W+hCAgaHR0cDovLzEyNy4wLjAuMTo4MDgwL2JhaWR1L2luZGV4Lmh0bWzigJTigJQ+aHR0cDovLzEyNy4wLjAuMTo4MDgwL2JhaWR1L1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0Q29udGV4dFBhdGg6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy9odHRwOi8vd3d3LnFpZ3VvLmNvbS83MjBwL2h0bWwvbWFpbi9tYWluLmh0bWxcclxuICAgICAgICAgICAgdmFyIHBhdGhuYW1lID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgICAgICAgICB2YXIgdDEgPSBwYXRobmFtZS5pbmRleE9mKFwiL1wiLCAwKTtcclxuICAgICAgICAgICAgdmFyIHNuYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgLy/liKTmlq3ln5/lkI3lkI7pnaLov5jmnInmsqHmnInot6/lvoTkuobvvIzlpoLmnpzmnInlsLHojrflj5bln5/lkI0r5bel56iL5ZCNXHJcbiAgICAgICAgICAgIGlmIChwYXRobmFtZS5pbmRleE9mKFwiL1wiLCB0MSArIDEpID4gLTEpLy81XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNuYW1lID0gcGF0aG5hbWUuc3Vic3RyaW5nKHQxICsgMSwgcGF0aG5hbWUuaW5kZXhPZihcIi9cIiwgdDEgKyAxKSk7XHJcbiAgICAgICAgICAgICAgICBzbmFtZSA9IHRoaXMuZ2V0SG9zdFBhdGgoKSArIFwiL1wiICsgc25hbWUgKyBcIi9cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc25hbWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlsIblr7nosaHovazmjaLmiJB1cmzlj4LmlbDpk77mjqUgICAgYWE9MSZiYj0yXHJcbiAgICAgICAgICogQHBhcmFtIGRhdGFcclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwYXJhbXM6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGFyciA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChpKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KGRhdGFbaV0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYXJyLmpvaW4oXCImXCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAga2V5Q29kZTogZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgICAgICBldnQgPSBldnQgIT0gbnVsbCAmJiBldnQgIT0gdW5kZWZpbmVkID8gZXZ0IDogd2luZG93LmV2ZW50O1xyXG4gICAgICAgICAgICB2YXIga2V5Q29kZSA9IGV2dC53aGljaCAhPSBudWxsICYmIGV2dC53aGljaCAhPSB1bmRlZmluZWQgJiYgZXZ0LndoaWNoICE9IDAgPyBldnQud2hpY2ggOiBldnQua2V5Q29kZTtcclxuICAgICAgICAgICAgcmV0dXJuIGtleUNvZGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmoLzlvI/ljJblrZfnrKbkuLLvvIzliqjmgIHmt7vliqDlgLxcclxuICAgICAgICAgKiBpcHR2LmZvcm1hdFN0cihcIuaIkeeahOWQjeWtl+aYr3swfSzmiJHku4rlubR7MX3lsoHkuoZcIixcInBldGVyXCIsMTIp4oCU4oCUPuaIkeeahOWQjeWtl+aYr3BldGVyLOaIkeS7iuW5tDEy5bKB5LqGXHJcbiAgICAgICAgICogQHBhcmFtIHN0ciAgIFwi5oiR55qE5ZCN5a2X5pivezB9LOaIkeS7iuW5tHsxfeWygeS6hlwiXHJcbiAgICAgICAgICogQHJldHVybnMgeyp9IOaIkeeahOWQjeWtl+aYr3BldGVyLOaIkeS7iuW5tDEy5bKB5LqGXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZm9ybWF0U3RyOiBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoXCJ7XCIgKyBpICsgXCJ9XCIsIGFyZ3VtZW50c1tpICsgMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzdHI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5bmnLrpobbnm5Llnovlj7dcclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgICAgKi9cclxuICAgICAgICBTVEJUeXBlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQXV0aGVudGljYXRpb24uQ1RDR2V0Q29uZmlnKFwiU1RCVHlwZVwiKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjb3JlX3N0cnVuZGVmaW5lZDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWwhuaWueazleS4iuWNh+WIsOmhtue6p3dpbmRvd+Wvueixoeiwg+eUqGZu5pa55rOVXHJcbiAgICAgICAgICogQHBhcmFtIGZuICAgIOWPr+S7peS4umpz5Luj56CB5a2X56ym77yM5Y+v5Lul5pivZnVuY3Rpb25cclxuICAgICAgICAgKiBAcGFyYW0gYXJncyAg5Y+v5Lul5Li65pWw57uE5Y+C5pWw77yM5Lmf5Y+v5Lul5Li65Y2V5Liq5Y+C5pWwXHJcbiAgICAgICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2FsbDogZnVuY3Rpb24gKGZuLCBhcmdzKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YoZm4pID09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZhbChcIihcIiArIGZuICsgXCIpXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZihmbikgPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgLy/lpoLmnpzlj4LmlbDkuI3mmK/mlbDnu4Qs5bCx5Yib5bu65pWw57uE5Y+C5pWwXHJcbiAgICAgICAgICAgICAgICBpZiAoIWlwdHYuaXNBcnJheShhcmdzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcnIgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChhcmd1bWVudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBhcmdzID0gYXJyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHdpbmRvdywgYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOaxguacgOWwj+aVsOS4juacgOWkp+aVsOS5i+mXtOeahOmaj+acuuaVsO+8jOivpeaVsOawuOi/nOS4jeS8muetieS6juacgOWkp+aVsFxyXG4gICAgICAgICAqIEBwYXJhbSBNaW5cclxuICAgICAgICAgKiBAcGFyYW0gTWF4XHJcbiAgICAgICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmFuZ2VOdW06IGZ1bmN0aW9uIChNaW4sIE1heCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWluICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKE1heCAtIE1pbikpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5rGC5Lik5Liq5pe26Ze055qE5aSp5pWw5beuIOaXpeacn+agvOW8j+S4uiBZWVlZLU1NLWRkXHJcbiAgICAgICAgICogQHBhcmFtIERhdGVPbmUgICAyMDE3LTEyLTFcclxuICAgICAgICAgKiBAcGFyYW0gRGF0ZVR3byAgIDIwMTctMS0xXHJcbiAgICAgICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBkYXlzQmV0d2VlbjogZnVuY3Rpb24gKERhdGVPbmUsIERhdGVUd28pIHtcclxuICAgICAgICAgICAgdmFyIE9uZU1vbnRoID0gRGF0ZU9uZS5zdWJzdHJpbmcoNSwgRGF0ZU9uZS5sYXN0SW5kZXhPZignLScpKTtcclxuICAgICAgICAgICAgdmFyIE9uZURheSA9IERhdGVPbmUuc3Vic3RyaW5nKERhdGVPbmUubGVuZ3RoLCBEYXRlT25lLmxhc3RJbmRleE9mKCctJykgKyAxKTtcclxuICAgICAgICAgICAgdmFyIE9uZVllYXIgPSBEYXRlT25lLnN1YnN0cmluZygwLCBEYXRlT25lLmluZGV4T2YoJy0nKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgVHdvTW9udGggPSBEYXRlVHdvLnN1YnN0cmluZyg1LCBEYXRlVHdvLmxhc3RJbmRleE9mKCctJykpO1xyXG4gICAgICAgICAgICB2YXIgVHdvRGF5ID0gRGF0ZVR3by5zdWJzdHJpbmcoRGF0ZVR3by5sZW5ndGgsIERhdGVUd28ubGFzdEluZGV4T2YoJy0nKSArIDEpO1xyXG4gICAgICAgICAgICB2YXIgVHdvWWVhciA9IERhdGVUd28uc3Vic3RyaW5nKDAsIERhdGVUd28uaW5kZXhPZignLScpKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjaGEgPSAoKERhdGUucGFyc2UoT25lTW9udGggKyAnLycgKyBPbmVEYXkgKyAnLycgKyBPbmVZZWFyKSAtIERhdGUucGFyc2UoVHdvTW9udGggKyAnLycgKyBUd29EYXkgKyAnLycgKyBUd29ZZWFyKSkgLyA4NjQwMDAwMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmFicyhjaGEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog55Sf5oiQ5b2T5YmN5pyN5Yqh5Zmo5pe26Ze05pCTXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcnVuVGltZUludGVydmFsOiBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChpcHR2LnNlcnZlclRpbWVzdGFtcCAhPSB1bmRlZmluZWQgJiYgaXB0di5zZXJ2ZXJUaW1lc3RhbXAgIT0gbnVsbCAmJiBpcHR2LnNlcnZlclRpbWVzdGFtcCAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgaXB0di5zZXJ2ZXJUaW1lc3RhbXAgPSBwYXJzZUludChpcHR2LnNlcnZlclRpbWVzdGFtcCkgKyAxMDAwO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaXB0di5zZXJ2ZXJUaW1lc3RhbXAgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwMCksXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+W5b2T5YmN5pyN5Yqh5Zmo5pe26Ze05a+56LGhXHJcbiAgICAgICAgICogQHJldHVybnMge0RhdGV9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0U2VydmVyRGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChpcHR2LnNlcnZlclRpbWVzdGFtcCAhPSB1bmRlZmluZWQgJiYgaXB0di5zZXJ2ZXJUaW1lc3RhbXAgIT0gbnVsbCAmJiBpcHR2LnNlcnZlclRpbWVzdGFtcCAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKHBhcnNlSW50KGlwdHYuc2VydmVyVGltZXN0YW1wKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDorr7nva5Db29raWVcclxuICAgICAgICAgKiBAcGFyYW0gbmFtZVxyXG4gICAgICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICAgICAqIEBwYXJhbSB0aW1lc3RyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2V0Q29va2llOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUsIHRpbWVzdHIpIHtcclxuICAgICAgICAgICAgdmFyIGV4cDIgPSBpcHR2LmdldFNlcnZlckRhdGUoKTtcclxuICAgICAgICAgICAgdmFyIGlkID0gdGltZXN0ciA/IHRpbWVzdHIgOiBcIkQxXCI7XHJcbiAgICAgICAgICAgIHZhciB0ID0gZ2V0c2VjKGlkKTtcclxuICAgICAgICAgICAgZXhwMi5zZXRUaW1lKGV4cDIuZ2V0VGltZSgpICsgdCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyAoXCI9XCIgKyBlc2NhcGUodmFsdWUpICsgXCI7ZXhwaXJlcz1cIiArIGV4cDIudG9HTVRTdHJpbmcoKSArIFwiO3BhdGg9LztcIik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5ZDb29raWVcclxuICAgICAgICAgKiBAcGFyYW0gbmFtZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldENvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIGFyciA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKFwiKF58IClcIiArIG5hbWUgKyBcIj0oW147XSopKDt8JClcIikpO1xyXG4gICAgICAgICAgICB2YXIgcyA9IFwiXCI7XHJcbiAgICAgICAgICAgIGlmIChhcnIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcyA9IHVuZXNjYXBlKGFyclsyXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocyAhPSBudWxsICYmIHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzLmluZGV4T2YoJ1wiJywgMCkgPT0gMCAmJiBzLnN1YnN0cmluZyhzLmxlbmd0aCAtIDEsIHMubGVuZ3RoKSA9PSBcIlxcXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzID0gcy5zdWJzdHJpbmcoMSwgcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzID0gcy5zdWJzdHJpbmcoMCwgcy5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWIoOmZpENvb2tpZVxyXG4gICAgICAgICAqIEBwYXJhbSBuYW1lXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZGVsQ29va2llOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgZXhwID0gaXB0di5nZXRTZXJ2ZXJEYXRlKCk7XHJcbiAgICAgICAgICAgIGV4cC5zZXRUaW1lKGV4cC5nZXRUaW1lKCkgLSAxKTtcclxuICAgICAgICAgICAgdmFyIGN2YWwgPSBpcHR2LmdldENvb2tpZShuYW1lKTtcclxuICAgICAgICAgICAgaWYgKGN2YWwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPVwiICsgY3ZhbCArIFwiO2V4cGlyZXM9XCIgKyBleHAudG9HTVRTdHJpbmcoKSArIFwiO3BhdGg9LztcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+WVVJM6K+35rGC5YC8XHJcbiAgICAgICAgICogQHBhcmFtIGQgdXJsIGtleeWAvFxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJlcXVlc3RWYWx1ZTogZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgdmFyIGIgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuICAgICAgICAgICAgdmFyIGYgPSBiLmluZGV4T2YoXCI/XCIpO1xyXG4gICAgICAgICAgICB2YXIgZSA9IGIuc3Vic3RyKGYgKyAxKTtcclxuICAgICAgICAgICAgdmFyIGMgPSBlLnNwbGl0KFwiJlwiKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgYSA9IDA7IGEgPCBjLmxlbmd0aDsgYSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZyA9IGNbYV0uc3BsaXQoXCI9XCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdbMF0udG9VcHBlckNhc2UoKSA9PSBkLnRvVXBwZXJDYXNlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ1sxXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8v5re75Yqg57G75Z6LXHJcbiAgICBpcHR2LmVhY2goXCJCb29sZWFuIE51bWJlciBTdHJpbmcgRnVuY3Rpb24gQXJyYXkgRGF0ZSBSZWdFeHAgT2JqZWN0IEVycm9yXCIuc3BsaXQoXCIgXCIpLCBmdW5jdGlvbiAoaSwgbmFtZSkge1xyXG4gICAgICAgIGNsYXNzMnR5cGVbXCJbb2JqZWN0IFwiICsgbmFtZSArIFwiXVwiXSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgIH0pO1xyXG4gICAgLy/mianlsZXml6XmnJ9cclxuICAgIGlwdHYuZXh0ZW5kKERhdGUucHJvdG90eXBlLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5Yik5pat6Zew5bm0XHJcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaXNMZWFwWWVhcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKCAwID09IHRoaXMuZ2V0WWVhcigpICUgNCAmJiAoKHRoaXMuZ2V0WWVhcigpICUgMTAwICE9IDAgKSB8fCAodGhpcy5nZXRZZWFyKCkgJSA0MDAgPT0gMCApKSApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5pel5pyf5qC85byP5YyWXHJcbiAgICAgICAgICrmoLzlvI8gWVlZWS95eXl5L1lZL3l5IOihqOekuuW5tOS7vVxyXG4gICAgICAgICAqIE1NL00g5pyI5Lu9XHJcbiAgICAgICAgICogVy93IOaYn+acn1xyXG4gICAgICAgICAqIGRkL0REL2QvRCDml6XmnJ9cclxuICAgICAgICAgKiBoaC9ISC9oL0gg5pe26Ze0XHJcbiAgICAgICAgICogbW0vbSDliIbpkp9cclxuICAgICAgICAgKiBzcy9TUy9zL1Mg56eSXHJcbiAgICAgICAgICogQHBhcmFtIGZvcm1hdFN0clxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEZvcm1hdDogZnVuY3Rpb24gKGZvcm1hdFN0cikge1xyXG4gICAgICAgICAgICB2YXIgc3RyID0gZm9ybWF0U3RyO1xyXG4gICAgICAgICAgICB2YXIgV2VlayA9IFsn5pelJywgJ+S4gCcsICfkuownLCAn5LiJJywgJ+WbmycsICfkupQnLCAn5YWtJ107XHJcblxyXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgveXl5eXxZWVlZLywgdGhpcy5nZXRGdWxsWWVhcigpKTtcclxuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoL3l5fFlZLywgKHRoaXMuZ2V0WWVhcigpICUgMTAwKSA+IDkgPyAodGhpcy5nZXRZZWFyKCkgJSAxMDApLnRvU3RyaW5nKCkgOiAnMCcgKyAodGhpcy5nZXRZZWFyKCkgJSAxMDApKTtcclxuICAgICAgICAgICAgdmFyIG1vbnRoID0gdGhpcy5nZXRNb250aCgpICsgMTtcclxuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoL01NLywgbW9udGggPiA5ID8gbW9udGggOiAnMCcgKyBtb250aCk7XHJcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9NL2csIG1vbnRoKTtcclxuXHJcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC93fFcvZywgV2Vla1t0aGlzLmdldERheSgpXSk7XHJcblxyXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvZGR8REQvLCB0aGlzLmdldERhdGUoKSA+IDkgPyB0aGlzLmdldERhdGUoKS50b1N0cmluZygpIDogJzAnICsgdGhpcy5nZXREYXRlKCkpO1xyXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvZHxEL2csIHRoaXMuZ2V0RGF0ZSgpKTtcclxuXHJcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9oaHxISC8sIHRoaXMuZ2V0SG91cnMoKSA+IDkgPyB0aGlzLmdldEhvdXJzKCkudG9TdHJpbmcoKSA6ICcwJyArIHRoaXMuZ2V0SG91cnMoKSk7XHJcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9ofEgvZywgdGhpcy5nZXRIb3VycygpKTtcclxuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoL21tLywgdGhpcy5nZXRNaW51dGVzKCkgPiA5ID8gdGhpcy5nZXRNaW51dGVzKCkudG9TdHJpbmcoKSA6ICcwJyArIHRoaXMuZ2V0TWludXRlcygpKTtcclxuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoL20vZywgdGhpcy5nZXRNaW51dGVzKCkpO1xyXG5cclxuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoL3NzfFNTLywgdGhpcy5nZXRTZWNvbmRzKCkgPiA5ID8gdGhpcy5nZXRTZWNvbmRzKCkudG9TdHJpbmcoKSA6ICcwJyArIHRoaXMuZ2V0U2Vjb25kcygpKTtcclxuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoL3N8Uy9nLCB0aGlzLmdldFNlY29uZHMoKSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5pel5pyf6K6h566XXHJcbiAgICAgICAgICogQHBhcmFtIHN0ckludGVydmFsXHJcbiAgICAgICAgICogQHBhcmFtIE51bWJlclxyXG4gICAgICAgICAqIEByZXR1cm5zIHtEYXRlfVxyXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIERhdGVBZGQ6IGZ1bmN0aW9uIChzdHJJbnRlcnZhbCwgTnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciBkdFRtcCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoc3RySW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3MnIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5wYXJzZShkdFRtcCkgKyAoMTAwMCAqIE51bWJlcikpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbicgOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLnBhcnNlKGR0VG1wKSArICg2MDAwMCAqIE51bWJlcikpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnaCcgOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLnBhcnNlKGR0VG1wKSArICgzNjAwMDAwICogTnVtYmVyKSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdkJyA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKERhdGUucGFyc2UoZHRUbXApICsgKDg2NDAwMDAwICogTnVtYmVyKSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd3JyA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKERhdGUucGFyc2UoZHRUbXApICsgKCg4NjQwMDAwMCAqIDcpICogTnVtYmVyKSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdxJyA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGR0VG1wLmdldEZ1bGxZZWFyKCksIChkdFRtcC5nZXRNb250aCgpKSArIE51bWJlciAqIDMsIGR0VG1wLmdldERhdGUoKSwgZHRUbXAuZ2V0SG91cnMoKSwgZHRUbXAuZ2V0TWludXRlcygpLCBkdFRtcC5nZXRTZWNvbmRzKCkpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbScgOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShkdFRtcC5nZXRGdWxsWWVhcigpLCAoZHRUbXAuZ2V0TW9udGgoKSkgKyBOdW1iZXIsIGR0VG1wLmdldERhdGUoKSwgZHRUbXAuZ2V0SG91cnMoKSwgZHRUbXAuZ2V0TWludXRlcygpLCBkdFRtcC5nZXRTZWNvbmRzKCkpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAneScgOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSgoZHRUbXAuZ2V0RnVsbFllYXIoKSArIE51bWJlciksIGR0VG1wLmdldE1vbnRoKCksIGR0VG1wLmdldERhdGUoKSwgZHRUbXAuZ2V0SG91cnMoKSwgZHRUbXAuZ2V0TWludXRlcygpLCBkdFRtcC5nZXRTZWNvbmRzKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOaKiuaXpeacn+WIhuWJsuaIkOaVsOe7hFxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRvQXJyYXk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG15RGF0ZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBteUFycmF5ID0gQXJyYXkoKTtcclxuICAgICAgICAgICAgbXlBcnJheVswXSA9IG15RGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICBteUFycmF5WzFdID0gbXlEYXRlLmdldE1vbnRoKCk7XHJcbiAgICAgICAgICAgIG15QXJyYXlbMl0gPSBteURhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICBteUFycmF5WzNdID0gbXlEYXRlLmdldEhvdXJzKCk7XHJcbiAgICAgICAgICAgIG15QXJyYXlbNF0gPSBteURhdGUuZ2V0TWludXRlcygpO1xyXG4gICAgICAgICAgICBteUFycmF5WzVdID0gbXlEYXRlLmdldFNlY29uZHMoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG15QXJyYXk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlj5blvpfml6XmnJ/mlbDmja7kv6Hmga9cclxuICAgICAgICAgKiDlj4LmlbAgaW50ZXJ2YWwg6KGo56S65pWw5o2u57G75Z6LXHJcbiAgICAgICAgICogeSDlubQgbeaciCBk5pelIHfmmJ/mnJ8gd3flkaggaOaXtiBu5YiGIHPnp5JcclxuICAgICAgICAgKiBAcGFyYW0gaW50ZXJ2YWxcclxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIERhdGVQYXJ0OiBmdW5jdGlvbiAoaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgdmFyIG15RGF0ZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBwYXJ0U3RyID0gJyc7XHJcbiAgICAgICAgICAgIHZhciBXZWVrID0gWyfml6UnLCAn5LiAJywgJ+S6jCcsICfkuIknLCAn5ZubJywgJ+S6lCcsICflha0nXTtcclxuICAgICAgICAgICAgc3dpdGNoIChpbnRlcnZhbCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAneScgOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRTdHIgPSBteURhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ20nIDpcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0U3RyID0gbXlEYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZCcgOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRTdHIgPSBteURhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndycgOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRTdHIgPSBXZWVrW215RGF0ZS5nZXREYXkoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd3dycgOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRTdHIgPSBteURhdGUuV2Vla051bU9mWWVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnaCcgOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRTdHIgPSBteURhdGUuZ2V0SG91cnMoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ24nIDpcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0U3RyID0gbXlEYXRlLmdldE1pbnV0ZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3MnIDpcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0U3RyID0gbXlEYXRlLmdldFNlY29uZHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcGFydFN0cjtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL+WumuS5ieWvueixoeaWueazlVxyXG4gICAgaXB0di5mbi5leHRlbmQoe1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiuvue9rumakOiXj1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtoaWRlfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGhpZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXNbMF0pIHtcclxuICAgICAgICAgICAgICAgIGlwdHYuc3R5bGUodGhpcywgXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvdzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpc1swXSkge1xyXG4gICAgICAgICAgICAgICAgaXB0di5zdHlsZSh0aGlzLCBcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6K6+572u5oiW6I635Y+WaHRtbFxyXG4gICAgICAgICAqIEBwYXJhbSBodG1sXHJcbiAgICAgICAgICogQHJldHVybnMge2h0bWx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaHRtbDogZnVuY3Rpb24gKGh0bWwpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXNbMF0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChodG1sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1swXS5pbm5lckhUTUwgPSBcIlwiICsgaHRtbDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbMF0uaW5uZXJIVE1MO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOabv+aNouaIluiOt+WPllNyY+i3r+W+hOWcsOWdgFxyXG4gICAgICAgICAqIEBwYXJhbSBzcmNcclxuICAgICAgICAgKiBAcmV0dXJucyB7c2V0U3JjfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNyYzogZnVuY3Rpb24gKHNyYykge1xyXG4gICAgICAgICAgICBpZiAodGhpc1swXSAmJiBpcHR2LnRyaW0oc3JjKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpc1swXS5zcmMgPSBcIlwiICsgc3JjO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpc1swXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbMF0uc3JjO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+W5oiW6K6+572u5qC35byPXHJcbiAgICAgICAgICogQHBhcmFtIG5hbWVcclxuICAgICAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAgICAgKi9cclxuICAgICAgICBhdHRyOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlwdHYuc3R5bGUodGhpcywgbmFtZSwgdmFsdWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5Yik5pat5piv5ZCm5a2Y5ZyoY2xhc3NOYW1l5qC35byP5ZCNIOWmguaenOWtmOWcqOWwsei/lOWbnuS4gOS4quaVsOe7hOWvueixoSDkuI3lrZjlnKjlsLHov5Tlm57kuLpOdWxsXHJcbiAgICAgICAgICogQHBhcmFtIGNsYXNzTmFtZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGhhc0NsYXNzOiBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIGlmICghY2xhc3NOYW1lIHx8ICF0aGlzWzBdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXNbMF0uY2xhc3NOYW1lLm1hdGNoKG5ldyBSZWdFeHAoJyhcXFxcc3xeKScgKyBjbGFzc05hbWUgKyAnKFxcXFxzfCQpJykpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5re75Yqg57G75qC35byPXHJcbiAgICAgICAgICogQHBhcmFtIGNsYXNzTmFtZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHthZGRDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICBhZGRDbGFzczogZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoIWNsYXNzTmFtZSB8fCAhdGhpc1swXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0NsYXNzKGNsYXNzTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNbMF0uY2xhc3NOYW1lICs9ICcgJyArIGNsYXNzTmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOenu+mZpOexu+agt+W8j1xyXG4gICAgICAgICAqIEBwYXJhbSBjbGFzc05hbWVcclxuICAgICAgICAgKiBAcmV0dXJucyB7cmVtb3ZlQ2xhc3N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgaWYgKCFjbGFzc05hbWUgfHwgIXRoaXNbMF0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0NsYXNzKGNsYXNzTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNbMF0uY2xhc3NOYW1lID0gdGhpc1swXS5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXFxcXHN8XiknICsgY2xhc3NOYW1lICsgJyhcXFxcc3wkKScpLCAnICcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5aaC5p6c5a2Y5Zyo5bCx5Yig6ZmkY2xhc3NOYW1l5qC35byP77yM5aaC5p6c5LiN5a2Y5Zyo5bCx5re75YqgY2xhc3NOYW1l5qC35byPXHJcbiAgICAgICAgICogQHBhcmFtIGNsYXNzTmFtZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt0b2dnbGVDbGFzc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0b2dnbGVDbGFzczogZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoIWNsYXNzTmFtZSB8fCAhdGhpc1swXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzQ2xhc3MoY2xhc3NOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZENsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOa3u+WKoOS6i+S7tlxyXG4gICAgICAgICAqIEBwYXJhbSB0eXBlXHJcbiAgICAgICAgICogQHBhcmFtIGZ1bmNcclxuICAgICAgICAgKiBAcmV0dXJucyB7YWRkRXZlbnR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gKHR5cGUsIGZ1bmMpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzWzBdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpc1swXS5hZGRFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICAvL+ebkeWQrElFOe+8jOiwt+atjOWSjOeBq+eLkCBcclxuICAgICAgICAgICAgICAgIHRoaXNbMF0uYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmdW5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpc1swXS5hdHRhY2hFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpc1swXS5hdHRhY2hFdmVudChcIm9uXCIgKyB0eXBlLCBmdW5jKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXNbMF1bXCJvblwiICsgdHlwZV0gPSBmdW5jO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog56e76Zmk5LqL5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldFxyXG4gICAgICAgICAqIEBwYXJhbSB0eXBlXHJcbiAgICAgICAgICogQHBhcmFtIGZ1bmNcclxuICAgICAgICAgKi9cclxuICAgICAgICByZW1vdmVFdmVudExpc3RlbmVyOiBmdW5jdGlvbiAodHlwZSwgZnVuYykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXNbMF0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzWzBdLnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgICAgIC8v55uR5ZCsSUU577yM6LC35q2M5ZKM54Gr54uQIFxyXG4gICAgICAgICAgICAgICAgdGhpc1swXS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZ1bmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzWzBdLmRldGFjaEV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzWzBdLmRldGFjaEV2ZW50KFwib25cIiArIHR5cGUsIGZ1bmMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRhcmdldFtcIm9uXCIgKyB0eXBlXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiuvue9rmNzczPmoLflvI9cclxuICAgICAgICAgKiBAcGFyYW0gb2JqQXR0clxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNldENzczM6IGZ1bmN0aW9uIChvYmpBdHRyKSB7XHJcbiAgICAgICAgICAgIC8v5b6q546v5bGe5oCn5a+56LGhXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gb2JqQXR0cikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld2kgPSBpO1xyXG4gICAgICAgICAgICAgICAgLy/liKTmlq3mmK/lkKblrZjlnKh0cmFuc2Zvcm0tb3JpZ2lu6L+Z5qC35qC85byP55qE5bGe5oCnXHJcbiAgICAgICAgICAgICAgICBpZiAobmV3aS5pbmRleE9mKFwiLVwiKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+Wwhi1v5a2X56ym5Y+Y5oiQ5aSn5YaZLU9cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbnVtID0gbmV3aS5pbmRleE9mKFwiLVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdpID0gbmV3aS5yZXBsYWNlKG5ld2kuc3Vic3RyKG51bSwgMiksIG5ld2kuc3Vic3RyKG51bSArIDEsIDEpLnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy/ogIPomZHliLBjc3Mz55qE5YW85a655oCn6Zeu6aKYLOaJgOS7pei/meS6m+WxnuaAp+mDveW/hemhu+WKoOWJjee8gOaJjeihjFxyXG4gICAgICAgICAgICAgICAgdGhpc1swXS5zdHlsZVtuZXdpXSA9IG9iakF0dHJbaV07XHJcbiAgICAgICAgICAgICAgICAvL+iuvue9rummluWtl+avjeWkp+WGmSAgIFxyXG4gICAgICAgICAgICAgICAgbmV3aSA9IG5ld2kucmVwbGFjZShuZXdpLmNoYXJBdCgwKSwgbmV3aS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzWzBdLnN0eWxlW1wid2Via2l0XCIgKyBuZXdpXSA9IG9iakF0dHJbaV07XHJcbiAgICAgICAgICAgICAgICB0aGlzWzBdLnN0eWxlW1wibW96XCIgKyBuZXdpXSA9IG9iakF0dHJbaV07XHJcbiAgICAgICAgICAgICAgICB0aGlzWzBdLnN0eWxlW1wib1wiICsgbmV3aV0gPSBvYmpBdHRyW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpc1swXS5zdHlsZVtcIm1zXCIgKyBuZXdpXSA9IG9iakF0dHJbaV07XHJcbiAgICAgICAgICAgICAgICB0aGlzWzBdLnN0eWxlW1wia2h0bWxcIiArIG5ld2ldID0gb2JqQXR0cltpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udGFpbnM6IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dCAmJiBpcHR2LmlzQXJyYXkodGhpcy5jb250ZXh0KSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGkgPSB0aGlzLmNvbnRleHQubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRleHRbaV0gPT09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8v5a6a5LmJYWpheOaooeWdl1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlWEhSKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT0gXCJ1bmRlZmluZWRcIikgeyAvLyDpnZ5JRTbmtY/op4jlmahcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIEFjdGl2ZVhPYmplY3QgIT0gXCJ1bmRlZmluZWRcIikgeyAgIC8vIElFNua1j+iniOWZqFxyXG4gICAgICAgICAgICB2YXIgdmVyc2lvbiA9IFtcIk1TWE1MMi5YTUxIdHRwLjYuMFwiLCBcIk1TWE1MMi5YTUxIdHRwLjMuMFwiLCBcIk1TWE1MMi5YTUxIdHRwXCIsXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2ZXJzaW9uLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCh2ZXJzaW9uW2ldKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpcHR2LmV4dGVuZCh7XHJcbiAgICAgICAgYWpheDogZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICBvYmogPSBvYmogfHwge307XHJcbiAgICAgICAgICAgIG9iai5tZXRob2QgPSBvYmoubWV0aG9kLnRvVXBwZXJDYXNlKCkgfHwgJ1BPU1QnO1xyXG4gICAgICAgICAgICBvYmoudXJsID0gb2JqLnVybCB8fCAnJztcclxuICAgICAgICAgICAgb2JqLnVybCArPSBvYmoudXJsLmluZGV4T2YoXCI/XCIpID09IC0xID8gXCI/cmFuZD1cIiArIE1hdGgucmFuZG9tKCkgOiBcIiZyYW5kPVwiICsgTWF0aC5yYW5kb20oKTtcclxuICAgICAgICAgICAgb2JqLmRhdGEgPSBvYmouZGF0YSB8fCB7fTtcclxuICAgICAgICAgICAgb2JqLmFzeW5jID0gb2JqLmFzeW5jIHx8IHRydWU7XHJcbiAgICAgICAgICAgIG9iai5zdWNjZXNzID0gb2JqLnN1Y2Nlc3MgfHwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgb2JqLmVycm9yID0gb2JqLmVycm9yIHx8IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG9iai5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMucHVzaChrZXkgKyBcIj1cIiArIG9iai5kYXRhW2tleV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBwb3N0RGF0YSA9IHBhcmFtcy5qb2luKFwiJlwiKTtcclxuICAgICAgICAgICAgdmFyIHhociA9IGNyZWF0ZVhIUigpO1xyXG4gICAgICAgICAgICBpZiAob2JqLm1ldGhvZCA9PT0gXCJQT1NUXCIpIHtcclxuICAgICAgICAgICAgICAgIHhoci5vcGVuKG9iai5tZXRob2QsIG9iai51cmwsIG9iai5hc3luYyk7XHJcbiAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XHJcbiAgICAgICAgICAgICAgICB4aHIuc2VuZChwb3N0RGF0YSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqLm1ldGhvZCA9PT0gXCJHRVRcIikge1xyXG4gICAgICAgICAgICAgICAgeGhyLm9wZW4ob2JqLm1ldGhvZCwgb2JqLnVybCArICcmJyArIHBvc3REYXRhLCBvYmouYXN5bmMpO1xyXG4gICAgICAgICAgICAgICAgeGhyLnNlbmQobnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0ICYmIHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5yZXNwb25zZVRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlT2JqID0gZXZhbChcIihcIiArIHhoci5yZXNwb25zZVRleHQgKyBcIilcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v55m76ZmG5aSx5pWIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZU9iaiAmJiByZXNwb25zZU9iai5jb2RlID09IDEwMDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaXB0di5FcnJvckxvZ2luRmFpbFVybDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZU9iaiA9PSBudWxsIHx8IHJlc3BvbnNlT2JqID09IFwiXCIgfHwgcmVzcG9uc2VPYmouY29kZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGlwdHYuRXJyb3JTZXJ2ZXJGYWlsVXJsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnN1Y2Nlc3MoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHIuc3RhdHVzICE9IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5lcnJvcih4aHIuc3RhdHVzLCB4aHIuc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgbW9kdWxlICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gaXB0djtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XHJcbiAgICAgICAgICAgIGRlZmluZShcImlwdHZcIiwgW10sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpcHR2O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHdpbmRvdy5kb2N1bWVudCA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgIHdpbmRvdy5pcHR2ID0gd2luZG93LiQgPSBpcHR2O1xyXG4gICAgfVxyXG59KSh3aW5kb3cpOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3JpZ2luYWxNb2R1bGUpIHtcblx0aWYgKCFvcmlnaW5hbE1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHR2YXIgbW9kdWxlID0gT2JqZWN0LmNyZWF0ZShvcmlnaW5hbE1vZHVsZSk7XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiZXhwb3J0c1wiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlXG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCIvKiBnbG9iYWxzIF9fd2VicGFja19hbWRfb3B0aW9uc19fICovXHJcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX2FtZF9vcHRpb25zX187XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgY2hlcmlzaCBvbiAyMDE3LzEyLzE0LlxyXG4gKi9cclxuaW1wb3J0IGlwdHYgZnJvbSAnbW9yZ2FuLWlwdHYtY29yZSdcclxuXHJcblxyXG4oZnVuY3Rpb24gKHdpbmRvdywgaXB0dikge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog55So5LqO5L+d5a2Y5omA5pyJ5Yy65Z+f55qE6ZSu5YC8XHJcbiAgICAgKi9cclxuICAgIHZhciBrZXlMaXN0ID0gaXB0di5rZXlMaXN0ID0gW10sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog54Sm54K55pa55ZCR5rGgXHJcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZvY3VzRGlyZXMgPSBpcHR2LmZvY3VzRGlyZXMgPSBbXSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDnhKbngrnmsaBcclxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZm9jdXNDb2xsZWN0aW9uID0gaXB0di5mb2N1c0NvbGxlY3Rpb24gPSBbXSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDpgaXmjqflmajmiYDmnInmjInplK5cclxuICAgICAgICAgKi9cclxuICAgICAgICBrZXlzID0gaXB0di5rZXlzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhpc18gPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzXy5VUCA9IFwiVVBcIjtcclxuICAgICAgICAgICAgdGhpc18uRE9XTiA9IFwiRE9XTlwiO1xyXG4gICAgICAgICAgICB0aGlzXy5MRUZUID0gXCJMRUZUXCI7XHJcbiAgICAgICAgICAgIHRoaXNfLlJJR0hUID0gXCJSSUdIVFwiO1xyXG4gICAgICAgICAgICB0aGlzXy5PSyA9IFwiT0tcIjtcclxuICAgICAgICAgICAgdGhpc18uQkFDSyA9IFwiQkFDS1wiO1xyXG4gICAgICAgICAgICB0aGlzXy5aRVJPID0gXCJaRVJPXCI7XHJcbiAgICAgICAgICAgIHRoaXNfLk9ORSA9IFwiT05FXCI7XHJcbiAgICAgICAgICAgIHRoaXNfLlRXTyA9IFwiVFdPXCI7XHJcbiAgICAgICAgICAgIHRoaXNfLlRIUkVFID0gXCJUSFJFRVwiO1xyXG4gICAgICAgICAgICB0aGlzXy5GT1VSID0gXCJGT1VSXCI7XHJcbiAgICAgICAgICAgIHRoaXNfLkZJVkUgPSBcIkZJVkVcIjtcclxuICAgICAgICAgICAgdGhpc18uU0lYID0gXCJTSVhcIjtcclxuICAgICAgICAgICAgdGhpc18uU0VWRU4gPSBcIlNFVkVOXCI7XHJcbiAgICAgICAgICAgIHRoaXNfLkVJR0hUID0gXCJFSUdIVFwiO1xyXG4gICAgICAgICAgICB0aGlzXy5OSU5FID0gXCJOSU5FXCI7XHJcbiAgICAgICAgICAgIHRoaXNfLk9VVF9QQUdFID0gXCJPVVRfUEFHRVwiO1xyXG4gICAgICAgICAgICB0aGlzXy5IT01FX1BBR0UgPSBcIkhPTUVfUEFHRVwiO1xyXG4gICAgICAgICAgICB0aGlzXy5TVE9QID0gXCJTVE9QXCI7XHJcbiAgICAgICAgICAgIHRoaXNfLk1FTlUgPSBcIk1FTlVcIjtcclxuICAgICAgICAgICAgdGhpc18uREVMID0gXCJERUxcIjtcclxuICAgICAgICAgICAgdGhpc18uUEFHRURPV04gPSBcIlBBR0VET1dOXCI7XHJcbiAgICAgICAgICAgIHRoaXNfLlBBR0VVUCA9IFwiUEFHRVVQXCI7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAga2V5ID0gaXB0di5rZXkgPSB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDmmK/lkKbnpoHnlKjmlrnlkJHmjInplK7vvIzpu5jorqTkuI3npoHnlKhcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGRpc3BsYXlEaXJlOiBmYWxzZSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOS4iuS4gOS4queEpueCueaMiemUruaWueWQkVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgbGFzdERpcmU6ICcnLFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5re75Yqg5Yy65Z+f6ZSu5YC85a+56LGhXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSBhcmVhTmFtZSAg5Yy65Z+f5ZCN56ewXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSBrZXlPYmogICAg6ZSu5YC85a+56LGhXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBhZGRLZXk6IGZ1bmN0aW9uIChhcmVhTmFtZSwga2V5T2JqKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaWkgPSAwO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBrZXlPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICArK2lpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAga2V5T2JqLmxlbmd0aCA9IGlpICsgMTAwMDA7XHJcbiAgICAgICAgICAgICAgICBpcHR2LmtleUxpc3RbYXJlYU5hbWUgKyBcIlwiXSA9IGtleU9iajtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOagueaNrmtleeWAvO+8jOiOt+WPlmtleeWAvOWvueS6jueahOWQjeensFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ga2V5Q29kZSAgIGtleeWAvFxyXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGdldEtleUNvZGVOYW1lOiBmdW5jdGlvbiAoa2V5Q29kZSkge1xyXG4gICAgICAgICAgICAgICAgLy/lvqrnjq/ljLrln59cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gaXB0di5rZXlMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNpaSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lvqrnjq/ljLrln5/lr7nlupTnmoTplK7lgLzlr7nosaFcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrbiBpbiBpcHR2LmtleUxpc3RbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKytzaWk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpcHR2LmtleUxpc3RbaV1ba25dID09IGtleUNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+S4i+mdoueahOWBmuazleaYr+WFvOWuueWIm+e7tOeahOebkuWtkO+8jOWboOS4uuS7luS7rOS4jeaUr+aMgeWPjOmHjeW+queOr++8jOmcgOimgeaJi+WKqGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2lpID49IChpcHR2LmtleUxpc3RbaV0ubGVuZ3RoIC0gMTAwMDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmVyc2lvbiA9IGlwdHYuU1RCVHlwZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/kuLrkuoblhbzlrrnliJvnu7Tnm5LlrZDvvIzliJvnu7Tnm5LlrZDmnInnmoTpnIDopoHmiYvliqhicmVha+aJjeiDvei3s+WHuuWGhemDqOW+queOr++8jOacieeahOWIm+e7tOebkuWtkOWPjeiAjOaJi+WKqGJyZWFr5LqG77yM5bCx5LiN6IO96Lez5Ye65b6q546v5LqG77yM5aaI55qE5Z2R6LSnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmVyc2lvbiAhPSBcIkUxMTAwXCIgJiYgdmVyc2lvbiAhPSBcIklUVjIxOC4xXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDmoLnmja7lrZfnrKbljLnphY3lr7nlupTmlbDmja5cclxuICAgICAgICAgICAgICogQHBhcmFtIG51bV9cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIG51bUNoYW5nZTogZnVuY3Rpb24gKG51bV8pIHtcclxuICAgICAgICAgICAgICAgIHZhciBudW0gPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChudW1fKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIk9ORVwiIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlRXT1wiIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlRIUkVFXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW0gPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiRk9VUlwiIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtID0gNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkZJVkVcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bSA9IDU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJTSVhcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bSA9IDY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJTRVZFTlwiIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtID0gNztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkVJR0hUXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW0gPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiTklORVwiIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtID0gOTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlpFUk9cIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJERUxcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bSA9IFwiREVMXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW0gPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpcHR2LmlzRnVuY3Rpb24oaXB0di5rZXkubnVtRXZlbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXB0di5rZXkubnVtRXZlbnQobnVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOaWueWQkeWFt+S9k+WkhOeQhue7huiKglxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gZGlyZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZGlyZUhhbmRsZTogZnVuY3Rpb24gKGRpcmUpIHtcclxuICAgICAgICAgICAgICAgIGtleS5sYXN0RGlyZSA9IGRpcmU7XHJcbiAgICAgICAgICAgICAgICB2YXIgZkRpcmVzID0gZm9jdXNEaXJlc1trZXkuY3VyRm9jdXMuaWRdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZEaXJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOeUseS6juW9k+WJjeaWueazleaYr+eUqOadpeW+gOWPs+enu+WKqOeahO+8jOWPqumcgOWIpOaWreaYr+WQpuacieWPs+aWueeahGZvY3VzSURcclxuICAgICAgICAgICAgICAgICAgICAvLyDlvZPliY3nhKbngrnvvIzlvoDmn5DmlrnlkJHmjInplK7ml7blhbfmnInkvJjlhYjmiafooYzvvIzlpoLmnpzmjIflrprkuobmlrnlkJHkuovku7bvvIzlsLHkuI3kvJrliIfmjaLlvZPliY3nhKbngrnvvIzogIzljrvmiafooYzkuovku7ZcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZkRpcmVzW2RpcmUgKyBcIkV2ZW50XCJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleS5leGVDb2RlKGZEaXJlc1tkaXJlICsgXCJFdmVudFwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZEaXJlc1tkaXJlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlpoLmnpzlvoDkuIvnp7vliqjooqvotYvlgLzkuoZkaXNhYmxl6K+05piO5ZWl6YO95LiN5pON5L2cXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmRGlyZXNbZGlyZV0gPT0gXCJkaXNhYmxlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleS5sYXN0RGlyZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6YCa6L+HZm9jdXNJROaJvuWIsOeEpueCueWvueixoVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dE5vZGUgPSBpcHR2KFwiI1wiICsgZkRpcmVzW2RpcmVdKS5nZXRGb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dE5vZGUgJiYgbmV4dE5vZGUuZW5Gb2N1cyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXkuY2hhbmdlRm9jdXMoZkRpcmVzW2RpcmVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5Y6f5pys6K6+572u55qE5oyJ6ZKu6KKr56aB55So5LqG77yM5YCY6Iul6K6+572u5LqGZG93bk90aGVy5YC877yM5bCx6K6p5q2k5oyJ6ZKu6I635b6X54Sm54K5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dE5vZGUgJiYgbmV4dE5vZGUuZW5Gb2N1cyA9PSBmYWxzZSAmJiBmRGlyZXNbZGlyZSArIFwiT3RoZXJFdmVudFwiXSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleS5leGVDb2RlKGZEaXJlc1tkaXJlICsgXCJPdGhlckV2ZW50XCJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuZXh0Tm9kZSAmJiBuZXh0Tm9kZS5lbkZvY3VzID09IGZhbHNlICYmIGZEaXJlc1tkaXJlICsgXCJPdGhlclwiXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6YCa6L+HZm9jdXNJROaJvuWIsOeEpueCueWvueixoVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG90aGVyTm9kZSA9IGlwdHYoXCIjXCIgKyBmRGlyZXNbZGlyZSArIFwiT3RoZXJcIl0pLmdldEZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJOb2RlICYmIG90aGVyTm9kZS5lbkZvY3VzID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXkuY2hhbmdlRm9jdXMoZkRpcmVzW2RpcmUgKyBcIk90aGVyXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIW5leHROb2RlICYmIGZEaXJlc1tkaXJlICsgXCJOb0V2ZW50XCJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WmguaenOWPs+i+ueWItuWumuS6hmxlZnTnhKbngrnvvIzkvYbmmK/ov5nkuKpsZWZ054Sm54K55LiN5Zyo54Sm54K55rGg5Lit77yM5Y+v5Lul6Ieq5a6a5LmJ5LqL5Lu2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXkuZXhlQ29kZShmRGlyZXNbZGlyZSArIFwiTm9FdmVudFwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIW5leHROb2RlICYmIGZEaXJlc1tkaXJlICsgXCJOb1wiXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6YCa6L+HZm9jdXNJROaJvuWIsOeEpueCueWvueixoVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG90aGVyTm9kZSA9IGlwdHYoXCIjXCIgKyBmRGlyZXNbZGlyZSArIFwiTm9cIl0pLmdldEZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJOb2RlICYmIG90aGVyTm9kZS5lbkZvY3VzID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXkuY2hhbmdlRm9jdXMoZkRpcmVzW2RpcmUgKyBcIk5vXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZEaXJlcy5vdGhlckV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleS5leGVDb2RlKGZEaXJlcy5vdGhlckV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZkRpcmVzLm90aGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmRGlyZXMub3RoZXIgPT0gXCJkaXNhYmxlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleS5sYXN0RGlyZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6YCa6L+HZm9jdXNJROaJvuWIsOeEpueCueWvueixoVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dE5vZGUgPSBpcHR2KFwiI1wiICsgZkRpcmVzLm90aGVyKS5nZXRGb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dE5vZGUgJiYgbmV4dE5vZGUuZW5Gb2N1cyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXkuY2hhbmdlRm9jdXMoZkRpcmVzLm90aGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGtleS5sYXN0RGlyZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDkuIrkuIvlt6blj7PmjqfliLblhbfkvZPmlrnlkJHlpITnkIblh73mlbBcclxuICAgICAgICAgICAgICogQHBhcmFtIGRpcmVUeXBlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBmb2N1c0hhbmQ6IGZ1bmN0aW9uIChkaXJlVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleS5kaXNwbGF5RGlyZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZGlyZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlVQXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiRE9XTlwiIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkxFRlRcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJSSUdIVFwiIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleS5kaXJlSGFuZGxlKGRpcmVUeXBlLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0IDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDliIfmjaLnhKbngrnmlrnms5VcclxuICAgICAgICAgICAgICogQHBhcmFtIGZvY3VzSWRfXHJcbiAgICAgICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgY2hhbmdlRm9jdXM6IGZ1bmN0aW9uIChmb2N1c0lkXykge1xyXG4gICAgICAgICAgICAgICAgLy8g6YCa6L+HZm9jdXNJROaJvuWIsOeEpueCueWvueixoVxyXG4gICAgICAgICAgICAgICAgdmFyIG5leHROb2RlID0gaXB0dihcIiNcIiArIGZvY3VzSWRfKS5nZXRGb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5leHROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9sZEZvY3VzID0ga2V5LmN1ckZvY3VzO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5Zyo6K6p6ICB54Sm54K55aSx5Y6754Sm54K55LmL5YmN77yM5ZGK6K+J6ICB54Sm54K55LiL5LiA5Liq5b2T5YmN54Sm54K555qEaWRcclxuICAgICAgICAgICAgICAgICAgICBvbGRGb2N1cy5uZXh0Rm9jdXNJZCA9IGZvY3VzSWRfO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWIh+aNouaWsOeEpueCueS5i+WJje+8jOmcgOimgeaJp+ihjOWkseWOu+eEpueCueS6i+S7tlxyXG4gICAgICAgICAgICAgICAgICAgIG9sZEZvY3VzLm9uQmx1cigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWQgPSBvbGRGb2N1cy5pZDtcclxuICAgICAgICAgICAgICAgICAgICAvLyDnu5nlvZPliY3nhKbngrnph43mlrDotYvlgLxcclxuICAgICAgICAgICAgICAgICAgICBrZXkuY3VyRm9jdXMgPSBuZXh0Tm9kZTtcclxuICAgICAgICAgICAgICAgICAgICAvL+WcqOiuqeaWsOeEpueCueiOt+WPlueEpueCueS5i+WJje+8jOWRiuivieaWsOeEpueCueS4iuS4gOS4queEpueCueeahGlkXHJcbiAgICAgICAgICAgICAgICAgICAga2V5LmN1ckZvY3VzLmxhc3RGb2N1c0lkID0gZmlkO1xyXG4gICAgICAgICAgICAgICAgICAgIGtleS5jdXJGb2N1cy5vbkZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHROb2RlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDot7Povazpk77mjqVcclxuICAgICAgICAgICAgICogQHBhcmFtIHVybFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcmVkaXJlY3Q6IGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1cmwgJiYgaXB0di50cmltKHVybCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDlpoLmnpznpoHnlKjkuobmjInplK7vvIzlsLHkuI3miafooYxcclxuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5LmN1ckZvY3VzLmVuYWJsZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOaJp+ihjOS6humhtemdoui3s+i9rO+8jOWwseemgeatouWGjeasoeeCueWHu+i3s+i9rFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXkuY3VyRm9jdXMuZW5hYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOaJp+ihjEphdmFTY3JpcHTku6PnoIFcclxuICAgICAgICAgICAgICogQHBhcmFtIF9jb2RlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBleGVDb2RlOiBmdW5jdGlvbiAoX2NvZGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2RlID0gX2NvZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlwdHYudHlwZShfY29kZSkgPT09IFwic3RyaW5nXCIgJiYgaXB0di50cmltKF9jb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUuaW5kZXhPZihcImphdmFzY3JpcHQ6XCIpID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKFwiamF2YXNjcmlwdDpcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZhbChjb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29kZS5pbmRleE9mKFwiaHR0cDovL1wiKSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5LnJlZGlyZWN0KGNvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlwdHYudHlwZShfY29kZSkgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvZGUuY2FsbChrZXkuY3VyRm9jdXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXB0di5lcnJvcihlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgO1xyXG5cclxuICAgIC8v5re75Yqg5bi455So6ZSu5YC85a+56LGhXHJcbiAgICBrZXkuYWRkS2V5KFwiSEhcIiwge1xyXG4gICAgICAgIFVQOiAzOCxcclxuICAgICAgICBET1dOOiA0MCxcclxuICAgICAgICBMRUZUOiAzNyxcclxuICAgICAgICBSSUdIVDogMzksXHJcbiAgICAgICAgT0s6IDEzLFxyXG4gICAgICAgIEJBQ0s6IDgsXHJcbiAgICAgICAgWkVSTzogNDgsXHJcbiAgICAgICAgT05FOiA0OSxcclxuICAgICAgICBUV086IDUwLFxyXG4gICAgICAgIFRIUkVFOiA1MSxcclxuICAgICAgICBGT1VSOiA1MixcclxuICAgICAgICBGSVZFOiA1MyxcclxuICAgICAgICBTSVg6IDU0LFxyXG4gICAgICAgIFNFVkVOOiA1NSxcclxuICAgICAgICBFSUdIVDogNTYsXHJcbiAgICAgICAgTklORTogNTcsXHJcbiAgICAgICAgREVMOiA0NixcclxuICAgICAgICBQQUdFRE9XTjogMzQsXHJcbiAgICAgICAgUEFHRVVQOiAzM1xyXG4gICAgfSk7XHJcbiAgICAvL+a3u+WKoOWNjuS4uuacuumhtuebklxyXG4gICAga2V5LmFkZEtleShcIkhXXCIsIHtcclxuICAgICAgICBVUDogMzgsXHJcbiAgICAgICAgRE9XTjogNDAsXHJcbiAgICAgICAgTEVGVDogMzcsXHJcbiAgICAgICAgUklHSFQ6IDM5LFxyXG4gICAgICAgIE9LOiAxMyxcclxuICAgICAgICBCQUNLOiA4LFxyXG4gICAgICAgIFpFUk86IDQ4LFxyXG4gICAgICAgIE9ORTogNDksXHJcbiAgICAgICAgVFdPOiA1MCxcclxuICAgICAgICBUSFJFRTogNTEsXHJcbiAgICAgICAgRk9VUjogNTIsXHJcbiAgICAgICAgRklWRTogNTMsXHJcbiAgICAgICAgU0lYOiA1NCxcclxuICAgICAgICBTRVZFTjogNTUsXHJcbiAgICAgICAgRUlHSFQ6IDU2LFxyXG4gICAgICAgIE5JTkU6IDU3LFxyXG4gICAgICAgIERFTDogMTEzMSxcclxuICAgICAgICBQQUdFRE9XTjogMzQsXHJcbiAgICAgICAgUEFHRVVQOiAzM1xyXG4gICAgfSk7XHJcbiAgICAvL+a3u+WKoOWNl+S6rOW5v+eUteacuumhtuebklxyXG4gICAga2V5LmFkZEtleShcIk5KR0RcIiwge0JBQ0s6IDY0MCwgSE9NRV9QQUdFOiAxMTMsIE9VVF9QQUdFOiAxMTQsIERFTDogMTI3fSk7XHJcbiAgICAvL+a3u+WKoOWMl+S6rOatjOWNjuacuumhtuebklxyXG4gICAga2V5LmFkZEtleShcIkJKR0hcIiwge1xyXG4gICAgICAgIFVQOiAxLFxyXG4gICAgICAgIERPV046IDIsXHJcbiAgICAgICAgTEVGVDogMyxcclxuICAgICAgICBSSUdIVDogNCxcclxuICAgICAgICBPSzogMTMsXHJcbiAgICAgICAgQkFDSzogMzQwLFxyXG4gICAgICAgIFpFUk86IDQ4LFxyXG4gICAgICAgIE9ORTogNDksXHJcbiAgICAgICAgVFdPOiA1MCxcclxuICAgICAgICBUSFJFRTogNTEsXHJcbiAgICAgICAgRk9VUjogNTIsXHJcbiAgICAgICAgRklWRTogNTMsXHJcbiAgICAgICAgU0lYOiA1NCxcclxuICAgICAgICBTRVZFTjogNTUsXHJcbiAgICAgICAgRUlHSFQ6IDU2LFxyXG4gICAgICAgIE5JTkU6IDU3LFxyXG4gICAgICAgIE9VVF9QQUdFOiAzMzksXHJcbiAgICAgICAgSE9NRV9QQUdFOiA1MTIsXHJcbiAgICAgICAgU1RPUDogMTAyNSxcclxuICAgICAgICBNRU5VOiA1MTNcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeEpueCueaehOmAoOWHveaVsFxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGlwdHYuRm9jdXNNb2RlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdGhpc18gPSB0aGlzO1xyXG4gICAgICAgIC8vIOeEpueCueaPj+i/sOWQjeensFxyXG4gICAgICAgIHRoaXNfLm5hbWUgPSAnJztcclxuICAgICAgICAvLyDmmK/lkKblvIDlkK/mjIlva+mUrlxyXG4gICAgICAgIHRoaXNfLmVuYWJsZSA9IHRydWU7XHJcbiAgICAgICAgLy8g5piv5ZCm5YWB6K645q2k54Sm54K55a+56LGh6I635b6X54Sm54K5XHJcbiAgICAgICAgdGhpc18uZW5Gb2N1cyA9IHRydWU7XHJcbiAgICAgICAgLy/or6XmjInpkq7mmK/lkKbooqvlvZPliY3pobXpnaLnlJ/miJDvvIzpu5jorqTmnKrnlJ/miJDvvIzkvZznlKjpmLLmraLlvIDlj5HogIXnm7TmjqVuZXcgRm9jdXNNb2RlbCgpXHJcbiAgICAgICAgdGhpc18uaXNDcmVhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgLy8g54Sm54K557yW5Y+377yM5Yik5pat5piv5ZCm5ZCM5LiA5Liq54Sm54K5LOmdnuepulxyXG4gICAgICAgIHRoaXNfLmlkID0gXCJcIjtcclxuICAgICAgICAvLyDlsIboh6rlt7HnmoTlr7nosaHotYvnu5nmraTlsZ7mgKdcclxuICAgICAgICB0aGlzXy5vd24gPSB0aGlzXztcclxuICAgICAgICAvL+WdkOagh1xyXG4gICAgICAgIHRoaXNfLlhfUG9zaSA9IDA7XHJcbiAgICAgICAgdGhpc18uWV9Qb3NpID0gMDtcclxuICAgICAgICB0aGlzXy5mb2N1c1R5cGUgPSA3O1xyXG4gICAgICAgIC8v5oyH5ZCR55qE5Zu+54mH55qEaWRcclxuICAgICAgICB0aGlzXy5pbWdJRCA9IFwiXCI7XHJcbiAgICAgICAgLy8g5Zu+54mH5YiH5o2i5L2/55So77yM5paw5Zu+54mH5Zyw5Z2AXHJcbiAgICAgICAgdGhpc18ubmV3U3dhcCA9IFwiXCI7XHJcbiAgICAgICAgLy8g5Y6f5aeL5Zu+54mHXHJcbiAgICAgICAgdGhpc18ub2xkU3dhcCA9IFwiXCI7XHJcbiAgICAgICAgLy8g5b2T5YmN54Sm54K55LiK5LiL5bem5Y+z77yM5Zub5Liq5pa55ZCR5bqU6K+l6LWw55qEZm9jdXNJROaVsOe7hFxyXG4gICAgICAgIHRoaXNfLmRpZUFyciA9IG51bGw7XHJcbiAgICAgICAgLy8g5a+55bqU55qERE9N5a+56LGhXHJcbiAgICAgICAgdGhpc18ubm9kZU9iaiA9IG51bGw7XHJcbiAgICAgICAgLy8g5Li05pe25pWw5o2u5YKo5a2YXHJcbiAgICAgICAgdGhpc18udGVtcERhdGEgPSBudWxsO1xyXG4gICAgICAgIC8vIOWcqOm7mOiupOiOt+W+l+eEpueCueS6i+S7tuS4iua3u+WKoOWFtuS7luaJp+ihjOS6i+S7tlxyXG4gICAgICAgIHRoaXNfLm9uRm9jdXNFdmVudCA9IFwiXCI7XHJcbiAgICAgICAgLy8g5Zyo6buY6K6k5aSx5Y6754Sm54K55LqL5Lu25LiK5re75Yqg6aKd5aSW55qE5omn6KGM5LqL5Lu2XHJcbiAgICAgICAgdGhpc18ub25CbHVyRXZlbnQgPSBcIlwiO1xyXG4gICAgICAgIC8vIOaMieehruWumueahOi3s+i9rOWcsOWdgFxyXG4gICAgICAgIHRoaXNfLmNsaWNrRXZlbnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXNfLmludGVydmFsID0gbnVsbDtcclxuICAgICAgICAvL+eEpueCueiOt+WPlueEpueCueaXtu+8jOWbvuagh+WPmOWkp+eahOWkp+Wwj++8jOm7mOiupDIwXHJcbiAgICAgICAgdGhpc18uY2hhbmdlU2l6ZSA9IDEwO1xyXG4gICAgICAgIC8v56e75Yqo6YCJ5Lit5qGG77yM5q2k6YCJ5Lit5qGG5piv55So5oi36Ieq5bex5ZyoaHRtbOS4reWGmeWHuu+8jOW5tuaMh+WummlkLOWvueW6lOaViOaenOefpeivhuenu+WKqOmAieS4reahhuS9jee9ru+8jOS4jeWtmOWcqOWKqOeUu++8jOWvueW6lGZvY3VzVHlwZeS4ujEwXHJcbiAgICAgICAgdGhpc18uc2VsZWN0Qm9yZGVySWQgPSAnJztcclxuICAgICAgICAvL+enu+WKqOmAieS4reahhmlkLOatpOmAieS4reahhuaYr+S7o+eggeiHquWKqOeUn+aIkOeahOWFg+e0oO+8jOWvueW6lOaViOaenOmAieS4reahhuaUvuWkp+S4juW5s+enu+WKqOeUu++8jOWvueW6lGZvY3VzVHlwZeS4ujE15oiWMTZcclxuICAgICAgICB0aGlzXy5zZWxlY3Rpb25JRCA9IFwic2VsZWN0aW9uSURcIjtcclxuICAgICAgICAvL+enu+WKqOmAieS4reahhmlk77yM5q2k6YCJ5Lit5qGG5piv55So5oi36Ieq5bex6KaB5ZyoaHRtbOS4reaMh+WumuWFg+e0oOeahGlk77yM5a+55bqU5pWI5p6c5piv5bmz56e76YCJ5Lit5qGG77yM5LiN5a2Y5Zyo5pS+5aSn5Yqo55S777yM5LiOc2VsZWN0Qm9yZGVySWTnmoTljLrliKvlsLHmmK/lroPmmK/mjqfliLbkvY3nva7msqHmnInliqjnlLvvvIxzZWxlY3Rpb25PYmpJZOaYr+aOp+WItuS9jee9ruacieWKqOeUu++8jOWvueW6lGZvY3VzVHlwZUlk5Li6MTdcclxuICAgICAgICB0aGlzXy5zZWxlY3Rpb25PYmpJRCA9IFwic2VsZWN0aW9uT2JqSURcIjtcclxuICAgICAgICAvL+WvueW6lOWxleekuuWbvueJh+eahOWxguasoeWkp+Wwj1xyXG4gICAgICAgIHRoaXNfLmZvY3VzSW1nWkluZGV4ID0gOTk4O1xyXG4gICAgICAgIC8v5a+55bqU5bGV56S65Zu+54mH55qE54i257qn5YWD57Sg55qE5bGC5qyh5aSn5bCPXHJcbiAgICAgICAgdGhpc18uZm9jdXNJbWdQYXJlbnRaSW5kZXggPSA5OTg7XHJcbiAgICAgICAgLy/lr7nlupTnhKbngrnlhoXpg6jlm77niYfnmoTlsYLmrKHlpKflsI9cclxuICAgICAgICB0aGlzXy5pbWdaSW5kZXggPSA5OTk7XHJcbiAgICAgICAgLy/lr7nlupTnhKbngrnlhoXpg6jlm77niYfnmoTniLbnuqflhYPntKDnmoTlsYLmrKHlpKflsI9cclxuICAgICAgICB0aGlzXy5pbWdQYXJlbnRaSW5kZXggPSA5OTk7XHJcbiAgICAgICAgLy/nhKbngrnnmoTniLboioLngrnnmoRJROWAvFxyXG4gICAgICAgIHRoaXNfLnVwUGFyZW50SWQgPSAnJztcclxuICAgICAgICAvL+eUqOS6juaOp+WItuWPr+ingueci+WMuuWfn+eahOiKgueCuUlE5YC8XHJcbiAgICAgICAgdGhpc18udXBBcmVhSWQgPSAnJztcclxuICAgICAgICB0aGlzXy5yaWdodEFyZWFJZCA9ICcnO1xyXG4gICAgICAgIHRoaXNfLnJpZ2h0UGFyZW50SWQgPSAnJztcclxuICAgICAgICAvL+aYr+WQpuW8gOWQr+eItuWuueWZqOa7muWKqO+8jOm7mOiupOS4umZhbHNl77yM5LiN5rua5YqoXHJcbiAgICAgICAgdGhpc18uZW5VcFBhcmVudFJvbGwgPSBmYWxzZTtcclxuICAgICAgICB0aGlzXy5lblJpZ2h0UGFyZW50Um9sbCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvL+W8gOWQr+aVtOmhtea7muWKqFxyXG4gICAgICAgIHRoaXNfLmVuUmlnaHRQYWdlUm9sbCA9IGZhbHNlO1xyXG4gICAgICAgIC8v5b2T5YmN54Sm54K557Si5byVXHJcbiAgICAgICAgdGhpc18uZm9jdXNJbmRleCA9IDA7XHJcbiAgICAgICAgLy/lvZPliY3nhKbngrnlr7nlupTnmoTlvZPliY3pobVcclxuICAgICAgICB0aGlzXy5mb2N1c0N1clBhZ2VOdW0gPSAwO1xyXG4gICAgICAgIC8v5b2T5YmN54Sm54K55a+55bqU55qE5oC76aG15pWwXHJcbiAgICAgICAgdGhpc18uZm9jdXNBbGxQYWdlTnVtID0gMDtcclxuICAgICAgICAvL+W9k+WJjeeEpueCuemcgOimgeaVtOmhtea7muWKqOeahGxlZnTlgLxcclxuICAgICAgICB0aGlzXy5mb2N1c0xlZnRSb2xsID0gMDtcclxuICAgICAgICAvL+W9k+WJjeeEpueCueWIl+ihqOS4reesrOS4gOS4queEpueCueeahGxlZnTlgLxcclxuICAgICAgICB0aGlzXy5mb2N1c0ZpcnN0TGVmdCA9IDA7XHJcbiAgICAgICAgLy/lvZPliY3nhKbngrnlr7nlupTpobXnoIHnmoTmiYDmnInnhKbngrlpZCzor6XlgLzkuLrmlbDnu4Tlr7nosaFcclxuICAgICAgICB0aGlzXy5mb2N1c1BhZ2VBbGxNb2RlbCA9IG51bGw7XHJcbiAgICAgICAgLy/lvZPliY3nhKbngrnlr7nlupTpobXnoIHnmoTmiYDmnInnhKbngrnlm77niYfmmK/lkKblt7Lnu4/liqDovb3ov4dcclxuICAgICAgICB0aGlzXy5mb2N1c1BhZ2VBbGxMb2FkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpc18ubGFzdEZvY3VzSWQgPSAnJztcclxuXHJcblxyXG4gICAgICAgIHRoaXNfLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGtleS5jdXJGb2N1cyA9IHRoaXNfLm93bjtcclxuICAgICAgICAgICAgLy/lpITnkIbniLblrrnlmajmu5rliqhcclxuICAgICAgICAgICAgaWYgKHRoaXNfLmVuVXBQYXJlbnRSb2xsIHx8IHRoaXNfLmVuUmlnaHRQYXJlbnRSb2xsKSB7XHJcbiAgICAgICAgICAgICAgICAvL+iOt+WPlueItuWuueWZqElEXHJcbiAgICAgICAgICAgICAgICB2YXIgdXBQYXJlbnRJZCA9IHRoaXNfLnVwUGFyZW50SWQ7XHJcbiAgICAgICAgICAgICAgICAvL+aOp+WItuWPr+ingueci+WMuuWfn+WuueWZqOeahElEXHJcbiAgICAgICAgICAgICAgICB2YXIgdXBBcmVhSWQgPSB0aGlzXy51cEFyZWFJZDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHRQYXJlbnRJZCA9IHRoaXNfLnJpZ2h0UGFyZW50SWQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHRBcmVhSWQgPSB0aGlzXy5yaWdodEFyZWFJZDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdXBQYXJlbnRPYmogPSBpcHR2LiQodXBQYXJlbnRJZCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdXBBcmVhT2JqID0gaXB0di4kKHVwQXJlYUlkKTtcclxuICAgICAgICAgICAgICAgIHZhciByaWdodFBhcmVudE9iaiA9IGlwdHYuJChyaWdodFBhcmVudElkKTtcclxuICAgICAgICAgICAgICAgIHZhciByaWdodEFyZWFPYmogPSBpcHR2LiQocmlnaHRBcmVhSWQpO1xyXG4gICAgICAgICAgICAgICAgLy/lpoLmnpzmmK/mjInkuIrmiJbmjInkuIvvvIzlj6rkvJrnlKjliLByaWdodFBhcmVudElk5ZKMcmlnaHRBcmVhSWRcclxuICAgICAgICAgICAgICAgIGlmIChrZXkubGFzdERpcmUgPT0gJ2Rvd24nICYmIHRoaXNfLmVuVXBQYXJlbnRSb2xsID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+mhtemdouiiq+a7muWOu+eahOmrmOW6plxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHZhciBwYXJSb2xsSGVpZ2h0ID0gYXJlYU9iai5zY3JvbGxUb3AgfHwgcGFyc2VJbnQocGFyZW50T2JqLnN0eWxlLnRvcCkgfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyUm9sbEhlaWdodCA9IE1hdGguYWJzKHBhcnNlSW50KHVwUGFyZW50T2JqLnN0eWxlLnRvcCkpIHx8IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lj6/op4LnnIvljLrln5/lrrnlmajlrp7pmYXlj6/lrZjmlL7lhoXlrrnnmoTpq5jluqZcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFySGVpZ2h0ID0gdXBBcmVhT2JqLmNsaWVudEhlaWdodCB8fCBwYXJzZUludCh1cEFyZWFPYmouc3R5bGUuaGVpZ2h0KSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v54Sm54K555qEdG9w5YC8XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvY3VzVG9wID0gcGFyc2VJbnQodGhpc18uWV9Qb3NpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+WmguaenOayoeacieaJi+WKqOi1i+WAvO+8jOmCo+S5iOWwseiOt+WPlnRvcOWAvFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpcHR2LmlzTnVsbChmb2N1c1RvcCkgfHwgZm9jdXNUb3AgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c1RvcCA9IHRoaXNfLm5vZGVPYmogPyBNYXRoLmFicyhwYXJzZUludCh0aGlzXy5ub2RlT2JqLnN0eWxlLnRvcCkpIDogMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy/nhKbngrnlrp7pmYXljaDkvY3pq5jluqZcclxuICAgICAgICAgICAgICAgICAgICAvL3ZhciBmb2N1c0hlaWdodCA9IHRoaXNfLm5vZGVPYmogPyB0aGlzXy5ub2RlT2JqLm9mZnNldEhlaWdodCA6IHBhcnNlSW50KHRoaXNfLm5vZGVPYmouc3R5bGUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9jdXNIZWlnaHQgPSB0aGlzXy5ub2RlT2JqID8gcGFyc2VJbnQodGhpc18ubm9kZU9iai5zdHlsZS5oZWlnaHQpIDogMDtcclxuICAgICAgICAgICAgICAgICAgICAvL+iiq+a7muWOu+eahOmrmOW6pivniLblrrnlmajlrp7pmYXlj6/lrZjmlL7lhoXlrrnnmoTpq5jluqZcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyQSA9IHBhclJvbGxIZWlnaHQgKyBwYXJIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/nhKbngrnnmoRUT1DlgLwr54Sm54K55a6e6ZmF5Y2g5L2N55qE6auY5bqmXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvY0IgPSBmb2N1c1RvcCArIGZvY3VzSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5ZCO6ICF5aSn5LqO5YmN6ICF77yM6YKj5LmI6K+05piO5b2T5YmN54Sm54K55Zyo5Y+v6KeC5a+f5Yy65Z+f55qE5LiL6Z2i77yM5omA5Lul6L+Z5pe26ZyA6KaB6ICD6JmR54i25a655Zmo6ZyA6KaB5b6A5LiL5rua5aSa5bCR6Led56a777yM5omN6IO96K6p5b2T5YmN54Sm54K56KKr5pi+56S65Ye65p2lXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhckEgPCBmb2NCKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6I635Y+W5b2T5YmN54Sm54K56KKr6YGu5oyh55qE6auY5bqmK+W9k+WJjeeItuWuueWZqOW3sue7j+a7muWOu+eahOmrmOW6pu+8jOWwseiDveW+l+WIsOeOsOWcqOeItuWuueWZqOmcgOimgeaAu+eahOa7muWKqOmrmOW6plxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9sbEhlaWdodCA9IGZvY0IgLSBwYXJBICsgcGFyUm9sbEhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBQYXJlbnRPYmouc3R5bGUudG9wID0gXCItXCIgKyByb2xsSGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioq5bem5Y+z5LiK5LiL5rua5Yqo6ZyA6KaB57uf5LiA55uR5o6n77yM55So5LqO5Yqo5oCB5Yqg6L295Zu+54mH77yM55uu5YmN5pe26Ze06Zeu6aKY77yM5rKh5pyJ57un57ut5byA5Y+R77yM5q2k5aSE55WZ5YGa5ZCO5pyf5Y2H57qnKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGtleS5sYXN0RGlyZSA9PSAndXAnICYmIHRoaXNfLmVuVXBQYXJlbnRSb2xsID09IHRydWUgfHwga2V5Lmxhc3REaXJlID09ICdyaWdodCcgJiYgdGhpc18uZW5VcFBhcmVudFJvbGwgPT0gdHJ1ZSB8fCBrZXkubGFzdERpcmUgPT0gJ2Rvd24nICYmIHRoaXNfLmVuVXBQYXJlbnRSb2xsID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+mhtemdouiiq+a7muWOu+eahOmrmOW6plxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHZhciBwYXJSb2xsSGVpZ2h0ID0gYXJlYU9iai5zY3JvbGxUb3AgfHwgcGFyc2VJbnQocGFyZW50T2JqLnN0eWxlLnRvcCkgfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyUm9sbEhlaWdodCA9IE1hdGguYWJzKHBhcnNlSW50KHVwUGFyZW50T2JqLnN0eWxlLnRvcCkpIHx8IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/nhKbngrnnmoR0b3DlgLxcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9jdXNUb3AgPSBwYXJzZUludCh0aGlzXy5ZX1Bvc2kpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5rKh5pyJ5omL5Yqo6LWL5YC877yM6YKj5LmI5bCx6I635Y+WdG9w5YC8XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlwdHYuaXNOdWxsKGZvY3VzVG9wKSB8fCBmb2N1c1RvcCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzVG9wID0gdGhpc18ubm9kZU9iaiA/IE1hdGguYWJzKHBhcnNlSW50KHRoaXNfLm5vZGVPYmouc3R5bGUudG9wKSkgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+mhtemdouiiq+a7muWOu+eahOmrmOW6plxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJBID0gcGFyUm9sbEhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAvL+eEpueCueeahFRPUOWAvFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb2NCID0gZm9jdXNUb3A7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpznhKbngrnnmoRUT1DlgLzlsI/kuo7lvZPliY3ooqvmu5rljrvnmoTpq5jluqbvvIzpgqPkuYjor7TmmI7mraTml7bpnIDopoHlvoDkuIvmu5pcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyQSA+IGZvY0IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzpnIDopoHniLblrrnlmajlvoDkuIvmu5rvvIzpgqPkuYjmu5rljrvnmoTpq5jluqblsLHmmK/nhKbngrnnmoRUT1DlgLxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvbGxIZWlnaHQgPSBmb2NCO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cFBhcmVudE9iai5zdHlsZS50b3AgPSBcIi1cIiArIHJvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKirlt6blj7PkuIrkuIvmu5rliqjpnIDopoHnu5/kuIDnm5HmjqfvvIznlKjkuo7liqjmgIHliqDovb3lm77niYfvvIznm67liY3ml7bpl7Tpl67popjvvIzmsqHmnInnu6fnu63lvIDlj5HvvIzmraTlpITnlZnlgZrlkI7mnJ/ljYfnuqcqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXB0di5sYXN0RGlyZSA9PSAncmlnaHQnICYmIHRoaXNfLmVuUmlnaHRQYXJlbnRSb2xsID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+mhtemdouiiq+a7muWOu+eahOWuveW6plxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJSb2xsV2lkdGggPSBNYXRoLmFicyhwYXJzZUludChyaWdodFBhcmVudE9iai5zdHlsZS5sZWZ0KSkgfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICAvL+WPr+ingueci+WMuuWfn+WuueWZqOWunumZheWPr+WtmOaUvuWGheWuueeahOmrmOW6plxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJXaWR0aCA9IHJpZ2h0QXJlYU9iai5jbGllbnRXaWR0aCB8fCBwYXJzZUludChyaWdodEFyZWFPYmouc3R5bGUud2lkdGgpIHx8IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/nhKbngrnnmoRsZWZ05YC8XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvY3VzTGVmdCA9IHBhcnNlSW50KHRoaXNfLlhfUG9zaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzmsqHmnInmiYvliqjotYvlgLzvvIzpgqPkuYjlsLHojrflj5ZsZWZ05YC8XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlwdHYuaXNOdWxsKGZvY3VzTGVmdCkgfHwgZm9jdXNMZWZ0ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNMZWZ0ID0gdGhpc18ubm9kZU9iaiA/IE1hdGguYWJzKHBhcnNlSW50KHRoaXNfLm5vZGVPYmouc3R5bGUubGVmdCkpIDogMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy/nhKbngrnlrp7pmYXljaDkvY3lrr3luqZcclxuICAgICAgICAgICAgICAgICAgICAvLyB2YXIgZm9jdXNXaWR0aCA9IHRoaXNfLm5vZGVPYmogPyB0aGlzXy5ub2RlT2JqLm9mZnNldFdpZHRoIDogcGFyc2VJbnQodGhpc18ubm9kZU9iai5zdHlsZS53aWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvY3VzV2lkdGggPSB0aGlzXy5ub2RlT2JqID8gcGFyc2VJbnQodGhpc18ubm9kZU9iai5zdHlsZS53aWR0aCkgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6KKr5rua5Y6755qE5a695bqmK+eItuWuueWZqOWunumZheWPr+WtmOaUvuWGheWuueeahOWuveW6plxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJBID0gcGFyUm9sbFdpZHRoICsgcGFyV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8v6aG16Z2i6KKr5rua5Y6755qE5a695bqmXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhckIgPSBwYXJSb2xsV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/nhKbngrnnmoRMRUZU5YC8K+eEpueCueWunumZheWNoOS9jeeahOWuveW6plxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb2NCID0gZm9jdXNMZWZ0ICsgZm9jdXNXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAvL+WmguaenOWQjuiAheWkp+S6juWJjeiAhe+8jOmCo+S5iOivtOaYjuW9k+WJjeeEpueCueWcqOWPr+inguWvn+WMuuWfn+eahOWPs+i+ue+8jOaJgOS7pei/meaXtumcgOimgeiAg+iZkeeItuWuueWZqOmcgOimgeW+gOW3pua7muWkmuWwkei3neemu++8jOaJjeiDveiuqeW9k+WJjeeEpueCueiiq+aYvuekuuWHuuadpVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJBIDwgZm9jQikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+iOt+WPluW9k+WJjeeEpueCueiiq+mBruaMoeeahOWuveW6pivlvZPliY3niLblrrnlmajlt7Lnu4/mu5rljrvnmoTlrr3luqbvvIzlsLHog73lvpfliLDnjrDlnKjniLblrrnlmajpnIDopoHmgLvnmoTmu5rliqjlrr3luqZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvbGxXaWR0aCA9IGZvY0IgLSBwYXJBICsgcGFyUm9sbFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodFBhcmVudE9iai5zdHlsZS5sZWZ0ID0gXCItXCIgKyByb2xsV2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKirlt6blj7PkuIrkuIvmu5rliqjpnIDopoHnu5/kuIDnm5HmjqfvvIznlKjkuo7liqjmgIHliqDovb3lm77niYfvvIznm67liY3ml7bpl7Tpl67popjvvIzmsqHmnInnu6fnu63lvIDlj5HvvIzmraTlpITnlZnlgZrlkI7mnJ/ljYfnuqcqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyQiA+IGZvY0IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/ooqvmu5rljrvnmoTlrr3luqblpKfkuo7nhKbngrlsZWZ05YC8K+WNoOS9jeWuveW6pizor7TmmI7nhKbngrnlrozlhajooqvpga7nm5Ys6YKj5LmI54i25a655Zmo5omA6ZyA6KaB5ZCR5bem5rua5Yqo55qE5a695bqm5bCx562J5LqO5b2T5YmN54Sm54K555qEbGVmdOWAvFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9sbFdpZHRoID0gZm9jdXNMZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodFBhcmVudE9iai5zdHlsZS5sZWZ0ID0gXCItXCIgKyByb2xsV2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKirlt6blj7PkuIrkuIvmu5rliqjpnIDopoHnu5/kuIDnm5HmjqfvvIznlKjkuo7liqjmgIHliqDovb3lm77niYfvvIznm67liY3ml7bpl7Tpl67popjvvIzmsqHmnInnu6fnu63lvIDlj5HvvIzmraTlpITnlZnlgZrlkI7mnJ/ljYfnuqcqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXB0di5sYXN0RGlyZSA9PSAnbGVmdCcgJiYgdGhpc18uZW5SaWdodFBhcmVudFJvbGwgPT0gdHJ1ZSB8fCBpcHR2Lmxhc3REaXJlID09ICdkb3duJyAmJiB0aGlzXy5lblJpZ2h0UGFyZW50Um9sbCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/pobXpnaLooqvmu5rljrvnmoTlrr3luqZcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyUm9sbFdpZHRoID0gTWF0aC5hYnMocGFyc2VJbnQocmlnaHRQYXJlbnRPYmouc3R5bGUubGVmdCkpIHx8IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/nhKbngrnnmoRsZWZ05YC8XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvY3VzTGVmdCA9IHBhcnNlSW50KHRoaXNfLlhfUG9zaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzmsqHmnInmiYvliqjotYvlgLzvvIzpgqPkuYjlsLHojrflj5ZsZWZ05YC8XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlwdHYuaXNOdWxsKGZvY3VzTGVmdCkgfHwgZm9jdXNMZWZ0ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNMZWZ0ID0gdGhpc18ubm9kZU9iaiA/IE1hdGguYWJzKHBhcnNlSW50KHRoaXNfLm5vZGVPYmouc3R5bGUubGVmdCkpIDogMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy/pobXpnaLooqvmu5rljrvnmoTlrr3luqZcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyQSA9IHBhclJvbGxXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAvL+eEpueCueeahExFRlTlgLxcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9jQiA9IGZvY3VzTGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAvL+WmguaenOeEpueCueeahFRPUOWAvOWwj+S6juW9k+WJjeiiq+a7muWOu+eahOmrmOW6pu+8jOmCo+S5iOivtOaYjuatpOaXtumcgOimgeW+gOS4i+a7mlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJBID4gZm9jQikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WmguaenOmcgOimgeeItuWuueWZqOW+gOS4i+a7mu+8jOmCo+S5iOa7muWOu+eahOmrmOW6puWwseaYr+eEpueCueeahFRPUOWAvFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9sbFdpZHRoID0gZm9jQjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRQYXJlbnRPYmouc3R5bGUubGVmdCA9IFwiLVwiICsgcm9sbFdpZHRoICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioq5bem5Y+z5LiK5LiL5rua5Yqo6ZyA6KaB57uf5LiA55uR5o6n77yM55So5LqO5Yqo5oCB5Yqg6L295Zu+54mH77yM55uu5YmN5pe26Ze06Zeu6aKY77yM5rKh5pyJ57un57ut5byA5Y+R77yM5q2k5aSE55WZ5YGa5ZCO5pyf5Y2H57qnKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpc18uZW5SaWdodFBhZ2VSb2xsID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIC8v5byA5ZCv5pW06aG15rua5YqoXHJcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHRQYXJlbnRJZCA9IHRoaXNfLnJpZ2h0UGFyZW50SWQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHRBcmVhSWQgPSB0aGlzXy5yaWdodEFyZWFJZDtcclxuICAgICAgICAgICAgICAgIHZhciByaWdodFBhcmVudE9iaiA9IGlwdHYuJChyaWdodFBhcmVudElkKTtcclxuICAgICAgICAgICAgICAgIHZhciByaWdodEFyZWFPYmogPSBpcHR2LiQocmlnaHRBcmVhSWQpO1xyXG4gICAgICAgICAgICAgICAgLy/ojrflj5blvZPliY3pobXpnIDopoHmu5rliqjnmoTot53nprtcclxuICAgICAgICAgICAgICAgIHZhciByb2xsTGVmdCA9IHRoaXNfLmZvY3VzTGVmdFJvbGwgfHwgMDtcclxuICAgICAgICAgICAgICAgIHJpZ2h0UGFyZW50T2JqLnN0eWxlLmxlZnQgPSAnLScgKyByb2xsTGVmdCArIFwicHhcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+WKqOaAgeWKoOi9veWbvueJh1xyXG4gICAgICAgICAgICBpZiAodGhpc18uZm9jdXNQYWdlQWxsTW9kZWwgJiYgdGhpc18uZm9jdXNQYWdlQWxsTW9kZWwubGVuZ3RoID4gMCAmJiB0aGlzXy5mb2N1c1BhZ2VBbGxMb2FkID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWxsTW9kZWwgPSB0aGlzXy5mb2N1c1BhZ2VBbGxNb2RlbDtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gYWxsTW9kZWwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvY3VzTW9kZWwgPSBpcHR2KFwiI1wiICsgYWxsTW9kZWxbaV0pLmdldEZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvY3VzTW9kZWwgJiYgZm9jdXNNb2RlbC5uZXdTd2FwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjXCIgKyBmb2N1c01vZGVsLmltZ0lEICsgXCJfaW1nXCIpLnNyYyhmb2N1c01vZGVsLm5ld1N3YXApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXNfLmZvY3VzUGFnZUFsbExvYWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy/lpoLmnpzpu5jorqTnmoRvbkZvY3Vz5pa55rOV5LiN5ruh6Laz6ZyA5rGC77yM5bCx5Y+v5Lul5oyH5a6ab25Gb2N1c1/lsZ7mgKdcclxuICAgICAgICB0aGlzXy5vbkZvY3VzXyA9IFwiXCI7XHJcbiAgICAgICAgLy8g6buY6K6k6I635b6X54Sm54K55LqL5Lu2XHJcbiAgICAgICAgdGhpc18ub25Gb2N1cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXNfLmVuRm9jdXMgJiYgdGhpc18uaXNDcmVhdGVkID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNfLmluaXQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChpcHR2LmlzTm90TnVsbCh0aGlzXy5vbkZvY3VzXykpIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXkuZXhlQ29kZSh0aGlzXy5vbkZvY3VzXyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzXy5mb2N1c1R5cGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsgdGhpc18uaW1nSUQpLnNyYyh0aGlzXy5uZXdTd2FwKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXNfLmZvY3VzVHlwZSA9PSA3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkuY3VyRm9jdXMuaW1nSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjXCIgKyBrZXkuY3VyRm9jdXMuaW1nSUQpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpc18uZm9jdXNUeXBlID09IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v54Sm54K55qGG5piv55So5oi35omL5Yqo5YaZ5YiwaHRtbOS4re+8jOi0n+i0o+enu+WKqOatpOeEpueCueahhlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXB0di5pc05vdE51bGwodGhpc18uc2VsZWN0Qm9yZGVySWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdEZvY3VzT2JqID0gaXB0dihcIiNcIiArIHRoaXMubGFzdEZvY3VzSWQpLmdldEZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WmguaenOS4iuS4gOS4queEpueCueS4jeaYrzE15oiWMTbvvIzpgqPkuYjnhKbngrnmoYbogq/lrprmmK/pmpDol4/nmoTvvIzmiYDku6Xov5novrnotJ/otKPmmL7npLrnhKbngrnmoYZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Rm9jdXNPYmogJiYgbGFzdEZvY3VzT2JqLmZvY3VzVHlwZSAhPSAxMCB8fCAhbGFzdEZvY3VzT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mmL7npLrlhYnmoIdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsgdGhpcy5zZWxlY3RCb3JkZXJJZCkuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsgdGhpcy5zZWxlY3RCb3JkZXJJZCkuYWRkQ2xhc3MoXCJ0cmFuc2l0aW9uXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+enu+WKqOWFieagh1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXB0dihcIiNcIiArIHRoaXNfLnNlbGVjdEJvcmRlcklkKS5hdHRyKFwidG9wXCIsIHRoaXNfLllfUG9zaSArIFwicHhcIikuYXR0cihcImxlZnRcIiwgdGhpc18uWF9Qb3NpICsgXCJweFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYuZXJyb3IoXCLlvZPliY3nhKbngrnmnKrmjIflrppzZWxlY3RCb3JkZXJJZOWxnuaAp++8gVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzXy5mb2N1c1R5cGUgPT0gMTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/otJ/otKPlsIblr7nlupTnmoTlsZXnpLrlm77niYfmt7vliqDmlL7lpKfliqjnlLvvvIznhKbngrnmoYbmmK/pgJrov4fnhKbngrnlr7nlupTlm77niYfmt7vliqDmlL7lpKfliqjnlLtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/liY3mj5DvvIzpnIDopoHmnInnhKbngrnlr7nlupTnmoTlsZXnpLrlm77niYfvvIzlkIzml7bpnIDopoHmnInovrnmoYbmlYjmnpznmoTnhKbngrnlm77niYfvvIzlhbblrp7lsLHmmK/lsIbnhKbngrnlr7nlupTnmoTlsZXnpLrlm77niYfmlL7lpKfnmoTlkIzml7bvvIznhKbngrnlm77niYfkuZ/mlL7lpKfvvIznhKbngrnlm77niYfmmK/mnInovrnmoYbnmoTlm77niYdcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGltZyA9IGlwdHYoXCIjXCIgKyB0aGlzXy5pbWdJRCArIFwiX2ltZ1wiKS5hZGRDbGFzcyhcInRyYW5zaXRpb25cIilbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5wYXJlbnROb2RlLnN0eWxlLnpJbmRleCA9IHRoaXNfLmZvY3VzSW1nUGFyZW50WkluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsgdGhpc18uaW1nSUQgKyBcIl9pbWdcIikuYXR0cihcInRvcFwiLCAocGFyc2VJbnQoaW1nLnN0eWxlLnRvcCkgLSB0aGlzXy5jaGFuZ2VTaXplKSArIFwicHhcIikuYXR0cihcImxlZnRcIiwgKHBhcnNlSW50KGltZy5zdHlsZS5sZWZ0KSAtIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiKS5hdHRyKFwid2lkdGhcIiwgKHBhcnNlSW50KGltZy5zdHlsZS53aWR0aCkgKyAyICogdGhpc18uY2hhbmdlU2l6ZSkgKyBcInB4XCIpLmF0dHIoXCJoZWlnaHRcIiwgKHBhcnNlSW50KGltZy5zdHlsZS5oZWlnaHQpICsgMiAqIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/mt7vliqDov4fmuKEgIOaYvuekuueEpueCuVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0cyA9IGlwdHYoXCIjXCIgKyB0aGlzXy5pbWdJRCkuYWRkQ2xhc3MoXCJ0cmFuc2l0aW9uXCIpLnNob3coKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0cy5wYXJlbnROb2RlLnN0eWxlLnpJbmRleCA9IHRoaXNfLmltZ1BhcmVudFpJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXB0dihcIiNcIiArIHRoaXNfLmltZ0lEKS5hdHRyKFwidG9wXCIsIChwYXJzZUludChzZWxlY3RzLnN0eWxlLnRvcCkgLSB0aGlzXy5jaGFuZ2VTaXplKSArIFwicHhcIikuYXR0cihcImxlZnRcIiwgKHBhcnNlSW50KHNlbGVjdHMuc3R5bGUubGVmdCkgLSB0aGlzXy5jaGFuZ2VTaXplKSArIFwicHhcIikuYXR0cihcIndpZHRoXCIsIChwYXJzZUludChzZWxlY3RzLnN0eWxlLndpZHRoKSArIDIgKiB0aGlzXy5jaGFuZ2VTaXplKSArIFwicHhcIikuYXR0cihcImhlaWdodFwiLCAocGFyc2VJbnQoc2VsZWN0cy5zdHlsZS5oZWlnaHQpICsgMiAqIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXNfLmZvY3VzVHlwZSA9PSAxMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+i0n+i0o+WwhuWvueW6lOeahOWxleekuuWbvueJh+i1i+S6iOi+ueahhuS4juWKqOeUu++8jOaViOaenOS4uumAieS4reWQju+8jOWvueS6jueahOWxleekuuWbvueJh+a3u+WKoOS6hui+ueahhuS4juaUvuWkp+aViOaenO+8jOeEpueCueWvueW6lOeahOeEpueCueWbvueJh+S4jeWtmOWcqOS7u+S9leaViOaenOWPr+S7peebtOaOpeaUvuepuueZveWbvueJh++8jOWIh+iusOaYr+WvueW6lOeahOWxleekuuWbvueJh+a3u+WKoOWKqOeUu1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+adoeS7tu+8mueEpueCuemcgOimgeWFt+acieWvueW6lOeahOWxleekuuWbvueJh++8jOWPqui0n+i0o+aOp+WItueEpueCueWbvueJh+i1t+WIsOWKqOeUu+aViOaenFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1nID0gaXB0dihcIiNcIiArIHRoaXNfLmltZ0lEICsgXCJfaW1nXCIpLnRvZ2dsZUNsYXNzKFwiYm9yZGVyXCIpLmFkZENsYXNzKFwidHJhbnNpdGlvblwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnBhcmVudE5vZGUuc3R5bGUuekluZGV4ID0gdGhpc18uZm9jdXNJbWdQYXJlbnRaSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zdHlsZS50b3AgPSAocGFyc2VJbnQoaW1nLnN0eWxlLnRvcCkgLSB0aGlzXy5jaGFuZ2VTaXplKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnN0eWxlLmxlZnQgPSAocGFyc2VJbnQoaW1nLnN0eWxlLmxlZnQpIC0gdGhpc18uY2hhbmdlU2l6ZSkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zdHlsZS53aWR0aCA9IChwYXJzZUludChpbWcuc3R5bGUud2lkdGgpICsgMiAqIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcuc3R5bGUuaGVpZ2h0ID0gKHBhcnNlSW50KGltZy5zdHlsZS5oZWlnaHQpICsgMiAqIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpc18uZm9jdXNUeXBlID09IDE0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6LSf6LSj5bCG54Sm54K5ZGl25re75Yqg6L655qGGXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5p2h5Lu277yM54Sm54K55YiH5o2i55qE5b2i5byP5bCx5piv6K6y54Sm54K55re75Yqg6L655qGG5pWI5p6c77yM5ZCM5pe25pi+56S65LiO6ZqQ6JeP77yM6YO95piv6ZKI5a+55LqO54Sm54K5ZGl255qE5pON5L2cXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjXCIgKyB0aGlzXy5pZCkudG9nZ2xlQ2xhc3MoXCJib3JkZXJcIikuYXR0cihcInpJbmRleFwiLCB0aGlzXy5pbWdQYXJlbnRaSW5kZXgpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXNfLmZvY3VzVHlwZSA9PSAxNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLzE15LiOMTbpg73mmK/ku6PnoIHoh6rliqjnlJ/miJBkaXbkuLrpgInkuK3moYbvvIzor6XpgInkuK3moYblj6rotJ/otKPmmL7npLrovrnmoYbvvIzlr7nlupTnmoTlsZXnpLrlm77niYfkuI3lhbfmnInmlL7lpKfmlYjmnpzvvIzliIfmjaLmlYjmnpzkuLrmmL7npLrkuI7pmpDol4/mraToh6rliqjnlJ/miJDnmoRkaXbovrnmoYbvvIzlpoLmnpzkuKTkuKrnhKbngrnpg73mmK8xNe+8jOWQjOaXtuS4pOS4queEpueCueahhuWkp+Wwj+S5n+S4jeS4gOagt++8jOmCo+S5iOWwseS8muWHuueOsOeEpueCuei+ueahhuiHquWKqOaUvuWkp+S4jue8qeWwj+aViOaenFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+eEpueCueahhu+8muaYr+iHquWKqOeUn+aIkOeahOeEpueCuWRpdizkvY3nva7lpKflsI/mmK/moLnmja7nhKbngrnnmoRzdHlsZemHjOmdouaOp+WItueahFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+adoeS7tu+8mumcgOimgeeUqOaIt+WvueeEpueCueeahHN0eWxl6LWL5LqId2lkdGgsaGVpZ2h0LHRvcCxsZWZ05bGe5oCn77yM6L+Z5Lqb5bGe5oCn5Yaz5a6a54Sm54K55qGG55qE5aSn5bCP5LiO5L2N572uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5YiH5o2i5pWI5p6c77ya6YCJ5Lit77ya54Sm54K55qGGZGl25pi+56S677yM5L2N572u5aSn5bCP5piv54Sm54K555qEc3R5bGXmjqfliLbnmoTvvIznp7vlvIDvvJrnhKbngrnmoYZkaXbpmpDol49cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpdiA9IGlwdHYuJCh0aGlzXy5zZWxlY3Rpb25JRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGl2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCB0aGlzXy5zZWxlY3Rpb25JRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXYuaWQgPSB0aGlzXy5zZWxlY3Rpb25JRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS53aWR0aCA9IFwiMHB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUuaGVpZ2h0ID0gXCIwcHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS50b3AgPSBcIjBweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLmxlZnQgPSBcIjBweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLnpJbmRleCA9IHRoaXNfLmltZ1BhcmVudFpJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5jbGFzc05hbWUgPSBcImJvcmRlciBwb3NpdGlvblwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc18ubm9kZU9iai5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RGb2N1c09iaiA9IGlwdHYoXCIjXCIgKyB0aGlzXy5sYXN0Rm9jdXNJZCkuZ2V0Rm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzkuIrkuIDkuKrnhKbngrnkuI3mmK8xNeaIljE277yM6YKj5LmI54Sm54K55qGG6IKv5a6a5piv6ZqQ6JeP55qE77yM5omA5Lul6L+Z6L656LSf6LSj5pi+56S654Sm54K55qGGXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Rm9jdXNPYmogJiYgbGFzdEZvY3VzT2JqLmZvY3VzVHlwZSAhPSAxNSAmJiBsYXN0Rm9jdXNPYmouZm9jdXNUeXBlICE9IDE2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsgdGhpc18uc2VsZWN0aW9uSUQpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjXCIgKyB0aGlzXy5zZWxlY3Rpb25JRCkuYWRkQ2xhc3MoXCJ0cmFuc2l0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS53aWR0aCA9IHRoaXNfLm5vZGVPYmouc3R5bGUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS5oZWlnaHQgPSB0aGlzXy5ub2RlT2JqLnN0eWxlLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLnRvcCA9IHRoaXNfLm5vZGVPYmouc3R5bGUudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUubGVmdCA9IHRoaXNfLm5vZGVPYmouc3R5bGUubGVmdDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXNfLmZvY3VzVHlwZSA9PSAxNikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+eEpueCueahhu+8muaYr+iHquWKqOeUn+aIkOeahOeEpueCuWRpdizkvY3nva7lpKflsI/mmK/nhKbngrnlr7nlupTnmoTlsZXnpLrlm77niYfnmoTniLbnuqfnm67lvZVkaXbnmoTlpKflsI/kvY3nva7mjqfliLbnmoRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/mlL7lpKflpKflsI/vvJrmoLnmja7nhKbngrljaGFuZ2VTaXpl5bGe5oCn5o6n5Yi25pS+5aSn55qE5aSn5bCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5p2h5Lu277ya5piv5YW35pyJ5a+55bqU55qE5bGV56S65Zu+54mH77yM6ZyA6KaB6Ieq5Yqo55Sf5oiQ54Sm54K55qGGZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5YiH5o2i5pWI5p6c77ya6YCJ5Lit77ya5bGV56S65Zu+54mH5pS+5aSn77yM6Ieq5Yqo55Sf5oiQ55qE54Sm54K56L655qGG5pS+5aSn77yM56e75byA77ya5bGV56S65Zu+54mH57yp5bCP77yM6Ieq5Yqo55Sf5oiQ55qE54Sm54K56L655qGG6ZqQ6JePXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaXYgPSBpcHR2LiQodGhpc18uc2VsZWN0aW9uSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRpdikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgdGhpc18uc2VsZWN0aW9uSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2LmlkID0gdGhpc18uc2VsZWN0aW9uSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUud2lkdGggPSBcIjBweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLmhlaWdodCA9IFwiMHB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUudG9wID0gXCIwcHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS5sZWZ0ID0gXCIwcHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS56SW5kZXggPSB0aGlzXy5pbWdQYXJlbnRaSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXYuY2xhc3NOYW1lID0gXCJib3JkZXIgcG9zaXRpb25cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNfLm5vZGVPYmoucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsYXN0Rm9jdXNPYmogPSBpcHR2KFwiI1wiICsgdGhpc18ubGFzdEZvY3VzSWQpLmdldEZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbWcgPSBpcHR2LiQodGhpc18uaW1nSUQgKyBcIl9pbWdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5LiK5LiA5Liq54Sm54K55LiN5pivMTXmiJYxNu+8jOmCo+S5iOWwseS4jemcgOimgeeEpueCueWFt+acieWKqOeUu+aViOaenO+8jOi/mei+ueaOp+WItuWPlua2iOWKqOeUu++8jOebtOaOpeiuqeaImOWjq+WbvueJh+aUvuWkp+S4jueEpueCuWRpduebtOaOpeaYvuekulxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdEZvY3VzT2JqICYmIGxhc3RGb2N1c09iai5mb2N1c1R5cGUgIT0gMTUgJiYgbGFzdEZvY3VzT2JqLmZvY3VzVHlwZSAhPSAxNikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXB0dihcIiNcIiArIHRoaXNfLnNlbGVjdGlvbklEKS5yZW1vdmVDbGFzcyhcInRyYW5zaXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsgdGhpc18uc2VsZWN0aW9uSUQpLmFkZENsYXNzKFwidHJhbnNpdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsgdGhpc18uc2VsZWN0aW9uSUQpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/orqnlr7nlupTnmoTlsZXnpLrlm77niYfmlL7lpKfvvIzlubbkuJTmi6XmnInmlL7lpKfliqjnlLtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXB0dihcIiNcIiArIHRoaXNfLmltZ0lEICsgXCJfaW1nXCIpLmFkZENsYXNzKFwidHJhbnNpdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/nhKbngrnmoYbmlL7lpKcs55Sx5LqO54Sm54K55qGG55qE5L2N572u5piv5Z+65LqO5bGV56S65Zu+54mH55qE54i257qn5YWD57Sg55qE5bem5LiK6KeS5Li66LW354K56L+b6KGM5pS+5aSn55qE77yM5pyJ5LqG6L655qGG55qE5Y6f5Zug5a+86Ie05L2N572u5LiO5pS+5aSn5ZCO55qE5bGV56S65Zu+54mH55qE5L2N572u5LiN5a+55bqU77yM5omA5Lul6ZyA6KaB6L+b5LiA5q2l5YeP5Y675oiW5Yqg5LiK6L655qGG55qE5aSn5bCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS50b3AgPSAocGFyc2VJbnQoaW1nLnBhcmVudE5vZGUuc3R5bGUudG9wKSAtIHRoaXNfLmNoYW5nZVNpemUgLSAyKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLmxlZnQgPSAocGFyc2VJbnQoaW1nLnBhcmVudE5vZGUuc3R5bGUubGVmdCkgLSB0aGlzXy5jaGFuZ2VTaXplIC0gMikgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS53aWR0aCA9IChwYXJzZUludChpbWcucGFyZW50Tm9kZS5zdHlsZS53aWR0aCkgKyAyICogdGhpc18uY2hhbmdlU2l6ZSArIDEpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUuaGVpZ2h0ID0gKHBhcnNlSW50KGltZy5wYXJlbnROb2RlLnN0eWxlLmhlaWdodCkgKyAyICogdGhpc18uY2hhbmdlU2l6ZSArIDEpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WvueW6lOeahOWxleekuuWbvueJh+aUvuWkp1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcucGFyZW50Tm9kZS5zdHlsZS56SW5kZXggPSB0aGlzXy5mb2N1c0ltZ1BhcmVudFpJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnN0eWxlLnRvcCA9IChwYXJzZUludChpbWcuc3R5bGUudG9wKSAtIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcuc3R5bGUubGVmdCA9IChwYXJzZUludChpbWcuc3R5bGUubGVmdCkgLSB0aGlzXy5jaGFuZ2VTaXplKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnN0eWxlLndpZHRoID0gKHBhcnNlSW50KGltZy5zdHlsZS53aWR0aCkgKyAyICogdGhpc18uY2hhbmdlU2l6ZSkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zdHlsZS5oZWlnaHQgPSAocGFyc2VJbnQoaW1nLnN0eWxlLmhlaWdodCkgKyAyICogdGhpc18uY2hhbmdlU2l6ZSkgKyBcInB4XCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpc18uZm9jdXNUeXBlID09IDE3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v54Sm54K55qGG5piv55So5oi36Ieq5bex5YaZ5YiwaHRtbOS4re+8jOWPr+S7peiHquW3seWumuWItuWMlueEpueCueahhueahOagt+W8j++8jOavlOWmgui+ueahhu+8jOiDjOaZr+Wbvu+8jOmHjOmdouWMheWQq+WbvueJh+etieetie+8jOWvueW6lOWKqOeUu+aViOaenOS4uuW5s+enu++8jOayoeacieaUvuWkp+aViOaenFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+adoeS7tu+8mumcgOimgeeUqOaIt+iHquW3seWumuS5ieS4gOS4queEpueCuemAieS4reahhmRpdu+8jOW5tuS4lOaMh+WumuivpWRpduaciWlk5YC86LWL5LqI57uZ54Sm54K5c2VsZWN0aW9uT2JqSUTlsZ7mgKdcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpdiA9IGlwdHYuJCh0aGlzXy5zZWxlY3Rpb25PYmpJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5LiK5LiA5Liq54Sm54K55LiN5pivMTfvvIzmiJbogIXmmK/liJ3lp4vljJbnrKzkuIDkuKrnhKbngrnvvIzpgqPkuYjlhYjmmL7npLrnp7vliqjmoYbvvIzkuI3otYvkuojliqjnlLtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzkuIrkuIDkuKrnhKbngrnmmK8xN++8jOS9huaYr+eEpueCueahhuS4jeaYr+WQjOS4gOS4qu+8jOmcgOimgemakOiXj+S4iuS4gOS4queEpueCueahhu+8jOaYvuekuuS4i+S4gOS4queEpueCueahhlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdEZvY3VzT2JqID0gaXB0dihcIiNcIiArIHRoaXNfLmxhc3RGb2N1c0lkKS5nZXRGb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdEZvY3VzT2JqICYmIGxhc3RGb2N1c09iai5mb2N1c1R5cGUgIT0gMTcgfHwgIWxhc3RGb2N1c09iaiB8fCBsYXN0Rm9jdXNPYmogJiYgbGFzdEZvY3VzT2JqLmZvY3VzVHlwZSA9PSAxNyAmJiBsYXN0Rm9jdXNPYmouc2VsZWN0aW9uT2JqSUQgIT0gdGhpc18uc2VsZWN0aW9uT2JqSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsgdGhpc18uc2VsZWN0aW9uT2JqSUQpLnJlbW92ZUNsYXNzKFwidHJhbnNpdGlvblwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WmguaenOS4iuS4gOS4queEpueCueaYrzE3LOW5tuS4lOS4iuS4gOS4queEpueCueWtmOWcqO+8jOmCo+S5iOWwsei1i+S6iOWKqOeUu1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RGb2N1c09iaiAmJiBsYXN0Rm9jdXNPYmouZm9jdXNUeXBlID09IDE3ICYmIGRpdikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjXCIgKyB0aGlzXy5zZWxlY3Rpb25PYmpJRCkuYWRkQ2xhc3MoXCJ0cmFuc2l0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbWcgPSBpcHR2LiQodGhpc18uaW1nSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLnRvcCA9IHBhcnNlSW50KGltZy5wYXJlbnROb2RlLnN0eWxlLnRvcCkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUubGVmdCA9IHBhcnNlSW50KGltZy5wYXJlbnROb2RlLnN0eWxlLmxlZnQpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzXy5mb2N1c1R5cGUgPT0gMTgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/pgInkuK3lkI7vvIznhKbngrnmoYblm77niYfmmL7npLrvvIzlkIzml7bor6Xlm77niYfopoHlkIzml7bkuI7lr7nlupTnmoTnhKbngrnlm77niYfmlL7lpKdcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleS5jdXJGb2N1cy5pbWdJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXB0dihcIiNcIiArIGtleS5jdXJGb2N1cy5pbWdJRCkucmVtb3ZlQ2xhc3MoXCJ0cmFuc2l0aW9uc0hpZGUwXzVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsga2V5LmN1ckZvY3VzLmltZ0lEICsgXCJfaW1nXCIpLnJlbW92ZUNsYXNzKFwidHJhbnNpdGlvbnNIaWRlMF81XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXB0dihcIiNcIiArIGtleS5jdXJGb2N1cy5pbWdJRCkuYWRkQ2xhc3MoXCJ0cmFuc2l0aW9uc1Nob3cwXzVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsga2V5LmN1ckZvY3VzLmltZ0lEICsgXCJfaW1nXCIpLmFkZENsYXNzKFwidHJhbnNpdGlvbnNTaG93MF81XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXB0dihcIiNcIiArIGtleS5jdXJGb2N1cy5pbWdJRCkuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzXy5vbkZvY3VzRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXkuZXhlQ29kZSh0aGlzXy5vbkZvY3VzRXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzXy5vbkJsdXJfID0gXCJcIjtcclxuICAgICAgICB0aGlzXy5vbkJsdXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzXy5lbkZvY3VzICYmIHRoaXNfLmlzQ3JlYXRlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXB0di5pc05vdE51bGwodGhpc18ub25CbHVyXykpIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXkuZXhlQ29kZSh0aGlzXy5vbkJsdXJfKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNfLmZvY3VzVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjXCIgKyB0aGlzXy5pbWdJRCkuc3JjKHRoaXNfLm9sZFN3YXApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyDpmpDol4/lj5HlhYnlnIjlnIhcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc18uZm9jdXNUeXBlID09IDcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXB0dihcIiNcIiArIGtleS5jdXJGb2N1cy5pbWdJRCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNfLmZvY3VzVHlwZSA9PSAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+makOiXj+WFieagh1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsgdGhpc18uc2VsZWN0Qm9yZGVySWQpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNfLmZvY3VzVHlwZSA9PSAxMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsgdGhpc18uaW1nSUQgKyBcIl9pbWdcIikudG9nZ2xlQ2xhc3MoXCJ0cmFuc2l0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1nID0gaXB0di4kKHRoaXNfLmltZ0lEICsgXCJfaW1nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcucGFyZW50Tm9kZS5zdHlsZS56SW5kZXggPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcuc3R5bGUudG9wID0gKHBhcnNlSW50KGltZy5zdHlsZS50b3ApICsgdGhpc18uY2hhbmdlU2l6ZSkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zdHlsZS5sZWZ0ID0gKHBhcnNlSW50KGltZy5zdHlsZS5sZWZ0KSArIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcuc3R5bGUud2lkdGggPSAocGFyc2VJbnQoaW1nLnN0eWxlLndpZHRoKSAtIDIgKiB0aGlzXy5jaGFuZ2VTaXplKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnN0eWxlLmhlaWdodCA9IChwYXJzZUludChpbWcuc3R5bGUuaGVpZ2h0KSAtIDIgKiB0aGlzXy5jaGFuZ2VTaXplKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXB0dihcIiNcIiArIHRoaXNfLmltZ0lEKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3RzID0gaXB0di4kKHRoaXNfLmltZ0lEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0cy5wYXJlbnROb2RlLnN0eWxlLnpJbmRleCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdHMuc3R5bGUudG9wID0gKHBhcnNlSW50KHNlbGVjdHMuc3R5bGUudG9wKSArIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RzLnN0eWxlLmxlZnQgPSAocGFyc2VJbnQoc2VsZWN0cy5zdHlsZS5sZWZ0KSArIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RzLnN0eWxlLndpZHRoID0gKHBhcnNlSW50KHNlbGVjdHMuc3R5bGUud2lkdGgpIC0gMiAqIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RzLnN0eWxlLmhlaWdodCA9IChwYXJzZUludChzZWxlY3RzLnN0eWxlLmhlaWdodCkgLSAyICogdGhpc18uY2hhbmdlU2l6ZSkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzXy5mb2N1c1R5cGUgPT0gMTMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXB0dihcIiNcIiArIHRoaXNfLmltZ0lEICsgXCJfaW1nXCIpLnRvZ2dsZUNsYXNzKFwiYm9yZGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1nID0gaXB0di4kKHRoaXNfLmltZ0lEICsgXCJfaW1nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcucGFyZW50Tm9kZS5zdHlsZS56SW5kZXggPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcuc3R5bGUudG9wID0gKHBhcnNlSW50KGltZy5zdHlsZS50b3ApICsgdGhpc18uY2hhbmdlU2l6ZSkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zdHlsZS5sZWZ0ID0gKHBhcnNlSW50KGltZy5zdHlsZS5sZWZ0KSArIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcuc3R5bGUud2lkdGggPSAocGFyc2VJbnQoaW1nLnN0eWxlLndpZHRoKSAtIDIgKiB0aGlzXy5jaGFuZ2VTaXplKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnN0eWxlLmhlaWdodCA9IChwYXJzZUludChpbWcuc3R5bGUuaGVpZ2h0KSAtIDIgKiB0aGlzXy5jaGFuZ2VTaXplKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNfLmZvY3VzVHlwZSA9PSAxNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsgdGhpc18uaWQpLmhpZGUoKS50b2dnbGVDbGFzcyhcImJvcmRlclwiKS5hdHRyKFwiekluZGV4XCIsIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc18uZm9jdXNUeXBlID09IDE1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0Rm9jdXNPYmogPSBpcHR2KFwiI1wiICsgdGhpc18ubmV4dEZvY3VzSWQpLmdldEZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0Rm9jdXNPYmogJiYgbmV4dEZvY3VzT2JqLmZvY3VzVHlwZSAhPSAxNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXB0dihcIiNcIiArIHRoaXNfLnNlbGVjdGlvbklEKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNfLmZvY3VzVHlwZSA9PSAxNikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WmguaenOS4i+S4gOS4quWNs+WwhuiOt+WPlueEpueCueeahOeEpueCueS4jeaYrzE15oiWMTbvvIzlsLHpmpDol4/pgInkuK3moYZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRGb2N1c09iaiA9IGlwdHYoXCIjXCIgKyB0aGlzXy5uZXh0Rm9jdXNJZCkuZ2V0Rm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRGb2N1c09iaiAmJiBuZXh0Rm9jdXNPYmouZm9jdXNUeXBlICE9IDE1ICYmIG5leHRGb2N1c09iaiAmJiBuZXh0Rm9jdXNPYmouZm9jdXNUeXBlICE9IDE2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcHR2KFwiI1wiICsgdGhpc18uc2VsZWN0aW9uSUQpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+i/mOWOn+WbvueJh+Wkp+Wwj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1nID0gaXB0di4kKHRoaXNfLmltZ0lEICsgXCJfaW1nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcucGFyZW50Tm9kZS5zdHlsZS56SW5kZXggPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcuc3R5bGUudG9wID0gKHBhcnNlSW50KGltZy5zdHlsZS50b3ApICsgdGhpc18uY2hhbmdlU2l6ZSkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zdHlsZS5sZWZ0ID0gKHBhcnNlSW50KGltZy5zdHlsZS5sZWZ0KSArIHRoaXNfLmNoYW5nZVNpemUpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcuc3R5bGUud2lkdGggPSAocGFyc2VJbnQoaW1nLnN0eWxlLndpZHRoKSAtIDIgKiB0aGlzXy5jaGFuZ2VTaXplKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnN0eWxlLmhlaWdodCA9IChwYXJzZUludChpbWcuc3R5bGUuaGVpZ2h0KSAtIDIgKiB0aGlzXy5jaGFuZ2VTaXplKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNfLmZvY3VzVHlwZSA9PSAxNykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGl2ID0gaXB0di4kKHRoaXNfLnNlbGVjdGlvbk9iaklEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzkuIrkuIDkuKrnhKbngrnkuI3mmK8xN++8jOmCo+S5iOS5heWFiOaYvuekuuenu+WKqOahhu+8jOi1i+S6iOWKqOeUu1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dEZvY3VzT2JqID0gaXB0dihcIiNcIiArIHRoaXNfLm5leHRGb2N1c0lkKS5nZXRGb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dEZvY3VzT2JqICYmIG5leHRGb2N1c09iai5mb2N1c1R5cGUgIT0gMTcgfHwgbmV4dEZvY3VzT2JqICYmIG5leHRGb2N1c09iai5zZWxlY3Rpb25PYmpJRCAhPSB0aGlzXy5zZWxlY3Rpb25PYmpJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpdikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjXCIgKyB0aGlzXy5zZWxlY3Rpb25PYmpJRCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc18uZm9jdXNUeXBlID09IDE4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjXCIgKyBrZXkuY3VyRm9jdXMuaW1nSUQpLnJlbW92ZUNsYXNzKFwidHJhbnNpdGlvbnNTaG93MF81XCIpLmFkZENsYXNzKFwidHJhbnNpdGlvbnNIaWRlMF81XCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXB0dihcIiNcIiArIGtleS5jdXJGb2N1cy5pbWdJRCArIFwiX2ltZ1wiKS5yZW1vdmVDbGFzcyhcInRyYW5zaXRpb25zU2hvdzBfNVwiKS5hZGRDbGFzcyhcInRyYW5zaXRpb25zSGlkZTBfNVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpc18ub25CbHVyRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXkuZXhlQ29kZSh0aGlzXy5vbkJsdXJFdmVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXNfLm9uQ2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzXy5lbmFibGUgPT0gdHJ1ZSAmJiB0aGlzXy5lbkZvY3VzID09IHRydWUgJiYgdGhpc18uaXNDcmVhdGVkID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzXy5idXR0b25EYXRhICYmIGlwdHYuYXBpICYmIGlwdHYuYXBpLmxvZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlwdHYuYXBpLmxvZy5idXR0b25Mb2codGhpc18uYnV0dG9uRGF0YS5idXR0b25JZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBrZXkuZXhlQ29kZSh0aGlzXy5jbGlja0V2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omA5pyJ5pa55ZCR5bGe5oCn5LiO54Sm54K56KGM5Li65LqL5Lu2XHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgaXB0di5EaXJlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfTtcclxuXHJcbiAgICBpcHR2LmV4dGVuZChpcHR2LkRpcmUucHJvdG90eXBlLCB7XHJcbiAgICAgICAgdXA6ICcnLFxyXG4gICAgICAgIHVwT3RoZXI6ICcnLFxyXG4gICAgICAgIHJpZ2h0OiAnJyxcclxuICAgICAgICByaWdodE90aGVyOiAnJyxcclxuICAgICAgICBkb3duOiAnJyxcclxuICAgICAgICBkb3duT3RoZXI6ICcnLFxyXG4gICAgICAgIGxlZnQ6ICcnLFxyXG4gICAgICAgIGxlZnRPdGhlcjogJycsXHJcbiAgICAgICAgb3RoZXJFdmVudDogJycsXHJcbiAgICAgICAgb3RoZXI6ICcnLFxyXG4gICAgICAgIC8vIOafkOaWueWQkeaJp+ihjOS6i+S7tu+8jOWtl+espuS4slxyXG4gICAgICAgIHVwRXZlbnQ6ICcnLFxyXG4gICAgICAgIHJpZ2h0RXZlbnQ6ICcnLFxyXG4gICAgICAgIGRvd25FdmVudDogJycsXHJcbiAgICAgICAgbGVmdEV2ZW50OiAnJyxcclxuICAgICAgICAvL+afkOaWueWQkeWOn+acrOaMh+WumueahOeEpueCueiiq+emgeeUqOS6hu+8jOWwseaJp+ihjOWTjeW6lOS6i+S7tlxyXG4gICAgICAgIHVwT3RoZXJFdmVudDogJycsXHJcbiAgICAgICAgcmlnaHRPdGhlckV2ZW50OiAnJyxcclxuICAgICAgICBkb3duT3RoZXJFdmVudDogJycsXHJcbiAgICAgICAgbGVmdE90aGVyRXZlbnQ6ICcnLFxyXG4gICAgICAgIC8v5aaC5p6c5a+55LqO5pa55ZCR6K6+572u55qE54Sm54K55LiN5Zyo54Sm54K55rGg5Lit77yM6YKj5LmI5omn6KGM5a+55LqO5pa55ZCR55qE5LqL5Lu25oiW54Sm54K5XHJcbiAgICAgICAgcmlnaHROb0V2ZW50OiAnJyxcclxuICAgICAgICByaWdodE5vOiAnJyxcclxuICAgICAgICBsZWZ0Tm9FdmVudDogJycsXHJcbiAgICAgICAgbGVmdE5vOiAnJyxcclxuICAgICAgICBkb3duTm9FdmVudDogJycsXHJcbiAgICAgICAgZG93bk5vOiAnJyxcclxuICAgICAgICB1cE5vRXZlbnQ6ICcnLFxyXG4gICAgICAgIHVwTm86ICcnXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIElE5ZG95ZCN5Y+C5pWw6ZuG5ZCIXHJcbiAgICAgKiBAcGFyYW0gX3hcclxuICAgICAqIEBwYXJhbSBfeVxyXG4gICAgICogQHBhcmFtIF9pbWdJRFxyXG4gICAgICogQHBhcmFtIF91cFBhcmVudElkXHJcbiAgICAgKi9cclxuICAgIHZhciBJZExpc3QgPSBmdW5jdGlvbiAoX3gsIF95LCBfaW1nSUQsIF91cFBhcmVudElkKSB7XHJcbiAgICAgICAgdmFyIHRoaXNfID0gdGhpcztcclxuICAgICAgICB0aGlzXy54ID0gX3g7XHJcbiAgICAgICAgdGhpc18ueSA9IF95O1xyXG4gICAgICAgIHRoaXNfLmltZ0lEID0gX2ltZ0lEO1xyXG4gICAgICAgIHRoaXNfLnVwUGFyZW50SWQgPSBfdXBQYXJlbnRJZDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja5pZOiOt+WPluWPguaVsFxyXG4gICAgICogQHBhcmFtIF9pZFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKi9cclxuICAgIHZhciBnZXRJZExpc3QgPSBmdW5jdGlvbiAoX2lkKSB7XHJcbiAgICAgICAgaWYgKCFfaWQpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciBkMSA9IF9pZDtcclxuICAgICAgICB2YXIgeDEgPSBkMS5pbmRleE9mKFwiX1wiLCAwKTtcclxuICAgICAgICB2YXIgeDIgPSBkMS5pbmRleE9mKFwiX1wiLCB4MSArIDEpO1xyXG4gICAgICAgIHZhciB4MyA9IGQxLmluZGV4T2YoXCJfXCIsIHgyICsgMSk7XHJcbiAgICAgICAgdmFyIHg0ID0gZDEuaW5kZXhPZihcIl9cIiwgeDMgKyAxKTtcclxuICAgICAgICB2YXIgeDUgPSBkMS5pbmRleE9mKFwiX1wiLCB4NCArIDEpO1xyXG5cclxuICAgICAgICB2YXIgeCA9IGQxLnN1YnN0cmluZyh4MSArIDIsIHgyKTtcclxuICAgICAgICB2YXIgeSA9IGQxLnN1YnN0cmluZyh4MiArIDIsIHgzKTtcclxuICAgICAgICB2YXIgaW1nc3JjID0gXCJcIjtcclxuICAgICAgICBpZiAoeDQgIT0gLTEpIHtcclxuICAgICAgICAgICAgaW1nc3JjID0gZDEuc3Vic3RyaW5nKHgzICsgMSwgeDQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcGFyID0gXCJcIjtcclxuICAgICAgICBpZiAoeDUgIT0gLTEpIHtcclxuICAgICAgICAgICAgcGFyID0gZDEuc3Vic3RyaW5nKHg0ICsgMSwgeDUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IElkTGlzdCh4LCB5LCBpbWdzcmMsIHBhcik7XHJcbiAgICB9O1xyXG5cclxuICAgIGtleS5jdXJGb2N1cyA9IG5ldyBpcHR2LkZvY3VzTW9kZWwoKTtcclxuXHJcbiAgICAvL+aJqeWxlWlwdHblr7nosaHmlrnms5VcclxuICAgIGlwdHYuZm4uZXh0ZW5kKHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKuiOt+WPlueEpueCueWvueixoVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtpcHR2LkZvY3VzTW9kZWx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0Rm9jdXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRoaXNfID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHRoaXNfWzBdICYmIHRoaXNfWzBdLmZvY3VzT2JqKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc19bMF0uZm9jdXNPYmo7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlvIDlkK/nhKbngrnmnYPpmZDvvIzmlK/mjIHljZXkuKrlvIDlkK/vvIzlpJrkuKrlkIzml7blvIDlkK9cclxuICAgICAgICAgKiBAcmV0dXJucyB7ZW5hYmxlRm9jdXN9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZW5hYmxlRm9jdXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRoaXNfID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzXy5jb250ZXh0O1xyXG4gICAgICAgICAgICBpZiAodGhpc19bMF0gJiYgdGhpc19bMF0uZm9jdXNPYmopIHtcclxuICAgICAgICAgICAgICAgIHRoaXNfWzBdLmZvY3VzT2JqLmVuRm9jdXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQgJiYgaXB0di5pc0FycmF5KGNvbnRleHQpKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gaXB0di5mb2N1c0NvbGxlY3Rpb25bY29udGV4dFtpXV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iaiAmJiBvYmouZm9jdXNPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmZvY3VzT2JqLmVuRm9jdXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpc187XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDnpoHnlKjnhKbngrnmnYPpmZDvvIzmlK/mjIHljZXkuKrnpoHnlKjvvIzlpJrkuKrlkIzml7bnpoHnlKhcclxuICAgICAgICAgKiBAcmV0dXJucyB7ZW5hYmxlRm9jdXN9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZGlzYWJsZUZvY3VzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGlzXyA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gdGhpc18uY29udGV4dDtcclxuICAgICAgICAgICAgaWYgKHRoaXNfWzBdICYmIHRoaXNfWzBdLmZvY3VzT2JqKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzX1swXS5mb2N1c09iai5lbkZvY3VzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udGV4dCAmJiBpcHR2LmlzQXJyYXkoY29udGV4dCkpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBpcHR2LmZvY3VzQ29sbGVjdGlvbltjb250ZXh0W2ldXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqICYmIG9iai5mb2N1c09iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouZm9jdXNPYmouZW5Gb2N1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpc187XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGRGb2N1czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhpc18gPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgY29udGV4dCA9IHRoaXNfLmNvbnRleHQsXHJcbiAgICAgICAgICAgICAgICBkb21zID0gW10sXHJcbiAgICAgICAgICAgICAgICBmb2N1c0lkID0gbnVsbDtcclxuICAgICAgICAgICAgLy/lpoLmnpzmmK/mibnph4/mt7vliqBcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQgJiYgaXB0di5pc0FycmF5KGNvbnRleHQpKSB7XHJcbiAgICAgICAgICAgICAgICBkb21zID0gY29udGV4dDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0ICYmIGlwdHYudHlwZShjb250ZXh0KSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgLy/lpoLmnpzmmK/ljZXkuKrmt7vliqBcclxuICAgICAgICAgICAgICAgIGRvbXMucHVzaChjb250ZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRvbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBkb21PYmogPSBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkID0gXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBvYmogPSBkb21zW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iaiAmJiAoaWQgPSBvYmouaWQpICYmIChpcHR2LnRyaW0oaWQpKSAmJiBpZC5pbmRleE9mKFwiaGFuZHNcIikgPT0gMCAmJiAoZG9tT2JqID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtb2RlbCA9IG5ldyBpcHR2LkZvY3VzTW9kZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5pZCA9IGZvY3VzSWQgPSBpZDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaWRQYXJhbXMgPSBnZXRJZExpc3QoaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLlhfUG9zaSA9IGlkUGFyYW1zLng7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuWV9Qb3NpID0gaWRQYXJhbXMueTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaWRQYXJhbXMudXBQYXJlbnRJZCAmJiBpcHR2KFwiI1wiICsgaWRQYXJhbXMudXBQYXJlbnRJZClbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuUGFyZW50Tm9kZSA9IGlwdHYoXCIjXCIgKyBpZFBhcmFtcy51cFBhcmVudElkKVswXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy/ojrflj5bnhKbngrnlhoXpg6jnmoTlm77niYdpZFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmltZ0lEID0gaXB0di50cmltKGlkUGFyYW1zLmltZ0lEKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+S/neWtmOWIh+aNouS5i+WJjeeahOWbvueJh+WcsOWdgFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLm9sZFN3YXAgPSBpcHR2KFwiI1wiICsgbW9kZWwuaW1nSUQpLnNyYygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5lbkZvY3VzID0gb2JqLmVuRm9jdXMgfHwgdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvL+ehruWumumUru+8jOehruWumuS6i+S7tlxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmNsaWNrRXZlbnQgPSBvYmouY2xpY2tFdmVudCB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICAvL+aWsOWbvuWcsOWdgFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLm5ld1N3YXAgPSBvYmoubmV3U3dhcCB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICAvL+eEpueCueaNhue7keaVsOaNrlxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLnRlbXBEYXRhID0gb2JqLnRlbXBEYXRhIHx8IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/liIfmjaLnsbvlnotcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5mb2N1c1R5cGUgPSBvYmouZm9jdXNUeXBlIHx8IDc7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/liIfmjaLliLDnhKbngrnkuIrml7bvvIzlm77moIflj5jlpKfnmoTlpKflsI8gICDorr7orqHnsbvlnosxNiwxMywxMlxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmNoYW5nZVNpemUgPSBvYmouY2hhbmdlU2l6ZSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v56e75Yqo6YCJ5Lit5qGGaWQs5q2k6YCJ5Lit5qGG5piv5Luj56CB6Ieq5Yqo55Sf5oiQ55qE5YWD57Sg77yM5a+55bqU5pWI5p6c6YCJ5Lit5qGG5pS+5aSn5LiO5bmz56e75Yqo55S777yM5a+55bqUZm9jdXNUeXBl5Li6MTXmiJYxNlxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLnNlbGVjdGlvbklEID0gb2JqLnNlbGVjdGlvbklEIHx8ICdzZWxlY3Rpb25JRCc7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/np7vliqjpgInkuK3moYZpZO+8jOatpOmAieS4reahhuaYr+eUqOaIt+iHquW3seimgeWcqGh0bWzkuK3mjIflrprlhYPntKDnmoRpZO+8jOWvueW6lOaViOaenOaYr+W5s+enu+mAieS4reahhu+8jOS4jeWtmOWcqOaUvuWkp+WKqOeUu++8jOS4jnNlbGVjdEJvcmRlcklk55qE5Yy65Yir5bCx5piv5a6D5piv5o6n5Yi25L2N572u5rKh5pyJ5Yqo55S777yMc2VsZWN0aW9uT2JqSWTmmK/mjqfliLbkvY3nva7mnInliqjnlLvvvIzlr7nlupRmb2N1c1R5cGVJZOS4ujE3XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuc2VsZWN0aW9uT2JqSUQgPSBvYmouc2VsZWN0aW9uT2JqSUQgfHwgXCJzZWxlY3Rpb25PYmpJRFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWvueW6lOWxleekuuWbvueJh+eahOWxguasoeWkp+Wwj1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmZvY3VzSW1nWkluZGV4ID0gb2JqLmZvY3VzSW1nWkluZGV4IHx8IDk5ODtcclxuICAgICAgICAgICAgICAgICAgICAvLyDlr7nlupTnhKbngrnlhoXpg6jlm77niYfnmoTlsYLmrKHlpKflsI9cclxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5mb2N1c0ltZ1BhcmVudFpJbmRleCA9IG9iai5mb2N1c0ltZ1BhcmVudFpJbmRleCB8fCA5OTg7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5a+55bqU54Sm54K55YaF6YOo5Zu+54mH55qE5bGC5qyh5aSn5bCPXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuaW1nWkluZGV4ID0gb2JqLmltZ1pJbmRleCB8fCA5OTk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5a+55bqU54Sm54K55YaF6YOo5Zu+54mH55qE54i25YWD57Sg55qE5bGC5qyh5aSn5bCPXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuaW1nUGFyZW50WkluZGV4ID0gb2JqLmltZ1BhcmVudFpJbmRleCB8fCA5OTk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/nhKbngrnnmoTniLboioLngrnnmoRJROWAvCAgXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwudXBQYXJlbnRJZCA9IG9iai51cFBhcmVudElkO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v55So5oi35o6n5Yi25Y+v6KeC55yL5Yy65Z+f55qE5a655ZmoSUTlgLxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbC51cEFyZWFJZCA9IG9iai51cEFyZWFJZDtcclxuICAgICAgICAgICAgICAgICAgICAvL+aMieWPs+eEpueCueeahOeItuiKgueCueeahElE5YC8XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwucmlnaHRQYXJlbnRJZCA9IG9iai5yaWdodFBhcmVudElkO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5oyJ5Y+z55So5LqO5o6n5Yi25Y+v6KeC55yL5Yy65Z+f5a655Zmo55qESUTlgLxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5yaWdodEFyZWFJZCA9IG9iai5yaWdodEFyZWFJZDtcclxuICAgICAgICAgICAgICAgICAgICAvL+W8gOWQr+eItuWuueWZqOa7muWKqCzkuIrkuIvmu5rliqhcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5lblVwUGFyZW50Um9sbCA9IG9iai5lblVwUGFyZW50Um9sbCB8fCBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAvL+W8gOWQr+eItuWuueWZqOa7muWKqCzlt6blj7Pmu5rliqhcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5lblJpZ2h0UGFyZW50Um9sbCA9IG9iai5lblJpZ2h0UGFyZW50Um9sbCB8fCBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAvL+W8gOWQr+aVtOmhtea7muWKqFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmVuUmlnaHRQYWdlUm9sbCA9IG9iai5lblJpZ2h0UGFnZVJvbGwgfHwgZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lvZPliY3nhKbngrnntKLlvJVcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5mb2N1c0luZGV4ID0gb2JqLmZvY3VzSW5kZXggfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICAvL+W9k+WJjeeEpueCueWvueW6lOeahOW9k+WJjemhtVxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmZvY3VzQ3VyUGFnZU51bSA9IG9iai5mb2N1c0N1clBhZ2VOdW0gfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICAvL+W9k+WJjeeEpueCueWvueW6lOeahOaAu+mhteaVsFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmZvY3VzQWxsUGFnZU51bSA9IG9iai5mb2N1c0FsbFBhZ2VOdW0gfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICAvLy8v5b2T5YmN54Sm54K56ZyA6KaB5pW06aG15rua5Yqo55qEbGVmdOWAvFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmZvY3VzTGVmdFJvbGwgPSBvYmouZm9jdXNMZWZ0Um9sbCB8fCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5b2T5YmN54Sm54K55YiX6KGo5Lit56ys5LiA5Liq54Sm54K555qEbGVmdOWAvFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmZvY3VzRmlyc3RMZWZ0ID0gb2JqLmZvY3VzRmlyc3RMZWZ0IHx8IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lvZPliY3nhKbngrnlr7nlupTpobXnoIHnmoTmiYDmnInnhKbngrlpZCzor6XlgLzkuLrmlbDnu4Tlr7nosaFcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5mb2N1c1BhZ2VBbGxNb2RlbCA9IG9iai5mb2N1c1BhZ2VBbGxNb2RlbCB8fCBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWQjeensFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLm5hbWUgPSBvYmoubmFtZSB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICAvLyDmjIflrprnp7vliqjliLDnhKbngrnkuIrml7bvvIzmiafooYznmoTkuovku7ZcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5vbkZvY3VzRXZlbnQgPSBvYmoub25Gb2N1c0V2ZW50IHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOaMh+WumuWkseWOu+eEpueCueaXtu+8jOaJp+ihjOeahOS6i+S7tlxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLm9uQmx1ckV2ZW50ID0gb2JqLm9uQmx1ckV2ZW50IHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOaMh+Wumuenu+WKqOi+ueahhueahOmAn+W6plxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLnR3ZWVuU3BlZWQgPSBvYmoudHdlZW5TcGVlZCB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICAvLyBmb2N1c1R5cGXkuLoxMOeahOaXtuWAmemcgOimgeeahOmAieS4reahhmlkXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuc2VsZWN0Qm9yZGVySWQgPSBvYmouc2VsZWN0Qm9yZGVySWQgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/ku6Pmm7/pu5jorqTojrflj5bnhKbngrnml7bnmoTooYzkuLpcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5vbkZvY3VzXyA9IG9iai5vbkZvY3VzXyB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICAvL+S7o+abv+m7mOiupOWkseWOu+eEpueCueaXtueahOihjOS4ulxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLm9uQmx1cl8gPSBvYmoub25CbHVyXyB8fCAnJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKuaWueWQkeWIneWni+WMlioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaXJlZGVtcCA9IG5ldyBpcHR2LkRpcmUoKTtcclxuICAgICAgICAgICAgICAgICAgICBkaXJlZGVtcC5vdGhlciA9IG9iai5vdGhlciB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICBkaXJlZGVtcC5vdGhlckV2ZW50ID0gb2JqLm90aGVyRXZlbnQgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWRlbXAubGVmdCA9IG9iai5sZWZ0IHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVkZW1wLnJpZ2h0ID0gb2JqLnJpZ2h0IHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVkZW1wLnVwID0gb2JqLnVwIHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVkZW1wLmRvd24gPSBvYmouZG93biB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICBkaXJlZGVtcC51cEV2ZW50ID0gb2JqLnVwRXZlbnQgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWRlbXAuZG93bkV2ZW50ID0gb2JqLmRvd25FdmVudCB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICBkaXJlZGVtcC5sZWZ0RXZlbnQgPSBvYmoubGVmdEV2ZW50IHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVkZW1wLnJpZ2h0RXZlbnQgPSBvYmoucmlnaHRFdmVudCB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICBkaXJlZGVtcC51cE90aGVyID0gb2JqLnVwT3RoZXIgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWRlbXAuZG93bk90aGVyID0gb2JqLmRvd25PdGhlciB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICBkaXJlZGVtcC5sZWZ0T3RoZXIgPSBvYmoubGVmdE90aGVyIHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVkZW1wLnJpZ2h0T3RoZXIgPSBvYmoucmlnaHRPdGhlciB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICBkaXJlZGVtcC51cE90aGVyRXZlbnQgPSBvYmoudXBPdGhlckV2ZW50IHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVkZW1wLnJpZ2h0T3RoZXJFdmVudCA9IG9iai5yaWdodE90aGVyRXZlbnQgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWRlbXAuZG93bk90aGVyRXZlbnQgPSBvYmouZG93bk90aGVyRXZlbnQgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWRlbXAubGVmdE90aGVyRXZlbnQgPSBvYmoubGVmdE90aGVyRXZlbnQgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWRlbXAucmlnaHROb0V2ZW50ID0gb2JqLnJpZ2h0Tm9FdmVudCB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICBkaXJlZGVtcC5yaWdodE5vID0gb2JqLnJpZ2h0Tm8gfHwgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWRlbXAubGVmdE5vRXZlbnQgPSBvYmoubGVmdE5vRXZlbnQgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWRlbXAubGVmdE5vID0gb2JqLmxlZnRObyB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICBkaXJlZGVtcC5kb3duTm9FdmVudCA9IG9iai5kb3duTm9FdmVudCB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICBkaXJlZGVtcC5kb3duTm8gPSBvYmouZG93bk5vIHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVkZW1wLnVwTm9FdmVudCA9IG9iai51cE5vRXZlbnQgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWRlbXAudXBObyA9IG9iai51cE5vIHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvY3VzRGlyZXNbaWRdID0gZGlyZWRlbXA7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuZGllQXJyID0gZGlyZWRlbXA7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL+ivpeaMiemSruW3sue7j+mAmui/h+WIneWni+WMluW3peS9nFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmlzQ3JlYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwubm9kZU9iaiA9IGRvbU9iajtcclxuICAgICAgICAgICAgICAgICAgICBkb21PYmouZm9jdXNPYmogPSBtb2RlbDtcclxuICAgICAgICAgICAgICAgICAgICBmb2N1c0NvbGxlY3Rpb25baWRdID0gZG9tT2JqO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmb2N1c0lkID8gaXB0dihcIiNcIitmb2N1c0lkKSA6IHRoaXNfIDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiwg+eUqOeEpueCueiOt+WPlueEpueCueaWueazlVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtvbkZvY3VzfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uRm9jdXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGZvY3VzT2JqID0gdGhpcy5nZXRGb2N1cygpO1xyXG4gICAgICAgICAgICBpZiAoZm9jdXNPYmopIHtcclxuICAgICAgICAgICAgICAgIGZvY3VzT2JqLm9uRm9jdXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL+WjsOaYjuaMiemUruWMv+WQjeWHveaVsFxyXG4gICAgdmFyIGtleURvd25FdmVudGZ1bmN0aW9uID0gZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgIHZhciBrZXlDb2RlID0gaXB0di5rZXlDb2RlKGV2dCk7XHJcbiAgICAgICAgdmFyIGtleU5hbWUgPSBpcHR2LmtleS5nZXRLZXlDb2RlTmFtZShrZXlDb2RlKTtcclxuICAgICAgICBpZiAoa2V5Q29kZSA9PSAweDAzMDApIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHZhciBtc2dFdmVudCA9IFV0aWxpdHkuZ2V0RXZlbnQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChpcHR2LmlzTm90TnVsbChtc2dFdmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbXNnID0gZXZhbChcIihcIiArIG1zZ0V2ZW50ICsgXCIpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtc2cgIT0gbnVsbCAmJiBtc2cudHlwZSA9PSBcIkVWRU5UX01FRElBX0VORFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpcHR2KFwiI2l2aWRlb3NcIilbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlwdHYoXCIjaXZpZGVvc1wiKS5zcmMoaXB0di52aWRlb1VybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKGtleU5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIk9LXCIgOlxyXG4gICAgICAgICAgICAgICAgaXB0di5rZXkuY3VyRm9jdXMub25DbGljaygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJPTkVcIiA6XHJcbiAgICAgICAgICAgIGNhc2UgXCJUV09cIiA6XHJcbiAgICAgICAgICAgIGNhc2UgXCJUSFJFRVwiIDpcclxuICAgICAgICAgICAgY2FzZSBcIkZPVVJcIiA6XHJcbiAgICAgICAgICAgIGNhc2UgXCJGSVZFXCIgOlxyXG4gICAgICAgICAgICBjYXNlIFwiU0lYXCIgOlxyXG4gICAgICAgICAgICBjYXNlIFwiU0VWRU5cIiA6XHJcbiAgICAgICAgICAgIGNhc2UgXCJFSUdIVFwiIDpcclxuICAgICAgICAgICAgY2FzZSBcIk5JTkVcIiA6XHJcbiAgICAgICAgICAgIGNhc2UgXCJaRVJPXCIgOlxyXG4gICAgICAgICAgICBjYXNlIFwiREVMXCIgOlxyXG4gICAgICAgICAgICAgICAgaXB0di5rZXkubnVtQ2hhbmdlKGtleU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJMRUZUXCIgOlxyXG4gICAgICAgICAgICBjYXNlIFwiUklHSFRcIiA6XHJcbiAgICAgICAgICAgIGNhc2UgXCJVUFwiIDpcclxuICAgICAgICAgICAgY2FzZSBcIkRPV05cIiA6XHJcbiAgICAgICAgICAgICAgICBpcHR2LmtleS5mb2N1c0hhbmQoa2V5TmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiSE9NRV9QQUdFXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJPVVRfUEFHRVwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiQkFDS1wiIDpcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXB0di5pc0Z1bmN0aW9uKGlwdHYua2V5LmJhY2tmdW5jKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlwdHYua2V5LmJhY2tmdW5jKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8v5re75Yqg5oyJ6ZSu5LqL5Lu2XHJcbiAgICBpcHR2KGRvY3VtZW50KS5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBrZXlEb3duRXZlbnRmdW5jdGlvbik7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgbW9kdWxlICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gaXB0djtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XHJcbiAgICAgICAgICAgIGRlZmluZShcImlwdHZcIiwgW10sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpcHR2O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHdpbmRvdy5kb2N1bWVudCA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgIHdpbmRvdy5pcHR2ID0gd2luZG93LiQgPSBpcHR2O1xyXG4gICAgfVxyXG5cclxufSkod2luZG93LCBpcHR2KTsiXSwic291cmNlUm9vdCI6IiJ9