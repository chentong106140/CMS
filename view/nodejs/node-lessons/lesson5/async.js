var async = require('async');
var moment = require('moment');

/**
 * 对集合中的每一个元素，执行某个异步操作，得到结果。所有的结果将汇总到最终的callback里。与each的区别是，each只关心操作不管最后的值，而map关心的最后产生的值。
 *
 * 提供了两种方式：
 * 1. 并行执行。同时对集合中所有元素进行操作，结果汇总到最终callback里。如果出错，则立刻返回错误以及已经执行完的任务的结果，未执行完的占个空位
 * 2. 顺序执行。对集合中的元素一个一个执行操作，结果汇总到最终callback里。如果出错，则立刻返回错误以及已经执行完的结果，未执行的被忽略。
 */
// map(arr, iterator(item, callback), callback(err, results))

var arr = [
    {name: 'a', delay: 100}, 
    {name: 'b', delay: 200}, 
    {name: 'c', delay: 300}, 
    {name: 'd', delay: 400},
    {name: 'e', delay: 500},
    {name: 'f', delay: 600},
    {name: 'g', delay: 700},
    {name: 'h', delay: 800},
    {name: 'i', delay: 900},
    {name: 'j', delay: 1000}
    ];

/**
 * 1.1  所有操作均正确执行，未出错。所有结果按元素顺序汇总给最终的callback。
 */
/*async.map(arr, function(item, callback) {
    console.log(item);
    setTimeout(function() {
        callback(null, item.name + '!!!');
    }, item.delay);
}, function(err,results) {
    console.log('1.1',err,results);
});*/
/*
{ name: 'Jack', delay: 200 }
{ name: 'Mike', delay: 100 }
{ name: 'Freewind', delay: 300 }
{ name: 'Test', delay: 50 }
1.1 null [ 'Jack!!!', 'Mike!!!', 'Freewind!!!', 'Test!!!' ]
 */

/**
 *  1.2如果中途出错，立刻将错误、以及已经执行完成的结果汇总给最终callback。未执行完的将会在结果数组中用占个空位。
 */
/*async.map(arr, function(item, callback) {
    console.log(moment().format('ss.SSS')+'>请求',item.name);
    setTimeout(function() {
        console.log(moment().format('ss.SSS')+'>响应',item.name);
        if(item.name==='a'){
            callback('报错',item.name);
        }else{
            callback(null, item.name);
        }
    }, item.delay);
}, function(err, results) {
    console.log('1.2',err,results);
});*/
/*
{ name: 'Jack', delay: 200 }
{ name: 'Mike', delay: 100 }
{ name: 'Freewind', delay: 300 }
{ name: 'Test', delay: 50 }
1.2 myerr [ undefined, 'Mike!!!', <1 empty item>, 'Test!!!' ]
 */

/**
 * 1.5  并行执行，同时最多2个函数并行，传给最终callback。
 */
async.mapLimit(arr,4, function(item, callback) {
    console.log(moment().format('ss.SSS')+'>请求',item.name);
    setTimeout(function() {
        console.log(moment().format('ss.SSS')+'>响应',item.name);
        if (item.name === 'c') {
            callback('报错',item.name);
        } else {
            callback(null, item.name );
        }
    }, item.delay);
}, function(err, results) {
    console.log('1.5',err,results)
});
