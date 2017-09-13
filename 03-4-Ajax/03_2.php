<?php
	$state=$_REQUEST["state"];
	if($state==0){
		echo '["北京","广东省","山西省","西藏省"]';
	}else{
		$province=$_POST["province"];
		switch ( $province )
		{
			case "北京":
				echo "天安门,广州市,珠海市,汕头市,韶关市,佛山市";
				break;
			case "广东省":
				echo "广州市,深圳市,珠海市,汕头市,韶关市,佛山市";
				break;
			case "山西省":
				echo "太原,广州市,汕头市,深圳市,珠海市,佛山市";
				break;
			case "西藏省":
				echo "拉萨,韶关市,佛山市,深圳市,珠海市,广州市";
		}
	}
?>