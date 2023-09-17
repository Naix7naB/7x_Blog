<script>
import mixin from '../mixins'
import { pieChart } from '@/config/chart.config'
import { mapGetters } from 'vuex'

export default {
    mixins: [mixin],
    props: {
        height: {
            type: String,
            default: '400px'
        }
    },
    computed: {
        ...mapGetters('article', ['getCategoryList']),
        chartStyle() {
            return {
                width: '100%',
                height: '100%'
            }
        }
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
    <div class="chart-pie dashboard-card" :style="{ height }">
        <div ref="chart" :style="chartStyle"></div>
    </div>
</template>
