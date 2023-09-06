<script>
import BaseTable from '@/components/table'
import BaseForm from '@/components/form'

import {
    columns as classifyTableColumns,
    query as classifyTableQuery,
    popup as classifyTablePopup
} from '@/config/classifyTable.config'
import { getClassifyList, createClassify, modifyClassifyById, deleteClassifyById } from '@/apis/classify'

export default {
    name: 'ArticleClassify',
    components: { BaseForm, BaseTable },
    data() {
        return {
            execution: null
        }
    },
    computed: {
        columns() {
            return classifyTableColumns
        },
        queryForm() {
            return classifyTableQuery.form
        },
        popupConfig() {
            return classifyTablePopup.config
        },
        popupForm() {
            return classifyTablePopup.form
        }
    },
    methods: {
        getClassifyList,
        /* 触发添加操作按钮 */
        optAdd() {
            this.execution = () => this.addClassify()
            this.$refs.classifyTable.showPopup()
        },
        /* 触发编辑操作按钮 */
        optEdit(data) {
            this.execution = () => this.editClassify(data.id)
            this.$refs.classifyTable.showPopup()
            this.$nextTick(() => {
                this.$refs.popupForm.setFormData(data)
            })
        },
        /* 添加文章分类 */
        addClassify() {
            this.$refs.popupForm.submitForm(data => {
                createClassify(data).then(res => {
                    this.refreshTableData()
                    this.resetPopupFormData()
                    this.$message.success(res.errMsg)
                }).catch(err => {
                    this.$message.error(err.errMsg || err)
                })
            })
        },
        /* 编辑文章分类 */
        editClassify(id) {
            this.$refs.popupForm.submitForm(data => {
                modifyClassifyById(id, data).then(res => {
                    this.refreshTableData()
                    this.resetPopupFormData()
                    this.$message.success(res.errMsg)
                }).catch(err => {
                    this.$message.error(err.errMsg || err)
                })
            })
        },
        /* 删除文章分类 */
        deleteClassify(data) {
            deleteClassifyById(data.id).then(res => {
                this.refreshTableData()
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        },
        /* 刷新表格数据 */
        refreshTableData() {
            this.$refs.classifyTable.refresh()
        },
        /* 重置弹窗表单数据 */
        resetPopupFormData() {
            this.$refs.popupForm.resetForm()
        },
        /* 弹窗点击取消按钮 */
        onBeforePopupCancel(done) {
            this.resetPopupFormData()
            done()
        },
        /* 弹窗点击确认按钮 */
        onBeforePopupConfirm(done) {
            this.execution()
            done()
        }
    }
}
</script>

<template>
    <BaseTable
        ref="classifyTable"
        showPagination
        :requestApi="getClassifyList"
        :columns="columns"
        :queryConfig="queryForm"
        :popupConfig="popupConfig"
        @optAdd="optAdd"
        @optEdit="optEdit"
        @optDelete="deleteClassify"
        @beforePopupCancel="onBeforePopupCancel"
        @beforePopupConfirm="onBeforePopupConfirm"
    >
        <template #popup>
            <BaseForm ref="popupForm" :data="popupForm.data" :items="popupForm.items" />
        </template>
    </BaseTable>
</template>
