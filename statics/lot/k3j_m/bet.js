// 江苏快3投注相关JS
function loadPanel()
{
  //载入面板
  //alert(Number(arguments[0])-1);
  var s=$("#subPanel").children("dt"); //玩法选码小类列表
  var d=$("#subPanel").children("dd"); //玩法单式小类列表
  var inputs = s.eq(m).find(":input"); //m玩法大类查找子元素input集合 就是radio
  //传参指定子元素控件，其中value里面是选号面板序号，多个逗号间隔，单个不需要逗号
  //loadType()时inputs.eq(n)
  //手机版修改
  n = arguments[0] ? Number(Number(arguments[0])-1) : n;
  var o = inputs.eq(n);
  //bootbox.alert("hello"+n.toString());
  //bootbox.alert("world"+(Number(arguments[0])-1).toString());
  var t = $(".helptip");
  var isDD;//手工模式时 3星组选和2星组选需要改变subPanel的显示
  //组三组二改变subPanel的显示
  //判断手工上传模式 m是大类 n小类
  /* 手机版不用 */
  if($("#ms2").attr("checked"))
  isDD= (m == 1 || m == 3) && true;
  else
  isDD= (m == 1 || m == 3) && false;
  //根据m和非单式 切换子类显示
  for(var i = 0;i < s.length;i++)
  {
    s.eq(i).removeClass("show");
    if(i == m && isDD == false)
    {
      s.eq(i).addClass("show");
    }
  }
  //根据m和单式，手机版弃用
  //  for(i = 0;i < d.length;i++)
  //  {
  //    if(isDD && (i == m - 1))
  //    {
  //      d.eq(i).addClass("show");
  //      o = d.eq(i).find(":input").eq(0);
  //    }
  //    else
  //    {
  //      d.eq(i).removeClass("show");
  //    }
  //  }

  //判断小类序号
  //  for(i = 0;i < inputs.length;i++)
  //  {
  //    if(JSON.stringify(inputs.eq(i))==JSON.stringify(o))
  //    {
  //      n = i;
  //      //bootbox.alert(i.toString());
  //      //console.log('equal');
  //    }
  //  }

  //inputs.eq(1).sort().toString()
  //bootbox.alert(JSON.stringify(inputs.eq(1).sort()));
  //bootbox.alert(JSON.stringify(o.sort()));
  //  if(JSON.stringify(inputs.eq(1).sort())==JSON.stringify(o.sort())){
  //    bootbox.alert(inputs.eq(1).sort().toString());
  //  }
  //inputs.prop("checked",false);
  //inputs.prop("checked",false);
  //for(i = 0;i < inputs.length;i++){
  //这是没必要的
  //inputs.eq(i).removeAttr('checked');
  //}

  //o.attr("checked",true); //使用这个重复设置多次checked出现故障
  //https://www.cnblogs.com/yang1018/p/7815684.html
  //https://www.cnblogs.com/mmzuo-798/p/7120137.html
  //重点https://blog.csdn.net/hongc93/article/details/75308654
  //手机版修改
  o.prop("checked",true); //使用这个正常
  //$('.switch-input:checked + .switch-label').trigger("click");
  //bootbox.alert($('.switch-input:checked + .switch-label').attr('for').toString());
  //玩法nam中文名，从所选radio中title取得
  nam = o.attr("title");

  //玩法提示
  t[0].dataset["content"]=getTipByName(nam);
  t.popover();
  //t.html('<b>玩法提示：</b>'+getTipByName(nam));
  //清空选球面板
  clrSel();

  //  if(m == 4 )
  //  {
  //和值 任选只有标准选号模式,不可以手工编辑
  //    $("#msSpan").addClass("hidden");
  //    $("#ms1").attr("checked",true);
  //  }else $("#msSpan").addClass("show");

  if($("#ms1").attr("checked")) showBallPanel(o.val().split(","));
  //else showUploadPanel();
  //缓存大小类
  setCookie("typeMemoryM",m,10000);
  setCookie("typeMemoryN",n,10000);
}
/*function loadPanel()
{//载入面板

var s=$("#subPanel").children("dt");

var d=$("#subPanel").children("dd");
var inputs = s.eq(m).find(":input");
var o = arguments[0] ? inputs.eq(Number(arguments[0])-1) : inputs.eq(n);
var t = $("#tipPanel");
var isDD = false;//手工模式时 3星组选和2星组选需要改变subPanel的显示
for(var i = 0;i < s.length;i++)
{
s.eq(i).removeClass("show");
if(i == m && isDD == false)
{
s.eq(i).addClass("show");
}
}
for(i = 0;i < d.length;i++)
{
if(isDD && (i == m - 1))
{
d.eq(i).addClass("show");
o = d.eq(i).find(":input").eq(0);

}
else d.eq(i).removeClass();
}

for(i = 0;i < inputs.length;i++) if(inputs.eq(i) == o) n = i;

o.attr("checked",true);
nam = o.attr("title");

t.html('<b>玩法提示：<b>'+getTipByName(nam));

clrSel();
var isDT =(m == 5 && n >= 0);//有胆拖的玩法
if(m==0)
{
$("#rndNum1").removeClass();$("#rndNum2").removeClass();$("#rndNum3").removeClass();
}
else
{
$("#rndNum1").addClass("hidden");$("#rndNum2").addClass("hidden");$("#rndNum3").addClass("hidden");
}
if(isDT)
$("#dtSpan").removeClass();
else
$("#dtSpan").addClass("hidden");
if(isDT == false && $("#ms3").prop("checked")) $("#ms1").attr("checked",true);

if($("#ms1").prop("checked"))
{
showBallPanel(o.val().split(","));
$("#dtSpan2").addClass("hidden");

}
else if($("#ms2").prop("checked"))
{

showUploadPanel();
$("#dtSpan2").addClass("hidden");
}
else if($("#ms3").prop("checked"))
{

showBallPanel("8,9".split(","));
$("#ballD").html("0");
$("#ballT").html("0");
$("#dtSpan2").removeClass("hidden");
}

setCookie("typeMemoryM",m,10000);
setCookie("typeMemoryN",n,10000);
}*/

