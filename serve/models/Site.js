const mongoose = require('mongoose')
const schemaOption = require('../config/schemaOption.config')

const { parseUrl } = require('../utils/helpers')

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, '请输入网站名称']
        },
        logo: {
            type: String,
            default: '/site/default_logo.png',
            get(url) {
                return parseUrl(url).href
            }
        },
        background: {
            type: String,
            default: '/site/default_background.png',
            get(url) {
                return parseUrl(url).href
            }
        },
        summary: {
            type: String,
            default: '网站摘要'
        },
        bulletin: {
            type: String,
            default: '网站公告'
        },
        host: {
            ref: 'User',
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        },
        about_me: {
            type: String,
            default: '关于我'
        },
        article_count: {
            type: Number,
            default: 0
        },
        category_count: {
            type: Number,
            default: 0
        },
        tag_count: {
            type: Number,
            default: 0
        },
        record_num: {
            type: String,
            default: '备案号'
        },
        created_at: Number,
        updated_at: Number
    },
    schemaOption
)

module.exports = mongoose.model('Site', schema)
