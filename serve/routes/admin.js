const express = require('express')
const assert = require('http-assert')

const User = require('../models/User')
const Response = require('../core/response')
const { getPubKey } = require('../core/rsa')
const { encrypt, decrypt } = require('../utils/rsa')

const Router = express.Router()

// 获取公钥
Router.get('/key', async (req, res, next) => {
    try {
        const pubKey = await getPubKey()
        assert(pubKey, 422, '获取密钥失败')
        Response.send(res, {
            data: { pubKey },
            message: '获取密钥成功'
        })
    } catch (err) {
        next(err)
    }
})

// 注册
Router.post('/register', async (req, res, next) => {
    try {
        req.body.password = encrypt(req.body.password)
        const user = await User.create(req.body)
        Response.sendToken(res, {
            payload: user,
            message: '注册成功'
        })
    } catch (err) {
        next(err)
    }
})

// 登录
Router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username }).select('+password')
        assert(user, 422, '用户不存在')
        assert.equal(decrypt(password), decrypt(user.password), 422, '账号或密码错误')
        Response.sendToken(res, {
            payload: user,
            message: '登录成功'
        })
    } catch (err) {
        next(err)
    }
})

module.exports = Router
