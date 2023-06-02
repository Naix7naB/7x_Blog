<script>
import { BaseForm, BaseTable } from '@/components'
import { tableColumns, tablePager, formConfig, formData, formItems } from '@/config/tagList.config'
import { getTagList } from '@/apis/tag'

export default {
    name: 'ArticleTagView',
    components: { BaseForm, BaseTable },
    data() {
        return {
            tagList: [],
            tableColumns,
            tablePager,
            formConfig,
            formData,
            formItems,
            eventAgent: {
                edit: this.onEdit,
                delete: this.onDelete
            }
        }
    },
    methods: {
        /* 获取标签列表 */
        async fetchTags() {
            const { page, size } = this.tablePager
            const res = await getTagList({
                page,
                size,
                select: '-articles'
            })
            const { list, total } = res.data
            this.tagList = list
            this.tablePager.total = total
        },
        /* 处理操作按钮按下时 */
        handleButtonClick(payload) {
            const { data, idx, act } = payload
            if (this.eventAgent[act] && typeof this.eventAgent[act] === 'function') {
                this.eventAgent[act](data, idx)
            }
        },
        /* 处理页数改变时 */
        handlePageChange(page) {
            this.tablePager.page = page
            this.fetchTags()
        },
        /* 点击编辑按钮 */
        onEdit(data, idx) {
            console.log(data, idx)
        },
        /* 点击删除按钮 */
        onDelete(data, idx) {
            console.log('==== delete =====')
            this.tagList.splice(idx, 1)
        }
    },
    created() {
        this.fetchTags()
    }
}
</script>

<template>
    <BaseTable
        :hasPagination="true"
        :columns="tableColumns"
        :datasource="tagList"
        :pagerConfig="tablePager"
        @handleTableButtonClick="handleButtonClick"
        @handleTablePageChange="handlePageChange"
    >
        <template #table-header>
            <BaseForm
                :formConfig="formConfig"
                :formData="formData"
                :formItems="formItems"
                @handleFormButtonClick="handleButtonClick"
            />
        </template>
    </BaseTable>
</template>

<style lang="scss" scoped></style>
