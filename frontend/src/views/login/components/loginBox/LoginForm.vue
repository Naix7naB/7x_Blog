<script>
export default {
    name: 'LoginForm',
    props: {
        title: {
            type: String,
            default: ''
        },
        raw: {
            type: Object,
            required: true
        },
        items: {
            type: Array,
            required: true
        },
        optItem: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            current: Object.assign({} ,this.raw),
            validate: false
        }
    },
    methods: {
        /* 表单是否有效 */
        isValidate() {
            this.$refs.formRef.validate(v => {
                this.validate = v
            })
            return this.validate
        },
        /* 重置表单信息 */
        resetForm() {
            this.$refs.formRef.resetFields()
            this.$refs.formRef.clearValidate()
        }
    }
}
</script>

<template>
    <div class="form-container--inner">
        <div class="form-title">{{title}}</div>
        <el-form ref="formRef" :model="current" hide-required-asterisk>
            <el-form-item
                v-for="{icon, rules, ...item} in items"
                :rules="rules"
                :prop="item.prop"
                :key="item.prop"
            >
                <el-input v-bind="item" v-model="current[item.prop]">
                    <fa-icon slot="prefix" :icon="['fas', icon]" />
                </el-input>
            </el-form-item>
        </el-form>
        <el-button v-bind="optItem.config" @click="optItem.action(current)">
            {{optItem.config.text}}
        </el-button>
    </div>
</template>

<style lang="scss" scoped>
/* 样式穿透 hook ElementUI 样式 */
:deep(.el-input input) {
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid;
}

:deep(.el-button) {
    width: 100%;
    margin-top: 16px;
}

/* 登录/注册 表单样式 */
.form-container--inner {
    margin: 0 auto;
    padding: 50px;
}

.form-title {
    margin-bottom: 30px;
    text-align: center;
    font-weight: bold;
    font-size: 36px;
    color: #000000;
}
</style>
