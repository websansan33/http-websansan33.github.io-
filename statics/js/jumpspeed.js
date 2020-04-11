function urltest(domian_root){
	var urlary={1:0,2:0,3:0,4:0};
	//var speedary=new Array();
	$("#tips").css({'margin-top':'5px','color':'#6a2500','font-size':'0.8rem'});
	$("#tips").html("选择绿色优质线路访问");
	$.each(urlary,function(item,value){
			var curUrl="http://"+item+"."+domian_root+"/speedtest.php";
			pageOpenTest(curUrl,function(speedvalue){
				speedresult(item,speedvalue);
				urlary[item]=speedvalue;
			});

		});
}

function pageOpenTest(urltxt,fun){
	//访问线路,返回0不可用其它值为速度
	//ajax不能跨域访问
	var visitStart=(new Date()).getTime();
	var visitend=visitStart;
	var visitTime=0;
	var ajaxTimeoutTest=$.ajax({
			type: "get",
			url: urltxt+"?r=" + Math.random(),
			timeout: 6000,
			cache: false,
			//dataType: 'json',
			//data: {},
			//contentType: "application/x-www-form-urlencoded; charset=utf-8",
			async: true,
			error: function(jsxhr,textStatus,errorThrown) {
				if(textStatus=="timeout"){
					visitTime=0;
					ajaxTimeoutTest.abort();
					console.log('超时');
				}else{
					visitTime=(new Date()).getTime()-visitStart;
					console.log('正常访问'+textStatus);
				}
				if($.isFunction(fun)){
					fun(visitTime);
				}
				//speedresult(linenum,visitTime);
			},
			success: function(res) {
				visitTime=(new Date()).getTime()-visitStart;
				console.log('成功访问');
				if($.isFunction(fun)){
					fun(visitTime);
				}
				//speedresult(linenum,visitTime);
			}
		});
	//return visitTime;
}

function speedresult(linenum,visitTime){
	if(visitTime==0){
		$("#line"+linenum).css({'color': '#ee0000'});
	}else{
		if(visitTime<2000){
			$("#line"+linenum).css({'color': '#02d90d'});
		}else{
			$("#line"+linenum).css({'color': '#db7d00'});
		}
	}
}

