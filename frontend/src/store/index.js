import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isDown: false,
        scrollY: 0,
        maxTransY: 1000
    },
    getters: {},
    mutations: {
        _set_down_(state, flag) {
            state.isDown = flag
        },
        _set_offset_y_(state, y) {
            state.scrollY = y
        }
    },
    actions: {
        setScrollY({ commit, state }, y) {
            const delta = y - state.scrollY
            const isDown = delta > 0 || false
            commit('_set_down_', isDown)
            commit('_set_offset_y_', y)
        }
    }
})
