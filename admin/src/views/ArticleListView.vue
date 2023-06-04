<script>
import { BaseTable } from '@/components'
import { tableColumns, tablePager } from '@/config/articleList.config'
import { normalizeUrl } from '@/utils/util'
import { getArticleList, deleteArticle } from '@/apis/article'

export default {
    name: 'ArticleListView',
    components: { BaseTable },
    data() {
        return {
            articleList: [],
            tableColumns,
            tablePager,
            formOpts: [
                {
                    text: '取消',
                    plain: true,
                    action: () => {
                        this.$router.push({ name: 'ArticleList' })
                    }
                },
                {
                    text: '保存',
                    type: 'primary',
                    action: () => {
                        // 更新数据库
                        this.$router.push({ name: 'ArticleList' })
                    }
                }
            ]
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
        handleButtonClick(payload) {
            const { act, data } = payload
            if (this[act] && typeof this[act] === 'function') {
                this[act](data)
            }
        },
        handlePageChange(page) {
            this.tablePager.page = page
        },
        edit(data) {
            this.$router.push({
                name: 'ArticleWrite',
                params: {
                    data,
                    optOptions: this.formOpts
                }
            })
        },
        delete(data) {
            deleteArticle(data._id).then(res => {
                this.fetchArticleList()
                this.$message.success({
                    message: res.errMsg
                })
            }).catch(err => {
                this.$message.error({
                    message: err
                })
            })
        }
    },
    watch: {
        'tablePager.page'() {
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
        <template #cover_img="{ row }">
            <el-image :src="normalizeUrl(row.cover_img)" fit="contain" />
        </template>
        <template #tag="{ row }">
            <el-tag
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
