window.onload=function(){
	//获得ul下所有li
	var lis=document.querySelectorAll("ul li");
	/*所有查询结果都是类数组对象*/
	//在数组中随机生成和人数相等的随机数
	var nums=[];
	//反复生成随机数，nums.length<lis.length
	while(nums.length<lis.length){
	//  //在1到lis.length之间取随机整数n
		var n=Math.floor(Math.random()*lis.length+1);
	//  利用nums的indexOf方法，查找是否包含n
	//  如果不包含，才能将n压入nums中
		if(nums.indexOf(n)==-1){
			nums.push(n);
		}
	}

	for(var i=0;i<nums.length;i++){
		lis[i].setAttribute("data-i",nums[i])
	}
	/*将所有li,按data-i特性值。升序排列*/
	//问题：lis时类数组对象,没有sort方法！解决：将类数组转化为标准数组
	lis=Array.prototype.slice.call(lis);
	//问题2：两个li不能相减，仅让li的data-i特性相减
	lis.sort(function(a,b){return a.getAttribute("data-i")-b.getAttribute("data-i");});
	//清空所有li
	var ul=document.querySelector("ul");
	ul.innerHTML="";
	for(var i=0;i<lis.length;i++){
		ul.appendChild(lis[i]);
	}
}