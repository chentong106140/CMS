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
/* WEBPACK VAR INJECTION */(function(jquery, _, join) {/* harmony import */ var morgan_iptv_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! morgan-iptv-core */ "Nbek");
/* harmony import */ var morgan_iptv_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(morgan_iptv_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _print__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./print */ "dSPy");
/* harmony import */ var _print__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_print__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var morgan_iptv_key__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! morgan-iptv-key */ "m5rE");
/* harmony import */ var morgan_iptv_key__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(morgan_iptv_key__WEBPACK_IMPORTED_MODULE_2__);
/*** IMPORTS FROM imports-loader ***/







var name = "陈通";window.jquery=jquery;

(function(iptv, jquery) {
"use strict";

var _morganIptvCore = __webpack_require__(/*! morgan-iptv-core */ "Nbek");

var _morganIptvCore2 = _interopRequireDefault(_morganIptvCore);

var _globals = __webpack_require__(/*! ./globals */ "8qja");

var _globals2 = _interopRequireDefault(_globals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//没有显式的导入lodash,本文件也可以使用lodash的变量_,主要是在webpack.common.js内的ProvidePlugin插件定义了全局变量
//import _ from 'lodash';

/*import {default as print,show as s,print as p,say} from "./print";*/

/*import * as myPrint from './print'*/

//验证module.rules下面定义的imports-loader自动加载模块，无需手动import xx from './print'
_print__WEBPACK_IMPORTED_MODULE_1___default()("print"); //对应规则：'default ./print print'   =》对应语句:import print from './print'
Object(_print__WEBPACK_IMPORTED_MODULE_1__["show"])("show"); //对应规则：'named ./print show s'         =》对应语句：import {show as s} from './print'
Object(_print__WEBPACK_IMPORTED_MODULE_1__["print"])("print"); //对应规则：'named ./print print p'       =》对应语句：import {print as p} from './print'
Object(_print__WEBPACK_IMPORTED_MODULE_1__["say"])("say"); //对应规则：'named ./print say'           =》对应语句：import {say} from './print'
console.log(_print__WEBPACK_IMPORTED_MODULE_1__); //对应规则：'namespace ./print myPrint' =》对应语句：import * as myPrint from './print'
//Object { print: print(text), show: show(text), say: say(text), default: print(text), … }


console.log(_morganIptvCore2.default);
console.log(undefined); //undefined


//如下是验证globals.js文件模拟老版本的库，没有使用export导出变量，
// 此时如何通过exports-loader插件兼容老版本的库，也就是通过exports-loader插件让没有export导出变量的js库，能够正常导出变量

console.log(_globals.infos); //验证：'infos'，这里讲infos重新命名为myInfos进行导入
(0, _globals2.default)('mysays'); //验证：'default say'，这里将default say 重新命名为mysay进行导入
_globals.helper.test('test'); //验证：'helper'
_globals.helper.info('info'); //验证：'helper'
(0, _globals.says)('says'); //验证：'named say says'


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
}.call(window, morgan_iptv_core__WEBPACK_IMPORTED_MODULE_0__["iptv"], jquery));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "ozZp"), __webpack_require__(/*! lodash */ "oUqH"), __webpack_require__(/*! lodash */ "oUqH")["join"]))

