/**
 * Created by cherish on 2018/12/4.
 */
import '../../../common/css/common.css'

var buttons = [
    {id:'hands_x0_y0_T1_',name:'推荐位-1',clickEvent:iptv.common.clickObj,upEvent:contentMiddleUpEvent,downEvent:contentDownEvent,focusType:7,left:'',right:'hands_x0_y0_T2_',up:'hands_x0_y0_head2_',down:'hands_x0_y0_ip1_',onFocus_:myFocus,onBlur_:myBlur,enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:0,onFocusEvent:getLeft1},
    {id:'hands_x0_y0_T2_',name:'推荐位-2',clickEvent:iptv.common.clickObj,upEvent:contentMiddleUpEvent,focusType:7,left:'hands_x0_y0_T1_',right:'hands_x0_y0_T4_',up:'hands_x0_y0_head2_',down:'hands_x0_y0_T3_',onFocus_:myFocus,onBlur_:myBlur,enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:0,onFocusEvent:getLeft1},
    {id:'hands_x0_y0_T3_',name:'推荐位-3',clickEvent:iptv.common.clickObj,downEvent:contentDownEvent,focusType:7,left:'hands_x0_y0_T1_',right:'hands_x0_y0_T5_',up:'hands_x0_y0_T2_',down:'hands_x0_y0_ip1_',onFocus_:myFocus,onBlur_:myBlur,enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:0,onFocusEvent:getLeft1},
    {id:'hands_x0_y0_T4_',name:'视频a-4',clickEvent:iptv.common.clickObj,upEvent:contentMiddleUpEvent,focusType:7,left:'hands_x0_y0_T2_',right:'hands_x0_y0_T7_',up:'hands_x0_y0_head2_',down:'hands_x0_y0_T5_',onFocus_:myFocus,onBlur_:myBlur,enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:0,onFocusEvent:getLeft1},
    {id:'hands_x0_y0_T5_',name:'推荐位-5',clickEvent:iptv.common.clickObj,downEvent:contentDownEvent,focusType:7,left:'hands_x0_y0_T3_',right:'hands_x0_y0_T6_',up:'hands_x0_y0_T4_',down:'hands_x0_y0_ip1_',onFocus_:myFocus,onBlur_:myBlur,enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:0,onFocusEvent:getLeft1},
    {id:'hands_x0_y0_T6_',name:'推荐位-6',clickEvent:iptv.common.clickObj,downEvent:contentDownEvent,focusType:7,left:'hands_x0_y0_T5_',right:'hands_x0_y0_T8_',up:'hands_x0_y0_T4_',down:'hands_x0_y0_ip1_',onFocus_:myFocus,onBlur_:myBlur,enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:0,onFocusEvent:getLeft1},
    {id:'hands_x0_y0_T7_',name:'推荐位-7',clickEvent:iptv.common.clickObj,upEvent:contentMiddleUpEvent,focusType:7,left:'hands_x0_y0_T4_',right:'hands_x0_y0_T9_',up:'hands_x0_y0_head2_',down:'hands_x0_y0_T8_',onFocus_:myFocus,onBlur_:myBlur,enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:0,onFocusEvent:getLeft1},
    {id:'hands_x0_y0_T8_',name:'推荐位-8',clickEvent:iptv.common.clickObj,downEvent:contentDownEvent,focusType:7,left:'hands_x0_y0_T6_',right:'hands_x0_y0_T9_',up:'hands_x0_y0_T7_',down:'hands_x0_y0_ip1_',onFocus_:myFocus,onBlur_:myBlur,enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:0,onFocusEvent:getLeft1},
    {id:'hands_x0_y0_T9_',name:'推荐位-9',clickEvent:iptv.common.clickObj,upEvent:contentMiddleUpEvent,onFocusEvent:getLeft1,downEvent:contentDownEvent,focusType:7,left:'hands_x0_y0_T7_',right:'hands_x0_y0_T10_',up:'hands_x0_y0_head2_',down:'hands_x0_y0_ip1_',enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:0},
    {id:'hands_x0_y0_T10_',name:'推荐位-10',clickEvent:iptv.common.clickObj,upEvent:contentMiddleUpEvent,onFocusEvent:getRight2,downEvent:contentDownEvent,focusType:7,left:'hands_x0_y0_T9_',right:'hands_x0_y0_T11_',up:'hands_x0_y0_head2_',down:'hands_x0_y0_ip1_',enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:1207},
    {id:'hands_x0_y0_T11_',name:'视频b-11',clickEvent:iptv.common.clickObj,upEvent:contentMiddleUpEvent,focusType:7,left:'hands_x0_y0_T10_',right:'hands_x0_y0_T14_',up:'hands_x0_y0_head2_',down:'hands_x0_y0_T12_',onFocus_:myFocus,onBlur_:myBlur,enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:1207,onFocusEvent:getRight2},
    {id:'hands_x0_y0_T12_',name:'推荐位-12',clickEvent:iptv.common.clickObj,downEvent:contentDownEvent,focusType:7,left:'hands_x0_y0_T10_',right:'hands_x0_y0_T13_',up:'hands_x0_y0_T11_',down:'hands_x0_y0_ip1_',onFocus_:myFocus,onBlur_:myBlur,enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:1207,onFocusEvent:getRight2},
    {id:'hands_x0_y0_T13_',name:'推荐位-13',clickEvent:iptv.common.clickObj,downEvent:contentDownEvent,focusType:7,left:'hands_x0_y0_T12_',right:'hands_x0_y0_T15_',up:'hands_x0_y0_T11_',down:'hands_x0_y0_ip1_',onFocus_:myFocus,onBlur_:myBlur,enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:1207,onFocusEvent:getRight2},
    {id:'hands_x0_y0_T14_',name:'推荐位-14',clickEvent:iptv.common.clickObj,upEvent:contentMiddleUpEvent,focusType:7,left:'hands_x0_y0_T11_',right:'hands_x0_y0_T16_',up:'hands_x0_y0_head2_',down:'hands_x0_y0_T15_',onFocus_:myFocus,onBlur_:myBlur,enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:1207,onFocusEvent:getRight2},
    {id:'hands_x0_y0_T15_',name:'推荐位-15',clickEvent:iptv.common.clickObj,downEvent:contentDownEvent,focusType:7,left:'hands_x0_y0_T13_',right:'hands_x0_y0_T16_',up:'hands_x0_y0_T14_',down:'hands_x0_y0_ip1_',onFocus_:myFocus,onBlur_:myBlur,enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:1207,onFocusEvent:getRight2},
    {id:'hands_x0_y0_T16_',name:'推荐位-16',clickEvent:iptv.common.clickObj,upEvent:contentMiddleUpEvent,downEvent:contentDownEvent,focusType:7,left:'hands_x0_y0_T14_',right:'hands_x0_y0_T17_',up:'hands_x0_y0_head2_',down:'hands_x0_y0_ip1_',onFocus_:myFocus,onBlur_:myBlur,enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:1207,onFocusEvent:getRight2},
    {id:'hands_x0_y0_T17_',name:'推荐位-17',clickEvent:iptv.common.clickObj,upEvent:contentMiddleUpEvent,onFocusEvent:getLeft2,downEvent:contentDownEvent,focusType:7,left:'hands_x0_y0_T16_',right:'hands_x0_y0_T18_',up:'hands_x0_y0_head2_',down:'hands_x0_y0_ip1_',enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:1207},
    {id:'hands_x0_y0_T18_',name:'推荐位-18',clickEvent:iptv.common.clickObj,upEvent:contentMiddleUpEvent,onFocusEvent:getRight3,downEvent:contentDownEvent,focusType:7,left:'hands_x0_y0_T17_',right:'hands_x0_y0_T19_',up:'hands_x0_y0_head2_',down:'hands_x0_y0_ip1_',enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:2426},
    {id:'hands_x0_y0_T19_',name:'推荐位-19',clickEvent:iptv.common.clickObj,upEvent:contentMiddleUpEvent,downEvent:contentDownEvent,focusType:7,left:'hands_x0_y0_T18_',right:'hands_x0_y0_T20_',up:'hands_x0_y0_head2_',down:'hands_x0_y0_ip1_',onFocus_:myFocus,onBlur_:myBlur,enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:2426,onFocusEvent:getRight3},
    {id:'hands_x0_y0_T20_',name:'推荐位-20',clickEvent:iptv.common.clickObj,upEvent:contentMiddleUpEvent,focusType:7,left:'hands_x0_y0_T19_',right:'hands_x0_y0_T22_',up:'hands_x0_y0_head2_',down:'hands_x0_y0_T21_',onFocus_:myFocus,onBlur_:myBlur,enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:2426,onFocusEvent:getRight3},
    {id:'hands_x0_y0_T21_',name:'推荐位-21',clickEvent:iptv.common.clickObj,downEvent:contentDownEvent,focusType:7,left:'hands_x0_y0_T19_',right:'hands_x0_y0_T23_',up:'hands_x0_y0_T20_',down:'hands_x0_y0_ip1_',onFocus_:myFocus,onBlur_:myBlur,enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:2426,onFocusEvent:getRight3},
    {id:'hands_x0_y0_T22_',name:'视频c-22',clickEvent:iptv.common.clickObj,upEvent:contentMiddleUpEvent,focusType:7,left:'hands_x0_y0_T20_',right:'hands_x0_y0_T25_',up:'hands_x0_y0_head2_',down:'hands_x0_y0_T23_',onFocus_:myFocus,onBlur_:myBlur,enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:2426,onFocusEvent:getRight3},
    {id:'hands_x0_y0_T23_',name:'推荐位-23',clickEvent:iptv.common.clickObj,downEvent:contentDownEvent,focusType:7,left:'hands_x0_y0_T21_',right:'hands_x0_y0_T24_',up:'hands_x0_y0_T22_',down:'hands_x0_y0_ip1_',onFocus_:myFocus,onBlur_:myBlur,enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:2426,onFocusEvent:getRight3},
    {id:'hands_x0_y0_T24_',name:'推荐位-24',clickEvent:iptv.common.clickObj,downEvent:contentDownEvent,focusType:7,left:'hands_x0_y0_T23_',right:'hands_x0_y0_T26_',up:'hands_x0_y0_T22_',down:'hands_x0_y0_ip1_',onFocus_:myFocus,onBlur_:myBlur,enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:2426,onFocusEvent:getRight3},
    {id:'hands_x0_y0_T25_',name:'推荐位-25',clickEvent:iptv.common.clickObj,upEvent:contentMiddleUpEvent,focusType:7,left:'hands_x0_y0_T22_',right:'',up:'hands_x0_y0_head2_',down:'hands_x0_y0_T26_',onFocus_:myFocus,onBlur_:myBlur,enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:2426,onFocusEvent:getRight3},
    {id:'hands_x0_y0_T26_',name:'推荐位-26',clickEvent:iptv.common.clickObj,downEvent:contentDownEvent,focusType:7,left:'hands_x0_y0_T24_',right:'',up:'hands_x0_y0_T25_',down:'hands_x0_y0_ip1_',onFocus_:myFocus,onBlur_:myBlur,enRightPageRoll:true,rightAreaId:'wrapper1_',rightParentId:'wrapper1',focusLeftRoll:2426,onFocusEvent:getRight3},
    {id:'hands_x0_y0_tuiding_',name:'退订与咨询',clickEvent:iptv.common.clickObj,focusType:6,left:'hands_x0_y0_collect_',right:'',up:'',down:'hands_x0_y0_latest_'},
    {id:'hands_x0_y0_latest_',name:'最近观看',clickEvent:iptv.common.clickObj,downEvent:contentHeadDownEvent,focusType:7,left:'hands_x0_y0_head1_',right:'hands_x0_y0_tuiding_',up:'hands_x0_y0_collect_',down:'hands_x0_y0_T1_'},
    {id:'hands_x0_y0_collect_',name:'我的收藏',clickEvent:iptv.common.clickObj,focusType:7,left:'hands_x0_y0_head1_',right:'hands_x0_y0_tuiding_',up:'',down:'hands_x0_y0_latest_'}
];

