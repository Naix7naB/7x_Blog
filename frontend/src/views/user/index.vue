<script>
import { uploadAvatar, modifyUserInfo } from '@/apis/user'
import { goToPath } from '@/utils/util'
import { cloneDeep, isEqual } from 'lodash-es'

export default {
    data() {
        return {
            raw: null,
            user: {
                avatar: '',
                username: '',
                nickname: '',
                email: '',
                gender: 0,
                intro: ''
            }
        }
    },
    computed: {
        uid() {
            return this.$store.getters.uid
        },
        isModified() {
            return !isEqual(this.raw, this.user)
        }
    },
    methods: {
        /* 初始化用户信息 */
        initUserInfo() {
            const info = this.$store.getters.userInfo
            this.user = cloneDeep(info)
            this.raw = cloneDeep(info)
        },
        /* 上传头像 */
        upload(req) {
            uploadAvatar({
                filename: req.filename,
                file: req.file
            }).then(({ data }) => {
                this.user.avatar = data.fileUrls[0].url
                this.$message.success('头像上传成功!')
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        },
        /* 取消修改 */
        cancel() {
            goToPath({ target: -1 })
        },
        /* 提交修改 */
        submit() {
            if (!this.isModified) return false
            modifyUserInfo(this.uid, this.user).then(() => {
                this.raw = cloneDeep(this.user)
                this.$store.dispatch('user/setUserInfo', this.user)
                this.$message.success('用户信息已修改')
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        }
    },
    created() {
        this.initUserInfo()
    },
    beforeRouteLeave(to, from , next) {
        if (!this.isModified) return false
        this.$msgbox.confirm('当前页面内容未保存, 是否离开？', {
            type: 'warning',
            title: '提示',
            cancelButtonText: '否',
            confirmButtonText: '是',
            callback: action => {
                if (action === 'confirm') {
                    this.submit()
                    next()
                }
            }
        })
    }
}
</script>

<template>
    <div class="user-page">
        <el-image class="is-background" fit="cover" src="https://t.mwm.moe/fj" />
        <div class="user-info--container">
            <div class="user-info--item">
                <span class="user-info--label">头像: </span>
                <el-upload
                    action=""
                    name="avatar"
                    list-type="picture-card"
                    :multiple="false"
                    :limit="1"
                    :show-file-list="false"
                    :http-request="upload"
                >
                    <el-avatar fit="cover" shape="square" :size="148" :src="user.avatar" />
                </el-upload>
            </div>
            <div class="user-info--item">
                <span class="user-info--label">用户名: </span>
                <el-input type="text" v-model="user.username" readonly />
            </div>
            <div class="user-info--item">
                <span class="user-info--label">昵称: </span>
                <el-input type="text" v-model="user.nickname" />
            </div>
            <div class="user-info--item">
                <span class="user-info--label">邮箱: </span>
                <el-input type="text" v-model="user.email" />
            </div>
            <div class="user-info--item">
                <span class="user-info--label">性别: </span>
                <el-radio-group v-model="user.gender">
                    <el-radio :label="0">未知</el-radio>
                    <el-radio :label="1">男♂</el-radio>
                    <el-radio :label="2">女♀</el-radio>
                </el-radio-group>
            </div>
            <div class="user-info--item">
                <span class="user-info--label">个人简介: </span>
                <el-input
                    type="textarea"
                    v-model="user.intro"
                    :rows="5"
                    :minlength="0"
                    :maxlength="80"
                    resize="none"
                    show-word-limit
                    clearable
                />
            </div>
            <div class="user-info--actions">
                <el-button size="medium" @click="cancel">取消</el-button>
                <el-button type="primary" size="medium" @click="submit">保存</el-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
:deep(.el-input) {
    width: 40%;
}

:deep(.el-input .el-input__inner) {
    height: inherit;
    line-height: inherit;
    padding: 0;
    border: 0;
    background-color: transparent;
    transition: none;
}

:deep(.el-input__icon) {
    line-height: inherit;
}

:deep(.el-upload.el-upload--picture-card) {
    border: 0;
}

/* 用户信息页面样式 */
.user-page {
    @include fullscreen();
}

.user-info--container {
    opacity: .93;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 72%;
    padding: 40px 60px;
    min-width: 400px;
    min-height: 360px;
    max-width: 980px;
    max-height: 940px;
    background-color: $cl-light-1;
    transform: translate(-50%, -50%);
}

.user-info--item {
    display: flex;
    line-height: $lh-md;
    color: $cl-dark-5;

    &:not(:first-of-type) {
        margin-top: 20px;
    }
}

.user-info--label {
    flex-shrink: 0;
    width: 100px;
    text-align: center;
}

.user-info--actions {
    position: absolute;
    right: 40px;
    bottom: 40px;
}
</style>
