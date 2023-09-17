<script>
import mixin from '../mixins'
import { pieChart } from '@/config/chart.config'
import { mapGetters } from 'vuex'

export default {
    name: 'PieChart',
    mixins: [mixin],
    computed: {
        ...mapGetters('article', ['getCategoryList'])
    },
    mounted() {
        const chartOpt = pieChart
        chartOpt.series.data = this.getCategoryList.map(category => {
            return {
                name: category.name,
                value: category.article_count
            }
        })
        this.$_setChartOption(chartOpt)
    }
}
</script>

<template>
    <div ref="chart" :style="$_chartStyle"></div>
</template>
