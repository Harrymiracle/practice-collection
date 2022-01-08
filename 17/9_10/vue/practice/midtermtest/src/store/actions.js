export default {
	initializeData( {commit} ){
		commit('INITIAL_DATA')
	},
	addNum( {commit,state}, id ){
		commit('REMBER_ANSWER', id);
		if(state.itemNum < state.itemDetail.length){
			commit('ADD_ITEMNUM',1);
		}
	},
}