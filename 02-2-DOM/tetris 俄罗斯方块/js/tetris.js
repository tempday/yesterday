/*
	可以正常下落和停止;
	currShape旁边新建一个nextShape保存下一个图形对象;
	游戏正确的步骤是:现在nextShape里生成随机预览图形,然后放到currShape里,等canDrop返回false,
				nextShape放入currShape,更新nextShape
	创建 paintNext 对象,根据新的坐标在右边将nextShape画出来
	判断是否结束:条件:用cell的下标遍历wall,如果存在则停止游戏,清除定时器,显示停止画面
	先修改
*/
window.$=HTMLElement.prototype.$=function(selector){
	return (this==window?document:this).querySelectorAll(selector);
}
var tetris={
	RN:20,//行数
	CN:10,//列数
	CSIZE:26,//格子大小26px
	OFFSET_X:15,//避开左侧和上方的边框15px;
	OFFSET_Y:15,
	interval:300,
	timer:null,
	wall:[],
	score:0,
	lines:0,
	level:1,
	state:1,
	STATE_RUNNING:1,
	STATE_GAMEOVER:0,
	STATE_PAUSE:2,
	IMG_GAMEOVER:"img/game-over.png",
	IMG_PAUSE:"img/pause.png",
	paintState:function(){
		var img=new Image();
		switch(this.state){
			case 0:img.src=this.IMG_GAMEOVER;break;
			case 2:img.src=this.IMG_PAUSE;break;
			default:img.src="";
		}
		this.pg.appendChild(img);
	},
	pg:null,//保存游戏主页面
	currShape:null,//专门保存正在移动的图形对象
	nextShape:null,
	init:function(){
		this.pg=$(".playground")[0];
		this.currShape=this.randomShape();
		this.nextShape=this.randomShape();
		for(var i=0;i<this.RN;this.wall[i++]=[]);
		this.paint();
		this.timer=setInterval(function(){			
			tetris.drop();
			tetris.paint();
		}, this.interval);
		document.onkeydown=function(){//逻辑全部单独写
			var e=window.event||arguments[0];
			switch(e.keyCode){
				case 37:tetris.moveL();break;
				case 39:tetris.moveR();break;
				case 40:tetris.drop();tetris.drop();tetris.drop();break;
				case 83:tetris.start();break;//S
				case 80:tetris.pause();break;//P
				case 38:tetris.rotateR();break;
				case 90:tetris.rotateL();break;
				case 67:tetris.mycontinue();break;
				case 32:tetris.mycontinue();break;
				case 81:tetris.gameOver();break;
			} 
		}
	},
	pause:function(){
		if(this.state==this.STATE_RUNNING){
			this.state=this.STATE_PAUSE;
		}
	},
	gameOver:function(){
		this.state=this.STATE_GAMEOVER;
		//this.paintState();
		clearInterval(this.timer);
		this.timer=null;
		this.paint();
	},
	mycontinue:function(){
		if(this.state==this.STATE_PAUSE){
			this.state=this.STATE_RUNNING;
		}
	},
	start:function(){
		if(this.state==this.STATE_GAMEOVER){
			this.state=this.STATE_RUNNING;
			tetris.init();
		}
	},
	rotateR:function(){
		if(this.state==this.STATE_RUNNING){
			this.currShape.rotateR();
			if(this.outOfBounds()||this.hit()){
				this.currShape.rotateL();
			}
		}
	},
	rotateL:function(){//为了检测碰撞作的回退
		if(this.state==this.STATE_RUNNING){
			this.currShape.rotateL();
			if(this.outOfBounds()||this.hit()){
				this.currShape.rotateR();
			}
		}
	},
	moveR:function(){
		if(this.state==this.STATE_RUNNING){
			this.currShape.moveR();
			if(this.outOfBounds()||this.hit()){
				this.currShape.moveL();
			}
		}
	},
	moveL:function(){
		if(this.state==this.STATE_RUNNING){
			this.currShape.moveL();
			if(this.outOfBounds()||this.hit()){
				this.currShape.moveR();
			}
		}
	},
	outOfBounds:function(){
		var cell=this.currShape.cells;
		for(var i=0;i<cell.length;i++){
			if(cell[i].row<0||cell[i].row>19||cell[i].col<0||cell[i].col>this.CN-1){
				return true;
			}
		}
	},
	hit:function(){
		var cell=this.currShape.cells;
		for(var i=0;i<cell.length;i++){
			if(this.wall[cell[i].row][cell[i].col]){
				return true;
			}
		}
	},
	drop:function(){
		if(this.state==this.STATE_RUNNING){//判断当前状态是不是1
			if(this.canDrop()){
				this.currShape.drop();
			}else{
				this.landToWall();
				//下落完成后检测是否满行
				var ln=this.deleteLines();
				var score=document.querySelectorAll("span");
				score[0].innerHTML=ln*10+parseInt(score[0].innerHTML);
				score[1].innerHTML=ln+parseInt(score[1].innerHTML);
				score[2].innerHTML=parseInt(score[2].innerHTML/10)+1;
				//this.currShape=this.randomShape();
				if(!this.isGameOver()){
					this.currShape=this.nextShape;
					this.nextShape=this.randomShape();
				}else{
					//console.log("asdf");
					clearInterval(this.timer);
					this.timer=null;
					this.state=this.STATE_GAMEOVER;
					//document.querySelector(".over").style.display="block";
					this.paint();
				}
			}
		}
	},
	deleteLines:function(){
		//this.deleteL(row);
		for(var i=0,lines=0;i<this.wall.length;i++){
			if(this.isFull(i)){
				this.deleteL(i);
				//console.log(i);
				lines++;
			}
		}
		return lines;
	},
	isFull:function(row){
		for(var i=0;i<this.CN;i++){
			if(!this.wall[row][i]){
				return false;
			}
		}
		return true;
	},
	deleteL:function(row){
		this.wall.splice(row,1);
		this.wall.unshift([]);
		//第一种写法:
		//for(var i=1;i<=row;i++)
		//第二种:
		for(var i=row;i>0;i--){
			for(var n=0;n<this.wall[i].length;n++){
				this.wall[i][n]&&(this.wall[i][n].row++);
			}
		}
	},
	paint:function(){
		this.pg.innerHTML=this.pg.innerHTML.replace(/<img(.*?)>/g,"");//(<img(.*?)>){4}$/
		this.paintShape();
		this.paintWall();
		this.paintNext();
		this.paintState();
	},
	paintNext:function(){
		var cell=this.nextShape.cells;
		for(var i=0;i<cell.length;i++){
			//获得当前cell的x坐标
			var x=(cell[i].col+10)*this.CSIZE+this.OFFSET_X;
			//获得当前cell的y坐标
			var y=(cell[i].row+1)*this.CSIZE+this.OFFSET_Y;
			//用new Image方法创建img
			var image=new Image();
			image.src=cell[i].img;
			image.style.position="absolute";
			image.style.left=x+"px";
			image.style.top=y+"px";
			this.pg.appendChild(image);
		}
	},
	
	isGameOver:function(){
		var cells=this.nextShape.cells;
		for(var i=0;i<cells.length;i++){
			if(this.wall[cells[i].row][cells[i].col]){
				//console.log("over");
				return true;
			}
		}
		return false;
	},
	canDrop:function(){
		var cells=this.currShape.cells;
		for(var i=0;i<cells.length;i++){
			//console.log(cells[i].row);
			if(cells[i].row==this.RN-1||this.wall[cells[i].row+1][cells[i].col]){
				return false;
			}
		}
		return true;
	},
	paintWall:function(){
		for(var i=0;i<this.wall.length;i++){
			var sw=this.wall[i];
			if(sw.length){
				for(var n=0;n<sw.length;n++){
					if(sw[n]){
						var x=n*this.CSIZE+this.OFFSET_X;
						//console.log(x);
						//获得当前cell的y坐标
						var y=i*this.CSIZE+this.OFFSET_Y;
						//用new Image方法创建img
						var image=new Image();
						image.src=sw[n].img;
						image.style.position="absolute";
						image.style.left=x+"px";
						image.style.top=y+"px";
						this.pg.appendChild(image);
					}
				}
			}
		}
	},
	landToWall:function(){
		var cells=this.currShape.cells;
		for(var i=0;i<cells.length;i++){
			//console.log("y"+cells[i].row);
			//console.log("x"+cells[i].col);
			this.wall[cells[i].row][cells[i].col]=cells[i];
		}
	},
	randomShape:function(){
		//return new [O,I,S,Z,T,L,J][parseInt(Math.random()*7)]();
		return new [I,S,T][parseInt(Math.random()*3)]();
	},
	paintShape:function(){//绘制当前图形
		var cell=this.currShape.cells;
		//console.log(cell);
		//遍历cells中每个cell
		for(var i=0;i<cell.length;i++){
			//获得当前cell的x坐标
			var x=cell[i].col*this.CSIZE+this.OFFSET_X;
			//获得当前cell的y坐标
			var y=cell[i].row*this.CSIZE+this.OFFSET_Y;
			//用new Image方法创建img
			var image=new Image();
			image.src=cell[i].img;
			image.style.position="absolute";
			image.style.left=x+"px";
			image.style.top=y+"px";
			this.pg.appendChild(image);
		}
	},
	
}
window.onload=function(){
	tetris.init();
}