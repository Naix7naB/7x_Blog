import Storage from '@/utils/storage'

export default {
    namespaced: true,
    state: {
        articleInfo: null
    },
    getters: {
        getArticleInfo: state => {
            if (!state.articleInfo) {
                state.articleInfo = Storage.get('_article_info_', null)
            }
            return state.articleInfo
        }
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
        setArticleInfo({ state, commit }, info) {
            const id = state.articleInfo && state.articleInfo.id
            if (id === info.id) return false
            commit('_set_article_info_', info)
        },
        clearArticleInfo({ commit }) {
            commit('_clear_article_info_')
        }
    }
}
