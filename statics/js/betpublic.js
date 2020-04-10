/**
* fix: 201600502
* 漏号开奖等数据
* 适用于所有彩种
* 合买和追号等面板控制
*/

Array.prototype.unique = function()
{
  var n =
  {
  },r=[]; //n为hash表，r为临时数组
  for(var i = 0; i < this.length; i++) //遍历当前数组
  {
    if (!n[this[i]]) //如果hash表中没有当前项
    {
      n[this[i]] = true; //存入hash表
      r.push(this[i]); //把当前数组的当前项push到临时数组里面
    }
  }
  return r;
};

function bindInputChangeEvent(obj,callfunc)
{
  //绑定监听值变化事件
  try
  {
    if(isIE())//IE
    {
      obj.attachEvent("onpropertychange",callfunc);
    }
    else
    {
      obj.addEventListener("input",callfunc,false);
    }
  }
  catch(e)
  {
  }
}

var intervalId=0;
function initPage()
{
  //初始化投注页面
  setPrize();
  loadType();
  getRemoteTime();
  showTime();

  //每秒判断一次时间
  setInterval("showTime();",1000);
  setInterval("getRemoteTime();",10000);
  $(document).ready(function()
    {
      $("#noKeepBeishu").keyup(function()
        {
          chgNoKeepBeishu();
        });
      $("#keepQi").keyup(function()
        {
          loadKeepList();
        });
      $("#uploadTmp").keyup(function()
        {
          collectUpload();
        });
      $("#hm_feng").keyup(function()
        {
          intHmValue();
        });
      $("#hm_baodi").keyup(function()
        {
          intHmValue();
        });
      $("#hm_ifeng").blur(function()
        {
          intHmValue();
        });
    });
  //bindInputChangeEvent($("#uploadTmp"),collectUpload);
  //  bindInputChangeEvent($("#hm_feng"),intHmValue);
  //  bindInputChangeEvent($("#hm_baodi"),intHmValue);
  //  bindInputChangeEvent($("#hm_ifeng"),intHmValue);
  //  bindInputChangeEvent($("#noKeepBeishu"),chgNoKeepBeishu);
  //  bindInputChangeEvent($("#keepQi"),loadKeepList);
  //初始化页面加载历史开奖数据
  loadData(showData,dataPath); //showData = true是否显开奖数据
  //间隔时间加载开奖数据,进行修复改进fix20160411
  //改进:由showTime中判断nowQi最新期号产生时触发,
  //然后在loadData中判断yyhit_qi[1]与nowqi差值为1时,
  //使用window.clearInterval(intervalId)结束,赋值intervalId为0
  //intervalId=setInterval("loadData(showData,dataPath);",timeInt); //这里弃用
}

function getRate()
{
  //获取当前元角分模式
  var backval=defaultrate;
  var tmpRate = Number(getCookie("betRate"));
  var rds = document.getElementsByName("rateSwitch");
  if(rds.length>0){
    for(var i = 0;i < rds.length;i++)
    {
      if(tmpRate == Number(rds[i].value))
      {
        rds[i].checked = true;
        return tmpRate;
      }
    }
    //如果以上没有找到Cookies中保存的模式，则选中第1个模式
    rds[0].checked = true;
    setCookie("betRate",rds[0].value,10000,"/");
    backval=Number(rds[0].value);
  }
  return backval;
}

function setPrize(r)
{
  //根据元角模式转换奖金
  rate = getRate();
  //设置P数组记录奖金表
  for(var i = 0;i < setArr[0].length;i++) p[i + 1] = Number(setArr[0][i]) * (rate * 100) / 100;
  $("#hm_feng").val( 100 * rate);//设置合买股份设置的初始值
}

function getPrizeList(){
  if(typeof json_data_cprize=="undefined"){
    var lotid=$("#lotteryid").val();
    doAjax(
      "../../config/betprice.php",
      {
        "lotteryid":lotid
      },
      "json",
      function (json)
      {
        if(json.res==1){
          json_data_cprize=json.List;
        }
      },false);
  }
}

function loadType()
{
  //载入玩法
  $("#playType div").removeClass("seled");
  $("#playType div").click(function()
    {
      $("#playType div").removeClass("seled");
      $("#playType div").eq($(this).index()).addClass("seled");
      m = $("#playType div").eq($(this).index()).attr("tabIndex");
      n = arguments[0] ? Number($("#playType div").eq($(this).index()).attr("defaultchecked")) : dn;
      loadPanel();
    });
  $("#playType div").eq(m).addClass("seled");
  loadPanel();
}

function loadTypeMemory(t,d)
{
  //获取用户在当前彩种最后选取的玩法 t=玩法大类或小类 d=缺省值
  var r;
  var s = t == 0 ? getCookie("typeMemoryM") : getCookie("typeMemoryN");
  try
  {
    r = typeof(s) == "undefined" ? d : Number(s);
  }
  catch(e)
  {
    r = d;
  }
  return r;
}
/*
function getDateString()
{
//暂时不用
var now = new Date();
var year = now.getFullYear(); //年
var month = now.getMonth() + 1; //月
var day = now.getDate(); //日
if (month < 10)
{
month = "0"+month;
}
if (day < 10)
{
day = "0"+day;
}
return year  + '' + month + '' + day;　　
}
*/
function date2Qi(d)
{//日期转换成期号的日期前缀
  return d.getFullYear() + addZero(d.getMonth() + 1) + addZero(d.getDate());
}

