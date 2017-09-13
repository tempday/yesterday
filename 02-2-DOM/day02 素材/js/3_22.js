window.$=HTMLElement.prototype.$=function(selector){
	return (this==window?document:this).querySelectorAll(selector);
}
/*当文本框获得焦点时：给当前文本框穿txt_focus
	同时找到旁边div,脱掉衣服
*/
window.onload=function(){
	var form=document.forms[0];
	var txtName=form.elements["username"];
	var txtPwd=form.elements["pwd"];
	txtName.onfocus=txtPwd.onfocus=function(){
		this.className="txt_focus";
		this.parentNode.parentNode.$("div")[0].removeAttribute("class");
	}
	txtName.onblur=valiName;
	txtPwd.onblur=valiPwd;
	function valiName(){
		this.className="";
		var div=this.parentNode.parentNode.$("div")[0];
		var r=/^\w{1,10}$/.test(this.value);
		div.className=r?"vali_success":"vali_fail";
		return r;
	}
	function valiPwd(){
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
}