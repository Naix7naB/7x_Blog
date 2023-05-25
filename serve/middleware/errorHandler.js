const Field = require('../utils/field')
const Response = require('../plugins/response')

const { formatDate } = require('../utils/rsa')

module.exports = () => {
    return (err, req, res) => {
        let statusCode = 'FAIL',
            message,
            data
        if (err.name === 'UnauthorizedError') {
            statusCode = 'UNAUTHORIZED'
            data = 'jwt expired at ' + formatDate(err.inner.expiredAt, 'YYYY-MM-DD hh:mm:ss')
        } else if (err.name === 'UnprocessableEntityError') {
            message = err.message
        } else if (err.message.indexOf('duplicate key error') !== -1) {
            // 数据库验证错误处理
            const repeatKey = Object.keys(err.keyPattern)[0].toUpperCase()
            message = `${Field[repeatKey]}已存在`
        } else {
            console.log(err)
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
