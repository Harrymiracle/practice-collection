<template>
	<nav class="header">
		<a class="lineThree" @click="showSide"><span></span></a>
		<span class="tit">备忘录</span>
		<a class="boxFour"><span class="up"></span><span class="down"></span></a>
	</nav>
</template>

<script>
	export default {
		data(){
			return {

			}
		},
		methods: {
			showSide(){
				this.$emit('tog');
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	nav.header {
		width: 100%;
		height: 44px;
		position: relative;
		border-bottom: 2px solid #e0e0e0;
		.tit {
			position: absolute;
			left: 60px;
			top: 10px;
			color: #333;
		}
	}
</style>
