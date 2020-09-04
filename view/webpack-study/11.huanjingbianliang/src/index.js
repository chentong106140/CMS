//import Print from './print';
//没有被引用，只是被导入，目的是为了验证引用的公共库要打包在vendors中
import _ from 'lodash';


var env = process.env.NODE_ENV;

if (env === 'production') {
    console.log("当前环境为生产环境！" + env);
} else {
    console.log("当前环境为测试环境！" + env);
}

function component() {
    const element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
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
