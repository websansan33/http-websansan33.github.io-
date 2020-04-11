

$.getMultiScripts = function(arr, path) {
  var _arr = $.map(arr, function(scr) {
      return $.getScript((path||"") + scr);
    });

  _arr.push($.Deferred(function(deferred){
        $(deferred.resolve);
      }));

  return $.when.apply($, _arr);
}

/*
var script_arr = [
'myscript1.js',
'myscript2.js',
'myscript3.js'];
$.getMultiScripts(script_arr,'/myjspath/').done(function() {
// all done
}).fail(function(error) {
// one or more scripts failed to load
}).always(function() {
// always called, both on success and error
});
*/

String.prototype.myTrim = function()
{
  var lines = new Array();
  lines = this.split("\n"); // 按行分隔处理，否则 /\s/g 可能会匹配到换行符
  var out = "";
  for (var i = 0; i < lines.length; i++)
  {
    out += lines[i].replace(/\s*/g, "") + "\n"; // 删除空格
  }
  return out;
}

function $D(id)
{
  return document.getElementById(id);
}

function createXMLHTTP()
{
  var xmlHttp;
  if (window.XMLHttpRequest)
  {
    xmlHttp = new XMLHttpRequest();
    if (xmlHttp.overrideMimeType)
    {
      xmlHttp.overrideMimeType("text/xml")
    }
  } else if (window.ActiveXObject)
  {
    try
    {
      xmlHttp = new ActiveXObject("MSXML2.XMLHTTP")
    } catch(e)
    {
      try
      {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
      } catch(e)
      {
        alert("XmlHttpRequest error")
      }
    }
  }
  return xmlHttp
}
function createXMLHTTPs()
{
  //创建对象
  var A = null;
  try
  {
    A = new ActiveXObject("Msxml2.XMLHTTP");
  }
  catch(e)
  {
    try
    {
      A = new ActiveXObject("Microsoft.XMLHTTP");
    }
    catch(e)
    {
      A = null;
    }
  }
  if(!A && typeof(XMLHttpRequest) != "undefined") A = new XMLHttpRequest();
  return A;
}

function getInnerText(obj)
{
  //兼容FF innerText
  //return (obj.innerText ? obj.innerText : obj.textContent);
  return obj.html();
}

function getCookie(cookiename)
{
  //获取指定COOKIES的值
  var allcookies = document.cookie;
  var cookie_pos = allcookies.indexOf(cookiename);
  // 如果找到了索引，就代表cookie存在，反之，就说明不存在。
  if (cookie_pos != -1)
  {
    // 把cookie_pos放在值的开始，只要给值加1即可。
    cookie_pos += cookiename.length;
    var cookie_end = allcookies.indexOf(";", cookie_pos);
    if (cookie_end == -1) cookie_end = allcookies.length;
    var value = unescape(allcookies.substring(cookie_pos, cookie_end).replace("=",""));
  }
  return value;
}

function setCookie(name,value,expires,path,domain,secure)
{
  //设置COOKIES的值
  var expDays = expires * 24 * 60 * 60 * 1000;
  var expDate = new Date();
  expDate.setTime(expDate.getTime() + expDays);
  var expString = ((expires == null) ? "" : (";expires=" + expDate.toGMTString()));
  var pathString = ((path == null) ? "" : (";path=" + path));
  var domainString = ((domain == null) ? "" : (";domain=" + domain));
  var secureString = ((secure == true) ? ";secure" : "");
  document.cookie = name + "=" + escape(value) + expString + pathString + domainString + secureString;
}

function delCookie(name)
{
  var expDate = new Date(); //当前时间
  expDate.setTime(expDate.getTime() - 1); //删除cookie 只需将cookie设置为过去的时间
  var cval = getCookie(name);
  document.cookie = name + "=" + cval + ";expires=" + expDate.toGMTString();
}

function replaceQj(str)
{
  //全角数字转半角
  var Arryqj = ["０","１","２","３","４","５","６","７","８","９","，","　"];
  var Arrybj = ["0","1","2","3","4","5","6","7","8","9",",",""];
  var re;
  for(var i = 0;i < Arryqj.length;i++)
  {
    re = eval("/"+Arryqj[i]+"/g");
    str = str.replace(re,Arrybj[i]);
  }
  return str;
}

