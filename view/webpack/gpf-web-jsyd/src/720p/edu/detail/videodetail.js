/**
 * Created by cherish on 2018/12/4.
 */
import '../../../common/css/common.css'

var buttons = [
    {id:'hands_x0_y0_back_',name:'返回',clickEvent:"javascript:backfunc()",focusType:7,left:'hands_x0_y0_collect_',right:'',up:'',down:'hands_x0_y0_xj1_'},
    {id:'hands_x0_y0_collect_',name:'收藏',clickEvent:"javascript:clickCollect()",focusType:7,left:'',right:'hands_x0_y0_back_',up:'',down:'hands_x0_y0_xj1_'},
    {id:'hands_x0_y0_videos_',name:'视频',clickEvent:"javascript:videoplay()",focusType:7,left:'',right:'hands_x0_y0_xj1_',up:'hands_x0_y0_collect_',down:'hands_x0_y0_jp1_'},
    {id:'hands_x0_y0_xj1_',name:'第1集',clickEvent:"javascript:videoplay()",leftEvent:"javascript:gamePage.pageUp()",rightEvent:"javascript:gamePage.pageDown()",focusType:17,left:'',right:'',up:'hands_x0_y0_collect_',down:'hands_x0_y0_xj2_',selectionObjID:'xjSelection',downOtherEvent:"javascript:gamePage.xjDown()",onFocusEvent:'javascript:onFocusChangePX()',onBlurEvent:'javascript:onBlurChangePX()'},
    {id:'hands_x0_y0_xj2_',name:'第2集',clickEvent:"javascript:videoplay()",leftEvent:"javascript:gamePage.pageUp()",rightEvent:"javascript:gamePage.pageDown()",focusType:17,left:'',right:'',up:'hands_x0_y0_xj1_',down:'hands_x0_y0_xj3_',selectionObjID:'xjSelection',downOtherEvent:"javascript:gamePage.xjDown()",onFocusEvent:'javascript:onFocusChangePX()',onBlurEvent:'javascript:onBlurChangePX()'},
    {id:'hands_x0_y0_xj3_',name:'第3集',clickEvent:"javascript:videoplay()",leftEvent:"javascript:gamePage.pageUp()",rightEvent:"javascript:gamePage.pageDown()",focusType:17,left:'',right:'',up:'hands_x0_y0_xj2_',down:'hands_x0_y0_xj4_',selectionObjID:'xjSelection',downOtherEvent:"javascript:gamePage.xjDown()",onFocusEvent:'javascript:onFocusChangePX()',onBlurEvent:'javascript:onBlurChangePX()'},
    {id:'hands_x0_y0_xj4_',name:'第4集',clickEvent:"javascript:videoplay()",leftEvent:"javascript:gamePage.pageUp()",rightEvent:"javascript:gamePage.pageDown()",focusType:17,left:'',right:'',up:'hands_x0_y0_xj3_',down:'hands_x0_y0_xj5_',selectionObjID:'xjSelection',downOtherEvent:"javascript:gamePage.xjDown()",onFocusEvent:'javascript:onFocusChangePX()',onBlurEvent:'javascript:onBlurChangePX()'},
    {id:'hands_x0_y0_xj5_',name:'第5集',clickEvent:"javascript:videoplay()",leftEvent:"javascript:gamePage.pageUp()",rightEvent:"javascript:gamePage.pageDown()",focusType:17,left:'',right:'',up:'hands_x0_y0_xj4_',down:'hands_x0_y0_xj6_',selectionObjID:'xjSelection',downOtherEvent:"javascript:gamePage.xjDown()",onFocusEvent:'javascript:onFocusChangePX()',onBlurEvent:'javascript:onBlurChangePX()'},
    {id:'hands_x0_y0_xj6_',name:'第6集',clickEvent:"javascript:videoplay()",leftEvent:"javascript:gamePage.pageUp()",rightEvent:"javascript:gamePage.pageDown()",focusType:17,left:'',right:'',up:'hands_x0_y0_xj5_',down:'hands_x0_y0_pageup_',selectionObjID:'xjSelection',downOtherEvent:"javascript:gamePage.xjDown()",onFocusEvent:'javascript:onFocusChangePX()',onBlurEvent:'javascript:onBlurChangePX()'},
    {id:'hands_x0_y0_pageup_',name:'上一页',upEvent:"javascript:gamePage.lastFocus()",clickEvent:"javascript:gamePage.pageUp()",focusType:7,left:'',right:'hands_x0_y0_pagedown_',up:'hands_x0_y0_xj7_',down:'hands_x0_y0_jp1_',selectionObjID:'pageSelection'},
    {id:'hands_x0_y0_pagedown_',name:'下一页',upEvent:"javascript:gamePage.lastFocus()",clickEvent:"javascript:gamePage.pageDown()",focusType:7,left:'hands_x0_y0_pageup_',right:'',up:'hands_x0_y0_xj7_',down:'hands_x0_y0_jp1_',selectionObjID:'pageSelection'},
    {id:'hands_x0_y0_jp1_',name:'精品1',clickEvent:"javascript:clickContent()",focusType:18,left:'hands_x0_y0_pageup_',right:'hands_x0_y0_jp2_',up:'hands_x0_y0_pageup_',down:'',upOtherEvent:"javascript:gamePage.jpUp()",onFocus_:"javascript:myFocus()",onBlur_:"javascript:myBlur()"},
    {id:'hands_x0_y0_jp2_',name:'精品2',clickEvent:"javascript:clickContent()",focusType:18,left:'hands_x0_y0_jp1_',right:'hands_x0_y0_jp3_',up:'hands_x0_y0_pageup_',down:'',upOtherEvent:"javascript:gamePage.jpUp()",onFocus_:"javascript:myFocus()",onBlur_:"javascript:myBlur()"},
    {id:'hands_x0_y0_jp3_',name:'精品3',clickEvent:"javascript:clickContent()",focusType:18,left:'hands_x0_y0_jp2_',right:'hands_x0_y0_jp4_',up:'hands_x0_y0_pageup_',down:'',upOtherEvent:"javascript:gamePage.jpUp()",onFocus_:"javascript:myFocus()",onBlur_:"javascript:myBlur()"},
    {id:'hands_x0_y0_jp4_',name:'精品4',clickEvent:"javascript:clickContent()",focusType:18,left:'hands_x0_y0_jp3_',right:'hands_x0_y0_jp5_',up:'hands_x0_y0_pageup_',down:'',upOtherEvent:"javascript:gamePage.jpUp()",onFocus_:"javascript:myFocus()",onBlur_:"javascript:myBlur()"},

];


