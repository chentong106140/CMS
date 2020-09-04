    //没有显式的导入lodash,本文件也可以使用lodash的变量_,主要是在webpack.common.js内的ProvidePlugin插件定义了全局变量
    //import _ from 'lodash';
    
    /*import {default as print,show as s,print as p,say} from "./print";*/
    
    /*import * as myPrint from './print'*/
    
    //验证module.rules下面定义的imports-loader自动加载模块，无需手动import xx from './print'
    print("print");//对应规则：'default ./print print'   =》对应语句:import print from './print'
    s("show");//对应规则：'named ./print show s'         =》对应语句：import {show as s} from './print'
    p("print");//对应规则：'named ./print print p'       =》对应语句：import {print as p} from './print'
    say("say");//对应规则：'named ./print say'           =》对应语句：import {say} from './print'
    console.log(myPrint);//对应规则：'namespace ./print myPrint' =》对应语句：import * as myPrint from './print'
    //Object { print: print(text), show: show(text), say: say(text), default: print(text), … }
    
    
    import iptv from 'morgan-iptv-core'
    
    console.log(iptv);
    console.log(this);//undefined
    
    
    //如下是验证globals.js文件模拟老版本的库，没有使用export导出变量，
    // 此时如何通过exports-loader插件兼容老版本的库，也就是通过exports-loader插件让没有export导出变量的js库，能够正常导出变量
    import mysay,{infos as myInfos,helper,says} from './globals'
    console.log(myInfos);//验证：'infos'，这里讲infos重新命名为myInfos进行导入
    mysay('mysays');//验证：'default say'，这里将default say 重新命名为mysay进行导入
    helper.test('test');//验证：'helper'
    helper.info('info');//验证：'helper'
    says('says');//验证：'named say says'
    
    
    console.log(require.resolve('./globals.js'));
    
    //获取环境变量是生产环境还是开发环境
    var env = process.env.NODE_ENV;
    
    if (env === 'production') {
        console.log("当前环境为生产环境！" + env);
    } else {
        console.log("当前环境为开发环境！" + env);
    }
    
    function component() {
        const element = document.createElement('div');
        //下面的_和join变量是通过webpack.ProvidePlugin插件定义的全局变量
        element.innerHTML += _.join(['Hello', 'webpack'], ' ');
        element.innerHTML += join(['你好', 'webpack'], ' ');
    
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
