import Storage from '@/utils/storage'

export default {
    namespaced: true,
    state: {
        articleInfo: Storage.get('_article_info_')
    },
    mutations: {
        _set_article_info_(state, info) {
            state.articleInfo = info
            Storage.set('_article_info_', info)
        },
        _clear_article_info_(state) {
            state.articleInfo = null
            Storage.remove('_article_info_')
        }
    },
    actions: {
        setArticleInfo({ commit }, info) {
            commit('_set_article_info_', info)
        },
        increaseCommentCount({ state, commit }) {
            const info = state.articleInfo
            info.comment_count++
            commit('_set_article_info_', info)
        },
        clearArticleInfo({ commit }) {
            commit('_clear_article_info_')
        }
    }
}
