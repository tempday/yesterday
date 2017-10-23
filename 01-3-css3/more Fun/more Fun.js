var link=document.createElement("link");
link.rel="stylesheet";
link.href="http://192.168.3.200/yesterday/01-3-css3/more%20Fun/more%20Fun.css";
document.getElementsByTagName("head")[0].appendChild(link);
//var script=document.createElement("script");
//script.src="http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.8.3.min.js";
//document.getElementsByTagName("head")[0].appendChild(script);
window.onload=function(){
	var stage=document.createElement("div");
	stage.id="stage";
	stage.innerHTML="<div class='parent'></div>";
	document.body.appendChild(stage);
	divs=document.getElementsByTagName("div");
	for(var i=0,div;i<divs.length;i++){
		if(divs[i].className.indexOf("parent")!=-1){
			for(var n=0;n<6;n++){
				div=document.createElement("div");
				for(var m=0;m<9;div.appendChild(document.createElement("span")),m++);
				divs[i].appendChild(div);
			}
		}
	}
	var angle=0, xyz=0,pom=1;
	var arr=[[1,1,1],[1,1,1],[0,1,1],[1,0,1],[1,1,0]];
	var timer;
	function trans(){
		timer=setTimeout(function(){
			if(!(angle%360)){
				xyz=parseInt(Math.random()*5);
				if(!parseInt(Math.random()*2)){
					//pom=-1;
				}
			}
			stage.children[0].style.transform="rotate3D("+arr[xyz][0]+","+arr[xyz][1]+","+arr[xyz][2]+","+angle++*pom+"deg)";
			stage.children[0].style.msTransform="rotate3D("+arr[xyz][0]+","+arr[xyz][1]+","+arr[xyz][2]+","+angle++*pom+"deg)";
			trans();
		}, 20);
	}
	trans();
	stage.onmouseover=function(){
		clearTimeout(timer);
		timer=null;	
	}
	stage.onmouseout=function(){
		trans();	
	}
	/*
	$("div#stage").animate({
		top:50,
		left:50
	},30000);
	
	
	document.getElementById("stage").style.top="50px";
	document.getElementById("stage").style.left="50px";
	*/
	//stage.style.transform="scale(.15)";
	
}