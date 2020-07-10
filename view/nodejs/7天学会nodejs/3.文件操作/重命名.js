var fs = require("fs");

fs.rename('./2.dat', process.argv[2], (err) => {
    if (err) throw err;
    console.log('重命名完成');
});

/**
 *  重命名
 *  
 *  执行脚本如下
 *  
 *  node 重命名.js ./3.dat
 *
 */