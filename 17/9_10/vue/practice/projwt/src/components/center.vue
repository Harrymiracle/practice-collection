<template>
	<div id="el_center">
		<nav>
			<span>
				<router-link to="/login/index1"><img src="../assets/left.png"></router-link>
				<span>个人中心</span>
			</span>
		</nav>
		<img src="../assets/background.jpg" class="el_top_img"/>
		<div class="el_blank22"></div>
		<div class="el_userinform3">
			<ul class="el_top">
				<li>
					<img src="../assets/people.png"/>
					<span>账号</span>
					<span>A8888888888</span>
				</li>
				<li>
					<img src="../assets/name.png"/>
					<span>姓名</span>
					<span>张三</span>
				</li>
				<li>
					<img src="../assets/phone.png"/>
					<span>手机号</span>
					<span>188888888888</span>
				</li>
			</ul>
			<div class="el_blank22"></div>
			<ul class="el_bottom">
				<li>
					<router-link to="/login/index1/center/ResetAgin">
						<img src="../assets/lock.png"/>
						<span>修改密码</span>
						<span>
							<img src="../assets/right.png"/>
						</span>
					</router-link>
				</li>
				<li>
					<router-link to="/login/index1/Test2">
						<img src="../assets/upgrade.png"/>
						<span>版本信息</span>
						<span>
							<img src="../assets/right.png"/>
						</span>
					</router-link>
				</li>
			</ul>
		</div>
		<router-link to='/login' class="el_ecxt">退出</router-link>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		}
	}
</script>

<style>
	html,body{
		height: 100%;
	}
	#app{
		height: 100%;
	}
	#el_center{
		position: relative;
	}
	#el_center>nav{
		width: 750px;
		box-sizing: border-box;
		position: fixed;
		top: 0;
	}
	#el_center>nav>span{
		display: inline-block;
		width: 750px;
		height: 80px;
		margin: 0 auto;
		line-height: 80px;
		background: #00916c;
		text-align: center;
		font-size: 32px;
		color: #fff;
		position: relative;
	}
	#el_center>nav>span>a{
		font-size: 40px;
		color: #fff;
		position: absolute;
		left: 25px;
	}
	.el_top_img{
		width: 100%;
		margin-top: 80px;
	}
	.el_blank22{
		height: 20px;
		background: #f2f2f2;
	}
	.el_top>li{
		width: 720px;
		height: 80px;
		line-height: 80px;
		margin-left: 15px;
		list-style: none;
		border-bottom: 1px solid #ccc;
		font-size: 32px;
	}
	.el_top>li:last-child{
		border-bottom: none;
	}
	.el_top>li>span:nth-child(2){
		color: #999;
		margin-left: 10px;
	}
	.el_top>li>span:nth-child(3){
		float: right;
	}
	.el_top>li>img{
		width: 32px;
		vertical-align: middle;
		padding: 5px;
		border-radius: 10px;
	}
	.el_top>li:nth-child(1)>img{
		background: #ce1af1;
	}
	.el_top>li:nth-child(2)>img{
		background: #ffc516;
	}
	.el_top>li:nth-child(3)>img{
		background: #f57046;
	}
	.el_top>li{
		width: 720px;
		height: 80px;
		line-height: 80px;
		margin-left: 15px;
		list-style: none;
		border-bottom: 1px solid #ccc;
		font-size: 32px;
	}
	.el_bottom>li>a{
		display: block;
		width: 720px;
		height: 80px;
		line-height: 80px;
		margin-left: 15px;
		list-style: none;
		border-bottom: 1px solid #ccc;
		font-size: 32px;
	}
	.el_bottom>li:last-child{
		border-bottom: none;
	}
	.el_bottom>li>a>span:nth-child(2){
		color: #999;
		margin-left: 10px;
	}
	.el_bottom>li>a>span:nth-child(3){
		position: relative;
		float: right;
	}
	.el_bottom>li>a>span:nth-child(3)>img{
		position: absolute;
		top: 20px;
		right: 0;
	}
	.el_bottom>li>a>img{
		width: 32px;
		vertical-align: middle;
		padding: 5px;
		border-radius: 10px;
	}
	.el_bottom>li:nth-child(1)>a>img{
		background: #2196F3;
	}
	.el_bottom>li:nth-child(2)>a>img{
		background: #2adc2a;
	}
	.el_ecxt{
		width: 680px;
		height: 80px;
		border-radius: 8px;
		background: red;
		color: #FFFFFF;
		font-size: 32px;
		letter-spacing: 10px;
		text-align: center;
		line-height: 80px;
		display: block;
		margin-left: 35px;
		position: absolute;
		bottom: 0px;
	}
</style>