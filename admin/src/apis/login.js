import Request from '@/utils/request'

/* 获取加密密钥 */
function getKey() {
    return Request.request({
        methodType: Request.GET,
        url: '/admin/key'
    })
}

/* 登录 */
function login(data) {
    return Request.requestForm({
        methodType: Request.POST,
        url: '/admin/login',
        data
    })
}

/* 注册 */
function register(data) {
    return Request.requestForm({
        methodType: Request.POST,
        url: '/admin/register',
        data
    })
}

export { getKey, login, register }
