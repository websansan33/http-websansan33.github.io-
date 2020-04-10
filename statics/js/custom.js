//顶部分享和复制
//生成图片下载按钮
$(document).ready(function(){
  //custom.js
  //makeshareqr();
});
$("#shareqr").click(function(){
  //custom.js
  loaddownbtn("shareqr");
});
function makeshareqr(bgpath){
  bgpath = bgpath || '/lonbg.png';
  var renew = arguments[1] ? arguments[1] : 0;
  doAjax(
    "/m_agent_makeurl.php?_t=" + (new Date()).getTime(),
    {
      't':'0',
      'renew':renew
    },
    "json",
    function (json)
    {
      if(json.res==1){
        $('#codebox').html('');
        $('#shareurl').html(json.qrtxt);
        $('#codebox').qrcode({
            render: "canvas", //canvas |table
            width: 120,
            height:120,
            text: json.qrtxt,
            typeNumber: -1,//计算模式
            correctLevel:2,//二维码纠错级别
            //background : "transparent",       //二维码的后景色
            background : "#fff",       //二维码的后景色
            foreground : "#181818"        //二维码的前景色
            //src: 'images/success.png'   //二维码中间的图片
          });
        //var qrcodeImg=document.getElementById("codebox").lastChild;
        var qrcanvas=$('#codebox').find("canvas")[0];
        var srcImg=qrcanvas.toDataURL("image/jpeg",1);
        document.getElementById("shareqr").setAttribute('src',srcImg);
        $('#codebox').find("canvas")[0].style.display="none";
        //var qropt=new QRoptimize();
        
        //var bgImg= new Image();
        //bgImg.src=bgpath;

        //bgImg.crossOrigin="*";
        //bgImg.setAttribute("crossOrigin", 'Anonymous')
        //bgImg.onload=function(){
          //var canvas=document.getElementById("canvasbox");
          //canvas.width=bgImg.width;
          //canvas.height=bgImg.height;
          //alert(bgImg.width);
          //var ctx=canvas.getContext('2d');
          //ctx.drawImage(bgImg,0,0,bgImg.width,bgImg.height);
          //ctx.font = "23px Georgia";
          //ctx.fillStyle = 'red';
          //字体颜色
          //ctx.strokeStyle = 'gray';
          //绘制区域,设置空心字体
          //ctx.lineWidth = 1;  //设置线条宽度,默认为1px
          //ctx.strokeText('<?php echo SITE_NAME ?>', 151, 71);  //(text,x,y);
          //ctx.fillText('<?php echo SITE_NAME ?>', 150, 70);
          //ctx.drawImage(qrcodeImg,90,226,qrcodeImg.width,qrcodeImg.height);
          //var srcImg=canvas.toDataURL("image/jpeg",1);
          //document.getElementById("shareqr").setAttribute('src',srcImg);
          //loaddownbtn();
        //}
      }else{
        toastmsg(json.msg,'error');
      }
    },false);
}
function loaddownbtn(imgId)
{
  imgId=imgId || 'srcImg';
  //<span class="btn btn-default" id="downbtn"></span>
  //var canvas = $('#code').find("canvas")[0];
  var qrCoded='qrlong.jpg';
  //downloadFile(qrCoded, canvas.toDataURL('image/jpeg'));
  //var canvas = $('#myCanvas');
  if(typeof B4A != 'undefined'){
    B4A.CallSub('downqr', true, document.getElementById(imgId).src);
    //console.log("b4a");
  }else{
    downloadFile(qrCoded, document.getElementById(imgId).src);
  }
}

function downloadFile(fileName, content)
{
  var aLink = document.createElement('a');
  var blob = new Blob([base64Img2Blob(content)],{type:"image/jpeg"});
  //var evt = document.createEvent("HTMLEvents");
  //evt.initEvent('click',false,false);
  var url=window.URL.createObjectURL(blob);
  aLink.setAttribute('href', url);
  //aLink.setAttribute('target', '_blank');
  aLink.innerHTML='保存文件';
  aLink.setAttribute('download', fileName);
  //aLink.dispatchEvent(evt);
  //document.body.appendChild(link);
  //$('#downbtn').html(aLink);
  $("body").append(aLink);    // 修复firefox中无法触发click
  aLink.click();
  window.URL.revokeObjectURL(url);
  aLink.remove();
  //alert($('#downbtn a').attr('href'));
}

