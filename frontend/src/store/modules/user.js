import Storage from '@/utils/storage'

import { getKey } from '@/apis/login'

export default {
    namespaced: true,
    state: {
        key: Storage.get('_uak_'),
        token: Storage.get('_uat_'),
        userInfo: Storage.get('_user_info_')
    },
    mutations: {
        _set_key_(state, key) {
            state.key = key
            Storage.set('_uak_', key)
        },
        _set_token_(state, token) {
            state.token = token
            Storage.set('_uat_', token)
        },
        _set_user_info_(state, info) {
            state.userInfo = info
            Storage.set('_user_info_', info)
        },
        _clear_user_info_(state) {
            state.token = null
            state.userInfo = null
            Storage.remove('_uat_')
            Storage.remove('_user_info_')
        }
    },
    actions: {
        async loadKey({ state, commit }) {
            if (!state.key) {
                const { data } = await getKey()
                commit('_set_key_', data.pubKey)
            }
        },
        setKey({ commit }, key) {
            commit('_set_key_', key)
        },
        setToken({ commit }, token) {
            commit('_set_token_', token)
        },
        setUserInfo({ dispatch, commit }, info) {
            dispatch('setUserRole', info.rid)
            commit('_set_user_info_', info)
        },
        clearUserInfo({ commit }) {
            commit('_clear_user_info_')
        }
    }
}
