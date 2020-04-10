var fastline=0;
var fastspeed=0;
var testcount=0;
function urltest(domian_root){
  var urlary={'0':0,'1':0,'2':0,'3':0};
  //var speedary=new Array();
  $("#tips").css({'margin-top':'5px','color':'#6a2500','font-size':'0.8rem'});
  $("#tips").html(jslang[1]);
  testcount=0;
  $.each(urlary,function(item,value){
      var curUrl=(location.host=='localhost'?'//'+location.host:"//s"+item+"."+getMainHost())+"/speedtest.php";
      $('#s'+item+'>i:not(:eq(0))').html('');
      //console.log('s'+item);
      pagePingTest(curUrl,function(speedvalue){
          speedresult(item,speedvalue);
          urlary[item]=speedvalue;
          $('#s'+item).find('i').eq(1).append(speedvalue+'ms');
        });
    });
  var subAry=['0','1','2','3'];
  $.each(subAry, function(index,subhost) {
      pageSpeedtest(subhost,function(speedvalue){
          $('#s'+subhost).find('i').eq(2).append(speedvalue+"k/s");
          fastcheck(subhost,speedvalue);
        });
    });
}

function fastcheck(line,speed){
	//if(fastspeed>0){
		if(speed>fastspeed){
			fastspeed=speed;
			fastline=line;
		}
	//}else{
		//fastspeed=speed;
		//fastline=line;
	//}
	testcount++;
	if(testcount>=3){
		$("#tips").html(jslang[2]);
		$('#s'+fastline).find('i').eq(0).append(" "+jslang[0]);
	}
}

function pagePingTest(urltxt,fun){
  //访问线路,返回0不可用其它值为速度
  //ajax不能跨域访问
  var visitStart=(new Date()).getTime();
  var visitend=visitStart;
  var visitTime=0;
  var ajaxTimeoutTest=$.ajax({
      type: "get",
      url: urltxt+"?r=" + Math.random(),
      //timeout: 3000,
      cache: false,
      //dataType: 'json',
      //contentType: "application/json",
      async: true,
      error: function(jsxhr,textStatus,errorThrown) {
        if(textStatus=="timeout"){
          visitTime=0;
          ajaxTimeoutTest.abort();
          //console.log('超时');
        }else{
          visitTime=(new Date()).getTime()-visitStart;
          //console.log('正常访问'+textStatus);
          //ajaxTimeoutTest.abort();
        }
        if($.isFunction(fun)){
          fun(visitTime);
        }
        //speedresult(linenum,visitTime);
      },
      success: function(res) {
        visitTime=(new Date()).getTime()-visitStart;
        //console.log('成功访问');
        if($.isFunction(fun)){
          fun(visitTime);
        }
        //speedresult(linenum,visitTime);
      }
    });
  return false;
}

function speedresult(linenum,visitTime){
  if(visitTime==0){
    $("#s"+linenum+'>i:not(:eq(2))').css({'color': '#a60000'});
  }else{
    if(visitTime<2000){
      $("#s"+linenum+'>i:not(:eq(2))').css({'color': '#028009'});
    }else{
      $("#s"+linenum+'>i:not(:eq(2))').css({'color': '#884f00'});
    }
  }
}

function getMainHost() {
  let key  = `mh_${Math.random()}`;
  let keyR = new RegExp(`(^|;)\\s*${key}=12345`);
  let expiredTime = new Date(0);
  let domain = document.domain;
  let domainList = domain.split('.');

  let urlItems=[];
  // 主域名一定会有两部分组成
  urlItems.unshift(domainList.pop());
  // 慢慢从后往前测试
  while(domainList.length){
    urlItems.unshift(domainList.pop());
    let mainHost=urlItems.join('.');
    let cookie=`${key}=${12345};domain=.${mainHost}`;

    document.cookie = cookie;

    //如果cookie存在，则说明域名合法
    if(keyR.test(document.cookie)){
      document.cookie = `${cookie};expires=${expiredTime}`;
      return mainHost;
    }
  }
}

function pageSpeedtest(subhost,fun){
  //$.each(subAry, function(index,subhost) {
  //console.log(index, subhost, this);
  let RandNum = 1 + Math.round(Math.random() * 100000);
  let webhost=location.host=='localhost'?location.host:'s'+subhost+'.'+getMainHost();
  let bgpath = "//"+webhost+"/speed.jpeg?_t="+RandNum;
  let bgImg= new Image();
  let st = new Date();
  bgImg.src=bgpath;
  //bgImg.crossOrigin="*";
  //bgImg.setAttribute("crossOrigin", 'Anonymous');
  if(bgImg.complete){
    //已经缓存
  }else{
    //加载图片
    bgImg.onload=function(){
      let fs = 1.97*1024;  //图片文件大小(KB)
      let l = 2;    //小数点的位数
      let et = new Date();
      //console.log('大小'+bgImg.dynsrc);
      //console.log('历时'+(et - st));
      alltime = fs*1000/(et - st)
      Lnum = Math.pow(10,l)
      calcspeed = Math.round(Math.round(alltime*Lnum)/Lnum);
      linewide = Math.round(calcspeed/128*Lnum)/Lnum;
      //console.log(calcspeed+" KB/秒");
      //console.log(linewide+" Mbps");
      if($.isFunction(fun)){
        fun(calcspeed);
      }


    }
  }

  //});
}

