function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != "function"){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}



function displayAbbreviations(){
	//检查将使用的这几个方法是否存在
	if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
	//取得所有的缩略词
	var abbreviations = document.getElementsByTagName("abbr");
	if(abbreviations.length<1) return false;
	var defs = new Array();
	//遍历这些缩略词
	for(var i=0;i<abbreviations.length;i++){
		var current_abbr = abbreviations[i];
		if(current_abbr.childNodes.length<1) continue;  //兼容IE6及之前不支持abbr的标签
			definition = current_abbr.getAttribute("title"),
			key = current_abbr.lastChild.nodeValue;
		defs[key] = definition; 
	}
	//创建列表项
	var dlist = document.createElement("dl");
	//遍历定义
	for(key in defs){
		var definition = defs[key],
			dtlist = document.createElement("dt"),
			ddlist = document.createElement("dd"),
			dt_text = document.createTextNode(key),
			dd_text = document.createTextNode(definition);
		dtlist.appendChild(dt_text);
		ddlist.appendChild(dd_text);
	//将它们添加到列表项中
		dlist.appendChild(dtlist);
		dlist.appendChild(ddlist);
	}
	if(dlist.childNodes.length<1) return false;  //兼容IE6及之前不支持abbr的标签
	//创建标题
	var header = document.createElement("h2");
	var header_text = document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	//分别把标和列表项添加到页面中
	document.body.appendChild(header);
	document.body.appendChild(dlist);	
}


addLoadEvent(displayAbbreviations);//注意调用时不用加winddow.onload,addLoadEvent函数中已经包含了它。




