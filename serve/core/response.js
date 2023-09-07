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
     * @param {Object} responseBody 响应体内容
     * @param {String} responseBody.statusCode 状态码
     * @param {String} responseBody.message 响应信息
     * @param {Object} responseBody.data 响应的数据
     */
    static send(res, { statusCode = 'SUCCESS', message = '', data } = {}) {
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
     * @param {Object} responseBody 响应体内容
     * @param {Object} responseBody.payload token载体
     * @param {Object} responseBody.message 响应信息
     */
    static sendToken(res, { payload, message = '' }) {
        const { id: uid, role: rid, username, nickname, email, avatar } = payload
        const token = generateToken({ uid, rid, username, nickname })
        Response.send(res, {
            message,
            data: {
                uid,
                rid,
                username,
                nickname,
                email,
                avatar,
                token
            }
        })
    }
}