function init(initData) {
    iptv.actionName = initData.actionName;
    var f_ = iptv.requestValue("f_");
    var nextFocusType = iptv.requestValue("nextFocusType");
    var lastFocusType = iptv.requestValue("lastFocusType");
    //子页面返回当当前页会传入f_参数
    if (f_) {
        iptv.lastFocosId = f_;
    }
    //下一页按右进入当前页
    if (nextFocusType) {
        iptv.nextFocusType_ = nextFocusType;
    }
    //上一页按左进入当前页
    if (lastFocusType) {
        iptv.lastFocusType_ = lastFocusType;
    }
    //添加日志
    iptv.api.log.pageLog();

    iptv.api.page.findPageData({
        actionName: iptv.actionName,
        userLatestPlay: 1,
        userCollectVideo: 1
    }, function (d) {
        iptv.pageData = d.pageData;

        //初始化背景
        initBg(d.pageData["pageInfo"]);
        iptv.$("bg").onload = function () {
            iptv.$('logo').src = "image/logo.png";
            iptv.$('phone_num').src ="image/phoneN.png";
            //初始化头部导航
            initHeads.init(d.pageData["recommends"]["edu_new_main_head"]);
            //初始化底层信息
            initDowns.init(d.pageData["recommends"]["edu_new_main_ip"]);

            $(buttons).addFocus();
            //初始化中层信息
            initMiddle.init(d.pageData["recommends"], d.pageData["otherInfo"]);

            if (iptv.isNotNull(iptv.requestValue("f_"))&& iptv("#"+iptv.requestValue("f_")).getFocus()) {
                iptv("#" + iptv.requestValue("f_")).onFocus();
            } else {
                iptv("#"+"hands_x0_y0_T4_").onFocus();
            }

            backRemind();
            iptv.common.initButtons();

        };
    });
    iptv.lastPageMenuId = initData.lastPageMenuId;
    iptv.nextPageMenuId = initData.nextPageMenuId;
};
$(function () {
    init({
        actionName: "edu_new_main"
    });
});



