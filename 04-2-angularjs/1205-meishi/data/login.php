<?php
	$user=$_POST['user'];
	@$pwd=$_POST['pwd'];
	@$phone=$_POST['phone'];
	@$addr=$_POST['addr'];
	date_default_timezone_set('Asia/Shanghai');
	$ptime=date("Y-m-d H:i:s");
    @$reIP=getIP();
	$conn=mysqli_connect('127.0.0.1','lglong519','123','meishi');
	//$conn = mysql_connect(SAE_MYSQL_HOST_M.':'.SAE_MYSQL_PORT,SAE_MYSQL_USER,SAE_MYSQL_PASS);
	//$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
    //设置中文编码
    $sql='SET NAMES UTF8';
    mysqli_query($conn,$sql);
    //验证用户名和密码
    if(isset($phone)){
    	$sql="update ms_user set addr='$addr' where user_name='$user'";
        mysqli_query($conn,$sql);
   		$sql="SELECT user_name,phone,addr,sex FROM ms_user where user_name='$user' and phone='$phone'";
    }else{
    	$sql="SELECT user_name,phone,addr,sex FROM ms_user where user_name='$user' and pwd='$pwd'";
    }
	$result=mysqli_query($conn,$sql);
	$output=[];
	//验证通过后,将localStorage 更新到用户信息
	if ( $row=mysqli_fetch_assoc($result) ) //如果成功验证
	{
		$output[]=$row;
		$jsonString=json_encode($output);
		$sql="update ms_user set pip='$reIP',ptime='$ptime' where user_name='$user'";
   		mysqli_query($conn,$sql);
        echo $jsonString;
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