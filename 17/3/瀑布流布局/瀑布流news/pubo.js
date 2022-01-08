      //容器
      var box;
      //最小height的下标
      var index=0;
      //图片数组
      var images = new Array('images/meinv0.jpg','images/meinv1.jpg','images/meinv2.jpg','images/meinv3.jpg','images/meinv4.jpg','images/meinv5.jpg','images/meinv6.jpg','images/meinv7.jpg','images/meinv8.jpg','images/meinv9.jpg');
      //浏览器滚动条时间
	 		 window.onscroll=function(){
                //判断是否达到加载要求
               if (checkAdd()) {
                //添加条数据
               addBoxChild(10); 
             
         }

        console.log(box.getElementsByTagName('div').length);

	 }
       //是否加载
	   function checkAdd(){
         box = document.getElementById('box');
	   	 //box内所有的图片
           var childBox = box.getElementsByTagName('div');
            //当数据达到100条时结束加载
	   	     if (childBox.length>100) {
              return false;
	   	     }
            //滚动距离
           var  scrollTops = document.documentElement.scrollTop||document.body.scrollTop;//兼容
           //body高度
           var  bodyHeight =  document.body.clientHeight||document.documentElement.clientHeight; 
           //最后一张图片的高度的1/2距离顶部的距离
           var lastImgHeight = childBox[childBox.length-1].offsetTop+Math.floor(childBox[childBox.length-1].offsetHeight/2);
           //判断,当前如果'最后一张图片的高度的1/2距离顶部的距离'<'当前滑动条滚动的距离与根节点body的高度之和时'
           if (lastImgHeight<scrollTops+bodyHeight) {
            //运行加载
               return true;
           }else{
            //否则不允许加载
           	   return false;
           }

 
	   }

     var flags = true;

    //添加方法 num 添加的数量
	  function addBoxChild(num){
      box = document.getElementById('box');
       for (var i = 0; i < num; i++) {
       	     //创建div节点
       	     var div = document.createElement('div');
             //添加类选择器
             div.className = 'tuPian';
             //创建img节点
             var img = document.createElement('img');
             //添加类选择器
             img.className = 'imgs';
             //给img添加图片
             var str = "";
             if (flags) {
              str = images[parseInt(Math.random()*images.length)];
              flags=false;
             }else{
              str ='images/'+ parseInt(Math.random()*97)+'.jpg';
              flags = true;
             }
             img.src = str;
             //将图片添加到div节点之内
                div.appendChild(img);
                //将创建好的div添加到大容器之中
                box.appendChild(div);

       }
             //将图片定位
             postionBox();


	  }


	  /*        //获取最小值的下标
        function getIndex(minHeight,arr){
             var index=0;
        	for (var i = 0; i < arr.length; i++) {

        		if (minHeight==arr[i]) {

        			index = i;
               console.log('getIndex'+index);
        			return index;

        		}
        		
        	}
         
        	return index;


        }*/
         //获取最小值
	 	     function getMin(arr){
          //将指针归0
	 		       index =0;
             //得到数组第一个值
             var min = arr[0];
	 		       for (var i = 1; i < arr.length; i++) {
                     if (min>arr[i]) {
                     	  //得到小值
                        min = arr[i];
                         //得到下标
                         index = i;
                         //console.log('getMin'+i);
                     }
	 	       	}
              
	 		      return min;

	 	  }

          //定位
	 	function postionBox(){
     box = document.getElementById('box');
	 	//所有容器下的装载图片的Box
	 	var childBox = box.getElementsByTagName('div');
	 	//每行的列数
	 	var num = Math.floor(document.documentElement.clientWidth/childBox[0].offsetWidth);
	 	//console.log(num+','+childBox[0].offsetWidth);//损失了1px 宽度需要设置成偶数
	 	box.style.width = num*childBox[0].offsetWidth+'px';

    //存放每列高度的数组
    var childBoxHeight = [];
    console.log(num+','+childBox[2].nodeName);
	 	//将图片定位
	 	for (var i = 0; i < childBox.length; i++) {

	 		if (i<num) {
      
              childBoxHeight[i] = childBox[i].offsetHeight;
              
              console.log(childBox[i].offsetHeight+','+childBox[i].nodeName+','+index);
	 		}else{
	 		     //获取当前集合之中高度最小的那位
	 			var minHeight =getMin(childBoxHeight);

	 			childBox[i].style.position='absolute';

	 			//index = getIndex(minHeight,childBoxHeight); 得到对应下标
	 			
                childBox[i].style.left = childBox[index].offsetLeft +'px';
                childBox[i].style.top = minHeight+'px';
                childBoxHeight[index] +=  childBox[i].offsetHeight;
	 		}



	 	  
	 	}

           }

     //取样式
    function getStyle(obj,attr){
    if(obj.currentStyle){//IE取样式
    return obj.currentStyle[attr];
    }else{
    return getComputedStyle(obj,false)[attr];
    }
}