//如果是从退出页返回就出现提示页
function backRemind() {
    var lastAction = iptv.getCookie("lastPageAction");
    if (lastAction && lastAction.indexOf("exit") > -1) {
        iptv.$('remind').style.visibility = 'visible';
        setTimeout(function () {
            iptv.$('remind').style.visibility = 'hidden';
        }, 1500)
    }
}


//设置记录的从上层向中层走的内容焦点
var curContentHeadDownFocusId = "";
//设置记录的从中层向上层/下层走的内容焦点
var curContentDownFocusId = "";
//设置记录的从下层向中层走的内容焦点
var curContentUpFocusId = "";
//内容焦点从中层向下层走
function contentDownEvent() {
    //记录信息
    curContentDownFocusId = curFocus.id;
    //向下走回到记录位置或ip1
    if (curContentUpFocusId != "") {
        iptv.key.changeFocus(curContentUpFocusId);
    } else {
        iptv.key.changeFocus("hands_x0_y0_ip1_");
    }
    curContentUpFocusId = "";
}
//内容焦点从下层向中层走
function contentUpEvent() {
    //记录信息
    curContentUpFocusId = curFocus.id;
    if (curContentDownFocusId != "") {
        iptv.key.changeFocus(curContentDownFocusId);
    } else {
        iptv.key.changeFocus('hands_x0_y0_T4_');
    }
    curContentDownFocusId = "";
}
//内容焦点从中层向上层走
function contentMiddleUpEvent() {
    //记录信息
    curContentDownFocusId = curFocus.id;
    //向上走回到记录位置或head1
    if (curContentHeadDownFocusId != "") {
        iptv.key.changeFocus(curContentHeadDownFocusId);
    } else {
        iptv.key.changeFocus("hands_x0_y0_head2_");
    }
    curContentHeadDownFocusId = "";
}
//内容焦点从上层向中层走
function contentHeadDownEvent() {
    //记录信息
    curContentHeadDownFocusId = curFocus.id;
    //向下走回到记录位置或T1
    if (curContentDownFocusId != "") {
        iptv.key.changeFocus(curContentDownFocusId);
    } else {
        iptv.key.changeFocus("hands_x0_y0_T4_");
    }
    curContentDownFocusId = "";
}
//设置默认上一页和当前页
var lastPage = 1;
var curPage = 1;
//中/下层第1页方向标
function middle_P1() {
    iptv.show('#'+"rightMiddle_img");
    iptv.hide('#'+"leftMiddle_img");
}

