/*
* 追期相关
*/
var planArr = [];
var nEstPriTmp = 0;//用户提交计划而产生的单注奖金临时金额 与sumBetPrize() 相关
function showPlanPanel()
{
	if(!nAllM > 0)
	{
		Showbo.Msg.alert("请先选择投注号码！");return;
	}
	clrPlanTab();//清空对话框表格
	resetForm();
	task.dialogTips.popWin($("#planDialog"));

	if(nEstPri > 0) $("#dj").val(nEstPri);
}

function doClick()
{
	var bb = $("#countBut");
	bb.val("正在计算..");
	bb.attr("disabled","true");

	clrPlanTab();//清空表格
	setTimeout("show();var bb = $(\"#countBut\");bb.attr(\"disabled\",\"false\");bb.val(\" 计算 \")",300);
}

function submitPlan()
{
	task.dialogTips.closeWin($("#planDialog"));

	if(planArr.length > 0)
	{
		nEstPriTmp = Number($("#dj").val());
		var tab = $D("keepTab");
		while(tab.rows.length - 1 > 0) tab.deleteRow(tab.rows.length - 1);//清空投注页面追号表格
		loadKeepList(planArr);//填充投注页面追号表格
	}
	clrPlanTab();//清空对话框表格
	resetForm();
}

function show()
{
	if(!checkValue()) return;
	var sTr = "";
	var sq = Number($("#sq").val());
	var sz = nAllM;
	var sb = Number($("#sb").val());
	var maxBei = Number($("#sbMax").val());//合理倍投的最大值
	var dj = Number($("#dj").val());
	var qi = Number($("#qi").val());
	var syType = ($D("syType2").checked) ? false : true;
	var sy = (syType) ? Number($("#sy1").val()) : Number($("#sy2").val());
	var syMin = $D("syMinSwitch").checked ? Number($("#syMin").val()) : 0;
	var showTab = $D("planContentTab");
	var tempSy;
	var tempTr = 0;
	var thisTr,thisCell;
	var vArr = new Array(7);

	for(var i = 1;i <= sq;i++)
	{
		if(syType == false && i == (qi + 1)) sy = Number($("sy3").value);
		while(((((dj * sb) - (tempTr + (sz * sb))) * 100) / (tempTr + (sz * sb))) < sy || (((dj * sb) - (tempTr + (sz * sb)))) < syMin)
		{
			if(sb > maxBei)
			{
				Showbo.Msg.alert("按照当前设置，从第" + i + "期开始，投注倍数将超过" + maxBei + "倍，建议从以下方面调整方案<br />1.减少追号期数(推荐)<br />2.降低预期收益率(推荐)<br />3.减少方案金额<br />4.提高最大倍数设置");
				return;
			}
			sb++;
		}
		tempTr += (sz * sb);
		tempSy = ((dj * sb) - tempTr) * 100 / tempTr;
		vArr[0] = i.toString();
		vArr[1] = sb.toString().bold() + "倍";
		vArr[2] = (sz * sb).toString().bold() + "元";
		vArr[3] = tempTr.toString().bold() + "元";
		//vArr[4] = (dj * sb).toString();
		//vArr[5] = ((dj * sb) - tempTr).toString();
		vArr[4] = (dj * sb).toFixed(2).bold() + "元";
		vArr[5] = ((dj * sb) - tempTr).toFixed(2).bold() + "元";

		vArr[6] = tempSy.toFixed(2).bold() + "%";
		planArr[i - 1] = sb;
		thisTr = showTab.insertRow(-1);
		for(var ii = 0;ii < vArr.length;ii++)
		{
			thisCell = thisTr.insertCell(ii);
			thisCell.className = (i % 2 == 0) ? "planTd1" : "planTd2";
			thisCell.innerHTML = vArr[ii];
		}
	}
}

function changeType()
{
	var syType1 = $D("syType1");
	var sy1 = $D("sy1");
	var sy2 = $D("sy2");
	var sy3 = $D("sy3");
	var qi = $D("qi");
	sy1.disabled = !syType1.checked;
	sy2.disabled = syType1.checked;
	sy3.disabled = syType1.checked;
	qi.disabled = syType1.checked;
}

function clickSyMin()
{
	$D("syMin").disabled = !$D("syMinSwitch").checked;
}

function checkValue()
{
	var showTab = $D("planContentTab");
	var inputArr = document.getElementsByName("dataInput");
	var re;
	for(var i = 0;i < inputArr.length;i++)
	{
		if(inputArr[i].id == "dj")
		{
			re = /^(\d+)?(\.\d{1,2})?$/;
			if(!re.test(inputArr[i].value))
			{
				//Showbo.Msg.alert("金额填写不正确，请精确到小数点后两位。");
				alert("金额填写不正确，请精确到小数点后两位。");
				inputArr[i].select();
				return false;
			}
			if(Number(inputArr[i].value) <= nAllM)
			{
				alert("单倍投注金额大于单倍奖金金额，请调整投注方案。");
				return false;
			}
		}
		else
		{
			re = /[^\d]+/;
			if(re.test(inputArr[i].value))
			{
				alert("数值必须为正整数" + inputArr[i].id);
				inputArr[i].select();
				return false;
			}
		}
	}
	if(Number($("#sq").val()) > keepMax)
	{
		alert("最多只能追号" + keepMax + "期！");
		$("#sq").select();
		return false;
	}
	return true;
}

function clrPlanTab()
{
	//清空表格
	var showTab = $D("planContentTab");
	while(showTab.rows.length > 0) showTab.deleteRow(showTab.rows.length - 1); //清空表格
	planArr = [];
}

function resetForm()
{
	//重置表单
	$D("planForm").reset();
	changeType();
	clickSyMin();
}


function GetZT(num, s)
{
	var a0, a1, a2, Numbers = num.split(','), Result = '';
	if (s == 0)
	{
		a0 = parseInt(Numbers[0]);
		a1 = parseInt(Numbers[1]);
		a2 = parseInt(Numbers[2]);
	}
	else if (s == 1)
	{
		a0 = parseInt(Numbers[1]);
		a1 = parseInt(Numbers[2]);
		a2 = parseInt(Numbers[3]);
	}
	else
	{
		a0 = parseInt(Numbers[2]);
		a1 = parseInt(Numbers[3]);
		a2 = parseInt(Numbers[4]);
	}
	if (((a0 == a1) || (a1 == a2)) || (a0 == a2))
	{
		Result = "组三";
	}
	else
	{
		Result = "组六";
	}
	if (((a0 == a1) && (a1 == a2)) && (a0 == a2))
	{
		Result = "豹子";
	}
	return Result;
}
function getds(num)
{
	var a0, a1, Numbers = num.split(','), Result = '', s1 = '', s2 = '';
	a0 = parseInt(Numbers[3]);
	a1 = parseInt(Numbers[4]);
	if (a0 < 5)
	s1 += '小';
	else
	s1 += '大';

	if (a0 % 2 == 0)
	s1 += ',双';
	else
	s1 += ',单';

	if (a1 < 5)
	s2 += '小';
	else
	s2 += '大';

	if (a1 % 2 == 0)
	s2 += ',双';
	else
	s2 += ',单';

	s1 = s1.split(',');
	s2 = s2.split(',');
	for (var i in s1)
	{
		for (var j in s2)
		{
			Result += ' ' + s1[i] + s2[j];
		}
	}
	return Result;
}
