const mongoose = require('mongoose')
const schemaOption = require('../config/schemaOption.config')

const schema = new mongoose.Schema(
    {
        creator: {
            ref: 'User',
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        },
        name: {
            type: String,
            unique: true,
            required: [true, '标签名称必填!']
        },
        description: {
            type: String,
            set(val) {
                if (!val) {
                    val = '暂无描述'
                }
                return val
            }
        },
        color: {
            type: String,
            set(color) {
                if (!color) {
                    color = 'rgba(66, 184, 131, 1)'
                }
                return color
            }
        },
        articles: [
            {
                ref: 'Article',
                type: mongoose.SchemaTypes.ObjectId
            }
        ],
        created_at: Number,
        updated_at: Number
    },
    schemaOption
)

module.exports = mongoose.model('Tag', schema)