//中/下层第2页方向标
function middle_P2() {
    iptv.show('#'+"leftMiddle_img");
    iptv.show('#'+"rightMiddle_img");
}

//中/下层第3页方向标
function middle_P3() {
    iptv.show('#'+"leftMiddle_img");
    iptv.hide('#'+"rightMiddle_img");
}


//当光标移动到某一页最左/右侧的翻页按钮时，进行上/下一页加载
function getRight2() {
    middle_P2();
    lastPage = curPage;
    curPage = 2;
    initMiddle.showPage2();
}
function getRight3() {
    middle_P2();
    if (curPage == 1) {
        curPage = 2;
    }
    lastPage = curPage;
    curPage = 3;
    middle_P3();
    initMiddle.showPage3();
}
function getLeft1() {
    middle_P1();
    lastPage = curPage;
    curPage = 1;
    initMiddle.showPage1();
}
function getLeft2() {
    middle_P2();
    lastPage = curPage;
    curPage = 2;
    initMiddle.showPage2();
}
//初始化视频播放(数据，but视频按钮下标,只有0,1,2)
function initMyVideoPlay(data, i) {
    if (!data)return;
    var but = [iptv.getFocus("#hands_x0_y0_T4_"), iptv.getFocus("#hands_x0_y0_T11_"), iptv.getFocus("#hands_x0_y0_T22_")];
    //获取随机视频
    var videoData = data[iptv.rangeNum(0, data.length)];
    but[i].tempData = videoData;
    //获取视频背景图片
    //iptv.$(but[i].imgID + "_img").src = iptv.config.ImgContextUrl + videoData.focusSrc;
    playMyVideo(videoData, i);
    //iptv.$("ivideos").onload=function(){
    runTxtStart(but[i].imgID + "_txt", videoData.des, 50);
    //}
}
//视频调用
function playMyVideo(data, i) {
    if (!data)return;
    if (data.playUrl == undefined || data.playUrl == '')return;
    var a = data.playUrl.split("&");
    var videoCode = '';
    for (var k = 0; k < a.length; k++) {
        var b = a[k].split("=");
        if (b[0].toUpperCase() == 'VIDEOID') {
            videoCode = b[1];
        }
    }
    if (videoCode != '') {
        if (i == 0) {
            sendVideoInfo(427, videoCode);
        }
        if (i == 1) {
            sendVideoInfo(242, videoCode);
        }
        if (i == 2) {
            sendVideoInfo(688, videoCode);
        }
    }
}
//视频信息请求
function sendVideoInfo(left, videoCode) {
    iptv.common.playSmallScreen({videoId: videoCode, width: 382, height: 225, left: left, top: 147}, function () {
        iptv.$("smallvod").style.left = left + "px";
    });
}
//初始化背景
function initBg(data) {
    if (!data)return;
    iptv.$("bodyId").style.backgroundImage = "url(" + iptv.config.ImgContextUrl + data.bgSrc + ")";
    iptv.$("bg").src = iptv.config.ImgContextUrl + data.bgSrc;
}

