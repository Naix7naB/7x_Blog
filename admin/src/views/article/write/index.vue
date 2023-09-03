<script>
import BaseForm from '@/components/form'
import { formData, formItems } from '@/config/articleWrite.config'
import { uploadImg, createArticle, updateArticleById } from '@/apis/article'
import { getClassifyList } from '@/apis/classify'
import { getTagList } from '@/apis/tag'
import { deleteFile } from '@/apis/upload'

export default {
    name: 'ArticleWrite',
    components: { BaseForm },
    data() {
        return {
            aid: null,
            isEdit: false,
            formData,
            formItems,
            optItems: [
                {
                    text: '存草稿',
                    plain: true,
                    action: data => {
                        data.state = 'draft'
                        this.submit(data)
                    }
                },
                {
                    text: '发布',
                    type: 'primary',
                    action: data => {
                        data.state = 'released'
                        this.submit(data)
                    }
                }
            ],
            editOptItems: [
                {
                    text: '取消',
                    plain: true,
                    action: () => {
                        this.$router.push({ name: 'ArticleList' })
                    }
                },
                {
                    text: '保存',
                    type: 'primary',
                    action: data => {
                        // 更新数据库
                        updateArticleById(this.aid, data).then(res => {
                            this.$router.push({ name: 'ArticleList' })
                            this.$message.success(res.errMsg)
                        }).catch(err => {
                            this.$message.error(err)
                        })
                    }
                }
            ]
        }
    },
    computed: {
        currentOptItems() {
            return this.isEdit ? this.editOptItems : this.optItems
        }
    },
    methods: {
        async setTagOptions() {
            try {
                const { data: { list: classifyList } } = await getClassifyList()
                const { data: { list: tagList } } = await getTagList({ select: '-articles name' })
                const classify = this.formItems.find(item => item.prop === 'classify')
                const tags = this.formItems.find(item => item.prop === 'tags')
                classify.options = classifyList.map(item => ({ label: item.name, value: item.id }))
                tags.options = tagList.map(tag => ({ label: tag.name, value: tag.id }))
            } catch (err) {
                this.$message.error(err.errMsg)
            }
        },
        addImg(pos, file) {
            uploadImg({ filename: pos, file }).then(res => {
                this.$refs.editor.$img2Url(pos, res.url)
            }).catch(err => {
                this.$message.error(err.errMsg)
            })
        },
        delImg([url, file]) {
            const { pathname } = new URL(url)
            const [classify, filename] = pathname.match(/^\/(.+)/)[1].split('/')
            deleteFile({ classify, filename }).then(res => {
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        },
        submit(data) {
            this.$refs.form.submitForm(async fileList => {
                if (fileList) {
                    const { fieldname, url } = await uploadImg({
                        filename: 'cover_img',
                        file: fileList[0].file
                    })
                    data[fieldname] = url
                }
                createArticle(data).then(res => {
                    this.resetData()
                    this.$message.success(res.errMsg)
                }).catch(err => {
                    this.resetData()
                    this.$message.error(err.errMsg)
                })
            })
        },
        resetData() {
            this.$refs.form.resetForm()
        }
    },
    created() {
        const data = this.$route.params
        if (JSON.stringify(data) !== '{}') {
            this.isEdit = true
            this.aid = data.id
            this.formData = Object.fromEntries(
                Object.entries(this.formData).map(([key, val]) => {
                    if (key === 'tags') {
                        data[key] = data[key].map(t => t.id)
                    }
                    if (key === 'classify') {
                        data[key] = data[key]?.id
                    }
                    return [key, data[key]]
                })
            )
        }
        this.setTagOptions()
    },
    mounted() {
        if (this.formData.cover_img) {
            this.$refs.form.addFile({
                name: 'cover_img',
                url: this.formData.cover_img
            })
        }
    }
}
</script>

<template>
    <el-card body-style="padding: 40px 60px;">
        <BaseForm
            ref="form"
            hideRequiredAsterisk
            :formData="formData"
            :formItems="formItems"
            :optItems="currentOptItems"
        >
            <template #editor>
                <mavon-editor
                    ref="editor"
                    style="height: 500px;"
                    v-model="formData.content"
                    @imgAdd="addImg"
                    @imgDel="delImg"
                />
            </template>
        </BaseForm>
    </el-card>
</template>

<style lang="scss" scoped>
:deep(.el-input),
:deep(.el-select) {
    min-width: 240px;
    max-width: 400px;
}

:deep(.el-select) {
    width: 100%;
}

:deep(.el-button + .el-button) {
    margin-left: 36px;
}
</style>
