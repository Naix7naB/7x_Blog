const express = require('express')
const createError = require('http-errors')

const Response = require('../core/response')
const Populate = require('../utils/populate')
const Paginator = require('../utils/paginator')

const Router = express.Router()

// 获取资源列表
Router.get('/', async (req, res, next) => {
    try {
        const modelName = req.Model.modelName
        if (!Populate[modelName]) {
            next(createError(400))
        }
        const result = await Paginator.paging({
            model: req.Model,
            populate: Populate[modelName],
            ...req.query
        })
        Response.send(res, { data: result })
    } catch (err) {
        next(createError(400))
    }
})

// 创建资源
Router.post('/', async (req, res, next) => {
    try {
        res.status(200).send('ok')
    } catch (err) {
        next(createError(400))
    }
})

// 更新资源
Router.put('/:id', (req, res) => {
    res.status(200).send('ok')
})

// 删除资源
Router.delete('/:id', (req, res) => {
    res.status(200).send('ok')
})

module.exports = Router
