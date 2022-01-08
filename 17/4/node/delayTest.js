function start(){
	function Delay(seconds){
		var startTime = new Date().getTime();
		while(new Date().getTime() < startTime + seconds){
			//console.log("123");
		};
	}
	Delay(3000);   //模拟休眠3秒，实际上是让循环耗时3秒后执行后面的console
	console.log("Delayed three seconds!");
}

start();



