"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var myjq = require("./ts/test");
console.log(myjq);
window.myjq = myjq;
//获取环境变量是生产环境还是开发环境
var env = process.env.NODE_ENV;
if (env === 'production') {
    console.log("当前环境为生产环境！" + env);
}
else {
    console.log("当前环境为开发环境！" + env);
}
function component() {
    var element = document.createElement('div');
    //下面的_和join变量是通过webpack.ProvidePlugin插件定义的全局变量
    element.innerHTML += _.join(['Hello', 'webpack'], ' ');
    return element;
}
document.body.appendChild(component());
//# sourceMappingURL=index.js.map