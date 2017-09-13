/*var time=0;
	while(time>=0){
		time++;
	}*/
var time=0;
function addtime(){
	postMessage(time);
	//while(time<100){
		//postMessage(time);
		time++;
	//}
}
setInterval(addtime, 1000);
var t=0;
while(t<100){
		t++;
		//console.log(t);
}