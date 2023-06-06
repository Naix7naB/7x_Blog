<script>
import { BaseForm } from '@/components'
import { createTag } from '@/apis/tag'

export default {
    name: 'TagDialog',
    components: { BaseForm },
    data() {
        return {
            isRefresh: false,
            isVisible: false,
            formData: {
                name: '',
                color: ''
            },
            formItems: [
                {
                    type: 'input',
                    prop: 'name',
                    label: '标签名称',
                    placeholder: '输入标签名称'
                },
                {
                    type: 'slot',
                    slotName: 'color-picker',
                    prop: 'color',
                    label: '标签颜色'
                }
            ],
            optConfig: {
                position: 'right',
                options: [
                    {
                        text: '取消',
                        plain: true,
                        action: this.closeDialog
                    },
                    {
                        text: '确认',
                        type: 'primary',
                        action: this.dialogConfirm
                    }
                ]
            }
        }
    },
    methods: {
        /* 打开弹窗 */
        openDialog() {
            if (!this.isVisible) {
                this.isVisible = true
            }
        },
        /* 关闭弹窗 */
        closeDialog() {
            if (this.isVisible) {
                this.isVisible = false
            }
        },
        /* 弹窗点击确认按钮 */
        dialogConfirm() {
            createTag(this.formData).then(res => {
                this.isRefresh = true
                this.closeDialog()
                this.$refs.dialogForm.resetForm()
                this.$message.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err.errMsg)
            })
        },
        /* 弹窗关闭后 */
        dialogClosed() {
            if (this.isRefresh) {
                this.isRefresh = false
                this.$emit('refresh')
            }
        }
    }
}
</script>

<template>
    <el-dialog
        title="创建标签"
        append-to-body
        destroy-on-close
        :visible="isVisible"
        :before-close="closeDialog"
        @closed="dialogClosed"
    >
        <BaseForm
            ref="dialogForm"
            :hasOperation="true"
            :formData="formData"
            :formItems="formItems"
            :optConfig="optConfig"
        >
            <template #color-picker>
                <el-color-picker v-model="formData.color" color-format="rgb" show-alpha />
            </template>
        </BaseForm>
    </el-dialog>
</template>
