<script>
import BaseTable from '@/components/table'
import BaseForm from '@/components/form'

import mixin from '@/views/mixins'
import { columns, queryForm, popupForm } from '@/config/categoryTable.config'
import { getCategoryList, createCategory, modifyCategoryById, deleteCategoryById } from '@/apis/category'

export default {
    name: 'ArticleCategory',
    components: { BaseForm, BaseTable },
    mixins: [mixin],
    computed: {
        /* 表格组件参数 */
        tableProps() {
            return {
                requestApi: getCategoryList,
                showSelection: true,
                showPagination: true,
                columns,
                queryForm,
                popupConfig: {
                    title: this.action === 'add' ? '新增分类' : '编辑分类信息',
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
        /* 添加文章分类 */
        addExecution() {
            this.submitPopupForm(data => {
                createCategory(data).then(res => {
                    this.refreshTableData()
                    this.$message.success(res.errMsg)
                }).catch(err => {
                    this.$message.error(err.errMsg || err)
                })
            })
        },
        /* 修改文章分类 */
        modifyExecution(id) {
            this.submitPopupForm((data, hasModify) => {
                if (hasModify === false) return false
                modifyCategoryById(id, data).then(res => {
                    this.refreshTableData()
                    this.$message.success(res.errMsg)
                }).catch(err => {
                    this.$message.error(err.errMsg || err)
                })
            })
        },
        /* 删除文章分类 */
        deleteExecution(data) {
            deleteCategoryById(data.id).then(res => {
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
        return (
            <BaseTable
                ref='table'
                props={{ ...this.tableProps }}
                onOptAdd={ this.optAdd }
                onOptEdit={ this.optEdit }
                onOptDelete={ this.optDelete }
                onBeforePopupCancel={ this.onBeforePopupCancel }
                onBeforePopupConfirm={ this.onBeforePopupConfirm }
                { ...{ scopedSlots: tableScopedSlots } }>
                <template slot="popup">
                    <BaseForm ref='popup' props={{ ...this.popupProps }} />
                </template>
            </BaseTable>
        )
    }
}
</script>
