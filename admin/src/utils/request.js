/**
 * 封装 http 请求
 * 挂载在 Vue 实例上
 * 通过 Vue.$http 来调用
 */
import http from '@/apis/http'

export default class Request {
    static GET() {
        return 1
    }
    static POST() {
        return 2
    }
    static PUT() {
        return 3
    }
    static DELETE() {
        return 4
    }

    /**
     * @description: 发送请求
     * @param methodType 请求方式, 如 Request.GET
     * @param url 请求地址
     * @param data 上传数据
     * @param options [可选]其他配置项
     * @return {Promise} 请求发送后的Promise对象
     */
    static request({ methodType, url, data, upType, options = null }) {
        const config = {
            url,
            upType,
            ...options
        }
        switch (methodType) {
            case Request.GET:
                config.method = 'GET'
                config.params = data
                break
            case Request.POST:
                config.method = 'POST'
                config.data = data
                break
            case Request.PUT:
                config.method = 'PUT'
                config.data = data
                break
            case Request.DELETE:
                config.method = 'DELETE'
                config.data = data
                break
        }
        return http.request(config)
    }

    static requestForm({ methodType, url, data, options = null }) {
        return Request.request({ methodType, url, data, upType: http.upType.form, options })
    }

    static requestJson({ methodType, url, data, options = null }) {
        return Request.request({ methodType, url, data, upType: http.upType.json, options })
    }

    static postFile({ url, data, options = null }) {
        const formData = new FormData()
        Object.entries(data).forEach(([field, value]) => {
            formData.append(field, value)
        })
        return Request.request({
            methodType: Request.POST,
            url,
            data: formData,
            upType: http.upType.file,
            options
        })
    }
}
