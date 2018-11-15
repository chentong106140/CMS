!function (e, o) {
    "object" == typeof exports && "object" == typeof module ? module.exports = o(require("lodash")) : "function" == typeof define && define.amd ? define(["lodash"], o) : "object" == typeof exports ? exports.webpackNumbers = o(require("lodash")) : e.webpackNumbers = o(e._)
}(window, function (e) {
    return function (e) {
        var o = {};

        function r(n) {
            if (o[n])return o[n].exports;
            var t = o[n] = {i: n, l: !1, exports: {}};
            return e[n].call(t.exports, t, t.exports, r), t.l = !0, t.exports
        }

        return r.m = e, r.c = o, r.d = function (e, o, n) {
            r.o(e, o) || Object.defineProperty(e, o, {enumerable: !0, get: n})
        }, r.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
        }, r.t = function (e, o) {
            if (1 & o && (e = r(e)), 8 & o)return e;
            if (4 & o && "object" == typeof e && e && e.__esModule)return e;
            var n = Object.create(null);
            if (r.r(n), Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & o && "string" != typeof e)for (var t in e)r.d(n, t, function (o) {
                return e[o]
            }.bind(null, t));
            return n
        }, r.n = function (e) {
            var o = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return r.d(o, "a", o), o
        }, r.o = function (e, o) {
            return Object.prototype.hasOwnProperty.call(e, o)
        }, r.p = "", r(r.s = 0)
    }([function (e, o, r) {
        "use strict";
        Object.defineProperty(o, "__esModule", {value: !0}), o.numToWord = f, o.wordToNum = d;
        var n = u(r(1)), t = u(r(2));

        function u(e) {
            return e && e.__esModule ? e : {default: e}
        }

        function f(e) {
            return n.default.reduce(t.default, function (o, r) {
                return console.log(o, r), r.num === e ? r.word : o
            }, "")
        }

        function d(e) {
            return n.default.reduce(t.default, function (o, r) {
                return console.log(o, r), r.word === e && e.toLowerCase() ? r.num : o
            }, -1)
        }

        console.log(f(4)), console.log(d("Three"))
    }, function (o, r) {
        o.exports = e
    }, function (e) {
        e.exports = [{num: 1, word: "One"}, {num: 2, word: "Two"}, {num: 3, word: "Three"}, {
            num: 4,
            word: "Four"
        }, {num: 5, word: "Five"}, {num: 0, word: "Zero"}]
    }])
});