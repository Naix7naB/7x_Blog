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
            tablePager,
            optOptions: [
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
            ],
            eventAgent: {
                edit: this.onEdit
            }
        }
    },
    methods: {
        normalizeUrl,
        async fetchArticleList() {
            const { page, size } = this.tablePager
            const res = await getArticleList({ page, size })
            const { list, total } = res.data
            this.tablePager.total = total
            this.articleList = list.map(({ tags, ...others }) => {
                tags = tags.map(t => t.name)
                return {
                    tags,
                    ...others
                }
            })
        },
        handleButtonClick(payload) {
            const { act, ...params } = payload
            if (this.eventAgent[act] && typeof this.eventAgent[act] === 'function') {
                this.eventAgent[act](params)
            }
        },
        handlePageChange(page) {
            this.tablePager.page = page
        },
        onEdit({ data }) {
            this.$router.push({
                name: 'ArticleWrite',
                params: {
                    data,
                    optOptions: this.optOptions
                }
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
        <template #coverImg="{ row }">
            <el-image :src="normalizeUrl(row.cover_img)" fit="contain" />
        </template>
        <template #tag="{ row }">
            <el-tag v-for="tag in row.tags" size="mini" :key="tag">{{ tag }}</el-tag>
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
