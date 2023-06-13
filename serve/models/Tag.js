const mongoose = require('mongoose')
const schemaOption = require('../config/schemaOption.config')

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, '标签名称必填!']
        },
        color: {
            type: String,
            set(val) {
                if (!val) {
                    return 'rgba(66, 184, 131, 1)'
                }
                return val
            }
        },
        author: {
            ref: 'User',
            type: mongoose.SchemaTypes.ObjectId,
            required: true
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
