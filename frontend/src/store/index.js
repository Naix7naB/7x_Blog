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
        scrollY: 0,
        deltaY: 0,
        maxTransY: 1200,
        websiteInfo: null
    },
    getters: {
        getScrollY: state => state.scrollY,
        getScrollRatio: state => Math.min((state.scrollY / state.maxTransY) * 100, 100) / 100,
        getNavbarShowState: state => state.scrollY > state.maxTransY && state.deltaY > 0,
        getWebsiteInfo: state => state.websiteInfo || Storage.get('_website_info_', null)
    },
    mutations: {
        _set_delta_y_(state, y) {
            state.deltaY = y - state.scrollY
        },
        _set_scroll_y_(state, y) {
            state.scrollY = y
        },
        _set_website_info_(state, info) {
            state.websiteInfo = info
            Storage.set('_website_info_', info)
        }
    },
    actions: {
        setScrollY({ commit }, y) {
            commit('_set_delta_y_', y)
            commit('_set_scroll_y_', y)
        },
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
