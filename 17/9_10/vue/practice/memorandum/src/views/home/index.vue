<template>
	<div class="home_container">
		<topHeader head-container="home"></topHeader>

		<h2 class="intro">近期要完成事项备忘录和完成情况查看、追踪。</h2>
		<div class="img_wrap">
			<img src="../../assets/logo.png" />
		</div>

		<Login v-if="isShowLogin"></Login>
		
	</div>
</template>

<script>
	import topHeader from '../../components/topHeader';
	import Login from '../../components/login';

	export default{
	 	name: 'home',
	 	components: {
	 		topHeader,
	 		Login,
	 	},
	 	computed: {
	 		isShowLogin: function(){
	 			return this.$store.getters.getMsg;
	 		}
	 	}
	}
</script>

<style scoped lang="less">
	h2.intro {
		font-size: 0.36rem;
		margin: 0.8rem 0;
		text-align: center;
	}
	.img_wrap {
		text-align: center;
	}
</style>