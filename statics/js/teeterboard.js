//seesaw
//依赖 jquery.rotate.min.js
//var ST;
//var ET;
//var TT;
var changci;
var boardposition=0; //0平行1左倾2右倾
var resultModel_open=false;
var checkinModel_open=false;
var rotateFunc = function(angle1) //角度 奖项
{
  //awards:奖项，angle:奖项对应的角度
  var $rotaryboard = $('.boardbox');
  $rotaryboard.stopRotate();
  $rotaryboard.rotate(
    {
      angle: 0,
      duration: 3000, //转动时间
      //easing: $.easing.easeOutSine,
      animateTo: angle1,  //angle角度
      callback: function()
      {
        //完成后事件
        //alert("ha");
        return true;
      }
    });
};

//左右平
function changeboard(direction){
  //direction=0;//平行
  //direction=1; //左侧
  //direction=2; //右侧
  switch(direction){
    case 0:
    boardposition=0;
    rotateFunc(0);
    break;
    case 1:
    boardposition=1;
    rotateFunc(-3.15);
    break;
    case 2:
    boardposition=2;
    rotateFunc(3.15);
    break;
    default:
    break;
  }
}

var eggele=$('.eggline div').children("span").find("egg");
eggele.on('click',function(evnt){
    //console.log($(this).index('egg')+1);
    var eggnum=$(this).index('egg')+1;
    var oftop=parseInt($(this).offset().top)-60;
    var ofleft=parseInt($(this).offset().left);
    feedSubmit(eggnum,oftop,ofleft);
  });

// 将事件监听的事件改成show.bs.modal 即可解决
$('#resultModel').on('show.bs.modal', function (e){
    // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
    $(this).css('display', 'block');
    var modalHeight=$(window).height()/2-$('#resultModel .modal-dialog').height()/2;
    $(this).find('.modal-dialog').css({
        'margin-top': modalHeight
      });
  });

//测试区域
$('#chargebtn').on('click',function(event)
  {
    //参数是顺时角度，负数为逆时角度
    //rotateFunc(3.25);
    var direct=Math.floor(Math.random()*3);
    //console.log(direct);
    //changeboard(direct);
    //overGame();
    showexchangeform();
  });
$('#gamehelpbtn').click(function(){
    showgamehelp();
  });
$('#historybtn').click(function(){
    GetHistory();
  });

//兑换表单
var changeway=2;
$("#savebtn").click(function(){
    doAjax(
      "/m_form_exchange_edit.php",
      {
        'amount':$('#amount').val(),
        'changeway':$('#changeway').val()
      },
      "json",
      function (json)
      {
        if(json.res==1){
          toastmsg(json.msg,'success');
          getDataList();
        }else{
          toastmsg(json.msg,'error');
        }
      },false);
  });
$("#switchbtn").click(function(){
    var $twowayspan = $('#exchangeway').children('span');
    var firstDiv = $twowayspan.eq(0);
    var secondDiv = $twowayspan.eq(2);
    var temp;
    temp = firstDiv.html();
    firstDiv.html(secondDiv.html());
    secondDiv.html(temp);
    if(changeway==1){
      changeway=2;
    }else{
      changeway=1;
    }
    $("#changeway").val(changeway);
  });

//左边选金额
var selmoney=1000;
$("#selMoney li").removeClass("active");
$("#selMoney li").eq(0).addClass("active");
$("#selMoney li").click(function()
  {
    $("#selMoney li").removeClass("active");
    $("#selMoney li").eq($(this).index()).addClass("active");
    selmoney = $("#selMoney li").eq($(this).index()).html();
    console.log(selmoney);
  });
//右边选金额
//var rightmoney=100;
//$("#selRightMoney li").removeClass("active");
//$("#selRightMoney li").eq(0).addClass("active");
//$("#selRightMoney li").click(function()
//  {
//    $("#selRightMoney li").removeClass("active");
//    $("#selRightMoney li").eq($(this).index()).addClass("active");
//    rightmoney = $("#selRightMoney li").eq($(this).index()).html();
//    console.log(rightmoney);
//  });

//猜左边赢
$("#guessLeftBtn").on('click',function(){
    var betmoney=selmoney;
    var direct=1;
    betSubmit(betmoney,direct);
  });
