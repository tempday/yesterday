window.$=function(selector){
	return document.querySelectorAll(selector);
}
//动画每一步执行的任务
function calc(){
	//计算当前时间的时针，分针，秒针，分别转的角度
	var now=new Date();
	var h=now.getHours();
	h>12&&(h-=12);
	var m=now.getMinutes();
	var s=now.getSeconds();
	var rh=(h*3600+m*60+s)/(12*3600)*360;
	var rm=(m*60+s)/3600*360;
	var rs=(s/60)*360;
	//找到三个指针对象
	$("#h")[0].style.transform="rotate("+rh+"deg)";
	$("#m")[0].style.transform="rotate("+rm+"deg)";
	$("#s")[0].style.transform="rotate("+rs+"deg)";
	
	//分别将角度设置到指针对象的style属性的transform
	//值："rotate("+rx+"deg)"
	setTimeout(calc,1000);
}
window.onload=function(){
	calc();
}