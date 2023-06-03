module.exports = class Field {
    static get USER() {
        return {
            username: '用户名',
            password: '密码',
            nickname: '昵称',
            email: '邮箱'
        }
    }

    static get TAGS() {
        return {
            name: '标签'
        }
    }
}
