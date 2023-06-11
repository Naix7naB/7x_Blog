const StatusCode = require('../plugins/statusCode')
const ResponseMessage = require('../plugins/responseMessage')

const { generateToken } = require('./token')

/**
 * 封装发送响应的工具类
 */
module.exports = class Response {
    /**
     * @description: 响应数据
     * @param {Response} res Response对象
     * @param {String} statusCode 状态码
     * @param {String} message 响应信息
     * @param {Object} data 响应的数据
     */
    static send(res, { statusCode = 'SUCCESS', message = '', data }) {
        const code = StatusCode[statusCode]
        const errMsg = message || ResponseMessage[code]
        const payload = {
            code,
            errMsg,
            data
        }
        res.status(200).send(payload)
    }

    /**
     * @description: 响应 Token 数据
     * @param {Response} res Response对象
     * @param {Object} payload 需要验证的荷载信息
     */
    static sendToken(res, { payload, message = '' }) {
        const { _id: uid, username, nickname, role } = payload
        const token = generateToken({ uid, username, nickname, role })
        Response.send(res, {
            message,
            data: {
                uid,
                username,
                nickname,
                token
            }
        })
    }
}
