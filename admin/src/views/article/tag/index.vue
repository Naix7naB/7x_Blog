<script>
import BaseTable from '@/components/table'
import BaseForm from '@/components/form'
import ColorBlock from '@/components/colorBlock'

import mixin from '@/views/mixins'
import {
    columns as tagTableColumns,
    query as tagTableQuery,
    popup as tagTablePopup
} from '@/config/tagTable.config'
import { getTagList, createTag, modifyTagById, deleteTagById } from '@/apis/tag'

export default {
    name: 'ArticleTag',
    components: { BaseForm, BaseTable, ColorBlock },
    mixins: [mixin],
    computed: {
        columns() {
            return tagTableColumns
        },
        queryForm() {
            return tagTableQuery.form
        },
        popupConfig() {
            return tagTablePopup.config
        },
        popupForm() {
            return tagTablePopup.form
        }
    },
    methods: {
        getTagList,
        /* 触发添加操作按钮 */
        optAdd() {
            this.openPopup()
            this.execution = () => this.addTag()
        },
        /* 触发编辑操作按钮 */
        optEdit(data) {
            this.openPopup()
            this.execution = () => this.editTag(data.id)
            this.$nextTick(() => this.setPopupFormData(data))
        },
        /* 添加文章标签 */
        addTag() {
            this.submitPopupForm(data => {
                createTag(data).then(res => {
                    this.refreshTableData()
                    this.resetPopupFormData()
                    this.$message.success(res.errMsg)
                }).catch(err => {
                    this.$message.error(err.errMsg || err)
                })
            })
        },
        /* 修改文章标签 */
        editTag(id) {
            this.submitPopupForm(data => {
                modifyTagById(id, data).then(res => {
                    this.refreshTableData()
                    this.resetPopupFormData()
                    this.$message.success(res.errMsg)
                }).catch(err => {
                    this.$message.error(err.errMsg || err)
                })
            })
        },
        /* 删除文章标签 */
        deleteTag(data) {
            deleteTagById(data.id).then(res => {
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
    <div>
        <BaseTable
            ref="table"
            showPagination
            :requestApi="getTagList"
            :columns="columns"
            :queryConfig="queryForm"
            :popupConfig="popupConfig"
            @optAdd="optAdd"
            @optEdit="optEdit"
            @optDelete="deleteTag"
            @beforePopupCancel="onBeforePopupCancel"
            @beforePopupConfirm="onBeforePopupConfirm"
        >
            <template #tagColor="{ val }">
                <ColorBlock :color="val" :style="{ margin: 'auto' }" />
            </template>
            <template #popup>
                <BaseForm ref="popup" :data="popupForm.data" :items="popupForm.items">
                    <template #colorPicker="{ data }">
                        <el-color-picker v-model="data.color" color-format="rgb" show-alpha />
                    </template>
                </BaseForm>
            </template>
        </BaseTable>
    </div>
</template>
