const express = require('express')

const Response = require('../core/response')
const Article = require('../models/Article')

const Router = express.Router()

// 新增文章
Router.post('/create', async (req, res, next) => {
    try {
        const article = await Article.create({
            author: req.auth.uid,
            ...req.body
        })
        Response.send(res, { message: '创建文章成功', data: article })
    } catch (err) {
        next(err)
    }
})

module.exports = Router
