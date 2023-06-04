<script>
import { BaseForm, BaseTable } from '@/components'
import { fetchTags, deleteTagById } from '@/apis/tag'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('tag')

export default {
    name: 'ArticleTagView',
    components: { BaseForm, BaseTable },
    data() {
        return {
            showDialog: false,
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
                            this.showDialog = true
                        }
                    }
                ]
            },
            dialogOptConf: {
                position: 'right',
                options: [
                    {
                        text: '取消',
                        plain: true,
                        action: this.dialogClose
                    },
                    {
                        text: '确认',
                        type: 'primary',
                        action: this.dialogClose
                    }
                ]
            }
        }
    },
    computed: {
        ...mapState([
            'datasource',
            'headerFormData',
            'dialogFormData',
            'pageData'
        ]),
        ...mapGetters([
            'getTableColumns',
            'getHeaderFormItems',
            'getDialogFormItems'
        ])
    },
    watch: {
        'pageData.page'() {
            this.getTagList()
        }
    },
    methods: {
        ...mapActions(['setDatasource', 'setHeaderFormData', 'setPageData']),
        /* 获取标签列表 */
        async getTagList() {
            this.$store.dispatch('setLoadingState', true)
            const { page, size } = this.pageData
            const res = await fetchTags({
                page,
                size,
                select: '-articles'
            })
            const { list, total } = res.data
            this.setDatasource(list)
            this.setPageData({ field: 'total', value: total })
            this.$store.dispatch('setLoadingState', false)
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
            this.setPageConf({ field: 'page', value: page })
        },
        search() {
            console.log(this.headerFormData)
        },
        /* 点击编辑按钮 */
        edit(data) {
            console.log(data)
        },
        /* 点击删除按钮 */
        delete(data) {
            deleteTagById(data._id).then(res => {
                this.getTagList()
                this.$message.success({
                    message: res.errMsg
                })
            })
        },
        dialogClose() {
            this.showDialog = false
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
        </BaseTable>
        <el-dialog
            title="创建标签"
            center
            append-to-body
            :visible="showDialog"
            @close="dialogClose"
        >
            <BaseForm
                :hasOperation="true"
                :formData="dialogFormData"
                :formItems="getDialogFormItems"
                :optConfig="dialogOptConf"
            />
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
:deep(.el-dialog) {
    min-width: 480px;
    max-width: 600px;
}
</style>
