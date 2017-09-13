/*
 * Created by lglong on 9/11 0011.
 */
//为String 类型扩展格式化方法
//注意:--不能修改原字符串--
String.prototype.format=function(){
	//str=str.replace(/\{[\d]\}/g,"123");
	//这里的正则要使用字符串模式;
	var str=this;
	for(var i=0;i<arguments.length;i++){
		//console.log(arguments[i]);
		str=str.replace(new RegExp("\\{"+i+"\\}","g"),arguments[i]);
		//console.log(str);
	}
	//this 已经改变
	return str;
}

function initOrderList(elem,data){
	/*
		定义对应关系
			0-order_num
			1-shop_name
			2-shop_url
			3-price
			4-payment_mode
			5-submit_time
	        6-order_state
			7-product_name
			8-product_url
			9-product_img
			10-day
			11-time
	 */
	var template='<tr class="trOrder"> <td colspan="6"> <span>订单编号:"{0}"</span> <span><a href="{2}" target="_blank">{1}</a></span> </td> </tr> <tr class="trProd"> <td> <div class="imgList"> <a href="{1}" target="_blank"> <img src="{9}" width="50" height="50" title="{7}" /> </a> </div> </td> <td>aaa</td> <td>￥{3}<br/>{4}</td> <td>{10}<br/>{11}</td> <td>{6}</td> <td> <a href="{0}">查看</a>|<a href="{1}">删除</a><br/> <a href="{2}">评价晒单</a><br/> <a class="btn_buy_again" href="{3}">还要买</a> </td> </tr> ';

	//$(data).each(); 遍历两种写法
	var newHtml="";
	$.each(data,function(index,obj){//obj可以不写
		var daytime=obj.submit_time.split("T");//处理订单时间
		//var state=obj.order_state=="2"?"已完成":"未完成";
		var state;
		switch (obj.order_state){
			case "0":state="未付款";break;
			case "1":state="已付款";break;
			case "2":state="已发货";break;
			case "3":state="已完成";
		}

		newHtml+=template.format(
				obj.order_num,
				obj.shop_name,
				obj.shop_url,
				obj.price,
				obj.payment_mode,
				obj.submit_time,
				state,
				obj.product_name,
				obj.product_url,
				obj.product_img,
				daytime[0],
				daytime[1]
		);
	});
	//console.log(str);
	elem.append(newHtml);





}
/* js遍历方法
var n=0;
while (n<data.length){
	for(var i in data[n]){
		console.log(i+":"+data[n][i]);
	}
	n++;
}

*/








