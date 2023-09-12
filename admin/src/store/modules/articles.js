import Storage from '@/utils/storage'

import { getCategoryList } from '@/apis/category'
import { getTagList } from '@/apis/tag'

export default {
    namespaced: true,
    state: {
        categoryList: null,
        tagList: null
    },
    getters: {
        getCategoryList: state => {
            if (!state.categoryList) {
                state.categoryList = Storage.get('_article_categories_', null)
            }
            return state.categoryList
        },
        getTagList: state => {
            if (!state.tagList) {
                state.tagList = Storage.get('_article_tags_', null)
            }
            return state.tagList
        }
    },
    mutations: {
        _set_category_list_(state, list) {
            state.categoryList = list
            Storage.set('_article_categories_', list)
        },
        _set_tag_list_(state, list) {
            state.tagList = list
            Storage.set('_article_tags_', list)
        }
    },
    actions: {
        initArticleStore({ dispatch }) {
            dispatch('loadCategoryList')
            dispatch('loadTagList')
        },
        async loadCategoryList({ getters, dispatch }) {
            if (!getters.getCategoryList) {
                const { data } = await getCategoryList({
                    populate: '',
                    select: 'name'
                })
                dispatch('setCategoryList', data.list)
            }
        },
        async loadTagList({ getters, dispatch }) {
            if (!getters.getTagList) {
                const { data } = await getTagList({
                    populate: '',
                    select: 'name'
                })
                dispatch('setTagList', data.list)
            }
        },
        setCategoryList({ commit }, list) {
            commit('_set_category_list_', list)
        },
        setTagList({ commit }, list) {
            commit('_set_tag_list_', list)
        }
    }
}
