<script>
import BaseTable from '@/components/table'

import mixin from '@/views/mixins'
import { columns, queryForm } from '@/config/commentTable.config'
import { getArticleComments, deleteCommentById } from '@/apis/comment'

export default {
    name: 'CommentManagement',
    components: { BaseTable },
    mixins: [mixin],
    computed: {
        /* 表格组件参数 */
        tableProps() {
            return {
                requestApi: getArticleComments,
                showSelection: true,
                showPagination: true,
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
        batchDeleteExecution(selection) {
            console.log(selection)
        }
    },
    render(h, ctx) {
        return (
            <BaseTable
                ref='table'
                props={{ ...this.tableProps }}
                onOptDelete={ this.optDelete }
                onOptBatchDelete={ this.optBatchDelete }
            />
        )
    }
}
</script>