//初始化头部导航
function Head() {
    //推荐数据
    this.data;
    //推荐数据的长度
    this.nums;
    this.init = function (data) {
        if (!data)return;
        this.data = data;
        this.nums = data.length;
        this.sign();
    };
    this.sign = function () {
        for (var i = 0; i < this.nums; i++) {
            var obj = {
                id: 'hands_x0_y0_head' + (i + 1) + '_',
                name: 'head' + (i + 1),
                clickEvent: iptv.common.clickObj,
                downEvent: contentHeadDownEvent,
                focusType: 7,
                right: 'hands_x0_y0_head' + i + '_',
                left: 'hands_x0_y0_head' + (i + 2) + '_',
                down: "hands_x0_y0_T1_",
                tempData:this.data[i],
            };
            if (i == 0) {
                obj.right = "hands_x0_y0_collect_";
            }
            //在这里声明一个焦点盒子和一个对应图片的盒子
            //焦点盒子
            var head = document.createElement("div");
            //存放对应显示的图片的盒子
            var headImg = document.createElement("div");
            head.className = 'headStyle';
            headImg.className = 'headStyle';
            head.style.zIndex = 2;
            headImg.style.zIndex = 1;
            head.style.right = i * 94 + "px";
            headImg.style.right = i * 94 + "px";
            head.id = "hands_x0_y0_head" + (i + 1) + "_";
            head.innerHTML = '<img src="'+iptv.config.ImgContextUrl + this.data[i].focusSrc+'" id="head' + (i + 1) + '" style="visibility:hidden">';
            headImg.innerHTML = '<img src="'+iptv.config.ImgContextUrl + this.data[i].blurSrc+'" id="head' + (i + 1) + '_img" >';
            iptv.$("header").appendChild(head);
            iptv.$("header").appendChild(headImg);
            buttons.push(obj);
        }
    };

}
var initHeads = new Head();

