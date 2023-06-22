const express = require('express')
const assert = require('http-assert')

const User = require('../models/User')
const Role = require('../models/Role')
const Response = require('../core/response')
const { getPubKey } = require('../core/rsa')
const { encrypt, decrypt } = require('../utils/rsa')

const Router = express.Router()

// 获取公钥
Router.get('/key', async (req, res, next) => {
    try {
        const pubKey = await getPubKey()
        assert(pubKey, 422, '密钥获取失败')
        Response.send(res, {
            data: { pubKey },
            message: '密钥获取成功'
        })
    } catch (err) {
        next(err)
    }
})

// 注册
Router.post('/registry', async (req, res, next) => {
    try {
        const { role = 'user', ...userInfo } = req.body
        const userRole = await Role.findOne({ name: role })
        const random = Math.floor(Date.now() / 1000)
        userInfo.password = encrypt(userInfo.password)
        userInfo.email = userInfo.email || `user${random}@email.com`
        const user = await User.create({
            ...userInfo,
            role: userRole._id
        })
        await Role.findByIdAndUpdate(userRole._id, {
            $push: { includes: user._id }
        })
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
        const inputPwd = decrypt(password)
        const storePwd = decrypt(decrypt(user.password))
        assert.equal(inputPwd, storePwd, 422, '账号或密码错误')
        Response.sendToken(res, {
            payload: user,
            message: '登录成功'
        })
    } catch (err) {
        next(err)
    }
})

module.exports = Router
