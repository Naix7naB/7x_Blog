const mongoose = require('mongoose')
const createError = require('http-errors')
const dbConf = require('../config/db.config')

mongoose.connect(dbConf.DB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    w: 'majority'
})

module.exports = {
    run() {
        const mongodb = mongoose.connection
        mongodb.on('connected', () => {
            console.log(`==> ${dbConf.DB_URI} | 数据库已连接...`)
        })
        mongodb.on('disconnected', () => {
            console.log(`==> ${dbConf.DB_URI} | 数据库已断开...`)
        })
        mongodb.on('error', err => {
            createError(err)
        })
    }
}