function isChinese(s)
{
  //是否纯中文字符串
  var re = /[^\u4E00-\u9FA5]+/igm;
  return !re.test(s);
}

function formatCurrency(amount)
{
  a = new String(amount);
  if(a.indexOf(',')> 0) amount=a.replace(/,/g,'');
  var i = parseFloat(amount);
  if(isNaN(i))
  {
    i = 0.00;
  }
  var minus = '';
  if(i < 0)
  {
    minus = '-';
  }
  i = Math.abs(i);
  i = parseInt((i + .005) * 100);
  i = i / 100;
  s = new String(i);
  if(s.indexOf('.') < 0)
  {
    s += '.00';
  }
  if(s.indexOf('.') == (s.length - 2))
  {
    s += '0';
  }
  s = "￥" + minus + s;
  return s;
}

function formatPercent(n)
{
  return Math.floor(n * 100) + "%";
}

function addZero(N)
{
  //在个位数前面补1个"0"
  var Nstr;
  if(N<10) Nstr = "0" + N.toString();
  else Nstr = N.toString();
  return Nstr;
}

function addZeros(N)
{
  //在个位数前面补2个"0"
  return (N >= 100 ? "" : (N < 10 ? "00" : "0")) + N.toString();
}



//==================================在线功能 开始==================================
function online(s)
{
  //页面调用
  if(s == 0)
  {
    //为0时不记录在线会员
    return;
  }
  onlineKeep();
  setInterval("onlineKeep();",s*1000);
}

function onlineKeep()
{
  //保持在线状态
  //读取消息
  //  var msgflag=1;
  //  if(typeof(msgswitch)!="undefined")
  //  {
  //    msgflag=msgswitch;
  //  }
  doAjax(
    "/public/check.php",
    {
      "k":Math.random(),
      "msgswitch":0
    },
    "json",
    function (json)
    {

      //检查登录
      if(json.res==0)
      {
        //alert($("#loginTopInfo").html());
        if($("#noLoginInfo").hasClass("show")){
          $("#noLoginInfo").removeClass("show");
        }
        if($("#loginTopInfo").hasClass("hide")){
          $("#loginTopInfo").removeClass("hide");
        }
        if($("#loginTopInfo").hasClass("hidden")){
          $("#loginTopInfo").removeClass("hidden");
        }
        $("#noLoginInfo").addClass("hidden");
        $("#loginTopInfo").addClass("show");
        //$("#noLoginInfo").hide();
        //$("#loginTopInfo").show();
        $("#welcomeName").html(json.username);
        $("#userMoney").html(json.allmoney);
        $("#usergoldcoin").html(json.allgoldcoin);
        $("#userheadicon").attr("src",json.headpng);
        //$("#myAccount").attr("href","/user/");
      }
      else
      {
        //$("#loginTopInfo").hide();
        //$("#noLoginInfo").show();
        //$("#myAccount").href="/login.php";
        top.location.replace("/login.php");
      }
      //检查消息
      /*
      if(json.msgres==1)
      {
      if (json.msgcount > 0)
      {
      $.each(json.msglist, function (index, item)
      {
      playmsg(item.soundfile);
      //var viewbtnhtml=item.msg.replace(/<br \/>/g," ");
      //myAlert('系统消息',item.msg,null,['知道了']);
      //viewbtnhtml+=' <span onclick="msgview('
      //+item.id+',\''+item.viewurl+'\')" class="badge badge-info">查看</span>';
      //$("#topnotice").html(viewbtnhtml);
      msgview(item.id,item.viewurl);
      });
      }
      }
      */

    },true);//fixdoAjax
}

function logout()
{
  //处理退出
  doAjax(
    "/public/check.php",
    {
      "c":"logout"
    },
    "json",
    function (json)
    {
      top.location.replace("/login.php");
    },true);//fixdoAjax

}

function msgview(msgid,jumpurl)
{
  setmsgread(msgid);
  if(jumpurl.length>1)
  {
    top.location.href=jumpurl;
  }
}

