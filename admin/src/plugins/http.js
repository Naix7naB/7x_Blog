/**
 * 对 axios 进行二次封装
 */

import http from 'axios'
import store from '@/store'

http.defaults.baseURL = process.env.VUE_APP_BASE_URL
http.defaults.timeout = 5000

http.upType = {
    form: 0,
    json: 1,
    file: 2
}

/**
 * http状态码
 *  UNAUTHORIZED: 401 - (未登录 or token失效)
 *  FORBIDDEN: 403 - (无权限)
 *  CONTENT_TYPE_ERR: 9995 - (请求头错误)
 *  PARAMS_INVALID: 9996 - (上传参数异常)
 *  SERVER_ERROR: 9997 - (服务器错误)
 *  SERVER_BUSY: 9998 - (服务器繁忙)
 *  FAIL: 9999 - (操作失败)
 *  SUCCESS: 10000 - (操作成功)
 */
http.statusCode = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    CONTENT_TYPE_ERR: 9995,
    PARAMS_INVALID: 9996,
    SERVER_ERROR: 9997,
    SERVER_BUSY: 9998,
    FAIL: 9999,
    SUCCESS: 10000
}

export default instance => {
    // 请求拦截器
    http.interceptors.request.use(
        config => {
            const token = store.getters['user/getToken']
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token
            }
            if (config.upType === http.upType.json) {
                config.headers['Content-Type'] = 'application/json;charset=UTF-8'
            }
            if (config.upType === http.upType.file) {
                config.headers['Content-Type'] = 'multipart/form-data;charset=UTF-8'
            }
            if (config.upType === http.upType.form) {
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
            }
            return config
        },
        err => {
            console.error(err)
        }
    )
    // 响应拦截器
    http.interceptors.response.use(
        response => {
            if (response.status === 200) {
                if ('code' in response.data) {
                    const data = response.data
                    switch (data.code) {
                        case http.statusCode.SUCCESS:
                            return Promise.resolve(data)
                        case http.statusCode.UNAUTHORIZED:
                            if (data.data.indexOf('jwt expired at') >= 0) {
                                instance.$router.push('/login')
                            }
                            return Promise.reject(data)
                        case http.statusCode.FORBIDDEN:
                        case http.statusCode.FAIL:
                        default:
                            return Promise.reject(data)
                    }
                }
                return Promise.resolve(response)
            }
            return Promise.reject(response)
        },
        err => {
            console.error(err)
        }
    )
}
