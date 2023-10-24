<script>
import BaseTable from '@/components/table'

import { getRecommendArticles } from '@/apis/article'

export default {
    name: 'ArticleRank',
    components: { BaseTable },
    computed: {
        /* 表格组件参数 */
        tableProps() {
            return {
                requestApi: getRecommendArticles,
                showTableBorder: false,
                showQuery: false,
                showOperator: false,
                showPagination: false,
                tableAlign: 'left',
                columns: [
                    {
                        prop: 'title',
                        label: '标题',
                        minWidth: 240
                    },
                    {
                        prop: 'view_count',
                        label: '阅读量',
                        minWidth: 60
                    }
                ]
            }
        }
    }
}
</script>

<template>
    <BaseTable v-bind="tableProps" />
</template>
