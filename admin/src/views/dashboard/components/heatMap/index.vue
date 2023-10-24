<script>
import mixin from '../mixins'
import { heatMap } from '@/config/chart.config'
import { getArticleList } from '@/apis/article'
import { formatDate } from '@/utils'

export default {
    name: 'HeatMap',
    props: {
        gutter: {
            type: Number,
            default: 0
        }
    },
    mixins: [mixin],
    mounted() {
        getArticleList().then(({ data }) => {
            const chartOpt = heatMap
            const series = data.list.reduce((pre, cur) => {
                const key = formatDate(cur.created_at, 'YYYY-MM-DD')
                if (!pre[key]) {
                    pre[key] = 1
                } else {
                    pre[key] += 1
                }
                return pre
            }, {})
            chartOpt.series.data = Object.entries(series)
            this.$_setChartOption(chartOpt)
        }).catch(err => {
            this.$message.error(err.errMsg || err)
        })
    }
}
</script>

<template>
    <el-row :gutter="gutter">
        <el-col :span="24">
            <el-card>
                <div ref="chart" :style="$_chartStyle"></div>
            </el-card>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
:deep(.el-card) {
    margin: 40px 0 20px;
}
</style>