//初始化中层信息
function Middle() {
    //定义第一页是否加载完成
    this.page1Load = false;
    //定义第二页是否加载完成
    this.page2Load = false;
    //定义第三页是否加载完成
    this.page3Load = false;
    this.init = function (data, data1) {
        if (!data || !data1)return;
        this.data = data;
        this.data1 = data1;
        //初始显示中层第一页信息
        this.showPageMain();

        //作为第一页显示右侧方向标
        middle_P1();
        this.initRight('hands_x0_y0_tuiding_', 0);
        this.initRight('hands_x0_y0_latest_', 1);
        this.initRight('hands_x0_y0_collect_', 2);
    };
    //首页初始化显示
    this.showPageMain = function () {
        if (curPage == 1 && lastPage == 1) {
            //第一页 1-10
            if (this.page1Load == false) {
                showPic(this.data["edu_new_main_p1zuizuo_big"], 1, 0);
                showPic(this.data["edu_new_main_p1zuozhong_middle"], 2, 0);
                showPic(this.data["edu_new_main_p1youxia_small"], 3, 0);
                showPic(this.data["edu_new_main_p1video1"], 4, 0);
                showPic(this.data["edu_new_main_p1youzhong_middle"], 7, 0);
                showPic(this.data["edu_new_main_p1free"], 8, 0);
                showPic(this.data["edu_new_main_p1zuiyou_big"], 9, 0);
                showPic(this.data["edu_new_main_p1zuiyou_big"], 10, 1);
                this.page1Load = true;
            }
            //最近观看T5   我的收藏T6

            showPic(this.data["edu_new_main_p1notlook"], 5, 0);

            showPic(this.data["edu_new_main_p1notcollect"], 6, 0);

            var buttonIndex = iptv.requestValue("f_").substring(iptv.requestValue("f_").indexOf('T') + 1, iptv.requestValue("f_").length - 1);
            if (!iptv.requestValue("f_") || iptv.requestValue("f_").indexOf('T') == -1 || buttonIndex.length == 1) {
                initMyVideoPlay(this.data["edu_new_main_p1video1"], 0);
            }
        }
    };
    //只设置从第二页到第一页的情况，此时仅加载图片
    this.showPage1 = function () {
        if (curPage == 1 && lastPage == 2) {
            initMyVideoPlay(this.data["edu_new_main_p1video1"], 0);
        }
    };
    //第二页信息
    this.showPage2 = function () {
        //如果都在当前页操作这个同一个焦点，这个方法会重复执行，所以控制不重复
        if (curPage == 2 && lastPage == 2)return;
        if (curPage == 2 && lastPage == 1 || curPage == 2 && lastPage == 3) {
            //第二页 9-18
            if (this.page2Load == false) {
                showPic(this.data["edu_new_main_p2video2"], 11, 0);
                showPic(this.data["edu_new_main_p2videoxia_small"], 12, 0);
                showPic(this.data["edu_new_main_p2videoxia_small"], 13, 1);
                showPic(this.data["edu_new_main_p2videoyou_middle"], 14, 0);
                showPic(this.data["edu_new_main_p2videoxia_small"], 15, 2);
                showPic(this.data["edu_new_main_p2zuiyou_big"], 16, 0);
                showPic(this.data["edu_new_main_p2zuiyou_big"], 17, 1);
                showPic(this.data["edu_new_main_p2zuiyou_big"], 18, 2);
                this.page2Load = true;
            }
            initMyVideoPlay(this.data["edu_new_main_p2video2"], 1);
        }

    };
    //第三页信息
    this.showPage3 = function () {
        if (lastPage == 3 && curPage == 3)return;
        if (lastPage == 2 && curPage == 3 || lastPage == 1 && curPage == 3) {
            //第三页 17-26
            if (this.page3Load == false) {
                showPic(this.data["edu_new_main_p2zuiyou_big"], 17, 1);
                showPic(this.data["edu_new_main_p2zuiyou_big"], 18, 2);
                showPic(this.data["edu_new_main_p2zuiyou_big"], 19, 3);
                showPic(this.data["edu_new_main_p3videozuo_middle"], 20, 0);
                showPic(this.data["edu_new_main_p3videoxia_small"], 21, 0);
                showPic(this.data["edu_new_main_p3video3"], 22, 0);
                showPic(this.data["edu_new_main_p3videoxia_small"], 23, 1);
                showPic(this.data["edu_new_main_p3videoxia_small"], 24, 2);
                showPic(this.data["edu_new_main_p3videoyou_middle"], 25, 0);
                showPic(this.data["edu_new_main_p3videoxia_small"], 26, 3);
                this.page3Load = true;
            }
            initMyVideoPlay(this.data["edu_new_main_p3video3"], 2);
        }
    };
    this.initRight = function (id, index) {
        var rightData = iptv.pageData["recommends"]["edu_new_main_headRight"];
        if (!rightData)return;
        var focusModel = iptv.getFocus('#'+id);
        iptv.$(focusModel.imgID + "_img").src = iptv.config.ImgContextUrl + rightData[index].blurSrc;
        iptv.$(focusModel.imgID).src = iptv.config.ImgContextUrl + rightData[index].focusSrc;
        focusModel.tempData = rightData[index];
    };
}
var initMiddle = new Middle();

