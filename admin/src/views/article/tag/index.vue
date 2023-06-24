<script>
import { BaseForm, BaseTable, TagDialog, TagDrawer } from '@/components'
import { tableColumns, headerFormItems } from '@/config/tagList.config'
import { fetchTags, deleteTagById } from '@/apis/tag'

export default {
    name: 'ArticleTag',
    components: { BaseForm, BaseTable, TagDialog, TagDrawer },
    data() {
        return {
            currentTagInfo: {},
            tableColumns,
            headerFormData: {
                dateRange: []
            },
            headerFormItems,
            headerOptItems: [
                {
                    text: '查询',
                    type: 'primary',
                    action: this.queryTags
                },
                {
                    text: '创建',
                    type: 'primary',
                    action: () => {
                        this.$refs.tagDialog.openDialog()
                    }
                }
            ],
            tableOptItems: [
                {
                    text: '查看',
                    size: 'mini',
                    type: 'primary',
                    action: this.checkTagInfo
                },
                {
                    text: '删除',
                    type: 'danger',
                    size: 'mini',
                    action: this.deleteTag
                }
            ]
        }
    },
    methods: {
        fetchTags,
        /* 查询文章标签 */
        queryTags() {
            console.log(this.headerFormData)
        },
        /* 点击查看按钮 */
        checkTagInfo(data) {
            this.currentTagInfo = data
            this.$refs.tagDrawer.openDrawer()
        },
        /* 点击删除按钮 */
        deleteTag(data) {
            deleteTagById(data._id).then(res => {
                this.refreshDatasource()
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err)
            })
        },
        /* 刷新表格数据源 */
        refreshDatasource() {
            this.$refs.tableRef.getDatasource()
        }
    }
}
</script>

<template>
    <div>
        <BaseTable
            ref="tableRef"
            hasPagination
            :requestApi="fetchTags"
            :columns="tableColumns"
            :optItems="tableOptItems"
        >
            <template #table-header>
                <BaseForm
                    inline
                    :formData="headerFormData"
                    :formItems="headerFormItems"
                    :optItems="headerOptItems"
                />
            </template>
            <template #tag-color="{ row }">
                <i class="color-block" :style="{ backgroundColor: row.color }" />
            </template>
        </BaseTable>
        <TagDialog ref="tagDialog" @refresh="refreshDatasource" />
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
