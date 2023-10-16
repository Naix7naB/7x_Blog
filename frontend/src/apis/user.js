import Request from '@/utils/request'

/* 获取用户角色信息 */
function getUserRole(rid) {
    return Request.requestForm({
        methodType: Request.GET,
        url: `/api/role/${rid}`
    })
}

/* 修改用户信息 */
function modifyUserInfo(uid, info) {
    return Request.requestForm({
        methodType: Request.PUT,
        url: `/api/user/${uid}`,
        data: info
    })
}

export { getUserRole, modifyUserInfo }
