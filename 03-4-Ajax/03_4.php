<?php
	//$username=$_POST['username'];
	//$pwd=$_POST['pwd'];
	$username=$_GET['username'];
	$pwd=$_GET['pwd'];
	//json 格式 单引+双引
	echo '{"username":"'.$username.'","pwd":"'.$pwd.'"}';
?>