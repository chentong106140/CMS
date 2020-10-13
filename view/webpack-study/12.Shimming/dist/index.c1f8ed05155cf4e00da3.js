(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["index"],{

/***/ "8qja":
/*!************************!*\
  !*** ./src/globals.js ***!
  \************************/
/*! exports provided: default, helper, infos, says */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "helper", function() { return helper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "infos", function() { return infos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "says", function() { return say; });


var infos = "我是来自./src/globals.js!";

var say = function say(text) {
    console.log(text);
};

var helper = {
    test: function test(text) {
        console.log(text);
    },
    info: function info(text) {
        console.log(text);
    }
};
/*** EXPORTS FROM exports-loader ***/
/* harmony default export */ __webpack_exports__["default"] = (say);



/***/ }),

/***/ "dSPy":
/*!**********************!*\
  !*** ./src/print.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var print = function print(text) {
    console.log(text);
};

var show = function show(text) {
    console.log(text);
};

var say = function say(text) {
    console.log(text);
};

var infos = '我来自./src/print.js';

exports.default = print;
exports.print = print;
exports.show = show;
exports.say = say;
exports.infos = infos;

/***/ }),

/***/ "tjUo":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(jquery, _, join) {/* harmony import */ var _print__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./print */ "dSPy");
/* harmony import */ var _print__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_print__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var morgan_iptv_key__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! morgan-iptv-key */ "m5rE");
/* harmony import */ var morgan_iptv_key__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(morgan_iptv_key__WEBPACK_IMPORTED_MODULE_1__);
/*** IMPORTS FROM imports-loader ***/

var iptv = __webpack_require__(/*! morgan-iptv-core */ "Nbek");

/*** IMPORTS FROM imports-loader ***/
'use strict';





var name = "陈通";window.jquery=jquery;

(function(iptv, jquery) {
"use strict";

var _globals = __webpack_require__(/*! ./globals */ "8qja");

var _globals2 = _interopRequireDefault(_globals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//没有显式的导入lodash,本文件也可以使用lodash的变量_,主要是在webpack.common.js内的ProvidePlugin插件定义了全局变量
//import _ from 'lodash';

//你会发现，没有执行如下import语句，却能够调用到print,s,p,say,myPrint变量，因为使用了webpack.common.js模块中定义的imports-loader自动加载模块
/*import {default as print,show as s,print as p,say} from "./print";*/

/*import * as myPrint from './print'*/

//验证module.rules下面定义的imports-loader自动加载模块，无需手动import xx from './print'
_print__WEBPACK_IMPORTED_MODULE_0___default()("print"); //对应规则：'default ./print print'   =》对应语句:import print from './print'
Object(_print__WEBPACK_IMPORTED_MODULE_0__["show"])("show"); //对应规则：'named ./print show s'         =》对应语句：import {show as s} from './print'
Object(_print__WEBPACK_IMPORTED_MODULE_0__["print"])("print"); //对应规则：'named ./print print p'       =》对应语句：import {print as p} from './print'
Object(_print__WEBPACK_IMPORTED_MODULE_0__["say"])("say"); //对应规则：'named ./print say'           =》对应语句：import {say} from './print'
console.log(_print__WEBPACK_IMPORTED_MODULE_0__); //对应规则：'namespace ./print myPrint' =》对应语句：import * as myPrint from './print'
//Object { print: print(text), show: show(text), say: say(text), default: print(text), … }

console.log("-------------------1----------------------");
//验证iptv模块是否导入成功
console.log(iptv);
console.log(undefined); //undefined

console.log("-------------------2----------------------");
//如下是验证globals.js文件模拟老版本的库，没有使用export导出变量，
// 此时如何通过exports-loader插件兼容老版本的库，也就是通过exports-loader插件让没有export导出变量的js库，能够正常导出变量

console.log(_globals.infos); //验证：'infos'，这里讲infos重新命名为myInfos进行导入
(0, _globals2.default)('mysays'); //验证：'default say'，这里将default say 重新命名为mysay进行导入
_globals.helper.test('test'); //验证：'helper'
_globals.helper.info('info'); //验证：'helper'
(0, _globals.says)('says'); //验证：'named say says'

console.log("-------------------3----------------------");
console.log(/*require.resolve*/(/*! ./globals.js */ "8qja"));

//获取环境变量是生产环境还是开发环境
var env = "development";

if (env === 'production') {
    console.log("当前环境为生产环境！" + env);
} else {
    console.log("当前环境为开发环境！" + env);
}

function component() {
    var element = document.createElement('div');
    //下面的_和join变量是通过webpack.ProvidePlugin插件定义的全局变量
    element.innerHTML += _.join(['Hello', 'webpack'], ' ');
    element.innerHTML += join(['你好', 'webpack'], ' ');

    return element;
}

document.body.appendChild(component());

//使用动态导入方案1：
/*function getComponent() {
    return import('lodash').then(({ default: _ }) => {
        const element = document.createElement('div');

        element.innerHTML = _.join(['Hello', 'webpack'], ' ');

        return element;

    }).catch(error => '动态加载模块错误');
}*/

/*//使用动态导入方案2：
async function getComponent() {
    var element = document.createElement('div');
    const _ = await require('lodash');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;
}

getComponent().then(function (component) {
    document.body.appendChild(component);
});*/

/*
getComponent().then(component => {
    document.body.appendChild(component);
});
*/

/**
 * 用于监控某一个模块被重新修改了，就会进入如下这个回调方法
 * 模块热替换的启用HMR
 */
/*if (module.hot) {
    module.hot.accept('./another-module.js', function () {
        //当math.js模块内容被修改，就会进入当前回调方法
        console.log('another-module.js模块被热加载成功!');
        document.body.removeChild(element);
        element = component();
        document.body.appendChild(element);
    });
}*/
}.call(window, iptv, jquery));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "ozZp"), __webpack_require__(/*! lodash */ "oUqH"), __webpack_require__(/*! lodash */ "oUqH")["join"]))

