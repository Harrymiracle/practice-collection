<template>
	<div id="el_erweima">
		<nav>
			<span>
				<span>上传凭证</span>
			</span>
		</nav>
		<div class="el_success">
			<img src="../assets/erweima.jpg"/>
			<p>恭喜您上传凭证成功！</p>
			<p>顾客可通过扫描上方二维码进行评价</p>
		</div>
		<div class="el_btns2">
			<router-link to='/login/index1/SerchPage/allotList'>确定</router-link>
		</div>
	</div>
</template>

<script>
</script>

<style>
	#el_erweima>nav{
		width: 750px;
		box-sizing: border-box;
		position: fixed;
		top: 0;
	}
	#el_erweima>nav>span{
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
	.el_success{
		margin-top: 80px;
	}
	.el_success>img{
	    width: 400px;
		margin: 80px 275px 0 175px;
	}
	.el_success>p:nth-child(2){
		font-size: 36px;
		text-align: center;
		color: #00916c;
		margin: 40px 0;
	}
	.el_success>p:nth-child(3){
		font-size: 28px;
		text-align: center;
	}
	.el_btns2{
		position: fixed;
		width: 750px;
		box-sizing: border-box;
		bottom: 0;
		left: 0;
		height: 200px;
		padding: 0px 25px;
	}
	.el_btns2>a{
		display: block;
		width: 700px;
		height: 80px;
		text-align: center;
		line-height: 80px;
		letter-spacing: 10px;
		background: #00916c;
		color: #FFFFFF;
		font-size: 28px;
		border-radius: 8px;
	}
</style>