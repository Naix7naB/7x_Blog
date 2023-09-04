<script>
import OperationBtn from './components/operationBtn'

const OPT_TYPE = {
    edit: 'optEdit',
    check: 'optCheck',
    delete: 'optDelete'
}

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
        isEmptyVal(val) {
            return (typeof val === 'object' && val === null) || typeof val === 'undefined'
        },
        handleValue(row, item) {
            let value = item.prop.split('.').reduce((pre, cur) => {
                pre = pre?.[cur]
                return pre
            }, row)
            if (item.formatter && typeof item.formatter === 'function') {
                value = item.formatter(value)
            }
            return value
        },
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
            this.$emit(OPT_TYPE[type], row)
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
            <el-table v-loading="$store.state.loading" :data="datasource" border>
                <!-- 选择列 -->
                <el-table-column v-if="showSelection" type="selection" width="55" />
                <!-- 序号列 -->
                <el-table-column v-if="showIndex" type="index" width="55" />
                <!-- 数据源 -->
                <template v-for="item in columns">
                    <!-- 插槽列 -->
                    <el-table-column v-if="item.type === 'slot'" v-bind="item" :key="item.label">
                        <template slot-scope="{ row }">
                            <slot :name="item.slotName" :val="handleValue(row, item)" />
                        </template>
                    </el-table-column>
                    <!-- 图片 -->
                    <el-table-column
                        v-else-if="item.type === 'image'"
                        v-bind="item"
                        :key="item.label"
                    >
                        <template slot-scope="{ row }">
                            <el-image
                                fit="cover"
                                :src="handleValue(row, item)"
                                :alt="item.label"
                                :title="item.label"
                            />
                        </template>
                    </el-table-column>
                    <!-- 操作列 -->
                    <el-table-column
                        v-else-if="item.type === 'opt'"
                        v-bind="item"
                        :key="item.label"
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
                    <el-table-column v-else v-bind="item" :key="item.label">
                        <template slot-scope="{ row }">
                            <span v-if="isEmptyVal(handleValue(row, item))">无</span>
                            <span v-else>{{ handleValue(row, item) }}</span>
                        </template>
                    </el-table-column>
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
:deep(.cell) {
    display: flex !important;
    justify-content: center !important;
    text-align: center !important;
}

:deep(.el-image) {
    display: block;
    height: 50px;
    border-radius: 4px;
}

.table-box {
    padding: 30px 40px;
    border-radius: 6px;
    background-color: #fff;
}

.table-header {
    margin-bottom: 20px;
}
</style>
