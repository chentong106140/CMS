/**
 * Created by cherish on 2018/11/6.
 */

import _ from 'lodash';
import printMe from './print.js';
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

document.body.appendChild(component());
