module.exports = class ResponseMessage {
    static get 401() {
        return '未登录或证书已过期'
    }

    static get 403() {
        return '暂无权限, 请联系管理员'
    }

    static get 9995() {
        return '请求头错误'
    }

    static get 9996() {
        return '上传参数异常'
    }

    static get 9997() {
        return '服务器错误'
    }

    static get 9998() {
        return '服务器繁忙'
    }

    static get 9999() {
        return '操作失败'
    }

    static get 10000() {
        return '操作成功'
    }
}
