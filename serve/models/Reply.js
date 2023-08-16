const mongoose = require('mongoose')
const schemaOption = require('../config/schemaOption.config')

const schema = new mongoose.Schema(
    {
        comment_id: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        },
        reply_id: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        },
        reviewer: {
            ref: 'User',
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        },
        mention: {
            ref: 'User',
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        created_at: Number,
        updated_at: Number
    },
    schemaOption
)

module.exports = mongoose.model('Reply', schema)
