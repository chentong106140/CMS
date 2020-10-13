var exec = require('child_process').exec;
//var cmdStr = 'curl http://www.weather.com.cn/data/sk/101010100.html';
var cmdStr = 'vuepress dev docs';
console.log("正在启动中："+process.env.PORT);
exec(cmdStr, function(err,stdout,stderr){
    if(err) {
        console.log('get weather api error:'+stderr);
    } else {
        console.log(stdout);
    }
});