function vbsDate2JsDate(s)
{
  //VBS日期格式转换成JS日期
  var p = s.split(" ");
  var re = /\D+/img;
  p[0] = p[0].split(re);
  if(p.length < 2) p[1] = "00:00:00";
  p[1] = p[1].split(re);
  return new Date(p[0][0],Number(p[0][1]) - 1,p[0][2],p[1][0],p[1][1],p[1][2])
}

function replaceWord(s)
{//替换敏感字符
  return s.replace(/'/igm,"‘").replace(/;/igm,"；").replace(/\(/igm,"（").replace(/\)/igm,"）").replace(/\*/igm,"＊").replace(/%/igm,"％");
}

function mySplit(str,separator)
{//给每个数字之间加入separator字符并清除其他非数字符
  return str.match(/\d/igm).join(separator);
}
function objsToArray(objs)
{//对象集合转换成数组

  if(objs.length)
  {
    var len = objs.length;
    var array = [];
    while(len--){ array[len] = objs.eq(len);}
  }
  return array;
}

/**
*
* Enter description here ...
* @param unknown_type $_sql
* @param unknown_type $_info
*/
function getRndNum(under,over)
{
  //产生一个under到over之间的随机整数
  return parseInt(Math.random() * (over - under + 1) + under);
}

function combNum(n,m)
{//组合个数
  if(n <= 0 || m <= 0 || m > n) return 0;
  if(m == n) return 1;
  var r1 = 1;
  var r2 = 1;
  for(var i = 0;i < m;i++)
  {
    r1 *= (n - i);
    r2 *= (i + 1);
  }
  return (r1 / r2);
}

function isRepeat(a)
{
  //数组是否有重复的元素
  var hash =
  {
  };
  for(var i in a)
  {
    if(hash[a[i]]) return true;
    hash[a[i]] = true;
  }
  return false;
}
/*
function createElementOnElement(box,tag,id)
{//在BOX对象上创建标签为tag,id为id的对象并返回
  var e = document.createElement(tag);
  e.id = id;
  box.appendChild(e);
  return e;
}
*/
/*
function getAbsPoint(e)
{//对象在文档中的绝对坐标
  var x = e.offsetLeft,y = e.offsetTop;
  while(e = e.offsetParent)
  {
    x += e.offsetLeft;
    y += e.offsetTop;
  }
  return [x,y];
}
*/
/*
function loadNewLabelBox(o)
{
//创建或载入new标识的容器（暂时不用）
var labelBox = $D("newLabelBox") ? $D("newLabelBox") : createElementOnElement(document.getElementsByTagName("BODY")[0],"div","newLabelBox");
var pos = getAbsPoint(o);
labelBox.style.left = (pos[0] - 8) + "px";
labelBox.style.top = (pos[1] + 25) + "px";
return labelBox;
}
*/
function chkInt(v)
{//正整数格式
  var re = /^\d+$/;
  return !re.test(v);
}
function buy(id)
{
  //合买列表快捷认购（合买才用）

  if(showLoginPanle()) return;
  var url = "/app/add.php";

  if (arguments[1]) url = arguments[1] + url;

  var o = $("#buy_" + id);
  var f = $("#feng_" + id);
  var p = $("#pc_" + id);
  var ti = $("#ticheng_" + id).val();
  var pm = o.attr("perMoney");
  var af = o.attr("allFeng");

  var lv = Number(f.html());
  var feng = o.val();
  var bm = pm * feng;//认购金额
  var lf = lv - feng;//剩余份数

  if(chkInt(feng))
  {
    Showbo.Msg.alert("认购份数只能是整数！");
    o.focus();
    return;
  }

  if(lv <= 0)
  {
    Showbo.Msg.alert("此方案已满员！");
    return;
  }

  if(feng - lv > 0)
  {
    Showbo.Msg.alert("认购份数不能大于剩余份数");
    o.select();
    return;
  }
  var tialert="发起人无提成";
  if(parseInt(ti)>0){
    tialert="提醒：发起人已设置提成" + ti + "%";
  }
  var msg="您认购：" + feng + "份，金额" + formatCurrency(bm) + "元<br />" + tialert;
  var sData = "id=" + id + "&ifeng=" + feng;
  Showbo.Msg.confirm(msg,function(btn)
    {
      if (btn=="yes")
      {
        var sData = "id=" + id + "&ifeng=" + feng;
        var xmlhttp = createXMLHTTP();
        xmlhttp.open("POST",url,false);
        xmlhttp.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded;charset=utf-8");
        xmlhttp.send(sData);
        switch(xmlhttp.status)
        {
          case 200 :
          var reText = xmlhttp.responseText;
          if (reText.indexOf('成功') >= 0)
          {
            f.html(lf);
            p.html( formatPercent((af - lf) / af));
            o.val("1");
          }
          Showbo.Msg.alert(reText); //返回网页内容
          break;
          case 401 :
          //Showbo.Msg.alert("没有权限！");
          break;
          case 503 :
          top.location.replace("/404.html");
          break;
          default :
          Showbo.Msg.alert(xmlhttp.status + "错误，请与管理员联系");
        }
      }else
      {
        return;
      }
    });
}

function showBallPanel(s)
{
  //载入选号面板（有用）
  $("#uploadPanel").hide();
  $("#ballPanel").show();
  var i;
  var dt = $("#ballPanel").children("dt");
  var dd = $("#ballPanel").children("dd");
  for(i = 0;i < dt.length;i++)
  {
    dt.eq(i).removeClass();
    //   dt.eq(i).removeClass("hidden2");
  }
  for(i = 0;i < dd.length;i++)
  {
    dd.eq(i).removeClass();
    // dd.eq(i).removeClass("hidden2");
  }

  for(i = 0;i < s.length;i++) dt.eq(s[i]).addClass("show");
  for(i = 0;i < s.length;i++) dd.eq(s[i]).addClass( showData ? "show" : "show hidden2");
}

function showUploadPanel()
{
  //载入手工面板（有用）
  $("#uploadPanel").show();
  $("#ballPanel").hide();
  $("#lineMax").html( maxLength.toString());
}

function collectBall(sepBall)
{
  //有用重要
  //收集并计算所选号码和注数
  //第一个参数是自定义同一行每个号码之间是否使用分割符的开关,true为自定义
  //第二个参数是自定义同一行号码之间的分割符,若不设置,默认为,
  //第三个参数是自定义同一行每个号码之间前面补零的开关,true为补零
  tmp = []; //全局下注列表数组
  var sepStr = arguments[1] ? arguments[1] : ",";
  var dt = $("#ballPanel").children("dt");
  var i,ii,divs,sels;
  for(var i = 0;i < dt.length;i++)
  {
    if(dt.eq(i).hasClass("show"))
    {
      divs = dt.eq(i).children("b");
      sels = "";
      //遍历每一行的号码
      for(ii = 0;ii < divs.length;ii++)
      {
        if(divs.eq(ii).hasClass("sel"))
        {
          var onecode=divs.eq(ii).html();
          //空格\t或换行内容去掉
          onecode = onecode.replace(/[ \t\r\n]+/g,"");
          sels += ((sepBall && sels != "")?sepStr:"") + (arguments[2] ? addZero(onecode) : onecode);
        }
      }
      if(sels != "" || sepBall == false){
        tmp.push(sels);
      }else{
        tmp.push(null);
      }
    }
  }
  //alert(tmp);
  var zhushu = getMoney("[" + nam + "] " + tmp.join("|"));
  $("#selZ").html(zhushu);
  $("#selM").html(formatCurrency(zhushu * pm * rate));
}

function collectUpload()
{
  //收集手工模式输入的号码和注数
  var uploadTmp = $("#uploadTmp");
  var tmpVal = uploadTmp.val();
  tmpArr = tmpVal.match(nRe);
  var zhushu = (tmpArr == null) ? 0 : tmpArr.length;
  $("#selZ").html(zhushu);
  $("#selM").html(formatCurrency(zhushu * pm * rate));
}

function collectDtBall()
{
  //收集并显示胆拖面板选号注数
  var zhushu = 0;

  var ball = getDtBall(true);   //收集选号情况

  if(ball[2] > 0 && ball[3] > 0)
  {
    var td = (nDanMax + 1) - ball[2];
    zhushu = combNum(ball[3],td);
  }
  $("#ballD").html(ball[2]);
  $("#ballT").html(ball[3]);
  $("#selZ").html(zhushu);
  $("#selM").html(formatCurrency(zhushu * pm * rate));
}


function collect_DtBall()
{
  //收集并显示胆拖面板选号注数
  var zhushu = 0;

  var ball = getDtBall(false);  //收集选号情况


  if(ball[2] > 0 && ball[3] > 0)
  {
    var td = (nDanMax + 1) - ball[2];
    zhushu = combNum(ball[3],td);
  }
  $("#ballD").html( ball[2]);
  $("#ballT").html(ball[3]);
  $("#selZ").html(zhushu);
  $("#selM").html(formatCurrency(zhushu * pm * rate));
}


function getDtBall(a)
{
  //获取胆拖面板选号情况 a参表示号码前是否加0 返回 b=[胆码,拖码,胆码个数,拖码个数]
  var b = [[],[],0,0];
  var ds1 = $D("dmDt").getElementsByTagName("B");
  var ds2 = $D("tmDt").getElementsByTagName("B");
  for(var i = 0;i < ds1.length;i++)
  {
    if(ds1[i].className == "sel")
    {
      b[0].push(a ? addZero(ds1[i].innerHTML.replace(/[ \t\r\n]+/g,"")) : ds1[i].innerHTML.replace(/[ \t\r\n]+/g,""));b[2]++;
    }
    if(ds2[i].className == "sel")
    {
      b[1].push(a ? addZero(ds2[i].innerHTML.replace(/[ \t\r\n]+/g,"")) : ds2[i].innerHTML.replace(/[ \t\r\n]+/g,""));b[3]++;
    }
  }
  return b;
}

function getDanMa()
{
  //已选胆码的个数
  var x = 0;
  var divs = $D("dmDt").getElementsByTagName("B");
  for(var i = 0;i < divs.length;i++) if(divs[i].className == "sel") x++;
  return x;
}

function clrSameNum(o)
{
  //胆码拖码不能有同一号码,o点击的号码对象，修复过滤空格2020
  var divsLine = o.parentNode.id == "dmDt" ? $D("tmDt").getElementsByTagName("B") : $D("dmDt").getElementsByTagName("B");
  var ub = Number(o.innerHTML.replace(/[ \t\r\n]+/g,"")) - 1;
  divsLine[ub].className = "";
}

function clrSameNums(o)
{
  //同号/不同号不能有同一号码,o点击的号码对象，修复过滤空格2020
  var divsLine = o.parentNode.id == "same" ? $D("nosame").getElementsByTagName("B") : $D("same").getElementsByTagName("B");
  var str=o.innerHTML.replace(/[ \t\r\n]+/g,"").substring(0,1);
  var ub = Number(str) - 1;
  divsLine[ub].className = "";
}

function addLi(n,c,m,z)
{
  //增加一行号码
  var ul = $D("codeList");
  var li = document.createElement("li");
  var html = "<span class=\"iblock\"><u>[" + n + "]</u> <b>" + c + "</b></span>"
  + "<s><i>[" + formatCurrency(m) + "]</i><a title=\"" + z + "注\" href=\"javascript:void(0)\" onclick=\"delLi(this)\">删除</a></s>"
  + "<input type=\"hidden\" name=\"selLiValue\" value=\"[" + n + "] " + c + "\" />";
  li.innerHTML = html;
  ul.appendChild(li);
}

function delLi(a)
{
  //删除一行号码
  var lis = $D("codeList").getElementsByTagName("li");
  var li = a.parentNode;
  while(li.tagName != "LI") li = li.parentNode;
  for(var i = 0;i < lis.length;i++) if(lis[i] === li)
  {
    betPri.splice(i,1);break;
  }//已投注奖金
  tempZ = Number(a.title.replace("注",""));
  $D("codeList").removeChild(li);
  showBetBill(-tempZ);
}

function clrSel()
{
  //清除选号面板
  var div = $("#ballPanel").children("DT").children("b");
  for(var i = 0;i < div.length;i++)
  {
    div.eq(i).removeClass();
    //   div.eq(i).removeClass("sel");
    //    div.eq(i).removeClass("hidden2");
  }
  tmp = [];
  tmpArr = [];
  $("#uploadTmp").val("");
  $("#selZ").html("0");
  $("#selM").html("￥0.00");
  //$("panelTool").className = "hidden";//防止选号工具面板残留
}
function showUserMoney(obj)
{
  //显示用户可用余额
  if(!obj==null)
  {
    obj.html("正在查询...");
  }
  $("#userMoney").html("正在查询...");
  doAjax(
    "/public/check.php?" + Math.random(),
    "",
    "json",
    function (json)
    {

      if(json.res==1)
      {
        $("#userMoney").html("请先登录...");
        if(showLoginPanle()) return;
      }
      else
      {
        $("#userMoney").html(json.allmoney);

      }
    },true);//fixdoAjax
}
function clrAll(suc)
{
  //清除投注单
  //$("selectList").options.length = 0;
  $("#codeList").html("");
  document.getElementById("hm_form").reset();
  //  $("#hm_form").reset();
  chgNoKeepBeishuValue(1);//重置倍数
  showBetBill(-Number($("#allZ").html()));
  betPri = [];//已投注奖金

  if(suc)//如果是投注成功 则处理
  {
    nAllB=1;
    if($("#isHemai").attr("checked")) $D("isHemai").click();//关闭合买和追号面板
    if($("#isKeep").attr("checked")) $D("isKeep").click();
    if(/￥/.test($("#userMoney").html())) showUserMoney($("#userMoney"),'../../users/');
  }
}

function showBetBill()
{
  //全局金额相关
  var allZ = $("#allZ");
  var allM = $("#allM");
  var allQ = $("#allQ");
  var betM = $("#betM");
  if(arguments[0]) allZ.html(Number(allZ.html().replace(/[^0-9]+/g,'')) + arguments[0]);
  nAllM = Number(allZ.html()) * 10000 * pm * rate / 10000;//乘以10000解决浮点精度问题
  allM.html(  formatCurrency(nAllM));
  if($("#isKeep").attr("checked")) sumKeepBeisu();
  allQ.html( nAllQ);
  nBetM = nAllM * nAllB;
  $("#hm_feng").val( nBetM);
  if($("#isHemai").attr("checked")) refHmPanel();
  betM.html( formatCurrency(nBetM));
}

function getLen(xNum,r)
{
  //计算号码xNum前r位形成的注数(弃用)
  //xNum是面板上用户点击的号码球
  var reLen = 1;
  var re = "|";
  //alert(xNum);
  //alert(xNum.length);
  if(!xNum.match(re)) return xNum.length; //无|线分隔符时，为单行号码
  var numArray = xNum.split(re);  //按|线分隔符分多行
  for(var i = 0;i < numArray.length;i++)
  {
    if(i > (numArray.length - (r + 1))) reLen *= numArray[i].length;
  }
  return reLen;
}

function setExtenPanel(o,d)
{
  //显示或隐藏合买追号面板
  $("#"+d).css("display",o.checked ? "block" : "none");
  switch(d)
  {
    case "extenHemai" :
    refHmPanel();
    break
    case "extenKeep" :
    $("#noKeepSet").css("display", o.checked ? "none" : "");
    if(o.checked) loadKeepList();
    else
    {
      chgKeepQiValue(1);
      chgNoKeepBeishu();
    }
    break;
  }
}

function getBetName(s)
{
  //获取投注单玩法
  var re = /(\[[^\]]*\])+/igm;
  var xNameArray = s.match(re);
  if(xNameArray)
  {
    for(var i = 1;i < xNameArray.length;i++) if(xNameArray[0] != xNameArray[i]) return "[混合投注]";
    return xNameArray[0];
  }
  else return "";
}

