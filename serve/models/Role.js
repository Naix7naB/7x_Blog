const mongoose = require('mongoose')
const schemaOption = require('../config/schemaOption.config')

const schema = new mongoose.Schema(
    {
        creator: {
            ref: 'User',
            type: mongoose.SchemaTypes.ObjectId
        },
        name: {
            type: String,
            unique: true,
            required: [true, '角色名称必填!']
        },
        label: {
            type: String,
            unique: true,
            required: [true, '角色标签必填!']
        },
        includes: [
            {
                ref: 'User',
                type: mongoose.SchemaTypes.ObjectId
            }
        ],
        created_at: Number,
        updated_at: Number
    },
    schemaOption
)

module.exports = mongoose.model('Role', schema)
