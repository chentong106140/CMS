import {CT,$} from './globals.js'

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

let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);


//默认情况下this指向的是CommonJs环境中的module.exports模块，并不是window对象
//如果我们希望this指向为window，就需要在webpack配置文件中的规则中添加exports-loader修改当前模块的this指向
console.log("imports-loader导入测试this", this, this === window);



console.log(typeof CT);
console.log(typeof $);
console.log($("test"));