function selBall(e)
{//选号处理
  e = e || window.event;
  var elem = (e.target) ? e.target : e.srcElement;
  if(elem.tagName == "B")
  {
    var isSel = elem.className != "sel";
    if(isSel && $("ms3").checked)
    {
      if(elem.parentNode.id == "dmDt" && getDanMa() >= nDanMax){bootbox.alert("[" + nam + "]最多只能选择" + nDanMax + "个胆码");return;}
      clrSameNum(elem);//清除胆码拖码之中相同的号码
    }
    //Showbo.Msg.alert(elem.parentNode.id);
    if(isSel && ( elem.parentNode.id == "same" || elem.parentNode.id == "nosame")  )
    {
      clrSameNums(elem);//清除同号/不同号之中相同的号码
    }


    elem.className = isSel ? "sel" : "";
    if($("#ms3").prop("checked")) collect_DtBall();//胆拖选号
    else collectBall(true,",",false);
  }
}

function getTipByName(gamename)
{
  //根据玩法获取奖金值和玩法说明
  //nRe 是手工单式正则
  //nPriM 每注奖金
  //alert(gamename);
  getPrizeList();
  var nbettip='';
  if(typeof json_data_cprize!="undefined"){
    for (var i in json_data_cprize) {
      //alert(json_data_cprize[i].lottypename);
      if (json_data_cprize[i].lottypename==gamename) {
        nPriM=json_data_cprize[i].win_money;
        nRe=json_data_cprize[i].nregx;
        nbettip=json_data_cprize[i].note + '，最高奖金：' + nPriM;
      }
    }
  }
  return nbettip;
}