/***/ })

},[["tjUo","runtime","vendors"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZ2xvYmFscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImluZm9zIiwic2F5IiwidGV4dCIsImNvbnNvbGUiLCJsb2ciLCJoZWxwZXIiLCJ0ZXN0IiwiaW5mbyIsInByaW50Iiwic2hvdyIsImRlZmF1bHQiLCJzIiwicCIsIm15UHJpbnQiLCJpcHR2IiwibXlJbmZvcyIsInJlcXVpcmUiLCJlbnYiLCJwcm9jZXNzIiwiY29tcG9uZW50IiwiZWxlbWVudCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsIl8iLCJqb2luIiwiYm9keSIsImFwcGVuZENoaWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsUUFBUSx1QkFBWjs7QUFFQSxJQUFJQyxNQUFNLFNBQU5BLEdBQU0sQ0FBVUMsSUFBVixFQUFnQjtBQUN0QkMsWUFBUUMsR0FBUixDQUFZRixJQUFaO0FBQ0gsQ0FGRDs7QUFJQSxJQUFJRyxTQUFTO0FBQ1RDLFVBQU0sY0FBVUosSUFBVixFQUFnQjtBQUNsQkMsZ0JBQVFDLEdBQVIsQ0FBWUYsSUFBWjtBQUNILEtBSFE7QUFJVEssVUFBSyxjQUFVTCxJQUFWLEVBQWdCO0FBQ2pCQyxnQkFBUUMsR0FBUixDQUFZRixJQUFaO0FBQ0g7QUFOUSxDQUFiLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BLElBQUlNLFFBQVEsU0FBU0EsS0FBVCxDQUFlTixJQUFmLEVBQXFCO0FBQzdCQyxZQUFRQyxHQUFSLENBQVlGLElBQVo7QUFDSCxDQUZEOztBQUlBLElBQUlPLE9BQU8sU0FBUEEsSUFBTyxDQUFVUCxJQUFWLEVBQWdCO0FBQ3ZCQyxZQUFRQyxHQUFSLENBQVlGLElBQVo7QUFDSCxDQUZEOztBQUlBLElBQUlELE1BQU0sU0FBTkEsR0FBTSxDQUFVQyxJQUFWLEVBQWdCO0FBQ3RCQyxZQUFRQyxHQUFSLENBQVlGLElBQVo7QUFDSCxDQUZEOztBQUtBLElBQUlGLFFBQVEsbUJBQVo7O1FBRWlCVSxPLEdBQVRGLEs7UUFBa0JBLEssR0FBQUEsSztRQUFPQyxJLEdBQUFBLEk7UUFBTVIsRyxHQUFBQSxHO1FBQUtELEssR0FBQUEsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNDeEM7Ozs7QUFRQTs7Ozs7O0FBeEJBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQVEsNkNBQUtBLENBQUMsT0FBTixFLENBQWU7QUFDZkcsbURBQUNBLENBQUMsTUFBRixFLENBQVU7QUFDVkMsb0RBQUNBLENBQUMsT0FBRixFLENBQVc7QUFDWFgsa0RBQUdBLENBQUMsS0FBSixFLENBQVc7QUFDWEUsUUFBUUMsR0FBUixDQUFZUyxtQ0FBWixFLENBQXFCO0FBQ3JCOzs7QUFLQVYsUUFBUUMsR0FBUixDQUFZVSx3QkFBWjtBQUNBWCxRQUFRQyxHQUFSLFksQ0FBa0I7OztBQUdsQjtBQUNBOztBQUVBRCxRQUFRQyxHQUFSLENBQVlXLGNBQVosRSxDQUFxQjtBQUNyQix1QkFBTSxRQUFOLEUsQ0FBZ0I7QUFDaEJWLGdCQUFPQyxJQUFQLENBQVksTUFBWixFLENBQW9CO0FBQ3BCRCxnQkFBT0UsSUFBUCxDQUFZLE1BQVosRSxDQUFvQjtBQUNwQixtQkFBSyxNQUFMLEUsQ0FBYTs7O0FBR2JKLFFBQVFDLEdBQVIsQ0FBWVksbUJBQUEsQ0FBZ0IsMEJBQWhCLENBQVo7O0FBRUE7QUFDQSxJQUFJQyxNQUFNQyxhQUFWOztBQUVBLElBQUlELFFBQVEsWUFBWixFQUEwQjtBQUN0QmQsWUFBUUMsR0FBUixDQUFZLGVBQWVhLEdBQTNCO0FBQ0gsQ0FGRCxNQUVPO0FBQ0hkLFlBQVFDLEdBQVIsQ0FBWSxlQUFlYSxHQUEzQjtBQUNIOztBQUVELFNBQVNFLFNBQVQsR0FBcUI7QUFDakIsUUFBTUMsVUFBVUMsU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUFoQjtBQUNBO0FBQ0FGLFlBQVFHLFNBQVIsSUFBcUJDLEVBQUVDLElBQUYsQ0FBTyxDQUFDLE9BQUQsRUFBVSxTQUFWLENBQVAsRUFBNkIsR0FBN0IsQ0FBckI7QUFDQUwsWUFBUUcsU0FBUixJQUFxQkUsS0FBSyxDQUFDLElBQUQsRUFBTyxTQUFQLENBQUwsRUFBd0IsR0FBeEIsQ0FBckI7O0FBRUEsV0FBT0wsT0FBUDtBQUNIOztBQUVEQyxTQUFTSyxJQUFULENBQWNDLFdBQWQsQ0FBMEJSLFdBQTFCOztBQXlDQTtBQUNBOzs7Ozs7Ozs7OztBQVlBOzs7Ozs7Ozs7Ozs7QUFhQTs7Ozs7O0FBTUE7Ozs7QUFJQSIsImZpbGUiOiJpbmRleC5jMzA2ODM3ZjdjOGNlMTFlMjIzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBpbmZvcyA9IFwi5oiR5piv5p2l6IeqLi9zcmMvZ2xvYmFscy5qcyFcIjtcclxuXHJcbnZhciBzYXkgPSBmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgY29uc29sZS5sb2codGV4dCk7XHJcbn07XHJcblxyXG52YXIgaGVscGVyID0ge1xyXG4gICAgdGVzdDogZnVuY3Rpb24gKHRleHQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0ZXh0KTtcclxuICAgIH0sXHJcbiAgICBpbmZvOmZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGV4dCk7XHJcbiAgICB9XHJcbn07IiwidmFyIHByaW50ID0gZnVuY3Rpb24gcHJpbnQodGV4dCkge1xyXG4gICAgY29uc29sZS5sb2codGV4dCk7XHJcbn07XHJcblxyXG52YXIgc2hvdyA9IGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICBjb25zb2xlLmxvZyh0ZXh0KTtcclxufTtcclxuXHJcbnZhciBzYXkgPSBmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgY29uc29sZS5sb2codGV4dCk7XHJcbn07XHJcblxyXG5cclxudmFyIGluZm9zID0gJ+aIkeadpeiHqi4vc3JjL3ByaW50LmpzJztcclxuXHJcbmV4cG9ydCB7cHJpbnQgYXMgZGVmYXVsdCwgcHJpbnQsIHNob3csIHNheSwgaW5mb3N9OyIsIiAgICAvL+ayoeacieaYvuW8j+eahOWvvOWFpWxvZGFzaCzmnKzmlofku7bkuZ/lj6/ku6Xkvb/nlKhsb2Rhc2jnmoTlj5jph49fLOS4u+imgeaYr+WcqHdlYnBhY2suY29tbW9uLmpz5YaF55qEUHJvdmlkZVBsdWdpbuaPkuS7tuWumuS5ieS6huWFqOWxgOWPmOmHj1xyXG4gICAgLy9pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG4gICAgXHJcbiAgICAvKmltcG9ydCB7ZGVmYXVsdCBhcyBwcmludCxzaG93IGFzIHMscHJpbnQgYXMgcCxzYXl9IGZyb20gXCIuL3ByaW50XCI7Ki9cclxuICAgIFxyXG4gICAgLyppbXBvcnQgKiBhcyBteVByaW50IGZyb20gJy4vcHJpbnQnKi9cclxuICAgIFxyXG4gICAgLy/pqozor4Ftb2R1bGUucnVsZXPkuIvpnaLlrprkuYnnmoRpbXBvcnRzLWxvYWRlcuiHquWKqOWKoOi9veaooeWdl++8jOaXoOmcgOaJi+WKqGltcG9ydCB4eCBmcm9tICcuL3ByaW50J1xyXG4gICAgcHJpbnQoXCJwcmludFwiKTsvL+WvueW6lOinhOWIme+8midkZWZhdWx0IC4vcHJpbnQgcHJpbnQnICAgPeOAi+WvueW6lOivreWPpTppbXBvcnQgcHJpbnQgZnJvbSAnLi9wcmludCdcclxuICAgIHMoXCJzaG93XCIpOy8v5a+55bqU6KeE5YiZ77yaJ25hbWVkIC4vcHJpbnQgc2hvdyBzJyAgICAgICAgID3jgIvlr7nlupTor63lj6XvvJppbXBvcnQge3Nob3cgYXMgc30gZnJvbSAnLi9wcmludCdcclxuICAgIHAoXCJwcmludFwiKTsvL+WvueW6lOinhOWIme+8miduYW1lZCAuL3ByaW50IHByaW50IHAnICAgICAgID3jgIvlr7nlupTor63lj6XvvJppbXBvcnQge3ByaW50IGFzIHB9IGZyb20gJy4vcHJpbnQnXHJcbiAgICBzYXkoXCJzYXlcIik7Ly/lr7nlupTop4TliJnvvJonbmFtZWQgLi9wcmludCBzYXknICAgICAgICAgICA944CL5a+55bqU6K+t5Y+l77yaaW1wb3J0IHtzYXl9IGZyb20gJy4vcHJpbnQnXHJcbiAgICBjb25zb2xlLmxvZyhteVByaW50KTsvL+WvueW6lOinhOWIme+8miduYW1lc3BhY2UgLi9wcmludCBteVByaW50JyA944CL5a+55bqU6K+t5Y+l77yaaW1wb3J0ICogYXMgbXlQcmludCBmcm9tICcuL3ByaW50J1xyXG4gICAgLy9PYmplY3QgeyBwcmludDogcHJpbnQodGV4dCksIHNob3c6IHNob3codGV4dCksIHNheTogc2F5KHRleHQpLCBkZWZhdWx0OiBwcmludCh0ZXh0KSwg4oCmIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICBpbXBvcnQgaXB0diBmcm9tICdtb3JnYW4taXB0di1jb3JlJ1xyXG4gICAgXHJcbiAgICBjb25zb2xlLmxvZyhpcHR2KTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMpOy8vdW5kZWZpbmVkXHJcbiAgICBcclxuICAgIFxyXG4gICAgLy/lpoLkuIvmmK/pqozor4FnbG9iYWxzLmpz5paH5Lu25qih5ouf6ICB54mI5pys55qE5bqT77yM5rKh5pyJ5L2/55SoZXhwb3J05a+85Ye65Y+Y6YeP77yMXHJcbiAgICAvLyDmraTml7blpoLkvZXpgJrov4dleHBvcnRzLWxvYWRlcuaPkuS7tuWFvOWuueiAgeeJiOacrOeahOW6k++8jOS5n+WwseaYr+mAmui/h2V4cG9ydHMtbG9hZGVy5o+S5Lu26K6p5rKh5pyJZXhwb3J05a+85Ye65Y+Y6YeP55qEanPlupPvvIzog73lpJ/mraPluLjlr7zlh7rlj5jph49cclxuICAgIGltcG9ydCBteXNheSx7aW5mb3MgYXMgbXlJbmZvcyxoZWxwZXIsc2F5c30gZnJvbSAnLi9nbG9iYWxzJ1xyXG4gICAgY29uc29sZS5sb2cobXlJbmZvcyk7Ly/pqozor4HvvJonaW5mb3Mn77yM6L+Z6YeM6K6yaW5mb3Pph43mlrDlkb3lkI3kuLpteUluZm9z6L+b6KGM5a+85YWlXHJcbiAgICBteXNheSgnbXlzYXlzJyk7Ly/pqozor4HvvJonZGVmYXVsdCBzYXkn77yM6L+Z6YeM5bCGZGVmYXVsdCBzYXkg6YeN5paw5ZG95ZCN5Li6bXlzYXnov5vooYzlr7zlhaVcclxuICAgIGhlbHBlci50ZXN0KCd0ZXN0Jyk7Ly/pqozor4HvvJonaGVscGVyJ1xyXG4gICAgaGVscGVyLmluZm8oJ2luZm8nKTsvL+mqjOivge+8midoZWxwZXInXHJcbiAgICBzYXlzKCdzYXlzJyk7Ly/pqozor4HvvJonbmFtZWQgc2F5IHNheXMnXHJcbiAgICBcclxuICAgIFxyXG4gICAgY29uc29sZS5sb2cocmVxdWlyZS5yZXNvbHZlKCcuL2dsb2JhbHMuanMnKSk7XHJcbiAgICBcclxuICAgIC8v6I635Y+W546v5aKD5Y+Y6YeP5piv55Sf5Lqn546v5aKD6L+Y5piv5byA5Y+R546v5aKDXHJcbiAgICB2YXIgZW52ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlY7XHJcbiAgICBcclxuICAgIGlmIChlbnYgPT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5b2T5YmN546v5aKD5Li655Sf5Lqn546v5aKD77yBXCIgKyBlbnYpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuW9k+WJjeeOr+Wig+S4uuW8gOWPkeeOr+Wig++8gVwiICsgZW52KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gY29tcG9uZW50KCkge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAvL+S4i+mdoueahF/lkoxqb2lu5Y+Y6YeP5piv6YCa6L+Hd2VicGFjay5Qcm92aWRlUGx1Z2lu5o+S5Lu25a6a5LmJ55qE5YWo5bGA5Y+Y6YePXHJcbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgKz0gXy5qb2luKFsnSGVsbG8nLCAnd2VicGFjayddLCAnICcpO1xyXG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MICs9IGpvaW4oWyfkvaDlpb0nLCAnd2VicGFjayddLCAnICcpO1xyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29tcG9uZW50KCkpO1xyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICAvL+S9v+eUqOWKqOaAgeWvvOWFpeaWueahiDHvvJpcclxuICAgIC8qZnVuY3Rpb24gZ2V0Q29tcG9uZW50KCkge1xyXG4gICAgICAgIHJldHVybiBpbXBvcnQoJ2xvZGFzaCcpLnRoZW4oKHsgZGVmYXVsdDogXyB9KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIFxyXG4gICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IF8uam9pbihbJ0hlbGxvJywgJ3dlYnBhY2snXSwgJyAnKTtcclxuICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIFxyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+ICfliqjmgIHliqDovb3mqKHlnZfplJnor68nKTtcclxuICAgIH0qL1xyXG4gICAgXHJcbiAgICBcclxuICAgIC8qLy/kvb/nlKjliqjmgIHlr7zlhaXmlrnmoYgy77yaXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRDb21wb25lbnQoKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb25zdCBfID0gYXdhaXQgcmVxdWlyZSgnbG9kYXNoJyk7XHJcbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBfLmpvaW4oWydIZWxsbycsICd3ZWJwYWNrJ10sICcgJyk7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldENvbXBvbmVudCgpLnRoZW4oZnVuY3Rpb24gKGNvbXBvbmVudCkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29tcG9uZW50KTtcclxuICAgIH0pOyovXHJcbiAgICBcclxuICAgIFxyXG4gICAgLypcclxuICAgIGdldENvbXBvbmVudCgpLnRoZW4oY29tcG9uZW50ID0+IHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbXBvbmVudCk7XHJcbiAgICB9KTtcclxuICAgICovXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog55So5LqO55uR5o6n5p+Q5LiA5Liq5qih5Z2X6KKr6YeN5paw5L+u5pS55LqG77yM5bCx5Lya6L+b5YWl5aaC5LiL6L+Z5Liq5Zue6LCD5pa55rOVXHJcbiAgICAgKiDmqKHlnZfng63mm7/mjaLnmoTlkK/nlKhITVJcclxuICAgICAqL1xyXG4gICAgLyppZiAobW9kdWxlLmhvdCkge1xyXG4gICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCcuL2Fub3RoZXItbW9kdWxlLmpzJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL+W9k21hdGguanPmqKHlnZflhoXlrrnooqvkv67mlLnvvIzlsLHkvJrov5vlhaXlvZPliY3lm57osIPmlrnms5VcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Fub3RoZXItbW9kdWxlLmpz5qih5Z2X6KKr54Ot5Yqg6L295oiQ5YqfIScpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gY29tcG9uZW50KCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9Ki9cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==