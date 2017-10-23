<?php
//	分页显示菜品,每页显示5条,json格式
	header('Content-type:application/json');

//	接收客户端提交的数据
//@ 符号压制当前行 产生的所有警告消息
	@$start=$_REQUEST['start'];
	//判断变量是否已定义
	if(!isset($start)){
		$start=0;
	}
	$count=5;
	//sleep(1);
//	执行数据库操作
	$conn=mysqli_connect('127.0.0.1','lglong519','123','meishi');
	//设置中文编码
	$sql='SET NAMES UTF8';
	mysqli_query($conn,$sql);

	//分页查询 select * from table limit [start,count]
	$sql="select did,name,price,img_sm,material from ms_dish limit $start,$count";
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