/*function getTipByName(n)
{//根据玩法获取奖金值和玩法说明
var s = "[1-6]\\D*$";
switch(n)
{
case "和值" : {nPriM = p[10];nRe =  null;nDanMax = null;return "竞猜开奖号码的3个号码相加之和，选择1个或以上号码投注,奖金" + nPriM + "元;";}
case "三同号通选" : {nPriM = p[2];nRe = null;nDanMax = null;return "竞猜开奖号码为三同号(111、222、333、444、555、666)中任意一个，选择1个或以上号码投注，奖金<b>" + nPriM + "</b>元";}
case "三同号单选" : {nPriM = p[3];nRe =  null;nDanMax = null;return "竞猜开奖号码为111～666，选择1个或以上号码投注，奖金<b>" + nPriM + "</b>元";}
case "二同号复选" : {nPriM = p[4];nRe =  null;nDanMax = null;return "竞猜开奖号码的任意两位相同，选择1个或以上号码投注，奖金<b>" + nPriM + "</b>元";}
case "二同号单选" : {nPriM = p[5];nRe = null;nDanMax = null;return "竞猜开奖号码1个相同号码和1个不同号码投注，奖金<b>" + nPriM + "</b>元";}
case "三不同号" : {nPriM = p[6];nRe = new RegExp(s,"igm");nDanMax = 2;return "竞猜开奖号码选择3个不同号码投注，选择3个或以上号码投注，奖金<b>" + nPriM + "</b>元";}
case "二不同号" : {nPriM = p[7];nRe = new RegExp(s,"igm");nDanMax = 1;return "竞猜开奖号码选择2个号码投注，选择2个或以上号码投注，奖金<b>" + nPriM + "</b>元";}
case "三连号通选" : {nPriM = p[8];nRe =  null;nDanMax = null;return "竞猜开奖号码为三连号（123,234,345,456），选择1个或以上号码投注，奖金<b>" + nPriM + "</b>元";}
case "和值大小" : {nPriM = p[1];nRe =  null;nDanMax = null;return "竞猜开奖号码3位相加和值大于等于11为大，相反为小，奖金<b>" + nPriM + "</b>元";}
case "和值单双" : {nPriM = p[1];nRe =  null;nDanMax = null;return "竞猜开奖号码3位相加和值偶数为双，相反为单，奖金<b>" + nPriM + "</b>元";}

}
}
*/
function addNum()
{//提交所选号码
  var z,opt,m;
  if( $("#ms1").prop("checked"))
  {
    var temp = tmp.join("|");
    if(temp == ""){bootbox.alert("请至少选择1注号码");return;}
    opt = "[" + nam + "] " + temp;
    z = getMoney(opt);
    if(z <= 0){bootbox.alert("请至少选择1注号码");return;}
    m = z * pm * rate;
    addLi(nam,temp,m,z);
    betPri.push(nPriM);
  }
  else if( $("#ms3").prop("checked") )
  {
    var z = 0;
    var ball = getDtBall(false);
    var dtName = nam + "胆拖"
    if(ball[2] > 0 && ball[3] > 0)
    {
      var t = nDanMax + 1; //至少需要号码个数
      if(ball[2] + ball[3] < t) {bootbox.alert("请至少选择1注号码");return;}
      opt = ball[0] + "|" + ball[1];
      z = getMoney("[" + dtName + "] " + opt);
      if(z <= 0){bootbox.alert("请至少选择1注号码");return;}
      m = z * pm * rate;
      addLi(dtName,opt,m,z);
      betPri.push(nPriM);
      $("#ballD").html("0");
      $("#ballT").html("0");
    }
    else{bootbox.alert("请至少选择1个胆码和1个拖码");return;}

  }
  showBetBill(z);
  clrSel();
}

function removeByVal(arrylist , val) {
  for(var i = 0; i < arrylist .length; i++) {
    if(arrylist [i] == val) {
      arrylist .splice(i, 1);
      break;
    }
  }
}


