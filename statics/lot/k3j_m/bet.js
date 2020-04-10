function loadPanel()
{var s=$("#subPanel").children("dt");var d=$("#subPanel").children("dd");var inputs=s.eq(m).find(":input");n=arguments[0]?Number(Number(arguments[0])-1):n;var o=inputs.eq(n);var t=$(".helptip");var isDD;if($("#ms2").attr("checked"))
isDD=(m==1||m==3)&&true;else
isDD=(m==1||m==3)&&false;for(var i=0;i<s.length;i++)
{s.eq(i).removeClass("show");if(i==m&&isDD==false)
{s.eq(i).addClass("show");}}
o.prop("checked",true);nam=o.attr("title");t[0].dataset["content"]=getTipByName(nam);t.popover();clrSel();if($("#ms1").attr("checked"))showBallPanel(o.val().split(","));setCookie("typeMemoryM",m,10000);setCookie("typeMemoryN",n,10000);}
function selBall(e)
{e=e||window.event;var elem=(e.target)?e.target:e.srcElement;if(elem.tagName=="B")
{var isSel=elem.className!="sel";if(isSel&&$("ms3").checked)
{if(elem.parentNode.id=="dmDt"&&getDanMa()>=nDanMax){bootbox.alert("["+nam+"]最多只能选择"+nDanMax+"个胆码");return;}
clrSameNum(elem);}
if(isSel&&(elem.parentNode.id=="same"||elem.parentNode.id=="nosame"))
{clrSameNums(elem);}
elem.className=isSel?"sel":"";if($("#ms3").prop("checked"))collect_DtBall();else collectBall(true,",",false);}}
function getTipByName(gamename)
{getPrizeList();var nbettip='';if(typeof json_data_cprize!="undefined"){for(var i in json_data_cprize){if(json_data_cprize[i].lottypename==gamename){nPriM=json_data_cprize[i].win_money;nRe=json_data_cprize[i].nregx;nbettip=json_data_cprize[i].note+'，最高奖金：'+nPriM;}}}
return nbettip;}
function addNum()
{var z,opt,m;if($("#ms1").prop("checked"))
{var temp=tmp.join("|");if(temp==""){bootbox.alert("请至少选择1注号码");return;}
opt="["+nam+"] "+temp;z=getMoney(opt);if(z<=0){bootbox.alert("请至少选择1注号码");return;}
m=z*pm*rate;addLi(nam,temp,m,z);betPri.push(nPriM);}
else if($("#ms3").prop("checked"))
{var z=0;var ball=getDtBall(false);var dtName=nam+"胆拖"
if(ball[2]>0&&ball[3]>0)
{var t=nDanMax+1;if(ball[2]+ball[3]<t){bootbox.alert("请至少选择1注号码");return;}
opt=ball[0]+"|"+ball[1];z=getMoney("["+dtName+"] "+opt);if(z<=0){bootbox.alert("请至少选择1注号码");return;}
m=z*pm*rate;addLi(dtName,opt,m,z);betPri.push(nPriM);$("#ballD").html("0");$("#ballT").html("0");}
else{bootbox.alert("请至少选择1个胆码和1个拖码");return;}}
showBetBill(z);clrSel();}
function removeByVal(arrylist,val){for(var i=0;i<arrylist.length;i++){if(arrylist[i]==val){arrylist.splice(i,1);break;}}}
function rndNum(n)
{var c=[];var temp;var z=0;var tempZ,tempM;var rndName=nam;var n1,n2,n3;for(var i=1;i<=n;i++)
{switch(nam)
{case"三连号通选":temp='abc';break;case"三同号通选":temp='xxx';break;case"三不同号":n1=getRndNum(1,6);n2=getRndNum(1,6);n3=getRndNum(1,6);while(n2==n1)n2=getRndNum(1,6);temp=n1.toString()+","+n2.toString();while(temp.indexOf(n3)>=0)n3=getRndNum(1,6);temp+=","+n3.toString();break;case"二不同号":n1=getRndNum(1,6);n2=getRndNum(1,6);while(n2==n1)n2=getRndNum(1,6);temp=n1.toString()+","+n2.toString();break;case"三同号单选":n1=getRndNum(1,6)*111;temp=n1;break;case"二同号复选":n1=getRndNum(1,6)*11+'x';temp=n1;break;case"和值大小":var NumAry=['大','小'];temp=NumAry[Math.floor((Math.random()*NumAry.length))];break;case"和值单双":var NumAry=['单','双'];temp=NumAry[Math.floor((Math.random()*NumAry.length))];break;case"二同号单选":var NumAry=[1,2,3,4,5,6];n1=getRndNum(1,6);removeByVal(NumAry,n1);n2=NumAry[Math.floor((Math.random()*NumAry.length))];temp=(n1*11)+'|'+n2;break;case"和值":n1=getRndNum(3,18);temp=n1;break;}
var opt="["+rndName+"] "+temp;tempZ=getMoney(opt);tempM=tempZ*pm*rate;z+=tempZ;addLi(rndName,temp,tempM,tempZ);betPri.push(nPriM);}
showBetBill(z);}
function getMoney(temp)
{var reZ=1;var re=/(\[[^\]]*\])/;var xName=temp.match(re);re=/(\[[^\]]*\])| +/g;var xNum=temp.replace(re,"");switch(xName[0])
{case"[和值]":xNum=(xNum.indexOf('|')>-1)?xNum.replace(/[\|]+/g,','):xNum;xNum=xNum.replace(/(^,|,$)/g,"");var valueArray=new Array(0,0,0,1,2,4,7,11,15,18,20,20,18,15,11,7,4,2,1);reZ=0;var numArray=xNum.split(",");for(var i=0;i<numArray.length;i++)
{reZ+=(numArray[i]=="")?0:valueArray[numArray[i]];}
break;case"[和值大小]":case"[和值单双]":case"[三同号单选]":case"[二同号复选]":reZ=0;var xNumArray=xNum.split(",");reZ=xNumArray.length;break;case"[二同号单选]":reZ=0;var xNumArray=xNum.split("|");if(xNumArray.length>=2){var NumArray_a=xNumArray[0].split(",");var NumArray_b=xNumArray[1].split(",");reZ=NumArray_a.length*NumArray_b.length;}
break;case"[三同号通选]":case"[三连号通选]":reZ=1;break;case"[二不同号]":reZ=0;var xNumArray=xNum.split(",");if(xNumArray.length>=2){reZ=(xNumArray.length*(xNumArray.length-1))/2;}
break;case"[三不同号]":reZ=0;var xNumArray=xNum.split(",");if(xNumArray.length>=3){reZ=(xNumArray.length*(xNumArray.length-1)*(xNumArray.length-2))/6;}
break;case"[三不同号胆拖]":case"[二不同号胆拖]":reZ=0;var xNumArray=xNum.split("|");if(xNumArray.length>=2){var NumArray_a=xNumArray[0].split(",");var NumArray_b=xNumArray[1].split(",");var dLen=NumArray_a.length;var tLen=NumArray_b.length;if(dLen<1||dLen>nDanMax)return 0;reZ=combNum(tLen,nDanMax-dLen+1);}
break;default:bootbox.alert("错误的彩票标识名,请与管理员联系");reZ=0;}
return reZ;}
function createQiArr()
{var tmpDate=new Date(nowQi.substr(0,4),Number(nowQi.substr(4,2))-1,nowQi.substr(6,2));var tmpDateStr=date2Qi(tmpDate);var tmpQi=Number(nowQi.substr(9,3));if(stopQi!="0")keepMax=diffQi(nowQi,stopQi,qiMax);qiArr=[];for(var i=0;i<keepMax;i++)
{qiArr[i]=tmpDateStr+"-"+addZero(tmpQi);tmpQi++;if(tmpQi>qiMax)
{tmpQi=1;tmpDate.setDate(tmpDate.getDate()+1);tmpDateStr=date2Qi(tmpDate);}}
var keepQiList=$("#keepQiList");keepQiList.empty();var option=$("<option>").val(qiArr[0]).text(qiArr[0]+"(当前期)");keepQiList.append(option);for(i=1;i<qiArr.length;i++){option=$("<option>").val(qiArr[i]).text(qiArr[i]);keepQiList.append(option);}
chgKeepFirstQi(0);}
function getCt(s){return 0;}
String.prototype.myTrim=function()
{var lines=new Array();lines=this.split("\n");var out="";for(var i=0;i<lines.length;i++)
{out+=lines[i].replace(/\s*/g,"")+"\n";}
return out;}
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