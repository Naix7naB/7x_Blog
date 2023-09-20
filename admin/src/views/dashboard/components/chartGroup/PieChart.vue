<script>
import mixin from '../mixins'
import { pieChart } from '@/config/chart.config'
import { getCategoryList } from '@/apis/category'

export default {
    name: 'PieChart',
    mixins: [mixin],
    mounted() {
        getCategoryList({
            populate: '',
            select: 'name articles'
        }).then(({ data }) => {
            const chartOpt = pieChart
            chartOpt.series.data = data.list.map(item => {
                return {
                    name: item.name,
                    value: item.articles.length
                }
            })
            this.$_setChartOption(chartOpt)
        }).catch(err => {
            this.$message.error(err.errMsg || err)
        })
    }
}
</script>

<template>
    <div ref="chart" :style="$_chartStyle"></div>
</template>