function base64Img2Blob(code)
{
  var parts = code.split(';base64,');
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);
  for (var i = 0; i < rawLength; ++i)
  {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], {type: contentType});
}
//复制
function copyToClipboard(txt) {
  var input = document.getElementById("copyinput");
  input.value = txt; // 修改文本框的内容
  setTimeout(function(){
	  input.select(); // 选中文本
	  document.execCommand("copy");
	  //alert(input.value);
  },60);
  //页面添加
  //'<input type="text" id="copyinput" value="" style="position:absolute;top:-999em;"></input>'
}

//防截图
$(function(){
    //$('img').load(function(){
    //$('img').css({
    //'-webkit-filter': 'brightness(0.3) blur(3px)',
    //'filter': 'brightness(0.3) blur(3px)'
    //});
    //$('img')[0].focus();
    //});
  });
$(window).focus(function() {
    $('img').css({
        '-webkit-filter': 'brightness(1)',
        'filter': 'brightness(1)'
      });
  });
$(window).blur(function() {
    $('img').css({
        '-webkit-filter': 'brightness(0.1) blur(9px)',
        'filter': 'brightness(0.1) blur(9px)'
        //'-webkit-filter': 'brightness(0.2) blur(9px) grayscale(1)',
        //'filter': 'brightness(0.2) blur(9px) grayscale(1)'
      });
  });

(function ($)
  {
    new gnMenu( document.getElementById( 'gn-menu' ) );
    //手机版自定义
    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function()
      {
        $('.gn-menu li a').bind('click', function(event)
          {
            var $anchor = $(this);
            $('html, body').stop().animate(
              {
                scrollTop: $($anchor.attr('href')).offset().top
              }, 1500, 'easeInOutExpo');
            event.preventDefault();
          });
        $('a.scroll').bind('click', function(event)
          {
            var $anchor = $(this);
            $('html, body').stop().animate(
              {
                scrollTop: $($anchor.attr('href')).offset().top
              }, 1500, 'easeInOutExpo');
            event.preventDefault();
          });
      });

  })(jQuery);

//给Body加一个Click监听事件
$('html').on('click', function(event) {
    var target = $(event.target);
    //alert(target.parent().hasClass('helptip'));
    if (!target.parent().hasClass('helptip')
      //if (!target.hasClass('popover') //弹窗内部点击不关闭
      //&& target.parent('.popover-content').length === 0
      //&& target.parent('.popover-title').length === 0
      //&& target.parent('.popover').length === 0
      //&& target.data("toggle") !== "popover") {
    ) {
      //弹窗触发列不关闭，否则显示后隐藏
      $('[data-toggle="popover"]').popover('hide');
    }
  });


//禁止选择文字复制
$(function(){
    //disableSelection(document.body);
    $('#searchbox').keydown(function (e){
        var curKey = e.which;
        if (curKey == 13) {
          console.log('按下回车')
          return false;
        }
      });
  });

function GetPageScroll() {
  var x, y;
  if(window.pageYOffset) {
    // all except IE
    y = window.pageYOffset;
    x = window.pageXOffset;
  } else if(document.documentElement
    && document.documentElement.scrollTop) {
    // IE 6 Strict
    y = document.documentElement.scrollTop;
    x = document.documentElement.scrollLeft;
  } else if(document.body) {
    // all other IE
    y = document.body.scrollTop;
    x = document.body.scrollLeft;
  }
  return {X:x, Y:y};
}

function disableSelection(target){
  if (typeof target.onselectstart!="undefined") //IE
  target.onselectstart=function(){return false;}
  else if (typeof target.style.MozUserSelect!="undefined") //Firefox
  target.style.MozUserSelect="none";
  else //All other ie: Opera
  target.onmousedown=function(){return false}
  target.style.cursor = "default"
}

//取得链接的参数(没什么用)
//用法
//var $getId = $('[type="hidden"]');
//var getparse=ParaMeter();
//$getId.val(getparse.id);
function ParaMeter()
{
  var obj={};
  var arr=location.href.substring(location.href.lastIndexOf('?')+1).split("&");
  for(var i=0;i < arr.length;i++){
    var aa=arr[i].split("=");
    obj[aa[0]]=aa[1];
  }
  return obj;
}
function menuswitch(index){
  $('.navbar-nav').find('li').removeClass('active');
  $('.navbar-nav>li').eq(index).addClass('active');
}







