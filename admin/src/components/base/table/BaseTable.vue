<script>
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
        },
        pagerPos: {
            type: String,
            default: 'center'
        }
    },
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
        /* 更改页码时 */
        changePage(page) {
            this.currentPage = page
        },
        buttonClick(data, act) {
            this.$emit('handleTableButtonClick', { data, act })
        }
    },
    created() {
        this.getDatasource()
    }
}
</script>

<template>
    <div class="base-table">
        <slot name="table-header"></slot>
        <slot name="table-tabs"></slot>
        <el-table v-loading="$store.state.loading" :data="datasource">
            <!-- 选择列 -->
            <el-table-column v-if="hasSelection" type="selection" width="55" />
            <!-- 序号列 -->
            <el-table-column v-if="hasIndex" type="index" width="55" />
            <!-- 数据源 -->
            <template v-for="{ options, ...item } in columns">
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
                    :min-width="80 * options.length"
                    :key="item.prop"
                >
                    <template slot-scope="{ row }">
                        <el-button
                            v-for="btn in options"
                            v-bind="btn"
                            :key="btn.act"
                            @click="buttonClick(row, btn.act)"
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
            :current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            :style="{ marginTop: '24px', textAlign: pagerPos }"
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
