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
            <el-col :span="12">
                <PieChart />
            </el-col>
            <el-col :span="12">
                <TagCloud />
            </el-col>
        </el-row>
    </div>
</template>

<style lang="scss">
.dashboard {
    padding: 24px 0;
}

.dashboard > div {
    margin-bottom: 32px;
}

.dashboard-card {
    overflow: hidden;
    padding: 20px;
    border-radius: 6px;
    border-color: rgba(0, 0, 0, .05);
    background-color: #ffffff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
}
</style>