function rndNum(n)
{//随机产生n行号码
  var c = [];
  var temp;
  var z = 0;
  var tempZ,tempM;
  var rndName = nam;
  var n1,n2,n3;
  for(var i = 1;i <= n;i++)
  {
    switch(nam)
    {
      case "三连号通选" :
      temp = 'abc';
      break;
      case "三同号通选" :
      temp = 'xxx';
      break;
      case "三不同号" :
      n1 = getRndNum(1,6);
      n2 = getRndNum(1,6);
      n3 = getRndNum(1,6);
      while(n2 == n1) n2 = getRndNum(1,6);
      temp = n1.toString() + "," + n2.toString();
      while(temp.indexOf(n3) >= 0) n3 = getRndNum(1,6);
      temp += "," + n3.toString();
      break;
      case "二不同号" :
      n1 = getRndNum(1,6);
      n2 = getRndNum(1,6);
      while(n2 == n1) n2 = getRndNum(1,6);
      temp = n1.toString() + "," + n2.toString();
      break;
      case "三同号单选" :
      n1 = getRndNum(1,6)*111;
      temp = n1;
      break;
      case "二同号复选" :
      n1 = getRndNum(1,6)*11+'x';
      temp = n1;
      break;
      case "和值大小":
      var NumAry =['大','小'];
      temp=NumAry[Math.floor((Math.random()*NumAry.length))];
      break;
      case "和值单双":
      var NumAry =['单','双'];
      temp=NumAry[Math.floor((Math.random()*NumAry.length))];
      break;
      case "二同号单选" :
      //$同号   = rand(1,6);
      var NumAry = [1,2,3,4,5,6];
      n1 = getRndNum(1,6);
      removeByVal(NumAry,n1);
      n2=NumAry[Math.floor((Math.random()*NumAry.length))];
      temp= (n1 * 11)+'|'+n2;
      break;
      case "和值" :
      n1 = getRndNum(3,18);
      temp = n1;
      break;

    }
    var opt = "[" + rndName + "] " + temp;
    tempZ = getMoney(opt);
    tempM = tempZ * pm * rate;
    z += tempZ;
    addLi(rndName,temp,tempM,tempZ);
    betPri.push(nPriM);
  }
  showBetBill(z);
}

function getMoney(temp)
{//一行号码的注数
  var reZ = 1;
  var re = /(\[[^\]]*\])/;
  var xName = temp.match(re);
  re = /(\[[^\]]*\])| +/g;
  var xNum = temp.replace(re,"");
  //Showbo.Msg.alert(xNum);
  switch(xName[0])
  {
    case "[和值]" :
    //和值的不同行的竖线去除
    xNum = (xNum.indexOf('|')>-1)?xNum.replace(/[\|]+/g,','):xNum;
    xNum = xNum.replace(/(^,|,$)/g,"");
    var valueArray = new Array(0,0,0,1,2,4,7,11,15,18,20,20,18,15,11,7,4,2,1);
    reZ = 0;
    var numArray = xNum.split(",");
    for(var i = 0;i < numArray.length;i++)
    {
      reZ += (numArray[i] == "") ? 0 : valueArray[numArray[i]];
    }
    break;
    case "[和值大小]" :
    case "[和值单双]" :
    case "[三同号单选]" :
    case "[二同号复选]" :
    reZ = 0;
    var xNumArray = xNum.split(",");
    reZ =xNumArray.length;
    break;

    case "[二同号单选]" :
    reZ = 0;
    var xNumArray = xNum.split("|");
    if(xNumArray.length >=2) {
      var NumArray_a = xNumArray[0].split(",");
      var NumArray_b = xNumArray[1].split(",");
      reZ = NumArray_a.length * NumArray_b.length;
    }
    break;

    case "[三同号通选]" :
    case "[三连号通选]" :
    reZ = 1;
    break;
    case "[二不同号]" :
    reZ = 0;
    var xNumArray = xNum.split(",");
    if(xNumArray.length >=2) {
      reZ = (xNumArray.length * (xNumArray.length - 1)) / 2;
    }
    break;
    case "[三不同号]" :
    reZ = 0;
    var xNumArray = xNum.split(",");
    if(xNumArray.length >=3) {
      reZ = (xNumArray.length * (xNumArray.length - 1) * (xNumArray.length - 2)) / 6;
    }
    break;

    case "[三不同号胆拖]" :
    case "[二不同号胆拖]" :
    reZ = 0;
    var xNumArray = xNum.split("|");
    if(xNumArray.length >=2) {
      var NumArray_a = xNumArray[0].split(",");
      var NumArray_b = xNumArray[1].split(",");
      var dLen = NumArray_a.length;
      var tLen = NumArray_b.length;
      if( dLen < 1 || dLen > nDanMax) return 0;
      reZ = combNum(tLen,nDanMax - dLen + 1);
    }
    break;


    default :
    bootbox.alert("错误的彩票标识名,请与管理员联系");
    reZ = 0;
  }
  return reZ;
}

