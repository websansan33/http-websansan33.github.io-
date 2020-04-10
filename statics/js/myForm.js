function havegg(elem)
{
	var str = "$()*+-.[]?\^{\|}~`!@#%&_=<>/\",';";
	for(var i = 0;i < elem.length;i++) if(str.indexOf(elem.charAt(i)) != -1)
	{
		return false;
	}
	return true;
}

function nameLen(s)
{
	//计算用户名长度 中文算2个字符
	var len = 0;
	for(var i = 0;i < s.length;i++)
	{
		if(s.charCodeAt(i) < 27 || s.charCodeAt(i) > 126) len += 2;
		else len++;
	}
	return len;
}

function charMode(iN)
{
	//测试某个字符是属于哪一类.
	if(iN>=48 && iN <=57) return 1;//数字
	if(iN>=65 && iN <=90) return 2;//大写字母
	if(iN>=97 && iN <=122) return 4;//小写
	else return 8;//特殊字符
}

function bitTotal(num)
{
	//计算出当前密码当中一共有多少种模式
	var modes = 0;
	for(var i = 0;i < 4;i++)
	{
		if(num & 1) modes++;
		num >>>= 1;
	}
	return modes;
}

function checkStrong(sPW)
{
	//返回密码的强度级别
	if(sPW.length < 8) return 0; //密码太短
	var modes = 0;
	for(var i = 0;i < sPW.length;i++) modes |= charMode(sPW.charCodeAt(i));//测试每一个字符的类别并统计一共有多少种模式.
	return bitTotal(modes);
}

function pwStrength(o)
{
	//当用户放开键盘或密码输入框失去焦点时,根据不同的级别显示不同的颜色
	var pwd = o.value;
	var T_txt = "未知";
	if (pwd == null || pwd == "") o.className = "inputText PP01";
	else
	{
		var S_level=checkStrong(pwd);
		switch(S_level)
		{
			case 0:
			o.className="inputText PP02";
			T_txt="弱";
			case 1:
			o.className="inputText PP02";
			T_txt="弱";
			break;
			case 2:
			o.className = "inputText PP03";
			T_txt="中";
			break;
			default:
			o.className = "inputText PP04";
			T_txt = "强";
		}
	}
	o.title = "密码强度:" + T_txt;
	return false; //fix20160522
}

function onThis(o)
{
	var oTip = o.parentNode.getElementsByTagName("SPAN")[0];
	oTip.innerHTML = oTip.title;
	oTip.className = oTip.innerHTML == "" ? "fillTip" : "fillON";
}

function outThis(o)
{
	var oTip = o.parentNode.getElementsByTagName("SPAN")[0];
	var re = check(o);
	switch(re)
	{
		case true :
		oTip.innerHTML = "&nbsp;";
		oTip.className = "fillOK";
		break;
		case false :
		oTip.innerHTML = "";
		oTip.className = "";
		break;
		default :
		oTip.innerHTML = re;
		oTip.className = "fillNO";
		break;
	}
	return re
}

function check(o)
{
	//资料合法性检查
	var f = o.form;
	var re;
	o.value = replaceQj(o.value);
	if(o.value == "") return (o.attributes["required"] ? o.getAttribute("required") + "不能为空" : false);
	switch(o.name)
	{
		case "usn" :
		if(!havegg(o.value)) return "会员名含有禁用的字符";
		if(o.value.indexOf("0x") >= 0 || o.value.indexOf("管理员") >= 0) return "会员名含有非法字符";
		if(nameLen(o.value) < 3 || nameLen(o.value) > 16) return "会员名长度不符合要求";
		return true;
		break;
		case "psw1" :
		if(o.value.length < 6 || o.value.length > 15) return "您输入的登录密码长度不符合要求";
		if(f.psw2)
		{
			if(f.psw2.value != "") f.psw2.onblur();
		}
		return true;
		break;
		case "psw2" :
		if(o.value.length < 6 || o.value.length > 15) return "您输入的登录密码长度不符合要求";
		if(f.psw1.value != o.value) return "两次输入的登录密码不一致";
		return true;
		break;
		case "spsw0" : 	//原密码
		case "psw0" :
		return false;
		break;
		case "spsw1" :
		if(o.value.length < 8 || o.value.length > 15) return "您输入的提款密码长度不符合要求";
		if(/^([0-9])+$/.test(o.value)) return "提款密码不能全部为数字";
		if(f.spsw2.value != "") f.spsw2.onblur();
		return true;
		break;
		case "spsw2" :
		if(o.value.length < 8 || o.value.length > 15) return "您输入的提款密码长度不符合要求";
		if(f.spsw1.value != o.value) return "两次输入的提款密码不一致";
		return true;
		break;
		case "name" :
		if(o.value.length < 2 || o.value.length > 4) return "收款人名字长度不符合要求"
		if(!isChinese(o.value)) return "收款人名字只能填写中文"
		return true;
		break;
		case "personnum" :
		if(o.value.length != 15 && o.value.length != 18) return "您输入的身份证号码长度不符合要求";
		re = /(\d{15}$)|(\d{17}(?:\d|x|X)$)/;
		if(!re.test(o.value)) return "您输入的身份证号码格式有误";
		return true;
		break;
		case "bank" :
		return true;
		break;
		case "cardnum" :;
		if(o.value.length < 5 || o.value.length > 30) return "银行帐号长度不符合要求";
		return true;
		break;
		case "mail" :
		re = /^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
		if(!re.test(o.value)) return "电子邮箱格式有误";
		return true;
		break;
		case "tel" :
		if(o.value.length < 6) return "电话号码长度不符合要求";
		return true;
		break;
		case "province" :
		return true;
		break;
		case "city" :
		return true;
		break;
		case "birthday" :
		re = /^\d{4}-\d{1,2}-\d{1,2}$/;
		if(!re.test(o.value)) return "日期的格式错误";
		return true;
		break;
		case "postcode" :
		if(!(/^([0-9])+$/.test(o.value))) return "邮政编码只能是数字";
		if(o.value.length != 6) return "您输入的邮政编码长度不符合要求";
		return true;
		break;
		case "mob" :
		if(!(/^([0-9])+$/.test(o.value))) return "手机号码只能是数字";
		if(o.value.length < 11) return "手机号码长度不符合要求";
		return true;
		break;
		case "qq" :
		if(!(/^([0-9])+$/.test(o.value))) return "QQ号码只能是数字";
		if(o.value.length < 5) return "QQ号码长度不符合要求";
		return true;
		break;
		case "userid" :
		if(!(/^([0-9])+$/.test(o.value))) return "推荐人只能填数字";
		return true;
		break;

		case "amount" :
		case "deposit" :
		if(!(/^\d*(\.\d{1,2})?$/.test(o.value))) return "请填写正确的金额！"
		return true;
		break;
		case "integval" :
		if(!(/^([0-9])+$/.test(o.value))) return "兑换积分数只能填数字";
		return true;
		break;
		default :
		return true;
	}
}

function checkAll(f)
{
	//登录或修改资料时填写检查
	var x = 0;
	var o = f.elements;
	for(var i = 0;i < o.length;i++)
	{
		if(o[i].type == "text" || o[i].type == "password")
		{
			if(typeof(outThis(o[i])) == "string") x++
		}
	}
	//if(x > 0) Showbo.Msg.alert("共有 " + x + " 项内容填写不符合要求！");
	return !(x > 0)
}
