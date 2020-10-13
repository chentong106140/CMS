(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["index"],{

/***/ "oFa9":
/*!************************!*\
  !*** ./src/ts/test.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {
//import {jQuery as $} from '@types/jquery'
Object.defineProperty(exports, "__esModule", { value: true });
exports.jq2 = exports.jq = void 0;
function jq(selector) {
    console.log($(selector));
}
exports.jq = jq;
exports.jq2 = function (callback) {
    $(function () {
        console.log('a', this);
        console.log('b', window);
        callback && callback();
    });
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "ozZp")))

/***/ }),

/***/ "tjUo":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {

var _test = __webpack_require__(/*! ./ts/test */ "oFa9");

var myjq = _interopRequireWildcard(_test);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

console.log(myjq);

window.myjq = myjq;

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

    return element;
}

document.body.appendChild(component());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! lodash */ "oUqH")))

/***/ })

},[["tjUo","runtime","vendors"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdHMvdGVzdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsibXlqcSIsImNvbnNvbGUiLCJsb2ciLCJ3aW5kb3ciLCJlbnYiLCJwcm9jZXNzIiwiY29tcG9uZW50IiwiZWxlbWVudCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsIl8iLCJqb2luIiwiYm9keSIsImFwcGVuZENoaWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJDQUEyQzs7O0FBRTNDLFNBQWdCLEVBQUUsQ0FBQyxRQUFlO0lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUZELGdCQUVDO0FBRVUsV0FBRyxHQUFHLFVBQVUsUUFBb0I7SUFDM0MsQ0FBQyxDQUFDO1FBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEIsUUFBUSxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDWkY7O0lBQVlBLEk7Ozs7QUFHWkMsUUFBUUMsR0FBUixDQUFZRixJQUFaOztBQUVBRyxPQUFPSCxJQUFQLEdBQWNBLElBQWQ7O0FBRUE7QUFDQSxJQUFJSSxNQUFNQyxhQUFWOztBQUVBLElBQUlELFFBQVEsWUFBWixFQUEwQjtBQUN0QkgsWUFBUUMsR0FBUixDQUFZLGVBQWVFLEdBQTNCO0FBQ0gsQ0FGRCxNQUVPO0FBQ0hILFlBQVFDLEdBQVIsQ0FBWSxlQUFlRSxHQUEzQjtBQUNIOztBQUtELFNBQVNFLFNBQVQsR0FBcUI7QUFDakIsUUFBTUMsVUFBVUMsU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUFoQjtBQUNBO0FBQ0FGLFlBQVFHLFNBQVIsSUFBcUJDLEVBQUVDLElBQUYsQ0FBTyxDQUFDLE9BQUQsRUFBVSxTQUFWLENBQVAsRUFBNkIsR0FBN0IsQ0FBckI7O0FBRUEsV0FBT0wsT0FBUDtBQUNIOztBQUVEQyxTQUFTSyxJQUFULENBQWNDLFdBQWQsQ0FBMEJSLFdBQTFCLEUiLCJmaWxlIjoiaW5kZXguMzI0MTRlZmRhNTNkYzdkM2NkMTIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2ltcG9ydCB7alF1ZXJ5IGFzICR9IGZyb20gJ0B0eXBlcy9qcXVlcnknXHJcblxyXG5leHBvcnQgZnVuY3Rpb24ganEoc2VsZWN0b3I6c3RyaW5nKTphbnkge1xyXG4gICAgY29uc29sZS5sb2coJChzZWxlY3RvcikpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIGpxMiA9IGZ1bmN0aW9uIChjYWxsYmFjayA6ICgpID0+IGFueSk6YW55IHtcclxuICAgICQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnYScsdGhpcyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdiJyx3aW5kb3cpO1xyXG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xyXG4gIH0pOyBcclxufTtcclxuXHJcbiIsImltcG9ydCAqIGFzIG15anEgZnJvbSAgJy4vdHMvdGVzdCdcclxuXHJcblxyXG5jb25zb2xlLmxvZyhteWpxKTtcclxuXHJcbndpbmRvdy5teWpxID0gbXlqcTtcclxuXHJcbi8v6I635Y+W546v5aKD5Y+Y6YeP5piv55Sf5Lqn546v5aKD6L+Y5piv5byA5Y+R546v5aKDXHJcbnZhciBlbnYgPSBwcm9jZXNzLmVudi5OT0RFX0VOVjtcclxuXHJcbmlmIChlbnYgPT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgY29uc29sZS5sb2coXCLlvZPliY3njq/looPkuLrnlJ/kuqfnjq/looPvvIFcIiArIGVudik7XHJcbn0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIuW9k+WJjeeOr+Wig+S4uuW8gOWPkeeOr+Wig++8gVwiICsgZW52KTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gY29tcG9uZW50KCkge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgLy/kuIvpnaLnmoRf5ZKMam9pbuWPmOmHj+aYr+mAmui/h3dlYnBhY2suUHJvdmlkZVBsdWdpbuaPkuS7tuWumuS5ieeahOWFqOWxgOWPmOmHj1xyXG4gICAgZWxlbWVudC5pbm5lckhUTUwgKz0gXy5qb2luKFsnSGVsbG8nLCAnd2VicGFjayddLCAnICcpO1xyXG5cclxuICAgIHJldHVybiBlbGVtZW50O1xyXG59XHJcblxyXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbXBvbmVudCgpKTsiXSwic291cmNlUm9vdCI6IiJ9