function init(initData)
{
    PAGE.actionName = initData.actionName;
    var f_ = CT.requestValue("f_");
    var nextFocusType = CT.requestValue("nextFocusType");
    var lastFocusType = CT.requestValue("lastFocusType");
    //子页面返回当当前页会传入f_参数
    if(f_)
    {
        PAGE.lastFocosId = f_;
    }
    //下一页按右进入当前页
    if(nextFocusType)
    {
        PAGE.nextFocusType_ = nextFocusType;
    }
    //上一页按左进入当前页
    if(lastFocusType)
    {
        PAGE.lastFocusType_ = lastFocusType;
    }
    //添加日志
    PAGE.log.pageLog();


    PAGE.findPageData({
        actionName: PAGE.actionName,
        videosId: CT.requestValue("cid"),
        userCollectVideo: 1,
        userLatestPlay: 1,
        isAutoRecommend:1
    },function(d){
        PAGE.pageData = d.pageData;
        //设置背景图
        CT.$("bg").src = platform.imgContextUrl+PAGE.pageData.pageInfo.bgSrc;
        CT.$("bg").onload =function() {
            PAGE.focusInit();
            //初始化页面背景
            initPageInfo(d.pageData["pageInfo"], d.pageData["otherInfo"]["VideosDetail"]);
            //初始化选集
            gamePage.init(d.pageData["otherInfo"]["VideosList"], d.pageData["otherInfo"]["userLatestPlayDetail"]);
            //初始化左边的视频播放窗口
            initVideoSmallPlay(d.pageData["otherInfo"]["VideosList"]);
            //初始化精品推荐
            initJP(d.pageData["otherInfo"]["recommendVideosInfo"],d.pageData["recommends"]["edu_detail_boutique"]);
            //获取收藏按钮
            collectFocusModel = PAGE.getFocusModel("hands_x0_y0_collect_");
            //初始化收藏
            userCollect = initCollect(d.pageData["otherInfo"]["VideosDetail"], d.pageData["otherInfo"]["userCollectVideo"]);
            if (userCollect == true) {
                //用户为收藏状态，需要设置为取消收藏图片
                userCancleCollectStatus();
            } else {
                //用户为未收藏状态,需要设置为收藏图片
                userCollectStatus();
            }
            initButtons();
        }
    });
    PAGE.lastPageMenuId = initData.lastPageMenuId;
    PAGE.nextPageMenuId = initData.nextPageMenuId;
}
var collectFocusModel = null;
//记录用户是否为收藏状态
var userCollect = false;
function initCollect(d1, d2) {
    var bl = false;
    //判断用户没有收藏记录
    if (d2 != undefined && d2 != null && d2.length != 0) {
        //判断用户收藏记录里面是否有当前的视频
        for (var i = 0; i < d2.length; i++) {
            var d = d2[i];
            if (d.videosId == d1.videosId) {
                //用户为收藏状态
                bl = true;
                break;
            }
        }
    }
    return bl;
}
//用户为收藏状态
function userCollectStatus() {
    CT.$(collectFocusModel.imgID + "_img").src = "image/collect.png";
    CT.$(collectFocusModel.imgID).src = "image/collect_.png";
}

