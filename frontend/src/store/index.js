import Vue from 'vue'
import Vuex from 'vuex'
import Storage from '@/utils/storage'

import user from './modules/user'
import article from './modules/article'
import comment from './modules/comment'

import { getWebsiteInfo } from '@/apis/website'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        websiteInfo: null
    },
    getters: {
        getWebsiteInfo: state => state.websiteInfo || Storage.get('_website_info_', null)
    },
    mutations: {
        _set_website_info_(state, info) {
            state.websiteInfo = info
            Storage.set('_website_info_', info)
        }
    },
    actions: {
        async loadWebsiteInfo({ dispatch }) {
            const { data } = await getWebsiteInfo()
            dispatch('setWebsiteInfo', data.list[0])
        },
        setWebsiteInfo({ commit }, info) {
            commit('_set_website_info_', info)
        }
    },
    modules: {
        user,
        article,
        comment
    }
})
