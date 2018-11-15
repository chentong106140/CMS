(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app"],{

/***/ "QCq+":
/*!**********************!*\
  !*** ./src/event.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (txt) {
  console.log(txt);
};

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
exports.default = printMe;
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lodash = __webpack_require__(/*! lodash */ "wfkH");

var _lodash2 = _interopRequireDefault(_lodash);

var _print = __webpack_require__(/*! ./print.js */ "dSPy");

var _print2 = _interopRequireDefault(_print);

var _event = __webpack_require__(/*! ./event.js */ "QCq+");

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (true) {
    console.log('当前是开发环境');
} else {} /**
   * Created by cherish on 2018/11/6.
   */

function component() {
    var element = document.createElement('div');
    //_对象是引用的lodash，前提是项目必须安装了lodash模块
    element.innerHTML = _lodash2.default.join(['Hello', 'webpack'], ' ');

    var btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = _event2.default.bind(null, "点击时，手动传参成功！");
    element.appendChild(btn);

    return element;
}

var element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);

/***/ })

},[["tjUo","runtime","vendors"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ByaW50LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJ0eHQiLCJjb25zb2xlIiwibG9nIiwicHJpbnRNZSIsInByb2Nlc3MiLCJjb21wb25lbnQiLCJlbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiXyIsImpvaW4iLCJidG4iLCJvbmNsaWNrIiwiZXZlbnQiLCJiaW5kIiwiYXBwZW5kQ2hpbGQiLCJib2R5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O2tCQUtlLFVBQVVBLEdBQVYsRUFBZTtBQUMxQkMsVUFBUUMsR0FBUixDQUFZRixHQUFaO0FBQ0gsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JDSHVCRyxPO0FBSnhCOzs7O0FBSWUsU0FBU0EsT0FBVCxHQUFtQjtBQUM5QkYsVUFBUUMsR0FBUixDQUFZLHlCQUFaO0FBQ0gsQzs7Ozs7Ozs7Ozs7Ozs7QUNGRDs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUlFLElBQUosRUFBNEM7QUFDeENILFlBQVFDLEdBQVIsQ0FBWSxTQUFaO0FBQ0gsQ0FGRCxNQUVNLEUsQ0FWTjs7OztBQWNBLFNBQVNHLFNBQVQsR0FBcUI7QUFDakIsUUFBSUMsVUFBVUMsU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUFkO0FBQ0E7QUFDQUYsWUFBUUcsU0FBUixHQUFvQkMsaUJBQUVDLElBQUYsQ0FBTyxDQUFDLE9BQUQsRUFBVSxTQUFWLENBQVAsRUFBNkIsR0FBN0IsQ0FBcEI7O0FBRUEsUUFBSUMsTUFBTUwsU0FBU0MsYUFBVCxDQUF1QixRQUF2QixDQUFWO0FBQ0FJLFFBQUlILFNBQUosR0FBZ0IsaUNBQWhCO0FBQ0FHLFFBQUlDLE9BQUosR0FBY0MsZ0JBQU1DLElBQU4sQ0FBVyxJQUFYLEVBQWdCLGFBQWhCLENBQWQ7QUFDQVQsWUFBUVUsV0FBUixDQUFvQkosR0FBcEI7O0FBRUEsV0FBT04sT0FBUDtBQUNIOztBQUVELElBQUlBLFVBQVVELFdBQWQsQyxDQUEyQjtBQUMzQkUsU0FBU1UsSUFBVCxDQUFjRCxXQUFkLENBQTBCVixPQUExQixFIiwiZmlsZSI6ImFwcC4wYmVjZGM0YTRmZWIwZWEwOTdiZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGNoZXJpc2ggb24gMjAxOC8xMS8xNS5cclxuICovXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHR4dCkge1xyXG4gICAgY29uc29sZS5sb2codHh0KTtcclxufSIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGNoZXJpc2ggb24gMjAxOC8xMS83LlxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByaW50TWUoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnVXBkYXRpbmcgcHJpbnQuanMuLi5GRkYnKTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgY2hlcmlzaCBvbiAyMDE4LzExLzYuXHJcbiAqL1xyXG5cclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHByaW50TWUgZnJvbSAnLi9wcmludC5qcyc7XHJcbmltcG9ydCBldmVudCBmcm9tICcuL2V2ZW50LmpzJztcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS5sb2coJ+W9k+WJjeaYr+W8gOWPkeeOr+WigycpO1xyXG59ZWxzZSBpZihwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICBjb25zb2xlLmxvZygn5b2T5YmN5piv55Sf5Lqn546v5aKDJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXBvbmVudCgpIHtcclxuICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAvL1/lr7nosaHmmK/lvJXnlKjnmoRsb2Rhc2jvvIzliY3mj5DmmK/pobnnm67lv4Xpobvlronoo4XkuoZsb2Rhc2jmqKHlnZdcclxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXy5qb2luKFsnSGVsbG8nLCAnd2VicGFjayddLCAnICcpO1xyXG5cclxuICAgIHZhciBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGJ0bi5pbm5lckhUTUwgPSAnQ2xpY2sgbWUgYW5kIGNoZWNrIHRoZSBjb25zb2xlISc7XHJcbiAgICBidG4ub25jbGljayA9IGV2ZW50LmJpbmQobnVsbCxcIueCueWHu+aXtu+8jOaJi+WKqOS8oOWPguaIkOWKn++8gVwiKTtcclxuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoYnRuKTtcclxuXHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5cclxubGV0IGVsZW1lbnQgPSBjb21wb25lbnQoKTsgLy8g5b2TIHByaW50LmpzIOaUueWPmOWvvOiHtOmhtemdoumHjeaWsOa4suafk+aXtu+8jOmHjeaWsOiOt+WPlua4suafk+eahOWFg+e0oFxyXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG5cclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9