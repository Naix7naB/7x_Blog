import Request from '@/utils/request'

/* 获取用户角色信息 */
function getUserRole(rid) {
    return Request.requestForm({
        methodType: Request.GET,
        url: `/api/role/${rid}`
    })
}

export { getUserRole }
