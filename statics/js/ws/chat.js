var iv = "0000111100001111";
// 存储用户名到全局变量,握手成功后发送给服务器
//$('.ajax').on('click',function(e){});
//alert(base64.encode('1'));
//var uname = prompt('请输入用户名', 'user' + uuid(8, 16));
var uname;
var usrid;
var channel=0;
var historyon=1;
$(document).ready(function(){
    uname = $("#usrname").val();
    usrid = $("#usrid").val();
    channel=$("#msg_box").data('channel');
  });
var isTouch = 'ontouchstart' in window;
//部分安卓webview必须用touchcancel替代touchend
var mouseEvents = (isTouch) ?
{
  down: 'touchstart',
  move: 'touchmove',
  up: 'touchend',
  over: 'touchstart',
  out: 'touchend'
}
:
{
  down: 'mousedown',
  move: 'mousemove',
  up: 'mouseup',
  over: 'mouseover',
  out: 'mouseout'
};
//所在域是HTTPS协议也必须是wss
var ishttps = 'https:' == document.location.protocol ? true : false;
var wsprotocol=ishttps ? 'wss://' : 'ws://';
//window.location.hostname
var wsurl = wsprotocol+window.location.hostname+"/wschat";
//var wsurl = wsprotocol+"45.77.182.218/wschat";
//var wsurl = wsprotocol+"127.0.0.1/wschat";
//var ws = new WebSocket(wsurl);
var ws = new ReconnectingWebSocket(wsurl);
//心跳检测
var heartCheck = {
  timeout: 50000,        //50秒发一次心跳
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function(){
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    return this;
  },
  start: function(){
    var self = this;
    this.timeoutObj = setTimeout(function(){
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        //onmessage拿到返回的心跳就说明连接正常
        if(ws.readyState == 1){
          ws.send("ping");
          //console.log("ping");
        }
        //self.serverTimeoutObj = setTimeout(function(){
        //如果超过一定时间还没重置，说明后端主动断开了
        //ws.close();
        //如果onclose会执行reconnect，我们执行ws.close()就行了
        //如果直接执行reconnect 会触发onclose导致重连两次
        //}, self.timeout);
      }, this.timeout);
  }
}
ws.onopen = function () {
  var data = "系统消息：您已加入聊天ver2.0";
  listMsg(systemstyle(data));
  heartCheck.reset().start();
  //  heartbeat_timer = setInterval(function () {
  //       keepalive(ws)
  //    }, 3000);
};

ws.onclose=function(){}
/**
* 分析服务器返回信息
*
* msg.type : user 普通信息;system 系统信息;handshake 握手信息;login 登陆信息; logout 退出信息;
* msg.from : 消息来源
* msg.content: 消息内容
*
*/
ws.onmessage = function (e) {
  var msg = JSON.parse(e.data);
  //console.log(msg);
  var sender, user_name, name_list, change_type;
  var content;
  heartCheck.reset().start();

  switch (msg.type) {
    case 'system':
    sender = '系统消息: ';
    content=systemstyle(sender+msg.content);
    break;
    case 'user':
    //sender = msg.from + ':';
    sender = '';
    content=msg.content;
    //fix解密
    content=demsg(content);
    //console.log('JSDe：'+content);
    content=msgstyle(msg.from,msg.uid,msg.time,content,(msg.uid==usrid?true:false));
    break;
    case 'handshake':
    //第一步,握手成功后先登录
    var user_info = {'type': 'login', 'content': uname, 'uid': usrid,'channel':channel};
    sendMsg(user_info);
    return;
    case 'login':
    user_name = msg.content;
    name_list = msg.user_list;
    change_type = msg.type;
    dealUser(user_name, change_type, name_list);
    var user_info = {'type': 'history', 'content': uname, 'uid': usrid,'channel':channel};
    sendMsg(user_info);
    return;
    case 'history':
    //第二步,下发历史
    history_list=msg.content;
    if(historyon==1){
      showhistory(history_list);
      historyon=0;
    }
    return;
    case 'logout':
    user_name = msg.content;
    name_list = msg.user_list;
    change_type = msg.type;
    if(user_name.length>0){
      dealUser(user_name, change_type, name_list);
    }
    return;
  }
  if(typeof(content)!='undefined'){
    var data = content;
    //console.log(data);
    listMsg(data);
  }
};

