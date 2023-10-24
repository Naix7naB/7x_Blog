const express = require('express')
const assert = require('http-assert')

const User = require('../models/User')
const Response = require('../core/response')
const { encrypt, decrypt } = require('../utils/rsa')

const Router = express.Router()

// 修改密码
Router.put('/changePwd', async (req, res, next) => {
    try {
        // 查询用户
        const uid = req.auth.uid
        const user = await User.findById(uid, '+password')
        assert(user, 404)
        // 验证密码
        const storePwd = decrypt(decrypt(user.password))
        const oldPwd = decrypt(req.body.oldPassword)
        assert.equal(oldPwd, storePwd, 422, '密码错误')
        // 修改密码
        const newPwd = encrypt(req.body.newPassword)
        await User.findByIdAndUpdate(uid, { $set: { password: newPwd } })
        // 返回响应
        Response.send(res, { message: '修改成功' })
    } catch (err) {
        next(err)
    }
})

module.exports = Router
