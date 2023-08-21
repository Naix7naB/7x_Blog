import Storage from '@/utils/storage'

export default {
    namespaced: true,
    state: {
        articleInfo: null
    },
    getters: {
        getArticleInfo: state => state.articleInfo || Storage.get('_article_info_', null)
    },
    mutations: {
        _set_article_info_(state, info) {
            state.articleInfo = info
            Storage.set('_article_info_', info)
        }
    },
    actions: {
        setArticleInfo({ state, commit }, info) {
            const id = state.articleInfo && state.articleInfo.id
            if (id === info.id) return false
            commit('_set_article_info_', info)
        }
    }
}
