const Field = require('../utils/field')
const Response = require('../core/response')

const { formatDate } = require('../utils/helpers')

module.exports = () => {
    return (err, req, res, next) => {
        let statusCode = 'FAIL',
            message,
            data
        if (err.name === 'UnauthorizedError') {
            statusCode = 'UNAUTHORIZED'
            data = 'jwt expired at ' + formatDate(err.inner.expiredAt, 'YYYY-MM-DD hh:mm:ss')
        } else if (err.name === 'ForbiddenError') {
            statusCode = 'FORBIDDEN'
        } else if (err.name === 'UnprocessableEntityError') {
            message = err.message
        } else if (err.message.indexOf('duplicate key error') !== -1) {
            // 数据库字段重复错误处理
            const regexp = new RegExp(/collection:\sblog\.(\w+)\s/, 'i')
            const collection = err.message.match(regexp)[1].toUpperCase()
            const repeatKey = Object.keys(err.keyPattern)[0]
            message = `${Field[collection][repeatKey]}已存在`
        } else {
            // 数据库创建模型验证错误处理
            console.log(err)
            const errKey = Object.keys(err.errors)[0]
            message = err.errors[errKey].message
            console.dir(err.errors, { deepth: null })
        }
        Response.send(res, {
            statusCode,
            message,
            data
        })
    }
}
