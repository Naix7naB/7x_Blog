<script>
import BaseTable from '@/components/table'

import { getMessageComments, deleteCommentById } from '@/apis/comment'
import { tableColumns } from '@/config/messageList.config'

export default {
    name: 'MessageManagement',
    components: { BaseTable },
    data() {
        return {
            list: []
        }
    },
    computed: {
        columns() {
            return tableColumns
        }
    },
    methods: {
        getMessageComments,
        deleteComment(data) {
            deleteCommentById(data.id).then(res => {
                this.$refs.table.refresh()
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        }
    }
}
</script>

<template>
    <BaseTable
        ref="table"
        showPagination
        :requestApi="getMessageComments"
        :columns="columns"
        @optDelete="deleteComment"
    >
        <template #mention="{ val }">
            <span v-if="val">{{ val }}</span>
            <span v-else>无</span>
        </template>
    </BaseTable>
</template>

<style lang="scss" scoped></style>
