<script>
import { BaseTable } from '@/components'

import { tableHeader } from '@/config/articleTable.config'
import { normalizeUrl } from '@/utils/util'
import { getArticleList } from '@/apis/article'

export default {
    name: 'ArticleListView',
    components: { BaseTable },
    data() {
        return {
            tableHeader,
            list: [],
            total: 0,
            display: []
        }
    },
    methods: {
        normalizeUrl,
        handler(scope) {
            console.log(scope)
        }
    },
    created() {
        getArticleList({ page: 1, size: 10 }).then(({ data }) => {
            const { list, total, display } = data
            this.total = total
            this.list = list
            this.display = display
            console.log(list)
        }).catch(err => {
            console.error(err)
        })
    }
}
</script>

<template>
    <BaseTable :tableHeader="tableHeader" :tableContent="list" :total="total">
        <template #coverImg="{ row }">
            <el-image :src="normalizeUrl(row.cover_img)" fit="contain" />
        </template>
        <template #tag="{ row }">
            <el-tag v-for="tag in row.tags" size="mini" :key="tag._id">{{ tag.name }}</el-tag>
        </template>
        <template #opt="data">
            <el-button type="primary" size="mini" @click="handler(data)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handler(data)">删除</el-button>
        </template>
    </BaseTable>
</template>

<style lang="scss" scoped>
:deep(.el-tag + .el-tag),
:deep(.el-button + .el-button) {
    margin-left: 6PX;
}

:deep(.el-image) {
    display: block;
}
</style>
