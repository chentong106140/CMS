!function (e) {
    var n = window.webpackHotUpdate;
    window.webpackHotUpdate = function (e, r) {
        !function (e, n) {
            if (!j[e] || !O[e]) return;
            for (var r in O[e] = !1, n) Object.prototype.hasOwnProperty.call(n, r) && (h[r] = n[r]);
            0 == --b && 0 === m && E()
        }(e, r), n && n(e, r)
    };
    var r, t = !0, o = "cddee15672a1409bbb9f", c = {}, i = [], d = [];

    function a(e) {
        var n = I[e];
        if (!n) return k;
        var t = function (t) {
            return n.hot.active ? (I[t] ? -1 === I[t].parents.indexOf(e) && I[t].parents.push(e) : (i = [e], r = t), -1 === n.children.indexOf(t) && n.children.push(t)) : (console.warn("[HMR] unexpected require(" + t + ") from disposed module " + e), i = []), k(t)
        }, o = function (e) {
            return {
                configurable: !0, enumerable: !0, get: function () {
                    return k[e]
                }, set: function (n) {
                    k[e] = n
                }
            }
        };
        for (var c in k) Object.prototype.hasOwnProperty.call(k, c) && "e" !== c && "t" !== c && Object.defineProperty(t, c, o(c));
        return t.e = function (e) {
            return "ready" === l && p("prepare"), m++, k.e(e).then(n, (function (e) {
                throw n(), e
            }));

            function n() {
                m--, "prepare" === l && (w[e] || D(e), 0 === m && 0 === b && E())
            }
        }, t.t = function (e, n) {
            return 1 & n && (e = t(e)), k.t(e, -2 & n)
        }, t
    }

    function s(n) {
        var t = {
            _acceptedDependencies: {},
            _declinedDependencies: {},
            _selfAccepted: !1,
            _selfDeclined: !1,
            _selfInvalidated: !1,
            _disposeHandlers: [],
            _main: r !== n,
            active: !0,
            accept: function (e, n) {
                if (void 0 === e) t._selfAccepted = !0; else if ("function" == typeof e) t._selfAccepted = e; else if ("object" == typeof e) for (var r = 0; r < e.length; r++) t._acceptedDependencies[e[r]] = n || function () {
                }; else t._acceptedDependencies[e] = n || function () {
                }
            },
            decline: function (e) {
                if (void 0 === e) t._selfDeclined = !0; else if ("object" == typeof e) for (var n = 0; n < e.length; n++) t._declinedDependencies[e[n]] = !0; else t._declinedDependencies[e] = !0
            },
            dispose: function (e) {
                t._disposeHandlers.push(e)
            },
            addDisposeHandler: function (e) {
                t._disposeHandlers.push(e)
            },
            removeDisposeHandler: function (e) {
                var n = t._disposeHandlers.indexOf(e);
                n >= 0 && t._disposeHandlers.splice(n, 1)
            },
            invalidate: function () {
                switch (this._selfInvalidated = !0, l) {
                    case"idle":
                        (h = {})[n] = e[n], p("ready");
                        break;
                    case"ready":
                        P(n);
                        break;
                    case"prepare":
                    case"check":
                    case"dispose":
                    case"apply":
                        (y = y || []).push(n)
                }
            },
            check: g,
            apply: x,
            status: function (e) {
                if (!e) return l;
                u.push(e)
            },
            addStatusHandler: function (e) {
                u.push(e)
            },
            removeStatusHandler: function (e) {
                var n = u.indexOf(e);
                n >= 0 && u.splice(n, 1)
            },
            data: c[n]
        };
        return r = void 0, t
    }

    var u = [], l = "idle";

    function p(e) {
        l = e;
        for (var n = 0; n < u.length; n++) u[n].call(null, e)
    }

    var f, h, v, y, b = 0, m = 0, w = {}, O = {}, j = {};

    function _(e) {
        return +e + "" === e ? +e : e
    }

    function g(e) {
        if ("idle" !== l) throw new Error("check() is only allowed in idle status");
        return t = e, p("check"), (n = 1e4, n = n || 1e4, new Promise((function (e, r) {
            if ("undefined" == typeof XMLHttpRequest) return r(new Error("No browser support"));
            try {
                var t = new XMLHttpRequest, c = k.p + "" + o + ".hot-update.json";
                t.open("GET", c, !0), t.timeout = n, t.send(null)
            } catch (e) {
                return r(e)
            }
            t.onreadystatechange = function () {
                if (4 === t.readyState) if (0 === t.status) r(new Error("Manifest request to " + c + " timed out.")); else if (404 === t.status) e(); else if (200 !== t.status && 304 !== t.status) r(new Error("Manifest request to " + c + " failed.")); else {
                    try {
                        var n = JSON.parse(t.responseText)
                    } catch (e) {
                        return void r(e)
                    }
                    e(n)
                }
            }
        }))).then((function (e) {
            if (!e) return p(H() ? "ready" : "idle"), null;
            O = {}, w = {}, j = e.c, v = e.h, p("prepare");
            var n = new Promise((function (e, n) {
                f = {resolve: e, reject: n}
            }));
            h = {};
            return D(0), "prepare" === l && 0 === m && 0 === b && E(), n
        }));
        var n
    }

    function D(e) {
        j[e] ? (O[e] = !0, b++, function (e) {
            var n = document.createElement("script");
            n.charset = "utf-8", n.src = k.p + "" + e + "." + o + ".hot-update.js", document.head.appendChild(n)
        }(e)) : w[e] = !0
    }

    function E() {
        p("ready");
        var e = f;
        if (f = null, e) if (t) Promise.resolve().then((function () {
            return x(t)
        })).then((function (n) {
            e.resolve(n)
        }), (function (n) {
            e.reject(n)
        })); else {
            var n = [];
            for (var r in h) Object.prototype.hasOwnProperty.call(h, r) && n.push(_(r));
            e.resolve(n)
        }
    }

    function x(n) {
        if ("ready" !== l) throw new Error("apply() is only allowed in ready status");
        return function n(t) {
            var d, a, s, u, l;

            function f(e) {
                for (var n = [e], r = {}, t = n.map((function (e) {
                    return {chain: [e], id: e}
                })); t.length > 0;) {
                    var o = t.pop(), c = o.id, i = o.chain;
                    if ((u = I[c]) && (!u.hot._selfAccepted || u.hot._selfInvalidated)) {
                        if (u.hot._selfDeclined) return {type: "self-declined", chain: i, moduleId: c};
                        if (u.hot._main) return {type: "unaccepted", chain: i, moduleId: c};
                        for (var d = 0; d < u.parents.length; d++) {
                            var a = u.parents[d], s = I[a];
                            if (s) {
                                if (s.hot._declinedDependencies[c]) return {
                                    type: "declined",
                                    chain: i.concat([a]),
                                    moduleId: c,
                                    parentId: a
                                };
                                -1 === n.indexOf(a) && (s.hot._acceptedDependencies[c] ? (r[a] || (r[a] = []), b(r[a], [c])) : (delete r[a], n.push(a), t.push({
                                    chain: i.concat([a]),
                                    id: a
                                })))
                            }
                        }
                    }
                }
                return {type: "accepted", moduleId: e, outdatedModules: n, outdatedDependencies: r}
            }

            function b(e, n) {
                for (var r = 0; r < n.length; r++) {
                    var t = n[r];
                    -1 === e.indexOf(t) && e.push(t)
                }
            }

            H();
            var m = {}, w = [], O = {}, g = function () {
                console.warn("[HMR] unexpected require(" + E.moduleId + ") to disposed module")
            };
            for (var D in h) if (Object.prototype.hasOwnProperty.call(h, D)) {
                var E;
                l = _(D), E = h[D] ? f(l) : {type: "disposed", moduleId: D};
                var x = !1, P = !1, M = !1, A = "";
                switch (E.chain && (A = "\nUpdate propagation: " + E.chain.join(" -> ")), E.type) {
                    case"self-declined":
                        t.onDeclined && t.onDeclined(E), t.ignoreDeclined || (x = new Error("Aborted because of self decline: " + E.moduleId + A));
                        break;
                    case"declined":
                        t.onDeclined && t.onDeclined(E), t.ignoreDeclined || (x = new Error("Aborted because of declined dependency: " + E.moduleId + " in " + E.parentId + A));
                        break;
                    case"unaccepted":
                        t.onUnaccepted && t.onUnaccepted(E), t.ignoreUnaccepted || (x = new Error("Aborted because " + l + " is not accepted" + A));
                        break;
                    case"accepted":
                        t.onAccepted && t.onAccepted(E), P = !0;
                        break;
                    case"disposed":
                        t.onDisposed && t.onDisposed(E), M = !0;
                        break;
                    default:
                        throw new Error("Unexception type " + E.type)
                }
                if (x) return p("abort"), Promise.reject(x);
                if (P) for (l in O[l] = h[l], b(w, E.outdatedModules), E.outdatedDependencies) Object.prototype.hasOwnProperty.call(E.outdatedDependencies, l) && (m[l] || (m[l] = []), b(m[l], E.outdatedDependencies[l]));
                M && (b(w, [E.moduleId]), O[l] = g)
            }
            var S, q = [];
            for (a = 0; a < w.length; a++) l = w[a], I[l] && I[l].hot._selfAccepted && O[l] !== g && !I[l].hot._selfInvalidated && q.push({
                module: l,
                parents: I[l].parents.slice(),
                errorHandler: I[l].hot._selfAccepted
            });
            p("dispose"), Object.keys(j).forEach((function (e) {
                !1 === j[e] && function (e) {
                    delete installedChunks[e]
                }(e)
            }));
            var U, T, R = w.slice();
            for (; R.length > 0;) if (l = R.pop(), u = I[l]) {
                var C = {}, L = u.hot._disposeHandlers;
                for (s = 0; s < L.length; s++) (d = L[s])(C);
                for (c[l] = C, u.hot.active = !1, delete I[l], delete m[l], s = 0; s < u.children.length; s++) {
                    var N = I[u.children[s]];
                    N && ((S = N.parents.indexOf(l)) >= 0 && N.parents.splice(S, 1))
                }
            }
            for (l in m) if (Object.prototype.hasOwnProperty.call(m, l) && (u = I[l])) for (T = m[l], s = 0; s < T.length; s++) U = T[s], (S = u.children.indexOf(U)) >= 0 && u.children.splice(S, 1);
            p("apply"), void 0 !== v && (o = v, v = void 0);
            for (l in h = void 0, O) Object.prototype.hasOwnProperty.call(O, l) && (e[l] = O[l]);
            var X = null;
            for (l in m) if (Object.prototype.hasOwnProperty.call(m, l) && (u = I[l])) {
                T = m[l];
                var G = [];
                for (a = 0; a < T.length; a++) if (U = T[a], d = u.hot._acceptedDependencies[U]) {
                    if (-1 !== G.indexOf(d)) continue;
                    G.push(d)
                }
                for (a = 0; a < G.length; a++) {
                    d = G[a];
                    try {
                        d(T)
                    } catch (e) {
                        t.onErrored && t.onErrored({
                            type: "accept-errored",
                            moduleId: l,
                            dependencyId: T[a],
                            error: e
                        }), t.ignoreErrored || X || (X = e)
                    }
                }
            }
            for (a = 0; a < q.length; a++) {
                var J = q[a];
                l = J.module, i = J.parents, r = l;
                try {
                    k(l)
                } catch (e) {
                    if ("function" == typeof J.errorHandler) try {
                        J.errorHandler(e)
                    } catch (n) {
                        t.onErrored && t.onErrored({
                            type: "self-accept-error-handler-errored",
                            moduleId: l,
                            error: n,
                            originalError: e
                        }), t.ignoreErrored || X || (X = n), X || (X = e)
                    } else t.onErrored && t.onErrored({
                        type: "self-accept-errored",
                        moduleId: l,
                        error: e
                    }), t.ignoreErrored || X || (X = e)
                }
            }
            if (X) return p("fail"), Promise.reject(X);
            if (y) return n(t).then((function (e) {
                return w.forEach((function (n) {
                    e.indexOf(n) < 0 && e.push(n)
                })), e
            }));
            return p("idle"), new Promise((function (e) {
                e(w)
            }))
        }(n = n || {})
    }

    function H() {
        if (y) return h || (h = {}), y.forEach(P), y = void 0, !0
    }

    function P(n) {
        Object.prototype.hasOwnProperty.call(h, n) || (h[n] = e[n])
    }

    var I = {};

    function k(n) {
        if (I[n]) return I[n].exports;
        var r = I[n] = {i: n, l: !1, exports: {}, hot: s(n), parents: (d = i, i = [], d), children: []};
        return e[n].call(r.exports, r, r.exports, a(n)), r.l = !0, r.exports
    }

    k.m = e, k.c = I, k.d = function (e, n, r) {
        k.o(e, n) || Object.defineProperty(e, n, {enumerable: !0, get: r})
    }, k.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, k.t = function (e, n) {
        if (1 & n && (e = k(e)), 8 & n) return e;
        if (4 & n && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (k.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }), 2 & n && "string" != typeof e) for (var t in e) k.d(r, t, function (n) {
            return e[n]
        }.bind(null, t));
        return r
    }, k.n = function (e) {
        var n = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return k.d(n, "a", n), n
    }, k.o = function (e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    }, k.p = "/", k.h = function () {
        return o
    }, a("./src/index.js")(k.s = "./src/index.js")
}({
    "./src/index.js": function (e, n, r) {
        "use strict";
        r.r(n);
        var t, o = r("./src/math.js");
        document.body.appendChild(((t = document.createElement("pre")).innerHTML = ["Hello webpack!", "5 cubed is equal to " + Object(o.cube)(5)].join("\n\n"), t)), e.hot.accept("./src/math.js", function (e) {
            o = r("./src/math.js"), console.log("math.js模块被热加载成功!")
        }.bind(this))
    }, "./src/math.js": function (e, n, r) {
        "use strict";

        function t(e) {
            return e * e
        }

        function o(e) {
            return e * e * e
        }

        r.r(n), r.d(n, "square", (function () {
            return t
        })), r.d(n, "cube", (function () {
            return o
        }))
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tYXRoLmpzIl0sIm5hbWVzIjpbInBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrIiwid2luZG93IiwiY2h1bmtJZCIsIm1vcmVNb2R1bGVzIiwiaG90QXZhaWxhYmxlRmlsZXNNYXAiLCJob3RSZXF1ZXN0ZWRGaWxlc01hcCIsIm1vZHVsZUlkIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiaG90VXBkYXRlIiwiaG90V2FpdGluZ0ZpbGVzIiwiaG90Q2h1bmtzTG9hZGluZyIsImhvdFVwZGF0ZURvd25sb2FkZWQiLCJob3RBZGRVcGRhdGVDaHVuayIsImhvdEN1cnJlbnRDaGlsZE1vZHVsZSIsImhvdEFwcGx5T25VcGRhdGUiLCJob3RDdXJyZW50SGFzaCIsImhvdEN1cnJlbnRNb2R1bGVEYXRhIiwiaG90Q3VycmVudFBhcmVudHMiLCJob3RDdXJyZW50UGFyZW50c1RlbXAiLCJob3RDcmVhdGVSZXF1aXJlIiwibWUiLCJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsImZuIiwicmVxdWVzdCIsImhvdCIsImFjdGl2ZSIsInBhcmVudHMiLCJpbmRleE9mIiwicHVzaCIsImNoaWxkcmVuIiwiY29uc29sZSIsIndhcm4iLCJPYmplY3RGYWN0b3J5IiwibmFtZSIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsImRlZmluZVByb3BlcnR5IiwiZSIsImhvdFN0YXR1cyIsImhvdFNldFN0YXR1cyIsInRoZW4iLCJmaW5pc2hDaHVua0xvYWRpbmciLCJlcnIiLCJob3RXYWl0aW5nRmlsZXNNYXAiLCJob3RFbnN1cmVVcGRhdGVDaHVuayIsInQiLCJtb2RlIiwiaG90Q3JlYXRlTW9kdWxlIiwiX2FjY2VwdGVkRGVwZW5kZW5jaWVzIiwiX2RlY2xpbmVkRGVwZW5kZW5jaWVzIiwiX3NlbGZBY2NlcHRlZCIsIl9zZWxmRGVjbGluZWQiLCJfc2VsZkludmFsaWRhdGVkIiwiX2Rpc3Bvc2VIYW5kbGVycyIsIl9tYWluIiwiYWNjZXB0IiwiZGVwIiwiY2FsbGJhY2siLCJ1bmRlZmluZWQiLCJpIiwibGVuZ3RoIiwiZGVjbGluZSIsImRpc3Bvc2UiLCJhZGREaXNwb3NlSGFuZGxlciIsInJlbW92ZURpc3Bvc2VIYW5kbGVyIiwiaWR4Iiwic3BsaWNlIiwiaW52YWxpZGF0ZSIsInRoaXMiLCJtb2R1bGVzIiwiaG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZSIsImhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyIsImNoZWNrIiwiaG90Q2hlY2siLCJhcHBseSIsImhvdEFwcGx5Iiwic3RhdHVzIiwibCIsImhvdFN0YXR1c0hhbmRsZXJzIiwiYWRkU3RhdHVzSGFuZGxlciIsInJlbW92ZVN0YXR1c0hhbmRsZXIiLCJkYXRhIiwibmV3U3RhdHVzIiwiaG90RGVmZXJyZWQiLCJob3RVcGRhdGVOZXdIYXNoIiwidG9Nb2R1bGVJZCIsImlkIiwiRXJyb3IiLCJyZXF1ZXN0VGltZW91dCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiWE1MSHR0cFJlcXVlc3QiLCJyZXF1ZXN0UGF0aCIsInAiLCJvcGVuIiwidGltZW91dCIsInNlbmQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwidXBkYXRlIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2VUZXh0IiwiaG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMiLCJjIiwiaCIsInByb21pc2UiLCJzY3JpcHQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjaGFyc2V0Iiwic3JjIiwiaGVhZCIsImFwcGVuZENoaWxkIiwiaG90RG93bmxvYWRVcGRhdGVDaHVuayIsImRlZmVycmVkIiwicmVzdWx0Iiwib3V0ZGF0ZWRNb2R1bGVzIiwib3B0aW9ucyIsImhvdEFwcGx5SW50ZXJuYWwiLCJjYiIsImoiLCJtb2R1bGUiLCJnZXRBZmZlY3RlZFN0dWZmIiwidXBkYXRlTW9kdWxlSWQiLCJvdXRkYXRlZERlcGVuZGVuY2llcyIsInF1ZXVlIiwibWFwIiwiY2hhaW4iLCJxdWV1ZUl0ZW0iLCJwb3AiLCJ0eXBlIiwicGFyZW50SWQiLCJwYXJlbnQiLCJjb25jYXQiLCJhZGRBbGxUb1NldCIsImEiLCJiIiwiaXRlbSIsImFwcGxpZWRVcGRhdGUiLCJ3YXJuVW5leHBlY3RlZFJlcXVpcmUiLCJhYm9ydEVycm9yIiwiZG9BcHBseSIsImRvRGlzcG9zZSIsImNoYWluSW5mbyIsImpvaW4iLCJvbkRlY2xpbmVkIiwiaWdub3JlRGVjbGluZWQiLCJvblVuYWNjZXB0ZWQiLCJpZ25vcmVVbmFjY2VwdGVkIiwib25BY2NlcHRlZCIsIm9uRGlzcG9zZWQiLCJvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMiLCJzbGljZSIsImVycm9ySGFuZGxlciIsImtleXMiLCJmb3JFYWNoIiwiaW5zdGFsbGVkQ2h1bmtzIiwiaG90RGlzcG9zZUNodW5rIiwiZGVwZW5kZW5jeSIsIm1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzIiwiZGlzcG9zZUhhbmRsZXJzIiwiY2hpbGQiLCJlcnJvciIsImNhbGxiYWNrcyIsIm9uRXJyb3JlZCIsImRlcGVuZGVuY3lJZCIsImlnbm9yZUVycm9yZWQiLCJlcnIyIiwib3JpZ2luYWxFcnJvciIsImxpc3QiLCJleHBvcnRzIiwibSIsImQiLCJnZXR0ZXIiLCJvIiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwiX19lc01vZHVsZSIsIm5zIiwiY3JlYXRlIiwia2V5IiwiYmluZCIsIm4iLCJvYmplY3QiLCJwcm9wZXJ0eSIsInMiLCJlbGVtZW50IiwiYm9keSIsImlubmVySFRNTCIsImxvZyIsInNxdWFyZSIsIngiLCJjdWJlIl0sIm1hcHBpbmdzIjoiYUFHRSxJQUFJQSxFQUEwQkMsT0FBeUIsaUJBQ3ZEQSxPQUF5QixpQkFDekIsU0FBa0NDLEVBQVNDLElBdVMzQyxTQUEyQkQsRUFB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QzlJLE9BQU9GLEdBSVJuSyxFQUFvQnVLLEVBQUksU0FBUzlELEdBQ2hDLElBQUlvRCxFQUFTcEQsR0FBVUEsRUFBT3lELFdBQzdCLFdBQXdCLE9BQU96RCxFQUFnQixTQUMvQyxXQUE4QixPQUFPQSxHQUV0QyxPQURBekcsRUFBb0I0SixFQUFFQyxFQUFRLElBQUtBLEdBQzVCQSxHQUlSN0osRUFBb0I4SixFQUFJLFNBQVNVLEVBQVFDLEdBQVksT0FBTzNMLE9BQU9DLFVBQVVDLGVBQWVDLEtBQUt1TCxFQUFRQyxJQUd6R3pLLEVBQW9CNEUsRUFBSSxJQUd4QjVFLEVBQW9Cd0YsRUFBSSxXQUFhLE9BQU8vRixHQUlyQ0ksRUFBaUIsaUJBQWpCQSxDQUFtQ0csRUFBb0IwSyxFQUFJLGtCLGdEQ3YxQnBFLFdBR1FDLEVBSFIscUJBYUloRixTQUFTaUYsS0FBSzVFLGNBVlYyRSxFQUFVaEYsU0FBU0MsY0FBYyxRQUU3QmlGLFVBQVksQ0FDZixpQkFDQSx1QkFBeUIsZUFBSyxJQUM5QjdDLEtBQUssUUFFSDJDLElBU0psRSxFQUFPdEcsSUFBSWtDLE9BQU8sZ0JBQWEsU0FBUyxHQUFULHFCQUUxQjVCLFFBQVFxSyxJQUFJLHFCQUNiLGEsNkNDdEJKLFNBQVNDLEVBQU9DLEdBQ25CLE9BQU9BLEVBQUlBLEVBR1IsU0FBU0MsRUFBS0QsR0FDakIsT0FBT0EsRUFBSUEsRUFBSUEsRUFMbkIiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRpZiAobnVsbCkgc2NyaXB0LmNyb3NzT3JpZ2luID0gbnVsbDtcbiBcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcImNkZGVlMTU2NzJhMTQwOWJiYjlmXCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmSW52YWxpZGF0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcbiBcdFx0XHRpbnZhbGlkYXRlOiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdHRoaXMuX3NlbGZJbnZhbGlkYXRlZCA9IHRydWU7XG4gXHRcdFx0XHRzd2l0Y2ggKGhvdFN0YXR1cykge1xuIFx0XHRcdFx0XHRjYXNlIFwiaWRsZVwiOlxuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInJlYWR5XCI6XG4gXHRcdFx0XHRcdFx0aG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZShtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJwcmVwYXJlXCI6XG4gXHRcdFx0XHRcdGNhc2UgXCJjaGVja1wiOlxuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZVwiOlxuIFx0XHRcdFx0XHRjYXNlIFwiYXBwbHlcIjpcbiBcdFx0XHRcdFx0XHQoaG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzID1cbiBcdFx0XHRcdFx0XHRcdGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyB8fCBbXSkucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0Ly8gaWdub3JlIHJlcXVlc3RzIGluIGVycm9yIHN0YXRlc1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoLCBob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXM7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoaG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKSA/IFwicmVhZHlcIiA6IFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gMDtcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuIFx0XHRyZXR1cm4gaG90QXBwbHlJbnRlcm5hbChvcHRpb25zKTtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHlJbnRlcm5hbChvcHRpb25zKSB7XG4gXHRcdGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCk7XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0IW1vZHVsZSB8fFxuIFx0XHRcdFx0XHQobW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkICYmICFtb2R1bGUuaG90Ll9zZWxmSW52YWxpZGF0ZWQpXG4gXHRcdFx0XHQpXG4gXHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQgJiZcbiBcdFx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcbiBcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdICE9PSB3YXJuVW5leHBlY3RlZFJlcXVpcmUgJiZcbiBcdFx0XHRcdC8vIHdoZW4gY2FsbGVkIGludmFsaWRhdGUgc2VsZi1hY2NlcHRpbmcgaXMgbm90IHBvc3NpYmxlXG4gXHRcdFx0XHQhaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmSW52YWxpZGF0ZWRcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0cGFyZW50czogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0ucGFyZW50cy5zbGljZSgpLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRpZiAoaG90VXBkYXRlTmV3SGFzaCAhPT0gdW5kZWZpbmVkKSB7XG4gXHRcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1bmRlZmluZWQ7XG4gXHRcdH1cbiBcdFx0aG90VXBkYXRlID0gdW5kZWZpbmVkO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBpdGVtLnBhcmVudHM7XG4gXHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gbW9kdWxlSWQ7XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGlmIChob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMpIHtcbiBcdFx0XHRyZXR1cm4gaG90QXBwbHlJbnRlcm5hbChvcHRpb25zKS50aGVuKGZ1bmN0aW9uKGxpc3QpIHtcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uKG1vZHVsZUlkKSB7XG4gXHRcdFx0XHRcdGlmIChsaXN0LmluZGV4T2YobW9kdWxlSWQpIDwgMCkgbGlzdC5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cmV0dXJuIGxpc3Q7XG4gXHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCkge1xuIFx0XHRpZiAoaG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKCFob3RVcGRhdGUpIGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcy5mb3JFYWNoKGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGUpO1xuIFx0XHRcdGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9IHVuZGVmaW5lZDtcbiBcdFx0XHRyZXR1cm4gdHJ1ZTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseUludmFsaWRhdGVkTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgbW9kdWxlSWQpKVxuIFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb2R1bGVzW21vZHVsZUlkXTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoXCIuL3NyYy9pbmRleC5qc1wiKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHsgY3ViZSB9IGZyb20gJy4vbWF0aC5qcyc7XHJcblxyXG5mdW5jdGlvbiBjb21wb25lbnQoKSB7XHJcbiAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpO1xyXG5cclxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gW1xyXG4gICAgICAgICAnSGVsbG8gd2VicGFjayEnLFxyXG4gICAgICAgICAnNSBjdWJlZCBpcyBlcXVhbCB0byAnICsgY3ViZSg1KVxyXG4gICAgICAgXS5qb2luKCdcXG5cXG4nKTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbn1cclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbXBvbmVudCgpKTtcclxuXHJcbi8qKlxyXG4gKiDnlKjkuo7nm5Hmjqfmn5DkuIDkuKrmqKHlnZfooqvph43mlrDkv67mlLnkuobvvIzlsLHkvJrov5vlhaXlpoLkuIvov5nkuKrlm57osIPmlrnms5VcclxuICovXHJcbmlmIChtb2R1bGUuaG90KSB7XHJcbiAgICAgICBtb2R1bGUuaG90LmFjY2VwdCgnLi9tYXRoLmpzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgLy/lvZNtYXRoLmpz5qih5Z2X5YaF5a656KKr5L+u5pS577yM5bCx5Lya6L+b5YWl5b2T5YmN5Zue6LCD5pa55rOVXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtYXRoLmpz5qih5Z2X6KKr54Ot5Yqg6L295oiQ5YqfIScpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgfVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gc3F1YXJlKHgpIHtcclxuICAgIHJldHVybiB4ICogeDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGN1YmUoeCkge1xyXG4gICAgcmV0dXJuIHggKiB4ICogeDtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9