$(function()
  {
    $("#opencodebtn").click(function()
      {
      	var codepanelindex
        if ($("#opencodelayer").hasClass("glyphicon-chevron-down"))
        {
          $("#opencodelayer").removeClass("glyphicon-chevron-down");
          $("#opencodelayer").addClass("glyphicon-chevron-up");
          //滚动到底部
          //$('html,body').animate({scrollTop: $('#betM').offset().top},1000);
          //tab层
          var layertop=$("#opencodebtn").offset().top+$("#opencodebtn").height();
          codepanelindex=layer.open({
          	  /*type: 1,*/
          	  anim: 7,
          	  shadeClose: false,
          	  shade: false,
	  		  closeBtn:0,
	  		  btn:0,
	  		  id: 'codepanel',
	  		  title: false,
	  		  scrollbar:false,
	  		  /*skin: 'layui-layer-rim', //加上边框*/
              area: [$(window).width()-4+'px', $(window).height()-layertop+'px'],
              offset: layertop+'px',
              content: $('#codeTab').html()
            });
        } else
        {
          $("#opencodelayer").removeClass("glyphicon-chevron-up");
          $("#opencodelayer").addClass("glyphicon-chevron-down");
          layer.closeAll();
          //滚动到顶部
          //$('html,body').animate({scrollTop: '0px'}, 1000);
        }
      });
  });