const ADD_ITEMNUM = 'ADD_ITEMNUM';		//使用常量替代 Mutation 事件类型
const REMEMBER_ANSWER = 'REMEMBER_ANSWER';
const REMEMBER_TIME = 'REMEMBER_TIME';
const INITIALIZE_DATA = 'INITIALIZE_DATA';

export default {
	[ADD_ITEMNUM](state, num){  //参数为state和提交载荷
		state.itemNum += num;
	},
	[REMEMBER_ANSWER](state, id){
		state.answerid.push(id);
	},
	[REMEMBER_TIME](state){
		state.timer = setInterval(() => {
			state.alltime ++;
		},1000);
	},
	[INITIALIZE_DATA](state){
		state.itemNum = 1,
		state.alltime = 0,
		state.answerid = []
	}
}

