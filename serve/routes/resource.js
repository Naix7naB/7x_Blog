const express = require('express')
const assert = require('http-assert')
const Response = require('../core/response')
const Paginator = require('../core/paginator')
const Populate = require('../plugins/populate')
const FollowAction = require('../plugins/followAction')

const Router = express.Router()

// 获取资源列表
Router.get('/', async (req, res, next) => {
    try {
        const { records: list, ...result } = await Paginator.paging({
            model: req.Model,
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
        const { method, params, Model } = req
        const modelName = Model.modelName
        const reource_id = params.id
        const populate = Populate[modelName]
        const result = await Model.findById(reource_id).populate(populate)
        const { action, opt } = FollowAction.getAction(modelName, method)
        await Model[action](reource_id, opt)
        Response.send(res, { data: result })
    } catch (err) {
        next(err)
    }
})

// 创建资源
Router.post('/', async (req, res, next) => {
    try {
        // const model = req.Model
        // const modelName = model.modelName
        // postResource[modelName]
        res.status(200).send('ok')
    } catch (err) {
        next(err)
    }
})

// 更新资源
Router.put('/:id', (req, res) => {
    res.status(200).send('ok')
})

// 删除资源
Router.delete('/:id', async (req, res, next) => {
    try {
        const { scope } = req.auth
        assert.strictEqual(scope, 1, 403)
        await req.Model.findByIdAndDelete(req.params.id)
        Response.send(res, { message: '删除文章' })
    } catch (err) {
        next(err)
    }
})

module.exports = Router