ws.onerror = function () {
  var data = "系统消息 : 服务器连接错误请重试.";
  listMsg(systemstyle(data));
};

/**
* 在输入框内按下回车键时发送消息
*
* @param event
*
* @returns {boolean}
*/

function confirm(event) {
  var key_num = event.keyCode;
  if (13 == key_num) {
    send();
    event.preventDefault();
  } else {
    return true;
  }
}

/**
* 发送并清空消息输入框内的消息
*/
function send() {
  var msg_box = document.getElementById("msg_box");
  var content = msg_box.value;
  var sendto=$(msg_box).data('sendto');
  console.log(sendto);
  var reg = new RegExp("\r\n", "g");
  content = content.replace(reg, "");
  //fix加密
  content=enmsg(content);
  var msg = {'content': content, 'type': 'user' ,'uid':usrid ,'sendto':sendto ,'channel':channel};
  sendMsg(msg);
  if(sendto>0){
    $('#msg_box').val('@'+$('#msg_box').data('sendname')+' ');
  }else{
    msg_box.value = '';
  }
  //收起表情框
  if($('#emojipanel').height()>0){
    $('#emojipanel').css({'height':'0'});
  }
  // todo 清除换行符
}

function systemstyle(msgcontent){
  var msgcls='even';
  var html='<li class="'+msgcls+'">'+
  '<div class="reply-content-box">'+
  '<div class="reply-content pr">' + msgcontent + '</div>'+
  '</div>'+
  '</li>';
  return html;
}

function imagestyle(imagefile){
  var html='<div class="picview">'+
  '<img src="'+imagefile+'" style="max-height:360px;max-width:75%;" />'+
  '</div>';
  return html;
}

function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
  mime = arr[0].match(/:(.*?);/)[1],
  bstr = atob(arr[1]),
  n = bstr.length,
  u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

function audiostyle(audiofile){
  //var mediaurl='https://'+window.location.hostname+audiofile;
  var mediaurl=audiofile;
  var html='<div class="add_yuyin">'+
  '<div class="r_yuyin" style="width:46%" data-time="0" data-src="'+mediaurl+'"><i>语音2</i>'+
  //'<audio src="'+mediaurl+'" controls muted="muted">Your browser does not support the audio tag.</audio>'+
  //<source src="'+mediaurl+'" type="audio/mpeg">
  '<s></s>'+
  '</div>'+
  '<a href="'+mediaurl+'" target="blank"><div class="deleteicon"></div></a>'+
  '</div>';
  return html;
}

function playaudiomsg(This){
  let allaudio=$(".r_yuyin");
  if(allaudio){
    allaudio.find("s").removeClass("bofang");
  }
  if(!$(This).data("playing")==true){
    $(This).data("playing",true);
    if(window.HTMLAudioElement){
      if(navigator.userAgent.indexOf("MSIE")>-1)
      {
        if($("bgsound")) $("bgsound").remove();
        $("body").append('<bgsound id="bgsoundobj" volume="20" src="' + $(This).data("src") + '" loop="false"/>');
      }else
      {
        let player = new MPlayer($(This).data("src"),{
            loop: false,
            volume: 0.8,
            auto: false,
            analyser: false});
        player.on('load', function () {
            //toastmsg('播放开始了','error');
            $(This).find("i").html(player.duration);
            $(This).find("s").addClass("bofang");
            player.play();
          });
        $(This).on(mouseEvents.up, function () {
            if(player.state=='running') player.pause(); else player.play();
          });
        player.on('ended', function () {
            $(This).off(mouseEvents.up);
            //toastmsg('播放结束了','error');
            $(This).find("i").html('已读');
            $(This).data("playing",false);
            $(This).find("s").removeClass("bofang");
          });
      }
    }else{
      if($('embed')) $('embed').remove();
      $('body').append('<embed src="'+$(This).data("src")+'" autostart="true" hidden="true" loop="false"></embed>');
    }
  } else {
    $(This).find("s").removeClass("bofang");
  }
}

