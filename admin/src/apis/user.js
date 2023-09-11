import Request from '@/utils/request'

/* 获取用户列表 */
function getUserList(data) {
    return Request.requestForm({
        methodType: Request.GET,
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

export { getUserList, getRoleList, createRole, modifyRoleById, deleteRoleById }