function setmsgread(msgid)
{
  doAjax(
    "/public/msg_read_set.php",
    {
      "id":msgid
    },
    "json",
    function (json)
    {
      if(json.res==0)
      {
        toastmsg(json.msg,"error")
      }
    },false);
}
//==================================在线功能 结束==================================

function loadVerImg(o)
{
  //刷新验证码
  window.onunload = function()
  {
  };//fix firefox opera
  o.value = "";
  var img = document.getElementById("verImg");
  img.src = "/inc/ImgCode.php?" + Math.random();
  img.className = "VerCodeImg";
}
/*
function getDomIndex(o)
{
//Dom对象在父容器中的同类标签对象组中的下标 未使用
var j = -1;
var pn = o.parentNode;
if(pn)
{
var cn = pn.childNodes;
for(var i = 0;i < cn.length;i++)
{
if(cn[i].tagName == o.tagName && cn[i].className == "show") j++;
if(cn[i] == o) return j;
}
}
return j;
}
*/
function getNextNode(n)
{
  //下一个兄弟节点
  var x = n.nextSibling;
  while (x && x.nodeType != 1)
  {
    x = x.nextSibling;
  }
  return x;
}
/*
function getPrevNode(n)
{
//上一个兄弟节点
var x = n.previousSibling;
while (x && x.nodeType != 1)
{
x = x.previousSibling;
}
return x;
}
*/
/*
function loadXmlDoc(oXmlHttp)
{
//解决请求非XML格式文件的responseXML Chrome 返回null的问题 未使用
var xmlDoc = oXmlHttp.responseXML;
if(xmlDoc) return xmlDoc
else
{
var oParser = new DOMParser();
xmlDoc = oParser.parseFromString(oXmlHttp.responseText,"text/xml");
}
return xmlDoc;
}
*/

function daysElapsed(date1,date2)
{
  //日期相差天数
  return Math.floor((date1 - date2) / 1000 / 60 / 60 / 24);
}

function sec2TimerString(ms)
{
  //根据相差的毫秒数显示倒计时
  if(ms <= 0) return "<b>0</b>分<b>0</b>秒";
  var s = Math.floor(ms / 1000);
  var d = Math.floor(s / (24 * 3600));
  dd = d > 0 ? d.toString().bold() + "天" : "";
  var hh = Math.floor((s % (24 * 3600)) / 3600);
  hh = (hh > 0 || d > 0) ? hh.toString().bold() + "时" : "";
  var mm = addZero(Math.floor((s % 3600) / 60));
  var ss = addZero(s % 60);
  if(d > 0) return dd + hh + mm.bold() + "分";
  return dd + hh + mm.bold() + "分" + ss.bold() + "秒";
}
/*
function sec2TimerString2(ms)
{
//根据相差的毫秒数显示倒计时 未使用
if(ms <= 0) return "00:00";
var s = Math.floor(ms / 1000);
var dd = Math.floor(s / (24 * 3600));
dd = dd > 0 ? dd + "天 " : "";
var hh = Math.floor((s % (24 * 3600)) / 3600);
hh = (hh > 0 || dd > 0) ? addZero(hh) + ":" : "";
var mm = addZero(Math.floor((s % 3600) / 60));
var ss = addZero(s % 60);
return dd + hh + mm + ":" + ss;
}
*/

function DomaddClass(obj,cName)
{
  //添加类属性
  obj.className += " " + cName;
}

function DomremoveClass(obj,cName)
{
  //移除类属性
  var re = new RegExp(" *" + cName,"gi");
  obj.className = obj.className.replace(re,"")
}
/*
function recursionCombine(arr,num)
{
//列出所有组合 arr待选数组 num选取个数
var r = [];
(
function f(t, a, n)
{
if (n == 0) return r.push(t);
for (var i = 0, l = a.length; i <= l - n; i++) f(t.concat(a[i]), a.slice(i + 1), n - 1);
}
)([], arr, num);
return r;
}
*/

function isArrCon(a,o)
{
  //数组是否包含某个元素
  var i = a.length;
  while(i--) if(a[i] === o) return true;
  return false;
}

