(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app"],{

/***/ "QCq+":
/*!**********************!*\
  !*** ./src/event.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Created by cherish on 2018/11/15.
 */


/* harmony default export */ __webpack_exports__["default"] = (function (txt) {
    console.log(txt);
});

/***/ }),

/***/ "dSPy":
/*!**********************!*\
  !*** ./src/print.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return printMe; });
/**
 * Created by cherish on 2018/11/7.
 */

function printMe() {
    console.log('Updating print.js...FFF');
}










































/***/ }),

/***/ "tjUo":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "wfkH");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _print_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./print.js */ "dSPy");
/* harmony import */ var _event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./event.js */ "QCq+");
/**
 * Created by cherish on 2018/11/6.
 */





if (true) {
    console.log('当前是开发环境');
}else {}

function component() {
    var element = document.createElement('div');
    //_对象是引用的lodash，前提是项目必须安装了lodash模块
    element.innerHTML = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.join(['Hello', 'webpack'], ' ');

    var btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = _event_js__WEBPACK_IMPORTED_MODULE_2__["default"].bind(null,"点击时，手动传参成功！");
    element.appendChild(btn);

    return element;
}

let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);





/***/ })

},[["tjUo","runtime","vendors"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ByaW50LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUNBO0FBQ0E7OztBQUdlO0FBQ2Y7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNQQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUVlO0FBQ2Y7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUV1QjtBQUNVO0FBQ0Y7O0FBRS9CLElBQUksSUFBc0M7QUFDMUM7QUFDQSxDQUFDLEtBQUssRUFFTDs7QUFFRDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsNkNBQUM7O0FBRXpCO0FBQ0E7QUFDQSxrQkFBa0IsaURBQUs7QUFDdkI7O0FBRUE7QUFDQTs7QUFFQSwwQkFBMEI7QUFDMUIiLCJmaWxlIjoiYXBwLjNjYmQyNmUyNDkyZWUyZDZiMWI0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgY2hlcmlzaCBvbiAyMDE4LzExLzE1LlxyXG4gKi9cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAodHh0KSB7XHJcbiAgICBjb25zb2xlLmxvZyh0eHQpO1xyXG59IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgY2hlcmlzaCBvbiAyMDE4LzExLzcuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJpbnRNZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdVcGRhdGluZyBwcmludC5qcy4uLkZGRicpO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBjaGVyaXNoIG9uIDIwMTgvMTEvNi5cclxuICovXHJcblxyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgcHJpbnRNZSBmcm9tICcuL3ByaW50LmpzJztcclxuaW1wb3J0IGV2ZW50IGZyb20gJy4vZXZlbnQuanMnO1xyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLmxvZygn5b2T5YmN5piv5byA5Y+R546v5aKDJyk7XHJcbn1lbHNlIGlmKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcclxuICAgIGNvbnNvbGUubG9nKCflvZPliY3mmK/nlJ/kuqfnjq/looMnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY29tcG9uZW50KCkge1xyXG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIC8vX+WvueixoeaYr+W8leeUqOeahGxvZGFzaO+8jOWJjeaPkOaYr+mhueebruW/hemhu+WuieijheS6hmxvZGFzaOaooeWdl1xyXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBfLmpvaW4oWydIZWxsbycsICd3ZWJwYWNrJ10sICcgJyk7XHJcblxyXG4gICAgdmFyIGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgYnRuLmlubmVySFRNTCA9ICdDbGljayBtZSBhbmQgY2hlY2sgdGhlIGNvbnNvbGUhJztcclxuICAgIGJ0bi5vbmNsaWNrID0gZXZlbnQuYmluZChudWxsLFwi54K55Ye75pe277yM5omL5Yqo5Lyg5Y+C5oiQ5Yqf77yBXCIpO1xyXG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChidG4pO1xyXG5cclxuICAgIHJldHVybiBlbGVtZW50O1xyXG59XHJcblxyXG5sZXQgZWxlbWVudCA9IGNvbXBvbmVudCgpOyAvLyDlvZMgcHJpbnQuanMg5pS55Y+Y5a+86Ie06aG16Z2i6YeN5paw5riy5p+T5pe277yM6YeN5paw6I635Y+W5riy5p+T55qE5YWD57SgXHJcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcblxyXG5cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=