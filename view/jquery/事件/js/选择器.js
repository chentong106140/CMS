$(function () {
    console.log("----------------------parent > child-------------------------");

    var a1 = $("form > input",".custom-box.box-1");
    console.log(a1);
    //<input name="name" />

});