//猜右边赢
$("#guessRightBtn").on('click',function(){
    var betmoney=selmoney;
    var direct=2;
    betSubmit(betmoney,direct);
  });

function showqi(){
  var qires=makeqitimer(nowTime);
  var qicode=qires[0];
  var startTime=qires[2];
  var changres=makechangtimer(startTime);
  changci=changres[0];
  var changstart=changres[1];
  var changend=changres[2];
  var sec=changend - nowTime;
  nowTime.setSeconds(nowTime.getSeconds()+1);
  if(changci==1){
    if (resultModel_open) {
      $("#resultModel").modal('hide');
      resultModel_open = false;
    }
  }
  var qicodehtml='第'+qicode+'局<br>';
  var timerhtml=qicodehtml+'第'+changci+'次竞猜 剩余'+sec2TimerString(sec)+'<br>凭运气猜猜哪边会获胜?';
  if(changci==4){
    timerhtml=qicodehtml+'开始投金币喂养'+sec2TimerString(sec)+'<br>小动物吃胖,增加体重可能改变结果';
  }
  if(changci==5){
    timerhtml='新的一局马上开始'+'<br>您猜中了吗?';
    if(nowTime-changstart>1000){
      if(resultModel_open==false){
        setTimeout(function(){overGame()}, 100);
      }
    }
  }
  $("#timer").html(timerhtml);
}

function vbsDate2JsDate(s)
{
  //VBS日期格式转换成JS日期
  var p = s.split(" ");
  var re = /\D+/img;
  p[0] = p[0].split(re);
  if(p.length < 2) p[1] = "00:00:00";
  p[1] = p[1].split(re);
  return new Date(p[0][0],Number(p[0][1]) - 1,p[0][2],p[1][0],p[1][1],p[1][2])
}


function makeqitimer(T)
{
  //基本参数
  var firstTime="00:00:00";
  var perQiSec=180;
  var qiMax=480;
  var baseQi=100000;
  var baseDate=vbsDate2JsDate("2018-12-01");
  //时间计算
  var setArray = firstTime.split(":");
  var TT = new Date(T.toString());
  var Y = T.getFullYear();
  var M = T.getMonth();
  var D = T.getDate();
  //每天截止时间
  var endTime = new Date(Y,M,D,Number(setArray[0]),setArray[1],Number(setArray[2]) + (perQiSec * qiMax));
  //时间已过最后一期则预售第2天的
  if(T - endTime > 0) TT.setDate(TT.getDate() + 1);

  var YY = TT.getFullYear();
  var MM = TT.getMonth();
  var DD = TT.getDate();
  //第一期时间
  var lineTime = new Date(YY,MM,DD,setArray[0],setArray[1],setArray[2]);
  //初始期
  var reQi = parseInt(baseQi);
  //diValue当天期 perQiSec每期间隔秒
  var diValue = Math.ceil((T - lineTime) / (perQiSec * 1000));
  //fitValue 当天期修正
  var fitValue = diValue <= 1 ? 1 : diValue;

  var difday=parseInt(daysElapsed(TT,baseDate)*qiMax); //相差天数*每天最大期数

  reQi += difday + parseInt(addZero(fitValue));
  //截止时间
  var startTime=new Date(YY,MM,DD,setArray[0],setArray[1],setArray[2]);
  startTime.setSeconds(startTime.getSeconds() + ((fitValue-1) * perQiSec));
  lineTime.setSeconds(lineTime.getSeconds() + (fitValue * perQiSec));
  //console.log(startTime);
  return [reQi,sec2TimerString(lineTime - T),startTime,lineTime];
}


