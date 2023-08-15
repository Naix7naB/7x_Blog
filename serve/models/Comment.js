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
        replies: [
            {
                ref: 'Reply',
                type: mongoose.SchemaTypes.ObjectId
            }
        ],
        created_at: Number,
        updated_at: Number
    },
    schemaOption
)

module.exports = mongoose.model('Comment', schema)
