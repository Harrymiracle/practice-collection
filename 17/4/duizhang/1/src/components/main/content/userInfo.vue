
<template>
	<header>{{msg}}</header>
	<field label="用户名" placeholder="请输入用户名" ></field>
	<field label="邮箱" placeholder="请输入邮箱" type="email"></field>
	<field label="密码" placeholder="请输入密码" type="password"></field>
	<field label="手机号" placeholder="请输入手机号" type="tel"></field>
	<field label="网站" placeholder="请输入网址" type="url"></field>
	<field label="数字" placeholder="请输入数字" type="number"></field>
	<field label="生日" placeholder="请输入生日" type="date"></field>
	<field label="邮箱" state=""></field>
	<!-- <mt-field label="邮箱" state="error"></mt-field>
	<mt-field label="邮箱" state="warning"></mt-field> -->
	<field label="自我介绍" placeholder="自我介绍" type="textarea" rows="4"></field>
	<input type="text" v-model="msga" @change="input">
	<span>{{msga}}</span>
</template>

<script>
	import { Field } from 'mint-ui';
	import tools from 'js/tools';

	export default{
		data(){
			return{
				msg:"个人资料",
				msga:''
			}
		},
		methods:{
			input:function(){
				//console.log(this.msga);
				var name ='123456';
				var a = tools.isPhone(name);
				console.log(a);
			
				
			}
		},
		components:{
			Field
		}
	}
</script>
<style scoped>
	@import "../../../css/demo.css";
</style>