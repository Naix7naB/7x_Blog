const multer = require('multer')
const Response = require('../core/response')
const UniqueField = require('../plugins/uniqueField')

const { MAX_FILE_COUNT, MAX_FILE_SIZE } = require('../config/base.config')

const MULTER_ERROR_CODE = {
    LIMIT_FILE_SIZE: '上传文件超出限制大小',
    LIMIT_FILE_COUNT: '超出文件上传数量',
    LIMIT_UNEXPECTED_FILE: '上传文件发生错误'
}

module.exports = () => {
    return (err, req, res, next) => {
        let statusCode = 'FAIL',
            message,
            data
        if (err.name === 'UnauthorizedError' || err.name === 'JsonWebTokenError') {
            // 401 未授权
            statusCode = 'UNAUTHORIZED'
        } else if (err.name === 'ForbiddenError') {
            // 403 无操作权限
            statusCode = 'FORBIDDEN'
        } else if (err.name === 'NotFoundError') {
            // 404 资源不存在
            statusCode = 'NOT_FOUND'
        } else if (err.name === 'UnprocessableEntityError') {
            // 422 客户端操作错误
            message = err.message
        } else if (err instanceof multer.MulterError) {
            // 上传文件错误
            message = MULTER_ERROR_CODE[err.code]
            data = {
                limit: {
                    size: MAX_FILE_SIZE,
                    count: MAX_FILE_COUNT
                }
            }
        } else if (err.message.indexOf('duplicate key error') !== -1) {
            // 数据库字段重复错误处理
            const regexp = new RegExp(/collection:\sblog\.(\w+)\s/, 'i')
            const collection = err.message.match(regexp)[1].toUpperCase()
            const repeatKey = Object.keys(err.keyPattern)[0]
            message = `${UniqueField[collection][repeatKey]}已存在`
        } else {
            // 数据库创建模型验证错误处理
            const errKey = Object.keys(err.errors)[0]
            message = err.errors[errKey].message
        }
        Response.send(res, {
            statusCode,
            message,
            data
        })
    }
}
