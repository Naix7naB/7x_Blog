const fs = require('fs/promises')
const path = require('path')
const Article = require('../models/Article')
const Classify = require('../models/Classify')
const Tag = require('../models/Tag')
const Website = require('../models/Website')

const { UPLOAD_PATH } = require('../config/base.config')

module.exports = {
    Article: [
        {
            _model_: Classify,
            action: 'findByIdAndUpdate',
            condition(res) {
                return res.classify
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
            _model_: Tag,
            action: 'updateMany',
            condition(res) {
                if (res.tags.length === 0) return {}
                return {
                    id: {
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
            _model_: Website,
            action: 'update',
            condition() {
                return {}
            },
            opt() {
                return {
                    $inc: {
                        article_num: -1
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
    Classify: [
        {
            _model_: Website,
            action: 'update',
            condition() {
                return {}
            },
            opt() {
                return {
                    $inc: {
                        classify_num: -1
                    }
                }
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
                    id: {
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
        },
        {
            _model_: Website,
            action: 'update',
            condition() {
                return {}
            },
            opt() {
                return {
                    $inc: {
                        tag_num: -1
                    }
                }
            }
        }
    ],
    Comment: [
        {
            _model_: Article,
            action: 'findByIdAndUpdate',
            condition(res) {
                return res.aid
            },
            opt(cid) {
                return {
                    $inc: {
                        comment_num: -1
                    },
                    $pull: {
                        comments: cid
                    }
                }
            }
        }
    ]
}
