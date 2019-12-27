/*! jQuery v1.11.3 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */

/*

 JS Signals <http://millermedeiros.github.com/js-signals/>
 Released under the MIT license
 Author: Miller Medeiros
 Version: 1.0.0 - Build: 268 (2012/11/29 05:48 PM)
*/

/*!
 * Hasher <http://github.com/millermedeiros/hasher>
 * @author Miller Medeiros
 * @version 1.2.0 (2013/11/11 03:18 PM)
 * Released under the MIT License
 */

/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */

!function (e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function (e, t) {
    function n(e) {
        var t = "length" in e && e.length, n = re.type(e);
        return "function" !== n && !re.isWindow(e) && (!(1 !== e.nodeType || !t) || ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e))
    }

    function i(e, t, n) {
        if (re.isFunction(t)) return re.grep(e, function (e, i) {
            return !!t.call(e, i, e) !== n
        });
        if (t.nodeType) return re.grep(e, function (e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (pe.test(t)) return re.filter(t, e, n);
            t = re.filter(t, e)
        }
        return re.grep(e, function (e) {
            return re.inArray(e, t) >= 0 !== n
        })
    }

    function r(e, t) {
        do {
            e = e[t]
        } while (e && 1 !== e.nodeType);
        return e
    }

    function o(e) {
        var t = be[e] = {};
        return re.each(e.match(ye) || [], function (e, n) {
            t[n] = !0
        }), t
    }

    function a() {
        he.addEventListener ? (he.removeEventListener("DOMContentLoaded", s, !1), e.removeEventListener("load", s, !1)) : (he.detachEvent("onreadystatechange", s), e.detachEvent("onload", s))
    }

    function s() {
        (he.addEventListener || "load" === event.type || "complete" === he.readyState) && (a(), re.ready())
    }

    function l(e, t, n) {
        if (void 0 === n && 1 === e.nodeType) {
            var i = "data-" + t.replace(Ce, "-$1").toLowerCase();
            if ("string" == typeof (n = e.getAttribute(i))) {
                try {
                    n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : Te.test(n) ? re.parseJSON(n) : n)
                } catch (e) {
                }
                re.data(e, t, n)
            } else n = void 0
        }
        return n
    }

    function u(e) {
        var t;
        for (t in e) if (("data" !== t || !re.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
        return !0
    }

    function c(e, t, n, i) {
        if (re.acceptData(e)) {
            var r, o, a = re.expando, s = e.nodeType, l = s ? re.cache : e, u = s ? e[a] : e[a] && a;
            if (u && l[u] && (i || l[u].data) || void 0 !== n || "string" != typeof t) return u || (u = s ? e[a] = U.pop() || re.guid++ : a), l[u] || (l[u] = s ? {} : {toJSON: re.noop}), ("object" == typeof t || "function" == typeof t) && (i ? l[u] = re.extend(l[u], t) : l[u].data = re.extend(l[u].data, t)), o = l[u], i || (o.data || (o.data = {}), o = o.data), void 0 !== n && (o[re.camelCase(t)] = n), "string" == typeof t ? null == (r = o[t]) && (r = o[re.camelCase(t)]) : r = o, r
        }
    }

    function d(e, t, n) {
        if (re.acceptData(e)) {
            var i, r, o = e.nodeType, a = o ? re.cache : e, s = o ? e[re.expando] : re.expando;
            if (a[s]) {
                if (t && (i = n ? a[s] : a[s].data)) {
                    re.isArray(t) ? t = t.concat(re.map(t, re.camelCase)) : t in i ? t = [t] : (t = re.camelCase(t), t = t in i ? [t] : t.split(" ")), r = t.length;
                    for (; r--;) delete i[t[r]];
                    if (n ? !u(i) : !re.isEmptyObject(i)) return
                }
                (n || (delete a[s].data, u(a[s]))) && (o ? re.cleanData([e], !0) : ne.deleteExpando || a != a.window ? delete a[s] : a[s] = null)
            }
        }
    }

    function p() {
        return !0
    }

    function f() {
        return !1
    }

    function h() {
        try {
            return he.activeElement
        } catch (e) {
        }
    }

    function v(e) {
        var t = He.split("|"), n = e.createDocumentFragment();
        if (n.createElement) for (; t.length;) n.createElement(t.pop());
        return n
    }

    function g(e, t) {
        var n, i, r = 0,
            o = typeof e.getElementsByTagName !== _e ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== _e ? e.querySelectorAll(t || "*") : void 0;
        if (!o) for (o = [], n = e.childNodes || e; null != (i = n[r]); r++) !t || re.nodeName(i, t) ? o.push(i) : re.merge(o, g(i, t));
        return void 0 === t || t && re.nodeName(e, t) ? re.merge([e], o) : o
    }

    function m(e) {
        ke.test(e.type) && (e.defaultChecked = e.checked)
    }

    function y(e, t) {
        return re.nodeName(e, "table") && re.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function b(e) {
        return e.type = (null !== re.find.attr(e, "type")) + "/" + e.type, e
    }

    function w(e) {
        var t = Ye.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function x(e, t) {
        for (var n, i = 0; null != (n = e[i]); i++) re._data(n, "globalEval", !t || re._data(t[i], "globalEval"))
    }

    function _(e, t) {
        if (1 === t.nodeType && re.hasData(e)) {
            var n, i, r, o = re._data(e), a = re._data(t, o), s = o.events;
            if (s) {
                delete a.handle, a.events = {};
                for (n in s) for (i = 0, r = s[n].length; r > i; i++) re.event.add(t, n, s[n][i])
            }
            a.data && (a.data = re.extend({}, a.data))
        }
    }

    function T(e, t) {
        var n, i, r;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !ne.noCloneEvent && t[re.expando]) {
                r = re._data(t);
                for (i in r.events) re.removeEvent(t, i, r.handle);
                t.removeAttribute(re.expando)
            }
            "script" === n && t.text !== e.text ? (b(t).text = e.text, w(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ne.html5Clone && e.innerHTML && !re.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && ke.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }

    function C(t, n) {
        var i, r = re(n.createElement(t)).appendTo(n.body),
            o = e.getDefaultComputedStyle && (i = e.getDefaultComputedStyle(r[0])) ? i.display : re.css(r[0], "display");
        return r.detach(), o
    }

    function E(e) {
        var t = he, n = Je[e];
        return n || (n = C(e, t), "none" !== n && n || (Qe = (Qe || re("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (Qe[0].contentWindow || Qe[0].contentDocument).document, t.write(), t.close(), n = C(e, t), Qe.detach()), Je[e] = n), n
    }

    function A(e, t) {
        return {
            get: function () {
                var n = e();
                if (null != n) return n ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function D(e, t) {
        if (t in e) return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, r = dt.length; r--;) if ((t = dt[r] + n) in e) return t;
        return i
    }

    function S(e, t) {
        for (var n, i, r, o = [], a = 0, s = e.length; s > a; a++) i = e[a], i.style && (o[a] = re._data(i, "olddisplay"), n = i.style.display, t ? (o[a] || "none" !== n || (i.style.display = ""), "" === i.style.display && De(i) && (o[a] = re._data(i, "olddisplay", E(i.nodeName)))) : (r = De(i), (n && "none" !== n || !r) && re._data(i, "olddisplay", r ? n : re.css(i, "display"))));
        for (a = 0; s > a; a++) i = e[a], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? o[a] || "" : "none"));
        return e
    }

    function k(e, t, n) {
        var i = st.exec(t);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
    }

    function L(e, t, n, i, r) {
        for (var o = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === n && (a += re.css(e, n + Ae[o], !0, r)), i ? ("content" === n && (a -= re.css(e, "padding" + Ae[o], !0, r)), "margin" !== n && (a -= re.css(e, "border" + Ae[o] + "Width", !0, r))) : (a += re.css(e, "padding" + Ae[o], !0, r), "padding" !== n && (a += re.css(e, "border" + Ae[o] + "Width", !0, r)));
        return a
    }

    function M(e, t, n) {
        var i = !0, r = "width" === t ? e.offsetWidth : e.offsetHeight, o = Ze(e),
            a = ne.boxSizing && "border-box" === re.css(e, "boxSizing", !1, o);
        if (0 >= r || null == r) {
            if (r = et(e, t, o), (0 > r || null == r) && (r = e.style[t]), nt.test(r)) return r;
            i = a && (ne.boxSizingReliable() || r === e.style[t]), r = parseFloat(r) || 0
        }
        return r + L(e, t, n || (a ? "border" : "content"), i, o) + "px"
    }

    function O(e, t, n, i, r) {
        return new O.prototype.init(e, t, n, i, r)
    }

    function P() {
        return setTimeout(function () {
            pt = void 0
        }), pt = re.now()
    }

    function I(e, t) {
        var n, i = {height: e}, r = 0;
        for (t = t ? 1 : 0; 4 > r; r += 2 - t) n = Ae[r], i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function H(e, t, n) {
        for (var i, r = (yt[t] || []).concat(yt["*"]), o = 0, a = r.length; a > o; o++) if (i = r[o].call(n, t, e)) return i
    }

    function N(e, t, n) {
        var i, r, o, a, s, l, u, c = this, d = {}, p = e.style, f = e.nodeType && De(e), h = re._data(e, "fxshow");
        n.queue || (s = re._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function () {
            s.unqueued || l()
        }), s.unqueued++, c.always(function () {
            c.always(function () {
                s.unqueued--, re.queue(e, "fx").length || s.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], u = re.css(e, "display"), "inline" === ("none" === u ? re._data(e, "olddisplay") || E(e.nodeName) : u) && "none" === re.css(e, "float") && (ne.inlineBlockNeedsLayout && "inline" !== E(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", ne.shrinkWrapBlocks() || c.always(function () {
            p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
        }));
        for (i in t) if (r = t[i], ht.exec(r)) {
            if (delete t[i], o = o || "toggle" === r, r === (f ? "hide" : "show")) {
                if ("show" !== r || !h || void 0 === h[i]) continue;
                f = !0
            }
            d[i] = h && h[i] || re.style(e, i)
        } else u = void 0;
        if (re.isEmptyObject(d)) "inline" === ("none" === u ? E(e.nodeName) : u) && (p.display = u); else {
            h ? "hidden" in h && (f = h.hidden) : h = re._data(e, "fxshow", {}), o && (h.hidden = !f), f ? re(e).show() : c.done(function () {
                re(e).hide()
            }), c.done(function () {
                var t;
                re._removeData(e, "fxshow");
                for (t in d) re.style(e, t, d[t])
            });
            for (i in d) a = H(f ? h[i] : 0, i, c), i in h || (h[i] = a.start, f && (a.end = a.start, a.start = "width" === i || "height" === i ? 1 : 0))
        }
    }

    function R(e, t) {
        var n, i, r, o, a;
        for (n in e) if (i = re.camelCase(n), r = t[i], o = e[n], re.isArray(o) && (r = o[1], o = e[n] = o[0]), n !== i && (e[i] = o, delete e[n]), (a = re.cssHooks[i]) && "expand" in a) {
            o = a.expand(o), delete e[i];
            for (n in o) n in e || (e[n] = o[n], t[n] = r)
        } else t[i] = r
    }

    function j(e, t, n) {
        var i, r, o = 0, a = mt.length, s = re.Deferred().always(function () {
            delete l.elem
        }), l = function () {
            if (r) return !1;
            for (var t = pt || P(), n = Math.max(0, u.startTime + u.duration - t), i = n / u.duration || 0, o = 1 - i, a = 0, l = u.tweens.length; l > a; a++) u.tweens[a].run(o);
            return s.notifyWith(e, [u, o, n]), 1 > o && l ? n : (s.resolveWith(e, [u]), !1)
        }, u = s.promise({
            elem: e,
            props: re.extend({}, t),
            opts: re.extend(!0, {specialEasing: {}}, n),
            originalProperties: t,
            originalOptions: n,
            startTime: pt || P(),
            duration: n.duration,
            tweens: [],
            createTween: function (t, n) {
                var i = re.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                return u.tweens.push(i), i
            },
            stop: function (t) {
                var n = 0, i = t ? u.tweens.length : 0;
                if (r) return this;
                for (r = !0; i > n; n++) u.tweens[n].run(1);
                return t ? s.resolveWith(e, [u, t]) : s.rejectWith(e, [u, t]), this
            }
        }), c = u.props;
        for (R(c, u.opts.specialEasing); a > o; o++) if (i = mt[o].call(u, e, c, u.opts)) return i;
        return re.map(c, H, u), re.isFunction(u.opts.start) && u.opts.start.call(e, u), re.fx.timer(re.extend(l, {
            elem: e,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }

    function q(e) {
        return function (t, n) {
            "string" != typeof t && (n = t, t = "*");
            var i, r = 0, o = t.toLowerCase().match(ye) || [];
            if (re.isFunction(n)) for (; i = o[r++];) "+" === i.charAt(0) ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
        }
    }

    function B(e, t, n, i) {
        function r(s) {
            var l;
            return o[s] = !0, re.each(e[s] || [], function (e, s) {
                var u = s(t, n, i);
                return "string" != typeof u || a || o[u] ? a ? !(l = u) : void 0 : (t.dataTypes.unshift(u), r(u), !1)
            }), l
        }

        var o = {}, a = e === $t;
        return r(t.dataTypes[0]) || !o["*"] && r("*")
    }

    function W(e, t) {
        var n, i, r = re.ajaxSettings.flatOptions || {};
        for (i in t) void 0 !== t[i] && ((r[i] ? e : n || (n = {}))[i] = t[i]);
        return n && re.extend(!0, e, n), e
    }

    function $(e, t, n) {
        for (var i, r, o, a, s = e.contents, l = e.dataTypes; "*" === l[0];) l.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r) for (a in s) if (s[a] && s[a].test(r)) {
            l.unshift(a);
            break
        }
        if (l[0] in n) o = l[0]; else {
            for (a in n) {
                if (!l[0] || e.converters[a + " " + l[0]]) {
                    o = a;
                    break
                }
                i || (i = a)
            }
            o = o || i
        }
        return o ? (o !== l[0] && l.unshift(o), n[o]) : void 0
    }

    function F(e, t, n, i) {
        var r, o, a, s, l, u = {}, c = e.dataTypes.slice();
        if (c[1]) for (a in e.converters) u[a.toLowerCase()] = e.converters[a];
        for (o = c.shift(); o;) if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift()) if ("*" === o) o = l; else if ("*" !== l && l !== o) {
            if (!(a = u[l + " " + o] || u["* " + o])) for (r in u) if (s = r.split(" "), s[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) {
                !0 === a ? a = u[r] : !0 !== u[r] && (o = s[0], c.unshift(s[1]));
                break
            }
            if (!0 !== a) if (a && e.throws) t = a(t); else try {
                t = a(t)
            } catch (e) {
                return {state: "parsererror", error: a ? e : "No conversion from " + l + " to " + o}
            }
        }
        return {state: "success", data: t}
    }

    function X(e, t, n, i) {
        var r;
        if (re.isArray(t)) re.each(t, function (t, r) {
            n || zt.test(e) ? i(e, r) : X(e + "[" + ("object" == typeof r ? t : "") + "]", r, n, i)
        }); else if (n || "object" !== re.type(t)) i(e, t); else for (r in t) X(e + "[" + r + "]", t[r], n, i)
    }

    function z() {
        try {
            return new e.XMLHttpRequest
        } catch (e) {
        }
    }

    function Y() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {
        }
    }

    function V(e) {
        return re.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
    }

    var U = [], G = U.slice, K = U.concat, Q = U.push, J = U.indexOf, Z = {}, ee = Z.toString, te = Z.hasOwnProperty,
        ne = {}, ie = "1.11.3", re = function (e, t) {
            return new re.fn.init(e, t)
        }, oe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ae = /^-ms-/, se = /-([\da-z])/gi, le = function (e, t) {
            return t.toUpperCase()
        };
    re.fn = re.prototype = {
        jquery: ie, constructor: re, selector: "", length: 0, toArray: function () {
            return G.call(this)
        }, get: function (e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : G.call(this)
        }, pushStack: function (e) {
            var t = re.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        }, each: function (e, t) {
            return re.each(this, e, t)
        }, map: function (e) {
            return this.pushStack(re.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        }, slice: function () {
            return this.pushStack(G.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (e) {
            var t = this.length, n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: Q, sort: U.sort, splice: U.splice
    }, re.extend = re.fn.extend = function () {
        var e, t, n, i, r, o, a = arguments[0] || {}, s = 1, l = arguments.length, u = !1;
        for ("boolean" == typeof a && (u = a, a = arguments[s] || {}, s++), "object" == typeof a || re.isFunction(a) || (a = {}), s === l && (a = this, s--); l > s; s++) if (null != (r = arguments[s])) for (i in r) e = a[i], n = r[i], a !== n && (u && n && (re.isPlainObject(n) || (t = re.isArray(n))) ? (t ? (t = !1, o = e && re.isArray(e) ? e : []) : o = e && re.isPlainObject(e) ? e : {}, a[i] = re.extend(u, o, n)) : void 0 !== n && (a[i] = n));
        return a
    }, re.extend({
        expando: "jQuery" + (ie + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
            throw new Error(e)
        }, noop: function () {
        }, isFunction: function (e) {
            return "function" === re.type(e)
        }, isArray: Array.isArray || function (e) {
            return "array" === re.type(e)
        }, isWindow: function (e) {
            return null != e && e == e.window
        }, isNumeric: function (e) {
            return !re.isArray(e) && e - parseFloat(e) + 1 >= 0
        }, isEmptyObject: function (e) {
            var t;
            for (t in e) return !1;
            return !0
        }, isPlainObject: function (e) {
            var t;
            if (!e || "object" !== re.type(e) || e.nodeType || re.isWindow(e)) return !1;
            try {
                if (e.constructor && !te.call(e, "constructor") && !te.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (e) {
                return !1
            }
            if (ne.ownLast) for (t in e) return te.call(e, t);
            for (t in e) ;
            return void 0 === t || te.call(e, t)
        }, type: function (e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? Z[ee.call(e)] || "object" : typeof e
        }, globalEval: function (t) {
            t && re.trim(t) && (e.execScript || function (t) {
                e.eval.call(e, t)
            })(t)
        }, camelCase: function (e) {
            return e.replace(ae, "ms-").replace(se, le)
        }, nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }, each: function (e, t, i) {
            var r = 0, o = e.length, a = n(e);
            if (i) {
                if (a) for (; o > r && !1 !== t.apply(e[r], i); r++) ; else for (r in e) if (!1 === t.apply(e[r], i)) break
            } else if (a) for (; o > r && !1 !== t.call(e[r], r, e[r]); r++) ; else for (r in e) if (!1 === t.call(e[r], r, e[r])) break;
            return e
        }, trim: function (e) {
            return null == e ? "" : (e + "").replace(oe, "")
        }, makeArray: function (e, t) {
            var i = t || [];
            return null != e && (n(Object(e)) ? re.merge(i, "string" == typeof e ? [e] : e) : Q.call(i, e)), i
        }, inArray: function (e, t, n) {
            var i;
            if (t) {
                if (J) return J.call(t, e, n);
                for (i = t.length, n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++) if (n in t && t[n] === e) return n
            }
            return -1
        }, merge: function (e, t) {
            for (var n = +t.length, i = 0, r = e.length; n > i;) e[r++] = t[i++];
            if (n !== n) for (; void 0 !== t[i];) e[r++] = t[i++];
            return e.length = r, e
        }, grep: function (e, t, n) {
            for (var i = [], r = 0, o = e.length, a = !n; o > r; r++) !t(e[r], r) !== a && i.push(e[r]);
            return i
        }, map: function (e, t, i) {
            var r, o = 0, a = e.length, s = n(e), l = [];
            if (s) for (; a > o; o++) null != (r = t(e[o], o, i)) && l.push(r); else for (o in e) null != (r = t(e[o], o, i)) && l.push(r);
            return K.apply([], l)
        }, guid: 1, proxy: function (e, t) {
            var n, i, r;
            return "string" == typeof t && (r = e[t], t = e, e = r), re.isFunction(e) ? (n = G.call(arguments, 2), i = function () {
                return e.apply(t || this, n.concat(G.call(arguments)))
            }, i.guid = e.guid = e.guid || re.guid++, i) : void 0
        }, now: function () {
            return +new Date
        }, support: ne
    }), re.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        Z["[object " + t + "]"] = t.toLowerCase()
    });
    var ue = function (e) {
        function t(e, t, n, i) {
            var r, o, a, s, u, d, p, f, h, v;
            if ((t ? t.ownerDocument || t : j) !== L && k(t), t = t || L, n = n || [], s = t.nodeType, "string" != typeof e || !e || 1 !== s && 9 !== s && 11 !== s) return n;
            if (!i && O) {
                if (11 !== s && (r = ge.exec(e))) if (a = r[1]) {
                    if (9 === s) {
                        if (!(o = t.getElementById(a)) || !o.parentNode) return n;
                        if (o.id === a) return n.push(o), n
                    } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && N(t, o) && o.id === a) return n.push(o), n
                } else {
                    if (r[2]) return K.apply(n, t.getElementsByTagName(e)), n;
                    if ((a = r[3]) && b.getElementsByClassName) return K.apply(n, t.getElementsByClassName(a)), n
                }
                if (b.qsa && (!P || !P.test(e))) {
                    if (f = p = R, h = t, v = 1 !== s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                        for (d = T(e), (p = t.getAttribute("id")) ? f = p.replace(ye, "\\$&") : t.setAttribute("id", f), f = "[id='" + f + "'] ", u = d.length; u--;) d[u] = f + c(d[u]);
                        h = me.test(e) && l(t.parentNode) || t, v = d.join(",")
                    }
                    if (v) try {
                        return K.apply(n, h.querySelectorAll(v)), n
                    } catch (e) {
                    } finally {
                        p || t.removeAttribute("id")
                    }
                }
            }
            return E(e.replace(ae, "$1"), t, n, i)
        }

        function n() {
            function e(n, i) {
                return t.push(n + " ") > w.cacheLength && delete e[t.shift()], e[n + " "] = i
            }

            var t = [];
            return e
        }

        function i(e) {
            return e[R] = !0, e
        }

        function r(e) {
            var t = L.createElement("div");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function o(e, t) {
            for (var n = e.split("|"), i = e.length; i--;) w.attrHandle[n[i]] = t
        }

        function a(e, t) {
            var n = t && e,
                i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || z) - (~e.sourceIndex || z);
            if (i) return i;
            if (n) for (; n = n.nextSibling;) if (n === t) return -1;
            return e ? 1 : -1
        }

        function s(e) {
            return i(function (t) {
                return t = +t, i(function (n, i) {
                    for (var r, o = e([], n.length, t), a = o.length; a--;) n[r = o[a]] && (n[r] = !(i[r] = n[r]))
                })
            })
        }

        function l(e) {
            return e && void 0 !== e.getElementsByTagName && e
        }

        function u() {
        }

        function c(e) {
            for (var t = 0, n = e.length, i = ""; n > t; t++) i += e[t].value;
            return i
        }

        function d(e, t, n) {
            var i = t.dir, r = n && "parentNode" === i, o = B++;
            return t.first ? function (t, n, o) {
                for (; t = t[i];) if (1 === t.nodeType || r) return e(t, n, o)
            } : function (t, n, a) {
                var s, l, u = [q, o];
                if (a) {
                    for (; t = t[i];) if ((1 === t.nodeType || r) && e(t, n, a)) return !0
                } else for (; t = t[i];) if (1 === t.nodeType || r) {
                    if (l = t[R] || (t[R] = {}), (s = l[i]) && s[0] === q && s[1] === o) return u[2] = s[2];
                    if (l[i] = u, u[2] = e(t, n, a)) return !0
                }
            }
        }

        function p(e) {
            return e.length > 1 ? function (t, n, i) {
                for (var r = e.length; r--;) if (!e[r](t, n, i)) return !1;
                return !0
            } : e[0]
        }

        function f(e, n, i) {
            for (var r = 0, o = n.length; o > r; r++) t(e, n[r], i);
            return i
        }

        function h(e, t, n, i, r) {
            for (var o, a = [], s = 0, l = e.length, u = null != t; l > s; s++) (o = e[s]) && (!n || n(o, i, r)) && (a.push(o), u && t.push(s));
            return a
        }

        function v(e, t, n, r, o, a) {
            return r && !r[R] && (r = v(r)), o && !o[R] && (o = v(o, a)), i(function (i, a, s, l) {
                var u, c, d, p = [], v = [], g = a.length, m = i || f(t || "*", s.nodeType ? [s] : s, []),
                    y = !e || !i && t ? m : h(m, p, e, s, l), b = n ? o || (i ? e : g || r) ? [] : a : y;
                if (n && n(y, b, s, l), r) for (u = h(b, v), r(u, [], s, l), c = u.length; c--;) (d = u[c]) && (b[v[c]] = !(y[v[c]] = d));
                if (i) {
                    if (o || e) {
                        if (o) {
                            for (u = [], c = b.length; c--;) (d = b[c]) && u.push(y[c] = d);
                            o(null, b = [], u, l)
                        }
                        for (c = b.length; c--;) (d = b[c]) && (u = o ? J(i, d) : p[c]) > -1 && (i[u] = !(a[u] = d))
                    }
                } else b = h(b === a ? b.splice(g, b.length) : b), o ? o(null, a, b, l) : K.apply(a, b)
            })
        }

        function g(e) {
            for (var t, n, i, r = e.length, o = w.relative[e[0].type], a = o || w.relative[" "], s = o ? 1 : 0, l = d(function (e) {
                return e === t
            }, a, !0), u = d(function (e) {
                return J(t, e) > -1
            }, a, !0), f = [function (e, n, i) {
                var r = !o && (i || n !== A) || ((t = n).nodeType ? l(e, n, i) : u(e, n, i));
                return t = null, r
            }]; r > s; s++) if (n = w.relative[e[s].type]) f = [d(p(f), n)]; else {
                if (n = w.filter[e[s].type].apply(null, e[s].matches), n[R]) {
                    for (i = ++s; r > i && !w.relative[e[i].type]; i++) ;
                    return v(s > 1 && p(f), s > 1 && c(e.slice(0, s - 1).concat({value: " " === e[s - 2].type ? "*" : ""})).replace(ae, "$1"), n, i > s && g(e.slice(s, i)), r > i && g(e = e.slice(i)), r > i && c(e))
                }
                f.push(n)
            }
            return p(f)
        }

        function m(e, n) {
            var r = n.length > 0, o = e.length > 0, a = function (i, a, s, l, u) {
                var c, d, p, f = 0, v = "0", g = i && [], m = [], y = A, b = i || o && w.find.TAG("*", u),
                    x = q += null == y ? 1 : Math.random() || .1, _ = b.length;
                for (u && (A = a !== L && a); v !== _ && null != (c = b[v]); v++) {
                    if (o && c) {
                        for (d = 0; p = e[d++];) if (p(c, a, s)) {
                            l.push(c);
                            break
                        }
                        u && (q = x)
                    }
                    r && ((c = !p && c) && f--, i && g.push(c))
                }
                if (f += v, r && v !== f) {
                    for (d = 0; p = n[d++];) p(g, m, a, s);
                    if (i) {
                        if (f > 0) for (; v--;) g[v] || m[v] || (m[v] = U.call(l));
                        m = h(m)
                    }
                    K.apply(l, m), u && !i && m.length > 0 && f + n.length > 1 && t.uniqueSort(l)
                }
                return u && (q = x, A = y), g
            };
            return r ? i(a) : a
        }

        var y, b, w, x, _, T, C, E, A, D, S, k, L, M, O, P, I, H, N, R = "sizzle" + 1 * new Date, j = e.document, q = 0,
            B = 0, W = n(), $ = n(), F = n(), X = function (e, t) {
                return e === t && (S = !0), 0
            }, z = 1 << 31, Y = {}.hasOwnProperty, V = [], U = V.pop, G = V.push, K = V.push, Q = V.slice,
            J = function (e, t) {
                for (var n = 0, i = e.length; i > n; n++) if (e[n] === t) return n;
                return -1
            },
            Z = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ee = "[\\x20\\t\\r\\n\\f]", te = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ne = te.replace("w", "w#"),
            ie = "\\[" + ee + "*(" + te + ")(?:" + ee + "*([*^$|!~]?=)" + ee + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ne + "))|)" + ee + "*\\]",
            re = ":(" + te + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ie + ")*)|.*)\\)|)",
            oe = new RegExp(ee + "+", "g"), ae = new RegExp("^" + ee + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ee + "+$", "g"),
            se = new RegExp("^" + ee + "*," + ee + "*"), le = new RegExp("^" + ee + "*([>+~]|" + ee + ")" + ee + "*"),
            ue = new RegExp("=" + ee + "*([^\\]'\"]*?)" + ee + "*\\]", "g"), ce = new RegExp(re),
            de = new RegExp("^" + ne + "$"), pe = {
                ID: new RegExp("^#(" + te + ")"),
                CLASS: new RegExp("^\\.(" + te + ")"),
                TAG: new RegExp("^(" + te.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + ie),
                PSEUDO: new RegExp("^" + re),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ee + "*(even|odd|(([+-]|)(\\d*)n|)" + ee + "*(?:([+-]|)" + ee + "*(\\d+)|))" + ee + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + Z + ")$", "i"),
                needsContext: new RegExp("^" + ee + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ee + "*((?:-\\d)?\\d*)" + ee + "*\\)|)(?=[^-]|$)", "i")
            }, fe = /^(?:input|select|textarea|button)$/i, he = /^h\d$/i, ve = /^[^{]+\{\s*\[native \w/,
            ge = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, me = /[+~]/, ye = /'|\\/g,
            be = new RegExp("\\\\([\\da-f]{1,6}" + ee + "?|(" + ee + ")|.)", "ig"), we = function (e, t, n) {
                var i = "0x" + t - 65536;
                return i !== i || n ? t : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
            }, xe = function () {
                k()
            };
        try {
            K.apply(V = Q.call(j.childNodes), j.childNodes), V[j.childNodes.length].nodeType
        } catch (e) {
            K = {
                apply: V.length ? function (e, t) {
                    G.apply(e, Q.call(t))
                } : function (e, t) {
                    for (var n = e.length, i = 0; e[n++] = t[i++];) ;
                    e.length = n - 1
                }
            }
        }
        b = t.support = {}, _ = t.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName
        }, k = t.setDocument = function (e) {
            var t, n, i = e ? e.ownerDocument || e : j;
            return i !== L && 9 === i.nodeType && i.documentElement ? (L = i, M = i.documentElement, n = i.defaultView, n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", xe, !1) : n.attachEvent && n.attachEvent("onunload", xe)), O = !_(i), b.attributes = r(function (e) {
                return e.className = "i", !e.getAttribute("className")
            }), b.getElementsByTagName = r(function (e) {
                return e.appendChild(i.createComment("")), !e.getElementsByTagName("*").length
            }), b.getElementsByClassName = ve.test(i.getElementsByClassName), b.getById = r(function (e) {
                return M.appendChild(e).id = R, !i.getElementsByName || !i.getElementsByName(R).length
            }), b.getById ? (w.find.ID = function (e, t) {
                if (void 0 !== t.getElementById && O) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, w.filter.ID = function (e) {
                var t = e.replace(be, we);
                return function (e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete w.find.ID, w.filter.ID = function (e) {
                var t = e.replace(be, we);
                return function (e) {
                    var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), w.find.TAG = b.getElementsByTagName ? function (e, t) {
                return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : b.qsa ? t.querySelectorAll(e) : void 0
            } : function (e, t) {
                var n, i = [], r = 0, o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = o[r++];) 1 === n.nodeType && i.push(n);
                    return i
                }
                return o
            }, w.find.CLASS = b.getElementsByClassName && function (e, t) {
                return O ? t.getElementsByClassName(e) : void 0
            }, I = [], P = [], (b.qsa = ve.test(i.querySelectorAll)) && (r(function (e) {
                M.appendChild(e).innerHTML = "<a id='" + R + "'></a><select id='" + R + "-\f]' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && P.push("[*^$]=" + ee + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || P.push("\\[" + ee + "*(?:value|" + Z + ")"), e.querySelectorAll("[id~=" + R + "-]").length || P.push("~="), e.querySelectorAll(":checked").length || P.push(":checked"), e.querySelectorAll("a#" + R + "+*").length || P.push(".#.+[+~]")
            }), r(function (e) {
                var t = i.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && P.push("name" + ee + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || P.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), P.push(",.*:")
            })), (b.matchesSelector = ve.test(H = M.matches || M.webkitMatchesSelector || M.mozMatchesSelector || M.oMatchesSelector || M.msMatchesSelector)) && r(function (e) {
                b.disconnectedMatch = H.call(e, "div"), H.call(e, "[s!='']:x"), I.push("!=", re)
            }), P = P.length && new RegExp(P.join("|")), I = I.length && new RegExp(I.join("|")), t = ve.test(M.compareDocumentPosition), N = t || ve.test(M.contains) ? function (e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, i = t && t.parentNode;
                return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
            } : function (e, t) {
                if (t) for (; t = t.parentNode;) if (t === e) return !0;
                return !1
            }, X = t ? function (e, t) {
                if (e === t) return S = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n || (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !b.sortDetached && t.compareDocumentPosition(e) === n ? e === i || e.ownerDocument === j && N(j, e) ? -1 : t === i || t.ownerDocument === j && N(j, t) ? 1 : D ? J(D, e) - J(D, t) : 0 : 4 & n ? -1 : 1)
            } : function (e, t) {
                if (e === t) return S = !0, 0;
                var n, r = 0, o = e.parentNode, s = t.parentNode, l = [e], u = [t];
                if (!o || !s) return e === i ? -1 : t === i ? 1 : o ? -1 : s ? 1 : D ? J(D, e) - J(D, t) : 0;
                if (o === s) return a(e, t);
                for (n = e; n = n.parentNode;) l.unshift(n);
                for (n = t; n = n.parentNode;) u.unshift(n);
                for (; l[r] === u[r];) r++;
                return r ? a(l[r], u[r]) : l[r] === j ? -1 : u[r] === j ? 1 : 0
            }, i) : L
        }, t.matches = function (e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function (e, n) {
            if ((e.ownerDocument || e) !== L && k(e), n = n.replace(ue, "='$1']"), !(!b.matchesSelector || !O || I && I.test(n) || P && P.test(n))) try {
                var i = H.call(e, n);
                if (i || b.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
            } catch (e) {
            }
            return t(n, L, null, [e]).length > 0
        }, t.contains = function (e, t) {
            return (e.ownerDocument || e) !== L && k(e), N(e, t)
        }, t.attr = function (e, t) {
            (e.ownerDocument || e) !== L && k(e);
            var n = w.attrHandle[t.toLowerCase()],
                i = n && Y.call(w.attrHandle, t.toLowerCase()) ? n(e, t, !O) : void 0;
            return void 0 !== i ? i : b.attributes || !O ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }, t.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function (e) {
            var t, n = [], i = 0, r = 0;
            if (S = !b.detectDuplicates, D = !b.sortStable && e.slice(0), e.sort(X), S) {
                for (; t = e[r++];) t === e[r] && (i = n.push(r));
                for (; i--;) e.splice(n[i], 1)
            }
            return D = null, e
        }, x = t.getText = function (e) {
            var t, n = "", i = 0, r = e.nodeType;
            if (r) {
                if (1 === r || 9 === r || 11 === r) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += x(e)
                } else if (3 === r || 4 === r) return e.nodeValue
            } else for (; t = e[i++];) n += x(t);
            return n
        }, w = t.selectors = {
            cacheLength: 50,
            createPseudo: i,
            match: pe,
            attrHandle: {},
            find: {},
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (e) {
                    return e[1] = e[1].replace(be, we), e[3] = (e[3] || e[4] || e[5] || "").replace(be, we), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                }, CHILD: function (e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                }, PSEUDO: function (e) {
                    var t, n = !e[6] && e[2];
                    return pe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && ce.test(n) && (t = T(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function (e) {
                    var t = e.replace(be, we).toLowerCase();
                    return "*" === e ? function () {
                        return !0
                    } : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                }, CLASS: function (e) {
                    var t = W[e + " "];
                    return t || (t = new RegExp("(^|" + ee + ")" + e + "(" + ee + "|$)")) && W(e, function (e) {
                        return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                    })
                }, ATTR: function (e, n, i) {
                    return function (r) {
                        var o = t.attr(r, e);
                        return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === i : "!=" === n ? o !== i : "^=" === n ? i && 0 === o.indexOf(i) : "*=" === n ? i && o.indexOf(i) > -1 : "$=" === n ? i && o.slice(-i.length) === i : "~=" === n ? (" " + o.replace(oe, " ") + " ").indexOf(i) > -1 : "|=" === n && (o === i || o.slice(0, i.length + 1) === i + "-"))
                    }
                }, CHILD: function (e, t, n, i, r) {
                    var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
                    return 1 === i && 0 === r ? function (e) {
                        return !!e.parentNode
                    } : function (t, n, l) {
                        var u, c, d, p, f, h, v = o !== a ? "nextSibling" : "previousSibling", g = t.parentNode,
                            m = s && t.nodeName.toLowerCase(), y = !l && !s;
                        if (g) {
                            if (o) {
                                for (; v;) {
                                    for (d = t; d = d[v];) if (s ? d.nodeName.toLowerCase() === m : 1 === d.nodeType) return !1;
                                    h = v = "only" === e && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [a ? g.firstChild : g.lastChild], a && y) {
                                for (c = g[R] || (g[R] = {}), u = c[e] || [], f = u[0] === q && u[1], p = u[0] === q && u[2], d = f && g.childNodes[f]; d = ++f && d && d[v] || (p = f = 0) || h.pop();) if (1 === d.nodeType && ++p && d === t) {
                                    c[e] = [q, f, p];
                                    break
                                }
                            } else if (y && (u = (t[R] || (t[R] = {}))[e]) && u[0] === q) p = u[1]; else for (; (d = ++f && d && d[v] || (p = f = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== m : 1 !== d.nodeType) || !++p || (y && ((d[R] || (d[R] = {}))[e] = [q, p]), d !== t));) ;
                            return (p -= r) === i || p % i == 0 && p / i >= 0
                        }
                    }
                }, PSEUDO: function (e, n) {
                    var r, o = w.pseudos[e] || w.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return o[R] ? o(n) : o.length > 1 ? (r = [e, e, "", n], w.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function (e, t) {
                        for (var i, r = o(e, n), a = r.length; a--;) i = J(e, r[a]), e[i] = !(t[i] = r[a])
                    }) : function (e) {
                        return o(e, 0, r)
                    }) : o
                }
            },
            pseudos: {
                not: i(function (e) {
                    var t = [], n = [], r = C(e.replace(ae, "$1"));
                    return r[R] ? i(function (e, t, n, i) {
                        for (var o, a = r(e, null, i, []), s = e.length; s--;) (o = a[s]) && (e[s] = !(t[s] = o))
                    }) : function (e, i, o) {
                        return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop()
                    }
                }), has: i(function (e) {
                    return function (n) {
                        return t(e, n).length > 0
                    }
                }), contains: i(function (e) {
                    return e = e.replace(be, we), function (t) {
                        return (t.textContent || t.innerText || x(t)).indexOf(e) > -1
                    }
                }), lang: i(function (e) {
                    return de.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(be, we).toLowerCase(), function (t) {
                        var n;
                        do {
                            if (n = O ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                        } while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }), target: function (t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                }, root: function (e) {
                    return e === M
                }, focus: function (e) {
                    return e === L.activeElement && (!L.hasFocus || L.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                }, enabled: function (e) {
                    return !1 === e.disabled
                }, disabled: function (e) {
                    return !0 === e.disabled
                }, checked: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                }, selected: function (e) {
                    return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                }, empty: function (e) {
                    for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                    return !0
                }, parent: function (e) {
                    return !w.pseudos.empty(e)
                }, header: function (e) {
                    return he.test(e.nodeName)
                }, input: function (e) {
                    return fe.test(e.nodeName)
                }, button: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                }, text: function (e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                }, first: s(function () {
                    return [0]
                }), last: s(function (e, t) {
                    return [t - 1]
                }), eq: s(function (e, t, n) {
                    return [0 > n ? n + t : n]
                }), even: s(function (e, t) {
                    for (var n = 0; t > n; n += 2) e.push(n);
                    return e
                }), odd: s(function (e, t) {
                    for (var n = 1; t > n; n += 2) e.push(n);
                    return e
                }), lt: s(function (e, t, n) {
                    for (var i = 0 > n ? n + t : n; --i >= 0;) e.push(i);
                    return e
                }), gt: s(function (e, t, n) {
                    for (var i = 0 > n ? n + t : n; ++i < t;) e.push(i);
                    return e
                })
            }
        }, w.pseudos.nth = w.pseudos.eq;
        for (y in {radio: !0, checkbox: !0, file: !0, password: !0, image: !0}) w.pseudos[y] = function (e) {
            return function (t) {
                return "input" === t.nodeName.toLowerCase() && t.type === e
            }
        }(y);
        for (y in {submit: !0, reset: !0}) w.pseudos[y] = function (e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }(y);
        return u.prototype = w.filters = w.pseudos, w.setFilters = new u, T = t.tokenize = function (e, n) {
            var i, r, o, a, s, l, u, c = $[e + " "];
            if (c) return n ? 0 : c.slice(0);
            for (s = e, l = [], u = w.preFilter; s;) {
                (!i || (r = se.exec(s))) && (r && (s = s.slice(r[0].length) || s), l.push(o = [])), i = !1, (r = le.exec(s)) && (i = r.shift(), o.push({
                    value: i,
                    type: r[0].replace(ae, " ")
                }), s = s.slice(i.length));
                for (a in w.filter) !(r = pe[a].exec(s)) || u[a] && !(r = u[a](r)) || (i = r.shift(), o.push({
                    value: i,
                    type: a,
                    matches: r
                }), s = s.slice(i.length));
                if (!i) break
            }
            return n ? s.length : s ? t.error(e) : $(e, l).slice(0)
        }, C = t.compile = function (e, t) {
            var n, i = [], r = [], o = F[e + " "];
            if (!o) {
                for (t || (t = T(e)), n = t.length; n--;) o = g(t[n]), o[R] ? i.push(o) : r.push(o);
                o = F(e, m(r, i)), o.selector = e
            }
            return o
        }, E = t.select = function (e, t, n, i) {
            var r, o, a, s, u, d = "function" == typeof e && e, p = !i && T(e = d.selector || e);
            if (n = n || [], 1 === p.length) {
                if (o = p[0] = p[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && b.getById && 9 === t.nodeType && O && w.relative[o[1].type]) {
                    if (!(t = (w.find.ID(a.matches[0].replace(be, we), t) || [])[0])) return n;
                    d && (t = t.parentNode), e = e.slice(o.shift().value.length)
                }
                for (r = pe.needsContext.test(e) ? 0 : o.length; r-- && (a = o[r], !w.relative[s = a.type]);) if ((u = w.find[s]) && (i = u(a.matches[0].replace(be, we), me.test(o[0].type) && l(t.parentNode) || t))) {
                    if (o.splice(r, 1), !(e = i.length && c(o))) return K.apply(n, i), n;
                    break
                }
            }
            return (d || C(e, p))(i, t, !O, n, me.test(e) && l(t.parentNode) || t), n
        }, b.sortStable = R.split("").sort(X).join("") === R, b.detectDuplicates = !!S, k(), b.sortDetached = r(function (e) {
            return 1 & e.compareDocumentPosition(L.createElement("div"))
        }), r(function (e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || o("type|href|height|width", function (e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), b.attributes && r(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || o("value", function (e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), r(function (e) {
            return null == e.getAttribute("disabled")
        }) || o(Z, function (e, t, n) {
            var i;
            return n ? void 0 : !0 === e[t] ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }), t
    }(e);
    re.find = ue, re.expr = ue.selectors, re.expr[":"] = re.expr.pseudos, re.unique = ue.uniqueSort, re.text = ue.getText, re.isXMLDoc = ue.isXML, re.contains = ue.contains;
    var ce = re.expr.match.needsContext, de = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, pe = /^.[^:#\[\.,]*$/;
    re.filter = function (e, t, n) {
        var i = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? re.find.matchesSelector(i, e) ? [i] : [] : re.find.matches(e, re.grep(t, function (e) {
            return 1 === e.nodeType
        }))
    }, re.fn.extend({
        find: function (e) {
            var t, n = [], i = this, r = i.length;
            if ("string" != typeof e) return this.pushStack(re(e).filter(function () {
                for (t = 0; r > t; t++) if (re.contains(i[t], this)) return !0
            }));
            for (t = 0; r > t; t++) re.find(e, i[t], n);
            return n = this.pushStack(r > 1 ? re.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
        }, filter: function (e) {
            return this.pushStack(i(this, e || [], !1))
        }, not: function (e) {
            return this.pushStack(i(this, e || [], !0))
        }, is: function (e) {
            return !!i(this, "string" == typeof e && ce.test(e) ? re(e) : e || [], !1).length
        }
    });
    var fe, he = e.document, ve = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    (re.fn.init = function (e, t) {
        var n, i;
        if (!e) return this;
        if ("string" == typeof e) {
            if (!(n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : ve.exec(e)) || !n[1] && t) return !t || t.jquery ? (t || fe).find(e) : this.constructor(t).find(e);
            if (n[1]) {
                if (t = t instanceof re ? t[0] : t, re.merge(this, re.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : he, !0)), de.test(n[1]) && re.isPlainObject(t)) for (n in t) re.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                return this
            }
            if ((i = he.getElementById(n[2])) && i.parentNode) {
                if (i.id !== n[2]) return fe.find(e);
                this.length = 1, this[0] = i
            }
            return this.context = he, this.selector = e, this
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : re.isFunction(e) ? void 0 !== fe.ready ? fe.ready(e) : e(re) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), re.makeArray(e, this))
    }).prototype = re.fn, fe = re(he);
    var ge = /^(?:parents|prev(?:Until|All))/, me = {children: !0, contents: !0, next: !0, prev: !0};
    re.extend({
        dir: function (e, t, n) {
            for (var i = [], r = e[t]; r && 9 !== r.nodeType && (void 0 === n || 1 !== r.nodeType || !re(r).is(n));) 1 === r.nodeType && i.push(r), r = r[t];
            return i
        }, sibling: function (e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    }), re.fn.extend({
        has: function (e) {
            var t, n = re(e, this), i = n.length;
            return this.filter(function () {
                for (t = 0; i > t; t++) if (re.contains(this, n[t])) return !0
            })
        }, closest: function (e, t) {
            for (var n, i = 0, r = this.length, o = [], a = ce.test(e) || "string" != typeof e ? re(e, t || this.context) : 0; r > i; i++) for (n = this[i]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && re.find.matchesSelector(n, e))) {
                o.push(n);
                break
            }
            return this.pushStack(o.length > 1 ? re.unique(o) : o)
        }, index: function (e) {
            return e ? "string" == typeof e ? re.inArray(this[0], re(e)) : re.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (e, t) {
            return this.pushStack(re.unique(re.merge(this.get(), re(e, t))))
        }, addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), re.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        }, parents: function (e) {
            return re.dir(e, "parentNode")
        }, parentsUntil: function (e, t, n) {
            return re.dir(e, "parentNode", n)
        }, next: function (e) {
            return r(e, "nextSibling")
        }, prev: function (e) {
            return r(e, "previousSibling")
        }, nextAll: function (e) {
            return re.dir(e, "nextSibling")
        }, prevAll: function (e) {
            return re.dir(e, "previousSibling")
        }, nextUntil: function (e, t, n) {
            return re.dir(e, "nextSibling", n)
        }, prevUntil: function (e, t, n) {
            return re.dir(e, "previousSibling", n)
        }, siblings: function (e) {
            return re.sibling((e.parentNode || {}).firstChild, e)
        }, children: function (e) {
            return re.sibling(e.firstChild)
        }, contents: function (e) {
            return re.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : re.merge([], e.childNodes)
        }
    }, function (e, t) {
        re.fn[e] = function (n, i) {
            var r = re.map(this, t, n);
            return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (r = re.filter(i, r)), this.length > 1 && (me[e] || (r = re.unique(r)), ge.test(e) && (r = r.reverse())), this.pushStack(r)
        }
    });
    var ye = /\S+/g, be = {};
    re.Callbacks = function (e) {
        e = "string" == typeof e ? be[e] || o(e) : re.extend({}, e);
        var t, n, i, r, a, s, l = [], u = !e.once && [], c = function (o) {
            for (n = e.memory && o, i = !0, a = s || 0, s = 0, r = l.length, t = !0; l && r > a; a++) if (!1 === l[a].apply(o[0], o[1]) && e.stopOnFalse) {
                n = !1;
                break
            }
            t = !1, l && (u ? u.length && c(u.shift()) : n ? l = [] : d.disable())
        }, d = {
            add: function () {
                if (l) {
                    var i = l.length;
                    !function t(n) {
                        re.each(n, function (n, i) {
                            var r = re.type(i);
                            "function" === r ? e.unique && d.has(i) || l.push(i) : i && i.length && "string" !== r && t(i)
                        })
                    }(arguments), t ? r = l.length : n && (s = i, c(n))
                }
                return this
            }, remove: function () {
                return l && re.each(arguments, function (e, n) {
                    for (var i; (i = re.inArray(n, l, i)) > -1;) l.splice(i, 1), t && (r >= i && r--, a >= i && a--)
                }), this
            }, has: function (e) {
                return e ? re.inArray(e, l) > -1 : !(!l || !l.length)
            }, empty: function () {
                return l = [], r = 0, this
            }, disable: function () {
                return l = u = n = void 0, this
            }, disabled: function () {
                return !l
            }, lock: function () {
                return u = void 0, n || d.disable(), this
            }, locked: function () {
                return !u
            }, fireWith: function (e, n) {
                return !l || i && !u || (n = n || [], n = [e, n.slice ? n.slice() : n], t ? u.push(n) : c(n)), this
            }, fire: function () {
                return d.fireWith(this, arguments), this
            }, fired: function () {
                return !!i
            }
        };
        return d
    }, re.extend({
        Deferred: function (e) {
            var t = [["resolve", "done", re.Callbacks("once memory"), "resolved"], ["reject", "fail", re.Callbacks("once memory"), "rejected"], ["notify", "progress", re.Callbacks("memory")]],
                n = "pending", i = {
                    state: function () {
                        return n
                    }, always: function () {
                        return r.done(arguments).fail(arguments), this
                    }, then: function () {
                        var e = arguments;
                        return re.Deferred(function (n) {
                            re.each(t, function (t, o) {
                                var a = re.isFunction(e[t]) && e[t];
                                r[o[1]](function () {
                                    var e = a && a.apply(this, arguments);
                                    e && re.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === i ? n.promise() : this, a ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    }, promise: function (e) {
                        return null != e ? re.extend(e, i) : i
                    }
                }, r = {};
            return i.pipe = i.then, re.each(t, function (e, o) {
                var a = o[2], s = o[3];
                i[o[1]] = a.add, s && a.add(function () {
                    n = s
                }, t[1 ^ e][2].disable, t[2][2].lock), r[o[0]] = function () {
                    return r[o[0] + "With"](this === r ? i : this, arguments), this
                }, r[o[0] + "With"] = a.fireWith
            }), i.promise(r), e && e.call(r, r), r
        }, when: function (e) {
            var t, n, i, r = 0, o = G.call(arguments), a = o.length,
                s = 1 !== a || e && re.isFunction(e.promise) ? a : 0, l = 1 === s ? e : re.Deferred(),
                u = function (e, n, i) {
                    return function (r) {
                        n[e] = this, i[e] = arguments.length > 1 ? G.call(arguments) : r, i === t ? l.notifyWith(n, i) : --s || l.resolveWith(n, i)
                    }
                };
            if (a > 1) for (t = new Array(a), n = new Array(a), i = new Array(a); a > r; r++) o[r] && re.isFunction(o[r].promise) ? o[r].promise().done(u(r, i, o)).fail(l.reject).progress(u(r, n, t)) : --s;
            return s || l.resolveWith(i, o), l.promise()
        }
    });
    var we;
    re.fn.ready = function (e) {
        return re.ready.promise().done(e), this
    }, re.extend({
        isReady: !1, readyWait: 1, holdReady: function (e) {
            e ? re.readyWait++ : re.ready(!0)
        }, ready: function (e) {
            if (!0 === e ? !--re.readyWait : !re.isReady) {
                if (!he.body) return setTimeout(re.ready);
                re.isReady = !0, !0 !== e && --re.readyWait > 0 || (we.resolveWith(he, [re]), re.fn.triggerHandler && (re(he).triggerHandler("ready"), re(he).off("ready")))
            }
        }
    }), re.ready.promise = function (t) {
        if (!we) if (we = re.Deferred(), "complete" === he.readyState) setTimeout(re.ready); else if (he.addEventListener) he.addEventListener("DOMContentLoaded", s, !1), e.addEventListener("load", s, !1); else {
            he.attachEvent("onreadystatechange", s), e.attachEvent("onload", s);
            var n = !1;
            try {
                n = null == e.frameElement && he.documentElement
            } catch (e) {
            }
            n && n.doScroll && function e() {
                if (!re.isReady) {
                    try {
                        n.doScroll("left")
                    } catch (t) {
                        return setTimeout(e, 50)
                    }
                    a(), re.ready()
                }
            }()
        }
        return we.promise(t)
    };
    var xe, _e = "undefined";
    for (xe in re(ne)) break;
    ne.ownLast = "0" !== xe, ne.inlineBlockNeedsLayout = !1, re(function () {
        var e, t, n, i;
        (n = he.getElementsByTagName("body")[0]) && n.style && (t = he.createElement("div"), i = he.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), typeof t.style.zoom !== _e && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", ne.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(i))
    }), function () {
        var e = he.createElement("div");
        if (null == ne.deleteExpando) {
            ne.deleteExpando = !0;
            try {
                delete e.test
            } catch (e) {
                ne.deleteExpando = !1
            }
        }
        e = null
    }(), re.acceptData = function (e) {
        var t = re.noData[(e.nodeName + " ").toLowerCase()], n = +e.nodeType || 1;
        return (1 === n || 9 === n) && (!t || !0 !== t && e.getAttribute("classid") === t)
    };
    var Te = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, Ce = /([A-Z])/g;
    re.extend({
        cache: {},
        noData: {"applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
        hasData: function (e) {
            return !!(e = e.nodeType ? re.cache[e[re.expando]] : e[re.expando]) && !u(e)
        },
        data: function (e, t, n) {
            return c(e, t, n)
        },
        removeData: function (e, t) {
            return d(e, t)
        },
        _data: function (e, t, n) {
            return c(e, t, n, !0)
        },
        _removeData: function (e, t) {
            return d(e, t, !0)
        }
    }), re.fn.extend({
        data: function (e, t) {
            var n, i, r, o = this[0], a = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (r = re.data(o), 1 === o.nodeType && !re._data(o, "parsedAttrs"))) {
                    for (n = a.length; n--;) a[n] && (i = a[n].name, 0 === i.indexOf("data-") && (i = re.camelCase(i.slice(5)), l(o, i, r[i])));
                    re._data(o, "parsedAttrs", !0)
                }
                return r
            }
            return "object" == typeof e ? this.each(function () {
                re.data(this, e)
            }) : arguments.length > 1 ? this.each(function () {
                re.data(this, e, t)
            }) : o ? l(o, e, re.data(o, e)) : void 0
        }, removeData: function (e) {
            return this.each(function () {
                re.removeData(this, e)
            })
        }
    }), re.extend({
        queue: function (e, t, n) {
            var i;
            return e ? (t = (t || "fx") + "queue", i = re._data(e, t), n && (!i || re.isArray(n) ? i = re._data(e, t, re.makeArray(n)) : i.push(n)), i || []) : void 0
        }, dequeue: function (e, t) {
            t = t || "fx";
            var n = re.queue(e, t), i = n.length, r = n.shift(), o = re._queueHooks(e, t), a = function () {
                re.dequeue(e, t)
            };
            "inprogress" === r && (r = n.shift(), i--), r && ("fx" === t && n.unshift("inprogress"), delete o.stop, r.call(e, a, o)), !i && o && o.empty.fire()
        }, _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return re._data(e, n) || re._data(e, n, {
                empty: re.Callbacks("once memory").add(function () {
                    re._removeData(e, t + "queue"), re._removeData(e, n)
                })
            })
        }
    }), re.fn.extend({
        queue: function (e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? re.queue(this[0], e) : void 0 === t ? this : this.each(function () {
                var n = re.queue(this, e, t);
                re._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && re.dequeue(this, e)
            })
        }, dequeue: function (e) {
            return this.each(function () {
                re.dequeue(this, e)
            })
        }, clearQueue: function (e) {
            return this.queue(e || "fx", [])
        }, promise: function (e, t) {
            var n, i = 1, r = re.Deferred(), o = this, a = this.length, s = function () {
                --i || r.resolveWith(o, [o])
            };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) (n = re._data(o[a], e + "queueHooks")) && n.empty && (i++, n.empty.add(s));
            return s(), r.promise(t)
        }
    });
    var Ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Ae = ["Top", "Right", "Bottom", "Left"],
        De = function (e, t) {
            return e = t || e, "none" === re.css(e, "display") || !re.contains(e.ownerDocument, e)
        }, Se = re.access = function (e, t, n, i, r, o, a) {
            var s = 0, l = e.length, u = null == n;
            if ("object" === re.type(n)) {
                r = !0;
                for (s in n) re.access(e, t, s, n[s], !0, o, a)
            } else if (void 0 !== i && (r = !0, re.isFunction(i) || (a = !0), u && (a ? (t.call(e, i), t = null) : (u = t, t = function (e, t, n) {
                return u.call(re(e), n)
            })), t)) for (; l > s; s++) t(e[s], n, a ? i : i.call(e[s], s, t(e[s], n)));
            return r ? e : u ? t.call(e) : l ? t(e[0], n) : o
        }, ke = /^(?:checkbox|radio)$/i;
    !function () {
        var e = he.createElement("input"), t = he.createElement("div"), n = he.createDocumentFragment();
        if (t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", ne.leadingWhitespace = 3 === t.firstChild.nodeType, ne.tbody = !t.getElementsByTagName("tbody").length, ne.htmlSerialize = !!t.getElementsByTagName("link").length, ne.html5Clone = "<:nav></:nav>" !== he.createElement("nav").cloneNode(!0).outerHTML, e.type = "checkbox", e.checked = !0, n.appendChild(e), ne.appendChecked = e.checked, t.innerHTML = "<textarea>x</textarea>", ne.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, n.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", ne.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, ne.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick", function () {
            ne.noCloneEvent = !1
        }), t.cloneNode(!0).click()), null == ne.deleteExpando) {
            ne.deleteExpando = !0;
            try {
                delete t.test
            } catch (e) {
                ne.deleteExpando = !1
            }
        }
    }(), function () {
        var t, n, i = he.createElement("div");
        for (t in {
            submit: !0,
            change: !0,
            focusin: !0
        }) n = "on" + t, (ne[t + "Bubbles"] = n in e) || (i.setAttribute(n, "t"), ne[t + "Bubbles"] = !1 === i.attributes[n].expando);
        i = null
    }();
    var Le = /^(?:input|select|textarea)$/i, Me = /^key/, Oe = /^(?:mouse|pointer|contextmenu)|click/,
        Pe = /^(?:focusinfocus|focusoutblur)$/, Ie = /^([^.]*)(?:\.(.+)|)$/;
    re.event = {
        global: {},
        add: function (e, t, n, i, r) {
            var o, a, s, l, u, c, d, p, f, h, v, g = re._data(e);
            if (g) {
                for (n.handler && (l = n, n = l.handler, r = l.selector), n.guid || (n.guid = re.guid++), (a = g.events) || (a = g.events = {}), (c = g.handle) || (c = g.handle = function (e) {
                    return typeof re === _e || e && re.event.triggered === e.type ? void 0 : re.event.dispatch.apply(c.elem, arguments)
                }, c.elem = e), t = (t || "").match(ye) || [""], s = t.length; s--;) o = Ie.exec(t[s]) || [], f = v = o[1], h = (o[2] || "").split(".").sort(), f && (u = re.event.special[f] || {}, f = (r ? u.delegateType : u.bindType) || f, u = re.event.special[f] || {}, d = re.extend({
                    type: f,
                    origType: v,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: r,
                    needsContext: r && re.expr.match.needsContext.test(r),
                    namespace: h.join(".")
                }, l), (p = a[f]) || (p = a[f] = [], p.delegateCount = 0, u.setup && !1 !== u.setup.call(e, i, h, c) || (e.addEventListener ? e.addEventListener(f, c, !1) : e.attachEvent && e.attachEvent("on" + f, c))), u.add && (u.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), r ? p.splice(p.delegateCount++, 0, d) : p.push(d), re.event.global[f] = !0);
                e = null
            }
        },
        remove: function (e, t, n, i, r) {
            var o, a, s, l, u, c, d, p, f, h, v, g = re.hasData(e) && re._data(e);
            if (g && (c = g.events)) {
                for (t = (t || "").match(ye) || [""], u = t.length; u--;) if (s = Ie.exec(t[u]) || [], f = v = s[1], h = (s[2] || "").split(".").sort(), f) {
                    for (d = re.event.special[f] || {}, f = (i ? d.delegateType : d.bindType) || f, p = c[f] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = p.length; o--;) a = p[o], !r && v !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || i && i !== a.selector && ("**" !== i || !a.selector) || (p.splice(o, 1), a.selector && p.delegateCount--, d.remove && d.remove.call(e, a));
                    l && !p.length && (d.teardown && !1 !== d.teardown.call(e, h, g.handle) || re.removeEvent(e, f, g.handle), delete c[f])
                } else for (f in c) re.event.remove(e, f + t[u], n, i, !0);
                re.isEmptyObject(c) && (delete g.handle, re._removeData(e, "events"))
            }
        },
        trigger: function (t, n, i, r) {
            var o, a, s, l, u, c, d, p = [i || he], f = te.call(t, "type") ? t.type : t,
                h = te.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = c = i = i || he, 3 !== i.nodeType && 8 !== i.nodeType && !Pe.test(f + re.event.triggered) && (f.indexOf(".") >= 0 && (h = f.split("."), f = h.shift(), h.sort()), a = f.indexOf(":") < 0 && "on" + f, t = t[re.expando] ? t : new re.Event(f, "object" == typeof t && t), t.isTrigger = r ? 2 : 3, t.namespace = h.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : re.makeArray(n, [t]), u = re.event.special[f] || {}, r || !u.trigger || !1 !== u.trigger.apply(i, n))) {
                if (!r && !u.noBubble && !re.isWindow(i)) {
                    for (l = u.delegateType || f, Pe.test(l + f) || (s = s.parentNode); s; s = s.parentNode) p.push(s), c = s;
                    c === (i.ownerDocument || he) && p.push(c.defaultView || c.parentWindow || e)
                }
                for (d = 0; (s = p[d++]) && !t.isPropagationStopped();) t.type = d > 1 ? l : u.bindType || f, o = (re._data(s, "events") || {})[t.type] && re._data(s, "handle"), o && o.apply(s, n), (o = a && s[a]) && o.apply && re.acceptData(s) && (t.result = o.apply(s, n), !1 === t.result && t.preventDefault());
                if (t.type = f, !r && !t.isDefaultPrevented() && (!u._default || !1 === u._default.apply(p.pop(), n)) && re.acceptData(i) && a && i[f] && !re.isWindow(i)) {
                    c = i[a], c && (i[a] = null), re.event.triggered = f;
                    try {
                        i[f]()
                    } catch (e) {
                    }
                    re.event.triggered = void 0, c && (i[a] = c)
                }
                return t.result
            }
        },
        dispatch: function (e) {
            e = re.event.fix(e);
            var t, n, i, r, o, a = [], s = G.call(arguments), l = (re._data(this, "events") || {})[e.type] || [],
                u = re.event.special[e.type] || {};
            if (s[0] = e, e.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, e)) {
                for (a = re.event.handlers.call(this, e, l), t = 0; (r = a[t++]) && !e.isPropagationStopped();) for (e.currentTarget = r.elem, o = 0; (i = r.handlers[o++]) && !e.isImmediatePropagationStopped();) (!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, void 0 !== (n = ((re.event.special[i.origType] || {}).handle || i.handler).apply(r.elem, s)) && !1 === (e.result = n) && (e.preventDefault(), e.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, e), e.result
            }
        },
        handlers: function (e, t) {
            var n, i, r, o, a = [], s = t.delegateCount, l = e.target;
            if (s && l.nodeType && (!e.button || "click" !== e.type)) for (; l != this; l = l.parentNode || this) if (1 === l.nodeType && (!0 !== l.disabled || "click" !== e.type)) {
                for (r = [], o = 0; s > o; o++) i = t[o], n = i.selector + " ", void 0 === r[n] && (r[n] = i.needsContext ? re(n, this).index(l) >= 0 : re.find(n, this, null, [l]).length), r[n] && r.push(i);
                r.length && a.push({elem: l, handlers: r})
            }
            return s < t.length && a.push({elem: this, handlers: t.slice(s)}), a
        },
        fix: function (e) {
            if (e[re.expando]) return e;
            var t, n, i, r = e.type, o = e, a = this.fixHooks[r];
            for (a || (this.fixHooks[r] = a = Oe.test(r) ? this.mouseHooks : Me.test(r) ? this.keyHooks : {}), i = a.props ? this.props.concat(a.props) : this.props, e = new re.Event(o), t = i.length; t--;) n = i[t], e[n] = o[n];
            return e.target || (e.target = o.srcElement || he), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, a.filter ? a.filter(e, o) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, t) {
                var n, i, r, o = t.button, a = t.fromElement;
                return null == e.pageX && null != t.clientX && (i = e.target.ownerDocument || he, r = i.documentElement, n = i.body, e.pageX = t.clientX + (r && r.scrollLeft || n && n.scrollLeft || 0) - (r && r.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || n && n.scrollTop || 0) - (r && r.clientTop || n && n.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? t.toElement : a), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
            }
        },
        special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    if (this !== h() && this.focus) try {
                        return this.focus(), !1
                    } catch (e) {
                    }
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    return this === h() && this.blur ? (this.blur(), !1) : void 0
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    return re.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                }, _default: function (e) {
                    return re.nodeName(e.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function (e, t, n, i) {
            var r = re.extend(new re.Event, n, {type: e, isSimulated: !0, originalEvent: {}});
            i ? re.event.trigger(r, null, t) : re.event.dispatch.call(t, r), r.isDefaultPrevented() && n.preventDefault()
        }
    }, re.removeEvent = he.removeEventListener ? function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function (e, t, n) {
        var i = "on" + t;
        e.detachEvent && (typeof e[i] === _e && (e[i] = null), e.detachEvent(i, n))
    }, re.Event = function (e, t) {
        return this instanceof re.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? p : f) : this.type = e, t && re.extend(this, t), this.timeStamp = e && e.timeStamp || re.now(), void (this[re.expando] = !0)) : new re.Event(e, t)
    }, re.Event.prototype = {
        isDefaultPrevented: f,
        isPropagationStopped: f,
        isImmediatePropagationStopped: f,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = p, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = p, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = p, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, re.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (e, t) {
        re.event.special[e] = {
            delegateType: t, bindType: t, handle: function (e) {
                var n, i = this, r = e.relatedTarget, o = e.handleObj;
                return (!r || r !== i && !re.contains(i, r)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), ne.submitBubbles || (re.event.special.submit = {
        setup: function () {
            return !re.nodeName(this, "form") && void re.event.add(this, "click._submit keypress._submit", function (e) {
                var t = e.target, n = re.nodeName(t, "input") || re.nodeName(t, "button") ? t.form : void 0;
                n && !re._data(n, "submitBubbles") && (re.event.add(n, "submit._submit", function (e) {
                    e._submit_bubble = !0
                }), re._data(n, "submitBubbles", !0))
            })
        }, postDispatch: function (e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && re.event.simulate("submit", this.parentNode, e, !0))
        }, teardown: function () {
            return !re.nodeName(this, "form") && void re.event.remove(this, "._submit")
        }
    }), ne.changeBubbles || (re.event.special.change = {
        setup: function () {
            return Le.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (re.event.add(this, "propertychange._change", function (e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
            }), re.event.add(this, "click._change", function (e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1), re.event.simulate("change", this, e, !0)
            })), !1) : void re.event.add(this, "beforeactivate._change", function (e) {
                var t = e.target;
                Le.test(t.nodeName) && !re._data(t, "changeBubbles") && (re.event.add(t, "change._change", function (e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || re.event.simulate("change", this.parentNode, e, !0)
                }), re._data(t, "changeBubbles", !0))
            })
        }, handle: function (e) {
            var t = e.target;
            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
        }, teardown: function () {
            return re.event.remove(this, "._change"), !Le.test(this.nodeName)
        }
    }), ne.focusinBubbles || re.each({focus: "focusin", blur: "focusout"}, function (e, t) {
        var n = function (e) {
            re.event.simulate(t, e.target, re.event.fix(e), !0)
        };
        re.event.special[t] = {
            setup: function () {
                var i = this.ownerDocument || this, r = re._data(i, t);
                r || i.addEventListener(e, n, !0), re._data(i, t, (r || 0) + 1)
            }, teardown: function () {
                var i = this.ownerDocument || this, r = re._data(i, t) - 1;
                r ? re._data(i, t, r) : (i.removeEventListener(e, n, !0), re._removeData(i, t))
            }
        }
    }), re.fn.extend({
        on: function (e, t, n, i, r) {
            var o, a;
            if ("object" == typeof e) {
                "string" != typeof t && (n = n || t, t = void 0);
                for (o in e) this.on(o, t, n, e[o], r);
                return this
            }
            if (null == n && null == i ? (i = t, n = t = void 0) : null == i && ("string" == typeof t ? (i = n, n = void 0) : (i = n, n = t, t = void 0)), !1 === i) i = f; else if (!i) return this;
            return 1 === r && (a = i, i = function (e) {
                return re().off(e), a.apply(this, arguments)
            }, i.guid = a.guid || (a.guid = re.guid++)), this.each(function () {
                re.event.add(this, e, i, n, t)
            })
        }, one: function (e, t, n, i) {
            return this.on(e, t, n, i, 1)
        }, off: function (e, t, n) {
            var i, r;
            if (e && e.preventDefault && e.handleObj) return i = e.handleObj, re(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            if ("object" == typeof e) {
                for (r in e) this.off(r, t, e[r]);
                return this
            }
            return (!1 === t || "function" == typeof t) && (n = t, t = void 0), !1 === n && (n = f), this.each(function () {
                re.event.remove(this, e, n, t)
            })
        }, trigger: function (e, t) {
            return this.each(function () {
                re.event.trigger(e, t, this)
            })
        }, triggerHandler: function (e, t) {
            var n = this[0];
            return n ? re.event.trigger(e, t, n, !0) : void 0
        }
    });
    var He = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        Ne = / jQuery\d+="(?:null|\d+)"/g, Re = new RegExp("<(?:" + He + ")[\\s/>]", "i"), je = /^\s+/,
        qe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Be = /<([\w:]+)/,
        We = /<tbody/i, $e = /<|&#?\w+;/, Fe = /<(?:script|style|link)/i, Xe = /checked\s*(?:[^=]|=\s*.checked.)/i,
        ze = /^$|\/(?:java|ecma)script/i, Ye = /^true\/(.*)/, Ve = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Ue = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: ne.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        }, Ge = v(he), Ke = Ge.appendChild(he.createElement("div"));
    Ue.optgroup = Ue.option, Ue.tbody = Ue.tfoot = Ue.colgroup = Ue.caption = Ue.thead, Ue.th = Ue.td, re.extend({
        clone: function (e, t, n) {
            var i, r, o, a, s, l = re.contains(e.ownerDocument, e);
            if (ne.html5Clone || re.isXMLDoc(e) || !Re.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Ke.innerHTML = e.outerHTML, Ke.removeChild(o = Ke.firstChild)), !(ne.noCloneEvent && ne.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || re.isXMLDoc(e))) for (i = g(o), s = g(e), a = 0; null != (r = s[a]); ++a) i[a] && T(r, i[a]);
            if (t) if (n) for (s = s || g(e), i = i || g(o), a = 0; null != (r = s[a]); a++) _(r, i[a]); else _(e, o);
            return i = g(o, "script"), i.length > 0 && x(i, !l && g(e, "script")), i = s = r = null, o
        }, buildFragment: function (e, t, n, i) {
            for (var r, o, a, s, l, u, c, d = e.length, p = v(t), f = [], h = 0; d > h; h++) if ((o = e[h]) || 0 === o) if ("object" === re.type(o)) re.merge(f, o.nodeType ? [o] : o); else if ($e.test(o)) {
                for (s = s || p.appendChild(t.createElement("div")), l = (Be.exec(o) || ["", ""])[1].toLowerCase(), c = Ue[l] || Ue._default, s.innerHTML = c[1] + o.replace(qe, "<$1></$2>") + c[2], r = c[0]; r--;) s = s.lastChild;
                if (!ne.leadingWhitespace && je.test(o) && f.push(t.createTextNode(je.exec(o)[0])), !ne.tbody) for (o = "table" !== l || We.test(o) ? "<table>" !== c[1] || We.test(o) ? 0 : s : s.firstChild, r = o && o.childNodes.length; r--;) re.nodeName(u = o.childNodes[r], "tbody") && !u.childNodes.length && o.removeChild(u);
                for (re.merge(f, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
                s = p.lastChild
            } else f.push(t.createTextNode(o));
            for (s && p.removeChild(s), ne.appendChecked || re.grep(g(f, "input"), m), h = 0; o = f[h++];) if ((!i || -1 === re.inArray(o, i)) && (a = re.contains(o.ownerDocument, o), s = g(p.appendChild(o), "script"), a && x(s), n)) for (r = 0; o = s[r++];) ze.test(o.type || "") && n.push(o);
            return s = null, p
        }, cleanData: function (e, t) {
            for (var n, i, r, o, a = 0, s = re.expando, l = re.cache, u = ne.deleteExpando, c = re.event.special; null != (n = e[a]); a++) if ((t || re.acceptData(n)) && (r = n[s], o = r && l[r])) {
                if (o.events) for (i in o.events) c[i] ? re.event.remove(n, i) : re.removeEvent(n, i, o.handle);
                l[r] && (delete l[r], u ? delete n[s] : typeof n.removeAttribute !== _e ? n.removeAttribute(s) : n[s] = null, U.push(r))
            }
        }
    }), re.fn.extend({
        text: function (e) {
            return Se(this, function (e) {
                return void 0 === e ? re.text(this) : this.empty().append((this[0] && this[0].ownerDocument || he).createTextNode(e))
            }, null, e, arguments.length)
        }, append: function () {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    y(this, e).appendChild(e)
                }
            })
        }, prepend: function () {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = y(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        }, before: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        }, after: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        }, remove: function (e, t) {
            for (var n, i = e ? re.filter(e, this) : this, r = 0; null != (n = i[r]); r++) t || 1 !== n.nodeType || re.cleanData(g(n)), n.parentNode && (t && re.contains(n.ownerDocument, n) && x(g(n, "script")), n.parentNode.removeChild(n));
            return this
        }, empty: function () {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && re.cleanData(g(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                e.options && re.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        }, clone: function (e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function () {
                return re.clone(this, e, t)
            })
        }, html: function (e) {
            return Se(this, function (e) {
                var t = this[0] || {}, n = 0, i = this.length;
                if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(Ne, "") : void 0;
                if (!("string" != typeof e || Fe.test(e) || !ne.htmlSerialize && Re.test(e) || !ne.leadingWhitespace && je.test(e) || Ue[(Be.exec(e) || ["", ""])[1].toLowerCase()])) {
                    e = e.replace(qe, "<$1></$2>");
                    try {
                        for (; i > n; n++) t = this[n] || {}, 1 === t.nodeType && (re.cleanData(g(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (e) {
                    }
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        }, replaceWith: function () {
            var e = arguments[0];
            return this.domManip(arguments, function (t) {
                e = this.parentNode, re.cleanData(g(this)), e && e.replaceChild(t, this)
            }), e && (e.length || e.nodeType) ? this : this.remove()
        }, detach: function (e) {
            return this.remove(e, !0)
        }, domManip: function (e, t) {
            e = K.apply([], e);
            var n, i, r, o, a, s, l = 0, u = this.length, c = this, d = u - 1, p = e[0], f = re.isFunction(p);
            if (f || u > 1 && "string" == typeof p && !ne.checkClone && Xe.test(p)) return this.each(function (n) {
                var i = c.eq(n);
                f && (e[0] = p.call(this, n, i.html())), i.domManip(e, t)
            });
            if (u && (s = re.buildFragment(e, this[0].ownerDocument, !1, this), n = s.firstChild, 1 === s.childNodes.length && (s = n), n)) {
                for (o = re.map(g(s, "script"), b), r = o.length; u > l; l++) i = s, l !== d && (i = re.clone(i, !0, !0), r && re.merge(o, g(i, "script"))), t.call(this[l], i, l);
                if (r) for (a = o[o.length - 1].ownerDocument, re.map(o, w), l = 0; r > l; l++) i = o[l], ze.test(i.type || "") && !re._data(i, "globalEval") && re.contains(a, i) && (i.src ? re._evalUrl && re._evalUrl(i.src) : re.globalEval((i.text || i.textContent || i.innerHTML || "").replace(Ve, "")));
                s = n = null
            }
            return this
        }
    }), re.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, t) {
        re.fn[e] = function (e) {
            for (var n, i = 0, r = [], o = re(e), a = o.length - 1; a >= i; i++) n = i === a ? this : this.clone(!0), re(o[i])[t](n), Q.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var Qe, Je = {};
    !function () {
        var e;
        ne.shrinkWrapBlocks = function () {
            if (null != e) return e;
            e = !1;
            var t, n, i;
            return n = he.getElementsByTagName("body")[0], n && n.style ? (t = he.createElement("div"), i = he.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), typeof t.style.zoom !== _e && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(he.createElement("div")).style.width = "5px", e = 3 !== t.offsetWidth), n.removeChild(i), e) : void 0
        }
    }();
    var Ze, et, tt = /^margin/, nt = new RegExp("^(" + Ee + ")(?!px)[a-z%]+$", "i"), it = /^(top|right|bottom|left)$/;
    e.getComputedStyle ? (Ze = function (t) {
        return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null)
    }, et = function (e, t, n) {
        var i, r, o, a, s = e.style;
        return n = n || Ze(e), a = n ? n.getPropertyValue(t) || n[t] : void 0, n && ("" !== a || re.contains(e.ownerDocument, e) || (a = re.style(e, t)), nt.test(a) && tt.test(t) && (i = s.width, r = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = i, s.minWidth = r,
            s.maxWidth = o)), void 0 === a ? a : a + ""
    }) : he.documentElement.currentStyle && (Ze = function (e) {
        return e.currentStyle
    }, et = function (e, t, n) {
        var i, r, o, a, s = e.style;
        return n = n || Ze(e), a = n ? n[t] : void 0, null == a && s && s[t] && (a = s[t]), nt.test(a) && !it.test(t) && (i = s.left, r = e.runtimeStyle, o = r && r.left, o && (r.left = e.currentStyle.left), s.left = "fontSize" === t ? "1em" : a, a = s.pixelLeft + "px", s.left = i, o && (r.left = o)), void 0 === a ? a : a + "" || "auto"
    }), !function () {
        function t() {
            var t, n, i, r;
            (n = he.getElementsByTagName("body")[0]) && n.style && (t = he.createElement("div"), i = he.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", o = a = !1, l = !0, e.getComputedStyle && (o = "1%" !== (e.getComputedStyle(t, null) || {}).top, a = "4px" === (e.getComputedStyle(t, null) || {width: "4px"}).width, r = t.appendChild(he.createElement("div")), r.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", r.style.marginRight = r.style.width = "0", t.style.width = "1px", l = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight), t.removeChild(r)), t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", r = t.getElementsByTagName("td"), r[0].style.cssText = "margin:0;border:0;padding:0;display:none", s = 0 === r[0].offsetHeight, s && (r[0].style.display = "", r[1].style.display = "none", s = 0 === r[0].offsetHeight), n.removeChild(i))
        }

        var n, i, r, o, a, s, l;
        n = he.createElement("div"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", r = n.getElementsByTagName("a")[0], (i = r && r.style) && (i.cssText = "float:left;opacity:.5", ne.opacity = "0.5" === i.opacity, ne.cssFloat = !!i.cssFloat, n.style.backgroundClip = "content-box", n.cloneNode(!0).style.backgroundClip = "", ne.clearCloneStyle = "content-box" === n.style.backgroundClip, ne.boxSizing = "" === i.boxSizing || "" === i.MozBoxSizing || "" === i.WebkitBoxSizing, re.extend(ne, {
            reliableHiddenOffsets: function () {
                return null == s && t(), s
            }, boxSizingReliable: function () {
                return null == a && t(), a
            }, pixelPosition: function () {
                return null == o && t(), o
            }, reliableMarginRight: function () {
                return null == l && t(), l
            }
        }))
    }(), re.swap = function (e, t, n, i) {
        var r, o, a = {};
        for (o in t) a[o] = e.style[o], e.style[o] = t[o];
        r = n.apply(e, i || []);
        for (o in t) e.style[o] = a[o];
        return r
    };
    var rt = /alpha\([^)]*\)/i, ot = /opacity\s*=\s*([^)]*)/, at = /^(none|table(?!-c[ea]).+)/,
        st = new RegExp("^(" + Ee + ")(.*)$", "i"), lt = new RegExp("^([+-])=(" + Ee + ")", "i"),
        ut = {position: "absolute", visibility: "hidden", display: "block"},
        ct = {letterSpacing: "0", fontWeight: "400"}, dt = ["Webkit", "O", "Moz", "ms"];
    re.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = et(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {float: ne.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (e, t, n, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var r, o, a, s = re.camelCase(t), l = e.style;
                if (t = re.cssProps[s] || (re.cssProps[s] = D(l, s)), a = re.cssHooks[t] || re.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (r = a.get(e, !1, i)) ? r : l[t];
                if (o = typeof n, "string" === o && (r = lt.exec(n)) && (n = (r[1] + 1) * r[2] + parseFloat(re.css(e, t)), o = "number"), null != n && n === n && ("number" !== o || re.cssNumber[s] || (n += "px"), ne.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), !(a && "set" in a && void 0 === (n = a.set(e, n, i))))) try {
                    l[t] = n
                } catch (e) {
                }
            }
        },
        css: function (e, t, n, i) {
            var r, o, a, s = re.camelCase(t);
            return t = re.cssProps[s] || (re.cssProps[s] = D(e.style, s)), a = re.cssHooks[t] || re.cssHooks[s], a && "get" in a && (o = a.get(e, !0, n)), void 0 === o && (o = et(e, t, i)), "normal" === o && t in ct && (o = ct[t]), "" === n || n ? (r = parseFloat(o), !0 === n || re.isNumeric(r) ? r || 0 : o) : o
        }
    }), re.each(["height", "width"], function (e, t) {
        re.cssHooks[t] = {
            get: function (e, n, i) {
                return n ? at.test(re.css(e, "display")) && 0 === e.offsetWidth ? re.swap(e, ut, function () {
                    return M(e, t, i)
                }) : M(e, t, i) : void 0
            }, set: function (e, n, i) {
                var r = i && Ze(e);
                return k(e, n, i ? L(e, t, i, ne.boxSizing && "border-box" === re.css(e, "boxSizing", !1, r), r) : 0)
            }
        }
    }), ne.opacity || (re.cssHooks.opacity = {
        get: function (e, t) {
            return ot.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        }, set: function (e, t) {
            var n = e.style, i = e.currentStyle, r = re.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                o = i && i.filter || n.filter || "";
            n.zoom = 1, (t >= 1 || "" === t) && "" === re.trim(o.replace(rt, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = rt.test(o) ? o.replace(rt, r) : o + " " + r)
        }
    }), re.cssHooks.marginRight = A(ne.reliableMarginRight, function (e, t) {
        return t ? re.swap(e, {display: "inline-block"}, et, [e, "marginRight"]) : void 0
    }), re.each({margin: "", padding: "", border: "Width"}, function (e, t) {
        re.cssHooks[e + t] = {
            expand: function (n) {
                for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) r[e + Ae[i] + t] = o[i] || o[i - 2] || o[0];
                return r
            }
        }, tt.test(e) || (re.cssHooks[e + t].set = k)
    }), re.fn.extend({
        css: function (e, t) {
            return Se(this, function (e, t, n) {
                var i, r, o = {}, a = 0;
                if (re.isArray(t)) {
                    for (i = Ze(e), r = t.length; r > a; a++) o[t[a]] = re.css(e, t[a], !1, i);
                    return o
                }
                return void 0 !== n ? re.style(e, t, n) : re.css(e, t)
            }, e, t, arguments.length > 1)
        }, show: function () {
            return S(this, !0)
        }, hide: function () {
            return S(this)
        }, toggle: function (e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                De(this) ? re(this).show() : re(this).hide()
            })
        }
    }), re.Tween = O, O.prototype = {
        constructor: O, init: function (e, t, n, i, r, o) {
            this.elem = e, this.prop = n, this.easing = r || "swing", this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = o || (re.cssNumber[n] ? "" : "px")
        }, cur: function () {
            var e = O.propHooks[this.prop];
            return e && e.get ? e.get(this) : O.propHooks._default.get(this)
        }, run: function (e) {
            var t, n = O.propHooks[this.prop];
            return this.options.duration ? this.pos = t = re.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : O.propHooks._default.set(this), this
        }
    }, O.prototype.init.prototype = O.prototype, O.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = re.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            }, set: function (e) {
                re.fx.step[e.prop] ? re.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[re.cssProps[e.prop]] || re.cssHooks[e.prop]) ? re.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, O.propHooks.scrollTop = O.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, re.easing = {
        linear: function (e) {
            return e
        }, swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, re.fx = O.prototype.init, re.fx.step = {};
    var pt, ft, ht = /^(?:toggle|show|hide)$/, vt = new RegExp("^(?:([+-])=|)(" + Ee + ")([a-z%]*)$", "i"),
        gt = /queueHooks$/, mt = [N], yt = {
            "*": [function (e, t) {
                var n = this.createTween(e, t), i = n.cur(), r = vt.exec(t), o = r && r[3] || (re.cssNumber[e] ? "" : "px"),
                    a = (re.cssNumber[e] || "px" !== o && +i) && vt.exec(re.css(n.elem, e)), s = 1, l = 20;
                if (a && a[3] !== o) {
                    o = o || a[3], r = r || [], a = +i || 1;
                    do {
                        s = s || ".5", a /= s, re.style(n.elem, e, a + o)
                    } while (s !== (s = n.cur() / i) && 1 !== s && --l)
                }
                return r && (a = n.start = +a || +i || 0, n.unit = o, n.end = r[1] ? a + (r[1] + 1) * r[2] : +r[2]), n
            }]
        };
    re.Animation = re.extend(j, {
        tweener: function (e, t) {
            re.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var n, i = 0, r = e.length; r > i; i++) n = e[i], yt[n] = yt[n] || [], yt[n].unshift(t)
        }, prefilter: function (e, t) {
            t ? mt.unshift(e) : mt.push(e)
        }
    }), re.speed = function (e, t, n) {
        var i = e && "object" == typeof e ? re.extend({}, e) : {
            complete: n || !n && t || re.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !re.isFunction(t) && t
        };
        return i.duration = re.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in re.fx.speeds ? re.fx.speeds[i.duration] : re.fx.speeds._default, (null == i.queue || !0 === i.queue) && (i.queue = "fx"), i.old = i.complete, i.complete = function () {
            re.isFunction(i.old) && i.old.call(this), i.queue && re.dequeue(this, i.queue)
        }, i
    }, re.fn.extend({
        fadeTo: function (e, t, n, i) {
            return this.filter(De).css("opacity", 0).show().end().animate({opacity: t}, e, n, i)
        }, animate: function (e, t, n, i) {
            var r = re.isEmptyObject(e), o = re.speed(t, n, i), a = function () {
                var t = j(this, re.extend({}, e), o);
                (r || re._data(this, "finish")) && t.stop(!0)
            };
            return a.finish = a, r || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
        }, stop: function (e, t, n) {
            var i = function (e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function () {
                var t = !0, r = null != e && e + "queueHooks", o = re.timers, a = re._data(this);
                if (r) a[r] && a[r].stop && i(a[r]); else for (r in a) a[r] && a[r].stop && gt.test(r) && i(a[r]);
                for (r = o.length; r--;) o[r].elem !== this || null != e && o[r].queue !== e || (o[r].anim.stop(n), t = !1, o.splice(r, 1));
                (t || !n) && re.dequeue(this, e)
            })
        }, finish: function (e) {
            return !1 !== e && (e = e || "fx"), this.each(function () {
                var t, n = re._data(this), i = n[e + "queue"], r = n[e + "queueHooks"], o = re.timers,
                    a = i ? i.length : 0;
                for (n.finish = !0, re.queue(this, e, []), r && r.stop && r.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                for (t = 0; a > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
                delete n.finish
            })
        }
    }), re.each(["toggle", "show", "hide"], function (e, t) {
        var n = re.fn[t];
        re.fn[t] = function (e, i, r) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(I(t, !0), e, i, r)
        }
    }), re.each({
        slideDown: I("show"),
        slideUp: I("hide"),
        slideToggle: I("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (e, t) {
        re.fn[e] = function (e, n, i) {
            return this.animate(t, e, n, i)
        }
    }), re.timers = [], re.fx.tick = function () {
        var e, t = re.timers, n = 0;
        for (pt = re.now(); n < t.length; n++) (e = t[n])() || t[n] !== e || t.splice(n--, 1);
        t.length || re.fx.stop(), pt = void 0
    }, re.fx.timer = function (e) {
        re.timers.push(e), e() ? re.fx.start() : re.timers.pop()
    }, re.fx.interval = 13, re.fx.start = function () {
        ft || (ft = setInterval(re.fx.tick, re.fx.interval))
    }, re.fx.stop = function () {
        clearInterval(ft), ft = null
    }, re.fx.speeds = {slow: 600, fast: 200, _default: 400}, re.fn.delay = function (e, t) {
        return e = re.fx ? re.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
            var i = setTimeout(t, e);
            n.stop = function () {
                clearTimeout(i)
            }
        })
    }, function () {
        var e, t, n, i, r;
        t = he.createElement("div"), t.setAttribute("className", "t"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", i = t.getElementsByTagName("a")[0], n = he.createElement("select"), r = n.appendChild(he.createElement("option")), e = t.getElementsByTagName("input")[0], i.style.cssText = "top:1px", ne.getSetAttribute = "t" !== t.className, ne.style = /top/.test(i.getAttribute("style")), ne.hrefNormalized = "/a" === i.getAttribute("href"), ne.checkOn = !!e.value, ne.optSelected = r.selected, ne.enctype = !!he.createElement("form").enctype, n.disabled = !0, ne.optDisabled = !r.disabled, e = he.createElement("input"), e.setAttribute("value", ""), ne.input = "" === e.getAttribute("value"), e.value = "t", e.setAttribute("type", "radio"), ne.radioValue = "t" === e.value
    }();
    var bt = /\r/g;
    re.fn.extend({
        val: function (e) {
            var t, n, i, r = this[0];
            return arguments.length ? (i = re.isFunction(e), this.each(function (n) {
                var r;
                1 === this.nodeType && (r = i ? e.call(this, n, re(this).val()) : e, null == r ? r = "" : "number" == typeof r ? r += "" : re.isArray(r) && (r = re.map(r, function (e) {
                    return null == e ? "" : e + ""
                })), (t = re.valHooks[this.type] || re.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, r, "value") || (this.value = r))
            })) : r ? (t = re.valHooks[r.type] || re.valHooks[r.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(r, "value")) ? n : (n = r.value, "string" == typeof n ? n.replace(bt, "") : null == n ? "" : n)) : void 0
        }
    }), re.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = re.find.attr(e, "value");
                    return null != t ? t : re.trim(re.text(e))
                }
            }, select: {
                get: function (e) {
                    for (var t, n, i = e.options, r = e.selectedIndex, o = "select-one" === e.type || 0 > r, a = o ? null : [], s = o ? r + 1 : i.length, l = 0 > r ? s : o ? r : 0; s > l; l++) if (n = i[l], !(!n.selected && l !== r || (ne.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && re.nodeName(n.parentNode, "optgroup"))) {
                        if (t = re(n).val(), o) return t;
                        a.push(t)
                    }
                    return a
                }, set: function (e, t) {
                    for (var n, i, r = e.options, o = re.makeArray(t), a = r.length; a--;) if (i = r[a], re.inArray(re.valHooks.option.get(i), o) >= 0) try {
                        i.selected = n = !0
                    } catch (e) {
                        i.scrollHeight
                    } else i.selected = !1;
                    return n || (e.selectedIndex = -1), r
                }
            }
        }
    }), re.each(["radio", "checkbox"], function () {
        re.valHooks[this] = {
            set: function (e, t) {
                return re.isArray(t) ? e.checked = re.inArray(re(e).val(), t) >= 0 : void 0
            }
        }, ne.checkOn || (re.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var wt, xt, _t = re.expr.attrHandle, Tt = /^(?:checked|selected)$/i, Ct = ne.getSetAttribute, Et = ne.input;
    re.fn.extend({
        attr: function (e, t) {
            return Se(this, re.attr, e, t, arguments.length > 1)
        }, removeAttr: function (e) {
            return this.each(function () {
                re.removeAttr(this, e)
            })
        }
    }), re.extend({
        attr: function (e, t, n) {
            var i, r, o = e.nodeType;
            if (e && 3 !== o && 8 !== o && 2 !== o) return typeof e.getAttribute === _e ? re.prop(e, t, n) : (1 === o && re.isXMLDoc(e) || (t = t.toLowerCase(), i = re.attrHooks[t] || (re.expr.match.bool.test(t) ? xt : wt)), void 0 === n ? i && "get" in i && null !== (r = i.get(e, t)) ? r : (r = re.find.attr(e, t), null == r ? void 0 : r) : null !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : void re.removeAttr(e, t))
        }, removeAttr: function (e, t) {
            var n, i, r = 0, o = t && t.match(ye);
            if (o && 1 === e.nodeType) for (; n = o[r++];) i = re.propFix[n] || n, re.expr.match.bool.test(n) ? Et && Ct || !Tt.test(n) ? e[i] = !1 : e[re.camelCase("default-" + n)] = e[i] = !1 : re.attr(e, n, ""), e.removeAttribute(Ct ? n : i)
        }, attrHooks: {
            type: {
                set: function (e, t) {
                    if (!ne.radioValue && "radio" === t && re.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        }
    }), xt = {
        set: function (e, t, n) {
            return !1 === t ? re.removeAttr(e, n) : Et && Ct || !Tt.test(n) ? e.setAttribute(!Ct && re.propFix[n] || n, n) : e[re.camelCase("default-" + n)] = e[n] = !0, n
        }
    }, re.each(re.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var n = _t[t] || re.find.attr;
        _t[t] = Et && Ct || !Tt.test(t) ? function (e, t, i) {
            var r, o;
            return i || (o = _t[t], _t[t] = r, r = null != n(e, t, i) ? t.toLowerCase() : null, _t[t] = o), r
        } : function (e, t, n) {
            return n ? void 0 : e[re.camelCase("default-" + t)] ? t.toLowerCase() : null
        }
    }), Et && Ct || (re.attrHooks.value = {
        set: function (e, t, n) {
            return re.nodeName(e, "input") ? void (e.defaultValue = t) : wt && wt.set(e, t, n)
        }
    }), Ct || (wt = {
        set: function (e, t, n) {
            var i = e.getAttributeNode(n);
            return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(n)), i.value = t += "", "value" === n || t === e.getAttribute(n) ? t : void 0
        }
    }, _t.id = _t.name = _t.coords = function (e, t, n) {
        var i;
        return n ? void 0 : (i = e.getAttributeNode(t)) && "" !== i.value ? i.value : null
    }, re.valHooks.button = {
        get: function (e, t) {
            var n = e.getAttributeNode(t);
            return n && n.specified ? n.value : void 0
        }, set: wt.set
    }, re.attrHooks.contenteditable = {
        set: function (e, t, n) {
            wt.set(e, "" !== t && t, n)
        }
    }, re.each(["width", "height"], function (e, t) {
        re.attrHooks[t] = {
            set: function (e, n) {
                return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
            }
        }
    })), ne.style || (re.attrHooks.style = {
        get: function (e) {
            return e.style.cssText || void 0
        }, set: function (e, t) {
            return e.style.cssText = t + ""
        }
    });
    var At = /^(?:input|select|textarea|button|object)$/i, Dt = /^(?:a|area)$/i;
    re.fn.extend({
        prop: function (e, t) {
            return Se(this, re.prop, e, t, arguments.length > 1)
        }, removeProp: function (e) {
            return e = re.propFix[e] || e, this.each(function () {
                try {
                    this[e] = void 0, delete this[e]
                } catch (e) {
                }
            })
        }
    }), re.extend({
        propFix: {for: "htmlFor", class: "className"}, prop: function (e, t, n) {
            var i, r, o, a = e.nodeType;
            if (e && 3 !== a && 8 !== a && 2 !== a) return o = 1 !== a || !re.isXMLDoc(e), o && (t = re.propFix[t] || t, r = re.propHooks[t]), void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : e[t] = n : r && "get" in r && null !== (i = r.get(e, t)) ? i : e[t]
        }, propHooks: {
            tabIndex: {
                get: function (e) {
                    var t = re.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : At.test(e.nodeName) || Dt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        }
    }), ne.hrefNormalized || re.each(["href", "src"], function (e, t) {
        re.propHooks[t] = {
            get: function (e) {
                return e.getAttribute(t, 4)
            }
        }
    }), ne.optSelected || (re.propHooks.selected = {
        get: function (e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    }), re.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        re.propFix[this.toLowerCase()] = this
    }), ne.enctype || (re.propFix.enctype = "encoding");
    var St = /[\t\r\n\f]/g;
    re.fn.extend({
        addClass: function (e) {
            var t, n, i, r, o, a, s = 0, l = this.length, u = "string" == typeof e && e;
            if (re.isFunction(e)) return this.each(function (t) {
                re(this).addClass(e.call(this, t, this.className))
            });
            if (u) for (t = (e || "").match(ye) || []; l > s; s++) if (n = this[s], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(St, " ") : " ")) {
                for (o = 0; r = t[o++];) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                a = re.trim(i), n.className !== a && (n.className = a)
            }
            return this
        }, removeClass: function (e) {
            var t, n, i, r, o, a, s = 0, l = this.length, u = 0 === arguments.length || "string" == typeof e && e;
            if (re.isFunction(e)) return this.each(function (t) {
                re(this).removeClass(e.call(this, t, this.className))
            });
            if (u) for (t = (e || "").match(ye) || []; l > s; s++) if (n = this[s], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(St, " ") : "")) {
                for (o = 0; r = t[o++];) for (; i.indexOf(" " + r + " ") >= 0;) i = i.replace(" " + r + " ", " ");
                a = e ? re.trim(i) : "", n.className !== a && (n.className = a)
            }
            return this
        }, toggleClass: function (e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(re.isFunction(e) ? function (n) {
                re(this).toggleClass(e.call(this, n, this.className, t), t)
            } : function () {
                if ("string" === n) for (var t, i = 0, r = re(this), o = e.match(ye) || []; t = o[i++];) r.hasClass(t) ? r.removeClass(t) : r.addClass(t); else (n === _e || "boolean" === n) && (this.className && re._data(this, "__className__", this.className), this.className = this.className || !1 === e ? "" : re._data(this, "__className__") || "")
            })
        }, hasClass: function (e) {
            for (var t = " " + e + " ", n = 0, i = this.length; i > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(St, " ").indexOf(t) >= 0) return !0;
            return !1
        }
    }), re.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        re.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), re.fn.extend({
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }, bind: function (e, t, n) {
            return this.on(e, null, t, n)
        }, unbind: function (e, t) {
            return this.off(e, null, t)
        }, delegate: function (e, t, n, i) {
            return this.on(t, e, n, i)
        }, undelegate: function (e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var kt = re.now(), Lt = /\?/,
        Mt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    re.parseJSON = function (t) {
        if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
        var n, i = null, r = re.trim(t + "");
        return r && !re.trim(r.replace(Mt, function (e, t, r, o) {
            return n && t && (i = 0), 0 === i ? e : (n = r || t, i += !o - !r, "")
        })) ? Function("return " + r)() : re.error("Invalid JSON: " + t)
    }, re.parseXML = function (t) {
        var n, i;
        if (!t || "string" != typeof t) return null;
        try {
            e.DOMParser ? (i = new DOMParser, n = i.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
        } catch (e) {
            n = void 0
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || re.error("Invalid XML: " + t), n
    };
    var Ot, Pt, It = /#.*$/, Ht = /([?&])_=[^&]*/, Nt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Rt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, jt = /^(?:GET|HEAD)$/, qt = /^\/\//,
        Bt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Wt = {}, $t = {}, Ft = "*/".concat("*");
    try {
        Pt = location.href
    } catch (e) {
        Pt = he.createElement("a"), Pt.href = "", Pt = Pt.href
    }
    Ot = Bt.exec(Pt.toLowerCase()) || [], re.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Pt,
            type: "GET",
            isLocal: Rt.test(Ot[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Ft,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": re.parseJSON, "text xml": re.parseXML},
            flatOptions: {url: !0, context: !0}
        },
        ajaxSetup: function (e, t) {
            return t ? W(W(e, re.ajaxSettings), t) : W(re.ajaxSettings, e)
        },
        ajaxPrefilter: q(Wt),
        ajaxTransport: q($t),
        ajax: function (e, t) {
            function n(e, t, n, i) {
                var r, c, m, y, w, _ = t;
                2 !== b && (b = 2, s && clearTimeout(s), u = void 0, a = i || "", x.readyState = e > 0 ? 4 : 0, r = e >= 200 && 300 > e || 304 === e, n && (y = $(d, x, n)), y = F(d, y, x, r), r ? (d.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (re.lastModified[o] = w), (w = x.getResponseHeader("etag")) && (re.etag[o] = w)), 204 === e || "HEAD" === d.type ? _ = "nocontent" : 304 === e ? _ = "notmodified" : (_ = y.state, c = y.data, m = y.error, r = !m)) : (m = _, (e || !_) && (_ = "error", 0 > e && (e = 0))), x.status = e, x.statusText = (t || _) + "", r ? h.resolveWith(p, [c, _, x]) : h.rejectWith(p, [x, _, m]), x.statusCode(g), g = void 0, l && f.trigger(r ? "ajaxSuccess" : "ajaxError", [x, d, r ? c : m]), v.fireWith(p, [x, _]), l && (f.trigger("ajaxComplete", [x, d]), --re.active || re.event.trigger("ajaxStop")))
            }

            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var i, r, o, a, s, l, u, c, d = re.ajaxSetup({}, t), p = d.context || d,
                f = d.context && (p.nodeType || p.jquery) ? re(p) : re.event, h = re.Deferred(),
                v = re.Callbacks("once memory"), g = d.statusCode || {}, m = {}, y = {}, b = 0, w = "canceled", x = {
                    readyState: 0, getResponseHeader: function (e) {
                        var t;
                        if (2 === b) {
                            if (!c) for (c = {}; t = Nt.exec(a);) c[t[1].toLowerCase()] = t[2];
                            t = c[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    }, getAllResponseHeaders: function () {
                        return 2 === b ? a : null
                    }, setRequestHeader: function (e, t) {
                        var n = e.toLowerCase();
                        return b || (e = y[n] = y[n] || e, m[e] = t), this
                    }, overrideMimeType: function (e) {
                        return b || (d.mimeType = e), this
                    }, statusCode: function (e) {
                        var t;
                        if (e) if (2 > b) for (t in e) g[t] = [g[t], e[t]]; else x.always(e[x.status]);
                        return this
                    }, abort: function (e) {
                        var t = e || w;
                        return u && u.abort(t), n(0, t), this
                    }
                };
            if (h.promise(x).complete = v.add, x.success = x.done, x.error = x.fail, d.url = ((e || d.url || Pt) + "").replace(It, "").replace(qt, Ot[1] + "//"), d.type = t.method || t.type || d.method || d.type, d.dataTypes = re.trim(d.dataType || "*").toLowerCase().match(ye) || [""], null == d.crossDomain && (i = Bt.exec(d.url.toLowerCase()), d.crossDomain = !(!i || i[1] === Ot[1] && i[2] === Ot[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (Ot[3] || ("http:" === Ot[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = re.param(d.data, d.traditional)), B(Wt, d, t, x), 2 === b) return x;
            l = re.event && d.global, l && 0 == re.active++ && re.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !jt.test(d.type), o = d.url, d.hasContent || (d.data && (o = d.url += (Lt.test(o) ? "&" : "?") + d.data, delete d.data), !1 === d.cache && (d.url = Ht.test(o) ? o.replace(Ht, "$1_=" + kt++) : o + (Lt.test(o) ? "&" : "?") + "_=" + kt++)), d.ifModified && (re.lastModified[o] && x.setRequestHeader("If-Modified-Since", re.lastModified[o]), re.etag[o] && x.setRequestHeader("If-None-Match", re.etag[o])), (d.data && d.hasContent && !1 !== d.contentType || t.contentType) && x.setRequestHeader("Content-Type", d.contentType), x.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Ft + "; q=0.01" : "") : d.accepts["*"]);
            for (r in d.headers) x.setRequestHeader(r, d.headers[r]);
            if (d.beforeSend && (!1 === d.beforeSend.call(p, x, d) || 2 === b)) return x.abort();
            w = "abort";
            for (r in {success: 1, error: 1, complete: 1}) x[r](d[r]);
            if (u = B($t, d, t, x)) {
                x.readyState = 1, l && f.trigger("ajaxSend", [x, d]), d.async && d.timeout > 0 && (s = setTimeout(function () {
                    x.abort("timeout")
                }, d.timeout));
                try {
                    b = 1, u.send(m, n)
                } catch (e) {
                    if (!(2 > b)) throw e;
                    n(-1, e)
                }
            } else n(-1, "No Transport");
            return x
        },
        getJSON: function (e, t, n) {
            return re.get(e, t, n, "json")
        },
        getScript: function (e, t) {
            return re.get(e, void 0, t, "script")
        }
    }), re.each(["get", "post"], function (e, t) {
        re[t] = function (e, n, i, r) {
            return re.isFunction(n) && (r = r || i, i = n, n = void 0), re.ajax({
                url: e,
                type: t,
                dataType: r,
                data: n,
                success: i
            })
        }
    }), re._evalUrl = function (e) {
        return re.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, throws: !0})
    }, re.fn.extend({
        wrapAll: function (e) {
            if (re.isFunction(e)) return this.each(function (t) {
                re(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = re(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        }, wrapInner: function (e) {
            return this.each(re.isFunction(e) ? function (t) {
                re(this).wrapInner(e.call(this, t))
            } : function () {
                var t = re(this), n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        }, wrap: function (e) {
            var t = re.isFunction(e);
            return this.each(function (n) {
                re(this).wrapAll(t ? e.call(this, n) : e)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                re.nodeName(this, "body") || re(this).replaceWith(this.childNodes)
            }).end()
        }
    }), re.expr.filters.hidden = function (e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ne.reliableHiddenOffsets() && "none" === (e.style && e.style.display || re.css(e, "display"))
    }, re.expr.filters.visible = function (e) {
        return !re.expr.filters.hidden(e)
    };
    var Xt = /%20/g, zt = /\[\]$/, Yt = /\r?\n/g, Vt = /^(?:submit|button|image|reset|file)$/i,
        Ut = /^(?:input|select|textarea|keygen)/i;
    re.param = function (e, t) {
        var n, i = [], r = function (e, t) {
            t = re.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (void 0 === t && (t = re.ajaxSettings && re.ajaxSettings.traditional), re.isArray(e) || e.jquery && !re.isPlainObject(e)) re.each(e, function () {
            r(this.name, this.value)
        }); else for (n in e) X(n, e[n], t, r);
        return i.join("&").replace(Xt, "+")
    }, re.fn.extend({
        serialize: function () {
            return re.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var e = re.prop(this, "elements");
                return e ? re.makeArray(e) : this
            }).filter(function () {
                var e = this.type;
                return this.name && !re(this).is(":disabled") && Ut.test(this.nodeName) && !Vt.test(e) && (this.checked || !ke.test(e))
            }).map(function (e, t) {
                var n = re(this).val();
                return null == n ? null : re.isArray(n) ? re.map(n, function (e) {
                    return {name: t.name, value: e.replace(Yt, "\r\n")}
                }) : {name: t.name, value: n.replace(Yt, "\r\n")}
            }).get()
        }
    }), re.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function () {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && z() || Y()
    } : z;
    var Gt = 0, Kt = {}, Qt = re.ajaxSettings.xhr();
    e.attachEvent && e.attachEvent("onunload", function () {
        for (var e in Kt) Kt[e](void 0, !0)
    }), ne.cors = !!Qt && "withCredentials" in Qt, (Qt = ne.ajax = !!Qt) && re.ajaxTransport(function (e) {
        if (!e.crossDomain || ne.cors) {
            var t;
            return {
                send: function (n, i) {
                    var r, o = e.xhr(), a = ++Gt;
                    if (o.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (r in e.xhrFields) o[r] = e.xhrFields[r];
                    e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                    for (r in n) void 0 !== n[r] && o.setRequestHeader(r, n[r] + "");
                    o.send(e.hasContent && e.data || null), t = function (n, r) {
                        var s, l, u;
                        if (t && (r || 4 === o.readyState)) if (delete Kt[a], t = void 0, o.onreadystatechange = re.noop, r) 4 !== o.readyState && o.abort(); else {
                            u = {}, s = o.status, "string" == typeof o.responseText && (u.text = o.responseText);
                            try {
                                l = o.statusText
                            } catch (e) {
                                l = ""
                            }
                            s || !e.isLocal || e.crossDomain ? 1223 === s && (s = 204) : s = u.text ? 200 : 404
                        }
                        u && i(s, l, u, o.getAllResponseHeaders())
                    }, e.async ? 4 === o.readyState ? setTimeout(t) : o.onreadystatechange = Kt[a] = t : t()
                }, abort: function () {
                    t && t(void 0, !0)
                }
            }
        }
    }), re.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /(?:java|ecma)script/},
        converters: {
            "text script": function (e) {
                return re.globalEval(e), e
            }
        }
    }), re.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), re.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var t, n = he.head || re("head")[0] || he.documentElement;
            return {
                send: function (i, r) {
                    t = he.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function (e, n) {
                        (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || r(200, "success"))
                    }, n.insertBefore(t, n.firstChild)
                }, abort: function () {
                    t && t.onload(void 0, !0)
                }
            }
        }
    });
    var Jt = [], Zt = /(=)\?(?=&|$)|\?\?/;
    re.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var e = Jt.pop() || re.expando + "_" + kt++;
            return this[e] = !0, e
        }
    }), re.ajaxPrefilter("json jsonp", function (t, n, i) {
        var r, o, a,
            s = !1 !== t.jsonp && (Zt.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && Zt.test(t.data) && "data");
        return s || "jsonp" === t.dataTypes[0] ? (r = t.jsonpCallback = re.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Zt, "$1" + r) : !1 !== t.jsonp && (t.url += (Lt.test(t.url) ? "&" : "?") + t.jsonp + "=" + r), t.converters["script json"] = function () {
            return a || re.error(r + " was not called"), a[0]
        }, t.dataTypes[0] = "json", o = e[r], e[r] = function () {
            a = arguments
        }, i.always(function () {
            e[r] = o, t[r] && (t.jsonpCallback = n.jsonpCallback, Jt.push(r)), a && re.isFunction(o) && o(a[0]), a = o = void 0
        }), "script") : void 0
    }), re.parseHTML = function (e, t, n) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || he;
        var i = de.exec(e), r = !n && [];
        return i ? [t.createElement(i[1])] : (i = re.buildFragment([e], t, r), r && r.length && re(r).remove(), re.merge([], i.childNodes))
    };
    var en = re.fn.load;
    re.fn.load = function (e, t, n) {
        if ("string" != typeof e && en) return en.apply(this, arguments);
        var i, r, o, a = this, s = e.indexOf(" ");
        return s >= 0 && (i = re.trim(e.slice(s, e.length)), e = e.slice(0, s)), re.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (o = "POST"), a.length > 0 && re.ajax({
            url: e,
            type: o,
            dataType: "html",
            data: t
        }).done(function (e) {
            r = arguments, a.html(i ? re("<div>").append(re.parseHTML(e)).find(i) : e)
        }).complete(n && function (e, t) {
            a.each(n, r || [e.responseText, t, e])
        }), this
    }, re.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        re.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), re.expr.filters.animated = function (e) {
        return re.grep(re.timers, function (t) {
            return e === t.elem
        }).length
    };
    var tn = e.document.documentElement;
    re.offset = {
        setOffset: function (e, t, n) {
            var i, r, o, a, s, l, u, c = re.css(e, "position"), d = re(e), p = {};
            "static" === c && (e.style.position = "relative"), s = d.offset(), o = re.css(e, "top"), l = re.css(e, "left"), u = ("absolute" === c || "fixed" === c) && re.inArray("auto", [o, l]) > -1, u ? (i = d.position(), a = i.top, r = i.left) : (a = parseFloat(o) || 0, r = parseFloat(l) || 0), re.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (p.top = t.top - s.top + a), null != t.left && (p.left = t.left - s.left + r), "using" in t ? t.using.call(e, p) : d.css(p)
        }
    }, re.fn.extend({
        offset: function (e) {
            if (arguments.length) return void 0 === e ? this : this.each(function (t) {
                re.offset.setOffset(this, e, t)
            });
            var t, n, i = {top: 0, left: 0}, r = this[0], o = r && r.ownerDocument;
            return o ? (t = o.documentElement, re.contains(t, r) ? (typeof r.getBoundingClientRect !== _e && (i = r.getBoundingClientRect()), n = V(o), {
                top: i.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                left: i.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
            }) : i) : void 0
        }, position: function () {
            if (this[0]) {
                var e, t, n = {top: 0, left: 0}, i = this[0];
                return "fixed" === re.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), re.nodeName(e[0], "html") || (n = e.offset()), n.top += re.css(e[0], "borderTopWidth", !0), n.left += re.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - n.top - re.css(i, "marginTop", !0),
                    left: t.left - n.left - re.css(i, "marginLeft", !0)
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var e = this.offsetParent || tn; e && !re.nodeName(e, "html") && "static" === re.css(e, "position");) e = e.offsetParent;
                return e || tn
            })
        }
    }), re.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
        var n = /Y/.test(t);
        re.fn[e] = function (i) {
            return Se(this, function (e, i, r) {
                var o = V(e);
                return void 0 === r ? o ? t in o ? o[t] : o.document.documentElement[i] : e[i] : void (o ? o.scrollTo(n ? re(o).scrollLeft() : r, n ? r : re(o).scrollTop()) : e[i] = r)
            }, e, i, arguments.length, null)
        }
    }), re.each(["top", "left"], function (e, t) {
        re.cssHooks[t] = A(ne.pixelPosition, function (e, n) {
            return n ? (n = et(e, t), nt.test(n) ? re(e).position()[t] + "px" : n) : void 0
        })
    }), re.each({Height: "height", Width: "width"}, function (e, t) {
        re.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, i) {
            re.fn[i] = function (i, r) {
                var o = arguments.length && (n || "boolean" != typeof i),
                    a = n || (!0 === i || !0 === r ? "margin" : "border");
                return Se(this, function (t, n, i) {
                    var r
                    ;
                    return re.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (r = t.documentElement, Math.max(t.body["scroll" + e], r["scroll" + e], t.body["offset" + e], r["offset" + e], r["client" + e])) : void 0 === i ? re.css(t, n, a) : re.style(t, n, i, a)
                }, t, o ? i : void 0, o, null)
            }
        })
    }), re.fn.size = function () {
        return this.length
    }, re.fn.andSelf = re.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
        return re
    });
    var nn = e.jQuery, rn = e.$;
    return re.noConflict = function (t) {
        return e.$ === re && (e.$ = rn), t && e.jQuery === re && (e.jQuery = nn), re
    }, typeof t === _e && (e.jQuery = e.$ = re), re
}), define("dt/lib/Set", ["require", "jquery"], function (e) {
    function t(e) {
        return Object(e) === e
    }

    var n = e("jquery"), i = function (e) {
        this._valueSet = {}, this["__isDTLibSet"] = !0, this.reset(e)
    };
    return i.getSet = function (e) {
        return i.isSet(e) ? e : new i(e)
    }, i.isSet = function (e) {
        return t(e) && !!e["__isDTLibSet"]
    }, i.prototype = {
        constructor: i, add: function (e) {
            return n.extend(this._valueSet, this._normalize(e)), this
        }, union: function (e) {
            return this.add(e)
        }, reset: function (e) {
            return this._valueSet = this._normalize(e), this
        }, contains: function (e) {
            var t = this._normalize(e);
            for (var n in t) if (t.hasOwnProperty(n) && !this._valueSet.hasOwnProperty(n)) return !1;
            return !0
        }, intersects: function (e) {
            var t = this._normalize(e), n = [];
            for (var r in t) t.hasOwnProperty(r) && this._valueSet.hasOwnProperty(r) && n.push(r);
            return new i(n)
        }, subtracts: function (e) {
            var t = this._normalize(e), n = [];
            for (var r in this._valueSet) this._valueSet.hasOwnProperty(r) && !t.hasOwnProperty(r) && n.push(r);
            return new i(n)
        }, isEmpty: function () {
            return 0 === this.count()
        }, count: function () {
            var e = 0;
            for (var t in this._valueSet) this._valueSet.hasOwnProperty(t) && e++;
            return e
        }, list: function () {
            var e = this._valueSet, t = [];
            for (var n in e) e.hasOwnProperty(n) && t.push(n);
            return t
        }, clone: function () {
            return new i(this)
        }, filter: function (e) {
            var t = this._valueSet, n = [];
            for (var r in t) t.hasOwnProperty(r) && e(r) && n.push(r);
            return new i(n)
        }, map: function (e) {
            var t = this._valueSet, n = [];
            for (var r in t) t.hasOwnProperty(r) && n.push(e(r));
            return new i(n)
        }, classify: function (e, n) {
            var r = this._valueSet, o = {};
            for (var a in r) if (r.hasOwnProperty(a)) {
                var s = e(a);
                if (!t(s)) {
                    var l = {};
                    l[s] = a, s = l
                }
                for (var u in s) if (s.hasOwnProperty(u)) {
                    var c = o[u] || (o[u] = new i);
                    c.add(s[u])
                }
            }
            for (var d = 0, p = (n || []).length; d < p; d++) o[n[d]] || (o[n[d]] = new i);
            return o
        }, _normalize: function (e) {
            var t = {}, r = n.type(e);
            if (!e) return t;
            if (i.isSet(e)) e = e.list(); else if ("string" === r) {
                e = e.split(",");
                for (var o = 0, a = e.length; o < a; o++) e[o] = n.trim(e[o])
            } else if ("array" !== r) throw new Error;
            for (var o = 0, a = e.length; o < a; o++) t[e[o]] = 1;
            return t
        }
    }, i
}), define("dt/lib/base", ["require", "jquery"], function (e) {
    function t(e) {
        var t = {}, i = n.type(e);
        if ("array" === i) for (var r = 0, o = e.length; r < o; r++) t[e[r]] = e[r]; else if ("object" === i) for (var r in e) e.hasOwnProperty(r) && (t[e[r]] = r);
        return t
    }

    var n = e("jquery"), i = Array.prototype.slice, r = Array.prototype.indexOf, o = /^[\s\t\xa0\u3000]*$/, a = {},
        s = 0, l = a.uncurry = function (e) {
            return function () {
                return Function.call.apply(e, arguments)
            }
        };
    a.arraySlice = l(i), a.curry = function (e) {
        var t = i.call(arguments, 1);
        return function () {
            return e.apply(this, t.concat(i.call(arguments)))
        }
    }, a.ieVersion = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? document.documentMode || +RegExp.$1 : void 0;
    var u = /([&<>"'])/g, c = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"};
    a.encodeHTML = function (e) {
        return null == e ? "" : (e + "").replace(u, function (e, t) {
            return c[t]
        })
    }, a.decodeHTML = function (e) {
        return null == e ? "" : String(e).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&#([\d]+);/g, function (e, t) {
            return String.fromCharCode(parseInt(t, 10))
        })
    }, a.assert = function (e, t) {
        if (!e) throw new Error(t || "assert fail!")
    }, a.objForEach = function (e, t) {
        var n;
        for (n in e) e.hasOwnProperty(n) && t(n, e[n]);
        if (d) for (var i = 0; n = p[i++];) e[n] !== Object.prototype[n] && t(n, e[n])
    };
    var d = !{toString: 1}.propertyIsEnumerable("toString"),
        p = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"];
    a.localUID = function () {
        return s++
    }, a.makeInner = function () {
        var e = "__private_d_" + a.localUID(), t = function (t) {
            return t[e] || (t[e] = {})
        };
        return t.attach = function (t) {
            var n = "__private_attach_", i = t.prototype;
            return e = i.hasOwnProperty(n) ? i[n] : i[n] ? i[n] = "__private_s_" + (Number(i[n].split("_s_")[1]) + 1) : i[n] = "__private_s_0", t
        }, t
    }, a.isComponent = function (e, t) {
        return Object(e) === e && (t && (e["__is__component__"] = 1), !!e["__is__component__"])
    }, a.getComponent = function (e) {
        return a.isJQuery(e) && (e = e[0]), !!e && e["__component__"]
    }, a.bindComponent = function (e, t) {
        return a.isJQuery(e) && (e = e[0]), !!e && (a.isComponent(t) ? e["__component__"] = t : !1 === t && (e["__component__"] = null), e["__component__"])
    }, a.isJQuery = function (e) {
        return e instanceof n
    }, a.toInt = function (e) {
        return parseInt(e, 10)
    }, a.assign = function (e, n, i, r, o) {
        var a = t(i), s = t(r);
        for (var l in n) if (n.hasOwnProperty(l) && !s.hasOwnProperty(l)) {
            var u = null;
            if (i ? a.hasOwnProperty(l) && (u = a[l]) : u = l, null != u) {
                if (o && e.hasOwnProperty(u)) throw new Error('Target attr "' + u + '" exists!');
                e[u] = n[l]
            }
        }
        return e
    };
    var f = a.isObject = function (e) {
        var t = typeof e;
        return "function" === t || !!e && "object" == t
    };
    return a.isEmptyObj = function (e) {
        if (!f(e)) return !1;
        for (var t in e) if (e.hasOwnProperty(t)) return !1;
        return !0
    }, a.isNaN = function (e) {
        return e !== e
    }, a.arrayIndexOf = function (e, t, n) {
        if (!e) return -1;
        if (arguments.length < 3 && "function" == typeof r) return r.call(e, t);
        for (var i = 0, o = e.length; i < o; i++) if (arguments.length < 3 && e[i] === t || f(e[i]) && e[i][n] === t) return i;
        return -1
    }, a.arrayRemoveItem = function (e, t) {
        var n = a.arrayIndexOf(e, t);
        n > 0 ? e.splice(n, 1) : 0 === n && e.shift()
    }, a.arrayMap = function (e, t) {
        for (var n = [], i = 0, r = (e || []).length; i < r; i++) n.push(t(e[i]));
        return n
    }, a.arrayEquals = function (e, t) {
        if (!n.isArray(e) || !n.isArray(t) || e.length !== t.length) return !1;
        for (var i = 0, r = e.length; i < r; i++) if (e[i] !== t[i]) return !1;
        return !0
    }, a.objectKeys = function (e) {
        var t = [];
        if (!a.isObject(e)) return t;
        for (var n in e) e.hasOwnProperty(n) && t.push(n);
        return t
    }, a.objHasAttr = function (e, t) {
        "string" === n.type(t) && (t = [t]);
        for (var i = 0, r = t.length; i < r; i++) if (e.hasOwnProperty[t[i]]) return !0;
        return !1
    }, a.diffObjects = function (e, t) {
        function i() {
            return r.push({path: o.join("."), obj1: e, obj2: t}), r
        }

        var r = arguments[2] || [], o = arguments[3] || [], s = n.type(e), l = n.type(t);
        if (s !== l) return i();
        if ("array" === s) {
            if (e.length !== t.length) return i();
            for (var u = 0, c = e.length; u < c; u++) o.push(u), a.diffObjects(e[u], t[u], r, o), o.pop()
        } else if ("object" === s && "object" === l) {
            var d = a.objectKeys(e), p = a.objectKeys(t);
            if (!a.arrayEquals(d, p)) return i();
            for (var u = 0, c = d.length; u < c; u++) {
                var f = d[u];
                o.push(f), a.diffObjects(e[f], t[f], r, o), o.pop()
            }
        } else if ("date" === s) {
            if (e.getTime() !== t.getTime()) return i()
        } else if ("regexp" === s) {
            if (e.toString() !== t.toString()) return i()
        } else if (e !== t) return i();
        return r
    }, a.isBlank = function (e) {
        return null == e || o.test(e)
    }, a.toEcValue = function (e) {
        return null == e ? "-" : e
    }, a.fromEcValue = function (e) {
        return "-" === e ? null : e
    }, a.toNotEmptyEcName = function (e) {
        return a.isBlank(e) ? "-" : e
    }, a.isSupportBase64 = function () {
        var e = new Image, t = !0;
        return e.onload = e.onerror = function () {
            1 === this.width && 1 === this.height || (t = !1)
        }, e.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", t
    }(), a.flashVersion = function () {
        var e;
        try {
            e = navigator.plugins["Shockwave Flash"], e = e.description
        } catch (t) {
            try {
                e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")
            } catch (t) {
                e = "0.0"
            }
        }
        return e = e.match(/\d+/g), parseFloat(e[0] + "." + e[1])
    }(), a.supportTransition = function () {
        var e = document.createElement("p").style,
            t = "transition" in e || "WebkitTransition" in e || "MozTransition" in e || "msTransition" in e || "OTransition" in e;
        return e = null, t
    }(), a.noop = new Function, a.onlyHasProperty = function (e, t) {
        var i = !0;
        if (null == t) return !1;
        n.isArray(t) || (t = [t]);
        for (var r in e) e.hasOwnProperty(r) && -1 === a.arrayIndexOf(t, r) && (i = !1);
        return i
    }, a
}), define("dt/lib/json", ["require"], function (e) {
    var t = {};
    return t.parseJSONLaxly = function (e, t) {
        return new Function("return (" + e + ");").call(t)
    }, t
}), define("dt/lib/throttle", ["require"], function (e) {
    var t = {};
    return t.throttle = function (e, t, n, i) {
        function r(r) {
            function f() {
                c = (new Date).getTime(), d = null, (p ? e : e[r]).apply(a, s || [])
            }

            return function () {
                l = (new Date).getTime(), a = this, s = arguments, o = l - (i ? u : c) - t, clearTimeout(d), i ? n ? d = setTimeout(f, t) : o >= 0 && f() : o >= 0 ? f() : n && (d = setTimeout(f, -o)), u = l
            }
        }

        var o, a, s, l = (new Date).getTime(), u = 0, c = 0, d = null, p = "function" == typeof e;
        if (t = t || 0, p) return r();
        for (var f = [], h = 0; h < e.length; h++) f[h] = r(h);
        return f
    }, t.fixedRate = function (e, n) {
        return null != n ? t.throttle(e, n, !0, !1) : e
    }, t.debounce = function (e, n) {
        return null != n ? t.throttle(e, n, !0, !0) : e
    }, t
}), define("dt/lib/dataDriven", ["require", "./base", "jquery", "./throttle"], function (e) {
    function t(e, t) {
        return !!(null === e || s.type(e) in f) && e === t
    }

    function n(e, t) {
        var n, i, r = [], o = this[d + "children"];
        for (n = 0; i = o[n]; n++) r.push(i.getCallback());
        for (r = t(r, e), n = 0; i = o[n]; n++) i.setCallback(r[n])
    }

    function i(e, t, n, i) {
        if (!(arguments.length > 1)) return this()[e];
        this[d + "currValueInfo"] = n;
        var r = this();
        (i && i.force || this.isDifferent(r[e], t)) && ((!i || !i.silent) && this.valueWillMutate(), r[e] = t, (!i || !i.silent) && this.valueHasMutated()), o(this, i)
    }

    function r(e) {
        return {ob: 1, obArray: 1, obHash: 1}.hasOwnProperty(x(e))
    }

    function o(e, t) {
        for (var n = t && t.volatiles || [], i = e[d + "currValueInfo"], r = 0, o = n.length; r < o; r++) delete i[n[r]]
    }

    var a = e("./base"), s = e("jquery"), l = e("./throttle"), u = Array.prototype.slice, c = {}, d = "__prop__";
    c.subscribable = function (e) {
        a.assign(e, p), e._subscriptions = {}
    };
    var p = {
        subscribe: function (e, t, n) {
            n = n || "change";
            var i = this._subscriptions[n] || (this._subscriptions[n] = []), r = new h(e, t, function () {
                a.arrayRemoveItem(i, r)
            });
            return i.push(r), r
        }, notify: function (e, t) {
            if (t = t || "change", this.hasSubscriptionsForEvent(t)) for (var n, i = this._subscriptions[t].slice(), r = 0; n = i[r]; r++) n.callback(e)
        }, hasSubscriptionsForEvent: function (e) {
            return this._subscriptions[e] && this._subscriptions[e].length
        }, isDifferent: function (e, t) {
            return !this.equalityComparer || !this.equalityComparer(e, t)
        }, equalityComparer: t
    }, f = {undefined: 1, boolean: 1, number: 1, string: 1}, h = function (e, t, n) {
        this[d + "callback"] = e, this[d + "callbackScope"] = t, this[d + "disposeCallback"] = n, this[d + "isDisposed"] = !1
    }, v = h.prototype;
    v.callback = function (e) {
        return this[d + "isDisposed"] || this[d + "callback"].apply(this[d + "callbackScope"], e || []), this
    }, v.setCallback = function (e) {
        return this[d + "callback"] = e, this
    }, v.getCallback = function () {
        return this[d + "callback"]
    }, v.dispose = function () {
        return this[d + "isDisposed"] = !0, this[d + "disposeCallback"](), this
    }, v.throttle = function (e) {
        return this[d + "callback"] = l.fixedRate(this[d + "callback"], e), this
    }, v.debounce = function (e) {
        return this[d + "callback"] = l.debounce(this[d + "callback"], e), this
    };
    var g = function (e) {
        this[d + "children"] = s.extend([], e)
    }, m = g.prototype;
    m.callback = function (e) {
        for (var t, n = 0; t = this[d + "children"][n]; n++) t.callback(e)
    }, m.dispose = function () {
        for (var e, t = 0; e = this[d + "children"][t]; t++) e.dispose()
    }, m.throttle = function (e) {
        return n.call(this, e, l.fixedRate), this
    }, m.debounce = function (e) {
        return n.call(this, e, l.debounce), this
    }, c.ob = c.observable = function (e, t, n) {
        function i(e, t, n) {
            return arguments.length > 0 ? void i[d + "writer"](e, t, n) : i[d + "currValue"]
        }

        return x(e) && (e = e.peek(), t = e.peekValueInfo()), i[d + "currValue"] = e, i[d + "currValueInfo"] = t, i[d + "authKey"] = n ? n.authKey : null, c.subscribable(i), a.assign(i, y), i["__ob__type__"] = "ob", i[d + "writer"] = function (e, t, n) {
            i.validateAuthKey(n ? n.authKey : null), a.assert(null == t || s.isPlainObject(t)), i[d + "currValueInfo"] = t, (n && n.force || i.isDifferent(i[d + "currValue"], e)) && ((!n || !n.silent) && i.valueWillMutate(), i[d + "currValue"] = e, (!n || !n.silent) && i.valueHasMutated()), o(this, n)
        }, i
    };
    var y = {
        force: function (e, t, n) {
            n = n || {}, n.force = !0, this[d + "writer"](e, t, n)
        }, peek: function () {
            return this[d + "currValue"]
        }, peekValueInfo: function (e) {
            if (0 === arguments.length) {
                var t = this[d + "currValueInfo"];
                return t && (t = s.extend({}, t)), t
            }
            if (a.isObject(this[d + "currValueInfo"])) return this[d + "currValueInfo"][e]
        }, extendWriter: function (e) {
            var t = this, n = t[d + "writer"];
            return this[d + "writer"] = function (i, r, o) {
                t.validateAuthKey(o ? o.authKey : null), e.call(t, n, i, r, o)
            }, this
        }, valueHasMutated: function () {
            this.notify([this[d + "currValue"], this])
        }, valueWillMutate: function () {
            this.notify([this[d + "currValue"], this], "beforeChange")
        }, validateAuthKey: function (e) {
            var t = this[d + "authKey"];
            if (null != t && e !== t) throw new Error("AuthKey error: " + e)
        }
    };
    c.obHash = function (e) {
        var t = c.ob(e || {});
        return t["__ob__type__"] = "obHash", t.prop = i, t
    }, c.obArray = function (e) {
        a.assert(void 0 === e || s.isArray(e));
        var t = c.ob(e || []);
        return a.assign(t, b), t["__ob__type__"] = "obArray", t
    };
    var b = {
        remove: function (e) {
            for (var t, n = this(), i = [], r = [], o = 0, a = n.length; o < a;) ("function" == typeof e ? e(n[o]) : n[o] === e) ? (t || (this.valueWillMutate(), t = !0), i.push(n.splice(o, 1)), r.push(o), a--) : o++;
            if (i.length) {
                var s = {key: w.REMOVE, indexes: r};
                this.notify([s, this], "arrayChange"), this.valueHasMutated()
            }
            return i
        }, removeAll: function () {
            return this.splice(0, this.count())
        }, indexOf: function (e) {
            return a.arrayIndexOf(this(), e)
        }, pop: function () {
            return this.splice(this.count() - 1, 1)
        }, push: function () {
            return this.splice.apply(this, [this.count(), 0].concat(u.call(arguments)))
        }, shift: function () {
            return this.splice(0, 1)
        }, unshift: function (e) {
            return this.splice(0, 0, e)
        }, splice: function (e, t) {
            var n = this(), i = n.length, r = arguments.length;
            if (!r || !(e >= 0 && e <= i)) return [];
            1 === r ? t = i : t >= 0 ? t > i - e && (t = i - e) : t = 0, this.valueWillMutate();
            var o = n.splice.apply(n, arguments),
                a = {key: w.SPLICE, index: e, removeCount: t, added: u.call(arguments, 2)};
            return this.notify([a, this], "arrayChange"), this.valueHasMutated(), o
        }, slice: function () {
            return u.apply(this(), arguments)
        }, pushArray: function (e) {
            return this.push.apply(this, e || [])
        }, count: function () {
            return this().length
        }, move: function (e, t) {
            var n = this(), i = n.length;
            if (!(e < 0 || e >= i || t < 0 || t >= i || e === t)) {
                this.valueWillMutate();
                var r = n.splice(e, 1)[0];
                n.splice(t, 0, r);
                var o = {key: w.MOVE, originIndex: e, finalIndex: t};
                this.notify([o, this], "arrayChange"), this.valueHasMutated()
            }
        }
    }, w = c.obArray.ChangeKey = {REMOVE: "remove", SPLICE: "splice", MOVE: "move"};
    c.obSubscribe = function (e, t, n, i) {
        if (x(e)) return e.subscribe(t, n, i);
        if (s.isArray(e)) {
            for (var r = [], o = 0, a = e.length; o < a; o++) x(e[o]) && r.push(e[o].subscribe(t, n, i));
            return new g(r)
        }
    }, c.value = function (e) {
        return x(e) ? e() : e
    }, c.peek = function (e) {
        return x(e) ? e.peek() : e
    }, c.setValue = function (e, t, n) {
        return t = c.peek(t), r(e) ? (e(t, n), e) : t
    }, c.valueInfo = function (e, t) {
        return a.isObject(e) ? a.assign({}, e, ["type", "info"]) : {type: e, info: t}
    }, c.valueInfo.CONFIRMED = "confirmed", c.valueInfoForConfirmed = function (e, t) {
        var n = c.valueInfo(c.valueInfo.CONFIRMED, e);
        return t && a.assign(n, t, null, ["type", "info"]), n
    }, c.checkValueInfo = function (e, t, n) {
        var i = c.obTypeOf(e) ? e.peekValueInfo() : e;
        return a.isObject(i) && (null == t || i.type === t) && (null == n || i.info === n)
    }, c.checkValueInfoForConfirmed = function (e, t) {
        return c.checkValueInfo(e, c.valueInfo.CONFIRMED, t)
    };
    var x = c.obTypeOf = function (e) {
        return Object(e) === e && e["__ob__type__"]
    };
    return c
}), define("dt/lib/model", ["require", "jquery", "./base", "./dataDriven"], function (e) {
    var t = e("jquery"), n = e("./base"), i = e("./dataDriven"), r = {}, o = "__atom__",
        a = r.isAtom = function (e, r) {
            return Object(e) !== e || !r && e[o] || i.obTypeOf(e) || n.isComponent(e) || !t.isPlainObject(e)
        };
    r.isPlain = function (e, n) {
        return t.isArray(e) || !a(e, n)
    }, r.atom = function (e) {
        return Object(e) !== e || e[o] || (e[o] = 1), e
    }, r.cloneAtom = function (e, r) {
        var l, u, c = t.type(e);
        if (!a(e, !0)) return e[o] ? (e[o] = 0, u = s({}, e, {clone: !0}), u[o] = e[o] = 1, u) : void 0;
        if (l = i.obTypeOf(e)) return i[l](s({}, e.peek(), {clone: !0}));
        if (n.isComponent(e)) return e.clone();
        if ("date" === c) return new Date(e.getTime());
        if ("regexp" === c) return new RegExp(e);
        if ("array" === c) {
            u = [];
            for (var d in e) e.hasOwnProperty(d) && (u[d] = s({}, e[d], {clone: !0}));
            return u
        }
        return c in {
            function: 1,
            undefined: 1,
            null: 1,
            boolean: 1,
            number: 1,
            string: 1
        } || r && r.assignWhenCannotClone ? e : void 0
    };
    var s = r.merge = function (e, t, n) {
        if (void 0 === t) return e;
        if (a(t)) return n && n.clone ? r.cloneAtom(t, n) : t;
        a(e) && (e = {});
        var i = n && n.levelOneNeedMerge;
        n && (n.levelOneNeedMerge = null);
        for (var o in t) !t.hasOwnProperty(o) || n && n.onlyMergeOwnPropertyInTarget && !e.hasOwnProperty(o) || (e[o] = !i || i[o] ? s(e[o], t[o], n) : t[o]);
        return e
    };
    return r.clone = function (e, t) {
        if (void 0 !== e) return s({}, e, {clone: !0, assignWhenCannotClone: t})
    }, r
}), define("dt/lib/objectAccess", ["require", "./model"], function (e) {
    function t(e) {
        return e === Object(e)
    }

    function n(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }

    var i = {}, r = e("./model"), o = /[\.\[]/, a = /\[/g, s = /\]/g, l = i.getByPath = function (e, t, i) {
        if (null == e) return t;
        var r = n(e) ? e : l.parsePath(e), i = i || d;
        t = {k: t}, r.unshift("k");
        for (var o = 0, a = r.length; o < a; o++) {
            var s = r[o];
            switch (o ? i(t, s) : u.DRILL_DOWN) {
                case u.DRILL_DOWN:
                    t = t[s];
                    break;
                case u.RETURN:
                    return;
                default:
                    throw new Error("path: " + s)
            }
        }
        return t
    }, u = l.Action = {DRILL_DOWN: "drillDown", THROW: "throw", RETURN: "return"}, c = l.actionChoice = {
        notObjectThrow: function (e) {
            return t(e) ? u.DRILL_DOWN : u.THROW
        }, notObjectReturn: function (e) {
            return t(e) ? u.DRILL_DOWN : u.RETURN
        }, atomThrow: function (e) {
            return t(e) && !r.isAtom(e) ? u.DRILL_DOWN : u.THROW
        }, notPlainThrow: function (e) {
            return t(e) && r.isPlain(e) ? u.DRILL_DOWN : u.THROW
        }, notPlainReturn: function (e) {
            return t(e) && r.isPlain(e) ? u.DRILL_DOWN : u.RETURN
        }
    }, d = c.notObjectThrow;
    l.normalizePath = function (e) {
        return e.replace(a, ".").replace(s, "")
    }, l.parsePath = function (e) {
        return e.replace(s, "").split(o)
    };
    var p = i.setByPath = function (e, t, n, i, r) {
            if (null != e) {
                var a, s, l = e.split(o), i = i || v;
                n = {k: n}, l.unshift("k");
                for (var u, c = 0, d = l.length; c < d; c++) {
                    s = l[c];
                    var p = s.length;
                    u = 0, s.indexOf("]") === p - 1 && (l[c] = s = s.slice(0, p - 1), u = 1);
                    switch (c ? i(n, s) : f.DRILL_DOWN) {
                        case f.OVERLAP:
                            a[l[c - 1]] = n = u ? [] : {};
                            break;
                        case f.DELETE:
                            return void delete a[l[c - 1]];
                        case f.DRILL_DOWN:
                            break;
                        case f.RETURN:
                            return;
                        default:
                            throw new Error("path: " + s)
                    }
                    a = n, n = n[s]
                }
                return "function" == typeof r ? t = r(a, s, t) : a[s] = t, t
            }
        }, f = p.Action = {DRILL_DOWN: "drillDown", THROW: "throw", RETURN: "return", OVERLAP: "overlap", DELETE: "delete"},
        h = p.actionChoice = {
            notObjectOverlap: function (e) {
                return t(e) ? f.DRILL_DOWN : f.OVERLAP
            }, notObjectThrow: function (e) {
                return t(e) ? f.DRILL_DOWN : void 0 !== e ? f.THROW : f.OVERLAP
            }, notObjectReturn: function (e) {
                return t(e) ? f.DRILL_DOWN : void 0 !== e ? f.RETURN : f.OVERLAP
            }, atomThrow: function (e) {
                return t(e) && !r.isAtom(e) ? f.DRILL_DOWN : void 0 !== e ? f.THROW : f.OVERLAP
            }, notPlainThrow: function (e) {
                return t(e) && r.isPlain(e) ? f.DRILL_DOWN : void 0 !== e ? f.THROW : f.OVERLAP
            }, notPlainOverlap: function (e) {
                return t(e) && r.isPlain(e) ? f.DRILL_DOWN : f.OVERLAP
            }
        }, v = h.notObjectThrow;
    return i.deleteByPath = function (e, t, n, i) {
        function r(e, t) {
            o = e[t], delete e[t]
        }

        var o;
        return p(e, void 0, t, n, r), o
    }, i.reducePath = function (e, t) {
        for (var n = e.split(o), i = [], r = 0, a = n.length; r < a; r++) {
            var s = n[r], l = s.length, u = !1;
            if (s.indexOf("]") === l - 1 && (u = !0, s = s.slice(0, l - 1)), s !== t[r]) break;
            i.push((0 === r ? "" : u ? "[" : ".") + n[r])
        }
        return i.join("")
    }, i
}), define("dt/lib/objectOriented", ["require", "exports", "module", "./base"], function (e, t) {
    function n(e, t) {
        for (var n, i = this.constructor, r = this[e]; (i = i.prototype._superClass) && (n = i.prototype[e]) && n === r;) ;
        if (n) return n.apply(this, t || []);
        throw new Error("parent Class has no method named " + e)
    }

    function i(e, t) {
        var n = this[u] || (this[u] = {});
        return arguments.length > 1 ? n[e] = t : n[e]
    }

    function r(e) {
        var i = this, r = t.newClass({_define: i.defineProperties}), o = function () {
        };
        o.prototype = i.prototype;
        var s = r.prototype = new o;
        return a(r.defineProperties, e._define), e._define = null, r.implement(e), s._applySuper = n, s._superClass = i, s.constructor = r, r
    }

    function o(e) {
        return a(this.prototype, e)
    }

    function a(e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        return e
    }

    function s(e) {
        return "[object Function]" === Object.prototype.toString.call(e)
    }

    var l = e("./base"), u = "privateProps";
    return t.newClass = function (e) {
        var t = function () {
            return s(this._construct) ? this._construct.apply(this, arguments) : this
        };
        return t.extend = r, t.implement = o, a(t.defineProperties = {}, e._define), e._define = null, t.implement(e), t.uid = "Class_" + l.localUID(), t.prototype._prop = i, t
    }, t.simpleInherit = function (e, t) {
        var i = e.prototype, r = new Function;
        r.prototype = t.prototype;
        var o = e.prototype = new r;
        return a(o, i), o._applySuper = n, o._superClass = t, o.constructor = e, e
    }, t
}), define("dt/lib/event", ["require", "jquery"], function (e) {
    function t(e) {
        return n.extend(e, o)
    }

    var n = e("jquery"), i = n.isFunction, r = n.inArray, o = {
        addEventListener: function (e, t) {
            i(e) && (t = e, e = "*"), this.__listeners = this.__listeners || {};
            var n = this.__listeners[e] || (this.__listeners[e] = []);
            return r(n, t) < 0 && n.push(t), this
        }, removeEventListener: function (e, t) {
            i(e) && (t = e, e = "*"), this.__listeners = this.__listeners || {};
            var n = this.__listeners[e];
            if (n) if (t) {
                var o = r(n, t);
                ~o && delete n[o]
            } else n.length = 0, delete this.__listeners[e];
            return this
        }, removeAllEventListener: function () {
            return this.__listeners = [], this
        }, fire: function (e, t) {
            this.__listeners = this.__listeners || {};
            var i = this.__listeners[e], r = this;
            return i && n.each(i, function (n, i) {
                t = t || {}, t.type = e, i.call(r, t)
            }), "*" !== e && this.fire("*", t), this
        }
    };
    return {enableEvent: t}
}), define("dt/lib/enumeration", ["require", "jquery"], function (e) {
    function t(e) {
        var t;
        if ("array" === i.type(e)) {
            t = {};
            for (var n = 0, r = e.length; n < r; n++) t[e[n]] = e[n]
        } else t = e;
        return t
    }

    function n(e) {
        for (var t in e) if (e.hasOwnProperty(t) && !o.test(t)) throw new Error('Key must be spelled like "AAAA_BBB".')
    }

    var i = e("jquery"), r = {}, o = /^[A-Z][A-Z_]*$/;
    r.makeEnum = function (e, r) {
        function o() {
        }

        return r = r || {}, e = t(e), n(e), i.extend(o.prototype, a, r), i.extend(new o, e)
    };
    var a = {
        has: function (e) {
            return this.hasOwnProperty(e)
        }, hasValue: function (e) {
            return null != this.getKeyByValue(e)
        }, get: function (e) {
            return this.hasOwnProperty(e) ? this[e] : null
        }, getKeyByValue: function (e) {
            for (var t in this) if (this.hasOwnProperty(t) && this[t] === e) return t;
            return null
        }, contains: function (e, t) {
            t && !i.isArray(t) && (t = [t]);
            for (var n = 0, r = t.length; n < r; n++) {
                for (var o = !1, a = 0, s = e.length; a < s; a++) this[e[a]] === t[n] && (o = !0);
                if (!o) return !1
            }
            return !0
        }, forEachEnum: function (e, t) {
            for (var n in this) this.hasOwnProperty(n) && o.test(n) && e.call(t, n, this[n])
        }
    };
    return r
}), define("dt/lib/disable", ["require", "jquery"], function (e) {
    function t(e, t, i) {
        e = null != e ? e : "";
        var a = o[e];
        if (!a && i) {
            var s = null != t ? r + "-" + t : "";
            a = o[e] = n('<div class="' + r + " " + s + '"></div>').appendTo(document.body)
        }
        return a
    }

    var n = e("jquery"), i = {}, r = "dt-global-mask", o = {};
    return i.globalDisable = function (e) {
        i.globalMask(!!e && 0)
    }, i.globalMask = function (e, n, i, r) {
        var o;
        if (!1 === e) (o = t(n)) && o.hide().off(".dtGlobalMask"); else {
            null == e && (e = .5), o = t(n, i, !0), o.css({opacity: e}).show();
            for (var a in r) r.hasOwnProperty(a) && o.on(a + ".dtGlobalMask", r[a])
        }
    }, i.disposeGlobalMask = function (e) {
        var n = t(e);
        n && n.off().remove()
    }, i
}), define("dt/lib/number", ["require"], function (e) {
    var t = {}, n = /^(\d+)px$/, i = /^(\d+|\d+\.\d+)%$/;
    t.ordinalSuffix = function (e) {
        return 1 == e ? "st" : 2 == e ? "nd" : 3 == e ? "rd" : "th"
    }, t.pad = function (e, t) {
        var n = "", i = e < 0, r = String(Math.abs(e));
        return r.length < t && (n = new Array(t - r.length + 1).join("0")), (i ? "-" : "") + n + r
    }, t.formatNumber = function (e, n, i, r, o) {
        if (!n) return e;
        o && /[ID]%/.test(n) && (e *= 100);
        var a = /D+/.exec(n), s = a && a.length > 0 ? a[0].length : 0;
        e = t.fixNumber(e, s, r);
        var l, u = e.toString(), c = u.split("."), d = c[0], p = c.length > 1 ? c[1] : "";
        return l = n.replace(/I+,*I*/g, function () {
            var e, t, n = arguments[0], r = n.lastIndexOf(","), o = [];
            if (r >= 0 && r !== d.length - 1) {
                t = n.length - 1 - r;
                for (var a; (a = d.length - t) > 0 && t > 0;) o.push(d.substr(a, t)), d = d.substring(0, a);
                o.push(d), o.reverse(), "-" === o[0] ? (o.shift(), e = "-" + o.join(",")) : e = o.join(",")
            } else e = d;
            return i && e && e.indexOf("-") < 0 && (e = "+" + e), e
        }), l = l.replace(/D+/g, function () {
            var e = arguments[0], t = p;
            return t.length > e.length ? t = t.substr(0, e.length) : t += new Array(e.length - t.length).join("0"), t
        })
    }, t.fixNumber = function (e, t, n) {
        if (e = r(e), null == t || null == e) return e;
        if (n) return 2 == n ? Number(e).toFixed(t) : Number(e);
        var i = Math.pow(10, t);
        return Math.round(e * i) / i
    };
    var r = t.getNumber = function (e) {
        var t = parseFloat(e);
        return e - t >= 0 ? t : null
    };
    return t.refineNumber = function (e) {
        for (var t = [], n = 0, i = e.length; n < i; n++) {
            var o = r(e[n]);
            null != o && t.push(o)
        }
        return t
    }, t.validateNumeric = function (e) {
        return e - parseFloat(e) >= 0
    }, t.isInteger = function (e) {
        return t.validateNumeric(e) && e % 1 == 0
    }, t.isPxStr = function (e) {
        return n.test(e)
    }, t.parsePxStr = function (e) {
        return n.test(e) ? parseFloat(RegExp.$1) : null
    }, t.isPercentStr = function (e) {
        return i.test(e)
    }, t.parsePercentStr = function (e) {
        return i.test(e) ? parseFloat(RegExp.$1) : null
    }, t
}), define("dt/lib/htmlCleaner", ["require"], function (e) {
    function t(e, n) {
        switch (e.nodeType) {
            case 1:
                var i = e.tagName, o = e.attributes, a = n[i.toLowerCase()];
                if (!a) return r;
                for (var s = document.createElement(i), l = 0, u = o.length; l < u; l++) ~a.indexOf(o[l].name) && s.setAttribute(o[l].name, o[l].value);
                for (var c = e.childNodes, l = 0, u = c.length; l < u; l++) {
                    var d = t(c[l], n);
                    d !== r && s.appendChild(d)
                }
                return s;
            case 3:
                return document.createTextNode(e.nodeValue);
            default:
                return r
        }
    }

    function n(e) {
        try {
            return (new DOMParser).parseFromString(e, "text/html")
        } catch (n) {
            var t = new ActiveXObject("MSXML2.DOMDocument");
            return t.loadXML(e)
        }
    }

    function i(e, i) {
        i = i || {};
        var a = n(e), s = i.htmlAllow || o.BASE, l = i.targetEl || document.createElement("div"), u = a.body.childNodes;
        l.innerHTML = "";
        for (var c = 0, d = u.length; c < d; c++) {
            var p = t(u[c], s);
            p !== r && l.appendChild(p)
        }
        return l.innerHTML
    }

    var r, o = {
        BASE: {
            a: ["title", "alt", "href", "class", "style"],
            b: ["class", "style"],
            em: ["class", "style"],
            strong: ["class", "style"],
            i: ["class", "style"],
            img: ["src", "class", "style"],
            div: ["class", "style"],
            p: ["class", "style"],
            br: []
        },
        EC_FORMATTER: {
            a: ["title", "alt", "href", "class", "style"],
            b: ["class", "style"],
            em: ["class", "style"],
            strong: ["class", "style"],
            i: ["class", "style"],
            img: ["src", "class", "style"],
            div: ["class", "style"],
            p: ["class", "style"],
            br: []
        }
    };
    return {htmlClean: i, HTMLCleanAllow: o}
}), define("dt/lib/codeStringify", ["require", "jquery"], function (e) {
    function t(e, o, s, l) {
        var u, d = l.singleLineDepth, p = null != d ? d <= s ? "single" : "multiple" : "auto", f = l.quotationMark,
            h = l.indentBase, v = l.lineBreak, g = l.inlineDelimiterSpace, m = a.type(e),
            y = new Array(s * h + 1).join(" "), b = new Array((s + 1) * h + 1).join(" "), w = !1,
            x = null != o ? n(o, f) + ": " : "";
        switch (m) {
            case"function":
                w = "single" !== p, u = x + c.printFunction(e, s, h);
                break;
            case"regexp":
                u = x + f + e + f;
                break;
            case"date":
                u = x + r(e, f);
                break;
            case"array":
                for (var _ = [], T = 0, C = e.length; T < C; T++) {
                    var E = t(e[T], null, s + 1, l);
                    _.push(E.str), E.hasLineBreak && (w = !0)
                }
                "multiple" === p && (w = !0);
                var A = w ? v : "", D = "," + (w ? v + b : g), S = w ? b : "", k = w ? y : "";
                u = x + "[" + A + S + _.join(D) + A + k + "]";
                break;
            case"object":
                var _ = [];
                for (var T in e) if (e.hasOwnProperty(T)) {
                    var E = t(e[T], T, s + 1, l);
                    _.push(E.str)
                }
                w = "single" !== p;
                var A = w ? v : "", D = "," + (w ? v + b : g), S = w ? b : "", k = w ? y : "";
                u = x + "{" + A + S + _.join(D) + A + k + "}";
                break;
            case"boolean":
            case"null":
            case"undefined":
                u = x + String(e);
                break;
            case"number":
                u = x + (isFinite(e) ? String(e) : "null");
                break;
            case"string":
                u = x + i(e, f);
                break;
            default:
                throw new Error('Illegal type "' + m + '" at "' + e + '"')
        }
        return {str: u, hasLineBreak: w}
    }

    function n(e, t) {
        return c.jsReservedWordsMap[e] ? t + e + t : /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(e) ? e : i(e, t)
    }

    function i(e, t) {
        var n = s[t];
        n.lastIndex = 0;
        var i = u[t];
        return t + (n.test(e) ? e.replace(n, function (e) {
            var t = i[e];
            return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        }) : e) + t
    }

    function r(e, t) {
        return isFinite(e.valueOf()) ? i(e.getUTCFullYear() + "-" + o(e.getUTCMonth() + 1) + "-" + o(e.getUTCDate()) + "T" + o(e.getUTCHours()) + ":" + o(e.getUTCMinutes()) + ":" + o(e.getUTCSeconds()) + "Z", t) : "null"
    }

    function o(e) {
        return e < 10 ? "0" + e : e
    }

    var a = e("jquery"), s = {
            '"': /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            "'": /[\\\'\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g
        }, l = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", "\\": "\\\\"},
        u = {'"': a.extend({}, l, {'"': '\\"'}), "'": a.extend({}, l, {"'": "\\'"})}, c = {};
    return c.jsReservedWords = ["break", "delete", "function", "return", "typeof", "case", "do", "if", "switch", "var", "catch", "else", "in", "this", "void", "continue", "false", "instanceof", "throw", "while", "debugger", "finally", "new", "true", "with", "default", "for", "null", "try", "abstract", "double", "goto", "native", "static", "boolean", "enum", "implements", "package", "super", "byte", "export", "import", "private", "synchronized", "char", "extends", "int", "protected", "throws", "class", "final", "interface", "public", "transient", "const", "float", "long", "short", "volatile"], c.jsReservedWordsMap = function (e) {
        for (var t = {}, n = 0, i = e.length; n < i; n++) t[e[n]] = 1;
        return t
    }(c.jsReservedWords), c.stringifyJSObject = function (e, n) {
        if (n = n || {}, null == n.indentBase && (n.indentBase = 4), null == n.lineBreak && (n.lineBreak = "\n"), null == n.quotationMark && (n.quotationMark = '"'), '"' !== n.quotationMark && "'" !== n.quotationMark) throw new Error("Illegal quotation mark: " + n.quotationMark);
        n.compress && (n.indentBase = 0, n.lineBreak = ""), n.inlineDelimiterSpace = n.compress ? "" : " ";
        try {
            return t(e, null, 0, n).str
        } catch (e) {
            return n.errorMessage || ""
        }
    }, c.stringifyJSObject2HTML = function (e, t, n) {
        return "<pre>" + c.stringifyJSObject(e, t, n) + "</pre>"
    }, c.printFunction = function (e, t, n) {
        var i = new Array((t + 1) * n).join(" "), r = (e + "").split("\n"), o = "";
        return r.length > 1 && "}" === a.trim(r[r.length - 1]) && (r.pop(), o = "\n" + new Array(t * n).join(" ") + "}"), r.join("\n" + i) + o
    }, c
}), define("dt/lib/others", ["require", "jquery", "./base"], function (e) {
    var t = e("jquery"), n = e("./base"), i = {}, r = /#\{(.+?)\}/g;
    i.parseURL = function (e) {
        var t = [];
        if (!e) return t;
        var n = document.createElement("a");
        n.href = e;
        for (var i = (n.search || "").replace(/^\?/, "").split("&"), r = 0, o = i.length; r < o; r++) {
            var a = (i[r] || "").split("=");
            a.length > 1 && a[0] && t.push({name: a[0], value: a[1]})
        }
        return t
    }, i.loadLazyImg = function (e, n) {
        !n && (n = "src-origin"), e.each(function (e, i) {
            i = t(i);
            var r = i.data(n);
            r && (i.attr("src", r), i.data(n, ""))
        })
    }, i.parseInlineCss = function (e) {
        e = e || "";
        for (var n = {}, i = e.split(";"), r = 0, o = i.length; r < o; r++) {
            var a = i[r].split(":");
            n[t.trim(a[0])] = t.trim(a[1])
        }
        return n
    }, i.showBalloonTip = function () {
        var e, n, r = "BAIDUHUI_BALLOON_TIP_SHOWN", o = "DNOT_SHOW_WHEN_CLOSE";
        return function (a, s, l, u) {
            function c() {
                e && e.hide(), n === o && i.cookie(r, 1), n = null
            }

            if (!1 === a) c(); else {
                if ((n = u) === o && i.cookie(r)) return;
                e || (e = t(['<div class="balloon-tip">', '<div class="content"></div>', '<div class="triangle"><i></i><em></em></div>', '<div class="close-btn">X</div>', "</div>"].join("")).hide().appendTo(document.body), t(".close-btn", e).click(c)), t(".content", e).html(a), e.css({
                    position: "absolute",
                    left: s,
                    top: l
                }).show()
            }
        }
    }(), i.cookie = function (e, t) {
        if (null != t) return document.cookie = e + "=" + encodeURIComponent(t), t;
        var n = new RegExp("(^| )" + e + "=([^;]*)(;|$)"), i = n.exec(document.cookie);
        return i ? decodeURIComponent(i[2]) : null
    }, function () {
        var e = !1;
        i.enableWindowScroll = function (t) {
            e = !t
        }, t(window).scroll(function (t) {
            e && (t.preventDefault(), t.stopPropagation())
        })
    }(), i.linkTargetBlank = function (e) {
        var t = document, n = t.body, i = t.createElement("a");
        i.style.display = "none", i.href = e || "#", i.target = "_blank", n.appendChild(i), i.click(), n.removeChild(i)
    };
    var o = i.appendParam = function (e, t) {
        return e + (e.indexOf("?") < 0 ? "?" : "&") + t
    };
    return i.replaceIntoParam = function (e, t, i) {
        if (!e || n.isBlank(e)) return e;
        i = null != i ? encodeURIComponent(i) : "";
        var r = new RegExp("([&~?])" + t + "=[^&]*"), a = t + "=" + i;
        return e = r.test(e) ? e.replace(r, "$1" + a) : o(e, a)
    }, i.strTemplate = function (e, i) {
        e = String(e);
        var o = Array.prototype.slice.call(arguments, 1);
        return o.length ? (o = 1 === o.length && n.isObject(i) ? i : o, e.replace(r, function (e, n) {
            var i = o[n];
            return t.isFunction(i) && (i = i(n)), null == i ? "" : i
        })) : e
    }, i.enhanceContentEditable = function (e) {
        e.keypress(function (e) {
            13 === (e.keyCode || e.witch) && e.preventDefault()
        })
    }, i.getOpposite = function (e) {
        var n = ["top", "right", "bottom", "left"], i = t.inArray(e, n);
        return i < 0 ? null : i + 2 < n.length ? n[i + 2] : n[n.length - i - 2]
    }, function () {
        var e = [], t = !1;
        i.enableBeforeUnloadCheck = function () {
            t || (t = !0, window.onbeforeunload = function () {
                for (var t, n, i, r = 0; n = e[r]; r++) (i = n()) && (t = i);
                t && (window.event.returnValue = t)
            })
        }, i.addBeforeUnloadChecker = function (t) {
            e.push(t)
        }, i.removeBeforeUnloadChecker = function (t) {
            var i = n.arrayIndexOf(e, t);
            return ~i && e.splice(i, 1), !!~i
        }
    }(), i
}), define("dt/lib/liteHashMap", ["require", "./base"], function (e) {
    function t(e) {
        var i = this;
        if (e instanceof t) e.each(function (e, t) {
            i.set(t, e)
        }); else if ($.isArray(e)) for (var r = 0; r < e.length; r++) i.set(e[r], r); else e && n.objForEach(e, function (e, t) {
            i.set(e, t)
        })
    }

    var n = e("./base");
    return t.prototype = {
        constructor: t, get: function (e) {
            return this.hasOwnProperty(e) ? this[e] : null
        }, set: function (e, t) {
            return this[e] = t
        }, each: function (e, t) {
            void 0 !== t && (e = $.proxy(e, t));
            for (var n in this) this.hasOwnProperty(n) && e(this[n], n)
        }, removeKey: function (e) {
            delete this[e]
        }
    }, {
        createLiteHashMap: function (e) {
            return new t(e)
        }
    }
}),
    define("dt/ui/tooltip", ["require", "jquery", "../lib/base", "../lib/model"], function (e) {
        function t(e) {
            var t = n(), i = e.x, r = e.y;
            null == i && (i = 0), null == r && (r = 0);
            var o = e.xAnchor || "center", a = e.yAnchor || "top", s = "left" === o ? 0 : t.outerWidth(),
                l = "top" === a ? 0 : t.outerHeight();
            t.css({
                left: Math.round("left" === o ? i : "center" === o ? i - s / 2 : i - s) + "px",
                top: Math.round("top" === a ? r : "center" === a ? r - l / 2 : r - l) + "px"
            })
        }

        function n() {
            return f || (f = i('<div class="' + u + '" style="display:none;"></div>').appendTo(document.body)), f
        }

        var i = e("jquery"), r = e("../lib/base"), o = e("../lib/model"), a = i.isFunction, s = i.extend,
            l = ".dtui-global-tooltip-namespace", u = "dtui-global-tooltip",
            c = {x: 0, y: -5, xAnchor: "center", yAnchor: "bottom"},
            d = {x: 0, y: -15, xAnchor: "center", yAnchor: "bottom"}, p = {}, f = null, h = !1;
        return p.showTooltip = function (e) {
            if (!h) {
                e = e || {};
                var i = e.text;
                if (null == i) return void p.hideTooltip();
                i = !1 !== e.encodeHTML ? r.encodeHTML(i) : i, n().html(i).show(), t(e.location)
            }
        }, p.hideTooltip = function () {
            n().hide()
        }, p.disableTooltip = function () {
            p.hideTooltip(), h = !0
        }, p.enableTooltip = function () {
            h = !1
        }, p.bindTooltip = function (e) {
            function n(e) {
                g = {currentTarget: e.currentTarget, pageX: e.pageX, pageY: e.pageY}
            }

            function u(t) {
                var n = e.text;
                return a(n) ? n(t.currentTarget) : n
            }

            function f(e) {
                var t = a(h) ? h(e.currentTarget) : s({}, h || (v ? d : c));
                if (v) t.x += e.pageX, t.y += e.pageY; else if (!h) {
                    var n = i(e.currentTarget), r = n.offset();
                    t.x += r.left + n.outerWidth() / 2, t.y += r.top
                }
                return t
            }

            e = o.merge({}, e, {clone: !0, assignWhenCannotClone: !0});
            var h = e.location, v = e.followMouse;
            r.assert(!r.isJQuery(e.bindEl));
            var g, m = i(e.bindEl), y = ["mouseenter" + l, function (t) {
                n(t), p.showTooltip({text: u(g), encodeHTML: e.encodeHTML, location: f(g)})
            }], b = ["mouseleave" + l, function () {
                g = null, p.hideTooltip()
            }], w = ["mousemove" + l, function (e) {
                n(e), t(f(g))
            }], x = e.selector;
            return x && (y.splice(1, 0, x), b.splice(1, 0, x), w.splice(1, 0, x)), m.on.apply(m, y).on.apply(m, b), v && m.on.apply(m, w), {
                refresh: function () {
                    g && p.showTooltip({text: u(g), encodeHTML: e.encodeHTML, location: f(g)})
                }, setText: function (t) {
                    g && p.showTooltip({text: t, encodeHTML: e.encodeHTML, location: f(g)})
                }, hide: function () {
                    g && p.hideTooltip()
                }, dispose: function () {
                    g && (p.hideTooltip(), g = null), m.off(l)
                }
            }
        }, p
    }), define("dt/lib", ["require", "./lib/Set", "./lib/base", "./lib/json", "./lib/dataDriven", "./lib/objectAccess", "./lib/objectOriented", "./lib/model", "./lib/event", "./lib/enumeration", "./lib/disable", "./lib/number", "./lib/throttle", "./lib/htmlCleaner", "./lib/codeStringify", "./lib/others", "./lib/liteHashMap", "./ui/tooltip"], function (e) {
    var t = {Set: e("./lib/Set")};
    return function (e) {
        for (var t = 1, n = arguments.length; t < n; t++) {
            var i = arguments[t];
            for (var r in i) if (i.hasOwnProperty(r)) {
                if (e[r]) throw new Error("Duplicate key: " + r);
                e[r] = i[r]
            }
        }
    }(t, e("./lib/base"), e("./lib/json"), e("./lib/dataDriven"), e("./lib/objectAccess"), e("./lib/objectOriented"), e("./lib/model"), e("./lib/event"), e("./lib/enumeration"), e("./lib/disable"), e("./lib/number"), e("./lib/throttle"), e("./lib/htmlCleaner"), e("./lib/codeStringify"), e("./lib/others"), e("./lib/liteHashMap"), e("./ui/tooltip")), t
}), function (e) {
    function t(e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        return e
    }

    function n() {
        this.raw = [], this.length = 0
    }

    function i() {
        return "___" + k++
    }

    function r(e, t) {
        var n = new Function;
        n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e
    }

    function o(e) {
        return L[e]
    }

    function a(e) {
        return '"' + e.replace(/\x5C/g, "\\\\").replace(/"/g, '\\"').replace(/\x0A/g, "\\n").replace(/\x09/g, "\\t").replace(/\x0D/g, "\\r") + '"'
    }

    function s(e) {
        return e.replace(/[\^\[\]\$\(\)\{\}\?\*\.\+]/g, function (e) {
            return "\\" + e
        })
    }

    function l(e) {
        var t = arguments;
        return e.replace(/\{([0-9]+)\}/g, function (e, n) {
            return t[n - 0 + 1]
        })
    }

    function u(e) {
        return e = e.replace(/^\s*\*/, ""), l('gv({0},["{1}"])', a(e), e.replace(/\[['"]?([^'"]+)['"]?\]/g, function (e, t) {
            return "." + t
        }).split(".").join('","'))
    }

    function c(e, t, n, i, r, o) {
        for (var a = n.length, s = e.split(t), l = 0, u = [], c = 0, d = s.length; d > c; c++) {
            var p = s[c];
            if (c) {
                var f = 1;
                for (l++; ;) {
                    var h = p.indexOf(n);
                    if (0 > h) {
                        u.push(l > 1 && f ? t : "", p);
                        break
                    }
                    if (l = i ? l - 1 : 0, u.push(l > 0 && f ? t : "", p.slice(0, h), l > 0 ? n : ""), p = p.slice(h + a), f = 0, 0 === l) break
                }
                0 === l && (r(u.join("")), o(p), u = [])
            } else p && o(p)
        }
        l > 0 && u.length > 0 && (o(t), o(u.join("")))
    }

    function d(e, t, n) {
        var i, r = [], o = t.options, s = "", l = "", p = "", f = "";
        return n && (s = "ts(", l = ")", p = P, f = I, i = o.defaultFilter), c(e, o.variableOpen, o.variableClose, 1, function (e) {
            n && e.indexOf("|") < 0 && i && (e += "|" + i);
            var o = e.indexOf("|"), a = (o > 0 ? e.slice(0, o) : e).replace(/^\s+/, "").replace(/\s+$/, ""),
                c = o > 0 ? e.slice(o + 1) : "", h = 0 === a.indexOf("*"), v = [h ? "" : s, u(a), h ? "" : l];
            if (c) {
                c = d(c, t);
                for (var g = c.split("|"), m = 0, y = g.length; y > m; m++) {
                    /^\s*([a-z0-9_-]+)(\((.*)\))?\s*$/i.test(g[m]) && (v.unshift('fs["' + RegExp.$1 + '"]('), RegExp.$3 && v.push(",", RegExp.$3), v.push(")"))
                }
            }
            r.push(p, v.join(""), f)
        }, function (e) {
            r.push(p, n ? a(e) : e, f)
        }), r.join("")
    }

    function p(e, t) {
        this.value = e, this.engine = t
    }

    function f(e, t) {
        this.value = e, this.engine = t, this.children = [], this.cloneProps = []
    }

    function h(e, t) {
        var n = e.stack, i = t ? n.find(function (e) {
            return e instanceof t
        }) : n.bottom();
        if (i) {
            for (var r; (r = n.top()) !== i;) {
                if (!r.autoClose) throw new Error(r.type + " must be closed manually: " + r.value);
                r.autoClose(e)
            }
            i.close(e)
        }
        return i
    }

    function v(e, t) {
        if (!/^\s*([a-z0-9\/_-]+)\s*(\(\s*master\s*=\s*([a-z0-9\/_-]+)\s*\))?\s*/i.test(e)) throw new Error("Invalid " + this.type + " syntax: " + e);
        this.master = RegExp.$3, this.name = RegExp.$1, f.call(this, e, t), this.blocks = {}
    }

    function g(e, t) {
        if (!/^\s*([a-z0-9\/_-]+)\s*$/i.test(e)) throw new Error("Invalid " + this.type + " syntax: " + e);
        this.name = RegExp.$1, f.call(this, e, t), this.cloneProps = ["name"]
    }

    function m(e, t) {
        if (!/^\s*([a-z0-9\/_-]+)\s*$/i.test(e)) throw new Error("Invalid " + this.type + " syntax: " + e);
        this.name = RegExp.$1, f.call(this, e, t), this.cloneProps = ["name", "state", "blocks"], this.blocks = {}
    }

    function y(e, t) {
        if (!/^\s*([a-z0-9_]+)\s*=([\s\S]*)$/i.test(e)) throw new Error("Invalid " + this.type + " syntax: " + e);
        this.name = RegExp.$1, this.expr = RegExp.$2, f.call(this, e, t), this.cloneProps = ["name", "expr"]
    }

    function b(e, t) {
        if (!/^\s*([a-z0-9_-]+)\s*(\(([\s\S]*)\))?\s*$/i.test(e)) throw new Error("Invalid " + this.type + " syntax: " + e);
        this.name = RegExp.$1, this.args = RegExp.$3, f.call(this, e, t), this.cloneProps = ["name", "args"]
    }

    function w(e, t) {
        if (!/^\s*([a-z0-9\/_-]+)\s*(\(([\s\S]*)\))?\s*$/i.test(e)) throw new Error("Invalid " + this.type + " syntax: " + e);
        this.name = RegExp.$1, this.args = RegExp.$3, f.call(this, e, t), this.cloneProps = ["name", "args"]
    }

    function x(e, t) {
        if (!new RegExp(l("^\\s*({0}[\\s\\S]+{1})\\s+as\\s+{0}([0-9a-z_]+){1}\\s*(,\\s*{0}([0-9a-z_]+){1})?\\s*$", s(t.options.variableOpen), s(t.options.variableClose)), "i").test(e)) throw new Error("Invalid " + this.type + " syntax: " + e);
        this.list = RegExp.$1, this.item = RegExp.$2, this.index = RegExp.$4, f.call(this, e, t), this.cloneProps = ["list", "item", "index"]
    }

    function _(e, t) {
        f.call(this, e, t)
    }

    function T(e, t) {
        _.call(this, e, t)
    }

    function C(e, t) {
        f.call(this, e, t)
    }

    function E(e, t) {
        t.target = e;
        var n = t.engine, i = e.name;
        if (n.targets[i]) switch (n.options.namingConflict) {
            case"override":
                n.targets[i] = e, t.targets.push(i);
            case"ignore":
                break;
            default:
                throw new Error("Target exists: " + i)
        } else n.targets[i] = e, t.targets.push(i)
    }

    function A(e, t) {
        R[e] = t, t.prototype.type = e
    }

    function D(e) {
        this.options = {
            commandOpen: "\x3c!--",
            commandClose: "--\x3e",
            commandSyntax: /^\s*(\/)?([a-z]+)\s*(?::([\s\S]*))?$/,
            variableOpen: "${",
            variableClose: "}",
            defaultFilter: "html"
        }, this.config(e), this.targets = {}, this.filters = t({}, M)
    }

    function S(e, t) {
        function i() {
            var e;
            if (d.length > 0 && (e = d.join(""))) {
                var n = new p(e, t);
                n.beforeAdd(u), l.top().addChild(n), d = [], t.options.strip && u.current instanceof f && (n.value = e.replace(/^[\x20\t\r]*\n/, "")), u.current = n
            }
        }

        var r, o = t.options.commandOpen, a = t.options.commandClose, s = t.options.commandSyntax, l = new n,
            u = {engine: t, targets: [], stack: l, target: null}, d = [];
        return c(e, o, a, 0, function (e) {
            var n = s.exec(e);
            if (n && (r = R[n[2].toLowerCase()]) && "function" == typeof r) {
                i();
                var l = u.current;
                t.options.strip && l instanceof p && (l.value = l.value.replace(/\r?\n[\x20\t]*$/, "\n")), n[1] ? l = h(u, r) : (l = new r(n[3], t), "function" == typeof l.beforeOpen && l.beforeOpen(u), l.open(u)), u.current = l
            } else /^\s*\/\//.test(e) || d.push(o, e, a);
            r = null
        }, function (e) {
            d.push(e)
        }), i(), h(u), u.targets
    }

    n.prototype = {
        push: function (e) {
            this.raw[this.length++] = e
        }, pop: function () {
            if (this.length > 0) {
                var e = this.raw[--this.length];
                return this.raw.length = this.length, e
            }
        }, top: function () {
            return this.raw[this.length - 1]
        }, bottom: function () {
            return this.raw[0]
        }, find: function (e) {
            for (var t = this.length; t--;) {
                var n = this.raw[t];
                if (e(n)) return n
            }
        }
    };
    var k = 178245, L = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}, M = {
        html: function (e) {
            return e.replace(/[&<>"']/g, o)
        }, url: encodeURIComponent, raw: function (e) {
            return e
        }
    }, O = 'var r="";', P = "r+=", I = ";", H = "return r;";
    "undefined" != typeof navigator && /msie\s*([0-9]+)/i.test(navigator.userAgent) && RegExp.$1 - 0 < 8 && (O = "var r=[],ri=0;", P = "r[ri++]=", H = 'return r.join("");'), p.prototype = {
        getRendererBody: function () {
            var e = this.value, t = this.engine.options;
            return !e || t.strip && /^\s*$/.test(e) ? "" : d(e, this.engine, 1)
        }, clone: function () {
            return this
        }
    }, f.prototype = {
        addChild: function (e) {
            this.children.push(e)
        }, open: function (e) {
            var t = e.stack.top();
            t && t.addChild(this), e.stack.push(this)
        }, close: function (e) {
            e.stack.top() === this && e.stack.pop()
        }, getRendererBody: function () {
            for (var e = [], t = this.children, n = 0; n < t.length; n++) e.push(t[n].getRendererBody());
            return e.join("")
        }, clone: function () {
            for (var e = new this.constructor(this.value, this.engine), t = 0, n = this.children.length; n > t; t++) e.addChild(this.children[t].clone());
            for (var t = 0, n = this.cloneProps.length; n > t; t++) {
                var i = this.cloneProps[t];
                e[i] = this[i]
            }
            return e
        }
    };
    r(v, f), r(g, f), r(m, f), r(y, f), r(b, f), r(w, f), r(x, f), r(_, f), r(T, _), r(C, _);
    var N = {READING: 1, READED: 2, APPLIED: 3, READY: 4};
    m.prototype.applyMaster = v.prototype.applyMaster = function (e) {
        function t(e) {
            var i = e.children;
            if (i instanceof Array) for (var r = 0, o = i.length; o > r; r++) {
                var a = i[r];
                a instanceof g && n[a.name] && (a = i[r] = n[a.name]), t(a)
            }
        }

        if (this.state >= N.APPLIED) return 1;
        var n = this.blocks, i = this.engine.targets[e];
        return i && i.applyMaster(i.master) ? (this.children = i.clone().children, t(this), this.state = N.APPLIED, 1) : void 0
    }, v.prototype.isReady = function () {
        function e(i) {
            for (var r = 0, o = i.children.length; o > r; r++) {
                var a = i.children[r];
                if (a instanceof m) {
                    var s = t.targets[a.name];
                    n = n && s && s.isReady(t)
                } else a instanceof f && e(a)
            }
        }

        if (this.state >= N.READY) return 1;
        var t = this.engine, n = 1;
        return this.applyMaster(this.master) ? (e(this), n && (this.state = N.READY), n) : void 0
    }, v.prototype.getRenderer = function () {
        if (this.renderer) return this.renderer;
        if (this.isReady()) {
            var e = new Function("data", "engine", ['data=data||{};var v={},fs=engine.filters,hg=typeof data.get=="function",gv=function(n,ps){var p=ps[0],d=v[p];if(d==null){if(hg){return data.get(n);}d=data[p];}for(var i=1,l=ps.length;i<l;i++)if(d!=null)d = d[ps[i]];return d;},ts=function(s){if(typeof s==="string"){return s;}if(s==null){s="";}return ""+s;};', O, this.getRendererBody(), H].join("\n")),
                t = this.engine;
            return this.renderer = function (n) {
                return e(n, t)
            }, this.renderer
        }
        return null
    }, v.prototype.open = function (e) {
        h(e), f.prototype.open.call(this, e), this.state = N.READING, E(this, e)
    }, y.prototype.open = w.prototype.open = function (e) {
        e.stack.top().addChild(this)
    }, g.prototype.open = function (e) {
        f.prototype.open.call(this, e), (e.imp || e.target).blocks[this.name] = this
    }, T.prototype.open = function (e) {
        (new C).open(e), h(e, _).addChild(this), e.stack.push(this)
    }, C.prototype.open = function (e) {
        h(e, _).addChild(this), e.stack.push(this)
    }, m.prototype.open = function (e) {
        this.parent = e.stack.top(), this.target = e.target, f.prototype.open.call(this, e), this.state = N.READING, e.imp = this
    }, w.prototype.close = y.prototype.close = function () {
    }, m.prototype.close = function (e) {
        f.prototype.close.call(this, e), this.state = N.READED, e.imp = null
    }, v.prototype.close = function (e) {
        f.prototype.close.call(this, e), this.state = this.master ? N.READED : N.APPLIED, e.target = null
    }, m.prototype.autoClose = function (e) {
        var t = this.parent.children;
        t.push.apply(t, this.children), this.children.length = 0;
        for (var n in this.blocks) this.target.blocks[n] = this.blocks[n];
        this.blocks = {}, this.close(e)
    }, w.prototype.beforeOpen = m.prototype.beforeOpen = y.prototype.beforeOpen = x.prototype.beforeOpen = b.prototype.beforeOpen = g.prototype.beforeOpen = _.prototype.beforeOpen = p.prototype.beforeAdd = function (e) {
        if (!e.stack.bottom()) {
            new v(i(), e.engine).open(e)
        }
    }, m.prototype.getRendererBody = function () {
        return this.applyMaster(this.name), f.prototype.getRendererBody.call(this)
    }, w.prototype.getRendererBody = function () {
        return l("{0}engine.render({2},{{3}}){1}", P, I, a(this.name), d(this.args, this.engine).replace(/(^|,)\s*([a-z0-9_]+)\s*=/gi, function (e, t, n) {
            return (t || "") + a(n) + ":"
        }))
    }, y.prototype.getRendererBody = function () {
        return this.expr ? l("v[{0}]={1};", a(this.name), d(this.expr, this.engine)) : ""
    }, _.prototype.getRendererBody = function () {
        return l("if({0}){{1}}", d(this.value, this.engine), f.prototype.getRendererBody.call(this))
    }, C.prototype.getRendererBody = function () {
        return l("}else{{0}", f.prototype.getRendererBody.call(this))
    }, x.prototype.getRendererBody = function () {
        return l('var {0}={1};if({0} instanceof Array)for (var {4}=0,{5}={0}.length;{4}<{5};{4}++){v[{2}]={4};v[{3}]={0}[{4}];{6}}else if(typeof {0}==="object")for(var {4} in {0}){v[{2}]={4};v[{3}]={0}[{4}];{6}}', i(), d(this.list, this.engine), a(this.index || i()), a(this.item), i(), i(), f.prototype.getRendererBody.call(this))
    }, b.prototype.getRendererBody = function () {
        var e = this.args;
        return l("{2}fs[{5}]((function(){{0}{4}{1}})(){6}){3}", O, H, P, I, f.prototype.getRendererBody.call(this), a(this.name), e ? "," + d(e, this.engine) : "")
    };
    var R = {};
    A("target", v), A("block", g), A("import", m), A("use", w), A("var", y), A("for", x), A("if", _), A("elif", T), A("else", C), A("filter", b), D.prototype.config = function (e) {
        t(this.options, e)
    }, D.prototype.compile = D.prototype.parse = function (e) {
        if (e) {
            var t = S(e, this);
            if (t.length) return this.targets[t[0]].getRenderer()
        }
        return new Function('return ""')
    }, D.prototype.getRenderer = function (e) {
        var t = this.targets[e];
        return t ? t.getRenderer() : void 0
    }, D.prototype.render = function (e, t) {
        var n = this.getRenderer(e);
        return n ? n(t) : ""
    }, D.prototype.addFilter = function (e, t) {
        "function" == typeof t && (this.filters[e] = t)
    };
    var j = new D;
    j.Engine = D, "object" == typeof exports && "object" == typeof module ? exports = module.exports = j : "function" == typeof define && define.amd ? define("etpl", j) : e.etpl = j
}(this), define("dt/tpl", ["require", "etpl", "./lib"], function (e) {
    function t(e) {
        for (var t = !1, n = !1, i = 1; i < arguments.length; i++) "raw" === arguments[i] && (t = !0), "null" === arguments[i] && (n = !0);
        return null != e || n || (e = ""), r.obTypeOf(e) && (e = e()), e = String(e), t ? e : r.encodeHTML(e)
    }

    function n(e) {
        return null == e && (e = ""), String(e).replace(/^option\./, "")
    }

    var i = e("etpl"), r = e("./lib"), o = {};
    return i.config({
        commandOpen: "{{",
        commandClose: "}}",
        defaultFilter: "ob"
    }), i.addFilter("ob", t), i.addFilter("dsp", n), o.render = function (e, t, n) {
        return !i.getRenderer(e) && n && i.compile(n), i.render(e, t || {})
    }, o
}), define("dt/ui/Component", ["require", "jquery", "dt/lib", "dt/tpl"], function (e) {
    function t() {
        function e(e) {
            t.disabled(e)
        }

        var t = this._viewModel();
        t.visible = g.ob(!0);
        var n = t.disabled;
        t.disabled = g.ob(!1), null != n && this._disposable(n.subscribe(e, this))
    }

    function n(e) {
        if (e) {
            var t = w(this);
            e = t.$el = v(e), t.el = e[0], g.bindComponent(e, this), e.addClass(this.getFullCss().join(" "));
            var n = this._viewModel(), o = n.disabled, a = n.visible;
            this._disposable(o.subscribe(i, this)), this._disposable(a.subscribe(r, this)), i.call(this, o()), a("none" !== e[0].style.display)
        }
    }

    function i(e) {
        this.$el()[e ? "addClass" : "removeClass"](this.getFullCss("-disabled").join(" "))
    }

    function r(e) {
        this.$el()[e ? "show" : "hide"]()
    }

    function o() {
        var e = w(this).cptDef.tplTarget || this._getDefineProperty("tplTarget"), t = this.$el();
        e && t && t.length && this._renderTpl(e, null, t), !this._getDefineProperty("suppressConstructSub") && t && t.length && this._constructSub(t)
    }

    function a() {
        var e = this.$el(), t = w(this);
        e.off(t.eventNamespace), e.removeClass(this.getFullCss().join(" ")), t.viewModel = null, t.el = null, t.$el = null, t.subComponents = null, t.sub$Els = null, g.bindComponent(e, !1)
    }

    function s(e, t, n) {
        if (!n && g.isComponent(e) || n && g.isJQuery(e)) t(e); else if ("object" === v.type(e) && !g.isAtom(e)) for (var i in e) e.hasOwnProperty(i) && null != e[i] && s(e[i], t, n)
    }

    function l(e) {
        var t = w(this), n = t.viewModel = {}, i = this;
        return this._traverseFromAncestor(function (e) {
            n = g.merge(n, e.defineProperties.viewModel.call(i), {
                onlyMergeOwnPropertyInTarget: !1,
                levelOneNeedMerge: null,
                clone: !1
            })
        }), n = g.merge(n, e, {
            onlyMergeOwnPropertyInTarget: !!this._getDefineProperty("viewModelOnlyAccessDeclaredProperties"),
            levelOneNeedMerge: t.viewModelMergeMap || {}
        }), t.viewModel = n, n
    }

    function u() {
        var e = w(this), t = e.viewModelPublicMap = {}, n = e.viewModelMergeMap = {};
        this._traverseFromAncestor(function (e) {
            for (var i = e.defineProperties.viewModelPublic || [], r = 0, o = i.length; r < o; r++) t[i[r]] = 1;
            for (var a = e.defineProperties.viewModelMerge || [], r = 0, o = a.length; r < o; r++) n[a[r]] = 1
        })
    }

    function c() {
        var e = this._viewModel(), t = w(this), n = [];
        this._traverseFromAncestor(function (e) {
            var t = e.defineProperties.css;
            v.isArray(t) ? n.push.apply(n, t) : t && n.push(t)
        }), t.basicCss = n;
        var i = e && e.css || [];
        v.isArray(i) || (i = [i]), t.extraCss = i
    }

    function d(e) {
        return e = y.normalizePath(e), !!w(this).viewModelPublicMap[e]
    }

    function p(e) {
        if (e && v.isFunction(e.dispose)) try {
            e.dispose()
        } catch (e) {
            if (x.debug) throw e;
            x.printLog && x.printLog.error(e)
        } else e && g.isJQuery(e) && e.off(this._event())
    }

    function f(e) {
        if (e = e || w(this).subComponents, s(e, function (e) {
            try {
                e.dispose()
            } catch (e) {
                if (x.debug) throw e;
                x.printLog && x.printLog.error(e)
            }
        }), !g.isAtom(e)) for (var t in e) e.hasOwnProperty(t) && (e[t] = null)
    }

    function h(e) {
        e = e || w(this).sub$els;
        var t = this._event();
        if (s(e, function (e) {
            e.off(t)
        }, !0), !g.isAtom(e)) for (var n in e) e.hasOwnProperty(n) && (e[n] = null)
    }

    var v = e("jquery"), g = e("dt/lib"), m = e("dt/tpl"), y = g.getByPath, b = g.setByPath, w = g.makeInner(),
        x = w.attach(g.newClass(g.enableEvent({
            _define: {
                tpl: "",
                tplTarget: "",
                css: "",
                viewModel: function () {
                    return {disabled: null, visible: null, css: "", tplTarget: null, tplRenderMode: "html"}
                },
                viewModelPublic: ["disabled", "visible"],
                viewModelMerge: [],
                viewModelOnlyAccessDeclaredProperties: !0,
                suppressConstructSub: !1
            },
            _prepare: v.noop,
            _init: v.noop,
            _dispose: v.noop,
            _disposeFinally: v.noop,
            _run: v.noop,
            _event: function (e) {
                var t = w(this).eventNamespace;
                return (null != e ? e : "") + t
            },
            _parseViewModel: function (e, t) {
                return e
            },
            _parseCptDef: function (e) {
                return e
            },
            _construct: function (e, i, r) {
                arguments.length > 0 && g.assert(null != e), !e || v.isPlainObject(e) ? (r = i, i = e, e = null) : e = v(e), r = v.extend({}, r), g.isComponent(this, !0);
                var a = w(this);
                a.cptDef = r, a.eventNamespace = ".namespace" + g.localUID(), a.subComponents = {}, a.sub$Els = {}, a.disposed = !1, a.cptDisposableArea = {}, a.cptInstanceUID = "cpt-instance-" + g.localUID(), u.call(this), i = this._parseViewModel(i || {}, r) || {}, l.call(this, i), c.call(this), t.call(this), n.call(this, e), this._prepare(), o.call(this), this._init()
            },
            dispose: function () {
                var e = w(this);
                if (!e.disposed) {
                    var t = this.el(), n = this["__originalHTML"] || "";
                    this._dispose(), f.call(this), h.call(this), this._disposable(!1), a.call(this), this._disposeFinally(), t.innerHTML = n, e.disposed = !0
                }
            },
            isDisposed: function () {
                return !!w(this).disposed
            },
            isFrozen: function () {
                return this._viewModel().disabled() || this.isDisposed()
            },
            _disposable: function (e, t) {
                g.assert(null != e);
                var n = w(this).cptDisposableArea;
                if (null == e) return e;
                if (!1 === e) for (var i in n) n.hasOwnProperty(i) && (p.call(this, n[i]), n[i] = null); else "string" === v.type(e) ? (p.call(this, n[e]), n[e] = null) : (g.assert(v.isFunction(e.dispose) || g.isJQuery(e), "No dispose method nor not jQuery!"), t = t || "-component-anonymouse-disposable" + g.localUID(), n[t] = e);
                return e
            },
            resize: v.noop,
            _manuInitView: function (e) {
                n.call(this, e), this._constructSub(e)
            },
            _applyTpl: function (e, t) {
                t && (this._renderTpl(t, null, e), this._constructSub(e))
            },
            _renderTpl: function (e, t, n) {
                var i = {viewModel: t || this._viewModel(), lang: this.getLang(), constant: this.getConstant()},
                    r = m.render(e, i, this._getDefineProperty("tpl")) || "";
                return n && v(n)[this._viewModel().tplRenderMode](r), r
            },
            _constructSub: function (e, t) {
                var n = v(e);
                g.assert(n.length), t && n.data("cpt") && this._constructSubCpt.call(this, e);
                var i = this;
                v("*[data-cpt]", n).each(function (e, t) {
                    i._constructSubCpt(t)
                })
            },
            _constructSubCpt: function (e) {
                var t = v(e), n = e.innerHTML, i = this._viewModel(),
                    r = this._parseCptDef(new Function("viewModel", "lib", "lang", "constant", "return {" + t.data("cpt") + "};").call(this, i, g, this.getLang(), this.getConstant())),
                    o = this.getCptClass(r.type), a = r.viewModelGet ? y(r.viewModelGet, i) : r.viewModel,
                    s = new o(e, a, r);
                return s["__originalHTML"] = n, this._sub(r.name || "-sub-cpt-name-" + g.localUID(), s)
            },
            recreateSubCpt: function (e) {
                var t = this._sub(e);
                if (t) {
                    var n = t.el();
                    t.dispose(), this._sub(e, null), this._constructSubCpt(n)
                }
            },
            traversalRun: function (e) {
                s(w(this).subComponents, function (t) {
                    t.traversalRun(e)
                }), this._run(e)
            },
            _sub: function (e, t, n) {
                var i = w(this).subComponents;
                return arguments.length < 2 ? y(e, i, y.actionChoice.notPlainReturn) : (b(e, t, i, n ? b.actionChoice.notPlainOverlap : b.actionChoice.notPlainThrow), t)
            },
            _getDefineProperty: function (e) {
                return this.constructor.defineProperties[e]
            },
            el: function () {
                return w(this).el
            },
            $el: function (e, t, n) {
                var i = w(this);
                return 0 === arguments.length ? i.$el : 1 === arguments.length ? y(e, i.sub$Els, y.actionChoice.notPlainReturn) : (b(e, t, i.sub$Els, n ? b.actionChoice.notPlainOverlap : b.actionChoice.notPlainThrow), t)
            },
            css: function () {
                return this._getDefineProperty("css") || ""
            },
            viewModel: function (e) {
                if (d.call(this, e)) return y(e, w(this).viewModel);
                throw new Error(e + " is private!")
            },
            _viewModel: function () {
                return w(this).viewModel
            },
            getCptClass: function (e) {
                return x.cptClasses[e]
            },
            getCptDef: function (e) {
                return w(this).cptDef[e]
            },
            uid: function () {
                return w(this).cptInstanceUID
            },
            getFullCss: function (e) {
                var t = ["dtui-cpt"], n = w(this);
                return t.push.apply(t, n.basicCss || []), t.push.apply(t, n.extraCss || []), v.map(t, function (t) {
                    return t + (e || "")
                })
            },
            isDisabled: function () {
                return !!g.peek(this._viewModel().disabled)
            },
            getLang: function () {
                return x.defaultLanguageSet
            },
            getConstant: function () {
                return x.defaultConstant
            },
            clone: v.noop,
            _traverseFromAncestor: function (e) {
                for (var t = [], n = this.constructor; n; n = n.prototype._superClass) t.push(n);
                for (var i = t.length; i--;) e.call(this, t[i])
            },
            localOb: function (e, t) {
                var n, i = w(this), r = i.localObRepo || (i.localObRepo = {});
                return arguments.length > 1 ? !1 === t ? (n = r[e], delete r[e]) : (g.assert(null == r[e]), n = r[e] = t) : n = r[e], n
            },
            getAncestorLocalOb: function (e) {
                for (var t, n, i = this.$el(); (i = i && i.parent())[0] && !(n = (t = g.getComponent(i)) && t.localOb(e)) && i[0] !== document.body;) ;
                return n
            }
        })));
    return x.cptClasses = {}, x.defaultLanguageSet = {}, x.defaultConstant = {}, x.consoleLog = function (e) {
        var t = window.console;
        g.isObject(t) && "function" == typeof t.log && t.log(g.stringifyJSON(e))
    }, x
}), define("docTool/docUtil", ["require", "jquery", "globalArgs", "dt/lib"], function (e) {
    var t = e("jquery"), n = e("globalArgs"), i = e("dt/lib"), r = {};
    return r.getGlobalArg = function (e, t) {
        return n.hasOwnProperty(e) ? n[e] : t
    }, r.addVersionArg = function (e) {
        return n.basePath + e + (e.indexOf("?") >= 0 ? "&" : "?") + "_v_=" + n.version
    }, r.parseToObject = function (e) {
        var n = new Function("return (" + e + ")")(), r = t.type(n);
        return i.assert("object" === r || "array" === r), n
    }, r.contains = function (e, t) {
        return i.arrayIndexOf(e, t) >= 0
    }, r.changeIterationSequence = function (e, t, n, i) {
        var r;
        for (var o in e) if (e.hasOwnProperty(o) && t === o) {
            r = e[o];
            break
        }
        var a = {};
        "first" === n && (a[t] = r);
        for (var o in e) e.hasOwnProperty(o) && o !== t && ("before" === n && o === i && (a[t] = r), a[o] = e[o], "after" === n && o === i && (a[t] = r));
        return "last" === n && (a[t] = r), a
    }, r.normalizeToArray = function (e) {
        return e ? t.isArray(e) ? e : [e] : []
    }, r.log = function (e) {
        console && t.isFunction(console.log) && console.log(e)
    }, r
}), define("docTool/schemaHelper", ["require", "jquery", "dt/lib", "./docUtil", "globalArgs"], function (e) {
    function t(e, t, i, r, a, s, l) {
        var d = t, f = s === y ? o(i) : null;
        if ("hasArrayItems" !== e) {
            var h = n(i, a, s, l);
            d = {
                value: "id-" + u.localUID(),
                parent: t,
                hasObjectProperties: "hasObjectProperties" === e,
                isEnumParent: s === b,
                type: i.type,
                typeEnum: f,
                description: h.description,
                defau: h.defau,
                defaultValueText: g.getDefaultValueText(h.defau),
                itemEncodeHTML: !1,
                tooltipEncodeHTML: !1
            }, s !== y && (d.propertyName = r), a === m && (d.arrayDepth = l.length), (t.children = t.children || []).push(d)
        }
        var v = "", w = "", x = "...";
        if (s === y) x = "type: '" + p(f) + "', ..."; else if (r && (v = '<span class="ecdoc-api-tree-text-prop">' + p(r) + "</span>", c.getGlobalArg("pureTitle") || (v += ": ")), l && l.length) if (1 === l.length) v += "[", w += "]"; else {
            var _ = new Array(l.length + 1);
            v += _.join("["), w += _.join("]")
        }
        if ("hasObjectProperties" === e) d.childrenPre = v + "{", d.childrenPost = "}" + w + ",", d.childrenBrief = x; else if ("isAtom" === e) {
            var T = g.getDefaultValueText(d.defau, {getBrief: !0});
            d.text = v, c.getGlobalArg("pureTitle") || (d.text += '<span class="ecdoc-api-tree-text-default">' + p(T) + "</span>" + w + ",")
        } else "isEnumParent" === e && (d.childrenPre = v, d.childrenPost = w + ",", d.childrenBrief = x);
        return d
    }

    function n(e, t, n, i) {
        var i = (i || []).slice(), r = i && i.length && (n === b || t === m && n !== y) ? i[0] : e,
            o = {description: "option3" === d.schemaName ? r.descriptionCN : r.description, defau: {type: r.type}};
        return r.hasOwnProperty("default") && (o.defau.default = r.default), o
    }

    function i(e, t, n) {
        for (var i, o = []; e && e.parent && e.parent.parent;) {
            var a = e.typeEnum, s = a ? r(e.parent, t) + "-" + a : r(e, t);
            n && (s = u.encodeHTML(s || ""), i || (s = "<strong>" + s + "</strong>")), o.push(s), e = e.parent, a && (e = e.parent), i = !0
        }
        return o.reverse().join(".")
    }

    function r(e, t) {
        var n = e.propertyName, i = e.arrayDepth;
        return t && i && (n += 1 === i ? "[i]" : new Array(i + 1).join("[i]")), n
    }

    function o(e) {
        return a(e.properties.type.default)
    }

    function a(e, t) {
        var n = e.match(f) || e.match(h);
        return n ? n[1] : t ? null : e
    }

    function s(e, t) {
        function n(e) {
            return e.length > t ? e.slice(0, t) + "..." : e
        }

        var i = a(e, !0);
        return null != i ? "'" + n(i) + "'" : n(e)
    }

    var l = e("jquery"), u = e("dt/lib"), c = e("./docUtil"), d = e("globalArgs"), p = u.encodeHTML,
        f = /^\s*'(.*)'\s*$/, h = /^\s*"(.*)"\s*$/, v = /^([^\[\]\-]+|i\])(\-([0-9a-zA-Z_ \/,]*))?$/, g = {},
        m = "isArrayItem", y = "isEnumItem", b = "isEnumParent";
    return g.parseOptionPath = function (e, t) {
        t = t || {};
        var n = "Path is illegal: '" + e + "'";
        u.assert(e && (e = l.trim(e)), n);
        for (var i = e.replace(/\[i\]/g, "").split(/\./), r = [], o = 0, a = i.length; o < a; o++) {
            var s = l.trim(i[o]);
            if ("" !== s) {
                var c = s.match(v) || [], d = c[1], p = c[2], f = c[3];
                t.noTypeEnum && (d += p || "", f = null), r.push({propertyName: d, typeEnum: f || null})
            }
        }
        return r
    }, g.queryDocTree = function (e, t) {
        function n(e, t, i) {
            if (u.isObject(e)) {
                var a = (t.optionPath || t.fuzzyPath)[i], s = (t.optionPath || t.fuzzyPath)[i - 1];
                if (a || (e.isEnumParent && !t.fuzzyPath && s && s.typeEnum || t.result.push(e), e.isEnumParent)) for (var l = 0, c = (e.children || []).length; l < c; l++) {
                    var d = e.children[l], p = null;
                    e.isEnumParent ? s && s.typeEnum && d.typeEnum !== s.typeEnum || (p = i) : t.optionPath && r(d, a.propertyName, a.arrayName) ? p = i + 1 : t.fuzzyPath && (p = o(d, a.propertyName, a.arrayName) ? i + 1 : i), null != p && n(d, t, p)
                }
            }
        }

        function i(e, t) {
            if (u.isObject(e)) {
                if (t.anyText && (o(e, t.anyText) || e.description && e.description.indexOf(t.anyText) >= 0)) return void t.result.push(e);
                for (var n = 0, r = (e.children || []).length; n < r; n++) i(e.children[n], t)
            }
        }

        function r(e, t, n) {
            return null != e.propertyName && e.propertyName === t
        }

        function o(e, t, n) {
            return null != t && (t = t.toLowerCase()), null != n && (n = n.replace(/\[i\]/g, "").toLowerCase()), null != e.propertyName && e.propertyName.toLowerCase().indexOf(t) >= 0
        }

        t = t || {};
        var a = {
            originalDocTree: e,
            result: [],
            optionPath: t.optionPath ? g.parseOptionPath(t.optionPath, {noTypeEnum: t.noTypeEnum}) : null,
            fuzzyPath: t.fuzzyPath ? g.parseOptionPath(t.fuzzyPath, {noTypeEnum: t.noTypeEnum}) : null,
            anyText: t.anyText && l.trim(t.anyText) || null
        };
        return u.assert((a.optionPath || a.fuzzyPath || a.anyText) && 0 == (!!a.optionPath && !!a.fuzzyPath), "invalid query string!"), a.optionPath || a.fuzzyPath ? n(e, a, 0) : i(e, a), a.result
    }, g.buildDoc = function (e, n) {
        function i(e, n, r, o, a, s) {
            if (u.isObject(n)) if (n.anyOf) for (var l = t("isEnumParent", e, n, r, o, b, s), c = 0; c < n.anyOf.length; c++) i(l, n.anyOf[c], r, null, y, s ? s.slice() : null); else if (n.items) {
                var l = t("hasArrayItems", e, n, r, o, a, s);
                i(l, n.items, r, m, null, s ? (s.push(n), s) : [n])
            } else if (n.properties) {
                var l = t("hasObjectProperties", e, n, r, o, a, s), d = n.properties;
                for (var p in n.properties) d.hasOwnProperty(p) && i(l, n.properties[p], p, "isPropertyItem", null, null)
            } else t("isAtom", e, n, r, o, a, s)
        }

        return i(n, e.option), n
    }, g.getDefaultValueText = function (e, t) {
        t = t || {};
        var n = l.extend({
            object: "{...}",
            array: "[...]",
            regexp: "/.../",
            function: "Function",
            "?": "..."
        }, t.briefMapping);
        if (!e.hasOwnProperty("default")) {
            if (t.getBrief) {
                var i = c.normalizeToArray(e.type);
                return 1 === i.length && n[i[0].toLowerCase()] || n["?"]
            }
            return ""
        }
        var r = e.default, i = l.type(r);
        if ("null,undefined,number,boolean".indexOf(i) >= 0) return r + "";
        if ("string" === i) return t.getBrief ? s(r, 20) : r;
        if (t.getBrief) return n[i] || n["?"];
        try {
            return JSON.stringify(r, null, 4)
        } catch (e) {
            return r + ""
        }
    }, g.getOptionPathForHash = function (e) {
        return i(e)
    }, g.getOptionPathForHTML = function (e) {
        return i(e, !0, !0)
    }, g
}), define("docTool/lang", ["require", "jquery", "globalArgs"], function (e) {
    var t = e("jquery"), n = e("globalArgs"), i = {
        langCode: "zh",
        quickLinkTutorial: "教程",
        quickLinkAPI: "API",
        quickLinkOption: "配置项",
        quickLinkOptionGL: "GL",
        queryBoxPlaceholderFuzzyPath: "配置项模糊搜索（快捷键'/'）",
        queryBoxPlaceholderAnyText: "全文搜索（快捷键'/'）",
        queryBoxTextFuzzyPath: "配置项搜索",
        queryBoxTextAnyText: "全文搜索",
        descAreaLabelType: "类型",
        descAreaLabelDefaultValue: "默认值",
        showProperties: "展开详情 ...",
        hideProperties: "折叠详情",
        collapseAll: "折叠",
        queryResultInfo: "共 #{count} 条结果",
        queryBoxNoResult: "没有搜索到信息",
        exampleCategory: "示例类型",
        apiMainTitle: "ECharts API检索工具",
        apiChartDesc: "使用说明：鼠标移动到<strong>箭头</strong>上，可以查看并定位到对应的<strong>ECharts配置项</strong>。"
    }, r = {
        langCode: "en",
        quickLinkTutorial: "Tutorial",
        quickLinkAPI: "API",
        quickLinkOption: "Option",
        quickLinkOptionGL: "GL",
        queryBoxPlaceholderFuzzyPath: "Search (Short cut:'/'). Try input: ser(line).border",
        queryBoxPlaceholderAnyText: "Search (Short cut:'/'). Try input: style",
        queryBoxTextFuzzyPath: "In properties",
        queryBoxTextAnyText: "Full-text",
        descAreaLabelType: "Type",
        descAreaLabelDefaultValue: "Default Value",
        showProperties: "Show Properties ...",
        hideProperties: "Hide Properties",
        collapseAll: "Collapse",
        queryResultInfo: "Got #{count} results.",
        queryBoxNoResult: "No result",
        exampleCategory: "Category",
        apiMainTitle: "ECharts API Tool",
        apiChartDesc: "Tip: Mouse hover on <strong>arrows</strong> to get <strong>option details</strong>."
    }, o = n.lang || {};
    return t.extend(i, o.zh || {}), t.extend(r, o.en || {}), "en" === window.EC_WWW_LANG ? r : i
}), function (e) {
    function t(e, t, n, i, r) {
        this._listener = t, this._isOnce = n, this.context = i, this._signal = e, this._priority = r || 0
    }

    function n(e, t) {
        if ("function" != typeof e) throw Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}", t))
    }

    function i() {
        this._bindings = [], this._prevParams = null;
        var e = this;
        this.dispatch = function () {
            i.prototype.dispatch.apply(e, arguments)
        }
    }

    t.prototype = {
        active: !0, params: null, execute: function (e) {
            var t;
            return this.active && this._listener && (e = this.params ? this.params.concat(e) : e, t = this._listener.apply(this.context, e), this._isOnce && this.detach()), t
        }, detach: function () {
            return this.isBound() ? this._signal.remove(this._listener, this.context) : null
        }, isBound: function () {
            return !!this._signal && !!this._listener
        }, isOnce: function () {
            return this._isOnce
        }, getListener: function () {
            return this._listener
        }, getSignal: function () {
            return this._signal
        }, _destroy: function () {
            delete this._signal, delete this._listener, delete this.context
        }, toString: function () {
            return "[SignalBinding isOnce:" + this._isOnce + ", isBound:" + this.isBound() + ", active:" + this.active + "]"
        }
    }, i.prototype = {
        VERSION: "1.0.0", memorize: !1, _shouldPropagate: !0, active: !0, _registerListener: function (e, n, i, r) {
            var o = this._indexOfListener(e, i);
            if (-1 !== o) {
                if (e = this._bindings[o], e.isOnce() !== n) throw Error("You cannot add" + (n ? "" : "Once") + "() then add" + (n ? "Once" : "") + "() the same listener without removing the relationship first.")
            } else e = new t(this, e, n, i, r), this._addBinding(e);
            return this.memorize && this._prevParams && e.execute(this._prevParams), e
        }, _addBinding: function (e) {
            var t = this._bindings.length;
            do {
                --t
            } while (this._bindings[t] && e._priority <= this._bindings[t]._priority);
            this._bindings.splice(t + 1, 0, e)
        }, _indexOfListener: function (e, t) {
            for (var n, i = this._bindings.length; i--;) if (n = this._bindings[i], n._listener === e && n.context === t) return i;
            return -1
        }, has: function (e, t) {
            return -1 !== this._indexOfListener(e, t)
        }, add: function (e, t, i) {
            return n(e, "add"), this._registerListener(e, !1, t, i)
        }, addOnce: function (e, t, i) {
            return n(e, "addOnce"), this._registerListener(e, !0, t, i)
        }, remove: function (e, t) {
            n(e, "remove");
            var i = this._indexOfListener(e, t);
            return -1 !== i && (this._bindings[i]._destroy(), this._bindings.splice(i, 1)), e
        }, removeAll: function () {
            for (var e = this._bindings.length; e--;) this._bindings[e]._destroy();
            this._bindings.length = 0
        }, getNumListeners: function () {
            return this._bindings.length
        }, halt: function () {
            this._shouldPropagate = !1
        }, dispatch: function (e) {
            if (this.active) {
                var t, n = Array.prototype.slice.call(arguments), i = this._bindings.length;
                if (this.memorize && (this._prevParams = n), i) {
                    t = this._bindings.slice(), this._shouldPropagate = !0;
                    do {
                        i--
                    } while (t[i] && this._shouldPropagate && !1 !== t[i].execute(n))
                }
            }
        }, forget: function () {
            this._prevParams = null
        }, dispose: function () {
            this.removeAll(), delete this._bindings, delete this._prevParams
        }, toString: function () {
            return "[Signal active:" + this.active + " numListeners:" + this.getNumListeners() + "]"
        }
    };
    var r = i;
    r.Signal = i, "function" == typeof define && define.amd ? define("signals", [], function () {
        return r
    }) : "undefined" != typeof module && module.exports ? module.exports = r : e.signals = r
}(this), function () {
    var e = function (e) {
        return function (t) {
            function n(e) {
                return String(e || "").replace(/\W/g, "\\$&")
            }

            function i(e) {
                if (!e) return "";
                var t = new RegExp("^" + n(f.prependHash) + "|" + n(f.appendHash) + "$", "g");
                return e.replace(t, "")
            }

            function r() {
                var e = x.exec(f.getURL()), t = e && e[1] || "";
                try {
                    return f.raw ? t : decodeURIComponent(t)
                } catch (e) {
                    return t
                }
            }

            function o() {
                return m ? m.contentWindow.frameHash : null
            }

            function a() {
                m = b.createElement("iframe"), m.src = "about:blank", m.style.display = "none", b.body.appendChild(m)
            }

            function s() {
                if (m && h !== o()) {
                    var e = m.contentWindow.document;
                    e.open(), e.write("<html><head><title>" + b.title + '</title><script type="text/javascript">var frameHash="' + h + '";<\/script></head><body>&nbsp;</body></html>'), e.close()
                }
            }

            function l(e, t) {
                if (h !== e) {
                    var n = h;
                    h = e, A && (t ? m.contentWindow.frameHash = e : s()), f.changed.dispatch(i(e), i(n))
                }
            }

            function u(e, t, n) {
                e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n)
            }

            function c(e, t, n) {
                e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent && e.detachEvent("on" + t, n)
            }

            function d(e) {
                e = Array.prototype.slice.call(arguments);
                var t = e.join(f.separator);
                return t = t ? f.prependHash + t.replace(T, "") + f.appendHash : t
            }

            function p(e) {
                return e = encodeURI(e), C && D && (e = e.replace(/\?/, "%3F")), e
            }

            var f, h, v, g, m, y, b = t.document, w = (t.history, e.Signal), x = /#(.*)$/, _ = /(\?.*)|(\#.*)/,
                T = /^\#/, C = !1, E = "onhashchange" in t && 7 !== b.documentMode, A = C && !E,
                D = "file:" === location.protocol;
            return y = A ? function () {
                var e = r(), t = o();
                t !== h && t !== e ? f.setHash(i(t)) : e !== h && l(e)
            } : function () {
                var e = r();
                e !== h && l(e)
            }, f = {
                VERSION: "1.2.0",
                raw: !1,
                appendHash: "",
                prependHash: "/",
                separator: "/",
                changed: new w,
                stopped: new w,
                initialized: new w,
                init: function () {
                    g || (h = r(), E ? u(t, "hashchange", y) : (A && (m || a(), s()), v = setInterval(y, 25)), g = !0, f.initialized.dispatch(i(h)))
                },
                stop: function () {
                    g && (E ? c(t, "hashchange", y) : (clearInterval(v), v = null), g = !1, f.stopped.dispatch(i(h)))
                },
                isActive: function () {
                    return g
                },
                getURL: function () {
                    return t.location.href
                },
                getBaseURL: function () {
                    return f.getURL().replace(_, "")
                },
                setHash: function (e) {
                    (e = d.apply(null, arguments)) !== h && (l(e), e === h && (f.raw || (e = p(e)), t.location.hash = "#" + e))
                },
                replaceHash: function (e) {
                    (e = d.apply(null, arguments)) !== h && (l(e, !0), e === h && (f.raw || (e = p(e)), t.location.replace("#" + e)))
                },
                getHash: function () {
                    return i(h)
                },
                getHashAsArray: function () {
                    return f.getHash().split(f.separator)
                },
                dispose: function () {
                    f.stop(), f.initialized.dispose(), f.stopped.dispose(), f.changed.dispose(), m = f = t.hasher = null
                },
                toString: function () {
                    return '[hasher version="' + f.VERSION + '" hash="' + f.getHash() + '"]'
                }
            }, f.initialized.memorize = !0, f
        }(window)
    };
    "function" == typeof define && define.amd ? define("hasher", ["signals"], e) : "object" == typeof exports ? module.exports = e(require("signals")) : window.hasher = e(window.signals)
}(), define("docTool/hashHelper", ["require", "hasher", "dt/lib"], function (e) {
    var t = e("hasher"), n = e("dt/lib"), i = {};
    return i.initHash = function (e) {
        t.prependHash = "", t.initialized.add(e), t.changed.add(e), t.init()
    }, i.parseHash = function (e) {
        n.assert(t.isActive());
        var i = {};
        if (e) {
            var r = /^#?(?:([^~]*)~)?(.*)$/.exec(e);
            i.category = r[1], i.queryString = r[2]
        }
        return i
    }, i.getHashInfo = function () {
        return i.parseHash(t.getHash())
    }, i.hashRoute = function (e) {
        n.assert(t.isActive());
        var r = i.getHashInfo();
        n.assign(r, e);
        var o = "";
        r.category && (o += r.category + "~"), r.queryString && (o += r.queryString), t.setHash(o)
    }, i
}), function e(t, n, i) {
    function r(a, s) {
        if (!n[a]) {
            if (!t[a]) {
                var l = "function" == typeof require && require;
                if (!s && l) return l(a, !0);
                if (o) return o(a, !0);
                var u = new Error("Cannot find module '" + a + "'");
                throw u.code = "MODULE_NOT_FOUND", u
            }
            var c = n[a] = {exports: {}};
            t[a][0].call(c.exports, function (e) {
                var n = t[a][1][e];
                return r(n || e)
            }, c, c.exports, e, t, n, i)
        }
        return n[a].exports
    }

    for (var o = "function" == typeof require && require, a = 0; a < i.length; a++) r(i[a]);
    return r
}({
    1: [function (e, t, n) {
        var i = e("../main");
        "function" == typeof define && define.amd ? define("perfectScrollbar", i) : (window.PerfectScrollbar = i, void 0 === window.Ps && (window.Ps = i))
    }, {"../main": 7}],
    2: [function (e, t, n) {
        function i(e, t) {
            var n = e.className.split(" ");
            n.indexOf(t) < 0 && n.push(t), e.className = n.join(" ")
        }

        function r(e, t) {
            var n = e.className.split(" "), i = n.indexOf(t);
            i >= 0 && n.splice(i, 1), e.className = n.join(" ")
        }

        n.add = function (e, t) {
            e.classList ? e.classList.add(t) : i(e, t)
        }, n.remove = function (e, t) {
            e.classList ? e.classList.remove(t) : r(e, t)
        }, n.list = function (e) {
            return e.classList ? Array.prototype.slice.apply(e.classList) : e.className.split(" ")
        }
    }, {}],
    3: [function (e, t, n) {
        function i(e, t) {
            return window.getComputedStyle(e)[t]
        }

        function r(e, t, n) {
            return "number" == typeof n && (n = n.toString() + "px"), e.style[t] = n, e
        }

        function o(e, t) {
            for (var n in t) {
                var i = t[n];
                "number" == typeof i && (i = i.toString() + "px"), e.style[n] = i
            }
            return e
        }

        var a = {};
        a.e = function (e, t) {
            var n = document.createElement(e);
            return n.className = t, n
        }, a.appendTo = function (e, t) {
            return t.appendChild(e), e
        }, a.css = function (e, t, n) {
            return "object" == typeof t ? o(e, t) : void 0 === n ? i(e, t) : r(e, t, n)
        }, a.matches = function (e, t) {
            return void 0 !== e.matches ? e.matches(t) : void 0 !== e.matchesSelector ? e.matchesSelector(t) : void 0 !== e.webkitMatchesSelector ? e.webkitMatchesSelector(t) : void 0 !== e.mozMatchesSelector ? e.mozMatchesSelector(t) : void 0 !== e.msMatchesSelector ? e.msMatchesSelector(t) : void 0
        }, a.remove = function (e) {
            void 0 !== e.remove ? e.remove() : e.parentNode && e.parentNode.removeChild(e)
        }, a.queryChildren = function (e, t) {
            return Array.prototype.filter.call(e.childNodes, function (e) {
                return a.matches(e, t)
            })
        }, t.exports = a
    }, {}],
    4: [function (e, t, n) {
        var i = function (e) {
            this.element = e, this.events = {}
        };
        i.prototype.bind = function (e, t) {
            void 0 === this.events[e] && (this.events[e] = []), this.events[e].push(t), this.element.addEventListener(e, t, !1)
        }, i.prototype.unbind = function (e, t) {
            var n = void 0 !== t;
            this.events[e] = this.events[e].filter(function (i) {
                return !(!n || i === t) || (this.element.removeEventListener(e, i, !1), !1)
            }, this)
        }, i.prototype.unbindAll = function () {
            for (var e in this.events) this.unbind(e)
        };
        var r = function () {
            this.eventElements = []
        };
        r.prototype.eventElement = function (e) {
            var t = this.eventElements.filter(function (t) {
                return t.element === e
            })[0];
            return void 0 === t && (t = new i(e), this.eventElements.push(t)), t
        }, r.prototype.bind = function (e, t, n) {
            this.eventElement(e).bind(t, n)
        }, r.prototype.unbind = function (e, t, n) {
            this.eventElement(e).unbind(t, n)
        }, r.prototype.unbindAll = function () {
            for (var e = 0; e < this.eventElements.length; e++) this.eventElements[e].unbindAll()
        }, r.prototype.once = function (e, t, n) {
            var i = this.eventElement(e), r = function (e) {
                i.unbind(t, r), n(e)
            };
            i.bind(t, r)
        }, t.exports = r
    }, {}],
    5: [function (e, t, n) {
        t.exports = function () {
            function e() {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
            }

            return function () {
                return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
            }
        }()
    }, {}],
    6: [function (e, t, n) {
        var i = e("./class"), r = e("./dom");
        n.toInt = function (e) {
            return parseInt(e, 10) || 0
        }, n.clone = function (e) {
            if (null === e) return null;
            if ("object" == typeof e) {
                var t = {};
                for (var n in e) t[n] = this.clone(e[n]);
                return t
            }
            return e
        }, n.extend = function (e, t) {
            var n = this.clone(e);
            for (var i in t) n[i] = this.clone(t[i]);
            return n
        }, n.isEditable = function (e) {
            return r.matches(e, "input,[contenteditable]") || r.matches(e, "select,[contenteditable]") || r.matches(e, "textarea,[contenteditable]") || r.matches(e, "button,[contenteditable]")
        }, n.removePsClasses = function (e) {
            for (var t = i.list(e), n = 0; n < t.length; n++) {
                var r = t[n];
                0 === r.indexOf("ps-") && i.remove(e, r)
            }
        }, n.outerWidth = function (e) {
            return this.toInt(r.css(e, "width")) + this.toInt(r.css(e, "paddingLeft")) + this.toInt(r.css(e, "paddingRight")) + this.toInt(r.css(e, "borderLeftWidth")) + this.toInt(r.css(e, "borderRightWidth"))
        }, n.startScrolling = function (e, t) {
            i.add(e, "ps-in-scrolling"), void 0 !== t ? i.add(e, "ps-" + t) : (i.add(e, "ps-x"), i.add(e, "ps-y"))
        }, n.stopScrolling = function (e, t) {
            i.remove(e, "ps-in-scrolling"), void 0 !== t ? i.remove(e, "ps-" + t) : (i.remove(e, "ps-x"), i.remove(e, "ps-y"))
        }, n.env = {
            isWebKit: "WebkitAppearance" in document.documentElement.style,
            supportsTouch: "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
            supportsIePointer: null !== window.navigator.msMaxTouchPoints
        }
    }, {"./class": 2, "./dom": 3}],
    7: [function (e, t, n) {
        var i = e("./plugin/destroy"), r = e("./plugin/initialize"), o = e("./plugin/update");
        t.exports = {initialize: r, update: o, destroy: i}
    }, {"./plugin/destroy": 9, "./plugin/initialize": 17, "./plugin/update": 21}],
    8: [function (e, t, n) {
        t.exports = {
            maxScrollbarLength: null,
            minScrollbarLength: null,
            scrollXMarginOffset: 0,
            scrollYMarginOffset: 0,
            stopPropagationOnClick: !0,
            suppressScrollX: !1,
            suppressScrollY: !1,
            swipePropagation: !0,
            useBothWheelAxes: !1,
            useKeyboard: !0,
            useSelectionScroll: !1,
            wheelPropagation: !1,
            wheelSpeed: 1
        }
    }, {}],
    9: [function (e, t, n) {
        var i = e("../lib/dom"), r = e("../lib/helper"), o = e("./instances");
        t.exports = function (e) {
            var t = o.get(e);
            t && (t.event.unbindAll(), i.remove(t.scrollbarX), i.remove(t.scrollbarY), i.remove(t.scrollbarXRail), i.remove(t.scrollbarYRail), r.removePsClasses(e), o.remove(e))
        }
    }, {"../lib/dom": 3, "../lib/helper": 6, "./instances": 18}],
    10: [function (e, t, n) {
        function i(e, t) {
            function n(e) {
                return e.getBoundingClientRect()
            }

            var i = window.Event.prototype.stopPropagation.bind;
            t.settings.stopPropagationOnClick && t.event.bind(t.scrollbarY, "click", i), t.event.bind(t.scrollbarYRail, "click", function (i) {
                var o = r.toInt(t.scrollbarYHeight / 2),
                    l = t.railYRatio * (i.pageY - window.pageYOffset - n(t.scrollbarYRail).top - o),
                    u = t.railYRatio * (t.railYHeight - t.scrollbarYHeight), c = l / u;
                c < 0 ? c = 0 : c > 1 && (c = 1), s(e, "top", (t.contentHeight - t.containerHeight) * c), a(e), i.stopPropagation()
            }), t.settings.stopPropagationOnClick && t.event.bind(t.scrollbarX, "click", i), t.event.bind(t.scrollbarXRail, "click", function (i) {
                var o = r.toInt(t.scrollbarXWidth / 2),
                    l = t.railXRatio * (i.pageX - window.pageXOffset - n(t.scrollbarXRail).left - o),
                    u = t.railXRatio * (t.railXWidth - t.scrollbarXWidth), c = l / u;
                c < 0 ? c = 0 : c > 1 && (c = 1), s(e, "left", (t.contentWidth - t.containerWidth) * c - t.negativeScrollAdjustment), a(e), i.stopPropagation()
            })
        }

        var r = e("../../lib/helper"), o = e("../instances"), a = e("../update-geometry"), s = e("../update-scroll");
        t.exports = function (e) {
            i(e, o.get(e))
        }
    }, {"../../lib/helper": 6, "../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
    11: [function (e, t, n) {
        function i(e, t) {
            function n(n) {
                var r = i + n * t.railXRatio,
                    o = Math.max(0, t.scrollbarXRail.getBoundingClientRect().left) + t.railXRatio * (t.railXWidth - t.scrollbarXWidth);
                t.scrollbarXLeft = r < 0 ? 0 : r > o ? o : r;
                var s = a.toInt(t.scrollbarXLeft * (t.contentWidth - t.containerWidth) / (t.containerWidth - t.railXRatio * t.scrollbarXWidth)) - t.negativeScrollAdjustment;
                u(e, "left", s)
            }

            var i = null, r = null, s = function (t) {
                n(t.pageX - r), l(e), t.stopPropagation(), t.preventDefault()
            }, c = function () {
                a.stopScrolling(e, "x"), t.event.unbind(t.ownerDocument, "mousemove", s)
            };
            t.event.bind(t.scrollbarX, "mousedown", function (n) {
                r = n.pageX, i = a.toInt(o.css(t.scrollbarX, "left")) * t.railXRatio, a.startScrolling(e, "x"), t.event.bind(t.ownerDocument, "mousemove", s), t.event.once(t.ownerDocument, "mouseup", c), n.stopPropagation(), n.preventDefault()
            })
        }

        function r(e, t) {
            function n(n) {
                var r = i + n * t.railYRatio,
                    o = Math.max(0, t.scrollbarYRail.getBoundingClientRect().top) + t.railYRatio * (t.railYHeight - t.scrollbarYHeight);
                t.scrollbarYTop = r < 0 ? 0 : r > o ? o : r;
                var s = a.toInt(t.scrollbarYTop * (t.contentHeight - t.containerHeight) / (t.containerHeight - t.railYRatio * t.scrollbarYHeight));
                u(e, "top", s)
            }

            var i = null, r = null, s = function (t) {
                n(t.pageY - r), l(e), t.stopPropagation(), t.preventDefault()
            }, c = function () {
                a.stopScrolling(e, "y"), t.event.unbind(t.ownerDocument, "mousemove", s)
            };
            t.event.bind(t.scrollbarY, "mousedown", function (n) {
                r = n.pageY, i = a.toInt(o.css(t.scrollbarY, "top")) * t.railYRatio, a.startScrolling(e, "y"), t.event.bind(t.ownerDocument, "mousemove", s), t.event.once(t.ownerDocument, "mouseup", c), n.stopPropagation(), n.preventDefault()
            })
        }

        var o = e("../../lib/dom"), a = e("../../lib/helper"), s = e("../instances"), l = e("../update-geometry"),
            u = e("../update-scroll");
        t.exports = function (e) {
            var t = s.get(e);
            i(e, t), r(e, t)
        }
    }, {
        "../../lib/dom": 3,
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    12: [function (e, t, n) {
        function i(e, t) {
            function n(n, i) {
                var r = e.scrollTop;
                if (0 === n) {
                    if (!t.scrollbarYActive) return !1;
                    if (0 === r && i > 0 || r >= t.contentHeight - t.containerHeight && i < 0) return !t.settings.wheelPropagation
                }
                var o = e.scrollLeft;
                if (0 === i) {
                    if (!t.scrollbarXActive) return !1;
                    if (0 === o && n < 0 || o >= t.contentWidth - t.containerWidth && n > 0) return !t.settings.wheelPropagation
                }
                return !0
            }

            var i = !1;
            t.event.bind(e, "mouseenter", function () {
                i = !0
            }), t.event.bind(e, "mouseleave", function () {
                i = !1
            });
            var o = !1;
            t.event.bind(t.ownerDocument, "keydown", function (l) {
                if ((!l.isDefaultPrevented || !l.isDefaultPrevented()) && i) {
                    var u = document.activeElement ? document.activeElement : t.ownerDocument.activeElement;
                    if (u) {
                        for (; u.shadowRoot;) u = u.shadowRoot.activeElement;
                        if (r.isEditable(u)) return
                    }
                    var c = 0, d = 0;
                    switch (l.which) {
                        case 37:
                            c = -30;
                            break;
                        case 38:
                            d = 30;
                            break;
                        case 39:
                            c = 30;
                            break;
                        case 40:
                            d = -30;
                            break;
                        case 33:
                            d = 90;
                            break;
                        case 32:
                            d = l.shiftKey ? 90 : -90;
                            break;
                        case 34:
                            d = -90;
                            break;
                        case 35:
                            d = l.ctrlKey ? -t.contentHeight : -t.containerHeight;
                            break;
                        case 36:
                            d = l.ctrlKey ? e.scrollTop : t.containerHeight;
                            break;
                        default:
                            return
                    }
                    s(e, "top", e.scrollTop - d), s(e, "left", e.scrollLeft + c), a(e), o = n(c, d), o && l.preventDefault()
                }
            })
        }

        var r = e("../../lib/helper"), o = e("../instances"), a = e("../update-geometry"), s = e("../update-scroll");
        t.exports = function (e) {
            i(e, o.get(e))
        }
    }, {"../../lib/helper": 6, "../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
    13: [function (e, t, n) {
        function i(e, t) {
            function n(n, i) {
                var r = e.scrollTop;
                if (0 === n) {
                    if (!t.scrollbarYActive) return !1;
                    if (0 === r && i > 0 || r >= t.contentHeight - t.containerHeight && i < 0) return !t.settings.wheelPropagation
                }
                var o = e.scrollLeft;
                if (0 === i) {
                    if (!t.scrollbarXActive) return !1;
                    if (0 === o && n < 0 || o >= t.contentWidth - t.containerWidth && n > 0) return !t.settings.wheelPropagation
                }
                return !0
            }

            function i(e) {
                var t = e.deltaX, n = -1 * e.deltaY;
                return void 0 !== t && void 0 !== n || (t = -1 * e.wheelDeltaX / 6, n = e.wheelDeltaY / 6), e.deltaMode && 1 === e.deltaMode && (t *= 10, n *= 10), t !== t && n !== n && (t = 0, n = e.wheelDelta), [t, n]
            }

            function r(t, n) {
                var i = e.querySelector("textarea:hover");
                if (i) {
                    var r = i.scrollHeight - i.clientHeight;
                    if (r > 0 && !(0 === i.scrollTop && n > 0 || i.scrollTop === r && n < 0)) return !0;
                    var o = i.scrollLeft - i.clientWidth;
                    if (o > 0 && !(0 === i.scrollLeft && t < 0 || i.scrollLeft === o && t > 0)) return !0
                }
                return !1
            }

            function s(s) {
                var u = i(s), c = u[0], d = u[1];
                r(c, d) || (l = !1, t.settings.useBothWheelAxes ? t.scrollbarYActive && !t.scrollbarXActive ? (d ? a(e, "top", e.scrollTop - d * t.settings.wheelSpeed) : a(e, "top", e.scrollTop + c * t.settings.wheelSpeed), l = !0) : t.scrollbarXActive && !t.scrollbarYActive && (c ? a(e, "left", e.scrollLeft + c * t.settings.wheelSpeed) : a(e, "left", e.scrollLeft - d * t.settings.wheelSpeed), l = !0) : (a(e, "top", e.scrollTop - d * t.settings.wheelSpeed), a(e, "left", e.scrollLeft + c * t.settings.wheelSpeed)), o(e), (l = l || n(c, d)) && (s.stopPropagation(), s.preventDefault()))
            }

            var l = !1;
            void 0 !== window.onwheel ? t.event.bind(e, "wheel", s) : void 0 !== window.onmousewheel && t.event.bind(e, "mousewheel", s)
        }

        var r = e("../instances"), o = e("../update-geometry"), a = e("../update-scroll");
        t.exports = function (e) {
            i(e, r.get(e))
        }
    }, {"../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
    14: [function (e, t, n) {
        function i(e, t) {
            t.event.bind(e, "scroll", function () {
                o(e)
            })
        }

        var r = e("../instances"), o = e("../update-geometry");
        t.exports = function (e) {
            i(e, r.get(e))
        }
    }, {"../instances": 18, "../update-geometry": 19}],
    15: [function (e, t, n) {
        function i(e, t) {
            function n() {
                var e = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : "";
                return 0 === e.toString().length ? null : e.getRangeAt(0).commonAncestorContainer
            }

            function i() {
                u || (u = setInterval(function () {
                    if (!o.get(e)) return void clearInterval(u);
                    s(e, "top", e.scrollTop + c.top), s(e, "left", e.scrollLeft + c.left), a(e)
                }, 50))
            }

            function l() {
                u && (clearInterval(u), u = null), r.stopScrolling(e)
            }

            var u = null, c = {top: 0, left: 0}, d = !1;
            t.event.bind(t.ownerDocument, "selectionchange", function () {
                e.contains(n()) ? d = !0 : (d = !1, l())
            }), t.event.bind(window, "mouseup", function () {
                d && (d = !1, l())
            }), t.event.bind(window, "mousemove", function (t) {
                if (d) {
                    var n = {x: t.pageX, y: t.pageY}, o = {
                        left: e.offsetLeft,
                        right: e.offsetLeft + e.offsetWidth,
                        top: e.offsetTop,
                        bottom: e.offsetTop + e.offsetHeight
                    };
                    n.x < o.left + 3 ? (c.left = -5, r.startScrolling(e, "x")) : n.x > o.right - 3 ? (c.left = 5, r.startScrolling(e, "x")) : c.left = 0, n.y < o.top + 3 ? (c.top = o.top + 3 - n.y < 5 ? -5 : -20, r.startScrolling(e, "y")) : n.y > o.bottom - 3 ? (c.top = n.y - o.bottom + 3 < 5 ? 5 : 20, r.startScrolling(e, "y")) : c.top = 0, 0 === c.top && 0 === c.left ? l() : i()
                }
            })
        }

        var r = e("../../lib/helper"), o = e("../instances"), a = e("../update-geometry"), s = e("../update-scroll");
        t.exports = function (e) {
            i(e, o.get(e))
        }
    }, {"../../lib/helper": 6, "../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
    16: [function (e, t, n) {
        function i(e, t, n, i) {
            function s(n, i) {
                var r = e.scrollTop, o = e.scrollLeft, a = Math.abs(n), s = Math.abs(i);
                if (s > a) {
                    if (i < 0 && r === t.contentHeight - t.containerHeight || i > 0 && 0 === r) return !t.settings.swipePropagation
                } else if (a > s && (n < 0 && o === t.contentWidth - t.containerWidth || n > 0 && 0 === o)) return !t.settings.swipePropagation;
                return !0
            }

            function l(t, n) {
                a(e, "top", e.scrollTop - n), a(e, "left", e.scrollLeft - t), o(e)
            }

            function u() {
                w = !0
            }

            function c() {
                w = !1
            }

            function d(e) {
                return e.targetTouches ? e.targetTouches[0] : e
            }

            function p(e) {
                return !(!e.targetTouches || 1 !== e.targetTouches.length) || !(!e.pointerType || "mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE)
            }

            function f(e) {
                if (p(e)) {
                    x = !0;
                    var t = d(e);
                    g.pageX = t.pageX, g.pageY = t.pageY, m = (new Date).getTime(), null !== b && clearInterval(b), e.stopPropagation()
                }
            }

            function h(e) {
                if (!w && x && p(e)) {
                    var t = d(e), n = {pageX: t.pageX, pageY: t.pageY}, i = n.pageX - g.pageX, r = n.pageY - g.pageY;
                    l(i, r), g = n;
                    var o = (new Date).getTime(), a = o - m;
                    a > 0 && (y.x = i / a, y.y = r / a, m = o), s(i, r) && (e.stopPropagation(), e.preventDefault())
                }
            }

            function v() {
                !w && x && (x = !1, clearInterval(b), b = setInterval(function () {
                    return r.get(e) ? Math.abs(y.x) < .01 && Math.abs(y.y) < .01 ? void clearInterval(b) : (l(30 * y.x, 30 * y.y), y.x *= .8, void (y.y *= .8)) : void clearInterval(b)
                }, 10))
            }

            var g = {}, m = 0, y = {}, b = null, w = !1, x = !1;
            n && (t.event.bind(window, "touchstart", u), t.event.bind(window, "touchend", c), t.event.bind(e, "touchstart", f), t.event.bind(e, "touchmove", h), t.event.bind(e, "touchend", v)), i && (window.PointerEvent ? (t.event.bind(window, "pointerdown", u), t.event.bind(window, "pointerup", c), t.event.bind(e, "pointerdown", f), t.event.bind(e, "pointermove", h), t.event.bind(e, "pointerup", v)) : window.MSPointerEvent && (t.event.bind(window, "MSPointerDown", u), t.event.bind(window, "MSPointerUp", c), t.event.bind(e, "MSPointerDown", f), t.event.bind(e, "MSPointerMove", h), t.event.bind(e, "MSPointerUp", v)))
        }

        var r = e("../instances"), o = e("../update-geometry"), a = e("../update-scroll");
        t.exports = function (e, t, n) {
            i(e, r.get(e), t, n)
        }
    }, {"../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
    17: [function (e, t, n) {
        var i = e("../lib/class"), r = e("../lib/helper"), o = e("./instances"), a = e("./update-geometry"),
            s = e("./handler/click-rail"), l = e("./handler/drag-scrollbar"), u = e("./handler/keyboard"),
            c = e("./handler/mouse-wheel"), d = e("./handler/native-scroll"), p = e("./handler/selection"),
            f = e("./handler/touch");
        t.exports = function (e, t) {
            t = "object" == typeof t ? t : {}, i.add(e, "ps-container");
            var n = o.add(e);
            n.settings = r.extend(n.settings, t), s(e), l(e), c(e), d(e), n.settings.useSelectionScroll && p(e), (r.env.supportsTouch || r.env.supportsIePointer) && f(e, r.env.supportsTouch, r.env.supportsIePointer), n.settings.useKeyboard && u(e), a(e)
        }
    }, {
        "../lib/class": 2,
        "../lib/helper": 6,
        "./handler/click-rail": 10,
        "./handler/drag-scrollbar": 11,
        "./handler/keyboard": 12,
        "./handler/mouse-wheel": 13,
        "./handler/native-scroll": 14,
        "./handler/selection": 15,
        "./handler/touch": 16,
        "./instances": 18,
        "./update-geometry": 19
    }],
    18: [function (e, t, n) {
        function i(e) {
            var t = this;
            t.settings = d.clone(l), t.containerWidth = null, t.containerHeight = null, t.contentWidth = null, t.contentHeight = null, t.isRtl = "rtl" === s.css(e, "direction"), t.isNegativeScroll = function () {
                var t = e.scrollLeft, n = null;
                return e.scrollLeft = -1, n = e.scrollLeft < 0, e.scrollLeft = t, n
            }(), t.negativeScrollAdjustment = t.isNegativeScroll ? e.scrollWidth - e.clientWidth : 0, t.event = new u, t.ownerDocument = e.ownerDocument || document, t.scrollbarXRail = s.appendTo(s.e("div", "ps-scrollbar-x-rail"), e), t.scrollbarX = s.appendTo(s.e("div", "ps-scrollbar-x"), t.scrollbarXRail), t.scrollbarX.setAttribute("tabindex", 0), t.scrollbarXActive = null, t.scrollbarXWidth = null, t.scrollbarXLeft = null, t.scrollbarXBottom = d.toInt(s.css(t.scrollbarXRail, "bottom")), t.isScrollbarXUsingBottom = t.scrollbarXBottom === t.scrollbarXBottom, t.scrollbarXTop = t.isScrollbarXUsingBottom ? null : d.toInt(s.css(t.scrollbarXRail, "top")), t.railBorderXWidth = d.toInt(s.css(t.scrollbarXRail, "borderLeftWidth")) + d.toInt(s.css(t.scrollbarXRail, "borderRightWidth")), s.css(t.scrollbarXRail, "display", "block"), t.railXMarginWidth = d.toInt(s.css(t.scrollbarXRail, "marginLeft")) + d.toInt(s.css(t.scrollbarXRail, "marginRight")), s.css(t.scrollbarXRail, "display", ""), t.railXWidth = null, t.railXRatio = null, t.scrollbarYRail = s.appendTo(s.e("div", "ps-scrollbar-y-rail"), e), t.scrollbarY = s.appendTo(s.e("div", "ps-scrollbar-y"), t.scrollbarYRail), t.scrollbarY.setAttribute("tabindex", 0), t.scrollbarYActive = null, t.scrollbarYHeight = null, t.scrollbarYTop = null, t.scrollbarYRight = d.toInt(s.css(t.scrollbarYRail, "right")), t.isScrollbarYUsingRight = t.scrollbarYRight === t.scrollbarYRight, t.scrollbarYLeft = t.isScrollbarYUsingRight ? null : d.toInt(s.css(t.scrollbarYRail, "left")), t.scrollbarYOuterWidth = t.isRtl ? d.outerWidth(t.scrollbarY) : null, t.railBorderYWidth = d.toInt(s.css(t.scrollbarYRail, "borderTopWidth")) + d.toInt(s.css(t.scrollbarYRail, "borderBottomWidth")), s.css(t.scrollbarYRail, "display", "block"), t.railYMarginHeight = d.toInt(s.css(t.scrollbarYRail, "marginTop")) + d.toInt(s.css(t.scrollbarYRail, "marginBottom")), s.css(t.scrollbarYRail, "display", ""), t.railYHeight = null, t.railYRatio = null
        }

        function r(e) {
            return void 0 === e.dataset ? e.getAttribute("data-ps-id") : e.dataset.psId
        }

        function o(e, t) {
            void 0 === e.dataset ? e.setAttribute("data-ps-id", t) : e.dataset.psId = t
        }

        function a(e) {
            void 0 === e.dataset ? e.removeAttribute("data-ps-id") : delete e.dataset.psId
        }

        var s = e("../lib/dom"), l = e("./default-setting"), u = e("../lib/event-manager"), c = e("../lib/guid"),
            d = e("../lib/helper"), p = {};
        n.add = function (e) {
            var t = c();
            return o(e, t), p[t] = new i(e), p[t]
        }, n.remove = function (e) {
            delete p[r(e)], a(e)
        }, n.get = function (e) {
            return p[r(e)]
        }
    }, {"../lib/dom": 3, "../lib/event-manager": 4, "../lib/guid": 5, "../lib/helper": 6, "./default-setting": 8}],
    19: [function (e, t, n) {
        function i(e, t) {
            return e.settings.minScrollbarLength && (t = Math.max(t, e.settings.minScrollbarLength)), e.settings.maxScrollbarLength && (t = Math.min(t, e.settings.maxScrollbarLength)), t
        }

        function r(e, t) {
            var n = {width: t.railXWidth};
            t.isRtl ? n.left = t.negativeScrollAdjustment + e.scrollLeft + t.containerWidth - t.contentWidth : n.left = e.scrollLeft, t.isScrollbarXUsingBottom ? n.bottom = t.scrollbarXBottom - e.scrollTop : n.top = t.scrollbarXTop + e.scrollTop, a.css(t.scrollbarXRail, n);
            var i = {top: e.scrollTop, height: t.railYHeight};
            t.isScrollbarYUsingRight ? t.isRtl ? i.right = t.contentWidth - (t.negativeScrollAdjustment + e.scrollLeft) - t.scrollbarYRight - t.scrollbarYOuterWidth : i.right = t.scrollbarYRight - e.scrollLeft : t.isRtl ? i.left = t.negativeScrollAdjustment + e.scrollLeft + 2 * t.containerWidth - t.contentWidth - t.scrollbarYLeft - t.scrollbarYOuterWidth : i.left = t.scrollbarYLeft + e.scrollLeft, a.css(t.scrollbarYRail, i), a.css(t.scrollbarX, {
                left: t.scrollbarXLeft,
                width: t.scrollbarXWidth - t.railBorderXWidth
            }), a.css(t.scrollbarY, {top: t.scrollbarYTop, height: t.scrollbarYHeight - t.railBorderYWidth})
        }

        var o = e("../lib/class"), a = e("../lib/dom"), s = e("../lib/helper"), l = e("./instances"),
            u = e("./update-scroll");
        t.exports = function (e) {
            var t = l.get(e);
            t.containerWidth = e.clientWidth, t.containerHeight = e.clientHeight, t.contentWidth = e.scrollWidth, t.contentHeight = e.scrollHeight;
            var n;
            e.contains(t.scrollbarXRail) || (n = a.queryChildren(e, ".ps-scrollbar-x-rail"), n.length > 0 && n.forEach(function (e) {
                a.remove(e)
            }), a.appendTo(t.scrollbarXRail, e)), e.contains(t.scrollbarYRail) || (n = a.queryChildren(e, ".ps-scrollbar-y-rail"), n.length > 0 && n.forEach(function (e) {
                a.remove(e)
            }), a.appendTo(t.scrollbarYRail, e)), !t.settings.suppressScrollX && t.containerWidth + t.settings.scrollXMarginOffset < t.contentWidth ? (t.scrollbarXActive = !0, t.railXWidth = t.containerWidth - t.railXMarginWidth, t.railXRatio = t.containerWidth / t.railXWidth, t.scrollbarXWidth = i(t, s.toInt(t.railXWidth * t.containerWidth / t.contentWidth)), t.scrollbarXLeft = s.toInt((t.negativeScrollAdjustment + e.scrollLeft) * (t.railXWidth - t.scrollbarXWidth) / (t.contentWidth - t.containerWidth))) : t.scrollbarXActive = !1, !t.settings.suppressScrollY && t.containerHeight + t.settings.scrollYMarginOffset < t.contentHeight ? (t.scrollbarYActive = !0, t.railYHeight = t.containerHeight - t.railYMarginHeight, t.railYRatio = t.containerHeight / t.railYHeight, t.scrollbarYHeight = i(t, s.toInt(t.railYHeight * t.containerHeight / t.contentHeight)), t.scrollbarYTop = s.toInt(e.scrollTop * (t.railYHeight - t.scrollbarYHeight) / (t.contentHeight - t.containerHeight))) : t.scrollbarYActive = !1, t.scrollbarXLeft >= t.railXWidth - t.scrollbarXWidth && (t.scrollbarXLeft = t.railXWidth - t.scrollbarXWidth), t.scrollbarYTop >= t.railYHeight - t.scrollbarYHeight && (t.scrollbarYTop = t.railYHeight - t.scrollbarYHeight), r(e, t), t.scrollbarXActive ? o.add(e, "ps-active-x") : (o.remove(e, "ps-active-x"), t.scrollbarXWidth = 0, t.scrollbarXLeft = 0, u(e, "left", 0)), t.scrollbarYActive ? o.add(e, "ps-active-y") : (o.remove(e, "ps-active-y"), t.scrollbarYHeight = 0, t.scrollbarYTop = 0, u(e, "top", 0))
        }
    }, {"../lib/class": 2, "../lib/dom": 3, "../lib/helper": 6, "./instances": 18, "./update-scroll": 20}],
    20: [function (e, t, n) {
        var i, r, o = e("./instances"), a = document.createEvent("Event"), s = document.createEvent("Event"),
            l = document.createEvent("Event"), u = document.createEvent("Event"), c = document.createEvent("Event"),
            d = document.createEvent("Event"), p = document.createEvent("Event"), f = document.createEvent("Event"),
            h = document.createEvent("Event"), v = document.createEvent("Event");
        a.initEvent("ps-scroll-up", !0, !0), s.initEvent("ps-scroll-down", !0, !0), l.initEvent("ps-scroll-left", !0, !0), u.initEvent("ps-scroll-right", !0, !0), c.initEvent("ps-scroll-y", !0, !0), d.initEvent("ps-scroll-x", !0, !0), p.initEvent("ps-x-reach-start", !0, !0), f.initEvent("ps-x-reach-end", !0, !0), h.initEvent("ps-y-reach-start", !0, !0), v.initEvent("ps-y-reach-end", !0, !0), t.exports = function (e, t, n) {
            if (void 0 === e) throw"You must provide an element to the update-scroll function";
            if (void 0 === t) throw"You must provide an axis to the update-scroll function";
            if (void 0 === n) throw"You must provide a value to the update-scroll function";
            if ("top" === t && n <= 0) return e.scrollTop = 0, void e.dispatchEvent(h);
            if ("left" === t && n <= 0) return e.scrollLeft = 0, void e.dispatchEvent(p);
            var g = o.get(e);
            return "top" === t && n >= g.contentHeight - g.containerHeight ? (e.scrollTop = g.contentHeight - g.containerHeight, void e.dispatchEvent(v)) : "left" === t && n >= g.contentWidth - g.containerWidth ? (e.scrollLeft = g.contentWidth - g.containerWidth, void e.dispatchEvent(f)) : (i || (i = e.scrollTop), r || (r = e.scrollLeft), "top" === t && n < i && e.dispatchEvent(a), "top" === t && n > i && e.dispatchEvent(s), "left" === t && n < r && e.dispatchEvent(l), "left" === t && n > r && e.dispatchEvent(u), "top" === t && (e.scrollTop = i = n, e.dispatchEvent(c)), void ("left" === t && (e.scrollLeft = r = n, e.dispatchEvent(d))))
        }
    }, {"./instances": 18}],
    21: [function (e, t, n) {
        var i = e("../lib/dom"), r = e("../lib/helper"), o = e("./instances"), a = e("./update-geometry"),
            s = e("./update-scroll");
        t.exports = function (e) {
            var t = o.get(e);
            t && (t.negativeScrollAdjustment = t.isNegativeScroll ? e.scrollWidth - e.clientWidth : 0, i.css(t.scrollbarXRail, "display", "block"), i.css(t.scrollbarYRail, "display", "block"), t.railXMarginWidth = r.toInt(i.css(t.scrollbarXRail, "marginLeft")) + r.toInt(i.css(t.scrollbarXRail, "marginRight")), t.railYMarginHeight = r.toInt(i.css(t.scrollbarYRail, "marginTop")) + r.toInt(i.css(t.scrollbarYRail, "marginBottom")), i.css(t.scrollbarXRail, "display", "none"), i.css(t.scrollbarYRail, "display", "none"), a(e), s(e, "top", e.scrollTop), s(e, "left", e.scrollLeft), i.css(t.scrollbarXRail, "display", ""), i.css(t.scrollbarYRail, "display", ""))
        }
    }, {"../lib/dom": 3, "../lib/helper": 6, "./instances": 18, "./update-geometry": 19, "./update-scroll": 20}]
}, {}, [1]), define("dt/ui/Text", ["require", "../lib", "./Component"], function (e) {
    var t = e("../lib");
    return e("./Component").extend({
        _define: {
            css: "dtui-tx", viewModel: function () {
                return {value: t.ob(""), encodeHTML: t.ob(!0)}
            }, viewModelPublic: ["value", "encodeHTML"]
        }, _init: function () {
            function e() {
                var e = i();
                r() && (e = t.encodeHTML(this._stringify(e))), this.el().innerHTML = e
            }

            var n = this._viewModel(), i = n.value, r = n.encodeHTML;
            n.value.subscribe(e, this), n.encodeHTML.subscribe(e, this), e.call(this)
        }, _stringify: function (e) {
            return null == e ? "" : String(e)
        }, _dispose: function () {
            this.$el().html("")
        }
    })
}), define("dt/ui/TextInput", ["require", "jquery", "../lib", "./Component"], function (e) {
    var t = e("jquery"), n = e("../lib");
    return e("./Component").extend({
        _define: {
            css: "dtui-txipt", viewModel: function () {
                return {
                    value: n.ob(""),
                    mouseEnterSelect: !1,
                    type: "text",
                    placeholder: n.ob(""),
                    alert: n.ob(!1),
                    confirmPoint: {pressEnter: !0, blur: !0}
                }
            }, viewModelPublic: ["value", "placeholder", "text", "mouseEnterSelect", "type", "alert"]
        }, _init: function () {
            var e = this._viewModel(), i = e.type = e.type || "text", r = this.$el();
            r.addClass(this.getFullCss("textarea" === i ? "-type-textarea" : "-type-text").join(" "));
            var o = ("textarea" === i ? "<textarea></textarea>" : '<input type="text"/>') + '<span class="' + this.getFullCss("-alert-mark").join(" ") + '" style="display:none"></span><span class="' + this.getFullCss("-alert-text").join(" ") + '" style="display:none"></span>';
            this._$input = t(r.html(o)[0].firstChild), this._$input.on(this._event("mouseenter"), function () {
                n.peek(e.mouseEnterSelect) && this.select && this.select()
            }), this._initAlert(), this._initPlaceHolder(), this._initViewUpdater(), this._initModelUpdater()
        }, focus: function () {
            this._$input.focus()
        }, select: function () {
            this._$input.select()
        }, _initAlert: function () {
            function e(e) {
                var i = this.$el(), r = this.getFullCss("-alert").join(" ");
                e ? (i.addClass(r), "string" === t.type(e) && (u[0].innerHTML = n.encodeHTML(e), l.show())) : (i.removeClass(r), l.hide())
            }

            function i() {
                u.show()
            }

            function r() {
                u.hide()
            }

            var o = this.$el(), a = this.getFullCss("-alert-mark"), s = this.getFullCss("-alert-text"),
                l = this.$el("alertMark", o.find("." + a[a.length - 1])),
                u = this.$el("alertText", o.find("." + s[s.length - 1]));
            l.on(this._event("mouseenter"), i), l.on(this._event("mouseleave"), r), this._disposable(this._viewModel().alert.subscribe(e, this))
        }, _initPlaceHolder: function () {
            function e(e) {
                this._$input.attr("placeholder", e)
            }

            var t = this._viewModel().placeholder;
            "ob" === n.obTypeOf(t) ? (t.subscribe(e, this), e.call(this, t())) : null != t && e.call(this, t)
        }, _initViewUpdater: function () {
            function e(e) {
                n.val(e)
            }

            var t = this._viewModel(), n = this._$input;
            this._disposable(t.disabled.subscribe(function (e) {
                n[0].disabled = !!e
            }, this)), this._disposable(t.value.subscribe(e, this)), e(t.value())
        }, _initModelUpdater: function () {
            function e(e) {
                a.isDisabled() || "text" === i.type && 13 === e.which && (t(), e.preventDefault())
            }

            function t() {
                a.isDisabled() || (i.value(o.val(), n.valueInfoForConfirmed(r), {force: !0}), o.val(i.value()))
            }

            var i = this._viewModel(), r = this.uid(), o = this._$input, a = this, s = i.confirmPoint || {};
            s.blur && o.on(this._event("blur"), t), s.pressEnter && o.on(this._event("keypress"), e)
        }, _dispose: function () {
            this._$input.off(this._event()), this._$input = null, this.$el().html("")
        }
    })
}), define("dt/ui/CheckButton", ["require", "jquery", "../lib", "./Component"], function (e) {
    var t = e("jquery"), n = e("../lib"), i = e("./Component"), r = n.encodeHTML, o = "value-index";
    return i.extend({
        _define: {
            css: "dtui-chkbtn", viewModel: function () {
                return {checked: n.ob(), dataList: []}
            }, viewModelPublic: ["checked"]
        }, getDataItem: function (e) {
            var i = this._viewModel().dataList, r = n.arrayIndexOf(i, e, "value");
            return r >= 0 ? t.extend({}, i[r]) : null
        },
        _init: function () {
            n.assert(n.obTypeOf(this._viewModel().checked)), this._initContent(), this._initTooltip(), this._initChange(), this._initMouse()
        }, _getItemCss: function (e) {
            var t = {"": "-i", hover: "-i-hover", active: "-i-active"}[e || ""];
            return this.css() + t
        }, _initContent: function () {
            for (var e, t = this._viewModel().dataList, n = this._getItemCss(), i = [], a = 0; e = t[a]; a++) i.push('<span class="', n, '" data-', o, '="', a, '">', r(e.text), "</span>");
            this.el().innerHTML = i.join("")
        }, _initTooltip: function () {
            function e(e) {
                var n = i[t(e).data(o)], a = n.tooltip;
                if (null != a) return !1 !== n.tooltipEncodeHTML ? r(a) : a
            }

            var i = this._viewModel().dataList, a = {x: 0, y: -15, xAnchor: "center", yAnchor: "bottom"};
            this._disposable(n.bindTooltip({
                bindEl: this.el(),
                followMouse: !0,
                selector: "." + this._getItemCss(),
                location: a,
                text: e,
                encodeHTML: !1
            }))
        }, _initChange: function () {
            function e(e) {
                var s = n.obTypeOf(i.checked);
                r.each(function () {
                    var r = t(this), l = i.dataList[r.data(o)].value;
                    r[("obArray" === s ? n.arrayIndexOf(e, l) >= 0 : l === e) ? "addClass" : "removeClass"](a)
                })
            }

            var i = this._viewModel(), r = this.$el().find("." + this._getItemCss()), a = this._getItemCss("active");
            this._disposable(n.obSubscribe(i.checked, e)), e(i.checked())
        }, _initMouse: function () {
            function e() {
                s.disabled() || t(this).addClass(u)
            }

            function i() {
                t(this).removeClass(u)
            }

            function r() {
                if (!s.disabled()) {
                    var e = s.dataList[t(this).data(o)], i = e.value;
                    if ("obArray" === n.obTypeOf(s.checked)) {
                        var r = s.checked(), a = n.arrayIndexOf(r, i);
                        a >= 0 ? r.splice(a, 1) : r.push(i), i = r
                    }
                    s.checked(i, n.valueInfoForConfirmed(c, {dataItem: e}))
                }
            }

            var a = this.$el(), s = this._viewModel(), l = this._getItemCss(), u = this._getItemCss("hover"),
                c = this.uid();
            a.on(this._event("mouseenter"), "." + l, e), a.on(this._event("mouseleave"), "." + l, i), a.on(this._event("click"), "." + l, r)
        }
    })
}), define("dt/ui/TreeList", ["require", "jquery", "../lib", "./Component"], function (e) {
    function t(e) {
        return e
    }

    function n(e) {
        return null != e ? e : ""
    }

    var i, r = e("jquery"), o = e("../lib"), a = e("./Component"), s = o.encodeHTML, l = 200, u = "id-0";
    return a.extend({
        _define: {
            css: "dtui-treelist", viewModel: function () {
                return {
                    selected: o.ob(),
                    enhanceSelected: !0,
                    hovered: o.ob(),
                    enhanceHovered: !0,
                    highlighted: o.obArray(),
                    enhanceHighlighted: !0,
                    datasource: [],
                    resizeEvent: o.ob()
                }
            }, viewModelPublic: ["selected", "hovered", "highlighted", "resizeEvent"]
        }, _init: function () {
            var e = this._viewModel();
            o.assert(o.obTypeOf(e.selected)), o.assert("obArray" === o.obTypeOf(e.highlighted)), this._enhanceOb(), this._prepareDatasource(), this._initContent(), this._initChange(), this._initMouse()
        }, _enhanceOb: function () {
            var e = this._viewModel();
            if (e.enhanceSelected) {
                var t = e.selected;
                t.getTreeDataItem = r.proxy(this.findDataItemByOb, this, t)
            }
            if (e.enhanceHighlighted) {
                var n = e.highlighted;
                n.getTreeDataItem = r.proxy(this.findDataItemByOb, this, n)
            }
            if (e.enhanceHovered) {
                var i = e.hovered;
                i.getTreeDataItem = r.proxy(this.findDataItemByOb, this, i)
            }
        }, _getCss: function (e) {
            var t = {
                item: "-i",
                thumb: "-thumb",
                text: "-text",
                textActive: "-text-active",
                textHover: "-text-hover",
                textHighlight: "-text-highlight",
                list: "-list",
                parent: "-parent",
                collapsed: "-collapsed",
                expanded: "-expanded",
                post: "-post"
            }[e || ""];
            return this.css() + t
        }, _prepareDatasource: function () {
            var e = this._viewModel().datasource;
            this._containerMap = o.createLiteHashMap();
            var t = this._dataItemMap = o.createLiteHashMap(), n = this._levelMap = o.createLiteHashMap();
            this._travelData(e, function (e, i) {
                var r = e.value;
                t.set(r, e), n.set(r, i)
            })
        }, _initContent: function () {
            var e = this._viewModel().datasource;
            if (e && e.length) {
                var t = [e[0].value], n = e[0].children;
                n && n.length && t.push(n[0].value), this._build(e, null, o.createLiteHashMap(t), !0)
            }
        }, _initChange: function () {
            var e = this._viewModel(), t = e.selected;
            this._disposable(t.subscribe(this._updateSelectedByModel, this)), this._updateSelectedByModel(t(), t);
            var n = e.highlighted;
            this._disposable(n.subscribe(this._updateHighlightedByModel, this)), this._updateHighlightedByModel(n(), n)
        }, _initMouse: function () {
            function e(e) {
                if (!f.isFrozen()) {
                    r(this).addClass(c);
                    var t = f._findDataItemByEl(this);
                    l.hovered(t.value, {dataItem: t})
                }
            }

            function t(e) {
                f.isFrozen() || (r(this).removeClass(c), l.hovered(i))
            }

            function n(e) {
                if (!f.isFrozen()) {
                    var t = o.obTypeOf(l.selected), n = f._findDataItemByEl(this), i = n.value;
                    if ("obArray" === t) {
                        var r = l.selected(), a = o.arrayIndexOf(r, i);
                        a >= 0 ? r.splice(a, 1) : r.push(i), i = r
                    }
                    l.selected(i, {preventExpand: !0, dataItem: n})
                }
            }

            function a() {
                f.isFrozen() || f._toggleSingleItem(f._findItemEl(r(this)))
            }

            var s = this.$el(), l = this._viewModel(), u = this._getCss("item"), c = this._getCss("textHover"),
                d = this._getCss("text"), p = this._getCss("thumb"), f = this;
            s.on(this._event("mouseenter"), "." + d, "." + u, e), s.on(this._event("mouseleave"), "." + d, "." + u, t), s.on(this._event("click"), "." + d, n), s.on(this._event("click"), "." + p, a)
        }, _build: function (e, i, r, o) {
            function a(e, t) {
                if (e && e.length) {
                    for (var n, i = 0, o = e.length; i < o; i++) {
                        var s = e[i];
                        n |= s.__needRenderChildren = a(s.children, s), null != r.get(s.value) && (n = !0)
                    }
                    var c = m.get(t ? t.value : u);
                    if (n && c && !e.__rendered) {
                        var d = [];
                        l(e, t, d), c.innerHTML = d.join("");
                        for (var p = c.getElementsByTagName("ul"), i = 0; i < p.length; i++) {
                            var f = p[i];
                            m.set(f.getAttribute("data-id"), f)
                        }
                        n = !1
                    }
                    return n
                }
            }

            function l(e, i, r) {
                if (e && e.length) {
                    for (var a = 0; a < e.length; a++) {
                        var u = e[a], m = !1 !== u.itemEncodeHTML ? s : t,
                            y = u.children && u.children.length ? p + " " + h : "",
                            b = u.anchor ? ' name="' + u.anchor + '" ' : " ", w = m(n(u.text)), x = m(n(u.childrenPre)),
                            _ = m(n(u.childrenPost)), T = m(n(u.childrenBrief)), C = ' data-id="' + u.value + '" ';
                        if (r.push('<li class="', d, " ", y, '" ', C, ">", '<i class="', f, '"></i>', b, '<span class="', v, '" ', C, ">", w, x, T, _, "</span>"), u.children && u.children.length) {
                            var E = o ? "" : ' style="display:none" ';
                            r.push('<ul class="', c, '" ', C, E, ">"), u.__needRenderChildren && l(u.children, u, r), r.push("</ul>"), u.__needRenderChildren = null
                        }
                        r.push("</li>"), a === e.length - 1 && i && i.childrenPost && r.push('<li class="', g, '">', m(parent.childrenPost), "</li>")
                    }
                    e.__rendered = !0
                }
            }

            var c = this._getCss("list"), d = this._getCss("item"), p = this._getCss("parent"),
                f = this._getCss("thumb"), h = this._getCss("collapsed"), v = this._getCss("text"),
                c = this._getCss("list"), g = this._getCss("post"), m = this._containerMap;
            if (null == m.get(u)) {
                var y = this.$el()[0];
                y.innerHTML = '<ul class="' + c + '" data-id="' + u + '"></ul>', m.set(u, y.getElementsByTagName("ul")[0])
            }
            a(e, i)
        }, _updateSelectedByModel: function (e, t) {
            var n = this._viewModel(), i = o.obTypeOf(n.selected), a = this._getCss("textActive"), s = [], l = this;
            o.assert("obArray" !== i || r.isArray(e));
            var u = o.createLiteHashMap("obArray" === i ? e : e ? [e] : []);
            this._build(n.datasource, null, u), this._travelItemText(function (e, n) {
                u.hasOwnProperty(n) ? (e.addClass(a), t.peekValueInfo("preventExpand") || s.push(l._findItemEl(e))) : e.removeClass(a)
            }), this._showItems(r(s), {
                noAnimation: t.peekValueInfo("noAnimation"),
                collapseLevel: t.peekValueInfo("collapseLevel"),
                always: t.peekValueInfo("always"),
                scrollToTarget: t.peekValueInfo("scrollToTarget")
            })
        }, _updateHighlightedByModel: function (e, t) {
            var n = this._getCss("textHighlight"), i = [], a = this, s = o.createLiteHashMap(e);
            this._build(this._viewModel().datasource, null, s), this._travelItemText(function (e, r) {
                s.hasOwnProperty(r) ? (e.addClass(n), t.peekValueInfo("preventExpand") || i.push(a._findItemEl(e))) : e.removeClass(n)
            }), this._showItems(r(i), {
                noAnimation: t.peekValueInfo("noAnimation"),
                collapseLevel: t.peekValueInfo("collapseLevel"),
                always: t.peekValueInfo("always"),
                scrollToTarget: t.peekValueInfo("scrollToTarget")
            })
        }, _showItems: function (e, t) {
            function n() {
                this.isDisposed() || this._expandOrCollapse(o, "expand", {
                    noAnimation: t.noAnimation,
                    always: r.proxy(i, this)
                })
            }

            function i() {
                if (!this.isDisposed()) {
                    var n = r(e[0]), i = t.scrollToTarget;
                    i && n.length && (i.container || r("html,body")).animate({scrollTop: n.offset().top - (i.clientX || 30)}), t.always && t.always()
                }
            }

            t = t || {};
            var o = this._getAncestorItems(e);
            this._collapseAll({collapseLevel: t.collapseLevel, noAnimation: t.noAnimation, always: r.proxy(n, this)})
        }, _getAncestorItems: function (e) {
            var t = this, n = [];
            return e.each(function () {
                for (var e = r(this), i = t.css(), o = t._getCss("item"), a = e.parent(); a && a.length && !a.hasClass(i);) a.hasClass(o) && n.push(a[0]), a = a.parent()
            }), r(n)
        }, _getParentItem: function (e) {
            return e.parent().closest("." + this._getCss("item"))
        }, _travelItemText: function (e) {
            var t = this.$el().find("." + this._getCss("text")), n = this;
            t.each(function () {
                var t = r(this), i = n._findDataItemByEl(this).value;
                e.call(n, t, i)
            })
        }, _collapseAll: function (e) {
            function t() {
                !r.isDisposed() && e.always && e.always()
            }

            var n = e.collapseLevel, i = this._levelMap, r = this;
            if (null == n || n < 0) setTimeout(t, 0); else {
                var o = "." + this._getCss("item"), a = this.$el().find(o).filter(function () {
                    return i.get(this.getAttribute("data-id")) >= n
                });
                this._expandOrCollapse(a, "collapse", {noAnimation: e.noAnimation, always: t})
            }
        }, _expandOrCollapse: function (e, t, n) {
            function i(e) {
                h.isDisposed() || h._findElInItem(r(g.withAnimation), "list")[c](n.noAnimation ? 0 : l).promise().always(e)
            }

            function o(e) {
                h.isDisposed() || h._findElInItem(r(g.withoutAnimation), "list")[c](0).promise().always(e)
            }

            function a() {
                h.isDisposed() || ("collapse" === t && h._resetItemText(v), f.resizeEvent({}), n.always && n.always())
            }

            n = n || {};
            var s, u, c, d = this._getCss("collapsed"), p = this._getCss("expanded"), f = this._viewModel(), h = this;
            "expand" === t ? (s = d, u = p, c = "slideDown") : (s = p, u = d, c = "slideUp");
            var v = e.filter("." + s), g = {withAnimation: [], withoutAnimation: []};
            v.each(function () {
                h._getParentItem(r(this)).hasClass(p) ? g.withAnimation.push(this) : g.withoutAnimation.push(this)
            }), v.removeClass(s).addClass(u), "expand" === t && this._resetItemText(v), "expand" === t ? o(r.proxy(i, this, a)) : i(r.proxy(o, this, a))
        }, _toggleSingleItem: function (e) {
            function t(t) {
                this.isDisposed() || (t && this._resetItemText(e), a.resizeEvent({}))
            }

            var n = this._getCss("collapsed"), i = this._getCss("expanded"), a = this._viewModel(),
                s = this._findDataItemByEl(e[0]);
            s.children && s.children.length && !s.children.__rendered && this._build(s.children, s, o.createLiteHashMap([s.children[0].value]));
            var u = this._findElInItem(e, "list");
            e.hasClass(n) ? (e.removeClass(n).addClass(i), u.slideDown(l, r.proxy(t, this, !1)), this._resetItemText(e)) : e.hasClass(i) && (e.removeClass(i).addClass(n), u.slideUp(l, r.proxy(t, this, !0)))
        }, hasValue: function (e) {
            var t = !1;
            return this._travelData(this._viewModel().datasource, function (n) {
                n.value === e && (t = !0)
            }), t
        }, findDataItemByOb: function (e, t) {
            var n = "obArray" === o.obTypeOf(e) ? e() : [e()];
            return this.findDataItemByValues(n, t)
        }, findDataItemByValues: function (e, t) {
            var n = [];
            return this._travelData(this._viewModel().datasource, function (t) {
                o.arrayIndexOf(e, t.value) >= 0 && n.push(t)
            }), t ? n[0] : n
        }, _travelData: function (e, t, n) {
            if (n = n || 0, e && e.length) for (var i = 0, r = e.length; i < r; i++) e[i] && (t(e[i], n), this._travelData(e[i].children, t, n + 1))
        }, _findDataItemByEl: function (e) {
            return e && this._dataItemMap.get(e.getAttribute("data-id"))
        }, _findItemEl: function (e) {
            for (var t = this.css(), n = this._getCss("item"); !e.hasClass(n);) {
                if (e.hasClass(t)) return null;
                e = e.parent()
            }
            return e
        }, _findElInItem: function (e, t) {
            return e.find("> ." + this._getCss(t))
        }, _resetItemText: function (e) {
            var i = this;
            e.each(function () {
                var e = r(this), o = i._findDataItemByEl(this), a = !1 !== o.itemEncodeHTML ? s : t,
                    l = i._findElInItem(e, "text");
                e.hasClass(i._getCss("collapsed")) ? l[0].innerHTML = a([n(o.text), n(o.childrenPre), n(o.childrenBrief), n(o.childrenPost)].join("")) : e.hasClass(i._getCss("expanded")) && (l[0].innerHTML = a([n(o.text), n(o.childrenPre)].join("")))
            })
        }
    })
}), define("dt/config", ["require"], function (e) {
    function t(e) {
        return i.hasOwnProperty(e) ? i[e] : r[n].hasOwnProperty(e) ? r[n][e] : void 0
    }

    var n = "cn", i = {panelBaseZIndex: 9e5, panelMastOpacity: .7, winPanelAnimationDuration: 300}, r = {
        cn: {
            langDialogConfirm: "确定",
            langDialogYes: "是",
            langDialogNo: "否",
            langDialogSave: "保存",
            langDialogDontSave: "不保存",
            langDialogCancel: "取消",
            langDialogSaveFail: "保存失败",
            langDialogRemove: "删除",
            langDialogConfirmRemove: "您确认要删除吗？一旦删除，不可恢复。"
        },
        en: {
            langDialogConfirm: "OK",
            langDialogYes: "Yes",
            langDialogNo: "No",
            langDialogSave: "Save",
            langDialogDontSave: "Don't Save",
            langDialogCancel: "Cancel",
            langDialogSaveFail: "Save Failed.",
            langDialogRemove: "Delete",
            langDialogConfirmRemove: "Confirm Deleting? Can not be restored when deleted."
        }
    };
    return t.setLang = function (e) {
        e = e
    }, t
}), define("dt/ui/BasePanel", ["require", "jquery", "../lib", "./Component"], function (e) {
    function t(e) {
        a(this)[l] = e
    }

    function n(e) {
        return ~r.arrayIndexOf(e, this.getPanelState())
    }

    var i = e("jquery"), r = e("../lib"), o = e("./Component"), a = r.makeInner(), s = a.attach(o.extend({
        _define: {
            viewModel: function () {
                return {panelOpenStatus: null}
            }, viewModelPublic: ["panelOpenStatus"]
        },
        PanelState: {
            NONE: "NONE",
            CREATED: "CREATED",
            READY: "READY",
            DATA_FILLED: "DATA_FILLED",
            DISPOSED: "DISPOSED"
        },
        getPanelState: function () {
            return a(this)[l]
        },
        _construct: function () {
            t.call(this, this.PanelState.NONE);
            var e = this._applySuper("_construct", arguments);
            return t.call(this, this.PanelState.CREATED), e
        },
        dispose: function () {
            var e = this._applySuper("dispose", arguments);
            return t.call(this, this.PanelState.DISPOSED), e
        },
        enter: function (e) {
            if (!this.isOpened()) return !1;
            this.getPanelState() === this.PanelState.CREATED && (this._fillContent(e), t.call(this, this.PanelState.READY)), this._enter(e), t.call(this, this.PanelState.DATA_FILLED)
        },
        _fillContent: i.noop,
        _enter: i.noop,
        clear: function () {
            n.call(this, [this.PanelState.DATA_FILLED, this.PanelState.READY]) && (this._clear(), t.call(this, this.PanelState.READY))
        },
        _clear: i.noop,
        isOpened: function () {
            var e = this._viewModel().panelOpenStatus;
            return !e || "opened" === e()
        }
    })), l = "__panelState__" + s.uid;
    return s
}), define("tpl", ["require", "exports", "module", "etpl"], function (e, t, n) {
    var i = e("etpl");
    return {
        load: function (e, t, r, o) {
            var a = t.toUrl(e);
            if ("undefined" == typeof window) return void r();
            var s = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
            s.open("GET", a, !0), s.onreadystatechange = function () {
                if (4 === s.readyState) {
                    if (s.status >= 200 && s.status < 300) {
                        var e = s.responseText, t = n.config();
                        (void 0 === t.autoCompile || t.autoCompile) && i.compile(e), r(e)
                    }
                    s.onreadystatechange = new Function, s = null
                }
            }, s.send(null)
        }
    }
}), define("dt/ui/WinPanel", ["require", "jquery", "../lib", "../config", "./BasePanel", "tpl!./ui.tpl.html"], function (e) {
    var t, n = e("jquery"), i = e("../lib"), r = e("../config"), o = e("./BasePanel"), a = i.makeInner();
    return a.attach(o.extend({
        _define: {tpl: e("tpl!./ui.tpl.html"), tplTarget: "winPanel", closeWhenClickOther: !1},
        _init: function () {
            function e() {
                this._onCloseBtnClick && !1 === this._onCloseBtnClick() || this.close()
            }

            var i = n(this._renderTpl("winPanel")).appendTo(document.body).hide();
            null == t && (t = r("panelBaseZIndex")), this._manuInitView(i);
            var o = a(this);
            o.mainEl = i, o.isOpen = !1, this.$el("winPanel$content", i.find(".dtui-winpn-con")), o.maskKey = Math.random() + "", i.on(this._event("click"), ".dtui-close-cross", n.proxy(e, this)), this._afterInit(this.$content())
        },
        _disposeFinally: function () {
            var e = a(this);
            i.disposeGlobalMask(e.maskKey), e.mainEl.remove(), e.mainEl = null
        },
        open: function (e) {
            function o() {
                this._getDefineProperty("closeWhenClickOther") && this.close()
            }

            if (!this.isOpen()) {
                var s = this.$el(), l = this.$content(), u = a(this);
                i.globalMask(r("panelMastOpacity"), u.maskKey, "winpn", {click: n.proxy(o, this)}), u.isOpen = !0, this._beforeShow(l, e), s.show(), this._afterShow(l, e), s.css({
                    top: 0 - Math.round(s.outerHeight()),
                    marginLeft: 0 - Math.round(s.outerWidth() / 2),
                    marginTop: 0,
                    "z-index": t++
                });
                var c = this._getDefineProperty("noAnimate");
                s.animate({
                    top: "50%",
                    marginTop: 0 - Math.round(s.outerHeight() / 2)
                }, c ? 0 : r("winPanelAnimationDuration"))
            }
        },
        close: function () {
            if (this.isOpen()) {
                var e = this.$el(), t = a(this);
                t.isOpen = !1, this._beforeHide(this.$content());
                var n = this, o = this._getDefineProperty("noAnimate");
                e.animate({
                    top: 0 - Math.round(e.outerHeight()),
                    marginTop: 0
                }, o ? 0 : r("winPanelAnimationDuration"), "swing", function () {
                    e.hide(), i.globalMask(!1, t.maskKey), n._afterHide(n.$content()), n.fire("close")
                })
            }
        },
        $content: function () {
            return this.$el("winPanel$content")
        },
        isOpen: function () {
            return a(this).isOpen
        },
        _afterInit: n.noop,
        _beforeShow: n.noop,
        _afterShow: n.noop,
        _beforeHide: n.noop,
        _afterHide: n.noop,
        _onCloseBtnClick: n.noop
    }))
}), define("dt/ui/Button", ["require", "jquery", "./Component", "../lib"], function (e) {
    var t = e("jquery"), n = e("./Component"), i = e("../lib"), r = ["click", "mouseenter", "mouseleave"];
    return n.extend({
        _define: {
            viewModel: function () {
                return {text: i.ob(""), dontEncodeHTML: !1}
            }, viewModelPublic: ["text"], css: "dtui-btn"
        }, _init: function () {
            function e() {
                l.disabled() || (u.addClass(d), f && u.addClass(p))
            }

            function n() {
                u.removeClass(d), u.removeClass(p)
            }

            function o() {
                l.disabled() || (u.addClass(p), f = !0, h.one(c._event("mouseup"), function () {
                    f = !1
                }))
            }

            function a() {
                u.removeClass(p)
            }

            function s(e) {
                u.html(l.dontEncodeHTML ? e : i.encodeHTML(e))
            }

            var l = this._viewModel(), u = this.$el(), c = this, d = this.getFullCss("-hover").join(" "),
                p = this.getFullCss("-active").join(" "), f = !1, h = t(document);
            this._eventHandlerMap = {}, u.on(this._event("mouseenter"), e), u.on(this._event("mouseleave"), n), u.on(this._event("mousedown"), o), u.on(this._event("mouseup"), a);
            var v = this;
            t.each(r, function (e, t) {
                u.on(v._event(t), function (e) {
                    v.trigger.call(v, t, e)
                })
            }), "ob" === i.obTypeOf(l.text) && this._disposable(l.text.subscribe(s, this));
            var g = i.value(l.text);
            u.html(l.dontEncodeHTML ? g : i.encodeHTML(g))
        }, _parseViewModel: function (e, t) {
            return null != t.text && (e.text = t.text), null != t.css && (e.css = t.css), null != t.dontEncodeHTML && (e.dontEncodeHTML = t.dontEncodeHTML), e
        }, on: function (e, n) {
            i.assert(e.indexOf(".") < 0);
            var o = this._eventHandlerMap;
            t.inArray(e, r) >= 0 && (o[e] = o[e] || [], o[e].push(n))
        }, trigger: function (e, n) {
            var i = this._viewModel(), r = this._eventHandlerMap[e];
            i.disabled() || r && r.length && t.each(r, function (e, i) {
                t.isFunction(i) && i.call(this, n)
            })
        }, _dispose: function () {
            this.$el().off(), this._eventHandlerMap = null
        }
    })
}), define("dt/ui/Tab", ["require", "jquery", "../lib", "./Component"], function (e) {
    function t(e, t) {
        var n = r.getComponent(e);
        n ? n.viewModel("visible")(t) : e[t ? "show" : "hide"]()
    }

    function n(e, t) {
        var n = r.getComponent(e);
        n && n.viewModel("disabled")(t)
    }

    var i = e("jquery"), r = e("../lib"), o = e("./Component"), a = r.peek;
    return o.extend({
        _define: {
            viewModel: function () {
                return {
                    currentTab: r.ob(),
                    currentTab1: r.ob(),
                    baseCss: "cpt-tab",
                    tabAttr: null,
                    tabAttr1: null,
                    conAttr: null,
                    conAttr1: null
                }
            }, viewModelPublic: ["currentTab", "currentTab1"], suppressConstructSub: !0, css: "cpt-tab"
        }, _prepare: function () {
            var e = this._viewModel(), t = e.baseCss;
            e.headItemCss = t + "-hi", e.currentHeadItemCss = t + "-hi-curr", e.headItemCss1 = t + "-hi1", e.currentHeadItemCss1 = t + "-hi1-curr", e.conItemCss = t + "-coni", e.headItemDisabledCss = e.headItemCss + "-disabled", e.conItemDisabledCss = e.conItemCss + "-disabled"
        }, _init: function () {
            var e = this._viewModel(), t = e.currentTab, n = e.currentTab1;
            this._disposable(t.subscribe(function (e) {
                this._changeTabByModel(e, a(n))
            }, this)), this._useTab1() && this._disposable(n.subscribe(function (e) {
                this._changeTabByModel(a(t), e)
            }, this)), this.bind()
        }, bind: function () {
            if (this._prop("bound")) throw new Error("It has been bound.");
            var e = this._viewModel();
            this._bindDom(), this._changeTabByModel(a(e.currentTab), a(e.currentTab1)), this._bindModelUpdater(), this._prop("bound", !0)
        }, unbind: function () {
            this._removeCurrSelect(), this._unbindModelUpdater(), this._unbindDom(), this._prop("bound", !1)
        }, isBound: function () {
            return this._prop("bound")
        }, getCurrentTabKey: function () {
            return this._prop("currentTabKey")
        }, getCurrentTabKey1: function () {
            return this._prop("currentTabKey1")
        }, hasTab: function (e, t) {
            return !!this._getTabWrap(e, t)
        }, setTabDisabled: function (e, t, i) {
            var r = this._viewModel(), o = this._getTabWrap(t, i);
            o.$tabEl[e ? "addClass" : "removeClass"](r.headItemDisabledCss), o.$conEl[e ? "addClass" : "removeClass"](r.conItemDisabledCss), n(o.$conEl, e)
        }, isTabDisabled: function (e, t) {
            var n = this._getTabWrap(e, t);
            return n ? n.$tabEl.hasClass(this._viewModel().headItemDisabledCss) : null
        }, setTabLabel: function (e, t) {
            this._prop("tabWraps")[e].$tabEl[0].innerHTML = t
        }, _bindDom: function () {
            var e = this._prop("tabWraps", {}), n = this.$el(), r = this._viewModel(), o = r.tabAttr, a = r.tabAttr1,
                s = r.conAttr, l = r.conAttr1, u = this._useTab1(), c = n.find("*[data-" + o + "]"),
                d = u && n.find("*[data-" + a + "]"), p = n.find("*[data-" + r.conAttr + "]");
            c.each(function (t, n) {
                var s = i(n);
                s.addClass(r.headItemCss), u ? d.each(function (t, n) {
                    var l = i(n);
                    l.addClass(r.headItemCss1), (e[s.data(o)] || (e[s.data(o)] = {}))[l.data(a)] = {
                        $tabEl: s,
                        $tabEl1: l
                    }
                }) : e[s.data(o)] = {$tabEl: s}
            }), p.each(function (n, o) {
                var a = i(o);
                a.addClass(r.conItemCss), t(a, !1), u ? e[a.data(s)][a.data(l)].$conEl = a : e[a.data(s)].$conEl = a
            })
        }, _unbindDom: function () {
            this._prop("tabWraps", {})
        }, _getTabWrap: function (e, t) {
            var n = this._prop("tabWraps")[e];
            return this._useTab1() && n && (n = n[t]), n
        }, _removeCurrSelect: function () {
            var e = this._viewModel(), n = this._useTab1(),
                i = this._getTabWrap(this._prop("currentTabKey"), this._prop("currentTabKey1"));
            i && (i.$tabEl.removeClass(e.currentHeadItemCss), n && i.$tabEl1.removeClass(e.currentHeadItemCss1), t(i.$conEl, !1), this._prop("currentTabKey", null), n && this._prop("currentTabKey1", null))
        }, _addSelect: function (e, n) {
            var i = this._viewModel(), r = this._useTab1(), o = this._getTabWrap(e, n);
            o && (o.$tabEl.addClass(i.currentHeadItemCss), r && o.$tabEl1.addClass(i.currentHeadItemCss1), t(o.$conEl, !0), this._prop("currentTabKey", e), r && this._prop("currentTabKey1", n))
        }, _changeTabByModel: function (e, t) {
            this._removeCurrSelect(), this._addSelect(e, t)
        }, _bindModelUpdater: function () {
            var e = this._viewModel(), t = e.tabAttr, n = e.tabAttr1, r = this, o = this.$el();
            o.on(this._event("click"), "*[data-" + t + "]", function () {
                var n = i(this).data(t);
                n !== r._prop("currentTabKey") && e.currentTab(n)
            }), o.on(this._event("click"), "*[data-" + n + "]", function () {
                var t = i(this).data(n);
                t !== r._prop("currentTabKey1") && e.currentTab1(t)
            })
        }, _unbindModelUpdater: function () {
            this.$el().off(this._event())
        }, _useTab1: function () {
            return null != this._viewModel().tabAttr1
        }, _dispose: function () {
            this._prop("tabWraps", null)
        }
    })
}), define("dt/ui/Foreach", ["require", "jquery", "../lib", "./Component"], function (e) {
    function t(e) {
        p[e.key].call(this, e)
    }

    function n(e, t) {
        for (var n = this._items(), i = this._getCommonConfig("itemTplTarget"), r = this._getCommonConfig("itemTplParam"), l = this._getCommonConfig("itemType"), u = l ? this.getCptClass(l) : this.Item, c = 0, d = t.length; c < d; c++) {
            var p = t[c], f = this.getCptDef("itemConfigAttr");
            if (f && p) {
                var h = p[f];
                h.itemType && (u = this.getCptClass(h.itemType)), h.itemTplTarget && (i = h.itemTplTarget), h.itemTplParam && (r = h.itemTplParam)
            }
            var v = a(i ? this._renderTpl(i, a.extend({index: e + c, itemTplParam: r}, p)) : "<div></div>");
            s.assert(1 === v.length, "MUST be only one root element in item tpl!"), o.call(this, v, e + c);
            var g = new u(v, p);
            n.splice(e + c, 0, g)
        }
    }

    function i(e, t) {
        for (var n = this._items(), i = n.splice(e, t), r = 0, o = i.length; r < o; r++) {
            var a = i[r], s = a.$el();
            a.dispose(), s.remove()
        }
    }

    function r(e, t) {
        var n = this._items(), i = n[e], r = i.$el(), o = n[t].$el();
        t > e ? r.insertAfter(o) : r.insertBefore(o), n.splice(e, 1)[0], n.splice(t, 0, i)
    }

    function o(e, t) {
        var n = this._items();
        return !n.length || t >= n.length ? e.appendTo(c(this).$itemsContainer) : e.insertBefore(n[t].el())
    }

    var a = e("jquery"), s = e("../lib"), l = e("./Component"), u = s.obArray.ChangeKey, c = s.makeInner(),
        d = c.attach(l.extend({
            _define: {
                viewModel: function () {
                    return {data: s.obArray([])}
                }, viewModelPublic: ["data"], css: "cpt-foreach"
            }, _prepare: function () {
                var e = this._viewModel().data;
                this._sub("-foreach-items-prop", []), this._setItemsContainer(), this._disposable(e.subscribe(t, this, "arrayChange"));
                for (var n = {
                    key: u.SPLICE,
                    index: 0,
                    removeCount: 0,
                    added: []
                }, i = 0, r = e.peek(), o = r.length; i < o; i++) n.added.push(r[i]);
                t.call(this, n)
            }, _dispose: function () {
                this.foreach(function (e, t) {
                    t.dispose()
                })
            }, _parseViewModel: function (e) {
                return s.assert("obArray" === s.obTypeOf(e)), {data: e}
            }, foreach: function (e) {
                for (var t = this._items(), n = 0, i = t.length; n < i; n++) e(n, t[n])
            }, getItemAt: function (e) {
                return this._items()[e]
            }, count: function () {
                return this._viewModel().data.count()
            }, _items: function () {
                return this._sub("-foreach-items-prop")
            }, _setItemsContainer: function () {
                c(this).$itemsContainer = this.$el()
            }, _getCommonConfig: function (e) {
                return this.getCptDef(e) || this._getDefineProperty(e)
            }
        })), p = {};
    return p[u.REMOVE] = function (e) {
        for (var t = e.indexes, n = 0, r = t.length; n < r; n++) i.call(this, t[n], 1)
    }, p[u.SPLICE] = function (e) {
        e.removeCount && i.call(this, e.index, e.removeCount), e.added.length && n.call(this, e.index, e.added)
    }, p[u.MOVE] = function (e) {
        r.call(this, e.originIndex, e.finalIndex)
    }, d.prototype.Item = l.extend({_define: {css: "dtui-foreach-item", viewModelOnlyAccessDeclaredProperties: !1}}), d
}), define("dt/componentConfig", ["require", "./ui/Component", "./ui/Text", "./ui/TextInput", "./ui/CheckButton", "./ui/TreeList", "./ui/WinPanel", "./ui/Button", "./ui/Tab", "./ui/Foreach"], function (e) {
    var t = e("./ui/Component"), n = t.cptClasses;
    n.Text = e("./ui/Text"), n.TextInput = e("./ui/TextInput"), n.CheckButton = e("./ui/CheckButton"), n.TreeList = e("./ui/TreeList"), n.WinPanel = e("./ui/WinPanel"), n.Button = e("./ui/Button"), n.Tab = e("./ui/Tab"), n.Foreach = e("./ui/Foreach")
}), define("docTool/main", ["require", "jquery", "dt/ui/Component", "./schemaHelper", "dt/lib", "dt/tpl", "./docUtil", "./lang", "./hashHelper", "perfectScrollbar", "prettyPrint", "dt/componentConfig", "tpl!./main.tpl.html"], function (e) {
    function t(e) {
        return e.defaultValueText ? "[ default: " + e.defaultValueText + " ]" : ""
    }

    function n(e) {
        _hmt.push(["_trackEvent", "doc-" + e.key, f, e.data])
    }

    var i = e("jquery"), r = e("dt/ui/Component"), o = e("./schemaHelper"), a = e("dt/lib"), s = e("dt/tpl"),
        l = e("./docUtil"), u = e("./lang"), c = e("./hashHelper"), d = e("perfectScrollbar"), p = e("prettyPrint"),
        f = l.getGlobalArg("pageName"), h = l.getGlobalArg("schemaName") || f;
    e("dt/componentConfig");
    var v, g = ".ecdoc-api-doc-group-content", m = ".ecdoc-api-tree-area", y = ".ecdoc-api-doc-group-area",
        b = "ecdoc-api-doc-group-line-highlight", w = u.hideProperties, x = u.showProperties,
        _ = /<iframe[^>]*>.*?<\/iframe>/g, T = !0, C = {};
    C.init = function () {
        v = new E(i(".ecdoc-apidoc"))
    };
    var E = r.extend({
        _define: {
            tpl: e("tpl!./main.tpl.html"), css: "ecdoc-apidoc", viewModel: function () {
                return {
                    apiTreeDatasource: [],
                    apiTreeSelected: a.ob(),
                    apiTreeHighlighted: a.obArray(),
                    apiTreeHovered: a.ob(),
                    apiTreeResize: a.ob()
                }
            }
        }, getLang: function () {
            return u
        }, _initHash: function () {
            function e(e) {
                T && n({
                    key: "initHash",
                    data: e
                }), e || (e = l.getGlobalArg("initHash", "")), e && t._handleHashQuery(e), T = !1
            }

            var t = this;
            c.initHash(e)
        }, _initScroll: function () {
            var e = this.$el(), t = {}, n = e.find(y);
            d.initialize(e.find(m)[0], t), d.initialize(n[0], t);
            var i = this;
            n.on("ps-scroll-y", function (e) {
                i._doLazyLoad()
            })
        }, _prepare: function () {
            var e = Date.now();
            i.getJSON(l.addVersionArg(["../documents", u.langCode, h + ".json"].join("/"))).done(i.proxy(function (t) {
                var n = Date.now(), i = Math.round((n - e) / 1e3);
                _hmt.push(["_setCustomVar", 1, "optionLoadTime", i, 3]), this._prepareDoc(t), this._applyTpl(this.$el(), "APIMain"), this._initQuickLink(), this._initTree(), this._initQueryBox(), this._initDescArea(), this._initHash(), this._initScroll()
            }, this))
        }, _prepareDoc: function (e) {
            var t = {};
            o.buildDoc(e, t);
            var n = this._docTree = {
                value: "root",
                text: l.getGlobalArg("docTreeRootText", ""),
                childrenPre: l.getGlobalArg("docTreeChildrenPre", "{"),
                childrenPost: l.getGlobalArg("docTreeChildrenPost", "}"),
                childrenBrief: "...",
                children: t.children[0].children,
                expanded: !0,
                propertyName: "option",
                type: "Object",
                hasObjectProperties: !0
            };
            this._viewModel().apiTreeDatasource = l.getGlobalArg("hideTreeRoot") ? n.children : [n]
        }, _initQuickLink: function () {
            var e = [["tutorial", u.quickLinkTutorial], ["api", u.quickLinkAPI], ["option", u.quickLinkOption]];
            "zh" === u.langCode && e.push(["option-gl", u.quickLinkOptionGL]);
            for (var t = [], n = 0; n < e.length; n++) t.push(f === e[n][0] ? "<span>" + e[n][1] + "</span>" : '<a href="' + e[n][0] + '.html">' + e[n][1] + "</a>");
            this.$el().find(".ecdoc-quick-link")[0].innerHTML = t.join("")
        }, _initTree: function () {
            function e(e, t, n) {
                var i = n.getTreeDataItem(!0);
                this._showHoverTargetDesc(i || !1)
            }

            function t(e, t, i) {
                var a = i.getTreeDataItem(!0), s = this.$el();
                e && a && (this._updateDescArea(a), T || n({
                    key: "clickTreeItem",
                    data: o.getOptionPathForHash(a)
                }), r.call(this, a), s.find("." + b).removeClass(b), this._findDescNode(a.value).addClass(b), c.hashRoute({queryString: o.getOptionPathForHash(a)}))
            }

            function r(e) {
                var t = this.$el(), n = t.find(y), i = this._findDescNode(e.value), r = this.$el().find(g),
                    o = i.length ? i.offset().top - r.offset().top : 0;
                n.animate({scrollTop: o - 10}, 300).promise().always(function () {
                    d.update(n[0])
                })
            }

            function a(e, t, n) {
                d.update(this.$el().find(m)[0])
            }

            var s = this._viewModel();
            this._disposable(s.apiTreeHovered.subscribe(i.proxy(e, this, !1))), this._disposable(s.apiTreeSelected.subscribe(i.proxy(t, this, !0))), this._disposable(s.apiTreeResize.subscribe(i.proxy(a, this, !0)))
        }, _initQueryBox: function () {
            function e(e) {
                n({key: "changeSearchMode", data: e});
                var i = l.getDataItem(e);
                s.viewModel("placeholder")(i.placeholder), t.call(this, !0)
            }

            function t(e, t, i) {
                var r = u(), o = u.peekValueInfo();
                o && o.type === a.valueInfo.CONFIRMED && (e || n({
                    key: "search",
                    data: r,
                    queryMode: d()
                }), r && this._confirmQuery(r, d(), !1, !0))
            }

            function r() {
                n({key: "collapseAll"}), this._setResultInfo(null), this._viewModel().apiTreeHighlighted([], {collapseLevel: 1})
            }

            var s = this._sub("queryInput"), l = this._sub("queryMode"), u = s.viewModel("value");
            u.subscribe(i.proxy(t, this, !1));
            var d = l.viewModel("checked");
            d.subscribe(e, this), e.call(this, d()), this._sub("collapseAll").on("click", i.proxy(r, this)), i(document).keypress(function (e) {
                var t = (e.target.tagName || "").toLowerCase();
                47 === e.which && "input" !== t && "textarea" !== t && (s.focus(), s.select(), e.preventDefault())
            });
            var p = this;
            s.$el().find("input").autoComplete({
                minChars: 1, source: function (e, t) {
                    for (var n = e ? p._doQuery(e, d()) : [], i = [], r = 0; r < n.length; r++) i.push(o.getOptionPathForHash(n[r]));
                    t(i)
                }, onSelect: function (e, t) {
                    c.hashRoute({queryString: t})
                }
            })
        }, _initDescArea: function () {
            function e(e) {
                var i = e.currentTarget.getAttribute("data-tree-item-id"), r = this._findDescNode(i),
                    a = this._findElInDescNode(r);
                if (a.subGroup.length) {
                    var s = this._sub("apiDocTree").findDataItemByValues([a.expandBtn.attr("data-tree-item-id")], !0),
                        l = s ? o.getOptionPathForHash(s) : "";
                    "none" === a.subGroup[0].style.display ? (n({
                        key: "expandDesc",
                        data: l
                    }), a.expandBtn[0].innerHTML = "<span>" + w + "</span>", this._completeSubGroupContent(a.subGroup), a.subGroup.slideDown().promise().always(t)) : (n({
                        key: "collapseDesc",
                        data: l
                    }), a.expandBtn[0].innerHTML = "<span>" + x + "</span>", a.subGroup.slideUp().promise().always(t))
                }
            }

            this.$el().find(g).on("click", ".ecdoc-api-doc-prop-expand", i.proxy(e, this)), this.$el().find(g).on("click", ".ecdoc-api-doc-line-head", i.proxy(e, this));
            var t = i.proxy(function () {
                d.update(this.$el().find(y)[0])
            }, this)
        }, _updateDescArea: function (e) {
            function t() {
                c.filter(function () {
                    var e = i(this);
                    if (e.attr("src")) return !1;
                    var t = e.offset().top, n = o.height(), r = o.offset().top;
                    return t < n + r && t > r
                }).each(function () {
                    i(this).attr("src", i(this).data("src"))
                })
            }

            var n = this.$el(), r = n.find(g), o = n.find(y), s = this._getTraceToComponentRoot(e), l = s[0], u = "";
            l !== this._lastDescBase && (this._pendingSubGroupMap = a.createLiteHashMap(), u = this._createDescHTML(l, e), r[0].innerHTML = u), this._lastDescBase = l, this._doExpand(s, r, e), r.find("pre code").each(function (e, t) {
                i(t).addClass("prettyprint")
            }), p(), d.update(n.find(y)[0]);
            var c = o.find("iframe");
            t(), this._doLazyLoad = t, this._initTwentyTwenty(r)
        }, _initTwentyTwenty: function (e) {
            i.fn.twentytwenty && !e.find(".twentytwenty-wrapper").length ? e.find(".twentytwenty-container").each(function () {
                var e = this, t = 0;
                console.log(i(this).find("img")), i(this).find("img").one("load", function () {
                    0 === --t && i(e).twentytwenty()
                }).each(function () {
                    t++, this.complete && i(this).load()
                })
            }) : i.fn.twentytwenty && i(window).trigger("resize.twentytwenty")
        }, _completeSubGroupContent: function (e) {
            var t = this._pendingSubGroupMap, n = e.attr("data-tree-item-id"), i = t.get(n);
            null != i && (e[0].innerHTML = this._createDescSubGroupHTML(i), t.set(n, null), this._initTwentyTwenty(e))
        }, _findDescNode: function (e) {
            var t = i.isArray(e), n = {};
            if (t) for (var r = 0; r < e.length; r++) n[e[r]] = 1;
            return this.$el().find(".ecdoc-api-doc-group-line").filter(function (i, r) {
                var o = r.getAttribute("data-tree-item-id");
                return t ? !!n[o] : o === e
            })
        }, _findElInDescNode: function (e) {
            return {expandBtn: e.find("> .ecdoc-api-doc-prop-expand"), subGroup: e.find("> .ecdoc-api-doc-sub-group")}
        }, _getTraceToComponentRoot: function (e) {
            for (var t, n = [], i = e; i && (t = i.parent) && t.parent && (!i.isEnumParent || i === e);) n.push(i), i = t;
            return n.reverse()
        }, _createDescHTML: function (e, t) {
            if (!e) return "";
            var n = this._wrapDesc(e);
            return s.render("descGroupTitle", {
                baseDescOptionPath: n.optionPath,
                descText: n.descText
            }) + this._createDescSubGroupHTML(e, t)
        }, _createDescSubGroupHTML: function (e, n) {
            var i = e.children;
            if (!i) return "";
            for (var r = [], o = this._pendingSubGroupMap, a = 0; a < i.length; a++) {
                var l = this._wrapDesc(i[a]), u = i[a].hasObjectProperties;
                u && o.set(i[a].value, i[a]), r.push(s.render("descGroupLine", {
                    descItemOptionPath: l.optionPath,
                    descItemType: l.type,
                    descItemContent: t(l),
                    descItemDescText: l.descText,
                    expandIcon: x,
                    hasSubGroup: u,
                    highlightCSS: i[a] === n ? b : "",
                    idAttr: i[a].value
                }))
            }
            return r.join("")
        }, _doExpand: function (e, t, n) {
            for (var r = [], o = 1; o < e.length; o++) r.push(e[o].value);
            var a = this._findDescNode(r), s = this;
            a.each(function (e, t) {
                var n = s._findElInDescNode(i(t));
                n.subGroup.length && (n.expandBtn[0].innerHTML = "<span>" + w + "</span>", s._completeSubGroupContent(n.subGroup), n.subGroup.show())
            })
        }, _wrapDesc: function (e, t) {
            var n = e.type || "";
            i.isArray(n) && (n = n.join(", "));
            var r = e.description;
            return t && r && (r = r.replace(_, "")), {
                type: a.encodeHTML(n),
                descText: r,
                defaultValueText: a.encodeHTML(e.defaultValueText),
                optionPath: o.getOptionPathForHTML(e)
            }
        }, _showHoverTargetDesc: function (e) {
            var n = this.$el(), i = n.find(".ecdoc-api-hover-desc");
            if (!1 === e) return void i.stop().fadeOut(100);
            i.stop().css("opacity", 1).show();
            var r = this._wrapDesc(e, !0);
            i[0].innerHTML = s.render("descGroupLine", {
                descItemOptionPath: r.optionPath,
                descItemType: r.type,
                descItemContent: t(r),
                descItemDescText: r.descText
            })
        }, _handleHashQuery: function (e) {
            var t = this._viewModel().apiTreeSelected.getTreeDataItem(!0);
            t && e === o.getOptionPathForHash(t) || (T || n({
                key: "innerLinkChangeHash",
                data: e
            }), this._confirmQuery(e, "optionPath", !0))
        }, _doQuery: function (e, t) {
            try {
                var n = {};
                return n[t] = e, n.noTypeEnum = l.getGlobalArg("noTypeEnum"), o.queryDocTree(this._docTree, n) || []
            } catch (e) {
                return alert(e), []
            }
        }, _confirmQuery: function (e, t, n, r) {
            var o = this._doQuery(e, t);
            r && this._setResultInfo(o.length);
            var a = null;
            if (i(".query-collapse-radio input[type=radio]").each(function () {
                this.checked && "1" === this.value && (a = 2)
            }), o.length) {
                for (var s = [], l = 0, u = o.length; l < u; l++) s.push(o[l].value);
                var c = this._viewModel(),
                    d = {scrollToTarget: {container: this.$el().find(m), clientX: 210}, collapseLevel: a};
                n ? c.apiTreeSelected(o[0].value, d) : c.apiTreeHighlighted(s, d)
            }
        }, _setResultInfo: function (e) {
            var t = null == e ? "" : 0 === e ? u.queryBoxNoResult : a.strTemplate(u.queryResultInfo, {count: e});
            this.$el().find(".query-result-info")[0].innerHTML = t
        }
    });
    return C
});