function sumBetPrize()
{
  //获取投注单已投注奖金总额
  var r = 0;
  if(nEstPriTmp > 0)
  {
    r = nEstPriTmp;nEstPriTmp = 0;return r;
  }
  var b = betPri.unique();//去掉重复的奖金额
  for(var i = 0;i < b.length;i++) if(b[i]) r += b[i];//累加
  return r;
}

function diffQi(q1,q2,qm)
{
  //带-号的两个期号相差的期数（高频彩）
  var arr1 = q1.split("-");
  var arr2 = q2.split("-");
  var d1 = new Date(Number(arr1[0].substr(0,4)),Number(arr1[0].substr(4,2)) - 1,Number(arr1[0].substr(6,2)));
  var d2 = new Date(Number(arr2[0].substr(0,4)),Number(arr2[0].substr(4,2)) - 1,Number(arr2[0].substr(6,2)));
  var ca = daysElapsed(d2,d1);
  return Number(arr2[1]) - Number(arr1[1]) + (ca * qm);
}

/*****************************合买相关 开始**********************************/
function refHmPanel()
{
  //更新合买面板
  if(stopEvent) return;
  var M = nBetM;
  var feng = $("#hm_feng");
  var pm = $("#hm_pm");
  var ifeng = $("#hm_ifeng");
  var imoney = $("#hm_imoney");
  var baodi = $("#hm_baodi");
  var bmoney = $("#hm_bmoney");
  if(!Number(feng.val()) > 0) return;
  pm.html("￥" + (M * 10000 / Number(feng.val()) /10000).toString());//乘以10000解决浮点精度问题
  var fNum = (M / feng.val()) * ifeng.val();
  var bNum = (M / feng.val()) * baodi.val();
  imoney.html(formatCurrency(fNum));
  bmoney.html( formatCurrency(bNum));
  var imoney_per = $("#hm_imoney_per");
  var bmoney_per = $("#hm_bmoney_per");
  if((Number(ifeng.val())/Number($("#keepQi").val())) != Math.ceil(Number(ifeng.val()) / Number($("#keepQi").val())))
  {
    imoney.html("认购份数必须是追号的整数倍");
    return;
  }

  imoney_per.html('( '+ ((Number(ifeng.val())/Number(feng.val()))*100).toFixed(2)+'% )');
  bmoney_per.html( '( '+ ((Number(baodi.val())/Number(feng.val()))*100).toFixed(2)+'% )');

}

