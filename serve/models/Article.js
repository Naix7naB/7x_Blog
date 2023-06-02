const mongoose = require('mongoose')

const { formatDate } = require('../utils/helpers')

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
        created_time: {
            type: mongoose.SchemaTypes.Date,
            default: Date.now(),
            get(val) {
                return formatDate(val, 'YYYY-MM-DD hh:mm:ss')
            }
        },
        state: {
            type: String,
            required: [true, '文章状态异常!']
        }
        // TODO 引用 Like 模型
        // likes: {
        //     ref: 'Like',
        //     type: mongoose.SchemaTypes.ObjectId,
        //     default: []
        // },
        // TODO 引用 Comment 模型
        // comments: {
        //     ref: 'Comment',
        //     type: mongoose.SchemaTypes.ObjectId,
        //     default: []
        // }
    },
    { versionKey: false }
)

module.exports = mongoose.model('Article', schema)
