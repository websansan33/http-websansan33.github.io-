var ajaxIndex = 0;
var loading;
var state = 0;
var global_mem =
{
};
var Member_AllowPwd = false;

function getUrlParam(name)
{
  //取浏览器URL地址的参数
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null) return unescape(r[2]); return null; //返回参数值
}

var css=function(t,s)
{
  //向body中动态插入样式表
  //其中t是样式的定义内容
  //其中s是返回创建样式的对象,以便日后删除这个动态
  //  var si=document.createElement('style');
  //  si.type = 'text/css';
  //  si.innerHTML='.demo{color: red;}';
  //  document.getElementsByTagName('HEAD').item(0).appendChild(si);
  if (document.getElementById(s)) {
    return false;
  }
  var s = document.createElement("style");
  s.id = s;
  //为ie设置属性
  /*if (isIE()) {
  s.type = "text/css";
  s.media = "screen"
  }*/
  //(document.getElementsByTagName("head")[0] || document.body).appendChild(s);
  document.body.appendChild(s);
  if (s.styleSheet) { //for ie
    s.styleSheet.cssText = t;
  } else {//for w3c
    s.appendChild(document.createTextNode(t));
  }
  //document.body.appendChild(s);
  //document.body.removeChild(s);
}

function usermenucss(selelement)
{
  //为实现圆角边框<div id="demo"></div>
  css('#demo{border: 1px solid #96281D; -moz-border-radius: 3px; -webkit-border-radius: 3px; border-radius: 3px; position: relative; background: #FFF9D2; z-index:2; width: 140px; height: auto; float: left; margin-right: 13px;margin-bottom: 13px;'
    //+((navigator && navigator.userAgent.match(/msie/i))?'behavior: url(/iefix/iecss3.htc)':'')+'}'
    +'}'

    +'#menuList{line-height: 28px;} #menuList a{font-size: 15px;color: #5b0d09;padding: 2px 5px;}'
    +'#menuList dd.sel{color: #FFF;}#menuList dd.sel a{background: #930000;color: #FFF;}'
    /*菜单中标题,非链接*/
    +'#menuList dt{font-size: 16px;height: 30px;line-height: 26px;}'
    /*菜单中标题,非链接*/
    +'#menuList dt,#menuList dd{text-align: right;padding-right: 25px;margin: 0px;}'
    /*菜单兑换积分和帐户安全中间的分界线*/
    +'#menuList dt.menuLine{width: 75px;height: 1px;font-size: 1px;line-height: 1px;margin: 5px 20px;background: #FFF;border-bottom: 1px solid #ffac75;}');
  $(selelement).addClass("sel");
  var newtop=0;
  if(navigator && navigator.userAgent.match(/msie/i)){
    newtop=$(selelement).offset().top-$(selelement).parent().offset().top+6;
  }else{
    newtop=$(selelement).offset().top-$(selelement).parent().offset().top+6;
    /*三角形的面层底层构造*/
    css('#demo:after, #demo:before{border: solid transparent;border-style:solid dashed dotted dashed;content: " ";height: 0;left: 100%;position: absolute;width: 0;}');
    /*三角形的面层,和背景同色,用于底色盖住*/
    css('#demo:after{border-width: 8px;border-left-color: #fff9d2;top: '+newtop+'px;}');
    /*三角形的底层,和边框同色*/
    css('#demo:before{border-width: 10px;border-left-color: #96281d;top: '+(newtop-2)+'px;}');
  }

}

