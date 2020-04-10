function loadPanel()
{var s=$("#subPanel").children("dt");var d=$("#subPanel").children("dd");var inputs=s.eq(m).find(":input");n=arguments[0]?Number(Number(arguments[0])-1):n;var o=inputs.eq(n);var t=$(".helptip");var isDD;if($("#ms2").attr("checked"))
isDD=(m==10||m==8)&&true;else
isDD=(m==10||m==8)&&false;for(var i=0;i<s.length;i++)
{s.eq(i).removeClass("show");if(i==m&&isDD==false)
{s.eq(i).addClass("show");}}
o.prop("checked",true);nam=o.attr("title");t[0].dataset["content"]=getTipByName(nam);t.popover();clrSel();if($("#ms1").attr("checked"))showBallPanel(o.val().split(","));setCookie("typeMemoryM",m,10000);setCookie("typeMemoryN",n,10000);}
function selBall(e)
{e=e||window.event;var elem=(e.target)?e.target:e.srcElement;if(elem.tagName=="B")
{var isSel=elem.className!="sel";if(isSel)
{var temp=tmp.join("|");var tempary=temp.split(",");switch(nam)
{case"2星复式组选":if(tempary.length==7)
{bootbox.alert("最多只能选择7个号码");return false;}
break;}}
elem.className=isSel?"sel":"";collectBall(true,",");}}
function getTipByName(gamename)
{getPrizeList();var nbettip='';if(typeof(json_data_cprize)!="undefined"){for(var i in json_data_cprize){if(json_data_cprize[i].lottypename==gamename){nPriM=json_data_cprize[i].win_money;nRe=json_data_cprize[i].nregx;nbettip=json_data_cprize[i].note+'，最高奖金：'+nPriM;}}}
return nbettip;}
function addNum()
{var zhu,opt,totalmoney;var o=$("#selectList");if($("#ms1").attr("checked"))
{var temp=tmp.join("|");re=/(\[[^\]]*\])|[ \t\r\n]+/g;temp=temp.replace(re,"");var tempary=temp.split(",");if(temp=="")
{bootbox.alert("请至少选择1注号码:什么也没有选!");return;}
opt="["+nam+"] "+temp;zhu=getMoney(opt);if(zhu<=0)
{bootbox.alert("请至少选择1注号码:不符合要求!");return;}
switch(nam)
{case"2星复式组选":if(tempary.length<2||tempary.length>7)
{bootbox.alert("您选择的号码少于2个或多于7个，请重新选择");return;}
break;case"2星分位组选":if(zhu<2)
{bootbox.alert("十位或个位，至少要有一位要选择2个号码");return;}
break;case"3星和值":case"2星和值":temp=(temp.indexOf('|')>-1)?temp.replace(/[\|]+/g,','):temp;temp=temp.replace(/(^,|,$)/g,"");break;}
totalmoney=zhu*pm*rate;addLi(nam,temp,totalmoney,zhu);betPri.push(nPriM);showBetBill(zhu);}
else
{var linenum=tmpArr==null?0:tmpArr.length;if(linenum==0)
{bootbox.alert("请输入正确格式的"+nam+"号码");return;}
for(var i=0;i<linenum;i++)
{var tmpcode=tmpArr[i]
tmpcode=tmpcode.split('').join(',');tmpcode=tmpcode.replace(/[ ]/g,';');var opt="["+nam+"] "+tmpcode;var curz=getMoney(opt);totalmoney=curz*pm*rate;addLi(nam,tmpcode,totalmoney,curz);betPri.push(nPriM);showBetBill(curz);}}
clrSel();}
function formatUploadNum(n,s)
{switch(n)
{case"2星单式组选":case"3星单式组选":return s;break;case"五星定位胆":return s;break;default:return mySplit(s,"|");break;}}
function collectUpload()
{var uploadTmp=$("#uploadTmp");var tmpVal=uploadTmp.val();var pz=lineZ(nam);tmpArr=tmpVal.match(nRe);var z=0;if(tmpArr==null)
{z=0;}else
{var linenum=tmpArr==null?0:tmpArr.length;for(var i=0;i<linenum;i++)
{var tmpcode=tmpArr[i];tmpcode=tmpcode.split('').join(',');tmpcode=tmpcode.replace(/[ ]/g,';');var onebet="["+nam+"] "+tmpcode;$('#lineMax').html(onebet);var curz=getMoney(onebet);m=curz*pm*rate;z+=curz;}}
$("#selZ").html(z);$("#selM").html(formatCurrency(z*pm*rate));}
function lineZ(n)
{switch(n)
{case"5星组合":return 4;case"3星组合":return 3;case"2星组合":return 2;default:return 1;}}
function rndNum(n)
{var n1;var n2;var n3;var n4;var n5;var temp;var z=0;var tempZ,tempM;var rndName=nam;for(var i=1;i<=n;i++)
{switch(nam)
{case"5星直选":n1=getRndNum(0,9);n2=getRndNum(0,9);n3=getRndNum(0,9);n4=getRndNum(0,9);n5=getRndNum(0,9);temp=n1+"|"+n2+"|"+n3+"|"+n4+"|"+n5;break;case"5星通选":n1=getRndNum(0,9);n2=getRndNum(0,9);n3=getRndNum(0,9);n4=getRndNum(0,9);n5=getRndNum(0,9);temp=n1+"|"+n2+"|"+n3+"|"+n4+"|"+n5;break;case"3星直选":n1=getRndNum(0,9);n2=getRndNum(0,9);n3=getRndNum(0,9);temp=n1+"|"+n2+"|"+n3;break;case"3星和值":n1=getRndNum(0,27);temp=n1;break;case"2星直选":n1=getRndNum(0,9);n2=getRndNum(0,9);temp=n1+"|"+n2;break;case"2星和值":n1=getRndNum(0,18);temp=n1;break;case"1星直选":n1=getRndNum(0,9);temp=n1;break;case"3星单式组选":n1=getRndNum(0,9);n2=getRndNum(0,9);n3=getRndNum(0,9);n4=getRndNum(0,9);while(n2==n1)n2=getRndNum(0,9);temp=n1.toString()+","+n2.toString();while(temp.indexOf(n3)>=0)n3=getRndNum(0,9);temp+=","+n4;break;case"3星复式组6":n1=getRndNum(0,9);n2=getRndNum(0,9);n3=getRndNum(0,9);n4=getRndNum(0,9);while(n2==n1)n2=getRndNum(0,9);temp=n1.toString()+","+n2.toString();while(temp.indexOf(n3)>=0)n3=getRndNum(0,9);temp+=","+n3;break;case"3星复式组3":n1=getRndNum(0,9);n2=getRndNum(0,9);n3=getRndNum(0,9);n4=getRndNum(0,9);while(n2==n1)n2=getRndNum(0,9);temp=n1.toString()+","+n2.toString();break;case"2星单式组选":n1=getRndNum(0,9);n2=getRndNum(0,9);while(n2==n1)n2=getRndNum(0,9);temp=n1.toString()+","+n2.toString();break;case"2星复式组选":n1=getRndNum(0,9);n2=getRndNum(0,9);while(n2==n1)n2=getRndNum(0,9);temp=n1.toString()+","+n2.toString();break;case"大小单双":n1=getRndNum(0,3);n2=getRndNum(0,3);var mapName=["大","小","单","双"];temp=mapName[n1]+"|"+mapName[n2];break;case"五星定位胆":n1=getRndNum(0,9);n2=getRndNum(0,9);n3=getRndNum(0,9);n4=getRndNum(0,9);n5=getRndNum(0,9);temp=n1+"|"+n2+"|"+n3+"|"+n4+"|"+n5;break;}
var o=$("selectList");var opt="["+rndName+"] "+temp;tempZ=getMoney(opt);tempM=tempZ*pm*rate;z+=tempZ;addLi(rndName,temp,tempM,tempZ);betPri.push(nPriM);}
showBetBill(z);}
function getLenforssc(xNum,r)
{var reLen=1;var re="|";var numArray=xNum.split(re);if(numArray.length!=r){return 0}
if(!xNum.match(re))
{if(xNum.match(","))
{var xNumary=xNum.split(",");reLen=xNumary.length;}}else{for(var i=0;i<numArray.length;i++)
{if(numArray[i].match(","))
{var bArr=numArray[i].split(",");if(i>(numArray.length-(r+1)))reLen*=bArr.length;}else
{if(numArray[i].length>0){reLen*=1;}else{reLen=0;}}}}
return reLen;}
function getMoney(temp)
{var reZ=1;var re=/(\[[^\]]*\])/;var xName=temp.match(re);re=/(\[[^\]]*\])|[ \t\r\n]+/g;var xNum=temp.replace(re,"");var xNumary=xNum.split(",");switch(xName[0])
{case"[5星直选]":reZ=getLenforssc(xNum,5);break;case"[5星组合]":reZ=4*getLenforssc(xNum,5);break;case"[3星直选]":reZ=getLenforssc(xNum,3);break;case"[3星组合]":reZ=3*getLenforssc(xNum,3);break;case"[2星直选]":reZ=getLenforssc(xNum,2);break;case"[2星组合]":reZ=2*getLenforssc(xNum,2);break;case"[1星直选]":reZ=getLenforssc(xNum,1);break;case"[2星单式组选]":reZ=(xNumary.length*(xNumary.length-1))/2;break;case"[2星复式组选]":reZ=(xNumary.length*(xNumary.length-1))/2;break;case"[2星分位组选]":var xNumArray=xNum.split("|");reZ=(xNumArray[0].length>=1&&xNumArray[1].length>=1)?getLen(xNum,2):0;break;case"[2星和值组选]":var valueArray=new Array(1,1,2,2,3,3,4,4,5,5,5,4,4,3,3,2,2,1,1);var numArray=xNum.split("|");reZ=0;for(var i=0;i<numArray.length;i++)
{reZ+=(numArray[i]=="")?0:valueArray[numArray[i]];}
break;case"[2星包胆组选]":reZ=10*xNum.length;break;case"[3星和值]":xNum=(xNum.indexOf('|')>-1)?xNum.replace(/[\|]+/g,','):xNum;xNum=xNum.replace(/(^,|,$)/g,"");var valueArray=new Array(1,3,6,10,15,21,28,36,45,55,63,69,73,75,75,73,69,63,55,45,36,28,21,15,10,6,3,1);reZ=0;var numArray=xNum.split(",");for(var i=0;i<numArray.length;i++)
{reZ+=(numArray[i]=="")?0:valueArray[numArray[i]];}
break;case"[2星和值]":xNum=(xNum.indexOf('|')>-1)?xNum.replace(/[\|]+/g,','):xNum;xNum=xNum.replace(/(^,|,$)/g,"");var valueArray=new Array(1,2,3,4,5,6,7,8,9,10,9,8,7,6,5,4,3,2,1);reZ=0;var numArray=xNum.split(",");for(var i=0;i<numArray.length;i++)
{reZ+=(numArray[i]=="")?0:valueArray[numArray[i]];}
break;case"[大小单双]":reZ=getLenforssc(xNum,2);break;case"[5星通选]":reZ=getLenforssc(xNum,5);break;case"[3星复式组6]":reZ=0;if(xNumary.length>=3)
{reZ=1;for(var i=0;i<3;i++)reZ*=(xNumary.length-i);reZ/=6;}
break;case"[3星复式组3]":reZ=(xNumary.length*(xNumary.length-1));break;case"[3星单式组选]":reZ=1;break;case"[五星定位胆]":var numArray=xNum.split("|");reZ=0;for(var i=0;i<numArray.length;i++)
{reZ+=(numArray[i]=="")?0:numArray[i].split(",").length;}
break;default:bootbox.alert("错误的彩票标识名,请与管理员联系");reZ=0;}
return reZ;}
function createQiArr()
{var tmpDate=new Date(nowQi.substr(0,4),Number(nowQi.substr(4,2))-1,nowQi.substr(6,2));var tmpDateStr=date2Qi(tmpDate);var tmpQi=Number(nowQi.substr(9,3));if(stopQi!="0")keepMax=diffQi(nowQi,stopQi,qiMax);qiArr=[];for(var i=0;i<keepMax;i++)
{qiArr[i]=tmpDateStr+"-"+addZeros(tmpQi);tmpQi++;if(tmpQi>qiMax)
{tmpQi=1;tmpDate.setDate(tmpDate.getDate()+1);tmpDateStr=date2Qi(tmpDate);}}
var keepQiList=$D("keepQiList");keepQiList.options.length=0;keepQiList.options.add(new Option(qiArr[0]+"(当前期)",qiArr[0]));for(i=1;i<qiArr.length;i++)keepQiList.options.add(new Option(qiArr[i]+"期",qiArr[i]));chgKeepFirstQi(0);}
function getCt(s)
{switch(s)
{case"[2星单式组选]":case"[2星复式组选]":case"[2星分位组选]":case"[2星和值组选]":case"[2星包胆组选]":case"[3星单式组选]":case"[3星复式组6]":case"[3星复式组3]":return 1;case"[5星直选]":case"[3星直选]":case"[2星直选]":case"[1星直选]":case"[3星和值]":case"[2星和值]":return 2;case"[5星组合]":case"[3星组合]":case"[2星组合]":return 3;case"[5星通选]":return 4;case"[大小单双]":return 5;case"[五星定位胆]":return 6;default:return 0;}}
function bet()
{var msg;if(showLoginPanle())return;if(isStop)
{bootbox.alert(stopTip);return;}
if($D("ms1").checked)
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
stopKeep=$D("stopKeep").checked?1:0;}
else
{tempQi[0]=nowQi;tempBs[0]=$("#noKeepBeishu").val();stopKeep=0;nEstPri=sumBetPrize();}
var sLi=tempLi.join(";");var sQi=tempQi.join(",");var sBs=tempBs.join(",");var xName=getBetName(sLi);var iCt=getCt(xName);var sData;if(isHemai.checked)
{if(adviseNum($D("hm_feng"),nBetM)==false)return;var title=replaceWord($("#hm_title").val());var content=replaceWord($("#hm_content").val());var hm_ticheng=$("#ticheng").children('option:selected').val();var hm_pass=($D("hm_buyer2").checked&&hm_pass!="")?$("#hm_pass").val():"";var isShow=$('input[name="hm_pub"]:checked').val();var isCancel=($D("isCancel").checked)?"1":"0";var feng=Number($("#hm_feng").val());var ifeng=Number($("#hm_ifeng").val());var baodi=Number($("#hm_baodi").val());var imoney=$("#hm_imoney").html();if((Number(ifeng)/Number($("#keepQi").val()))!=Math.ceil(Number(ifeng)/Number($("#keepQi").val())))
{bootbox.alert("认购份数必须是追号的整数倍！");return;}
if(title=="")
{bootbox.alert("合买方案的标题不能为空！");$D("hm_title").focus();return;}
if(ifeng==""||ifeng==0)
{bootbox.alert("发起人认购份数不能为空或0！");$D("hm_ifeng").focus();return;}
var fMinNum=feng*fMin/100;var bMinNum=feng*bMin/100;var sfeng=feng-ifeng;if(sfeng<0)
{bootbox.alert("发起人认购份数不能大于总份数！");$D("hm_ifeng").focus();return;}
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