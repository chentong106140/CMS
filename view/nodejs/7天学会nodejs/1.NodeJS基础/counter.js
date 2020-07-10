console.log("进入counter.js文件成功");



var i = 0;

function count() {
    return ++i;
}

exports.count = count;

/**
 * 该模块内部定义了一个私有变量i，并在exports对象导出了一个公有方法count。
 */