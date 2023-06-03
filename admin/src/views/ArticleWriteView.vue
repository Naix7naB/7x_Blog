<script>
import { BaseForm } from '@/components'
import { formData, formItems } from '@/config/articleWrite.config'
import { normalizeUrl } from '@/utils/util'
import { uploadImg, createArticle } from '@/apis/article'
import { getTagList } from '@/apis/tag'

export default {
    name: 'ArticleWriteView',
    components: { BaseForm },
    data() {
        return {
            formData,
            formItems,
            optConfig: {
                position: 'center',
                options: [
                    {
                        text: '存草稿',
                        plain: true,
                        data: {
                            state: 'draft'
                        },
                        action: this.changeState
                    },
                    {
                        text: '发布',
                        type: 'primary',
                        data: {
                            state: 'released'
                        },
                        action: this.changeState
                    }
                ]
            },
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
        changeState({ state }) {
            console.log(state)
            this.formData.state = state
        },
        async setTagOptions() {
            const tags = this.formItems.find(item => item.prop === 'tags')
            const { data: { list } } = await getTagList({ select: '-articles' })
            tags.options = list.map(tag => {
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
        submit() {
            this.$refs.form.$refs.elForm.validate(async validate => {
                if (validate === false) {
                    return this.$message({
                        type: 'error',
                        message: '内容不能为空'
                    })
                }
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
        if (JSON.stringify(this.$route.params) !== '{}') {
            const { data, optOptions } = this.$route.params
            if (optOptions) {
                this.optConfig.options = optOptions
            }
            this.formData = data
        }
        this.setTagOptions()
    },
    mounted() {
        if (this.formData.cover_img){
            this.$refs.form.addFile({
                name: 'cover_img',
                url: normalizeUrl(this.formData.cover_img)
            })
        }
    },
    beforeDestroy() {
        this.resetData()
    }
}
</script>

<template>
    <el-card body-style="padding: 40px 60px;">
        <BaseForm
            ref="form"
            :hasOperation="true"
            :formData="formData"
            :formItems="formItems"
            :optConfig="optConfig"
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
