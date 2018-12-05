/**
 * Created by cherish on 2017/12/14.
 */

(function (window, iptv) {
    function AndroidJS() {
        this.androidObj = window.njqg_jsbridge || {};

        /**
         * 获取机顶盒登陆信息
         * @returns {null}
         * @constructor
         */
        this.STBInfo = function () {
            return this.androidObj.getSTBInfo ? this.androidObj.getSTBInfo() : null;
        };

        /**
         * 更新和获取令牌
         * @param token
         * @returns {string}
         * @constructor
         */
        this.PlatformToken = function (token) {
            if (token) {
                return this.androidObj.setPlatformToken && this.androidObj.setPlatformToken(token);
            } else {
                return this.androidObj.getPlatformToken ? this.androidObj.getPlatformToken() : '';
            }
        };

        /**
         * 登陆结果回调   code=0 登陆成功 code=1 登陆失败
         * @param code
         * @returns {*}
         * @constructor
         */
        this.LoginCallBack = function (code) {
            return this.androidObj.loginBack && this.androidObj.loginBack(code);
        };

        /**
         * 日志输出
         * @param msg
         * @returns {*}
         * @constructor
         */
        this.Log = function (msg) {
            return this.androidObj.log && this.androidObj.log(msg);
        };

        /**
         * 弹出消息
         * @param msg
         * @returns {*}
         * @constructor
         */
        this.Message = function (msg) {
            return this.androidObj.toastMessage && this.androidObj.toastMessage(msg);
        };

        /**
         * 窗口播放
         * @param imgUrl
         * @param videoUrl
         * @param leftMargin
         * @param topMargin
         * @param width
         * @param height
         * @returns {*}
         * @constructor
         */
        this.SmallScreenPlay = function (imgUrl, videoUrl, leftMargin, topMargin, width, height) {
            return this.androidObj.smallScreenPlay && this.androidObj.smallScreenPlay(imgUrl, videoUrl, leftMargin, topMargin, width, height);
        };

        /**
         * 退出app
         * @returns {*}
         * @constructor
         */
        this.ExitApp = function () {
            return this.androidObj.exitApp && this.androidObj.exitApp();
        };

        /**
         * 退出确认
         * @returns {*}
         * @constructor
         */
        this.ExitVerify = function () {
            return this.androidObj.exitVerify && this.androidObj.exitVerify();
        };

        /**
         * 跳转地址
         * @param url
         * @returns {*}
         * @constructor
         */
        this.Redirect = function (url) {
            if (!url)return;
            return this.androidObj.goUrl && this.androidObj.goUrl(url);
        };

        /**
         * 隐藏视频组件
         * @returns {*}
         * @constructor
         */
        this.HideVideo = function () {
            return this.androidObj.hideVideo && this.androidObj.hideVideo();
        };

        /**
         * 全屏播放
         * @param videosId
         * @param videoId
         * @returns {*}
         * @constructor
         */
        this.FullScreenPlay = function (videosId, videoId) {
            return this.androidObj.fullScreenPlay && this.androidObj.fullScreenPlay(videosId, videoId);
        };
        /**
         * 安卓获取令牌
         * @returns {*}
         * @constructor
         */
        this.AndroidGetPlatFromToken = function () {
            return this.PlatformToken(CT.getCookie("PLATFORM_USER_TOKEN_ID"));
        };

        /**
         * 心跳
         * @param ottUserToken
         * @returns {*}
         * @constructor
         */
        this.OTTUserToken = function (ottUserToken) {
            if (!ottUserToken)return;
            return this.androidObj.setOTTUserToken && this.androidObj.setOTTUserToken(ottUserToken);
        };

        /**
         * apk执行更新
         * @returns {*}
         * @constructor
         */
        this.Update = function () {
            return this.androidObj.requestUpdate && this.androidObj.requestUpdate();
        }


    }
    iptv.androidJS = new AndroidJS();
    //添加页面关闭事件
    iptv(window).addEventListener('unload', function () {
        //播放页面，不进行缓存
        if (iptv.config.ActionName && !(iptv(iptv.config.ExcludeCacheActionName).contains(iptv.config.ActionName))) {
            iptv.setCookie("lastPageAction", iptv.config.ActionName);
            //如果当前页面地址中有记录当前焦点的参数，我们就不保存到cookie中，因为如果保存了，当下级页面再返回这个页面的时候会携带这个页面之前的焦点id，导致不停的重复累加这个焦点id参数
            //URL参数中f只，上一个页面用于记录点击什么按钮进入当前页面的，如果返回到上一个页面，那么就需要获取这个值，通过f_参数传递到上一页去，告诉上一页，之前是点击哪个按钮进入下级页面的
            var href = window.location.href;
            var a = href.indexOf("?");
            var e = href.substring(0, a);
            if (a != -1) {
                var b = href.substr(a + 1);
                var c = b.split("&");
                var d = [];
                for (var i in c) {
                    var g = c[i].split("=");
                    if (!(iptv(iptv.config.ExcludeUrlKey).contains(g[0].toUpperCase()))) {
                        d.push(c[i]);
                    }
                }
                if (d.length > 0) {
                    href = e + "?" + d.join("&");
                } else {
                    href = e;
                }
            }
            //如果当前页面是详情页，就保存详情页面地址到缓存，一般会在播放页面使用到
            if (iptv(iptv.config.IncludeDetailActionName).contains(iptv.config.ActionName)) {
                iptv.setCookie("lastDetailUrl", href);
            } else if (iptv.config.ActionName.indexOf("order") == -1) {
                //如果是不是订购页面，我们就保存上一页地址
                iptv.setCookie("lastPageUrl", href);
            }
        }
    });

    //公共方法模块
    iptv.common = {};

    /*默认进入页面隐藏视频框*/
    function closeVideo() {
        iptv.androidJS.HideVideo();
    }
    closeVideo();
    
    
    iptv.extend(iptv.common, {
        /**
         *返回平台首页方法
         * @constructor
         */
        BackMain: function () {
            iptv.api.page.findPageInfo({actionName: iptv.config.MainAction}, function (d) {
                window.location.href = d.pageSrc;
            });
        },
        Paging: function (currPage_, alls_, pageSize_) {
            if (!isNaN(currPage_)) {
                this.currPage = currPage_;
            } else {
                this.currPage = 0;
            }

            if (!isNaN(alls_)) {
                this.alls = alls_;
            } else {
                this.alls = 0;
            }
            if (!isNaN(pageSize_)) {
                this.pageSize = pageSize_;
            } else {
                this.pageSize = 8;
            }
            if (this.alls > 0) {
                this.pageCount = Math.ceil((this.alls * 1.0) / this.pageSize);
                if (this.pageCount == 0) {
                    this.currPage = 0;
                }
            } else {
                this.pageCount = 0;
            }
            if (this.currPage > 0 && this.pageSize > 0) {
                this.outvideosSize = (this.currPage - 1) * this.pageSize;
            }
        },
        initButtons: function () {
            if (iptv.pageData && iptv.pageData.buttons && iptv.pageData.buttons.length > 0 && iptv.focusCollection && iptv.focusCollection.length > 0) {
                for (var i = 0; i < iptv.focusCollection.length; i++) {
                    var focusModel = iptv.focusCollection[i].focusObj;
                    if (focusModel) {
                        for (var j = 0; j < iptv.pageData.buttons.length; j++) {
                            var buttonData = iptv.pageData.buttons[j];
                            if (buttonData && buttonData["focusId"] == focusModel["id"]) {
                                focusModel.buttonData = buttonData;
                            }
                        }
                    }
                }
            }
        },
        getCurUrl: function () {
            var backCurUrl = window.location.href;
            //处理返回地址，不携带额外参数
            if (backCurUrl) {
                var a = backCurUrl.indexOf("?");
                var e = backCurUrl.substring(0, a);
                if (a != -1) {
                    var b = backCurUrl.substr(a + 1);
                    var c = b.split("&");
                    var d = [];
                    for (var i in c) {
                        var g = c[i].split("=");
                        if (g[0].toUpperCase() != "PLAYBACKURL" && g[0].toUpperCase() != "BACKURL" && g[0].toUpperCase() != "NEXTURL") {
                            d.push(c[i]);
                        }
                    }
                    if (d.length > 0) {
                        backCurUrl = e + "?" + d.join("&");
                    } else {
                        backCurUrl = e;
                    }
                }
            }
            return backCurUrl;
        },
        clickObj: function (tempData) {
            var data = tempData || curFocus.tempData;
            if (data) {
                //判断是否有额外的链接地址
                var playUrl = "";
                if (data.playUrl != undefined && data.playUrl != "") {
                    playUrl = "&" + data.playUrl;
                }
                var cid = '';
                if (data.productId) {
                    cid = data.productId;
                }
                //当前页面地址，用户推荐位拦截进入订购，还能返回到当前页面
                var backCurUrl = iptv.common.getCurUrl();
                backCurUrl = encodeURIComponent(backCurUrl);
                //播放返回地址，如果推荐位推荐的是单机播放，所以播放完成之后，需要返回如下地址
                var playBackUrl = encodeURIComponent(iptv.config.ContextPath + "720p/edu/detail/videodetail.html?actionName=edu_videodetail&cid=" + cid);
                //获取推荐编号
                var recommendId = data.recommendId;
                iptv.api.page.recommendNext({recommendId: recommendId}, function (data) {
                    //无鉴权
                    if (data && data.url) {
                        var href = data.url;
                        href = iptv.api.url.getNextUrl(href, curFocus.focusID, cid, playBackUrl, backCurUrl, playUrl);
                        iptv.redirect(href);
                    }
                }, function (data) {
                    //有鉴权
                    if (data && data.url && data.nextUrl) {
                        //获取订购地 址
                        var orderUrl = data.url;
                        //获取被拦截地址,也就是订购成功之后需要前往的地址
                        var nextUrl = data.nextUrl;
                        if (data.freePlayFlag !== 1 || data.versionCode && parseInt(data.versionCode) < 119 || !data.versionCode) {
                            //下级页面地址
                            nextUrl = encodeURIComponent(iptv.api.url.getNextUrl(nextUrl, curFocus.focusID, cid, playBackUrl, backCurUrl, playUrl));
                            //订购地址
                            orderUrl = iptv.api.url.getOrderPageUrl(orderUrl, recommendId, cid, backCurUrl, nextUrl);
                            iptv.redirect(orderUrl);

                        } else {
                            var orderBackUrl = encodeURIComponent(iptv.api.url.getNextUrl(nextUrl, curFocus.focusID, cid, playBackUrl, backCurUrl, playUrl));
                            //订购地址
                            orderUrl = encodeURIComponent(iptv.api.url.getOrderPageUrl(orderUrl, recommendId, cid, backCurUrl, orderBackUrl));
                            nextUrl = iptv.api.url.getNextUrl(nextUrl, curFocus.focusID, cid, orderUrl, backCurUrl, playUrl);
                            iptv.redirect(nextUrl);
                        }
                    }
                });
            }
        },
        playSmallScreen: function (data, fn) {
            if (!data || data.videoId == null || data.videoId == '') return;
            var videoId = data.videoId,
                width = data.width || 0,
                height = data.height || 0,
                top = data.top || 0,
                left = data.left || 0;

            iptv.ajax({
                method: "post",
                async: "false",
                data: {width: width, height: height, left: left, top: top, videoId: videoId},
                url: iptv.config.PlatFormApiPath + "getSmallPlayUrl.json",
                success: function (d) {
                    d = eval("(" + d + ")");
                    if (d && d.code == 0) {
                        iptv.videoUrl = d.data.cdnPlayUrl;
                        this.smallScreenPlay('', d.data.cdnPlayUrl, left, top, width, height);
                        fn && fn(data, d);
                    }
                }
            });
        },
        smallScreenPlay: function (imgUrl, playUrl, left, top, width, height) {
            iptv.androidJS.SmallScreenPlay(imgUrl, playUrl, left, top, width, height);
        },
        closeVideo:closeVideo
    });

    if (typeof module === "object" && module && typeof module.exports === "object") {
        module.exports = iptv;
    } else {
        if (typeof define === "function" && define.amd) {
            define("iptv", [], function () {
                return iptv;
            });
        }
    }

    if (typeof window === "object" && typeof window.document === "object") {
        window.iptv = window.$ = iptv;
    }

})(window, iptv);