/***/ })

},[["tjUo","runtime","vendors"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZ2xvYmFscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImluZm9zIiwic2F5IiwidGV4dCIsImNvbnNvbGUiLCJsb2ciLCJoZWxwZXIiLCJ0ZXN0IiwiaW5mbyIsInByaW50Iiwic2hvdyIsImRlZmF1bHQiLCJzIiwicCIsIm15UHJpbnQiLCJpcHR2IiwibXlJbmZvcyIsInJlcXVpcmUiLCJlbnYiLCJwcm9jZXNzIiwiY29tcG9uZW50IiwiZWxlbWVudCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsIl8iLCJqb2luIiwiYm9keSIsImFwcGVuZENoaWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsUUFBUSx1QkFBWjs7QUFFQSxJQUFJQyxNQUFNLFNBQU5BLEdBQU0sQ0FBVUMsSUFBVixFQUFnQjtBQUN0QkMsWUFBUUMsR0FBUixDQUFZRixJQUFaO0FBQ0gsQ0FGRDs7QUFJQSxJQUFJRyxTQUFTO0FBQ1RDLFVBQU0sY0FBVUosSUFBVixFQUFnQjtBQUNsQkMsZ0JBQVFDLEdBQVIsQ0FBWUYsSUFBWjtBQUNILEtBSFE7QUFJVEssVUFBSyxjQUFVTCxJQUFWLEVBQWdCO0FBQ2pCQyxnQkFBUUMsR0FBUixDQUFZRixJQUFaO0FBQ0g7QUFOUSxDQUFiLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BLElBQUlNLFFBQVEsU0FBU0EsS0FBVCxDQUFlTixJQUFmLEVBQXFCO0FBQzdCQyxZQUFRQyxHQUFSLENBQVlGLElBQVo7QUFDSCxDQUZEOztBQUlBLElBQUlPLE9BQU8sU0FBUEEsSUFBTyxDQUFVUCxJQUFWLEVBQWdCO0FBQ3ZCQyxZQUFRQyxHQUFSLENBQVlGLElBQVo7QUFDSCxDQUZEOztBQUlBLElBQUlELE1BQU0sU0FBTkEsR0FBTSxDQUFVQyxJQUFWLEVBQWdCO0FBQ3RCQyxZQUFRQyxHQUFSLENBQVlGLElBQVo7QUFDSCxDQUZEOztBQUtBLElBQUlGLFFBQVEsbUJBQVo7O1FBRWlCVSxPLEdBQVRGLEs7UUFBa0JBLEssR0FBQUEsSztRQUFPQyxJLEdBQUFBLEk7UUFBTVIsRyxHQUFBQSxHO1FBQUtELEssR0FBQUEsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZnhDOzs7Ozs7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQVEsNkNBQUtBLENBQUMsT0FBTixFLENBQWU7QUFDZkcsbURBQUNBLENBQUMsTUFBRixFLENBQVU7QUFDVkMsb0RBQUNBLENBQUMsT0FBRixFLENBQVc7QUFDWFgsa0RBQUdBLENBQUMsS0FBSixFLENBQVc7QUFDWEUsUUFBUUMsR0FBUixDQUFZUyxtQ0FBWixFLENBQXFCO0FBQ3JCOztBQUVBVixRQUFRQyxHQUFSLENBQVksNENBQVo7QUFDQTtBQUNBRCxRQUFRQyxHQUFSLENBQVlVLElBQVo7QUFDQVgsUUFBUUMsR0FBUixZLENBQWtCOztBQUVsQkQsUUFBUUMsR0FBUixDQUFZLDRDQUFaO0FBQ0E7QUFDQTs7QUFFQUQsUUFBUUMsR0FBUixDQUFZVyxjQUFaLEUsQ0FBcUI7QUFDckIsdUJBQU0sUUFBTixFLENBQWdCO0FBQ2hCVixnQkFBT0MsSUFBUCxDQUFZLE1BQVosRSxDQUFvQjtBQUNwQkQsZ0JBQU9FLElBQVAsQ0FBWSxNQUFaLEUsQ0FBb0I7QUFDcEIsbUJBQUssTUFBTCxFLENBQWE7O0FBRWJKLFFBQVFDLEdBQVIsQ0FBWSw0Q0FBWjtBQUNBRCxRQUFRQyxHQUFSLENBQVlZLG1CQUFBLENBQWdCLDBCQUFoQixDQUFaOztBQUVBO0FBQ0EsSUFBSUMsTUFBTUMsYUFBVjs7QUFFQSxJQUFJRCxRQUFRLFlBQVosRUFBMEI7QUFDdEJkLFlBQVFDLEdBQVIsQ0FBWSxlQUFlYSxHQUEzQjtBQUNILENBRkQsTUFFTztBQUNIZCxZQUFRQyxHQUFSLENBQVksZUFBZWEsR0FBM0I7QUFDSDs7QUFFRCxTQUFTRSxTQUFULEdBQXFCO0FBQ2pCLFFBQU1DLFVBQVVDLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQTtBQUNBRixZQUFRRyxTQUFSLElBQXFCQyxFQUFFQyxJQUFGLENBQU8sQ0FBQyxPQUFELEVBQVUsU0FBVixDQUFQLEVBQTZCLEdBQTdCLENBQXJCO0FBQ0FMLFlBQVFHLFNBQVIsSUFBcUJFLEtBQUssQ0FBQyxJQUFELEVBQU8sU0FBUCxDQUFMLEVBQXdCLEdBQXhCLENBQXJCOztBQUVBLFdBQU9MLE9BQVA7QUFDSDs7QUFFREMsU0FBU0ssSUFBVCxDQUFjQyxXQUFkLENBQTBCUixXQUExQjs7QUF5Q0E7QUFDQTs7Ozs7Ozs7Ozs7QUFZQTs7Ozs7Ozs7Ozs7O0FBYUE7Ozs7OztBQU1BOzs7O0FBSUEiLCJmaWxlIjoiaW5kZXguYzFmOGVkMDUxNTVjZjRlMDBkYTMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaW5mb3MgPSBcIuaIkeaYr+adpeiHqi4vc3JjL2dsb2JhbHMuanMhXCI7XHJcblxyXG52YXIgc2F5ID0gZnVuY3Rpb24gKHRleHQpIHtcclxuICAgIGNvbnNvbGUubG9nKHRleHQpO1xyXG59O1xyXG5cclxudmFyIGhlbHBlciA9IHtcclxuICAgIHRlc3Q6IGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGV4dCk7XHJcbiAgICB9LFxyXG4gICAgaW5mbzpmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRleHQpO1xyXG4gICAgfVxyXG59OyIsInZhciBwcmludCA9IGZ1bmN0aW9uIHByaW50KHRleHQpIHtcclxuICAgIGNvbnNvbGUubG9nKHRleHQpO1xyXG59O1xyXG5cclxudmFyIHNob3cgPSBmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgY29uc29sZS5sb2codGV4dCk7XHJcbn07XHJcblxyXG52YXIgc2F5ID0gZnVuY3Rpb24gKHRleHQpIHtcclxuICAgIGNvbnNvbGUubG9nKHRleHQpO1xyXG59O1xyXG5cclxuXHJcbnZhciBpbmZvcyA9ICfmiJHmnaXoh6ouL3NyYy9wcmludC5qcyc7XHJcblxyXG5leHBvcnQge3ByaW50IGFzIGRlZmF1bHQsIHByaW50LCBzaG93LCBzYXksIGluZm9zfTsiLCIgICAgaW1wb3J0IG15c2F5LHtpbmZvcyBhcyBteUluZm9zLGhlbHBlcixzYXlzfSBmcm9tICcuL2dsb2JhbHMnICAgIFxyXG4gICAgLy/msqHmnInmmL7lvI/nmoTlr7zlhaVsb2Rhc2gs5pys5paH5Lu25Lmf5Y+v5Lul5L2/55SobG9kYXNo55qE5Y+Y6YePXyzkuLvopoHmmK/lnKh3ZWJwYWNrLmNvbW1vbi5qc+WGheeahFByb3ZpZGVQbHVnaW7mj5Lku7blrprkuYnkuoblhajlsYDlj5jph49cclxuICAgIC8vaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuICAgIFxyXG4gICAgLy/kvaDkvJrlj5HnjrDvvIzmsqHmnInmiafooYzlpoLkuItpbXBvcnTor63lj6XvvIzljbTog73lpJ/osIPnlKjliLBwcmludCxzLHAsc2F5LG15UHJpbnTlj5jph4/vvIzlm6DkuLrkvb/nlKjkuoZ3ZWJwYWNrLmNvbW1vbi5qc+aooeWdl+S4reWumuS5ieeahGltcG9ydHMtbG9hZGVy6Ieq5Yqo5Yqg6L295qih5Z2XXHJcbiAgICAvKmltcG9ydCB7ZGVmYXVsdCBhcyBwcmludCxzaG93IGFzIHMscHJpbnQgYXMgcCxzYXl9IGZyb20gXCIuL3ByaW50XCI7Ki9cclxuICAgIFxyXG4gICAgLyppbXBvcnQgKiBhcyBteVByaW50IGZyb20gJy4vcHJpbnQnKi9cclxuICAgIFxyXG4gICAgLy/pqozor4Ftb2R1bGUucnVsZXPkuIvpnaLlrprkuYnnmoRpbXBvcnRzLWxvYWRlcuiHquWKqOWKoOi9veaooeWdl++8jOaXoOmcgOaJi+WKqGltcG9ydCB4eCBmcm9tICcuL3ByaW50J1xyXG4gICAgcHJpbnQoXCJwcmludFwiKTsvL+WvueW6lOinhOWIme+8midkZWZhdWx0IC4vcHJpbnQgcHJpbnQnICAgPeOAi+WvueW6lOivreWPpTppbXBvcnQgcHJpbnQgZnJvbSAnLi9wcmludCdcclxuICAgIHMoXCJzaG93XCIpOy8v5a+55bqU6KeE5YiZ77yaJ25hbWVkIC4vcHJpbnQgc2hvdyBzJyAgICAgICAgID3jgIvlr7nlupTor63lj6XvvJppbXBvcnQge3Nob3cgYXMgc30gZnJvbSAnLi9wcmludCdcclxuICAgIHAoXCJwcmludFwiKTsvL+WvueW6lOinhOWIme+8miduYW1lZCAuL3ByaW50IHByaW50IHAnICAgICAgID3jgIvlr7nlupTor63lj6XvvJppbXBvcnQge3ByaW50IGFzIHB9IGZyb20gJy4vcHJpbnQnXHJcbiAgICBzYXkoXCJzYXlcIik7Ly/lr7nlupTop4TliJnvvJonbmFtZWQgLi9wcmludCBzYXknICAgICAgICAgICA944CL5a+55bqU6K+t5Y+l77yaaW1wb3J0IHtzYXl9IGZyb20gJy4vcHJpbnQnXHJcbiAgICBjb25zb2xlLmxvZyhteVByaW50KTsvL+WvueW6lOinhOWIme+8miduYW1lc3BhY2UgLi9wcmludCBteVByaW50JyA944CL5a+55bqU6K+t5Y+l77yaaW1wb3J0ICogYXMgbXlQcmludCBmcm9tICcuL3ByaW50J1xyXG4gICAgLy9PYmplY3QgeyBwcmludDogcHJpbnQodGV4dCksIHNob3c6IHNob3codGV4dCksIHNheTogc2F5KHRleHQpLCBkZWZhdWx0OiBwcmludCh0ZXh0KSwg4oCmIH1cclxuICAgIFxyXG4gICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tMS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XHJcbiAgICAvL+mqjOivgWlwdHbmqKHlnZfmmK/lkKblr7zlhaXmiJDlip9cclxuICAgIGNvbnNvbGUubG9nKGlwdHYpO1xyXG4gICAgY29uc29sZS5sb2codGhpcyk7Ly91bmRlZmluZWRcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0yLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgIC8v5aaC5LiL5piv6aqM6K+BZ2xvYmFscy5qc+aWh+S7tuaooeaLn+iAgeeJiOacrOeahOW6k++8jOayoeacieS9v+eUqGV4cG9ydOWvvOWHuuWPmOmHj++8jFxyXG4gICAgLy8g5q2k5pe25aaC5L2V6YCa6L+HZXhwb3J0cy1sb2FkZXLmj5Lku7blhbzlrrnogIHniYjmnKznmoTlupPvvIzkuZ/lsLHmmK/pgJrov4dleHBvcnRzLWxvYWRlcuaPkuS7tuiuqeayoeaciWV4cG9ydOWvvOWHuuWPmOmHj+eahGpz5bqT77yM6IO95aSf5q2j5bi45a+85Ye65Y+Y6YePXHJcbiAgICBcclxuICAgIGNvbnNvbGUubG9nKG15SW5mb3MpOy8v6aqM6K+B77yaJ2luZm9zJ++8jOi/memHjOiusmluZm9z6YeN5paw5ZG95ZCN5Li6bXlJbmZvc+i/m+ihjOWvvOWFpVxyXG4gICAgbXlzYXkoJ215c2F5cycpOy8v6aqM6K+B77yaJ2RlZmF1bHQgc2F5J++8jOi/memHjOWwhmRlZmF1bHQgc2F5IOmHjeaWsOWRveWQjeS4um15c2F56L+b6KGM5a+85YWlXHJcbiAgICBoZWxwZXIudGVzdCgndGVzdCcpOy8v6aqM6K+B77yaJ2hlbHBlcidcclxuICAgIGhlbHBlci5pbmZvKCdpbmZvJyk7Ly/pqozor4HvvJonaGVscGVyJ1xyXG4gICAgc2F5cygnc2F5cycpOy8v6aqM6K+B77yaJ25hbWVkIHNheSBzYXlzJ1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLTMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgY29uc29sZS5sb2cocmVxdWlyZS5yZXNvbHZlKCcuL2dsb2JhbHMuanMnKSk7XHJcbiAgICBcclxuICAgIC8v6I635Y+W546v5aKD5Y+Y6YeP5piv55Sf5Lqn546v5aKD6L+Y5piv5byA5Y+R546v5aKDXHJcbiAgICB2YXIgZW52ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlY7XHJcbiAgICBcclxuICAgIGlmIChlbnYgPT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5b2T5YmN546v5aKD5Li655Sf5Lqn546v5aKD77yBXCIgKyBlbnYpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuW9k+WJjeeOr+Wig+S4uuW8gOWPkeeOr+Wig++8gVwiICsgZW52KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gY29tcG9uZW50KCkge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAvL+S4i+mdoueahF/lkoxqb2lu5Y+Y6YeP5piv6YCa6L+Hd2VicGFjay5Qcm92aWRlUGx1Z2lu5o+S5Lu25a6a5LmJ55qE5YWo5bGA5Y+Y6YePXHJcbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgKz0gXy5qb2luKFsnSGVsbG8nLCAnd2VicGFjayddLCAnICcpO1xyXG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MICs9IGpvaW4oWyfkvaDlpb0nLCAnd2VicGFjayddLCAnICcpO1xyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29tcG9uZW50KCkpO1xyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICAvL+S9v+eUqOWKqOaAgeWvvOWFpeaWueahiDHvvJpcclxuICAgIC8qZnVuY3Rpb24gZ2V0Q29tcG9uZW50KCkge1xyXG4gICAgICAgIHJldHVybiBpbXBvcnQoJ2xvZGFzaCcpLnRoZW4oKHsgZGVmYXVsdDogXyB9KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIFxyXG4gICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IF8uam9pbihbJ0hlbGxvJywgJ3dlYnBhY2snXSwgJyAnKTtcclxuICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIFxyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+ICfliqjmgIHliqDovb3mqKHlnZfplJnor68nKTtcclxuICAgIH0qL1xyXG4gICAgXHJcbiAgICBcclxuICAgIC8qLy/kvb/nlKjliqjmgIHlr7zlhaXmlrnmoYgy77yaXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRDb21wb25lbnQoKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb25zdCBfID0gYXdhaXQgcmVxdWlyZSgnbG9kYXNoJyk7XHJcbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBfLmpvaW4oWydIZWxsbycsICd3ZWJwYWNrJ10sICcgJyk7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldENvbXBvbmVudCgpLnRoZW4oZnVuY3Rpb24gKGNvbXBvbmVudCkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29tcG9uZW50KTtcclxuICAgIH0pOyovXHJcbiAgICBcclxuICAgIFxyXG4gICAgLypcclxuICAgIGdldENvbXBvbmVudCgpLnRoZW4oY29tcG9uZW50ID0+IHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbXBvbmVudCk7XHJcbiAgICB9KTtcclxuICAgICovXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog55So5LqO55uR5o6n5p+Q5LiA5Liq5qih5Z2X6KKr6YeN5paw5L+u5pS55LqG77yM5bCx5Lya6L+b5YWl5aaC5LiL6L+Z5Liq5Zue6LCD5pa55rOVXHJcbiAgICAgKiDmqKHlnZfng63mm7/mjaLnmoTlkK/nlKhITVJcclxuICAgICAqL1xyXG4gICAgLyppZiAobW9kdWxlLmhvdCkge1xyXG4gICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCcuL2Fub3RoZXItbW9kdWxlLmpzJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL+W9k21hdGguanPmqKHlnZflhoXlrrnooqvkv67mlLnvvIzlsLHkvJrov5vlhaXlvZPliY3lm57osIPmlrnms5VcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Fub3RoZXItbW9kdWxlLmpz5qih5Z2X6KKr54Ot5Yqg6L295oiQ5YqfIScpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gY29tcG9uZW50KCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9Ki9cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==