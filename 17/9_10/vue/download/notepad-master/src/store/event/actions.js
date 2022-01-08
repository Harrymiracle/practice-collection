/**
 * Created by linxin on 2017/1/11.
 */
export default {
    addevent: ({ commit }, param) => commit('ADDEVENT', { items: param }), //store的actions中触发mutation中的状态函数
    eventdone: ({ commit }, param) => commit('EVENTDONE', { id: param }),
    eventtodo: ({ commit }, param) => commit('EVENTTODO', { id: param }),
    eventcancel: ({ commit }, param) => commit('EVENTCANCEL', { id: param }),
    clearevent: ({ commit }) => commit('CLEAREVENT'),
    delevent: ({ commit }, param) => commit('DELEVENT', param),
    editevent: ({ commit }, param) => commit('EDITEVENT', param),
    uploadevent: ({ commit }, param) => commit('UPLOADEVENT', param)
}