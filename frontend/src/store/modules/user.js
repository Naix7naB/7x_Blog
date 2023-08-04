import { getKey } from '@/apis/login'

import Storage from '@/utils/storage'

export default {
    namespaced: true,
    state: {
        role: 'user',
        key: null,
        uid: null,
        token: null
    },
    getters: {
        getRole: state => state.role,
        getKey: state => state.key || Storage.get('_uak_', null),
        getUid: state => state.uid || Storage.get('_uid_', null),
        getToken: state => state.token || Storage.get('_uat_', null)
    },
    mutations: {
        _set_key_(state, key) {
            state.key = key
            Storage.set('_uak_', key)
        },
        _set_uid_(state, uid) {
            state.uid = uid
            Storage.set('_uid_', uid)
        },
        _set_token_(state, token) {
            state.token = token
            Storage.set('_uat_', token)
        }
    },
    actions: {
        async loadKey({ dispatch }) {
            const { data } = await getKey()
            dispatch('setKey', data.pubKey)
        },
        setKey({ commit }, key) {
            commit('_set_key_', key)
        },
        setUid({ commit }, uid) {
            commit('_set_uid_', uid)
        },
        setToken({ commit }, token) {
            commit('_set_token_', token)
        }
    }
}
