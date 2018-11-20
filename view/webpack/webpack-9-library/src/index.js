/**
 * Created by cherish on 2018/11/15.
 */

function numToWord({a=0,b='word'}) {
    console.log("numToWord","a:"+a,"b:"+b);
    return a;
}

function wordToNum(word) {
    console.log("numToWord",word);
    return word;
}

var a = 10;

export {numToWord as default,wordToNum,a}