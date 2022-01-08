<template>
	<div id="el_index" v-on:click="el_next">
		<div class="el_time">
			<span>5s</span>
		</div>
		<img src="../assets/timg.png"/>
		<h1>全友送装App</h1>
		<p>全友家居&copy;2017 <span>www.quanyou.com.cn</span></p>
	</div>
</template>

<script>
	export default {
		name:'el_index',
		data() {
			return {
				
			}
		},
		methods:{
			el_next : function(){
				location.href = '#/login'
				clearInterval(timeId2)
			}
		},
		//页面加载完成执行函数
		mounted(){
			timeId2 = setTimeout(function(){
				location.href = '#/login';
			},5000)
		}
	}
	var timeId;
	var timeId2;
	$(function(){
		var k = $('.el_time>span').text().split('s')[0];
		timeId = setInterval(function(){
			--k;
			if(k>0){
				$('.el_time>span').text(k + 's')
			}else{
				clearInterval(timeId)
			}
		},1000)
	})
</script>

<style>
.el_time{
	width: 100px;
	height: 50px;
	font-size: 32px;
	background: #FFFFFF;
	border: 1px solid #e7e7e7;
	text-align: center;
	line-height: 50px;
	position: absolute;
	right: 40px;
	top: 40px;
	border-radius: 4px;
}
#el_index{
	width: 750px;
	height: 100%;
}
#el_index>img{
	position: absolute;
	width: 600px!important;
	height: 500px!important;
	top: 200px!important;
	left: 75px!important;
}
#el_index>h1{
	position: absolute;
	width: 600px;
	height: 50px;
	text-align: center;
	line-height: 50px;
	top: 850px;
	left: 75px;
	font-size: 50px;
	color: coral;
	letter-spacing: 10px;
}
#el_index>p{
	position: fixed;
	bottom: 100px;
	width: 600px;
	text-align: center;
	left: 75px;
}
</style>