<script>
import BaseForm from '@/components/form'

import { web as webForm, host as hostForm } from '@/config/siteForm.config'
import { uploadFile, deleteFile } from '@/apis/upload'
import { getSiteInfo, modifySiteInfo } from '@/apis/site'
import { parseUrl } from '@/utils'

export default {
    name: 'WebConfig',
    components: { BaseForm },
    data() {
        return {
            activeTab: 'web',
            webForm,
            hostForm
        }
    },
    computed: {
        currentForm() {
            return this.activeTab === 'web' ? this.$refs.webForm : this.$refs.hostForm
        }
    },
    methods: {
        async initForm() {
            try {
                const { data } = await getSiteInfo()
                const {
                    name,
                    logo,
                    summary,
                    bulletin,
                    host,
                    about_me,
                    background,
                    record_num
                } = data
                this.$refs.webForm.setFormData({
                    name, logo, summary, bulletin, background, record_num
                })
                this.$refs.hostForm.setFormData({
                    ...host, about_me
                })
            } catch (err) {
                this.$message.error(err.errMsg || err)
            }
        },
        /* 添加图片到文章内容 */
        addImgOfContent(pos, file) {
            uploadFile({ category: 'site', filename: pos, file }).then(({ data }) => {
                this.$refs.editor.$img2Url(pos, data.fileUrls[0].url)
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        },
        /* 将文章内容中已添加的图片删除 */
        delImgOfContent([url, file]) {
            const { category, filename } = parseUrl(url)
            deleteFile({ category, filename }).then(res => {
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        },
        /* 修改网站信息 */
        onSubmit() {
            this.currentForm.submitForm(data => {
                modifySiteInfo(data).then(res => {
                    this.$message.success(res.errMsg)
                }).catch(err => {
                    this.$message.error(err.errMsg || err)
                })
            })
        }
    },
    created() {
        this.initForm()
    }
}
</script>

<template>
    <div class="site-page">
        <el-tabs v-model="activeTab">
            <el-tab-pane label="网站信息" name="web">
                <BaseForm ref="webForm" showLabel :data="webForm.data" :items="webForm.items" />
            </el-tab-pane>
            <el-tab-pane label="站长信息" name="host">
                <BaseForm ref="hostForm" showLabel :data="hostForm.data" :items="hostForm.items">
                    <template #editor="{ data }">
                        <mavon-editor
                            ref="editor"
                            style="height: 700px;"
                            v-model="data.about_me"
                            @imgAdd="addImgOfContent"
                            @imgDel="delImgOfContent"
                        />
                    </template>
                </BaseForm>
            </el-tab-pane>
        </el-tabs>
        <div class="site-actions">
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
:deep(.el-tabs__header) {
    margin-bottom: 32px;
}

:deep(.el-input) {
    max-width: 500px;
}

:deep(#pane-web .el-form-item) {
    display: inline-block;
    width: calc(50% - 20px);
    margin-right: 20px;
    min-width: 500px;
    white-space: nowrap;
}

:deep(#pane-host .upload-image--wrapper) {
    border-radius: 50%;
}

.site-page {
    overflow: hidden;
    padding: 30px 40px;
    border-radius: 6px;
    background-color: #fff;
}

.site-actions {
    margin-top: 24px;
    text-align: center;
    white-space: nowrap;
}
</style>
