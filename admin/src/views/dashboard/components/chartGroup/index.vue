<script>
export default {
    name: 'ChartGroup',
    props: {
        gutter: {
            type: Number,
            default: 0
        }
    },
    computed: {
        chartList() {
            return [
                {
                    name: 'ArticleRank',
                    title: '文章阅读量排行',
                    cmp: () => import('./ArticleRank.vue')
                },
                {
                    name: 'PieChart',
                    title: '文章分类统计',
                    cmp: () => import('./PieChart.vue')
                },
                {
                    name: 'TagCloud',
                    title: '文章标签统计',
                    cmp: () => import('./TagCloud.vue')
                }
            ]
        }
    }
}
</script>

<template>
    <el-row :gutter="gutter">
        <el-col v-for="chart in chartList" :key="chart.name" :xs="24" :sm="24" :md="8">
            <el-card :header="chart.title" :body-style="{ height: '400px' }">
                <component :is="chart.cmp" />
            </el-card>
        </el-col>
    </el-row>
</template>
