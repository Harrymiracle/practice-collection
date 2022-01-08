<template>
	<div>
		<div class="select-section">
          <span :class="{ 'select-type': selected == '0' , 'select': true}" @click="selectType('0')">全部</span>
          <span :class="{ 'select-type': selected == '1' , 'select': true}" @click="selectType('1')">已完成</span>
          <span :class="{ 'select-type': selected == '2' , 'select': true}" @click="selectType('2')">未完成</span>
          <span :class="{ 'select-type': selected == '3' , 'select': true}" @click="selectType('3')">已逾期</span>
        </div>
		
		<div class="todoLists">
           <p v-for="todo in todolist" class="todoItem">
             <span class="radio" @click="doneTodo(todo.id)"></span>
             <span :class="{ 'isDone': todo.isDone }">{{todo.text}}</span>
             <span :class="{ 'isDone': todo.isDone, 'deadLine': true} ">{{todo.deadLine}}</span>
           </p>
        </div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	export default{
		name: 'todoList',
		data(){
			return {
				
			}
		},
        computed:{
			todolist: function(){
				let selected = this.$store.getters.selectedType;
				if(selected == '0'){
					return this.$store.getters.lists;
				}else if(selected == '1'){
					return this.$store.getters.filterDoned;
				}else if(selected == '2'){
					return this.$store.getters.filterNotDoned;
				}else if(selected == '3'){
					return this.$store.getters.filterOverdue;
				}
			},
			selected: function(){
				return this.$store.getters.selectedType;
			}
		},
		methods: {
			doneTodo: function(id){
				this.$store.dispatch('doneTodo', id);
			},
			selectType: function(type){
				if(type){
					this.$store.dispatch('selectType', type);
				}
			}
		},
	}
</script>

<style scoped lang="less">
	.todoLists{
		font-size: 0.36rem;
	}
	.todoItem{
		width: 94%;
		margin: 0 auto;
		border-bottom: 1px solid #b8b8bf;
		margin-bottom: 0.3rem;
		padding-bottom:0.16rem;
	}
	.radio{
		width: 0.36rem;
		height: 0.36rem;
		display: inline-block;
		float: left;
		margin: 0.1rem 0.25rem 0 0;
		border: 1px solid #666;
		border-radius: 50%;
	}
	.deadLine {
		float: right;
	}
	.radio:hover{
		border:1px solid #141414;
	}
	.isDone{
		text-decoration: line-through;
	}
	.select-type{
		background: #00bf8e;
		color: #fff;
	}
	.select-section{
		font-size: 0.3rem;
		margin-left: 10%;
		margin-bottom: 0.4rem;
		span {
			padding: 0.1rem 0.2rem;
			border-radius: 3px;
		}
	}
</style>