function chgHmBaodi(o)
{
  //设置保底
  var bdInp = $D("hm_baodi");
  bdInp.disabled = !o.checked;
  if(!o.checked) bdInp.value = 0;
  else bdInp.select();
  $D("hm_bmoney").className = o.checked ? "bd r" : "";
  refHmPanel();
}

function intHmValue(e)
{
  //监听合买相关输入
  e = e || window.event;
  var elem = (e.target) ? e.target : e.srcElement;
  var re = /\D+/igm;
  var val = elem.value.replace(re,"");
  if(val != elem.value)
  {
    stopEvent = true;
    elem.value = val;
    stopEvent = false;
  }
  refHmPanel();
}

function adviseNum(obj,allmoney)
{
  //建议份数
  var feng = parseInt(obj.value);
  if(feng == "" && allmoney == "") return;
  allmoney = parseInt(allmoney * 100);
  if(allmoney % feng != 0)
  {
    var rightnum = feng;
    while(allmoney % rightnum != 0)
    {
      if(feng >= allmoney) rightnum = allmoney;
      else rightnum++;
    }
    if(confirm("您输入的份数不合理，每份金额不能精确到" + 0.01 + "元，系统建议您分成" + rightnum + "份，要分成" + rightnum + "份吗？"))
    {
      obj.value = rightnum;
      refHmPanel();
      return true;
    }
    else return false;
  }
}

