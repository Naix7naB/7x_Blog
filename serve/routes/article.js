const express = require('express')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const createError = require('http-errors')

const Response = require('../core/response')

const Article = require('../models/Article')

const { normalizeUrl } = require('../utils/helpers')

const { baseURL } = require('../config/server.config')
const { uploadPath } = require('../config/base.config')

const storage = multer.diskStorage({
    destination(req, file, next) {
        const savePath = path.join(uploadPath, 'article')
        fs.existsSync(savePath) || fs.mkdirSync(savePath)
        next(null, savePath)
    },
    filename(req, file, next) {
        const { ext } = path.parse(file.originalname)
        next(null, file.fieldname + Date.now() + ext)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 // 1M
    }
})

const Router = express.Router()

// 新增文章
Router.post('/create', upload.single('cover_img'), async (req, res, next) => {
    try {
        const { destination, filename } = req.file
        const url = path.join(baseURL, path.parse(destination).name, filename)
        await Article.create({
            author: req.auth.uid,
            cover_img: normalizeUrl(url),
            ...req.body
        })
        Response.send(res, { data: '创建文章成功' })
    } catch (err) {
        next(createError(400))
    }
})

module.exports = Router
