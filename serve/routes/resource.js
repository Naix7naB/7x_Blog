const express = require('express')
const assert = require('http-assert')

const Response = require('../core/response')
const postBodyMiddleware = require('../middleware/postBody')
const Paginator = require('../core/paginator')
const Populate = require('../plugins/populate')
const FollowAction = require('../plugins/followAction')
const permitConf = require('../config/permit.config')
const permit = require('../utils/permit')
const dataDiff = require('../utils/dataDiff')

const Router = express.Router()

// 获取资源列表
Router.get('/', async (req, res, next) => {
    try {
        // 数据分页
        const { records: list, ...result } = await Paginator.paging({
            model: req.Model,
            ...req.query
        })
        // 返回响应
        Response.send(res, { data: { ...result, list } })
    } catch (err) {
        next(err)
    }
})

// 根据ID获取资源信息
Router.get('/:id', async (req, res, next) => {
    try {
        const { method, params, Model } = req
        // 查询资源
        const modelName = Model.modelName
        const populate = Populate[modelName]
        const result = await Model.findById(params.id).populate(populate)
        assert(result, 404)
        // 后续操作
        const followAct = FollowAction.getAction(method, modelName)
        if (followAct) {
            const { action, opt } = followAct
            await Model[action](result.id, opt())
        }
        // 返回响应
        Response.send(res, { data: result })
    } catch (err) {
        next(err)
    }
})

// 创建资源
Router.post('/', postBodyMiddleware(), async (req, res, next) => {
    try {
        const { method, body, auth, Model } = req
        const modelName = Model.modelName
        // 验证权限
        const { permission } = permitConf[method][modelName]
        const isPermit = await permit({
            opt: method,
            permission: permission,
            rid: auth.rid
        })
        assert(isPermit, 403)
        // 创建资源
        const resource = await Model.create(body)
        // 后续操作
        const followAct = FollowAction.getAction(method, modelName)
        if (followAct) {
            followAct.forEach(async item => {
                const { _model_, action, condition, opt } = item
                await _model_[action](condition(resource), opt(resource.id))
            })
        }
        // 返回响应
        Response.send(res, { message: '创建资源' })
    } catch (err) {
        next(err)
    }
})

// 更新资源
Router.put('/:id', async (req, res, next) => {
    try {
        const { method, params, auth, Model } = req
        // 查询资源
        const modelName = Model.modelName
        const resource = await Model.findById(params.id)
        assert(resource, 404)
        // 验证权限
        const { authField, revisableFields } = permitConf[method][modelName]
        const isPermit = await permit({
            opt: method,
            rid: auth.rid,
            uid: auth.uid,
            authId: resource[authField]
        })
        assert(isPermit, 403)
        // 对比数据
        const revisableData = Object.fromEntries(
            Object.entries(resource.toJSON()).filter(([key, val]) => revisableFields.includes(key))
        )
        const diff = dataDiff(revisableData, req.body)
        const updates = Object.fromEntries(Object.entries(diff).map(([key, val]) => [key, val.current]))
        // 更新数据
        const result = await Model.findByIdAndUpdate(resource.id, updates)
        // 后续操作
        const followAct = FollowAction.getAction(method, modelName)
        if (followAct) {
            followAct.forEach(async item => {
                const { _model_, action, condition, opt } = item
                await _model_[action](condition(diff), opt(result.id))
            })
        }
        // 返回响应
        Response.send(res, { message: '资源已更新' })
    } catch (err) {
        next(err)
    }
})

// 删除资源
Router.delete('/:id', async (req, res, next) => {
    try {
        const { method, params, auth, Model } = req
        // 查询资源
        const modelName = Model.modelName
        const resource = await Model.findById(params.id)
        assert(resource, 404)
        // 验证权限
        const { authField } = permitConf[method][modelName]
        const isPermit = await permit({
            opt: method,
            rid: auth.rid,
            uid: auth.uid,
            authId: resource[authField]
        })
        assert(isPermit, 403)
        // 删除资源
        const delRes = await Model.findByIdAndDelete(resource.id)
        // 后续操作
        const followAct = FollowAction.getAction(method, Model.modelName)
        if (followAct) {
            followAct.forEach(async item => {
                const { _model_, action, condition, opt } = item
                await _model_[action](condition(delRes), opt(delRes.id))
            })
        }
        // 返回响应
        Response.send(res, { message: '资源已删除' })
    } catch (err) {
        next(err)
    }
})

module.exports = Router
