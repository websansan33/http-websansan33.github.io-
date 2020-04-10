function betInput()
{//监听认购份数输入
	var re = /\D+/igm;
	var iFeng = $("#iFeng");
	var temp =  iFeng.val().replace(re,"");
	if(iFeng.val() != temp) iFeng.val() = temp;
	$("#iMoney").html( formatCurrency(iFeng.value * $("#every_money").val()));
}

function betSend(id)
{//合买认购参与
    if(showLoginPanle()) return;
	var iFeng = $("#iFeng");
	if(Number(iFeng.val()) < 1 || iFeng.val() == "")
	{
		Showbo.Msg.alert("请至少认购1份");
		return;
	}
	var msg="请确认您的认购信息：" + iFeng.val() + "份，" + $("#iMoney").html() + "元";
	var sData = "id=" + id + "&ifeng=" + iFeng.val();
	Showbo.Msg.confirm(msg,function(btn){if (btn=="yes") {send(sData,"/app/add.php","/lottery/detail.php?id=" + id);}else{return;}}); 
}

function cancelBuySend(id,hm)
{//撤消某次合买认购
    if(showLoginPanle()) return;
	var msg;
	msg = (hm == 0) ? "请确认是否对您发起的整个合买方案做撤单处理？" : "请确认是否对您的认购记录做撤单处理？";
	var sData = "id=" + id + "&hm=" + hm;
	Showbo.Msg.confirm(msg,function(btn){if (btn=="yes") {send(sData,"/app/teambuy_cancel.php","/lottery/detail.php?id=" + id);}else{return;}}); 
}



function cancelMySend(id,q)
{//撤消代购方案的整个或某期追号任务
    if(showLoginPanle()) return;
	var msg;
	msg = (q == "") ? "请确认是否对整个代购方案做撤单处理？" : "请确认是否对" + q + "期追号进行撤单处理？";
	var sData = "id=" + id + "&q=" + q;
	Showbo.Msg.confirm(msg,function(btn){if (btn=="yes") {send(sData,"/app/project_cancel.php","/user/detail.php?id=" + id);}else{return;}}); 
}


