const express = require('express')
const assert = require('http-assert')

const Response = require('../core/response')
const postBodyMiddleware = require('../middleware/postBody')
const permitConf = require('../config/permit.config')
const permit = require('../utils/permit')

const Article = require('../models/Article')
const Comment = require('../models/Comment')
const Reply = require('../models/Reply')

const Router = express.Router()

// 发表评论
Router.post('/leave', postBodyMiddleware('Comment'), async (req, res, next) => {
    try {
        // 验证权限
        const { body, auth } = req
        const { permission } = permitConf['POST']['Comment']
        const isPermit = await permit({
            opt: 'POST',
            permission: permission,
            rid: auth.rid
        })
        assert(isPermit, 403)
        // 创建评论资源
        const resource = await Comment.create(body)
        // 后续操作
        if (resource.topic_type === 'article_comment') {
            await Article.findByIdAndUpdate(resource.topic_id, {
                $inc: {
                    comment_count: 1
                },
                $push: {
                    comments: resource.id
                }
            })
        }
        // 返回响应
        Response.send(res, { message: '发表评论' })
    } catch (err) {
        next(err)
    }
})

// 回复评论
Router.post('/reply', postBodyMiddleware('Reply'), async (req, res, next) => {
    try {
        // 验证权限
        const { body, auth } = req
        const { permission } = permitConf['POST']['Reply']
        const isPermit = await permit({
            opt: 'POST',
            permission: permission,
            rid: auth.rid
        })
        assert(isPermit, 403)
        // 创建回复资源
        const resource = await Reply.create(body)
        // 后续操作
        const comment = await Comment.findByIdAndUpdate(resource.comment_id, {
            $push: {
                replies: resource.id
            }
        })
        if (comment.topic_type === 'article_comment') {
            await Article.findByIdAndUpdate(comment.topic_id, {
                $inc: {
                    comment_count: 1
                }
            })
        }
        // 返回响应
        Response.send(res, { message: '回复评论' })
    } catch (err) {
        next(err)
    }
})

module.exports = Router
