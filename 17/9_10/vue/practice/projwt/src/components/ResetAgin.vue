<template>
	<div id="el_ResetAgin">
		<nav>
			<span>
				<router-link to="/login/index1/center"><img src="../assets/left.png"></router-link>
				<span>重置密码</span>
			</span>
		</nav>
		<div class="el_inputs">
			<div>
				<input type="password" v-model="type0" ref="type0" v-on:input="inputchangge" placeholder="请输入旧密码"/>
				<img src="../assets/x.png" v-show="yes0" v-on:click="removeall0" style="right: 60px;"/>
				<img v-show="eye1" src="../assets/eye.png" v-on:click="openEye1"/>
				<img v-show="open_eye1"  src="../assets/open_eye.png" v-on:click="CloseEye1"/>
			</div>
			<div>
				<input type="password" v-model="type1" ref="type1" v-on:input="inputchangge" placeholder="设置新密码"/>
				<img src="../assets/x.png" v-show="yes" v-on:click="removeall" style="right: 60px;"/>
				<img v-show="eye2" src="../assets/eye.png" v-on:click="openEye2"/>
				<img v-show="open_eye2"  src="../assets/open_eye.png" v-on:click="CloseEye2"/>
			</div>
			<div>
				<input type="password" v-model="type2" ref="type2" v-on:input="inputchangge" placeholder="确认新密码"/>
				<img src="../assets/x.png" v-show="no" v-on:click="removeall2" style="right: 60px;"/>
				<img v-show="eye3" src="../assets/eye.png" v-on:click="openEye3"/>
				<img v-show="open_eye3"  src="../assets/open_eye.png" v-on:click="CloseEye3"/>
			</div>
		</div>
		<router-link to="/login" class="el_next">重置密码</router-link>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				type0:'',
				type1:'',
				type2:'',
				yes0:false,
				yes:false,
				no:false,
				eye1:true,
				open_eye1:false,
				eye2:true,
				open_eye2:false,
				eye3:true,
				open_eye3:false
			}
		},
		methods:{
			//表格值改变后的事件
			inputchangge:function(val,oldval){
				if(this.type0 == ''){
					this.yes0 = false;
				}else{
					this.yes0 = true;
				}
				//获得表单的值，直接用this.(v-model绑定的值),这里是type1，所以
				if(this.type1 == ''){
					this.yes = false;
				}else{
					this.yes = true;
				}
				//第二个表格值改变后的事件
				if(this.type2 == ''){
					this.no = false;
				}else{
					this.no = true;
				}
			},
			removeall0:function(e){
				this.type0 = '';
				this.yes0 = false;
				$(e.target).parent().find('input').focus()
			},
			//第一个表格x点击事件
			removeall:function(e){
				this.type1 = '';
				this.yes = false;
				$(e.target).parent().find('input').focus()
			//要想获得元素还是得用this.$refs.(ref绑定的值)
			},
			//第二个表格x点击事件
			removeall2:function(e){
				this.type2 = '';
				this.no = false;
				$(e.target).parent().find('input').focus()
			},
			openEye1:function(e){
				this.eye1 = false;
				this.open_eye1 = true;
				$('.el_inputs>div:eq(0)>input').prop('type','text');
				$(e.target).parent().find('input').focus()
			},
			CloseEye1:function(e){
				this.eye1 = true;
				this.open_eye1 = false;
				$('.el_inputs>div:eq(0)>input').prop('type','password');
				$(e.target).parent().find('input').focus()
			},
			openEye2:function(e){
				this.eye2 = false;
				this.open_eye2 = true;
				$('.el_inputs>div:eq(1)>input').prop('type','text');
				$(e.target).parent().find('input').focus()
			},
			CloseEye2:function(e){
				this.eye2 = true;
				this.open_eye2 = false;
				$('.el_inputs>div:eq(1)>input').prop('type','password');
				$(e.target).parent().find('input').focus()
			},
			openEye3:function(e){
				this.eye3 = false;
				this.open_eye3 = true;
				$('.el_inputs>div:eq(2)>input').prop('type','text');
				$(e.target).parent().find('input').focus()
			},
			CloseEye3:function(e){
				this.eye3 = true;
				this.open_eye3 = false;
				$('.el_inputs>div:eq(2)>input').prop('type','password');
				$(e.target).parent().find('input').focus()
			}
		}
	}
</script>

<style>
	html{
		/*background: #f2f2f2;*/
	}
	#el_ResetAgin>nav{
		width: 750px;
		box-sizing: border-box;
	}
	#el_ResetAgin>nav>span{
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
	#el_ResetAgin>nav>span>a{
		font-size: 40px;
		color: #fff;
		position: absolute;
		left: 25px;
	}
	.el_inputs{
		/*background: #f2f2f2;*/
	}
	.el_inputs>div{
		position: relative;
		width: 600px;
		margin-left: 75px;
	}
	.el_inputs>div>img{
		position: absolute;
		right: 15px;
		top: 24px;
	}
	.el_inputs input{
		width: 600px;
		height: 80px;
		font-size: 32px;
		outline: none;
		border: none;
		background: #fff;
		display: block;
		margin: 40px auto;
		border: 1px solid #00916c;
		padding-left: 20px;
		box-sizing: border-box;
	}
	.el_yzm{
		width: 600px;
		height: 80px;
		font-size: 32px;
		outline: none;
		border: none;
		/*background: #f2f2f2;*/
		margin-left: 40px;
		margin-top: 20px;
		display: block;
		margin: 20px auto;
	}
	.el_next{
		width: 600px;
		height: 80px;
		font-size: 28px;
		text-align: center;
		line-height: 80px;
		background: #00916c;
		color: #fff;
		display: block;
		margin: 40px auto;
		border-radius: 8px;
	}
</style>