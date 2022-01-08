import * as types from './mutations_type';

export default {
	[types.ADD_TODO]( state, todoItem){
		if(todoItem){
			let todoInfo = {};
			todoInfo.isDone = false;
			if(state.todoList.length == 0){
				todoInfo.id = 0;
			}else if(state.todoList.length > 0){
				let firstTodo = state.todoList[state.todoList.length-1];
				console.log(firstTodo.text + ' , ' + firstTodo.id);
				todoInfo.id = firstTodo.id + 1;
			}
			todoInfo.text = todoItem.todoText;
			todoInfo.deadLine = todoItem.dueDate;
			state.todoList.push(todoInfo);
		}
	},
	[types.DONE_TODO]( state, id ){
		state.todoList.map((item) => {
			if (item.id == id) {
				console.log(item.id);
				item.isDone = !item.isDone;
			};
		})
	},
	[types.SELECT_TYPE]( state, type ){
		state.selected = type;
	},
}
