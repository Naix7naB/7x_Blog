<script>
import BaseTable from '@/components/table'
import { tableColumns } from '@/config/articleList.config'
import { getArticleList, deleteArticleById } from '@/apis/article'

export default {
    name: 'ArticleList',
    components: { BaseTable },
    data() {
        return {
            tableColumns
        }
    },
    methods: {
        getArticleList,
        editArticle(data) {
            this.$router.push({
                name: 'ArticleWrite',
                params: data
            })
        },
        deleteArticle(data) {
            deleteArticleById(data.id).then(res => {
                this.$refs.articleTable.getDatasource()
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err.errMsg)
            })
        }
    }
}
</script>

<template>
    <BaseTable
        ref="articleTable"
        showPagination
        :requestApi="getArticleList"
        :columns="tableColumns"
        @optEdit="editArticle"
        @optDelete="deleteArticle"
    >
        <template #tag="{ val }">
            <span v-if="val === 0" style="color: #bbb">暂无标签</span>
            <el-tag
                v-else
                v-for="tag in val"
                :style="{ backgroundColor: tag.color, borderColor: tag.color }"
                :key="tag.id"
                effect="dark"
                size="mini"
            >
                {{ tag.name }}
            </el-tag>
        </template>
    </BaseTable>
</template>

<style lang="scss" scoped>
:deep(.el-image__inner) {
    aspect-ratio: 16 / 9;
}

:deep(.el-tag + .el-tag),
:deep(.el-button + .el-button) {
    margin-left: 6px;
}
</style>
