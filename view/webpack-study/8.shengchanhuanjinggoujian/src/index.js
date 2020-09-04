import {cube} from './math.js';

var env = process.env.NODE_ENV;
if (env === 'production') {
    console.log("当前环境为生产环境！"+env);
}else{
    console.log("当前环境为测试环境！"+env);
}

function component() {
    var element = document.createElement('pre');

    element.innerHTML = [
        'Hello webpack!',
        '5 cubed is equal to ' + cube(5)
    ].join('\n\n');

    return element;
}

var element = component();
document.body.appendChild(element);

/**
 * 用于监控某一个模块被重新修改了，就会进入如下这个回调方法
 * 模块热替换的启用HMR
 */
if (module.hot) {
    module.hot.accept('./math.js', function () {
        //当math.js模块内容被修改，就会进入当前回调方法
        console.log('math.js模块被热加载成功!');
        document.body.removeChild(element);
        element = component();
        document.body.appendChild(element);
    });
}
