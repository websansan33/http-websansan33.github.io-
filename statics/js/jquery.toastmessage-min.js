/*
http://akquinet.github.io/jquery-toastmessage-plugin/demo/demo.html
*/
(function(c){var b={inEffect:{opacity:"show"},inEffectDuration:600,stayTime:3000,text:"",sticky:false,type:"notice",position:"top-right",closeText:"",close:null};
var a={init:function(d){if(d){c.extend(b,d)
}},showToast:function(f){var g={};
c.extend(g,b,f);
var j,e,d,i,h;
j=(!c(".toast-container").length)?c("<div></div>").addClass("toast-container").addClass("toast-position-"+g.position).appendTo("body"):c(".toast-container");
e=c("<div></div>").addClass("toast-item-wrapper");
d=c("<div></div>").hide().addClass("toast-item toast-type-"+g.type).appendTo(j).html(c("<p>").append(g.text)).animate(g.inEffect,g.inEffectDuration).wrap(e);
i=c("<div></div>").addClass("toast-item-close").prependTo(d).html(g.closeText).click(function(){c().toastmessage("removeToast",d,g)
});
h=c("<div></div>").addClass("toast-item-image").addClass("toast-item-image-"+g.type).prependTo(d);
if(navigator.userAgent.match(/MSIE 6/i)){j.css({top:document.documentElement.scrollTop})
}if(!g.sticky){setTimeout(function(){c().toastmessage("removeToast",d,g)
},g.stayTime)
}return d
},showNoticeToast:function(e){var d={text:e,type:"notice"};
return c().toastmessage("showToast",d)
},showSuccessToast:function(e){var d={text:e,type:"success"};
return c().toastmessage("showToast",d)
},showErrorToast:function(e){var d={text:e,type:"error"};
return c().toastmessage("showToast",d)
},showWarningToast:function(e){var d={text:e,type:"warning"};
return c().toastmessage("showToast",d)
},removeToast:function(e,d){e.animate({opacity:"0"},600,function(){e.parent().animate({height:"0px"},300,function(){e.parent().remove()
})
});
if(d&&d.close!==null){d.close()
}}};
c.fn.toastmessage=function(d){if(a[d]){return a[d].apply(this,Array.prototype.slice.call(arguments,1))
}else{if(typeof d==="object"||!d){return a.init.apply(this,arguments)
}else{c.error("Method "+d+" does not exist on jQuery.toastmessage")
}}}
})(jQuery);

function toastmsg(msgtext,msgtype,msgstay)
{
	//样式 notice warning error success
	//位置 top-left top-right top-center middle-left middle-right middle-center
	//吐司提示jquery.toastmessage-min.js
	msgstay = arguments[2] ? arguments[2] : 3000;
	msgtype = arguments[1] ? arguments[1] : 'notice';
//	if(msgtype==null || msgtype=="undefined"){
//		msgtype="notice";
//		}
	$().toastmessage('showToast',
		{
			text     : msgtext,
			sticky   : false,
			stayTime : msgstay,
			position : 'top-center',
			type     : msgtype,
			closeText: '',
			close    : function () {
			console.log("toast is closed ...");
			}
		});
}

function msgList(obj)
{
	var html='';
	if (obj.length > 0)
	{
		$.each(obj, function (index, item)
			{
				html+=obj[index] + '<br />';
			});
	}else
	{
		html += '通迅错误';
	}
	return html;
}