function createQiArr()
{//创建期号列表数组
  var tmpDate = new Date(nowQi.substr(0,4),Number(nowQi.substr(4,2)) - 1,nowQi.substr(6,2));
  var tmpDateStr = date2Qi(tmpDate);
  var tmpQi = Number(nowQi.substr(9,3));
  if(stopQi != "0") keepMax = diffQi(nowQi,stopQi,qiMax);//根据开始休市期号确实追号最大期数
  qiArr = [];
  for(var i = 0;i < keepMax;i++)
  {
    qiArr[i] = tmpDateStr + "-" + addZero(tmpQi);
    tmpQi++;
    if(tmpQi > qiMax)
    {
      tmpQi = 1;
      tmpDate.setDate(tmpDate.getDate() + 1);
      tmpDateStr = date2Qi(tmpDate);
    }
  }
  var keepQiList = $("#keepQiList");

  keepQiList.empty();
  var option = $("<option>").val(qiArr[0]).text(qiArr[0] + "(当前期)");
  keepQiList.append(option);

  for(i = 1;i < qiArr.length;i++) {
    option = $("<option>").val(qiArr[i]).text(qiArr[i] );
    keepQiList.append(option);
  }
  chgKeepFirstQi(0);
}

function getCt(s){
  return 0;
}

