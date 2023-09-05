<script>
import BaseForm from '@/components/form'
import Popup from '@/components/popup'
import OperationBtn from './components/operationBtn'

const OPT_TYPE = {
    edit: 'optEdit',
    check: 'optCheck',
    delete: 'optDelete'
}

export default {
    name: 'BaseTable',
    components: { BaseForm, Popup, OperationBtn },
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
        },
        queryConfig: {
            type: Object,
            default: () => null
        },
        popupConfig: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            datasource: [],
            selection: [],
            currentPage: 1,
            pageSize: 10,
            total: 0
        }
    },
    methods: {
        /* 判断数据是否为空 */
        isEmptyVal(val) {
            return (typeof val === 'object' && val === null) || typeof val === 'undefined'
        },
        /* 处理数据 */
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
        /* 刷新数据 */
        refresh() {
            this.getDatasource()
        },
        /* TODO 查找表格匹配项 */
        queryTable() {
            this.$refs.queryForm.submitForm(data => {
                console.log(data)
            })
        },
        /* 重置查询条件 */
        resetQuery() {
            this.$refs.queryForm.resetForm()
        },
        /* 修改复选框状态时 */
        onSelectionChange(selection) {
            this.selection = selection
        },
        /* 添加一项数据 */
        addRow() {
            this.$refs.popup.open()
        },
        /* 批量删除 */
        batchDelete() {
            this.$emit('onBatchDelete', this.selection)
        },
        /* 操作选项按钮的执行函数 */
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
    <div class="table-wrapper">
        <div v-if="showTabs">tabs</div>
        <div v-if="queryConfig" class="table-query">
            <BaseForm ref="queryForm" v-bind="queryConfig" size="small" inline />
            <div class="table-query--opts">
                <OperationBtn type="query" size="small" showIcon @click="queryTable" />
                <OperationBtn type="reset" size="small" showIcon @click="resetQuery" />
            </div>
        </div>
        <div class="table-operate">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="addRow">
                添加
            </el-button>
            <el-button
                v-if="showSelection"
                type="danger"
                icon="el-icon-delete"
                size="small"
                :disabled="selection.length === 0"
                @click.stop="batchDelete"
            >
                批量删除
            </el-button>
        </div>
        <el-table
            v-loading="$store.state.loading"
            :data="datasource"
            border
            @selection-change="onSelectionChange"
        >
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
                <el-table-column v-else-if="item.type === 'image'" v-bind="item" :key="item.label">
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
        <Popup
            ref="popup"
            v-bind="popupConfig"
            @beforePopupCancel="$listeners.beforePopupCancel"
            @beforePopupConfirm="$listeners.beforePopupConfirm"
        >
            <slot name="popup"></slot>
        </Popup>
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

:deep(.table-query--opts > .el-button) {
    margin: 0 10px 18px 0;
}

.table-wrapper {
    overflow: hidden;
    padding: 30px 40px;
    border-radius: 6px;
    background-color: #fff;
}

.table-query {
    display: flex;
    flex-wrap: wrap;
}

.table-query--opts {
    flex-shrink: 0;
}

.table-operate {
    margin-bottom: 6px;
    white-space: nowrap;
}
</style>