//用户为未收藏状态
function userCancleCollectStatus() {
    CT.$(collectFocusModel.imgID + "_img").src = "image/collect_no.png";
    CT.$(collectFocusModel.imgID).src = "image/collect_no_.png";
}
//点击收藏按钮
function clickCollect() {
    //如果用户当前是收藏状态，那就取消收藏
    if (userCollect == true) {
        PAGE.ajax({
            method: "post",
            async: "false",
            data: {
                deleteFlag: 1,
                videosId: PAGE.pageData["otherInfo"]["VideosDetail"].videosId,
                videoId: PAGE.pageData["otherInfo"]["VideosList"][0].videoId
            },
            url: platform.getHostPath + "/" + platform.platFormContextPath + "log/logCollect.json",
            success: function (d) {
                d = eval("(" + d + ")");
                if (d && d.code == 1) {
                    //取消收藏成功，设置为收藏状态
                    userCollectStatus();
                    userCollect = false;
                }
            }
        });
    } else {
        //如果用户为未收藏状态，那么就收藏
        PAGE.ajax({
            method: "post",
            async: "false",
            data: {
                videosId: PAGE.pageData["otherInfo"]["VideosDetail"].videosId,
                videoId: PAGE.pageData["otherInfo"]["VideosList"][0].videoId
            },
            url: platform.getHostPath + "/" + platform.platFormContextPath +  "log/logCollect.json",
            success: function (d) {
                d = eval("(" + d + ")");
                if (d && d.code == 1) {
                    //取消收藏成功，设置为收藏状态
                    userCancleCollectStatus();
                    userCollect = true;
                }
            }
        });
    }
}

function initVideoSmallPlay(data_) {
    if (data_ && data_[0]) {
        //默认播放第一集的视频
        var model = PAGE.getFocusModel("hands_x0_y0_videos_");
        model.tempData = data_[0];
        if (model.tempData.videoId && model.tempData.videoId != '' && model.tempData.videoId != 'null') {
            playSmallScreen({width: 684, height: 388, left: 59, top: 129, videoId: model.tempData.videoId});
        }
    }
}
//初始化页面基本信息
function initPageInfo(data,detail)
{
    if(!data)return;
    CT.$("detailName").innerHTML=detail.videosCName;
}


