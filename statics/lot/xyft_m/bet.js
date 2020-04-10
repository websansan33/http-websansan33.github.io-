function loadPanel()
{var s=$("#subPanel").children("dt");var d=$("#subPanel").children("dd");var inputs=s.eq(m).find(":input");n=arguments[0]?Number(Number(arguments[0])-1):n;var o=inputs.eq(n);var t=$(".helptip");var isDD;if($("#ms2").attr("checked"))
isDD=(m==11||m==31)&&true;else
isDD=(m==11||m==31)&&false;for(var i=0;i<s.length;i++)
{s.eq(i).removeClass("show");if(i==m&&isDD==false)
{s.eq(i).addClass("show");}}
o.prop("checked",true);nam=o.attr("title");t[0].dataset["content"]=getTipByName(nam);t.popover();clrSel();if($("#ms1").attr("checked"))showBallPanel(o.val().split(","));setCookie("typeMemoryM",m,10000);setCookie("typeMemoryN",n,10000);}
function selBall(e)
{var s=$("#subPanel").children("dt");var inputs=s.eq(m).find(":input");var subgameid=0;for(var i=0;i<inputs.length;i++)
{if(inputs.eq(i).attr("checked")=="checked")
{subgameid=i;}}
e=e||window.event;var elem=(e.target)?e.target:e.srcElement;if(elem.tagName=="B")
{var hascode=false;if(m==0&&subgameid>=4){var divobj=$(elem.parentNode);var div=divobj.children("b");for(var i=0;i<div.length;i++)
{div.eq(i).removeClass();}
var selectcode=$(elem).html().replace(/[ \t\r\n]+/g,"");var dt=$("#ballPanel").children("dt");var i,ii,divs
for(var i=0;i<dt.length;i++)
{if(dt.eq(i).hasClass("show"))
{divs=dt.eq(i).children("b");for(var ii=0;ii<divs.length;ii++)
{if(divs.eq(ii).hasClass("sel"))
{var onecode=divs.eq(ii).html();onecode=onecode.replace(/[ \t\r\n]+/g,"");if(selectcode==onecode){hascode=true;break;}}}}}}
if(hascode==false){var isSel=elem.className!="sel";elem.className=isSel?"sel":"";}
collectBall(true,",");}}
function formatUploadNum(n,s)
{switch(n)
{case"猜冠军":return s;default:return mySplit(s,"|");}}
function getTipByName(gamename)
{getPrizeList();var nbettip='';if(typeof json_data_cprize!="undefined"){for(var i in json_data_cprize){if(json_data_cprize[i].lottypename==gamename){nPriM=json_data_cprize[i].win_money;nRe=json_data_cprize[i].nregx;nbettip=json_data_cprize[i].note+'，最高奖金：'+nPriM;}}}
return nbettip;}
function addNum()
{var z,opt,m;if($("#ms1").prop("checked"))
{var temp=tmp.join("|");re=/(\[[^\]]*\])|[ \t\r\n]+/g;temp=temp.replace(re,"");var tempary=temp.split(",");if(temp=="")
{bootbox.alert("请至少选择1注号码:什么也没有选!");return;}
opt="["+nam+"] "+temp;z=getMoney(opt);if(z<=0)
{bootbox.alert("请至少选择1注号码:不符合要求!");return;}
switch(nam)
{case"2星复式组选":if(tempary.length<2||tempary.length>7)
{bootbox.alert("您选择的号码少于2个或多于7个，请重新选择");return;}
break;case"2星分位组选":if(z<2)
{bootbox.alert("十位或个位，至少要有一位要选择2个号码");return;}
break;case"3星和值":case"冠亚和值":temp=(temp.indexOf('|')>-1)?temp.replace(/[\|]+/g,','):temp;temp=temp.replace(/(^,|,$)/g,"");break;}
m=z*pm*rate;addLi(nam,temp,m,z);betPri.push(nPriM);}
else
{z=tmpArr==null?0:tmpArr.length;if(z==0)
{bootbox.alert("请输入正确格式的"+nam+"号码");return;}
for(var i=0;i<z;i++)
{opt=formatUploadNum(nam,tmpArr[i]);m=pm*rate;addLi(nam,opt,m,1);betPri.push(nPriM);}}
showBetBill(z);clrSel();}
function rndNum(n)
{var n1;var n2;var n3;var n4;var n5;var n6;var n7;var n8;var n9;var n10;var n11;var temp;var z=0;var tempZ,tempM;var rndName=nam;for(var i=1;i<=n;i++)
{n1=addZero(getRndNum(1,10));n2=addZero(getRndNum(1,10));n3=addZero(getRndNum(1,10));n4=addZero(getRndNum(1,10));n5=addZero(getRndNum(1,10));n6=addZero(getRndNum(1,10));n7=addZero(getRndNum(1,10));n8=addZero(getRndNum(1,10));n9=addZero(getRndNum(1,10));n10=addZero(getRndNum(1,10));switch(nam)
{case"十星定位胆":temp=n1+"|"+n2+"|"+n3+"|"+n4+"|"+n5+"|"+n6+"|"+n7+"|"+n8+"|"+n9+"|"+n10;break;case"冠亚和值":n1=getRndNum(3,17);temp=n1;break;case"龙虎冠军":n1=getRndNum(0,1);var mapName=["龙","虎"];temp=mapName[n1];break;case"孤番":temp=getRndNum(1,4);break;case"串角":n1=getRndNum(0,1);var mapName=["1串2","1串3","1串4","2串3","2串4","3串4"];temp=mapName[n1];break;case"年念":n1=getRndNum(0,1);var mapName=["1念2","1念3","1念4","2念1","2念3","2念4","3念1","3念2","3念4","4念1","4念2","4念3"];temp=mapName[n1];break;}
var opt="["+rndName+"] "+temp;tempZ=getMoney(opt);tempM=tempZ*pm*rate;z+=tempZ;addLi(rndName,temp,tempM,tempZ);betPri.push(nPriM);}
showBetBill(z);}
function selpk10(s,limitlinenum)
{re=/[ \t\r\n]+/g;var temp=s.replace(re,"");var cArr=temp.split("|");if(cArr.length!=limitlinenum)return 0;var totalznum=1;if(limitlinenum==1)
{for(var i=0;i<cArr.length;i++)
{if(cArr[i].length==0)return 0;var bArr=cArr[i].split(",");totalznum*=bArr.length;}}else
{if(limitlinenum<5)
{var lineary=new Array();var selectline=0;for(var i=0;i<cArr.length;i++)
{lineary[i]=cArr[i].split(",");if(lineary[i][0].length>0){selectline+=1;}}
totalznum=0;if(selectline==limitlinenum)
{var combin=doExchange(lineary);for(var j=0;j<combin.length;j++)
{var dArr=combin[j].split(",").sort();var result=$.unique(dArr);if(result.length==limitlinenum)
{totalznum+=1;}}}}else
{var lineary=new Array();var selectline=0;for(var i=0;i<cArr.length;i++)
{lineary[i]=cArr[i].split(",");if(lineary[i][0].length>0){selectline+=1;}}
totalznum=0;if(selectline==limitlinenum)
{totalznum=1;}}}
return totalznum;}
function doExchange(doubleArrays)
{var len=doubleArrays.length;if(len>=2)
{var len1=doubleArrays[0].length;var len2=doubleArrays[1].length;var newlen=len1*len2;var temp=new Array(newlen);var index=0;for(var i=0;i<len1;i++)
{for(var j=0;j<len2;j++)
{temp[index]=doubleArrays[0][i]+","+doubleArrays[1][j];index++;}}
var newArray=new Array(len-1);for(var i=2;i<len;i++)
{newArray[i-1]=doubleArrays[i];}
newArray[0]=temp;return doExchange(newArray);}
else
{return doubleArrays[0];}}
function getMoney(temp)
{var reZ=1;var re=/(\[[^\]]*\])/;var xName=temp.match(re);re=/(\[[^\]]*\])|[ \t\r\n]+/g;var xNum=temp.replace(re,"");switch(xName[0])
{case"[十星定位胆]":var numArray=xNum.split("|");reZ=0;for(var i=0;i<numArray.length;i++)
{reZ+=(numArray[i]=="")?0:numArray[i].split(",").length;}
break;case"[冠亚和值]":xNum=(xNum.indexOf('|')>-1)?xNum.replace(/[\|]+/g,','):xNum;xNum=xNum.replace(/(^,|,$)/g,"");var valueArray=new Array(0,0,0,1,1,2,2,3,3,4,4,5,4,4,3,3,2,2,1,1);reZ=0;var numArray=xNum.split(",");for(var i=0;i<numArray.length;i++)
{reZ+=(numArray[i]=="")?0:valueArray[numArray[i]];}
break;case"[孤番]":case"[串角]":case"[年念]":reZ=selpk10(xNum,1);break;case"[龙虎冠军]":reZ=selpk10(xNum,1);break;default:bootbox.alert(xName[0]+"错误的彩票标识名,请与管理员联系");reZ=0;}
return reZ;}
function createQiArr()
{var tmpDate=new Date(nowQi.substr(0,4),Number(nowQi.substr(4,2))-1,nowQi.substr(6,2));var tmpDateStr=date2Qi(tmpDate);var tmpQi=Number(nowQi.substr(9,3));if(stopQi!="0")keepMax=diffQi(nowQi,stopQi,qiMax);qiArr=[];for(var i=0;i<keepMax;i++)
{qiArr[i]=tmpDateStr+"-"+addZeros(tmpQi);tmpQi++;if(tmpQi>qiMax)
{tmpQi=1;tmpDate.setDate(tmpDate.getDate()+1);tmpDateStr=date2Qi(tmpDate);}}
var keepQiList=$D("keepQiList");keepQiList.options.length=0;keepQiList.options.add(new Option(qiArr[0]+"(当前期)",qiArr[0]));for(i=1;i<qiArr.length;i++)keepQiList.options.add(new Option(qiArr[i]+"期",qiArr[i]));chgKeepFirstQi(0);}
function getCt(s)
{switch(s)
{case"[后3单式组选]":case"[后3复式组6]":case"[后3复式组3]":return 1;case"[后3直选]":return 2;case"[5星直选]":return 3;default:return 0;}}
function bet()
{var msg;if(showLoginPanle())return;if(isStop)
{bootbox.alert(stopTip);return;}
if($("#ms1").prop("checked"))
{selectid='复式'}else
{selectid='单式'};var i;var selectList=$D("selectList");var tab=$D("keepTab");var isHemai=$D("isHemai");var isKeep=$D("isKeep");var tempLi=[];var tempQi=[];var tempBs=[];var stopKeep;var lis=document.getElementsByName("selLiValue");var lotteryid=Number($("#lotteryid").val());if(lis.length>maxLength)
{bootbox.alert("单次投注,号码不能超过"+maxLength+"行");return;}
if(lis.length<=0)
{bootbox.alert("请至少选择1注号码");return;}
if(nAllQ<=0)
{bootbox.alert("请至少选择1期");return;}
for(i=0;i<lis.length;i++)tempLi[i]=lis[i].value+" ("+selectid+")";if(isKeep.checked)
{for(i=1;i<tab.rows.length;i++)
{if(tab.rows[i].cells[0].childNodes[0].checked)
{tempQi.push(tab.rows[i].cells[1].innerHTML);tempBs.push(tab.rows[i].cells[2].childNodes[0].childNodes[0].value);}}
stopKeep=$D("stopKeep").checked?0:1;}
else
{tempQi[0]=nowQi;tempBs[0]=$("#noKeepBeishu").val();stopKeep=0;nEstPri=sumBetPrize();}
var sLi=tempLi.join(";");var sQi=tempQi.join(",");var sBs=tempBs.join(",");var xName=getBetName(sLi);var iCt=getCt(xName);var sData;if(isHemai.checked)
{if(adviseNum($D("hm_feng"),nBetM)==false)return;var title=replaceWord($("#hm_title").val());var content=replaceWord($("#hm_content").val());var hm_ticheng=$("#ticheng").children('option:selected').val();var hm_pass=($D("hm_buyer2").checked&&hm_pass!="")?$("#hm_pass").val():"";var isShow=$('input[name="hm_pub"]:checked').val();var isCancel=($D("isCancel").checked)?"1":"0";var feng=Number($("#hm_feng").val());var ifeng=Number($("#hm_ifeng").val());var baodi=Number($("#hm_baodi").val());var imoney=$("#hm_imoney").html();var fMinNum=feng*fMin/100;var bMinNum=feng*bMin/100;var sfeng=feng-ifeng;if((Number(ifeng)/Number($("#keepQi").val()))!=Math.ceil(Number(ifeng)/Number($("#keepQi").val())))
{bootbox.alert("认购份数必须是追号的整数倍！");return;}
if(sfeng<0)
{bootbox.alert("发起人认购份数不能大于总份数！");$D("hm_ifeng").focus();return;}
if(ifeng==""||ifeng==0)
{bootbox.alert("发起人认购份数不能为空或0！");$D("hm_ifeng").focus();return;}
if(ifeng<fMinNum)
{bootbox.alert("发起人认购份数不能小于总份数的 "+fMin+"%，最少要认购 "+Math.ceil(fMinNum)+" 份！");$D("hm_ifeng").focus();return;}
if($D("isBaodi").checked)
{if((Number(baodi)/Number($("#keepQi").val()))!=Math.ceil(Number(baodi)/Number($("#keepQi").val())))
{bootbox.alert("保底份数必须是追号的整数倍！");return;}
if(baodi>sfeng)
{bootbox.alert("保底份数不能大于剩余份数！");$D("hm_baodi").focus();return;}
if(baodi<bMinNum&&baodi<sfeng)
{bootbox.alert("保底份数不能小于总份数的"+bMin+"%，最少要保底 "+(Math.ceil(bMinNum)>sfeng?sfeng:Math.ceil(bMinNum))+" 份！");$D("hm_baodi").focus();return;}}
msg="请确认您的合买方案：<br/>单倍金额：<b>"+nAllM+"</b>元<br/>共计追号："+nAllQ+"期<br/>方案总额："+nBetM+"元<br/>方案分为："+feng+"份<br/>自己认购："+ifeng+"份<br/>认购金额："+imoney+"元<br/>保底设置："+((Number(baodi)>0)?"保底"+baodi+"份":"不保底");sData="ctype="+escape(xName)+"&ct="+iCt+"&cpcontent="+escape(sLi)+"&qi="+sQi+"&bei="+sBs+"&s="+stopKeep+"&h=1&title="+escape(title)+"&content="+escape(content)+"&hm_pass="+escape(hm_pass)+"&hm_ticheng="+escape(hm_ticheng)+"&cprize="+nEstPri+"&isshow="+isShow+"&iscancel="+isCancel+"&feng="+feng+"&ifeng="+ifeng+"&baodi="+baodi;sData+="&r="+rate+"&lotteryid="+lotteryid;bootbox.confirm(msg,function(btn){if(btn==true){post(sData,"/app/buy.php");}else{return;}});}
else
{msg="请确认您的投注：<br/>单倍金额："+nAllM+"元<br/>追号期数："+nAllQ+"期<br/>共计投注："+nBetM+"元";sData="ctype="+escape(xName)+"&ct="+iCt+"&cpcontent="+escape(sLi)+"&qi="+sQi+"&bei="+sBs+"&s="+stopKeep+"&h=0&cprize="+nEstPri;sData+="&r="+rate+"&lotteryid="+lotteryid;bootbox.confirm(msg,function(btn){if(btn==true){post(sData,"/app/buy.php");}else{return;}});}}