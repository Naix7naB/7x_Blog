<script>
export default {
    name: 'BaseTable',
    props: {
        tableHeader: {
            type: Array,
            required: true
        },
        tableContent: {
            type: Array,
            default: () => []
        },
        hasSelection: {
            type: Boolean,
            default: false
        },
        hasIndex: {
            type: Boolean,
            default: false
        },
        hasPagination: {
            type: Boolean,
            default: true
        },
        total: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            activeName: 'released'
        }
    },
    methods: {
        changePage(page) {
            console.log(page)
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
            <el-table :data="tableContent">
                <!-- 选择列 -->
                <el-table-column v-if="hasSelection" type="selection" width="55" />
                <!-- 序号列 -->
                <el-table-column v-if="hasIndex" type="index" width="55" />
                <!-- 数据源 -->
                <template v-for="item in tableHeader">
                    <!-- 插槽列 -->
                    <el-table-column v-if="item.type === 'slot'" v-bind="item" :key="item.prop">
                        <template slot-scope="{ $index, row }">
                            <slot :name="item.slotName" :row="row" :index="$index" />
                        </template>
                    </el-table-column>
                    <!-- 普通列 -->
                    <el-table-column v-else v-bind="item" :key="item.prop" />
                </template>
            </el-table>
            <el-pagination
                v-if="hasPagination"
                layout="total, prev, pager, next"
                :total="total"
                background
                hide-on-single-page
                @current-change="changePage"
            />
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
