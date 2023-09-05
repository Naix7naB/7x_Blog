<script>
import BaseTable from '@/components/table'
import BaseForm from '@/components/form'
import ColorBlock from './components/colorBlock'
import TagDrawer from './components/tagDrawer'
import { tableColumns, headerFormItems } from '@/config/tagList.config'
import { config as popupConfig, form as popupForm } from '@/config/tagPopup.config'
import { getTagList, createTag, deleteTagById } from '@/apis/tag'

export default {
    name: 'ArticleTag',
    components: { BaseForm, BaseTable, ColorBlock,  TagDrawer },
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
    computed: {
        popup() {
            return {
                config: popupConfig,
                form: popupForm
            }
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
            :columns="tableColumns"
            :popupConfig="popup.config"
            @optCheck="checkTagInfo"
            @optDelete="deleteTag"
            @beforePopupCancel="onBeforePopupCancel"
            @beforePopupConfirm="onBeforePopupConfirm"
        >
            <template #tagColor="{ val }">
                <ColorBlock :color="val" :style="{ margin: 'auto' }" />
            </template>
            <template #popup>
                <BaseForm ref="popupForm" :data="popup.form.data" :items="popup.form.items">
                    <template #colorPicker="{ data }">
                        <el-color-picker v-model="data.color" color-format="rgb" show-alpha />
                    </template>
                </BaseForm>
            </template>
        </BaseTable>
        <TagDrawer ref="tagDrawer" :tagInfo="currentTagInfo" />
    </div>
</template>
