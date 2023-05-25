module.exports = class StatusCode {
    static get UNAUTHORIZED() {
        return 401
    }

    static get FORBIDDEN() {
        return 403
    }

    static get CONTENT_TYPE_ERR() {
        return 9995
    }

    static get PARAMS_INVALID() {
        return 9996
    }

    static get SERVER_ERROR() {
        return 9997
    }

    static get SERVER_BUSY() {
        return 9998
    }

    static get FAIL() {
        return 9999
    }

    static get SUCCESS() {
        return 10000
    }
}
