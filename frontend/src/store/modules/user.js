import { getKey } from '@/apis/login'

import Storage from '@/utils/storage'

export default {
    namespaced: true,
    state: {
        key: null,
        token: null,
        userInfo: null
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
        async loadKey({ dispatch }) {
            const { data } = await getKey()
            dispatch('setKey', data.pubKey)
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
