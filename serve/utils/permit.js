const Role = require('../models/Role')

async function getUserRole(rid) {
    const role = await Role.findById(rid)
    return role
}

/**
 * @description: 查看用户是否有操作权限
 * @param {Object} payload
 * @param {String} payload.opt 操作方式 'POST' | 'PUT' | 'DELETE'
 * @param {String[]} payload.permission 许可列表
 * @param {String} payload.rid 用户角色id
 * @param {String} payload.uid 用户id
 * @param {String} payload.authId 验证id
 * @return {Boolean} true | false
 */
async function hasPermission({ opt, permission, rid, uid = null, authId = null }) {
    const { name: role } = await getUserRole(rid)
    if (opt === 'POST') {
        return permission.includes('*') || permission.includes(role)
    }
    if (opt === 'PUT' || opt === 'DELETE') {
        if (role === 'root') return true
        return uid === authId ? true : false
    }
    return false
}

module.exports = hasPermission
