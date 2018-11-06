/**
 * Created by cherish on 2018/11/6.
 */

import _ from 'lodash';
//注意需要写全路径，加上./说明style.css文件在当前目录下
import './style.css';

import Icon from './Icon.png';

import Data from './data.xml';
function component() {
    console.log(Data);
    var element = document.createElement('div');

    //_对象是引用的lodash，前提是项目必须安装了lodash模块
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    //hello样式是写在了style.css中，这里直接引用即可
    element.classList.add('hello');


       // 将图像添加到我们现有的 div。
       var myIcon = new Image();
       myIcon.src = Icon;
    
       element.appendChild(myIcon);

    return element;
}

document.body.appendChild(component());
