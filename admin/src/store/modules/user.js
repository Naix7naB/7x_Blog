import Storage from '@/utils/storage'

import { getKey } from '@/apis/login'
import { getRoleList } from '@/apis/user'

export default {
    namespaced: true,
    state: {
        key: Storage.get('_uak_'),
        token: Storage.get('_uat_'),
        userInfo: Storage.get('_user_info_'),
        roles: Storage.get('_roles_')
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
        _set_role_list_(state, list) {
            state.roles = list
            Storage.set('_roles_', list)
        },
        _clear_user_info_(state) {
            state.token = null
            state.roles = null
            state.userInfo = null
            Storage.remove('_uat_')
            Storage.remove('_roles_')
            Storage.remove('_user_info_')
        }
    },
    actions: {
        initUserStore({ dispatch }) {
            dispatch('loadKey')
            dispatch('loadRoleList')
        },
        async loadKey({ state, commit }) {
            if (!state.key) {
                const { data } = await getKey()
                commit('_set_key_', data.pubKey)
            }
        },
        async loadRoleList({ state, commit }) {
            if (!state.roles) {
                const { data } = await getRoleList({
                    populate: '',
                    select: 'label name'
                })
                commit('_set_role_list_', data.list)
            }
        },
        setKey({ commit }, key) {
            commit('_set_key_', key)
        },
        setToken({ commit }, token) {
            commit('_set_token_', token)
        },
        setUserInfo({ commit }, info) {
            commit('_set_user_info_', info)
        },
        setRoleList({ commit }, list) {
            commit('_set_role_list_', list)
        },
        clearUserInfo({ commit }) {
            commit('_clear_user_info_')
        }
    }
}