function chgHmBuyer()
{
  //设置合买对象
  $D("hmUserSet").style.display = $D("hm_buyer2").checked ? "inline" : "none";
}

function setHmMore(box)
{
  $D("hmSetMorePanel").style.display = box.checked ? "block" : "none";

}
/*****************************合买相关 结束**********************************/

/*****************************追号相关 开始**********************************/

function loadKeepList()
{
  //显示追号期号列表
  if(stopEvent) return;
  var keepQi = $("#keepQi");
  if(keepQi.val() == "") return;
  var keepQiVal = Number(keepQi.val());
  var tab = $D("keepTab");
  var bArr = arguments[0] ? arguments[0] : [];
  if(bArr.length > 0) keepQiVal = bArr.length;
  if(keepQiVal > keepMax) keepQiVal = keepMax;
  if(keepQiVal > tab.rows.length - 1)
  {
    var lastBeishu = tab.rows.length > 1 ? Number(tab.rows[tab.rows.length - 1].cells[2].childNodes[0].childNodes[0].value) : 1;
    var tbody = tab.tBodies[0];
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var tdArr = ["<input type=\"checkbox\" checked=\"checked\" />","","","","","--","--"];
    for(var j = 0;j < tdArr.length;j++)
    {
      td = td.cloneNode(false);
      td.innerHTML = tdArr[j];
      tr.appendChild(td);
    }
    var tmpTr;
    for(var i = tab.rows.length - 1;i < keepQiVal;i++)
    {
      lastBeishu = bArr[i] ? bArr[i] : lastBeishu;
      tmpTr = tr.cloneNode(true);
      tmpTr.childNodes[2].innerHTML = "<span><input type=\"text\" value = \"" + lastBeishu + "\" maxlength=\"4\" onfocus=\"this.select();\" /></span>";
      bindInputChangeEvent(tmpTr.childNodes[2].childNodes[0].childNodes[0],chgKeepBeishu);
      tbody.appendChild(tmpTr);
    }
    tab.appendChild(tbody);
    chgKeepFirstQi($D("keepQiList").selectedIndex);
  }
  else while(tab.rows.length - 1 > keepQiVal) tab.deleteRow(tab.rows.length - 1);
  checkAllBox(true);
  $D("chkAllBox").checked = true;
}

