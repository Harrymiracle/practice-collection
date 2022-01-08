<template>
	<header>{{msg}}</header>
	<router-view ></router-view>
</template>

<script>
	export default{
		data(){
			return{
				msg:"downLoad"
			}
		}
	}
</script>
<style scoped>
	@import "../../../css/demo.css";
</style>