<template>
	<div id="el_serchPage">
		<nav>
			<span>
				<router-link to="/login/index1"></router-link>
				<span>条件查询</span>
			</span>
		</nav>
		<div class="el_input">
			<img src="../assets/search2.png"/>
			<input type="text" placeholder="请输入排工单号" name="0" v-model="type1" ref="type1" v-on:input="inputchangge"/>
			<img src="../assets/x.png" v-show="yes1" v-on:click="removeall"/>
		</div>
		<p class="el_font">任务类型选择</p>
		<div class="el_input">
			<img src="../assets/Delivery.png"/>
			<!--送装任务难点开始-->
			<div v-if="data" class="el_input2">
				<div class="el_dress" @click="show('citys')">送装任务</div>
				<citys-picker :city="data" :init-value="defaultVal" @confirm="confirm" ref="citys"></citys-picker>
			</div>
			<!--送装任务难点结束-->
			<img src="../assets/x.png" v-show="yes2" v-on:click="removeall2"/>
		</div>
		<div class="el_input">
			<img src="../assets/service.png"/>
			<input type="text" placeholder="售后服务" name="2" v-model="type3" ref="type3" v-on:input="inputchangge"/>
			<img src="../assets/x.png" v-show="yes3" v-on:click="removeall3"/>
		</div>
		<p class="el_font">时间段选择</p>
		<div class="el_input" style="margin-bottom: 100px;">
			<img src="../assets/calendar.png"/>
			<input type="time" placeholder="点击进行选择" name="3" v-model="type4" ref="type4" v-on:input="inputchangge"/>
			<img src="../assets/x.png" v-show="yes4" v-on:click="removeall4"/>
		</div>
		<router-link to="/login/index1/SerchPage/allotList" class="el_btn">确认</router-link>
	</div>
</template>

<script>
	//组件引入
	import CitysPicker from 'vue-citys-picker'
	//数据引入
	import CityData from './CityData.json'
	export default {
		name:'el_index1',
		components: {
		    CitysPicker
	    },
		data() {
			return {
				type1:'',
				type2:'',
				type3:'',
				type4:'',
				yes1:false,
				yes2:false,
				yes3:false,
				yes4:false,
				//定义data
				data: CityData,
				//默认显示的城市数据
			    defaultVal: [{
			        name: '四川省',
			        value: '510000'
			    }, {
			        name: '成都市',
			        value: '510100'
			    }, {
			        name: '青羊区',
			        value: '510105'
			    }]
			}
		},
		mounted (){
			
		},
		methods:{
			//表格值改变后的事件
			inputchangge:function(val,oldval){
				//获得表单的值，直接用this.(v-model绑定的值),这里是type1，所以
				if(this.type1 == ''){
					this.yes1 = false;
				}else{
					this.yes1 = true;
				}
				//第二个表格值改变后的事件
				if(this.type2 == ''){
					this.yes2 = false;
				}else{
					this.yes2 = true;
				}
				if(this.type3 == ''){
					this.yes3 = false;
				}else{
					this.yes3 = true;
				}
				if(this.type4 == ''){
					this.yes4 = false;
				}else{
					this.yes4 = true;
				}
			},
			//第一个表格x点击事件
			removeall:function(e){
				this.type1 = '';
				this.yes1 = false;
				$(e.target).parent().find('input').focus()
			//要想获得元素还是得用this.$refs.(ref绑定的值)
			},
			//第二个表格x点击事件
			removeall2:function(e){
				this.type2 = '';
				this.yes2 = false;
				$(e.target).parent().find('input').focus()
			},
			removeall3:function(e){
				this.type3 = '';
				this.yes3 = false;
				$(e.target).parent().find('input').focus()
			},
			removeall4:function(e){
				this.type4 = '';
				this.yes4 = false;
				$(e.target).parent().find('input').focus()
			},
			confirm (values) {
//		      console.log(values)
		      	var texts = ""
      		$.each(values, function(index,item) {
		      	if(index == 0){
		      		texts += item.name
		      	}else{
		      		texts += '-'+item.name
		      	}
	        });
		      	$('.el_dress').text(texts)
		    },
		    show (name) {
		      	this.$refs[name].open()
		    }
		}
	}
</script>

<style>
	@import url("../assets/css/vue-citys-picker.css");
	#el_serchPage>nav{
		width: 750px;
		box-sizing: border-box;
	}
	#el_serchPage>nav>span{
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
	#el_serchPage>nav>span>a{
		font-size: 40px;
		color: #fff;
		position: absolute;
		left: 25px;
	}
	.el_input{
		width: 650px;
		height: 80px;
		margin-left: 50px;
		margin-top: 20px;
		line-height: 80px;
		border: 1px solid #00916c;
	}
	.el_input>.el_input2{
		width: 500px;
		height: 80px;
		border: none;
		outline: none;
		font-size: 28px;
        display: inline-block;
   		color: #999;
	}
	.el_input>img{
		vertical-align: middle;
		margin-left: 20px;
		margin-right: 10px;
	}
	.el_input>img:last-child{
	    width: 32px;
	    height: 32px;
	    margin-top: -10px;
	}
	.el_input>input{
		width: 500px;
		height: 80px;
		border: none;
		outline: none;
		font-size: 28px;
	    background: transparent;
	}
	.el_font{
		font-size: 28px;
		margin: 30px 0 30px 70px;
	}
	.el_btn{
		display: block;
		width: 650px;
		height: 80px;
		background: #00916c;
		color: #fff;
		letter-spacing: 30px;
		font-size: 28px;
		text-align: center;
		line-height: 80px;
		margin-left: 50px;
		margin-top: 100px;
		border-radius: 8px;
	}
</style>