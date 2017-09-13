var game={
	smallW:null,
	start:function(){
		//打开一个新窗口，设置窗口的大小,随机初始化窗口的位置
		//open("url","name","config")
		//config:"top=xxp,left=xx,height=xx,width=xx"
		//
		var maxTop=screen.availHeight-30-50;
		var rTop=parseInt(Math.random()*(maxTop+1));
		var maxLeft=screen.availWidth-50;
		var rLeft=parseInt(Math.random()*(maxLeft+1));
		var config="top="+rTop+",left="+rLeft+",height=50,width=50,resizable=yes";
		this.smallW=open("about:blank","small",config);
		this.smallW.document.write('<img style="height:80px;" src="xiaoxin.gif"/>');
		this.smallW.onmouseover=function(){
			//当鼠标进入小窗口时，
			//获得鼠标的x,y坐标
			var e=window.event||arguments[0];
			var x=e.screenX;
			var y=e.screenY;
			//反复随机计算新top和left值
			while(true){
				var rTop=parseInt(Math.random()*(maxTop+1));
				var rLeft=parseInt(Math.random()*(maxLeft+1));
				if(!((y>=top&&y<=top+50)&&(x>=left&&x<=left+50))){//将窗口移动到rTop,rLeft的位置
					this.moveTo(rTop,rLeft);
					break;
				}
			}
		}
	}
}