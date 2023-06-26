<script>
import { BaseTable } from '@/components'
import { tableColumns } from '@/config/articleList.config'
import { resolveUrl } from '@/utils'
import { getArticleList, deleteArticleById } from '@/apis/article'

export default {
    name: 'ArticleList',
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
        resolveUrl,
        getArticleList,
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
        showPagination
        :requestApi="getArticleList"
        :columns="tableColumns"
        :optItems="tableOptItems"
    >
        <template #cover_img="{ row }">
            <el-image fit="contain" :style="{ height: '80px' }" :src="resolveUrl(row.cover_img)" />
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
    margin-left: 6px;
}

:deep(.el-image) {
    display: block;
}
</style>
