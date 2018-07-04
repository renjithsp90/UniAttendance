$(document).ready(function(){
	$error_result = $('<center><label class = "text-danger">Invalid username or password</label></center>');
	$error_result2 = $('<center><label class = "text-danger">Please complete the required field</label></center>');
	$loading = $('<center><img src = "images/499.gif" height = "15px" /></center>');
	$('#login').click(function(){
		$error_result.remove();
		$("#username").focus(function(){
			$("#username_warning").removeClass('has-feedback has-error');
			$('#username_warning').find('span').remove();
		});
		$('#password').focus(function(){
			$('#password_warning').removeClass('has-feedback has-error');
			$('#password_warning').find('span').remove();
		});
		$username = $('#username').val();
		$password = $('#password').val();
		if($username == "" && $password == ""){
			$('#username_warning').addClass('has-feedback has-error');
			$('<span class = "glyphicon glyphicon-remove form-control-feedback"></span>').appendTo('#username_warning');
			$('#password_warning').addClass('has-feedback has-error');
			$('<span class = "glyphicon glyphicon-remove form-control-feedback"></span>').appendTo('#password_warning');
			$error_result2.appendTo('#result');
		}else{
			$loading.fadeIn().appendTo('#result');
			$(this).attr('disabled', 'disabled');
			$error_result2.remove();
			setTimeout(function(){
				$loading.remove();
				$.post('login.php', {username: $username, password: $password},
					function(result){
						console.log("RES", result);
						if(result.includes('success')){
							window.location = 'home.php';
						}else{
							$error_result.fadeIn().appendTo('#result');
							$('#login').removeAttr('disabled');
						}
					}
				);
			}, 3000);	
		}
	});
});