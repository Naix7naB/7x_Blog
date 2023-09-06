<script>
import BaseTable from '@/components/table'
import BaseForm from '@/components/form'

import mixin from '@/views/mixins'
import {
    columns as classifyTableColumns,
    query as classifyTableQuery,
    popup as classifyTablePopup
} from '@/config/classifyTable.config'
import { getClassifyList, createClassify, modifyClassifyById, deleteClassifyById } from '@/apis/classify'

export default {
    name: 'ArticleClassify',
    components: { BaseForm, BaseTable },
    mixins: [mixin],
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
            this.openPopup()
            this.execution = () => this.addClassify()
        },
        /* 触发编辑操作按钮 */
        optEdit(data) {
            this.openPopup()
            this.execution = () => this.editClassify(data.id)
            this.$nextTick(() => this.setPopupFormData(data))
        },
        /* 添加文章分类 */
        addClassify() {
            this.submitPopupForm(data => {
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
            this.submitPopupForm(data => {
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
        }
    }
}
</script>

<template>
    <BaseTable
        ref="table"
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
            <BaseForm ref="popup" :data="popupForm.data" :items="popupForm.items" />
        </template>
    </BaseTable>
</template>
