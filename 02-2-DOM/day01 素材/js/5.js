
function getChildren(parent){
	var interator=document.createNodeIterator(
		parent,
		NodeFilter.SHOW_ALL,
		null,
		false
	);
	var currNode=null;
	var blanks=[];
	var test=null;
	while((currNode=interator.nextNode())!=null){
		texts=(currNode.nodeType!=3?currNode.nodeName:currNode.nodeValue);
		if (texts.trim()!=""){
			if ((test=interator.previousNode())!=null){
				var arr=(test.childNodes);
				arr.indexOf(currNode)==-1;
				
			}
			interator.nextNode();
			
			
			console.log(blanks.join("")+"|-"+texts);
			if (!(currNode.childNodes)){
				blanks.pop("\t");
			}else{
				currNode.childNodes.length==0&&(blanks.pop("\t"));
			}
		}
	}
}
console.clear();
getChildren(document);