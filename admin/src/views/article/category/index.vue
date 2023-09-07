<script>
import BaseTable from '@/components/table'
import BaseForm from '@/components/form'

import mixin from '@/views/mixins'
import {
    columns as categoryTableColumns,
    query as categoryTableQuery,
    popup as categoryTablePopup
} from '@/config/categoryTable.config'
import { getCategoryList, createCategory, modifyCategoryById, deleteCategoryById } from '@/apis/category'

export default {
    name: 'ArticleCategory',
    components: { BaseForm, BaseTable },
    mixins: [mixin],
    computed: {
        columns() {
            return categoryTableColumns
        },
        queryForm() {
            return categoryTableQuery.form
        },
        popupConfig() {
            return categoryTablePopup.config
        },
        popupForm() {
            return categoryTablePopup.form
        }
    },
    methods: {
        getCategoryList,
        /* 触发添加操作按钮 */
        optAdd() {
            this.openPopup()
            this.execution = () => this.addCategory()
        },
        /* 触发编辑操作按钮 */
        optEdit(data) {
            this.openPopup()
            this.execution = () => this.editCategory(data.id)
            this.$nextTick(() => this.setPopupFormData(data))
        },
        /* 触发查询操作按钮 */
        optQuery(data) {
            console.log(data)
        },
        /* 添加文章分类 */
        addCategory() {
            this.submitPopupForm(data => {
                createCategory(data).then(res => {
                    this.refreshTableData()
                    this.resetPopupFormData()
                    this.$message.success(res.errMsg)
                }).catch(err => {
                    this.$message.error(err.errMsg || err)
                })
            })
        },
        /* 编辑文章分类 */
        editCategory(id) {
            this.submitPopupForm(data => {
                modifyCategoryById(id, data).then(res => {
                    this.refreshTableData()
                    this.resetPopupFormData()
                    this.$message.success(res.errMsg)
                }).catch(err => {
                    this.$message.error(err.errMsg || err)
                })
            })
        },
        /* 删除文章分类 */
        deleteCategory(data) {
            deleteCategoryById(data.id).then(res => {
                this.refreshTableData()
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        }
    }
}
</script>

<template>
    <BaseTable
        ref="table"
        showPagination
        :requestApi="getCategoryList"
        :columns="columns"
        :queryConfig="queryForm"
        :popupConfig="popupConfig"
        @optAdd="optAdd"
        @optEdit="optEdit"
        @optDelete="deleteCategory"
        @optQuery="optQuery"
        @beforePopupCancel="onBeforePopupCancel"
        @beforePopupConfirm="onBeforePopupConfirm"
    >
        <template #popup>
            <BaseForm ref="popup" :data="popupForm.data" :items="popupForm.items" />
        </template>
    </BaseTable>
</template>
