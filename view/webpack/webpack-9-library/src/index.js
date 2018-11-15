/**
 * Created by cherish on 2018/11/15.
 */


import _ from 'lodash';
import numRef from './ref.json';

export function numToWord(num) {
     return _.reduce(numRef,function (accum, ref) {
         console.log(accum,ref);
         return ref.num === num ? ref.word : accum;
     },'')
    
}

export function wordToNum(word) {
     return _.reduce(numRef,function (accum,ref) {
         console.log(accum,ref);
         return ref.word === word && word.toLowerCase() ? ref.num : accum;
     },-1);
}
console.log(numToWord(4));
console.log(wordToNum("Three"));