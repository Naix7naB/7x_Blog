const express = require('express')
const assert = require('http-assert')

const Response = require('../core/response')
const Site = require('../models/Site')
const Populate = require('../plugins/populate')
const permitConf = require('../config/permit.config')
const permit = require('../utils/permit')
const dataDiff = require('../utils/dataDiff')
const { isEmptyObj } = require('../utils/helpers')

const Router = express.Router()

// 获取网站信息
Router.get('/info', async (req, res, next) => {
    try {
        const populate = Populate['Site']
        const site = await Site.findOne().populate(populate)
        assert(site, 404)
        Response.send(res, { data: site })
    } catch (err) {
        next(err)
    }
})

// 修改网站信息
Router.put('/info', async (req, res, next) => {
    try {
        // 查询资源
        const site = await Site.findOne()
        assert(site, 404)
        // 验证权限
        const { authField, revisableFields } = permitConf[req.method]['Site']
        const isPermit = permit({
            opt: req.method,
            rid: req.auth.rid,
            uid: req.auth.uid,
            authId: site[authField]
        })
        assert(isPermit, 403)
        // 对比数据
        const revisableData = Object.fromEntries(
            Object.entries(site.toJSON()).filter(([key, val]) => revisableFields.includes(key))
        )
        const diff = dataDiff(revisableData, req.body)
        const updates = Object.fromEntries(Object.entries(diff).map(([key, val]) => [key, val.current]))
        assert(!isEmptyObj(updates), 422, '资源未变动')
        // 更新数据
        await Site.findOneAndUpdate({}, updates)
        // 返回响应
        Response.send(res, { message: '网站信息修改成功' })
    } catch (err) {
        next(err)
    }
})

module.exports = Router