function b4aplayer(){
  if('B4A' in window){
    toastmsg('hello B4A','error');
  }
}

//$(function () {
$(document).ready(function(e) {
    $("#msg_list").off(mouseEvents.up,'.r_yuyin')
    .on(mouseEvents.up, '.r_yuyin', function (evt) {
        //evt.preventDefault();
        playaudiomsg(this);
      });
  });

function startwith(str,s) {
  if (s == null || s == "" || str.length == 0 || s.length > str.length){
    return false;
  }
  if (str.substr(0, s.length) == s){
    return true;
  }else{
    return false;
  }
  return true;
}

function msgstyle(usrname,uid,msgtime,msgcontent,myself){
  if(startwith(msgcontent,"mp3:")){
    //音频文件
    var audiofile=msgcontent.substring(4);
    msgcontent=audiostyle(audiofile);
  }
  if(startwith(msgcontent,"pic:")){
    //图片文件
    var imagefile=msgcontent.substring(4);
    msgcontent=imagestyle(imagefile);
  }
  var msgcls=(myself==true)?'even':'odd';
  var html='<li class="'+msgcls+'">'+
  '<i class="user"><img class="img-responsive avatar_" src="face.php?id='+uid+'" alt="">'+
  '<span class="user-name" data-uid="'+uid+'" onclick="insertAtChar(this)">'+usrname+'</span></i>'+
  '<div class="reply-content-box">'+
  '<span class="reply-time">'+msgtime+'</span>'+
  '<div class="reply-content pr">'+
  '<span class="arrow">&nbsp;</span>' + msgcontent + '</div>'+
  '</div>'+
  '</li>';
  return html;
}

function insertAtChar(d){
  //插入@名字
  $('#msg_box').val('@'+$(d).text()+' '+$('#msg_box').val());
  console.log($(d).data('uid'));
  $('#msg_box').data('sendto',$(d).data('uid'));
  $('#msg_box').data('sendname',$(d).text());
}

/**
* 将消息内容添加到输出框中,并将滚动条滚动到最下方
*/
function listMsg(data) {
  var msg_list = document.getElementById("msg_list");
  //var txtNode = document.createDocumentFragment();
  //txtNode.appendChild(document.createElement(data));
  //txtNode.firstChild.outerHTML = string;
  //var msg = document.createDocumentFragment(data);
  //var msg = document.createElement(data);
  //msg.innerHTML = data;
  msg_list.innerHTML += data.toString();
  //msg_list.appendChild(txtNode);
  document.scrollTop = msg_list.scrollHeight;
  $('html,body').animate({scrollTop: $('#footline').offset().top},200);
  //loadaudio();
}

/**
* 处理用户登陆消息
*
* @param user_name 用户名
* @param type  login/logout
* @param name_list 用户列表
*/
function dealUser(user_name, type, name_list) {
  var user_list = document.getElementById("user_list");
  var user_num = document.getElementById("user_num");
  while(user_list.hasChildNodes()) {
    user_list.removeChild(user_list.firstChild);
  }

  for (var index in name_list) {
    var user = document.createElement("li");
    var html='<a href="#">&nbsp;'+name_list[index]+'</a>';
    user.innerHTML = html;
    user_list.appendChild(user);
    //console.log('用户：'+name_list[index]);
  }
  user_num.innerHTML = name_list.length;
  user_list.scrollTop = user_list.scrollHeight;

  var change = type == 'login' ? '连线' : '离线';

  var data = '系统消息2.05: ' + user_name + ' 已' + change;
  listMsg(systemstyle(data));
}

