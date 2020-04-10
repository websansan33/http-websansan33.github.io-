// 分离颜色参数  返回一个数组
function QRoptimize(){

  // 属性
  // 方向数组
  var next = [
    [0, 1], //右
    [1, 0], //下
    [0, -1], // 左
    [-1, 0] //上
  ];
  var canvas = $('#code').find("canvas")[0];
  var imgwidth = canvas.width;
  var imgheight = canvas.height;
  var foreground = colorRgb("#181818"); //只替换对应的前景色
  //alert(bg[0]);
  var imgD; //预留给 像素信息数组
  var colors = ["#368BFF", "#EF2767", "#0f0fb7", "#399690", "#5aa6f7", "#fd417e", "#296a22", "#59b6a6"];  //染色数组
  // 随机colors数组的一个序号
  var ranNum = (function() {
      var len = colors.length;
      return function() {
        return Math.floor(Math.random() * len);
      }
    })();

  // 标记数组来记录判断过的位置
  var book = [];
  for (var i = 0; i < imgheight; i++) {
    　　book[i] = [];
    　　for (var j = 0; j < imgwidth; j++) {
      　　　　book[i][j] = 0;
      　　}
  }
  /*
  var colorRgb = (function() {
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

  return function(str) {
  var sColor = str.toLowerCase();
  if (sColor && reg.test(sColor)) {
  if (sColor.length === 4) {
  var sColorNew = "#";
  for (var i = 1; i < 4; i += 1) {
  sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
  }
  sColor = sColorNew;
  }
  //处理六位的颜色值
  var sColorChange = [];
  for (var i = 1; i < 7; i += 2) {
  sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
  }
  return sColorChange;
  } else {
  var sColorChange = sColor.replace(/(rgb\()|(\))/g, "").split(",").map(function(a) {
  return parseInt(a);
  });
  return sColorChange;
  }
  }
  })();
  */
  function colorRgb(str) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    //return function(str) {
      var sColor = str.toLowerCase();
      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          var sColorNew = "#";
          for (var i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
          }
          sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
          sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return sColorChange;
      } else {
        var sColorChange = sColor.replace(/(rgb\()|(\))/g, "").split(",").map(function(a) {
            return parseInt(a);
          });
        return sColorChange;
      }
      
    //}
  }

  // 验证该位置的像素 不是背景色为true
  function checkColor(i, j, imgwidth) {
    var x = calc(imgwidth, i, j);
    if (imgD.data[x] != foreground[0] && imgD.data[x + 1] != foreground[1] && imgD.data[x + 2] != foreground[2]) {
      return false;
    } else {
    	//console.log(imgD.data[x]+'---'+imgD.data[x]+'---'+imgD.data[x]);
      return true;
    }
  }

  // 改变颜色值
  function changeColor(i, j, colorArr) {
    var x = calc(imgwidth, i, j);
    imgD.data[x] = colorArr[0];
    imgD.data[x + 1] = colorArr[1];
    imgD.data[x + 2] = colorArr[2];
  }


  // 返回对应像素点的序号
  function calc(imgwidth, i, j) {
    if (j < 0) {
      j = 0;
    }
    return 4 * (i * imgwidth + j);
  }



  // 深度优先搜索
  function dfs(x, y, color) {
    changeColor(x, y, color);
    for (var k = 0; k <= 3; k++) {
      // 下一个坐标
      var tx = x + next[k][0];
      var ty = y + next[k][1];
      //判断越界
      if (tx < 0 || tx >= imgheight || ty < 0 || ty >= imgwidth) {
        continue;
      }
      if (book[tx][ty] == 0 && checkColor(tx, ty, imgwidth)) {
        // 判断位置
        book[tx][ty] = 1;
        dfs(tx, ty, color);
      }
    }
    return;
  }


  // canvas 部分
  //var canvas = document.createElement('canvas');

  //document.body.appendChild(canvas);
  //canvas.style.display="none";
  var ctx = canvas.getContext("2d");

  //var imgtmp = new Image();
  //imgtmp.src = previewimg.src; //这里的path就是图片的地址
  //previewimg.onload = function() {
  //ctx.drawImage(previewimg, 0, 0, imgwidth, imgheight);
  imgD = ctx.getImageData(0, 0, imgwidth, imgheight);
  for (var i = 0; i < imgheight; i++) {
    for (var j = 0; j < imgwidth; j++) {
      if (book[i][j] == 0 && checkColor(i, j, imgwidth)) { //没标记过 且是非背景色
        book[i][j] = 1;
        var color = colorRgb(colors[ranNum()]);
        dfs(i, j, color);  //深度优先搜索
      }
    }
  }
  ctx.putImageData(imgD, 0, 0);
  //}

  //方法
  if (typeof this.sayName != "function"){
    QRoptimize.prototype.sayName = function(){
      alert(this.name);
    };
  }

}
//var friend = new Person("Nicholas", 29, "Software Engineer");
//friend.sayName();


