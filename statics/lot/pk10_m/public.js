var timeInt=5000;var perQiSec=1200;function getTimeData(T)
{var setArray=firstTime.split(":");var TT=new Date(T.toString());var Y=T.getFullYear();var M=T.getMonth();var D=T.getDate();var endTime=new Date(Y,M,D,Number(setArray[0]),setArray[1],Number(setArray[2])+(perQiSec*44));if(T-endTime>0)TT.setDate(TT.getDate()+1);var YY=TT.getFullYear();var MM=TT.getMonth();var DD=TT.getDate();var lineTime=new Date(YY,MM,DD,setArray[0],setArray[1],setArray[2]);var reQi=parseInt(baseQi);var diValue=Math.ceil((T-lineTime)/(perQiSec*1000));var fitValue=diValue<=1?1:diValue;var difday=parseInt(daysElapsed(TT,baseDate)*44);reQi+=difday+parseInt(addZero(fitValue));lineTime.setSeconds(lineTime.getSeconds()+(fitValue*perQiSec));return[reQi,sec2TimerString(lineTime-T),lineTime];}
function showPrize()
{try
{var r=$D("prizeTab").rows;r[1].cells[1].innerHTML=setArr[0][0];r[2].cells[1].innerHTML=setArr[0][1];r[3].cells[1].innerHTML=setArr[0][2];r[4].cells[1].innerHTML=setArr[0][3];}
catch(e){}}
function loadData(s,codeurl)
{$.ajax({url:codeurl+'?ts'+$.now(),type:"post",dataType:"xml",timeout:6000,contentType:"application/x-www-form-urlencoded; charset=utf-8",async:true,error:function(xml,msg){},success:function(xml){$("#codeTab").find(".currenAward").empty();if($("#currenAward")||$("#botCodeTab"))
{var yyhit_hs;var yyhit_qi;var yyhit_code;var yyhit_qistrs;k=1;$(xml).find("c").each(function(i){yyhit_code=$(this).text();yyhit_hs=$(this).attr("z");yyhit_qistrs=$(this).attr("q")
if(k==1)
{hq=Number($(this).attr("t"));var lq=qiMax-hq;$("#sellq").html(hq);$("#leftq").html(lq);$("#qh").html(yyhit_qistrs);var ayyhit_code=yyhit_code.split(",");var strOpenCode='';for(j=0;j<ayyhit_code.length;j++)
{strOpenCode=strOpenCode+'<em class="awardpk10 awardpk10_'+ayyhit_code[j]+'">'+ayyhit_code[j]+'</em>';}
$("#openq").html(strOpenCode);strOpenCode=null;ayyhit_code=null;var qi_cmp=nowQi-yyhit_qistrs;if(qi_cmp==1&&intervalId>0)
{window.clearInterval(intervalId);intervalId=0;}else
{}}
if($("#codeTab").find(".currenAward").length>0){var renderAry_code=yyhit_code.split(",");var renderCode='';for(j=0;j<renderAry_code.length;j++)
{renderCode=renderCode+'<em class="awardpk10 awardpk10_'+renderAry_code[j]+'">'+renderAry_code[j]+'</em>';}
var codehtml_tr='<span class="col-xs-12" style="font-size:11px;">第'+yyhit_qistrs+'期</span><span class="col-xs-12">'+renderCode+'</span><span class="col-xs-12" style="font-size:13px;">'+yyhit_hs+'</span>';$("#codeTab").find(".currenAward").append(codehtml_tr);renderAry_code=null;renderCode=null;codehtml_tr=null;}
k++;});yyhit_hs=null;yyhit_qi=null;yyhit_code=null;yyhit_qistrs=null;}}});}
function selectBatch(line,t)
{switch(nam){case"猜前五名":return false;break;case"猜前六名":return false;break;case"猜前七名":return false;break;case"猜前八名":return false;break;case"猜前九名":return false;break;case"猜前十名":return false;break;default:break;}
var divs=$("#ballPanel").children("DT").eq(line-1).children("B");for(var i=0;i<divs.length;i++)divs.removeClass("sel");switch(t)
{case 1:for(i=0;i<divs.length;i++)divs.addClass("sel");break;case 2:try
{var spans=$("#ballPanel").children("DD").eq(line-1).children("SPAN");var yArr=new Array(10);for(i=0;i<spans.length;i++)yArr[i]=Number(getInnerText(spans.eq(i)));var yyArr=yArr.slice(0);yArr.sort(function(a,b){return a-b;});ii=0;for(var i=0;i<=9;i++)
{if(yyArr[i]>=yArr[5]&&ii<5)
{divs.eq(i).addClass("sel");ii++;}}}
catch(e){showData=true;loadData(showData,dataPath);}
break;case 3:for(i=5;i<divs.length;i++)divs.eq(i).addClass("sel");break;case 4:for(i=0;i<5;i++)divs.eq(i).addClass("sel");break;case 5:for(i=0;i<divs.length;i++)if(i%2==0)divs.eq(i).addClass("sel");break;case 6:for(i=0;i<divs.length;i++)if(i%2==1)divs.eq(i).addClass("sel");break;}
collectBall(true,",");}
function setMyMark(o,id){setMark(o,"pk10",id);}