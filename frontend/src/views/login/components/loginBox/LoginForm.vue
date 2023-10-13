<script>
import { assignIn } from 'lodash-es'

export default {
    name: 'LoginForm',
    props: {
        data: {
            type: Object,
            required: true
        },
        items: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            raw: assignIn({}, this.data),
            current: assignIn({} ,this.data)
        }
    },
    methods: {
        /* 提交表单并验证表单 */
        submit(callback) {
            this.$refs.formRef.validate(v => {
                if (v === false) {
                    this.$message.warning('表单验证失败')
                    return false
                }
                callback(this.current)
            })
        },
        /* 重置表单信息 */
        reset() {
            this.$refs.formRef.resetFields()
            this.$refs.formRef.clearValidate()
        }
    }
}
</script>

<template>
    <el-form ref="formRef" :model="current" hide-required-asterisk>
        <el-form-item
            v-for="{rules, ...item} in items"
            :rules="rules"
            :prop="item.prop"
            :key="item.prop"
        >
            <el-input v-bind="item" v-model="current[item.prop]" auto-complete="off" />
        </el-form-item>
    </el-form>
</template>

<style lang="scss" scoped>
/* 样式穿透 hook ElementUI 样式 */
:deep(.el-input .el-input__inner) {
    border: 0;
    color: $cl-dark-3;
    background-color: $cl-light-5;
}

:deep(.el-input .el-input__inner::placeholder) {
    color: $cl-gray-7;
}
</style>
