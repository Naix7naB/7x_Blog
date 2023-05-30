const express = require('express')
const fs = require('fs')
const path = require('path')
const assert = require('assert')
const multer = require('multer')

const Response = require('../core/response')
const { uploadPath } = require('../config/base.config')
const { normalizeUrl } = require('../utils/helpers')

const categoryMap = {
    user: 'user',
    article: 'article',
    other: 'other'
}

const storage = multer.diskStorage({
    destination(req, file, next) {
        const field = req.params['category'] || null
        const category = categoryMap[field] || null
        assert(category, 422, '文件上传分类不正确')
        const savePath = path.join(uploadPath, category)
        fs.existsSync(savePath) || fs.mkdirSync(savePath)
        next(null, savePath)
    },
    filename(req, file, next) {
        const { ext } = path.parse(file.originalname)
        next(null, file.fieldname + Date.now() + ext)
    }
})

const Router = express.Router()
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 // 1MB
    }
})

// 上传文件
Router.post('/:category', upload.any(), async (req, res, next) => {
    try {
        const fileUrls = req.files.map(file => {
            const { fieldname, destination, filename } = file
            const url = path.join('/', path.parse(destination).name, filename)
            return {
                fieldname,
                filename,
                url: normalizeUrl(url)
            }
        })
        Response.send(res, {
            message: '上传成功',
            data: {
                fileUrls
            }
        })
    } catch (err) {
        next(err)
    }
})

module.exports = Router
