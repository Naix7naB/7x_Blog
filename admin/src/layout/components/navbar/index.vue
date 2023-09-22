<script>
import Popup from '@/components/popup'
import BaseForm from '@/components/form'

import { changePassword, modifyUserById } from '@/apis/user'
import { mapActions } from 'vuex'
import { encrypt } from '@/utils'
import { isEqual } from 'lodash-es'

export default {
    name: 'Navbar',
    components: { Popup, BaseForm },
    data() {
        return {
            popupTitle: '',
            execution: null
        }
    },
    computed: {
        dropdownList() {
            return [
                {
                    icon: 'user',
                    text: '个人资料',
                    action: this.checkPersonalInfo
                },
                {
                    icon: 'unlock',
                    text: '修改密码',
                    action: this.modifyPassword
                },
                {
                    icon: 'arrow-right-from-bracket',
                    text: '退出',
                    action: this.logout
                }
            ]
        },
        currentFormConfig() {
            return this.popupTitle === '个人资料' ? this.personalForm : this.passwordForm
        },
        personalForm() {
            return {
                data: {
                    avatar: '',
                    username: '',
                    nickname: '',
                    email: '',
                    uid: ''
                },
                items: [
                    {
                        type: 'upload',
                        prop: 'avatar',
                        label: '头像',
                        others: {
                            name: 'avatar',
                            multiple: false
                        }
                    },
                    {
                        type: 'input',
                        prop: 'username',
                        label: '账号',
                        disabled: true
                    },
                    {
                        type: 'input',
                        prop: 'nickname',
                        label: '昵称',
                        placeholder: '输入昵称',
                        rules: [{ required: true, message: '昵称不能为空', trigger: 'blur' }]
                    },
                    {
                        type: 'input',
                        prop: 'email',
                        label: '邮箱',
                        placeholder: '输入邮箱',
                        rules: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }]
                    }
                ]
            }
        },
        passwordForm() {
            return {
                data: {
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                },
                items: [
                    {
                        type: 'password',
                        prop: 'oldPassword',
                        label: '旧密码',
                        placeholder: '请输入旧密码',
                        rules: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
                    },
                    {
                        type: 'password',
                        prop: 'newPassword',
                        label: '新密码',
                        placeholder: '请输入新密码',
                        rules: [{ required: true, trigger: 'blur', validator: this.notEqualToPwd }]
                    },
                    {
                        type: 'password',
                        prop: 'confirmPassword',
                        label: '确认密码',
                        placeholder: '请确认密码',
                        rules: [{ required: true, trigger: 'blur', validator: this.confirmPwd }]
                    }
                ]
            }
        }
    },
    methods: {
        ...mapActions('user', ['loadKey', 'setUserInfo']),
        /* 表单验证规则 */
        notEqualToPwd(rule, value, callback) {
            const formData = this.$refs.form.showing
            if (value.trim() && !isEqual(formData.oldPassword, value)) {
                callback()
            } else if (!value.trim()) {
                callback(new Error('新密码不能为空'))
            } else {
                callback(new Error('新密码不能与原密码一致'))
            }
        },
        confirmPwd(rule, value, callback) {
            const formData = this.$refs.form.showing
            if (value.trim() && isEqual(formData.newPassword, value)) {
                callback()
            } else if (!value.trim()) {
                callback(new Error('确认密码不能为空'))
            } else {
                callback(new Error('两次输入的密码不一致'))
            }
        },
        /* 查看用户个人资料 */
        checkPersonalInfo() {
            const modifyInfo = () => {
                this.$refs.form.submitForm((data, hasModify) => {
                    if (hasModify === false) return false
                    modifyUserById(data.uid, data).then(res => {
                        this.setUserInfo(data)
                        this.$message.success(res.errMsg)
                    }).catch(err => {
                        this.$message.error(err.errMsg || err)
                    })
                })
            }
            this.openPopup('个人资料', modifyInfo)
            this.setFormData(this.$store.getters.userInfo)
        },
        /* 修改用户密码 */
        modifyPassword() {
            const modifyPassword = () => {
                this.$refs.form.submitForm(async data => {
                    /* 获取加密密钥 处理表单数据 */
                    await this.loadKey()
                    const encryptKey = this.$store.getters.key
                    const encryptData = Object.fromEntries(
                        Object.entries(data).map(([key, val]) => {
                            return [key, encrypt(val, encryptKey)]
                        })
                    )
                    /* 修改密码 */
                    changePassword(encryptData).then(res => {
                        this.$msgbox({
                            title: res.errMsg,
                            message: '密码已修改, 请重新登陆账号',
                            type: 'warning',
                            callback: () => {
                                this.logout()
                            }
                        })
                    }).catch(err => {
                        this.$message.error(err.errMsg || err)
                    })
                })
            }
            this.openPopup('修改密码', modifyPassword)
        },
        /* 用户退出登陆 */
        logout() {
            this.$store.dispatch('user/clearUserInfo')
            this.$store.dispatch('article/clearArticleInfo')
            this.$router.push('/login')
        },
        /* 设置表单数据 */
        setFormData(data) {
            this.$nextTick(() => this.$refs.form.setFormData(data))
        },
        /* 重置表单数据 */
        resetFormData() {
            this.$refs.form.resetFormData()
        },
        /* 打开弹窗 */
        openPopup(text, fn) {
            this.popupTitle = text
            this.execution = fn
            this.$refs.popup.open()
        },
        /* 弹窗点击取消按钮 */
        onBeforePopupCancel(done) {
            this.resetFormData()
            done()
        },
        /* 弹窗点击确认按钮 */
        onBeforePopupConfirm(done) {
            this.execution()
            this.resetFormData()
            done()
        }
    }
}
</script>

<template>
    <div class="navbar-wrap">
        <div class="navbar-notify">
            <el-badge value="2">
                <fa-icon :icon="['fas', 'bell']" />
            </el-badge>
        </div>
        <el-dropdown class="navbar-dropdown">
            <el-avatar :src="$store.getters.userInfo?.avatar">
                <fa-icon icon="fas fa-user" />
            </el-avatar>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                    v-for="dropdown in dropdownList"
                    :key="dropdown.text"
                    @click.native="dropdown.action"
                >
                    <fa-icon class="dropdown-icon" :icon="['fas', dropdown.icon]" />
                    <span>{{ dropdown.text }}</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <Popup
            ref="popup"
            :title="popupTitle"
            @beforePopupCancel="onBeforePopupCancel"
            @beforePopupConfirm="onBeforePopupConfirm"
        >
            <BaseForm ref="form" v-bind="currentFormConfig" />
        </Popup>
    </div>
</template>

<style lang="scss" scoped>
.navbar-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
}

.navbar-notify,
.navbar-dropdown {
    margin: 0 16px;
    cursor: pointer;
}

.navbar-dropdown {
    display: flex;
    align-items: center;
    font-size: $fz-medium-x;
}

.dropdown-icon {
    margin-right: 6px;
}
</style>
