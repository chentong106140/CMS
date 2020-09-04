import { cube } from './math.js';

function component() {
    var element = document.createElement('pre');

    element.innerHTML = [
         'Hello webpack!',
         '5 cubed is equal to ' + cube(5)
       ].join('\n\n');
    
    return element;
}

    document.body.appendChild(component());

/**
 * 用于监控某一个模块被重新修改了，就会进入如下这个回调方法
 */
if (module.hot) {
       module.hot.accept('./math.js', function() {
           //当math.js模块内容被修改，就会进入当前回调方法
            console.log('math.js模块被热加载成功!');
          });
     }
