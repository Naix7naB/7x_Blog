<script>
import { BaseForm, BaseTable, TagDialog, TagDrawer } from '@/components'
import { tableColumns, headerFormItems } from '@/config/tagList.config'
import { fetchTags, deleteTagById } from '@/apis/tag'

export default {
    name: 'ArticleTagView',
    components: { BaseForm, BaseTable, TagDialog, TagDrawer },
    data() {
        return {
            tableColumns,
            headerFormItems,
            headerFormData: {
                dateRange: []
            },
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
    methods: {
        fetchTags,
        /* 处理操作按钮按下时 */
        handleButtonClick(payload) {
            const { act, data } = payload
            if (this[act] && typeof this[act] === 'function') {
                this[act](data)
            }
        },
        /* 点击编辑按钮 */
        editTag(data) {
            this.$refs.tagDrawer.openDrawer()
            this.currentTagInfo = data
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
        search() {
            console.log(this.headerFormData)
        },
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
            @handleTableButtonClick="handleButtonClick"
        >
            <template #table-header>
                <BaseForm
                    :inline="true"
                    :hasOperation="true"
                    :formData="headerFormData"
                    :formItems="headerFormItems"
                    :optConfig="headerOptConf"
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
