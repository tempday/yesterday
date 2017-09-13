function calc(btn){
	//向上找
	var td=btn.parentNode;
	var span=td.getElementsByTagName("span")[0];
	var sn=span.innerHTML;
	btn.innerHTML=="+"?sn++:sn--;
	sn==0&&(sn=1);
	span.innerHTML=sn;
	var ntd=td.parentNode.getElementsByTagName("td");
	ntd[3].innerHTML="&yen;"+(ntd[1].innerHTML).split("¥")[1]*sn;
	var tb=document.getElementsByTagName("tbody")[0];
	var tr=tb.getElementsByTagName("tr");
	for (var i=0,n=0;i<tr.length;i++){
		n+=parseFloat((tr[i].getElementsByTagName("td")[3]).innerHTML.split("¥")[1]);
	}
	var tf=document.getElementsByTagName("tfoot")[0];
	var total=tf.getElementsByTagName("td")[1];
	total.innerHTML=n;
}
