
var CT = null;
function b2() {
    this.$ = function (id) {
        if (typeof(id) == 'undefined' || id == '' || id == undefined || id == null) return null;
        return document.getElementById(id);
    };
}
CT = new b2();


