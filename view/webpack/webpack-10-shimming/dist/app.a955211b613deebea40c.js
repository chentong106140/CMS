(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app"],{

/***/ "8qja":
/*!************************!*\
  !*** ./src/globals.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CT = null;
function b2() {
    this.$ = function (id) {
        if (typeof id == 'undefined' || id == '' || id == undefined || id == null) return null;
        return document.getElementById(id);
    };
}
CT = new b2();

/*** EXPORTS FROM exports-loader ***/
exports["CT"] = (CT);
exports["$"] = (CT.$);

/***/ }),

/***/ "tjUo":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(_, myJoin) {/*** IMPORTS FROM imports-loader ***/
(function() {

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _globals = __webpack_require__(/*! ./globals.js */ "8qja");

/**
 * 验证lodash模块导入
 * 验证myJson全局变量导入
 */
function component() {
    var element = document.createElement('div');
    element.id = "test";
    //_对象是引用的lodash，前提是项目必须安装了lodash模块
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.innerHTML += myJoin(['你好', '全局变量导入成功'], ' ');
    return element;
}

var element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);

//默认情况下this指向的是CommonJs环境中的module.exports模块，并不是window对象
//如果我们希望this指向为window，就需要在webpack配置文件中的规则中添加exports-loader修改当前模块的this指向
console.log("imports-loader导入测试this", undefined, undefined === window);

console.log(typeof _globals.CT === 'undefined' ? 'undefined' : _typeof(_globals.CT));
console.log(typeof _globals.$ === 'undefined' ? 'undefined' : _typeof(_globals.$));
console.log((0, _globals.$)("test"));
}.call(window));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! lodash */ "wfkH"), __webpack_require__(/*! lodash */ "wfkH")["join"]))

