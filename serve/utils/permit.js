const Role = require('../models/Role')

async function getUserRole(rid) {
    const role = await Role.findById(rid)
    return role
}

async function hasPermission({ rid, opt, uid = null, authId = null }) {
    const { name: role } = await getUserRole(rid)
    if (role === 'root') {
        return true
    }
    if (role === 'admin') {
        if (opt === 'POST') return true
        if (uid && authId) return uid === authId ? true : false
    }
    return false
}

module.exports = hasPermission
