//配置actions

import ajax from '../config/ajax'

export default {
	addNum({ commit, state }, id) {
		//点击下一题，记录答案id，判断是否是最后一题，如果不是则跳转下一题
		commit('REMBER_ANSWER', id);
		if (state.itemNum < state.itemDetail.length) {
			commit('ADD_ITEMNUM', 1);
		}
	},
	//初始化信息
	initializeData({ commit }) {	//用到 ES2015 的 参数解构 来简化代码（特别是我们需要调用 commit 很多次的时候）
		commit('INITIALIZE_DATA');
	}
}