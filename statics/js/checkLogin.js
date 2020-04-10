 //(function($) {
 $(function() {
 $.ajax({
		type: "get",
        url: "/public/check.php?r=" + Math.random(),
		cache: false,
		dataType:'json',
		async:true,
        success: function(res) {
            var code = res.res;
               if ( parseInt(code)==1){
               task.dialogTips.popWin($("#loginPanel"));
			  // setTimeout("top.location.href='/login.php'", 1000); 
			   } else {
			   var username = res.username;
               $("#username").html(username);
			   $('#noLoginInfo').hide();
		       $('#loginTopInfo').show();
			   }
        }
    });
 });
//})(jQuery); 
