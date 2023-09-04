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
Router.post('/leave', async (req, res, next) => {
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

module.exports = Router
