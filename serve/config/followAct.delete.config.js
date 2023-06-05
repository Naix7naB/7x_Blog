const fs = require('fs')
const path = require('path')
const Article = require('../models/Article')
const Tag = require('../models/Tag')

const { UPLOAD_PATH } = require('../config/base.config')

module.exports = {
    Article: [
        {
            _model_: Tag,
            action: 'updateMany',
            condition(res) {
                return res.tags.reduce(
                    (f, t) => {
                        f.$or.push({
                            _id: t
                        })
                        return f
                    },
                    { $or: [] }
                )
            },
            opt(aid) {
                return {
                    $pull: {
                        articles: aid
                    }
                }
            }
        },
        {
            _model_: fs,
            action: 'unlinkSync',
            condition(res) {
                return path.join(UPLOAD_PATH, res.cover_img)
            },
            opt() {
                return undefined
            }
        }
    ],
    Tag: [
        {
            _model_: Article,
            action: 'updateMany',
            condition(res) {
                return res.articles.reduce(
                    (f, t) => {
                        f.$or.push({
                            _id: t
                        })
                        return f
                    },
                    { $or: [] }
                )
            },
            opt(tid) {
                return {
                    $pull: {
                        tags: tid
                    }
                }
            }
        }
    ]
}
