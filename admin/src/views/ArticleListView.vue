<script>
import { BaseTable } from '@/components'
import { tableColumns } from '@/config/articleList.config'
import { fillUrl } from '@/utils'
import { fetchArticles, deleteArticleById } from '@/apis/article'

export default {
    name: 'ArticleListView',
    components: { BaseTable },
    data() {
        return {
            tableColumns,
            tableOptItems: [
                {
                    type: 'primary',
                    size: 'mini',
                    text: '编辑',
                    action: this.editArticle
                },
                {
                    type: 'danger',
                    size: 'mini',
                    text: '删除',
                    action: this.deleteArticle
                }
            ]
        }
    },
    methods: {
        fillUrl,
        fetchArticles,
        editArticle(data) {
            this.$router.push({
                name: 'ArticleWrite',
                params: data
            })
        },
        deleteArticle(data) {
            deleteArticleById(data._id).then(res => {
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
        hasPagination
        :requestApi="fetchArticles"
        :columns="tableColumns"
        :optItems="tableOptItems"
    >
        <template #cover_img="{ row }">
            <el-image fit="contain" :style="{ height: '80px' }" :src="fillUrl(row.cover_img)" />
        </template>
        <template #tag="{ row }">
            <span v-if="row.tags.length === 0" style="color: #bbb">暂无标签</span>
            <el-tag
                v-else
                v-for="tag in row.tags"
                :style="{ backgroundColor: tag.color, borderColor: tag.color }"
                :key="tag._id"
                effect="dark"
                size="mini"
            >
                {{ tag.name }}
            </el-tag>
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
