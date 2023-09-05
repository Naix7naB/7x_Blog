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
        }
    }
}
</script>

<template>
    <el-dialog
        :visible="visible"
        :title="title"
        :width="width"
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
            <el-button plain size="small" @click="close">取消</el-button>
            <el-button type="primary" size="small" @click="close">确认</el-button>
        </template>
    </el-dialog>
</template>
