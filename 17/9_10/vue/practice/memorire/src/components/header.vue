<template>
	<header>
		<h1>记事本<a class="t-btn" @click="showTools"><span></span></a></h1>
	</header>
</template>

<script>
	export default {
		methods: {
			showTools(){
				this.$emit('tools');
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	header {
		width: 100%;
		height: 70px;
		position: relative;
		z-index: 100;
		h1 {
			width: 100%;
			max-width: 800px;
			line-height: 70px;
			text-align: center;
			margin: 0 auto;
			positon: relative;
			color: #fff;
			a.t-btn {
				width: 30px;
				height: 26px;
				position: absolute;
				top: 22px;
				right: 10px;
				cursor: pointer;
			}
			span, span:before, span:after {
				content: ' ';
				width: 30px;
				height: 4px;
				background: #fff;
				position: absolute;
				left: 0;
			}
			span {
				top: 11px;
				&:before {
					top: 0;
					transform: translateY(-7px);
					transition: all 0.3s;
				}
				&:after {
					transform: translateY(7px);
					transition: all 0.3s;
				}
			}
		}
	}
</style>