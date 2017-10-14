<?php
//	接收客户端提交的数据,存入数据库
//@ 符号压制当前行 产生的所有警告消息
	@$order=$_REQUEST['order'];
	//$order='{"phone":1313,"user_name":"aa","sex":2,"addr":"阿法","did":3}';
	$colNames=["phone","user_name","sex","addr","did"];
	//判断变量是否已定义
	if(!isset($order)){
		echo '{"status":"error","msg":"客户端提交的请求数据不足"}';
		return;
	}
	$data=json_decode($order);
	$bool=true;
	//判断$data数据是否齐全
	for($i=0;$i<count($colNames);$i++){
		if(!property_exists($data,$colNames[$i])){
			$bool=false;
		}
	}
//	执行数据库操作
	$conn=mysqli_connect('127.0.0.1','lglong519','123','meishi');
	//设置中文编码
	$sql='SET NAMES UTF8';
	mysqli_query($conn,$sql);
	$output=[];
	if($bool){
		//先获得已有订单编号,然后+1
		$sql="select max(order_num) from ms_order";
		//$sql="select order_num from ms_order where oid>10";
		$num=mysqli_query($conn,$sql);
		$order_num=mysqli_fetch_assoc($num)['max(order_num)'];
		if($order_num){
			$order_num++;
		}else{
			$order_num=101;
		}
		//$order_num=rand(100,999);
		//time获得的是秒
		$order_time=time()*1000;
	//将订单数据填入ms_order表中
	$sql="insert into ms_order(oid, phone,user_name,sex,order_time,addr,did,order_num) values(
	null,
	$data->phone,
	'$data->user_name', 
	$data->sex,
	$order_time,
	'$data->addr',
	$data->did,
	$order_num
	)";//字符类型的数据要加引号
		if($result=mysqli_query($conn,$sql)){
			$output['status']='success';
			//获得最近一条insert sql语句所生成的自增主键
			//$output['oid']=mysqli_insert_id($conn);
			$output['order_num']=$order_num;
		}else{
			$output['status']='error';
			$output['msg']="数据库访问失败!SQL:$sql";
		}

	}else{
		$output['status']='error';
        $output['msg']="客户端提交的请求数据不足";
	}
	echo json_encode($output);
	mysqli_close($conn);
?>