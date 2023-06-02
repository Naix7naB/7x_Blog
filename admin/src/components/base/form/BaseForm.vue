<script>
export default {
    props: {
        formData: {
            type: Object,
            default: null
        },
        formItems: {
            type: Array,
            required: true
        },
        labelWidth: {
            type: String,
            default: '80px'
        },
        size: {
            type: String,
            default: 'default'
        },
        inline: {
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
        uploadFile(cb) {
            cb(this.fileList)
        },
        handleExceed() {
            this.$notify({
                type: 'error',
                message: '超出文件上传限制'
            })
        },
        handleChange(file, list) {
            this.fileList = list
        },
        resetForm() {
            this.$refs.elForm.resetFields()
            this.$refs.elUpload[0].clearFiles()
        }
    }
}
</script>

<template>
    <el-form
        ref="elForm"
        :label-width="labelWidth"
        :size="size"
        :inline="inline"
        :model="customFormData"
    >
        <template v-for="item in formItems">
            <el-form-item v-bind="item" :key="item.label">
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
                    <el-date-picker
                        clearable
                        :placeholder="item.placeholder || '选择日期'"
                        :start-placeholder="item.startPlaceholder || '开始日期'"
                        :end-placeholder="item.endPlaceholder || '结束日期'"
                        :range-separator="item.rangeSep || '至'"
                        v-bind="item.others"
                        v-model="customFormData[item.prop]"
                    />
                </template>
                <!-- 下拉框 -->
                <template v-if="item.type === 'select'">
                    <el-select
                        clearable
                        v-bind="item.others"
                        v-model="customFormData[item.prop]"
                        :placeholder="item.placeholder"
                    >
                        <el-option
                            v-for="optionItem in item.options"
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
                <!-- 多选 -->
                <!-- <template v-if="item.type === 'checkbox'">
              <el-checkbox
                v-if="item.otherOptions && item.otherOptions.showAll"
                v-model="checkAll"
                :indeterminate="isIndeterminate"
              >
                全选
              </el-checkbox>
              <el-checkbox-group>
                <el-checkbox
                  v-for="optionItem in item.options"
                  :key="optionItem.label"
                  :label="optionItem.value"
                  name="type"
                >
                  {{ optionItem.label }}
                </el-checkbox>
              </el-checkbox-group>
            </template> -->
                <!-- 单选 -->
                <!-- <template v-if="item.type === 'radio'">
              <el-radio-group
                :model-value="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
              >
                <el-radio
                  :label="optionItem.value"
                  v-for="optionItem in item.options"
                  :key="optionItem.label"
                >
                  {{ optionItem.label }}
                </el-radio>
              </el-radio-group>
            </template> -->
                <!-- 文本框 -->
                <!-- <template v-if="item.type === 'textarea'">
              <el-input
                type="textarea"
                :model-value="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
              />
            </template> -->
                <!-- 文件上传 -->
                <template v-if="item.type === 'upload'">
                    <el-upload
                        ref="elUpload"
                        action="#"
                        multiple
                        :limit="item.limit || 1"
                        :list-type="item.uploadType ? 'text' : 'picture-card'"
                        :auto-upload="false"
                        :file-list="fileList"
                        :on-exceed="handleExceed"
                        :on-change="handleChange"
                        :on-remove="handleChange"
                    >
                        <template #tip v-if="item.others?.tip || false">
                            <div>{{ item.others.tip }}</div>
                        </template>
                        <el-button v-if="item.uploadType" type="primary"> 选择上传文件 </el-button>
                        <fa-icon v-else :icon="['fas', 'plus']" />
                    </el-upload>
                </template>
                <!-- 自定义组件插槽 -->
                <template v-if="item.type === 'slot'">
                    <slot :name="item.slotName" />
                </template>
            </el-form-item>
        </template>
    </el-form>
</template>

<style lang="scss" scoped></style>
