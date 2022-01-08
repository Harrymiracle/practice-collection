<template>
  <div>
	<header v-if="headContainer=='home'" class="head_box">
		<span class="username">
			请点击右侧登录进入>>
		</span>
		<span @click="showlog" class="loginExitBtn right">登录</span>
	</header>
	<header v-if="headContainer=='item'" class="head_box">
		<span class="username">
			欢迎您 <em class="user">{{ mobile }}</em> !
		</span>
		<span @click="tohome" class="loginExitBtn right">退出</span>
	</header>
  </div>	
</template>

<script>
	export default{
	 	name: 'topheader',
	 	props: ['headContainer'],
	 	computed: {
	 		mobile: function(){
	 			return this.$store.getters.getName;
	 		},
	 	},
	 	methods: {
	 		tohome: function(){
	 			this.$router.push('home');
	 		},
	 		showlog: function(){
	 			this.$store.dispatch('showLogin', true);
	 		}
	 	}
	}
</script>

<style scoped lang="less">
	.head_box {
		width: 100%;
		height: 0.76rem;
		line-height: 0.76rem;
		padding: 0 0.15rem 0.86rem;
		font-size: 0.31rem;
		border-bottom: 1px solid #e7e7e7;
		.user {
			font-size: 0.38rem;	
			color: #ea512f;
		}
		.loginExitBtn {
			color: #666;
		}
		
	}
</style>