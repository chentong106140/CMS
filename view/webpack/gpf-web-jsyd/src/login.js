/**
 * Created by cherish on 2018/11/29.
 */

import iptv from 'morgan-iptv-core'
import './common/js/iptv.config.js'
import './common/js/iptv.api.js'


var platFormContextPath = iptv.config.PlatFormApiPath;
var platFormWebContextPath = iptv.config.PlatFormWebContextPath;
var pid = iptv.requestValue("pid") || iptv.config.PID;
var paopid = iptv.requestValue("paopid") || iptv.config.PAOPID;
var stbinfo = null;
var befrom = iptv.requestValue("befrom") || 'default';
var recommendName = iptv.requestValue("recommendName") || 'edu_login';
var cid = iptv.requestValue("cid") || null;

function login(initData) {
    //缓存info信息
    stbinfo = iptv.androidJS.STBInfo();
    if (stbinfo != null && stbinfo != '') {
        stbinfo = eval("(" + stbinfo + ")");
    } else {
        stbinfo = null;
    }
    if (!stbinfo) {
        stbinfo = {
            //用户手机号
            mobilePhoneNumber: "188511613131",
            //用户手机号服务密码
            servicePassword: "188511613131",
            //用户业务账号
            account: "",
            //用户业务账号密码
            accountPassword: "",
            //设备MAC地址
            mac: "A0:89:E4:55:11:07",
            //设备唯一序列号
            stbSN: "",
            //开放平台主地址
            platformURL: "",
            //开放平台备地址
            platformURLBackup: "",
            //终端管理主地址
            cmsURL: "",
            //终端管理备地址
            cmsURLBackup: "",
            //HDC地址
            hdcRURL: "",
            //华为平台EPG地址
            epgAddress: "http://223.110.243.79:33200/EPG",
            //华为平台CDN地址
            cdnAddress: "http://183.207.249.71:80",
            //华为平台备份CDN地址
            backupCDNAddress: "",
            //华为平台广电序列号
            tvID: "",
            //设备类型
            deviceType: "",
            //固件版本号
            firmwareVersion: "",
            //CDN使用类型
            cdnType: "",
            userId: "188511613131",
            userName: "188511613131",
            actionName: iptv.config.ActionName,
            recommendName: recommendName,
            befrom: befrom,
            paopid: paopid,
            pid: pid,
            userIp: "223.110.243.79",
            userToken: "JSHDC-ASPIRE-18def4dc-dcb4-45e8-bbea-08b17171517a",
            versionCode: 0,
            imageServer: 'http://221.130.29.96:28080/orchard-web-jsyd'
        };
    }


    iptv.ajax({
        method: "post",
        async: "false",
        data: {
            actionName: iptv.config.ActionName,
            recommendName: stbinfo.recommendName,
            befrom: stbinfo.befrom,
            pid: stbinfo.pid,
            paopid: stbinfo.paopid,
            platFormWebContextPath: platFormWebContextPath,
            platFormRefer: encodeURIComponent(document.referrer),
            usertoken: stbinfo.userToken,
            versionCode: stbinfo.versionCode,
            //设备MAC地址
            mac: stbinfo.mac,
            userId: stbinfo.userId,
            userName: stbinfo.userName,
            userIp: stbinfo.userIp,
            //用户手机号
            mobilePhoneNumber: stbinfo.mobilePhoneNumber,
            //用户手机号服务密码
            servicePassword: stbinfo.servicePassword,
            //用户业务账号
            account: stbinfo.account,
            //用户业务账号密码
            accountPassword: stbinfo.accountPassword,
            //设备唯一序列号
            stbSN: stbinfo.stbSN,
            //开放平台主地址
            platformURL: stbinfo.platformURL,
            //开放平台备地址
            platformURLBackup: stbinfo.platformURLBackup,
            //终端管理主地址
            cmsURL: stbinfo.cmsURL,
            //终端管理备地址
            cmsURLBackup: stbinfo.cmsURLBackup,
            //HDC地址
            hdcRURL: stbinfo.hdcRURL,
            //华为平台EPG地址
            epgAddress: stbinfo.epgAddress,
            //华为平台CDN地址
            cdnAddress: stbinfo.cdnAddress,
            //华为平台备份CDN地址
            backupCDNAddress: stbinfo.backupCDNAddress,
            //华为平台广电序列号
            tvID: stbinfo.tvID,
            //设备类型
            deviceType: stbinfo.deviceType,
            //固件版本号
            firmwareVersion: stbinfo.firmwareVersion,
            //CDN使用类型
            cdnType: stbinfo.cdnType,
            videosId: cid
        },
        url: platFormContextPath + "login.json",
        success: function (d) {
            d = eval("(" + d + ")");
            if (d && d.code == 0) {
                //给apk传递用户令牌
                iptv.androidJS.PlatformToken(d.data.userLoginToken);
                //心跳
                iptv.androidJS.OTTUserToken(d.data.ottUserToken);
                findLoginData(initData);

            }
        },
        error: function () {
            iptv.androidJS.LoginCallBack(1);
        }
    });
}

function findLoginData(initData) {
    iptv.api.page.findPageData({actionName: iptv.config.ActionName},
        function (d) {
            //判断是否需要直接进入详情页面
            if (cid != null && cid != '') {
                iptv.api.page.findPageInfo({actionName: "edu_videodetail"}, function (d2) {
                    window.location.href = d2.pageSrc + "&cid=" + cid;
                    iptv.androidJS.LoginCallBack(0);
                });
            } else {
                toNext(d);
            }
        });
}

function toNext(d) {
    var data = d["pageData"]["recommends"][iptv.requestValue("recommendName")][0];
    var playUrl = "";
    if (data.playUrl != undefined && data.playUrl != "") {
        playUrl = "&" + data.playUrl;
    }
    var cid = '';
    if (data.productId) {
        cid = data.productId;
    }
    var backUrl = encodeURIComponent(platFormWebContextPath + "720p/edu/newmain/main.html?actionName=edu_new_main");
    var payBackUrl = encodeURIComponent(platFormWebContextPath + "720p/edu/newmain/main.html?actionName=edu_new_main");


    iptv.api.page.recommendNext({recommendId: data.recommendId},
        function (rdata) {
            if (rdata && rdata.url) {
                var href = platFormWebContextPath + rdata.url;
                href = iptv.api.url.getNextUrl(href, '', cid, payBackUrl, backUrl, playUrl);
                window.location.href = href;
                iptv.androidJS.LoginCallBack(0);
            }
        }, function (rdata) {
            //有鉴权
            if (rdata && rdata.url && rdata.nextUrl) {
                //获取订购地 址
                var orderUrl = platFormWebContextPath + rdata.url;
                //获取被拦截地址,也就是订购成功之后需要前往的地址
                var nextUrl = platFormWebContextPath + rdata.nextUrl;
                //下级页面地址
                nextUrl = encodeURIComponent(iptv.api.url.getNextUrl(nextUrl, '', cid, payBackUrl, backUrl, playUrl));
                //订购地址
                orderUrl = iptv.api.url.getOrderPageUrl(orderUrl, data.recommendId, cid, backUrl, nextUrl);
                window.location.href = orderUrl;
                iptv.androidJS.LoginCallBack(0);
            }
        });


}

function init(initData) {
    iptv.config.ActionName = initData.actionName;
    login(initData);
}

init({
    actionName: iptv.requestValue("actionName")
});
