export const LOGIN_SUC = 'LOGIN_SUC';
export const SHOW_LOGIN = 'SHOW_LOGIN';
export const CHECK_NUM = 'CHECK_NUM';

export default {
	state: {
		mobile: '',
		password: '',
		showLogin: false,
		checkNum: false
	},
	actions: {
		addMyInfo( {commit}, loginInfo ){
			commit(LOGIN_SUC, loginInfo);
		},
		showLogin( {commit}, flag ){
			commit(SHOW_LOGIN, flag);
		},
		checkNum( {commit}, Num){
			commit(CHECK_NUM, Num);
		}
	},
	mutations: {
		[LOGIN_SUC]( state, loginInfo ){
			state.mobile = loginInfo.mobile;
			state.password = loginInfo.password;
		},
		[SHOW_LOGIN]( state, flag ){
			state.showLogin = flag;
		},
		[CHECK_NUM]( state, Num){
			state.checkNum = /^1[34578]\d{9}$/.test(Num);
		}
	},
	getters: {
		getMsg(state){
            return state.showLogin;
        },
        getName(state){
        	return state.mobile;
        },
        getNumCheck(state){
        	return state.checkNum;
        },
	}
}