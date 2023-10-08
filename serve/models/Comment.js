const mongoose = require('mongoose')
const schemaOption = require('../config/schemaOption.config')

const schema = new mongoose.Schema(
    {
        topic_type: {
            type: String,
            required: [true, '评论主题类型不正确']
        },
        topic_title: {
            type: String,
            required: [true, '评论主题标题不能为空']
        },
        topic_id: {
            type: mongoose.SchemaTypes.ObjectId,
            required: [true, '评论主题ID不能为空']
        },
        parent_id: {
            type: mongoose.SchemaTypes.ObjectId,
            default: null
        },
        reply_id: {
            type: mongoose.SchemaTypes.ObjectId,
            default: null
        },
        reviewer: {
            ref: 'User',
            type: mongoose.SchemaTypes.ObjectId,
            required: [true, '请先登录后操作']
        },
        mention: {
            ref: 'User',
            type: mongoose.SchemaTypes.ObjectId,
            default: null
        },
        content: {
            type: String,
            required: [true, '评论内容不能为空']
        },
        reply_content: {
            type: String,
            default: null
        },
        created_at: Number,
        updated_at: Number
    },
    schemaOption
)

module.exports = mongoose.model('Comment', schema)
