<script>
export default {
    name: 'BaseTable',
    props: {
        columns: {
            type: Array,
            required: true
        },
        datasource: {
            type: Array,
            default: () => []
        },
        pageConfig: {
            type: Object,
            default: () => null
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
            default: false
        }
    },
    data() {
        return {
            activeName: 'released'
        }
    },
    methods: {
        buttonClick(data, idx, act) {
            this.$emit('handleButtonClick', { data, idx, act })
        },
        changePage(page) {
            this.$emit('handlePageChange', page)
        }
    }
}
</script>

<template>
    <div class="base-table">
        <slot name="table-header"></slot>
        <slot name="table-tabs"></slot>
        <el-table :data="datasource">
            <!-- 选择列 -->
            <el-table-column v-if="hasSelection" type="selection" width="55" />
            <!-- 序号列 -->
            <el-table-column v-if="hasIndex" type="index" width="55" />
            <!-- 数据源 -->
            <template v-for="item in columns">
                <!-- 插槽列 -->
                <el-table-column v-if="item.type === 'slot'" v-bind="item" :key="item.prop">
                    <template slot-scope="{ $index, row }">
                        <slot :name="item.slotName" :row="row" :index="$index" />
                    </template>
                </el-table-column>
                <!-- 操作列 -->
                <el-table-column
                    v-else-if="item.type === 'opt'"
                    :label="item.label"
                    :align="item.align"
                    :fixed="item.fixed || false"
                    :min-width="80 * item.options.length"
                    :key="item.prop"
                >
                    <template slot-scope="{ row, $index }">
                        <el-button
                            v-for="btn in item.options"
                            :type="btn.type"
                            :size="btn.size"
                            :data-act="btn.act"
                            :key="btn.text"
                            @click="buttonClick(row, $index, btn.act)"
                        >
                            {{ btn.text }}
                        </el-button>
                    </template>
                </el-table-column>
                <!-- 普通列 -->
                <el-table-column v-else v-bind="item" :key="item.prop" />
            </template>
        </el-table>
        <el-pagination
            v-if="hasPagination"
            layout="total, prev, pager, next"
            :current-page="pageConfig.page"
            :page-size="pageConfig.size"
            :total="pageConfig.total"
            :style="{ marginTop: '24px', textAlign: pageConfig.position || 'center' }"
            :background="true"
            @current-change="changePage"
        />
    </div>
</template>

<style lang="scss" scoped>
.base-table {
    padding: 30PX 40PX;
    border-radius: 6PX;
    background-color: #fff;
}
</style>
