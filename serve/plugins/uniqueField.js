module.exports = class UniqueField {
    static get USER() {
        return {
            username: '用户名',
            email: '邮箱'
        }
    }

    static get TAGS() {
        return {
            name: '标签'
        }
    }
}
