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
        SET_UID(state, uid) {
            state.uid = uid
            Storage.set('_uid_', uid)
        },
        SET_TOKEN(state, token) {
            state.token = token
            Storage.set('_uid_', token)
        }
    },
    actions: {
        setUid({ commit }, uid) {
            commit('SET_UID', uid)
        },
        setToken({ commit }, token) {
            commit('SET_TOKEN', token)
        }
    }
}
