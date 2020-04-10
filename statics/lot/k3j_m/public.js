var timeInt=5000;var perQiSec=60;function getTimeData(T)
{var setArray=firstTime.split(":");var TT=new Date(T.toString());var Y=T.getFullYear();var M=T.getMonth();var D=T.getDate();var endTime=new Date(Y,M,D,Number(setArray[0]),setArray[1],Number(setArray[2])+(perQiSec*1440))
var YY=TT.getFullYear();var MM=TT.getMonth();var DD=TT.getDate();var lineTime=new Date(YY,MM,DD,setArray[0],setArray[1],setArray[2])
var reQi=YY.toString()+addZero(MM+1)+addZero(DD)+"-";var diValue=Math.ceil((T-lineTime)/(perQiSec*1000));var fitValue=diValue<=1?1:diValue;reQi+=addZeroN(fitValue,4);lineTime.setSeconds(lineTime.getSeconds()+(fitValue*perQiSec));var nStopQi=Number(stopQi.replace("-",""));if(nStopQi>0&&Number(reQi.replace("-",""))>=nStopQi)
{isStop=1;stopTip="今日休市";return[stopQi,stopTip,lineTime];}
return[reQi,sec2TimerString(lineTime-T),lineTime];}
function addZeroN(num,n)
{return(Array(n).join(0)+num).slice(-n);}
function switchface(numb)
{var facehtml='';switch(numb){case 1:facehtml='<div class="first-face"><span class="pip pred"></span></div>';break;case 2:facehtml='<div class="second-face"><span class="pip"></span><span class="pip"></span></div>';break;case 3:facehtml='<div class="third-face"><span class="pip"></span><span class="pip"></span><span class="pip"></span></div>';break;case 4:facehtml='<div class="fourth-face"> \

  <div class="column"><span class="pip pred"></span><span class="pip pred"></span></div> \

  <div class="column"><span class="pip pred"></span><span class="pip pred"></span></div> \

  </div>';break;case 5:facehtml='<div class="fifth-face"> \

  <div class="column"><span class="pip"></span><span class="pip"></span></div> \

  <div class="column"><span class="pip"></span></div> \

  <div class="column"><span class="pip"></span><span class="pip"></span></div> \

  </div>';break;case 6:facehtml='<div class="sixth-face"> \

  <div class="column"><span class="pip"></span><span class="pip"></span><span class="pip"></span></div> \

  <div class="column"><span class="pip"></span><span class="pip"></span><span class="pip"></span></div> \

  </div>';break;}
return facehtml;}
function loadData(s,codeurl)
{$.ajax({url:codeurl+'?ts'+$.now(),type:"post",dataType:"xml",timeout:6000,contentType:"application/x-www-form-urlencoded; charset=utf-8",async:true,error:function(xml,msg){},success:function(xml){$("#codeTab").find(".currenAward").empty();if($("#codeTab")||$("#botCodeTab"))
{var yyhit_hs;var yyhit_qi;var yyhit_code;var yyhit_qistrs;k=1;$(xml).find("c").each(function(i){yyhit_code=$(this).text();yyhit_hs=$(this).attr("z");yyhit_qistrs=$(this).attr("q")
yyhit_qi=yyhit_qistrs.split("-");if(k==1)
{hq=Number(yyhit_qi[1]);var lq=qiMax-hq;$("#sellq").html(hq);$("#leftq").html(lq);$("#qh").html(yyhit_qistrs);var ayyhit_code=yyhit_code.split(",");var strOpenCode='';for(j=0;j<ayyhit_code.length;j++)
{strOpenCode=strOpenCode+'<em class="dice dice_'+ayyhit_code[j]+'"></em>';}
$("#openq").html(strOpenCode+'<em class="diceadd">'+$(this).attr("z")+'</em>');strOpenCode=null;ayyhit_code=null;var qi_cmp=nowQi-yyhit_qistrs;if(qi_cmp==1&&intervalId>0)
{window.clearInterval(intervalId);intervalId=0;}else
{}}
if($("#codeTab").find(".currenAward").length>0){var renderAry_code=yyhit_code.split(",");var renderCode='';for(j=0;j<renderAry_code.length;j++)
{renderCode=renderCode+'<em class="dice dice_'+renderAry_code[j]+'"></em>';}
var render_x='<em class="awardpk10 awardpk10_'+$(this).attr("xc")+'" >'+$(this).attr("x")+'</em>';var render_y='<em class="awardpk10 awardpk10_'+$(this).attr("yc")+'" >'+$(this).attr("y")+'</em>';var render_z='<em class="awardpk10 awardpk10_08" >'+yyhit_hs+'</em>';var codehtml_tr='<span class="col-xs-12" style="font-size:11px;">第'+yyhit_qistrs+'期</span><span class="col-xs-6">'+renderCode+'</span><span class="col-xs-2" style="font-size:13px;">'+render_z+'</span><span class="col-xs-2" style="font-size:13px;">'+render_x+'</span><span class="col-xs-2" style="font-size:13px;">'+render_y+'</span>';$("#codeTab").find(".currenAward").append(codehtml_tr);renderAry_code=null;renderCode=null;codehtml_tr=null;}
k++;});yyhit_hs=null;yyhit_qi=null;yyhit_code=null;yyhit_qistrs=null;}}});}
function showPrize()
{try
{var r=$D("prizeTab").rows;r[1].cells[1].innerHTML=setArr[0][2];r[2].cells[1].innerHTML=setArr[0][3];r[3].cells[1].innerHTML=setArr[0][4];r[4].cells[1].innerHTML=setArr[0][5];r[5].cells[1].innerHTML=setArr[0][6];r[6].cells[1].innerHTML=setArr[0][7];r[7].cells[1].innerHTML=setArr[0][8];}
catch(e){}}
function setMyMark(o,id){setMark(o,"k3j",id);}