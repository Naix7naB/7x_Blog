<script>
import { uploadFile, deleteFile } from '@/apis/upload'
import { parseUrl } from '@/utils'

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
            showData: this.data,
            fileList: [],
            categories: {
                article: 'cover_img',
                user: 'avatar'
            }
        }
    },
    computed: {
        routes() {
            return this.$router.options.routes
        },
        currentCategory() {
            const currentPath = this.$route.path
            const idx = this.routes.findIndex(route => {
                const pathRegex = new RegExp(`^${route.path}/(.+)`)
                return pathRegex.test(currentPath)
            })
            return this.routes[idx].meta['category']
        },
        fieldname() {
            return this.categories[this.currentCategory]
        }
    },
    methods: {
        /* 上传文件 */
        handleFileUpload(params) {
            uploadFile({
                classify: this.currentCategory,
                filename: params.filename,
                file: params.file
            }).then(({ data }) => {
                data.fileUrls.forEach(file => {
                    this.showData[file.fieldname] = file.pathname
                    this.fileList.push({
                        field: file.fieldname,
                        name: file.filename,
                        url: file.url
                    })
                })
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        },
        /* 超出上传限制 */
        onFileExceed() {
            this.$message.warning('超出文件上传限制')
        },
        /* 删除文件之前 */
        onBeforeFileRemove(file) {
            const idx = this.fileList.findIndex(item => item.name === file.name)
            if (idx === -1) {
                this.$message.error('删除失败')
                return false
            }
            this.fileList.splice(idx, 1)
            return true
        },
        /* 删除文件 */
        onFileRemove(file) {
            deleteFile({ classify: this.currentCategory, filename: file.name }).then(() => {
                this.showData[file.field] = ''
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        },
        /* 添加文件 */
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
                callback(this.showData)
            })
        },
        /* 设置表单数据 */
        setFormData(data) {
            Object.assign(this.showData, data)
            if (this.fieldname && Object.prototype.hasOwnProperty.call(this.showData, this.fieldname)) {
                const { filename, href } = parseUrl(this.showData[this.fieldname])
                this.addFile({
                    field: this.fieldname,
                    name: filename,
                    url: href
                })
            }
        },
        /* 重置表单信息 */
        resetFormData() {
            this.$refs.elForm.resetFields()
            this.$refs.elUpload && this.$refs.elUpload[0].clearFiles()
            this.fileList = []
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
        <template v-for="{ others, options, ...item } in items">
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
                        :name="fieldname"
                        :file-list="fileList"
                        :http-request="handleFileUpload"
                        :on-exceed="onFileExceed"
                        :before-remove="onBeforeFileRemove"
                        :on-remove="onFileRemove"
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
                    <slot :name="item.slotName" :data="showData" :item="item" />
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
