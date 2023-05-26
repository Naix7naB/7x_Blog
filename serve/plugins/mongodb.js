const mongoose = require('mongoose')
const createError = require('http-errors')

const { protocol, host, port, name } = require('../config/db.config')

const DB_URL = `${protocol}://${host}:${port}/${name}`

mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', true)
mongoose.set('useCreateIndex', true)

module.exports = {
    connect() {
        mongoose.connect(DB_URL, err => {
            if (err) {
                createError(err)
            } else {
                console.log(`==> ${DB_URL} | 数据库已连接`)
            }
        })
    }
}