function sumKeepBeisu()
{
  //统计追号总倍数并显示收益率
  var tab = $D("keepTab");
  var sumB = 0;
  var sumQ = 0;
  nEstPri = sumBetPrize();//统计已投注奖金额
  var isPtList = (nAllM > 0 && nEstPri > 0);

  var bVal,mBetVal,mSumVal,mProVal;
  for(var i = 1;i < tab.rows.length;i++)
  {
    if(tab.rows[i].cells[0].childNodes[0].checked)
    {
      bVal = Number(tab.rows[i].cells[2].childNodes[0].childNodes[0].value);
      sumB += bVal;
      sumQ++;
      mBetVal = sumB * nAllM;
      tab.rows[i].cells[3].innerHTML = formatCurrency(bVal * nAllM);
      tab.rows[i].cells[4].innerHTML = formatCurrency(mBetVal);
      if(isPtList)
      {
        mSumVal = bVal * nEstPri;
        mProVal = mSumVal - mBetVal;
        tab.rows[i].cells[5].innerHTML = formatCurrency(mSumVal);
        tab.rows[i].cells[6].innerHTML = mProVal > 0 ? formatCurrency(mProVal).fontcolor("red") : formatCurrency(mProVal).fontcolor("green");
      }
      else
      {
        tab.rows[i].cells[5].innerHTML = "--";
        tab.rows[i].cells[6].innerHTML = "--";
      }
    }
    else
    {
      tab.rows[i].cells[3].innerHTML = "";
      tab.rows[i].cells[4].innerHTML = "";
      tab.rows[i].cells[5].innerHTML = "";
      tab.rows[i].cells[6].innerHTML = "";
    }
  }
  nAllB = sumB;
  nAllQ = sumQ;
}

function chgKeepQiValue(v)
{
  //arguments[1] 不执行loadKeepList
  if($("#keepQi").val() == v) return;
  stopEvent = true;
  $("#keepQi").val(v);
  stopEvent = false;
  if(!arguments[1]) loadKeepList();
}

function chgKeepFirstQi(f)
{
  //改变追号起始期
  var tab = $D("keepTab");
  var x = 0;
  var tmpB = 0;
  while((f + tab.rows.length - 1) > keepMax)
  {
    if(tab.rows[tab.rows.length - 1].cells[0].childNodes[0].checked) x++;
    tab.deleteRow(tab.rows.length - 1);
  }
  if(x > 0) chgKeepQiValue(Number($D("keepQi").value) - x,true);
  for(var i = 1;i < tab.rows.length;i++) tab.rows[i].cells[1].innerHTML = qiArr[f + (i - 1)];
}

function chgNoKeepBeishu()
{
  //监听非追号状态下的倍数改变
  var o = $("#noKeepBeishu");
  var re = /\D+/igm;
  chgNoKeepBeishuValue(o.val().replace(re,""));
  nAllB = Number(o.val());
  nAllQ = 1;

  showBetBill();
}

function chgNoKeepBeishuValue(v)
{
  //改变非追号状态下的倍数
  if($("#noKeepBeishu").val() == v) return;
  $("#noKeepBeishu").val(v);
}

function chgKeepBeishu(e)
{
  //监听某期追号倍数改变
  if(stopEvent) return;
  e = e || window.event;
  var elem = (e.target) ? e.target : e.srcElement;
  var re = /\D+/igm;
  chgKeepBeishuValue(elem,elem.value.replace(re,""));
  if(elem.value == "") return;
  if(Number(elem.value) <= 0)
  {
    chgKeepBeishuValue(elem,1);return;
  }
  var eParent = elem.parentNode.parentNode.parentNode;
  eParent.cells[3].innerHTML = formatCurrency(Number(elem.value) * nAllM);
  eParent = getNextNode(eParent);
  while(eParent && eParent.tagName == "TR")
  {
    chgKeepBeishuValue(eParent.cells[2].childNodes[0].childNodes[0],Number(elem.value));
    eParent = getNextNode(eParent);
  }
  showBetBill();
}

