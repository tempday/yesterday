//window.$=Node.prototype.$=function(selector){
window.$=Object.prototype.$=function(selector){
	return (this==window?document:this).querySelectorAll(selector);
};
window.onload=function(){
	$("#top_box .app_jd")[0].addEventListener("mouseover", showItems, true);
	$("#top_box .app_jd")[0].addEventListener("mouseout", hideItems, false);
	$("#top_box .service")[0].onmouseover=showItems;
	$("#top_box .service")[0].onmouseout=hideItems;
	$("#nav>div")[0].onmouseover=showCate;
	$("#nav>div")[0].onmouseout=hideCate;
	$("#cate_box")[0].addEventListener("mouseover", showSubCate,false);
	$("#cate_box")[0].addEventListener("mouseout", hideSubCate,false);
	pPhoto.init();
	$('#store_tabs')[0].onmouseover=function(){
		changeCurrent('#store_tabs li','LI','hover');
	};
	$('#choose_color')[0].onclick=function(){
		changeCurrent('#choose_color a','A','selected');
	};
	$('#choose_amount')[0].onclick=chooseAmount;
	for(var i=0;i<$('.main_tabs').length;i++){
		$('.main_tabs')[i].onclick=function(){
			changeCurrent('.main_tabs li','LI','current');
		}
	}

};
/*显示与隐藏 商品分类菜单的子菜单*/
function showSubCate(){
	var src=event.srcElement||event.target;
	if(src!=this){
		while(src.parentNode!=this){
			src=src.parentNode;
		}
		src.$(".sub_cate_box")[0].style.display="block";
		src.className="hover";
	}
}
function hideSubCate(){
	var divs=$("#cate_box .sub_cate_box");
	for(var i=0;i<divs.length;i++){
		divs[i].style.display="";
		divs[i].parentNode.className="";
	}
}
/*显示与隐藏 商品分类菜单*/
function showCate(){
	$("#cate_box")[0].style.display="block";
	$("#cate_box")[0].className="hover";
}
function hideCate(){
	$("#cate_box")[0].style.display="";
	$("#cate_box")[0].className="";
}
/*显示与隐藏 手机京东下拉*/
function showItems(){
	this.$("[id$='_items']")[0].style.display="block";
	this.$("a")[0].className="hover";
}
function hideItems(){
	this.$("[id$='_items']")[0].style.display="";/*改成空就恢复默认样式*/
	this.$("a")[0].className="";
}
/*小图移动,中图切换,大图放大*/
var pPhoto={
	LEFT:20,
	LIWIDTH:62,/*li固定宽度*/
	moved:0,/*记录图片左移动的个数*/
	count:0,/*记录图片总数*/
	ul:null,/*父元素ul*/
	btnL:null,/*左按钮--ul右移*/
	btnR:null,/*右按钮--ul左移*/
	outMask:null,
	OUTWIDTH:350,
	OUTHEIGHT:350,
	INNERWIDTH:175,
	INNERHEIGHT:175,
	init:function(){
		this.ul=$("#icon_list")[0];
		this.ul.onmouseover=this.changeImg;
		this.btnL=this.ul.parentNode.$("a")[0];
		this.btnR=this.ul.parentNode.$("a")[1];
		this.btnL.onclick=this.btnR.onclick=function(){
			pPhoto.move(this);
			pPhoto.btnEnable();
		};
		this.count=this.ul.$("li").length;
		this.outMask=$('#showpic')[0];
		this.outMask.onmouseover=this.outMask.onmouseleave=this.showMask;
		this.outMask.onmousemove=function(){
			pPhoto.zoom();
		}
	},
	move:function(btn) {    //小图左移和右移,思路:判断当前按钮左右,如果是左按钮且已经移动的数量不为零,则移动数量减一,然后使用新的左移数量重新定位ul
		if(!btn.className.endsWith("_disabled")){
			if (btn == this.btnL) {
				this.moved > 0 && (this.moved--);// : btn.className = "forward_disabled";
			} else {
				this.moved < (this.count - 5) && (this.moved++);// : btn.className = "backward_disabled";
			}
			this.ul.style.left = this.LEFT - this.LIWIDTH * this.moved + "px";
		}
	},
	btnEnable:function(){//按钮状态检测
		if(this.moved==0){
			this.btnL.className=this.btnL.className+'_disabled';
		}else if(this.moved==this.count - 5){
			this.btnR.className=this.btnR.className+'_disabled';
		}else{
			this.btnL.className=this.btnL.className.replace('_disabled','');
			this.btnR.className=this.btnR.className.replace('_disabled','');
		}
	},
	changeImg:function(){   //切换小图对应的大图
		var src= event.srcElement|| event.target;
		if(src.nodeName=="IMG"){
			$('#privew img')[0].src=src.src.replace('.jpg','-m.jpg');
			$('#largeDiv img')[0].src=src.src.replace('.jpg','-l.jpg');
		}
	},
	showMask:function(){    //over和out同时绑定一个函数,反向切换mask状态
		$('#mask')[0].style.display=getComputedStyle($('#mask')[0]).display=="none"?'block':'none';
		$('#largeDiv')[0].style.display=getComputedStyle($('#mask')[0]).display;
	},
	zoom:function(){
		var mLeft=event.offsetX-this.INNERWIDTH/2,
				mTop=event.offsetY-this.INNERHEIGHT/2,
				sLeft,sTop;
		sLeft=mLeft;
		sTop=mTop;
		mLeft<0&&(sLeft=0);
		mTop<0&&(sTop=0);
		this.OUTWIDTH-this.INNERWIDTH<mLeft&&(sLeft=this.OUTWIDTH-this.INNERWIDTH);
		this.OUTHEIGHT-this.INNERHEIGHT<mTop&&(sTop=this.OUTHEIGHT-this.INNERHEIGHT);
		$('#mask')[0].style.left=sLeft+'px';
		$('#mask')[0].style.top=sTop+'px';
		$('#largeDiv img')[0].style.left=-sLeft*2+'px';
		$('#largeDiv img')[0].style.top=-sTop*2+'px';
	}
};
//选择颜色 //选项卡切换
function changeCurrent(selector,tagname,classname){
	var src=event.srcElement||event.target;
	var sel=$(selector);
	try{
		src.parentNode.nodeName==tagname&&(src=src.parentNode);
	}catch (e){
		console.log(e);
	}
	if(src.nodeName==tagname){
		for(var i=0;i<sel.length;sel[i++].className='');
		src.className=classname;
	}
}
//购买数量
function chooseAmount(){
	var src=event.srcElement||event.target;
	var amout=$('#purchnum')[0].value;
	if(src==$('#choose_amount .btn_reduce')[0]){
		amout>0&&(amout--);
	}
	if(src==$('#choose_amount .btn_add')[0]){
		amout++;
	}
	$('#purchnum')[0].value=amout;
}

