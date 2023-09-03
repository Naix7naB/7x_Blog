<script>
import { PanelGroup, PieChart, TagCloud } from './components'

export default {
    name: 'Dashboard',
    components: { PanelGroup, PieChart, TagCloud },
    data() {
        return {}
    }
}
</script>

<template>
    <div>
        <PanelGroup />
        <el-row :gutter="40">
            <el-col :span="12">
                <PieChart style="backgroundColor: #fff" />
            </el-col>
            <el-col :span="12">
                <TagCloud style="backgroundColor: #fff" />
            </el-col>
        </el-row>
    </div>
</template>