function gameVideoPaging()
{
    //分页组件
    this.paging = null;
    //每页显示数
    this.pageSize = 6;
    this.clearPage = function(){
        for(var i = 1 ;i<=this.pageSize;i++)
        {
            var model = PAGE.getFocusModel("hands_x0_y0_xj"+i+"_");
            //禁用分页栏
            model.enFocus = false;
            model.tempData = null;
            CT.$("xj"+i+"_txt").innerHTML="";
            CT.$("xj"+i+"_index").innerHTML="";
        }
    };
    this.lastFocus = function()
    {
        var focus = "hands_x0_y0_xj1_";
        for(var i =1;i<=6;i++)
        {
            var model = PAGE.getFocusModel("hands_x0_y0_xj"+i+"_");
            if(!model.enFocus)
            {
                break;
            }
            focus = "hands_x0_y0_xj"+i+"_";
        }
        PAGE.changeFocus(focus);
    };
    this.pageUp = function()
    {
        if(this.paging.currPage>1)
        {
            this.clearPage();
            this.paging = new PAGE.Paging(--this.paging.currPage,this.nums,this.pageSize);
            var j = 1;
            for(var i = this.paging.outvideosSize;i<(this.paging.outvideosSize + this.pageSize);i++)
            {
                var a = this.data[i];
                if(CT.isNotNull(a))
                {
                    var model = PAGE.getFocusModel("hands_x0_y0_xj"+j+"_");
                    model.enFocus = true;
                    model.tempData = a;
                    CT.$("xj"+j+"_txt").innerHTML=a.videoCName;
                    if(i<9 && i>=0)
                    {
                        CT.$("xj"+j+"_index").innerHTML="0"+(i+1);
                    }else{
                        CT.$("xj"+j+"_index").innerHTML=i+1;
                    }

                    ++j;
                }else{
                    break;
                }
            }
            PAGE.changeFocus("hands_x0_y0_xj1_");
            CT.$("curPage").innerHTML=this.paging.currPage;
            CT.$("pageCount").innerHTML=this.paging.pageCount;
            this.showPageImg();
        }else{
            //如果等于第一页，那么按左的话需要让视频获取焦点
            if(curFocus.focusID !='hands_x0_y0_pageup_')
            {
                PAGE.changeFocus("hands_x0_y0_videos_");
            }
        }
    };

    this.pageDown = function()
    {
        if(this.paging.currPage<this.paging.pageCount)
        {
            this.clearPage();
            this.paging = new PAGE.Paging(++this.paging.currPage,this.nums,this.pageSize);
            var j = 1;
            for(var i = this.paging.outvideosSize;i<(this.paging.outvideosSize + this.pageSize);i++)
            {
                var a = this.data[i];
                if(CT.isNotNull(a))
                {
                    var model = PAGE.getFocusModel("hands_x0_y0_xj"+j+"_");
                    model.enFocus = true;
                    model.tempData = a;
                    CT.$("xj"+j+"_txt").innerHTML=a.videoCName;
                    if(i<9 && i>=0)
                    {
                        CT.$("xj"+j+"_index").innerHTML="0"+(i+1);
                    }else{
                        CT.$("xj"+j+"_index").innerHTML=i+1;
                    }
                    ++j;
                }else{
                    break;
                }
            }
            PAGE.changeFocus("hands_x0_y0_xj1_");
            CT.$("curPage").innerHTML=this.paging.currPage;
            CT.$("pageCount").innerHTML=this.paging.pageCount;
            this.showPageImg();
        }
    };

    /**
     data:总数据集
     videoId:第几集
     */
    this.init = function(data,latestPlay)
    {
        if(!data || data.length<=0)return;
        //判断是否有播放记录,如果有，就获取最后播放的视频编号
        var videoId = 0;
        if(latestPlay != undefined && latestPlay != null)
        {
            videoId = latestPlay.videoId;
        }
        this.clearPage();
        this.data = data;
        this.nums = data.length;
        //默认状态的分页组件
        this.paging = new PAGE.Paging(1,this.nums,this.pageSize);
        var num = 1;
        //通过上一次播放的videoId找到其在总集数中为第几集
        for(var i =0;i<this.nums;i++)
        {
            var a = this.data[i];
            if(videoId == a.videoId)
            {
                num = i+1;
                break;
            }
        }
        //判断指定的集数要在总集数之内
        if(num>0 && num <=this.nums)
        {
            //根据当前集数，我们把它认为总集数，每页显示7条数据，当前页为第一页，所以我们能够得到以num数得到的总页数
            //总页数得到了，其实就是相当于视频总集数的第几页了
            var page = new PAGE.Paging(1,num,this.pageSize);
            var currPage = page.pageCount;
            this.paging = new PAGE.Paging(currPage,this.nums,this.pageSize);
            var j = 1;
            var lastModel = null;
            for(var i = this.paging.outvideosSize;i<(this.paging.outvideosSize + this.pageSize);i++)
            {
                var a = this.data[i];
                if(CT.isNotNull(a))
                {
                    var model = PAGE.getFocusModel("hands_x0_y0_xj"+j+"_");
                    model.enFocus = true;
                    model.tempData = a;
                    CT.$("xj"+j+"_txt").innerHTML=a.videoCName;
                    if(i<9 && i>=0)
                    {
                        CT.$("xj"+j+"_index").innerHTML="0"+(i+1);
                    }else{
                        CT.$("xj"+j+"_index").innerHTML=i+1;
                    }
                    //
                    if(num == i+1)
                    {
                        lastModel = model;
                    }
                    ++j;
                }else{
                    break;
                }
            }
            PAGE.changeFocus(lastModel.focusID);
            CT.$("curPage").innerHTML=this.paging.currPage;
            CT.$("pageCount").innerHTML=this.paging.pageCount;
            this.showPageImg();
        }



    };
    //控制分页图片显示
    this.showPageImg = function()
    {

        if(this.paging.pageCount ==1)
        {
            //CT.$("pageUp_img").src = "image/pageUp_.png";
            PAGE.getFocusModel("hands_x0_y0_pageup_").enFocus = false;
            //CT.$("pageDown_img").src = "image/pageDown_.png";
            PAGE.getFocusModel("hands_x0_y0_pagedown_").enFocus = false;
        }else if(this.paging.currPage == this.paging.pageCount && this.paging.pageCount ==2)
        {
            //CT.$("pageUp_img").src = "image/pageUp.png";
            PAGE.getFocusModel("hands_x0_y0_pageup_").enFocus = true;
            //CT.$("pageDown_img").src = "image/pageDown_.png";
            PAGE.getFocusModel("hands_x0_y0_pagedown_").enFocus = false;
        }else if(this.paging.currPage == 1)
        {
            //CT.$("pageDown_img").src = "image/pageDown.png";
            PAGE.getFocusModel("hands_x0_y0_pagedown_").enFocus = true;
            //CT.$("pageUp_img").src = "image/pageUp_.png";
            PAGE.getFocusModel("hands_x0_y0_pageup_").enFocus = false;
        }else if(this.paging.currPage == this.paging.pageCount)
        {
            //CT.$("pageDown_img").src = "image/pageDown_.png";
            PAGE.getFocusModel("hands_x0_y0_pagedown_").enFocus = false;
        }else{
            //CT.$("pageUp_img").src = "image/pageUp.png";
            //CT.$("pageDown_img").src = "image/pageDown.png";
            PAGE.getFocusModel("hands_x0_y0_pageup_").enFocus = true;
            PAGE.getFocusModel("hands_x0_y0_pagedown_").enFocus = true;
        }
    };

    this.xjDown = function()
    {
        var pageup = PAGE.getFocusModel("hands_x0_y0_pageup_");
        var pagedown = PAGE.getFocusModel("hands_x0_y0_pagedown_");
        if(pageup.enFocus == true)
        {
            PAGE.changeFocus(pageup.focusID);
        }else if(pagedown.enFocus == true)
        {
            PAGE.changeFocus(pagedown.focusID);
        }else{
            PAGE.changeFocus("hands_x0_y0_jp1_");
        }
    };
    this.jpUp = function()
    {
        var pageup = PAGE.getFocusModel("hands_x0_y0_pageup_");
        var pagedown = PAGE.getFocusModel("hands_x0_y0_pagedown_");
        if(pageup.enFocus == true)
        {
            PAGE.changeFocus(pageup.focusID);
        }else if(pagedown.enFocus == true)
        {
            PAGE.changeFocus(pagedown.focusID);
        }else{
            PAGE.changeFocus("hands_x0_y0_xj1_");
        }
    };

}

