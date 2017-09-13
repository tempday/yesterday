//分别定义两个数组
//unsel:存所有未选中的国家（左边）
var unsel=null;
//sel:存所有选中的国家（右边）
var sel=null;
window.$=function(selector){
	return document.querySelectorAll(selector);
}
//当页面加载后
window.onload=function(){
	/*将左侧select元素中所有option元素的文本
	  提取并保存到unsel数组中
	*/
	unsel=$("#unsel")[0].innerHTML.trim().slice(8,-9).split(/<\/option>\s*<option>/)//trim同时去除前后空字符
	//初始化sel数组
	sel=[];
}
function move(btn){
	//如果btn的内容是>>
	if(btn.innerHTML=="&gt;&gt;"){
	//	将unsel中的所有元素，拼入sel,对新数组排序再放回sel中
		sel=sel.concat(unsel).sort();//concat??
	//	清空unsel中的元素
		unsel.length=0;
	}
	//否则 如果btn的内容是<<
	else if(btn.innerHTML=="&lt;&lt;"){
	//	将sel中的所有元素，拼入unsel,对新数组排序再放回unsel中
		unsel=sel.concat(sel).sort();
	//清空sel中的元素
		sel.length=0;
	}else if(btn.innerHTML=="&gt;"){
		//将选中的移动到右边
		//option对象的selected属性==>true/false
		//获得unsel下的所有option对象
		var opts=$("#unsel option");
		//遍历左边select中所有option
		for(var i=opts.length-1;i>=0;i--){
		//发现当前option的selected有效
			if(opts[i].selected){
		//	先删除unsel中相同位置的元素，获得被删除的元素
		//  将被删除的元素压入sel中，
				sel.push(unsel.splice(i,1)[0]);//splice??
			}
		
		}sel.sort();//(遍历结束后)再对sel排序，存回sel

	}else{//将右侧select选中的项，移动到左边
		//获得sel下的所有option对象
		var opts=$("#sel option");
		//遍历右边select中所有option
		for(var i=opts.length-1;i>=0;i--){
		//发现当前option的selected有效
			if(opts[i].selected){
		//	先删除sel中相同位置的元素，获得被删除的元素
				unsel.push(sel.splice(i,1)[0]);//splice??
		//	
			}
		//  将被删除的元素压入unsel中，
		//(遍历结束后)再对sel排序，存回unsel
		}unsel.sort();

	}
	updateSel();
}
function updateSel(){//专门跟新两select元素的内容
	//step1:将unsel中所有元素，拼接为select元素的innerHTML，再放回unsel元素中
	$("#unsel")[0].innerHTML="<option>"+unsel.join("</option><option>")+"</option>";
	//step2:将sel数组中的元素。跟新到id为sel的select
	$("#sel")[0].innerHTML="<option>"+sel.join("</option><option>")+"</option>";

}