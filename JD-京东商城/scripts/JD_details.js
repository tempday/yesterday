window.$=Node.prototype.$=function(selector){
	return (this==window?document:this).querySelectorAll(selector);
}
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
}
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
	$("#cate_box")[0].onmouseout
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
	init:function(){
		this.ul=$("#icon_list")[0];
		this.btnL=this.ul.parentNode.$("a")[0];
		this.btnR=this.ul.parentNode.$("a")[1];
		this.btnL.onclick=this.btnR.onclick=function(){
			pPhoto.move(this);
		};
		this.count=this.ul.$("li").length;
	},
	move:function(btn){
		if(btn==this.btnL){
			this.moved>0?this.moved--:btn.className="forward_disabled";
		}else{
			this.moved<(this.count-5)?this.moved++:btn.className="backward_disabled";
		}
		this.ul.style.left=this.LEFT-this.LIWIDTH*this.moved+"px";
	}       
}           