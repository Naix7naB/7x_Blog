module.exports = class UniqueField {
    static get ROLES() {
        return {
            name: '角色名称',
            label: '角色标签 '
        }
    }

    static get USERS() {
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
