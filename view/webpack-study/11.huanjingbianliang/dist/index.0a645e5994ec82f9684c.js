(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["index"],{

/***/ "tjUo":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lodash = __webpack_require__(/*! lodash */ "oUqH");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = "development"; //import Print from './print';
//没有被引用，只是被导入，目的是为了验证引用的公共库要打包在vendors中


if (env === 'production') {
    console.log("当前环境为生产环境！" + env);
} else {
    console.log("当前环境为测试环境！" + env);
}

function component() {
    var element = document.createElement('div');

    element.innerHTML = _lodash2.default.join(['Hello', 'webpack'], ' ');
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

/***/ })

},[["tjUo","runtime","vendors"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiZW52IiwicHJvY2VzcyIsImNvbnNvbGUiLCJsb2ciLCJjb21wb25lbnQiLCJlbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiXyIsImpvaW4iLCJib2R5IiwiYXBwZW5kQ2hpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7QUFHQSxJQUFJQSxNQUFNQyxhQUFWLEMsQ0FMQTtBQUNBOzs7QUFNQSxJQUFJRCxRQUFRLFlBQVosRUFBMEI7QUFDdEJFLFlBQVFDLEdBQVIsQ0FBWSxlQUFlSCxHQUEzQjtBQUNILENBRkQsTUFFTztBQUNIRSxZQUFRQyxHQUFSLENBQVksZUFBZUgsR0FBM0I7QUFDSDs7QUFFRCxTQUFTSSxTQUFULEdBQXFCO0FBQ2pCLFFBQU1DLFVBQVVDLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7O0FBRUFGLFlBQVFHLFNBQVIsR0FBb0JDLGlCQUFFQyxJQUFGLENBQU8sQ0FBQyxPQUFELEVBQVUsU0FBVixDQUFQLEVBQTZCLEdBQTdCLENBQXBCO0FBQ0EsV0FBT0wsT0FBUDtBQUNIO0FBQ0RDLFNBQVNLLElBQVQsQ0FBY0MsV0FBZCxDQUEwQlIsV0FBMUI7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUFZQTs7Ozs7Ozs7Ozs7O0FBYUE7Ozs7OztBQU1BOzs7O0FBSUEiLCJmaWxlIjoiaW5kZXguMGE2NDVlNTk5NGVjODJmOTY4NGMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2ltcG9ydCBQcmludCBmcm9tICcuL3ByaW50JztcclxuLy/msqHmnInooqvlvJXnlKjvvIzlj6rmmK/ooqvlr7zlhaXvvIznm67nmoTmmK/kuLrkuobpqozor4HlvJXnlKjnmoTlhazlhbHlupPopoHmiZPljIXlnKh2ZW5kb3Jz5LitXHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5cclxudmFyIGVudiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WO1xyXG5cclxuaWYgKGVudiA9PT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIuW9k+WJjeeOr+Wig+S4uueUn+S6p+eOr+Wig++8gVwiICsgZW52KTtcclxufSBlbHNlIHtcclxuICAgIGNvbnNvbGUubG9nKFwi5b2T5YmN546v5aKD5Li65rWL6K+V546v5aKD77yBXCIgKyBlbnYpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wb25lbnQoKSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBfLmpvaW4oWydIZWxsbycsICd3ZWJwYWNrJ10sICcgJyk7XHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbXBvbmVudCgpKTtcclxuXHJcbi8v5L2/55So5Yqo5oCB5a+85YWl5pa55qGIMe+8mlxyXG4vKmZ1bmN0aW9uIGdldENvbXBvbmVudCgpIHtcclxuICAgIHJldHVybiBpbXBvcnQoJ2xvZGFzaCcpLnRoZW4oKHsgZGVmYXVsdDogXyB9KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IF8uam9pbihbJ0hlbGxvJywgJ3dlYnBhY2snXSwgJyAnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcblxyXG4gICAgfSkuY2F0Y2goZXJyb3IgPT4gJ+WKqOaAgeWKoOi9veaooeWdl+mUmeivrycpO1xyXG59Ki9cclxuXHJcblxyXG4vKi8v5L2/55So5Yqo5oCB5a+85YWl5pa55qGIMu+8mlxyXG5hc3luYyBmdW5jdGlvbiBnZXRDb21wb25lbnQoKSB7XHJcbiAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgXyA9IGF3YWl0IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBfLmpvaW4oWydIZWxsbycsICd3ZWJwYWNrJ10sICcgJyk7XHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5cclxuZ2V0Q29tcG9uZW50KCkudGhlbihmdW5jdGlvbiAoY29tcG9uZW50KSB7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbXBvbmVudCk7XHJcbn0pOyovXHJcblxyXG5cclxuLypcclxuZ2V0Q29tcG9uZW50KCkudGhlbihjb21wb25lbnQgPT4ge1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb21wb25lbnQpO1xyXG59KTtcclxuKi9cclxuXHJcbi8qKlxyXG4gKiDnlKjkuo7nm5Hmjqfmn5DkuIDkuKrmqKHlnZfooqvph43mlrDkv67mlLnkuobvvIzlsLHkvJrov5vlhaXlpoLkuIvov5nkuKrlm57osIPmlrnms5VcclxuICog5qih5Z2X54Ot5pu/5o2i55qE5ZCv55SoSE1SXHJcbiAqL1xyXG4vKmlmIChtb2R1bGUuaG90KSB7XHJcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgnLi9hbm90aGVyLW1vZHVsZS5qcycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL+W9k21hdGguanPmqKHlnZflhoXlrrnooqvkv67mlLnvvIzlsLHkvJrov5vlhaXlvZPliY3lm57osIPmlrnms5VcclxuICAgICAgICBjb25zb2xlLmxvZygnYW5vdGhlci1tb2R1bGUuanPmqKHlnZfooqvng63liqDovb3miJDlip8hJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuICAgICAgICBlbGVtZW50ID0gY29tcG9uZW50KCk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuICAgIH0pO1xyXG59Ki9cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==