function showhistory(his_list){
  for (var index in his_list) {
    //console.log('JSDATA：'+his_list[index]);
    var msg=his_list[index];
    //console.log('消息：'+msg.content);
    content=msg.content;
    content=demsg(content);
    //console.log('JSDe：'+content);
    content=msgstyle(msg.from,msg.uid,msg.time,content,(msg.uid==usrid?true:false));
    var data = content;
    listMsg(data);
  }

}

/**
* 将数据转为json并发送
* @param msg
*/
function sendMsg(msg) {
  var data = JSON.stringify(msg);
  ws.send(data);
}
function test_system_msg(){
	//var user_info = {'type': 'game', 'content': uname, 'uid': usrid,'channel':channel};
    //sendMsg(user_info);
}

//var winHeight = $(window).height(); //获取当前页面高度
var winHeight=document.documentElement.clientHeight || document.body.clientHeight;
$(window).resize(function(){
    //var thisHeight=$(this).height();
    //键盘弹起与隐藏都会引起窗口的高度发生变化
    var  thisHeight=document.documentElement.clientHeight || document.body.clientHeight;
    if(winHeight - thisHeight >50){
      //当软键盘弹出，在这里面操作
      $('.ui-footer-fixed').css('bottom','0');
      $('.navbar-nav').css('display','none');
      //plus.webview.currentWebview().setStyle({
      //height:originalHeight //强设置为原高度
      //});
    }else{
      //当软键盘收起，在此处操作
      $('.ui-footer-fixed').css('bottom','0px');
      $('.navbar-nav').css('display','flex');
      $('#emojipanel').css({'height':'0'});
    }
  });

/**
* 解决ios键盘弹出遮挡input
*/
function iosInput() {
  if(isIos()){
    $('.ui-footer-fixed').css('position','absolute');
    //解决第三方软键盘唤起时底部input输入框被遮挡问题
    var bfscrolltop = document.body.scrollTop;
    //获取软键盘唤起前浏览器滚动部分的高度
    $("#msg_box").focus(function(){
        //在这里‘input.inputframe’是我的底部输入栏的输入框，当它获取焦点时触发事件
        interval = setInterval(function(){
            //设置一个计时器，时间设置与软键盘弹出所需时间相近
            document.body.scrollTop = document.body.scrollHeight;//获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
          },100)}).blur(function(){
        //设定输入框失去焦点时的事件
        clearInterval(interval);//清除计时器
        document.body.scrollTop = bfscrolltop;
        //将软键盘唤起前的浏览器滚动部分高度重新赋给改变后的高度
      });
  }
}
//iosInput();
//******************表情加载******************
function loademoji()
{
  var htmltxt='';
  doAjax(
    "/ws/emoji.php",
    {
      "t":1
    },
    "json",
    function (json)
    {
      if(json.res==1){
        var emojilist=json.emoji;
        if (emojilist.length > 0)
        {
          $.each(emojilist, function (index, item)
            {
              htmltxt+='<i>' + emojilist[index] + '</i>';
            });
          //console.log(htmltxt);
          $('#emojipanel').html(htmltxt);
          var emojiele=$('#emojipanel>i');
          emojiele.click(function(){
              //console.log('111');
              //console.log($(this).text());
              $('#msg_box').insertContent($(this).text());
            });
        }
      }
    },true);
}

//$('#msg_box').data('sendto',$(d).data('uid'));
//$('#msg_box').data('sendname',$(d).text());
$('#sendallbtn').click(function(){
    $('#msg_box').data('sendto',0);
    $('#msg_box').data('sendname','');
    $('#msg_box').val('');
  });

$('#emojibtn').click(function(){
    if($('#emojipanel').height()>0){
      $('#emojipanel').css({'height':'0'});
    }else{
      $('#emojipanel').css({'height':'200px'});
      loademoji();

    }
  });
$('#addfile').click(function(){
    var data = '系统消息: 文件功能未启用';
    listMsg(systemstyle(data));
  });
