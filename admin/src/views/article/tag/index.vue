<script>
import BaseTable from '@/components/table'
import BaseForm from '@/components/form'
import ColorBlock from './components/colorBlock'
import TagDialog from './components/tagDialog'
import TagDrawer from './components/tagDrawer'
import { tableColumns, headerFormItems } from '@/config/tagList.config'
import { getTagList, deleteTagById } from '@/apis/tag'

export default {
    name: 'ArticleTag',
    components: { BaseForm, BaseTable, ColorBlock, TagDialog, TagDrawer },
    data() {
        return {
            currentTagInfo: {},
            headerFormData: {
                dateRange: []
            },
            tableColumns,
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
            ]
        }
    },
    methods: {
        getTagList,
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
                this.$message.error(err.errMsg)
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
            showPagination
            :requestApi="getTagList"
            :columns="tableColumns"
            @optCheck="checkTagInfo"
            @optDelete="deleteTag"
        >
            <template #tableHeader>
                <BaseForm
                    inline
                    :formData="headerFormData"
                    :formItems="headerFormItems"
                    :optItems="headerOptItems"
                />
            </template>
            <template #tagColor="{ row }">
                <ColorBlock :color="row.color" :style="{ margin: 'auto' }" />
            </template>
        </BaseTable>
        <TagDialog ref="tagDialog" @refresh="refreshDatasource" />
        <TagDrawer ref="tagDrawer" :tagInfo="currentTagInfo" />
    </div>
</template>

<style lang="scss" scoped>
:deep(.el-dialog) {
    min-width: 420px;
    max-width: 640px;
}
</style>
