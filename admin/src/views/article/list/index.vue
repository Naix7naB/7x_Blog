<script>
import BaseTable from '@/components/table'
import BaseForm from '@/components/form'

import { columns as articleTableColumns } from '@/config/articleTable.config'
import { form as articleQueryForm } from '@/config/articleQuery.config'
import { config as articlePopupConfig, form as articlePopupForm } from '@/config/articlePopup.config'
import { getArticleList, createArticle, deleteArticleById } from '@/apis/article'
import { getClassifyList } from '@/apis/classify'
import { getTagList } from '@/apis/tag'
import { uploadFile, deleteFile } from '@/apis/upload'
import { parseUrl } from '@/utils'

export default {
    name: 'ArticleList',
    components: { BaseTable, BaseForm },
    computed: {
        columns() {
            return articleTableColumns
        },
        queryForm() {
            return articleQueryForm
        },
        popupConfig() {
            return articlePopupConfig
        },
        popupForm() {
            return articlePopupForm
        }
    },
    methods: {
        getArticleList,
        /* 编辑文章 */
        editArticle(data) {
            this.$refs.articleTable.showPopup()
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
                this.$refs.popupForm.setFormData(mapData)
            })
        },
        /* 删除文章 */
        deleteArticle(data) {
            deleteArticleById(data.id).then(res => {
                this.$refs.articleTable.getDatasource()
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err.errMsg)
            })
        },
        /* 添加图片到文章内容 */
        addImgOfContent(pos, file) {
            uploadFile({ classify: 'article', filename: pos, file }).then(({ data }) => {
                this.$refs.editor.$img2Url(pos, data.fileUrls[0].url)
            }).catch(err => {
                this.$message.error(err.errMsg)
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
        },
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
            this.$refs.popupForm.submitForm(data => {
                createArticle(data).then(res => {
                    this.$message.success(res.errMsg)
                    done()
                }).catch(err => {
                    this.$message.error(err.errMsg)
                }).finally(() => {
                    this.resetPopupFormData()
                })
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
        ref="articleTable"
        showPagination
        :requestApi="getArticleList"
        :columns="columns"
        :queryConfig="queryForm"
        :popupConfig="popupConfig"
        @optEdit="editArticle"
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
            <BaseForm ref="popupForm" :data="popupForm.data" :items="popupForm.items">
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
