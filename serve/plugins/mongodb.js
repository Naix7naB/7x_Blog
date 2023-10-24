const mongoose = require('mongoose')
const createError = require('http-errors')
const dbConf = require('../config/db.config')

const DB_URL = dbConf.ORIGIN + '/' + dbConf.DB_NAME

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

module.exports = {
    run() {
        const mongodb = mongoose.connection
        mongodb.on('connected', () => {
            console.log(`==> ${DB_URL} | 数据库已连接...`)
        })
        mongodb.on('disconnected', () => {
            console.log(`==> ${DB_URL} | 数据库已断开...`)
        })
        mongodb.on('error', err => {
            createError(err)
        })
    }
}