function trim(s)
{
  //去掉首尾空格
  return s.replace(/(^\s*)|(\s*$)/gm,"");
}

function trimD(s)
{
  //去掉首尾非数字
  return s.replace(/(^\D*)|(\D*$)/gm,"");
}

function len2(s)
{
  //多少个号码 2位一个号码 如双色球
  var sArr = s.split(",");
  for(var i = 0;i < sArr.length;i++)
  {
    if(sArr[i].length != 2) return 0;
  }
  return sArr.length;
}
/*
function showTool(e,o,x,n)
{
//暂不用 未使用
e = e || window.event;
var panelTool = document.getElementById("panelTool");
if(x == 1)
{
var pos = getAbsPoint(o);
panelTool.style.left = pos[0] - 10 + "px";
panelTool.style.top = pos[1] - 13 + "px";
panelTool.innerHTML = "<div onclick=\"selectBatch(" + n + ",1);\">全</div>"
+ "<div onclick=\"selectBatch(" + n + ",2);\">遗</div>"
+ "<div onclick=\"selectBatch(" + n + ",3);\">大</div>"
+ "<div onclick=\"selectBatch(" + n + ",4);\">小</div>"
+ "<div onclick=\"selectBatch(" + n + ",5);\">单</div>"
+ "<div onclick=\"selectBatch(" + n + ",6);\">双</div>"
+ "<div onclick=\"selectBatch(" + n + ",7);\">质</div>"
+ "<div onclick=\"selectBatch(" + n + ",8);\">合</div>"
+ "<div onclick=\"selectBatch(" + n + ",9);\">0</div>"
+ "<div onclick=\"selectBatch(" + n + ",10);\">1</div>"
+ "<div onclick=\"selectBatch(" + n + ",11);\">2</div>"
+ "<div onclick=\"selectBatch(" + n + ",12);\">清</div>";
}
panelTool.className = (x == 0 && (!isContains(o,e,2))) ? "hidden" : "show";
}
*/
/*
function isContains(obj,e,i)
{
//是否父对象,容器对象obj,e事件,往上检查i层
try
{
var o = e.currentTarget ? e.relatedTarget : e.toElement;
while(o != obj && i > 0)
{
o = o.parentNode;
i--;
}
return (o == obj)
}
catch(e)
{
return false
}
}
*/
/*
function getAbsPoint(e)
{
//对象在文档中的绝对坐标
var x = e.offsetLeft,y = e.offsetTop;
while(e = e.offsetParent)
{
x += e.offsetLeft;
y += e.offsetTop;
}
return [x,y];
}
*/
function getQiByWeek(d1,d2,w)
{
  //两日期间包含多少个星期值为w元素的天数
  //双色球 w=[0,2,4]
  var d = daysElapsed(d1,d2);
  if(d < 0) return 0
  var d3 = new Date(d1.toString());
  var q = Math.floor(d / 7) * w.length;
  var c = d % 7;
  d3.setDate(d3.getDate() - c);
  while(c--)
  {
    if(isArrCon(w,d3.getDay())) q++;
    d3.setDate(d3.getDate() + 1);
  }
  return q;
}

