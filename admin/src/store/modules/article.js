import Request from '@/utils/request'

const original_data = {
    title: '',
    description: '',
    tags: [],
    cover_img: null,
    content: '',
    state: ''
}
const original_items = [
    {
        type: 'input',
        prop: 'title',
        label: '文章标题',
        placeholder: '请输入文章标题',
        rules: [{ required: true, message: '请填写文章标题', trigger: 'blur' }]
    },
    {
        type: 'input',
        prop: 'description',
        label: '文章描述',
        placeholder: '请输入文章描述',
        rules: [{ required: true, message: '请填写文章描述', trigger: 'blur' }]
    },
    {
        type: 'select',
        prop: 'tags',
        label: '文章标签',
        placeholder: '请输入文章标签',
        rules: [{ required: true, message: '请填写文章标签', trigger: 'change' }],
        others: {
            allowCreate: true,
            defaultFirstOption: true,
            filterable: true,
            multiple: true,
            multipleLimit: 5
        },
        options: [] // 后端获取
    },
    {
        type: 'upload',
        prop: 'cover_img',
        label: '上传封面',
        uploadType: 0,
        limit: 1
    },
    {
        type: 'slot',
        slotName: 'editor',
        prop: 'content',
        label: '文章内容'
    },
    {
        type: 'slot',
        slotName: 'submit',
        prop: 'state'
    }
]

export default {
    namespaced: true,
    state: {
        form: {
            data: original_data,
            items: original_items
        }
    },
    getters: {
        articleInfo: state => state.form.data,
        formItems: state => state.form.items
    },
    mutations: {
        SET_ARTICLE_INFO(state, { field, value }) {
            state.form.data[field] = value
        },
        SET_TAGS(state, list) {
            state.form.items.forEach(item => {
                if (item.prop === 'tags') {
                    item.options = list.map(tag => {
                        return {
                            label: tag.name,
                            value: tag.name
                        }
                    })
                }
            })
        }
    },
    actions: {
        setArticleInfo({ commit }, payload) {
            commit('SET_ARTICLE_INFO', payload)
        },
        loadTags({ commit }) {
            Request.requestForm({
                methodType: Request.GET,
                url: '/api/tag',
                data: {
                    select: '-articles'
                }
            })
                .then(({ data: { list } }) => {
                    commit('SET_TAGS', list)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