var gamePage = new gameVideoPaging();



function onFocusChangePX() {
    var data = curFocus.tempData;
    if (data.videoCName.length > 15) {
        runTxtStart(curFocus.imgID + "_txt", data.videoCName, 50);
    }

}

function onBlurChangePX()
{
    var data = curFocus.tempData;
    if (data.videoCName.length > 15) {
        runTxtEnd(curFocus.imgID + "_txt", data.videoCName);
    }
}

//文字向左移动开始
function runTxtStart(id,txt,speed)
{
    CT.$(id).innerHTML="<div id='run1' style='display:inline;'>"+txt+"&nbsp;&nbsp;&nbsp;&nbsp;</div><div id='run2'  style='display:inline;'>"+txt+"&nbsp;&nbsp;&nbsp;&nbsp;</div>";
    PAGE.runParentObj = CT.$(id);
    PAGE.funTxt1 = CT.$("run1");
    PAGE.funTxt2 = CT.$("run2");
    if(PAGE.runTxtInterval)
    {
        clearInterval(PAGE.runTxtInterval);
    }
    PAGE.runTxtInterval = setInterval(function(){
        if(PAGE.funTxt2.offsetWidth-PAGE.runParentObj.scrollLeft<=0) {
            PAGE.runParentObj.scrollLeft-=PAGE.funTxt1.offsetWidth;
        }else{
            PAGE.runParentObj.scrollLeft++;
        }
    },speed);
}
//文字向左移动结束
function runTxtEnd(id,txt)
{

    if(PAGE.runTxtInterval)
    {
        clearInterval(PAGE.runTxtInterval);
    }
    if(PAGE.runParentObj)
    {
        PAGE.runParentObj.scrollLeft=0;
    }

    CT.$(id).innerHTML=txt;
}

