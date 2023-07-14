/**
 * 对 axios 进行二次封装
 * 对 http 请求/响应 统一处理
 */

import axios from 'axios'
import store from '@/store'
import router from '@/router'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 5000
})

/**
 * 请求类型
 * form: 0 - 表单
 * json: 1 - JSON数据
 * file: 2 - 文件
 */
service.upType = {
    form: 0,
    json: 1,
    file: 2
}

/**
 * http状态码
 *  UNAUTHORIZED: 401 - (未登录 or token失效)
 *  FORBIDDEN: 403 - (无权限)
 *  NOT_FOUND: 404 - (资源不存在)
 *  CONTENT_TYPE_ERR: 9995 - (请求头错误)
 *  PARAMS_INVALID: 9996 - (上传参数异常)
 *  SERVER_ERROR: 9997 - (服务器错误)
 *  SERVER_BUSY: 9998 - (服务器繁忙)
 *  FAIL: 9999 - (操作失败)
 *  SUCCESS: 10000 - (操作成功)
 */
service.statusCode = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONTENT_TYPE_ERR: 9995,
    PARAMS_INVALID: 9996,
    SERVER_ERROR: 9997,
    SERVER_BUSY: 9998,
    FAIL: 9999,
    SUCCESS: 10000
}

// 请求拦截器
service.interceptors.request.use(
    config => {
        const token = store.getters['user/getToken']
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        if (config.upType === service.upType.json) {
            config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        }
        if (config.upType === service.upType.file) {
            config.headers['Content-Type'] = 'multipart/form-data;charset=UTF-8'
        }
        if (config.upType === service.upType.form) {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
        }
        return config
    },
    err => {
        console.error(err)
    }
)
// 响应拦截器
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if ('code' in response.data) {
                const data = response.data
                switch (data.code) {
                    case service.statusCode.SUCCESS:
                        return Promise.resolve(data)
                    case service.statusCode.UNAUTHORIZED:
                        router.push({ name: 'Login' })
                        return Promise.reject(data)
                    case service.statusCode.FORBIDDEN:
                    case service.statusCode.FAIL:
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

export default service
