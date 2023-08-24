const mongoose = require('mongoose')
const schemaOption = require('../config/schemaOption.config')

const schema = new mongoose.Schema(
    {
        topic_type: {
            type: String,
            required: [true, '评论主题类型不正确']
        },
        topic_id: {
            type: mongoose.SchemaTypes.ObjectId,
            required: [true, '评论主题ID不能为空']
        },
        reviewer: {
            ref: 'User',
            type: mongoose.SchemaTypes.ObjectId,
            required: [true, '请先登录后操作']
        },
        content: {
            type: String,
            required: [true, '评论内容不能为空']
        },
        replies: [
            {
                ref: 'Reply',
                type: mongoose.SchemaTypes.ObjectId
            }
        ],
        reply_count: {
            type: Number,
            default: 0
        },
        created_at: Number,
        updated_at: Number
    },
    schemaOption
)

module.exports = mongoose.model('Comment', schema)
