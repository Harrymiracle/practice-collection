//页面加载完毕后执行的函数
function addLoadEvent(func){
	var oldOnLoad = window.onload;	//把现有的window.onload事件处理函数存入到一个变量中
	if(typeof(window.onload) != "function"){  //如果之前没有绑定函数
		window.onload = func;
	}else{   //如果之前绑定有函数
		window.onload = function(){
			oldOnLoad();
			func();
		}
	}
}


function getHTTPObject(){
	if(typeof XMLHttpRequest == "undefined"){ //测试不支持XMLHttpRequest
		XMLHttpRequest = function(){   //做IE不同版本的兼容
			try {return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
				catch(e){}
			try {return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
				catch(e){}
			try {return new ActiveXObject("Msxml2.XMLHTTP");}
				catch(e){}
			return false;
		}
	}	
	return new XMLHttpRequest();
}


function getNewContent(){
	var request = getHTTPObject();   //创建实例对象
	if(request){   //创建成功
		request.open("GET","example.txt",true);   //建立连接
		request.onreadystatechange = function(){	//设置回调函数
			if(request.readyState == 4 && request.status == 200){  //设置就绪状态码
				console.log("Response Received.")
				var para = document.createElement("p"),   //创建p标签
					txt = document.createTextNode(request.responseText);   //获取返回数据并添加到p中
				para.appendChild(txt);
				document.getElementById("new").appendChild(para);   //追加P到文档中
			}
		}
		request.send(null); //发送请求
	}else{
		alert("Sorry, your browser don\'t support XMLHttpRequest. Please change browser.")
	}
	console.log("Function Done.");
}

addLoadEvent(getNewContent);  





