import mutations from './mutations';
import actions from './actions';

export default {
	state: {
		todoList: [],
		todoInfo: {
			id: 0,
			text: '',
			isDone: false,
			deadLine: '',
		},
		selected: 0,
	},
	mutations: mutations,
	actions: actions,
	getters: {
		lists(state){
			return state.todoList;
		},
		selectedType(state){
			return state.selected;
		},
		filterDoned(state){
			let todolist = state.todoList.filter((item) => {
				if(item.isDone){
					return item;
				}
			});
			return todolist;
		},
		filterNotDoned(state){
			let todolist = state.todoList.filter((item) => {
				if (!item.isDone) {
					return item;
				}
			});
			return todolist;
		},
		filterOverdue(state){
			let nowday = new Date();
			let todolist = state.todoList.filter((item) =>{
				let lastTime = new Date(item.deadLine.replace(/-/g,'/'));
				if(!item.isDone && lastTime-nowday < 0){
					return item;
				}
			});
			return todolist;
		}
	}
}