String.prototype.myTrim = function()
{
  var lines = new Array();
  lines = this.split("\n");       // 按行分隔处理，否则 /\s/g 可能会匹配到换行符
  var out = "";
  for(var i=0;i<lines.length;i++)
  {
    out += lines[i].replace(/\s*/g, "") + "\n";   // 删除空格
  }
  return out;
}
function bet()
{
  //提交投注
  var msg; //fix20161201
  if(showLoginPanle()) return;
  if(isStop)
  {
    bootbox.alert(stopTip);return;
  }
  if($("#ms1").prop("checked"))
  {
    selectid='复式'
  }else
  {
    selectid='单式'
  };
  var i;
  var selectList = $D("selectList"); //fix20161201
  var tab = $D("keepTab");
  var isHemai = $D("isHemai");
  var isKeep = $D("isKeep");
  var tempLi = [];
  var tempQi = [];
  var tempBs = [];
  var stopKeep;
  var lis = document.getElementsByName("selLiValue");
  var lotteryid = Number($("#lotteryid").val());
  if(lis.length > maxLength)
  {
    bootbox.alert("单次投注,号码不能超过" + maxLength + "行");return;
  }
  if(lis.length <= 0)
  {
    bootbox.alert("请至少选择1注号码");return;
  }
  if(nAllQ <= 0)
  {
    bootbox.alert("请至少选择1期");return;
  }
  for(i = 0;i < lis.length;i++) tempLi[i] = lis[i].value+" (" + selectid + ")";
  if(isKeep.checked)
  {
    for(i = 1;i < tab.rows.length;i++)
    {
      if(tab.rows[i].cells[0].childNodes[0].checked)
      {
        tempQi.push(tab.rows[i].cells[1].innerHTML);
        tempBs.push(tab.rows[i].cells[2].childNodes[0].childNodes[0].value);
      }
    }
    stopKeep = $D("stopKeep").checked ? 0 : 1;
  }
  else
  {
    tempQi[0] = nowQi;
    tempBs[0] = $("#noKeepBeishu").val();
    stopKeep = 0;
    nEstPri = sumBetPrize();
  }
  var sLi = tempLi.join(";"); //多次下注之间用分号隔开
  var sQi = tempQi.join(",");
  var sBs = tempBs.join(",");
  var xName = getBetName(sLi);
  var iCt = getCt(xName);
  var sData;
  if(isHemai.checked)  //如果合买
  {
    //合买投注

    if(adviseNum($D("hm_feng"),nBetM) == false) return;//份数是否能除尽

    var title = replaceWord($("#hm_title").val());
    //alert('');
    var content  = replaceWord($("#hm_content").val());

    var hm_ticheng = $("#ticheng").children('option:selected').val();
    var hm_pass = ($D("hm_buyer2").checked && hm_pass != "") ? $("#hm_pass").val() : "";

    var isShow = $('input[name="hm_pub"]:checked').val();    //发布即公开
    var isCancel = ($D("isCancel").checked) ? "1" : "0";
    var feng =  Number($("#hm_feng").val());
    var ifeng = Number($("#hm_ifeng").val());
    var baodi = Number($("#hm_baodi").val());
    var imoney = $("#hm_imoney").html();

    var fMinNum = feng * fMin / 100;//最低认购限制
    var bMinNum = feng * bMin / 100;//最低保底限制
    var sfeng = feng - ifeng;//剩余份数
    if((Number(ifeng)/Number($("#keepQi").val())) != Math.ceil(Number(ifeng) / Number($("#keepQi").val())))
    {
      bootbox.alert("认购份数必须是追号的整数倍！");

      return;
    }
    if(sfeng < 0)
    {
      bootbox.alert("发起人认购份数不能大于总份数！");
      $D("hm_ifeng").focus();
      return;
    }
    if(ifeng == "" || ifeng == 0)
    {
      bootbox.alert("发起人认购份数不能为空或0！");
      $D("hm_ifeng").focus();
      return;
    }
    if(ifeng < fMinNum)
    {
      bootbox.alert("发起人认购份数不能小于总份数的 " + fMin + "%，最少要认购 "+ Math.ceil(fMinNum) +" 份！");
      $D("hm_ifeng").focus();
      return;
    }
    if($D("isBaodi").checked)
    {
      if((Number(baodi)/Number($("#keepQi").val())) != Math.ceil(Number(baodi) / Number($("#keepQi").val())))
      {
        bootbox.alert("保底份数必须是追号的整数倍！");

        return;
      }
      if(baodi > sfeng)
      {
        bootbox.alert("保底份数不能大于剩余份数！");
        $D("hm_baodi").focus();
        return;
      }
      if(baodi < bMinNum && baodi < sfeng)
      {
        bootbox.alert("保底份数不能小于总份数的" + bMin + "%，最少要保底 "+ (Math.ceil(bMinNum) > sfeng ? sfeng : Math.ceil(bMinNum)) +" 份！");
        $D("hm_baodi").focus();
        return;
      }
    }

    msg="请确认您的合买方案：<br/>单倍金额：<b>" + nAllM + "</b>元<br/>共计追号：" + nAllQ + "期<br/>方案总额：" + nBetM + "元<br/>方案分为：" + feng + "份<br/>自己认购：" + ifeng + "份<br/>认购金额：" + imoney + "元<br/>保底设置：" + ((Number(baodi) > 0) ? "保底" + baodi + "份" : "不保底");

    sData = "ctype=" + escape(xName) + "&ct=" + iCt + "&cpcontent=" + escape(sLi) + "&qi=" + sQi + "&bei=" + sBs + "&s=" + stopKeep + "&h=1&title=" + escape(title) + "&content=" + escape(content) + "&hm_pass=" + escape(hm_pass) + "&hm_ticheng=" + escape(hm_ticheng) + "&cprize=" + nEstPri + "&isshow=" + isShow + "&iscancel=" + isCancel + "&feng=" + feng + "&ifeng=" + ifeng + "&baodi=" + baodi;
    sData += "&r=" + rate+"&lotteryid=" + lotteryid;
    bootbox.confirm(msg,function(btn){if (btn==true) {post(sData,"/app/buy.php");}else{return;}});
  }
  else
  {
    msg="请确认您的投注：<br/>单倍金额：" + nAllM + "元<br/>追号期数：" + nAllQ + "期<br/>共计投注：" + nBetM + "元";
    sData = "ctype=" + escape(xName) + "&ct=" + iCt + "&cpcontent=" + escape(sLi) + "&qi=" + sQi + "&bei=" + sBs + "&s=" + stopKeep + "&h=0&cprize=" + nEstPri;
    sData += "&r=" + rate+"&lotteryid=" + lotteryid;
    bootbox.confirm(msg,function(btn){if (btn==true) {post(sData,"/app/buy.php");}else{return;}});
  }
}

