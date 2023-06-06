import Storage from '@/utils/storage'

export default {
    namespaced: true,
    state: {
        uid: null,
        token: null
    },
    getters: {
        getUid: state => state.uid || Storage.get('_uid_', null),
        getToken: state => state.token || Storage.get('_uat_', null)
    },
    mutations: {
        _set_uid_(state, uid) {
            state.uid = uid
            Storage.set('_uid_', uid)
        },
        _set_token_(state, token) {
            state.token = token
            Storage.set('_uid_', token)
        }
    },
    actions: {
        setUid({ commit }, uid) {
            commit('_set_uid_', uid)
        },
        setToken({ commit }, token) {
            commit('_set_token_', token)
        }
    }
}
