var Showbo =
{
};
//是否为ie浏览器
Showbo.IsIE = !!document.all;
var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
var isChrome = userAgent.indexOf("Chrome") > -1; //判断是否Chrome
//其中高亮功能
//ie浏览器版本
Showbo.IEVersion = (function()
	{
		if (!Showbo.IsIE) return - 1;
		try
		{
			return parseFloat(/msie ([\d\.]+)/i.exec(navigator.userAgent)[1]);
		} catch(e)
		{
			return - 1;
		}
	})();
//按id获取对象
Showbo.$ = function(Id, isFrame)
{
	var o;
	if ("string" == typeof(Id)) o = document.getElementById(Id);
	else if ("object" == typeof(Id)) o = Id;
	else return null;
	return isFrame ? (Showbo.IsIE ? frames[Id] : o.contentWindow) : o;
}
//按标签名称获取对象
//页面的高和宽******************************
Showbo.isStrict = document.compatMode == "CSS1Compat";
Showbo.BodyScale =
{
	x: 0,
	y: 0,
	tx: 0,
	ty: 0
}; //（x，y）：当前的浏览器容器大小  （tx，ty）：总的页面滚动宽度和高度
Showbo.getClientHeight = function()
{
	/*if(Showbo.IsIE)*/
	return Showbo.isStrict ? document.documentElement.clientHeight: document.body.clientHeight;
	/*else return self.innerHeight;*/
}
Showbo.getScrollHeight = function()
{
	var h = !Showbo.isStrict ? document.body.scrollHeight: document.documentElement.scrollHeight;
	return Math.max(h, this.getClientHeight());
}
Showbo.getHeight = function(full)
{
	return full ? this.getScrollHeight() : this.getClientHeight();
}
Showbo.getClientWidth = function()
{
	/*if(Showbo.IsIE)*/
	return Showbo.isStrict ? document.documentElement.clientWidth: document.body.clientWidth;
	/*else return self.innerWidth;*/
}
Showbo.getScrollWidth = function()
{
	var w = !Showbo.isStrict ? document.body.scrollWidth: document.documentElement.scrollWidth;
	return Math.max(w, this.getClientWidth());
}
Showbo.getWidth = function(full)
{
	return full ? this.getScrollWidth() : this.getClientWidth();
}
Showbo.initBodyScale = function()
{
	Showbo.BodyScale.x = Showbo.getWidth(false);
	Showbo.BodyScale.y = Showbo.getHeight(false);
	Showbo.BodyScale.tx = Showbo.getWidth(true);
	Showbo.BodyScale.ty = Showbo.getHeight(true);
}
//页面的高和宽******************************
Showbo.Msg =
{
	INFO: 'suc',
	ERROR: 'error',
	WARNING: 'warning',
	IsInit: false,
	timer: null,
	dvTitle: null,
	dvCT: null,
	dvBottom: null,
	dvBtns: null,
	dvMsgBox: null,
	lightBox: null,
	defaultWidth: null,
	moveProcessbar: function()
	{
		var o = Showbo.$('dvProcessbar'),
		w = o.style.width;
		if (w == '') w = 0;
		else
		{
			w = parseInt(w) + 10;
			if (w > 100) w = 0;
		}
		o.style.width = w + '%';
	},
	InitMsg: function(width)
	{
		//ie下不按照添加事件的循序来执行，所以要注意在调用alert等方法时要检测是否已经初始化IsInit=true
		var ifStr = '<div id="pageMask"><iframe src="javascript:false" style="position:absolute; visibility:inherit; top:0px;left:0px;width:100%; height:100%; z-index:-1;' + 'filter=\'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)\';"></iframe><div>',
		html = '<div  id="title">' + '<span id="dvMsgTitle">温馨提示</span><a title="关闭" id="close" onclick="Showbo.Msg.hide()"></a>' + '</div><div id="dvMsgCT"></div>' + '<div id="dvMsgBottom"><div id="dvMsgBtns"><a id="yclass_confirm_no" class="btn">取消</a><a id="yclass_confirm_ok" class="btno">确认</a></div>' + '</div></div></div>';

		this.dvMsgBox = document.createElement("div");
		this.dvMsgBox.id = "dvMsgBox";
		this.dvMsgBox.innerHTML += html;
		document.body.appendChild(this.dvMsgBox);
		this.lightBox = document.createElement("div");
		this.lightBox.id = "ShowBolightBox";
		document.body.appendChild(this.lightBox);

		if (Showbo.IsIE && Showbo.IEVersion < 7)
		{
			//加iframe层修正ie6下无法遮盖住select的问题
			this.lightBox.innerHTML += ifStr;
			this.dvMsgBox.innerHTML += ifStr;
		}
		this.dvBottom = Showbo.$('dvMsgBottom');
		this.dvBtns = Showbo.$('dvMsgBtns');
		this.dvCT = Showbo.$('dvMsgCT');
		this.dvTitle = Showbo.$('dvMsgTitle');
		this.IsInit = true;
	},
	checkDOMLast: function()
	{
		//此方法非常关键，要不无法显示弹出窗口。两个对象dvMsgBox和lightBox必须处在body的最后两个节点内
		if (document.body.lastChild != this.lightBox)
		{
			document.body.appendChild(this.dvMsgBox);
			document.body.appendChild(this.lightBox);
		}
	},
	createBtn: function(p, v, fn)
	{
		var btn = document.createElement("a");
		//btn.type="button";
		if (p == "yes")
		{
			btn.className = 'btn';
		} else if (p == "ok")
		{
			btn.className = 'bt';
		} else
		{
			btn.className = 'btno';
		}

		btn.innerHTML = v;
		//btn.onmouseover=function(){this.className='btno';}
		//btn.onmouseout=function(){this.className='btn';}
		btn.onclick = function()
		{
			Showbo.Msg.hide();
			if (fn) fn(p);
		}
		return btn;
	},
	alert: function(msg,icon)
	{
		this.show(
			{
				buttons:
				{
					ok: '确认'
				},
				icon: icon,
				msg: msg
			});
	},
	confirm: function(msg, fn)
	{
		//fn为回调函数，参数和show方法的一致
		this.show(
			{
				buttons:
				{
					yes: '确认',
					no: '取消'
				},
				msg: msg,
				icon: 'conf',
				title: '温馨提示',
				fn: fn
			});
	},
	prompt: function(labelWord, defaultValue, txtId, fn)
	{
		//提示输入框
		if (!labelWord) labelWord = '请输入：';
		if (!defaultValue) defaultValue = "";
		if (!txtId) txtId = "msg_txtInput";
		this.show(
			{
				title: '输入提示',
				msg: labelWord + '<input type="text" id="' + txtId + '" style="width:200px" value="' + defaultValue + '"/>',
				buttons:
				{
					yes: '确认',
					no: '取消'
				},
				fn: fn
			});
	},
	wait: function(msg, title)
	{
		//等待窗口
		if (!msg) msg = '请等待...';
		this.show(
			{
				title: title,
				msg: msg,
				wait: true
			});
	},
	show: function(cfg)
	{
		//cfg:{title:'',msg:'',wait:true,icon:'默认为信息',buttons:{yes:'',no:''},fn:function(btn){回调函数,btn为点击的按钮，可以为yes，no},width:显示层的宽}
		//如果是等待则wait后面的配置不需要了。。
		if (!cfg) throw ("没有指定配置文件");
		//添加窗体大小改变监听
		if (Showbo.IsIE) window.attachEvent("onresize", this.onResize);
		else window.addEventListener("resize", this.onResize, false);

		if (!this.IsInit) this.InitMsg(); //初始化dom对象
		else this.checkDOMLast(); //检查是否在最后
		//检查是否要指定宽，默认为300
		if (cfg.width) this.defaultWidth = cfg.width;
		this.dvMsgBox.style.width = this.defaultWidth + 'px';
		//可以直接使用show方法停止为进度条的窗口
		if (this.timer)
		{
			clearInterval(this.timer);
			this.timer = null;
		}
		//this.dvTitle.innerHTML = '温馨提示';
		if (cfg.title) this.dvTitle.innerHTML = cfg.title;
		this.dvCT.innerHTML = '';
		if (cfg.wait)
		{


			this.dvCT.innerHTML +=' <p class=pzong><b class="wait"></b><div id="tiptxts" class="tiptxts">' + cfg.msg + '</div></p>';

			this.dvBtns.innerHTML = '';

		} else
		{
			if(!cfg.icon)cfg.icon=Showbo.Msg.ERROR;

			this.dvCT.innerHTML = '';
			if (cfg.msg) this.dvCT.innerHTML = '<p class=pzong><b class="' + cfg.icon + '"></b><div id="tiptxts" class="tiptxts">' + cfg.msg + '</div></p>';
			//highLightText('tiptxts','\\d+');
			this.dvBtns.innerHTML = '';

			if (cfg.buttons.ok)
			{
				this.dvBtns.appendChild(this.createBtn('ok', cfg.buttons.ok, cfg.fn));
			} else
			{
				this.dvBtns.appendChild(this.createBtn('yes', cfg.buttons.yes, cfg.fn));
				this.dvBtns.appendChild(this.createBtn('no', cfg.buttons.no, cfg.fn));
			}

		}
		Showbo.initBodyScale();
		this.dvMsgBox.style.display = 'block';
		this.lightBox.style.display = 'block';
		this.onResize(false);


	},
	hide: function()
	{
		this.dvMsgBox.style.display = 'none';
		this.lightBox.style.display = 'none';
		if (this.timer)
		{
			clearInterval(this.timer);
			this.timer = null;
		}
		if (Showbo.IsIE) window.detachEvent('onresize', this.onResize);
		else window.removeEventListener('resize', this.onResize, false);
	},
	onResize: function(isResize)
	{
		if (isResize) Showbo.initBodyScale();
		Showbo.Msg.lightBox.style.width = Showbo.BodyScale.tx + 'px';
		Showbo.Msg.lightBox.style.height = Showbo.BodyScale.ty + 'px';

		if (document.documentElement && document.documentElement.scrollTop)
		{
			Showbo.Msg.dvMsgBox.style.top = -10 + document.documentElement.scrollTop + Math.floor((Showbo.BodyScale.y - Showbo.Msg.dvMsgBox.offsetHeight) / 2) + "px";
			//Showbo.Msg.dvMsgBox.style.top = "0px";
		} else if (document.body)
		{
			//弹出窗口的TOP的位置控制
			Showbo.Msg.dvMsgBox.style.top = -10 + document.body.scrollTop + Math.floor((Showbo.BodyScale.y - Showbo.Msg.dvMsgBox.offsetHeight) / 6) + "px";
			//Showbo.Msg.dvMsgBox.style.top = -10 + document.body.scrollTop + Math.floor((Showbo.BodyScale.y - Showbo.Msg.dvMsgBox.offsetHeight) / 8) + "px";
			//Showbo.Msg.dvMsgBox.style.top = "0px";
		}

		Showbo.Msg.dvMsgBox.style.left = Math.floor((Showbo.BodyScale.x - Showbo.Msg.dvMsgBox.offsetWidth) / 2) + 'px';
	}
}

