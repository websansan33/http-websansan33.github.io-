$_conf={};
$_conf.lot = [];
$_conf.lot.push([ 1, "老时时彩","cqssc","ssc" ]);
$_conf.lot.push([ 2, "黑龙江时时彩","hsc","hsc" ]);
$_conf.lot.push([ 3, "星乐彩","xlc","xlc" ]);
$_conf.lot.push([ 4, "新疆时时彩","jsc" ,"jsc"]);
$_conf.lot.push([ 5, "时时乐","ssl","ssl" ]);
$_conf.lot.push([ 6, "福彩3D","f3d" ,"f3d"]);
$_conf.lot.push([ 7, "排列3","pl3","pl3" ]);
$_conf.lot.push([ 8, "山东11选5","syy" ,"syy"]);
$_conf.lot.push([ 9, "江西11选5","syj" ,"syj"]);
$_conf.lot.push([ 10, "广东11选5","syg" ,"syg"]);
$_conf.lot.push([ 11, "重庆11选5","cq115","cq115" ]);
$_conf.lot.push([ 12, "广东快乐十分","sfg" ,"sfg"]);
$_conf.lot.push([ 13, "广西快乐十分","gxkl10","gxkl10" ]);
$_conf.lot.push([ 14, "天津时时彩","tsc","tsc" ]);
$_conf.lot.push([ 15, "北京快乐8","bjkl8" ,"bjkl8"]);
$_conf.lot.push([ 16, "江苏11选5","syjs" ,"syjs"]);
$_conf.lot.push([ 17, "排列5","pl5","pl5"  ]);
$_conf.lot.push([ 18, "双色球","ssq","ssq" ]);
$_conf.lot.push([ 19, "浙江11选5","syz" ,"syz"]);
$_conf.lot.push([ 20, "浙江12选5","sez","sez" ]);
$_conf.lot.push([ 21, "红运快3","k3j","k3j" ]);
$_conf.lot.push([ 23, "七星彩","qxc","qxc" ]);
$_conf.lot.push([ 24, "七乐彩","qlc","qlc" ]);
$_conf.lot.push([ 25, "大乐透","dlt","dlt" ]);
$_conf.lot.push([ 45, "北京赛车","pk10","pk10" ]);
$_conf.lot.push([ 46, "幸运飞艇","xyft","xyft" ]);
$_conf.lot.push([ 47, "丹麦赛马","dmsm","dmsm" ]);
$_conf.lot.push([ 30, "胜负彩","zsf" ,"zc/index.html"]);
$_conf.lot.push([ 31, "任九场","z9c" ,"zc/z9c.html" ]);
$_conf.lot.push([ 32, "六场半全","z6c" ,"zc/z6c.html" ]);
$_conf.lot.push([ 33, "4场进球","z4c" ,"zc/z4c.html" ]);
$_conf.lot.push([ 70, "竞彩混投","jchh" ,"jc/jchh.html"]);
$_conf.lot.push([ 71, "竞彩让球","jcrqspf","jc/rqspf.html" ]);
$_conf.lot.push([ 72, "竞彩胜平负","jcspf" ,"jc/index.html"]);
$_conf.lot.push([ 73, "竞彩猜比分","jccbf","jc/cbf.html" ]);
$_conf.lot.push([ 74, "竞彩半全场","jcbqc" ,"jc/bqc.html"]);
$_conf.lot.push([ 75, "竞彩进球数","jcjqs" ,"jc/jqs.html"]);
$_conf.lot.push([ 80, "北单胜平负","bdspf" ,"bj/index.html"]);
$_conf.lot.push([ 81, "北单猜比分","bdcbf" ,"bj/cbf.html"]);
$_conf.lot.push([ 82, "北单半全场","bdbqc" ,"bj/bqc.html"]);
$_conf.lot.push([ 83, "北单上下单双","bdsxds","bj/sxds.html"]);
$_conf.lot.push([ 84, "北单进球数","bdjqs" ,"bj/jqs.html"]);
$_conf.lot.push([ 90, "篮彩胜负","lqsf" ,"lq/index.html"]);
$_conf.lot.push([ 91, "篮彩让分胜负","lqrfsf","lq/rfsf.html" ]);
$_conf.lot.push([ 92, "篮彩胜分差","lqsfc", "lq/sfc.html"]);
$_conf.lot.push([ 93, "篮彩大小分","lqdxf","lq/dxf.html"]);
$_conf.lot.push([ 94, "篮彩混投","lqhh", "lq/lchh.html"]);


$_conf.type = [];
$_conf.type.push([ 1, "购彩" ]);
$_conf.type.push([ 2, "追号" ]);
$_conf.type.push([ 3, "合买认购" ]);
$_conf.type.push([ 4, "保底" ]);
$_conf.type.push([ 5, "提现" ]);
$_conf.type.push([ 16, "扣除" ]);
$_conf.type.push([ 17, "网站认购" ]);
$_conf.type.push([ 6, "充值" ]);
$_conf.type.push([ 7, "奖金" ]);
$_conf.type.push([ 8, "提成" ]);
$_conf.type.push([ 9, "用户撤单" ]);
$_conf.type.push([ 10, "合买撤单返款" ]);
$_conf.type.push([ 11, "保底解冻" ]);
$_conf.type.push([ 12, "赠送" ]);
$_conf.type.push([ 13, "提现失败" ]);
$_conf.type.push([ 14, "系统撤单" ]);
$_conf.type.push([ 15, "返点" ]);
$_conf.type.push([ 18, "合买成功解冻" ]);
$_conf.type.push([ 19, "撤销网站认购" ]);
$_conf.type.push([ 20, "积分兑换" ]);


$_conf.getLotname = function(f) {
	//获得lot配置ID对应的中文名称
	for ( var i = 0; i < $_conf.lot.length; i++) {
		if ($_conf.lot[i][0] == f) {
			return $_conf.lot[i][1];
		}
	}
};
$_conf.getLotname_en = function(f) {
	//获得lot配置ID对应的拼音缩写
	for ( var i = 0; i < $_conf.lot.length; i++) {
		if ($_conf.lot[i][0] == f) {
			return $_conf.lot[i][2];
		}
	}
};

$_conf.getFilepath = function(f) {
	//获得lot配置ID对应的网站子目录
	for ( var i = 0; i < $_conf.lot.length; i++) {
		if ($_conf.lot[i][0] == f) {
			return $_conf.lot[i][3];
		}
	}
};

$_conf.getOrdertype = function(f) {
	//获得type配置ID对应的中文(资金流水)
	for ( var i = 0; i < $_conf.type.length; i++) {
		if ($_conf.type[i][0] == f) {
			return $_conf.type[i][1];
		}
	}
};

//alert($_conf.getLotname_en(1));
//alert($_conf.getOrdertype(1));