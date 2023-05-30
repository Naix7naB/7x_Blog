const qs = require('qs')
const express = require('express')
const createError = require('http-errors')

const Response = require('../core/response')
const Populate = require('../utils/populate')
const Paginator = require('../utils/paginator')

const Router = express.Router()

// 获取资源列表
Router.get('/', async (req, res, next) => {
    try {
        console.log(qs.stringify(req.query))
        const model = req.Model
        const { records: list, ...result } = await Paginator.paging({
            model,
            populate: Populate[model.modelName],
            ...req.query
        })
        Response.send(res, { data: { ...result, list } })
    } catch (err) {
        next(err)
    }
})

// 根据ID获取资源信息
Router.get('/:id', async (req, res, next) => {
    try {
        const model = req.Model
        const reource_id = req.params.id
        const populate = Populate[model.modelName]
        const result = await model.findById(reource_id).populate(populate)
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
