import Storage from '@/utils/storage'

import { getCategoryList } from '@/apis/category'
import { getTagList } from '@/apis/tag'
import { pick } from 'lodash-es'

export default {
    namespaced: true,
    state: {
        categories: Storage.get('_categories_'),
        tags: Storage.get('_tags_')
    },
    mutations: {
        _set_category_list_(state, list) {
            state.categories = list
            Storage.set('_categories_', list)
        },
        _set_tag_list_(state, list) {
            state.tags = list
            Storage.set('_tags_', list)
        },
        _clear_article_info_(state) {
            state.categories = null
            state.tags = null
            Storage.remove('_categories_')
            Storage.remove('_tags_')
        }
    },
    actions: {
        initArticleStore({ dispatch }) {
            dispatch('loadCategoryList')
            dispatch('loadTagList')
        },
        async loadCategoryList({ state, commit }) {
            if (!state.categories) {
                const { data } = await getCategoryList({
                    populate: '',
                    select: 'name'
                })
                commit('_set_category_list_', data.list)
            }
        },
        async loadTagList({ state, commit }) {
            if (!state.tags) {
                const { data } = await getTagList({
                    populate: '',
                    select: 'name'
                })
                commit('_set_tag_list_', data.list)
            }
        },
        setCategoryList({ commit }, list) {
            const picked = list.map(item => pick(item, ['id', 'name']))
            commit('_set_category_list_', picked)
        },
        setTagList({ commit }, list) {
            const picked = list.map(item => pick(item, ['id', 'name']))
            commit('_set_tag_list_', picked)
        },
        clearArticleInfo({ commit }) {
            commit('_clear_article_info_')
        }
    }
}
