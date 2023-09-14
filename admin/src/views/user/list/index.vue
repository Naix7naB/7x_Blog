<script>
import BaseTable from '@/components/table'
import BaseForm from '@/components/form'

import mixin from '@/views/mixins'
import { columns, queryForm, popupForm } from '@/config/userTable.config'
import { getUserList, modifyUserById, deleteUserById, deleteUsersInBulk } from '@/apis/user'
import { mapValues } from 'lodash-es'

export default {
    name: 'UserList',
    components: { BaseTable, BaseForm },
    mixins: [mixin],
    computed: {
        /* 表格组件参数 */
        tableProps() {
            return {
                requestApi: getUserList,
                showSelection: true,
                showPagination: true,
                columns,
                queryForm,
                popupConfig: {
                    title: this.action === 'add' ? '新增用户' : '编辑用户信息',
                    width: '60%'
                }
            }
        },
        /* 弹窗组件参数 */
        popupProps() {
            return {
                data: popupForm[this.action].data,
                items: popupForm[this.action].items
            }
        }
    },
    methods: {
        /* TODO 新增用户 */
        addExecution() {
            console.log('add user')
        },
        /* 修改弹窗表单的数据 */
        modifyPopupFormData(data) {
            return mapValues(data, (val, key) => {
                if (key === 'role') return val.id
                return val
            })
        },
        /* 修改用户信息 */
        modifyExecution(id) {
            this.submitPopupForm((data, hasModify) => {
                if (hasModify === false) return false
                modifyUserById(id, data).then(res => {
                    this.refreshTableData()
                    this.$message.success(res.errMsg)
                }).catch(err => {
                    this.$message.error(err.errMsg || err)
                })
            })
        },
        /* 删除用户 */
        deleteExecution(data) {
            deleteUserById(data.id).then(res => {
                this.refreshTableData()
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        },
        /* 批量删除 */
        bulkDeleteExecution(selection) {
            const selectedIds = selection.map(item => item.id)
            deleteUsersInBulk(selectedIds).then(res => {
                this.refreshTableData()
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        }
    },
    render(h, ctx) {
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
                    <BaseForm ref='popup' props={{ ...this.popupProps }} />
                </template>
            </BaseTable>
        )
    }
}
</script>
