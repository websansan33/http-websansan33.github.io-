(function ($) {
    /*jQuery对象添加  runNum  方法*/
    $.fn.extend({
        /*
        *  滚动数字
        *  @ val 值，  params 参数对象
        *  params{addMin(随机最小值),addMax(随机最大值),interval(动画间隔),speed(动画滚动速度),width(列宽),height(行高)}
        */
        runNum:function (val,params) {
          /*初始化动画参数*/
          var numbox=$(this).children("s");
          //$(this).css({'padding':'0'});
          //console.log(numbox.length);
          if(numbox.length<1){
          	//console.log('创新');
		  	numbox=$('<s></s>');
            $(this).empty().append(numbox);
		  }
		  var valString = val || '0';
          var newlen=valString.toString().length;
          var oldvalue= numbox.data('oldval') || valString;
          var oldlen=oldvalue.toString().length;
          var par= params || {};
          
          //取得文字字体大小
          var cssfontSize=(parseFloat(numbox.css('font-size').replace('px',''))+2)/2; //字大小去px,英文宽除2
          var cssfontspace=parseFloat(numbox.css('letter-spacing').replace('px',''));//字宽去px
          var csslineheight=parseFloat(numbox.css('line-height').replace('px',''));//字高去px
          
          var runNumJson={
            el:numbox,
            value:valString,
            //上一次的值,从data属性获取
            oldval:oldvalue,
            oldvalStr:oldvalue.toString(),
            valueStr:valString.toString(),
            width:par.width || cssfontSize+cssfontspace,
            height:par.height || csslineheight,
            addMin:par.addMin || 10000,
            addMax:par.addMax || 99999,
            interval:par.interval || 1000,
            speed:par.speed || 300,
            length:valString.toString().length,
            oldlen:newlen>oldlen?newlen:oldlen
          };
          $._runNum._list(numbox,runNumJson);
          //$._runNum._interval(runNumJson.el.children("d"),runNumJson);
          
        }
      });
    /*jQuery对象添加  _runNum  属性*/
    $._runNum={
      /*初始化数字列表*/
      _list:function (el,json) {
      	//console.log('json.height'+json.height);
      	//调整父元素宽度
      	el.parent().css({'width':(el.position().left+json.length*(json.width+1.6))+'px'});
      	/*
      	console.log(el.css('font-size'));
      	console.log(json.width);
      	console.log(el.position().left);
      	console.log(el.css('line-height'));
      	console.log(el.css('letter-spacing'));
      	*/
      	//console.log(json.width);
      	el.css({
      		'position':'absolute',
      		'display':'inline-block',
      		'vertical-align':'middle',
      		'height':json.height+'px',
      		//'top':'0',
      		//'left':'0',
            'padding':'0',
            'margin':'0 auto',
      		//'margin-left':'2px',
            'overflow':'hidden',
            //'line-height':json.height+'px'
            });
        var str='';
        for(var i=0; i<json.oldlen;i++){
          var w=(json.width-2)*i;
          //console.log('left'+i+'---'+w);
          var t=json.height*parseInt(json.oldvalStr[i]);
          var h=json.height*10;
          str +='<d style="position:absolute; width:'+json.width+'px; left:'+w+'px; top: '+-t+'px;height:'+h+'px;">';
          for(var j=0;j<10;j++){
            str+='<div style="height:'+json.height+'px;line-height:'+json.height+'px;">'+j+'</div>';
          }
          str+='</d>';
        }
        el.html(str);
        el.css({'width':(json.length*json.width)+'px'});
        $._runNum._animate(json.el.children("d"),json.value.toString(),json);
        el.data('oldval',json.value);
        
      },
      /*生成随即数*/
      _random:function (json) {
        var Range = json.addMax - json.addMin;
        var Rand = Math.random();
        var num=json.addMin + Math.round(Rand * Range);
        return num;
      },
      /*执行动画效果*/
      _animate:function (el,value,json) {
        for(var x=0;x<json.length;x++){
          var topPx=value[x]*json.height;
          el.eq(x).animate({top:-topPx+'px'},json.speed);
        }
      },
      /*定期刷新动画列表*/
      _interval:function (el,json) {
        var val=json.value;
        setInterval(function () {
            val+=$._runNum._random(json);
            $._runNum._animate(el,val.toString(),json);
          },json.interval);
      }
    }
  })(jQuery);

