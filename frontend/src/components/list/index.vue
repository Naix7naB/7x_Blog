<script>
import { isEqual } from 'lodash-es'

export default {
    name: 'BaseList',
    props: {
        requestApi: {
            type: Function,
            required: true
        },
        requestParams: {
            type: Object,
            default: () => {}
        },
        emptyText: {
            type: String,
            default: '暂无数据'
        },
        size: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {
            page: 1,
            pages: 1,
            list: []
        }
    },
    computed: {
        isEmpty() {
            return this.list.length === 0
        },
        isLastPage() {
            return this.page === this.pages
        }
    },
    watch: {
        requestParams(newParams, oldParams) {
            if (isEqual(newParams, oldParams)) return false
            this.page = 1
            this.getDataList()
        },
        page: {
            handler() {
                this.getDataList()
            },
            immediate: true
        }
    },
    methods: {
        /* 获取数据列表 */
        getDataList() {
            this.$store.dispatch('setting/setLoadingState', true)
            this.requestApi({
                page: this.page,
                size: this.size,
                ...this.requestParams
            }).then(({ data }) => {
                this.pages = data.pages
                this.list = data.list
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            }).finally(() => {
                this.$store.dispatch('setting/setLoadingState', false)
            })
        },
        /* 刷新数据列表 */
        refreshData() {
            this.getDataList()
        },
        /* 页数修改时 */
        onPageChange(page) {
            this.page = page
        }
    }
}
</script>

<template>
    <div
        class="base-list"
        element-loading-text="拼命加载中"
        element-loading-background="transparent"
        v-loading="$store.getters.isLoading"
    >
        <div class="list-content">
            <slot v-if="!isEmpty" :list="list" />
            <el-empty v-else :description="emptyText" />
        </div>
        <div v-if="!isEmpty" class="list-pagination">
            <div v-if="isLastPage" class="list-pagination--end">~~到底啦~~</div>
            <el-pagination
                layout="prev, pager, next"
                :background="true"
                :hide-on-single-page="true"
                :current-page="page"
                :page-size="size"
                :page-count="pages"
                @current-change="onPageChange"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* 数据列表样式 */
.base-list {
    min-height: 240px;
}

.list-pagination {
    margin-top: 30px;
}

.list-pagination--end {
    @include text-color(text-primary, .8);
    text-align: center;
    font-size: $fz-xm;
    transition: color .3s ease-in-out;
}
</style>
