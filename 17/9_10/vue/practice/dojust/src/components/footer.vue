<template>
	<nav class="footer">
		<div class="newBtn">
			<a class="cross"><span class="horizon"></span><span class="vertic"></span></a>
			新建
		</div>
	</nav>
</template>

<script>
</script>

<style lang="scss" rel="stylesheet/scss">
	nav.footer {
		width: 100%;
		height: 56px; 
		position: absolute;
		left: 0;
		bottom: 0;
		z-index:6;
		.newBtn {
			width: 110px;
			height: 45px;
			z-index: 10;
			position: relative;
			line-height: 66px;
			font-size: 12px; 
			margin: 0 auto;
			border-radius: 30px;
			background: rgba(255,255,255,.5);
			text-align: center;
			box-shadow: 2px 2px 8px #e0e0e0, -2px 2px 8px #e0e0e0;
		}
	}
</style>
