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
        core_version = '1.0.3',
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
        //匹配空格或者空白字符
        rnothtmlwhite = /[^\x20\t\r\n\f]+/g,
        // 匹配 -ms- 前缀
        ///^-ms-/,
        rmsPrefix = /^(-ms-)|(-webkit-)|(-moz-)|(-o-)|(-khtml-)/,
        // [\da-z] 表示任意英文字母或者数字
        rdashAlpha = /-([\da-z])/gi,
        // 匹配大写字母
        rmultiDash = /([A-Z])/g,
        // 匹配 json字符串{任意字符*} 或者 [任意字符*]
        rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        rvalidchars = /^[\],:{}\s]*$/,
        rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
        rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
        fcamelCase = function (all, letter) {
            return letter.toUpperCase();
        },
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
            // 如果传入的参数为空，则直接返回that
            var that = this;
            if (!selector) {
                return that;
            }
            var match;
            if (typeof selector == "string") {
                match = quickExpr.exec(selector);
                //处理id DOM
                if (match && match[1] === "#") {
                    var ele = document.getElementById(match[2]);
                    that[0] = ele;
                    that.length = 1;
                    that.selector = match[0];
                    that.id = match[2];
                } else if (match && match[1] === ".") {
                    var eles = document.getElementsByClassName(match[2]) || [];
                    iptv.each(eles, function (index, value) {
                        that[index] = value;
                    });
                    that.length = eles.length;
                    that.selector = match[0];
                } else if (selector === "body") {
                    that[0] = document.body || document.getElementsByName(selector);
                    that.selector = selector;
                }
                that.context = document;
                return that;
            } else if (selector.nodeType == 1) {
                that.context = that[0] = selector;
                that.length = 1;
                return that;
            } else if (iptv.isFunction(selector)) {
                return iptv.ready(selector);
            }

            //匹配选择器里嵌套了一个选择器
            // $($('#container')) 相当于 $('#container')
            if (selector.selector && selector.context) {
                return iptv(selector.selector, selector.context);
            }

            //匹配选择器里嵌套了一个没有selector属性的iptv对象
            //$($(dom)) 相当于 $(dom)
            if (selector[0] && selector.context) {
                return iptv(selector[0]);
            }

            if (iptv.type(selector) === "object") {
                that.context = that[0] = selector;
                that.length = 1;
                return that;
            }

            if (iptv.type(selector) === "array") {
                that.context = selector;
                that.length = 0;
                iptv.merge(that, selector);
                return that;
            }
            return that;
        },
        /**
         * 当前操作的上下文对象
         */
        context: null,
        /**
         * 当前的选择器
         */
        selector: "",
        /**
         * 将 iptv 对象转换成数组类型，这里返回的结果就真的是 Array 类型了
         * 相当于 Array.prototype.slice.call(this)
         * @returns {*}
         */
        toArray: function () {
            return core_slice.call(this);
        },
        /**
         * 如果 num 不为 null ，将返回索引为 num 的元素
         * （否则）返回索引为 num 的 jQuery 对象
         * 当 num 为负数的时候，相当于从数组尾巴倒数索引
         * @param num int
         * @returns {*}
         */
        get: function (num) {
            return num == null ?
                this.toArray() :
                // 负数即是可以反向选取
                (num < 0 ? this[this.length + num] : this[num]);
        },
        /**
         * 遍历当前数组对象，iptv.length>0时，说明可以遍历
         * @param callback
         * @param args
         * @returns {*}
         */
        each: function (callback, args) {
            return iptv.each(this, callback, args);
        },
        push: core_push,
        sort: [].sort,
        splice: [].splice

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
        noop: function () {
        },
        /**
         * 随机数
         */
        expando: "iptv" + (core_version + Math.random()).replace(/\D/g, ""),
        // 驼峰表示法 例如将 iptv.camelCase("-webkit-font-size"); 变为 "webkitFontSize"
        // 在很多需要兼容 IE 的地方用得上，例如 IE678 获取 CSS 样式的时候，使用
        // element.currentStyle.getAttribute(camelCase(style)) 传入的参数必须是驼峰表示法
        camelCase: function (string) {
            return string.replace(rmsPrefix, function ($0) {
                //处理浏览器前缀
                return $0.replace(/-/g, "") + "-";
            }).replace(rdashAlpha, fcamelCase);
        },
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
         * 字符串首字母大写
         * @param text
         * @returns {*|string|XML|void}
         */
        firstCase: function (text) {
            return text && text.replace(text.substring(0, 1), text.substring(0, 1).toUpperCase());
        },
        urlDelParam: function (url_, key) {
            if (!url_)return "";
            var pattern = "";
            pattern = eval('/[&]*(?:' + encodeURIComponent(key) + '=[^&]*)/');
            if (pattern.test(url_)) url_ = url_.replace(pattern, '');
            return url_;
        },
        /**
         * url追加或者替换值
         */
        urlDispose: function (url_, obj_) {
            if (!url_)return "";
            if (!obj_ || typeof obj_ !== "object")return url_;
            var pattern = "",
                replaceText = "",
                ex = /\?/.test(url_),
                uri = ex ? url_.replace(/.*\?/, '') : '',
                host = ex ? url_.replace(/\?.*/, '') : url_;
            for (var key in obj_) {
                //在这里为什么没有判断obj_[key]如果是空值，就不进行追加或替换呢？因为某些时候，原地址中存在莫值，需要替换为空值，所以没有加此判断
                pattern = eval('/[&]*(?:' + encodeURIComponent(key) + '=[^&]*)/');
                replaceText = encodeURIComponent(key) + '=' + encodeURIComponent(obj_[key]);
                if (pattern.test(uri)) uri = uri.replace(pattern, '');
                uri += "&" + replaceText;
            }
            url_ = uri ? host + '?' + uri.replace(/^&/, '') : host;
            return url_;
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
         *  把数组每一项经过callback处理后的值依次加入到返回数组中
         *  iptv.map(["a","b","c"],function(value,index,arg){
         *      return arg+value;
         *  },"Q");
         *  返回值[ "Qa", "Qb", "Qc" ]
         * @param elems
         * @param callback
         * @param arg
         * @returns {*}
         */
        map: function (elems, callback, arg) {
            var value,
                i = 0,
                length = elems.length,
                isArray = iptv.isArraylike(elems),
                ret = [];
            // 如果传入的 elems 是数组
            if (isArray) {
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret[ret.length] = value;
                    }
                }
                // 如果传入的 elems 是对象
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret[ret.length] = value;
                    }
                }
            }
            // 这里相当于 var a = [];a.concat(ret)
            return core_concat.apply([], ret);
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
         * 求两个数之间的随机数，include为真时包含最大数，默认不包含最大数
         * @param Min
         * @param Max
         * @returns {*}
         */
        rangeNum: function (Min, Max, include) {
            include = include ? 1 : 0;
            var num = Min + Math.floor(Math.random() * (Max - Min + include));
            return num;
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
        /*runTimeInterval: setInterval(function () {
         if (iptv.serverTimestamp != undefined && iptv.serverTimestamp != null && iptv.serverTimestamp != '') {
         iptv.serverTimestamp = parseInt(iptv.serverTimestamp) + 1000;
         } else {
         iptv.serverTimestamp = (new Date()).getTime();
         }
         }, 1000),*/
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
            //var exp2 = iptv.getServerDate();
            var exp2 = new Date();
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
            var arr = document.cookie.match(new RegExp("(^| |;)" + name + "=([^;]*)(;|$)"));
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
            //var exp = iptv.getServerDate();
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var path_ = "";
            document.cookie = name + "=" + null + ";expires=" + exp.toGMTString() + ";path=/" + path_ + ";";
        },
        /**
         * 获取URL请求值
         * @param d url key值
         * @returns {*}
         */
        requestValue: function (d, url, defaultValue) {
            var b = url || window.location.href;
            var f = b.indexOf("?");
            var e = b.substr(f + 1);
            var c = e.split("&");
            defaultValue = defaultValue == undefined ? "" : defaultValue;
            for (var a = 0; a < c.length; a++) {
                var g = c[a].split("=");
                if (g[0].toUpperCase() == d.toUpperCase()) {
                    return g[1];
                }
            }
            return defaultValue;
        },
        show: function (id) {
            return iptv("#" + id).show();
        },
        hide: function (id) {
            return iptv("#" + id).hide();
        },
        html: function (id, html) {
            return iptv("#" + id).html(html);
        },
        addClass: function (id, className) {
            return iptv("#" + id).addClass(className);
        },
        removeClass: function (id, className) {
            return iptv("#" + id).removeClass(className);
        },
        // 解析 JSON 字符串
        parseJSON: function (data) {
            if (window.JSON && window.JSON.parse) {
                return window.JSON.parse(data);
            }

            if (data === null) {
                return data;
            }

            if (typeof data === "string") {

                data = iptv.trim(data);
                if (data) {
                    if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) {
                        return (new Function("return " + data))();
                    }
                }
            }
            iptv.error("Invalid JSON: " + data);
        },
        parseXML: function (data) {
            var xml, tmp;
            if (!data || typeof data !== "string") {
                return null;
            }
            try {
                if (window.DOMParser) { // Standard
                    tmp = new DOMParser();
                    xml = tmp.parseFromString(data, "text/xml");
                } else { // IE
                    xml = new ActiveXObject("Microsoft.XMLDOM");
                    xml.async = "false";
                    xml.loadXML(data);
                }
            } catch (e) {
                xml = undefined;
            }
            if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
                iptv.error("Invalid XML: " + data);
            }
            return xml;
        },
        parseDOM: function (data) {
            var xmlDoc, parser;
            if (!data || typeof data !== "string") {
                return null;
            }
            try {//IE
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = "false";
                xmlDoc.loadXML(data);
                return xmlDoc;
            }
            catch (e) {
                try //Firefox, Mozilla, Opera, etc.
                {
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(data, "text/xml");
                    return xmlDoc;
                }
                catch (e) {
                    iptv.error("Invalid DOM: " + data);
                }
            }
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
                if (html !== undefined) {
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
         * 设置只能设置style样式
         * @param name
         * @param value
         */
        attr: function (name, value) {
            if (name != null && value === undefined) {
                return iptv(this).getStyle(name);
            } else if (name != null && value != undefined) {
                return iptv.style(this, name, value);
            }

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
        addEventListener: function (types, func) {
            if (!this[0]) {
                return this;
            }
            types = ( types || "" ).match(rnothtmlwhite) || [""];
            var t = types.length;
            while (t--) {
                if (this[0].addEventListener) {
                    //监听IE9，谷歌和火狐 
                    this[0].addEventListener(types[t], func, false);
                } else if (this[0].attachEvent) {
                    this[0].attachEvent("on" + types[t], func);
                } else {
                    this[0]["on" + types[t]] = func;
                }
            }
            return this;
        },
        /**
         * 移除事件
         * @param target
         * @param type
         * @param func
         */
        removeEventListener: function (types, func) {
            if (!this[0]) {
                return this;
            }
            types = ( types || "" ).match(rnothtmlwhite) || [""];
            var t = types.length;
            while (t--) {
                if (this[0].removeEventListener) {
                    //监听IE9，谷歌和火狐 
                    this[0].removeEventListener(types[t], func, false);
                } else if (this[0].detachEvent) {
                    this[0].detachEvent("on" + types[t], func);
                } else {
                    delete target["on" + types[t]];
                }
            }
            return this;
        },
        /**
         * 添加事件，事件只执行一次
         * @param types 事件名称，支持多个事件同时添加，例如 webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend
         * @param func
         * @returns {one}
         */
        one: function (types, func) {
            if (!this[0]) {
                return this;
            }
            types = ( types || "" ).match(rnothtmlwhite) || [""];
            var t = types.length,
                this_ = this;
            while (t--) {
                //事件触发时，执行如下回到方法
                var callBack = (function (obj, type, func) {
                    return function () {
                        //当事件触发后，此时才调用用户的回调函数
                        func && func.apply(obj, arguments);
                        //控制只执行一次事件，事件执行一次后，通过移除事件来做到只执行一次
                        arguments && arguments.callee && obj.removeEventListener(type, arguments.callee);
                    };
                })(this_, types[t], func);
                this.addEventListener(types[t], callBack);
            }
            return this;
        },
        //设置css样式
        setCss: function (key, value) {
            var that = this;
            if (!this[0] || arguments.length == 0) {
                return that;
            }
            //是对象，批量设置
            if (typeof key === "object") {
                iptv.each(key, function (key, value) {
                    that[0].style[iptv.camelCase(key)] = value;
                });
                return that;
            }
            //单个设置
            if (key != undefined && value != undefined) {
                that[0].style[iptv.camelCase(key)] = value;
            }
            return that;
        },
        /**
         * 设置css3样式
         * @param objAttr
         */
        setCss3: function (objAttr) {
            //循环属性对象
            for (var i in objAttr) {
                this.setCss("-webkit-"+i,objAttr[i]);
                this.setCss("-moz-"+i,objAttr[i]);
                this.setCss("-o-"+i,objAttr[i]);
                this.setCss("-ms-"+i,objAttr[i]);
                this.setCss("-khtml-"+i,objAttr[i]);
            }
            return this;
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
        },
        /**
         * 获取所有样式
         * @param name
         * @returns {*}
         */
        getStyle: function (name) {
            if (!name || !this[0]) {
                return this;
            }
            var style = this[0].currentStyle ? this[0].currentStyle : window.getComputedStyle(this[0], null);
            var value = style[style.getPropertyValue ? 'getPropertyValue' : 'getAttribute'](name);
            if (!value && this[0].getAttribute) {
                value = this.getAttr(name);
            }
            return value;
        },
        setAttr: function (name, value) {
            if (!name || !this[0]) {
                return this;
            }
            this[0].setAttribute && this[0].setAttribute(name, value);
            return this;
        },
        getAttr: function (name) {
            if (!name || !this[0]) {
                return this;
            }
            return this[0].getAttribute && this[0].getAttribute(name);
        },
        remove: function () {
            if (!this[0]) {
                return this;
            }
            //移除缓存数据
            iptv.removeData(this[0]);
            this[0].parentNode && this[0].parentNode.removeChild(this[0]);
            return this;
        },
        width: function (width) {
            if (!this[0]) {
                return this;
            }
            //没有传值，返回宽度
            if(width === undefined){
                width = this.getStyle("width");
                return width && parseInt(width);
            }
            //有传值，设置宽度
            return iptv.style(this, "width", width+"px");
        },
        height: function (height) {
            if (!this[0]) {
                return this;
            }
            //没有传值，返回高度
            if(height === undefined){
                height = this.getStyle("height");
                return height && parseInt(height);
            }
            //有传值，设置高度
            return iptv.style(this, "height", height+"px");
        }
    });


    // 检查数据缓存对象是否为空
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) {
            //如果name等于data,并且obj["data"]是一个空对象，就跳到下个循环
            if (name === "data" && iptv.isEmptyObject(obj[name])) {
                continue;
            }
            //如果name不等于toJSON返回不是空对象
            if (name !== "toJSON") {
                return false;
            }
        }

        return true;
    }

    // 数据存取方法  （pvt 表示此方法仅在内部使用）
    function internalData(elem, name, data, pvt) {
        var ret,
            thisCache,
            internalKey = iptv.expando,
            isNode = elem.nodeType,
            cache = isNode ? iptv.cache : elem,
            //如果是dom，取dom内的id值
            //如果不是dom,取js对象的internalKey值
            id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
        //如果是读取数据,数据不存在，直接return，满足数据不存在有以下几种情况
        //id为null
        //全局cache 或者 dom cache缓存不存在
        //不是内部数据，而是外部自定义的数据cache[id].data没有值
        if ((!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string") {
            return;
        }
        //如果是存储数据,id不存在
        if (!id) {
            // 只有当 elem 是 DOM 结点的时候，需要添加一个唯一的 ID
            if (isNode) {
                // iptv.guid 全局计数器
                // 对于 DOM 结点，iptv.uuid 会自加 1，并附加到 DOM 元素上
                id = elem[internalKey] = iptv.guid++;
                // 不是 DOM 结点，是 JS 对象的话直接使用 internalKey
            } else {
                id = internalKey;
            }
        }

        // 如果是存储数据 或者 读取数据，cache[id]没有数据的话，初始化一下数据
        // 如果 cache[id] 不存在
        if (!cache[id]) {
            // 对于 DOM 如果数据缓存对象不存在，则初始化为空对象 {}
            // 对于 JS 对象，设置方法 toJSON 为空函数，以避免在执行 JSON.stringify() 时暴露缓存数据
            // 如果一个对象定义了方法 toJSON(), JSON.stringify() 在序列化该对象时会调用这个方法来生成该对象的 JSON 元素
            cache[id] = isNode ? {} : {
                toJSON: iptv.noop
            };
        }

        //如果是存储数据
        //如果参数 name 是对象，则批量设置数据，也就是说将name的属性名作为key，属性值作为value，进行存储
        if (typeof name === "object" || typeof name === "function") {
            // pvt 表示方法使用于内部
            if (pvt) {
                // 对于内部数据，把参数 name 中的属性合并到 cache[id] 中
                cache[id] = iptv.extend(cache[id], name);
            } else {
                // 对于自定义数据，把参数 name 中的属性合并到 cache[id].data 中
                cache[id].data = iptv.extend(cache[id].data, name);
            }
        }

        // 这是缓存后的数据
        thisCache = cache[id];

        //如果是外部用户定义数据
        // 为了区分内部使用的数据和用户定义的数据，jQuery 将内部使用的数据直接存储在 cache[id] 里面，而用户定义的数据则存储在 cache[id].data 中
        // 如果是自定义数据 则将 thisCache 变量指向到 .data 对象中,如果为空则创建一个空对象
        // 这里是个重点，很简单的代码，这里改变了将数据存储的位置
        if (!pvt) {
            //如果用户定义数据不存在，这里进行初始化
            if (!thisCache.data) {
                thisCache.data = {};
            }
            //将用户定义的数据覆盖thisCache，因为如果这里不覆盖的话，thisCache可能是内部数据，可能是外部数据
            thisCache = thisCache.data;
        }

        //如果是存储数据
        // 如果 data 不为空，设置键值对 key - value
        if (typeof name === "string" && data !== undefined) {
            // camelCase 驼峰表示法
            thisCache[iptv.camelCase(name)] = data;
        }

        // 如果参数 name 是 "string" 类型，则读取单个数据
        // 就是获取返回值了 internalData(elem,'key')
        if (typeof name === "string") {
            // 先尝试读取参数 name 对应的数据
            ret = thisCache[name];
            // 如果未取到，则把参数 name 转换为驼峰式再次尝试读取对应的数据
            if (ret == null) {
                // camelCased -- 将 name 变为驼峰表示法
                ret = thisCache[iptv.camelCase(name)];
            }
        } else {
            // 如果未传入参数 name , data ,则返回数据缓存对象
            ret = thisCache;
        }
        // 返回 ret 对象
        return ret;
    }

    // 数据对象的移除 （pvt 表示此方法仅在内部使用）
    function internalRemoveData(elem, name, pvt) {
        var thisCache, i,
            // 元素的 nodeType
            isNode = elem.nodeType,
            // 只有 DOM 元素需要全局的 iptv 缓存 cache，
            // 而如果是 JS 对象，则直接将数据保存在这个对象上
            cache = isNode ? iptv.cache : elem,
            // 添加的对象的 key 值，根据元素 elem 的 nodeType 判断
            // 如果是 Dom 元素，为 elem[internalKey]
            // 如果是 JS 对象，elem[internalKey] 存在则使用 internalKey ，反之，为 elem[internalKey]
            id = isNode ? elem[iptv.expando] : iptv.expando;
        // 如果没有数据那也就不用删除了
        if (!cache[id]) {
            return;
        }

        // cache[id] != false
        // 有数据存在
        if (name) {
            // 缓存的位置，指向私有对象还是指向用户自定义的 data
            thisCache = pvt ? cache[id] : cache[id].data;
            // 有数据
            if (thisCache) {
                // 非数组
                if (!iptv.isArray(name)) {
                    // 不是数组的话 则单独进行匹配删除
                    if (name in thisCache) {
                        name = [name];
                    } else {
                        // 进行一次驼峰命名转换
                        name = iptv.camelCase(name);
                        // 如果进行了驼峰命名转换的 name 存在于 thisCache中
                        if (name in thisCache) {
                            // 转化为数组形式
                            name = [name];
                        } else {
                            // 没找到，使用空格分隔 name，也是转化为数组形式
                            name = name.split(" ");
                        }
                    }
                    // 如果是数组
                } else {
                    //把数组每一项的name值，进行驼峰修改后，拼接成新数组
                    name = name.concat(iptv.map(name, iptv.camelCase));
                }

                // 经过上面的处理我们看到 iptv 兼容了很多形式上的参数
                // [key1,key2] "key1 key2" "key1" "key1-name"
                // 上边的一顿整理，到了这里都是一个数组，执行删除操作
                // 遍历删除
                i = name.length;
                while (i--) {
                    delete thisCache[name[i]];
                }
                // isEmptyDataObject 检测的是 JS 数据对象是否为空
                // isEmptyObject 检测一个普通对象是否是空对象
                // 如果数据对象中还有剩余数据则函数执行完毕，return 返回
                if (pvt ? !isEmptyDataObject(thisCache) : !iptv.isEmptyObject(thisCache)) {
                    return;
                }
            }
        }

        // 代码执行到这里的时候有两种情况：
        // 1.没有传name参数，意味着要删除所有数据
        // 2.按照传递的name参数删除后,没有数据了
        // 如果所有数据都被删除完了，那么就直接将缓存数据清空
        if (!pvt) {
            //删除 cache[id].data
            delete cache[id].data;
            // 删除后检测到数据缓存对象还有剩余数据则返回
            if (!isEmptyDataObject(cache[id])) {
                return;
            }
        }

        //如果内部数据都删除完了，直接将缓存数据清空
        cache[id] = null;
    }

    // 这里函数是用来解析 elem 元素身上的 html 标签 "data-" 的值
    // 如果传入的 data 对象有值的话,则直接返回不进行解析
    function dataAttr(elem, key, data) {
        // 如果传入的 data 为空且 elem 是 DOM 元素，说明全局缓存中，没有存储key对应的值
        if (data === undefined && elem.nodeType === 1) {

            // rmultiDash = /([A-Z])/g -- 匹配大写字母
            // key.replace(rmultiDash, "-$1").toLowerCase() 的意思是将驼峰表示法转化为斜杠表示，即 fontSzie --> font-size
            // 键名转换，这里的意思是将传入的 name 统一转化为 data-xxx-xxx 的形式
            //$1代表取匹配到的字符，-$1代表匹配到的字符前面加上'-'符号
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();

            // 查找是否有该属性
            data = elem.getAttribute(name);

            // 找到了，且类型是 String,所以需要将字符串的值转换为对应的对象
            if (typeof data === "string") {
                try {
                    data = data === "true" ? true :
                        data === "false" ? false :
                            data === "null" ? null :
                                +data + "" === data ? +data :
                                    rbrace.test(data) ? iptv.parseJSON(data) : data;
                } catch (e) {
                }

                //同时将data-xxx存储在dom上面的数据，存储到全局缓存中
                iptv.data(elem, key, data);
            } else {
                //如果没有值，返回undefined
                data = undefined;
            }
        }
        // 返回结果
        return data;
    }

    //新增全局数据存储
    iptv.extend({
        /**
         * 全局计数器
         */
        guid: 1,
        /**
         * 全局的缓存对象
         */
        cache: {},
        /**
         * 检查对象是否已经存储了数据
         * @param elem
         * @returns {boolean}
         */
        hasData: function (elem) {
            elem = elem.nodeType ? iptv.cache[elem[iptv.expando]] : elem[iptv.expando];
            return !!elem && !isEmptyDataObject(elem);
        },
        /**
         * 给 elem（可是DOM，可以是JS对象）添加 key-value 为 name-data 的数据
         * @param elem
         * @param name
         * @param data
         * @returns {*}
         */
        data: function (elem, name, data) {
            return internalData(elem, name, data);
        },
        /**
         * 移除 elem（可以是DOM，可以是JS对象）上
         * @param elem
         * @param name
         * @returns {*}
         */
        removeData: function (elem, name) {
            return internalRemoveData(elem, name);
        },
        // 添加或读取一个仅供内部使用的数据
        _data: function (elem, name, data) {
            return internalData(elem, name, data, true);
        },
        // 删除内部使用的数据数据
        _removeData: function (elem, name) {
            return internalRemoveData(elem, name, true);
        }
    });

    //所有iptv对象添加数据存储
    iptv.fn.extend({
        /**
         * 获取或者存储数据
         */
        data: function (key, value) {
            var attrs, name,
                data = null,
                i = 0,
                elem = this[0];
            //如果key是undefined，说明调用方式为iptv("#xx").data()
            //所以如下流程为，获取该对象在全局缓存中的所有数据，以及包括elem节点上data-xxx存储的数据
            //如果elem节点存在data-xxx类型的数据，同时将这些数据缓存到全局缓存中
            if (key === undefined) {
                if (this.length) {
                    data = iptv.data(elem);
                    //如果elem是DOM元素，同时，该DOM元素没有被转换过data-xxx数据，
                    if (elem.nodeType === 1 && !iptv._data(elem, "parsedAttrs")) {
                        // 拿到 dom 元素的属性列表
                        attrs = elem.attributes;
                        // 遍历
                        for (; i < attrs.length; i++) {
                            // name为属性名
                            name = attrs[i].name;
                            // 先尝试是否有命名为 data-xxxx 的数据
                            if (name.indexOf("data-") === 0) {
                                // 取 data-xxxx 后面的 xxxx，即是
                                // <div data-idName="123"></div> 取其属性 "data-idName" 其中的 idName
                                name = iptv.camelCase(name.slice(5));

                                // 通过 dataAttr 解析 elem 元素身上的 html 标签 "data-" 的值
                                //通过elem元素身上的"data-xxx"得到key值，去全局缓存中取值data[name],如果data[name]得到的值为null的话（说明全局缓存中不存在）,那么最后再去取elem元素上的值
                                //如果全局缓存中不存在name对于的值，同时，在elem元素身上获取到了name对应的值，最终，将name与对应的值，缓存到全局缓存汇总
                                dataAttr(elem, name, data[name]);
                            }
                        }
                        //标记elem元素已经转换过数据
                        iptv._data(elem, "parsedAttrs", true);
                    }
                }
                return data;
            }

            // 方法走到这里，说明传入了至少一个参数
            //如果key是一个对象，将此对象下的属性名作为key，属性值作为value存储起来
            if (typeof key === "object") {
                //这里使用each,意思就是说，当前iptv对象下有几个dom对象，就分别给这几个对象进行批量存储
                return this.each(function () {
                    iptv.data(this, key);
                });
            }

            // 返回结果
            return arguments.length > 1 ?

                // 参数大于一个，那么必然是设置 key-value
                // 设置单个 key
                this.each(function () {
                    iptv.data(this, key, value);
                }) :
                // 参数为一个，那么就是获取数据 key,获取数据的话，只能获取数组第一个dom的属性
                // 首先应该尝试内部 jQuery.data 是有值，再解析 elem 元素身上的 html 标签 "data-" 的值
                // 因为 dataAttr(elem, key, data) 里，如果 data !== undefined 是直接返回 data的
                elem ? dataAttr(elem, key, iptv.data(elem, key)) : null;
        },
        // 移除自定义数据
        removeData: function (key) {
            return this.each(function () {
                iptv.removeData(this, key);
            });
        }
    });

    //加入outHeight，outWidth,innerHeight,innnerWidth
    iptv.each(["Height", "Width"], function (i, name) {
        var tl = i ? "left" : "top",
            br = i ? "right" : "bottom";

        // innerHeight and innerWidth内部宽高
        iptv.fn["inner" + name] = function () {
            if (!this[0]) {
                return null;
            }
            //元素内部高度=padding-top + height + padding-bottom
            return this[name.toLowerCase()]() + parseInt(this.getStyle("padding-"+tl)) + parseInt(this.getStyle("padding-"+br));
        };

        // outerHeight and outerWidth外部宽高
        //margin 等于true:把margin算进去，等于false不算margin
        iptv.fn["outer" + name] = function (margin) {
            if (!this[0]) {
                return null;
            }
            //元素外部高度=padding-top + height + padding-bottom + border-top-width + border-bottom-width
            return this["inner" + name]() + parseInt(this.getStyle("border-"+tl+"-width")) + parseInt(this.getStyle("border-"+br+"-width")) + (margin ? (parseInt(this.getStyle("margin-"+tl)) + parseInt(this.getStyle("margin-"+br))) : 0);
        };

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
                if (iptv.isNull(obj.data[key])) {
                    continue;
                }
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
                            window.location.href = iptv.config.ErrorLoginFailUrl;
                        } else if (responseObj == null || responseObj == "" || responseObj.code == null) {
                            window.location.href = iptv.config.ErrorServerFailUrl;
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
})(window);

(function (window, iptv) {
    if (!iptv) {
        console.error("缺少iptv核心库文件");
        return;
    }

    var ready = {
        //全局配置
        config: {
            skin: 'iptv-dialogs',
            shade: 0.3,//遮罩层,
            winWidth:1280,
            winHeight:720
        },
        //用于缓存所有关闭回调函数
        end: {},
        //所有弹框类型
        type: ["info","tips","page"],
        //用于缓存所有弹框对象
        dialogs:{},
        anim: ['iptv-anim-00', 'iptv-anim-01', 'iptv-anim-02', 'iptv-anim-03', 'iptv-anim-04', 'iptv-anim-05', 'iptv-anim-06']
    };


    function Dialog(setings) {
        var that = this;
        that.index = ++dialogs.index;
        //缓存弹框对象
        ready.dialogs[that.index] = that;
        //配置优先级：总配置<当前对象配置<用户自定义配置
        that.config = iptv.extend({}, ready.config, that.config, setings);
        //如果用户没有指定皮肤，默认制空
        that.config.skin = that.config.skin === ready.config.skin ? "" : that.config.skin;
        document.body ? that.creat() : setTimeout(function () {
            that.creat();
        }, 50);
    }

    Dialog.pt = Dialog.prototype;

    //弹框私有配置
    Dialog.pt.config = {
        type: ready.type[0],//默认info 信息
        time: 3000, //0表示不自动关闭
        zIndex: 19891014,//dom元素zIndex值
        maxWidth: 360,//最大宽度
        fixed: true,//固定
        anim: 0,//默认动画
        isOutAnim: true,//是否添加退出动画
        icon: -1,//表情
        title:"信息",
        area: 'auto',//坐标
        offset: 'auto',
        tips: 2,//弹框默认位置在右边
        start:null,//弹框显示后回调函数
        end:null,//弹框关闭后回调函数
    };

    /**
     * 创建弹框
     */
    Dialog.pt.creat = function () {
        var that = this,
            config = that.config,
            times = that.index,
            content = config.content,
            conType = typeof content === 'object',
            body = iptv('body')[0];

        if (typeof config.area === 'string') {
            config.area = config.area === 'auto' ? ['', ''] : [config.area, ''];
        }

        if (typeof config.shade === 'number') {
            config.shade = [config.shade, '#000'];
        }

        //根据每种类型的弹框，处理已经打开同类型的弹框，进行关闭
        switch (config.type) {
            case ready.type[0]:
                dialogs.closeAll(ready.type[0]);
                break;
            case ready.type[1]:
                //如果content不是数组，这里强制转换为数组，数组第一个元素为实际内容，第二个元素为依附元素选择器
                conType || (config.content = [config.content, 'body']);
                //依附元素选择器
                config.follow = config.content[1];
                //获取依附元素的父元素对象
                config.parent = iptv(config.follow)[0] && iptv(config.follow)[0].parentNode || iptv('body')[0];
                //添加箭头
                config.content = config.content[0] + '<i id="iptv-dialogs-TipsG'+that.index+'" class="iptv-dialogs-TipsG"></i>';
                delete config.title;
                //判断用户传递过来的tips属性是否是对象，如果是就用，如果不是这里强制转换为数组对象 [弹框方向：1上2右3下4左,弹框背景颜色]
                //第2个参数为tipsG的弹框背景颜色，默认为true，目的是默认存在箭头，如果2个参数为false或者为null,将在tips方法内，tipsG被remove掉
                config.tips = typeof config.tips === 'object' ? config.tips : [config.tips, true];
                //如果tipsMore为true将不销毁之前的
                config.tipsMore || dialogs.closeAll('tips');
                break;
        }

        //创建DOM,并且自适应
        that.vessel(function (shadeHTML, contentHTML) {
            shadeHTML && body.appendChild(shadeHTML);
            if(config.type == ready.type[1]){
                //如果是tips弹框，节点需要创建在依附元素的父元素内
                config.parent.appendChild(contentHTML);
            }else{
                contentHTML && body.appendChild(contentHTML);
            }
            that.dialog = $('#' + ready.config.skin + times);
        }).auto(times);

        //如果有遮罩，设置遮罩样式
        iptv('#iptv-shade' + that.index).setCss({
            'background-color': config.shade[1] || '#000',
            'opacity': config.shade[0] || ready.config.shade
        });

        //坐标自适应浏览器窗口尺寸
        config.type == ready.type[1] ? that.tips() : that.offset();

        //添加弹出动画,支持使用内置已经定义好的动画，同时支持外部扩展动画
        if (ready.anim[config.anim] || typeof config.anim === 'string') {
            var animClass = typeof config.anim === 'string' ? config.anim : 'iptv-anim ' + ready.anim[config.anim];
            that.dialog.addClass(animClass).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (a) {
                $(this).removeClass(animClass);
            });
        }

        //根据配置时长，延迟几秒后关闭弹框
        config.time <= 0 || setTimeout(function () {
            dialogs.close(that.index);
        }, config.time);

        //记录关闭动画
        if (config.isOutAnim) {
            that.dialog.data('isOutAnim', true);
        }

        //执行打开回调
        config.start && config.start.call(that,times);

        //添加退出回调
        config.end && (ready.end[that.index] = config.end);
    };
    /**
     * 自适应
     */
    Dialog.pt.auto = function () {
        var that = this, config = that.config, dialog = that.dialog;
        if(config.area[0] === '' && config.maxWidth > 0){
            dialog.outerWidth() > config.maxWidth && dialog.width(config.maxWidth);
        }
        var area = [dialog.innerWidth(), dialog.innerHeight()]
            ,titHeight = iptv("#iptv-dialogs-title"+that.index).outerHeight() || 0
            ,setHeight = function(elem){
            elem = iptv(elem);
            elem.height(area[1] - titHeight - 2*(parseFloat(elem.getStyle("padding-top")) || 0 ));
        };

        //如果是默认宽高
        if(config.area[1] === ''){
            //如果内容高度超过屏幕最大高度，做出限制
            if(config.fixed && area[1] >= ready.config.winHeight){
                area[1] = ready.config.winHeight;
                setHeight('#iptv-dialogs-content'+that.index);
            }
        } else {
            //如果是用户指定宽高
            setHeight('#iptv-dialogs-content'+that.index);
        }

        return that;
    };
    /**
     * 计算坐标
     */
    Dialog.pt.offset = function(){
        var that = this, config = that.config, dialog = that.dialog;
        var area = [dialog.outerWidth(), dialog.outerHeight()];
        var type = typeof config.offset === 'object';
        //首先计算弹框默认位置在屏幕中间
        that.offsetTop = (ready.config.winHeight - area[1])/2 + (ready.config.winHeight - area[1])/4;
        that.offsetLeft = (ready.config.winWidth- area[0])/2;

        //用户设置弹框坐标有两种方式，
        // 1）以[数值,数值]数组方式设置top,left   
        // 2）以字符串t,r,b,l,lt,lb,rt,rb,数值
        // 3）数值可以是百分比字符串，可以是数字

        //如果用户指定坐标
        if(type){
            that.offsetTop = config.offset[0];
            that.offsetLeft = config.offset[1] || that.offsetLeft;
        } else if(config.offset !== 'auto'){
            //如果坐标是字符串，覆盖指定位置坐标
            if(config.offset === 't'){ //上中
                that.offsetTop = 0;
            } else if(config.offset === 'r'){ //右中
                that.offsetLeft = ready.config.winWidth - area[0];
            } else if(config.offset === 'b'){ //下中
                that.offsetTop = ready.config.winHeight - area[1];
            } else if(config.offset === 'l'){ //左中
                that.offsetLeft = 0;
            } else if(config.offset === 'lt'){ //左上角
                that.offsetTop = 0;
                that.offsetLeft = 0;
            } else if(config.offset === 'lb'){ //左下角
                that.offsetTop = ready.config.winHeight - area[1];
                that.offsetLeft = 0;
            } else if(config.offset === 'rt'){ //右上角
                that.offsetTop = 0;
                that.offsetLeft = ready.config.winWidth - area[0];
            } else if(config.offset === 'rb'){ //右下角
                that.offsetTop = ready.config.winHeight - area[1];
                that.offsetLeft = ready.config.winWidth - area[0];
            } else {
                //如果没有匹配的，默认设置弹框距离顶部的垂直距离，也就是说，弹框水平居中
                that.offsetTop = config.offset;
            }

        }

        //如果不是固定布局
        if(!config.fixed){
            //如果用户指定弹框的垂直距离为一个百分比
            that.offsetTop = /%$/.test(that.offsetTop) ?
                ready.config.winHeight * parseFloat(that.offsetTop) /100
                : parseFloat(that.offsetTop);

            that.offsetLeft = /%$/.test(that.offsetLeft) ?
                ready.config.winWidth * parseFloat(that.offsetLeft)/100
                : parseFloat(that.offsetLeft);
        }

        dialog.setCss({top: that.offsetTop + "px", left: that.offsetLeft + "px"});
        return that;
    };
    /**
     * 创建节点
     * @param callBack
     * @returns {Dialog.pt}
     */
    Dialog.pt.vessel = function (callBack) {
        var that = this, times = that.index, config = that.config;
        var zIndex = config.zIndex + times;
        var titleHTML = null;
        if (config.title) {
            titleHTML = document.createElement("div");
            titleHTML.setAttribute("id", "iptv-dialogs-title" + times);
            titleHTML.id = "iptv-dialogs-title" + times;
            titleHTML.className = "iptv-dialogs-title";
            titleHTML.innerHTML = config.title;
        }

        //如果内容是一个DOM节点，需要记录该DOM节点的父容器,同时将该DOM设置为显示状态
        if(config.content && config.content.nodeType === 1){
            iptv(config.content).show().setCss("display","block").data("parentNode",config.content.parentNode);
        }

        config.zIndex = zIndex;
        //遮罩
        var shadeHTML = null;
        if (config.shade) {
            shadeHTML = document.createElement("div");
            shadeHTML.className = "iptv-shade";
            shadeHTML.setAttribute("id", "iptv-shade" + times);
            shadeHTML.setAttribute("times", times);
            shadeHTML.id = "iptv-shade" + times;
            shadeHTML.style.zIndex = zIndex - 1;
            shadeHTML.innerHTML = '';
        }


        //主体内容
        var contentHTML = null;

        //创建内容父容器
        contentHTML = document.createElement("div");
        // iptv-dialogs iptv-dialogs-tips 用户自定义皮肤
        contentHTML.className = ready.config.skin + ' ' + ready.config.skin + '-' + config.type + ' ' + config.skin;
        contentHTML.setAttribute("id", ready.config.skin + times);
        contentHTML.setAttribute("type", config.type);
        contentHTML.setAttribute("times", times);
        contentHTML.setAttribute("showtime", config.time);
        contentHTML.id = ready.config.skin + times;
        contentHTML.style.zIndex = zIndex;
        contentHTML.style.width = config.area[0]+"px";
        contentHTML.style.height = config.area[1]+"px";
        !config.fixed && (contentHTML.style.position = "absolute");
        //如果有标题，添加标题
        titleHTML && contentHTML.appendChild(titleHTML);

        //创建内容
        var content = document.createElement("div");
        content.setAttribute("id", (config.id || 'iptv-dialogs-content'+times));
        content.id = config.id || 'iptv-dialogs-content'+times;//设置内容容器id，该id可以是用户指定的id，也可以是默认生成id
        content.className = "iptv-dialogs-content" + ((config.type == ready.type[0] && config.icon !== -1) ? ' iptv-dialogs-padding' : '');
        var innerHTML = '';
        //type等于info 并且有icon,这里添加icon元素
        (config.type == ready.type[0] && config.icon !== -1) && (innerHTML = '<i class="iptv-dialogs-ico iptv-dialogs-ico' + config.icon + '"></i>');
        //如果用户传递的内容是一个字符串，不是DOM，将以字符串的方式添加
        innerHTML += (config.content && config.content.nodeType === 1 ? "" : (typeof config.content === "string" ? config.content : ""));
        content.innerHTML = innerHTML;
        //如果用户传递的内容是一个DOM，将以子节点的方式添加
        config.content && config.content.nodeType === 1 && (content.appendChild(config.content))
        //非page弹框，计算高度
        if(config.type !== ready.type[2] && innerHTML.length>0){
            //每20个字符一行，每行高度为21，计算总的高度
            content.style.height  = (Math.ceil(innerHTML.length/20)*24) + "px";
        }else if(config.area[1] === ''){
            //page弹框，高度固定为默认屏幕高度
            content.style.height =ready.config.winHeight+"px";
        }else{
            content.style.height =config.area[1]+"px";
        }
        //将内容添加到父容器内
        contentHTML.appendChild(content);

        callBack && callBack.call(that, shadeHTML, contentHTML);
        return that;
    };
    /**
     * Tips
     */
    Dialog.pt.tips = function(){
        var that = this, config = that.config, dialog = that.dialog, offset = config.offset, is = typeof offset === "object";
        var layArea = [dialog.outerWidth(), dialog.outerHeight()], follow = iptv(config.follow);
        if(!follow[0]) follow = iptv('body');
        var goal = {
            width: follow.outerWidth(),
            height: follow.outerHeight(),
            top: parseInt(follow.attr("top")),
            left: parseInt(follow.attr("left")),
            parent:config.parent,//依附元素父元素
        }, tipsG = iptv('#iptv-dialogs-TipsG'+that.index);

        var guide = config.tips[0];
        config.tips[1] || tipsG.remove();

        goal.parentHeight = $(goal.parent).height();//依附元素父元素的高
        goal.parentWidth = $(goal.parent).width();//依附元素父元素的宽
        goal.autoLeft = function(){
            //如果依附元素的left值+弹框的宽-720  大于0，相当于弹框的坐标left值超出了屏幕宽度
            if(goal.left + layArea[0] - goal.parentWidth > 0){
                //弹框的left值 = 依附元素的left + 依附元素的宽 - 弹框的宽  ， 相当于将弹框完整的呈现在屏幕宽度以内
                goal.tipLeft = goal.left + goal.width - layArea[0];
                tipsG.setCss({right: 12+"px", left: 'auto'});
            } else {
                //如果弹框的坐标left在屏幕宽度以内，弹框的left值就等于依附元素的left值
                goal.tipLeft = goal.left;
            }
        };

        //辨别tips的方位
        goal.where = [function(){ //上        
            goal.autoLeft();
            //弹框top值 = 依附元素的top值 - 弹框的高 - 10
            goal.tipTop = goal.top - layArea[1] - 10;
            //添加箭头的样式
            tipsG.removeClass('iptv-dialogs-TipsB').addClass('iptv-dialogs-TipsT').setCss('border-right-color', config.tips[1]);
        }, function(){ //右
            //弹框的left值 = 依附元素的left值 + 依附元素的宽度 + 10
            goal.tipLeft = goal.left + goal.width + 10;
            //弹框的top值 = 依附元素的top值
            goal.tipTop = goal.top;
            tipsG.removeClass('iptv-dialogs-TipsL').addClass('iptv-dialogs-TipsR').setCss('border-bottom-color', config.tips[1]);
        }, function(){ //下
            goal.autoLeft();
            //弹框的top值 = 依附元素的top值 + 依附元素的高 + 10
            goal.tipTop = goal.top + goal.height + 10;
            tipsG.removeClass('iptv-dialogs-TipsT').addClass('iptv-dialogs-TipsB').setCss('border-right-color', config.tips[1]);
        }, function(){ //左
            //弹框的left值 = 依附元素的left - 弹框的宽 - 10 
            goal.tipLeft = goal.left - layArea[0] - 10;
            //弹框的top值 = 依附元素的top值
            goal.tipTop = goal.top;
            tipsG.removeClass('iptv-dialogs-TipsR').addClass('iptv-dialogs-TipsL').setCss('border-bottom-color', config.tips[1]);
        }];

        //获取弹框坐标，并且设置箭头样式
        goal.where[guide-1]();

        /* 10*2为小三角形占据的空间 */
        //弹框超出屏幕边缘的异常处理
        if(guide === 1){
            //弹框在上
            //依附元素的top值 - （弹框高+箭头高） 小于0 ：说明弹框超出了屏幕顶端，自动将方向改为依附元素下方
            goal.top - (layArea[1] + 10*2) < 0 && goal.where[2]();
        } else if(guide === 2){
            //弹框在右
            //屏幕宽 - （依附元素left值 + 依附元素宽度 + 弹框宽 + 箭头宽）小于 0 ：说明弹框超出了屏幕宽度，自动将方向改为依附元素左边
            goal.parentWidth - (goal.left + goal.width + layArea[0] + 10*2) > 0 || goal.where[3]()
        } else if(guide === 3){
            //弹框在下
            //（依附元素top值 + 依附元素高 + 弹框高 + 箭头高） - 屏幕高度 大于 0 ：说明弹框超出了屏幕高度，自动将方向改为依附元素上边
            (goal.top  + goal.height + layArea[1] + 10*2) - goal.parentHeight > 0 && goal.where[0]();
        } else if(guide === 4){
            //弹框在左
            //弹框宽度 + 箭头宽度 - 依附元素的left值 大于 0 ： 说明依附元素左边放不下弹框，自动将方向改为依附元素右边
            layArea[0] + 10*2 - goal.left > 0 && goal.where[1]()
        }

        //设置弹框背景色
        iptv(config.id && '#'+config.id || '#iptv-dialogs-content'+that.index).setCss('background-color', config.tips[1]);
        dialog.setCss({
            left: (is && offset[1] || goal.tipLeft)+"px",
            top: (is && offset[0] || goal.tipTop)+"px"
        });
    };


    var dialogs = {
        index: 0,//弹框唯一索引
        getDialog:function (index) {
            return ready.dialogs[index];
        },
        open: function (setings) {
            var o = new Dialog(setings);
            return o.index;
        },
        /**
         * 信息弹框
         * dialogs.msg("内容");信息弹框，默认没有动画，没有标题，没有icon,延迟3秒消失
         * dialogs.msg("内容",{time:0,area:[宽，高],shade:[0.8,"#000"],});设置显示宽高，不自动关闭,添加遮罩层透明度与背景色
         * dialogs.msg("内容",{offset:[top值,left值]});//设置坐标
         * dialogs.msg("内容",{offset:"lt"});//设置坐标显示在左上角
         * dialogs.msg("内容",{title:"标题"});//添加标题
         * dialogs.msg("内容",{anim:2});//设置内置动画
         * dialogs.msg("内容",{anim:"bounceInDown"});//设置自定义动画
         * dialogs.msg("内容",{icon:2});//设置图标
         * @param content
         * @param options
         * @param end
         * @returns {*}
         */
        msg: function (content, options, end) {
            var type = typeof options === 'function';
            if (type) end = options;
            options = options || {};
            return dialogs.open(iptv.extend({
                content: content,
                time: 3000,
                shade: false,
                title: false,
                end: end
            }, (!type ? options : {})));
        },
        /**
         * tips弹框，带箭头
         * dialogs.tips("内容","依附元素选择器");默认显示在元素右侧，延迟3秒消失，背景色为黑色
         * dialogs.tips("内容","依附元素选择器",{time:0});默认显示在元素右侧，不自动消失，背景色为黑色
         * dialogs.tips("内容","依附元素选择器",{tipsMore:true});弹框后，不删除之前的tips，也就是允许同时存在多个tips存在
         * dialogs.tips("内容","依附元素选择器",{tips:[1,"red"]});控制方向显示在元素上方，同时背景色为红色，不再使用默认背景色与方向
         * dialogs.tips("内容","依附元素选择器",{tips:[3,"red"],offset:[100,200]});控制方向显示在元素下方，同时背景色为红色，由于加上offset属性，不再自动计算tips坐标，使用用户指定坐标
         * dialogs.tips("内容","依附元素选择器",{offset:[100,200]});默认方向显示在元素右侧，如果加上offset属性，在显示在右侧的同时，不自动计算tips坐标，使用用户指定坐标
         * offset:该坐标属性一般会在dialogs插件自动计算出来的位置不满足用户需求时，此时可以通过该值设置自定义坐标，如下：
         * dialogs.tips("内容","依附元素选择器",{time:0,tips:[4,"black"],offset:[top值,left值]});
         * @param content
         * @param follow
         * @param options
         * @returns {*}
         */
        tips: function(content, follow, options){
            return dialogs.open(iptv.extend({
                type: ready.type[1],
                content: [content, follow],
                time: 3000,
                shade: false,
                fixed: false,
                title: false,
                maxWidth: 210
            }, options));
        },
        closeAll: function (type) {

            //根据顶级css名找到所有dialogs elem元素
            iptv.each(iptv("." + ready.config.skin), function () {
                //遍历所有dialogs 元素
                var othis = iptv(this);
                //判断type属性是否为指定关闭的type
                var is = type ? (othis.attr('type') === type) : true;
                //如果type是指定关闭的info , 就调用关闭方法，传递dialogs的index索引值过去
                is && dialogs.close(othis.attr('times'));
            });
        },
        close: function (index) {
            var dialog = iptv('#' + ready.config.skin + index);
            if(!dialog[0] || !ready.dialogs[index]) return;
            var type = dialog.attr('type'),
                closeAnim = 'iptv-anim-close',dlg = ready.dialogs[index],config = dlg.config, content = config.content;
            //定义移除dom元素方法
            var remove = function () {
                //如果被删除的弹框是一个自定义的DOM节点，此时就不能将该节点移除了，需要将其还原到一开始的父节点下，并且显示状态也还原为隐藏
                if(type === ready.type[2] && content && content.nodeType === 1){
                    //将自定义内容DOM在弹框内移除
                    iptv("#iptv-dialogs-content"+index)[0].removeChild(content);
                    //将自定义内容DOM还原显示状态为隐藏，同时，将DOM还原到之前的父节点下
                    iptv(content).hide().setCss("display","none").data("parentNode").appendChild(content);
                }
                dialog[0].innerHTML = '';
                //移除元素
                dialog.remove();
                //判断是否存在关闭dialogs的回调，如果存在就执行
                typeof ready.end[index] === 'function' && ready.end[index].call(dlg,index);
                //删除回调
                delete ready.end[index];
                //删除弹框对象
                delete ready.dialogs[index];
            };

            //如果开启退出动画，需要动画执行完成之后，再退出
            if (dialog.data('isOutAnim')) {
                //如果开启了关闭动画，先给dialogs元素添加关闭动画样式，
                //并且指定动画执行结束时间后执行移除元素方法
                dialog.addClass('iptv-anim ' + closeAnim).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                    //动画结束，移除弹框元素
                    remove();
                });
                //如果不支持.one方法的话，可以使用如下方法
                /*dialog.addClass('iptv-anim ' + closeAnim);
                 setTimeout(function(){
                 remove();
                 }, 200);*/
            } else {
                //如果没有设置关闭动画，直接退出
                remove();
            }
            //移除遮罩层
            iptv('#iptv-shade' + index).remove();

        }
    };

    iptv.dialogs = dialogs;
    window.dialogs = dialogs;


})(window, iptv);

