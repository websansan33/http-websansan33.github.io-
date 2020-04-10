var timeInt=4000;var perQiSec=300;function getTimeData(T)
{var setArray=firstTime.split(":");var TT=new Date(T.toString());var Y=T.getFullYear();var M=T.getMonth();var D=T.getDate();var endTime=new Date(Y,M,D,Number(setArray[0]),setArray[1],Number(setArray[2])+(perQiSec*qiMax));if(T-endTime>0)TT.setDate(TT.getDate()+1);var YY=TT.getFullYear();var MM=TT.getMonth();var DD=TT.getDate();var lineTime=new Date(YY,MM,DD,setArray[0],setArray[1],setArray[2]);var reQi=parseInt(baseQi);var diValue=Math.ceil((T-lineTime)/(perQiSec*1000));var fitValue=diValue<=1?1:diValue;var difday=parseInt(daysElapsed(TT,baseDate)*qiMax);reQi+=difday+parseInt(addZero(fitValue));lineTime.setSeconds(lineTime.getSeconds()+(fitValue*perQiSec));return[reQi,sec2TimerString(lineTime-T),lineTime];}
function showPrize()
{try
{var r=$D("prizeTab").rows;r[1].cells[1].innerHTML=setArr[0][0];r[2].cells[1].innerHTML=setArr[0][1];r[3].cells[1].innerHTML=setArr[0][2];r[4].cells[1].innerHTML=setArr[0][3];}
catch(e)
{}}
function loadData(s,codeurl)
{$.ajax({url:codeurl+'?ts='+$.now(),type:"post",dataType:"xml",timeout:6000,contentType:"application/x-www-form-urlencoded; charset=utf-8",async:true,error:function(xml,msg)
{},success:function(xml)
{$("#codeTab").find(".currenAward").empty();if($("#currenAward")||$("#botCodeTab"))
{var yyhit_ti;var data_ci;var yyhit_hs;var yyhit_qi;var yyhit_code;var yyhit_qistrs;k=1;$(xml).find("c").each(function(i)
{yyhit_code=$(this).text();data_ci=$(this).attr("n");yyhit_ti=$(this).attr("t");yyhit_hs=$(this).attr("z");yyhit_qistrs=$(this).attr("q")
yyhit_qi=yyhit_qistrs;if(k==1)
{hq=Number($(this).attr("i"));var lq=qiMax-hq;$("#sellq").html(hq);$("#leftq").html(lq);$("#qh").html(yyhit_qistrs);var ayyhit_code=yyhit_code.split(",");var strOpenCode="";for(j=0;j<ayyhit_code.length;j++)
{strOpenCode=strOpenCode+"<em class=\"awardBall\">"+ayyhit_code[j]+"</em>";}
$("#openq").html(strOpenCode);strOpenCode=null;ayyhit_code=null;var nowQi_qi=nowQi;var qi_cmp=nowQi_qi-yyhit_qi;if(qi_cmp==1&&intervalId>0)
{window.clearInterval(intervalId);intervalId=0;}else
{}}
if($("#codeTab").find(".currenAward").length>0){var renderAry_code=yyhit_code.split(",");var renderCode='';for(j=0;j<renderAry_code.length;j++)
{renderCode=renderCode+"<em class=\"awardBall\">"+renderAry_code[j]+"</em>";}
var codehtml_tr='<span class="col-xs-12" style="font-size:11px;">第'+yyhit_qistrs+'期</span><span class="col-xs-12">'+renderCode+'</span><span class="col-xs-12" style="font-size:13px;">'+yyhit_hs+'</span>';$("#codeTab").find(".currenAward").append(codehtml_tr);renderAry_code=null;renderCode=null;codehtml_tr=null;}
k++;k++;});yyhit_hs=null;yyhit_qi=null;yyhit_code=null;yyhit_qistrs=null;}}});}
function loadhistorypanel()
{var htmlcode='<table id="botCodeTab" cellpadding="0" cellspacing="0"><tr>'
+'<th width="6%" class="qiTd">期号</th>'
+'<th width="10%">号码</th>'
+'<th width="6%" class="qiTd">期号</th>'
+'<th width="10%">号码</th>'
+'<th width="6%" class="qiTd">期号</th>'
+'<th width="10%">号码</th>'
+'<th width="6%" class="qiTd">期号</th>'
+'<th width="10%">号码</th>'
+'<th width="6%" class="qiTd">期号</th>'
+'<th width="10%">号码</th>'
+'<th width="6%" class="qiTd">期号</th>'
+'<th width="10%">号码</th>'
+'</tr>';for(var x=1;x<=30;x++)
{var num1=x;var num2=x+30;var num3=x+30*2;var num4=x+30*3;var num5=x+30*4;var num6=x+30*5;htmlcode+='<tr>'
+'<td id="q'+num1+'">'+num1+'</td>'
+'<td id="h'+num1+'">-</td>'
+'<td id="q'+num2+'">'+num2+'</td>'
+'<td id="h'+num2+'">-</td>'
+'<td id="q'+num3+'">'+num3+'</td>'
+'<td id="h'+num3+'">-</td>'
+'<td id="q'+num4+'">'+num4+'</td>'
+'<td id="h'+num4+'">-</td>'
+'<td id="q'+num5+'">'+num5+'</td>'
+'<td id="h'+num5+'">-</td>'
+'<td id="q'+num6+'">'+num6+'</td>'
+'<td id="h'+num6+'">-</td>'
+'</tr>';}
htmlcode+='</table>';if($("#tblbody"))
{$("#tblbody").html(htmlcode);}}
function selectBatch(line,t)
{var divs=$("#ballPanel").children("DT").eq(line-1).children("B");for(var i=0;i<divs.length;i++)divs.removeClass("sel");switch(t)
{case 1:for(i=0;i<divs.length;i++)divs.addClass("sel");break;case 2:try
{var spans=$("#ballPanel").children("DD").eq(line-1).children("SPAN");var yArr=new Array(10);for(i=0;i<spans.length;i++)yArr[i]=Number(getInnerText(spans.eq(i)));var yyArr=yArr.slice(0);yArr.sort(function(a,b){return a-b;});ii=0;for(var i=0;i<=9;i++)
{if(yyArr[i]>=yArr[5]&&ii<5)
{divs.eq(i).addClass("sel");ii++;}}}
catch(e)
{showData=true;loadData(showData,dataPath);}
break;case 3:for(i=5;i<divs.length;i++)divs.eq(i).addClass("sel");break;case 4:for(i=0;i<5;i++)divs.eq(i).addClass("sel");break;case 5:for(i=0;i<divs.length;i++)if(i%2==1)divs.eq(i).addClass("sel");break;case 6:for(i=0;i<divs.length;i++)if(i%2==0)divs.eq(i).addClass("sel");break;case 7:divs.eq(1).addClass("sel");divs.eq(2).addClass("sel");divs.eq(3).addClass("sel");divs.eq(5).addClass("sel");divs.eq(7).addClass("sel");break;case 8:divs.eq(0).addClass("sel");divs.eq(4).addClass("sel");divs.eq(6).addClass("sel");divs.eq(8).addClass("sel");divs.eq(9).addClass("sel");break;case 9:divs.eq(0).addClass("sel");divs.eq(3).addClass("sel");divs.eq(6).addClass("sel");divs.eq(9).addClass("sel");break;case 10:divs.eq(1).addClass("sel");divs.eq(4).addClass("sel");divs.eq(7).addClass("sel");break;case 11:divs.eq(2).addClass("sel");divs.eq(5).addClass("sel");divs.eq(8).addClass("sel");break;case 12:break;}
collectBall(true,",");}