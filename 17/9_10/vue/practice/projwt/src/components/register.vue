<template>
	<div id="el_regiseter">
		<nav>
			<span>
				<router-link to="/login"><img src="../assets/left.png"></router-link>
				<span>手机验证</span>
			</span>
		</nav>
		<div class="el_inputs2">
			<div>
				<input type="text" v-model="type1" ref="type1" v-on:input="inputchangge" placeholder="手机号/用户名"/>
				<img src="../assets/x.png" v-show="yes" v-on:click="removeall"/>
			</div>
			<div class="el_yzm2">
				<div>
					<input type="text" v-model="type2" ref="type2" v-on:input="inputchangge" placeholder="验证码"/>
					<img v-show="no" v-on:click="removeall2" src="../assets/x.png"/>
				</div>
				<div v-if="!unbind" @click = 'showTime' class="el_first" ref="item1">获取验证码</div>
				<div v-else class="el_agin">10s</div>
			</div>
		</div>
		<router-link to="/login/register/Reset" class="el_next">下一步</router-link>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				type1:'',
				type2:'',
				yes:false,
				no:false,
				unbind : false,
			}
		},
		methods:{
			//表格值改变后的事件
			inputchangge:function(val,oldval){
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
			showTime:function(e){
				var s = 10
				var flage = true
				var $this = this
				//因为点击后el_first会关闭，el_agin会打开，中间会有过度，如果直接查找el_agin是找不到的
				setTimeout(function(){
					$('.el_agin').text(s+'s');
				},5)
				var timeId = setInterval(function(){
					--s
					$('.el_agin').text(s + 's');
					if(s < 0){
						clearInterval(timeId)
						//在click事件处理过程中，过程都是有过度时间的，所以立马查找元素是找不到，需要延迟
						setTimeout(function(){
							$('.el_first').text('重新获取');
						},5)
						$($this).css({'background':'orangered','color':'#fff'})
						flage = false;
						//点击事件生效
						$this.unbind = false;
					}
				},1000)
				if(flage){
					$($this).css({'background':'#f2f2f2','color':'#000'})
					//点击事件失效
					$this.unbind = true;
				}
			}
		}
	}
</script>

<style>
	html{
		/*background: #f2f2f2;*/
	}
	#el_regiseter>nav{
		width: 750px;
		box-sizing: border-box;
	}
	#el_regiseter>nav>span{
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
	#el_regiseter>nav>span>a{
		font-size: 40px;
		color: #fff;
		position: absolute;
		left: 25px;
	}
	.el_inputs2>div{
		width: 600px;
		margin-left: 75px;
		position: relative;
	}
	.el_inputs2>div>img{
		position: absolute;
		right: 15px;
		top: 24px;
	}
	.el_inputs2 input{
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
	.el_yzm2{
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
		position: relative;
	}
	.el_yzm2>div:first-child{
		width: 400px;
		position: relative;
	}
	.el_yzm2>div:first-child>img{
		position: absolute;
		right: 15px;
		top: 24px;
	}
	.el_yzm2>div>input{
		width: 400px;
		height: 80px;
		font-size: 32px;
		outline: none;
		border: none;
		background: #fff;
		border: 1px solid #00916c;
		padding-left: 20px;
		box-sizing: border-box;
	}
	.el_yzm2>div.el_first{
		width: 150px;
		height: 80px;
		font-size: 28px;
		text-align: center;
		line-height: 80px;
		background: orangered;
		color: #fff;
		padding: 0 10px;
		position: absolute;
		right: 0;
		top: 0;
	}
	.el_yzm2>div.el_agin{
		width: 150px;
		height: 80px;
		font-size: 28px;
		text-align: center;
		line-height: 80px;
		background: #f2f2f2;
		color: #000;
		padding: 0 10px;
		position: absolute;
		right: 0;
		top: 0;
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