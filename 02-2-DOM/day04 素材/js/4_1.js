/*定时器三件事：*/
//1.每一步要执行的任务：
function calc(){//计算当前时间，距离目标时间的倒计时
	//hh:mm:ss
	var target=new Date("2015/10/26 18:30:00");
	var now=new Date();
	var ms=target-now;
	
	var h=parseInt(ms/1000/3600);
	h<10&&(h="0"+h);
	var m=parseInt((ms-h*3600*1000)/1000/60);
	m<10&&(m="0"+m);
	var s=parseInt((ms-h*3600*1000-m*60*1000)/1000);
	s<10&&(s="0"+s);
	//h,m,s必须2位数，少于2位，前加0
	var span=document.querySelector("span");
	span.innerHTML=span.innerHTML.indexOf(":")==-1?h+":"+m+":"+s:h+" "+m+" "+s;

	if(ms>=1000){
		timer=setTimeout(calc,500);
	}else{
		timer=null;
		span.innerHTML="00:00:00";
	}												  
	
}
var timer=null;
window.onload=function(){
	calc();
}
function stop(btn){
		if(timer){
		clearTimeout(timer);
		timer=null;
		var span=document.querySelector("span");
		span.innerHTML=span.innerHTML.replace(/\s/g,":");
		btn.innerHTML="启动";
	}else{
		calc();
		btn.innerHTML="停止";
	}
}