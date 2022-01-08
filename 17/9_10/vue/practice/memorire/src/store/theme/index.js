import * as func from '../function.js'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

const state = func.theme_local.get() || {
    theme: 'blue'
}

export default {
	state,
	mutations,
	actions,
	getters
}