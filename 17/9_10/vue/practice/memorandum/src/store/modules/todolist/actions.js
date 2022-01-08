import * as types from './mutations_type';

export default {
    addTodo({ commit } , todoItem){
        commit(types.ADD_TODO , todoItem);
    },
    doneTodo({ commit } , id){
        commit(types.DONE_TODO , id);
    },
    selectType({ commit } , type){
        commit(types.SELECT_TYPE , type);  //注意变量名，参数不能冲突
    },
};
