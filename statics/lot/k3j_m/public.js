// JavaScript Document

var timeInt = 5000;//核对时间和刷新遗漏数据的频率 毫秒/次
var perQiSec = 60;

function getTimeData(T)
{//根据所给时间，计算当前期号、倒计时间和最近开奖时间

	var setArray = firstTime.split(":");
	var TT = new Date(T.toString());
	var Y = T.getFullYear();
	var M = T.getMonth();
	var D = T.getDate();
	var endTime = new Date(Y,M,D,Number(setArray[0]),setArray[1],Number(setArray[2]) + (perQiSec * 1440))
	//if(T - endTime > 0) TT.setDate(TT.getDate() + 1);//时间已过最后一期则预售第2天的
	var YY = TT.getFullYear();
	var MM = TT.getMonth();
	var DD = TT.getDate();
	var lineTime = new Date(YY,MM,DD,setArray[0],setArray[1],setArray[2])
	var reQi = YY.toString() + addZero(MM+1) + addZero(DD) + "-";
	var diValue = Math.ceil((T - lineTime) / (perQiSec * 1000));
	var fitValue = diValue <= 1 ? 1 : diValue;
	reQi += addZeroN(fitValue,4);
	lineTime.setSeconds(lineTime.getSeconds() + (fitValue * perQiSec));
	var nStopQi = Number(stopQi.replace("-",""));
	if(nStopQi > 0 && Number(reQi.replace("-","")) >= nStopQi)
	{
		isStop = 1;
		stopTip = "今日休市";
		return [stopQi,stopTip,lineTime];
	}
	return [reQi,sec2TimerString(lineTime - T),lineTime];
}

/*function getTimeData(T)
{//根据所给时间，计算当前期号、倒计时间和最近开奖时间

	var setArray = firstTime.split(":");
	var TT = new Date(T.toString());
	var Y = T.getFullYear();
	var M = T.getMonth();
	var D = T.getDate();
	var endTime = new Date(Y,M,D,Number(setArray[0]),setArray[1],Number(setArray[2]) + (perQiSec * 1440))
	if(T - endTime > 0) TT.setDate(TT.getDate() + 1);//时间已过最后一期则预售第2天的
	var YY = TT.getFullYear();
	var MM = TT.getMonth();
	var DD = TT.getDate();
	var lineTime = new Date(YY,MM,DD,setArray[0],setArray[1],setArray[2])
	var reQi = YY.toString() + addZero(MM+1) + addZero(DD) + "-";
	var diValue = Math.ceil((T - lineTime) / (perQiSec * 1000));
	var fitValue = diValue <= 1 ? 1 : diValue;
	reQi += addZeroN(fitValue,4);
	lineTime.setSeconds(lineTime.getSeconds() + (fitValue * perQiSec));
	var nStopQi = Number(stopQi.replace("-",""));
	if(nStopQi > 0 && Number(reQi.replace("-","")) >= nStopQi)
	{
		isStop = 1;
		stopTip = "今日休市";
		return [stopQi,stopTip,lineTime];
	}
	return [reQi,sec2TimerString(lineTime - T),lineTime];
}*/

function addZeroN(num, n)
{
	return (Array(n).join(0) + num).slice(-n);
}

function switchface(numb)
{
	//弃用
	var facehtml='';
	switch(numb){
		case 1:
		facehtml='<div class="first-face"><span class="pip pred"></span></div>';
			break;
		case 2:
		facehtml='<div class="second-face"><span class="pip"></span><span class="pip"></span></div>';
			break;
		case 3:
		facehtml='<div class="third-face"><span class="pip"></span><span class="pip"></span><span class="pip"></span></div>';
			break;
		case 4:
		facehtml='<div class="fourth-face"> \
		<div class="column"><span class="pip pred"></span><span class="pip pred"></span></div> \
		<div class="column"><span class="pip pred"></span><span class="pip pred"></span></div> \
		</div>';
			break;
		case 5:	
		facehtml='<div class="fifth-face"> \
		<div class="column"><span class="pip"></span><span class="pip"></span></div> \
		<div class="column"><span class="pip"></span></div> \
		<div class="column"><span class="pip"></span><span class="pip"></span></div> \
		</div>';
			break;
		case 6:
		facehtml='<div class="sixth-face"> \
		<div class="column"><span class="pip"></span><span class="pip"></span><span class="pip"></span></div> \
		<div class="column"><span class="pip"></span><span class="pip"></span><span class="pip"></span></div> \
		</div>';
			break;
	}
	return facehtml;
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
      	$("#codeTab").find(".currenAward").empty();
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
                var lq=qiMax-hq; //1440-已售,得到剩余期数
                $("#sellq").html(hq); //已售期数
                $("#leftq").html(lq); //还有几期
                $("#qh").html(yyhit_qistrs); //右上角最新开奖面板期号
                var ayyhit_code=yyhit_code.split(","); //打散期号文本为数组
                var strOpenCode='';
                for(j=0;j<ayyhit_code.length;j++)
                {
                  //strOpenCode=strOpenCode+"<em class=\"awardBall\">"+ayyhit_code[j]+"</em>";
                  //strOpenCode=strOpenCode+'<em class="awardpk10 awardpk10_'+ayyhit_code[j]+'">'+ayyhit_code[j]+'</em>';
                  //strOpenCode=strOpenCode+switchface(parseInt(ayyhit_code[j]));
                  strOpenCode=strOpenCode+'<em class="dice dice_'+ayyhit_code[j]+'"></em>';
                }
                $("#openq").html(strOpenCode+'<em class="diceadd">'+$(this).attr("z")+'</em>') ; //开奖号红色大圆圈
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
                  renderCode=renderCode+'<em class="dice dice_'+renderAry_code[j]+'"></em>';
                }
                //显示html
                var render_x='<em class="awardpk10 awardpk10_'+$(this).attr("xc")+'" >'+$(this).attr("x")+'</em>';
                var render_y='<em class="awardpk10 awardpk10_'+$(this).attr("yc")+'" >'+$(this).attr("y")+'</em>';
                var render_z='<em class="awardpk10 awardpk10_08" >'+yyhit_hs+'</em>';
                var codehtml_tr='<span class="col-xs-12" style="font-size:11px;">第'+yyhit_qistrs+'期</span><span class="col-xs-6">'+renderCode+'</span><span class="col-xs-2" style="font-size:13px;">'+render_z+'</span><span class="col-xs-2" style="font-size:13px;">'+render_x+'</span><span class="col-xs-2" style="font-size:13px;">'+render_y+'</span>';
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

function showPrize()
{//显示奖金表
	try
	{
		var r = $D("prizeTab").rows;
		r[1].cells[1].innerHTML = setArr[0][2];
		r[2].cells[1].innerHTML = setArr[0][3];
		r[3].cells[1].innerHTML = setArr[0][4];
		r[4].cells[1].innerHTML = setArr[0][5];
		r[5].cells[1].innerHTML = setArr[0][6];
		r[6].cells[1].innerHTML = setArr[0][7];
		r[7].cells[1].innerHTML = setArr[0][8];
	}
	catch(e){}
}

function setMyMark(o,id){setMark(o,"k3j",id);}