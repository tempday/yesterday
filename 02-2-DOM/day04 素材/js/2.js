var game={
	smallw:null,
	start:function(){
		//close();
		var maxTop=screen.availHeight-80;
		var rTop=parseInt(Math.random()*(maxTop+1));
		var maxLeft=screen.availWidth-80;
		var rLeft=parseInt(Math.random()*(maxLeft+1));
		var config="top=10"+",left="+rLeft+",height=50,width=50,resizable=yes,scrollbars=no";
		this.smallW=open("about:blank","small",config);
		this.smallW.document.write("<img src='xiaoxin.gif' width='100%'/>");
		this.smallW.onmouseover=function(){
			var e=window.event||arguments[0];
			var x=e.screenX;
			var y=e.screenY;
			while(true){
				var maxTop=screen.availHeight-80;
				var rTop=parseInt(Math.random()*(maxTop+1));
				var maxLeft=screen.availWidth-80;
				var rLeft=parseInt(Math.random()*(maxLeft+1));
				console.log(rLeft+":"+rTop);
				if(!((y>=rTop&&y<=rTop+50)&&(x>=rLeft&&x<=rLeft+50))){
					this.moveTo(rLeft,rTop);
					break;
				}
			}
		} 
	},
}