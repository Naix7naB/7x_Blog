<script>
export default {
    name: 'Popup',
    props: {
        title: {
            type: String,
            default: '弹窗'
        },
        width: {
            type: String,
            default: '40%'
        },
        offset: {
            type: String,
            default: '20vh'
        },
        fullscreen: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            visible: false
        }
    },
    methods: {
        open() {
            this.visible = true
        },
        close() {
            this.visible = false
        },
        cancel() {
            this.$emit('beforePopupCancel', this.close)
        },
        confirm() {
            this.$emit('beforePopupConfirm', this.close)
        }
    }
}
</script>

<template>
    <el-dialog
        :visible="visible"
        :title="title"
        :width="width"
        :top="offset"
        :fullscreen="fullscreen"
        :center="true"
        :append-to-body="true"
        :destroy-on-close="true"
        @close="close"
    >
        <template #default>
            <slot></slot>
        </template>
        <template slot="footer">
            <el-button plain size="small" @click="cancel">取消</el-button>
            <el-button type="primary" size="small" @click="confirm">确认</el-button>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped>
:deep(.el-dialog) {
    min-width: 420px;
    max-width: 640px;
}

:deep(.el-dialog.is-fullscreen) {
    min-width: 100%;
    max-width: 100%;
}
</style>
