(function ($) {
    //var canvas = document.getElementById('canvas')
    //var ctx = canvas.getContext('2d')
    //加载网络字体
    /*
    var link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = '../fonts/cn/长城行楷体.css?family=长城行楷体';
    link.crossOrigin=true;
    document.getElementsByTagName('head')[0].appendChild(link)
    var image = document.createElement('img')
    image.src = link.href
    image.onerror = function () {
      document.fonts.load('50px Vast Shadow', '123').then(function() {
          //ctx.font = '50px "Vast Shadow"'
          //ctx.textBaseline = 'top'
          //ctx.fillText('123', 20, 10)
        });
    }
    */
    var randomFont = function(min, max){return Math.floor(Math.random() * (max - min + 1) + min)};
    function Barrager(dom) {
      this.canvas = dom.get(0);//jquery对象获取dom元素
      this.ctx = this.canvas.getContext("2d");
      this.msgs = new Array(100);//缓冲池，长度越大，屏幕上显示的就越多
      //this.width = 1280;//canvas分辨率1280*720
      //this.height = 720;
      //console.log('弹幕元素宽'+dom.width()+'弹幕元素高'+dom.height());
      this.width = dom.width();
      this.height = dom.height();
      this.canvas.width=this.width;//上边的两步可以省略，直接在这里赋值
      this.canvas.height=this.height;
      this.fsize=randomFont(19,22);
      console.log('字体'+this.fsize);
      //this.font = "16px 黑体";//字体和字体大小
      this.font = this.fsize+'px 黑体';
      this.ctx.font=this.font;
      this.ctx.lineWidth = randomFont(3,4);
      //颜色数组，在绘制过程中随机从这里取出颜色
      //this.colorArr=["Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue"];
      this.colorArr=["OliveDrab","OrangeRed","Orchid","Purple","Red","RoyalBlue","SaddleBrown","SeaGreen"];
      this.strokeArr=["white","SeaShell","PaleGoldenRod","PapayaWhip"];
      this.interval = "";
      this.draw = function () {//绘制方法
        if (this.interval != "")return;
        var _this=this;
        this.interval = setInterval(function () {//每隔20毫秒重新绘制一次，间隔最好小于40，要不然效果就跟播放图片差不多
            //1，清除屏幕
            _this.ctx.clearRect(0, 0, _this.width, _this.height);
            _this.ctx.save();
            //2，循环缓冲区域，把没有设置Left，Top，Speed，Color先赋值，赋值的就改变left值（产生移动效果），left值小于负200就会从缓冲区移除
            for (var i = 0; i < _this.msgs.length; i++) {
              if (!(_this.msgs[i] == null || _this.msgs[i] == "" || typeof(_this.msgs[i]) == "undefined")) {
                if(_this.msgs[i].L==null || typeof(_this.msgs[i].L)=="undefined"){
                  _this.msgs[i].F=randomFont(19,22); //fontsize
                  _this.msgs[i].L=_this.width;//显示的位置
                  _this.msgs[i].T=_this.msgs[i].F+parseInt(Math.random() * (_this.height-(_this.msgs[i].F*2)));//0-700 高度
                  _this.msgs[i].S=Math.random() * (5 - 2) + 1;//4-9每次更新减的位置
                  _this.msgs[i].C=_this.colorArr[Math.floor(Math.random() * _this.colorArr.length)];//颜色
                  
                }else{
                  if(_this.msgs[i].L<-300){
                    _this.msgs[i]=null;
                  }else {
                    _this.msgs[i].L=parseInt(_this.msgs[i].L-_this.msgs[i].S);
                    _this.ctx.font=_this.msgs[i].F+'px 黑体';
                    //_this.ctx.lineWidth = randomFont(3,4);
                    //_this.ctx.strokeStyle = 'white';
                    _this.ctx.strokeStyle =_this.strokeArr[Math.floor(Math.random() * _this.strokeArr.length)];
      				_this.ctx.strokeText(_this.msgs[i].msg,_this.msgs[i].L,_this.msgs[i].T);
                    _this.ctx.fillStyle =_this.msgs[i].C;
                    _this.ctx.fillText(_this.msgs[i].msg,_this.msgs[i].L,_this.msgs[i].T);
                    _this.ctx.restore();
                  }
                }
              }
            }
          }, 20);
      };
      //添加数据，数据格式[{"msg":"nihao"}]
      this.putMsg = function (datas) {//循环缓冲区，把位置是空的装填上数据
        for (var j = 0; j < datas.length; j++) {
          for (var i = 0; i < this.msgs.length; i++) {
            if (this.msgs[i] == null || this.msgs[i] == "" || typeof(this.msgs[i]) == "undefined") {
              this.msgs[i] = datas[j];
              break;
            }
          }
        }
        this.draw();
      };
      this.clear = function () {//清除定时器，清除屏幕，清空缓冲区
        clearInterval(this.interval);
        this.interval="";
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.save();
        for(var i=0;i<this.msgs.length;i++){
          this.msgs[i]=null;
        }
      };
    }

    $.fn.barrager = function (para) {
      if (typeof(para)=="string") {//用来调用clear方法,清空弹幕
        try{
          var api = $(this).data('barrager_api');
          api[para].apply(api);
        }catch (e){}
      } else if (typeof para == 'object' || !para) {
        $this = $(this);
        if ($this.data('barrager_api') != null && $this.data('barrager_api') != ''){
          var api = $this.data('barrager_api');
          api.putMsg(para);
        }else{
          var api = new Barrager($this);
          $this.data('barrager_api', api);
          api.putMsg(para);
        }
      } else {
        $.error('Method ' + method + ' does not exist on jQuery.slidizle');
      }
      return this;
    }
  })(jQuery);
//$('canvas').barrager([{"msg":"这是我发的。。。哈哈哈"}]);// 发送弹幕
//$('canvas').barrager([{"msg":"看着不错。。。。"},{"msg":"真好看。。。。"}]);//多条发送方式
//$('canvas').barrager("clear"); //清除/关闭弹幕