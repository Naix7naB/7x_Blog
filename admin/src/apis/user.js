import Request from '@/utils/request'

/* 获取用户列表 */
function getUserList() {
    return Request.request({
        methodType: Request.GET,
        url: '/api/user'
    })
}

/* 获取角色列表 */
function getRoleList() {
    return Request.request({
        methodType: Request.GET,
        url: '/api/role'
    })
}

export { getUserList, getRoleList }
