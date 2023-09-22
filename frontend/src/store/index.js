import Vue from 'vue'
import Vuex from 'vuex'

import site from './modules/site'
import user from './modules/user'
import article from './modules/article'
import comment from './modules/comment'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        scrollY: 0,
        deltaY: 0,
        maxTransY: 1200
    },
    getters: {
        getScrollY: state => state.scrollY,
        getScrollRatio: state => Math.min((state.scrollY / state.maxTransY) * 100, 100) / 100,
        getNavbarShowState: state => state.scrollY > state.maxTransY && state.deltaY > 0
    },
    mutations: {
        _set_delta_y_(state, y) {
            state.deltaY = y - state.scrollY
        },
        _set_scroll_y_(state, y) {
            state.scrollY = y
        }
    },
    actions: {
        setScrollY({ commit }, y) {
            commit('_set_delta_y_', y)
            commit('_set_scroll_y_', y)
        }
    },
    modules: {
        site,
        user,
        article,
        comment
    }
})
