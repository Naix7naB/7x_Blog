<script>
export default {
    props: {
        requestApi: {
            type: Function,
            required: true
        },
        requestParams: {
            type: Object,
            default: () => {}
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
    watch: {
        requestParams() {
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
        v-loading="$store.getters.isLoading"
        element-loading-text="拼命加载中"
        element-loading-background="transparent"
    >
        <div class="list-content">
            <slot :list="list" />
        </div>
        <div class="list-pagination">
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
.base-list {
    min-height: 300px;
}

.list-pagination {
    margin-top: 30px;
}
</style>
