<?php
	$user=$_POST['user'];
	$pwd=$_POST['pwd'];
	$phone=$_POST['phone'];
	$sex=$_POST['sex'];
	$addr=$_POST['addr'];
	date_default_timezone_set('Asia/Shanghai');
	$ptime=date("Y-m-d H:i:s");
    @$reIP=getIP();
	//执行数据库操作
	$conn=mysqli_connect('127.0.0.1','lglong519','123','meishi');
	//$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
	//设置中文编码
	$sql='SET NAMES UTF8';
	mysqli_query($conn,$sql);
	$sql="INSERT INTO ms_user(uid,phone,sex,addr,user_name,pwd,ptime,pip) VALUES (NULL,'$phone','$sex','$addr','$user','$pwd','$ptime','$reIP')";
	mysqli_query($conn,$sql);
	$sql="SELECT uid FROM ms_user where user_name='$user'";
	//var_dump($sql);
	$result=mysqli_query($conn,$sql);
	if ( $row=mysqli_fetch_assoc($result) ) //如果成功添加用户
	{
		echo 'success';
	}else{
		echo false;
	}
	function getIP() {
	if (getenv('HTTP_CLIENT_IP')) {
            		$ip = getenv('HTTP_CLIENT_IP');
            		}
            		elseif (getenv('HTTP_X_FORWARDED_FOR')) {
            		$ip = getenv('HTTP_X_FORWARDED_FOR');
            		}
            		elseif (getenv('HTTP_X_FORWARDED')) {
            		$ip = getenv('HTTP_X_FORWARDED');
            		}
            		elseif (getenv('HTTP_FORWARDED_FOR')) {
            		$ip = getenv('HTTP_FORWARDED_FOR');

            		}
            		elseif (getenv('HTTP_FORWARDED')) {
            		$ip = getenv('HTTP_FORWARDED');
            		}
            		else {
            		$ip = $_SERVER['REMOTE_ADDR'];
            		}
            		return $ip;
            	}
?>