var iv = "0000111100001111";
// 存储用户名到全局变量,握手成功后发送给服务器
//$('.ajax').on('click',function(e){});
//alert(base64.encode('1'));
//var uname = prompt('请输入用户名', 'user' + uuid(8, 16));
var uname;
var usrid;
var channel=0;
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
$(document).ready(function(){
    uname = $("#usrname").val() || '';
    usrid = $("#usrid").val() || 0;
    channel = $("#gameid").val() || 0;
  });

//所在域是HTTPS协议也必须是wss
var ishttps = 'https:' == document.location.protocol ? true : false;
var wsprotocol=ishttps ? 'wss://' : 'ws://';
//window.location.hostname
var wsurl = wsprotocol+window.location.hostname+"/wschat";
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
          console.log("ping");
        }
      }, this.timeout);
  }
}
ws.onopen = function () {
  var data = "已加入";
  heartCheck.reset().start();
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
  var content;
  heartCheck.reset().start();

  switch (msg.type) {
    case 'handshake':
    //第一步,握手成功后先登录
    console.log('channel'+channel);
    var user_info = {'type': 'login', 'content': uname, 'uid': usrid,'channel':channel};
    sendMsg(user_info);
    return;
    case 'system':
    content=msg.content;
    if(typeof(content)!='undefined'){
      var data = content;
      //弹幕展现
      $('.barrager').barrager([{"msg":data}]);
    }
    break;
    case 'ajaxsend':
    //content=$.parseJSON(msg.content);
    //JSON.stringify(array)
    //JSON.parse()
    content=msg.content;
    //$.Callbacks()
    ajaxcall(content.call,content.data);
    break;
  }
};

ws.onerror = function () {
  var data = "服务器连接错误";
};
function ajaxcall(funcname,args){
  var jsfun = eval(funcname);
  new jsfun(args);
}

//网页加载完毕
//$(function () {
$(document).ready(function(e) {
    init_playerlist();
  });

function ws_get_online(player){
  $("#player_online").runNum(player);
}

function init_playerlist(){
  var htl='<table class="table table-striped table-bordered">'
  +'<thead><tr><th>玩家</th><th>押注</th><th>奖金</th></tr></thead><tbody>';
  htl+='</tbody></table>';
  $('#HBox_player').html(htl);
}

function ws_get_plarlist(jsondata){
  //JSON.parse();
  var playerdata=jsondata;
  var htl='';
  //$.each(playerdata, function (index, item){
  htl+='<tr><td>'+playerdata.uname+'</td><td>'+playerdata.betpoint+'</td><td>'+playerdata.winpoint+'</td></tr>';
  //});
  if(htl.length>0) $("#HBox_player>table>tbody").prepend(htl);
  //超过三行则删除最后一行
  var len = $("#HBox_player>table>tbody>tr").length;
  if (len > 20) {
    $("#HBox_player>table>tbody>tr:last").remove();
  }
  if(playerdata.online){
  	ws_get_online(playerdata.online);
  }
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

/**
* 将数据转为json并发送
* @param msg
*/
function sendMsg(msg) {
  var data = JSON.stringify(msg);
  ws.send(data);
}
function barrager_msg(){
  console.log('testmsg');
  var user_info = {'type': 'barrager', 'content': uname, 'uid': usrid,'channel':channel};
  sendMsg(user_info);
}

