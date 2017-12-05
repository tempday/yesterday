<?php
//	根据菜名/原料中的关键字查询菜品,json格式
	header('Content-type:application/json');

//	接收客户端提交的数据-关键字
	@$keywd=$_REQUEST['keywd'];
	//判断变量是否已定义
	//@$keywd='虾';
	if(!isset($keywd)){
		echo '[]';//未提交数据返回空数组
		return;
	}
	//	执行数据库操作
	$conn=mysqli_connect('127.0.0.1','lglong519','123','meishi');
	//设置中文编码
	$sql='SET NAMES UTF8';
	mysqli_query($conn,$sql);
	//根据关键字 模糊查询
	$sql="select did,name,price,img_sm,material from ms_dish where name LIKE '%$keywd%' or material like '%$keywd%'";
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