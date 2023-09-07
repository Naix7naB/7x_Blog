const db = require('./plugins/mongodb')
const path = require('path')
const cors = require('cors')
const logger = require('morgan')
const express = require('express')
const cookieParser = require('cookie-parser')

const jwtMiddleware = require('./middleware/jwtAuth')
const errorMiddleware = require('./middleware/errorHandler')
const resourceMiddleware = require('./middleware/resource')

const { resourceRoute, adminRoute, siteRoute, articleRoute, commentRoute, uploadRoute } = require('./routes')

const { ROOT } = require('./config/base.config')

const app = express()

db.run()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(ROOT, 'public')))
app.use(express.static(path.join(ROOT, 'upload')))

app.use(
    cors({
        origin: true,
        maxAge: 1728000,
        credentials: true,
        optionsSuccessStatus: 204,
        allowedHeaders: 'Content-Type, X-Custom-Header, X-Requested-With, Authorization, Token'
    })
)

app.use(jwtMiddleware())

app.use('/api/:resource', resourceMiddleware(), resourceRoute)
app.use('/admin', adminRoute)
app.use('/site', siteRoute)
app.use('/article', articleRoute)
app.use('/comment', commentRoute)
app.use('/upload', uploadRoute)

app.use(errorMiddleware())

module.exports = app
