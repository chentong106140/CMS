/**
 * Created by cherish on 2018/11/6.
 */

import _ from 'lodash';
import printMe from './print.js';

if (process.env.NODE_ENV === 'development') {
    console.log('当前是开发环境');
}else if(process.env.NODE_ENV === 'production') {
    console.log('当前是生产环境');
}

function component() {
    var element = document.createElement('div');
    //_对象是引用的lodash，前提是项目必须安装了lodash模块
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    var btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);

    return element;
}

let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);



