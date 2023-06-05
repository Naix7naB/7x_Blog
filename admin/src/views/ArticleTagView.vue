<script>
import { BaseForm, BaseTable, TagDialog, TagDrawer } from '@/components'
import { fetchTags, deleteTagById } from '@/apis/tag'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('tag')

export default {
    name: 'ArticleTagView',
    components: { BaseForm, BaseTable, TagDialog, TagDrawer },
    data() {
        return {
            currentTagInfo: {},
            headerOptConf: {
                options: [
                    {
                        text: '查询',
                        type: 'primary',
                        action: this.search
                    },
                    {
                        text: '创建',
                        type: 'primary',
                        action: () => {
                            this.$refs.tagDialog.openDialog()
                        }
                    }
                ]
            }
        }
    },
    computed: {
        ...mapState([ 'datasource', 'headerFormData', 'pageData' ]),
        ...mapGetters([ 'getTableColumns', 'getHeaderFormItems' ])
    },
    watch: {
        'pageData.page'() {
            this.getTagList()
        }
    },
    methods: {
        ...mapActions([ 'setDatasource', 'setHeaderFormData', 'setPageData' ]),
        /* 获取标签列表 */
        getTagList() {
            this.$store.dispatch('setLoadingState', true)
            const { page, size } = this.pageData
            fetchTags({ page, size }).then(({ data }) => {
                const { list, total } = data
                this.setDatasource(list)
                this.setPageData({ field: 'total', value: total })
            }).catch(err => {
                this.message.error(err.errMsg)
            }).finally(() => {
                this.$store.dispatch('setLoadingState', false)
            })
        },
        /* 处理操作按钮按下时 */
        handleButtonClick(payload) {
            const { act, data } = payload
            if (this[act] && typeof this[act] === 'function') {
                this[act](data)
            }
        },
        /* 处理页数改变时 */
        handlePageChange(page) {
            this.setPageData({ field: 'page', value: page })
        },
        /* 点击编辑按钮 */
        editTag(data) {
            console.log(data)
            this.currentTagInfo = data
            this.$refs.tagDrawer.openDrawer()
        },
        /* 点击删除按钮 */
        deleteTag(data) {
            deleteTagById(data._id).then(res => {
                this.getTagList()
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err)
            })
        },
        search() {
            console.log(this.headerFormData)
        }
    },
    created() {
        this.getTagList()
    }
}
</script>

<template>
    <div>
        <BaseTable
            ref="loadRef"
            :hasPagination="true"
            :columns="getTableColumns"
            :datasource="datasource"
            :pagerConfig="pageData"
            @handleTableButtonClick="handleButtonClick"
            @handleTablePageChange="handlePageChange"
        >
            <template #table-header>
                <BaseForm
                    :inline="true"
                    :hasOperation="true"
                    :formData="headerFormData"
                    :formItems="getHeaderFormItems"
                    :optConfig="headerOptConf"
                />
            </template>
            <template #tag-color="{ row }">
                <i class="color-block" :style="{ backgroundColor: row.color }" />
            </template>
        </BaseTable>
        <TagDialog ref="tagDialog" @refresh="getTagList" />
        <TagDrawer ref="tagDrawer" :tagInfo="currentTagInfo" />
    </div>
</template>

<style lang="scss" scoped>
:deep(.el-dialog) {
    min-width: 420PX;
    max-width: 640PX;
}

.color-block {
    display: block;
    width: 32PX;
    height: 32PX;
    margin: auto;
}
</style>
