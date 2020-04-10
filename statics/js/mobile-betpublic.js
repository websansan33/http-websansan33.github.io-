Array.prototype.unique=function()
{var n={},r=[];for(var i=0;i<this.length;i++)
{if(!n[this[i]])
{n[this[i]]=true;r.push(this[i]);}}
return r;};function bindInputChangeEvent(obj,callfunc)
{try
{if(isIE())
{obj.attachEvent("onpropertychange",callfunc);}
else
{obj.addEventListener("input",callfunc,false);}}
catch(e)
{}}
var intervalId=0;function initPage()
{setPrize();loadType();getRemoteTime();showTime();setInterval("showTime();",1000);setInterval("getRemoteTime();",10000);$(document).ready(function()
{$("#noKeepBeishu").on('update keyup paste change',function()
{chgNoKeepBeishu();});$("#keepQi").keyup(function()
{loadKeepList();});$("#uploadTmp").keyup(function()
{collectUpload();});$("#hm_feng").keyup(function()
{intHmValue();});$("#hm_baodi").keyup(function()
{intHmValue();});$("#hm_ifeng").blur(function()
{intHmValue();});});bindInputChangeEvent($("#noKeepBeishu"),chgNoKeepBeishu);loadData(showData,dataPath);}
function getRate()
{var backval=defaultrate;var tmpRate=Number(getCookie("betRate"));var rds=document.getElementsByName("rateSwitch");if(rds.length>0){for(var i=0;i<rds.length;i++)
{if(tmpRate==Number(rds[i].value))
{rds[i].checked=true;return tmpRate;}}
rds[0].checked=true;setCookie("betRate",rds[0].value,10000,"/");backval=Number(rds[0].value);}
return backval;}
function setPrize(r)
{rate=getRate();for(var i=0;i<setArr[0].length;i++)p[i+1]=Number(setArr[0][i])*(rate*100)/100;$("#hm_feng").val(100*rate);}
function getPrizeList(){if(typeof json_data_cprize=="undefined"){var lotid=$("#lotteryid").val();doAjax("../../config/betprice.php",{"lotteryid":lotid},"json",function(json)
{if(json.res==1){json_data_cprize=json.List;}},false);}}
function loadType()
{$("#playType li").removeClass("seled");$("#playType li").click(function()
{$("#playType li").removeClass("seled");$("#playType li").eq($(this).index()).addClass("seled");m=$("#playType li").eq($(this).index()).attr("tabIndex");n=arguments[0]?Number($("#playType li").eq($(this).index()).attr("defaultchecked")):dn;loadPanel();});$("#playType li").eq(m).addClass("seled");loadPanel();}
function loadTypeMemory(t,d)
{var r;var s=t==0?getCookie("typeMemoryM"):getCookie("typeMemoryN");try
{r=typeof(s)=="undefined"?d:Number(s);}
catch(e)
{r=d;}
return r;}
function date2Qi(d)
{return d.getFullYear()+addZero(d.getMonth()+1)+addZero(d.getDate());}
function vbsDate2JsDate(s)
{var p=s.split(" ");var re=/\D+/img;p[0]=p[0].split(re);if(p.length<2)p[1]="00:00:00";p[1]=p[1].split(re);return new Date(p[0][0],Number(p[0][1])-1,p[0][2],p[1][0],p[1][1],p[1][2])}
function replaceWord(s)
{return s.replace(/'/igm,"‘").replace(/;/igm,"；").replace(/\(/igm,"（").replace(/\)/igm,"）").replace(/\*/igm,"＊").replace(/%/igm,"％");}
function mySplit(str,separator)
{return str.match(/\d/igm).join(separator);}
function objsToArray(objs)
{if(objs.length)
{var len=objs.length;var array=[];while(len--){array[len]=objs.eq(len);}}
return array;}
function getRndNum(under,over)
{return parseInt(Math.random()*(over-under+1)+under);}
function combNum(n,m)
{if(n<=0||m<=0||m>n)return 0;if(m==n)return 1;var r1=1;var r2=1;for(var i=0;i<m;i++)
{r1*=(n-i);r2*=(i+1);}
return(r1/r2);}
function isRepeat(a)
{var hash={};for(var i in a)
{if(hash[a[i]])return true;hash[a[i]]=true;}
return false;}
function chkInt(v)
{var re=/^\d+$/;return!re.test(v);}
function buy(id)
{if(showLoginPanle())return;var url="/app/add.php";if(arguments[1])url=arguments[1]+url;var o=$("#buy_"+id);var f=$("#feng_"+id);var p=$("#pc_"+id);var ti=$("#ticheng_"+id).val();var pm=o.attr("perMoney");var af=o.attr("allFeng");var lv=Number(f.html());var feng=o.val();var bm=pm*feng;var lf=lv-feng;if(chkInt(feng))
{bootbox.alert("认购份数只能是整数！");o.focus();return;}
if(lv<=0)
{bootbox.alert("此方案已满员！");return;}
if(feng-lv>0)
{bootbox.alert("认购份数不能大于剩余份数");o.select();return;}
var tialert="发起人无提成";if(parseInt(ti)>0){tialert="提醒：发起人已设置提成"+ti+"%";}
var msg="您认购："+feng+"份，金额"+formatCurrency(bm)+"元<br />"+tialert;var sData="id="+id+"&ifeng="+feng;bootbox.confirm(msg,function(btn)
{if(btn==true)
{var sData="id="+id+"&ifeng="+feng;var xmlhttp=createXMLHTTP();xmlhttp.open("POST",url,false);xmlhttp.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded;charset=utf-8");xmlhttp.send(sData);switch(xmlhttp.status)
{case 200:var reText=xmlhttp.responseText;if(reText.indexOf('成功')>=0)
{f.html(lf);p.html(formatPercent((af-lf)/af));o.val("1");}
bootbox.alert(reText);break;case 401:break;case 503:top.location.replace("/404.html");break;default:bootbox.alert(xmlhttp.status+"错误，请与管理员联系");}}else
{return;}});}
function showBallPanel(s)
{$("#uploadPanel").hide();$("#ballPanel").show();var i;var dt=$("#ballPanel").children("dt");var dd=$("#ballPanel").children("dd");for(i=0;i<dt.length;i++)
{dt.eq(i).removeClass();}
for(i=0;i<dd.length;i++)
{dd.eq(i).removeClass();}
for(i=0;i<s.length;i++)dt.eq(s[i]).addClass("show");for(i=0;i<s.length;i++)dd.eq(s[i]).addClass(showData?"show":"show hidden2");}
function showUploadPanel()
{$("#uploadPanel").show();$("#ballPanel").hide();$("#lineMax").html(maxLength.toString());}
function collectBall(sepBall)
{tmp=[];var sepStr=arguments[1]?arguments[1]:",";var dt=$("#ballPanel").children("dt");var i,ii,divs,sels;for(var i=0;i<dt.length;i++)
{if(dt.eq(i).hasClass("show"))
{divs=dt.eq(i).children("b");sels="";for(ii=0;ii<divs.length;ii++)
{if(divs.eq(ii).hasClass("sel"))
{var onecode=divs.eq(ii).html();onecode=onecode.replace(/[ \t\r\n]+/g,"");sels+=((sepBall&&sels!="")?sepStr:"")+(arguments[2]?addZero(onecode):onecode);}}
if(sels!=""||sepBall==false){tmp.push(sels);}else{tmp.push(null);}}}
var zhushu=getMoney("["+nam+"] "+tmp.join("|"));$("#selZ").html(zhushu);$("#selM").html(formatCurrency(zhushu*pm*rate));}
function collectUpload()
{var uploadTmp=$("#uploadTmp");var tmpVal=uploadTmp.val();tmpArr=tmpVal.match(nRe);var zhushu=(tmpArr==null)?0:tmpArr.length;$("#selZ").html(zhushu);$("#selM").html(formatCurrency(zhushu*pm*rate));}
function collectDtBall()
{var zhushu=0;var ball=getDtBall(true);if(ball[2]>0&&ball[3]>0)
{var td=(nDanMax+1)-ball[2];zhushu=combNum(ball[3],td);}
$("#ballD").html(ball[2]);$("#ballT").html(ball[3]);$("#selZ").html(zhushu);$("#selM").html(formatCurrency(zhushu*pm*rate));}
function collect_DtBall()
{var zhushu=0;var ball=getDtBall(false);if(ball[2]>0&&ball[3]>0)
{var td=(nDanMax+1)-ball[2];zhushu=combNum(ball[3],td);}
$("#ballD").html(ball[2]);$("#ballT").html(ball[3]);$("#selZ").html(zhushu);$("#selM").html(formatCurrency(zhushu*pm*rate));}
function getDtBall(a)
{var b=[[],[],0,0];var ds1=$D("dmDt").getElementsByTagName("B");var ds2=$D("tmDt").getElementsByTagName("B");for(var i=0;i<ds1.length;i++)
{if(ds1[i].className=="sel")
{b[0].push(a?addZero(ds1[i].innerHTML.replace(/[ \t\r\n]+/g,"")):ds1[i].innerHTML.replace(/[ \t\r\n]+/g,""));b[2]++;}
if(ds2[i].className=="sel")
{b[1].push(a?addZero(ds2[i].innerHTML.replace(/[ \t\r\n]+/g,"")):ds2[i].innerHTML.replace(/[ \t\r\n]+/g,""));b[3]++;}}
return b;}
function getDanMa()
{var x=0;var divs=$D("dmDt").getElementsByTagName("B");for(var i=0;i<divs.length;i++)if(divs[i].className=="sel")x++;return x;}
function clrSameNum(o)
{var divsLine=o.parentNode.id=="dmDt"?$D("tmDt").getElementsByTagName("B"):$D("dmDt").getElementsByTagName("B");var ub=Number(o.innerHTML.replace(/[ \t\r\n]+/g,""))-1;divsLine[ub].className="";}
function clrSameNums(o)
{var divsLine=o.parentNode.id=="same"?$D("nosame").getElementsByTagName("B"):$D("same").getElementsByTagName("B");var str=o.innerHTML.replace(/[ \t\r\n]+/g,"").substring(0,1);var ub=Number(str)-1;divsLine[ub].className="";}
function addLi(n,c,m,z)
{var ul=$D("codeList");var li=document.createElement("li");var html="<span class=\"iblock\"><u>["+n+"]</u> <b>"+c+"</b></span>"
+"<s><i>["+formatCurrency(m)+"]</i><a title=\""+z+"注\" href=\"javascript:void(0)\" onclick=\"delLi(this)\">删除</a></s>"
+"<input type=\"hidden\" name=\"selLiValue\" value=\"["+n+"] "+c+"\" />";li.innerHTML=html;ul.appendChild(li);}
function delLi(a)
{var lis=$D("codeList").getElementsByTagName("li");var li=a.parentNode;while(li.tagName!="LI")li=li.parentNode;for(var i=0;i<lis.length;i++)if(lis[i]===li)
{betPri.splice(i,1);break;}
tempZ=Number(a.title.replace("注",""));$D("codeList").removeChild(li);showBetBill(-tempZ);}
function clrSel()
{var div=$("#ballPanel").children("DT").children("b");for(var i=0;i<div.length;i++)
{div.eq(i).removeClass();}
tmp=[];tmpArr=[];$("#uploadTmp").val("");$("#selZ").html("0");$("#selM").html("￥0.00");}
function showUserMoney(obj)
{if(!obj==null)
{obj.html("正在查询...");}
$("#userMoney").html("正在查询...");doAjax("/public/check.php?"+Math.random(),"","json",function(json)
{if(json.res==1)
{$("#userMoney").html("请先登录...");if(showLoginPanle())return;}
else
{$("#userMoney").html(json.allmoney);}},true);}
function clrAll(suc)
{$("#codeList").html("");document.getElementById("hm_form").reset();chgNoKeepBeishuValue(1);showBetBill(-Number($("#allZ").html()));betPri=[];if(suc)
{nAllB=1;if($("#isHemai").attr("checked"))$D("isHemai").click();if($("#isKeep").attr("checked"))$D("isKeep").click();if(/￥/.test($("#userMoney").html()))showUserMoney($("#userMoney"),'../../users/');}}
function showBetBill()
{var allZ=$("#allZ");var allM=$("#allM");var allQ=$("#allQ");var betM=$("#betM");if(arguments[0])allZ.html(Number(allZ.html().replace(/[^0-9]+/g,''))+arguments[0]);nAllM=Number(allZ.html())*10000*pm*rate/10000;allM.html(formatCurrency(nAllM));if($("#isKeep").attr("checked"))sumKeepBeisu();allQ.html(nAllQ);nBetM=nAllM*nAllB;$("#hm_feng").val(nBetM);if($("#isHemai").attr("checked"))refHmPanel();betM.html(formatCurrency(nBetM));}
function getLen(xNum,r)
{var reLen=1;var re="|";if(!xNum.match(re))return xNum.length;var numArray=xNum.split(re);for(var i=0;i<numArray.length;i++)
{if(i>(numArray.length-(r+1)))reLen*=numArray[i].length;}
return reLen;}
function setExtenPanel(o,d)
{$("#"+d).css("display",o.checked?"block":"none");switch(d)
{case"extenHemai":refHmPanel();break
case"extenKeep":$("#noKeepSet").css("display",o.checked?"none":"");if(o.checked)loadKeepList();else
{chgKeepQiValue(1);chgNoKeepBeishu();}
break;}}
function getBetName(s)
{var re=/(\[[^\]]*\])+/igm;var xNameArray=s.match(re);if(xNameArray)
{for(var i=1;i<xNameArray.length;i++)if(xNameArray[0]!=xNameArray[i])return"[混合投注]";return xNameArray[0];}
else return"";}
function sumBetPrize()
{var r=0;if(nEstPriTmp>0)
{r=nEstPriTmp;nEstPriTmp=0;return r;}
var b=betPri.unique();for(var i=0;i<b.length;i++)if(b[i])r+=b[i];return r;}
function diffQi(q1,q2,qm)
{var arr1=q1.split("-");var arr2=q2.split("-");var d1=new Date(Number(arr1[0].substr(0,4)),Number(arr1[0].substr(4,2))-1,Number(arr1[0].substr(6,2)));var d2=new Date(Number(arr2[0].substr(0,4)),Number(arr2[0].substr(4,2))-1,Number(arr2[0].substr(6,2)));var ca=daysElapsed(d2,d1);return Number(arr2[1])-Number(arr1[1])+(ca*qm);}
function refHmPanel()
{if(stopEvent)return;var M=nBetM;var feng=$("#hm_feng");var pm=$("#hm_pm");var ifeng=$("#hm_ifeng");var imoney=$("#hm_imoney");var baodi=$("#hm_baodi");var bmoney=$("#hm_bmoney");if(!Number(feng.val())>0)return;pm.html("￥"+(M*10000/Number(feng.val())/10000).toString());var fNum=(M/feng.val())*ifeng.val();var bNum=(M/feng.val())*baodi.val();imoney.html(formatCurrency(fNum));bmoney.html(formatCurrency(bNum));var imoney_per=$("#hm_imoney_per");var bmoney_per=$("#hm_bmoney_per");if((Number(ifeng.val())/Number($("#keepQi").val()))!=Math.ceil(Number(ifeng.val())/Number($("#keepQi").val())))
{imoney.html("认购份数必须是追号的整数倍");return;}
imoney_per.html('( '+((Number(ifeng.val())/Number(feng.val()))*100).toFixed(2)+'% )');bmoney_per.html('( '+((Number(baodi.val())/Number(feng.val()))*100).toFixed(2)+'% )');}
function chgHmBaodi(o)
{var bdInp=$D("hm_baodi");bdInp.disabled=!o.checked;if(!o.checked)bdInp.value=0;else bdInp.select();$D("hm_bmoney").className=o.checked?"bd r":"";refHmPanel();}
function intHmValue(e)
{e=e||window.event;var elem=(e.target)?e.target:e.srcElement;var re=/\D+/igm;var val=elem.value.replace(re,"");if(val!=elem.value)
{stopEvent=true;elem.value=val;stopEvent=false;}
refHmPanel();}
function adviseNum(obj,allmoney)
{var feng=parseInt(obj.value);if(feng==""&&allmoney=="")return;allmoney=parseInt(allmoney*100);if(allmoney%feng!=0)
{var rightnum=feng;while(allmoney%rightnum!=0)
{if(feng>=allmoney)rightnum=allmoney;else rightnum++;}
if(confirm("您输入的份数不合理，每份金额不能精确到"+0.01+"元，系统建议您分成"+rightnum+"份，要分成"+rightnum+"份吗？"))
{obj.value=rightnum;refHmPanel();return true;}
else return false;}}
function chgHmBuyer()
{$D("hmUserSet").style.display=$D("hm_buyer2").checked?"inline":"none";}
function setHmMore(box)
{$D("hmSetMorePanel").style.display=box.checked?"block":"none";}
function loadKeepList()
{if(stopEvent)return;var keepQi=$("#keepQi");if(keepQi.val()=="")return;var keepQiVal=Number(keepQi.val());var tab=$D("keepTab");var bArr=arguments[0]?arguments[0]:[];if(bArr.length>0)keepQiVal=bArr.length;if(keepQiVal>keepMax)keepQiVal=keepMax;if(keepQiVal>tab.rows.length-1)
{var lastBeishu=tab.rows.length>1?Number(tab.rows[tab.rows.length-1].cells[2].childNodes[0].childNodes[0].value):1;var tbody=tab.tBodies[0];var tr=document.createElement("tr");var td=document.createElement("td");var tdArr=["<input type=\"checkbox\" checked=\"checked\" />","","","","","--","--"];for(var j=0;j<tdArr.length;j++)
{td=td.cloneNode(false);td.innerHTML=tdArr[j];tr.appendChild(td);}
var tmpTr;for(var i=tab.rows.length-1;i<keepQiVal;i++)
{lastBeishu=bArr[i]?bArr[i]:lastBeishu;tmpTr=tr.cloneNode(true);tmpTr.childNodes[2].innerHTML="<span><input type=\"text\" value = \""+lastBeishu+"\" maxlength=\"4\" onfocus=\"this.select();\" /></span>";bindInputChangeEvent(tmpTr.childNodes[2].childNodes[0].childNodes[0],chgKeepBeishu);tbody.appendChild(tmpTr);}
tab.appendChild(tbody);chgKeepFirstQi($D("keepQiList").selectedIndex);}
else while(tab.rows.length-1>keepQiVal)tab.deleteRow(tab.rows.length-1);checkAllBox(true);$D("chkAllBox").checked=true;}
function sumKeepBeisu()
{var tab=$D("keepTab");var sumB=0;var sumQ=0;nEstPri=sumBetPrize();var isPtList=(nAllM>0&&nEstPri>0);var bVal,mBetVal,mSumVal,mProVal;for(var i=1;i<tab.rows.length;i++)
{if(tab.rows[i].cells[0].childNodes[0].checked)
{bVal=Number(tab.rows[i].cells[2].childNodes[0].childNodes[0].value);sumB+=bVal;sumQ++;mBetVal=sumB*nAllM;tab.rows[i].cells[3].innerHTML=formatCurrency(bVal*nAllM);tab.rows[i].cells[4].innerHTML=formatCurrency(mBetVal);if(isPtList)
{mSumVal=bVal*nEstPri;mProVal=mSumVal-mBetVal;tab.rows[i].cells[5].innerHTML=formatCurrency(mSumVal);tab.rows[i].cells[6].innerHTML=mProVal>0?formatCurrency(mProVal).fontcolor("red"):formatCurrency(mProVal).fontcolor("green");}
else
{tab.rows[i].cells[5].innerHTML="--";tab.rows[i].cells[6].innerHTML="--";}}
else
{tab.rows[i].cells[3].innerHTML="";tab.rows[i].cells[4].innerHTML="";tab.rows[i].cells[5].innerHTML="";tab.rows[i].cells[6].innerHTML="";}}
nAllB=sumB;nAllQ=sumQ;}
function chgKeepQiValue(v)
{if($("#keepQi").val()==v)return;stopEvent=true;$("#keepQi").val(v);stopEvent=false;if(!arguments[1])loadKeepList();}
function chgKeepFirstQi(f)
{var tab=$D("keepTab");var x=0;var tmpB=0;while((f+tab.rows.length-1)>keepMax)
{if(tab.rows[tab.rows.length-1].cells[0].childNodes[0].checked)x++;tab.deleteRow(tab.rows.length-1);}
if(x>0)chgKeepQiValue(Number($D("keepQi").value)-x,true);for(var i=1;i<tab.rows.length;i++)tab.rows[i].cells[1].innerHTML=qiArr[f+(i-1)];}
function chgNoKeepBeishu()
{var o=$("#noKeepBeishu");var re=/\D+/igm;chgNoKeepBeishuValue(o.val().replace(re,""));nAllB=Number(o.val());nAllQ=1;showBetBill();}
function chgNoKeepBeishuValue(v)
{if($("#noKeepBeishu").val()==v)return;$("#noKeepBeishu").val(v);}
function chgKeepBeishu(e)
{if(stopEvent)return;e=e||window.event;var elem=(e.target)?e.target:e.srcElement;var re=/\D+/igm;chgKeepBeishuValue(elem,elem.value.replace(re,""));if(elem.value=="")return;if(Number(elem.value)<=0)
{chgKeepBeishuValue(elem,1);return;}
var eParent=elem.parentNode.parentNode.parentNode;eParent.cells[3].innerHTML=formatCurrency(Number(elem.value)*nAllM);eParent=getNextNode(eParent);while(eParent&&eParent.tagName=="TR")
{chgKeepBeishuValue(eParent.cells[2].childNodes[0].childNodes[0],Number(elem.value));eParent=getNextNode(eParent);}
showBetBill();}
function chgKeepBeishuValue(o,v)
{if(o.value==v)return;stopEvent=true;o.value=v;stopEvent=false;}
function checkAllBox(flag)
{var tab=$D("keepTab");var tr;for(var i=1;i<tab.rows.length;i++)
{tr=tab.rows[i];if(tr.cells[0].childNodes[0].checked!=flag)
{tr.cells[0].childNodes[0].checked=flag;tr.className=flag?"":"bg";tr.cells[2].childNodes[0].className=flag?"":"hidden";}}
chgKeepQiValue(flag?tab.rows.length-1:0,true);showBetBill();}
function tabEvent(e)
{e=e||window.event;var elem=(e.target)?e.target:e.srcElement;if(elem.tagName=="INPUT"&&elem.type=="checkbox"&&elem.id!="chkAllBox")
{var tr=elem.parentNode.parentNode;if(elem.checked)
{tr.className="";tr.cells[2].childNodes[0].className="";chgKeepQiValue(Number($D("keepQi").value)+1,true);}
else
{tr.className="bg";tr.cells[2].childNodes[0].className="hidden";chgKeepQiValue(Number($D("keepQi").value)-1,true);}
showBetBill();}}
var hiddenQihaoTipTimer;function qihaoStopTip(q1,q2)
{var tInt=6;if(typeof(submitFlag)=="undefined")return;if(typeof(q1)=="undefined")return;myAlert("提醒","您好，<span class=\"bd s14\">"+q1+"</span>期已截止<br>当前期是<span class=\"red bd s14\">"+q2+"</span><br>投注时请确认您选择的期号。<br><div class=\"tc s14\"><span id=\"closeTimer\" class=\"red bd s14\">"+tInt+"</span> 秒后自动关闭</div>");hiddenQihaoTipTimer=setInterval("qihaoTipTimer();",1000);}
function qihaoTipTimer()
{var s=Number($("#closeTimer").html());if(s<=0)
{clearInterval(hiddenQihaoTipTimer);closeMyAlert();return;}
s--;$("#closeTimer").html(s);}
function stopBet(b)
{try
{$D("isHemai").disabled=b;$D("isKeep").disabled=b;}
catch(e)
{}
if(arguments[1])
{if($D("timer"))
{$D("timer").html("<span>"+arguments[1]+"</span>");}}}
function setSubmitFlag()
{submitFlag=!submitFlag;$D("betText").innerHTML=submitFlag?"正在提交":"确定购买";}
function iBet()
{if(submitFlag)return;setSubmitFlag();bet();setTimeout("setSubmitFlag();",500);}
function showTime()
{var timer=$("#timer");var qihao=$("#timerQihao");var getRe=getTimeData(nowTime);if(isStop)
{stopBet(true,stopTip);}
else
{if(getRe[0]!=nowQi)
{qihaoStopTip(nowQi,getRe[0]);nowQi=getRe[0];if(intervalId==0)
{intervalId=setInterval("loadData(showData,dataPath);",timeInt);}
if($("#keepPanel"))
{createQiArr();}}
qihao.html(nowQi);timer.html(getRe[1]);}
nowTime.setSeconds(nowTime.getSeconds()+1);}
function post(sData,url)
{try
{var xmlhttp=createXMLHTTP();xmlhttp.open("POST",url,false);xmlhttp.setRequestHeader("Content-Length",sData.length);xmlhttp.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded;charset=utf-8");xmlhttp.onreadystatechange=function()
{if(xmlhttp.readyState==4)
{switch(xmlhttp.status)
{case 200:var reText=xmlhttp.responseText;clrAll(true);if(reText.indexOf('成功')>=0)
{bootbox.alert(reText);}else
{bootbox.alert(reText);}
break;case 401:bootbox.alert("没有权限！");break;case 503:top.location.replace("/404.html");break;default:bootbox.alert(xmlhttp.status+"错误，请与管理员联系");}}else
{}}
xmlhttp.send(sData);}catch(e)
{bootbox.alert("网络通讯错误，请与管理员联系");}}
function posts(sData,url)
{try
{var xmlhttp=createXMLHTTP();xmlhttp.open("POST",url,false);xmlhttp.setRequestHeader("Content-Length",sData.length);xmlhttp.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded;charset=utf-8");xmlhttp.send(sData);bootbox.alert('正在提交出票信息');switch(xmlhttp.status)
{case 200:var reText=xmlhttp.responseText;if(reText.indexOf('成功')>=0)
{clrAll(true);bootbox.alert(reText);}else if(reText.indexOf('余额不足')>=0)
{bootbox.alert(reText);}else
{bootbox.alert(reText);}
break;case 401:bootbox.alert("没有权限！");break;case 503:top.location.replace("/404.html");break;default:bootbox.alert(xmlhttp.status+"错误，请与管理员联系");}}
catch(e)
{bootbox.alert("网络通讯错误，请与管理员联系");}}
function send(sData,url,location)
{try
{var xmlhttp=createXMLHTTP();xmlhttp.open("POST",url,false);xmlhttp.setRequestHeader("Content-Length",sData.length);xmlhttp.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded;charset=utf-8");xmlhttp.send(sData);switch(xmlhttp.status)
{case 200:var reText=xmlhttp.responseText;if(reText.indexOf('成功')>=0)
{bootbox.alert(reText);window.location.replace(location);}else if(reText.indexOf('余额不足')>=0)
{bootbox.alert(reText);}else
{bootbox.alert(reText);}
break;case 401:bootbox.alert("没有权限！");break;case 503:top.location.replace("/404.html");break;default:bootbox.alert(xmlhttp.status+"错误，请与管理员联系");}}
catch(e)
{bootbox.alert("网络通讯错误，请与管理员联系");}}
function setMark(o,c,id)
{try
{var xmlhttp=createXMLHTTP();var sData="c="+c+"&id="+id;xmlhttp.open("POST","/app/SetMark.php",false);xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");xmlhttp.onreadystatechange=function()
{if(xmlhttp.readyState==4)
{switch(xmlhttp.status)
{case 200:if(xmlhttp.responseText=="0")
{o.className=o.className=="starMark1"?"starMark2":"starMark1";o.title=o.className=="starMark1"?"设置标记":"取消标记";}
else Showbo.Msg.alert(xmlhttp.responseText);break;case 401:Showbo.Msg.alert("登录状态已失效或没有权限，请重新登录");top.location.replace("/User/logout.php");break;case 503:top.location.replace("/404.html");break;default:Showbo.Msg.alert(xmlhttp.status+"错误，请与管理员联系");}}}
xmlhttp.send(sData);}
catch(e)
{Showbo.Msg.alert("网络通讯错误，请与管理员联系");}}