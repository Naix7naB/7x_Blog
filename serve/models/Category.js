const mongoose = require('mongoose')
const schemaOption = require('../config/schemaOption.config')

const schema = new mongoose.Schema(
    {
        creator: {
            ref: 'User',
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        },
        name: {
            type: String,
            unique: true,
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

module.exports = mongoose.model('Category', schema)
