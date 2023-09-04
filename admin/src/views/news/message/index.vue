<script>
import BaseTable from '@/components/table'

import { getMessageComments } from '@/apis/comment'
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
        deleteArticle(e) {
            console.log(e)
        }
    }
}
</script>

<template>
    <BaseTable
        showPagination
        :requestApi="getMessageComments"
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
