const Role = require('../models/Role')

async function getUserRole(rid) {
    const role = await Role.findById(rid)
    return role
}

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
