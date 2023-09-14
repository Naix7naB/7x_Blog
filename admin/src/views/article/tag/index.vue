<script>
import BaseTable from '@/components/table'
import BaseForm from '@/components/form'
import ColorBlock from '@/components/colorBlock'

import mixin from '@/views/mixins'
import { columns, queryForm, popupForm } from '@/config/tagTable.config'
import { getTagList, createTag, modifyTagById, deleteTagById } from '@/apis/tag'
import { mapActions } from 'vuex'

export default {
    name: 'ArticleTag',
    components: { BaseForm, BaseTable, ColorBlock },
    mixins: [mixin],
    computed: {
        /* 表格组件参数 */
        tableProps() {
            return {
                requestApi: getTagList,
                showSelection: true,
                showPagination: true,
                columns,
                queryForm,
                popupConfig: {
                    title: this.action === 'add' ? '新增标签' : '编辑标签信息',
                    width: '40%'
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
        ...mapActions('article', ['setTagList']),
        /* 添加文章标签 */
        addExecution() {
            this.submitPopupForm(data => {
                createTag(data).then(res => {
                    this.refreshTableData()
                    this.$message.success(res.errMsg)
                }).catch(err => {
                    this.$message.error(err.errMsg || err)
                })
            })
        },
        /* 修改文章标签 */
        modifyExecution(id) {
            this.submitPopupForm((data, hasModify) => {
                if (hasModify === false) return false
                modifyTagById(id, data).then(res => {
                    this.refreshTableData()
                    this.$message.success(res.errMsg)
                }).catch(err => {
                    this.$message.error(err.errMsg || err)
                })
            })
        },
        /* 删除文章标签 */
        deleteExecution(data) {
            deleteTagById(data.id).then(res => {
                this.refreshTableData()
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        },
        /* 表格数据更新时同步更新store的数据 */
        handleRefresh(datasource) {
            this.setTagList(datasource)
        }
    },
    render(h, ctx) {
        const scopedSlots = {
            tagColor: props => {
                return <ColorBlock color={ props.val } style="margin: auto;" />
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
                onRefresh={ this.onTableRefresh }
                onBeforePopupCancel={ this.onBeforePopupCancel }
                onBeforePopupConfirm={ this.onBeforePopupConfirm }
                { ...{ scopedSlots } }>
                <template slot="popup">
                    <BaseForm ref='popup' props={{ ...this.popupProps }} />
                </template>
            </BaseTable>
        )
    }
}
</script>
