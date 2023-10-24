const express = require('express')

const Response = require('../core/response')
const Article = require('../models/Article')

const Router = express.Router()

/* 文章点赞 */
Router.post('/like/:id', async (req, res, next) => {
    try {
        const uid = req.auth.uid
        const aid = req.params.id
        // 查询当前文章的点赞用户
        const article = await Article.findById(aid)
        const likeUsers = article.like_users
        // 判断该文章当前用户是否已点赞
        // 已点赞则取消点赞, 反之则点赞文章
        const isLike = !likeUsers.includes(uid)
        const likeOperator = isLike ? '$addToSet' : '$pull'
        const likeInc = isLike ? 1 : -1
        const result = await Article.findByIdAndUpdate(aid, {
            [likeOperator]: {
                like_users: uid
            },
            $inc: {
                like_count: likeInc
            }
        })
        // 返回响应
        Response.send(res, {
            message: isLike ? '点赞成功' : '取消点赞',
            data: {
                likes: result.like_count + likeInc
            }
        })
    } catch (err) {
        next(err)
    }
})

module.exports = Router