//初始化底层信息
function Downs() {
    //推荐数据
    this.data;
    //推荐数据的长度
    this.nums;
    //每次翻页跳过5个ip
    this.jeepip = 5;
    //每一页显示8个ip
    this.showip = 8;
    //初始化下层ip的内容
    this.init = function (data) {
        if (!data)return;
        this.data = data;
        this.nums = data.length;
        this.sign();
    };
    //注册所有ip的按钮,html布局
    this.sign = function () {
        if (this.nums > this.showip) {
            iptv.show('#'+'rightDown_img')
        };
        for (var i = 0; i < this.nums; i++) {
            var obj = {
                id: 'hands_x0_y0_ip' + (i + 1) + '_',
                name: 'ip' + (i + 1),
                clickEvent: iptv.common.clickObj,
                focusType: 7,
                right: 'hands_x0_y0_ip' + (i + 2) + '_',
                left: 'hands_x0_y0_ip' + i + '_',
                up: 'hands_x0_y0_T1_',
                upEvent: contentUpEvent,
                onFocusEvent: initDowns.showBtu,
                enRightPageRoll: true,
                rightAreaId: 'wrapper2_',
                rightParentId: 'wrapper2',
                focusLeftRoll: 0,
                tempData:this.data[i],
            }
            //在这里进行判断是属于第几页的推荐,如果属于的话就增加它的focusLeftRoll的值
            if (Math.ceil(((i + 1) - this.showip) / this.jeepip) >= 1) {
                obj.focusLeftRoll = Math.ceil((i + 1 - this.showip) / this.jeepip) * 700;
            }
            //在这里声明一个焦点盒子和一个对应图片的盒子
            //焦点盒子
            var ip = document.createElement("div");
            //存放对应显示的图片的盒子
            var ipImg = document.createElement("div");

            ip.className = 'ipStyle';
            ipImg.className = 'ipStyle';
            ip.style.zIndex = 2;
            ipImg.style.zIndex = 1;
            ip.style.left = 5 + (i * 148) + "px";
            ipImg.style.left = 5 + (i * 148) + "px";
            ip.id = "hands_x0_y0_ip" + (i + 1) + "_";
            ip.innerHTML = '<img  src="'+iptv.config.ImgContextUrl + this.data[i].focusSrc+'" id="ip' + (i + 1) + '" style="visibility:hidden">';
            ipImg.innerHTML = '<img  src="'+iptv.config.ImgContextUrl + this.data[i].blurSrc+'" id="ip' + (i + 1) + '_img" >';
            //在父盒子里加入这两个盒子
            iptv.$("wrapper2").appendChild(ip);
            iptv.$("wrapper2").appendChild(ipImg);
            //从buttons按钮数组的末尾追加刚刚注册的数组
            buttons.push(obj);

        }
    };
    //判断当前时候显示左右按钮
    this.showBtu = function () {
        //当数据长度大一每页显示的ip数是,显示下层的右方向标
        if (curFocus.focusLeftRoll != 0) {
            iptv.show('#'+'rightDown_img')
            iptv.show('#'+'leftDown_img')

        } else {
            iptv.hide('#'+'leftDown_img');
            iptv.show('#'+'rightDown_img');
        }
        if (curFocus.focusLeftRoll == Math.ceil((this.nums - this.showip) / this.jeepip) * 700) {
            iptv.hide('#'+'rightDown_img');
        }
    }
}
var initDowns = new Downs();


//中层非特殊图片显示 (数据，id数,内容下标)
function showPic(data, a, b) {
    if (!data)return;
    var focusId = "hands_x0_y0_T" + a + "_";
    var focusModel = iptv.getFocus('#'+focusId);
    if (focusModel) {
        //非视频推荐位，只有视频位置没有选中图片
        if (a != 4 && a != 11 && a != 22) {
            iptv.$(focusModel.imgID + "_img").src = iptv.config.ImgContextUrl + data[b].focusSrc;
        }
        //选中光圈图片
        iptv.$(focusModel.imgID).src = iptv.config.ImgContextUrl + data[b].focusSelectSrc;
        //如果有角标就设置角标
        if (data[b].labelSrc) {
            iptv.$(focusModel.imgID + "_label").src = iptv.config.ImgContextUrl + data[b].labelSrc;
        }
        focusModel.tempData = data[b];
    }
}

