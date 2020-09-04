import _ from 'lodash';
import printMe from './print.js';

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');
    
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    
    element.appendChild(btn);
    
    
    return element;
}

var element = component();
document.body.appendChild(element);

/**
 * 用于监控某一个模块被重新修改了，就会进入如下这个回调方法
 */
if (module.hot) {
       module.hot.accept('./print.js', function() {
           //当print.js模块内容被修改，就会进入当前回调方法
            console.log('print.js模块被热加载成功!');
           document.body.removeChild(element);
           element = component();
           document.body.appendChild(element);
          });
     }
