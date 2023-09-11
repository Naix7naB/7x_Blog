<script>
import BaseTable from '@/components/table'
import BaseForm from '@/components/form'

import mixin from '@/views/mixins'
import { columns, queryForm, popupForm } from '@/config/articleTable.config'
import { getArticleList, createArticle, modifyArticleById, deleteArticleById } from '@/apis/article'
import { getCategoryList } from '@/apis/category'
import { getTagList } from '@/apis/tag'
import { uploadFile, deleteFile } from '@/apis/upload'
import { parseUrl } from '@/utils'

export default {
    name: 'ArticleList',
    components: { BaseTable, BaseForm },
    mixins: [mixin],
    computed: {
        /* 表格组件参数 */
        tableProps() {
            return {
                requestApi: getArticleList,
                showSelection: true,
                showPagination: true,
                columns,
                queryForm,
                popupConfig: {
                    title: this.action === 'add' ? '新增文章' : '编辑文章',
                    fullscreen: true
                }
            }
        },
        /* 弹窗组件参数 */
        popupProps() {
            return {
                data: popupForm.data,
                items: popupForm.items
            }
        }
    },
    methods: {
        /* 加载表单选项数据 */
        async loadOptions() {
            try {
                const { data: { list: categoryList } } = await getCategoryList()
                const { data: { list: tagList } } = await getTagList({ select: '-articles name' })
                const category = this.popupProps.items.find(item => item.prop === 'category')
                const tags = this.popupProps.items.find(item => item.prop === 'tags')
                category.options = categoryList.map(item => ({ label: item.name, value: item.id }))
                tags.options = tagList.map(tag => ({ label: tag.name, value: tag.id }))
            } catch (err) {
                this.$message.error(err.errMsg || err)
            }
        },
        /* 修改弹窗表单的数据 */
        modifyPopupFormData(data) {
            return Object.fromEntries(
                Object.entries(this.popupProps.data).map(([key, val]) => {
                    let value = data[key]
                    if (key === 'category') {
                        value = value?.id
                    }
                    if (key === 'tags') {
                        value = value.map(t => t.id)
                    }
                    return [key, value]
                })
            )
        },
        /* 添加文章 */
        addExecution() {
            this.submitPopupForm(data => {
                createArticle(data).then(res => {
                    this.refreshTableData()
                    this.resetPopupFormData()
                    this.$message.success(res.errMsg)
                }).catch(err => {
                    this.$message.error(err.errMsg || err)
                })
            })
        },
        /* 编辑文章 */
        modifyExecution(id) {
            this.submitPopupForm(data => {
                modifyArticleById(id, data).then(res => {
                    this.refreshTableData()
                    this.resetPopupFormData()
                    this.$message.success(res.errMsg)
                }).catch(err => {
                    this.$message.error(err.errMsg || err)
                })
            })
        },
        /* 删除文章 */
        deleteExecution(data) {
            deleteArticleById(data.id).then(res => {
                this.refreshTableData()
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        },
        /* 添加图片到文章内容 */
        addImgOfContent(pos, file) {
            uploadFile({ category: 'article', filename: pos, file }).then(({ data }) => {
                this.$refs.editor.$img2Url(pos, data.fileUrls[0].url)
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        },
        /* 将文章内容中已添加的图片删除 */
        delImgOfContent([url, file]) {
            const { category, filename } = parseUrl(url)
            deleteFile({ category, filename }).then(res => {
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        }
    },
    render(h, ctx) {
        const popupScopedSlots = {
            editor: props => {
                return (
                    <mavon-editor
                        ref="editor"
                        style="height: 640px;"
                        v-model={ props.data.content }
                        onImgAdd={ this.addImgOfContent }
                        onImgDel={ this.delImgOfContent }
                    />
                )
            }
        }
        return (
            <BaseTable
                ref='table'
                props={{ ...this.tableProps }}
                onOptAdd={ this.optAdd }
                onOptEdit={ this.optEdit }
                onOptDelete={ this.optDelete }
                onOptBulkDelete={ this.optBulkDelete }
                onBeforePopupCancel={ this.onBeforePopupCancel }
                onBeforePopupConfirm={ this.onBeforePopupConfirm }>
                <template slot="popup">
                    <BaseForm ref="popup" props={{ ...this.popupProps }} { ...{ scopedSlots: popupScopedSlots } } />
                </template>
            </BaseTable>
        )
    },
    created() {
        this.loadOptions()
    }
}
</script>

<style lang="scss" scoped>
:deep(.el-table .el-image__inner) {
    aspect-ratio: 16 / 9;
}

:deep(.el-tag + .el-tag) {
    margin-left: 6px;
}

:deep(.el-input) {
    max-width: 480px;
}
</style>
