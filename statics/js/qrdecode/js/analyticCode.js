!function(){
  "use strict";

  //获取预览图片路径
  let getObjectURL = function(file){
    let url = null ;
    if (window.createObjectURL!=undefined) { // basic
      url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
  }


  window.analyticCode = {
    //elem 图片或上传控件 fn 回调返回参数
    getUrl : function(type,elem,fn){
      let url = null,src = null;
      if(type === 'img-url'){
        //图片文件链接方式
        url = elem.src;
      }else if(type === 'file-url' && elem.files.length > 0){
        //文件上传方式
        url = getObjectURL(elem.files[0]);
      }else if(type === 'data-url'){
        //画布数据方式
        url = elem;
      }
      qrcode.decode(url);
      qrcode.callback = function(imgMsg){
        fn(imgMsg,url);
      }
    }
  }
}()
