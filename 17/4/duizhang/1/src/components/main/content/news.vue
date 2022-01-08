<template>
	<header>{{msg}}</header>
	<h1>{{$route.path}}</h1>
	<p>{{$route.params | json}}</p>
	<p>路由名称：{{$route.name}}</p>
    <p>路由查询参数：{{$route.query | json}}</p>
    <!-- <p>路由匹配项：{{$route.matched | json}}</p> -->
</template>

<script>

export default{
	data(){
		return{
			msg:'news',
			mask:false
			
		}
	},
	route:{
		data(transition){
			//console.log(transition);
			//console.log(this);
			console.log(this.$route);

		}
	}
}
</script>
<style scoped>
	@import "../../../css/news.css";
</style>