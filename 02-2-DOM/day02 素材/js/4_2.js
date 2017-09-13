//window.onload=function(){
	var sheet=document.styleSheets[1];
	var rules=sheet.cssRules;
	var rs=rules[rules.length-3];
	var rm=rules[rules.length-2];
	var rh=rules[rules.length-1];

//step4:获得当前的时，分，秒
	var now=new Date();
	var s=now.getSeconds();
	var m=now.getMinutes();
	var h=now.getHours();
	h>12&&(h-=12);
//(当前经过的时间/转一圈需要的总时间)*360度
	var sDeg=s/60*360;
	var mDeg=(m*60+s)/3600*360;
	var hDeg=(h*3600+m*60+s)/(3600*12)*360;
	rs.cssRules[0].style.transform="rotate("+sDeg+"deg)";
	rs.cssRules[1].style.transfrom="rotate("+sDeg+"360+deg)";
	rm.cssRules[0].style.transfrom="rotate("+mDeg+"deg)";
	rm.cssRules[1].style.transfrom="rotate("+mDeg+"360+deg)";
	rh.cssRules[0].style.transfrom="rotate("+hDeg+"deg)";
	rh.cssRules[1].style.transfrom="rotate("+hDeg+"360+deg)";
//}