function chgKeepBeishuValue(o,v)
{
  //改变某期追号倍数
  if(o.value == v) return;
  stopEvent = true;
  o.value = v;
  stopEvent = false;
}

function checkAllBox(flag)
{
  //全选所有期号
  var tab = $D("keepTab");
  var tr;
  for(var i = 1;i < tab.rows.length;i++)
  {
    tr = tab.rows[i];
    if(tr.cells[0].childNodes[0].checked != flag)
    {
      tr.cells[0].childNodes[0].checked = flag;
      tr.className = flag ? "" : "bg";
      tr.cells[2].childNodes[0].className  = flag ? "" : "hidden";
    }
  }
  chgKeepQiValue(flag ? tab.rows.length - 1 : 0,true);
  showBetBill();
}

function tabEvent(e)
{
  //响应追号表上的点击事件(取消或选中某期)
  e = e || window.event;
  var elem = (e.target) ? e.target : e.srcElement;
  if(elem.tagName == "INPUT" && elem.type == "checkbox" && elem.id != "chkAllBox")
  {
    var tr = elem.parentNode.parentNode;
    if(elem.checked)
    {
      tr.className = "";
      tr.cells[2].childNodes[0].className = "";
      chgKeepQiValue(Number($D("keepQi").value) + 1,true);
    }
    else
    {
      tr.className = "bg";
      tr.cells[2].childNodes[0].className = "hidden";
      chgKeepQiValue(Number($D("keepQi").value) - 1,true);
    }
    showBetBill();
  }
}
/*****************************追号相关 结束**********************************/

/*****************************期号截止提醒 开始**********************************/
var hiddenQihaoTipTimer;
function qihaoStopTip(q1,q2)
{
  //显示期号切换的提醒窗口
  var tInt = 10;//显示窗口的时间长度 秒
  if(typeof(submitFlag) == "undefined") return;//只在投注页提醒（只有投注页才有submitFlag变量）
  if(typeof(q1) == "undefined") return;//页面打开时不提醒 只在期号自动切换时提醒
  myAlert("提醒","您好，<span class=\"bd s14\">" + q1 + "</span>期已截止，当前期是<span class=\"r bd s14\">" + q2 + "</span>，投注时请确认您选择的期号。<div class=\"tc s14\"><span id=\"closeTimer\" class=\"bd s14\">" + tInt + "</span> 秒后自动关闭</div>",null,["知道了"]);
  //停止下注语音提示
  //playmsg("stop.mp3");
  hiddenQihaoTipTimer = setInterval("qihaoTipTimer();",1000);
}

function qihaoTipTimer()
{
  //隐藏提醒窗口的倒计时
  var s = Number($("#closeTimer").html());
  if(s <= 0)
  {
    clearInterval(hiddenQihaoTipTimer);

    task.dialogTips.closeWin($("#msgDiv"));
    return;
  }
  s--;
  $("#closeTimer").html(s);
}
/*****************************期号截止提醒 结束**********************************/

function stopBet(b)
{
  //切换停售状态
  try
  {
    $D("isHemai").disabled = b;
    $D("isKeep").disabled = b;
  }
  catch(e)
  {
  }
  if(arguments[1])
  {
    //提示今日休市
    if($D("timer"))
    {
      $D("timer").html("<span>" + arguments[1] + "</span>");
    }
  }
}

function setSubmitFlag()
{
  //切换表单提交状态 全局变量submitFlag保存状态
  submitFlag = !submitFlag;
  $D("betText").innerHTML = submitFlag ? "正在提交" : "确定购买";
}

function iBet()
{
  //投注提交
  if(submitFlag) return;
  setSubmitFlag();
  bet();
  setTimeout("setSubmitFlag();",500);
}

function showTime()
{
  //显示倒计时和当前期号
  var timer = $("#timer");
  var qihao = $("#timerQihao");
  var getRe = getTimeData(nowTime); //通过网络时间计算期号和倒计时数据
  //alert(nowTime);
  if(isStop)
  {

    stopBet(true,stopTip);
  }
  else
  {

    if(getRe[0] != nowQi) //nowQi最新期号
    {
      qihaoStopTip(nowQi,getRe[0]);//期号切换时提醒用户
      nowQi = getRe[0];
      //首次加载网页,触发加载数据功能(fix)
      if(intervalId==0)
      {
        intervalId=setInterval("loadData(showData,dataPath);",timeInt);
      }

      if($("#keepPanel"))
      {
        createQiArr();
      }
    }
    qihao.html(nowQi); //右侧开奖面板"第" + nowQi + "期"
    timer.html(getRe[1]); //下注倒计时
    //play
  }

  nowTime.setSeconds(nowTime.getSeconds() + 1);
}

