const express = require('express')
const assert = require('http-assert')

const Response = require('../core/response')
const ResourceBody = require('../plugins/resourceBody')
const permitConf = require('../config/permit.config')
const permit = require('../utils/permit')

const Article = require('../models/Article')
const Comment = require('../models/Comment')

const Router = express.Router()

// 发表评论
Router.post('/', async (req, res, next) => {
    try {
        const body = ResourceBody['Comment'](req.auth.uid, req.body)
        // 验证权限
        const { permission } = permitConf['POST']['Comment']
        const isPermit = await permit({
            opt: 'POST',
            permission: permission,
            rid: req.auth.rid
        })
        assert(isPermit, 403)
        // 创建评论资源
        const resource = await Comment.create(body)
        // 后续操作
        if (resource.comment_id) {
            await Comment.findByIdAndUpdate(resource.comment_id, {
                $push: { replies: resource.id }
            })
        }
        if (resource.topic_type === 'article_comment') {
            const condition = {
                $inc: {
                    comment_count: 1
                }
            }
            if (!resource.reply_id) {
                Object.assign(condition, {
                    $push: {
                        comments: resource.id
                    }
                })
            }
            await Article.findByIdAndUpdate(resource.topic_id, condition)
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
        const isPermit = await permit({
            opt: method,
            rid: auth.rid,
            uid: auth.uid,
            authId: comment[authField]
        })
        assert(isPermit, 403)
        // 删除资源
        const delRes = await Comment.findByIdAndDelete(comment.id)
        // 后续操作
        const reply_count = delRes.replies.length
        await Comment.deleteMany({ _id: { $in: delRes.replies } })
        if (delRes.topic_type === 'article_comment') {
            const condition = {
                $inc: {
                    comment_count: -(reply_count + 1)
                }
            }
            if (!delRes.reply_id) {
                Object.assign(condition, {
                    $pull: {
                        comments: delRes.id
                    }
                })
            }
            await Article.findByIdAndUpdate(delRes.topic_id, condition)
        }
        // 返回响应
        Response.send(res, { message: '删除评论' })
    } catch (err) {
        next(err)
    }
})

module.exports = Router
