<script>
export default {
    props: {
        size: {
            type: String,
            default: 'default'
        },
        inline: {
            type: Boolean,
            default: false
        },
        showLabel: {
            type: Boolean,
            default: false
        },
        labelWidth: {
            type: String,
            default: '80px'
        },
        labelPosition: {
            type: String,
            default: 'left'
        },
        hideRequiredAsterisk: {
            type: Boolean,
            default: false
        },
        formData: {
            type: Object,
            required: true
        },
        formItems: {
            type: Array,
            required: true
        },
        optItems: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            showData: this.formData,
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
            this.$refs.elForm.validate(v => {
                if (v === false) {
                    return this.$message.warning({
                        message: '表单校验失败'
                    })
                }
                callback(this.fileList.length !== 0 && this.fileList)
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
    <el-form
        ref="elForm"
        :size="size"
        :inline="inline"
        :label-width="showLabel ? labelWidth : 'auto'"
        :label-position="labelPosition"
        :hide-required-asterisk="hideRequiredAsterisk"
        :model="showData"
    >
        <template v-for="{ others, options, ...item } in formItems">
            <el-form-item v-bind="item" :style="{ textAlign: item.position }" :key="item.prop">
                <!-- 输入框 -->
                <template v-if="item.type === 'input'">
                    <el-input
                        clearable
                        v-model="showData[item.prop]"
                        :placeholder="item.placeholder"
                    >
                        <fa-icon v-if="item.icon" slot="prefix" :icon="['fas', item.icon]" />
                    </el-input>
                </template>
                <!-- 密码输入框 -->
                <template v-if="item.type === 'password'">
                    <el-input
                        type="password"
                        show-password
                        v-model="showData[item.prop]"
                        :placeholder="item.placeholder"
                    >
                        <fa-icon v-if="item.icon" slot="prefix" :icon="['fas', item.icon]" />
                    </el-input>
                </template>
                <!-- 日期范围 -->
                <template v-if="item.type === 'date'">
                    <el-date-picker v-bind="others" v-model="showData[item.prop]" clearable />
                </template>
                <!-- 下拉框 -->
                <template v-if="item.type === 'select'">
                    <el-select
                        clearable
                        v-bind="others"
                        v-model="showData[item.prop]"
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
                    <el-switch v-model="showData[item.prop]" />
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
                <!-- 操作按钮 -->
                <template v-if="item.type === 'opt'">
                    <el-button
                        v-for="{ action, ...btnConf } in optItems"
                        v-bind="btnConf"
                        :key="btnConf.text"
                        @click="action(showData)"
                    >
                        {{ btnConf.text }}
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
    width: 30px;
}
</style>