(function (window, iptv) {
    if (!iptv) {
        console.error("缺少iptv核心库文件");
        return;
    }

    function IMGLoad(){
        //解决IE在setInterval中无法传入回调参数的问题
        if (document.all && !window.setInterval.isPolyfill) {
            var __nativeSI__ = window.setInterval;
            /*, argumentToPass1, argumentToPass2, etc. */
            window.setInterval = function (vCallback, nDelay ) {
                var aArgs = Array.prototype.slice.call(arguments, 2);
                return __nativeSI__(vCallback instanceof Function ? function () {
                    vCallback.apply(null, aArgs);
                } : vCallback, nDelay);
            };
            window.setInterval.isPolyfill = true;
        }

        //图片个数
        this.imgCount = 0;
        //遍历索引
        this.imgIndex = 0;
        //图片数组
        this.imgs = new Array();
        //计时器
        this.imgTimer = 0;
        //回调
        this.callBack = null;
        this.ImgLoadSuss = function(obj_,callBack_)
        {
            if(!obj_)return;
            var this_ = this;
            if(iptv.isArray(obj_))
            {
                this_.imgs = obj_;
                this_.imgCount = obj_.length;
            }else{
                this_.imgCount = 1;
                this_.imgs.push(obj_);
            }
            this_.callBack = callBack_;
            this_.imgTimer  = setInterval(function(th){
                for(var i in th.imgs)
                {
                    if(th.imgs[i].complete && th.imgs[i].loadOk == undefined)
                    {
                        th.imgs[i].loadOk = true;
                        th.imgIndex = th.imgIndex + 1;
                    }
                    if(th.imgIndex === th.imgCount && th.callBack)
                    {
                        clearInterval(th.imgTimer);
                        th.callBack(th.imgs);
                    }
                }
            },50,this_);
        };
    };
    iptv.fn.extend({
        loadImg:function(callBack_){
            if(iptv.type(this.context) !== "array" || this.context.length===0  || !(this.context[0] instanceof Image))return;
            (new IMGLoad()).ImgLoadSuss(this.context,callBack_);
            return this;
        }
    });

})(window,iptv);