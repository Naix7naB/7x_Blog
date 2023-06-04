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
                    labelPosition: 'left',
                    hideRequiredAsterisk: true
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
        },
        optConfig: {
            type: Object,
            default: () => {}
        },
        hasOperation: {
            type: Boolean,
            default: false
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
            this.$message.warning('超出文件上传限制')
        },
        handleFileChange(file, list) {
            this.fileList.push({
                name: file.name,
                url: file.url,
                file: file.raw
            })
        },
        handleFileRemove(file, list) {
            const idx = this.fileList.findIndex(item => item.name === file.name)
            this.fileList.splice(idx, 1)
        },
        addFile(file) {
            this.fileList.push(file)
        },
        /* 提交表单 */
        submitForm(callback) {
            this.$refs.elForm.validate(async v => {
                if (v === false) {
                    return this.$message.warning({
                        message: '表单校验失败'
                    })
                }
                callback(this.fileList)
            })
        },
        /* 重置表单信息 */
        resetForm() {
            this.$refs.elForm.resetFields()
            this.$refs.elUpload && this.$refs.elUpload[0].clearFiles()
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
                        :on-remove="handleFileRemove"
                    >
                        <template #tip v-if="others.tip || false">
                            <div>{{ others.tip }}</div>
                        </template>
                        <el-button v-if="others.uploadType" type="primary">选择上传文件</el-button>
                        <fa-icon v-else :icon="['fas', 'plus']" />
                    </el-upload>
                </template>
                <!-- 自定义组件插槽 -->
                <template v-if="item.type === 'slot'">
                    <slot :name="item.slotName" />
                </template>
            </el-form-item>
        </template>
        <!-- 操作按钮 -->
        <el-form-item v-if="hasOperation" :style="{ textAlign: optConfig.position }">
            <el-button
                v-for="btn in optConfig.options"
                v-bind="btn"
                :key="btn.text"
                @click="btn.action(btn.data)"
            >
                {{ btn.text }}
            </el-button>
        </el-form-item>
    </el-form>
</template>

<style lang="scss" scoped>
:deep(.el-range-separator) {
    width: 30PX;
}
</style>
