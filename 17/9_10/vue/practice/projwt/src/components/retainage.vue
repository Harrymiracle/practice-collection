<template>
	<div id="el_retainage">
		<nav>
			<span>
				<router-link to="/login/index1/SerchPage/allotList/userinfor"><img src="../assets/left.png"></router-link>
				<span>收尾款</span>
			</span>
		</nav>
		<ul>
			<li v-for='(item,index) in userinform'>
				<span>{{ item.tops }}：</span>
				<span>{{ item.bots }}</span>
			</li>
		</ul>
		<div class="el_bottom2">
			<span>总金额：</span>
			<span>￥4300</span>
			<router-link to="/login/index1/SerchPage/allotList/userinfor/retainage/retainageList" class="el_retainageList">
				<span>确认收款</span>
			</router-link>
		</div>
	</div>
</template>

<script>
	import data from './test.json'
	export default{
		data(){
			return{
				userinform: ''
			}
		},
		mounted(){
			this.userinform = data
		}
	}
</script>

<style>
	html,#app{
		height: 100%;
	}
	body{
		height: calc(100% - 80px)!important;
	}
	#el_retainage>nav{
		width: 750px;
		box-sizing: border-box;
	    position: absolute;
    	top: -80px;
	}
	#el_retainage>nav>span{
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
	#el_retainage>nav>span>a{
		font-size: 40px;
		color: #fff;
		position: absolute;
		left: 25px;
	}
	#el_retainage{
		position: relative;
	    height: 100%;
	}
	#el_retainage>ul{
		height: 750px;
		padding-left: 15px;
		list-style: none;
		margin-top: 80px;
	}
	#el_retainage>ul>li{
		padding: 30px 0px;
		width: 720px;
		font-size: 28px;
		border-bottom: 1px solid #ccc;
	}
	#el_retainage>ul>li:nth-child(3):after{
	    content: "";
	    display: block;
	    height: 20px;
	    background: #f2f2f2;
	    margin-left: -15px;
	    width: 750px;
	    position: relative;
	    top: 34px;
	    border-top: 1px solid #999;
	}
	#el_retainage>ul>li:last-child{
		border-bottom: none;
	}
	#el_retainage>ul>li:first-child:before{
		content: "";
	    display: block;
	    height: 20px;
	    margin-left: -15px;
	    width: 750px;
	    position: relative;
	    top: -26px;
	    background: #f2f2f2;
	}
	#el_retainage>ul>li:last-child:after{
		content: "";
	    display: block;
	    height: 1px;
	    margin-left: -15px;
	    width: 750px;
	    position: relative;
	    top: 18px;
	    border-top: 1px solid #999;
	}
	#el_retainage>ul>li>span:first-child{
		color: #999;
	}
	#el_retainage>ul>li>span:last-child{
		float: right;
	}
	#el_retainage>ul>li:last-child>span:last-child{
		color: red;
	}
	.el_bottom2{
		position: absolute;
		width: 750px;
		background: #f2f2f2;
		bottom: 0px;
		display: block;
		height: 100px;
		font-size: 28px;
		line-height: 100px;
	}
	.el_bottom2>span:first-child{
		color: #999;
	}
	.el_bottom2>span:nth-child(2){
		color: red;
		font-size: 42px;
	}
	.el_bottom2>a{
		display: inline-block;
		height: 100px;
		background: red;
		color: #FFFFFF;
		font-size: 42px;
		text-align: center;
		line-height: 100px;
		float: right;
		padding: 0 20px;
	}
</style>