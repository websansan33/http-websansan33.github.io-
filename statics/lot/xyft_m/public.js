// JavaScript Document xyft

var timeInt = 4000;//核对时间和刷新遗漏数据的频率 毫秒/次
var perQiSec = 300;
function getTimeData(T)
{
  //根据所给时间，计算当前期号、倒计时间和最近开奖时间
  //T是网络加载的当前时间最新时间
  //根据所给时间，返回当前期号，倒计时间，截止时间
  //每天第一次开期时间
  var Y = T.getFullYear();
  //alert(Y);
  var M = T.getMonth();
  var D = T.getDate();
  var H = T.getHours();
  var N = T.getMinutes();
  //带零年月日
  var reQi = Y.toString() + addZero(M+1) + addZero(D) + "-";
  var Qi;
  var Kai;

  switch(true)
  {
    case ((H >= 5 && H < 13) || (H == 4 && N > 4) || (H == 13 && N < 9)) :
    //04:04-13:09
    Qi = 1;
    Kai = new Date(Y,M,D,13,09,0);
    break;
    case (H > 13 || (H == 13 && N >= 9)) :   //13:09-23:59
    var firstDT = new Date(Y,M,D,13,9,0).getTime();
    Qi = Math.ceil((T - firstDT) / perQiSec / 1000) + 1;
    Kai = new Date(Y,M,D,13,9 + (Qi - 1) * 5,0);
    break;
    default :   //0:00 - 04:04
    reQi = Y.toString() + addZero(M+1) + addZero(D-1) + "-";
    var firstDT = new Date(Y,M,D,0,0-1,0).getTime();
    Qi = 131 + Math.ceil((T - firstDT) / perQiSec / 1000);
    Kai = new Date(Y,M,D,0,((Qi-131) * 5)-1,0);
    break;
  }
  //  var nStopQi = Number(stopQi.replace("-",""));
  //  if(nStopQi > 0 && Number(reQi.replace("-","")) >= nStopQi)
  //  {
  //    isStop = 1;
  //    stopTip = "今日休市";
  //    return [stopQi,stopTip,lineTime];
  //  }
  reQi += addZeros(Number(Qi));
  //返回三参数 期号 倒计时 当前时间
  return [reQi,sec2TimerString(Kai - T),Kai];
}

function showPrize()
{//显示奖金表
  try
  {
    var r = $D("prizeTab").rows;
    r[1].cells[1].innerHTML = setArr[0][0];
    r[2].cells[1].innerHTML = setArr[0][1];
    r[3].cells[1].innerHTML = setArr[0][2];
    r[4].cells[1].innerHTML = setArr[0][3];
  }
  catch(e){}
}