function highLightText(elementid,keywordre,classname)
{
  if(classname==null || classname=="undefined")
  {
    classname="red";
  }
  //正则方式使指定文字高亮,分段替换,防止重复替换
  var obj=$('#'+elementid);
  var ym=obj.html();//ss是要高亮的区域，div的id值
  var results=ym.match(new RegExp(keywordre,"gi"));
  var newhtml='';
  var startpos=0;
  var remaintxt='';
  if(results!=null){
    for(var i=0;i<results.length;i++)
    {
      var subtxt=results[i];
      var regi = new RegExp(subtxt,"i");
      var curhead='';
      if(i==0)
      {
        //原串查找第一次出现的位置
        startpos=ym.search(regi); //找出字符串第一次出现的位置
        curhead=ym.substring(0,startpos+subtxt.length); //截取第一次出现位置
        remaintxt=ym.substring(startpos+subtxt.length,ym.length);
      }else
      {
        startpos=remaintxt.search(regi); //找出字符串第一次出现的位置
        curhead=remaintxt.substring(0,startpos+subtxt.length); //截取第一次出现位置
        remaintxt=remaintxt.substring(startpos+subtxt.length,remaintxt.length);
      }
      var regg = new RegExp(subtxt,"g");
      newhtml+=curhead.replace(regg, '<span class="'+classname+'">'+subtxt+'</span>'); //替换截取来的部分字符串,再累加
    }
  }else{
    remaintxt=ym;
  }
  newhtml+=remaintxt; //加上余下的部分(就是没得替换的部分)
  //alert(newhtml);
  obj.html(newhtml);
}

// 执行AJAX调用请求
function doAjax(pageLevel, jsonData, dataType, callBack, isAsync)
{
  $.ajaxSetup(
    {
      async: true
    });
  $.ajax(
    {
      url: pageLevel,
      data: jsonData,
      timeout: 5000,
      dataType: dataType,
      type: "POST",
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      async: isAsync != "undefined" ? isAsync : true,
      error: function(xml,msg)
      {
        //alert(xml+'\r\n'+msg+'\r\n'+pageLevel);
      },
      success: function (data)
      {
        callBack(data);
      }
    });
  //art.dialog.close();
}
/*************************************************************************************************************
AJAX分页导航HTML代码
调用方法：
var page = new CommonPager(
"MemList_ListPage",
pageSize,
resCount,
currentPage,
function(p) {
currentPage = parseInt(p);
MemList_GetListPage();// 此函数调用AJAX方法读取数据
}
);
page.Show();
**************************************************************************************************************/

function CommonPager(pContainer, pSize, pRecordCount, pCurrentPage, pCallBack)
{
  // 显示AJAX分页按钮
  this.Show = function ()
  {

    if (pRecordCount > 0)
    {
      var html = "";
      var showpagenum=2; //压缩可显示的页码最大宽度
      var pageCount = Math.ceil(pRecordCount / pSize);
      var pstart = pCurrentPage > 2 ? (pCurrentPage - 2) : 1;
      var pend = pCurrentPage < pageCount - 2 ? (pCurrentPage + showpagenum) : pageCount;
      var css = "";
      var selectp = pSize == 20 ? '<option selected>20</option><option>30</option><option>50</option>' : (pSize == 30 ? '<option>20</option><option selected>30</option><option>50</option>' : '<option>20</option><option>30</option><option selected>50</option>');
      html += "<span  class=\"gy\">共<font color=red> " + pRecordCount + "</font> 条数据&nbsp;&nbsp;每页&nbsp;<select id='changepagesize'>" + selectp + "</select>&nbsp;条&nbsp;&nbsp;当前 " + pCurrentPage + " / " + pageCount + " 页</span>";
      if (pstart > 1) html += '<a href="javascript:void(0);" class="a4" toPage="1">1</a>';
      for (var i = pstart; i <= pend; i++)
      {
        css = i == pCurrentPage ? "a4" : "a3";
        html += '<a href="javascript:void(0);" toPage="' + i + '" class="' + css + '">' + i + '</a>';
      }
      if (pend < pageCount) html += '<a href="javascript:void(0);" toPage="' + pageCount + '" class="a_page">' + pageCount + '</a>';
      html += '<span><input onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"  onkeyup="this.value=this.value.replace(/[^\\d]/g,\'\');if(this.value>'+currentPage+')this.value='+currentPage+';if(this.value<=0)this.value=1" id="ListPage_Text" type="text" value="' + currentPage + '" /></span><a  class="a1" href="javascript:void(0);" toPage="go" id="ListPage_GO">GO</a>';

      $("#" + pContainer).html(html);
      $("#" + pContainer).css("display", "");
      $("#changepagesize").change(function(){
          pageSize=$(this).children('option:selected').text();
          pCallBack(1);
        });

      $("#" + pContainer + " a").click(function ()
        {
          var p = $(this).attr("toPage");

          if (p == "go")
          {
            var goP = $("#ListPage_Text").val();

            if (typeof (goP) == "string" && !goP.IsNumber())
            {
              alert("页码输入错误，请重试！"); $("#ListPage_Text").select(); return;
            }

            p = parseInt(goP);
            if (p < 1 || p > pageCount)
            {
              alert("页数超出范围，请重新输入！"); $("#ListPage_Text").select(); return;
            }
          }
          pCallBack(p);
        });


    }
    else
    {
      $("#" + pContainer).css("display", "none");
    }
  };

  // 显示AJAX分页按钮
  this.ShowSimple = function ()
  {

    if (pRecordCount > 0)
    {
      var html = "";
      var pageCount = Math.ceil(pRecordCount / pSize);
      var css = "";

      if (pageCount != 1)
      {
        html += "<span>共 " + pRecordCount + " 条数据  当前 " + pCurrentPage + " / " + pageCount + " 页</span>";
        if (pCurrentPage > 1) html += ' <a class="a1" href="javascript:void(0);" toPage="1">首页</a> <a class="a2" href="javascript:void(0);" toPage="' + (pCurrentPage - 1) + '">上一页</a>';
        if (pCurrentPage < pageCount) html += '<a class="a2" href="javascript:void(0);" toPage="' + (pCurrentPage + 1) + '">下一页</a> <a class="a1" href="javascript:void(0);" toPage="' + pageCount + '">尾页</a>';
        $("#" + pContainer).html( html );
        $("#" + pContainer).show();
      } else
      {
        $("#" + pContainer).hide();
      }

      $("#" + pContainer + " a").click(function ()
        {
          var p = $(this).attr("toPage");
          pCallBack(p);
        });
    }
    else
    {
      $("#" + pContainer).css("display", "none");
    }
  };
}

