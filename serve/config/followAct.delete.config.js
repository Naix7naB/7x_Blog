const fs = require('fs/promises')
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
                if (res.tags.length === 0) return {}
                return {
                    _id: {
                        $in: res.tags
                    }
                }
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
            action: 'unlink',
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
                if (res.articles.length === 0) return {}
                return {
                    _id: {
                        $in: res.articles
                    }
                }
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
