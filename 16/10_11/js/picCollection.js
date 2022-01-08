//显示图片的函数
function showPic(whichpic){
	if(!document.getElementById("placeholder")){ //如果占位图片不存在
		return false;
	}
	//占位图片存在
	var source = whichpic.getAttribute("href"),  //获取占位图片的href值
		placeholder = document.getElementById("placeholder"); //获取p标签
	placeholder.setAttribute("src",source);  //设置占位图片的src 属性为点击了的图片的href值
	if(document.getElementById("description")){  //判断P存在的情况下
		//如果有title属性，获取当前链接的图片的title值，否则为空
		var title = whichpic.getAttribute("title")?whichpic.getAttribute("title"):"";
		var description = document.getElementById("description");  //获取p标签
		description.firstChild.nodeValue = title;  //设置p标签内的文本节点值为当前链接的图片的title值
	}
	return true;		//最终返回一个true;
};


function prepareGalery(){
	if(!document.getElementsByTagName){  //检测是否支持TagName属性
		return false;
	}
	if(!document.getElementById){  //检测是否支持ID属性
		return false;
	}
	if(!document.getElementById("imageGallery")){  //防止图片集被删除后不能加载而报错
		return false;
	}
	var gallery = document.getElementById("imageGallery"), //获取ul标签
		links = gallery.getElementsByTagName("a");	//获取ul下的a标签
	for(var i = 0,len = links.length;i < len;i++){  //遍历a标签
		links[i].onclick = function(){ //为遍历到的每个a设置click事件
			return !showPic(this);		//showPic的返回真，默认跳转不执行，否则执行默认跳转
		}
	}
}


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


//调用函数
addLoadEvent(prepareGalery);