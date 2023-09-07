<script>
import BaseTable from '@/components/table'

import mixin from '@/views/mixins'
import { getMessageComments, deleteCommentById } from '@/apis/comment'
import { columns as messageTableColumns, query as messageTableQuery } from '@/config/messageTable.config'

export default {
    name: 'MessageManagement',
    components: { BaseTable },
    mixins: [mixin],
    computed: {
        columns() {
            return messageTableColumns
        },
        queryForm() {
            return messageTableQuery.form
        }
    },
    methods: {
        getMessageComments,
        /* 删除留言 */
        deleteMessage(data) {
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
        :requestApi="getMessageComments"
        :columns="columns"
        :queryConfig="queryForm"
        @optDelete="deleteMessage"
        @optBatchDelete="optBatchDelete"
    />
</template>
