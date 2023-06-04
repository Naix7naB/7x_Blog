const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, '标签名称必填!']
        },
        color: {
            type: String,
            default: '#845EC2'
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
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model('Tag', schema)
