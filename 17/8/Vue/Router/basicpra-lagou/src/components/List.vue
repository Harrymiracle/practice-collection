<template>
	<div class="listBody">
		<header id="header">拉勾网</header>

		<footer id="footer">
			<div class="footer-tab-custom"><span class="icon"></span><span class="text">职位</span></div>
			<div class="footer-tab-search"><span class="icon"></span><span class="text">搜索</span></div>
			<div class="footer-tab-mine"><span class="icon"></span><span class="text">我的</span></div>
		</footer>
	</div>
</template>

<script>
	export default {
		name: 'list'
	}
</script>

<style>
	#header,#footer{
		width:100%;
		height:128px;
		line-height:128px;	
		text-align: center;	
	}
	#header{
		position:relative;
		font-size: 1.1rem;
		color: #fff;
		background: #00b38a;
	}
	#footer{
		position:fixed;
		bottom: 0;
		left:0;
		font-size: 0.9rem;
		color:#00b38a;
		background:#f6f6f6;
	}
	#footer div{
		display:inline-block;
		box-sizing:border-box;
		width: 32.1%;
	}
	#footer .icon{
		width:56px;
		height:56px;
		display:inline-block;
		margin-bottom:-8px;
		margin-right:4px;
	}
</style>