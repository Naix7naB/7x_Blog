const multer = require('multer')

const Field = require('../utils/field')
const Response = require('../plugins/response')

const ERROR_CODE_MAP = {
  LIMIT_FILE_SIZE: '超出文件限制大小',
  LIMIT_FILE_COUNT: '超出文件限制上传数量',
  LIMIT_UNEXPECTED_FILE: '文件上传失败'
}

const ERROR_STATUS_MAP = {
  401: '请先登录后操作',
  403: '暂无权限,请联系管理员'
}

module.exports = () => {
  return (err, req, res, next) => {
    let statusCode = 'FAIL', message = ''
    if (err.name === 'UnauthorizedError') {
      statusCode = 'UNAUTHORIZED'
    }
    // 数据库验证错误处理
    if (err.message.indexOf('duplicate key error') !== -1) {
      const repeatKey = Object.keys(err.keyPattern)[0].toUpperCase()
      message = `${Field[repeatKey]}已存在`
    } else {
      const errKey = Object.keys(err.errors)[0]
      message = err.errors[errKey].message
    }
    // if (err instanceof multer.MulterError) {
    //   err.status = 422
    //   err.message = ERROR_CODE_MAP[err.code]
    // }
    // if (err.status in ERROR_STATUS_MAP) {
    //   err.message = ERROR_STATUS_MAP[err.status]
    // }
    Response.send(res, {
      statusCode,
      message
    })
  }
}
