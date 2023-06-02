<script>
export default {
    props: {
        formConfig: {
            type: Object,
            default: () => {
                return {
                    size: 'default',
                    inline: false,
                    labelWidth: '80px',
                    labelPosition: 'left'
                }
            }
        },
        formData: {
            type: Object,
            default: () => {}
        },
        formItems: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            customFormData: this.formData,
            fileList: []
        }
    },
    methods: {
        handleFileExceed() {
            this.$notify({
                type: 'error',
                message: '超出文件上传限制'
            })
        },
        handleFileChange(file, list) {
            this.fileList = list
        },
        buttonClick(act) {
            this.$emit('handleFormButtonClick', act)
        },
        uploadFile(cb) {
            cb(this.fileList)
        },
        resetForm() {
            this.$refs.elForm.resetFields()
            this.$refs.elUpload[0].clearFiles()
        }
    }
}
</script>

<template>
    <el-form ref="elForm" v-bind="formConfig" :model="customFormData">
        <template v-for="{ others, options, ...item } in formItems">
            <el-form-item v-bind="item" :style="{ marginRight: '30px' }" :key="item.label">
                <!-- 输入框 -->
                <template v-if="item.type === 'input'">
                    <el-input
                        clearable
                        v-model="customFormData[item.prop]"
                        :placeholder="item.placeholder"
                    />
                </template>
                <!-- 密码输入框 -->
                <template v-if="item.type === 'password'">
                    <el-input
                        type="password"
                        show-password
                        v-model="customFormData[item.prop]"
                        :placeholder="item.placeholder"
                    />
                </template>
                <!-- 日期范围 -->
                <template v-if="item.type === 'date'">
                    <el-date-picker v-bind="others" v-model="customFormData[item.prop]" clearable />
                </template>
                <!-- 下拉框 -->
                <template v-if="item.type === 'select'">
                    <el-select
                        clearable
                        v-bind="others"
                        v-model="customFormData[item.prop]"
                        :placeholder="item.placeholder"
                    >
                        <el-option
                            v-for="optionItem in options"
                            :label="optionItem.label"
                            :value="optionItem.value"
                            :key="optionItem.label"
                        />
                    </el-select>
                </template>
                <!-- 切换 -->
                <template v-if="item.type === 'switch'">
                    <el-switch v-model="customFormData[item.prop]" />
                </template>
                <!-- 文件上传 -->
                <template v-if="item.type === 'upload'">
                    <el-upload
                        ref="elUpload"
                        action=""
                        multiple
                        v-bind="others"
                        :file-list="fileList"
                        :on-exceed="handleFileExceed"
                        :on-change="handleFileChange"
                        :on-remove="handleFileChange"
                    >
                        <template #tip v-if="others.tip || false">
                            <div>{{ others.tip }}</div>
                        </template>
                        <el-button v-if="others.uploadType" type="primary">选择上传文件</el-button>
                        <fa-icon v-else :icon="['fas', 'plus']" />
                    </el-upload>
                </template>
                <!-- 操作按钮 -->
                <template v-if="item.type === 'opt'">
                    <el-button
                        v-for="btn in options"
                        v-bind="btn"
                        :key="btn.act"
                        @click="buttonClick(btn.act)"
                    >
                        {{ btn.text }}
                    </el-button>
                </template>
                <!-- 自定义组件插槽 -->
                <template v-if="item.type === 'slot'">
                    <slot :name="item.slotName" />
                </template>
            </el-form-item>
        </template>
    </el-form>
</template>

<style lang="scss" scoped>
:deep(.el-range-separator) {
    width: 30PX;
}
</style>
