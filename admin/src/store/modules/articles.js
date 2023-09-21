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
        }
    },
    actions: {
        initArticleStore({ dispatch }) {
            dispatch('loadCategoryList')
            dispatch('loadTagList')
        },
        async loadCategoryList({ getters, commit }) {
            if (!getters.getCategoryList) {
                const { data } = await getCategoryList({
                    populate: '',
                    select: 'name'
                })
                commit('_set_category_list_', data.list)
            }
        },
        async loadTagList({ getters, commit }) {
            if (!getters.getTagList) {
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
        }
    }
}
