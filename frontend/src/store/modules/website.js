import Storage from '@/utils/storage'

import { getWebsiteInfo } from '@/apis/website'

export default {
    namespaced: true,
    state: {
        websiteInfo: null
    },
    getters: {
        getWebsiteInfo: state => {
            if (!state.websiteInfo) {
                state.websiteInfo = Storage.get('_website_info_', null)
            }
            return state.websiteInfo
        }
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
    }
}
