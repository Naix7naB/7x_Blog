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
                if (!pre[cur.created_at]) {
                    pre[cur.created_at] = 1
                } else {
                    pre[cur.created_at] += 1
                }
                return pre
            }, {})
            chartOpt.series.data = Object.entries(series).map(([key, val]) => {
                return [formatDate(+key, 'YYYY-MM-DD'), val]
            })
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
            <el-card :body-style="{ height: '400px' }">
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
