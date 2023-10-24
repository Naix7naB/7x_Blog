import Request from '@/utils/request'

/* 获取用户列表 */
function getUserList(data) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/user',
        data
    })
}

/* 修改用户密码 */
function changePassword(data) {
    return Request.requestForm({
        methodType: Request.PUT,
        url: '/user/changePwd',
        data
    })
}

/* 根据用户ID修改用户信息 */
function modifyUserById(id, data) {
    return Request.requestForm({
        methodType: Request.PUT,
        url: `/api/user/${id}`,
        data
    })
}

/* 根据用户ID删除用户 */
function deleteUserById(id) {
    return Request.requestForm({
        methodType: Request.DELETE,
        url: `/api/user/${id}`
    })
}

/* 批量删除用户 */
function deleteUsersInBulk(data) {
    return Request.requestJson({
        methodType: Request.DELETE,
        url: '/api/user',
        data
    })
}

/* 获取角色列表 */
function getRoleList(data) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/role',
        data
    })
}

/* 创建用户角色 */
function createRole(data) {
    return Request.requestForm({
        methodType: Request.POST,
        url: '/api/role',
        data
    })
}

/* 根据角色ID修改角色信息 */
function modifyRoleById(id, data) {
    return Request.requestForm({
        methodType: Request.PUT,
        url: `/api/role/${id}`,
        data
    })
}

/* 根据角色ID删除用户角色 */
function deleteRoleById(id) {
    return Request.requestForm({
        methodType: Request.DELETE,
        url: `/api/role/${id}`
    })
}

/* 批量删除用户角色 */
function deleteRolesInBulk(data) {
    return Request.requestJson({
        methodType: Request.DELETE,
        url: '/api/role',
        data
    })
}

export {
    getUserList,
    changePassword,
    modifyUserById,
    deleteUserById,
    deleteUsersInBulk,
    getRoleList,
    createRole,
    modifyRoleById,
    deleteRoleById,
    deleteRolesInBulk
}