//data:同类型视频推荐
//recomdata:后台推荐位 必须有4个
function initJP(data,recomdata)
{
    var but = [PAGE.getFocusModel("hands_x0_y0_jp1_"),PAGE.getFocusModel("hands_x0_y0_jp2_"),PAGE.getFocusModel("hands_x0_y0_jp3_"),PAGE.getFocusModel("hands_x0_y0_jp4_")];
    if(data){
        for(var i =0;i<recomdata.length;i++){
            if(data[i]&&data[i]!=null){
                but[i].tempData = data[i];
                CT.$(but[i].imgID+"_img").src = platform.imgContextUrl + but[i].tempData.videosFocusSrc;/*改*/
            }else{
                but[i].tempData = recomdata[i];
                CT.$(but[i].imgID+"_img").src = platform.imgContextUrl + but[i].tempData.blurSrc;
            }
        }
    }
}
//推荐位的点击事件
function clickContent()
{
    var a = curFocus.tempData;
    var f = CT.requestValue("f");
    if(a.videosId&&a.videosId!=null){
        PAGE.findPageInfo({actionName:"edu_videodetail"}, function (data) {
            PAGE.redirect(data.pageSrc + "&cid=" + curFocus.tempData.videosId+'&f='+f);
        });
    }else{
        clickObj();
    }
}

var toPlay = true;
var toPlayInterval = null;
function videoplay()
{
    //处理连续点击
    if(toPlay)
    {
        toPlay = false;
        var data = curFocus.tempData;
        if (!data)return;
        var backUrl = encodeURIComponent(getCurUrl());
        PAGE.findPageInfo(
            {
                actionName:"dx_videoplay",
                cid:data.videoId
            },
            function(d){
                //获取播放地址
                var nextUrl = d.pageSrc;
                nextUrl=PAGE.url.getPlayPageUrl(nextUrl,data.videoId,backUrl,backUrl,data.videosId);
                PAGE.redirect(nextUrl);
            },function (d) {
                if(!d)return;
                if(d.freePlayFlag!==1||d.versionCode&&parseInt(d.versionCode)<119||!d.versionCode){
                    //获取订购地址
                    var orderUrl = d.pageSrc;
                    //获取播放地址
                    var nextUrl = d.nextUrl;
                    nextUrl=encodeURIComponent(PAGE.url.getPlayPageUrl(nextUrl,data.videoId,backUrl,backUrl,data.videosId));
                    orderUrl=PAGE.url.getOrderPageUrl(orderUrl,'',data.videosId,backUrl,nextUrl);
                    PAGE.redirect(orderUrl);
                }else{
                    //获取订购地址
                    var orderUrl = d.pageSrc;
                    //获取播放地址
                    var nextUrl = d.nextUrl;

                    var orderBackUrl = encodeURIComponent(PAGE.url.getPlayPageUrl(nextUrl,data.videoId,backUrl,backUrl,data.videosId));
                    //订购页面地址，订购失败返回还是返回详情页面，订购成功返回还是返回详情页面
                    orderUrl = encodeURIComponent(PAGE.url.getOrderPageUrl(orderUrl, '', data.videosId, backUrl, orderBackUrl));
                    //未订购用户播放返回到订购页面
                    nextUrl = PAGE.url.getPlayPageUrl(nextUrl, data.videoId, orderUrl, backUrl, data.videosId);

                    PAGE.redirect(nextUrl);
                }

            });
    }

    //开放点击权限
    if(toPlayInterval == null)
    {
        toPlayInterval = setTimeout(function () {
            toPlay = true;
            toPlayInterval = null;
        },500);
    }
}

