var unsel=null;
var sel=null;
window.$=function(selector){
	return document.querySelectorAll(selector)
}
window.onload=function(){
	unsel=$("#unsel")[0].innerHTML.trim().slice(8,-9).split(/<\/option>\s*<option>/);
	
	//初始化sel数组
	sel=[];
}
function move(btn){
	if(btn.innerHTML=="&gt;&gt;"){
		sel=sel.concat(unsel).sort();
		unsel.length=0;
	}else if(btn.innerHTML=="&lt;&lt;"){
		unsel=unsel.concat(sel).sort();
		sel.length=0;
	}else if(btn.innerHTML=="&gt;"){
		//option对象selected属性==>true/false
		var opts=$("#unsel option");
		for(var i=opts.length-1;i>=0;i--){
			if(opts[i].selected){
				sel.push(unsel.splice(i,1)[0]);
			}
		}sel.sort();
	}else{
		var opts=$("#sel option");
		for(var i=opts.length-1;i>=0;i--){
			if(opts[i].selected){
				unsel.push(sel.splice(i,1)[0]);
			}
		}unsel.sort();
	}
	updateSel();
}
function updateSel(){
	$("#unsel")[0].innerHTML="<option>"+unsel.join("</option><option>")+"<option>";
	$("#sel")[0].innerHTML="<option>"+sel.join("</option><option>")+"<option>";
}