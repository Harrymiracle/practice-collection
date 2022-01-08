<template>
	<header title="{{msg}}">{{msg}}</header>
	<router-view ></router-view>
	<button @click="dian" title="dian">点{{n}}下</button>
	
</template>

<script>
	import { Toast,Indicator,MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				msg:"technology",
				n:1
				
			}
		},
		components:{
			
		},
		methods:{
			dian:function(){
				//this.n +=1;
				
					//Toast({ message: '操作成功',iconClass: 'icon icon-success'});
					Indicator.open({
					  text: '玩命加载中...'
					  //spinnerType: 'fading-circle'
					});
					this.change();
					//MessageBox('提示', '操作成功');
					MessageBox({
					  title: '提示',
					  message: '确定执行此操作?',
					  showCancelButton: true
					});
			},
			change:function(){
				setInterval(function(){
					Indicator.close();
				},5000)
			}
		}
	}
</script>
<style scoped>
	@import "../../../css/demo.css";
</style>