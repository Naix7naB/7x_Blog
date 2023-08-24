const mongoose = require('mongoose')
const schemaOption = require('../config/schemaOption.config')

const { resolveUrl } = require('../utils/helpers')

const schema = new mongoose.Schema(
    {
        host: {
            ref: 'User',
            type: mongoose.SchemaTypes.ObjectId
        },
        name: {
            type: String,
            required: [true, '请输入网站名称']
        },
        logo: {
            type: String,
            default: 'fa-blog'
        },
        slogan: {
            type: String,
            default: 'slogan'
        },
        background: {
            type: String,
            default: '/website/default_background.png',
            get(url) {
                return resolveUrl(url)
            }
        },
        article_count: {
            type: Number,
            default: 0
        },
        classify_count: {
            type: Number,
            default: 0
        },
        tag_count: {
            type: Number,
            default: 0
        },
        created_at: Number,
        updated_at: Number
    },
    schemaOption
)

module.exports = mongoose.model('Website', schema)
