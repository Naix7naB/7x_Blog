import { formatDate } from '@/utils/util'

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
const dialogFormItems = [
    {
        type: 'input',
        prop: 'name',
        label: '标签名称',
        placeholder: '输入标签名称'
    },
    {
        type: 'input',
        prop: 'color',
        label: '标签颜色',
        placeholder: '输入标签颜色'
    }
]

export default {
    namespaced: true,
    state: {
        datasource: [],
        headerFormData: {
            dateRange: []
        },
        dialogFormData: {
            name: '',
            color: ''
        },
        pageData: {
            page: 1,
            size: 10,
            total: 0
        }
    },
    getters: {
        getTableColumns: () => tableColumns,
        getHeaderFormItems: () => headerFormItems,
        getDialogFormItems: () => dialogFormItems
    },
    mutations: {
        _set_datasource_(state, data) {
            state.datasource = data
        },
        _set_header_form_data_(state, { field, value }) {
            state.headerFormData[field] = value
        },
        _set_dialog_form_data_(state, { field, value }) {
            state.dialogFormData[field] = value
        },
        _set_page_data_(state, { field, value }) {
            state.pageData[field] = value
        }
    },
    actions: {
        setDatasource({ commit }, data) {
            commit('_set_datasource_', data)
        },
        setHeaderFormData({ commit }, payload) {
            commit('_set_header_form_data_', payload)
        },
        setDialogFormData({ commit }, payload) {
            commit('_set_dialog_form_data_', payload)
        },
        setPageData({ commit }, payload) {
            commit('_set_page_data_', payload)
        }
    }
}
