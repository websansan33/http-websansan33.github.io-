//首页用的
var loading = false;	//是否正在载入合买列表
function filterD(o)
{
  o.value = o.value.replace(/\D*/img,"");
}
$(document).ready(function()
	{
		$('#f3d_lottery_num').html("2014296");
		opencodeparse($('#f3d_opencodes'),"4,0,7");
		$('#pl3_lottery_num').html("2014296");
		opencodeparse($('#pl3_opencodes'),"4,8,9");
		$('#pl5_lottery_num').html("2014296");
		opencodeparse($('#pl5_opencodes'),"4,8,9,1,8");
		$('#dlt_lottery_num').html("2015004");
		opencodeparse($('#dlt_opencodes'),"07,08,12,20,25|03,07");
		$('#ssq_lottery_num').html("2015002");
		opencodeparse($('#ssq_opencodes'),"01,16,18,22,28,30|12");
		$('#qxc_lottery_num').html("2015002");
		opencodeparse($('#qxc_opencodes'),"0,1,7,5,5,3,4");
		$('#qlc_lottery_num').html("2014139");
		opencodeparse($('#qlc_opencodes'),"04,06,07,16,19,20,26|24");
		$('#sfc_lottery_num').html("2015060");
		opencodeparse($('#sfc_opencodes'),"3,0,1,0,3,3,3,0,3,3,3,0,1,0");
		//		$('#bqc_lottery_num').html("2015064");
		//		opencodeparse($('#bqc_opencodes'),"1,0,1,3,3,3,1,0,3,3,0,0");
		//		$('#jqc_lottery_num').html("2015068");
		//		opencodeparse($('#jqc_opencodes'),"1,2,2,3,2,0,2,1");
		showHemailist($(".seled").attr("id"));
		showLastOpeninfo();
		setInterval('showLastOpeninfo();',3000);
	});

//最新开奖按号码进行着色
function opencodeparse(showobj,opencode)
{
	//1,2,3|4,5
	var redary = new Array();
	var blueary = new Array();
	if(opencode.indexOf("|")>-1)
	{
		var totalary=opencode.split("|");
		redary=totalary[0].split(",");
		blueary=totalary[1].split(",");
	}else
	{
		redary=opencode.split(",");
	}
	var $div=$('<div class="awardDetail"></div>');
	for(var i=0;i<redary.length;i++)
	{
		var $ballobj=$('<b class="b-red-20"></b>').html(redary[i]);
		$div.append($ballobj);
	}
	for(var i=0;i<blueary.length;i++)
	{
		var $ballobj=$('<b class="b-blue-20"></b>').html(blueary[i]);
		$div.append($ballobj);
	}
	showobj.append($div);
}
//opencodeparse('1,2,3|4,5');

/*顶部最新开奖信息定时更新*/
function showLastOpeninfo()
{
	doAjax(
		"/app/getlastopeninfo.php",
		{
			"lotteryid": "1"
		},
		"json",
		function (json)
		{
			createLastOpeninfo(json.info);
		},true);
}

function createLastOpeninfo(obj)
{
	var showadv=$('.home-ads-top');
	showadv.html('');
	var $awardBox=$('<div></div>').addClass("awardBox");
	showadv.append($awardBox);
	var $jsother=$('<div class="js-other"></div>');
	$awardBox.append($jsother);
	var $awardDetail=$('<div class="awardDetail"></div>');
	$jsother.append($awardDetail);
	var html='开奖提醒：<a href="lottery/ssc/" style="margin:0" target="_blank">'
	+'<strong class="gameEn">老时时彩</strong></a>';
	html+='<strong class="c_ba2636">' + obj.qi + '</strong>期&nbsp;';
	var lastopencode=obj.opencode;
	$.each(lastopencode, function (index, item)
		{
			html+='<b class="b-red-20">' + lastopencode[index] + '</b>';
		});
	html+='&nbsp;<span class="awardtime">每10分钟 开奖</span>&nbsp;'
	+'<div class="buylinks"><a class="awardBox_Btn" target="_blank"  href="lottery/ssc/">立即购买</a>'
	+'<a class="awardBox_Btn" target="_blank" href="lottery/Hemai.php">参与合买</a></div>';
	//alert(html);
	$awardDetail.html(html);
}

function ctrlOpenInfo(d)
{
	//上下移动左侧最新开奖信息 d=方向
	var o = $D("openCon1");
	var top = o.style.marginTop;
	var h = o.offsetHeight;
	var ph = $D("openDiv").offsetHeight;
	top = top.replace("px","");
	if(top == "auto") top = 0;
	top = top * 1 + (d == 0 ? 118 : -118);
	if(d == 0 && top > 0) top = 0;
	if(d == 1 && top < h * -1 + ph) top = -h+ph;
	o.style.marginTop = top + "px";
}

function chgHemaiTag(o)
{
	//切换合买列表彩种标签
	chgWinTag(o,"seled","hmTab");
	showHemailist(o.id);
}


var currentPage=1;
var pageSize=10;

//setInterval("showHemailist();",5000);

