//首页用的，取热点下注数据。

var nowTime;
var uploadBasePath = "config/index.php";
var nowTime_ssj;
var delaySecond=2;

var cbase="0|8:58:00|0|2|20|80|0";
var cprize="116000|1160|116|58|11|4|20460|200|20|385|190|6";
var bbase=cbase.split("|");
var acprize=cprize.split("|");
bbase.unshift(acprize);
var setArr;
var setArr_ssj=bbase;

//****************************** 新时时彩（江西时时彩 ）
//var setArr_ssj = getSet(uploadBasePath + "xml/ssj_config.xml");
var delaySecond_ssj = Number(setArr_ssj[1]);//延迟时间便于出票
var firstTime_ssj = setArr_ssj[2];//首期开售时间
var isStop_ssj = Number(setArr_ssj[3]);//是否停售
var stopQi_ssj = setArr_ssj[7];//开始休市
var stopTip_ssj ="暂停销售";//停售原因
var nowQi_ssj;
var timeInt_ssj = 30000;//核对时间和刷新遗漏数据的频率 毫秒/次
var perQiSec_ssj = 609;

//****************************** 老时时彩（重庆时时彩 ）
cbase="60|0:00:00|0|2|20|80|0";
cprize="100000|1000|100|50|10|4|20000|200|20|320|160|6|10";
bbase=cbase.split("|");
acprize=cprize.split("|");
bbase.unshift(acprize);
setArr;
var setArr_ssc=bbase;

//var setArr_ssc = getSet(uploadBasePath + "xml/ssc_config.xml");
var delaySecond_ssc = Number(setArr_ssc[1]);//延迟时间便于出票
var firstTime_ssc = setArr_ssc[2];//首期开售时间
var firstTime_pk10="09:01:00";
var isStop_ssc = Number(setArr_ssc[3]);//是否停售

var stopQi_ssc = setArr_ssc[7];//开始休市
var stopTip_ssc ="暂停销售";//停售原因
var nowQi_ssc;

var timeInt_ssc = 30000;//核对时间和刷新遗漏数据的频率 毫秒/次
var perQiSec_ssc = 600;

getRemoteTime();
nowTime_ssj=nowTime;
if($("#ssc_timer")) setInterval("showTime_ssc();",1000);
//if($("#f3d_timer")) setInterval("showTime_f3d();",1000);
setInterval("getRemoteTime();",30000);
var nowQi_pk10;
var nowTime_pk10=nowTime ;
var baseQi_pk10='609640';
var baseDate_pk10="2017-03-30";
var perQiSec_pk10=300;
if($("#pk10_timer")) setInterval("showTime_pk10();",1000);
function showTime_pk10()
{//显示倒计时和当前期号

	var timer = $("#pk10_timer");
	var qihao = $("#pk10_qihao");
	var getRe = getTimeData_pk10(nowTime_pk10);
	//if(isStop_pk10) stopBet(true,stopTip_pk10)
	//else
	//{
		if(getRe[0] != nowQi_pk10)
		{
			nowQi_pk10 = getRe[0];
		}
		qihao.html("第" + nowQi_pk10 + "期");
		timer.html( getRe[1]);
		
	//}
	nowTime_pk10.setSeconds(nowTime_pk10.getSeconds() + 1);
}

