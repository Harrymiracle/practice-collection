import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let store = new Vuex.Store({
	state: {
		plannedBooks: []
	},
	mutations: {
		booksupdate(state,plannedBook){
			state.plannedBooks.push(plannedBook);
		},
		booksdelete(state,plannedBook){
			let index = state.plannedBooks.indexOf(plannedBook);
			state.plannedBooks.splice(index,1);

		}
	}
})

export default store;