function makechangtimer(T)
{
  //T每期开始时间
  var tramp_t1    = T.getTime();
  var tramp_t2    = tramp_t1 + 60*1000;
  var tramp_t3    = tramp_t2 + 60*1000;
  var tramp_t4    = tramp_t3 + 30*1000;
  var tramp_t5    = tramp_t4 + 20*1000;
  var tramp_t6    = tramp_t5 + 10*1000;
  var timestamp=new Date().getTime();
  var tramp_strat    = 0;
  var tramp_end    = 0;
  var changci    = 0;
  var isbet    = 0;
  switch(true){
    case timestamp >= tramp_t1 && timestamp < tramp_t2:
    //场1
    tramp_strat = tramp_t1;
    tramp_end = tramp_t2;
    changci = 1;
    isbet = 1;
    break;
    case timestamp >= tramp_t2 && timestamp < tramp_t3:
    //场2
    tramp_strat = tramp_t2;
    tramp_end = tramp_t3;
    changci = 2;
    isbet = 1;
    break;
    case timestamp >= tramp_t3 && timestamp < tramp_t4:
    //场3
    tramp_strat = tramp_t3;
    tramp_end = tramp_t4;
    changci = 3;
    isbet = 1;
    break;
    case timestamp >= tramp_t4 && timestamp < tramp_t5:
    //场4
    tramp_strat = tramp_t4;
    tramp_end = tramp_t5;
    changci = 4;
    isbet = 0;
    break;
    case timestamp >= tramp_t5 && timestamp <= tramp_t6:
    //场5
    tramp_strat = tramp_t5;
    tramp_end = tramp_t6;
    changci = 5;
    isbet = 0;
    break;
    default:
    break;
  }
  return [changci,tramp_strat,tramp_end];
}

function signprogressbar(days,d_day,rewarddata){
	//签到进度
        var pBar=$('#progressBar');
        var barhtml='<div><i></i></div>';
        for(var i = 0; i < days; i++){
          barhtml+='<span></span>';
        }
        pBar.html('');
        pBar.append(barhtml);
        var percent=100/(days-1);
        var barwidth=percent*(d_day-1);
        pBar.children('div').find('i').css({"width":barwidth+'%'});
        for(var i = 0; i < days; i++){
          var barleft=percent*(i);
          pBar.children('span').eq(i).html(i+1);
          //pBar.children('span:after').eq(i).css({"content":'100'});
          if(rewarddata.length>0){
		  	pBar.children('span').eq(i).attr('data-content', rewarddata[i]+'金');
		  }
          if(i<d_day){
            pBar.children('span').eq(i).css({"left": barleft+'%',"background":"green"});
          }else{
            pBar.children('span').eq(i).css({"left": barleft+'%',"background":"#ccc;"});
          }

        }
      }

function loadGame()
{
  doAjax(
    "/teeterboard_load.php",
    {
      "t":1
    },
    "json",
    function (json)
    {
      if(json.res==1){
        changci=json.changci;
        eggdata=json.eggdata;
        //console.log(eggdata['weight1']);
        var eggele=$('.eggline div').children("span").find("egg");
        $.each(eggele,function (index,domEle){
            //index索引值 domEle 每一个dom
            var eggmodel=eggdata['model'+(index+1)];
            if($(domEle).hasClass("chick")) $(domEle).removeClass("chick");
            if($(domEle).hasClass("hen")) $(domEle).removeClass("hen");
            if($(domEle).hasClass("cock")) $(domEle).removeClass("cock");
            if($(domEle).hasClass("egg")) $(domEle).removeClass("egg");
            var eggcss='';
            //console.log(eggmodel);
            switch(eggmodel){
              case '1':
              eggcss='chick';
              break;
              case '2':
              eggcss='hen';
              break;
              case '3':
              eggcss='cock';
              break;
              default:
              eggcss='egg';
              break;
            }
            $(domEle).addClass(eggcss);
          });
        var weiele=$('.eggline div').children("span").find("i");
        $.each(weiele,function (index,domEle){
            //index索引值 domEle 每一个dom
            var curwei=eggdata['weight'+(index+1)];
            curwei=(curwei==0)?'?':(curwei+'kg');
            $(domEle).html(curwei);
          });
        //console.log(json.direction);
        if(boardposition!=json.direction){
          changeboard(json.direction);
        }
        $('#amount_p').html(json.amount);
        $('#rewardpercent').html(json.rewardpercent);
        $('#betlefttotal').html('累计'+json.betlefttotal+'金币');
        $('#betrighttotal').html('累计'+json.betrighttotal+'金币');
        $('#betleftuser').html('我投入了'+json.betleftuser);
        $('#betrightuser').html('我投入了'+json.betrightuser);
        //console.log(eggdata.weight1);
        //签到
        if(json.checkintoday==0){
          $('#maxcheckinday').html(json.checkintimes);
          if( checkinModel_open == false){
          	signprogressbar(7,json.checkintimes,json.checkinreward);
            $("#checkinModel").modal({
                backdrop : true,
                keyboard : true
              });
            checkinModel_open=true;
          }
        }
      }else{
        toastmsg(msgList(json.msgList),'error');
      }
    },true);
}