function getTimeData_pk10(T)
{
	//根据所给时间，计算当前期号、倒计时间和最近开奖时间
	//T是网络加载的当前时间最新时间
	//根据所给时间，返回当前期号，倒计时间，截止时间
	//每天第一次开期时间
	
	var setArray = firstTime_pk10.split(":");
	var TT = new Date(T.toString());
	var Y = T.getFullYear();
	var M = T.getMonth();
	var D = T.getDate();
	//每天截止时间
	var endTime = new Date(Y,M,D,Number(setArray[0]),setArray[1],Number(setArray[2]) + (perQiSec_pk10 * 179));
	if(T - endTime > 0) TT.setDate(TT.getDate() + 1);//时间已过最后一期则预售第2天的
	var YY = TT.getFullYear();
	var MM = TT.getMonth();
	var DD = TT.getDate();
	var lineTime = new Date(YY,MM,DD,setArray[0],setArray[1],setArray[2]);
	var reQi = parseInt(baseQi_pk10);
	var diValue = Math.ceil((T - lineTime) / (perQiSec_pk10 * 1000));
	var fitValue = diValue <= 1 ? 1 : diValue;
	var difday=parseInt(daysElapsed(TT,new Date(Date.parse(baseDate_pk10.replace(/-/g,   "/"))))*179); //相差天数*每天最大期数
	reQi += difday + parseInt(addZero(fitValue));
	
	lineTime.setSeconds(lineTime.getSeconds() + (fitValue * perQiSec_pk10));
	/*
	var nStopQi = Number(stopQi.replace("-",""));
	if(nStopQi > 0 && Number(reQi) >= nStopQi)
	{
		isStop = 1;
		stopTip = "今日休市";
		return [stopQi,stopTip,lineTime];
	}
	*/
	//返回三参数 期号 倒计时 当前时间
	return [reQi,sec2TimerString(lineTime - T),lineTime];
}

function showTime_ssj()
{//显示倒计时和当前期号

	var timer = $("#ssj_timer");
	var qihao = $("#ssj_qihao");
	var getRe = getTimeData_ssj(nowTime_ssj);
	if(isStop_ssj) stopBet(true,stopTip_ssj)
	else
	{
		if(getRe[0] != nowQi_ssj)
		{
			nowQi_ssj = getRe[0];
		}
		qihao.html("第" + nowQi_ssj + "期");
		timer.html( getRe[1]);
		
	}
	nowTime_ssj.setSeconds(nowTime_ssj.getSeconds() + 1);
}

function getTimeData_ssj(T)
{//根据所给时间，计算当前期号、倒计时间和最近开奖时间
	var setArray = firstTime_ssj.split(":");
	var TT = new Date(T.toString());
	var Y = T.getFullYear();
	var M = T.getMonth();
	var D = T.getDate();
	var endTime = new Date(Y,M,D,Number(setArray[0]),setArray[1],Number(setArray[2]) + (perQiSec_ssj * 84))
	if(T - endTime > 0) TT.setDate(TT.getDate() + 1);//时间已过最后一期则预售第2天的
	var YY = TT.getFullYear();
	var MM = TT.getMonth();
	var DD = TT.getDate();
	var lineTime = new Date(YY,MM,DD,setArray[0],setArray[1],setArray[2])
	var reQi = YY.toString() + addZero(MM+1) + addZero(DD) + "-";
	var diValue = Math.ceil((T - lineTime) / (perQiSec_ssj * 1000));
	var fitValue = diValue <= 1 ? 1 : diValue;
	reQi += addZero(fitValue);
	lineTime.setSeconds(lineTime.getSeconds() + (fitValue * perQiSec_ssj));
	var nStopQi = Number(stopQi_ssj.replace("-",""));
	if(nStopQi > 0 && Number(reQi.replace("-","")) >= nStopQi)
	{
		isStop_ssj = 1;
		stopTip_ssj = "今日休市";
		return [stopQi_ssj,stopTip_ssj,lineTime];
	}
	return [reQi,sec2TimerString(lineTime - T),lineTime];
	
}

