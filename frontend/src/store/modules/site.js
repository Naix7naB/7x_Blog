import Storage from '@/utils/storage'

import { getSiteInfo } from '@/apis/site'

export default {
    namespaced: true,
    state: {
        siteInfo: Storage.get('_site_info_')
    },
    mutations: {
        _set_site_info_(state, info) {
            state.siteInfo = info
            Storage.set('_site_info_', info)
        }
    },
    actions: {
        async loadSiteInfo({ getters, commit }) {
            if (!getters.getSiteInfo) {
                const res = await getSiteInfo()
                commit('_set_site_info_', res.data)
            }
        },
        setWebsiteInfo({ commit }, info) {
            commit('_set_site_info_', info)
        }
    }
}
