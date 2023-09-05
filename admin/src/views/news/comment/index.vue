<script>
import BaseTable from '@/components/table'

import { getArticleComments, deleteCommentById } from '@/apis/comment'
import { tableColumns } from '@/config/commentList.config'

export default {
    name: 'CommentManagement',
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
        getArticleComments,
        deleteArticle(data) {
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
        showSelection
        showPagination
        :requestApi="getArticleComments"
        :columns="columns"
        @optDelete="deleteArticle"
    >
        <template #mention="{ val }">
            <span v-if="val">{{ val }}</span>
            <span v-else>无</span>
        </template>
    </BaseTable>
</template>

<style lang="scss" scoped></style>
