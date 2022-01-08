export default {
	addNum ({commit, state}, id){		//用到 ES2015 的 参数解构 来简化代码（特别是我们需要调用 commit 很多次的时候）
		commit('REMEMBER_ANSWER', id);
		if(state.itemNum < state.itemDetail.length){
			commit('ADD_ITEMNUM', 1);
		}
	},
	initializeData ( {commit} ){
		commit('INITIALIZE_DATA');
	}
}