function backfunc()
{
    var lastUrl = CT.getCookie("lastPageUrl");
    var lastPageAction = CT.getCookie("lastPageAction");
    //如果是登陆直接进入详情页面，按返回默认取首页
    if(lastUrl && lastUrl.indexOf("login") > -1 || !lastUrl)
    {
        backMain();
    }else{
        //如果详情页面进入的还是详情页面，那么上一页就是详情页面，我们就不要默认返回上一个详情页面了
        //如果上一页不是详情页面，那么就把上一页传入的作为记录上一页最后点击的焦点id再传给上一页，作用，前一页面最后点击的按钮，进入子页面，从子页面再返回上一页要保证焦点还落在之前点击的按钮上面
        var f = CT.requestValue("f");
        var p = CT.requestValue("p");
        if(f)
        {
            lastUrl=lastUrl.indexOf("?")!=-1 ? lastUrl+"&f_="+f : lastUrl+"?f_="+f;
        }
        if(p)
        {
            lastUrl=lastUrl.indexOf("?")!=-1 ? lastUrl+"&p_="+p : lastUrl+"?p_="+p;
        }
        PAGE.redirect(lastUrl);
    }


}
init({
    actionName:"edu_videodetail"
});

//主要是为了适配华为V9的特殊机型，原选中框存在视频区域覆盖问题
function myFocus()
{
    var version =CT.version();
    if(version.indexOf("EC6108V9_pub") == -1)
    {
        CT.removeClass(curFocus.imgID,"transitionsHide0_5");
        CT.removeClass(curFocus.imgID+"_img","transitionsHide0_5");
        CT.addClass(curFocus.imgID,"transitionsShow0_5");
        CT.addClass(curFocus.imgID+"_img","transitionsShow0_5");
        CT.show(curFocus.imgID);
    }else{
        CT.$(curFocus.imgID+"_img").parentNode.style.width="241px";
        CT.$(curFocus.imgID+"_img").parentNode.style.height="161px";
        CT.$(curFocus.imgID+"_img").parentNode.style.borderRadius = "15px";
        CT.$(curFocus.imgID+"_img").parentNode.style.border = "3px solid white";
        CT.$(curFocus.imgID+"_img").parentNode.style.boxShadow = "0px 0px 3px 2px #FFC";
        CT.$(curFocus.imgID+"_img").parentNode.style.top = (parseInt(CT.$(curFocus.imgID+"_img").parentNode.style.top)-3)+"px";
        CT.$(curFocus.imgID+"_img").parentNode.style.left = (parseInt(CT.$(curFocus.imgID+"_img").parentNode.style.left)-3)+"px";
    }
}

function myBlur()
{
    var version =CT.version();
    if(version.indexOf("EC6108V9_pub") == -1)
    {
        CT.removeClass(curFocus.imgID,"transitionsShow0_5");
        CT.removeClass(curFocus.imgID+"_img","transitionsShow0_5");
        CT.addClass(curFocus.imgID,"transitionsHide0_5");
        CT.addClass(curFocus.imgID+"_img","transitionsHide0_5");
        CT.hide(curFocus.imgID);
    }else{
        CT.$(curFocus.imgID+"_img").parentNode.style.border = "none";
        CT.$(curFocus.imgID+"_img").parentNode.style.boxShadow = "none";
        CT.$(curFocus.imgID+"_img").parentNode.style.top = (parseInt(CT.$(curFocus.imgID+"_img").parentNode.style.top)+3)+"px";
        CT.$(curFocus.imgID+"_img").parentNode.style.left = (parseInt(CT.$(curFocus.imgID+"_img").parentNode.style.left)+3)+"px";
    }
}

