/**
 * Created by cherish on 2017/12/14.
 */

(function (window, iptv) {
    iptv.config = {};
    iptv.extend(iptv.config, {
        /**
         * 调试模式
         */
        DeBug: false,
        /**
         * 统一资源图路径
         */
        ImgContextUrl: "http://58.213.214.82:58080/uploadfile_gpf",
        /**
         * 平台编号
         */
        PID: 3,
        /**
         * 区域编号
         */
        PAOPID: 6,
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
        PlatFormWebContextPath: iptv.getHostPath() + "/gpf-web-jsyd/",
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
})(window, iptv);