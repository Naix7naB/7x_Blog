<script>
import BaseTable from '@/components/table'
import BaseForm from '@/components/form'

import mixin from '@/views/mixins'
import {
    columns as articleTableColumns,
    query as articleTableQuery,
    popup as articleTablePopup
} from '@/config/articleTable.config'
import { getArticleList, createArticle, updateArticleById, deleteArticleById } from '@/apis/article'
import { getClassifyList } from '@/apis/classify'
import { getTagList } from '@/apis/tag'
import { uploadFile, deleteFile } from '@/apis/upload'
import { parseUrl } from '@/utils'

export default {
    name: 'ArticleList',
    components: { BaseTable, BaseForm },
    mixins: [mixin],
    computed: {
        columns() {
            return articleTableColumns
        },
        queryForm() {
            return articleTableQuery.form
        },
        popupConfig() {
            return articleTablePopup.config
        },
        popupForm() {
            return articleTablePopup.form
        }
    },
    methods: {
        getArticleList,
        /* 加载表单选项数据 */
        async loadOptions() {
            try {
                const { data: { list: classifyList } } = await getClassifyList()
                const { data: { list: tagList } } = await getTagList({ select: '-articles name' })
                const classify = this.popupForm.items.find(item => item.prop === 'classify')
                const tags = this.popupForm.items.find(item => item.prop === 'tags')
                classify.options = classifyList.map(item => ({ label: item.name, value: item.id }))
                tags.options = tagList.map(tag => ({ label: tag.name, value: tag.id }))
            } catch (err) {
                this.$message.error(err.errMsg || err)
            }
        },
        /* 触发添加操作按钮 */
        optAdd() {
            this.openPopup()
            this.execution = () => this.addArticle()
        },
        /* 触发编辑操作按钮 */
        optEdit(data) {
            this.openPopup()
            this.execution = () => this.editArticle(data.id)
            this.$nextTick(() => {
                const mapData = Object.fromEntries(
                    Object.entries(this.popupForm.data).map(([key, val]) => {
                        let value = data[key]
                        if (key === 'classify') {
                            value = value?.id
                        }
                        if (key === 'tags') {
                            value = value.map(t => t.id)
                        }
                        return [key, value]
                    })
                )
                this.setPopupFormData(mapData)
            })
        },
        /* 添加文章 */
        addArticle() {
            this.submitPopupForm(data => {
                createArticle(data).then(res => {
                    this.refreshTableData()
                    this.resetPopupFormData()
                    this.$message.success(res.errMsg)
                }).catch(err => {
                    this.$message.error(err.errMsg || err)
                })
            })
        },
        /* 编辑文章 */
        editArticle(id) {
            this.submitPopupForm(data => {
                updateArticleById(id, data).then(res => {
                    this.refreshTableData()
                    this.resetPopupFormData()
                    this.$message.success(res.errMsg)
                }).catch(err => {
                    this.$message.error(err.errMsg || err)
                })
            })
        },
        /* 删除文章 */
        deleteArticle(data) {
            deleteArticleById(data.id).then(res => {
                this.refreshTableData()
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        },
        /* 添加图片到文章内容 */
        addImgOfContent(pos, file) {
            uploadFile({ classify: 'article', filename: pos, file }).then(({ data }) => {
                this.$refs.editor.$img2Url(pos, data.fileUrls[0].url)
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        },
        /* 将文章内容中已添加的图片删除 */
        delImgOfContent([url, file]) {
            const { classify, filename } = parseUrl(url)
            deleteFile({ classify, filename }).then(res => {
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        }
    },
    created() {
        this.loadOptions()
    }
}
</script>

<template>
    <BaseTable
        ref="table"
        showPagination
        :requestApi="getArticleList"
        :columns="columns"
        :queryConfig="queryForm"
        :popupConfig="popupConfig"
        @optAdd="optAdd"
        @optEdit="optEdit"
        @optDelete="deleteArticle"
        @beforePopupCancel="onBeforePopupCancel"
        @beforePopupConfirm="onBeforePopupConfirm"
    >
        <template #tag="{ val }">
            <span v-if="val.length === 0" style="color: #bbb">暂无标签</span>
            <el-tag
                v-else
                v-for="tag in val"
                :style="{ backgroundColor: tag.color, borderColor: tag.color }"
                :key="tag.id"
                effect="dark"
                size="mini"
            >
                {{ tag.name }}
            </el-tag>
        </template>
        <template #popup>
            <BaseForm ref="popup" :data="popupForm.data" :items="popupForm.items">
                <template #editor="{ data }">
                    <mavon-editor
                        ref="editor"
                        style="height: 700px;"
                        v-model="data.content"
                        @imgAdd="addImgOfContent"
                        @imgDel="delImgOfContent"
                    />
                </template>
            </BaseForm>
        </template>
    </BaseTable>
</template>

<style lang="scss" scoped>
:deep(.el-image__inner) {
    aspect-ratio: 16 / 9;
}

:deep(.el-tag + .el-tag) {
    margin-left: 6px;
}

:deep(.el-input) {
    min-width: 240px;
    max-width: 480px;
}
</style>
