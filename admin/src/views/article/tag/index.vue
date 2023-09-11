<script>
import BaseTable from '@/components/table'
import BaseForm from '@/components/form'
import ColorBlock from '@/components/colorBlock'

import mixin from '@/views/mixins'
import { columns, queryForm, popupForm } from '@/config/tagTable.config'
import { getTagList, createTag, modifyTagById, deleteTagById } from '@/apis/tag'

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
        }
    },
    render(h, ctx) {
        const tableScopedSlots = {
            tagColor: props => {
                return <ColorBlock color={ props.val } style="margin: auto;" />
            }
        }
        const popupScopedSlots = {
            colorPicker: props => {
                return <el-color-picker v-model={ props.data.color } color-formate="rgb" show-alpha />
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
                onBeforePopupConfirm={ this.onBeforePopupConfirm }
                { ...{ scopedSlots: tableScopedSlots } }>
                <template slot="popup">
                    <BaseForm ref='popup' props={{ ...this.popupProps }} { ...{ scopedSlots: popupScopedSlots } } />
                </template>
            </BaseTable>
        )
    }
}
</script>
