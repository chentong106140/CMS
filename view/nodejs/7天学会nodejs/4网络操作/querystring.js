const querystring = require('querystring');

console.log(
            querystring.parse('foo=bar&baz=qux&baz=quux&corge')
);

/*
        [Object: null prototype] {
              foo: 'bar',
              baz: [ 'qux', 'quux' ],
              corge: ''
            }


 */

/**
 *——querystring
 *  querystring模块用于实现URL参数字符串与参数对象的互相转换
 */