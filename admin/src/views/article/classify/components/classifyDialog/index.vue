<script>
import BaseForm from '@/components/form'

export default {
    name: 'ClassifyDialog',
    components: { BaseForm },
    data() {
        return {
            isRefresh: false,
            dialogState: 'create',
            isVisible: false,
            rowData: {
                name: ''
            },
            formData: {
                name: ''
            },
            formItems: [
                {
                    type: 'input',
                    prop: 'name',
                    label: '分类名称',
                    placeholder: '输入分类名称',
                    rules: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }]
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
        openDialog(data) {
            if (this.isVisible) return false
            this.isVisible = true
            this.$nextTick(() => {
                if (data) {
                    this.dialogState = 'change'
                    this.formData = Object.assign(this.formData, data)
                } else {
                    this.formData = Object.assign({}, this.rowData)
                }
            })
        },
        /* 关闭弹窗 */
        closeDialog() {
            if (!this.isVisible) return false
            this.isVisible = false
            this.$refs.dialogForm.resetForm()
        },
        /* 弹窗点击确认按钮 */
        dialogConfirm() {
            this.$refs.dialogForm.submitForm(() => {
                const data = this.formData
                if (this.dialogState === 'create') {
                    this.$emit('confirm', data)
                }
                if (this.dialogState === 'change') {
                    this.$emit('change', data)
                }
                this.closeDialog()
            })
        }
    }
}
</script>

<template>
    <el-dialog
        title="创建分类"
        append-to-body
        destroy-on-close
        :visible="isVisible"
        :before-close="closeDialog"
    >
        <BaseForm
            ref="dialogForm"
            :formData="formData"
            :formItems="formItems"
            hideRequiredAsterisk
        />
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

<style lang="scss" scoped>
:deep(.el-dialog) {
    min-width: 420px;
    max-width: 640px;
}
</style>
