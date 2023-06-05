import { formatDate } from '@/utils/util'

/* 表格表头配置项 */
const tableColumns = [
    {
        prop: 'name',
        label: '标签名称',
        minWidth: '120',
        align: 'center'
    },
    {
        prop: 'color',
        label: '标签背景色',
        minWidth: '120',
        align: 'center'
    },
    {
        prop: 'author.nickname',
        label: '创建用户',
        minWidth: '120',
        align: 'center'
    },
    {
        prop: 'dateRange',
        label: '创建时间',
        minWidth: '120',
        align: 'center',
        formatter: (row, column, cellVal, idx) => {
            return formatDate(cellVal)
        }
    },
    {
        type: 'opt',
        label: '操作',
        align: 'center',
        fixed: 'right',
        options: [
            {
                type: 'primary',
                size: 'mini',
                text: '编辑',
                act: 'edit'
            },
            {
                type: 'danger',
                size: 'mini',
                text: '删除',
                act: 'delete'
            }
        ]
    }
]
/* 头部表单配置项 */
const headerFormItems = [
    {
        type: 'date',
        prop: 'dateRange',
        label: '创建时间',
        others: {
            type: 'daterange',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            rangeSep: '至'
        }
    }
]

export default {
    namespaced: true,
    state: {
        datasource: [],
        headerFormData: {
            dateRange: []
        },
        pageData: {
            page: 1,
            size: 10,
            total: 0
        }
    },
    getters: {
        getTableColumns: () => tableColumns,
        getHeaderFormItems: () => headerFormItems
    },
    mutations: {
        _set_dialog_state_(state, isVisible) {
            state.dialogVisible = isVisible
        },
        _set_datasource_(state, data) {
            state.datasource = data
        },
        _set_header_form_data_(state, { field, value }) {
            state.headerFormData[field] = value
        },
        _set_page_data_(state, { field, value }) {
            state.pageData[field] = value
        }
    },
    actions: {
        /* 设置弹窗状态 */
        setDialogState({ commit }, isVisible) {
            commit('_set_dialog_state_', isVisible)
        },
        /* 设置表格数据源 */
        setDatasource({ commit }, data) {
            commit('_set_datasource_', data)
        },
        /* 设置头部表单数据 */
        setHeaderFormData({ commit }, payload) {
            commit('_set_header_form_data_', payload)
        },
        /* 设置分页器配置 */
        setPageData({ commit }, payload) {
            commit('_set_page_data_', payload)
        }
    }
}
