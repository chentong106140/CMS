
$(function () {
    console.log("----------------------Array.isArray()-------------------------");
    console.log(Array.isArray({}));//false
    console.log(Array.isArray([]));//true
    console.log(Array.isArray(Object));//false
    console.log(Array.isArray(new Array()));//true
    console.log(Array.isArray(new Object()));//false
    console.log(Array.isArray(undefined));//false
    console.log(Array.isArray(null));//false
    console.log(Array.isArray(0));//false
    console.log(Array.isArray("[]"));//false
    

});