/*function bet()
{//提交投注
if(showLoginPanle()) return;
if(isStop){bootbox.alert(stopTip);return;}
if($("#ms1").prop("checked") ||$("#ms3").prop("checked")) {selectid='复式' }else{ selectid='单式'};
var i;
var tab = $D("keepTab");
var isHemai = $D("isHemai");
var isKeep = $D("isKeep");
var tempLi = [];
var tempQi = [];
var tempBs = [];
var stopKeep;
var lis = document.getElementsByName("selLiValue");
var lotteryid = Number($("#lotteryid").val());
if(lis.length > maxLength){bootbox.alert("单次投注,号码不能超过" + maxLength + "行");return;}
if(lis.length <= 0){bootbox.alert("请至少选择1注号码");return;}
if(nAllQ <= 0){bootbox.alert("请至少选择1期");return;}
for(i = 0;i < lis.length;i++) tempLi[i] = lis[i].value+" (" + selectid + ")";
if(isKeep.checked)
{
for(i = 1;i < tab.rows.length;i++)
{
if(tab.rows[i].cells[0].childNodes[0].checked)
{
tempQi.push(tab.rows[i].cells[1].innerHTML);
tempBs.push(tab.rows[i].cells[2].childNodes[0].childNodes[0].value);
}
}
stopKeep = $D("stopKeep").checked ? 0 : 1;
}
else
{
tempQi[0] = nowQi;
tempBs[0] = $("#noKeepBeishu").val();
stopKeep = 0;
nEstPri = sumBetPrize();
}
var sLi = tempLi.join(".");
var sQi = tempQi.join(",");
var sBs = tempBs.join(",");
var xName = getBetName(sLi);
var iCt = getCt(xName);
var sData;
if(isHemai.checked)
{//合买投注
if(adviseNum($D("hm_feng"),nBetM) == false) return;//份数是否能除尽
var title = replaceWord($("#hm_title").val());
var content  = replaceWord($("#hm_content").val());
var hm_buyer = $("#hm_buyer").val();
var yonghu = ($D("hm_buyer2").checked && hm_buyer != "") ? hm_buyer : "";
var isShow = ($D("hm_pub2").checked) ? "0" : "1";
var isCancel = ($D("isCancel").checked) ? "1" : "0";
var feng =  Number($("#hm_feng").val());
var ifeng = Number($("#hm_ifeng").val());
var baodi = Number($("#hm_baodi").val());
var imoney = $("#hm_imoney").html();
if(ifeng == "" || ifeng == 0)
{
//Showbo.Msg.alert("发起人认购份数不能为空或0！");
bootbox.alert("发起人认购份数不能为空或0！");
$D("hm_ifeng").focus();
return;
}
var fMinNum = feng * fMin / 100;//最低认购限制
var bMinNum = feng * bMin / 100;//最低保底限制
var sfeng = feng - ifeng;//剩余份数
if(sfeng < 0)
{
//Showbo.Msg.alert("发起人认购份数不能大于总份数！");
bootbox.alert("发起人认购份数不能大于总份数！");
$D("hm_ifeng").focus();
return;
}
if(ifeng < fMinNum)
{
bootbox.alert("发起人认购份数不能小于总份数的 " + fMin + "%，最少要认购 "+ Math.ceil(fMinNum) +" 份！");
//Showbo.Msg.alert("发起人认购份数不能小于总份数的 " + fMin + "%，最少要认购 "+ Math.ceil(fMinNum) +" 份！");
$D("hm_ifeng").focus();
return;
}
if($D("isBaodi").checked)
{
if((Number(baodi)/Number($("#keepQi").val())) != Math.ceil(Number(baodi) / Number($("#keepQi").val())))
{
bootbox.alert("保底份数必须是追号的整数倍！");

return;
}

if(baodi > sfeng)
{
bootbox.alert("保底份数不能大于剩余份数！");
//Showbo.Msg.alert("保底份数不能大于剩余份数！");
$D("hm_baodi").focus();
return;
}
if(baodi < bMinNum && baodi < sfeng)
{
bootbox.alert("保底份数不能小于总份数的" + bMin + "%，最少要保底 "+ (Math.ceil(bMinNum) > sfeng ? sfeng : Math.ceil(bMinNum)) +" 份！");
//Showbo.Msg.alert("保底份数不能小于总份数的" + bMin + "%，最少要保底 "+ (Math.ceil(bMinNum) > sfeng ? sfeng : Math.ceil(bMinNum)) +" 份！");
$D("hm_baodi").focus();
return;
}
}
msg="请确认您的合买方案：<br/>单倍金额：" + nAllM + "元<br/>共计追号：" + nAllQ + "期<br/>方案总额：" + nBetM + "元<br/>方案分为：" + feng + "份<br/>自己认购：" + ifeng + "份<br/>认购金额：" + imoney + "元<br/>保底设置：" + ((Number(baodi) > 0) ? "保底" + baodi + "份" : "不保底");
sData = "ctype=" + escape(xName) + "&ct=" + iCt + "&cpcontent=" + escape(sLi) + "&qi=" + sQi + "&bei=" + sBs + "&s=" + stopKeep + "&h=1&title=" + escape(title) + "&content=" + escape(content) + "&yonghu=" + escape(yonghu) + "&cprize=" + nEstPri + "&isshow=" + isShow + "&iscancel=" + isCancel + "&feng=" + feng + "&ifeng=" + ifeng + "&baodi=" + baodi;
sData += "&r=" + rate+"&lotteryid=" + lotteryid;
bootbox.confirm(msg,function(btn){if (btn==true) {post(sData,"/app/buy.php");}else{return;}});
//Showbo.Msg.confirm(msg,function(btn){if (btn=="yes") {post(sData,"/app/buy.php");}else{return;}});
}
else
{
msg="请确认您的投注：<br/>单倍金额：" + nAllM + "元<br/>追号期数：" + nAllQ + "期<br/>共计投注：" + nBetM + "元";
sData = "ctype=" + escape(xName) + "&ct=" + iCt + "&cpcontent=" + escape(sLi) + "&qi=" + sQi + "&bei=" + sBs + "&s=" + stopKeep + "&h=0&cprize=" + nEstPri;
sData += "&r=" + rate+"&lotteryid=" + lotteryid;
bootbox.confirm(msg,function(btn){if (btn==true) {post(sData,"/app/buy.php");}else{return;}});
//Showbo.Msg.confirm(msg,function(btn){if (btn=="yes") {post(sData,"/app/buy.php");}else{return;}});
}
}
*/
//++++++++++++++++++++++++++++++++++++++++++++++++
//重写的函数
