const ADD_ITEMNUM = 'ADD_ITEMNUM';
const REMBER_ANSWER = 'REMBER_ANSWER';
const REMBER_TIME = 'REMBER_TIME';
const INITIAL_DATA = 'INITIAL_DATA';

export default {
	[ADD_ITEMNUM](state, num){
		state.itemNum += num;
	},
	[REMBER_ANSWER](state, id){
		state.answerid.push(id);
	},
	[REMBER_TIME](state){
		state.timer = setInterval(() => {
			state.alltime ++;
		},1000);
	},
	[INITIAL_DATA](state){
		state.itemNum = 1;
		state.alltime = 0;
		state.answerid = [];
	},
}