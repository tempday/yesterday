/**
 * Created by lglong on 9/11 0011.
 */
function recordPaint(elem,data){
	elem.style.backgroundColor="pink";
	var ctx=elem.getContext("2d");
	var HEIGHT=elem.height;
	var WIDTH=elem.width;
	var padding=20;
	var paddingLeft=40;
	var paddingBottom=20;
	var axisY={
		x:paddingLeft,
		y:padding
	};
	var origin={
		x:paddingLeft,
		y:HEIGHT-paddingBottom
	};
	var axisX={
		x:WIDTH-paddingLeft,
		y:HEIGHT-paddingBottom
	};
	ctx.beginPath();
	ctx.moveTo(axisY.x,axisY.y);
	ctx.lineTo(origin.x,origin.y);
	ctx.lineTo(axisX.x,axisX.y);
	ctx.stroke();
	//上箭头
	ctx.beginPath();
	ctx.moveTo(axisY.x-5,axisY.y+10);
	ctx.lineTo(axisY.x,axisY.y);
	ctx.lineTo(axisY.x+5,axisY.y+10);
	//下箭头
	ctx.moveTo(axisX.x-10,axisX.y-5);
	ctx.lineTo(axisX.x,axisX.y);
	ctx.lineTo(axisX.x-10,axisX.y+5);
	ctx.stroke();

	//绘制月份
	var month={
		x:paddingLeft,
		y:HEIGHT-paddingBottom
	}
	ctx.font="14px mirosoft Yahei";
	ctx.textBaseline="top";
	for(var i=1;i<=12;i++){
		ctx.beginPath();
		ctx.moveTo(month.x,month.y);
		ctx.lineTo(month.x,month.y-5);
		ctx.stroke();
		ctx.fillText(i+"月",month.x-10,month.y+3);
		month.x+=(axisX.x-origin.x)/12;
	}
	var max=Math.max.apply(null,data);
	ctx.textAlign="right";
	for(var i=1;i<=max/500+1;i++){
		origin.y-=(axisX.y-axisY.y)/7);
		ctx.fillText(i*500,origin.x-3,origin.y);

	}
}