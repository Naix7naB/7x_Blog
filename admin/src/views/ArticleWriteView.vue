<script>
import { BaseForm } from '@/components'
import { formData, formItems } from '@/config/articleWrite.config'
import { uploadImg, createArticle } from '@/apis/article'
import { getTagList } from '@/apis/tag'

export default {
    name: 'ArticleWriteView',
    components: { BaseForm },
    data() {
        return {
            formData,
            formItems,
            eventAgent: {
                changeState: this.onChangeState
            }
        }
    },
    methods: {
        handleButtonClick(payload) {
            const { act, ...params } = payload
            if (this.eventAgent[act] && typeof this.eventAgent[act] === 'function') {
                this.eventAgent[act](params)
            }
        },
        onChangeState({ data }) {
            this.formData.state = data
        },
        async setTagOptions() {
            const { data: { list } } = await getTagList({ select: '-articles' })
            this.formItems
                .find(item => item.prop === 'tags')
                .options = list.map(tag => {
                    return {
                        label: tag.name,
                        value: tag.name
                    }
                })
        },
        async addImg(pos, file) {
            const imgInfo = await uploadImg({ filename: pos, file })
            const url = process.env.VUE_APP_BASE_URL + imgInfo.url
            this.$refs.editor.$img2Url(pos, url)
        },
        delImg([url, file]) {
            const { pathname } = new URL(url)
            console.log(pathname)
        },
        submit(e) {
            this.$refs.form.$refs.elForm.validate(async validate => {
                if (validate === false) {
                    return this.$message({
                        type: 'error',
                        message: '内容不能为空'
                    })
                }
                let t = e.target
                if (t.className === 'article-submit') return false
                while(!t.classList.contains('el-button')) {
                    t = t.parentElement
                }
                this.formData.state = t.dataset.state
                this.createArticle()
            })
        },
        createArticle() {
            this.$refs.form.uploadFile(async list => {
                if (!list.length) {
                    return this.$message({
                        type: 'error',
                        message: '请上传封面'
                    })
                }
                const imgInfo = await uploadImg({
                    filename: 'cover_img',
                    file: list[0].raw
                })
                this.formData[imgInfo.fieldname] = imgInfo.url
                createArticle(this.formData).then(res => {
                    this.$message({
                        type: 'success',
                        message: res.errMsg
                    })
                    this.resetData()
                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: err.message
                    })
                })
            })
        },
        resetData() {
            this.$refs.form.resetForm()
        }
    },
    created() {
        this.setTagOptions()
    }
}
</script>

<template>
    <el-card body-style="padding: 40px 60px;">
        <BaseForm
            ref="form"
            :formData="formData"
            :formItems="formItems"
            @handleFormButtonClick="handleButtonClick"
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
    min-width: 240PX;
    max-width: 400PX;
}

:deep(.el-select) {
    width: 100%;
}

:deep(.el-button + .el-button) {
    margin-left: 36PX;
}
</style>