function isIE()
{
	//是否IE浏览器
	return ("\v" == "v");
}


function bindEvent(o,e,f)
{
	//给对象绑定事件
	try
	{
		if(isIE())//IE
		{
			o.attachEvent("on" + e,f);
		}
		else
		{
			o.addEventListener(e,f,false);
		}
	}
	catch(e)
	{
	}
}


function maskThis(w, t)
{
	//显示或隐藏某个子窗口的遮罩层
	if (w.document.getElementById("pageMask") == null) w = window;
	var d = w.document;
	var layer = d.getElementById("pageMask");
	var loginDiv = d.getElementById("loginPanel"); //登录窗
	var div = arguments[2] ? arguments[2] : loginDiv;
	if (t)
	{
		layer.style.height = Math.max(d.documentElement.scrollHeight, d.documentElement.clientHeight, d.body.scrollHeight, d.body.clientHeight) + "px";
		layer.style.display = "block";
		if (div) div.style.display = "block";
		//selObj(t);
	}else
	{
		if (! (loginDiv && loginDiv.style.display == "block")) layer.style.display = "none"; //如果登录窗在显示则不隐藏背景层。
		if (div) div.style.display = "none";
		//selObj(t);
	}
}

function maskAll(t)
{
	//显示或隐藏所有子窗口的遮罩层
	try
	{
		for (var i = 0; i < parent.frames.length; i++)
		{
			maskThis(parent.frames[i], t, arguments[1]);
		}
		//maskThis(parent,t,arguments[1]);
		bindEvent(parent, "resize", setMaskPos); //绑定缩放窗口事件
		window.onunload = new Function("maskAll(false);"); //Op不支持unload
	}catch(e)
	{
	}
}

function setMaskPos()
{
	var d, layer;
	for (var i = 0; i < top.frames.length; i++)
	{
		d = top.frames[i].document;
		layer = d.getElementById("msgMask");
		if (layer) layer.style.height = Math.max(d.documentElement.scrollHeight, d.documentElement.clientHeight, d.body.scrollHeight, d.body.clientHeight) + "px";
	}
}

function selObj(t)
{
	var sels = document.getElementsByTagName("select");
	for (var i = 0; i < sels.length; i++)
	{
		sels[i].disabled = t;
		sels[i].className = t ? "maskSelect": "";
	}
}

