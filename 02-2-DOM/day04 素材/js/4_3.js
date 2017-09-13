var adv={
	div:null,
	step:5,
	interval:30,//浏览器最小间隔10 
	init:function(){
		this.div=document.getElementById("msg");
		this.moveUpStep();
	},
	moveUpStep:function(){
		var divStyle=getComputedStyle(this.div);
		this.div.style.bottom=parseInt(divStyle.bottom)+this.step+"px";
		if(parseInt(divStyle.bottom)<0){
			setTimeout(function(){adv.moveUpStep();},this.interval);
		}
	},

	moveDownStep:function(){
		var divStyle=getComputedStyle(this.div);
		var bottom=parseInt(divStyle.bottom)-this.step;
		var height=parseInt(divStyle.height);
		this.div.style.bottom=bottom+"px";
		if(bottom>-height){
			setTimeout("adv.moveDownStep()",this.interval);
		}else{
			setTimeout(function(){adv.moveUpStep();},3000);
		}
	}
}
window.onload=function(){
	adv.init();
}