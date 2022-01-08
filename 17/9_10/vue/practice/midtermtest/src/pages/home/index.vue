<template>
	<div class="homecontainer">
		<topHead></topHead>
		<itemcontainer wrapper="home"></itemcontainer>
	</div>
</template>


<script>
	import topHead from '../../components/Header'
	import itemcontainer from '../../components/Itemcontainer'

	export default {
		name: 'home',
		components: {	//此处需要注册组件
		  	topHead,
		  	itemcontainer
		}
	}
</script>

<style lang="less">

</style>


