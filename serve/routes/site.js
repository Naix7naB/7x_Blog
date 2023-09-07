const express = require('express')
const assert = require('http-assert')

const Response = require('../core/response')
const Site = require('../models/Site')
const Populate = require('../plugins/populate')

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

module.exports = Router
