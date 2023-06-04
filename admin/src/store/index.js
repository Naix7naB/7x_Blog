import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import tag from './modules/tag'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: false
    },
    getters: {
        getLoadingState: state => state.loading
    },
    mutations: {
        _set_loading_state_(state, loadingState) {
            state.loading = loadingState
        }
    },
    actions: {
        setLoadingState({ commit }, loadingState) {
            commit('_set_loading_state_', loadingState)
        }
    },
    modules: {
        user,
        tag
    }
})
