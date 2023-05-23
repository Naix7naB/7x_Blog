<script>
export default {
  props: {
    formData: {
      type: Object,
      default: null
    },
    labelWidth: {
      type: String,
      default: '80px'
    },
    size: {
      type: String,
      default: 'default'
    },
    formItems: {
      type: Array,
      required: true
    }
  },
  computed: {
    customFormData() {
      return this.formData
    }
  },
  watch: {
    customFormData: {
      handler(newData) {
        this.$emit('updateFormData', newData)
      },
      deep: true
    }
  },
  methods: {
    handleExceed() {
      console.log('超出上传文件限制!')
    },
    handleChange(file, list) {
      // this.customFormData
      console.log(file, list)
    },
    handleRemove(file, list) {
      console.log(file, list)
    }
  }
}
</script>

<template>
  <el-form :label-width="labelWidth" :size="size" :model="customFormData">
    <el-row>
      <template v-for="item in formItems">
        <el-col :key="item.label">
          <el-form-item v-bind="item">
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
              <el-date-picker clearable v-bind="item.others" v-model="customFormData[item.prop]" />
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
            <!-- 图片上传 -->
            <template v-if="item.type === 'uploadImg'">
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :limit="item.limit || 1"
                :on-exceed="handleExceed"
                :on-change="handleChange"
                :on-remove="handleRemove"
              >
                <template #tip v-if="item.others?.tip || false">
                  <div>{{ item.others.tip }}</div>
                </template>
                <fa-icon :icon="['fas', 'plus']" />
              </el-upload>
            </template>
            <!-- 文件上传 -->
            <template v-if="item.type === 'uploadFile'">
              <el-upload
                action="#"
                :limit="item.limit || 1"
                :auto-upload="false"
                :on-exceed="handleExceed"
                :on-change="handleChange"
                :on-remove="handleRemove"
              >
                <el-button type="primary">选择上传文件</el-button>
                <template #tip v-if="item.others?.tip || false">
                  <div>{{ item.others.tip }}</div>
                </template>
              </el-upload>
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<style lang="scss" scoped></style>
