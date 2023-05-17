const mongoose = require('mongoose')
const createError = require('http-errors')

const { protocols, host, port, name } = require('../config/db.config')

const DB_URL = `${protocols}://${host}:${port}/${name}`

mongoose.connect(DB_URL, err => {
  if (err) {
    createError(err)
  } else {
    console.log(`==> ${DB_URL} | 数据库已连接`)
  }
})

module.exports = mongoose
