const express = require('express')
const assert = require('http-assert')

const Response = require('../core/response')
const Comment = require('../models/Comment')
const ResourceBody = require('../plugins/resourceBody')
const FollowAction = require('../plugins/followAction')
const permitConf = require('../config/permit.config')
const permit = require('../utils/permit')

const Router = express.Router()

// 发表评论
Router.post('/', async (req, res, next) => {
    try {
        const body = ResourceBody['Comment'](req.auth.uid, req.body)
        // 验证权限
        const { permission } = permitConf['POST']['Comment']
        const isPermit = permit({
            opt: 'POST',
            permission: permission,
            rid: req.auth.rid
        })
        assert(isPermit, 403)
        // 创建评论资源
        const resource = await Comment.create(body)
        // 后续操作
        const followAct = FollowAction.getAction('POST', 'Comment')
        if (followAct) {
            followAct.forEach(async item => {
                const { _model_, action, condition, opt } = item
                await _model_[action](condition(resource), opt(resource.id))
            })
        }
        // 返回响应
        Response.send(res, { message: '发表评论' })
    } catch (err) {
        next(err)
    }
})

// 删除评论
Router.delete('/:id', async (req, res, next) => {
    try {
        // 查询资源
        const { auth, params, method } = req
        const comment = await Comment.findById(params.id)
        assert(comment, 404)
        // 验证权限
        const { authField } = permitConf[method]['Comment']
        const isPermit = permit({
            opt: method,
            rid: auth.rid,
            uid: auth.uid,
            authId: comment[authField]
        })
        assert(isPermit, 403)
        // 删除资源
        const delRes = await Comment.findByIdAndDelete(comment.id)
        // 后续操作
        const filterKey = delRes.parent_id ? 'reply_id' : 'parent_id'
        const { deletedCount } = await Comment.deleteMany({ [filterKey]: delRes.id })
        const followAct = FollowAction.getAction('DELETE', 'Comment')
        if (followAct) {
            followAct.forEach(async item => {
                const { _model_, action, condition, opt } = item
                await _model_[action](condition(delRes), opt(delRes.id, deletedCount + 1))
            })
        }
        // 返回响应
        Response.send(res, { message: '删除评论' })
    } catch (err) {
        next(err)
    }
})

module.exports = Router
