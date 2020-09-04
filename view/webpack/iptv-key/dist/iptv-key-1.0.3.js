!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("morgan-iptv-core")):"function"==typeof define&&define.amd?define(["morgan-iptv-core"],t):"object"==typeof exports?exports.iptv=t(require("morgan-iptv-core")):e.iptv=t(e.iptv)}(this,(function(__WEBPACK_EXTERNAL_MODULE__2__){return d=[function(module,exports,__webpack_require__){"use strict";(function(module){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__,_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_morganIptvCore=__webpack_require__(2),_morganIptvCore2=_interopRequireDefault(_morganIptvCore);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}!function(window,iptv){var keyList=iptv.keyList=[],focusDires=iptv.focusDires=[],focusCollection=iptv.focusCollection=[],keys=iptv.keys=function(){var e=this;e.UP="UP",e.DOWN="DOWN",e.LEFT="LEFT",e.RIGHT="RIGHT",e.OK="OK",e.BACK="BACK",e.ZERO="ZERO",e.ONE="ONE",e.TWO="TWO",e.THREE="THREE",e.FOUR="FOUR",e.FIVE="FIVE",e.SIX="SIX",e.SEVEN="SEVEN",e.EIGHT="EIGHT",e.NINE="NINE",e.OUT_PAGE="OUT_PAGE",e.HOME_PAGE="HOME_PAGE",e.STOP="STOP",e.MENU="MENU",e.DEL="DEL",e.PAGEDOWN="PAGEDOWN",e.PAGEUP="PAGEUP"},key=iptv.key={keyCallBack:{},displayDire:!1,displayKey:!1,event:null,single:{loogPressTime:500,loogPressDispose:!1,pressDispose:!1,loogPressTimer:null,pressEvent:null},continuous:{startTime:0,endTime:0,loogPressDispose:!1,isEnd:!1,continuousTimer:null,continuousTime:500,pressEvent:null,endPressEvent:null},lastDire:"",addKey:function(e,t){var n=0;for(var o in t)++n;t.length=n+1e4,iptv.keyList[e+""]=t},getKeyCodeName:function(e){for(var t in iptv.keyList){var n=0;for(var o in iptv.keyList[t]){if(++n,iptv.keyList[t][o]==e)return o;if(n>=iptv.keyList[t].length-1e4){var s=iptv.STBType();if("E1100"!=s&&"ITV218.1"!=s)break}}}return""},numChange:function(e){var t="";switch(e){case"ONE":t=1;break;case"TWO":t=2;break;case"THREE":t=3;break;case"FOUR":t=4;break;case"FIVE":t=5;break;case"SIX":t=6;break;case"SEVEN":t=7;break;case"EIGHT":t=8;break;case"NINE":t=9;break;case"ZERO":t=0;break;case"DEL":t="DEL";break;default:t=""}iptv.isFunction(iptv.key.numEvent)&&iptv.key.numEvent(t)},direHandle:function(e){if(e){key.lastDire=e;var t,n,o=focusDires[curFocus.id];if(o)if(o[e+"Event"])key.exeCode(o[e+"Event"]);else{if(o[e]){if("disable"==o[e])return void(key.lastDire="");if((n=iptv("#"+o[e]).getFocus())&&1==n.enFocus)return void key.changeFocus(o[e]);if(n&&0==n.enFocus&&o[e+"OtherEvent"])return void key.exeCode(o[e+"OtherEvent"]);if(n&&0==n.enFocus&&o[e+"Other"]){if((t=iptv("#"+o[e+"Other"]).getFocus())&&1==t.enFocus)return void key.changeFocus(o[e+"Other"])}else{if(!n&&o[e+"NoEvent"])return void key.exeCode(o[e+"NoEvent"]);if(!n&&o[e+"No"]&&(t=iptv("#"+o[e+"No"]).getFocus())&&1==t.enFocus)return void key.changeFocus(o[e+"No"])}}else{if(o.otherEvent)return void key.exeCode(o.otherEvent);if(o.other){if("disable"==o.other)return void(key.lastDire="");if((n=iptv("#"+o.other).getFocus())&&1==n.enFocus)return void key.changeFocus(o.other)}}key.lastDire=""}}},focusHand:function(e){if(0==key.displayDire)switch(e){case"UP":case"DOWN":case"LEFT":case"RIGHT":key.direHandle(e.toLowerCase())}},longPress:{pressEvent:null,okLongPressEvent:null,upLongPressEvent:null,downLongPressEvent:null,leftLongPressEvent:null,rightLongPressEvent:null,oneLongPressEvent:null,twoLongPressEvent:null,threeLongPressEvent:null,fourLongPressEvent:null,fiveLongPressEvent:null,sixLongPressEvent:null,sevenLongPressEvent:null,eightLongPressEvent:null,nineLongPressEvent:null,zeroLongPressEvent:null,delLongPressEvent:null},changeFocus:function(e){var t="string"===iptv.type(e)?iptv("#"+e).getFocus():"object"===iptv.type(e)?e:null;if(t&&!0===t.enFocus){var n=curFocus;n.nextFocusId=t.id,n.onBlur();var o="",s=iptv.focusDires[n.id];key.lastDire&&s&&(o=s["on"+iptv.firstCase(key.lastDire)+"BlurEvent"])&&key.exeCode(o);var i=n.id;return curFocus=t,curFocus.lastFocusId=i,curFocus.onFocus(),t}},redirect:function(e){e&&iptv.trim(e)&&1==curFocus.enable&&(curFocus.enable=!1,window.location.href=iptv.urlDispose(e,{v:(new Date).getTime()}))},exeCode:function exeCode(_code){if(_code){var code=_code;try{"string"===iptv.type(_code)&&iptv.trim(_code)?0==code.indexOf("javascript:")?(code=code.replace("javascript:",""),eval(code)):0==code.indexOf("http://")&&key.redirect(code):"function"===iptv.type(_code)&&_code.call(curFocus)}catch(e){iptv.error(e)}}}},progress=iptv.progress={verticalProgress:null,horizontalProgress:null,createDom:function(e,t){var n=iptv.$(e),o=iptv.$(t);if(!n||!o)return(n=document.createElement("div")).className=e,n.setAttribute("id",e),n.id=e,(o=document.createElement("div")).className=t,o.setAttribute("id",t),o.id=t,n.appendChild(o),document.body.appendChild(n),o},vInit:function(){this.verticalProgress||(this.verticalProgress=this.createDom("iptv-vertical-progress","iptv-vertical-progress-percent"))},hInit:function(){this.horizontalProgress||(this.horizontalProgress=this.createDom("iptv-horizontal-progress","iptv-horizontal-progress-percent"))},per:function(e,t){var n,o;this.verticalProgress&&0<=e&&(n=iptv(this.verticalProgress.parentNode).height()*e,iptv(this.verticalProgress).height(n)),this.horizontalProgress&&0<=t&&t<=1&&(o=iptv(this.horizontalProgress.parentNode).width()*t,iptv(this.horizontalProgress).width(o))},vShow:function(){this.verticalProgress&&iptv(this.verticalProgress.parentNode).show()},vHide:function(){this.verticalProgress&&iptv(this.verticalProgress.parentNode).hide()},hShow:function(){this.horizontalProgress&&iptv(this.horizontalProgress.parentNode).show()},hHide:function(){this.horizontalProgress&&iptv(this.horizontalProgress.parentNode).hide()}};key.addKey("CUSTOM",{BACK:220}),key.addKey("SCYD",{BACK:27}),key.addKey("ANDROID",{F1:112}),key.addKey("HH",{UP:38,DOWN:40,LEFT:37,RIGHT:39,OK:13,BACK:8,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,DEL:46,PAGEDOWN:34,PAGEUP:33,VOLUP:259,VOLDOWN:260}),key.addKey("HW",{UP:38,DOWN:40,LEFT:37,RIGHT:39,OK:13,BACK:8,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,DEL:1131,PAGEDOWN:34,PAGEUP:33}),key.addKey("NJGD",{BACK:640,HOME_PAGE:113,OUT_PAGE:114,DEL:127}),key.addKey("BJGH",{UP:1,DOWN:2,LEFT:3,RIGHT:4,OK:13,BACK:340,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,OUT_PAGE:339,HOME_PAGE:512,STOP:1025,MENU:513}),iptv.FocusModel=function(){var e=this;e.name="",e.enable=!0,e.enFocus=!0,e.isCreated=!1,e.id="",(e.own=e).X_Posi=0,e.Y_Posi=0,e.focusType=7,e.imgID="",e.newSwap="",e.oldSwap="",e.dieArr=null,e.nodeObj=null,e.tempData=null,e.onFocusEvent="",e.onBlurEvent="",e.clickEvent="",e.interval=null,e.changeSize=10,e.selectBorderId="",e.selectionID="selectionID",e.selectionObjID="selectionObjID",e.focusImgZIndex=998,e.focusImgParentZIndex=998,e.imgZIndex=999,e.imgParentZIndex=999,e.upParentId="",e.upAreaId="",e.rightAreaId="",e.rightParentId="",e.enUpParentRoll=!1,e.enRightParentRoll=!1,e.enTopRoll=!1,e.enRightPageRoll=!1,this.enUpPageRoll=!1,e.focusIndex=0,e.focusCurPageNum=0,e.focusAllPageNum=0,e.focusLeftRoll=0,e.focusFirstLeft=0,e.focusPageAllModel=null,e.focusPageAllLoad=!1,e.lastFocusId="",e.disCompare=!1,e.animateOrder=1,e.animateIndex=0,e.init=function(){var t,n,o,s,i,r,p,a,l,u,d,c,v,g,y,f,h,I,E,m=iptv.$(e.upParentId),O=iptv.$(e.upAreaId),P=iptv.$(e.rightParentId),b=iptv.$(e.rightAreaId);(e.enUpParentRoll||1==e.enUpParentRoll||e.enRightParentRoll||1==e.enRightParentRoll)&&(1==this.enUpParentRoll&&(v=Math.abs(parseInt(m.style.top))||0,g=parseInt(O.style.height)||O.clientHeight||0,l=parseInt(e.Y_Posi),!iptv.isNull(l)&&0!=l||(l=e.nodeObj?Math.abs(parseInt(e.nodeObj.style.top)):0),u=e.nodeObj?parseInt(e.nodeObj.style.height):0,!1===e.disCompare&&e.nodeObj.parentNode!==m&&(u=e.nodeObj&&e.nodeObj.parentNode?parseInt(e.nodeObj.parentNode.style.height):0,l=e.nodeObj&&e.nodeObj.parentNode?parseInt(e.nodeObj.parentNode.style.top):0),"multiRow"===e.disCompare&&e.nodeObj.parentNode!==m&&(l=e.nodeObj&&e.nodeObj.parentNode?parseInt(e.nodeObj.parentNode.style.top)+Math.abs(parseInt(e.nodeObj.style.top)):0),(s=v+g)<(i=l+u)&&(c=i-s+v-(e.firstLineTop?e.firstLineTop:0),m.style.top="-"+c+"px")),1==e.enUpParentRoll&&(v=Math.abs(parseInt(m.style.top))||0,l=parseInt(e.Y_Posi),!iptv.isNull(l)&&0!=l||(l=e.nodeObj?Math.abs(parseInt(e.nodeObj.style.top)):0),!1===e.disCompare&&e.nodeObj.parentNode!==m&&(l=e.nodeObj&&e.nodeObj.parentNode?parseInt(e.nodeObj.parentNode.style.top):0),"multiRow"===e.disCompare&&e.nodeObj.parentNode!==m&&(l=e.nodeObj&&e.nodeObj.parentNode?parseInt(e.nodeObj.parentNode.style.top)+Math.abs(parseInt(e.nodeObj.style.top)):0),(i=l)<(s=v)&&(c=i+(e.firstLineTop?e.firstLineTop:0),m.style.top="-"+c+"px")),1==e.enRightParentRoll&&(f=Math.abs(parseInt(P.style.left))||0,h=parseInt(b.style.width)||b.clientWidth||0,o=parseInt(e.X_Posi),!iptv.isNull(o)&&0!=o||(o=e.nodeObj?Math.abs(parseInt(e.nodeObj.style.left)):0),t=e.nodeObj?parseInt(e.nodeObj.style.width):0,!1===e.disCompare&&e.nodeObj.parentNode!==P&&(o=e.nodeObj&&e.nodeObj.parentNode?parseInt(e.nodeObj.parentNode.style.left):0,t=e.nodeObj&&e.nodeObj.parentNode?parseInt(e.nodeObj.parentNode.style.width):0),"multiRow"===e.disCompare&&e.nodeObj.parentNode!==m&&(o=e.nodeObj&&e.nodeObj.parentNode?parseInt(e.nodeObj.parentNode.style.left)+Math.abs(parseInt(e.nodeObj.style.left)):0),(s=(n=f)+h)<(i=o+t)?(r=i-s+f,P.style.left="-"+r+"px"):i<n&&(r=o,P.style.left="-"+r+"px")),1==e.enRightParentRoll&&(f=Math.abs(parseInt(P.style.left))||0,o=parseInt(e.X_Posi),!iptv.isNull(o)&&0!=o||(o=e.nodeObj?Math.abs(parseInt(e.nodeObj.style.left)):0),!1===e.disCompare&&e.nodeObj.parentNode!==P&&(o=e.nodeObj&&e.nodeObj.parentNode?parseInt(e.nodeObj.parentNode.style.left):0),"multiRow"===e.disCompare&&e.nodeObj.parentNode!==m&&(o=e.nodeObj&&e.nodeObj.parentNode?parseInt(e.nodeObj.parentNode.style.left)+Math.abs(parseInt(e.nodeObj.style.left)):0),s=f,(i=o-(e.firstRowLeft?e.firstRowLeft:0))<s&&(r=i,P.style.left="-"+r+"px"))),!0===e.enRightPageRoll&&(p=e.focusLeftRoll||0,P.style.left="-"+p+"px"),!0===e.enUpPageRoll&&(a=e.focusUpRoll||0,m.style.top="-"+a+"px"),!0===e.enTopRoll&&(v=Math.abs(parseInt(m.style.top))||0,g=parseInt(O.style.height)||O.clientHeight||0,y=parseInt(m.style.height)||m.clientHeight||0,l=parseInt(e.Y_Posi),!iptv.isNull(l)&&0!=l||(l=e.nodeObj?Math.abs(parseInt(e.nodeObj.style.top)):0),u=e.nodeObj?parseInt(e.nodeObj.style.height):0,!1===e.disCompare&&e.nodeObj.parentNode!==m&&(l=e.nodeObj&&e.nodeObj.parentNode?parseInt(e.nodeObj.parentNode.style.top):0),"multiRow"===e.disCompare&&e.nodeObj.parentNode!==m&&(l=e.nodeObj&&e.nodeObj.parentNode?parseInt(e.nodeObj.parentNode.style.top)+Math.abs(parseInt(e.nodeObj.style.top)):0),d=y-l,y<g?m.style.top="0px":(c=d<g?y-g-(e.firstLineTop?e.firstLineTop:0):l-(e.firstLineTop?e.firstLineTop:0),m.style.top="-"+c+"px")),curFocus===e.own&&!0===e.verticalProgress&&m?(v=Math.abs(parseInt(m.style.top))||0,g=iptv(O).height()||parseInt(O.style.height)||O.clientHeight||0,y=iptv(m).height()||parseInt(m.style.height)||m.clientHeight||0,E=1<(E=0===v?0:(v+g)/y)?1:E,0===v?iptv.progress.vHide():iptv.progress.vShow(),iptv.progress.per(E)):curFocus===e.own&&iptv.progress.vHide(),curFocus===e.own&&!0===e.horizontalProgress&&P?(f=Math.abs(parseInt(P.style.left))||0,h=iptv(b).width()||parseInt(b.style.width)||b.clientWidth||0,I=iptv(P).width()||parseInt(P.style.width)||P.clientWidth||0,E=1<(E=0===f?0:(f+h)/I)?1:E,0===f?iptv.progress.hHide():iptv.progress.hShow(),iptv.progress.per(null,E)):curFocus===e.own&&iptv.progress.hHide(),setTimeout((function(){for(var e in iptv.focusCollection){var t,n,o,s,i,r,p,a,l,u,d,c,v,g,y=iptv.focusCollection[e].focusObj;y&&y.upParentId&&y.upAreaId&&y.newSwap&&!y.isSwap&&(t=y.upParentId,n=y.upAreaId,o=iptv.$(t),s=iptv.$(n),i=Math.abs(parseInt(o.style.top))||0,r=parseInt(s.style.height)||s.clientHeight||0,p=parseInt(y.Y_Posi),!iptv.isNull(p)&&0!=p||(p=y.nodeObj?Math.abs(parseInt(y.nodeObj.style.top)):0),y.nodeObj&&parseInt(y.nodeObj.style.height),!1===y.disCompare&&y.nodeObj.parentNode!==o&&(y.nodeObj&&y.nodeObj.parentNode&&parseInt(y.nodeObj.parentNode.style.height),p=y.nodeObj&&y.nodeObj.parentNode?parseInt(y.nodeObj.parentNode.style.top):0),"multiRow"===y.disCompare&&y.nodeObj.parentNode!==o&&(p=y.nodeObj&&y.nodeObj.parentNode?parseInt(y.nodeObj.parentNode.style.top)+Math.abs(parseInt(y.nodeObj.style.top)):0),p<i+r&&(iptv("#"+y.imgID+"_img").src(y.newSwap),y.isSwap=!0)),y&&y.rightParentId&&y.rightAreaId&&y.newSwap&&!y.isSwap&&(a=y.rightParentId,l=y.rightAreaId,u=iptv.$(a),d=iptv.$(l),c=Math.abs(parseInt(u.style.left))||0,v=parseInt(d.style.width)||d.clientWidth||0,g=parseInt(y.X_Posi),!iptv.isNull(g)&&0!=g||(g=y.nodeObj?Math.abs(parseInt(y.nodeObj.style.left)):0),y.nodeObj&&parseInt(y.nodeObj.style.width),!1===y.disCompare&&y.nodeObj.parentNode!==u&&(g=y.nodeObj&&y.nodeObj.parentNode?parseInt(y.nodeObj.parentNode.style.left):0,y.nodeObj&&y.nodeObj.parentNode&&parseInt(y.nodeObj.parentNode.style.width)),g<c+v&&(iptv("#"+y.imgID+"_img").src(y.newSwap),y.isSwap=!0))}}),0)},e.onFocus_="",e.onFocus=function(){var t,n,o,s,i;e.enFocus&&1==e.isCreated&&(curFocus=e.own,e.init(),iptv.isNotNull(e.onFocus_)?key.exeCode(e.onFocus_):2==e.focusType?iptv("#"+e.imgID).src(e.newSwap):7==e.focusType?curFocus.imgID&&iptv("#"+curFocus.imgID).show():10==e.focusType?iptv.isNotNull(e.selectBorderId)?((o=iptv("#"+this.lastFocusId).getFocus())&&10!=o.focusType||!o?iptv("#"+this.selectBorderId).show():iptv("#"+this.selectBorderId).addClass("transition"),iptv("#"+e.selectBorderId).attr("top",e.Y_Posi+"px").attr("left",e.X_Posi+"px")):iptv.error("当前焦点未指定selectBorderId属性！"):12==e.focusType?((i=iptv("#"+e.imgID+"_img").addClass("transition")[0]).parentNode.style.zIndex=e.focusImgParentZIndex,iptv("#"+e.imgID+"_img").attr("top",parseInt(i.style.top)-e.changeSize+"px").attr("left",parseInt(i.style.left)-e.changeSize+"px").attr("width",parseInt(i.style.width)+2*e.changeSize+"px").attr("height",parseInt(i.style.height)+2*e.changeSize+"px"),(t=iptv("#"+e.imgID).addClass("transition").show()[0]).parentNode.style.zIndex=e.imgParentZIndex,iptv("#"+e.imgID).attr("top",parseInt(t.style.top)-e.changeSize+"px").attr("left",parseInt(t.style.left)-e.changeSize+"px").attr("width",parseInt(t.style.width)+2*e.changeSize+"px").attr("height",parseInt(t.style.height)+2*e.changeSize+"px")):13==e.focusType?((i=iptv("#"+e.imgID+"_img").toggleClass("border").addClass("transition")[0]).parentNode.style.zIndex=e.focusImgParentZIndex,i.style.top=parseInt(i.style.top)-e.changeSize+"px",i.style.left=parseInt(i.style.left)-e.changeSize+"px",i.style.width=parseInt(i.style.width)+2*e.changeSize+"px",i.style.height=parseInt(i.style.height)+2*e.changeSize+"px"):14==e.focusType?iptv("#"+e.id).toggleClass("border").attr("zIndex",e.imgParentZIndex).show():15==e.focusType?((n=iptv.$(e.selectionID))||((n=document.createElement("div")).setAttribute("id",e.selectionID),n.id=e.selectionID,n.style.width="0px",n.style.height="0px",n.style.top="0px",n.style.left="0px",n.style.zIndex=e.imgParentZIndex,n.className="border position",e.nodeObj.parentNode.appendChild(n)),(o=iptv("#"+e.lastFocusId).getFocus())&&15!=o.focusType&&16!=o.focusType?iptv("#"+e.selectionID).show():iptv("#"+e.selectionID).addClass("transition"),n.style.width=e.nodeObj.style.width,n.style.height=e.nodeObj.style.height,n.style.top=e.nodeObj.style.top,n.style.left=e.nodeObj.style.left):16==e.focusType?((n=iptv.$(e.selectionID))||((n=document.createElement("div")).setAttribute("id",e.selectionID),n.id=e.selectionID,n.style.width="0px",n.style.height="0px",n.style.top="0px",n.style.left="0px",n.style.zIndex=e.imgParentZIndex,n.className="border position",e.nodeObj.parentNode.appendChild(n)),o=iptv("#"+e.lastFocusId).getFocus(),i=iptv.$(e.imgID+"_img"),o&&15!=o.focusType&&16!=o.focusType?iptv("#"+e.selectionID).removeClass("transition"):iptv("#"+e.selectionID).addClass("transition"),iptv("#"+e.selectionID).show(),iptv("#"+e.imgID+"_img").addClass("transition"),n.style.top=parseInt(i.parentNode.style.top)-e.changeSize-2+"px",n.style.left=parseInt(i.parentNode.style.left)-e.changeSize-2+"px",n.style.width=parseInt(i.parentNode.style.width)+2*e.changeSize+1+"px",n.style.height=parseInt(i.parentNode.style.height)+2*e.changeSize+1+"px",i.parentNode.style.zIndex=e.focusImgParentZIndex,i.style.top=parseInt(i.style.top)-e.changeSize+"px",i.style.left=parseInt(i.style.left)-e.changeSize+"px",i.style.width=parseInt(i.style.width)+2*e.changeSize+"px",i.style.height=parseInt(i.style.height)+2*e.changeSize+"px"):17==e.focusType?(n=iptv.$(e.selectionObjID),(o=iptv("#"+e.lastFocusId).getFocus())&&17!=o.focusType||!o||o&&17==o.focusType&&o.selectionObjID!=e.selectionObjID?n&&iptv("#"+e.selectionObjID).removeClass("transition"):o&&17==o.focusType&&n&&iptv("#"+e.selectionObjID).addClass("transition"),n&&(i=iptv.$(e.imgID),iptv(n).show(),n.style.top=parseInt(i.parentNode.style.top)+"px",n.style.left=parseInt(i.parentNode.style.left)+"px")):18==e.focusType&&curFocus.imgID&&(iptv("#"+curFocus.imgID).removeClass("transitionsHide0_5"),iptv("#"+curFocus.imgID+"_img").removeClass("transitionsHide0_5"),iptv("#"+curFocus.imgID).addClass("transitionsShow0_5"),iptv("#"+curFocus.imgID+"_img").addClass("transitionsShow0_5"),iptv("#"+curFocus.imgID).show()),e.animateName&&"function"==typeof Animate&&"am-shade-door"===e.animateName?(e.animate=new Animate({name:"am-shade-door",target:[iptv.$(this.imgID+"_shade")],dire:PAGE.lastDire}),e.animate.play()):e.animateName&&"function"==typeof Animate&&Animate.prototype[e.animateName]&&"am-shade-door"!==e.animateName?(i=iptv.$(this.imgID+"_img")||iptv.$(this.imgID+"-img"),s=[this.nodeObj,iptv.$(this.imgID+"_icon"),iptv.$(this.imgID+"_shade"),i,iptv.$(this.imgID+"_no")],e.animate=new Animate({name:e.animateName,target:s,animateIndex:e.animateIndex,animateOrder:e.animateOrder})):e.animateName&&"function"==typeof Animate&&!Animate.prototype[e.animateName]&&(i=iptv.$(this.imgID+"_img")||iptv.$(this.imgID+"-img"),e.animate=new Animate({name:"am-class",className:e.animateName,target:[iptv.$(this.imgID),i]})),e.onFocusEvent&&key.exeCode(e.onFocusEvent))},e.onBlur_="",e.onBlur=function(){var t,n,o,s;e.enFocus&&1==e.isCreated&&(iptv.isNotNull(e.onBlur_)?key.exeCode(e.onBlur_):(2==e.focusType&&iptv("#"+e.imgID).src(e.oldSwap),7==e.focusType&&iptv("#"+curFocus.imgID).hide(),10==e.focusType&&iptv("#"+e.selectBorderId).hide(),12==e.focusType&&(iptv("#"+e.imgID+"_img").toggleClass("transition"),(n=iptv.$(e.imgID+"_img")).parentNode.style.zIndex=2,n.style.top=parseInt(n.style.top)+e.changeSize+"px",n.style.left=parseInt(n.style.left)+e.changeSize+"px",n.style.width=parseInt(n.style.width)-2*e.changeSize+"px",n.style.height=parseInt(n.style.height)-2*e.changeSize+"px",iptv("#"+e.imgID).hide(),(t=iptv.$(e.imgID)).parentNode.style.zIndex=2,t.style.top=parseInt(t.style.top)+e.changeSize+"px",t.style.left=parseInt(t.style.left)+e.changeSize+"px",t.style.width=parseInt(t.style.width)-2*e.changeSize+"px",t.style.height=parseInt(t.style.height)-2*e.changeSize+"px"),13==e.focusType&&(iptv("#"+e.imgID+"_img").toggleClass("border"),(n=iptv.$(e.imgID+"_img")).parentNode.style.zIndex=2,n.style.top=parseInt(n.style.top)+e.changeSize+"px",n.style.left=parseInt(n.style.left)+e.changeSize+"px",n.style.width=parseInt(n.style.width)-2*e.changeSize+"px",n.style.height=parseInt(n.style.height)-2*e.changeSize+"px"),14==e.focusType&&iptv("#"+e.id).hide().toggleClass("border").attr("zIndex",2),15==e.focusType&&(s=iptv("#"+e.nextFocusId).getFocus())&&15!=s.focusType&&iptv("#"+e.selectionID).hide(),16==e.focusType&&((s=iptv("#"+e.nextFocusId).getFocus())&&15!=s.focusType&&s&&16!=s.focusType&&iptv("#"+e.selectionID).hide(),(n=iptv.$(e.imgID+"_img")).parentNode.style.zIndex=2,n.style.top=parseInt(n.style.top)+e.changeSize+"px",n.style.left=parseInt(n.style.left)+e.changeSize+"px",n.style.width=parseInt(n.style.width)-2*e.changeSize+"px",n.style.height=parseInt(n.style.height)-2*e.changeSize+"px"),17==e.focusType&&(o=iptv.$(e.selectionObjID),((s=iptv("#"+e.nextFocusId).getFocus())&&17!=s.focusType||s&&s.selectionObjID!=e.selectionObjID)&&o&&iptv("#"+e.selectionObjID).hide()),18==e.focusType&&(iptv("#"+curFocus.imgID).removeClass("transitionsShow0_5").addClass("transitionsHide0_5").hide(),iptv("#"+curFocus.imgID+"_img").removeClass("transitionsShow0_5").addClass("transitionsHide0_5"))),e.onBlurEvent&&key.exeCode(e.onBlurEvent),e.animate&&e.animate.stop&&e.animate.stop())},e.onClick=function(){1==e.enable&&1==e.enFocus&&1==e.isCreated&&key.exeCode(e.clickEvent)}},iptv.Dire=function(){},iptv.extend(iptv.Dire.prototype,{up:"",upOther:"",right:"",rightOther:"",down:"",downOther:"",left:"",leftOther:"",otherEvent:"",other:"",upEvent:"",rightEvent:"",downEvent:"",leftEvent:"",upOtherEvent:"",rightOtherEvent:"",downOtherEvent:"",leftOtherEvent:"",rightNoEvent:"",rightNo:"",leftNoEvent:"",leftNo:"",downNoEvent:"",downNo:"",upNoEvent:"",upNo:""});var IdList=function(e,t,n,o){this.x=e,this.y=t,this.imgID=n,this.upParentId=o},getIdList=function(e){if(!e)return null;var t=e,n=t.indexOf("_",0),o=t.indexOf("_",n+1),s=t.indexOf("_",o+1),i=t.indexOf("_",s+1),r=t.indexOf("_",i+1),p=t.substring(n+2,o),a=t.substring(o+2,s),l="";-1!=i&&(l=t.substring(s+1,i));var u="";return-1!=r&&(u=t.substring(i+1,r)),new IdList(p,a,l,u)};window.curFocus=new iptv.FocusModel,iptv.fn.extend({getFocus:function(){var e=this;return e[0]&&iptv.focusCollection&&iptv.focusCollection[e.id]&&iptv.focusCollection[e.id].focusObj?(e[0].focusObj=iptv.focusCollection[e.id].focusObj,iptv.focusCollection[e.id].focusObj):null},enableFocus:function(){var e=this,t=e.context;if(e[0]&&e[0].focusObj)e[0].focusObj.enFocus=!0;else if(t&&iptv.isArray(t))for(var n in t){var o=iptv.focusCollection[t[n]];o&&o.focusObj&&(o.focusObj.enFocus=!0)}return e},disableFocus:function(){var e=this,t=e.context;if(e[0]&&e[0].focusObj)e[0].focusObj.enFocus=!1;else if(t&&iptv.isArray(t))for(var n in t){var o=iptv.focusCollection[t[n]];o&&o.focusObj&&(o.focusObj.enFocus=!1)}return e},addFocus:function(e){var t=this.context,n=[],o=null;focusCollection=iptv.focusCollection=!0===e?[]:focusCollection,focusDires=iptv.focusDires=!0===e?[]:focusDires,t&&iptv.isArray(t)?n=t:t&&"object"===iptv.type(t)&&n.push(t);for(var s=0;s<n.length;s++){var i,r,p,a=null,l="",u=n[s];u&&(l=u.id)&&iptv.trim(l)&&0==l.indexOf("hands")&&(a=document.getElementById(l))&&((i=new iptv.FocusModel).id=o=l,r=getIdList(l),i.X_Posi=r.x,i.Y_Posi=r.y,r.upParentId&&iptv("#"+r.upParentId)[0]&&(i.ParentNode=iptv("#"+r.upParentId)[0]),i.imgID=iptv.trim(r.imgID),i.oldSwap=iptv("#"+i.imgID).src(),i.enFocus=u.enFocus||!0,i.clickEvent=u.clickEvent||"",i.newSwap=u.newSwap||"",i.tempData=u.tempData||null,i.focusType=u.focusType||7,i.changeSize=u.changeSize||0,i.selectionID=u.selectionID||"selectionID",i.selectionObjID=u.selectionObjID||"selectionObjID",i.focusImgZIndex=u.focusImgZIndex||998,i.focusImgParentZIndex=u.focusImgParentZIndex||998,i.imgZIndex=u.imgZIndex||999,i.imgParentZIndex=u.imgParentZIndex||999,i.upParentId=u.upParentId,i.upAreaId=u.upAreaId,i.rightParentId=u.rightParentId,i.rightAreaId=u.rightAreaId,i.enUpParentRoll=u.enUpParentRoll||!1,i.enRightParentRoll=u.enRightParentRoll||!1,i.enRightPageRoll=u.enRightPageRoll||!1,i.enUpPageRoll=u.enUpPageRoll||!1,i.focusUpRoll=u.focusUpRoll||0,i.focusIndex=u.focusIndex||0,i.focusCurPageNum=u.focusCurPageNum||0,i.focusAllPageNum=u.focusAllPageNum||0,i.focusLeftRoll=u.focusLeftRoll||0,i.focusFirstLeft=u.focusFirstLeft||0,i.focusPageAllModel=u.focusPageAllModel||null,i.name=u.name||"",i.onFocusEvent=u.onFocusEvent||"",i.onBlurEvent=u.onBlurEvent||"",i.tweenSpeed=u.tweenSpeed||"",i.selectBorderId=u.selectBorderId||"",i.onFocus_=u.onFocus_||"",i.onBlur_=u.onBlur_||"",i.animateName=u.animateName||"",i.disCompare=u.disCompare||!1,i.firstLineTop=u.firstLineTop||!1,i.firstRowLeft=u.firstRowLeft||!1,i.enTopRoll=u.enTopRoll||!1,i.animateOrder=0===u.animateOrder?0:1,i.animateIndex=0<u.animateIndex?u.animateIndex:0,i.singleTime=u.singleTime&&0<u.singleTime?u.singleTime:null,i.continuousTime=u.continuousTime&&0<u.continuousTime?u.continuousTime:null,i.verticalProgress=u.verticalProgress||!1,i.horizontalProgress=u.horizontalProgress||!1,i.verticalProgress&&iptv.progress.vInit(),i.horizontalProgress&&iptv.progress.hInit(),(p=new iptv.Dire).other=u.other||"",p.otherEvent=u.otherEvent||"",p.left=u.left||"",p.right=u.right||"",p.up=u.up||"",p.down=u.down||"",p.upEvent=u.upEvent||"",p.downEvent=u.downEvent||"",p.leftEvent=u.leftEvent||"",p.rightEvent=u.rightEvent||"",p.upOther=u.upOther||"",p.downOther=u.downOther||"",p.leftOther=u.leftOther||"",p.rightOther=u.rightOther||"",p.upOtherEvent=u.upOtherEvent||"",p.rightOtherEvent=u.rightOtherEvent||"",p.downOtherEvent=u.downOtherEvent||"",p.leftOtherEvent=u.leftOtherEvent||"",p.rightNoEvent=u.rightNoEvent||"",p.rightNo=u.rightNo||"",p.leftNoEvent=u.leftNoEvent||"",p.leftNo=u.leftNo||"",p.downNoEvent=u.downNoEvent||"",p.downNo=u.downNo||"",p.upNoEvent=u.upNoEvent||"",p.upNo=u.upNo||"",p.onUpBlurEvent=u.onUpBlurEvent||"",p.onDownBlurEvent=u.onDownBlurEvent||"",p.onLeftBlurEvent=u.onLeftBlurEvent||"",p.onRightBlurEvent=u.onRightBlurEvent||"",p.okLongPressEvent=u.okLongPressEvent||"",p.upLongPressEvent=u.upLongPressEvent||"",p.downLongPressEvent=u.downLongPressEvent||"",p.leftLongPressEvent=u.leftLongPressEvent||"",p.rightLongPressEvent=u.rightLongPressEvent||"",p.okContinuousLongPressEvent=u.okContinuousLongPressEvent||"",p.okEndContinuousLongPressEvent=u.okEndContinuousLongPressEvent||"",p.upContinuousLongPressEvent=u.upContinuousLongPressEvent||"",p.upEndContinuousLongPressEvent=u.upEndContinuousLongPressEvent||"",p.downContinuousLongPressEvent=u.downContinuousLongPressEvent||"",p.downEndContinuousLongPressEvent=u.downEndContinuousLongPressEvent||"",p.leftContinuousLongPressEvent=u.leftContinuousLongPressEvent||"",p.leftEndContinuousLongPressEvent=u.leftEndContinuousLongPressEvent||"",p.rightContinuousLongPressEvent=u.rightContinuousLongPressEvent||"",p.rightEndContinuousLongPressEvent=u.rightEndContinuousLongPressEvent||"",focusDires[l]=p,i.dieArr=p,i.isCreated=!0,(i.nodeObj=a).focusObj=i,focusCollection[l]=a)}return o?iptv("#"+o):this},onFocus:function(){var e=this.getFocus();return e&&e.onFocus(),this}}),iptv.extend({getFocus:function(e){return iptv.key&&iptv("#"+e).getFocus()},enableFocus:function(e){return iptv.isArray(e)?iptv.key&&iptv(e).enableFocus():iptv.key&&iptv("#"+e).enableFocus()},disableFocus:function(e){return iptv.isArray(e)?iptv.key&&iptv(e).disableFocus():iptv.key&&iptv("#"+e).disableFocus()}}),iptv.key.managerKey=function(e){if(!0===iptv.key.displayKey)return!0;var t,n=iptv.keyCode(e),o=iptv.key.getKeyCodeName(n);for(var s in iptv.key.keyCallBack)if((t=iptv.key.keyCallBack[s])&&"function"===iptv.type(t)){var i=t.call(iptv.key,n,o,e);if(!i)return i}switch(o){case"OK":curFocus.onClick();break;case"ONE":case"TWO":case"THREE":case"FOUR":case"FIVE":case"SIX":case"SEVEN":case"EIGHT":case"NINE":case"ZERO":case"DEL":return iptv.key.numChange(o),!1;case"LEFT":case"RIGHT":case"UP":case"DOWN":if(iptv.key.focusHand(o),e)return e.preventDefault(),!1;if(event)return event.returnValue=!1;break;case"HOME_PAGE":case"OUT_PAGE":case"BACK":case"F1":try{e?e.preventDefault():event&&(event.returnValue=!1)}catch(e){}return iptv.isFunction(iptv.common.backfunc)&&iptv.common.backfunc(),!1;case"VOLUP":iptv.key.volUp&&iptv.key.volUp();break;case"VOLDOWN":iptv.key.volDown&&iptv.key.volDown()}return!0};var keyDownEventfunction=function(e){if(!0!==iptv.key.displayKey){iptv.key.event=e;var t=iptv.keyCode(iptv.key.event),n=iptv.key.getKeyCodeName(t)||"",o=iptv.focusDires[curFocus.id]||[];if(iptv.key.single.pressDispose=!1,iptv.key.single.pressEvent=o[n.toLowerCase()+"LongPressEvent"],iptv.key.continuous.pressEvent=o[n.toLowerCase()+"ContinuousLongPressEvent"],iptv.key.continuous.endPressEvent=o[n.toLowerCase()+"EndContinuousLongPressEvent"],iptv.key.longPress.pressEvent=iptv.key.longPress[n.toLowerCase()+"LongPressEvent"],!iptv.key.continuous.pressEvent&&!iptv.key.single.pressEvent&&!iptv.key.longPress.pressEvent)return iptv.key.single.pressDispose=!0,iptv.key.managerKey(iptv.key.event);if(null==iptv.key.continuous.continuousTimer&&iptv.key.continuous.pressEvent){iptv.key.continuous.startTime=(new Date).getTime(),iptv.key.continuous.isEnd=!1,iptv.key.continuous.loogPressDispose=!1;var s=curFocus.continuousTime&&100<=curFocus.continuousTime?curFocus.continuousTime:iptv.key.continuous.continuousTime;return iptv.key.continuous.continuousTimer=setInterval((function(){return!0===iptv.key.continuous.isEnd&&null!=iptv.key.continuous.continuousTimer?(clearInterval(iptv.key.continuous.continuousTimer),iptv.key.continuous.continuousTimer=null,iptv.key.continuous.pressEvent=null,iptv.key.continuous.loogPressDispose=!1,void(iptv.key.continuous.isEnd=!0)):(iptv.key.continuous.loogPressDispose=!0,void(iptv.key.continuous.pressEvent&&key.exeCode(iptv.key.continuous.pressEvent)))}),s),!1}if(null!=iptv.key.single.loogPressTimer||!iptv.key.single.pressEvent||iptv.key.continuous.pressEvent)return!(null==iptv.key.single.loogPressTimer&&iptv.key.longPress.pressEvent&&!iptv.key.continuous.pressEvent&&!iptv.key.single.pressEvent&&(iptv.key.single.loogPressDispose=!1,iptv.key.single.loogPressTimer=setTimeout((function(){if(iptv.key.longPress.pressEvent)return iptv.key.single.loogPressDispose=!0,key.exeCode(iptv.key.longPress.pressEvent),void(iptv.key.longPress.pressEvent=null)}),iptv.key.single.loogPressTime),1));var i=curFocus.singleTime&&500<=curFocus.singleTime?curFocus.singleTime:iptv.key.single.loogPressTime;return iptv.key.single.loogPressDispose=!1,iptv.key.single.loogPressTimer=setTimeout((function(){if(curFocus&&curFocus.enFocus&&curFocus.isCreated&&!iptv.key.single.loogPressDispose)return iptv.key.single.loogPressDispose=!0,key.exeCode(iptv.key.single.pressEvent),void(iptv.key.single.pressEvent=null)}),i),!1}},keyUpEventFunction=function(){var e=!0;return!0===iptv.key.displayKey||(null!=iptv.key.continuous.continuousTimer?(clearInterval(iptv.key.continuous.continuousTimer),iptv.key.continuous.continuousTimer=null,iptv.key.continuous.isEnd=!0,iptv.key.continuous.endTime=(new Date).getTime(),iptv.key.continuous.endPressEvent&&iptv.key.continuous.loogPressDispose&&key.exeCode(iptv.key.continuous.endPressEvent),iptv.key.longPress.pressEvent=null,iptv.key.longPress.endPressEvent=null,iptv.key.continuous.loogPressDispose||(e=iptv.key.managerKey(iptv.key.event),iptv.key.continuous.loogPressDispose=!1)):null!=iptv.key.single.loogPressTimer&&(clearTimeout(iptv.key.single.loogPressTimer),iptv.key.single.loogPressTimer=null,iptv.key.single.pressEvent=null,iptv.key.single.loogPressDispose||(e=iptv.key.managerKey(iptv.key.event),iptv.key.single.loogPressDispose=!1))),e};iptv(document).addEventListener("keydown",keyDownEventfunction),iptv(document).addEventListener("keyup",keyUpEventFunction),"undefined"!=typeof Authentication&&void 0!==Authentication.CTCGetConfig&&-1<["E900","E900-S","E900V21E","E910V10C","ITV628HD"].indexOf(Authentication.CTCGetConfig("STBType"))&&(window.document.onkeydown=function(e){},window.document.onkeyup=function(e){}),"object"===_typeof(module)&&module&&"object"===_typeof(module.exports)?module.exports=iptv:(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){return iptv}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)),"object"===(void 0===window?"undefined":_typeof(window))&&"object"===_typeof(window.document)&&(window.iptv=window.$=iptv)}(window,_morganIptvCore2.default)}).call(this,__webpack_require__(1)(module))},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,t){e.exports=__WEBPACK_EXTERNAL_MODULE__2__}],e={},f.m=d,f.c=e,f.d=function(e,t,n){f.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},f.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},f.t=function(e,t){if(1&t&&(e=f(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(f.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)f.d(n,o,function(t){return e[t]}.bind(null,o));return n},f.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return f.d(t,"a",t),t},f.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},f.p="",f(f.s=0);function f(t){if(e[t])return e[t].exports;var n=e[t]={i:t,l:!1,exports:{}};return d[t].call(n.exports,n,n.exports,f),n.l=!0,n.exports}var d,e}));
//# sourceMappingURL=iptv-key-1.0.3.js.map