function loadData(s,codeurl)
{
  //载入开奖号码
  $.ajax({
      url:codeurl+'?ts'+$.now(),
      type: "post",
      dataType: "xml",//这里可以不写，但千万别写text或者html!!!
      timeout: 6000,
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      async:true,
      error: function(xml,msg){
        // Showbo.Msg.alert("网络通讯错误，请与管理员联系"+codeurl+"?ts"+(new Date));
      },
      success: function(xml){
        $("#codeTab").find(".currenAward").html('');
        /*
        if($("#ballPanel") && s)
        {
        var span = [];
        var data = [];
        var dd = $("#ballPanel").children("dd");
        var k=0;
        for(i = 0;i < dd.length;i++)
        {
        if(k<5)
        span = span.concat(objsToArray(dd.eq(i).children("i")));

        k++;
        }
        k=0;
        $(xml).find("d").each(function(i){
        if(k<5)
        data = data.concat($(this).text().split("|"));//取文本
        k++;

        });

        for(j = 0;j < span.length;j++){
        span[j].html(data[j]);
        }

        }
        */
        //开奖号码
        if($("#codeTab") ||$("#botCodeTab"))
        {
          //var yyhit_ti; //时间
          var yyhit_hs; //后三
          var yyhit_qi; //期号
          var yyhit_code;//开奖号码
          var yyhit_qistrs;
          k=1;
          $(xml).find("c").each(function(i){
              yyhit_code = $(this).text();//取文本
              //yyhit_ti=$(this).attr("t");
              yyhit_hs=$(this).attr("z");
              yyhit_qistrs=$(this).attr("q") //开奖期号
              yyhit_qi=yyhit_qistrs.split("-"); //期号分成日期+编号

              //当前开奖号码
              if(k==1)
              {
                hq=Number(yyhit_qi[1]); //已售期数
                //hq=Number($(this).attr("t")); //已售期数
                var lq=qiMax-hq; //120-已售,得到剩余期数
                $("#sellq").html(hq); //已售期数
                $("#leftq").html(lq); //还有几期
                $("#qh").html(yyhit_qi[1]); //右上角最新开奖面板期号
                var ayyhit_code=yyhit_code.split(","); //打散期号文本为数组
                var strOpenCode='';
                for(j=0;j<ayyhit_code.length;j++)
                {
                  strOpenCode=strOpenCode+'<em class="awardpk10 awardpk10_'+ayyhit_code[j]+'">'+ayyhit_code[j]+'</em>';
                }
                $("#openq").empty();
                $("#openq").html(strOpenCode+'<b>'+$(this).attr("z")+'<b>') ; //开奖号红色大圆圈
                strOpenCode=null;
                ayyhit_code=null;
                //fix20160411,yyhit_qi[1]与nowQi比较差值为1则关闭intervalId定时
                var qi_cmp=nowQi-yyhit_qistrs;
                if(qi_cmp==1 && intervalId>0)
                {
                  //playmsg('opencode.wav');//更新结束了,语音提示/css/music/
                  window.clearInterval(intervalId);
                  intervalId=0;
                  //$("#newWinTitle").html('<s class="rt"></s><s class="lt"></s>最新开奖') //调试用fix
                }else
                {
                  //正在摇奖语音提示
                  //playmsg("waiting.mp3");
                }

                //fix over
              }

              /*if(k<$("#codeTab").find("tr").length)
              {
              $("#codeTab").find("tr").eq(k).find("td").eq(0).html(yyhit_qi[1]);
              $("#codeTab").find("tr").eq(k).find("td").eq(1).html(yyhit_code);
              $("#codeTab").find("tr").eq(k).find("td").eq(2).html(yyhit_hs);
              }
              //下面手机修正代替
              */
              if($("#codeTab").find(".currenAward").length>0){
                //号码列表上色
                var renderAry_code=yyhit_code.split(","); //打散期号文本为数组
                var renderCode='';
                for(j=0;j<renderAry_code.length;j++)
                {
                  renderCode=renderCode+'<em class="awardpk10 awardpk10_'+renderAry_code[j]+'">'+renderAry_code[j]+'</em>';
                }
                //显示html
                var codehtml_tr='<span class="col-xs-12" style="font-size:11px;">第'+yyhit_qistrs+'期</span><span class="col-xs-12">'+renderCode+'</span><span class="col-xs-12" style="font-size:13px;">'+yyhit_hs+'</span>';
                $("#codeTab").find(".currenAward").append(codehtml_tr);
                renderAry_code=null;
                renderCode=null;
                codehtml_tr=null;
              }


              k++;


            });
          yyhit_hs=null;
          yyhit_qi=null;
          yyhit_code=null;
          yyhit_qistrs=null;
        }
      }
    });
}

function selectBatch(line,t)
{
  //alert(t);
  //nam全局玩法名称
  switch(nam){
    case "猜前五名" :
    return false;
    break;
    case "猜前六名" :
    return false;
    break;
    case "猜前七名" :
    return false;
    break;
    case "猜前八名" :
    return false;
    break;
    case "猜前九名" :
    return false;
    break;
    case "猜前十名" :
    return false;
    break;
    default:
    break;
  }
  var divs = $("#ballPanel").children("DT").eq(line - 1).children("B");
  for(var i = 0;i < divs.length;i++) divs.removeClass("sel");
  switch(t)
  {
    case 1 :
    for(i = 0;i < divs.length;i++) divs.addClass("sel");
    break;
    case 2 :
    try
    {
      var spans = $("#ballPanel").children("DD").eq(line - 1).children("SPAN");
      var yArr = new Array(10);
      for(i = 0;i < spans.length;i++) yArr[i] = Number(getInnerText(spans.eq(i)));
      var yyArr = yArr.slice(0);
      yArr.sort(function(a,b){return a-b;});
      ii = 0;
      for(var i=0;i<=9;i++)
      {
        if(yyArr[i] >= yArr[5] && ii < 5)
        {
          divs.eq(i).addClass("sel");
          ii++;
        }
      }
    }
    catch(e){showData = true;loadData(showData,dataPath);}
    break;
    case 3 :
    for(i = 5;i < divs.length;i++) divs.eq(i).addClass("sel");
    break;
    case 4 :
    for(i = 0;i < 5;i++) divs.eq(i).addClass("sel");
    break;
    case 5 : //单
    for(i = 0;i < divs.length;i++) if(i % 2 == 0) divs.eq(i).addClass("sel");
    break;
    case 6 : //双
    for(i = 0;i < divs.length;i++) if(i % 2 == 1) divs.eq(i).addClass("sel");
    break;
    //    case 7 :
    //      divs.eq(1).addClass("sel");
    //      divs.eq(2).addClass("sel");
    //      divs.eq(3).addClass("sel");
    //      divs.eq(5).addClass("sel");
    //      divs.eq(7).addClass("sel");
    //      break;
  }
  collectBall(true,",");
}

function setMyMark(o,id){setMark(o,"pk10",id);}



