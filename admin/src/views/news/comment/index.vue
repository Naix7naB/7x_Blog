<script>
import BaseTable from '@/components/table'

import mixin from '@/views/mixins'
import { getArticleComments, deleteCommentById } from '@/apis/comment'
import { columns as commentTableColumns, query as commentTableQuery } from '@/config/commentTable.config'

export default {
    name: 'CommentManagement',
    components: { BaseTable },
    mixins: [mixin],
    computed: {
        columns() {
            return commentTableColumns
        },
        queryForm() {
            return commentTableQuery.form
        }
    },
    methods: {
        getArticleComments,
        /* 删除评论 */
        deleteComment(data) {
            deleteCommentById(data.id).then(res => {
                this.refreshTableData()
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        },
        /* 批量删除 */
        optBatchDelete(selection) {
            console.log(selection)
        }
    }
}
</script>

<template>
    <BaseTable
        ref="table"
        showSelection
        showPagination
        :requestApi="getArticleComments"
        :columns="columns"
        :queryConfig="queryForm"
        @optDelete="deleteComment"
        @optBatchDelete="optBatchDelete"
    />
</template>
