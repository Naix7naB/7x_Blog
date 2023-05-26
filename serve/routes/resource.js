const express = require('express')
const createError = require('http-errors')

const Router = express.Router()

// 获取资源
Router.get('/', async (req, res, next) => {
    try {
        res.status(200).send('ok')
    } catch (err) {
        next(createError(400))
    }
})

// 创建资源
Router.post('/', async (req, res, next) => {
    try {
        res.status(200).send('ok')
    } catch (err) {
        next(createError(400))
    }
})

// 更新资源
Router.put('/:id', (req, res) => {
    res.status(200).send('ok')
})

// 删除资源
Router.delete('/:id', (req, res) => {
    res.status(200).send('ok')
})

module.exports = Router
