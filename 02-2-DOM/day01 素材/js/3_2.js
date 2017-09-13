//输出指定元素及其直接子元素
var blank=[];
function getChildren(parent){
	console.log(blank.join("")+"|-"+(parent.nodeType!=3?parent.nodeName:parent.nodeValue));
	if(parent.childNodes.length>0){
		blank.push("\t");
		for (var i=0,len=parent.childNodes.length;i<len;i++){
			console.log(parent.childNodes[i].nodeType==1?parent.childNodes[i].nodeName:parent.childNodes[i].nodeValue);
			getChildren(parent.childNodes[i]);
		}
		blank.pop("\t");
	}
}
//按值传递出现副本
//对象是 *引用类型* 数据,传的是地址,同时变化
window.onload=function(){
	//getChildren(document.body.childNodes[3]);
	getChildren(document);
}