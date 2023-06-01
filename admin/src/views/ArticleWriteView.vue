<script>
import Request from '@/utils/request'
import formItems from '@/config/articleForm.config'
import { debounce } from '@/utils/util'
import { BaseForm } from '@/components'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('article')

export default {
    name: 'ArticleWriteView',
    components: { BaseForm },
    data() {
        return {
            content: '',
            debounceEdit: () => {},
            debounceSubmit: () => {}
        }
    },
    computed: {
        ...mapGetters(['articleInfo', 'formItems'])
    },
    methods: {
        ...mapActions(['setArticleInfo', 'loadTags']),
        onEdit(content) {
            this.setArticleInfo({ field: 'content', value: content })
        },
        async addImg(pos, file) {
            const { data } = await Request.postFile({
                url: '/upload/article',
                data: {
                    [pos]: file
                }
            })
            const url = process.env.VUE_APP_BASE_URL + data.fileUrls[0].url
            this.$refs.editor.$img2Url(pos, url)
        },
        delImg([url, file]) {
            const { pathname } = new URL(url)
            console.log(pathname)
        },
        submit(e) {
            this.$refs.form.$refs.elForm.validate(async validate => {
                if (validate === false) {
                    this.$notify({
                        type: 'error',
                        message: '内容不能为空'
                    })
                    return false
                }
                let t = e.target
                if (t.className === 'article-submit') return false
                while(!t.classList.contains('el-button')) {
                    t = t.parentElement
                }
                this.setArticleInfo({ field: 'state', value: t.dataset.state })
                this.createArticle()
            })
        },
        createArticle() {
            this.$refs.form.uploadFile(async list => {
                if (!list.length) {
                    this.$message({
                        type: 'error',
                        message: '请上传封面'
                    })
                    return false
                }
                const { data: { fileUrls } } = await Request.postFile({
                    url: '/upload/article',
                    data: {
                        'cover_img': list[0].raw
                    }
                })
                this.setArticleInfo({
                    field: fileUrls[0].fieldname,
                    value: fileUrls[0].url
                })
                Request.requestJson({
                    methodType: Request.POST,
                    url: '/article/create',
                    data: this.articleInfo
                }).then(res => {
                    this.$notify({
                        type: 'success',
                        message: res.errMsg
                    })
                    this.resetData()
                }).catch(err => {
                    console.log(err)
                })
            })
        },
        resetData() {
            this.content = ''
            this.$refs.form.resetForm()
            this.loadTags()
        }
    },
    created() {
        this.loadTags()
        console.log('101', formItems)
    },
    mounted() {
        this.debounceEdit = debounce(this.onEdit, 1000)
        this.debounceSubmit = debounce(this.submit, 500)
    }
}
</script>

<template>
    <el-card body-style="padding: 40px 60px;">
        <BaseForm ref="form" :formData="articleInfo" :formItems="formItems">
            <template #editor>
                <mavon-editor
                    ref="editor"
                    style="height: 500px;"
                    v-model="content"
                    @change="debounceEdit"
                    @imgAdd="addImg"
                    @imgDel="delImg"
                />
            </template>
            <template #submit>
                <div class="article-submit" @click="debounceSubmit">
                    <el-button plain data-state="draft">存草稿</el-button>
                    <el-button type="primary" data-state="released">发布</el-button>
                </div>
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

:deep(.el-button+.el-button) {
    margin-left: 36PX;
}

.article-submit {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