//nivo lightbox

/*
(function ($)
{
$('.gallery-item a').nivoLightbox(
{
effect: 'fadeScale',                             // The effect to use when showing the lightbox
theme: 'default',                           // The lightbox theme to use
keyboardNav: true,                          // Enable/Disable keyboard navigation (left/right/escape)
clickOverlayToClose: true,                  // If false clicking the "close" button will be the only way to close the lightbox
onInit: function()
{
},                       // Callback when lightbox has loaded
beforeShowLightbox: function()
{
},           // Callback before the lightbox is shown
afterShowLightbox: function(lightbox)
{
},    // Callback after the lightbox is shown
beforeHideLightbox: function()
{
},           // Callback before the lightbox is hidden
afterHideLightbox: function()
{
},            // Callback after the lightbox is hidden
onPrev: function(element)
{
},                // Callback when the lightbox gallery goes to previous item
onNext: function(element)
{
},                // Callback when the lightbox gallery goes to next item
errorMessage: 'The requested content cannot be loaded. Please try again later.' // Error message when content can't be loaded
});
})(jQuery);

*/


//popover自动关闭
//$(function(){
//    $('[data-toggle="popover"]').popover() //弹窗
//    .on('show.bs.popover', function () { //展示时,关闭非当前所有弹窗
//        $(this).parent().siblings().find('[data-toggle="popover"]').popover('hide');
//      });
//  });


/*$('#channelswitchbtn').click(function(){
chanswitch();
});*/
/*function chanswitch()
{
doAjax(
"/m_channel_switch.php",
{
"chan":0
},
"json",
function (json)
{
if(json.res==1){
//window.location.href=window.location.href;
//window.location.reload;
window.location.href='/m_index.php';
}
},false);
}*/
//document.body.addEventListener('touchmove', function (e) {
//    e.preventDefault()
//  }, {
//    passive: false
//  });


/*$(function () {
//微信内置浏览器浏览H5页面弹出的键盘遮盖文本框的解决办法
window.addEventListener("resize", function () {
if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
window.setTimeout(function () {
document.activeElement.scrollIntoViewIfNeeded();
}, 0);
}
});
});

//横坚屏判断
//取值：正负90表示横屏模式、0和180表现为竖屏模式
window.onorientationchange = function(){
switch(window.orientation){
case -90:
case 90:
//toastmsg("横屏:" + window.orientation,"error");
case 0:
case 180:
//toastmsg("竖屏:" + window.orientation,"error");
break;
}
}
*/

/*
//摇一摇 deviceMotion
//返回
//history.pushState(null,null,null);
//以下为鼠标拖拉滚动
var flag = false; //mouse is clicked
var moveValue = 8; //scroll threshold value
var mouseY = 0; //Y coordinate
$(function(){
disableSelection(document.body);
$('.tabbody').bind('mousedown',function(event){
flag = true;
event.preventDefault();
event.stopPropagation();
}).bind('mouseup',function(event){
flag = false;
}).bind('mousemove',function(event){
if(!flag) return;
if(mouseY < event.clientY){
window.scrollTo(0, GetPageScroll().Y - moveValue);
} else {
window.scrollTo(0, GetPageScroll().Y + moveValue);
}
mouseY = event.clientY;
});
});
*/


/*
//全页面都不缓存加载数据
$.ajaxSetup (
{
cache: false //close AJAX cache
});
//fullscreen model action
$(function()
{
$('#btnTestSaveSmall, #btnTestSaveLarge').on('click', function()
{
alert('Clicked save button #' + this.id);
$(this).parents('.modal').modal('hide');
});
$('#btnTestRefreshSmall').on('click', function()
{
alert('Clicked refresh button #' + this.id);
});

//全屏modal弹出层remote清除缓存

$('.modal').on('hidden.bs.modal','',function(e)
{
$(this).removeData("bs.modal");
$(this).find(".modal-content").children().remove();
$(this).find(".modal-content").empty();
});
});*/