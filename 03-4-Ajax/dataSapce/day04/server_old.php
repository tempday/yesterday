<?php
    $conn=mysqli_connect('127.0.0.1','lglong519','123','jd','3306');
    $sql="select * from jd_orders where user_name='aaa'";
    mysqli_query($conn,'set names utf8');
    $result=mysqli_query($conn,$sql);
	//$rows=mysqli_fetch_array($result);
	$orders=array();
    while($rows=mysqli_fetch_assoc($result)){
    	//var_dump($rows);
    	//获得每个order_id
    	$orderid=$rows['order_id'];
		array_push($orders,$orderid);
		//用order_id 查找其他表格的数据
		echo $orderid;
		$sql='select p.product_name,p.product_url,p.product_img from jd_order_product_detail d,jd_products p
			where d.product_id=p.product_id and d.order_id='.$orderid;
			var_dump( $sql);
		mysqli_query($conn,'set names utf8');
		$product=mysqli_query($conn,$sql);
		var_dump($product);
    }
	//var_dump($product['product_name']);
    mysqli_close($conn);
    echo "{'pname':'123'}";
?>