<template>
	<div class="item_container">
		<itemcontainer father-component="item"></itemcontainer>
	</div>
</template>

<script>
	import itemcontainer from '../../components/itemcontainer'

	export default {
		name: 'item',
		components: {
			itemcontainer
		},
		created(){
			this.$store.commit('REMEMBER_TIME')
		}
	}

</script>

<style scoped lang="less">
</style>