/****************************************************************************************************
*分页
*****************************************************************************************************/
function CreateGoodsProductPager(resCount)
{
  var page = new CommonPager(
    "pageList",
    pageSize,
    resCount,
    currentPage,
    function (p)
    {
      currentPage = parseInt(p);
      GetCommentList();
    }
  );
  page.ShowSimple();
}

/*************************************************************************************************************
数据加载时的loading文字
**************************************************************************************************************/
function ListLoading()
{
  var html = '<div class="listLoading">数据正在加载，请稍候……&nbsp;&nbsp;<a href="javascript:void(0);" onclick="javascript:location.reload();">您可以刷新页面重试！</a></div>';
  document.write(html);
}

function checkUserName()
{

  //if($("#usertag").hasClass("fillOK")) return;
  //if(o.className != "fillOK") return;//前面的检查没过就不用检查这项
  if($("#username").val() == "") return;
  $("#usertag").html("正在查询...");
  doAjax(
    "/public/userCheck.php",
    {
      "u": $("#username").val()
    },
    "json",
    function (json)
    {

      if(json.res==0)
      {
        $("#usertag").html("此会员名未注册 可以使用");
        $("#usertag").addClass("fillOK");
      }
      else
      {
        $("#usertag").html("此会员名已被注册");
        $("#usertag").addClass("fillNO");
      }
    },true);//fixdoAjax
}


function checkJoin(f)
{
  //if(checkAll(f))
  //{
  doAjax(
    "/public/register.php",
    {
      "username": $("#username").val(),
      "psw1":$("#psw1").val(),
      "psw2":$("#psw2").val(),
      "mycode":$("#mycode").val()
      //"userid":$("#userid").val()
    },
    "json",
    function (json)
    {
      if(json.res==1)
      {
        Showbo.Msg.alert( '会员注册成功!' );
        setCookie("LoginuserName_cookie", f.username.value, 60 * 24 * 30);
        setCookie("LoginuserType_cookie", 0, 60 * 24 * 30);
        setTimeout("top.location.href='/User/pay.php'", 1000);
      }
      else
      {
        Showbo.Msg.alert(json.msg);
      }
    },false);//fixdoAjax


  //}
}

