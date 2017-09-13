//声明XMLHttpRequest对象
function getHttpObject(){
	var getXhr=null;
	if(window.XMLHttpRequest){
		getXhr=new XMLHttpRequest();
	}else{
		getXhr=new ActiveXObject("Microsoft.XMLHttp");
	}
	return getXhr;
}