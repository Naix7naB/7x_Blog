<script>
import BaseTable from '@/components/table'
import BaseForm from '@/components/form'
import ColorBlock from './components/colorBlock'
import TagDrawer from './components/tagDrawer'

import { columns as tagTableColumns } from '@/config/tagTable.config'
import { form as tagQueryForm } from '@/config/tagQuery.config'
import { config as tagPopupConfig, form as tagPopupForm } from '@/config/tagPopup.config'
import { getTagList, createTag, deleteTagById } from '@/apis/tag'

export default {
    name: 'ArticleTag',
    components: { BaseForm, BaseTable, ColorBlock,  TagDrawer },
    data() {
        return {
            currentTagInfo: {}
        }
    },
    computed: {
        columns() {
            return tagTableColumns
        },
        queryForm() {
            return tagQueryForm
        },
        popupConfig() {
            return tagPopupConfig
        },
        popupForm() {
            return tagPopupForm
        }
    },
    methods: {
        getTagList,
        /* 点击查看按钮 */
        checkTagInfo(data) {
            this.currentTagInfo = data
            this.$refs.tagDrawer.openDrawer()
        },
        /* 点击删除按钮 */
        deleteTag(data) {
            deleteTagById(data.id).then(res => {
                this.refreshDatasource()
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err.errMsg)
            })
        },
        /* 弹窗点击取消按钮 */
        onBeforePopupCancel(done) {
            this.$refs.popupForm.resetForm()
            done()
        },
        /* 弹窗点击确认按钮 */
        onBeforePopupConfirm(done) {
            this.$refs.popupForm.submitForm(data => {
                createTag(data).then(res => {
                    this.$message.success(res.errMsg)
                    this.refreshDatasource()
                    done()
                }).catch(err => {
                    this.$message.error(err.errMsg || err)
                })
            })
        },
        /* 刷新表格数据源 */
        refreshDatasource() {
            this.$refs.table.refresh()
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
            @optCheck="checkTagInfo"
            @optDelete="deleteTag"
            @beforePopupCancel="onBeforePopupCancel"
            @beforePopupConfirm="onBeforePopupConfirm"
        >
            <template #tagColor="{ val }">
                <ColorBlock :color="val" :style="{ margin: 'auto' }" />
            </template>
            <template #popup>
                <BaseForm ref="popupForm" :data="popupForm.data" :items="popupForm.items">
                    <template #colorPicker="{ data }">
                        <el-color-picker v-model="data.color" color-format="rgb" show-alpha />
                    </template>
                </BaseForm>
            </template>
        </BaseTable>
        <TagDrawer ref="tagDrawer" :tagInfo="currentTagInfo" />
    </div>
</template>