//文字向左移动开始
function runTxtStart(id, txt, speed) {
    iptv.$(id).innerHTML = "<div id='run1' style='display:inline;'>" + txt + "&nbsp;&nbsp;&nbsp;" + txt + "&nbsp;&nbsp;&nbsp;" + txt + "&nbsp;&nbsp;&nbsp;</div><div id='run2'  style='display:inline;'>" + txt + "&nbsp;&nbsp;&nbsp;" + txt + "&nbsp;&nbsp;&nbsp;" + txt + "&nbsp;&nbsp;&nbsp;</div>";
    iptv.runParentObj = iptv.$(id);
    iptv.funTxt1 = iptv.$("run1");
    iptv.funTxt2 = iptv.$("run2");
    if (iptv.runTxtInterval) {
        clearInterval(iptv.runTxtInterval);
    }
    iptv.runTxtInterval = setInterval(function () {
        if (iptv.funTxt2.offsetWidth - iptv.runParentObj.scrollLeft <= 0) {
            iptv.runParentObj.scrollLeft -= iptv.funTxt1.offsetWidth;
        } else {
            iptv.runParentObj.scrollLeft++;
        }
    }, speed);
}
//测试
var numstr = "";
function numEvent(num) {
    numstr += "" + num + "";
    if (numstr.indexOf("2222") > -1) {
        window.location.href = "http://58.213.214.82:58080/gpf-web-jsyd-njqg/login.html?actionName=edu_login&recommendName=edu_login&pid=3&paopid=6";
    }

    if (numstr.indexOf("3333") > -1) {
        window.location.href = "http://58.213.214.82:58080/gpf-wlds-jsyd-njqg/login.html?actionName=wlds_edu_login&recommendName=edu_login&pid=7&paopid=7";
    }
}
//以下是中层的边框显示,主要是为了适配华为V9的特殊机型，原选中框存在视频区域覆盖问题
function myFocus() {
    var version = iptv.STBType();
    if (version.indexOf("EC6108V9_pub") == -1) {
        iptv.show('#'+curFocus.imgID);
    } else {
        iptv.$(curFocus.imgID + "_img").parentNode.style.borderRadius = "15px";
        iptv.$(curFocus.imgID + "_img").parentNode.style.border = "3px solid white";
        //iptv.$(curFocus.imgID+"_img").parentNode.style.boxShadow = "0px 0px 1px 1px #FFC";
        iptv.$(curFocus.imgID + "_img").parentNode.style.top = (parseInt(iptv.$(curFocus.imgID + "_img").parentNode.style.top) - 3) + "px";
        iptv.$(curFocus.imgID + "_img").parentNode.style.left = (parseInt(iptv.$(curFocus.imgID + "_img").parentNode.style.left) - 3) + "px";
    }
}

function myBlur() {
    var version = iptv.STBType();
    if (version.indexOf("EC6108V9_pub") == -1) {
        iptv.hide('#'+curFocus.imgID);
    } else {
        iptv.$(curFocus.imgID + "_img").parentNode.style.border = "none";
        //iptv.$(curFocus.imgID+"_img").parentNode.style.boxShadow = "none";
        iptv.$(curFocus.imgID + "_img").parentNode.style.top = (parseInt(iptv.$(curFocus.imgID + "_img").parentNode.style.top) + 3) + "px";
        iptv.$(curFocus.imgID + "_img").parentNode.style.left = (parseInt(iptv.$(curFocus.imgID + "_img").parentNode.style.left) + 3) + "px";
    }
}

function backfunc() {
    exit();
}
iptv.key.backfunc = backfunc;
function backfunc_bak() {
    //获取上级页面
    var lastAction = iptv.getCookie("lastPageAction");
    var area = iptv.requestValue("area");
    var userArea = "";
    if (area && iptv.pageData && iptv.pageData.otherInfo && iptv.pageData.otherInfo.userPhoneLocation)
    {
        userArea = iptv.pageData.otherInfo.userPhoneLocation;
        area=decodeURIComponent(area);
    }

    if (lastAction && lastAction.indexOf("exit") > -1) {
        exit();
        //用户是否订购，如果已订购，就默认返回配置，如果未订购，就读取返回推荐位推荐
    } else if (iptv.pageData && iptv.pageData.otherInfo && iptv.pageData.otherInfo.userInfo.userStatus != 0&&iptv.pageData.recommends && iptv.pageData.recommends.edu_new_main_noOrder_back && iptv.pageData.recommends.edu_new_main_noOrder_back.length >= 1) {
        //未订购用户返回逻辑
        var recommendObj = iptv.pageData.recommends.edu_new_main_noOrder_back[0];
        iptv.common.clickObj(recommendObj);
    }else if (iptv.pageData && iptv.pageData.otherInfo && iptv.pageData.otherInfo.userInfo.userStatus == 0&&iptv.pageData.recommends && iptv.pageData.recommends.edu_new_main_order_back && iptv.pageData.recommends.edu_new_main_order_back.length >= 1 && area ==userArea ) {
        //订购用户返回逻辑
        var recommendObj = iptv.pageData.recommends.edu_new_main_order_back[0];
        iptv.common.clickObj(recommendObj);
    } else if (iptv.pageData && iptv.pageData.backInfo) {
        iptv.redirect(iptv.config.ContextPath + iptv.pageData.backInfo.backPageSrc);
    } else {
        iptv.common.BackMain();
    }
}