function showTime_ssq()
{//显示倒计时和当前期号
	var timer = $("#ssq_timer");
	var qihao = $("#ssq_qihao");
	var getRe = getTimeData_ssq(nowTime);
	if(isStop_ssq) stopBet(true,stopTip_ssq)
	else
	{
		if(getRe[0] != nowQi_ssq)
		{
			nowQi_ssq = getRe[0];
		}
		qihao.html(  "第" + nowQi_ssq + "期");
		timer.html(  getRe[1]);
		
	}
	nowTime.setSeconds(nowTime.getSeconds() + 1);
}
var firstTime_ssq="00:00:00";
function getTimeData_ssq(T)
{//根据所给时间，返回当前期号，倒计时间，截止时间
	var firstArr = firstTime_ssq.split(":");
	var virTime = getDateByWeek(T,w_ssq,firstArr);
	var nowYear = virTime.getFullYear();
	var isYear = nowYear == baseDate_ssq.getFullYear();
	var bDate = isYear ? baseDate_ssq : new Date(virTime.getFullYear(),0,1);
	var bQi = isYear ? Number(baseQi_ssq.substr(4,3)) : 1;
	bQi += getQiByWeek(virTime,bDate,w_ssq);
	bQi = nowYear.toString() + addZeros(bQi);
	if(stopQi_ssq > 0 && Number(bQi) >= stopQi_ssq)
	{
		isStop_ssq = 1;
		stopTip_ssq = "今日休市";
		return [stopQi_ssq,stopTip_ssq,virTime];
	}
	return [bQi,sec2TimerString(virTime - T),virTime];
}


function showTime_syy()
{//显示倒计时和当前期号
	var timer = $("#syy_timer");
	var qihao = $("#syy_qihao");
	var getRe = getTimeData_syy(nowTime);
	if(isStop_syy) stopBet(true,stopTip_syy)
	else
	{
		if(getRe[0] != nowQi_syy)
		{
			nowQi_syy = getRe[0];
		}
		qihao.html(  "第" + nowQi_syy + "期");
		timer.html(  getRe[1]);		
	}
	//nowTime.setSeconds(nowTime.getSeconds() + 1);
}
var firstTime_syy="00:00:00";
function getTimeData_syy(T)
{//根据所给时间，计算当前期号、倒计时间和最近开奖时间
	var setArray = firstTime_syy.split(":");
	var TT = new Date(T.toString());
	var Y = T.getFullYear();
	var M = T.getMonth();
	var D = T.getDate();
	var endTime = new Date(Y,M,D,Number(setArray[0]),setArray[1],Number(setArray[2]) + (perQiSec_syy * 78))
	if(T - endTime > 0) TT.setDate(TT.getDate() + 1);//时间已过最后一期则预售第2天的
	var YY = TT.getFullYear();
	var MM = TT.getMonth();
	var DD = TT.getDate();
	var lineTime = new Date(YY,MM,DD,setArray[0],setArray[1],setArray[2])
	var reQi = YY.toString() + addZero(MM+1) + addZero(DD) + "-";
	var diValue = Math.ceil((T - lineTime) / (perQiSec_syy * 1000));
	var fitValue = diValue <= 1 ? 1 : diValue;
	reQi += addZero(fitValue);
	lineTime.setSeconds(lineTime.getSeconds() + (fitValue * perQiSec_syy));
	var nStopQi = Number(stopQi_syy.replace("-",""));
	if(nStopQi > 0 && Number(reQi.replace("-","")) >= nStopQi)
	{
		isStop_syy = 1;
		stopTip_syy = "今日休市";
		return [stopQi_syy,stopTip_syy,lineTime];
	}
	return [reQi,sec2TimerString(lineTime - T),lineTime];
}


