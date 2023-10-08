const fs = require('fs/promises')
const path = require('path')
const Article = require('../models/Article')
const Category = require('../models/Category')
const Comment = require('../models/Comment')
const Site = require('../models/Site')
const Tag = require('../models/Tag')

const { UPLOAD_PATH } = require('../config/base.config')

module.exports = {
    Article: [
        {
            _model_: Category,
            action: 'findByIdAndUpdate',
            condition(res) {
                return res.category
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
            _model_: Comment,
            action: 'deleteMany',
            condition(res) {
                if (res.comments.length === 0) return {}
                return {
                    _id: {
                        $in: res.comments
                    }
                }
            },
            opt() {
                return {}
            }
        },
        {
            _model_: Site,
            action: 'findOneAndUpdate',
            condition() {
                return {}
            },
            opt() {
                return {
                    $inc: {
                        article_count: -1
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
    Category: [
        {
            _model_: Site,
            action: 'findOneAndUpdate',
            condition() {
                return {}
            },
            opt() {
                return {
                    $inc: {
                        category_count: -1
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
        },
        {
            _model_: Site,
            action: 'findOneAndUpdate',
            condition() {
                return {}
            },
            opt() {
                return {
                    $inc: {
                        tag_count: -1
                    }
                }
            }
        }
    ],
    Comment: [
        {
            _model_: Site,
            action: 'findByIdAndUpdate',
            condition(res) {
                return res.topic_id
            },
            opt(cid, count) {
                return {
                    $inc: {
                        message_count: -count
                    }
                }
            }
        },
        {
            _model_: Article,
            action: 'findByIdAndUpdate',
            condition(res) {
                return res.topic_id
            },
            opt(cid, count) {
                return {
                    $inc: {
                        comment_count: -count
                    },
                    $pull: {
                        comments: cid
                    }
                }
            }
        }
    ]
}
