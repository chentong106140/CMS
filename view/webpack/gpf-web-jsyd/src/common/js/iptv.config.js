/**
 * Created by cherish on 2017/12/14.
 */

(function (window, iptv) {
    iptv.config = {};
    iptv.extend(iptv.config, {
        /**
         * 调试模式
         */
        DeBug:false,
        /**
         * 统一资源图路径
         */
        ImgContextUrl: "http://58.213.214.82:28080/orchard-web",
        /**
         * 平台编号
         */
        PID: 3,
        /**
         * 区域编号
         */
        PAOPID: 3,
        /**
         * 心跳频率
         */
        HeartBeatTime: 60000,
        /**
         * 是否打开心跳，默认打开
         */
        OpenHeartbeat: true,
        /**
         * 平台上下文路径  http://127.0.0.1:8080/baidu/
         */
        ContextPath: iptv.getContextPath(),
        /**
         * 项目域名     http://127.0.0.1:8080
         */
        HostPath: iptv.getHostPath(),
        /**
         * 平台接口路径
         */
        PlatFormApiPath: iptv.getHostPath() + "/orchard-api-jsyd/",
        /**
         * 平台上下文地址
         */
        PlatFormWebContextPath:iptv.getHostPath() + "/gpf-web-jsyd/",
        /**
         * 首页actionName名称
         */
        MainAction: "edu_new_main",
        /**
         * 统一支付结果回调地址
         */
        PayResultUrl: iptv.getContextPath() + "order/toPayResult.html",
        /**
         * 统一播放返回回调地址
         */
        PlayReturnUrl: iptv.getContextPath() + "play/playBack.html",
        /**
         * 默认用户来源
         */
        BeForm: "default",
        /**
         * 默认登陆页面actionName名称
         */
        LoginDefaultActionName: "edu_login",
        /**
         * 当前页面actionName名称
         */
        ActionName: null,
        /**
         * 默认首页actionName
         */
        MainActionName: "edu_new_main",
        /**
         * 默认登陆推荐模块
         */
        LoginDefaultRecommendName: "edu_login",
        /**
         * 登陆失效跳转地址
         */
        ErrorLoginFailUrl: iptv.getContextPath() + "error/error.html?code=1001",
        /**
         * 服务器发生错误地址
         */
        ErrorServerFailUrl: iptv.getContextPath() + "error/error.html?code=1000",
        /**
         * 排除需要记录当前页面地址到缓存的actionName
         */
        ExcludeCacheActionName: ["dx_videoplay"],
        /**
         * 排除URL链接中需要追加的key
         */
        ExcludeUrlKey: ["F_", "LASTFOCUSTYPE", "NEXTFOCUSTYPE", "PAYRESULT"],
        /**
         * 需要记录详情页面到缓存的actionName
         */
        IncludeDetailActionName: ["videodetail", "edu_videodetail"],
        /**
         * 心跳定时器
         */
        HeartbeatInterval: setInterval(function () {
            if (iptv.config.OpenHeartbeat == true) {
                //获取之前的记录时间，看下时间是否超过10分钟
                var activeTime = iptv.getCookie("heartbeatTime");
                //获取当前时间
                var curTime = iptv.getServerDate().getTime();
                var bl = false;
                //判断是否是首次记录
                if (activeTime == undefined || activeTime == null || activeTime == '') {
                    bl = true;
                } else if ((curTime - activeTime) >= iptv.config.HeartBeatTime) {
                    //如果当前是将距离上次记录时间超过配置的心跳频率，那么就提交数据
                    bl = true;
                } else {
                    bl = false;
                }
                if (bl == true) {
                    if (iptv.api && iptv.api.log && iptv.api.log.activeLog) {
                        iptv.api.log.activeLog();
                    }
                    //记录当前记录时间到日志
                    iptv.setCookie("heartbeatTime", iptv.getServerDate().getTime());
                }
            } else {
                clearInterval(iptv.config.HeartbeatInterval);
            }
        }, 1000),

    });

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
        Paging:function(currPage_,alls_,pageSize_)
        {
            if(!isNaN(currPage_))
            {
                this.currPage = currPage_;
            }else{
                this.currPage = 0;
            }

            if(!isNaN(alls_))
            {
                this.alls = alls_;
            }else{
                this.alls = 0;
            }
            if(!isNaN(pageSize_))
            {
                this.pageSize = pageSize_;
            }else{
                this.pageSize = 8;
            }
            if(this.alls > 0)
            {
                this.pageCount = Math.ceil((this.alls * 1.0)/this.pageSize);
                if(this.pageCount == 0)
                {
                    this.currPage = 0;
                }
            }else{
                this.pageCount = 0;
            }
            if(this.currPage > 0 && this.pageSize > 0)
            {
                this.outvideosSize = (this.currPage -1) * this.pageSize;
            }
        },
        
    });
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
            if(!url)return;
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
            if(!ottUserToken)return;
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

})(window, iptv);