function recommend(e) {
    recommendId = e;
    var n = $(".people img").eq(0).remove();
    $(".people").append(n), $(".people img").removeClass("active"), $(".people img").eq(2).addClass("active"), $(".recommend").removeClass("active"), $(".recommend").eq(e).addClass("active")
}

function renderHomepage3TouchDemo(e) {
}

function playIndexVideo() {
    var e = document.getElementById("video-index");
    e.play()
}

!function () {
    function e() {
        var e = document.getElementById("video-index");
        if (window.innerWidth / window.innerHeight < 16 / 9 ? (e.style.height = window.innerHeight + "px", e.style.width = "auto", e.style.marginLeft = Math.floor((window.innerWidth - window.innerHeight / 9 * 16) / 2) + "px", e.style.marginTop = 0) : (e.style.width = window.innerWidth + "px", e.style.height = "auto", e.style.marginTop = Math.floor(window.innerHeight - window.innerWidth / 16 * 9) + "px", e.style.marginLeft = 0), o) for (var n = o.length - 1; n >= 0; --n) o[n].resize()
    }

    function n() {
        requestAnimationFrame(function () {
            if (0 === a) for (var e = 1; t - 1 > e; ++e) a += $(".companies img").eq(e).width() + 30;
            d += 1, d > a && (d = 0), $(".companies").scrollLeft(d), n()
        })
    }

    if (!$(".lower-ie").length) {
        document.getElementById("nav-index").className = "active";
        var i = $(".navbar-default");
        i.addClass("navbar-bg"), $(window).scroll(function () {
            window.pageYOffset > 600 ? i.removeClass("navbar-bg") : i.addClass("navbar-bg")
        });
        var o = null;
        e(), $(window).resize(e);
        var t = 21, d = 0, a = 0;
        n()
    }
}();
var recommendId = 3;
setInterval(function () {
    recommend(recommendId), ++recommendId, recommendId === $(".recommend").length && (recommendId = 0)
}, 3e3);