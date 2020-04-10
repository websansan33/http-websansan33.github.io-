var timeInt=5000;var perQiSec=1200;function getTimeData(T)
{var Y=T.getFullYear();var M=T.getMonth();var D=T.getDate();var H=T.getHours();var N=T.getMinutes();var reQi=Y.toString()+addZero(M+1)+addZero(D)+"-";var Qi;var Kai;switch(true)
{case((H>=4&&H<7)||(H==3&&N>10)||(H==7&&N<30)):Qi=10;Kai=new Date(Y,M,D,7,30,0);break;case(H>=8||(H==7&&N>=30)):var firstDT=new Date(Y,M,D,7,30,0).getTime();Qi=10+Math.ceil((T-firstDT)/perQiSec/1000);Kai=new Date(Y,M,D,7,30+(Qi-10)*20,0);break;default:var firstDT=new Date(Y,M,D,0,10,0).getTime();Qi=Math.ceil((T-firstDT)/perQiSec/1000);Kai=new Date(Y,M,D,0,10+Qi*20,0);break;}
reQi+=addZeros(Number(Qi));var nStopQi=Number(stopQi.replace("-",""));if(nStopQi>0&&Number(reQi.replace("-",""))>=nStopQi)
{isStop=1;stopTip="今日休市";return[stopQi,stopTip,Kai];}
else
isStop=0;return[reQi,sec2TimerString(Kai-T),Kai];}
function showPrize()
{try
{var r=$D("prizeTab").rows;r[1].cells[1].innerHTML=setArr[0][0];r[2].cells[1].innerHTML=setArr[0][1];r[3].cells[1].innerHTML=setArr[0][2];r[4].cells[1].innerHTML=setArr[0][4];r[5].cells[1].innerHTML=setArr[0][9];r[6].cells[1].innerHTML=setArr[0][10];r[7].cells[1].innerHTML=setArr[0][3];r[8].cells[1].innerHTML=setArr[0][5];r[9].cells[1].innerHTML=setArr[0][6];r[10].cells[1].innerHTML=setArr[0][7];r[11].cells[1].innerHTML=setArr[0][8];}
catch(e){}}
function loadData(s,codeurl)
{$.ajax({url:codeurl+'?ts='+$.now(),type:"post",dataType:"xml",timeout:6000,contentType:"application/x-www-form-urlencoded; charset=utf-8",async:true,error:function(xml,msg)
{},success:function(xml)
{$("#codeTab").find(".currenAward").empty();if($("#currenAward")||$("#botCodeTab"))
{var yyhit_ti;var yyhit_hs;var yyhit_qi;var yyhit_code;var yyhit_qistrs;k=1;$(xml).find("c").each(function(i)
{yyhit_code=$(this).text();yyhit_ti=$(this).attr("t");yyhit_hs=$(this).attr("z");yyhit_qistrs=$(this).attr("q")
yyhit_qi=yyhit_qistrs.split("-");if(k==1)
{hq=Number(yyhit_qi[1]);var lq=qiMax-hq;$("#sellq").html(hq);$("#leftq").html(lq);$("#qh").html(yyhit_qistrs);var ayyhit_code=yyhit_code.split(",");var strOpenCode="";for(j=0;j<ayyhit_code.length;j++)
{strOpenCode=strOpenCode+"<em class=\"awardBall\">"+ayyhit_code[j]+"</em>";}
$("#openq").html(strOpenCode);strOpenCode=null;ayyhit_code=null;var nowQi_qi=nowQi.split("-");var qi_cmp=nowQi_qi[1]-yyhit_qi[1];if(qi_cmp==1&&intervalId>0)
{window.clearInterval(intervalId);intervalId=0;}else
{}}
if($("#codeTab").find(".currenAward").length>0){var renderAry_code=yyhit_code.split(",");var renderCode='';for(j=0;j<renderAry_code.length;j++)
{renderCode=renderCode+"<em class=\"awardBall\">"+renderAry_code[j]+"</em>";}
var codehtml_tr='<span class="col-xs-12" style="font-size:11px;">第'+yyhit_qistrs+'期</span><span class="col-xs-12">'+renderCode+'</span><span class="col-xs-12" style="font-size:13px;">'+yyhit_hs+'</span>';$("#codeTab").find(".currenAward").append(codehtml_tr);renderAry_code=null;renderCode=null;codehtml_tr=null;}
k++;});yyhit_hs=null;yyhit_qi=null;yyhit_code=null;yyhit_qistrs=null;}}});}
function selectBatch(line,t)
{var divs=$("#ballPanel").children("DT").eq(line-1).children("B");for(var i=0;i<divs.length;i++)divs.removeClass("sel");switch(t)
{case 1:for(i=0;i<divs.length;i++)divs.addClass("sel");break;case 2:try
{var spans=$("#ballPanel").children("DD").eq(line-1).children("SPAN");var yArr=new Array(10);for(i=0;i<spans.length;i++)yArr[i]=Number(getInnerText(spans.eq(i)));var yyArr=yArr.slice(0);yArr.sort(function(a,b){return a-b;});ii=0;for(var i=0;i<=9;i++)
{if(yyArr[i]>=yArr[5]&&ii<5)
{divs.eq(i).addClass("sel");ii++;}}}
catch(e){showData=true;loadData(showData,dataPath);}
break;case 3:for(i=5;i<divs.length;i++)divs.eq(i).addClass("sel");break;case 4:for(i=0;i<5;i++)divs.eq(i).addClass("sel");break;case 5:for(i=0;i<divs.length;i++)if(i%2==1)divs.eq(i).addClass("sel");break;case 6:for(i=0;i<divs.length;i++)if(i%2==0)divs.eq(i).addClass("sel");break;case 7:divs.eq(1).addClass("sel");divs.eq(2).addClass("sel");divs.eq(3).addClass("sel");divs.eq(5).addClass("sel");divs.eq(7).addClass("sel");break;case 8:divs.eq(0).addClass("sel");divs.eq(4).addClass("sel");divs.eq(6).addClass("sel");divs.eq(8).addClass("sel");divs.eq(9).addClass("sel");break;case 9:divs.eq(0).addClass("sel");divs.eq(3).addClass("sel");divs.eq(6).addClass("sel");divs.eq(9).addClass("sel");break;case 10:divs.eq(1).addClass("sel");divs.eq(4).addClass("sel");divs.eq(7).addClass("sel");break;case 11:divs.eq(2).addClass("sel");divs.eq(5).addClass("sel");divs.eq(8).addClass("sel");break;case 12:break;}
collectBall(true,",");}