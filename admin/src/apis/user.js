import Request from '@/utils/request'

/* 获取用户列表 */
function getUserList({ page, size } = {}) {
    return Request.request({
        methodType: Request.GET,
        url: '/api/user',
        data: {
            page,
            size
        }
    })
}

/* 获取角色列表 */
function getRoleList({ page, size } = {}) {
    return Request.request({
        methodType: Request.GET,
        url: '/api/role',
        data: {
            page,
            size
        }
    })
}

export { getUserList, getRoleList }