function post(sData,url)
{
  try
  {
    var xmlhttp = createXMLHTTP();
    xmlhttp.open("POST",url,false);//第三个是 是否是异步请求（false代表是同步,不能实现无刷）
    xmlhttp.setRequestHeader("Content-Length",sData.length);
    xmlhttp.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded;charset=utf-8");
    xmlhttp.onreadystatechange = function()
    {
      //Showbo.Msg.wait('正在提交出票信息','');return;
      if(xmlhttp.readyState == 4)
      {
        switch(xmlhttp.status)
        {
          case 200 :
          var reText = xmlhttp.responseText;
          clrAll(true);//清空所选号码
          Showbo.Msg.alert(reText,"suc");
          if (reText.indexOf('成功') >= 0)
          {
            clrAll(true);//清空所选号码
            Showbo.Msg.alert(reText,"suc");
          }else if (reText.indexOf('余额不足') >= 0)
          {
            Showbo.Msg.alert(reText,"warning");
          }else
          {
            Showbo.Msg.alert(reText);
          }
          break;
          case 401 :
          Showbo.Msg.alert("没有权限！");
          break;
          case 503 :
          top.location.replace("/404.html");
          break;
          default :
          Showbo.Msg.alert(xmlhttp.status + "错误，请与管理员联系");
        }
      } else
      {
        //alert(xmlhttp.readyState);
        Showbo.Msg.wait('正在提交出票信息','');return;
        //IE8下调试过了
      }
    }
    xmlhttp.send(sData);
  } catch(e)
  {
    Showbo.Msg.alert("网络通讯错误，请与管理员联系");
  }
}








function posts(sData,url)
{

  try
  {
    var xmlhttp = createXMLHTTP();

    xmlhttp.open("POST",url,false);//第三个是 是否是异步请求（false代表是同步,不能实现无刷）
    xmlhttp.setRequestHeader("Content-Length",sData.length);
    xmlhttp.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded;charset=utf-8");
    //xmlhttp.onreadystatechange=function(){
    //Showbo.Msg.wait('正在提交出票信息','');
    //}
    xmlhttp.send(sData);
    Showbo.Msg.alert('正在提交出票信息',"warning");
    switch(xmlhttp.status)
    {
      case 200 :
      var reText = xmlhttp.responseText;
      if (reText.indexOf('成功') >= 0)
      {
        clrAll(true);//清空所选号码
        Showbo.Msg.alert(reText,"suc");
      }else if (reText.indexOf('余额不足') >= 0)
      {
        Showbo.Msg.alert(reText,"warning");
      }else
      {
        Showbo.Msg.alert(reText);
      }
      break;
      case 401 :
      Showbo.Msg.alert("没有权限！");
      break;
      case 503 :
      top.location.replace("/404.html");
      break;
      default :
      Showbo.Msg.alert(xmlhttp.status + "错误，请与管理员联系");
    }


  }
  catch(e)
  {
    Showbo.Msg.alert("网络通讯错误，请与管理员联系");
  }
}

function send(sData,url,location)
{
  try
  {
    var xmlhttp = createXMLHTTP();
    xmlhttp.open("POST",url,false);
    xmlhttp.setRequestHeader("Content-Length",sData.length);
    xmlhttp.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded;charset=utf-8");
    xmlhttp.send(sData);
    //Showbo.Msg.wait('正在发送信息...','请等待')
    switch(xmlhttp.status)
    {
      case 200 :
      var reText = xmlhttp.responseText;
      if (reText.indexOf('成功') >= 0)
      {
        Showbo.Msg.alert(reText,"suc");
        window.location.replace(location);
      }else if (reText.indexOf('余额不足') >= 0)
      {
        Showbo.Msg.alert(reText,"warning");
      }else
      {
        Showbo.Msg.alert(reText);
      }
      break;
      case 401 :
      Showbo.Msg.alert("没有权限！");
      break;
      case 503 :
      top.location.replace("/404.html");
      break;
      default :
      Showbo.Msg.alert(xmlhttp.status + "错误，请与管理员联系");
    }
  }
  catch(e)
  {
    Showbo.Msg.alert("网络通讯错误，请与管理员联系");
  }
}

function setMark(o,c,id)
{
  //暂不用
  try
  {
    var xmlhttp = createXMLHTTP();
    var sData = "c=" + c + "&id=" + id;
    xmlhttp.open("POST","/app/SetMark.php",false);
    xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
    xmlhttp.onreadystatechange = function()
    {
      if(xmlhttp.readyState == 4)
      {
        switch(xmlhttp.status)
        {
          case 200 :
          if(xmlhttp.responseText == "0")
          {
            o.className = o.className == "starMark1" ? "starMark2" : "starMark1";
            o.title = o.className == "starMark1" ? "设置标记" : "取消标记";

          }
          else Showbo.Msg.alert(xmlhttp.responseText);
          break;
          case 401 :
          Showbo.Msg.alert("登录状态已失效或没有权限，请重新登录");
          top.location.replace("/User/logout.php");
          break;
          case 503 :
          top.location.replace("/404.html");
          break;
          default :
          Showbo.Msg.alert(xmlhttp.status + "错误，请与管理员联系");
        }
      }
    }
    xmlhttp.send(sData);
  }
  catch(e)
  {
    Showbo.Msg.alert("网络通讯错误，请与管理员联系");
  }
}


