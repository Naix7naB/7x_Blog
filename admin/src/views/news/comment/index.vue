<script>
import BaseTable from '@/components/table'

import { getArticleComments } from '@/apis/comment'
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
        deleteArticle(e) {
            console.log(e)
        }
    }
}
</script>

<template>
    <BaseTable
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
