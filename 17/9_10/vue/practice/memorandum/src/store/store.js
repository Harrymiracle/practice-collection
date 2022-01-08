import Vue from 'vue';
import Vuex from 'vuex';
import Login from './modules/login';
import toDoList from './modules/todolist/index';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		Login,
		toDoList
	}
})

