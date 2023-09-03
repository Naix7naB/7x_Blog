const express = require('express')
const fs = require('fs')
const path = require('path')
const assert = require('http-assert')
const multer = require('multer')

const Response = require('../core/response')
const { UPLOAD_PATH } = require('../config/base.config')
const { resolveUrl } = require('../utils/helpers')

const categories = ['user', 'article', 'website', 'other']

/**
 * @function checkDirExistence
 * @description 检查是否存在此类别文件夹
 * @param {String} category 类别名称
 * @return {String | Null} 如果存在此类别, 则返回该文件夹路径. 不存在则返回null
 */
function checkDirExistence(category) {
    let dirPath = null
    if (categories.includes(category)) {
        dirPath = path.join(UPLOAD_PATH, category)
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath)
        }
    }
    return dirPath
}

const storage = multer.diskStorage({
    destination(req, file, next) {
        const field = req.params['category'] || null
        const dirPath = checkDirExistence(field)
        assert(dirPath, 422, '暂无此类别')
        next(null, dirPath)
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
                url: resolveUrl(url)
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

// 删除文件
Router.delete('/:category/:filename', async (req, res, next) => {
    try {
        const field = req.params['category'] || null
        const filename = req.params['filename'] || null
        const dirPath = checkDirExistence(field)
        assert(dirPath, 422, '暂无此类别')
        const filePath = path.join(dirPath, filename)
        assert(fs.existsSync(filePath), 422, '该文件已被删除')
        fs.unlinkSync(filePath)
        Response.send(res, { message: '删除成功' })
    } catch (err) {
        next(err)
    }
})

module.exports = Router
