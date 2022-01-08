<script>
	import { Tabbar, TabItem } from 'mint-ui';
	
	export default{
		name:'index',
		data(){
			return{
				selected:'main',
				member_id:110,
				user_id:112,
			}
		},
		components:{
			Tabbar,
			TabItem
			
		}
	}
</script>

<template>
<div class="mui-content">
		<div class="home_page">
			<tabbar class="tab_bar" :selected.sync="selected" :fixed='true'>
				<tab-item id="main" v-link="{name:'_index',query:{member_id:this.member_id,user_id:this.user_id}}">
					<i slot="icon" class="icon_main"></i>
					乐股道
				</tab-item>
				<tab-item id="technology"  style="background:#fff;" v-link="{name:'news',query:{member_id:this.member_id,user_id:this.user_id}}">
					<i slot="icon" class="icon_tech"></i>
					技术干货
				</tab-item>
				<tab-item id="downLoad" v-link="{name:'downLoad',query:{member_id:this.member_id,user_id:this.user_id}}">
					<i slot="icon" class="icon_down"></i>
					下载APP
				</tab-item>
				<tab-item id="package" v-link="{name:'package',query:{member_id:this.member_id,user_id:this.user_id}}">
					<i slot="icon" class="icon_package"></i>
					礼包福利
				</tab-item>
				<tab-item id="userInfo" v-link="{name:'userInfo',query:{member_id:this.member_id,user_id:this.user_id}}">
					<i slot="icon" class="icon_center"></i>
					个人中心
				</tab-item>
			</tabbar>
			<router-view ></router-view>
		</div>
</template>

<style>
	
</style>
