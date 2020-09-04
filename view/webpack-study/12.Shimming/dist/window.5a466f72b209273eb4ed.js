(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["window"],{

/***/ "8SiO":
/*!***********************!*\
  !*** ./src/window.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jquery) {/*** IMPORTS FROM imports-loader ***/
var iptv = __webpack_require__(/*! morgan-iptv-core */ "Nbek");

console.log("自动导入模块成功！");

(function(iptv, jquery, window) {


//this = window;
//imports-loader@0.8.0
//imports-loader@1.1.0
window.showMe = ()=>{
  console.log('showMe',this);  
};

window.showMe2 = function(){
  console.log('showMe2',this);
};

function showMe3 (name){
  this.name=name;
  console.log(this.name);
}

window.showMe3 = showMe3;


console.log(arguments);

console.log(window);

console.log(this);



}.call(window, iptv, jquery, window));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "ozZp")))

/***/ })

},[["8SiO","runtime","vendors"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvd2luZG93LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0EsV0FBVyxtQkFBTyxDQUFDLDhCQUFrQjs7QUFFckM7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBOztBQUVBOzs7O0FBSUEsQ0FBQyIsImZpbGUiOiJ3aW5kb3cuNWE0NjZmNzJiMjA5MjczZWI0ZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqIElNUE9SVFMgRlJPTSBpbXBvcnRzLWxvYWRlciAqKiovXG52YXIgaXB0diA9IHJlcXVpcmUoXCJtb3JnYW4taXB0di1jb3JlXCIpO1xuXG5jb25zb2xlLmxvZyhcIuiHquWKqOWvvOWFpeaooeWdl+aIkOWKn++8gVwiKTtcblxuKGZ1bmN0aW9uKGlwdHYsIGpxdWVyeSwgd2luZG93KSB7XG5cclxuXHJcbi8vdGhpcyA9IHdpbmRvdztcclxuLy9pbXBvcnRzLWxvYWRlckAwLjguMFxyXG4vL2ltcG9ydHMtbG9hZGVyQDEuMS4wXHJcbndpbmRvdy5zaG93TWUgPSAoKT0+e1xyXG4gIGNvbnNvbGUubG9nKCdzaG93TWUnLHRoaXMpOyAgXHJcbn07XHJcblxyXG53aW5kb3cuc2hvd01lMiA9IGZ1bmN0aW9uKCl7XHJcbiAgY29uc29sZS5sb2coJ3Nob3dNZTInLHRoaXMpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gc2hvd01lMyAobmFtZSl7XHJcbiAgdGhpcy5uYW1lPW5hbWU7XHJcbiAgY29uc29sZS5sb2codGhpcy5uYW1lKTtcclxufVxyXG5cclxud2luZG93LnNob3dNZTMgPSBzaG93TWUzO1xyXG5cclxuXHJcbmNvbnNvbGUubG9nKGFyZ3VtZW50cyk7XHJcblxyXG5jb25zb2xlLmxvZyh3aW5kb3cpO1xyXG5cclxuY29uc29sZS5sb2codGhpcyk7XHJcblxyXG5cclxuXG59LmNhbGwod2luZG93LCBpcHR2LCBqcXVlcnksIHdpbmRvdykpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==