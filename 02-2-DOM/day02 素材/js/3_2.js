window.$=HTMLElement.prototype.$=function(selector){
	return (this==window?document:this).querySelectorAll(selector);
}
/*当文本框获得焦点时
	给当前文本框穿txt_focus

	同时找到旁边div，脱掉衣服
*/
window.onload=function(){
	//找到第一个form对象
	var form=document.forms[0];
	//找到姓名和密码文本框
	var txtName=form.elements[0/*"userName"*/];
	var txtPwd=form.elements[1/*"pwd"*/];
	/*为form绑定提交事件*/
	form.onsubmit=function(){
		//依次调用每个文本框的验证方法
		var r=true;
		r=txtName.onblur()&&txtPwd.onblur();
		if(!r){
			var e=window.event||arguments[0];
			if(e.preventDefault){
				e.preventDefault()//DOM
			}else{
				e.returnValue=false//IE8
			}
		}
	}
	//为两个文本框对象
	txtName.onfocus=txtPwd.onfocus=function(){
		this.className="txt_focus";
		this.parentNode.parentNode.$("div")[0].removeAttribute("class");
	}
	txtName.onblur=valiName;
	txtPwd.onblur=valiPwd;
}
function valiName(){//专门验证姓名文本框的方法
	//当前文本框对象脱衣服
	this.className="";
	var div=this.parentNode.parentNode.$("div")[0];
	//使用正则表达式验证当前文本框的内容是否正确
	var r=/^\w{1,10}$/.test(this.value);
	//	如果正确，给div穿vali_success
	//				否则穿vali_fail
	div.className=r?"vali_success":"vali_fail";
	//返回正则表达式的验证结果
	return r;

}
function valiPwd(){//专门验证密码文本框的方法
	//当前文本框对象脱衣服
	this.className="";
	var div=this.parentNode.parentNode.$("div")[0];
	//使用正则表达式验证当前文本框的内容是否正确
	var r=/^\w{1,6}$/.test(this.value);
	//	如果正确，给div穿vali_success
	//				否则穿vali_fail
	div.className=r?"vali_success":"vali_fail";
	//返回正则表达式的验证结果
	return r;

}