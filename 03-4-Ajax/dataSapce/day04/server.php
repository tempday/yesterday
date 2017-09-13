<?php
    $conn=mysqli_connect('127.0.0.1','lglong519','123','jd','3306');
    $sql="select o.order_id,o.order_num,o.shop_name,o.shop_url,o.price,o.payment_mode,o.submit_time,o.order_state,p.product_name,p.product_url,p.product_img from jd_orders o,jd_order_product_detail d,jd_products p where o.order_id=d.order_id and d.product_id=p.product_id and o.user_name='aaa'";
    mysqli_query($conn,'set names utf8');
    $result=mysqli_query($conn,$sql);
	$orders=array();
    while($row=mysqli_fetch_assoc($result)){
    	//获得每个order_id
		array_push($orders,$row);
    }
    $json=json_encode($orders);
    mysqli_close($conn);
    echo $json;
    //echo '{"order":"001"}';
?>