var ajaxIndex=0;var loading;var state=0;var global_mem={};var Member_AllowPwd=false;function getUrlParam(name)
{var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");var r=window.location.search.substr(1).match(reg);if(r!=null)return unescape(r[2]);return null;}
var css=function(t,s)
{if(document.getElementById(s))
{return false;}
var s=document.createElement("style");s.id=s;document.body.appendChild(s);if(s.styleSheet)
{s.styleSheet.cssText=t;}else
{s.appendChild(document.createTextNode(t));}}
$(function(){(function($){$.fn.extend({insertContent:function(myValue,t){var $t=$(this)[0];if(document.selection){this.focus();var sel=document.selection.createRange();sel.text=myValue;this.focus();sel.moveStart('character',-l);var wee=sel.text.length;if(arguments.length==2){var l=$t.value.length;sel.moveEnd("character",wee+t);t<=0?sel.moveStart("character",wee-2*t-myValue.length):sel.moveStart("character",wee-t-myValue.length);sel.select();}}else if($t.selectionStart||$t.selectionStart=='0'){var startPos=$t.selectionStart;var endPos=$t.selectionEnd;var scrollTop=$t.scrollTop;$t.value=$t.value.substring(0,startPos)
+myValue
+$t.value.substring(endPos,$t.value.length);this.focus();$t.selectionStart=startPos+myValue.length;$t.selectionEnd=startPos+myValue.length;$t.scrollTop=scrollTop;if(arguments.length==2){$t.setSelectionRange(startPos-t,$t.selectionEnd+t);this.focus();}}else{this.value+=myValue;this.focus();}}})})(jQuery);});var browser={versions:function(){var u=window.navigator.userAgent;return{trident:u.indexOf('Trident')>-1,presto:u.indexOf('Presto')>-1,webKit:u.indexOf('AppleWebKit')>-1,gecko:u.indexOf('Gecko')>-1&&u.indexOf('KHTML')==-1,mobile:!!u.match(/AppleWebKit.*Mobile.*/),ios:!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:u.indexOf('Android')>-1||u.indexOf('Linux')>-1,iPhone:u.indexOf('iPhone')>-1,iPad:u.indexOf('iPad')>-1,webApp:u.indexOf('Safari')==-1,weixin:u.indexOf('MicroMessenger')==-1};}(),language:(navigator.browserLanguage||navigator.language).toLowerCase()}
function doAjax(pageLevel,jsonData,dataType,callBack,isAsync)
{$.ajaxSetup({async:true});$.ajax({url:pageLevel,data:jsonData,timeout:5000,dataType:dataType,type:"POST",contentType:"application/x-www-form-urlencoded; charset=utf-8",async:isAsync!="undefined"?isAsync:true,error:function(xml,msg)
{},success:function(data)
{callBack(data);}});}
function CommonPager(pContainer,pSize,pRecordCount,pCurrentPage,pCallBack)
{this.Show=function()
{if(pRecordCount>0)
{var html="";var showpagenum=2;var pageCount=Math.ceil(pRecordCount/pSize);var pstart=pCurrentPage>2?(pCurrentPage-2):1;var pend=pCurrentPage<pageCount-2?(pCurrentPage+showpagenum):pageCount;var css="";var selectp=pSize==20?'<option selected>20</option><option>30</option><option>50</option>':(pSize==30?'<option>20</option><option selected>30</option><option>50</option>':'<option>20</option><option>30</option><option selected>50</option>');html+="<span  class=\"gy\">共<font color=red> "+pRecordCount+"</font> 条数据&nbsp;&nbsp;每页&nbsp;<select id='changepagesize'>"+selectp+"</select>&nbsp;条&nbsp;&nbsp;当前 "+pCurrentPage+" / "+pageCount+" 页</span>";if(pstart>1)html+='<a href="javascript:void(0);" class="a4" toPage="1">1</a>';for(var i=pstart;i<=pend;i++)
{css=i==pCurrentPage?"a4":"a3";html+='<a href="javascript:void(0);" toPage="'+i+'" class="'+css+'">'+i+'</a>';}
if(pend<pageCount)html+='<a href="javascript:void(0);" toPage="'+pageCount+'" class="a_page">'+pageCount+'</a>';html+='<span><input onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"  onkeyup="this.value=this.value.replace(/[^\\d]/g,\'\');if(this.value>'+currentPage+')this.value='+currentPage+';if(this.value<=0)this.value=1" id="ListPage_Text" type="text" value="'+currentPage+'" /></span><a  class="a1" href="javascript:void(0);" toPage="go" id="ListPage_GO">GO</a>';$("#"+pContainer).html(html);$("#"+pContainer).css("display","");$("#changepagesize").change(function()
{pageSize=$(this).children('option:selected').text();pCallBack(1);});$("#"+pContainer+" a").click(function()
{var p=$(this).attr("toPage");if(p=="go")
{var goP=$("#ListPage_Text").val();if(typeof(goP)=="string"&&!goP.IsNumber())
{alert("页码输入错误，请重试！");$("#ListPage_Text").select();return;}
p=parseInt(goP);if(p<1||p>pageCount)
{alert("页数超出范围，请重新输入！");$("#ListPage_Text").select();return;}}
pCallBack(p);});}
else
{$("#"+pContainer).css("display","none");}};this.ShowSimple=function()
{if(pRecordCount>0)
{var html="";var pageCount=Math.ceil(pRecordCount/pSize);var css="";if(pageCount!=1)
{html+="<span>共 "+pRecordCount+" 条数据  当前 "+pCurrentPage+" / "+pageCount+" 页</span>";if(pCurrentPage>1)html+=' <a class="a1" href="javascript:void(0);" toPage="1">首页</a> <a class="a2" href="javascript:void(0);" toPage="'+(pCurrentPage-1)+'">上一页</a>';if(pCurrentPage<pageCount)html+='<a class="a2" href="javascript:void(0);" toPage="'+(pCurrentPage+1)+'">下一页</a> <a class="a1" href="javascript:void(0);" toPage="'+pageCount+'">尾页</a>';$("#"+pContainer).html(html);$("#"+pContainer).show();}else
{$("#"+pContainer).hide();}
$("#"+pContainer+" a").click(function()
{var p=$(this).attr("toPage");pCallBack(p);});}
else
{$("#"+pContainer).css("display","none");}};}
function CreateGoodsProductPager(resCount)
{var page=new CommonPager("pageList",pageSize,resCount,currentPage,function(p)
{currentPage=parseInt(p);GetCommentList();});page.ShowSimple();}
function ListLoading()
{var html='<div class="listLoading">数据正在加载，请稍候……&nbsp;&nbsp;<a href="javascript:void(0);" onclick="javascript:location.reload();">您可以刷新页面重试！</a></div>';document.write(html);}
function checkUserName()
{if($("#username").val()=="")return;$("#usertag").html("正在查询...");doAjax("/public/userCheck.php",{"u":$("#username").val()},"json",function(json)
{if(json.res==0)
{$("#usertag").html("此会员名未注册 可以使用");$("#usertag").addClass("fillOK");}
else
{$("#usertag").html("此会员名已被注册");$("#usertag").addClass("fillNO");}},true);}
function checkJoin(f)
{$(".login-loading").show();doAjax("/public/register.php",{"username":$("#username").val(),"psw1":$("#psw1").val(),"psw2":$("#psw2").val(),"refcode":$("#refcode").val(),"device":$("#device").val(),"mycode":$("#mycode").val()},"json",function(json)
{if(json.res==1)
{$(".login-loading .text").html('注册成功!正前往用户中心…');if(typeof B4A!='undefined'){B4A.CallSub('setcks',true,'usr',$('#username').val());}
setTimeout(function(){loginjump('/m_user.php');},1000);}
else
{$(".login-loading").hide();$("#resultTxt").html(json.msg);if($('#'+json.ele).prop('tagName').toLowerCase()=='input'){$('#'+json.ele+'+span').html(json.msg);$('#'+json.ele+'+span').addClass('fillNO');}}},false);}
function checkLogin()
{$(".login-loading").show();if($("#username").val()=="")
{$("#resultTxt").html("请输入用户名");$("#username").focus();}
if($("#psw0").val()=="")
{$("#resultTxt").html("请输入密码");$("#ps").focus();}
if($("#mycode").val()=="")
{$("#resultTxt").html("请输入验证码");$("#mycode").focus();}
doAjax("/public/logincheck.php",{"username":$("#username").val(),"pws":$("#ps").val(),"device":$("#device").val(),"mycode":$("#mycode").val()},"json",function(json)
{$(".login-loading").hide();if(json.res==1)
{if(typeof B4A!='undefined'){B4A.CallSub('setcks',true,'usr',$('#username').val());}
loginjump('/m_index.php');}
else
{$("#resultTxt").html(json.msg);if($('#'+json.ele).prop('tagName').toLowerCase()=='input'){console.log($('#'+json.ele).prop('tagName').toLowerCase());$('#'+json.ele+'+span').html(json.msg);$('#'+json.ele+'+span').addClass('fillNO');}}},true);}
function loginjump(myurl)
{setCookie('wap',1,10000,'/');if(browser.versions.mobile)
{var ua=navigator.userAgent.toLowerCase();if(ua.match(/MicroMessenger/i)=="micromessenger")
{top.location.replace("/m_index.php");}
if(ua.match(/WeiBo/i)=="weibo")
{top.location.replace("/m_index.php");}
if(ua.match(/QQ/i)=="qq")
{top.location.replace("/m_index.php");}
if(browser.versions.ios)
{top.location.replace("/m_index.php");}
if(browser.versions.android)
{top.location.replace("/m_index.php");}}else
{if($(document).width()<=4096)
{top.location.replace("/m_index.php");}else
{top.location.replace(myurl);}}}
function isWeiXin()
{var ua=window.navigator.userAgent.toLowerCase();if(ua.match(/MicroMessenger/i)=='micromessenger')
{return true;}else
{return false;}}
function curentDay()
{var now=new Date();var year=now.getFullYear();var month=now.getMonth()+1;var day=now.getDate();var hh=now.getHours();var mm=now.getMinutes();var ss=now.getSeconds();return year+"-"+month+"-"+day;}
function dateAdd(day,n)
{var OneMonth=day.substring(5,day.lastIndexOf('-'));var OneDay=day.substring(day.length,day.lastIndexOf('-')+1);var OneYear=day.substring(0,day.indexOf('-'));var dt=new Date(OneYear,OneMonth,OneDay);var dtnow=new Date(dt.getTime()+n*24*3600*1000);var nowYear=dtnow.getFullYear();var nowMonth=dtnow.getMonth();var nowDay=dtnow.getDate();return nowYear+"-"+nowMonth+"-"+nowDay;}
var audioobj
function playmsg(musicfile,loop,volume)
{playmsgstop();loop=loop||false;volume=volume||20;var audio;if(window.HTMLAudioElement)
{if(navigator.userAgent.indexOf("MSIE")>-1)
{if($("bgsound"))
{$("bgsound").remove();}
$("body").append('<bgsound id="bgsoundobj" volume="'+volume+'" src="/css/music/'+musicfile+'" loop="'
+(loop==true)?'true':'false'
+'"/>');}else
{if(navigator.userAgent.indexOf("Safari/534")>-1){}else{audio=new Audio();audioobj=audio;audio.volume=volume/100;if(loop){audio.loop=true;}
audio.src='/css/music/'+musicfile;audio.play();}}}else
{if($('embed'))
{$('embed').remove();}
$('body').append('<embed id="embedobj" volume="'+volume+'" src="/css/music/'+musicfile+'" autostart="true" hidden="true" loop="'
+(loop==true)?'true':'false'
+'"></embed>');}}
function playmsgstop()
{if($("#bgsoundobj"))
{$("#bgsoundobj").remove();}
if($('#embedobj'))
{$('#embedobj').remove();}
if(audioobj!=null){if(!audioobj.paused)
{audioobj.pause();}}}
function speckText(str){var url="../text2mp3.php?t="+encodeURI(str);var n=new Audio();n.crossOrigin='anonymous';n.src=url;n.volume=100/100;n.play();}