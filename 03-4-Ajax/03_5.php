<?php
	//$username=$_POST['username'];
	//$pwd=$_POST['pwd'];
	//$username=$_GET['username'];
	//$pwd=$_GET['pwd'];
	//json 格式 单引+双引
	//echo '{"username":"'.$username.'","pwd":"'.$pwd.'"}';
	//echo "{'username':'lglong'}";
	//跨域请求只有javascript函数体才能响应回去
	$call=$_GET['callback'];
	echo $call."({'username':'lglong'})";
?>