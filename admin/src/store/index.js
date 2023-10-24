import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

import user from './modules/user'
import article from './modules/articles'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: false
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
    getters,
    modules: {
        user,
        article
    }
})
