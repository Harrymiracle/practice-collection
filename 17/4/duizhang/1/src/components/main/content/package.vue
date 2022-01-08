<template>
	<router-view ></router-view>
	<header>{{msg}}</header>
	<ul v-infinite-scroll="loadMore"  infinite-scroll-disabled="loading" infinite-scroll-distance="10">
		<li v-for="item in list">{{ item }}</li>
	</ul>
</template>

<script>
	import { InfiniteScroll } from 'mint-ui';
	export default{
		data(){
			return{
				msg:"package",
				list:[1,2,3,4,5,6,7,8,9,10],
			}
		},
		route:{
			data(){
				console.log(InfiniteScroll);
			}
		},
		methods:{
			loadMore() {
			  this.loading = true;
			  setTimeout(() => {
			    let last = this.list[this.list.length - 1];
			    for (let i = 1; i <= 10; i++) {
			      this.list.push(last + i);
			    }
			    this.loading = false;
			  }, 2500);
			}
		}
	}
</script>
<style scoped>
	@import "../../../css/demo.css";
</style>
<style scoped>
	li{
		width:100%;
		height:40px;
		text-align: center;
		line-height: 40px;
	}
	header{
		position: fixed;
		top:0;
		z-index: 3;
	}
	ul{
		margin-top: 40px;
		margin-bottom:66.5px;
	}
</style>