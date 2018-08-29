
$(function () {

    console.log("----------------------concat()-------------------------");
    var a1 = [],
        a2 = ["one","two","three"],
        a3 = ["four","five","six"];
    var a4 = a1.concat(a2,a3);
    console.log(a4); //Array [ "one", "two", "three", "four", "five", "six" ]



});
