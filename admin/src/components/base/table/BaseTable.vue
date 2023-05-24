<script>
import { tableHeaderData, tableData } from './baseTable.config'

export default {
    data() {
        return {
            activeName: 'released',
            tableHeaderData,
            tableData
        }
    }
}
</script>

<template>
    <el-card>
        <template #header>
            <slot name="table-header"></slot>
        </template>
        <template #default>
            <el-tabs v-model="activeName">
                <el-tab-pane label="已发布" name="released" />
                <el-tab-pane label="草稿" name="draft" />
            </el-tabs>
            <el-table :data="tableData">
                <el-table-column
                    v-for="item in tableHeaderData"
                    :key="item.field"
                    :prop="item.field"
                    :label="item.label"
                    :fixed="item.field === 'operation' && 'right'"
                    min-width="120"
                    align="center"
                    header-align="center"
                />
            </el-table>
            <el-pagination background layout="total, prev, pager, next" :total="tableData.length" />
        </template>
    </el-card>
</template>

<style lang="scss" scoped>
:deep(.el-card__header) {
    border: none;
}

:deep(.el-pagination) {
    margin-top: 24PX;
    text-align: center;
}
</style>
