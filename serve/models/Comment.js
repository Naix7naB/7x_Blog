const mongoose = require('mongoose')
const schemaOption = require('../config/schemaOption.config')

const schema = new mongoose.Schema(
    {
        reviewer: {
            ref: 'User',
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        },
        aid: {
            ref: 'Article',
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        date: {
            type: Number,
            default: Math.floor(Date.now() / 1000)
        },
        replies: [
            {
                ref: 'Reply',
                type: mongoose.SchemaTypes.ObjectId
            }
        ]
    },
    {
        versionKey: schemaOption.versionKey
    }
)

module.exports = mongoose.model('Comment', schema)
