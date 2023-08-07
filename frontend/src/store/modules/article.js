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
        _set_article_info_(state, data) {
            state.articleInfo = data
            Storage.set('_article_info_', data)
        }
    },
    actions: {
        setArticleInfo({ commit }, data) {
            commit('_set_article_info_', data)
        }
    }
}
