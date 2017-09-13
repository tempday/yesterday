// jQuery.fn.extend(object) 对象方法插件

$.fn.extend({
	test:function(){
		console.log($("input").val());
	}
})