function checkLogin()
{
  if($("#username").val()=="")
  {
    $("#resultTxt").html("请输入用户名");
    $("#username").focus();
    return false;
  }
  if($("#psw0").val()=="")
  {
    $("#resultTxt").html("请输入密码");
    $("#ps").focus();
    return false;
  }
  if($("#mycode").val()=="")
  {
    $("#resultTxt").html("请输入验证码");
    $("#mycode").focus();
    return false;
  }

  doAjax(
    "/public/logincheck.php",
    {
      "username": $("#username").val(),
      "pws":$("#ps").val(),
      "mycode":$("#mycode").val()
    },
    "json",
    function (json)
    {

      if(json.res==1)
      {
        //setCookie("LoginuserName_cookie", $("#username").val(), 60 * 24 * 30);
        //setCookie("LoginuserType_cookie", $("#usertype").val(), 60 * 24 * 30);
        top.location.href='/user/';
      }
      else
      {
        //alert(json.msg);
        $("#resultTxt").html(json.msg);

      }
    },true);//fixdoAjax
  return false;
}

function curentDay()
{
  var now = new Date();
  var year = now.getFullYear(); //年
  var month = now.getMonth() + 1; //月
  var day = now.getDate(); //日
  var hh = now.getHours(); //时
  var mm = now.getMinutes(); //分
  var ss = now.getSeconds(); //秒
  return year + "-" + month + "-" + day;
}

function dateAdd(day, n)
{
  var OneMonth = day.substring(5, day.lastIndexOf('-'));
  var OneDay = day.substring(day.length, day.lastIndexOf('-') + 1);
  var OneYear = day.substring(0, day.indexOf('-'));
  var dt = new Date(OneYear, OneMonth, OneDay);
  var dtnow = new Date(dt.getTime() + n * 24 * 3600 * 1000);
  var nowYear = dtnow.getFullYear();
  var nowMonth = dtnow.getMonth();
  var nowDay = dtnow.getDate();
  return nowYear + "-" + nowMonth + "-" + nowDay;
}
var audioobj
/*适合各种浏览器的播放提示音*/
/*适合各种浏览器的播放提示音*/
function playmsg(musicfile,loop=false,volume=20)
{
  var audio;
  if (window.HTMLAudioElement)
  {
    if(navigator.userAgent.indexOf("MSIE")>-1)
    {
      if($("bgsound"))
      {
        $("bgsound").remove();
      }
      $("body").append('<bgsound id="bgsoundobj" volume="'+volume+'" src="/css/music/' + musicfile + '" loop="'
      +(loop==true)?'true':'false'
      +'"/>');
    }else
    {
      audio = new Audio();
      audioobj=audio;
      audio.volume = volume/100;
      if(loop){
	  	audio.loop=true;
	  }
      audio.src = '/css/music/' + musicfile;
      audio.play();
    }
  }else
  {

    if($('embed'))
    {
      $('embed').remove();
    }
    $('body').append('<embed id="embedobj" volume="'+volume+'" src="/css/music/'+musicfile+'" autostart="true" hidden="true" loop="'
    +(loop==true)?'true':'false'
    +'"></embed>');
    //$("#bgsoundobj").volume=25;
  }
}

function playmsgstop()
{
  if($("#bgsoundobj"))
  {
    $("#bgsoundobj").remove();
  }
  if($('#embedobj'))
  {
    $('#embedobj').remove();
  }
  if(audioobj!=null){
    if(!audioobj.paused)
    {
      audioobj.pause();// 这个就是暂停//audio.play();// 这个就是播放
    }
  }
}

function speckText(str){
//var request=  new URLRequest();

//var url = "http://fanyi.baidu.com/gettts?lan=en&text="+encodeURI(str)+"&spd=3&source=web";
var url = "http://fanyi.baidu.com/gettts?lan=zh&text="+encodeURI(str)+"&spd=5&source=web";
//var url = "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=" + encodeURI(str); // baidu
//url = "http://translate.google.cn/translate_tts?ie=UTF-8&tl=zh-CN&total=1&idx=0&textlen=19&prev=input&q=" + encodeURI(str); // google
//request.url = encodeURI(url);
// request.contentType = "audio/mp3"; // for baidu
//request.contentType = "audio/mpeg"; // for google
var n = new Audio(url);
n.src = url;
n.play();
// $("...").play();
// var sound = new Sound(request);
// sound.play();
}