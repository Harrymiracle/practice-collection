<template>
	<header>{{msg}}</header>
	<navbar class="page-part" :selected.sync="selected">
	  <tab-item id="1">选项一</tab-item>
	  <tab-item id="2">选项二</tab-item>
	  <tab-item id="3">选项三</tab-item>
	</navbar>
	
	<tab-container :active.sync="selected">
	  <tab-container-item id="1">
	    <cell v-for="n in 100" :title="'内容 ' + n"></cell>
	  </tab-container-item>
	  <tab-container-item id="2">
	    <cell v-for="n in 4" :title="'测试 ' + n"></cell>
	  </tab-container-item>
	  <tab-container-item id="3">
	    <cell v-for="n in 6" :title="'选项 ' + n"></cell>
	  </tab-container-item>
	</tab-container>
	<header class="bopx">content</header>
	<button @click="openPicker">openPicker</button>
	<!-- <datetime-picker ref="picker" type="time" v-model="pickerValue"></datetime-picker> -->
	<One v-show="isA"></One>
	<Two v-show="false"></Two>
	<button @click="btn">点击</button>
</template>

<script>
	const One = resolve => require(['../../common/One'], resolve); 
	const Two = resolve => require(['../../common/Two'], resolve); 
	const wx = require('../../../js/base/wechatShare');
	import { Navbar, TabItem,TabContainer,TabContainerItem,Cell,DatetimePicker  } from 'mint-ui';
	export default{
		data(){
			return{
				msg:"乐股道",
				selected:1,
				isA:false,
				member_id:'',
				user_id:'',
			}
		},
		route:{
			
		},
		components:{
			Navbar,
			TabItem,
			TabContainer,
			TabContainerItem,
			Cell,
			DatetimePicker,
			One,
			Two
		},
		ready(){
			this.scrollLoad();
		},
		methods:{
			openPicker() {
		      // this.$refs.picker.open();
		      console.log(window.location.origin)
		    },
		    btn(){
		    	this.isA = true;
		    	let ua = navigator.userAgent.toLowerCase(); 
		    	

		    },
		    scrollLoad(){
	 			let _self = this;
	 			console.log(1);
	 			require.ensure([],() =>{
					let scroll = require('../../../js/base/scroll');
					console.log(2)
					new scroll({},function(ret){
						console.log(3);
						console.log(ret);
						if(ret.scrollTop && ret.isToBottom && _self.isloading){
							console.log(4);
							_self.getInfoList(++_self.page);
						}
					});
				});
	 		},
		}
	}
</script>
<style>
	@import "../../../css/demo.css";
</style>