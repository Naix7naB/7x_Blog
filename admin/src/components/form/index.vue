<script>
import { assignIn, isEmpty, isEqual, keys, pick } from 'lodash-es'
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
            default: 'right'
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
            raw: assignIn({}, this.data),
            showing: assignIn({}, this.data)
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
        }
    },
    methods: {
        /* 上传文件 */
        handleFileUpload(params) {
            uploadFile({
                category: this.currentCategory,
                filename: params.filename,
                file: params.file
            }).then(({ data }) => {
                const file = data.fileUrls[0]
                this.showing[file.fieldname] = file.url
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        },
        /* 删除文件 */
        onFileRemove(field, url) {
            const { filename } = parseUrl(url)
            deleteFile({ category: this.currentCategory, filename: filename }).then(res => {
                this.showing[field] = ''
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        },
        /* 提交表单 */
        submitForm(callback) {
            this.$refs.elForm.validate(v => {
                if (v === false) {
                    return this.$message.warning({
                        message: '表单校验失败'
                    })
                }
                callback(assignIn({}, this.showing), !isEqual(this.raw, this.showing))
            })
        },
        /* 设置表单数据 */
        setFormData(data) {
            const pickData = pick(data, keys(this.showing).concat('id'))
            assignIn(this.raw, pickData)
            assignIn(this.showing, pickData)
        },
        /* 重置表单信息 */
        resetFormData() {
            this.$refs.elForm.resetFields()
            this.$refs.elForm.clearValidate()
            !isEmpty(this.$refs.elUpload) && this.$refs.elUpload[0].clearFiles()
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
        :model="showing"
        hide-required-asterisk
    >
        <template v-for="{ icon, others, options, ...item } in items">
            <el-form-item v-bind="item" :style="{ textAlign: item.position }" :key="item.prop">
                <!-- 输入框 -->
                <template v-if="item.type === 'input'">
                    <el-input v-bind="item" v-model="showing[item.prop]">
                        <fa-icon v-if="icon" slot="prefix" :icon="['fas', icon]" />
                    </el-input>
                </template>
                <!-- 密码输入框 -->
                <template v-if="item.type === 'password'">
                    <el-input
                        type="password"
                        show-password
                        v-bind="item"
                        v-model="showing[item.prop]"
                    >
                        <fa-icon v-if="icon" slot="prefix" :icon="['fas', icon]" />
                    </el-input>
                </template>
                <!-- 日期范围 -->
                <template v-if="item.type === 'date'">
                    <el-date-picker
                        v-bind="others"
                        v-model="showing[item.prop]"
                        value-format="timestamp"
                        clearable
                    />
                </template>
                <!-- 下拉框 -->
                <template v-if="item.type === 'select'">
                    <el-select
                        clearable
                        v-bind="others"
                        v-model="showing[item.prop]"
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
                <!-- 切换开关 -->
                <template v-if="item.type === 'switch'">
                    <el-switch v-model="showing[item.prop]" />
                </template>
                <!-- 颜色选择器 -->
                <template v-if="item.type === 'color'">
                    <el-color-picker
                        v-bind="item"
                        v-model="showing[item.prop]"
                        color-format="rgb"
                        show-alpha
                    />
                </template>
                <!-- 文件上传 -->
                <template v-if="item.type === 'upload'">
                    <div v-if="showing[item.prop]" class="upload-image--wrapper">
                        <el-image :src="showing[item.prop]" />
                        <span v-if="!item.disabled" class="upload-actions">
                            <i
                                class="el-icon-delete"
                                @click.stop="onFileRemove(item.prop, showing[item.prop])"
                            />
                        </span>
                    </div>
                    <el-upload
                        v-if="!item.disabled"
                        action=""
                        ref="elUpload"
                        class="form-upload"
                        list-type="picture-card"
                        v-bind="others"
                        :disabled="item.disabled"
                        :show-file-list="false"
                        :http-request="handleFileUpload"
                    >
                        <template #tip v-if="others.tip || false">
                            <div>{{ others.tip }}</div>
                        </template>
                        <fa-icon :icon="['fas', 'plus']" />
                    </el-upload>
                </template>
                <!-- 自定义组件插槽 -->
                <template v-if="item.type === 'slot'">
                    <slot :name="item.slotName" :data="showing" :item="item" />
                </template>
            </el-form-item>
        </template>
    </el-form>
</template>

<style lang="scss" scoped>
:deep(.el-input) {
    min-width: 240px;
}

:deep(.el-input.is-disabled .el-input__inner) {
    color: #606266;
}

:deep(.el-range-separator) {
    width: 30px;
}

:deep(.el-image) {
    height: 100%;
    border-radius: 6px;
}

.upload-image--wrapper {
    overflow: hidden;
    position: relative;
    display: inline-block;
    height: 148px;
    margin-right: 6px;
    vertical-align: middle;
}

.upload-actions {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    background-color: rgba($color: #000, $alpha: .5);
    transition: opacity .3s;

    &::after {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
    }

    &:hover {
        opacity: 1;
    }
}

.el-icon-delete {
    padding: 4px;
    font-size: $fz-large;
    cursor: pointer;
}

.form-upload {
    display: inline-block;
    vertical-align: middle;
}
</style>
