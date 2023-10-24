<script>
import BaseTable from '@/components/table'

import mixin from '@/views/mixins'
import { columns, queryForm } from '@/config/messageTable.config'
import { getMessageComments, deleteCommentById } from '@/apis/comment'

export default {
    name: 'MessageManagement',
    components: { BaseTable },
    mixins: [mixin],
    computed: {
        /* 表格组件参数 */
        tableProps() {
            return {
                requestApi: getMessageComments,
                containerStyle: this.tableStyle,
                showSelection: true,
                columns,
                queryForm
            }
        }
    },
    methods: {
        /* 删除评论 */
        deleteExecution(data) {
            deleteCommentById(data.id).then(res => {
                this.refreshTableData()
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        },
        /* 批量删除 */
        bulkDeleteExecution(selection) {
            console.log(selection)
            this.$message.warning('功能暂未开放')
        }
    },
    render(h, ctx) {
        return (
            <BaseTable
                ref='table'
                props={{ ...this.tableProps }}
                onOptDelete={ this.optDelete }
                onOptBulkDelete={ this.optBulkDelete }
            />
        )
    }
}
</script>
