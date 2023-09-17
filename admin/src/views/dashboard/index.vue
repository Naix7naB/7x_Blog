<script>
import HeatMap from './components/heatMap'
import PanelGroup from './components/panelGroup'
import PieChart from './components/pieChart'
import TagCloud from './components/tagCloud'

export default {
    name: 'Dashboard',
    components: { HeatMap, PanelGroup, PieChart, TagCloud },
    data() {
        return {}
    }
}
</script>

<template>
    <div class="dashboard">
        <PanelGroup />
        <HeatMap />
        <el-row :gutter="40">
            <el-col :xs="24" :sm="24" :md="12">
                <PieChart />
            </el-col>
            <el-col :xs="24" :sm="24" :md="12">
                <TagCloud />
            </el-col>
        </el-row>
    </div>
</template>

<style lang="scss">
.dashboard {
    padding: 24px 0;
}
</style>
