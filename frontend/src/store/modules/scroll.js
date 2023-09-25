export default {
    namespaced: true,
    state: {
        y: 0,
        delta: 0,
        maxTransY: 1200
    },
    mutations: {
        _set_delta_y_(state, y) {
            state.delta = y - state.y
        },
        _set_scroll_y_(state, y) {
            state.y = y
        }
    },
    actions: {
        setScrollY({ commit }, y) {
            commit('_set_delta_y_', y)
            commit('_set_scroll_y_', y)
        }
    }
}
