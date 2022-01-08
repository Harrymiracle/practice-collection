<template>
	<div class="itemcontainer">
		<topHead></topHead>
		<itemcontainer wrapper="item"></itemcontainer>
	</div>
</template>


<script>
	import topHead from '../../components/Header'
	import itemcontainer from '../../components/Itemcontainer'

	export default {
		name: 'item',
		components: {	//此处需要注册组件
		  	topHead,
		  	itemcontainer
		}
	}
</script>


<style lang="less">

</style>