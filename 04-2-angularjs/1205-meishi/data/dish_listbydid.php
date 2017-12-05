<?php
//	根据did查询菜品详情,json格式
	header('Content-type:application/json');

//	接收客户端提交的数据-关键字
	@$did=$_REQUEST['did'];
	//判断变量是否已定义
	//@$did='虾';
	//$did=1;
	if(!isset($did)){
		echo '{}';//因为是单个菜品,返回 一个空对象
		return;
	}
	//	执行数据库操作
	$conn=mysqli_connect('127.0.0.1','lglong519','123','meishi');
	//设置中文编码
	$sql='SET NAMES UTF8';
	mysqli_query($conn,$sql);
	//根据关键字 模糊查询
	$sql="select did,name,price,img_lg,material,detail from ms_dish where did=$did";//did是num类型,不用引号
	$result=mysqli_query($conn,$sql);
	//仅获得一个数据,返回的是一个对象非数组
	if( $row=mysqli_fetch_assoc($result) )//不用写 !=NULL
	//	向客户端输出响应消息主体
	{
	$jsonString=json_encode($row);//以json字符串方式编码
	echo $jsonString;
	}
?>