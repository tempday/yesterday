window.onload=function(){
	//获得ul下li的个数
	var lis=document.querySelectorAll("ul li")
	var nums=[];
	//反复生成随机数，nums.length<lis.length
	while(nums.length<lis.length){
	//	在1到lis.length之间去一个随机数n
		var n=parseInt(Math.random()*(lis.length+1));
	//	利用num的indexOf方法，查找是否包含n
		if(nums.indexOf(n)==-1){
	//	如果不包含，才将n压入nums中
			nums.push(n);
		}
	}
	console.log(nums);
	//将nums中的数字，保存到每个li的data-i自定义属性中
	//遍历nums数组
	for(var i=0;i<nums.length;i++){
	//	将nums中当前位置的数字
	//	设置到相同位置的li中的data-i特性上
		lis[i].setAttribute("data-i",nums[i])
	}
	/*将所有li,按data-i特性值，升序排列*/
	//问题：lis是类数组对象，没有sort方法
	//解决：将类数组对象转化为标准数组
	lis=Array.prototype.slice.call(lis);
	lis.sort(function(a,b){
				//return a.getAttribute("data-i")-b.getAttribute("data-i");
				return a.dataset.i-b.dataset.i;//HTML5读取自定义属性
		})
		//a:自动获得当前li对象
		//b:自动获得下一个li对象
	//清空所有旧li
	var ul=document.querySelector("ul");
	ul.innerHTML="";
	//遍历lis数组中每个li对象
	//	每遍历一个就追加到ul中
	for(var i=0;i<lis.length;i++){
		ul.appendChild(lis[i])//将元素追加到ul中
	}
	console.log(ul);
}
