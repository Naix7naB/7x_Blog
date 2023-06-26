<script>
import OperationBtn from './components/operationBtn'

export default {
    name: 'BaseTable',
    props: {
        requestApi: {
            type: Function,
            require: true
        },
        columns: {
            type: Array,
            required: true
        },
        showTabs: {
            type: Boolean,
            default: false
        },
        showSelection: {
            type: Boolean,
            default: false
        },
        showIndex: {
            type: Boolean,
            default: false
        },
        showPagination: {
            type: Boolean,
            default: false
        },
        pagerPos: {
            type: String,
            default: 'center'
        }
    },
    components: { OperationBtn },
    data() {
        return {
            datasource: [],
            currentPage: 1,
            pageSize: 10,
            total: 0
        }
    },
    methods: {
        /* 获取数据源 */
        getDatasource() {
            this.$store.dispatch('setLoadingState', true)
            this.requestApi({
                page: this.currentPage,
                size: this.pageSize
            }).then(res => {
                const { list, total } = res.data
                this.datasource = list
                this.total = total
            }).catch(err => {
                this.message.error(err.errMsg)
            }).finally(() => {
                this.$store.dispatch('setLoadingState', false)
            })
        },
        optHandler(type, row) {
            type = type.slice(0, 1).toUpperCase() + type.slice(1)
            this.$emit(`opt${type}`, row)
        },
        /* 更改页码时 */
        changePage(page) {
            this.currentPage = page
        }
    },
    created() {
        this.getDatasource()
    }
}
</script>

<template>
    <div class="table-wrap">
        <div v-if="$slots.tableHeader" class="table-box table-header">
            <slot name="tableHeader"></slot>
        </div>
        <div class="table-box base-table">
            <div v-if="showTabs">tabs</div>
            <el-table v-loading="$store.state.loading" :data="datasource">
                <!-- 选择列 -->
                <el-table-column v-if="showSelection" type="selection" width="55" />
                <!-- 序号列 -->
                <el-table-column v-if="showIndex" type="index" width="55" />
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
                        v-bind="item"
                        :key="item.prop"
                        :min-width="80 * item.optType.length"
                    >
                        <template slot-scope="{ row }">
                            <OperationBtn
                                v-for="opt in item.optType"
                                :key="opt"
                                :type="opt"
                                @click="optHandler(opt, row)"
                            />
                        </template>
                    </el-table-column>
                    <!-- 普通列 -->
                    <el-table-column v-else v-bind="item" :key="item.prop" />
                </template>
            </el-table>
            <el-pagination
                v-if="showPagination"
                layout="total, prev, pager, next"
                :current-page="currentPage"
                :page-size="pageSize"
                :total="total"
                :style="{ marginTop: '24px', textAlign: pagerPos }"
                :background="true"
                @current-change="changePage"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.table-box {
    padding: 30px 40px;
    border-radius: 6px;
    background-color: #fff;
}

.table-header {
    margin-bottom: 20px;
}
</style>
