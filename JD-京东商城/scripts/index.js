/**
 * Created by lglong on 2017-10-26.
 */

var json='[{"i":1,"img":"banner_01.jpg"},{"i":2,"img":"banner_02.jpg"},{"i":3,"img":"banner_03.jpg"},{"i":4,"img":"banner_04.jpg"},{"i":5,"img":"banner_05.jpg"}]';
var imgs=eval('('+json+')');
var slider={
	LIWIDTH:670,
	$ulImgs:null,
	$ulIndex:null,
	DURATION:500,
	WAIT:3000,
	moved:0,
	init:function(){
		var me=this;
		this.$ulImgs=$("#imageList");
		this.$ulIndex=$('#imgIndex');
		this.initView();
		//console.log(this.liCount);
		this.autoMove();
		$("#slider").hover(function(){
					me.$ulImgs.stop(true);//停止动画并清除对列
		},
				function(){
					me.autoMove();
				});//
		this.$ulImgs.on('mouseenter','li',function(){
			// e.target 是图片,this指向li
			//var i=$("#imageList li").index($(this));//index 的两种用法,列表在前要先获取,列表在后直接选择器
			var i=$(this).index("#imageList li");
			i==imgs.length&&(i=0);
			console.log("当前li是:"+i);
			me.moved=i;
			me.$ulImgs.css('left',-me.LIWIDTH*i);
			me.changeHover();
		});
		this.$ulIndex.on('mouseover','li',function(){
			var curr=$("#imgIndex li").index($(this));
			curr==imgs.length&&(curr=0);
			var i=$("#imgIndex li").index($('.hover'))-curr;
			//if(!$(this).is('.hover')){}
			if(i!=0){
				me.moved-=i;
				me.changeHover();
				me.$ulImgs.stop(true).animate({'left':-me.LIWIDTH*me.moved},me.DURATION);
			}
		});
	},
	initView:function(){
		for(var i= 0,str='',lis='';i<imgs.length;i++){
			str+='<li>'+i+'</li>';
			lis+='<li><img src="images/index/'+imgs[i].img+'"></li>';
		}
		this.$ulImgs.html(lis).css('width',(imgs.length+1)*this.LIWIDTH+"px").append(this.$ulImgs.children(':first').clone());
		this.$ulIndex.html(str).children(':eq(0)').addClass('hover').children(':eq(0)').addClass('hover');

	},
	//自动移动思路:初始位置是0,首先等待500,然后开始左移,判断下标是否最后一个,如果是则将下标重置为零,图片ul位置也为0,设置对应下标的聚焦
	autoMove:function(){
		console.log("autoMove:"+this.moved);
		this.moved++;
		this.$ulImgs.delay(this.WAIT).animate({'left':-this.LIWIDTH*this.moved},this.DURATION,function(){
			if(this.moved==imgs.length){
				this.$ulImgs.css('left',0);
				this.moved=0;
			}
			this.changeHover();
			this.autoMove();
		}.bind(this));//绑定当前对象到回调函数
	},
	changeHover:function(){
		this.$ulIndex.children().eq(this.moved).addClass('hover').siblings().removeClass('hover');
	}
};
slider.init();
/*
轮播总结:整体的思路:{
	1.布局:总容器{
			图片外容器div>图片列表容器ul>单个li>img
	        外容器定位div>右浮动-焦点图ul>单个焦点li
		}
	2.(如果自带元素可省略):设置图片ul总宽度
	3.自动轮播:通过修改图片ul的left值实现左右移动:{
												默认m为0
												当m改变,则改变ul的left
												如果m==最后一个imgli,m重置为零,同时ul位置重置为0
												回调函数递归
											}
	4.焦点图轮播:焦点图获得焦点,计算与旧焦点的距离,从而对当前ul位置进行修改
}
 */