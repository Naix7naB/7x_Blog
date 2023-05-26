const express = require('express')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const createError = require('http-errors')

const { uploadPath } = require('../config/base.config')

const fieldMap = ['user', 'article', 'other']
const storage = multer.diskStorage({
    destination(req, file, next) {
        const field = req.params['category'] || null
        if (!fieldMap.includes(field)) {
            next(createError(404, '上传类型错误'))
        }
        const savePath = path.join(uploadPath, field)
        fs.existsSync(savePath) || fs.mkdirSync(savePath)
        next(null, savePath)
    },
    filename(req, file, next) {
        const { name, ext } = path.parse(file.originalname)
        next(null, name + Date.now() + ext)
    }
})

const Router = express.Router()
const upload = multer({
    storage,
    limits: {
        fileSize: 2097152
    }
})

// 上传文件
Router.post('/:category', upload.single('file'), async (req, res, next) => {
    try {
        const user = req.auth
        console.log(user)
        res.send('ok')
    } catch (err) {
        next(createError(400))
    }
})

module.exports = Router
