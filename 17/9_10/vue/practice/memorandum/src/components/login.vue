<template>
	<div class="log">
		<div class="login">
			<p>
				<label>账号</label>
				<input type="text" v-model.trim="mobile" placeholder="请输入手机号码" />
			</p>
			<p>
				<label>密码</label>
				<input type="password" v-model.trim="password" placeholder="请输入密码" />
			</p>
			<p>
				<button @click="login">登 录</button>
			</p>
		</div>

		<div class="bg"></div>
	</div>
</template>

<script>

	export default{
	 	name: 'log',
	 	data(){
	 		return {
	 			mobile: '18745678900',
	 			password: '123456',
	 			showlogin: false,
	 		}
	 	},
	 	computed: {},
	 	methods: {
	 		login(){
	 			console.log(this.mobile);
	 			this.$store.dispatch('checkNum', this.mobile);
	 			let correct = this.$store.getters.getNumCheck;
	 			if(correct){
		 			this.$store.dispatch('addMyInfo', {'mobile': this.mobile, 'password': this.password});
		 			this.$store.dispatch('showLogin', false);
		 			this.$router.push('item');
	 			}else{
	 				alert('请正确输入手机号码。')
	 			}
	 		}
	 	},

	}
</script>

<style scoped lang="less">
	.login {
		width: 6rem;
		height: 3.6rem;
		position: fixed;
		z-index: 999;
		background-color: white;
		border-radius: 0.16rem;
		padding-top: 0.6rem;
		left: 50%;
		top: 50%;
		font-size: 0.3rem;
		margin-top: -1.6rem;
		margin-left: -3rem;
		text-align: center;
		p {
			padding: 0.2rem;
		}
		label {
			width: 1rem;
			display: inline-block;
			text-align: left;
		}
		button {
			padding: 0.2rem 0.4rem;
			background: #00bf8e;
			color: #fff;
			border-radius: 0.06rem;
		}
	}
	.bg {
		background-color: black;
		width: 100%;
		height: 100%;
		opacity: 0.2;
		position: fixed;
		top:0;
		left: 0;
	}
</style>