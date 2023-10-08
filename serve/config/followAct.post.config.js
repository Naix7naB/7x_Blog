const Article = require('../models/Article')
const Category = require('../models/Category')
const Site = require('../models/Site')
const Tag = require('../models/Tag')

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
                    $push: {
                        articles: aid
                    }
                }
            }
        },
        {
            _model_: Tag,
            action: 'updateMany',
            condition(res) {
                return {
                    _id: {
                        $in: res.tags
                    }
                }
            },
            opt(aid) {
                return {
                    $push: {
                        articles: aid
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
                        article_count: 1
                    }
                }
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
                        category_count: 1
                    }
                }
            }
        }
    ],
    Tag: [
        {
            _model_: Site,
            action: 'findOneAndUpdate',
            condition() {
                return {}
            },
            opt() {
                return {
                    $inc: {
                        tag_count: 1
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
            opt() {
                return {
                    $inc: {
                        message_count: 1
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
            opt(cid) {
                return {
                    $inc: {
                        comment_count: 1
                    },
                    $push: {
                        comments: cid
                    }
                }
            }
        }
    ]
}
