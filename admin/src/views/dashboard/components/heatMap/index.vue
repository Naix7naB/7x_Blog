<script>
import mixin from '../mixins'
import { heatMap } from '@/config/chart.config'
import { getArticleList } from '@/apis/article'
import { formatDate } from '@/utils'

export default {
    props: {
        height: {
            type: String,
            default: '400px'
        }
    },
    mixins: [mixin],
    computed: {
        chartStyle() {
            return {
                width: '100%',
                height: '100%'
            }
        }
    },
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
    <div class="dashboard-card" :style="{ height }">
        <div ref="chart" :style="chartStyle"></div>
    </div>
</template>
