const mongoose = require('mongoose')
const schemaOption = require('../config/schemaOption.config')

const schema = new mongoose.Schema(
    {
        author: {
            ref: 'User',
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        },
        title: {
            type: String,
            required: [true, '文章标题是必填项!']
        },
        description: {
            type: String,
            required: [true, '文章描述是必填项!']
        },
        classify: {
            ref: 'Classify',
            type: mongoose.SchemaTypes.ObjectId,
            required: [true, '文章类别是必填项!']
        },
        tags: [
            {
                ref: 'Tag',
                type: mongoose.SchemaTypes.ObjectId,
                required: true
            }
        ],
        cover_img: {
            type: String,
            required: [true, '文章封面是必填项!']
        },
        content: {
            type: String,
            required: [true, '文章内容不能为空!']
        },
        comments: [
            {
                ref: 'Comment',
                type: mongoose.SchemaTypes.ObjectId
            }
        ],
        view_num: {
            type: Number,
            default: 0
        },
        like_num: {
            type: Number,
            default: 0
        },
        comment_num: {
            type: Number,
            default: 0
        },
        state: {
            type: String,
            required: [true, '文章状态异常!']
        },
        created_at: Number,
        updated_at: Number
        // TODO 引用 Like 模型
        // likes: {
        //     ref: 'Like',
        //     type: mongoose.SchemaTypes.ObjectId,
        //     default: []
        // },
    },
    schemaOption
)

module.exports = mongoose.model('Article', schema)