function showTime_ssc()
{//首页显示倒计时和当前期号
	var timer = $("#ssc_timer");
	var qihao = $("#ssc_qihao");
	var getRe = getTimeData_ssc(nowTime);
	if(isStop_ssc) stopBet(true,stopTip_ssc)
	else
	{
		if(getRe[0] != nowQi_ssc)
		{
			nowQi_ssc = getRe[0];
		}
		qihao.html(   "第" + nowQi_ssc + "期");
		timer.html(   getRe[1]);		
	}
	nowTime.setSeconds(nowTime.getSeconds() + 1);
}
function getTimeData_ssc(T)
{//首页根据所给时间，计算当前期号、倒计时间和最近开奖时间
	var Y = T.getFullYear();
	var M = T.getMonth();
	var D = T.getDate();
	var H = T.getHours();
	var N = T.getMinutes();
	var reQi = Y.toString() + addZero(M + 1) + addZero(D) + "-";
	var Qi;
	var Kai;
	switch(true)
	{
		case ((H >= 2 && H < 10) || (H == 1 && N > 55)) :	//1:55-10:00
			Qi = 24;
			Kai = new Date(Y,M,D,10,0,0);
			break;
		case (H >= 10 && H < 22) : 	//10:00-22:00
			Qi = 25 + Math.floor((((H - 10) * 60) + N) / 10);
			Kai = new Date(Y,M,D,10,(Qi - 25 + 1) * 10,0);
			break;
		case (H >= 22) : //22:00-00:00
			Qi = 97 + Math.floor((((H - 22) * 60) + N) / 5);
			Kai = new Date(Y,M,D,22,(Qi - 97 + 1) * 5,0);
			break;
		default : 	//0:00-1:55
			Qi = 1 + Math.floor(((H * 60) + N) / 5);
			Kai = new Date(Y,M,D,0,Qi * 5,0);
	}
	reQi += addZeros(Qi);
	var nStopQi = Number(stopQi_ssc.replace("-",""));
	if(nStopQi > 0 && Number(reQi.replace("-","")) >= nStopQi)
	{
		isStop = 1;
		stopTip = "今日休市";
		return [stopQi,stopTip_ssc,Kai];
	}
	return [reQi,sec2TimerString(Kai - T),Kai];
}


function showTime_f3d()
{//显示倒计时和当前期号
	var timer = $("#f3d_timer");
	var qihao = $("#f3d_qihao");
	var getRe = getTimeData_f3d(nowTime);
	if(isStop_f3d) stopBet(true,stopTip_f3d)
	else
	{
		if(getRe[0] != nowQi_f3d)
		{
			nowQi_f3d = getRe[0];
		}
		qihao.html(  "第" + nowQi_f3d + "期");
		timer.html(  getRe[1]);	
	}
	//nowTime.setSeconds(nowTime.getSeconds() + 1);
}


var firstTime_f3d="00:00:00"; //fix胡乱数据
var baseDate_f3d=new Date("2015-10-10 12:00:00"); //fix胡乱数据
var baseQi_f3d="12345"; //fix胡乱数据
var stopQi_f3d=1;
function getTimeData_f3d(T)
{//根据所给时间，返回当前期号，倒计时间，截止时间
	var firstArr = firstTime_f3d.split(":");
	var virTime = new Date(T.getFullYear(),T.getMonth(),T.getDate(),Number(firstArr[0]),Number(firstArr[1]),Number(firstArr[2]));
	if(virTime <= T) virTime.setDate(virTime.getDate() + 1);
	var nowYear = virTime.getFullYear();
	var isYear = nowYear == baseDate_f3d.getFullYear();
	var bDate = isYear ? baseDate_f3d : new Date(virTime.getFullYear(),0,1);
	var bQi = isYear ? Number(baseQi_f3d.substr(4,3)) : 1;
	bQi += daysElapsed(virTime,bDate);
	bQi = nowYear.toString() + addZeros(bQi);
	if(stopQi_f3d > 0 && Number(bQi) >= stopQi_f3d)
	{
		isStop_f3d = 1;
		stopTip_f3d = "今日休市";
		return [stopQi_f3d,stopTip_f3d,virTime];
	}
	return [bQi,sec2TimerString(virTime - T),virTime];
}