//$('#voicebtn').click(function(){
//var data = '系统消息: 语音功能未启用';
//listMsg(systemstyle(data));
//});
//******************语音发送部分******************
var rec=Recorder({type:"mp3",bitRate:8,sampleRate:16000});//mp3格式，指定采样率，其他参数使用默认配置；注意：是数字的参数必须提供数字，不要用字符串；需要使用的type类型，需提前把格式支持文件加载进来，比如使用wav格式需要提前加载wav.js编码引擎

function sendfile(blob,callback){
  var reader = new FileReader();
  reader.onloadend = function (e) {
    //e.target.result;
    //自动上传开始
    $.ajax(
      {
        url: 'm_upload_chat.php', // 要上传的地址
        type: 'post',
        data:
        {
          'imgBase': reader.result
        },
        dataType: 'json',
        success: function (json)
        {
          if(json.status==1)
          {
            callback(json.data.file);
          }else
          {
            toastmsg(msgList(json.message),'error');
          }
        }
      });
  }
  reader.readAsDataURL(blob);
}



//var start = document.querySelector('#start');
//var stop = document.querySelector('#stop');
//var container = document.querySelector('#audio-container');
var mask = document.getElementById('mask');
var start = document.querySelector('#voicebtn');
var timer;
start.addEventListener('contextmenu', function(e){
    e.preventDefault();
  });
//mousedown
$(start).on(mouseEvents.down,function(event){
    //var touch = event.touches[0];
    //startY = touch.pageY;
    event.preventDefault();
    mask.style.display="block"
    //console.log(Recorder.Support());
    rec.open(function(){//打开麦克风授权获得相关资源
        //dialog&&dialog.Cancel(); 如果开启了弹框，此处需要取消
        rec.start();//开始录音
        //setTimeout(function(){},3000);
      },function(msg,isUserNotAllow){//用户拒绝未授权或不支持
        //dialog&&dialog.Cancel(); 如果开启了弹框，此处需要取消
        console.log((isUserNotAllow?"UserNotAllow，":"")+"无法录音:"+msg);
      });

    //以下为实时发送与本例无关
    //timer = setTimeout(function(){
    //console.log(1)
    //var audio = document.querySelectorAll('audio');
    //for(var i = 0; i < audio.length; i++){
    //if(!audio[i].paused){
    //  audio[i].pause();
    //}
    //}
    //start.innerHTML="松开  结束"
    //recorder.start();
    //},500);
  });
//mousemove
$(start).on(mouseEvents.move,function(event){
    //var touch = event.touches[0];
    //endY = touch.pageY;
    //if (Math.abs(endY - startY) >= 5) {
    event.preventDefault();
    //}
    //timeOutEvent = setTimeout(function(){
    //clearTimeout(timer);
    //timer = 0;
    //});
  });
//mouseup
$(start).on(mouseEvents.up, function (event) {
    console.log('touchend');
    //recorder.stop();
    mask.style.display="none";
    rec.stop(function(mp3blob,duration){//到达指定条件停止录音
        //console.log((window.URL||webkitURL).createObjectURL(mp3blob),"时长:"+duration+"ms");
        //已经拿到blob文件对象想干嘛就干嘛：立即播放、上传
        //简单的一哔
        rec.close();//释放录音资源
        /*立即播放例子*/
        //var audio=document.createElement("audio");
        //audio.controls=true;
        //document.body.appendChild(audio);
        //audio.src=(window.URL||webkitURL).createObjectURL(mp3blob);
        //audio.play();
        sendfile(mp3blob,function(remotepath){
            //发送语音消息
            var msg_box = document.getElementById("msg_box");
            msg_box.value="mp3:"+remotepath;
            send();
          });
      },function(msg){
        console.log("录音失败1:"+msg);
      });
    //recorder.getBlob(function(blob){
    //var audio = document.createElement('audio');
    //audio.src = URL.createObjectURL(blob);
    //audio.controls = true;
    //container.appendChild(audio);
    //});
    //start.innerHTML="按住  说话"
    //clearTimeout(timer);
    return false;
  });

