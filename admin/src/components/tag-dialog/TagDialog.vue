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
                description: '',
                color: ''
            },
            formItems: [
                {
                    type: 'input',
                    prop: 'name',
                    label: '标签名称',
                    placeholder: '输入标签名称',
                    rules: [{ required: true, message: '标签名称不能为空', trigger: 'blur' }]
                },
                {
                    type: 'input',
                    prop: 'description',
                    label: '标签描述',
                    placeholder: '输入标签描述'
                },
                {
                    type: 'slot',
                    slotName: 'color-picker',
                    prop: 'color',
                    label: '标签颜色'
                }
            ],
            optItems: [
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
            this.$refs.dialogForm.submitForm(() => {
                createTag(this.formData).then(res => {
                    this.isRefresh = true
                    this.closeDialog()
                    this.$refs.dialogForm.resetForm()
                    this.$message.success(res.errMsg)
                }).catch(err => {
                    this.$message.error(err.errMsg)
                })
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
        <BaseForm ref="dialogForm" :formData="formData" :formItems="formItems" hideRequiredAsterisk>
            <template #color-picker>
                <el-color-picker v-model="formData.color" color-format="rgb" show-alpha />
            </template>
        </BaseForm>
        <template #footer>
            <el-button
                v-for="{ action, ...btn } in optItems"
                v-bind="btn"
                :key="btn.text"
                @click="action"
            >
                {{ btn.text }}
            </el-button>
        </template>
    </el-dialog>
</template>