$('#checkinbtn').click(function(){
    doAjax(
      "/teeterboard_signed.php",
      {
        "t":1
      },
      "json",
      function (json)
      {
        if(json.res==1){
          $('#maxcheckinday').html(json.checkintimes);
          signprogressbar(7,json.checkintimes,json.checkinreward);
          toastmsg('连续签到'+json.checkintimes+'天<br>获得'+json.checkingoldcoin+'金币','success');
        }else{
          toastmsg(msgList(json.msgList),'error');
        }
      },true);

  });

function overGame()
{
  doAjax(
    "/teeterboard_open.php",
    {
      "t":1
    },
    "json",
    function (json)
    {
      if(json.res==1){
        $('#betrenshu').find("i").eq(0).html(json.betrenshu);
        $('#betrenshu').find("i").eq(1).html(json.winrenshu);
        $('#losebetgoldcoin').find("i").eq(0).html(json.losebetgoldcoin);
        changci=json.changci;
        eggdata=json.eggdata;
        //console.log(eggdata['weight1']);
        var eggele=$('.eggresult').children("span").find("egg");
        $.each(eggele,function (index,domEle){
            //index索引值 domEle 每一个dom
            var eggmodel=eggdata['model'+(index+1)];
            if($(domEle).hasClass("chick")) $(domEle).removeClass("chick");
            if($(domEle).hasClass("hen")) $(domEle).removeClass("hen");
            if($(domEle).hasClass("cock")) $(domEle).removeClass("cock");
            if($(domEle).hasClass("egg")) $(domEle).removeClass("egg");
            var eggcss='';
            //eggmodel='5';
            //console.log(eggmodel);
            switch(eggmodel){
              case '1':
              eggcss='chick';
              break;
              case '2':
              eggcss='hen';
              break;
              case '3':
              eggcss='cock';
              break;
              default:
              eggcss='egg';
              break;
            }
            $(domEle).addClass(eggcss);
          });
        var weiele=$('.eggresult').children("span").find("i");
        $.each(weiele,function (index,domEle){
            //index索引值 domEle 每一个dom
            var curwei=eggdata['weight'+(index+1)];
            curwei=(curwei==0)?'?':curwei;
            $(domEle).html(curwei);
          });
        //数据bettotalleft
        var bettotalleftele=$('#bettotalleft').find("span");
        var betleftalllist=json.betleftalllist;
        $.each(bettotalleftele,function (index,domEle){
            var curval=betleftalllist[index];
            $(domEle).html(curval);
          });
        //数据bettotalright
        var bettotalrightele=$('#bettotalright').find("span");
        var betrightalllist=json.betrightalllist;
        $.each(bettotalrightele,function (index,domEle){
            var curval=betrightalllist[index];
            $(domEle).html(curval);
          });
        //数据betmyleft
        var betmyleftele=$('#betmyleft').find("span");
        var betleftmylist=json.betleftmylist;
        $.each(betmyleftele,function (index,domEle){
            var curval=betleftmylist[index];
            $(domEle).html(curval);
          });
        //数据betmyright
        var betmyrightele=$('#betmyright').find("span");
        var betrightmylist=json.betrightmylist;
        $.each(betmyrightele,function (index,domEle){
            var curval=betrightmylist[index];
            $(domEle).html(curval);
          });
        //胜负
        if(json.windirect==1){
          if($('#leftresult').hasClass('panel-lose')){
            $('#leftresult').removeClass('panel-lose');
            $('#leftresult').addClass('panel-win');
          }
          if($('#rightresult').hasClass('panel-win')){
            $('#rightresult').removeClass('panel-win');
            $('#rightresult').addClass('panel-lose');
          }
          $('#leftresult>.panel-title>.bettitle').html('胜');
          $('#rightresult>.panel-title>.bettitle').html('负');
        }
        if(json.windirect==2){
          if($('#leftresult').hasClass('panel-win')){
            $('#leftresult').removeClass('panel-win');
            $('#leftresult').addClass('panel-lose');
          }
          if($('#rightresult').hasClass('panel-lose')){
            $('#rightresult').removeClass('panel-lose');
            $('#rightresult').addClass('panel-win');
          }
          $('#leftresult>.panel-title>.bettitle').html('负');
          $('#rightresult>.panel-title>.bettitle').html('胜');
        }
        $('#leftresult>.panel-title>.betgoldcoin>i').html(json.betlefttotal);
        $('#rightresult>.panel-title>.betgoldcoin>i').html(json.betrighttotal);
        $('#winmygoldcoin>i').html(json.winmygoldcoin);
        showresult();
      }else{
        toastmsg(msgList(json.msgList),'error');
      }
    },true);
}

