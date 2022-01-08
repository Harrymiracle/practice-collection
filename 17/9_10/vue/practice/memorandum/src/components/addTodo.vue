<template>
	<div class="addTodo">
		<p><textarea rows="5" cols="" class="things" v-model.trim="todoItem.todoText" placeholder="请输入您的计划事项……"></textarea></p>
		<p class="finishTimeBox">完成时间：<input type="date" class="finishTime" v-model.trim="todoItem.dueDate" /></p>
		<p class="addBtn"><button @click="addTodo">增 加</button></p>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				todoItem: {
					todoText: '',
					dueDate: '',
				}
			}
		},
		methods: {
			addTodo: function(){
				if(this.todoItem.todoText && this.todoItem.dueDate){
					this.$store.dispatch('addTodo', this.todoItem);
					this.todoItem.todoText = '';
					this.todoItem.dueDate = '';
				}else{
					alert('事项和截止时间都是必填，请补全。')
				}
			}
		},
	 	
	}
</script>

<style scoped lang="less">
	.addTodo {
		margin-bottom: 0.3rem;
		.things {
			width: 70%;
			border: 1px solid #e0e0e0;
			border-radius: 0.1rem;
			margin-left:0.7rem;
			text-indent: 0.2rem;
			&:focus {
				border: 1px solid #00bf8e;
			}
		}
		.finishTimeBox {
			font-size: 0.3rem;
			margin-left:0.7rem;
			.finishTime {
				height: 0.45rem;
				border: 1px solid #e0e0e0;
				border-radius: 2px;
				&:focus {
					border: 1px solid #00bf8e;
				}
			}
		}
		.addBtn {
			text-align: right;
			margin-top: -0.3rem;
			button {
				background: #00bf8e;
				color: #fff;
				margin-right:0.7rem;
				padding: 0.1rem 0.3rem;
				border-radius: 0.1rem;
			}
		}
	}
	
	
</style>