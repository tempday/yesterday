function calc(btn){
	//向上找
	var td=btn.parentNode;
	var span=td.querySelector("span");
	var sn=span.innerHTML;
	btn.innerHTML=="+"?sn++:sn--;
	sn==0&&(sn=1);
	span.innerHTML=sn;
	var ntd=td.parentNode.querySelectorAll("td");
	ntd[3].innerHTML="&yen;"+(ntd[1].innerHTML).split("¥")[1]*sn;
	var tb=document.querySelector("tbody");
	var tr=tb.querySelectorAll("tr");
	for (var i=0,n=0;i<tr.length;i++){
		n+=parseFloat((tr[i].querySelectorAll("td")[3]).innerHTML.split("¥")[1]);
	}
	var tf=document.querySelector("tfoot");
	var total=tf.querySelectorAll("td")[1];
	total.innerHTML=n;
}