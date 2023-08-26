export default {
    namespaced: true,
    state: {
        replyId: ''
    },
    getters: {
        currentReplyId: state => state.replyId
    },
    mutations: {
        _set_reply_id_(state, id) {
            state.replyId = id
        }
    },
    actions: {
        setReplyId({ commit }, id) {
            commit('_set_reply_id_', id)
        }
    }
}
