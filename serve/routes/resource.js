const express = require('express')
const assert = require('http-assert')
const Response = require('../core/response')
const Paginator = require('../core/paginator')
const Populate = require('../plugins/populate')
const FollowAction = require('../plugins/followAction')
const postBodyMiddleware = require('../middleware/postBody')

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
        const followAct = FollowAction.getAction(method, modelName)
        if (followAct) {
            const { action, opt } = followAct
            await Model[action](reource_id, opt())
        }
        Response.send(res, { data: result })
    } catch (err) {
        next(err)
    }
})

// 创建资源
Router.post('/', postBodyMiddleware(), async (req, res, next) => {
    try {
        const { method, body, Model } = req
        const modelName = Model.modelName
        const resource = await Model.create(body)
        const followAct = FollowAction.getAction(method, modelName)
        if (followAct) {
            const { _model_, action, filter, opt } = followAct
            await _model_[action](filter(resource), opt(resource._id))
        }
        Response.send(res, { message: '创建资源' })
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
        const { method, params, auth, Model } = req
        assert.strictEqual(auth.scope, 1, 403) // 无权限
        const delRes = await Model.findByIdAndDelete(params.id)
        const followAct = FollowAction.getAction(method, Model.modelName)
        if (followAct) {
            const { filter, _model_, action, opt } = followAct
            await _model_[action](filter(delRes), opt(params.id))
        }
        Response.send(res, { message: '删除资源' })
    } catch (err) {
        next(err)
    }
})

module.exports = Router
