<script>
import BaseTable from '@/components/table'
import BaseForm from '@/components/form'

import mixin from '@/views/mixins'
import { columns, queryForm, popupForm } from '@/config/userTable.config'
import { getUserList, getRoleList } from '@/apis/user'

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
                data: popupForm.data,
                items: popupForm.items
            }
        }
    },
    methods: {
        async loadOptions() {
            const { data } = await getRoleList()
            const role = this.popupProps.items.find(item => item.prop === 'role')
            role.options = data.list.map(item => ({ label: item.label, value: item.id }))
        },
        /* 新增用户 */
        addExecution() {
            console.log('add user')
        },
        /* 修改用户信息 */
        modifyExecution(id) {
            console.log(id)
        },
        /* 删除用户 */
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
    },
    created() {
        this.loadOptions()
    }
}
</script>