function getDateByWeek(d,w,f)
{
  //离时间d最近的开奖时间
  var tmpDate;
  var d2 = new Date(d.toString());
  for(var i = 0;i < 7;i++)
  {
    if(isArrCon(w,d2.getDay()))
    {
      tmpDate = new Date(d2.getFullYear(),d2.getMonth(),d2.getDate(),Number(f[0]),Number(f[1]),Number(f[2]));
      if(d < tmpDate) break;
    }
    d2.setDate(d2.getDate() + 1);
  }
  return tmpDate;
}
/*
function getRemoteTime2()
{
//获取远程时间
doAjax(
"/app/getTime.php",
{
"t": Math.random()
},
"json",
function (json)
{
if(json.res==0)
{
nowTime = new Date(json.times.replace(/-/g, '/')); //附时间值给全局变量nowTime
nowTime.setSeconds(nowTime.getSeconds() + delaySecond); //加上一些延时
}
},false);//这里一定要false

}
*/
function getRemoteTime(){
  $.ajax({url: '/app/getTime.php',
      dataType: 'json',
      type: "GET",
      timeout: 1000,
      async: false,
      success: function (json)
      {
        if(json.res==0)
        {
          nowTime = new Date(json.times.replace(/-/g, '/')); //附时间值给全局变量nowTime
          nowTime.setSeconds(nowTime.getSeconds() + 1); //加上一些延时
        }
      }});
}
/*
function chgRate(o)
{
//元角模式转换 未使用
setCookie("betRate",o.value,10000,"/");
window.location.reload();
}
*/
/*
function chgTagCls(o,cls)
{
var tags = o.parentNode.getElementsByTagName(o.tagName);
for(var i = 0;i < tags.length;i++)
{
if(o == tags[i]) DomaddClass(tags[i],cls)
else DomremoveClass(tags[i],cls)
}
}
*/
/*
function iframeFitHeight(oIframe)
{
//Iframe窗口自适应高度 兼容IE6.0 FF2.0以上
try
{
oIframe.style.height = "500px";
var oWin = oIframe.name ? window.frames[oIframe.name] : oIframe.contentWindow;
var iHeight = Math.max(oWin.document.body.scrollHeight,oWin.document.documentElement.scrollHeight);
oIframe.style.height = iHeight + "px";//oWin.document.body.scrollHeight + "px";
}
catch(e)
{
}
}
*/
/*
function chkCurr(v)
{
//货币格式
var re = /^\d*(\.\d{1,2})?$/;
return !re.test(v);
}
*/

/*
function showLottPanel(e,o,t,id)
{
//页面顶部彩种下拉面板切换,暂不用 未使用
e = e || window.event;
var panel = document.getElementById(id);
panel.className = (t == false && (!isContains(o,e,3))) ? "hidden" : "";
}
*/
/*
function showUserMoneyn()
{
//显示用户可用余额
$("#userMoney").html("正在查询...");
doAjax(
"/public/check.php?" + Math.random(),
"",
"json",
function (json)
{

if(json.res==1)
{
$("#userMoney").html("请先登录...");
if(showLoginPanle()) return;
}
else
{
$("#userMoney").html(json.allmoney);

}
},true);//fixdoAjax

}
*/
/*
function setImgErr(o)
{
//错误图片处理
//o.style.visibility = "hidden";
o.src = "/Media/Gif/ImErrIcon.gif";
}
*/
//function wait()
//{
//  bootbox.alert("暂未开放!");
//}

/*
function myAlert(t,s)
{// t=标题 s=内容
var setHtml = "";
var butHtml = "";
var divId = "msgDiv";

if(arguments[2])//如果有设置不再提醒的函数
{
if(getCookie(arguments[2] + "Set") == "0") return;
setHtml = "<input id=\"msgChkFunc\" type=\"checkbox\" onclick=\"" + arguments[2] + "(this)\" /><label for=\"msgChkFunc\">下次不再提醒</lable>";
}
if(arguments[3])//按钮参数 每个按钮传1个数组形式的参数 ["文字","执行的函数"]
{
for(var i = 3;i < arguments.length;i++) butHtml += "<input type=\"button\" value=\"" + arguments[i][0] + "\" onclick=\"task.dialogTips.closeWin($('#" + divId + "'));" + (arguments[i][1] ? arguments[i][1] : "") + "\" />";
}
setHtml= setHtml+"<div id=\"msgAlertTitle\">" + t + "</div>"
+ "<div id=\"msgAlertContent\"><span id=\"msgAlertIcon\"></span>" + s + "</div>"
+ "<div id=\"msgAlertButton\"><span class=\"fr\">" + butHtml + "</span>" + setHtml + "</div>";
$("#"+divId).html(setHtml);
task.dialogTips.popWin($("#"+divId));
}
*/