/***/ })

},[["tjUo","runtime","vendors"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZ2xvYmFscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQ1QiLCJiMiIsIiQiLCJpZCIsInVuZGVmaW5lZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjb21wb25lbnQiLCJlbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsIl8iLCJqb2luIiwibXlKb2luIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY29uc29sZSIsImxvZyIsIndpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSUEsS0FBSyxJQUFUO0FBQ0EsU0FBU0MsRUFBVCxHQUFjO0FBQ1YsU0FBS0MsQ0FBTCxHQUFTLFVBQVVDLEVBQVYsRUFBYztBQUNuQixZQUFJLE9BQU9BLEVBQVAsSUFBYyxXQUFkLElBQTZCQSxNQUFNLEVBQW5DLElBQXlDQSxNQUFNQyxTQUEvQyxJQUE0REQsTUFBTSxJQUF0RSxFQUE0RSxPQUFPLElBQVA7QUFDNUUsZUFBT0UsU0FBU0MsY0FBVCxDQUF3QkgsRUFBeEIsQ0FBUDtBQUNILEtBSEQ7QUFJSDtBQUNESCxLQUFLLElBQUlDLEVBQUosRUFBTCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUkE7O0FBRUE7Ozs7QUFJQSxTQUFTTSxTQUFULEdBQXFCO0FBQ2pCLFFBQUlDLFVBQVVILFNBQVNJLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBZDtBQUNBRCxZQUFRTCxFQUFSLEdBQWEsTUFBYjtBQUNBO0FBQ0FLLFlBQVFFLFNBQVIsR0FBb0JDLEVBQUVDLElBQUYsQ0FBTyxDQUFDLE9BQUQsRUFBVSxTQUFWLENBQVAsRUFBNkIsR0FBN0IsQ0FBcEI7QUFDQUosWUFBUUUsU0FBUixJQUFxQkcsT0FBTyxDQUFDLElBQUQsRUFBTyxVQUFQLENBQVAsRUFBMkIsR0FBM0IsQ0FBckI7QUFDQSxXQUFPTCxPQUFQO0FBQ0g7O0FBRUQsSUFBSUEsVUFBVUQsV0FBZCxDLENBQTJCO0FBQzNCRixTQUFTUyxJQUFULENBQWNDLFdBQWQsQ0FBMEJQLE9BQTFCOztBQUdBO0FBQ0E7QUFDQVEsUUFBUUMsR0FBUixDQUFZLHdCQUFaLGFBQTRDLGNBQVNDLE1BQXJEOztBQUlBRixRQUFRQyxHQUFSLFFBQW1CakIsV0FBbkIseUNBQW1CQSxXQUFuQjtBQUNBZ0IsUUFBUUMsR0FBUixRQUFtQmYsVUFBbkIseUNBQW1CQSxVQUFuQjtBQUNBYyxRQUFRQyxHQUFSLENBQVksZ0JBQUUsTUFBRixDQUFaLEUiLCJmaWxlIjoiYXBwLmE5NTUyMTFiNjEzZGVlYmVhNDBjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG52YXIgQ1QgPSBudWxsO1xuZnVuY3Rpb24gYjIoKSB7XG4gICAgdGhpcy4kID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIGlmICh0eXBlb2YoaWQpID09ICd1bmRlZmluZWQnIHx8IGlkID09ICcnIHx8IGlkID09IHVuZGVmaW5lZCB8fCBpZCA9PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICB9O1xufVxuQ1QgPSBuZXcgYjIoKTtcblxuXG4iLCJpbXBvcnQge0NULCR9IGZyb20gJy4vZ2xvYmFscy5qcydcclxuXHJcbi8qKlxyXG4gKiDpqozor4Fsb2Rhc2jmqKHlnZflr7zlhaVcclxuICog6aqM6K+BbXlKc29u5YWo5bGA5Y+Y6YeP5a+85YWlXHJcbiAqL1xyXG5mdW5jdGlvbiBjb21wb25lbnQoKSB7XHJcbiAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZWxlbWVudC5pZCA9IFwidGVzdFwiO1xyXG4gICAgLy9f5a+56LGh5piv5byV55So55qEbG9kYXNo77yM5YmN5o+Q5piv6aG555uu5b+F6aG75a6J6KOF5LqGbG9kYXNo5qih5Z2XXHJcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IF8uam9pbihbJ0hlbGxvJywgJ3dlYnBhY2snXSwgJyAnKTtcclxuICAgIGVsZW1lbnQuaW5uZXJIVE1MICs9IG15Sm9pbihbJ+S9oOWlvScsICflhajlsYDlj5jph4/lr7zlhaXmiJDlip8nXSwgJyAnKTtcclxuICAgIHJldHVybiBlbGVtZW50O1xyXG59XHJcblxyXG5sZXQgZWxlbWVudCA9IGNvbXBvbmVudCgpOyAvLyDlvZMgcHJpbnQuanMg5pS55Y+Y5a+86Ie06aG16Z2i6YeN5paw5riy5p+T5pe277yM6YeN5paw6I635Y+W5riy5p+T55qE5YWD57SgXHJcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcblxyXG5cclxuLy/pu5jorqTmg4XlhrXkuIt0aGlz5oyH5ZCR55qE5pivQ29tbW9uSnPnjq/looPkuK3nmoRtb2R1bGUuZXhwb3J0c+aooeWdl++8jOW5tuS4jeaYr3dpbmRvd+WvueixoVxyXG4vL+WmguaenOaIkeS7rOW4jOacm3RoaXPmjIflkJHkuLp3aW5kb3fvvIzlsLHpnIDopoHlnKh3ZWJwYWNr6YWN572u5paH5Lu25Lit55qE6KeE5YiZ5Lit5re75YqgZXhwb3J0cy1sb2FkZXLkv67mlLnlvZPliY3mqKHlnZfnmoR0aGlz5oyH5ZCRXHJcbmNvbnNvbGUubG9nKFwiaW1wb3J0cy1sb2FkZXLlr7zlhaXmtYvor5V0aGlzXCIsIHRoaXMsIHRoaXMgPT09IHdpbmRvdyk7XHJcblxyXG5cclxuXHJcbmNvbnNvbGUubG9nKHR5cGVvZiBDVCk7XHJcbmNvbnNvbGUubG9nKHR5cGVvZiAkKTtcclxuY29uc29sZS5sb2coJChcInRlc3RcIikpO1xyXG5cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=