function changeLang(e) {
    if ("en" === e && "echarts.apache.org" !== location.hostname) {
        var t = new RegExp("/zh/", "g"), n = location.pathname.replace(t, "../en/default.htm"),
            a = ".." + n + location.search + location.hash;
        return void (location.href = a)
    }
    location.href = location.href.replace(new RegExp("/(zh|en)/", "g"), "../" + e + "/")
}

function closeApacheBanner(e) {
    var t = document.getElementById("apache-banner");
    t.remove(), e && (_hmt.push(["_trackEvent", "apacheBanner", "close"]), Cookies.set("apache-banner-closed", "true", {expires: 7}))
}

function logApache() {
    _hmt.push(["_trackEvent", "apacheBanner", "visit"])
}

$(document).ready(function () {
    function e() {
        o.filter(function () {
            var e = $(this);
            if (e.attr("src")) return !1;
            var t = e[0].getClientRects();
            return t.length > 0 && t[0].top > 0 && t[0].top < $(window).height()
        }).each(function () {
            $(this).attr("src", $(this).data("src"))
        })
    }

    if ("echarts.apache.org" !== location.host) {
        var t = document.getElementById("apache-banner");
        t.style.display = "block"
    }
    var n = Cookies.get("apache-banner-closed");
    "true" === n && closeApacheBanner(!1);
    var a = $(".page-detail h2");
    a.length > 0 && a.each(function (e) {
        var t = 'href="#' + $(this).attr("id") + '"', n = $(this).text();
        $(this).next(".time") && (n += " " + $(this).next(".time").text());
        var a = 0 === e ? ' class="active"' : " ", r = $("<a " + t + a + ">" + n + "</a>").click(function () {
            $(".page-nav a").removeClass("active"), $(this).addClass("active")
        });
        $(".page-nav ul").append($("<li></li>").append(r))
    });
    var r = $(".page-content"), o = r.find("iframe");
    e(), $(window).scroll(function () {
        e()
    }), $(".slide-btn").click(function () {
        var e = $(this).parent().parent();
        e.hasClass("slide-up") ? ($(this).text("收起目录"), e.removeClass("slide-up")) : ($(this).text("展开目录"), e.addClass("slide-up"))
    }), $(".page-nav") && $(window).scroll(function () {
        var e = 120, t = Math.max(120 - (window.pageYOffset - e), 70);
        $(".page-nav").css("top", t)
    })
}), function () {
    function e() {
        for (var e = 0, t = {}; e < arguments.length; e++) {
            var n = arguments[e];
            for (var a in n) t[a] = n[a]
        }
        return t
    }

    function t(e) {
        return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
    }

    function n(a) {
        function r() {
        }

        function o(t, n, o) {
            if ("undefined" != typeof document) {
                o = e({path: "../default.htm"}, r.defaults, o), "number" == typeof o.expires && (o.expires = new Date(1 * new Date + 864e5 * o.expires)), o.expires = o.expires ? o.expires.toUTCString() : "";
                try {
                    var i = JSON.stringify(n);
                    /^[\{\[]/.test(i) && (n = i)
                } catch (c) {
                }
                n = a.write ? a.write(n, t) : encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), t = encodeURIComponent(String(t)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
                var s = "";
                for (var p in o) o[p] && (s += "; " + p, o[p] !== !0 && (s += "=" + o[p].split(";")[0]));
                return document.cookie = t + "=" + n + s
            }
        }

        function i(e, n) {
            if ("undefined" != typeof document) {
                for (var r = {}, o = document.cookie ? document.cookie.split("; ") : [], i = 0; i < o.length; i++) {
                    var c = o[i].split("="), s = c.slice(1).join("=");
                    n || '"' !== s.charAt(0) || (s = s.slice(1, -1));
                    try {
                        var p = t(c[0]);
                        if (s = (a.read || a)(s, p) || t(s), n) try {
                            s = JSON.parse(s)
                        } catch (h) {
                        }
                        if (r[p] = s, e === p) break
                    } catch (h) {
                    }
                }
                return e ? r[e] : r
            }
        }

        return window.Cookies = r, r.set = o, r.get = function (e) {
            return i(e, !1)
        }, r.getJSON = function (e) {
            return i(e, !0)
        }, r.remove = function (t, n) {
            o(t, "", e(n, {expires: -1}))
        }, r.defaults = {}, r.withConverter = n, r
    }

    return n(function () {
    })
}();