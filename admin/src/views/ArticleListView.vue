<script>
import { BaseTable } from '@/components'
import { tableColumns, tablePager } from '@/config/articleList.config'
import { normalizeUrl } from '@/utils/util'
import { getArticleList } from '@/apis/article'

export default {
    name: 'ArticleListView',
    components: { BaseTable },
    data() {
        return {
            articleList: [],
            tableColumns,
            tablePager
        }
    },
    methods: {
        normalizeUrl,
        async fetchArticleList() {
            const { page, size } = this.tablePager
            const res = await getArticleList({ page, size })
            const { list, total } = res.data
            this.tablePager.total = total
            this.articleList = list
        },
        handleButtonClick(data, idx) {
            console.log(data, idx)
        },
        handlePageChange(page) {
            this.tablePager.page = page
            this.fetchArticleList()
        }
    },
    created() {
        this.fetchArticleList()
    }
}
</script>

<template>
    <BaseTable
        :hasPagination="true"
        :columns="tableColumns"
        :datasource="articleList"
        :pagerConfig="tablePager"
        @handleTableButtonClick="handleButtonClick"
        @handleTablePageChange="handlePageChange"
    >
        <template #coverImg="{ row }">
            <el-image :src="normalizeUrl(row.cover_img)" fit="contain" />
        </template>
        <template #tag="{ row }">
            <el-tag v-for="tag in row.tags" size="mini" :key="tag._id">{{ tag.name }}</el-tag>
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