$(function() {
    $('#resultModel').on('hidden.bs.modal', function() {
        //resultModel_open = false;
      });
    //checkinModel_open
    $('#checkinModel').on('hidden.bs.modal', function() {
        //checkinModel_open = false;
      });
  })

function showresult(){
  // 如果模态框未打开就打开模态框并设置标志字段为已打开
  if (!resultModel_open) {
    //$("#resultModel").modal('hide');
    $("#resultModel").modal({
        backdrop : 'static',
        keyboard : false
      });
    resultModel_open = true;
  }
}

function showexchangeform()
{
  $("#exchangeModel").modal({
      //backdrop : 'static',
      backdrop : true,
      keyboard : false
    });
}

function showgamehelp()
{
  $("#gamehelpModel").modal({
      //backdrop : 'static',
      backdrop : true,
      keyboard : false
    });
}

function betSubmit(bmoney,dire){
  doAjax(
    "/teeterboard_buy.php",
    {
      "money":bmoney,
      "direct":dire
    },
    "json",
    function (json)
    {
      if(json.res==1){
        toastmsg('我投'+bmoney+'金币','success');
        loadGame();
      }else{
        toastmsg(msgList(json.msgList),'error');
      }
    },true);
}

function feedSubmit(eggnum,oftop,ofleft){
  doAjax(
    "/teeterboard_feed.php",
    {
      "eggnum":eggnum
    },
    "json",
    function (json)
    {
      if(json.res==1){
        feedshow('-10金币',oftop,ofleft);
      }else{
        //toastmsg(msgList(json.msgList),'error',500);
        feedshow(msgList(json.msgList),oftop,ofleft);
      }
    },true);
}

function feedshow(feedres,oftop,ofleft)
{
  $('.feedtip').addClass('fadein');
  $('.feedtip i').html(feedres);
  $('.feedtip').css({'top':oftop,'left':ofleft});
  setTimeout(function(){
      $('.feedtip').css({'top':-100,'left':-100});
      $('.feedtip').removeClass('fadein');
    },800);
}

function GetHistory()
{
  doAjax(
    "/teeterboard_history.php",
    {
      "pSize": 10,
      "page": 1
    },
    "json",
    function (json)
    {
      CreateHistoryList(json.List);
      $("#historyModel").modal({
          //backdrop : 'static',
          backdrop : true,
          keyboard : false
        });
    },false);
}
// 写入表格数据
function CreateHistoryList(obj) {
  var html = '<tr>'
  +'<th>局序</th>'
  +'<th>场序</th>'
  +'<th>位置</th>'
  +'<th>投入</th>'
  +'<th>获奖</th>'
  //+'<th>时间</th>'
  +'</tr>';
  $("#table_head").html(html);
  var html='';
  if (obj.length > 0) {
    //html += '<tr><td colspan="7" style="border:0;padding:0;line-height:3px;height:3px;background-color:#EEEEEE;"></td></tr>';
    $.each(obj, function (index, item) {
        html += ''
        +'<tr id="wishline'+item.id+'">'
        +'<input type="hidden" value="'+item.id+'" />'
        +'<td>' + item.qici + '</td>'
        +'<td>' + item.changci + '</td>'
        +'<td>' + item.position + '</td>'
        +'<td>' + item.betgoldcoin + '</td>'
        +'<td>' + item.wingoldcoin + '</td>'
        +'</tr>';
      });
  }
  else {
    html += '<tr><td colspan="7" align="center"> 什么也没有！</td></tr>';
  }
  $("#table_list").html(html);
}













/*
doAjax(
"/teeterboard_buy.php",
{
"money":bmoney,
"direct":dire
},
"json",
function (json)
{
if(json.res==1){

}else{
toastmsg('','error');
}
},false);
*/