function showHemailist(lottery)
{
	doAjax(
		"/app/GetHemaiList.php",
		{
			"lottery":lottery, /*(英文字母代号)*/
			"pSize":10,
			"page":1
		},
		"xml",
		function (xml)
		{
			var page = $(xml).find("orderlist").find("p").attr("curpage"); //当前页
			var totalRecord = $(xml).find("orderlist").find("p").attr("total"); //总记录
			var totalpage = $(xml).find("orderlist").find("p").attr("totalpage"); // 总页码
			//var errtxt = $(xml).find("orderlist").find("p").attr("err"); // 总页码
			//alert(errtxt);
			CreateHeMaiTable($(xml).find("o"),lottery);
			//CreateHeMaiTablePager(totalRecord);//首页不显示分页
		},false);
}

// 写入表格数据
function CreateHeMaiTable(obj,innerwhere)
{

	var html = '';
	html='<table class="hmTab" cellpadding="0" cellspacing="0">'
	+'<tbody>'
	+'<tr><th>发单人</th>'
	+'<th>进度+保底</th>'
	+'<th>内容</th>'
	+'<th>总金额</th>'
	+'<th>每份</th>'
	+'<th>剩余份数</th>'
	+'<th>参与认购</th>'
	+'<th>详情</th>'
	+'</tr>';

	if (obj.length > 0)
	{
		obj.each(function (index, item)
			{
				var baodi='';
				if($(this).attr("A13")=='1'){
					baodi='<span class="bao">+'+$(this).attr("A14")+'<em title="方案保底">保</em>';
				}
				var gongkai='<a  href="detail.php?id=' + $(this).attr("A0") + '">查看</a>';
				if($(this).attr("A15")=='0'){
					gongkai='<a  href="detail.php?id=' + $(this).attr("A0") + '">查看</a>';
				}else{
					gongkai=$(this).attr("A16");
				}
				html+='<tr height="38"><td><a href="detail.php?id=' + $(this).attr("A0") + '">' + $(this).attr("A1") + '</a><span class="level c1_' + $(this).attr("A11") + '"></span></td>';//用户名链接方案
				html+='<input type="hidden" id="ticheng_' + $(this).attr("A0") + '" value="' + $(this).attr("A17") + '" />';//提成
				//html+='<td><span class="level c1_' + $(this).attr("A11") + '"></span></td>';//战绩
				
				//html+='<td><span id="pc_' +$(this).attr("A0") + '">' + $(this).attr("A5") + '</span></td>';//进度
				html+='<td><span id="pc_' +$(this).attr("A0") + '">' + $(this).attr("A5") + '</span>'+baodi+'</td>';//进度
				//html+='<td><a  href="lottery/detail.php?id=' + $(this).attr("A0") + '">查看</a></td>';//详情链接
				html+='<td>'+gongkai+'</td>';//详情链接
				html+='<td>'+formatCurrency($(this).attr("A3"))+'</td>';//方案金额
				html+='<td>'+formatCurrency($(this).attr("A4"))+'</td>';//每份金额
				
				html+='<td><span id="feng_' + $(this).attr("A0") + '">' + $(this).attr("A6") + '</span>份</td>';//剩余份数
				if ( parseInt($(this).attr("A6"))>0 && parseInt($(this).attr("A9"))==1)
				{
					//A9可否购买
					html += '<td><input type="text" id="buy_' + $(this).attr("A0") + '" size="6" value="1" onkeyup="filterD(this);"'
					+ ' perMoney="' + $(this).attr("A4") + '"'
					+ ' leftFeng="' + $(this).attr("A6") + '"'
					+ ' allFeng="' + $(this).attr("A7") + '" /></td>'; //认购输入框
				}else
				{

					if($(this).attr("A12")=="1")
					{
						html +=	'<td><b style="color:red;">'+ $(this).attr("A10")+'</b></td>' ; //中文状态提示
					}else
					{
						html +=	'<td>'+ $(this).attr("A10")+'</td>' ; //中文状态提示
					}

				}
				if ( parseInt($(this).attr("A6"))>0 )
				{
					//如果剩余份数大于0
					html+= '<td><a class="hand but orange1" onclick="buy(' + $(this).attr("A0") +');" ><s>购买</s></a></td>';
				}else
				{
					html+= '<td><a href="lottery/detail.php?id=' + $(this).attr("A0") + '" class=" but orange1" ><s>详情</s></a></td>';
				}
				html+= '</tr>';

			});
	}
	else
	{
		html += '<tr><td colspan="8">未找到符合此条件的数据！请重试！</td></tr>';
	}
	html+='</tbody></table>'
	+'<div class="moreHemai"><a href="lottery/Hemai.php?c='+innerwhere+'">查看更多合买</a></div>';
	var tabindex='0';
	switch(innerwhere)
	{
		case 'pk10':
		tabindex='0';
		break;
		case 'ssc':
		tabindex='1';
		break;
	}
	$("#hmTab"+tabindex).html(html);
}

/****************************************************************************************************
*分页
*****************************************************************************************************/
function CreateHeMaiTablePager(resCount)
{
	var page = new CommonPager(
		"pageNum",
		pageSize,
		resCount,
		currentPage,
		function (p)
		{
			currentPage = parseInt(p);
			showHemailist();
		}
	);
	page.Show();
}
