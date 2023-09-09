<script>
import BaseForm from '@/components/form'

import { web as webForm, host as hostForm } from '@/config/siteForm.config'
import { getSiteInfo } from '@/apis/site'

export default {
    name: 'WebConfig',
    components: { BaseForm },
    data() {
        return {
            activeTab: 'web'
        }
    },
    computed: {
        webFormData() {
            return webForm.data
        },
        webFormItems() {
            return webForm.items
        },
        hostFormData() {
            return hostForm.data
        },
        hostFormItems() {
            return hostForm.items
        }
    },
    mounted() {
        getSiteInfo().then(({ data }) => {
            const { name, logo, summary, bulletin, host, about_me, background, record_num } = data
            this.$refs.webForm.setFormData({
                name, logo, summary, bulletin, background, record_num
            })
            this.$refs.hostForm.setFormData({
                about_me, ...host
            })
        }).catch(err => {
            console.log(err)
        })
    }
}
</script>

<template>
    <div class="site-page">
        <el-tabs v-model="activeTab">
            <el-tab-pane label="网站信息" name="web">
                <BaseForm ref="webForm" showLabel :data="webFormData" :items="webFormItems" />
            </el-tab-pane>
            <el-tab-pane label="站长信息" name="host">
                <BaseForm ref="hostForm" showLabel :data="hostFormData" :items="hostFormItems">
                    <template #editor="{ data }">
                        <!-- @imgAdd="addImgOfContent" @imgDel="delImgOfContent" -->
                        <mavon-editor ref="editor" style="height: 700px;" v-model="data.about_me" />
                    </template>
                </BaseForm>
            </el-tab-pane>
        </el-tabs>
        <div class="site-actions">
            <el-button type="primary">保存</el-button>
            <el-button plain>重置</el-button>
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