//手机版改造新启用bootbox
var bootboxDialogObj
function myAlert(titleVal,contentVal)
{
  // t=标题 s=内容
  //<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Loading...</div>
  bootboxDialogObj = bootbox.dialog(
    {
      title: titleVal,
      message: contentVal,
      size: 'xl',
      locale: 'zh_cn',
      onEscape: true,
      backdrop: true,
      closeButton: true,
      buttons:
      {
        confirm:
        {
          label: '确定',
          className: 'btn-success'
        }
      },
      callback: function (result)
      {
        // ...
      }
    });

  /*
  ,
  cancel:
  {
  label: '取消',
  className: 'btn-danger'
  }

  buttons:
  {
  confirmBtn:
  {
  label: '确定',
  className: 'btn-primary',
  callback: function()
  {

  }
  },
  cancelBtn:
  {
  label: '取消',
  className: 'btn-info',
  callback: function()
  {

  }
  }
  }
  */
}

//手机版bootbox
function closeMyAlert()
{
  bootboxDialogObj.modal('hide');
}

function chgWinTag(o,cls,con)
{
  var p = o.parentNode;
  var tagName = o.tagName;
  var tags = p.getElementsByTagName(tagName);
  //var cons = document.getElementsByName(con);
  var oCon;
  for(var i = 0;i < tags.length;i++)
  {
    oCon = $D(con + i);
    if(tags[i] == o)
    {
      DomremoveClass(oCon,"hidden");
      DomaddClass(tags[i],cls);
    }
    else
    {
      DomremoveClass(tags[i],cls);
      DomaddClass(oCon,"hidden");
    }
  }
}


function showLoginPanle()
{
  //检测登录状态并显示登录小窗口

  doAjax(
    "/public/check.php?" + Math.random(),
    {
    },
    "json",
    function (json)
    {
      if(json.res==0)
      {
        return false;
      }
      else
      {
        task.dialogTips.popWin($("#loginPanel"));
        return true;

      }
    },true);//fixdoAjax

}

function msgLogin(f)
{
  //小窗口登录
  if (checkAll(f))
  {
    doAjax(
      "/public/logincheck.php",
      {
        "username": $("#duser").val(),
        "pws":$("#dpws").val(),
        "mycode":$("#dmycode").val()
      },
      "json",
      function (json)
      {

        if(json.res==1)
        {

          task.dialogTips.closeWin($("#loginPanel"));
          //setCookie("LoginuserName_cookie", $("#username").val(), 60 * 24 * 30);
          //setCookie("LoginuserType_cookie", $("#usertype").val(), 60 * 24 * 30);
          dealLoginPage(true, [$("#username").val()]);
          onlineKeep(); //记录在线状态
        }
        else
        {
          $("#login_msg").html(json.msg);

        }
      },true);//fixdoAjax

  }
  return false;
}


function dealLoginPage(flag)
{
  //登录或退出后刷新页面
  if (typeof(loginRef) == "undefined") //局部刷新
  {
    if(flag)
    {
      $("#noLoginInfo").removeClass("show");
      $("#noLoginInfo").addClass("hidden");
      $("#loginTopInfo").removeClass("hidden");
      $("#loginTopInfo").addClass("show");
    }
    else
    {
      $("#noLoginInfo").removeClass("hidden");
      $("#noLoginInfo").addClass("show");
      $("#loginTopInfo").removeClass("show");
      $("#loginTopInfo").addClass("hidden");
    }

    $("#welcomeName").html(flag ? arguments[1][0] : "");

  }

  else location.reload(true); //整页刷新
}

var task =
{
};
task.dialogTips =
{
  addShadow:function(obj)
  {
    var shadow = '<div id="user_shadow"></div>';
    if($("#user_shadow")[0])
    {
      $("#user_shadow").show();
    }else
    {
      obj.after(shadow);
    }
  },
  popWin:function(obj,ajaxUrl)
  {

    if(ajaxUrl)
    {
      $('#taskform').submit(function(d)
        {
          //  alert(d);
        })
    }else
    {
      $("#user_shadow").show();
      var h = obj.outerHeight(),
      w = obj.outerWidth();
      obj.css({"position":"fixed","left":"50%","top":"50%","margin-left":-w/2,"margin-top":-h/2,"z-index":"1000"});
      obj.show();

    }
  },
  closeWin:function(obj)
  {

    obj.hide();
    $("#user_shadow").hide();
  },
  alert:function(obj,msg)
  {
    $("#msgc").html(msg);
    obj.hide();
    $("#user_shadow").hide();
  }
}