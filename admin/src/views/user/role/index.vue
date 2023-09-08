<script>
import BaseTable from '@/components/table'
import BaseForm from '@/components/form'

import mixin from '@/views/mixins'
import { columns, queryForm, popupForm } from '@/config/roleTable.config'
import { getRoleList } from '@/apis/user'

export default {
    name: 'RoleList',
    components: { BaseTable, BaseForm },
    mixins: [mixin],
    computed: {
        /* 表格组件参数 */
        tableProps() {
            return {
                requestApi: getRoleList,
                showSelection: true,
                showPagination: true,
                columns,
                queryForm,
                popupConfig: {
                    title: this.action === 'add' ? '新增角色' : '编辑角色信息',
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
        /* 新增角色 */
        addExecution() {
            console.log('add role')
        },
        /* 修改角色信息 */
        modifyExecution(id) {
            console.log(id)
        },
        /* 查找角色 */
        queryExecution(selection) {
            console.log(selection)
        },
        /* 删除角色 */
        deleteExecution(data) {
            console.log(data)
        },
        /* 批量删除 */
        batchDeleteExecution(selection) {
            console.log(selection)
        }
    },
    render(h, ctx) {
        return (
            <BaseTable
                ref='table'
                props={{ ...this.tableProps }}
                onOptAdd={ this.optAdd }
                onOptEdit={ this.optEdit }
                onOptQuery={ this.optQuery }
                onOptDelete={ this.optDelete }
                onOptBatchDelete={ this.optBatchDelete }
                onBeforePopupCancel={ this.onBeforePopupCancel }
                onBeforePopupConfirm={ this.onBeforePopupConfirm }
            >
                <template slot="popup">
                    <BaseForm ref='popup' props={{ ...this.popupProps }} />
                </template>
            </BaseTable>
        )
    }
}
</script>
