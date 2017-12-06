<?php
//	根据电话号码返回所有订单,json格式
	header('Content-type:application/json');

//	接收客户端提交的数据
//@ 符号压制当前行 产生的所有警告消息
	@$phone=$_REQUEST['phone'];
	//$phone=13501234567;
	//判断变量是否已定义
	if(!isset($phone)){
		echo '[]';
		return;
	}
//	执行数据库操作
	$conn=mysqli_connect('127.0.0.1','lglong519','123','meishi');
	//设置中文编码
	$sql='SET NAMES UTF8';
	mysqli_query($conn,$sql);

	//根据phone多表查询
	$sql="select o.did,o.order_num,d.img_sm,o.order_time,o.user_name from ms_dish d,ms_order o where o.phone=$phone and o.did=d.did";
	$output=[];
	$result=mysqli_query($conn,$sql);

	while ( $row=mysqli_fetch_assoc($result) )//不用写 !=NULL
	{
		$output[]=$row;
	}
	//	向客户端输出响应消息主体
	$jsonString=json_encode($output);//以json字符串方式编码
	echo $jsonString;
?>