function showTime_pl3()
{//显示倒计时和当前期号
	var timer = $("#pl3_timer");
	var qihao = $("#pl3_qihao");
	var getRe = getTimeData_pl3(nowTime);
	if(isStop_pl3) stopBet(true,stopTip_pl3)
	else
	{
		if(getRe[0] != nowQi_pl3)
		{
			nowQi_pl3 = getRe[0];
		}
		qihao.html(  "第" + nowQi_pl3 + "期");
		timer.html(  getRe[1]);		
	}
	//nowTime.setSeconds(nowTime.getSeconds() + 1);
}
var firstTime_pl3="00:00:00";
function getTimeData_pl3(T)
{//根据所给时间，返回当前期号，倒计时间，截止时间
	var firstArr = firstTime_pl3.split(":");
	var virTime = new Date(T.getFullYear(),T.getMonth(),T.getDate(),Number(firstArr[0]),Number(firstArr[1]),Number(firstArr[2]));
	if(virTime <= T) virTime.setDate(virTime.getDate() + 1);
	var nowYear = virTime.getFullYear();
	var isYear = nowYear == baseDate_pl3.getFullYear();
	var bDate = isYear ? baseDate_pl3 : new Date(virTime.getFullYear(),0,1);
	var bQi = isYear ? Number(baseQi_pl3.substr(4,3)) : 1;
	bQi += daysElapsed(virTime,bDate);
	bQi = nowYear.toString() + addZeros(bQi);
	if(stopQi_pl3 > 0 && Number(bQi) >= stopQi_pl3)
	{
		isStop_pl3 = 1;
		stopTip_pl3 = "今日休市";
		return [stopQi_pl3,stopTip_pl3,virTime];
	}
	return [bQi,sec2TimerString(virTime - T),virTime];
}

function showTime_qlc()
{//显示倒计时和当前期号
	var timer = $("#qlc_timer");
	var qihao = $("#qlc_qihao");
	var getRe = getTimeData_qlc(nowTime);
	if(isStop_qlc) stopBet(true,stopTip_qlc)
	else
	{
		if(getRe[0] != nowQi_qlc)
		{
			nowQi_qlc = getRe[0];
		}
		qihao.html(  "第" + nowQi_qlc + "期");
		timer.html(  getRe[1]);		
	}
	//nowTime.setSeconds(nowTime.getSeconds() + 1);
}
var firstTime_qlc="00:00:00";
function getTimeData_qlc(T)
{//根据所给时间，返回当前期号，倒计时间，截止时间
	var firstArr = firstTime_qlc.split(":");
	var virTime = getDateByWeek(T,w_qlc,firstArr);
	var nowYear = virTime.getFullYear();
	var isYear = nowYear == baseDate_qlc.getFullYear();
	var bDate = isYear ? baseDate_qlc : new Date(virTime.getFullYear(),0,1);
	var bQi = isYear ? Number(baseQi_qlc.substr(4,3)) : 1;
	bQi += getQiByWeek(virTime,bDate,w_qlc);
	bQi = nowYear.toString() + addZeros(bQi);
	if(stopQi_qlc > 0 && Number(bQi) >= stopQi_qlc)
	{
		isStop_qlc = 1;
		stopTip_qlc = "今日休市";
		return [stopQi_qlc,stopTip_qlc,virTime];
	}
	return [bQi,sec2TimerString(virTime - T),virTime];
}

function sec2TimerString(ms)
{//根据相差的毫秒数显示倒计时
	if(ms <= 0) return "<b>0</b>分<b>0</b>秒";
	var s = Math.floor(ms / 1000);
	var d = Math.floor(s / (24 * 3600));
	dd = d > 0 ? d.toString().bold() + "天" : "";
	var hh = Math.floor((s % (24 * 3600)) / 3600);
	hh = (hh > 0 || d > 0) ? hh.toString().bold() + "时" : "";
	var mm = addZero(Math.floor((s % 3600) / 60));
	var ss = addZero(s % 60);
	if(d > 0) return dd + hh + mm.bold() + "分";
	return dd + hh + mm.bold() + "分" + ss.bold() + "秒";
}
