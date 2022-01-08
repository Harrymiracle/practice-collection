<template>
	<div class="item_container">
		<topHeader head-container="item"></topHeader>
		<p class="tips">请在下面输入你的计划项:</p>
		<addTodo></addTodo>
		<todoList></todoList>
	</div>
</template>

<script>
	import topHeader from '../../components/topHeader'
	import addTodo from '../../components/addTodo'
	import todoList from '../../components/todoList'

	export default{
	 	name: 'item',
	 	components: {
	 		topHeader,
	 		addTodo,
	 		todoList,
	 	},
	 	computed: {
	 		
	 	}
	}
</script>

<style scoped lang="less">
	.tips {
		padding: 0.3rem;
		font-size: 0.36rem;
	}
</style>