//***********************图片上传部分***********************
//弹出框水平垂直居中
(window.onresize = function ()
  {
    var win_height = $(window).height();
    var win_width = $(window).width();
    if (win_width <= 768)
    {
      $(".tailoring-content").css(
        {
          "top": (win_height - $(".tailoring-content").outerHeight())/2,
          "left": 0
        });
    }else
    {
      $(".tailoring-content").css(
        {
          "top": (win_height - $(".tailoring-content").outerHeight())/2,
          "left": (win_width - $(".tailoring-content").outerWidth())/2
        });
    }
  })();

//弹出图片裁剪框
$("#replaceImg").on("click",function ()
  {
    $(".tailoring-container").toggle();
  });
//图像上传
function selectImg(file)
{
  if (!file.files || !file.files[0])
  {
    return;
  }
  var reader = new FileReader();
  reader.onload = function (evt)
  {
    var replaceSrc = evt.target.result;
    //更换cropper的图片
    $('#tailoringImg').cropper('replace', replaceSrc,false);//默认false，适应高度，不失真
  }
  reader.readAsDataURL(file.files[0]);
}
//cropper图片裁剪
$('#tailoringImg').cropper(
  {
    //aspectRatio: 1/1,//默认比例
    preview: '.previewImg',//预览视图
    guides: false,  //裁剪框的虚线(九宫格)
    autoCropArea: 1,  //0-1之间的数值，定义自动剪裁区域的大小，默认0.8
    movable: false, //是否允许移动图片
    dragCrop: true,  //是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
    movable: true,  //是否允许移动剪裁框
    resizable: true,  //是否允许改变裁剪框的大小
    zoomable: false,  //是否允许缩放图片大小
    mouseWheelZoom: false,  //是否允许通过鼠标滚轮来缩放图片
    touchDragZoom: true,  //是否允许通过触摸移动来缩放图片
    rotatable: true,  //是否允许旋转图片
    crop: function(e)
    {
      // 输出结果数据裁剪图像。
    }
  });
//旋转
$(".cropper-rotate-btn").on("click",function ()
  {
    $('#tailoringImg').cropper("rotate", 45);
  });
//复位
$(".cropper-reset-btn").on("click",function ()
  {
    $('#tailoringImg').cropper("reset");
  });
//换向
var flagX = true;
$(".cropper-scaleX-btn").on("click",function ()
  {
    if(flagX)
    {
      $('#tailoringImg').cropper("scaleX", -1);
      flagX = false;
    }else
    {
      $('#tailoringImg').cropper("scaleX", 1);
      flagX = true;
    }
    flagX != flagX;
  });

//裁剪后的处理
$("#sureCut").on("click",function ()
  {
    if ($("#tailoringImg").attr("src") == null )
    {
      return false;
    }else
    {
      var cas = $('#tailoringImg').cropper('getCroppedCanvas');//获取被裁剪后的canvas
      var base64url = cas.toDataURL('image/png'); //转换为base64地址形式
      //$("#finalImg").prop("src",base64url);//显示为图片的形式
      //自动上传开始
      $.ajax(
        {
          url: 'm_upload_chat.php', // 要上传的地址
          type: 'post',
          data:
          {
            'imgBase': base64url
          },
          dataType: 'json',
          success: function (json)
          {
            if(json.status==1)
            {
              //console.log(json.data.file);
              //发送图片消息
              var msg_box = document.getElementById("msg_box");
              msg_box.value="pic:"+json.data.file;
              send();
            }else
            {
              toastmsg(msgList(json.message),'error');
            }
          }
        });
      //关闭裁剪框
      closeTailor();
    }
  });
//关闭裁剪框
function closeTailor()
{
  $(".tailoring-container").toggle();
}


/**
* 生产一个全局唯一ID作为用户名的默认值;
*
* @param len
* @param radix
* @returns {string}
*/
/*
function uuid(len, radix) {
var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
var uuid = [], i;
radix = radix || chars.length;

if (len) {
for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
} else {
var r;

uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
uuid[14] = '4';

for (i = 0; i < 36; i++) {
if (!uuid[i]) {
r = 0 | Math.random() * 16;
uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
}
}
}

return uuid.join('');
}*/