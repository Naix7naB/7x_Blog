import Storage from '@/utils/storage'

import { getKey } from '@/apis/login'
import { getRoleList } from '@/apis/user'

export default {
    namespaced: true,
    state: {
        key: null,
        token: null,
        userInfo: null,
        roleList: null
    },
    getters: {
        getKey: state => {
            if (!state.key) {
                state.key = Storage.get('_uak_', null)
            }
            return state.key
        },
        getToken: state => {
            if (!state.token) {
                state.token = Storage.get('_uat_', null)
            }
            return state.token
        },
        getUserInfo: state => {
            if (!state.userInfo) {
                state.userInfo = Storage.get('_user_info_', null)
            }
            return state.userInfo
        },
        getRoleList: state => {
            if (!state.roleList) {
                state.roleList = Storage.get('_user_roles_', null)
            }
            return state.roleList
        }
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
            state.roleList = list
            Storage.set('_user_roles_', list)
        },
        _clear_user_info_(state) {
            state.token = null
            state.userInfo = null
            Storage.remove('_uat_')
            Storage.remove('_user_info_')
        }
    },
    actions: {
        initUserStore({ dispatch }) {
            dispatch('loadKey')
            dispatch('loadRoleList')
        },
        async loadKey({ getters, dispatch }) {
            if (!getters.getKey) {
                const { data } = await getKey()
                dispatch('setKey', data.pubKey)
            }
        },
        async loadRoleList({ getters, dispatch }) {
            if (!getters.getRoleList) {
                const { data } = await getRoleList({
                    populate: '',
                    select: 'label name'
                })
                dispatch('setRoleList', data.list)
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
